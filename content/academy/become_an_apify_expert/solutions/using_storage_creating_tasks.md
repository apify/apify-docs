---
title: Using storage & creating tasks
description: Follow along with step-by-step instructions on how to complete the task outlined in the previous lesson. Use different storage types, and create a task.
menuWeight: 4
paths:
    - become-an-apify-expert/solutions/using-storage-creating-tasks
---

# [](#using-storage-creating-tasks) Using storage & creating tasks

Last lesson, our task was outlined for us. In this lesson, we'll be completing that task by making our Amazon actor push to a **named dataset** and use the **default key-value store** to store the cheapest item found by the scraper. Finally, we'll create a task for the actor back on the Apify platform.

## [](#using-named-dataset) Using a named dataset

Something important to understand is that, in the Apify SDK, when you use `Apify.pushData()`, the data will always be pushed to the default dataset. To open up a named dataset, we'll use the `Apify.openDataset()` function:

```JavaScript
// main.js
Apify.main(async () => {
    const { keyword } = await Apify.getInput();

    // Open a dataset with a custom named based on the
    // keyword which was inputted by the user
    const dataset = await Apify.openDataset(`amazon-offers-${keyword.replace(' ', '-')}`);
// ...
```

If we remember correctly, we are pushing data to the dataset in the `handleOffers()` function we created in **routes.js**. Let's pass the `dataset` variable pointing to our named dataset into `handleOffers()` as an argument:

```JavaScript
// ...
case labels.OFFERS:
    await handleOffers(context, dataset);
    break;
}
// ...
```

Finally, let's modify the function to use the new `dataset` variable being passed to it rather than the `Apify` class:

```JavaScript
// Expect a second parameter, which will be a dataset
exports.handleOffers = async ({ $, request }, dataset) => {
    const { data } = request.userData;

    for (const offer of $('#aod-offer')) {
        const element = $(offer);

        // Replace "Apify" with the name of the second
        // parameter, in this case we called it "dataset"
        await dataset.pushData({
            ...data,
            sellerName: element.find('div[id*="soldBy"] a[aria-label]').text().trim(),
            offer: element.find('.a-price .a-offscreen').text().trim(),
        });
    }
};
```

That's it! Now, our actor will push its data to a dataset named **amazon-offers-KEYWORD**!

## [](#using-key-value-store) Using a key-value store

We now want to store the cheapest item in the default key-value store under a key named **CHEAPEST-ITEM**. The most efficient and practical way of doing this is by filtering through all of the new named dataset's items and pushing the cheapest one to the store.

Let's add the following code to the bottom of the actor, after **Crawl finished.** is logged to the console:

```Javascript
const cheapest = items.reduce((prev, curr) => {
    // If there is no previous offer price, or the previous is more
    // expensive, set the cheapest to our current item
    if (!prev?.offer || +prev.offer.slice(1) > +curr.offer.slice(1)) return curr;
    // Otherwise, keep our previous item
    return prev;
});

// Set the "CHEAPEST-ITEM" key in the key-value store to be the
// newly discovered cheapest item
await Apify.setValue(CHEAPEST_ITEM, cheapest);
```

You might have noticed that we are using a variable instead of a string for the key name in the key-value store. This is because we're using an exported variable from **constants.js** (which is best practice, as discussed in the [**Actor building** solution]({{@link become_an_apify_expert/solutions/actor_building.md}})). Here is what our **constants.js** file looks like:

```JavaScript
// constants.js
const BASE_URL = 'https://www.amazon.com';

const OFFERS_URL = (asin) => `${BASE_URL}/gp/aod/ajax/ref=auto_load_aod?asin=${asin}&pc=dp`;

const labels = {
    START: 'START',
    PRODUCT: 'PRODUCT',
    OFFERS: 'OFFERS',
};

const CHEAPEST_ITEM = 'CHEAPEST-ITEM';

module.exports = { BASE_URL, OFFERS_URL, labels, CHEAPEST_ITEM };
```

## [](#code-check-in) Code check-in

Just to ensure we're all on the same page, here is what the **main.js** file looks like now:

```JavaScript
// main.js
const Apify = require('apify');

const { handleStart, handleProduct, handleOffers } = require('./src/routes');
const { BASE_URL, labels, CHEAPEST_ITEM } = require('./src/constants');

const { log } = Apify.utils;

Apify.main(async () => {
    const { keyword } = await Apify.getInput();

    const dataset = await Apify.openDataset(`amazon-offers-${keyword.replace(' ', '-')}`);

    const requestList = await Apify.openRequestList('start-urls', [
        {
            url: `${BASE_URL}/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=${keyword}`,
            userData: {
                label: 'START',
                keyword,
            },
        },
    ]);

    const requestQueue = await Apify.openRequestQueue();
    const proxyConfiguration = await Apify.createProxyConfiguration({
        groups: ['RESIDENTIAL'],
    });

    const crawler = new Apify.CheerioCrawler({
        requestList,
        requestQueue,
        proxyConfiguration,
        useSessionPool: true,
        maxConcurrency: 50,
        handlePageFunction: async (context) => {
            const { label } = context.request.userData;

            switch (label) {
                default:
                    return log.info('Unable to handle this request');
                case labels.START:
                    await handleStart(context);
                    break;
                case labels.PRODUCT:
                    await handleProduct(context);
                    break;
                case labels.OFFERS:
                    await handleOffers(context, dataset);
                    break;
            }
        },
    });

    log.info('Starting the crawl.');
    await crawler.run();
    log.info('Crawl finished.');

    const { items } = await dataset.getData();

    const cheapest = items.reduce((prev, curr) => {
        if (!prev?.offer) return curr;
        if (+prev.offer.slice(1) > +curr.offer.slice(1)) return curr;
        return prev;
    });

    await Apify.setValue(CHEAPEST_ITEM, cheapest);
});
```

And here is **routes.js**:

```JavaScript
// routes.js
const { BASE_URL, OFFERS_URL, labels } = require('./constants');

exports.handleStart = async ({ $, crawler: { requestQueue }, request }) => {
    const { keyword } = request.userData;

    const products = $('div > div[data-asin]:not([data-asin=""])');

    for (const product of products) {
        const element = $(product);
        const titleElement = $(element.find('.a-text-normal[href]'));

        const url = `${BASE_URL}${titleElement.attr('href')}`;

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

    for (const offer of $('#aod-offer')) {
        const element = $(offer);

        await dataset.pushData({
            ...data,
            sellerName: element.find('div[id*="soldBy"] a[aria-label]').text().trim(),
            offer: element.find('.a-price .a-offscreen').text().trim(),
        });
    }
};
```

Don't forget to push your changes to Github using `git push origin MAIN_BRANCH_NAME` to see them on the Apify platform!

## [](#creating-task) Creating a task (It's easy!)

Back on the platform, on your actor's page, you can see a button in the top right hand corner that says **Create new task**:

![Create new task button]({{@asset become_an_apify_expert/solutions/images/create-new-task.webp}})

Then, configure the task to use **google pixel** as a keyword and click **Save**.

> You can also add a custom name and description for the task in the **Settings** tab!

![Creating a task]({{@asset become_an_apify_expert/solutions/images/creating-task.webp}})

After saving it, you'll be able to see the newly created task in the **Tasks** tab on the Apify Console. Go ahead and run it. Did it work?

## [](#quiz-answers) Quiz answers 📝

- What is the relationship between actors and tasks?

Tasks are pre-configured runs of actors. The configurations of an actor can be saved as a task so that it doesn't have to be manually configured every single time.

- What are the differences between default (unnamed) and named storage? Which one would you use for everyday usage?

Unnamed storage is persisted for only 7 days, while named storage is persisted indefinitely. For everyday usage, it is best to use default unnamed storages unless the data should explicitly be persisted for more than 7 days.

> With named storages, it's easier to verify that you're using the correct store, as they can be referred to by name rather than by an ID.

- What is data retention, and how does it work for all types of storages (default and named)?

Default/unnamed storages expire after 7 days unless otherwise specified. Named storages are retained indefinitely.


## [](#wrap-up) Wrap up

You've learned how to use the different storage options available on with Apify, the two different types of storages, as well as how to create tasks for actors.
