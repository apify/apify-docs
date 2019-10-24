---
title: Request queue
description: Documentation of Apify&#x27;s simple key-value store that enables storage of Actor inputs and results.
menuWeight: 6.3
---

### [](#queue)Request queue

The request queue is a storage type that enables the enqueueing and retrieval of requests (i.e. URLs with HTTP method and other parameters). This is useful not only for web crawling, but anywhere you need to process a high number of URLs and to be able to enqueue new links.

#### [](#queue-basic)Basic usage

Each actor run is assigned own request queue, created when the first request is added to it. The ID of this request queue is available under `run.defaultRequestQueueId`. You can also create a named queue which can be shared between actors or between actor runs.

To open a request queue, use `Apify.openRequestQueue()` [[see docs](https://sdk.apify.com/docs/api/apify#module_Apify.openRequestQueue)].

    const Apify = require('apify');

    Apify.main(async () => {
        // Open default request queue of the run:
        const queue1 = await Apify.openRequestQueue();

        // Open request queue with name "my-queue":
        const queue2 = await Apify.openRequestQueue('my-queue');
    });

If queue is opened then you can use it:

    // Add requests to queue
    await queue.addRequest(new Apify.Request({ url: 'http://example.com/aaa'});
    await queue.addRequest(new Apify.Request({ url: 'http://example.com/bbb'});
    await queue.addRequest(new Apify.Request({ url: 'http://example.com/foo/bar'}, { forefront: true });

    // Get requests from queue
    const request1 = queue.fetchNextRequest();
    const request2 = queue.fetchNextRequest();
    const request3 = queue.fetchNextRequest();

    // Mark some of them as handled
    queue.markRequestHandled(request1);

    // If processing fails then reclaim it back to the queue
    queue.reclaimRequest(request2);

#### [](#queue-api-client)API and Javascript client

The request queue provides a [HTTP API](https://apify.com/docs/api/v2#/reference/request-queues) to manage queues and to add/retrieve requests. If you are developing a Node.js application, then you can also use the [Apify JavaScript client](https://apify.com/docs/api/apify-client-js/latest#ApifyClient-requestQueues).
