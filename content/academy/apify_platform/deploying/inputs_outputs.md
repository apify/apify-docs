---
title: Inputs & outputs
description: Learn to accept input into your actor, do something with it, then return output. Actors can be written in any language, so this concept is language agnostic.
menuWeight: 2
paths:
- apify-platform/deploying/inputs-outputs
---

# [](#inputs-outputs) Inputs & outputs

Most of the time when you're creating a project, you are expecting some sort of input off of which your software will run off of. Often times as well, you want to provide some sort of output once your software has completed running. With Apify, it is extremely easy to take in inputs and deliver outputs.

An important thing to understand regarding inputs and outputs is that they are read/written differently depending on where the actor is running:

- If your actor is running locally, the inputs/outputs are usually provided in the filesystem, and environment variables are injected either by you, the developer, and by the Apify CLI by running the project with the `apify run` command.

- While running in a Docker container on the platform, environment variables are automatically injected, and inputs & outputs are provided and modified using Apify's REST API.

## [](#accepting-input) Accepting input

There are multiple ways to accept input into your project. The option you go with depends on the language you have written your project in. If you are using Node.js for your repo's code, you can use the [Apify SDK](https://www.npmjs.com/package/apify). Otherwise, you can use the useful environment variables automatically set up for you by Apify to write utility functions which read the actor's input and return it.

### Accepting input with the Apify SDK

Since we're using Node.js, let's install the **apify** package by running the following command:

```shell
npm install apify
```

Now, let's import `Apify` and use the `Apify.getInput()` function to grab our input.

```JavaScript
// index.js
import Apify from 'apify';

const { numbers } = await Apify.getInput();

const addAllNumbers = (...nums) => nums.reduce((total, curr) => (total += curr));

const solution = addAllNumbers(...numbers);

console.log(solution);
```

Before running this though, let's modify the **INPUT.json** file within **apify_storage/key_value_stores/default** to match what we're expecting in our code.

```JSON
{
    "numbers": [5, 5, 5, 5]
}
```

Cool! When we run `node index.js`, we see **20**.

### Accepting input without the Apify SDK

Alternatively, if you don't want to use the Apify SDK (or you're writing in a language other than JavaScript), you can create your own `getInput()` function.

```JavaScript
// utils.js
import * as fs from 'fs/promises';
import path from 'path';
import axios from 'axios';

// If being run on the platform, the "APIFY_IS_AT_HOME"
// environment variable will be "1". Otherwise, it will
// be undefined.
const onPlatform = () => !!process.env.APIFY_IS_AT_HOME;

const getInput = async () => {
    // If we are running locally, read the file from the filesystem
    // and return it in JSON format.
    if (!onPlatform()) {
        try {
            const input = await fs.readFile(path.join(path.resolve(), 'apify_storage/key_value_stores/default/INPUT.json'));
            return JSON.parse(Buffer.from(input).toString('utf-8'));
        } catch (err) {
            throw new Error(err.message);
        }
    }

    // Otherwise, grab the actor's default key-value store data from
    // the Apify API.
    const defaultKvStore = process.env.APIFY_DEFAULT_KEY_VALUE_STORE_ID;
    const uri = `https://api.apify.com/v2/key-value-stores/${defaultKvStore}/records/INPUT`;

    try {
        const { data } = await axios.get(uri);
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};
```

> For a better understanding of API endpoints reading and modifying key-value stores, check the [official API reference](https://docs.apify.com/api/v2#/reference/key-value-stores).

## [](#writing-output) Writing output

Similarly to reading input, you can write the actor's output either by using the Apify SDK in Node.js, or by manually writing a utility function to do so.

### Writing output with the Apify SDK

In the SDK, we can write to the key-value store with the  `Apify.setValue()` function. Let's go ahead and write the solution of the `addAllNumbers()` function to the key-value store using it:

```JavaScript
// index.js
import Apify from 'apify';

const { numbers } = await Apify.getInput();

const addAllNumbers = (...nums) => nums.reduce((total, curr) => (total += curr));

const solution = addAllNumbers(...numbers);

await Apify.setValue('OUTPUT', { solution });
```

### Writing output without the Apify SDK

Just as with the custom `getInput()` utility function, you can write a custom `setOutput()` function as well if you cannot use the Apify SDK.

```JavaScript
// utils.js
import * as fs from 'fs/promises';
import path from 'path';
import axios from 'axios';

const onPlatform = () => !!process.env.APIFY_IS_AT_HOME;

// getInput function here...

const setOutput = async (data) => {
    // If running locally, write directly to the filesystem
    if (!onPlatform()) {
        try {
            await fs.writeFile(path.join(path.resolve(), 'apify_storage/key_value_stores/default/OUTPUT.json'), JSON.stringify(data));
            return;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    // Otherwise, use the Apify API to write the actor's output
    const defaultKvStore = process.env.APIFY_DEFAULT_KEY_VALUE_STORE_ID;
    const apiToken = process.env.APIFY_TOKEN;
    const uri = `https://api.apify.com/v2/key-value-stores/${defaultKvStore}/records/OUTPUT?token=${apiToken}`;

    try {
        await axios.put(uri, { data });
    } catch (err) {
        throw new Error(err.message);
    }
};
```

> For the full context of the Rust examples, take a look at the codebase [here](https://github.com/metalwarrior665/rust-apify-actor-example).

## [](#next) Next up

That's it! We've now added all of the files and code necessary to convert our software into an actor. In the [next lesson]({{@link apify_platform/deploying/input_schema.md}}), we'll be learning how to easily generate a user interface for our actor's input so that users don't have to provide the input in raw JSON format.
