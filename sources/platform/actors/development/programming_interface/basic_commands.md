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

This page covers essential commands for the Apify SDK in JavaScript & Python. These commands are designed to be used within a running Actor, either in a local environment or on the Apify platform.

## Initialize your Actor

Before using any Apify SDK methods, initialize your Actor. This step prepares the Actor to receive events from the Apify paltform, sets up machine and storage configurations, and optionally clears previous local storage states.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

Use the `init()` method to initialize your Actor. Pair it with `exit()` to properly terminate the Actor

The use of `exit()` is not required but recommended. For more information, go to [Exit Actor](#exit-actor).

```js
import { Actor } from 'apify';

await Actor.init();
console.log('Actor starting...');
// ...
await Actor.exit();
```

Alternatively, use the `main()` function for environments that don't support top-level awaits:


```js
import { Actor } from 'apify';

Actor.main(async () => {
    console.log('Actor starting...');
    // ...
});
```

</TabItem>
<TabItem value="Python" label="Python">

In Python, use an asynchronous context manager with the `with` keyword. The `init()` method will be called before the code block is executed, and the `exit()` method will be called after the code block is finished.

```python
from apify import Actor

async def main():
    async with Actor:
        Actor.log.info('Actor starting...')
        # ...
```

</TabItem>
</Tabs>

## Get input

Acces the Actor's input object, which is stored as a JSON file in the Actor's default key-value store. The input is an object with properties. If the Actor defines the input schema, the input object is guaranteed to conform to it. For details, check out [Input and output](#input-and-output).

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();

const input = await Actor.getInput();
console.log(input);
// prints: {'option1': 'aaa', 'option2': 456}

await Actor.exit();
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

Usually, the file is called `INPUT`, but the exact key is defined in the `ACTOR_INPUT_KEY` environment variable.

## Key-value store access

Use the [Key-value store](../../../storage/key_value_store.md) to read and write arbitraty files

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();

// Save object to store (stringified to JSON)
await Actor.setValue('my_state', { something: 123 });

// Save binary file to store with content type
await Actor.setValue('screenshot.png', buffer, { contentType: 'image/png' });

// Get a record from the store (automatically parsed from JSON)
const value = await Actor.getValue('my_state');

// Access another key-value store by its name
const store = await Actor.openKeyValueStore('screenshots-store');
await store.setValue('screenshot.png', buffer, { contentType: 'image/png' });

await Actor.exit();
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

Store larger results in a [Dataset](../../../storage/dataset.md), an append-only object storage

Note that Datasets can optionally be equipped with the schema that ensures only certain kinds of objects are stored in them.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();

// Append result object to the default dataset associated with the run
await Actor.pushData({ someResult: 123 });

await Actor.exit();
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

When an Actor's main process terminates, the Actor run is considered finished. The process exit code determines Actor's final status:

- Exit code `0`: Status `SUCCEEDED`
- Exit code not equal to `0`: Status `FAILED`

By default, the platform sets a generic status message like _Actor exit with exit code 0_. However, you can provide more informative message using the SDK's exit methods.

### Basic exit

Use the `exit()` method to treminate the Actor with a custom status message:

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();
// ...
// Actor will finish with 'SUCCEEDED' status
await Actor.exit('Succeeded, crawled 50 pages');
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

### Immediate exit

To exit immediately without calling exit handlers:


<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();
// ...
// Exit right away without calling `exit` handlers at all
await Actor.exit('Done right now', { timeoutSecs: 0 });
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

### Failed exit

To indicate a failed run:

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();
// ...
// Actor will finish with 'FAILED' status
await Actor.exit('Could not finish the crawl, try increasing memory', { exitCode: 1 });
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

### Preffered exit methods

The SDK provides convenient methods for exiting Actors:

1. Use `exit()` with custom messages to inform users about the Actor's achievemts or issues.

2. The `exit()` method emits `exit` event allowing componets to perform cleanup or state presistence.

Example of a failed exit using a shorthand method:

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();
// ...
// Or nicer way using this syntactic sugar:
await Actor.fail('Could not finish the crawl, try increasing memory');
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

### Exit event handlers (JavaScript only)

In JavaScript, you can register handlers for the `exit` event:

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();

// Register a handler to be called on exit.
// Note that the handler has `timeoutSecs` to finish its job.
Actor.on('exit', ({ statusMessage, exitCode, timeoutSecs }) => {
    // Perform cleanup...
});

await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

```python
# 😔 Custom handlers are not supported in the Python SDK yet.
# 👉 Stay tuned and follow the news at https://apify.com/change-log
```

</TabItem>
</Tabs>
