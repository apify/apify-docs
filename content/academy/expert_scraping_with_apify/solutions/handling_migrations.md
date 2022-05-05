---
title: VI - Handling migrations
description: Get real-world experience of maintaining a stateful object stored in memory, which will be persisted through migrations and even graceful aborts.
menuWeight: 6
paths:
    - expert-scraping-with-apify/solutions/handling-migrations
---

# [](#handling-migrations) Handling migrations

Let's first head into our **demo-actor** and create a new file named **asinTracker.js** in the **src** folder. Within this file, we are going to build a utility class which will allow us to easily store, modify, persist, and log our tracked ASIN data.

Here's the skeleton of our class:

```JavaScript
// asinTracker.js
class ASINTracker {
    constructor() {
        this.state = {};

        // Log the state to the console every ten
        // seconds
        setInterval(() => console.log(this.state), 10000);
    }

    // Add an offer to the ASIN's offer count
    // If ASIN doesn't exist yet, set it to 0
    incrementASIN(asin) {
        if (!this.state[asin]) {
            this.state[asin] = 0;
            return;
        }

        this.state[asin]++;
    }
}

// It is only a utility class, so we will immediately
// create an instance of it and export that. We only
// need one instance for our use case.
module.exports = new ASINTracker();
```

There are multiple techniques for storing data in memory; however, this is the most modular way, as all state-persistence and modification logic will be held in this file.

Here is our updated **routes.js** file which is now utilizing this utility class to track the number of offers for each product ASIN:

```JavaScript
// routes.js
const { BASE_URL, OFFERS_URL, labels } = require('./constants');
const tracker = require('./asinTracker');

exports.handleStart = async ({ $, crawler: { requestQueue }, request }) => {
    const { keyword } = request.userData;

    const products = $('div > div[data-asin]:not([data-asin=""])');

    for (const product of products) {
        const element = $(product);
        const titleElement = $(element.find('.a-text-normal[href]'));

        const url = `${BASE_URL}${titleElement.attr('href')}`;

        // For each product, add it to the ASIN tracker
        // and initialize its collected offers count to 0
        tracker.incrementASIN(element.attr('data-asin'));

        await requestQueue.addRequest({
            url,
            userData: {
                label: labels.PRODUCT,
                data: {
                    title: titleElement.first().text().trim(),
                    asin: element.attr('data-asin'),
                    itemUrl: url,
                    keyword,
                },
            },
        });
    }
};

exports.handleProduct = async ({ $, crawler: { requestQueue }, request }) => {
    const { data } = request.userData;

    const element = $('div#productDescription');

    await requestQueue.addRequest({
        url: OFFERS_URL(data.asin),
        userData: {
            label: labels.OFFERS,
            data: {
                ...data,
                description: element.text().trim(),
            },
        },
    });
};

exports.handleOffers = async ({ $, request }, dataset) => {
    const { data } = request.userData;

    const { asin } = data;

    for (const offer of $('#aod-offer')) {
        // For each offer, add 1 to the ASIN's
        // offer count
        tracker.incrementASIN(asin);

        const element = $(offer);

        await dataset.pushData({
            ...data,
            sellerName: element.find('div[id*="soldBy"] a[aria-label]').text().trim(),
            offer: element.find('.a-price .a-offscreen').text().trim(),
        });
    }
};
```

## [](#persisting-state) Persisting state

The **persistState** event is automatically fired (by default) every 60 seconds by the Apify SDK while the actor is running, and is also fired when the **migrating** event occurs.

In order to persist our ASIN tracker object, let's use the `Apify.events.on` function to listen for the **persistState** event and store it in the key-value store each time it is emitted.

```JavaScript
// asinTracker.js
const Apify = require('apify');
// We've updated our constants.js file to include the name
// of this new key in the key-value store
const { ASIN_TRACKER } = require('./constants');

class ASINTracker {
    constructor() {
        this.state = {};

        Apify.events.on('persistState', async () => {
            await Apify.setValue(ASIN_TRACKER, this.state);
        });

        setInterval(() => console.log(this.state), 10000);
    }

    incrementASIN(asin) {
        if (!this.state[asin]) {
            this.state[asin] = 0;
            return;
        }

        this.state[asin]++;
    }
}

module.exports = new ASINTracker();
```

## [](#handling-resurrections) Handling resurrections

Great! So now our state will be persisted every 60 seconds in the key-value store. However, we're not done. Let's say that the actor migrates and is resurrected. We never actually update the `state` variable of our `ASINTracker` class with the state stored in the key-value store, so as our code currently stands, we still don't support state-persistence on migrations.

In order to fix this, let's create a method called `initialize` which will be called at the very beginning of the actor's run, and will check the key-value store for a previous state under the key **ASIN-TRACKER**. If a previous state does live there, then it will update the class' `state` variable with the value read from the key-value store:

```JavaScript
// asinTracker.js
const Apify = require('apify');
const { ASIN_TRACKER } = require('./constants');

class ASINTracker {
    constructor() {
        this.state = {};

        Apify.events.on('persistState', async () => {
            await Apify.setValue(ASIN_TRACKER, this.state);
        });

        setInterval(() => console.log(this.state), 10000);
    }

    async initialize() {
        // Read the data from the key-value store. If it
        // doesn't exist, it will be undefined
        const data = await Apify.getValue(ASIN_TRACKER);

        // If the data does exist, replace the current state
        // (initialized as an empty object) with the data
        if (data) this.state = data;
    }

    incrementASIN(asin) {
        if (!this.state[asin]) {
            this.state[asin] = 0;
            return;
        }

        this.state[asin]++;
    }
}

module.exports = new ASINTracker();
```

We'll now call this function at the top level of the `Apify.main` function in **main.js** to ensure it is the first thing that gets called when the actor starts up:

```JavaScript
// main.js

// ...
const tracker = require('./src/asinTracker');

const { log } = Apify.utils;

Apify.main(async () => {
    await tracker.initialize();
// ...
```

That's everything! Now, even if the actor migrates (or is gracefully aborted then resurrected), this `state` object will always be persisted.

## [](#quiz-answers) Quiz answers 📝

**Q: Actors have an option the Settings tab to Restart on error. Would you use this feature for regular actors? When would you use this feature?**

**A:** It's not best to use this option by default. If it fails, there must be reason, which would need to be thought through first - meaning that the edge case of failing should be handled when resurecting the actor. State should be persisted beforehand.

**Q: Migrations happen randomly, but by [aborting gracefully](https://docs.apify.com/actors/running#aborting-runs), you can simulate a similar situation. Try this out on the platform and observe what happens. What changes occur, and what remains the same for the restarted actor's run?**

**A:** After aborting or throwing an error mid-process, it manages to start back from where it was upon ressurrection.

**Q: Why don't you (usually) need to add any special migration handling code for a standard crawling/scraping actor? Are there any features in the Apify SDK that handle this under the hood?**

**A:** Because Apify SDK handles all of the migration handling code for us. If you want to add custom migration-handling code, you can use `Apify.events` to listen for the `migrating` or `persistState` events to save the current state in key-value store (or elsewhere).

**Q: How can you intercept the migration event? How much time do you have after this event happens and before the actor migrates?**

**A:** By using the `Apify.events.on` function. You have a maximum of a few seconds before shutdown after the `migrating` event has been fired.

**Q: When would you persist data to the default key-value store instead of to a named key-value store?**

**A:** Persisting data to the default key-vsalue store would help when handling an actor's run state or with storing metadata about the run (suchs results, miscellaneous files, or logs). Using a named key-value store allows you to persist data at the account level to handle data across multiple actor runs.

## [](#wrap-up) Wrap up

In this activity, we learned how to persist custom values on an interval as well as after actor migrations by using the `persistState` event and the key-value store. With this knowledge, you can safely increase your actor's performance by storing data in variables then pushing them to the dataset periodically/at the end of the actor's run as opposed to pushing data immediately after it's been collected.

One important thing to note is that this workflow can be used to replace the usage of `userData` to pass data between requests, as it allows for the creation of a "global store" which all requests have access to at any time.
