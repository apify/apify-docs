---
title: ApifyClient.webhookDispatches
description: Documentation of ApifyClient.webhookDispatches
menuWeight: 9
---

## ApifyClient.webhookDispatches

### Basic usage

Every method can be used as either promise or with callback. If your Node version supports await/async then you can await promise result.

    const ApifyClient = require('apify-client');

    const apifyClient = new ApifyClient({
     userId: 'jklnDMNKLekk',
     token: 'SNjkeiuoeD443lpod68dk',
    });

    // Awaited promise
    try {
         const dispatchesList = await apifyClient.webhookDispatches.listWebhookDispatches({});
         // Do something with the list ...
    } catch (err) {
         // Do something with error ...
    }

    // Promise
    apifyClient.webhookDispatches.listWebhookDispatches({})
    .then((webhooksList) => {
         // Do something with the list ...
    })
    .catch((err) => {
         // Do something with error ...
    });

    // Callback
    apifyClient.webhookDispatches.listWebhookDispatches({}, (err, webhooksList) => {
         // Do something with error or list ...
    });

### Methods (2)

#### getDispatch(options, callback opt) → {WebhookDispatch}



Gets webhook dispatch.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`webhookDispatchId`** - Webhook dispatch ID

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( WebhookDispatch )

#### listDispatches(options, callback opt) → {PaginationList}



By default, the objects are sorted by the startedAt field in ascending order, therefore you can use pagination to incrementally fetch all dispatches. To sort them in descending order, use desc: `true` parameter. The endpoint supports pagination using limit and offset parameters and it will not return more than 1000 array elements.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`offset`** ( Number ) <optional> - Number of array elements that should be skipped at the start. Defaults to `0`.
    *   **`limit`** ( Number ) <optional> - Maximum number of array elements to return. Defaults to `1000`.
    *   **`desc`** ( Boolean ) <optional> - If `true` then the objects are sorted by the startedAd field in descending order.

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( PaginationList )

