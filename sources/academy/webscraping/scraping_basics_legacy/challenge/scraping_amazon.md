---
title: Scraping Amazon
description: Before you build your first web scraper with Crawlee, it is important to understand the concept of modularity in programming.
sidebar_position: 4
slug: /scraping-basics-javascript/legacy/challenge/scraping-amazon
noindex: true
---

import LegacyAdmonition from '../../scraping_basics/_legacy.mdx';

**Build your first web scraper with Crawlee. Let's extract product information from Amazon to give you an idea of what real-world scraping looks like.**

<LegacyAdmonition />

---

In our quick chat about modularity, we finished the code for the results page and added a request for each product to the crawler's **RequestQueue**. Here, we need to scrape the description, so it shouldn't be too hard:

```js
// routes.js

// ...

router.addHandler(labels.PRODUCT, async ({ $ }) => {
    const element = $('div#productDescription');

    const description = element.text().trim();

    console.log(description); // works!
});
```


Great! But where do we go from here? We need to visit the product page and scrape the offer from there.

:::note Why only one offer per product?

Amazon product pages list a single featured offer in their static HTML. The full list of sellers is loaded separately by JavaScript after the page loads. CheerioCrawler can't see the list because it only fetches the raw HTML, without running JavaScript.

If you need all seller offers, you have to use [PlaywrightCrawler](../../puppeteer_playwright/index.md), which runs a real browser and can wait for that content to load. For this course, scraping the featured offer is enough to cover the key concepts.

:::

We'll add a request to the product page for each product:

```js
// routes.js

// ...

router.addHandler(labels.PRODUCT, async ({ $, crawler, request }) => {
    const { data } = request.userData;

    const description = $('div#productDescription').text().trim();

    await crawler.addRequests([{
        url: `${BASE_URL}/dp/${data.asin}?th=1&psc=1`,
        label: labels.OFFERS,
        userData: {
            data: {
                ...data,
                description,
            },
        },
    }]);
});
```

Then we handle it in the OFFERS handler:

```js
// routes.js

router.addHandler(labels.OFFERS, async ({ $, request }) => {
    const { data } = request.userData;

    const price = $('.a-price .a-offscreen').first().text().trim();
    const sellerName = $('#sellerProfileTriggerId, #merchant-info a').first().text().trim();

    await Dataset.pushData({
        ...data,
        sellerName,
        offer: price,
    });
});
```

## Final code {#final-code}

That should be it! Let's make sure we've all got the same code:

```js
// constants.js
export const BASE_URL = 'https://www.amazon.com';

export const labels = {
    START: 'START',
    PRODUCT: 'PRODUCT',
    OFFERS: 'OFFERS',
};
```

```js
// routes.js
import { createCheerioRouter, Dataset } from 'crawlee';
import { BASE_URL, labels } from './constants';

export const router = createCheerioRouter();

router.addHandler(labels.START, async ({ $, crawler, request }) => {
    const { keyword } = request.userData;

    const products = $('div > div[data-asin]:not([data-asin=""])');

    for (const product of products) {
        const element = $(product);
        const titleElement = $(element.find('.a-text-normal[href]'));

        const url = `${BASE_URL}${titleElement.attr('href')}`;

        await crawler.addRequests([
            {
                url,
                label: labels.PRODUCT,
                userData: {
                    data: {
                        title: titleElement.first().text().trim(),
                        asin: element.attr('data-asin'),
                        itemUrl: url,
                        keyword,
                    },
                },
            },
        ]);
    }
});

router.addHandler(labels.PRODUCT, async ({ $, crawler, request }) => {
    const { data } = request.userData;

    const description = $('div#productDescription').text().trim();

    await crawler.addRequests([
        {
            url: `${BASE_URL}/dp/${data.asin}?th=1&psc=1`,
            label: labels.OFFERS,
            userData: {
                data: {
                    ...data,
                    description,
                },
            },
        },
    ]);
});

router.addHandler(labels.OFFERS, async ({ $, request }) => {
    const { data } = request.userData;

    const price = $('.a-price .a-offscreen').first().text().trim();
    const sellerName = $('#sellerProfileTriggerId, #merchant-info a').first().text().trim();

    await Dataset.pushData({
        ...data,
        sellerName,
        offer: price,
    });
});
```

```js
// main.js
import { CheerioCrawler, KeyValueStore, log } from 'crawlee';
import { router } from './routes.js';

// Grab our keyword from the input
const { keyword = 'iphone' } = (await KeyValueStore.getInput()) ?? {};

const crawler = new CheerioCrawler({
    requestHandler: router,
});

// Add our initial requests
await crawler.addRequests([
    {
        // Turn the inputted keyword into a link we can make a request with
        url: `https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=${keyword}`,
        label: 'START',
        userData: {
            keyword,
        },
    },
]);

log.info('Starting the crawl.');
await crawler.run();
log.info('Crawl finished.');
```

## Wrap up 💥 {#wrap-up}

Nice work! You've officially built your first scraper with Crawlee! You're now ready to take on the rest of the Apify Academy with confidence.

For now, this is the last section of the **Web scraping basics for JavaScript devs** course. If you want to learn more about web scraping, we recommend checking venturing out and following the other lessons in the Academy. We will keep updating the Academy with more content regularly until we cover all the advanced and expert topics we promised at the beginning.
