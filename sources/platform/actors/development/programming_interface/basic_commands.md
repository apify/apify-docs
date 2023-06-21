---
title: Basic commands
description: Learn how to provide your actor with context that determines its behavior through a plethora of pre-defined environment variables offered by the Apify SDK.
slug: /actors/development/programming-interface/basic-commands
sidebar_position: 2
---

The commands described in this section are expected to be called from within a context of a running actor, both in local environment or on the Apify platform.

### Actor initialization

First, the actor should be initialized. During initialization, it prepares to receive events from Apify platform, determines machine and storage configuration, and optionally purges the previous state from local storage. It will also create a default instance of the Actor class.

It is not required to perform the initialization explicitly because the actor will initialize on the execution of any actor method, but we strongly recommend it to prevent race conditions.

The actor is initialized by calling the `init()` method. It should be paired with an `exit()` method, which terminates the actor. The use of `exit()` is not required but recommended. For more information, go to [Exit actor](#exit-actor).

```js
import { Actor } from 'apify';

await Actor.init();

const input = await Actor.getInput();
console.log(input);

await Actor.exit();
```

An alternative way of initializing the actor is with a `main()` function. This is useful in environments where the latest JavaScript syntax and top-level awaits are not supported. The main function is only syntax-sugar for `init()` and `exit()`. It will call `init()` before it executes its callback and `exit()` after the callback resolves.

```js
import { Actor } from 'apify';

Actor.main(async () => {
  const input = await Actor.getInput();
  // ...
});
```

### Get input

Get access to the actor input object passed by the user. It is parsed from a JSON file, which is stored by the system in the actor's default key-value store. Usually, the file is called `INPUT`, but the exact key is defined in the `ACTOR_INPUT_KEY` environment variable.

The input is an object with properties. If the actor defines the input schema, the input object is guaranteed to conform to it. For details, see [Input and output](#input-and-output).

```js
const input = await Actor.getInput();
console.log(input);

// prints: { "option1": "aaa", "option2": 456 }
```

### Key-value store access

Write and read arbitrary files using a storage called [Key-value store](../../../storage/key_value_store.md). When an actor starts, by default, it is associated with a newly-created key-value store, which only contains one file with the input of the actor (see [Get input](#get-input)).

The user can override this behavior and specify another key-value store or input key when running the actor.

```js
// Save object to store (stringified to JSON)
await Actor.setValue('my_state', { something: 123 });

// Save binary file to store with content type
await Actor.setValue('screenshot.png', buffer, { contentType: 'image/png' });

// Get a record from the store (automatically parsed from JSON)
const value = await Actor.getValue('my_state');

// Access another key-value store by its name
const store = await Actor.openKeyValueStore('screenshots-store');
await store.setValue('screenshot.png', buffer, { contentType: 'image/png' });
```

### Push results to the dataset

Larger results can be saved to append-only object storage called [Dataset](../../../storage/dataset.md). When an actor starts, by default, it is associated with a newly-created empty default dataset. The actor can create additional datasets or access existing datasets created by other actors and use those as needed.

Note that Datasets can optionally be equipped with the schema that ensures only certain kinds of objects are stored in them. See [Dataset schema file](../../../storage/dataset.md) for more details.

```js
// Append result object to the default dataset associated with the run
await Actor.pushData({
    someResult: 123,
});
```

### Exit Actor

When the main actor process exits (i.e. the Docker container stops running), the actor run is considered finished, and the process exit code is used to determine whether the actor has succeeded (exit code `0` leads to status `SUCCEEDED`) or failed (exit code not equal to `0` leads to status `SUCCEEDED`). In this case, the platforms set a status message to a default value like `Actor exit with exit code 0`, which is not very descriptive for the users.

An alternative and preferred way to exit an actor is using the `exit` function in SDK, as shown below. This has two advantages:

- You can provide a custom status message for users to tell them what the actor achieved. On error, try to explain to users what happened, and most importantly, how they can fix the error. This greatly improves user experience.
- The system emits the `exit` event, which can be listened to and used by various components of the actor to perform a cleanup, persist state, etc. Note that the caller of exit can specify how long the system should wait for all `exit` event handlers to complete before closing the process, using the `timeoutSecs` option. For details, see [System Events](#system-events).

```js
// Actor will finish with 'SUCCEEDED' status
await Actor.exit('Succeeded, crawled 50 pages');

// Exit right away without calling `exit` handlers at all
await Actor.exit('Done right now', { timeoutSecs: 0 });

// Actor will finish with 'FAILED' status
await Actor.exit('Could not finish the crawl, try increasing memory', { exitCode: 1 });

// ... or nicer way using this syntactic sugar:
await Actor.fail('Could not finish the crawl, try increasing memory');

// Register a handler to be called on exit.
// Note that the handler has `timeoutSecs` to finish its job
Actor.on('exit', ({ statusMessage, exitCode, timeoutSecs }) => {
    // Perform cleanup...
})
```
