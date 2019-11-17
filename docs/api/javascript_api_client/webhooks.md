---
title: ApifyClient.webhooks
description: Documentation of ApifyClient.webhooks
menuWeight: 10
---

## ApifyClient.webhooks

### Basic usage

Every method can be used as either promise or with callback. If your Node version supports await/async then you can await promise result.

    const ApifyClient = require('apify-client');

    const apifyClient = new ApifyClient({
     userId: 'jklnDMNKLekk',
     token: 'SNjkeiuoeD443lpod68dk',
    });

    // Awaited promise
    try {
         const webhooks = await apifyClient.webhooks.listWebhooks({});
         // Do something with list ...
    } catch (err) {
         // Do something with error ...
    }

    // Promise
    apifyClient.webhooks.listWebhooks({})
    .then((webhooksList) => {
         // Do something with list ...
    })
    .catch((err) => {
         // Do something with error ...
    });

    // Callback
    apifyClient.webhooks.listWebhooks({}, (err, webhooksList) => {
         // Do something with error or list ...
    });

 

### Methods (6)

#### createWebhook(options, callback opt) → {Webhook}



Creates new webhook.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`webhook`** - Webhook

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( Webhook )

#### deleteWebhook(options, callback opt)



Deletes webhook.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`webhookId`** - Webhook ID

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:



#### getWebhook(options, callback opt) → {Webhook}



Gets webhook object.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`webhookId`** - Webhook ID

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( Webhook )

#### listDispatches(options, callback opt) → {PaginationList}



By default, the objects are sorted by the createdAt.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`webhookId`** - Webhook ID
    *   **`offset`** ( Number ) <optional> - Number of array elements that should be skipped at the start. Defaults to `0`.
    *   **`limit`** ( Number ) <optional> - Maximum number of array elements to return. Defaults to `1000`.
    *   **`desc`** ( Boolean ) <optional> - If `true` then the objects are sorted by the createdAt field in descending order.

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( PaginationList )

#### listWebhooks(options, callback opt) → {PaginationList}



By default, the objects are sorted by the createdAt field in ascending order, therefore you can use pagination to incrementally fetch all webhooks. To sort them in descending order, use desc: `true` parameter.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`offset`** ( Number ) <optional> - Number of array elements that should be skipped at the start. Defaults to `0`.
    *   **`limit`** ( Number ) <optional> - Maximum number of array elements to return. Defaults to `1000`.
    *   **`desc`** ( Boolean ) <optional> - If `true` then the objects are sorted by the createdAt field in descending order.

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( PaginationList )

#### updateWebhook(options, callback opt) → {Webhook}



Updates webhook.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`webhookId`** - Webhook ID
    *   **`webhook`** - Webhook

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( Webhook )

