---
title: Saving run stats
description: Implement the saving of general statistics about an Actor's run, as well as adding request-specific statistics to dataset items.
sidebar_position: 7
sidebar_label: VII - Saving run stats
slug: /expert-scraping-with-apify/solutions/saving-stats
---

**Implement the saving of general statistics about an Actor's run, as well as adding request-specific statistics to dataset items.**

---

The code in this solution will be similar to what we already did in the **Handling migrations** solution; however, we'll be storing and logging different data. First, let's create a new file called **Stats.js** and write a utility class for storing our run stats:

```js
// Stats.js
import { Actor, log } from 'apify';

class Stats {
    constructor() {
        this.state = {
            errors: {},
            totalSaved: 0,
        };
    }

    async initialize() {
        const data = await Actor.getValue('STATS');

        if (data) this.state = data;

        Actor.on('persistState', async () => {
            await Actor.setValue('STATS', this.state);
        });

        setInterval(() => log.info('Stats', this.state), 10000);
    }

    addError(url, errorMessage) {
        if (!this.state.errors?.[url]) this.state.errors[url] = [];
        this.state.errors[url].push(errorMessage);
    }

    success() {
        this.state.totalSaved += 1;
    }
}

export const stats = new Stats();
```

Cool, very similar to the **ASINTracker** class we wrote earlier. We'll now import `stats` into our **main.js** file and initialize it along with the ASIN tracker. The starter's ESLint config sorts imports alphabetically, so the **Stats.js** import goes after **routes.js**:

```js
// main.js
import { CheerioCrawler } from '@crawlee/cheerio';
import { Actor, log } from 'apify';

import { tracker } from './asinTracker.js';
import { BASE_URL, labels } from './constants.js';
import { router } from './routes.js';
import { stats } from './Stats.js';

await Actor.init();
await tracker.initialize();
await stats.initialize();
// ...
```

## Tracking errors {#tracking-errors}

In order to keep track of errors, we must write a new function within the crawler's configuration called **errorHandler**. Crawlee calls it with two arguments. The first one is the crawling context, which contains the **Request** object, as well as information about the session and proxy which were used for the request. The second one is the **Error** object for the error which occurred.

Crawlee calls **errorHandler** only when it's going to retry the request. When the request fails for the last time, Crawlee calls **failedRequestHandler** instead, so to record every error, we need both:

```js
const crawler = new CheerioCrawler({
    proxyConfiguration,
    maxRequestRetries: 10,
    sessionPoolOptions: {
        sessionOptions: {
            maxUsageCount: 5,
            maxErrorScore: 1,
        },
    },
    requestHandler: router,
    // Handle failed requests which will be retried
    errorHandler: async ({ request }, error) => {
        // Add an error for this url to our error tracker
        stats.addError(request.url, error.message);
    },
    // Handle requests which failed for the last time
    failedRequestHandler: async ({ request }, error) => {
        stats.addError(request.url, error.message);
    },
});
```

## Tracking total saved {#tracking-total-saved}

Now, we'll increment our **totalSaved** count for every offer added to the dataset. The **OFFERS** handler lives in **routes.js**, so we need to import `stats` there as well:

```js
// routes.js

// ...
import { stats } from './Stats.js';

// ...

router.addHandler(labels.OFFERS, async ({ $, request, pushData }) => {
    const { data } = request.userData;

    if (!$('#aod-container').length) {
        throw new Error('Offers did not load, retrying');
    }

    for (const offer of $('#aod-pinned-offer, #aod-offer')) {
        const element = $(offer);
        const price = element.find('.apex-pricetopay-value').first().text().trim();

        if (!price) continue;

        tracker.incrementASIN(data.asin);
        // Add 1 to totalSaved for every offer
        stats.success();

        await pushData({
            ...data,
            sellerName: element.find('#aod-offer-soldBy [aria-label]').text().trim(),
            offer: price,
        });
    }
});
```

## Saving stats with dataset items {#saving-stats-with-dataset-items}

Still, in the **OFFERS** handler, we need to add a few extra keys to the items which are pushed to the dataset. Luckily, all of the data required by the task is accessible in the context object.

```js
router.addHandler(labels.OFFERS, async ({ $, crawler, request, pushData }) => {
    const { data } = request.userData;

    if (!$('#aod-container').length) {
        throw new Error('Offers did not load, retrying');
    }

    // The request queue gives us the number of pending requests
    const requestQueue = await crawler.getRequestQueue();

    for (const offer of $('#aod-pinned-offer, #aod-offer')) {
        const element = $(offer);
        const price = element.find('.apex-pricetopay-value').first().text().trim();

        if (!price) continue;

        tracker.incrementASIN(data.asin);
        // Add 1 to totalSaved for every offer
        stats.success();

        await pushData({
            ...data,
            sellerName: element.find('#aod-offer-soldBy [aria-label]').text().trim(),
            offer: price,
            // Store the handledAt date or current date if that is undefined
            dateHandled: request.handledAt || new Date().toISOString(),
            // Access the number of retries on the request object
            numberOfRetries: request.retryCount,
            // Grab the number of pending requests from the requestQueue
            currentPendingRequests: (await requestQueue.getInfo()).pendingRequestCount,
        });
    }
});
```

## Updating the dataset schema {#updating-the-dataset-schema}

The starter describes every field of the dataset items in **.actor/dataset_schema.json**. Let's add the three new fields to its `properties`:

```json
"dateHandled": { "type": "string", "description": "When the offer was scraped" },
"numberOfRetries": { "type": "integer", "description": "How many times the request was retried" },
"currentPendingRequests": { "type": "integer", "description": "Requests pending in the queue" }
```

Then run `apify validate-schema` to check that the schema is still valid. The **Overview** view in the same file only shows the fields listed in its `transformation.fields`, so if you want to see the new fields there, add them to that list as well.

## Quiz answers {#quiz-answers}

**Q: Why might you want to store statistics about an Actor's run (or a specific request)?**

**A:** If certain types of requests are error-prone, you might want to save stats about the run to look at them later to either eliminate or better handle the errors. Things like **dateHandled** can be generally useful information.

**Q: In our Amazon scraper, we are trying to store the number of retries of a request once its data is pushed to the dataset. Where would you get this information? Where would you store it?**

**A:** This information is available directly on the request object under the property **retryCount**.

**Q: What is the difference between the `failedRequestHandler` and `errorHandler`?**

**A:** `errorHandler` runs after every failed attempt which Crawlee will retry. `failedRequestHandler` runs instead of it when the request fails for the last time, after it has been retried `maxRequestRetries` times.
