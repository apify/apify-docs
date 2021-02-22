---
title: Improve performance by caching repeated page data
description: Learn how to make your scrapers more efficient by storing repeated page data. Avoid re-scraping pages and reduce your data extraction costs.
paths:
    - tutorials/improve-performance-by-caching-repeated-page-data
---

# Improve performance by caching repeated page data

Opening a page is by far the most expensive operation a scraper does. Each request has to use a precious IP address to route the traffic, then download a large HTML document (and a lot of other resources, if you use a browser) over the network (and pay for data transfer), and finally spend CPU time on parsing that HTML. Compared to that, the code you write inside the scraper itself is essentially free.

If you want to reduce your scraping costs, not re-scraping certain pages is one of the best ways to do that. The number of use cases where this is possible might be quite low but you should always look for and take advantage of such situations. In this article, we will go through one typical scraping scenario and apply caching in a simple and effective way.

> In a rush? Skip the tutorial and [see the full code example](https://github.com/metalwarrior665/apify-utils/blob/master/examples/caching-page-data.js).

## [](#how-to-cache-data-inside-an-actor) How to cache data inside an actor

Thanks to JavaScript's dynamic nature, we can store arbitrary data in a single object and easily manipulate it in place.

```javascript
const cache = {
    data1: 'my-data',
    data2: {
        myKey: 'my=data',
    },
};

// We can easily add things to an object
cache.data3 = 'my-new-data'
// We can remove things from an object
delete cache.data1
// And we can update the object
cache.data2.myNewKey = 'my-new-data'
```

Because [all objects in JavaScript are just references](https://www.freecodecamp.org/news/how-to-get-a-grip-on-reference-vs-value-in-javascript-cba3f86da223/), we can cheaply pass them to other functions and read or modify them there.

### [](#persisting-cache-to-the-key-value-store) Persisting cache to the key-value store

The cache lives only in memory. This is the easiest and fastest way to use a cache. One disadvantage is that if the actor run [migrates to a new server]({{@link actors/development/state_persistence.md}}), is aborted or crashes, we lose the cached data. That is not a tragedy but repopulating the cache will waste some resources. Fortunately, this has a simple solution in actors: we can persist arbitrary data into the [key-value store]({{@link storage/key_value_store.md}}).

```javascript
const Apify = require('apify');

Apify.main(async () => {
    // This is a common idiom: we first check if we already have cached data in the store
    // If we do, it means the run was already restared and we restore the cache
    // If we don't, we just initialize the cache to an empty object
    const cache = (await Apify.getValue('CACHE')) || {};

    // Now, we set up the persistence. You can choose between 'migrating' and 'persistState' events
    // 'migrating' only saves on migration, so it is a little "cheaper"
    // 'persistState' is usually preffered, it will also help if you abort the actor
    Apify.events.on('persistState', async () => {
        await Apify.setValue('CACHE', cache);
    });

    // We have secured the persistence and can now pass on the cache and use it like we want
})
```

Another advantage of persisting data is that you can open the key-value store and check what they look like at any time.

## [](#how-to-use-caching-in-an-e-commerce-project) How to use caching in an e-commerce project

Now we have covered the base theory, we can look into applying caching to help us avoid re-scraping pages. This approach is very helpful with e-commerce marketplaces. Let's define our imaginary example project:

- We need to scrape all products from an imaginary `https://marketplace.com` website.
- Each product is offered by one seller and the product page links to the seller page.
- Each product row we scrape should contain all info about the product and its seller.
- A single seller usually sells about 100 products.

Let's also define the URLs:

- Products are available on `https://marketplace.com/product/productId`.
- Sellers are available on `https://marketplace.com/seller/sellerId`.

### [](#cache-structure) Cache structure

You might have already realized how we can utilize the cache. Because a seller can sell more than one product, with a naive approach, we would just re-scrape the seller page for each of their products. This is wasteful. Instead, we can store all the data we scrape from the seller page to our cache. If we encounter the seller's product again, we can get the seller data straight from the cache.

Our cache will be an object where the **keys** will be the seller IDs (imagine a numerical ID) and the **values** will be seller data.

```json
{
    "545345": {
        "sellerId": "545345",
        "sellerName": "Jane Doe",
        "sellerRating": 3.5,
        "sellerNumberOfReviews": 345,
        "sellerNumberOfFollowers": 32,
        "sellerProductsSold": 1560
    },
    "423423": {
        "sellerId": "423423",
        "sellerName": "Martin Smith",
        "sellerRating": 4.2,
        "sellerNumberOfReviews": 23,
        "sellerNumberOfFollowers": 2,
        "sellerProductsSold": 132
    }
}
```

### [](#crawler-example) Crawler example

```javascript
const Apify = require('apify');

// Let's imagine we defined the extractor functions in the extractors.js file
const { extractProductData, extractSellerData } = require('./extractors');

Apify.main(async () => {
    const cache = (await Apify.getValue('CACHE')) || {};

    Apify.events.on('persistState', async () => {
        await Apify.setValue('CACHE', cache);
    });

    const requestQueue = await Apify.openRequestQueue();

    await requestQueue.addRequest({
        url: 'https://marketplace.com',
        userData: { label: 'START' },
    });

    // Other crawler setup
    // ...

    // It doesn't matter what crawler class we choose
    const crawler = new Apify.CheerioCrawler({
        // Other crawler configs
        // ...
        requestQueue,
        handlePageFunction: async ({ request, $ }) => {
            const { label } = request.userData;
            if (label === 'START') {
                // Enqueue categories etc...
            } else if (label === 'CATEGORY') {
                // Enqueue products and paginate...
            } else if (label === 'PRODUCT') {
                // Here is where our example begins
                const productData = extractProductData($);
                const sellerId = $('#seller-id').text().trim();

                // We have all we need from the product page
                // Now we check the cache if we already scraped this seller
                if (cache[sellerId]) {
                    // If yes, we just merge the data and we are done
                    const result = {
                        ...productData,
                        ...cache[sellerId],
                    };
                    await Apify.pushData(result);
                } else {
                    // If the cache doesn't have this seller, we have to go to their page
                    await requestQueue.addRequest({
                        url: `https://marketplace.com/seller/${sellerId}`,
                        userData: {
                            label: 'SELLER',
                            // We also have to pass the product data along
                            // so we can merge and push them from the seller page
                            productData,
                        },
                    });
                }
            } else if (label === 'SELLER') {
                // And finally we handle the seller page
                // We scrape the seller data
                const sellerData = extractSellerData($);

                // We populate the cache so we can access all of this seller's other products from there
                cache[sellerData.sellerId] = sellerData;

                // We merge seller and product data and push
                const result = {
                    ...request.userData.productData,
                    ...sellerData,
                };
                await Apify.pushData(result);
            }
        },
    });

    await crawler.run();
})
```

[See the full code example](https://github.com/metalwarrior665/apify-utils/blob/master/examples/caching-page-data.js).
