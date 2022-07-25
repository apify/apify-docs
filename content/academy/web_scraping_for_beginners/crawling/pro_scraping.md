---
title: Professional scraping
description: Learn how to build scrapers quicker and get better and more robust results by using the Apify SDK, an open-source library for scraping in Node.js.
menuWeight: 7
paths:
- web-scraping-for-beginners/crawling/pro-scraping
---

# [](#pro-scraping) Professional scraping 💪

While it's definitely an interesting exercise to do all the programming manually, and we hope you enjoyed it, it's neither the most effective, nor the most efficient way of scraping websites. Because we scrape for a living at Apify, we've built a library that we use to scrape tens of millions of pages every day.

It's called the [Apify SDK](https://sdk.apify.com) and it is, **and always will be**, completely open-source and **free** to use. You don't need to sign up for an Apify account or use the Apify platform. You can use it on your personal computer, on any server, or in any cloud you want.

We mentioned the benefits of developing with a dedicated scraping library in the previous lessons, but to recap:

1. **Faster development time** because you don't have to write boilerplate code.
2. **Fewer bugs**. Apify SDK is fully unit-tested and battle-tested on millions of scraper runs.
3. **Faster and cheaper scrapers** because the Apify SDK automatically scales based on system resources and is optimized for enterprise-grade performance.
4. **More robust scrapers**. Annoying details like retries, proxy management, error handling, and result storage are all handled automatically by the Apify SDK.
5. **Helpful community**. You can join our Discord or talk to us on GitHub. We're almost always there to talk about scraping.

> If you're still not convinced, [read this story](https://apify.com/success-stories/daltix-analytics-scrapy-python-to-apify) how a data analytics company saved 90% of scraping costs by switching from Scrapy (a scraping library for Python) to the Apify SDK. To be honest, it shocked even us! 💪

## [](#sdk-installation) Install the Apify SDK

To use the Apify SDK, we have to install it from NPM. Let's add it to our project from the previous lessons.

```shell
npm install apify@2
```

In a new file we'll call `apify.js`, add the following code:

```JavaScript
// apify.js
import Apify from 'apify';

console.log('Apify works!');
```

Then, run the code using this command:

```shell
node apify.js
```

If you see **Apify works!** printed to the console, it means you successfully installed Apify SDK.


## [](#coding-the-scraper) Coding the scraper

You probably noticed that we did not `import` Cheerio or got-scraping. That's because they're both already included in a component of the SDK called [`CheerioCrawler`](https://sdk.apify.com/docs/api/cheerio-crawler). It automatically visits URLs that you feed to it, downloads the HTML, and parses it with Cheerio. The benefit of this over writing the code yourself is that it automatically handles errors and retries the request when one occurs. It also parallelizes the downloads, making them faster, and removes a lot of boilerplate code that you would have to write yourself.

To feed it with URLs, we need to store them somewhere. This is where the [`RequestQueue`](https://sdk.apify.com/docs/api/request-queue) comes in. It's a persistent storage, which means that if your crawler crashes, it doesn't have to start over, but it can continue from where it left off (which is also something that you would normally have to implement yourself).

```JavaScript
// apify.js
import Apify from 'apify';

const requestQueue = await Apify.openRequestQueue();
await requestQueue.addRequest({ url: 'https://demo-webstore.apify.org/search/on-sale' });
```

Here, we created a new request queue and added the first request to it - the first page we want to visit. Let's build the crawler now.

```JavaScript
// apify.js
import Apify from 'apify';

const requestQueue = await Apify.openRequestQueue();
await requestQueue.addRequest({ url: 'https://demo-webstore.apify.org/search/on-sale' });

// Instantiate our crawler
const crawler = new Apify.CheerioCrawler({
    // Pass the Request Queue into the options
    requestQueue,
    // Pass in a function to be ran for every request
    handlePageFunction: async ({ $, request }) => {
        console.log('URL: ', request.url);
        console.log('Title: ', $('title').text());
    },
});

// Run the crawler
await crawler.run();
```

In the background, `CheerioCrawler` automatically takes the first (and only) URL from the `RequestQueue`, downloads its HTML, and parses it using Cheerio. The [`handlePageFunction`](https://sdk.apify.com/docs/typedefs/cheerio-crawler-options#handlepagefunction) is the place where we can interact with the downloaded page and collect its data. It gives you access to the parsed HTML in the [`$`](https://sdk.apify.com/docs/typedefs/cheerio-handle-page-inputs) variable. You can also access various data about the request from the queue using the [`request`](https://sdk.apify.com/docs/typedefs/cheerio-handle-page-inputs#request) variable.

When you run the code above you'll see that it prints various log messages. Among the many you'll find the URL and `<title>` of the web page, which we printed out ourselves in the `handlePageFunction`.

```text
URL: https://demo-webstore.apify.org/search/on-sale
Title: Fakestore
```

Now, if you run the code again, you'll see that it does not print the title and URL anymore. As we mentioned earlier, the request queue is a persistent storage. It means that the queue remembers that the crawler already processed this URL. When you rerun the code, the queue remembers that this URL was already processed and will not process it again.

Notice the [`apify_storage`](https://sdk.apify.com/docs/guides/request-storage) folder that was created in your project's folder. This is where Apify SDK persists its state. If you delete the folder and rerun the scraper, it will crawl the URL again. But deleting the folder manually is a bit annoying, so we'll automate it.

```JavaScript
// apify.js
import Apify from 'apify';

// This clears our local storage and every run will start from scratch.
// NOTE: We don't recommend using this in production :)
await Apify.utils.purgeLocalStorage();

const requestQueue = await Apify.openRequestQueue();
await requestQueue.addRequest({ url: 'https://demo-webstore.apify.org/search/on-sale' });

const crawler = new Apify.CheerioCrawler({
    requestQueue,
    handlePageFunction: async ({ $, request }) => {
        console.log('URL: ', request.url);
        console.log('Title: ', $('title').text());
    },
});

await crawler.run();
```

When you repeatedly run the code now, you'll see that it always prints the expected log messages.

## [](#crawling-links) Crawling links

The current scraper only visits the on-sale products URL, but we want data for all the countries. We can use the [`Apify.utils.enqueueLinks()`](https://sdk.apify.com/docs/api/utils#utilsenqueuelinksoptions) function to help us with that. The function automatically extracts URLs from the current page, based on a provided CSS selector, and adds them to the request queue. Once added, the crawler will automatically crawl them.

```JavaScript
// apify.js
import Apify from 'apify';

await Apify.utils.purgeLocalStorage();

const requestQueue = await Apify.openRequestQueue();
await requestQueue.addRequest({
    url: 'https://demo-webstore.apify.org/search/on-sale',
    // By labeling the Request, we can very easily
    // identify it later in the handlePageFunction.
    userData: {
        label: 'START',
    },
});

const crawler = new Apify.CheerioCrawler({
    requestQueue,
    handlePageFunction: async ({ $, request }) => {
        console.log('URL: ', request.url);
        console.log('Title: ', $('title').text());

        // We only want to enqueue the URLs from the first page.
        if (request.userData.label === 'START') {
            await Apify.utils.enqueueLinks({
                $,
                requestQueue,
                // The selector is from our earlier code.
                selector: 'a[href*="/product/"]',
                // The baseUrl option automatically resolves relative URLs.
                baseUrl: new URL(request.url).origin,
            });
        }
    },
});

await crawler.run();
```

When you run the code, you'll immediately see that it crawls faster than the manually written code. This is thanks to parallelization, which allows it to run much faster. We're just keeping the default concurrency values low to be nice to the websites.

> If the crawler gets stuck for you at the end, it's ok. It's not actually stuck, but waiting to retry any pages that potentially failed.

## [](#collecting-data) Collecting data

We have the crawler in place, and it's time to collect data. We already have the extraction code from the previous lesson, so we can just copy and paste it into the `handlePageFunction` with tiny changes.

The one small, but important, change we did was to use the [`Apify.pushData()`](https://sdk.apify.com/docs/api/apify#apifypushdataitem) function to save the results to the run's default dataset. You will find the [results in the `apify_storage`](https://sdk.apify.com/docs/guides/result-storage) folder, under `datasets/default`.

```JavaScript
// apify.js
import Apify from 'apify';

await Apify.utils.purgeLocalStorage();

const requestQueue = await Apify.openRequestQueue();
await requestQueue.addRequest({
    url: 'https://demo-webstore.apify.org/search/on-sale',
    // By labeling the Request, we can very easily
    // identify it later in the handlePageFunction.
    userData: {
        label: 'START',
    },
});

const crawler = new Apify.CheerioCrawler({
    requestQueue,
    handlePageFunction: async ({ $, request }) => {
        if (request.userData.label === 'START') {
            await Apify.utils.enqueueLinks({
                $,
                requestQueue,
                selector: 'a[href*="/product/"]',
                baseUrl: new URL(request.url).origin,
            });

            // When on the START page, we don't want to
            // extract any data after we extract the links.
            return;
        }

        // We copied and pasted the extraction code
        // from the previous lesson
        const title = $('h3').text().trim();
        const price = $('h3 + div').text().trim();
        const description = $('div[class*="Text_body"]').text().trim();

        // Instead of saving the data to a variable,
        // we immediately save everything to a file.
        await Apify.pushData({
            title,
            description,
            price,
        });
    },
});

await crawler.run();
```

By using the `apify` library, we were able to create a faster and more robust scraper, but with less code than what was needed for the simple scraper in the earlier lessons. What we've learned so far only scratches the surface of the Apify SDK's full capabilities.

## [](#next) Next up

The Apify SDK is a full-featured scraping library. That's why we can use it to scrape any website at any scale. In the [next lesson]({{@link web_scraping_for_beginners/crawling/headless_browser.md}}) we will change only a few lines of code and turn our scraper into a full **headless browser**.
