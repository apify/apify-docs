---
title: Request queue
description: Queue URLs for an Actor to visit in its run. Learn how to share your queues between Actor runs. Access and manage request queues from Apify Console or via API.
toc_max_heading_level: 4
sidebar_position: 9.4
slug: /storage/request-queue
---

**Queue URLs for an Actor to visit in its run. Learn how to share your queues between Actor runs. Access and manage request queues from Apify Console or via API.**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Request queues enable you to enqueue and retrieve requests such as URLs with an [HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) and other parameters. They prove essential not only in web crawling scenarios but also in any situation requiring the management of a large number of URLs and the addition of new links.

The storage system for request queues accomoodates both breadth-first and depth-first crawling stategies, along with the inclusion of custom data attributes. This system enables you to check if certain URLs have already been encountered, add new URLs to the queue, and retrieve the next set of URLs fo processing.

> Named request queues are retained indefinitely. <br/>
> Unnamed request queues expire after 7 days unless otherwise specified.<br/> > [Learn more](./index.md#named-and-unnamed-storages)

## Basic usage

You can access your request queues in several ways:

- [Apify Console](https://console.apify.com) - provides an easy-to-understand interface.
- [Apify API](/api/v2#) - for accessing your request queues programmatically.
- [Apify API clients](/api) - to access your request queues from any Node.js application.
- [Apify SDK](/sdk) - when building your own JavaScript Actor.

### Apify Console

In the [Apify Console](https://console.apify.com), you can view your request queues in the [Storage](https://console.apify.com/storage) section under the [Request queues](https://console.apify.com/storage?tab=requestQueues) tab.

![Request queues in app](./images/request-queue-app.png)

To view a request queue, click on its **Queue ID**.
Under the **Actions** menu, you can rename your queue's name (and, in turn, its
[retention period](./usage#named-and-unnamed-storages)) and [access rights](../collaboration/index.md) using the **Share** button.
Click on the **API** button to view and test a queue's [API endpoints](/api/v2#/reference/request-queues).

![Request queues detail](./images/request-queue-detail.png)

### Apify API

The [Apify API](/api/v2#/reference/request-queues) allows you programmatic access to your request queues using [HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).

If you are accessing your datasets using the `username~store-name` [store ID format](./index.md), you will need to use your secret API token. You can find the token (and your user ID) on the [Integrations](https://console.apify.com/account#/integrations) page of your Apify account.

> When providing your API authentication token, we recommend using the request's `Authorization` header, rather than the URL. ([More info](../integrations/programming/api.md#authentication)).

To get a list of your request queues, send a GET request to the [Get list of request queues](/api/v2#/reference/request-queues/store-collection/get-list-of-request-queues) endpoint.

```text
https://api.apify.com/v2/request-queues
```

To get information about a request queue such as its creation time and item count, send a GET request to the [Get request queue](/api/v2#/reference/request-queues/queue/get-request-queue) endpoint.

```text
https://api.apify.com/v2/request-queues/{QUEUE_ID}
```

To get a request from a queue, send a GET request to the [Get request](/api/v2#/reference/request-queues/request/get-request) endpoint.

```text
https://api.apify.com/v2/request-queues/{QUEUE_ID}/requests/{REQUEST_ID}
```

To add a request to a queue, send a POST request with the request to be added as a JSON object in the request's payload to the [Add request](/api/v2#/reference/request-queues/request-collection/add-request) endpoint.

```text
https://api.apify.com/v2/request-queues/{QUEUE_ID}/requests
```

Example payload:

```json
{
    "uniqueKey": "http://example.com",
    "url": "http://example.com",
    "method": "GET"
}
```

To update a request in a queue, send a PUT request with the request to update as a JSON object in the request's payload to the [Update request](/api/v2#/reference/request-queues/request/update-request) endpoint. In the payload, specify the request's ID and add the information you want to update.

```text
https://api.apify.com/v2/request-queues/{QUEUE_ID}/requests/{REQUEST_ID}
```

Example payload:

```json
{
    "id": "dnjkDMKLmdlkmlkmld",
    "uniqueKey": "http://example.com",
    "url": "http://example.com",
    "method": "GET"
}
```

> When adding or updating requests, you can optionally provide a `clientKey` parameter to your request. It must be a string between 1 and 32 characters in length. This identifier is used to determine whether the queue was accessed by [multiple clients](#sharing). If `clientKey` is not provided, the system considers this API call to come from a new client. See the `hadMultipleClients` field returned by the [`Get head`](/api/v2#/reference/request-queues/queue-head/get-head) operation for details. <br/>
>
> Example: `client-abc`

For further details and a breakdown of each storage API endpoint, refer to the [API documentation](/api/v2#/reference/key-value-stores).

### Apify API Clients

#### JavaScript API client

The Apify [JavaScript API client](/api/client/js/reference/class/RequestQueueClient) (`apify-client`) enables you to access your request queues from any Node.js application, whether it is running on the Apify platform or externally.

After importing and initiating the client, you can save each request queue to a variable for easier access.

```js
const myQueueClient = apifyClient.requestQueue('jane-doe/my-request-queue');
```

You can then use that variable to [access the request queue's items and manage it](/api/client/js/reference/class/RequestQueueClient).

Check out the [JavaScript API client documentation](/api/client/js/reference/class/RequestQueueClient) for [help with setup](/api/client/js/docs) and more details.

#### Python API client

The Apify [Python API client](/api/client/python) (`apify-client`) allows you to access your request queues from any Python application, whether it's running on the Apify platform or externally.

After importing and initiating the client, you can save each request queue to a variable for easier access.

```python
my_queue_client = apify_client.request_queue('jane-doe/my-request-queue')
```

You can then use that variable to [access the request queue's items and manage it](/api/client/python/reference/class/RequestQueueClient).

Check out the [Python API client documentation](/api/client/python/reference/class/RequestQueueClient) for [help with setup](/api/client/python/docs/quick-start) and more details.

### Apify SDKs

#### JavaScript SDK

When working with a JavaScript [Actor](../actors/index.mdx), the [JavaScript SDK](/sdk/js/docs/guides/request-storage#request-queue) is an essential tool, especially for request queue management. The primary class for this purpose is the [`RequestQueue`](/sdk/js/reference/class/RequestQueue) class. Use this class to decide whether your data is stored locally or in the Apify cloud.

If you are building a JavaScript [Actor](../actors/index.mdx), you will be using the [JavaScript SDK](/sdk/js/docs/guides/request-storage#request-queue). The request queue is represented by a [`RequestQueue`](/sdk/js/reference/class/RequestQueue) class. You can use the class to specify whether your data is stored locally or in the Apify cloud and [enqueue new URLs](/sdk/js/reference/class/RequestQueue#addRequests).

Every Actor run is automatically linked with a default request queue, initiated upon adding the first request. This queue is primarily utilized for storing URLs to be crawled during the particular Actor run, though its use is not mandatory. For enhanced flexibility, you can establish named queues. These named queues offer the advantage of being shareable across different Actors or various Actor runs, facilitating a more interconnected and efficient process.

If you are storing your data locally, you can find your request queue at the following location.

```text
{APIFY_LOCAL_STORAGE_DIR}/request_queues/{QUEUE_ID}/{ID}.json
```

The default request queue's ID is _default_. Each request in the queue is stored as a separate JSON file, where `{ID}` is a request ID.

To open a request queue, use the [`Actor.openRequestQueue()`](/sdk/js/reference/class/Actor#openRequestQueue) method.

```js
// Import the JavaScript SDK into your project
import { Actor } from 'apify';

await Actor.init();
// ...

// Open the default request queue associated with
// the Actor run
const queue = await Actor.openRequestQueue();

// Open the 'my-queue' request queue
const queueWithName = await Actor.openRequestQueue('my-queue');

// ...
await Actor.exit();
```

Once a queue is open, you can manage it using the following methods. Check out the `RequestQueue` class's [API reference](/sdk/js/reference/class/RequestQueue) for the full list.

```js
// Import the JavaScript SDK into your project
import { Actor } from 'apify';

await Actor.init();
// ...

const queue = await Actor.openRequestQueue();

// Enqueue requests
await queue.addRequests([{ url: 'http://example.com/aaa' }]);
await queue.addRequests(['http://example.com/foo', 'http://example.com/bar'], {
    forefront: true,
});

// Get the next request from queue
const request1 = await queue.fetchNextRequest();
const request2 = await queue.fetchNextRequest();

// Get a specific request
const specificRequest = await queue.getRequest('shi6Nh3bfs3');

// Reclaim a failed request back to the queue
// and process it again
await queue.reclaimRequest(request2);

// Remove a queue
await queue.drop();

// ...
await Actor.exit();
```

Check out the [JavaScript SDK documentation](/sdk/js/docs/guides/request-storage#request-queue) and the `RequestQueue` class's [API reference](/sdk/js/reference/class/RequestQueue) for details on managing your request queues with the JavaScript SDK.

#### Python SDK

For Python [Actor](../actors/index.mdx) development, the [Python SDK](/sdk/python/docs/concepts/storages#working-with-request-queues) the in essential. The request queue is represented by [`RequestQueue`](/sdk/python/reference/class/RequestQueue) class. Utilize this class to determine whether your data is stored locally or in in the Apify cloud. For managing your data, it provides the capability to [enqueue new URLs](/sdk/python/reference/class/RequestQueue#add_requests), facilitating seamless integration and operation within your Actor.

Every Actor run is automatically connected to a default request queue, established specifically for that run upon the addition of the first request. If you're operating your Actors and choose to utilize this queue, it typically serves to store URLs for crawling in the respective Actor run, though its use is not mandatory. To extend functionality, you have the option to create named queue, which offer the flexibility to be shared among different Actors or across multiple Actor runs.

If you are storing your data locally, you can find your request queue at the following location.

```text
{APIFY_LOCAL_STORAGE_DIR}/request_queues/{QUEUE_ID}/{ID}.json
```

The default request queue's ID is _default_. Each request in the queue is stored as a separate JSON file, where `{ID}` is a request ID.

To _open a request queue_, use the [`Actor.open_request_queue()`](/sdk/python/reference/class/Actor#open_request_queue) method.

```python
from apify import Actor

async def main():
    async with Actor:
        # Open the default request queue associated with the Actor run
        queue = await Actor.open_request_queue()

        # Open the 'my-queue' request queue
        queue_with_name = await Actor.open_request_queue(name='my-queue')

        # ...
```

Once a queue is open, you can manage it using the following methods. See the `RequestQueue` class's [API reference](/sdk/python/reference/class/RequestQueue) for the full list.

```python
from apify import Actor
from apify.storages import RequestQueue

async def main():
    async with Actor:
        queue: RequestQueue = await Actor.open_request_queue()

        # Enqueue requests
        await queue.add_request(request={'url': 'http:#example.com/aaa'})
        await queue.add_request(request={'url': 'http:#example.com/foo'})
        await queue.add_request(request={'url': 'http:#example.com/bar'}, forefront=True)

        # Get the next requests from queue
        request1 = await queue.fetch_next_request()
        request2 = await queue.fetch_next_request()

        # Get a specific request
        specific_request = await queue.get_request('shi6Nh3bfs3')

        # Reclaim a failed request back to the queue and process it again
        await queue.reclaim_request(request2)

        # Remove a queue
        await queue.drop()
```

Check out the [Python SDK documentation](/sdk/python/docs/concepts/storages#working-with-request-queues) and the `RequestQueue` class's [API reference](/sdk/python/reference/class/RequestQueue) for details on managing your request queues with the Python SDK.

## Features

Request queue is a storage type built with scraping in mind, enabling developers to write scraping logic efficiently and scalably.
The Apify tooling, including [Crawlee](https://crawlee.dev/), [Apify SDK for JavaScript](https://docs.apify.com/sdk/js/), and [Apify SDK for Python](https://docs.apify.com/sdk/python/), incorporates all these features, enabling users to leverage them effortlessly without extra configuration.

In the following section, we will discuss each of the main features in depth.

### Persistence and retention

Request queues prioritize persistence, ensuring indefinite retention of your requests in named request queues, and for the data retention period in your subscription in unnamed request queues.
This capability facilitates incremental crawling, where you can append new URLs to the queue and resume from where you stopped in subsequent Actor runs.
Consider the scenario of scraping an e-commerce website with thousands of products. Incremental scraping allows you to scrape only the products
added since the last product discovery.

In the following code example, we demonstrate how to use the Apify SDK and Crawlee to create an incremental crawler that saves the title of each new found page in Apify Docs to a dataset.
By running this Actor multiple times, you can incrementally crawl the source website and save only pages added since the last crawl, as reusing a single request queue ensures that only URLs not yet visited are processed.

```ts
// Basic example of incremental crawling with Crawlee.
import { Actor } from 'apify';
import { CheerioCrawler, Dataset } from 'crawlee';

interface Input {
    startUrls: string[];
    persistRquestQueueName: string;
}

await Actor.init();

// Structure of input is defined in input_schema.json
const {
    startUrls = ['https://docs.apify.com/'],
    persistRequestQueueName = 'persist-request-queue',
} = (await Actor.getInput<Input>()) ?? ({} as Input);

// Open or create request queue for incremental scrape.
// By opening same request queue, the crawler will continue where it left off and skips already visited URLs.
const requestQueue = await Actor.openRequestQueue(persistRequestQueueName);

const proxyConfiguration = await Actor.createProxyConfiguration();

const crawler = new CheerioCrawler({
    proxyConfiguration,
    requestQueue, // Pass incremental request queue to the crawler.
    requestHandler: async ({ enqueueLinks, request, $, log }) => {
        log.info('enqueueing new URLs');
        await enqueueLinks();

        // Extract title from the page.
        const title = $('title').text();
        log.info(`New page with ${title}`, { url: request.loadedUrl });

        // Save the URL and title of the loaded page to the output dataset.
        await Dataset.pushData({ url: request.loadedUrl, title });
    },
});

await crawler.run(startUrls);

await Actor.exit();
```

### Batch operations

Request queues support batch operations on requests to enqueue or retrieve multiple requests in bulk, to cut down on network latency and enable easier parallel processing of requests.
You can find the batch operations in the [Apify API](https://docs.apify.com/api/v2#/reference/request-queues/batch-request-operations), as well in the Apify API client for [JavaScript](https://docs.apify.com/api/client/js/reference/class/RequestQueueClient#batchAddRequests) and [Python](https://docs.apify.com/api/client/python/reference/class/RequestQueueClient#batch_add_requests).

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
const { ApifyClient } = require('apify-client');

const client = new ApifyClient({
    token: 'MY-APIFY-TOKEN',
});

const requestQueueClient = client.requestQueue('my-queue-id');

// Add multiple requests to the queue
await requestQueueClient.batchAddRequests([
    {
        url: 'http://example.com/foo',
        uniqueKey: 'http://example.com/foo',
        method: 'GET',
    },
    {
        url: 'http://example.com/bar',
        uniqueKey: 'http://example.com/bar',
        method: 'GET',
    },
]);

// Remove multiple requests from the queue
await requestQueueClient.batchDeleteRequests([
    { uniqueKey: 'http://example.com/foo' },
    { uniqueKey: 'http://example.com/bar' },
]);
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify_client import ApifyClient

apify_client = ApifyClient('MY-APIFY-TOKEN')

request_queue_client = apify_client.request_queue('my-queue-id')

# Add multiple requests to the queue
request_queue_client.batch_add_requests([
    {'url': 'http://example.com/foo', 'uniqueKey': 'http://example.com/foo', 'method': 'GET'},
    {'url': 'http://example.com/bar', 'uniqueKey': 'http://example.com/bar', 'method': 'GET'},
])

# Remove multiple requests from the queue
request_queue_client.batch_delete_requests([
    {'uniqueKey': 'http://example.com/foo'},
    {'uniqueKey': 'http://example.com/bar'},
])
```

</TabItem>
</Tabs>

### Distributivity

Request queue includes a locking mechanism to avoid concurrent processing of one request by multiple clients (for example Actor runs).
You can lock a request so that no other clients receive it when they fetch the queue head, with an expiration period on the lock so that requests which fail processing are eventually unlocked and retried.

This feature is seamlessly integrated into Crawlee, requiring minimal extra setup. By default, requests are locked for the same duration as the timeout for processing requests in the crawler ([`requestHandlerTimeoutSecs`](https://crawlee.dev/api/next/basic-crawler/interface/BasicCrawlerOptions#requestHandlerTimeoutSecs)).
If the Actor processing the request fails, the lock expires, and the request is processed again eventually. For more details, refer to the [Crawlee documentation](https://crawlee.dev/docs/next/experiments/experiments-request-locking).

In the following example, we demonstrate how we can use locking mechanisms to avoid concurrent processing of the same request.

```js
import { Actor, ApifyClient } from 'apify';

await Actor.init();

const client = new ApifyClient({
    token: 'MY-APIFY-TOKEN',
});

// Creates a new request queue.
const requestQueue = await client.requestQueues().getOrCreate('example-queue');

// Creates two clients with different keys for the same request queue.
const requestQueueClientOne = client.requestQueue(requestQueue.id, {
    clientKey: 'requestqueueone',
});
const requestQueueClientTwo = client.requestQueue(requestQueue.id, {
    clientKey: 'requestqueuetwo',
});

// Adds multiple requests to the queue.
await requestQueueClientOne.batchAddRequests([
    {
        url: 'http://example.com/foo',
        uniqueKey: 'http://example.com/foo',
        method: 'GET',
    },
    {
        url: 'http://example.com/bar',
        uniqueKey: 'http://example.com/bar',
        method: 'GET',
    },
    {
        url: 'http://example.com/baz',
        uniqueKey: 'http://example.com/baz',
        method: 'GET',
    },
    {
        url: 'http://example.com/qux',
        uniqueKey: 'http://example.com/qux',
        method: 'GET',
    },
]);

// Locks the first two requests at the head of the queue.
const processingRequestsClientOne = await requestQueueClientOne.listAndLockHead(
    {
        limit: 2,
        lockSecs: 60,
    },
);

// Other clients cannot list and lock these requests; the listAndLockHead call returns other requests from the queue.
const processingRequestsClientTwo = await requestQueueClientTwo.listAndLockHead(
    {
        limit: 2,
        lockSecs: 60,
    },
);

// Checks when the lock will expire. The locked request will have a lockExpiresAt attribute.
const theFirstRequestLockedByClientOne = processingRequestsClientOne.items[0];
const requestLockedByClientOne = await requestQueueClientOne.getRequest(
    theFirstRequestLockedByClientOne.id,
);
console.log(`Request locked until ${requestLockedByClientOne?.lockExpiresAt}`);

// Other clients cannot modify the lock; attempting to do so will throw an error.
try {
    await requestQueueClientTwo.prolongRequestLock(
        theFirstRequestLockedByClientOne.id,
        { lockSecs: 60 },
    );
} catch (err) {
    // This will throw an error.
}

// Prolongs the lock of the first request or unlocks it.
await requestQueueClientOne.prolongRequestLock(
    theFirstRequestLockedByClientOne.id,
    { lockSecs: 60 },
);
await requestQueueClientOne.deleteRequestLock(
    theFirstRequestLockedByClientOne.id,
);

// Cleans up the queue.
await requestQueueClientOne.delete();

await Actor.exit();
```

A detailed tutorial on how to process one request queue with multiple Actor runs can be found in [Academy tutorials](https://docs.apify.com/academy/node-js/multiple-runs-scrape).

## Sharing

You can grant [access rights](../collaboration/index.md) to your request queue through the **Share** button under the **Actions** menu. For more details check the [full list of permissions](../collaboration/list_of_permissions.md).

### Sharing request queues between runs {#sharing-request-queues-between-runs}

You can access a request queue from any [Actor](../actors/index.mdx) or [task](../actors/running/tasks.md) run as long as you know its _name_ or _ID_.

To access a request queue from another run using the [Apify SDK](/sdk), open it using the same method like you would do with any other request queue.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();

const otherQueue = await Actor.openRequestQueue('old-queue');
// ...

await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        other_queue = await Actor.open_request_queue(name='old-queue')
        # ...
```

</TabItem>
</Tabs>

In the [JavaScript API client](/api/client/js/reference/class/RequestQueueClient) as well as in [Python API client](/api/client/python/reference/class/RequestQueueClient), you can access a request queue using its respective client. Once you've opened the request queue, you can use it in your crawler or add new requests like you would do with a queue from your current run.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
const otherQueueClient = apifyClient.requestQueue('jane-doe/old-queue');
```

</TabItem>
<TabItem value="Python" label="Python">

```python
other_queue_client = apify_client.request_queue('jane-doe/old-queue')
```

</TabItem>
</Tabs>

The same applies for the [Apify API](#apify-api) - you can use [the same endpoints](#apify-api) as you would normally do.

Check out the [Storage overview](/platform/storage#sharing-storages-between-runs) for details on sharing storages between runs.

## Limits

- The maximum length for request queue name is 63 characters.

### Rate limiting {#rate-limiting}

When managing request queues via [API](/api/v2#/reference/request-queues/put-items),
CRUD ([add](/api/v2#/reference/request-queues/request-collection/add-request),
[get](/api/v2#/reference/request-queues/request-collection/get-request),
[update](/api/v2#/reference/request-queues/request-collection/update-request),
[delete](/api/v2#/reference/request-queues/request-collection/delete-request))
operation requests are limited to _200 requests per second_ per request queue. This helps protect Apify servers from being overloaded.

All other request queue API [endpoints](/api/v2#/reference/request-queues) are limited to _30 requests per second_ per request queue.

Check out the [API documentation](/api/v2#/introduction/rate-limiting) for more information and guidance on actions to take if you exceed these rate limits.
