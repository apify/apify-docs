---
title: VII - Saving run stats
description: Implement the saving of general statistics about an Actor's run, as well as adding request-specific statistics to dataset items.
sidebar_position: 7
slug: /expert-scraping-with-apify/solutions/saving-stats
---

# Saving run stats {#saving-stats}

**Implement the saving of general statistics about an Actor's run, as well as adding request-specific statistics to dataset items.**

---

The code in this solution will be similar to what we already did in the **Handling migrations** solution; however, we'll be storing and logging different data. First, let's create a new file called **Stats.js** and write a utility class for storing our run stats:

```js
import Actor from 'apify';

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

        setInterval(() => console.log(this.state), 10000);
    }

    addError(url, errorMessage) {
        if (!this.state.errors?.[url]) this.state.errors[url] = [];
        this.state.errors[url].push(errorMessage);
    }

    success() {
        this.state.totalSaved += 1;
    }
}

module.exports = new Stats();
```

Cool, very similar to the **AsinTracker** class we wrote earlier. We'll now import **Stats** into our **main.js** file and initialize it along with the ASIN tracker:

```js
// ...
import Stats from './Stats.js';

await Actor.init();
await asinTracker.initialize();
await Stats.initialize();
// ...
```

## Tracking errors {#tracking-errors}

In order to keep track of errors, we must write a new function within the crawler's configuration called **errorHandler**. Passed into this function is an object containing an **Error** object for the error which occurred and the **Request** object, as well as information about the session and proxy which were used for the request.

```js
const crawler = new CheerioCrawler({
    proxyConfiguration,
    useSessionPool: true,
    sessionPoolOptions: {
        persistStateKey: 'AMAZON-SESSIONS',
        sessionOptions: {
            maxUsageCount: 5,
            maxErrorScore: 1,
        },
    },
    maxConcurrency: 50,
    requestHandler: router,
    // Handle all failed requests
    errorHandler: async ({ error, request }) => {
        // Add an error for this url to our error tracker
        Stats.addError(request.url, error?.message);
    },
});
```

## Tracking total saved {#tracking-total-saved}

Now, we'll increment our **totalSaved** count for every offer added to the dataset.

```js
router.addHandler(labels.OFFERS, async ({ $, request }) => {
    const { data } = request.userData;

    const { asin } = data;

    for (const offer of $('#aod-offer')) {
        tracker.incrementASIN(asin);
        // Add 1 to totalSaved for every offer
        Stats.success();

        const element = $(offer);

        await dataset.pushData({
            ...data,
            sellerName: element.find('div[id*="soldBy"] a[aria-label]').text().trim(),
            offer: element.find('.a-price .a-offscreen').text().trim(),
        });
    }
});
```

## Saving stats with dataset items {#saving-stats-with-dataset-items}

Still, in the **OFFERS** handler, we need to add a few extra keys to the items which are pushed to the dataset. Luckily, all of the data required by the task is accessible in the context object.

```js
router.addHandler(labels.OFFERS, async ({ $, request }) => {
    const { data } = request.userData;

    const { asin } = data;

    for (const offer of $('#aod-offer')) {
        tracker.incrementASIN(asin);
        // Add 1 to totalSaved for every offer
        Stats.success();

        const element = $(offer);

        await dataset.pushData({
            ...data,
            sellerName: element.find('div[id*="soldBy"] a[aria-label]').text().trim(),
            offer: element.find('.a-price .a-offscreen').text().trim(),
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

## Quiz answers {#quiz-answers}

**Q: Why might you want to store statistics about an Actor's run (or a specific request)?**

**A:** If certain types of requests are error-prone, you might want to save stats about the run to look at them later to either eliminate or better handle the errors. Things like **dateHandled** can be generally useful information.

**Q: In our Amazon scraper, we are trying to store the number of retries of a request once its data is pushed to the dataset. Where would you get this information? Where would you store it?**

**A:** This information is available directly on the request object under the property **retryCount**.

**Q: What is the difference between the `failedRequestHandler` and `errorHandler`?**

**A:** `failedRequestHandler` runs after a request has failed and reached its `maxRetries` count. `errorHandler` runs on every failure and retry.
