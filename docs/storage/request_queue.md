---
title: Request queue
description: Documentation of Request queues, which allow you to queue URLs for your crawler to visit.
menuWeight: 6.3
paths:
    - storage/request-queue
---

# [](#request-queue)Request queue

Request queues enable you to enqueue and retrieve requests such as URLs with [HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) and other parameters. They are useful not only in web crawling, but anywhere you need to process a high number of URLs and enqueue new links.

Request queue storage supports both breadth-first and depth-first crawling orders, as well as custom data attributes. It allows you to query whether specific URLs were already found, push new URLs to the queue and fetch the next URLs to process.

> Named request queues are retained indefinitely. <br/>
> Unnamed request queues expire after 7 days unless otherwise specified.<br/>
> [Learn about named and unnamed stores]({{@link storage.md#data-retention}})

There are four ways to access your request queues:

* [Apify app](https://my.apify.com/storage#/requestQueues) - provides an easy-to-understand interface ([more details](#apify-app))
* [Apify software development kit (SDK)](https://sdk.apify.com/docs/guides/data-storage#request-queue) - when building your own Apify actor ([more details](#apify-sdk))
* [JavaScript API client](https://docs.apify.com/apify-client-js#ApifyClient-requestQueues) - to access your request queues from outside the Apify platform ([more details](#javascript-api-client))
* [Apify API](https://docs.apify.com/api/v2#/reference/request-queues) - for accessing your request queues programmatically ([more details](#apify-api))


## Basic usage

### Apify app

In the [Apify app](https://my.apify.com), you can view your request queues in the [Storage](https://my.apify.com/storage) section under the [Request queues](https://my.apify.com/storage#/requestQueues) tab.

Only named request queues are displayed by default. Select the `Include unnamed request queues` checkbox to display all of your queues.

![Request queues in app]({{@asset storage/images/request-queue-app.png}})

To view a request queue, click on its `Queue ID`.
In the detail page, under the `Settings` tab, you can update the queue's name (and, in turn, its
[retention period]({{@link storage.md#data-retention}})) and
[access rights]({{@link access_rights.md}}).
The API tab allows you to view and test a queue's [API endpoints](https://docs.apify.com/api/v2#/reference/request-queues).

![Request queues detail]({{@asset storage/images/request-queue-detail.png}})

### Apify SDK

If you are building an [Apify actor]({{@link actors.md}}), you will be using the [Apify software development kit (SDK)](https://sdk.apify.com).
In the [Apify SDK](https://sdk.apify.com/docs/guides/data-storage#request-queue), the key-value store is represented by the
[`RequestQueue`](https://sdk.apify.com/docs/guides/data-storage#request-queue) class.

You can use the `RequestQueue` class to specify whether your data is [stored locally or in the Apify cloud](https://sdk.apify.com/docs/api/request-queue), enqueue new URLs
([see example]((https://sdk.apify.com/docs/examples/puppeteer-crawler))),
and [manage your existing queues](https://sdk.apify.com/docs/api/request-queue#requestqueueaddrequestrequest-options).

Each actor run is associated with the default request queue, which is created for the actor run, when the first request is added to it. Typically, it is used to store URLs to crawl in the specific actor run, however its usage is optional.

You can also create `named queues` which can be shared between actors or between actor runs.

If you are storing your data locally, you can find your request queue at the following location.

    {APIFY_LOCAL_STORAGE_DIR}/request_queues/{QUEUE_ID}/{STATE}/{NUMBER}.json

> The default request queue's ID is `default`. Each request in the queue is stored as a separate JSON file, where {STATE} is either `handled` or `pending`, and {NUMBER} is an integer indicating the request's position in the queue.

To **open a request queue**, use the `Apify.openRequestQueue()` [method](https://sdk.apify.com/docs/api/apify#apifyopenrequestqueuequeueidorname-options).

    // Import the Apify SDK into your project
    const Apify = require('apify');

    // The main function, which performs the actor's job
    // and terminates the process when it is finished
    Apify.main(async () => {

        // Open the default request queue associated with
        // the actor run
        const queue = await Apify.openRequestQueue();

        // Open the "my-queue" request queue
        const queueWithName = await Apify.openRequestQueue('my-queue');
    });

Once a queue is open, you can manage it using the following methods. For a full list of methods, see the Apify SDK's [API reference](https://sdk.apify.com/docs/api/request-queue).

    // Enqueue requests
    await queue.addRequest({ url: 'http://example.com/aaa' });
    await queue.addRequest(
        { url: 'http://example.com/foo/bar' },
        { forefront: true }
    );
    
    // Get the next request from queue
    const request1 = await queue.fetchNextRequest();
    const request2 = await queue.fetchNextRequest();

    // Get a specific request
    const request22 = await queue.getRequest('request-22');

    // Reclaim a failed request back to the queue
    // and crawl it again
    await queue.reclaimRequest(request2);

    // Remove a queue
    await queue.drop();

For more information on managing your request queues with the Apify SDK, see the SDK [documentation](https://sdk.apify.com/docs/guides/data-storage#request-queue) and [API reference](https://sdk.apify.com/docs/api/request-queue).

### JavaScript API client

Apify's [JavaScript API client](https://docs.apify.com/apify-client-js#ApifyClient-requestQueues) (`apify-client`) allows you to access your key-value stores from outside the Apify platform (e.g. from a Node.js application).

For help with setting up the JavaScript API client, see the Storage documentation's [overview page](https://docs.apify.com/storage/#setting-up-the-javascript-api-client).

After importing the `apify-client` package into your application and creating an instance of it, save it to a variable for easier access.

    // Save your request queues to a variable for easier access
    const requestQueues = apifyClient.requestQueues;

You can then get or create new queues, retrieve existing requests or enqueue new URLs. For a full list of options, see the [JavaScript API client's](https://docs.apify.com/apify-client-js#ApifyClient-requestQueues) documentation.

    // Get the 'my-queue' request queue and set it as the default
    // to be used in the following commands
    const queue = await requestQueues.getOrCreateQueue({
        queueName: 'my-queue',
    });
    apifyClient.setOptions({ queueId: queue.id });

    // Add a request to the default queue
    await requestQueues.addRequest({ 
        url: 'http://example.com',
        uniqueKey: 'http://example.com'
    });

    // Add a request to 'my-queue'
    await requestQueues.addRequest(
        queueId='my-queue',
        {
            url: 'http://example.com/a/b',
            uniqueKey: 'http://example.com/a/b', 
        }
    );

    // Fetch unhandled requets from queue.
    const [request1, request2] = await requestQueues.queryQueueHead();

    // Mark request as handled.
    request1.handledAt = new Date();
    await requestQueues.updateRequest(request1);

For more information on managing your request queues using the JavaScript API client, see its [documentation](https://docs.apify.com/apify-client-js#ApifyClient-requestQueues).

## Limits

ONLY ONE ACTOR CAN PROCESS ONE QUEUE AT ONE TIME - THEY CAN'T BE PROCESSING IT CONCURRENTLY

CAN HAVE MULTIPLE ACTORS PUSHING TO SAME QUEUE, BUT ONLY ONE CAN PROCESS IT 