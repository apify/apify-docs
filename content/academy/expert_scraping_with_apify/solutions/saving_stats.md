---
title: VIII - Saving run stats
description: Implement the saving of general statistics about an actor's run, as well as adding request-specific statistics to dataset items.
menuWeight: 8
paths:
    - expert-scraping-with-apify/solutions/saving-stats
---

# [](#saving-stats) Saving run stats

The code in this solution will be similar to what we already did in the **Handling migrations** solution; however, we'll be storing and logging different data. First, let's create a new file called **Stats.js** and write a utility class for storing our run stats:

```JavaScript
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

```JavaScript
// ...
import Stats from './Stats.js';

await Actor.init();
await asinTracker.initialize();
await Stats.initialize();
// ...
```

## [](#tracking-errors) Tracking errors

In order to keep track of errors, we must write a new function within the crawler's configuration called **failedRequestHandler**. Passed into this function is an object containing an **Error** object for the error which occurred and the **Request** object, as well as information about the session and proxy which were used for the request.

```JavaScript
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
    failedRequestHandler: async ({ error, request }) => {
        // Add an error for this url to our error tracker
        Stats.addError(request.url, error?.message);
    },
});
```

## [](#tracking-total-saved) Tracking total saved

Now, we'll just increment our **totalSaved** count for every offer added to the dataset.

```JavaScript
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

## [](#saving-stats-with-dataset-items) Saving stats with dataset items

Still in the **OFFERS** handler, we need to add a few extra keys to the items which are pushed to the dataset. Luckily, all of the data required by the task is easily accessible in the context object.

```JavaScript
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

## [](#quiz-answers) Quiz answers

**Q: Why might you want to store statistics about an actor's run (or a specific request)?**

**A:** If certain types of requests are error-prone, you might want to save stats about the run to look at them later to either eliminate or better handle the errors. Things like **dateHandled** can be generally useful information.

**Q: In our Amazon scraper, we are trying to store the number of retries of a request once its data is pushed to the dataset. Where would you get this information? Where would you store it?**

**A:** This information is available directly on the request object under the property **retryCount**.

**Q: We are building a new imaginary scraper for a website that sometimes displays captchas at unexpected times, rather than displaying the content we want. How would you keep a count of the total number of captchas hit for the entire run? Where would you store this data? Why?**

**A:** First, build a function that detects if the captcha has been hit. If so, it will throw an error and add to the **numberOfCaptchas** count. This data might be stored on a persisted state object to help better assess the anti-scraping mitigation techniques the scraper should be used.

**Q: Is storing these types of values necessary for every single actor?**

**A:** For small actors, it might be a waste of time to do this. For large-scale actors, it can be extremely helpful when debugging and most definitely worth the extra 10-20 minutes of development time. Usually though, the default statistics from the Crawlee and the SDK might be enough for simple run stats.

**Q: What is the difference between the `failedRequestHandler` and `errorHandler`?**

**A:** `failedRequestHandler` runs after a request has failed and reached it's `maxRetries` count. `errorHandler` runs on every failure and retry.
