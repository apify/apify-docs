---
title: Apify client
description: Interact with the Apify API in your code by using the apify-client package, which is available for both JavaScript and Python.
menuWeight: 5
paths:
    - apify-platform/getting-started/apify-client
---

# [](#apify-client) Apify client

Now that you've gotten your toes wet with interacting with the Apify API through raw HTTP requests, you're ready to become familiar with the **Apify client**, which is a package available for both JavaScript and Python that allows you to interact with the API in your code without  explicitly needing to make any GET or POST requests.

This lesson will provide code examples for both Node.js and Python, so regardless of the language you are using, you can follow along!

## [](#installing-and-importing) Installing and importing

If you are going to use the client in Node.js, use this command within one of your projects to install the package through NPM:

```shell
npm install apify-client
```

In Python, you can install it from PyPI with this command:

```shell
pip install apify-client
```

After installing the package, let's make a file named **client** and import the Apify client like so:

```marked-tabs
<marked-tab header="Node.js" lang="javascript">
// client.js
import { ApifyClient } from 'apify-client';
</marked-tab>
<marked-tab header="Python" lang="python">
# client.py
from apify_client import ApifyClient
</marked-tab>
```

## [](#running-an-actor) Running an actor

In the last lesson, we ran the **adding-actor** and retrieved its dataset items. That's exactly what we're going to do now; however, by using the Apify client instead.

Before we can use the client though, we must create a new instance of the `ApifyClient` class and pass it our API token from the [**Integrations** page](https://console.apify.com/account?tab=integrations&asrc=developers_portal) on the Apify Console:

```marked-tabs
<marked-tab header="Node.js" lang="javascript">
const client = new ApifyClient({
    token: 'YOUR_TOKEN',
});
</marked-tab>
<marked-tab header="Python" lang="python">
client = ApifyClient(token='YOUR_TOKEN')
</marked-tab>
```

> If you are planning on publishing your code to a public Github/Gitlab repository or anywhere else online, be sure to set your API token as en environment variable, and never hardcode it directly into your script.

Now that we've got our instance, we can point to an actor using the [`client.actor()`](https://docs.apify.com/apify-client-js#apifyclient-actor) function, then call the actor with some input with the [`.call()`](https://docs.apify.com/apify-client-js#actorclient-call) function - the first parameter of which is the input for the actor.

```marked-tabs
<marked-tab header="Node.js" lang="javascript">
const run = await client.actor('YOUR_USERNAME/adding-actor').call({
    num1: 4,
    num2: 2,
});
</marked-tab>
<marked-tab header="Python" lang="python">
run = client.actor('YOUR_USERNAME/adding-actor').call(run_input={
    'num1': 4,
    'num2': 2
})
</marked-tab>
```

> Learn more about the `.call()` function [here](https://docs.apify.com/apify-client-js#actorclient-call).

## [](#collecting-dataset-items) Collecting dataset items

Once an actor's run has completed, it will return a **run info** object that looks something like this:

![Run info object]({{@asset apify_platform/getting_started/images/run-info.webp}})

The `run` variable we created in the last section points to the **run info** object of the run we created with the `.call()` function, which means that through this variable, we can access the run's `defaultDatasetId`. This ID can then be passed into the `client.dataset()` function.

```marked-tabs
<marked-tab header="Node.js" lang="javascript">
const dataset = client.dataset(run['defaultDatasetId'])
</marked-tab>
<marked-tab header="Python" lang="python">
dataset = client.dataset(run['defaultDatasetId'])
</marked-tab>
```

Finally, we can collect the items in the dataset by using the **list items** function, then log them to the console.

```marked-tabs
<marked-tab header="Node.js" lang="javascript">
const { items } = await dataset.listItems();

console.log(items);
</marked-tab>
<marked-tab header="Python" lang="python">
items = dataset.list_items().items

print(items)
</marked-tab>
```

> Notice that in the JavaScript example, we had to convert the `items` to a [`Buffer`](https://nodejs.org/api/buffer.html), then convert the Buffer to a string and parse it. This is because `dataset.downloadItems()` returns a buffer.

The final code for running the actor and collecting its dataset items looks like this:

```marked-tabs
<marked-tab header="Node.js" lang="javascript">
// client.js
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({
    token: 'YOUR_TOKEN',
});

const run = await client.actor('YOUR_USERNAME/adding-actor').call({
    num1: 4,
    num2: 2,
});

const dataset = client.dataset(run['defaultDatasetId'])

const { items } = await dataset.listItems();

console.log(items);
</marked-tab>
<marked-tab header="Python" lang="python">
# client.py
from apify_client import ApifyClient

client = ApifyClient(token='YOUR_TOKEN')

actor = client.actor('YOUR_USERNAME/adding-actor').call(run_input={
    'num1': 4,
    'num2': 2
})

dataset = client.dataset(run['defaultDatasetId'])

items = dataset.list_items().items

print(items)
</marked-tab>
```

## [](#updating-actor) Updating an actor

If you check the **Settings** tab within your **adding-actor**, you'll notice that the default memory being allocated to the actor is **2048 MB**. This is a bit overkill considering the fact that the actor is only adding two numbers together - **256 MB** would be much more reasonable. Also, we can safely say that the run should never take more than 20 seconds (even this is a generous number), and that the default of 3600 seconds is also overkill.

Let's change these two actor settings via the Apify client using the [`actor.update()`](https://docs.apify.com/apify-client-js#actorclient-update) function. This function will call the **update actor** endpoint, which can take `defaultRunOptions` as an input property. You can find the shape of the `defaultRunOptions` in the [API documentation](https://docs.apify.com/api/v2#/reference/actors/actor-object/update-actor). Perfect!

First, we'll create a pointer to our actor, similar to as before (except this time, we won't be using `.call()` at the end):

```marked-tabs
<marked-tab header="Node.js" lang="javascript">
const actor = client.actor('YOUR_USERNAME/adding-actor')
</marked-tab>
<marked-tab header="Python" lang="python">
actor = client.actor('YOUR_USERNAME/adding-actor')
</marked-tab>
```

Then, we'll just call the `.update()` method on the `actor` variable we created and pass in our new **default run options**:

```marked-tabs
<marked-tab header="Node.js" lang="javascript">
await actor.update({
    defaultRunOptions: {
        build: 'latest',
        memoryMbytes: 256,
        timeoutSecs: 20,
    },
});
</marked-tab>
<marked-tab header="Python" lang="python">
actor.update(default_run_build='latest', default_run_memory_mbytes=256, default_run_timeout_secs=20)
</marked-tab>
```

After running the code, go back to the **Settings** page of **adding-actor**. If your default options now look like this, then it worked!:

![New run defaults]({{@asset apify_platform/getting_started/images/new-defaults.webp}})

## [](#overview) Overview

There is so much more you can do with the Apify client than just running actors, updating actors, and collecting dataset items. The purpose of this lesson was just to get you comfortable with using the client in your own projects, as it is the absolute best developer tool for integrating the Apify platform with an external system.

For a more in-depth understanding of the Apify API client, give these a quick lookover:

- [API client for JavaScript](https://docs.apify.com/apify-client-js)
- [API client for Python](https://docs.apify.com/apify-client-python)

## [](#next) Next up

Now that you're familiar and a bit more comfortable with the Apify platform, you're ready to start deploying your code to Apify! In the [next section]({{@link apify_platform/deploying_your_code.md}}), you'll learn how to take any project written in any programming language and turn it into an actor.
