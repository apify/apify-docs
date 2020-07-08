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


## [](#basic-usage)Basic usage

Each actor run is assigned own request queue, created when the first request is added to it. The ID of this request queue is available under `run.defaultRequestQueueId`. You can also create a named queue which can be shared between actors or between actor runs.

To open a request queue, use `Apify.openRequestQueue()` [[see docs](https://sdk.apify.com/docs/api/apify#apifyopenrequestqueuequeueidorname-options)].

    const Apify = require('apify');

    Apify.main(async () => {
        // Open the default request queue associated with the actor run:
        const queue = await Apify.openRequestQueue();

        // Open a request queue with name "my-queue":
        const queueWithName = await Apify.openRequestQueue('my-queue');
    });

If queue is opened then you can use it:

    // Enqueue some requests
    await queue.addRequest({ url: 'http://example.com/aaa' });
    await queue.addRequest({ url: 'http://example.com/bbb' });
    await queue.addRequest({ url: 'http://example.com/foo/bar' }, { forefront: true });

    // Get requests from queue
    const request1 = await queue.fetchNextRequest();
    const request2 = await queue.fetchNextRequest();
    const request3 = await queue.fetchNextRequest();

    // Mark a request as handled
    await queue.markRequestHandled(request1);

    // If the processing of a request fails then reclaim it back to the queue, so that it's crawled again
    await queue.reclaimRequest(request2);

## [](#api-and-javascript-client)API and Javascript client

The request queue provides a [HTTP API](https://docs.apify.com/api/v2#/reference/request-queues) to manage queues and to add/retrieve requests. If you are developing a Node.js application, then you can also use the [Apify JavaScript client](https://docs.apify.com/api/apify-client-js/latest#ApifyClient-requestQueues).



## Limits

ONLY ONE ACTOR CAN PROCESS ONE QUEUE AT ONE TIME - THEY CAN'T BE PROCESSING IT CONCURRENTLY

CAN HAVE MULTIPLE ACTORS PUSHING TO SAME QUEUE, BUT ONLY ONE CAN PROCESS IT 