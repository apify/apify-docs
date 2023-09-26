---
title: Basic commands
description: Learn how to use basic commands of the Apify SDK for both JavaScript and Python.
slug: /actors/development/programming-interface/basic-commands
sidebar_position: 2
---

**Learn how to use basic commands of the Apify SDK for both JavaScript and Python.**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

The commands described in this section are expected to be called from within a context of a running Actor, both in a local environment or on the Apify platform.

## Actor initialization

First, the Actor should be initialized. During initialization, it prepares to receive events from the Apify platform. The Actor determines the machine and storage configuration and optionally purges the previous state from local storage. It will also create a default instance of the Actor class.

It is not required to perform the initialization explicitly because the Actor will initialize on the execution of any Actor method, but we strongly recommend it to prevent race conditions.

### Using JavaScript SDK

The Actor is initialized by calling the `init()` method. It should be paired with an `exit()` method, which terminates the Actor. The use of `exit()` is not required but recommended. For more information, go to [Exit Actor](#exit-actor).

```js
import { Actor } from 'apify';

await Actor.init();
console.log('Actor starting...');
// ...
await Actor.exit();
```

An alternative way of initializing the Actor is with a `main()` function. This is useful in environments where the latest JavaScript syntax and top-level awaits are not supported. The main function is only syntax-sugar for `init()` and `exit()`. It will call `init()` before it executes its callback and `exit()` after the callback resolves.

```js
import { Actor } from 'apify';

Actor.main(async () => {
    console.log('Actor starting...');
    // ...
});
```

### Using Python SDK

In Python SDK Actor is written as an asynchronous context manager, which means that we can use the `with` keyword to write our Actor code into a block. The `init()` method would be called before the code block is executed, and the `exit()` method will be called after the code block is finished.

```python
from apify import Actor

async def main():
    async with Actor:
        Actor.log.info('Actor starting...')
        # ...
```

## Get input

Get access to the Actor input object passed by the user. It is parsed from a JSON file, which is stored by the system in the Actor's default key-value store. Usually, the file is called `INPUT`, but the exact key is defined in the `ACTOR_INPUT_KEY` environment variable.

The input is an object with properties. If the Actor defines the input schema, the input object is guaranteed to conform to it. For details, see [Input and output](#input-and-output).

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

Actor.main(async () => {
    const input = await Actor.getInput();
    console.log(input);
    // prints: {'option1': 'aaa', 'option2': 456}
});
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        actor_input: dict = await Actor.get_input() or {}
        Actor.log.info(actor_input)
        # prints: {'option1': 'aaa', 'option2': 456}
```

</TabItem>
</Tabs>

## Key-value store access

Write and read arbitrary files using a storage called [Key-value store](../../../storage/key_value_store.md). When an Actor starts, by default, it is associated with a newly-created key-value store, which only contains one file with the input of the Actor (see [Get input](#get-input)).

The user can override this behavior and specify another key-value store or input key when running the Actor.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

Actor.main(async () => {
    // Save object to store (stringified to JSON)
    await Actor.setValue('my_state', { something: 123 });

    // Save binary file to store with content type
    await Actor.setValue('screenshot.png', buffer, { contentType: 'image/png' });

    // Get a record from the store (automatically parsed from JSON)
    const value = await Actor.getValue('my_state');

    // Access another key-value store by its name
    const store = await Actor.openKeyValueStore('screenshots-store');
    await store.setValue('screenshot.png', buffer, { contentType: 'image/png' });
});
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        # Save object to store (stringified to JSON)
        await Actor.set_value('my_state', {'something': 123})

        # Get a record from the store (automatically parsed from JSON)
        value = await Actor.get_value('my_state')

        # Log the obtained value
        Actor.log.info(f'value = {value}')
        # prints: value = {'something': 123}
```

</TabItem>
</Tabs>

## Push results to the dataset

Larger results can be saved to append-only object storage called [Dataset](../../../storage/dataset.md). When an Actor starts, by default, it is associated with a newly-created empty default dataset. The Actor can create additional datasets or access existing datasets created by other Actors and use those as needed.

Note that Datasets can optionally be equipped with the schema that ensures only certain kinds of objects are stored in them. See [Dataset schema file](../../../storage/dataset.md) for more details.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

Actor.main(async () => {
    // Append result object to the default dataset associated with the run
    await Actor.pushData({
        someResult: 123,
    });
});
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        # Append result object to the default dataset associated with the run
        await Actor.push_data({'some_result': 123})
```

</TabItem>
</Tabs>

## Exit Actor

When the main Actor process exits (i.e. the Docker container stops running), the Actor run is considered finished, and the process exit code is used to determine whether the Actor has succeeded (exit code `0` leads to status `SUCCEEDED`) or failed (exit code not equal to `0` leads to status `SUCCEEDED`). In this case, the platforms set a status message to a default value like `Actor exit with exit code 0`, which is not very descriptive for the users.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

Actor.main(async () => {
    // Actor will finish with 'SUCCEEDED' status
    await Actor.exit('Succeeded, crawled 50 pages');
});
```

</TabItem>

<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        # Actor will finish with 'SUCCEEDED' status
        await Actor.exit(status_message='Succeeded, crawled 50 pages')
        # INFO  Exiting actor ({"exit_code": 0})
        # INFO  [Terminal status message]: Succeeded, crawled 50 pages
```

</TabItem>
</Tabs>


<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

Actor.main(async () => {
    // Exit right away without calling `exit` handlers at all
    await Actor.exit('Done right now', { timeoutSecs: 0 });
});
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        # Exit right away without calling `exit` handlers at all
        await Actor.exit(event_listeners_timeout_secs=0, status_message='Done right now')
        # INFO  Exiting actor ({"exit_code": 0})
        # INFO  [Terminal status message]: Done right now
```

</TabItem>
</Tabs>


<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

Actor.main(async () => {
    // Actor will finish with 'FAILED' status
    await Actor.exit('Could not finish the crawl, try increasing memory', { exitCode: 1 });
});
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        # Actor will finish with 'FAILED' status
        await Actor.exit(status_message='Could not finish the crawl, try increasing memory', exit_code=1)
        # INFO  Exiting actor ({"exit_code": 1})
        # INFO  [Terminal status message]: Could not finish the crawl, try increasing memory
```

</TabItem>
</Tabs>

An alternative and preferred way to exit an Actor is using the `exit` function in the SDK, as shown below. This has two advantages:

- You can provide a custom status message for users to tell them what the Actor achieved. On error, try to explain to users what happened, and most importantly, how they can fix the error. This greatly improves user experience.
- The system emits the `exit` event, which can be listened to and used by various components of the Actor to perform a cleanup, persist state, etc. Note that the caller of exit can specify how long the system should wait for all `exit` event handlers to complete before closing the process, using the `timeoutSecs` option. For details, see [System Events](#system-events).

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

Actor.main(async () => {
    // ... or nicer way using this syntactic sugar:
    await Actor.fail('Could not finish the crawl, try increasing memory');
});
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        # ... or nicer way using this syntactic sugar:
        await Actor.fail(status_message='Could not finish the crawl. Try increasing memory')
        # INFO  Exiting actor ({"exit_code": 1})
        # INFO  [Terminal status message]: Could not finish the crawl. Try increasing memory
```

</TabItem>
</Tabs>


<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

Actor.main(async () => {
    // Register a handler to be called on exit.
    // Note that the handler has `timeoutSecs` to finish its job.
    Actor.on('exit', ({ statusMessage, exitCode, timeoutSecs }) => {
        // Perform cleanup...
    })
});
```

</TabItem>
<TabItem value="Python" label="Python">

```python
# Custom handlers are not supported in the Python SDK yet
```

</TabItem>
</Tabs>
