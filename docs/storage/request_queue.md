---
title: Request queue
description: Documentation of Apify simple key-value store that enables storage of Actor inputs and results.
menuWeight: 6.3
---

# [](#request-queue)Request queue

The request queue is a storage type that enables the enqueueing and retrieval of requests (i.e. URLs with HTTP method and other parameters). This is useful not only for web crawling, but anywhere you need to process a high number of URLs and to be able to enqueue new links.

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

