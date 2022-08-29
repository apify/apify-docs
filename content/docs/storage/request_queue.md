---
title: Request queue
description: Queue URLs for an actor to visit in its run. Learn how to share your queues between actor runs. Access and manage request queues from Apify Console or via API.
menuWeight: 9.3
paths:
    - storage/request-queue
---

# [](#request-queue) Request queue

Request queues enable you to enqueue and retrieve requests such as URLs with an [HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) and other parameters. They are useful not only in web crawling, but anywhere you need to process a high number of URLs and enqueue new links.

Request queue storage supports both breadth-first and depth-first crawling orders, as well as custom data attributes. It allows you to query whether specific URLs were already found, push new URLs to the queue and fetch the next URLs to process.

> Named request queues are retained indefinitely. <br/>
> Unnamed request queues expire after 7 days unless otherwise specified.<br/>
> [Learn about named and unnamed queues.]({{@link storage.md#named-and-unnamed-storages}})

## [](#basic-usage) Basic usage

There are five ways to access your request queues:

* [Apify Console](https://console.apify.com/storage?tab=requestQueues) - provides an easy-to-understand interface [[details](#apify-console)].
* [Apify SDK](https://sdk.apify.com/docs/guides/request-storage#request-queue) - when building your own Apify actor [[details](#apify-sdk)].
* [JavaScript API client](apify-client-js#requestqueueclient) - to access your request queues from any Node.js application [[details](#javascript-api-client)].
* [Python API client](apify-client-python#requestqueueclient) - to access your request queues from any Python application [[details](#python-api-client)].
* [Apify API](/api/v2#/reference/request-queues) - for accessing your request queues programmatically [[details](#apify-api)].

### [](#apify-console) Apify Console

In [Apify Console](https://console.apify.com), you can view your request queues in the [Storage](https://console.apify.com/storage) section under the [Request queues](https://console.apify.com/storage?tab=requestQueues) tab.

Only named request queues are displayed by default. Select the **Include unnamed request queues** checkbox to display all of your queues.

![Request queues in app]({{@asset storage/images/request-queue-app.webp}})

To view a request queue, click on its **Queue ID**.
Under the **Settings** tab, you can update the queue's name (and, in turn, its
[retention period]({{@link storage.md#data-retention}})) and [access rights]({{@link access_rights.md}}).
Click on the `API` button to view and test a queue's [API endpoints](https://docs.apify.com/api/v2#/reference/request-queues).

![Request queues detail]({{@asset storage/images/request-queue-detail.webp}})

### [](#apify-sdk) Apify SDK

If you are building an [Apify actor]({{@link actors.md}}), you will be using the [Apify SDK](https://sdk.apify.com).
In the [Apify SDK](https://sdk.apify.com/docs/guides/request-storage#request-queue), the request queue is represented by the
[`RequestQueue`](https://sdk.apify.com/api/apify/class/RequestQueue) class.

You can use the `RequestQueue` class to specify whether your data is stored locally or in the Apify cloud and [enqueue new URLs](https://sdk.apify.com/api/apify/class/RequestQueue#addRequests).

Each actor run is associated with the default request queue, which is created for the actor run when the first request is added to it. Typically, it is used to store URLs to crawl in the specific actor run, however its usage is optional.

You can also create **named queues** which can be shared between actors or between actor runs.

If you are storing your data locally, you can find your request queue at the following location.

```text
{APIFY_LOCAL_STORAGE_DIR}/request_queues/{QUEUE_ID}/{ID}.json
```

The default request queue's ID is **default**. Each request in the queue is stored as a separate JSON file, where {ID} is a request ID.

To **open a request queue**, use the [`Actor.openRequestQueue()`](https://sdk.apify.com/api/apify/class/Actor#openRequestQueue) method.

```js
// Import the Apify SDK into your project
import { Actor } from 'apify';

await Actor.init();
// ...

// Open the default request queue associated with
// the actor run
const queue = await Actor.openRequestQueue();

// Open the 'my-queue' request queue
const queueWithName = await Actor.openRequestQueue('my-queue');

// ...
await Actor.exit();
```

Once a queue is open, you can manage it using the following methods. See the `RequestQueue` class's [API reference](https://sdk.apify.com/api/apify/class/RequestQueue) for the full list.

```js
// Import the Apify SDK into your project
import { Actor } from 'apify';

await Actor.init();
// ...

const queue = await Actor.openRequestQueue();

// Enqueue requests
await queue.addRequests([{ url: 'http://example.com/aaa' }]);
await queue.addRequests([
    'http://example.com/foo',
    'http://example.com/bar',
], { forefront: true });

// Get the next request from queue
const request1 = await queue.fetchNextRequest();
const request2 = await queue.fetchNextRequest();

// Get a specific request
const specificRequest = await queue.getRequest('shi6Nh3bfs3');

// Reclaim a failed request back to the queue
// and crawl it again
await queue.reclaimRequest(request2);

// Remove a queue
await queue.drop();

// ...
await Actor.exit();
```

See the [SDK documentation](https://sdk.apify.com/docs/guides/request-storage#request-queue) and the `RequestQueue` class's [API reference](https://sdk.apify.com/api/apify/class/RequestQueue) for details on managing your request queues with the Apify SDK.

### [](#javascript-api-client) JavaScript API client

Apify's [JavaScript API client](/apify-client-js#requestqueueclient) (`apify-client`) allows you to access your request queues from any Node.js application, whether it is running on the Apify platform or elsewhere.

After importing and initiating the client, you can save each request queue to a variable for easier access.

```js
const myQueueClient = apifyClient.requestQueue('jane-doe/my-request-queue');
```

You can then use that variable to [access the request queue's items and manage it](/apify-client-js#requestqueueclient).

See the [JavaScript API client documentation](/apify-client-js#requestqueueclient) for [help with setup](/apify-client-js#quick-start) and more details.

### [](#python-api-client) Python API client

Apify's [Python API client](/apify-client-python) (`apify-client`) allows you to access your request queues from any Python application, whether it is running on the Apify platform or elsewhere.

After importing and initiating the client, you can save each request queue to a variable for easier access.

```python
my_queue_client = apify_client.request_queue('jane-doe/my-request-queue')
```

You can then use that variable to [access the request queue's items and manage it](/apify-client-python#requestqueueclient).

See the [Python API client documentation](/apify-client-python#requestqueueclient) for [help with setup](/apify-client-python#quick-start) and more details.

### [](#apify-api) Apify API

The [Apify API](/api/v2#/reference/request-queues) allows you to access your request queues programmatically using [HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).

If you are accessing your datasets using the **username~store-name** [store ID format]({{@link storage.md#apify-api}}), you will need to use your [secret API token]({{@link tutorials/integrations.md#api-token}}). You can find the token (and your user ID) on the [Integrations](https://console.apify.com/account#/integrations) page of your Apify account.

> When providing your API authentication token, we recommend using the request's `Authorization` header, rather than the URL. ([More info](#introduction/authentication)).

To **get a list of your request queues**, send a GET request to the [Get list of request queues](/api/v2#/reference/request-queues/store-collection/get-list-of-request-queues) endpoint.

```text
https://api.apify.com/v2/request-queues
```

To **get information about a request queue** such as its creation time and item count, send a GET request to the [Get request queue](/api/v2#/reference/request-queues/queue/get-request-queue) endpoint.

```text
https://api.apify.com/v2/request-queues/{QUEUE_ID}
```

To **get a request from a queue**, send a GET request to the [Get request](/api/v2#/reference/request-queues/request/get-request) endpoint.

```text
https://api.apify.com/v2/request-queues/{QUEUE_ID}/requests/{REQUEST_ID}
```

To **add a request to a queue**, send a POST request with the request to be added as a JSON object in the request's payload to the [Add request](/api/v2#/reference/request-queues/request-collection/add-request) endpoint.

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

To **update a request in a queue**, send a PUT request with the request to update as a JSON object in the request's payload to the [Update request](/api/v2#/reference/request-queues/request/update-request) endpoint. In the payload, specify the request's ID and add the information you want to update.

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

See the [API documentation](/api/v2#/reference/request-queues) for a detailed breakdown of each API endpoint.

## [](#sharing) Sharing

You can invite other Apify users to view or modify your request queues using the [access rights]({{@link access_rights.md}}) system. See the [full list of permissions]({{@link access_rights/list_of_permissions.md#request-queue}}).

### [](#sharing-request-queues-between-runs) Sharing request queues between runs

You can access a request queue from any [actor]({{@link actors.md}}) or [task]({{@link actors/tasks.md}}) run as long as you know its **name** or **ID**.

To access a request queue from another run using the Apify SDK, open it using the [`Actor.openRequestQueue(queueIdOrName)`](https://sdk.apify.com/api/apify/class/Actor#openRequestQueue) method like you would do with any other queue.

```js
const otherQueue = await Actor.openRequestQueue('old-queue');
```

In the [JavaScript API client](/apify-client-js), you can access a request queue using [its client](/apify-client-js#requestqueueclient). Once you've opened the request queue, you can use it in your crawler or add new requests like you would do with a queue from your current run.

```js
const otherQueueClient = apifyClient.requestQueue('jane-doe/old-queue');
```

Likewise, in the [Python API client](/apify-client-python), you can access a request queue using [its client](/apify-client-python#requestqueueclient).

```python
other_queue_client = apify_client.request_queue('jane-doe/old-queue')
```

The same applies for the [Apify API](#apify-api) - you can use [the same endpoints](#apify-api) as you would normally do.

See the [Storage overview](https://docs.apify.com/storage#sharing-storages-between-runs) for details on sharing storages between runs.

## [](#limits) Limits

* While multiple actor or task runs can **add new requests** to a queue concurrently, only one run can **process a queue** at any one time.

* Request queue names can be up to 63 characters long.

### [](#rate-limiting) Rate limiting

When managing request queues via [API](/api/v2#/reference/request-queues/put-items),
CRUD ([add](/api/v2#/reference/request-queues/request-collection/add-request),
[get](/api/v2#/reference/request-queues/request-collection/get-request),
[update](/api/v2#/reference/request-queues/request-collection/update-request),
[delete](/api/v2#/reference/request-queues/request-collection/delete-request))
operation requests are limited to **200** per second per request queue. This helps protect Apify servers from being overloaded.

All other request queue API [endpoints](/api/v2#/reference/request-queues) are limited to **30** requests per second per request queue.

See the [API documentation](/api/v2#/introduction/rate-limiting) for details and to learn what to do if you exceed the rate limit.
