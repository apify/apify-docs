---
title: Apify client
description: Interact with the Apify API in your code without an HTTP client using the apify-client package, which is available for both JavaScript and Python.
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

Before we can use the client though, we must create a new instance of the `ApifyClient` class and pass it our API token from the [**Integrations** page](https://console.apify.com/account?tab=integrations) on the Apify Console:

```marked-tabs
<marked-tab header="Node.js" lang="javascript">
const client = new ApifyClient({
    token: 'YOUR_TOKEN_HERE',
});
</marked-tab>
<marked-tab header="Python" lang="python">
client = ApifyClient(token='YOUR_TOKEN_HERE')
</marked-tab>
```

Now that we've got our instance, we can point to an actor using the `client.actor()` function, then call the actor with some input with the `.call()` function.

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

## [](#collecting-dataset-items) Collecting dataset items

Once an actor's run has completed, it will return a **run info** object that looks something like this:

![Run info object]({{@asset apify_platform/getting_started/images/run-info.webp}})

The `run` variable we created in the last section points to the **run info** object of the run we created with the `.call()` function, which means tha through this variable, we can access the run's `defaultDatasetId`. This ID can then be passed into the `client.dataset()` function.

```marked-tabs
<marked-tab header="Node.js" lang="javascript">
const dataset = client.dataset(run['defaultDatasetId'])
</marked-tab>
<marked-tab header="Python" lang="python">
dataset = client.dataset(run['defaultDatasetId'])
</marked-tab>
```

Finally, we can collect the items in the dataset by using the `dataset.downloadItems()` function in Node.js, and the `dataset.list_items()` function in Python, then log them to the console.

```marked-tabs
<marked-tab header="Node.js" lang="javascript">
const items = await dataset.downloadItems('json');

console.log(JSON.parse(Buffer.from(items).toString('utf-8')));
</marked-tab>
<marked-tab header="Python" lang="python">
items = dataset.list_items().items

print(items)
</marked-tab>
```

> Notice that in the JavaScript example, we had to convert the `items` to a [`Buffer`](https://nodejs.org/api/buffer.html), then convert the Buffer to a string and parse it. This is because `dataset.downloadItems()` returns a buffer

<!-- demonstrate how to make the same call as in last lesson, but with the client instead -->
<!-- always show both JavaScript and Python code -->

<!-- demonstrate a new endpoint (maybe getting dataset Id and then fetching that) -->
