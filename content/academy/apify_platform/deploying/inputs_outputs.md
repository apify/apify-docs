---
title: Inputs & outputs
description: Understand how to 
menuWeight: 3
paths:
- apify-platform/deploying/inputs-outputs
---

# [](#inputs-outputs) Inputs & outputs

Most of the time when you're creating a project, you are expecting some sort of input off of which your software will run off of. Often times as well, you want to provide some sort of output once your software has completed running. With Apify, it is extremely easy to take in inputs and deliver outputs.

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

```marked-tabs
<marked-tab header="Node.js" lang="javascript">
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
</marked-tab>
<marked-tab header="Rust" lang="rust">
use std::env;
use std::fs;
use crate::Input;
use crate::reqwest;
use serde_json::{from_str};

/// Returns true if we are running on Apify platform
pub fn is_on_apify() -> bool {
    match env::var("APIFY_IS_AT_HOME") {
        Ok(ref x) if x == "1"  => true,
        _ => false
    }
}

pub fn http_request_get(url: &str) -> String {
    reqwest::blocking::get(url)
        .expect("Didn't get response")
        .text()
        .expect("Response doesn't contain content")
}

pub fn get_input () -> Input {
    let is_on_apify = is_on_apify();

    let json = if is_on_apify {
        let default_kv = env::var("APIFY_DEFAULT_KEY_VALUE_STORE_ID").unwrap();
        let input_url = format!("https://api.apify.com/v2/key-value-stores/{}/records/INPUT", default_kv);
        let val = http_request_get(&input_url);
        val
    } else {
        // Standard path where local INPUT is stored
        fs::read_to_string("apify_storage/key_value_stores/default/INPUT.json")
            .expect("INPUT.json was not found on your local path apify_storage/key_value_stores/default/INPUT.json")
    };

    // Convert JSON string into Input and return
    from_str(&json).expect("INPUT.json is not a valid JSON")
}
</marked-tab>
```

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

## Writing output without the Apify SDK

Just as with the custom `getInput()` utility function, you can write a custom `setOutput()` function as well if you cannot use the Apify SDK.

```marked-tabs
<marked-tab header="Node.js" lang="javascript">
import * as fs from 'fs/promises';
import path from 'path';
import axios from 'axios';

const onPlatform = () => !!process.env.APIFY_IS_AT_HOME;

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
</marked-tab>
<marked-tab header="Rust" lang="rust">
use std::env;
use std::fs;
use crate::Input;
use crate::reqwest;
use serde_json::{from_str};

/// Returns true if we are running on Apify platform
pub fn is_on_apify() -> bool {
    match env::var("APIFY_IS_AT_HOME") {
        Ok(ref x) if x == "1"  => true,
        _ => false
    }
}

fn http_request_put(url: &str, payload: String) {
    // Put request requires building a HTTP client variable
    let client = reqwest::blocking::Client::new();
    client.put(url)
        .header(reqwest::header::CONTENT_TYPE, "application/json")
        .body(payload)
        .send()
        .expect("Put request failed");
}

pub fn set_output (data: String) {
    let is_on_apify = is_on_apify();

   if is_on_apify {
        let default_kv = env::var("APIFY_DEFAULT_KEY_VALUE_STORE_ID").unwrap();
        let token = env::var("APIFY_TOKEN").unwrap();
        let output_url = format!("https://api.apify.com/v2/key-value-stores/{}/records/OUTPUT?token={}", default_kv, token);
        http_request_put(&output_url, data);
    } else {
        // Standard path where local INPUT is stored
        fs::write("apify_storage/key_value_stores/default/OUTPUT.json", data)
            .expect("OUTPUT.json cannot be saved to your local path apify_storage/key_value_stores/default/OUTPUT.json")
    };
}
</marked-tab>
```

## [](#next) Next up

That's it! We've now added all of the files and code necessary to convert our software into an actor. In the [next lesson]({{@link apify_platform/deploying/pushing.md}}), we'll be learning how to create and integrate a new actor on the Apify platform with our project's Github repository.
