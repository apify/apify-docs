---
title: How to retry failed requests
description: Learn how to resurrect your run but retrying only failed requests
sidebar_position: 6
slug: /api/retry-failed-requests
---

**Learn how to re-scrape only failed requests in your run.**

---

There are many reasons why requests for a scraper could fail. The most popular causes are different page layouts or proxy blocking issues ([check here on how to effectively analyze errors](https://docs.apify.com/academy/node-js/analyzing-pages-and-fixing-errors)). Both Apify and [Crawlee](https://crawlee.dev/) allow you to restart your scraper run from the point where it ended but there is no native functionality to re-scrape only failed requests. Usually, you also want to first analyze the problem, update the code and build it before trying again.

If you attempt to re-run an already finished run, it will likely immediately finish because all the requests in the [request queue](https://crawlee.dev/docs/3.7/guides/request-storage) are marked as handled. So you need to update the failed requests in the queue to be marked as pending again.

The additional complication is that the [Request](https://crawlee.dev/api/core/class/Request) object doesn't have anything like `isFailed` property, we have to approximate it using other fields. Fortunately, we can use the `errorMessages` and `retryCount` properties to identify failed requests. Unless the user explicitly overrode these properties, we can identify failed requests by having a larger amount of `errorMessages` than `retryCount`. That happens because the last error that doesn't cause a retry anymore is added to `errorMessages`.

A simplified code example can look like this:

```typescript
// The code is similar for both Crawlee-only but uses a different API
import { Actor } from 'apify';

const REQUEST_QUEUE_ID = 'pFCvCasdvsyvyZdfD'; // Replace with your valid request queue ID
const allRequests = [];
let exclusiveStartId = null;
// List all requests from the queue, we have to do it in a loop because the request queue list is paginated
for (; ;) {
    const { items: requests } = await Actor.apifyClient.requestQueue(REQUEST_QUEUE_ID).listRequests({ exclusiveStartId, limit: 1000 });
    for (const request of requests) {
        allRequests.push(requests);
    }
    // If we didn't get full 1000 requests, we have all and can finish the loop
    if (requests.length < 1000) {
        break;
    }

    // Otherwise, we need to set the exclusiveStartId to the last request id to get the next batch
    exclusiveStartId = requests[requests.length - 1].id;
}

console.log(`Loaded ${allRequests.length} requests from the queue`);

// Now we filter the failed requests
const failedRequests = allRequests.filter((request) => (request.errorMessages?.length || 0) > (request.retryCount || 0));

// We need to update them 1 by 1 to the pristine state
for (const request of failedRequests) {
    request.retryCount = 0;
    request.errorMessages = [];
    // This tells the request queue to handle it again
    request.handledAt = null;
    await Actor.apifyClient.requestQueue(REQUEST_QUEUE_ID).updateRequest(request);
}

// And now we can resurrect our scraper again, it will only process the failed requests
```

## Resurrect automatically with a free public Actor {#resurrect-automatically-with-a-free-public-actor}

Fortunately, you don't need to implement this code into your workflow. [Apify Store](https://apify.com/store) provides the [Rebirth Failed [Requests](https://apify.com/lukaskrivka/rebirth-failed-requests) actor ((that is [open-source](https://github.com/metalwarrior665/rebirth-failed-requests))) that does this and more. The actor can automatically scan multiple runs of your Actors based on filters like date started. It can also automatically resurrect the runs after renewing the failed requests. That means you will finish your scrape into the final successful state with a single click on the Run button.
