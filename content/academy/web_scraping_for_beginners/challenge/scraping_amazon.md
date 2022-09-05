---
title: Scraping Amazon
description: Before you build your first web scraper with Crawlee, it is important to understand the concept of modularity in programming.
menuWeight: 4
paths:
- web-scraping-for-beginners/challenge/scraping-amazon
---

# Scraping Amazon

In our quick chat about modularity, we finished the code for the results page, and added a request for each product to the crawler's **RequestQueue**. Here, we just need to scrape the description, so it shouldn't be too hard:

```JavaScript
// routes.js

// ...

router.addHandler(labels.PRODUCT, async ({ $, crawler, request }) => {
    const { data } = request.userData;

    const element = $('div#productDescription');

    const description = element.text().trim();

    console.log(description); // works!
});
```


Great! But wait, where do we go from here? We need to go to the offers page next and scrape each offer, but how can we do that? Let's take a small break from writing the scraper and open up [Proxyman]({{@link tools/proxyman.md}}) to analyze requests which we can't see inside the network tab, then we'll click the button on the product page that loads up all of the product offers:

![View offers button]({{@asset web_scraping_for_beginners/challenge/images/view-offers-button.webp}})

After clicking this button and checking back in Proxyman, we discovered this link:

```text
https://www.amazon.com/gp/aod/ajax/ref=auto_load_aod?asin=B07ZPKBL9V&pc=dp
```

The `asin` [query parameter](https://branch.io/glossary/query-parameters/) matches up with our product's ASIN, which means we can use this for any product of which we have the ASIN.

Here's what this page looks like:

![View offers page]({{@asset web_scraping_for_beginners/challenge/images/offers-page.webp}})

Wow, that's ugly. But for our scenario, this is really great. When we click the **View offers** button, we usually have to wait for the offers to load and render, which would mean we could have to switch our entire crawler to a **PuppeteerCrawler** or **PlaywrightCrawler**. The data on this page we've just found appears to be loaded statically, which means we can still use CheerioCrawler and keep the scraper as efficient as possible 😎

First, we'll create a function which can generate an offers URL for us in **constants.js**:

```JavaScript
// constants.js

// ...

export const OFFERS_URL = (asin) => `${BASE_URL}/gp/aod/ajax/ref=auto_load_aod?asin=${asin}&pc=dp`;
```

Then, we'll import and use that function to create a request for each product's offers page:

```JavaScript
// routes.js

// ...

router.addHandler(labels.PRODUCT, async ({ $, crawler, request }) => {
    const { data } = request.userData;

    const element = $('div#productDescription');

    // Add to the request queue
    await crawler.addRequests([{
        url: OFFERS_URL(data.asin),
        label: labels.OFFERS,
        userData: {
            data: {
                ...data,
                description: element.text().trim(),
            },
        },
    }]);
});
```

Finally, we can handle the offers in a separate handler:

```JavaScript
// routes.js

router.addHandler(labels.OFFERS, async ({ $, request }) => {
    const { data } = request.userData;

    for (const offer of $('#aod-offer')) {
        const element = $(offer);

        await Dataset.pushData({
            ...data,
            sellerName: element.find('div[id*="soldBy"] a[aria-label]').text().trim(),
            offer: element.find('.a-price .a-offscreen').text().trim(),
        });

    }
});
```

## [](#final-code) Final code

That should be it! Let's just make sure we've all got the same code:

```JavaScript
// constants.js
export const BASE_URL = 'https://www.amazon.com';

export const OFFERS_URL = (asin) => `${BASE_URL}/gp/aod/ajax/ref=auto_load_aod?asin=${asin}&pc=dp`;

export const labels = {
    START: 'START',
    PRODUCT: 'PRODUCT',
    OFFERS: 'OFFERS',
};
```

```JavaScript
// routes.js
import { Actor } from 'apify';
import { createCheerioRouter } from '@crawlee/cheerio';
import { BASE_URL, OFFERS_URL, labels } from './constants';

const router = createCheerioRouter();

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

    const element = $('div#productDescription');

    await crawler.addRequests([
        {
            url: OFFERS_URL(data.asin),
            label: labels.OFFERS,
            userData: {
                data: {
                    ...data,
                    description: element.text().trim(),
                },
            },
        },
    ]);
});

router.addHandler(labels.OFFERS, async ({ $, request }) => {
    const { data } = request.userData;

    for (const offer of $('#aod-offer')) {
        const element = $(offer);

        await Dataset.pushData({
            ...data,
            sellerName: element.find('div[id*="soldBy"] a[aria-label]').text().trim(),
            offer: element.find('.a-price .a-offscreen').text().trim(),
        });
    }
});
```

```JavaScript
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

## [](#wrap-up) Wrap up 💥

Nice work! You've officially built your first scraper with Crawlee! You're now ready to take on the rest of the Apify Academy with confidence.

For now, this is the last section of the **Web scraping for beginners** course. If you want to learn more about web scraping, we recommend checking venturing out and following the other lessons in the Academy. We will keep updating the Academy with more content regularly until we cover all the advanced and expert topics we promised at the beginning.
