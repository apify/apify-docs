---
title: ApifyClient.requestQueues
description: Documentation of ApifyClient.requestQueues
menuWeight: 6
---

## ApifyClient.requestQueues

### Basic usage

    const ApifyClient = require('apify-client');

    const apifyClient = new ApifyClient({
           userId: 'RWnGtczasdwP63Mak',
           token: 'f5J7XsdaKDyRywwuGGo9',
    });
    const requestQueues = apifyClient.requestQueues;

    // Get request queue with name 'my-queue' and set it as default
    // to be used in following commands.
    const queue = await requestQueues.getOrCreateQueue({
        queueName: 'my-queue',
    });
    apifyClient.setOptions({ queueId: queue.id });

    // Add requests to queue.
    await requestQueues.addRequest({ url: 'http://example.com', uniqueKey: 'http://example.com' });
    await requestQueues.addRequest({ url: 'http://example.com/a/b', uniqueKey: 'http://example.com/a/b' });

    // Fetch unhandled requets from queue.
    const [request1, request2] = await requestQueues.queryQueueHead();

    // Mark request as handled.
    request1.handledAt = new Date();
    await requestQueues.updateRequest(request1);

Every method can be used as either promise or with callback. If your Node version supports await/async then you can await promise result.

    // Awaited promise
    try {
         const queue = await requestQueues.getQueue(queueId);
         // Do something with the queue ...
    } catch (err) {
         // Do something with error ...
    }

    // Promise
    requestQueues.getQueue(queueId)
    .then((queue) => {
         // Do something with queue ...
    })
    .catch((err) => {
         // Do something with error ...
    });

    // Callback
    requestQueues.getQueue(queueId, (err, queue) => {
         // Do something with error or queue ...
    });
    
### Methods (9)

#### addRequest (options, callback opt) → {[RequestOperationInfo](#RequestOperationInfo)}



Adds request to the queue. If request is already in the queue then returns info about existing request.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`queueId`** ( String ) - Unique queue ID
    *   **`request`** ( Object ) - Request object
    *   **`forefront`** ( Boolean ) <optional> - If yes then request will be enqueued to the begining of the queue and to the end of the queue otherwise.
    *   **`token`** ( String ) <optional> - Your API token at apify.com
    *   **`clientKey`** ( String ) <optional> - Unique ID identifying client accessing the request queue. This ID is used to identify how many clients used the queue. This ID must be a string with length between 1 and 32 characters.

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( [RequestOperationInfo](#RequestOperationInfo) )

#### deleteQueue (options, callback opt) → {*}



Deletes request queue.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`queueId`** ( String ) - Unique queue ID
    *   **`token`** ( String ) <optional> - Your API token at apify.com

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( * )

#### deleteRequest (options, callback opt) → {*}



Deletes request from queue.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`queueId`** ( String ) - Unique queue ID
    *   **`requestId`** ( String ) - Unique request ID
    *   **`token`** ( String ) <optional> - Your API token at apify.com
    *   **`clientKey`** ( String ) <optional> - Unique ID identifying client accessing the request queue. This ID is used to identify how many clients used the queue. This ID must be a string with length between 1 and 32 characters.

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( * )

#### getHead (options, callback opt) → {[QueueHead](#QueueHead)}



Returns given number of the first unhandled requests in he queue.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`queueId`** ( String ) - Unique queue ID
    *   **`limit`** ( Number) - Maximum number of the items to be returned.
    *   **`token`** ( String ) <optional> - Your API token at apify.com
    *   **`clientKey`** ( String ) <optional> - Unique ID identifying client accessing the request queue. This ID is used to identify how many clients used the queue. This ID must be a string with length between 1 and 32 characters.

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( [QueueHead](#QueueHead) )

#### getOrCreateQueue (options, callback opt) → {RequestQueue}



Creates request queue of given name and returns it's object. If queue with given name already exists then returns it's object.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`queueName`** ( String ) - Custom unique name to easily identify the queue in the future.

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( RequestQueue )

#### getQueue (options, callback opt) → {RequestQueue}



Gets request queue.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`queueId`** ( String ) - Unique queue ID
    *   **`token`** ( String ) <optional> - Your API token at apify.com

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( RequestQueue )

#### getRequest (options, callback opt) → {Request}



Gets request from the queue.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`queueId`** ( String ) - Unique queue ID
    *   **`requestId`** ( String ) - Unique request ID
    *   **`token`** ( String ) <optional> - Your API token at apify.com

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( Request )

#### listQueues (options, callback opt) → {PaginationList}



Gets list of request queues.

By default, the objects are sorted by the createdAt field in ascending order, therefore you can use pagination to incrementally fetch all queues while new ones are still being created. To sort them in descending order, use desc: `true` parameter. The endpoint supports pagination using limit and offset parameters and it will not return more than 1000 array elements.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`offset`** ( Number) <optional> - Number of array elements that should be skipped at the start. Defaults to `0`.
    *   **`limit`** ( Number) <optional> - Maximum number of array elements to return. Defaults to `1000`.
    *   **`desc`** ( Boolean ) <optional> - If `true` then the objects are sorted by the startedAt field in descending order.
    *   **`unnamed`** ( Boolean ) <optional> - If `true` then also unnamed stores will be returned. By default only named stores are returned.

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( PaginationList )

#### updateRequest (options, callback opt) → {[RequestOperationInfo](#RequestOperationInfo)}



Updates request in the queue.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`queueId`** ( String ) - Unique queue ID
    *   **`request`** ( Object ) - Request object
    *   **`requestId`** ( String ) <optional> - Unique request ID
    *   **`forefront`** ( Boolean ) <optional> - If yes then request will be enqueued to the begining of the queue and to the end of the queue otherwise.
    *   **`token`** ( String ) <optional> - Your API token at apify.com
    *   **`clientKey`** ( String ) <optional> - Unique ID identifying client accessing the request queue. This ID is used to identify how many clients used the queue. This ID must be a string with length between 1 and 32 characters.

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( [RequestOperationInfo](#RequestOperationInfo) )

