---
title: Professional scraping
description: Learn how to build scrapers easier, faster and finish with a better and a more robust scraper by using the Apify SDK, an open-source library for scraping in Node.js.
menuWeight: 21.7
category: web scraping academy
paths:
- crawling-basics/pro-scraping
---

# [](#pro) Professional scraping

While it's definitely an interesting exercise to do all the programming manually, and we hope you enjoyed it, it's neither the most effective, nor the most efficient way of scraping websites. Because we scrape for a living at Apify, we've built a library that we use to scrape tens of millions of pages every day.

It's called <a href="https://sdk.apify.com" target="_blank">Apify SDK</a> and it is and always will be completely open-source and free to use. You don't need to sign-up for an Apify account or use the Apify platform. You can use it on your personal computer, on any server or in any cloud you want.

We mentioned benefits of a dedicated scraping library in the previous chapters, but to recap:

1. **Faster development time**, because you don't have to write boilerplate code.
2. **Less bugs**. Apify SDK is fully unit-tested and integration tested on millions of scraper runs.
3. **Faster and cheaper scrapers**, because Apify SDK automatically scales based on system resources and is optimized for enterprise-grade performance.
4. **More robust scrapers**. Annoying details like retries, proxy management, error handling and result storage are all handled automatically by Apify SDK.
5. **Helpful community**. You can join our Discord or talk to us on GitHub. We're almost always there to talk about scraping.

> If you're still not convinced, <a href="https://apify.com/success-stories/daltix-analytics-scrapy-python-to-apify" target="_blank">read this story</a> how a data analytics company saved 90% of scraping costs by switching from Scrapy to Apify SDK. To be honest, it shocked even us!

## [](#installation) Install Apify SDK

To use Apify SDK we have to install it from NPM. Let's add it to our project from the previous chapters.

```shell
npm install --save apify
```

In a new file, let's say `apify.js`, add the following code.

```js
import Apify from 'apify';

console.log('Apify works!');
```

And run the code using:

```shell
node apify.js
```

If you see Apify works! printed to the console, it means you successfully installed Apify SDK.


## [](#coding) Coding the scraper

You probably noticed that we did not `import` Cheerio or got-scraping. That's because they're both already included in a component of the SDK called `CheerioCrawler`. It automatically visits URLs that you feed to it, downloads the HTML and parses it with Cheerio. The benefit over writing the code yourself is that it automatically handles and retries errors, parallelizes the downloads, making it faster, and removes a lot of boilerplate code that you would have to write yourself.

To feed it with URLs, we need to store them somewhere. This is where `RequestQueue` comes in. It's a persistent storage, which means that if your crawler crashes, you don't have to start over, but you can continue from where you left off. That's also something that you would have to implement yourself.

```js
// apify.js
import Apify from 'apify';

const requestQueue = await Apify.openRequestQueue();
await requestQueue.addRequest({ url: 'https://www.alexa.com/topsites/countries' });
```

Here we created a new request queue and added the first request to it - the first page we want to visit. Let's build the crawler now.

```js
// apify.js
import Apify from 'apify';

const requestQueue = await Apify.openRequestQueue();
await requestQueue.addRequest({ url: 'https://www.alexa.com/topsites/countries' });

const crawler = new Apify.CheerioCrawler({
    requestQueue,
    handlePageFunction: async ({ $, request }) => {
        console.log('URL:', request.url);
        console.log('Title:', $('title').text());
    },
});

await crawler.run();
```

In the background, `CheerioCrawler` automatically takes the first (and only) URL from the `RequestQueue`, downloads its HTML and parses it using Cheerio. `handlePageFunction` is the place to interact with the downloaded page. It gives you access to the parsed HTML in the `$` variable. You can also access the request from the queue using the `request` variable.

When you run the code above you'll see that it prints various log messages, but among the many you'll find the URL and `<title>` of the web page.

```text
URL: https://www.alexa.com/topsites/countries
Title: Alexa - Top Sites for Countries
```

Now, if you run the code again, you'll see that it does not print the title and URL anymore. As we mentioned earlier, the request queue is a persistent storage. It means that the queue remembers that the crawler already processed this URL. When you rerun the code, the queue remembers that this URL was already processed and will not process it again.

Notice the `apify_storage` folder that was created in your project's folder. This is where Apify SDK persists its state. If you delete the folder and rerun the scraper, it will crawl the URL again. But deleting the folder manually is a bit annoying, so we'll automate it.

```js
// apify.js
import Apify from 'apify';

// This clears our local storage and every run will start from scratch.
// We don't recommend using this in production :)
await Apify.utils.purgeLocalStorage();

const requestQueue = await Apify.openRequestQueue();
await requestQueue.addRequest({ url: 'https://www.alexa.com/topsites/countries' });

const crawler = new Apify.CheerioCrawler({
    requestQueue,
    handlePageFunction: async ({ $, request }) => {
        console.log('URL:', request.url);
        console.log('Title:', $('title').text());
    },
});

await crawler.run();
```

When you repeatedly run the code now, you'll see that it always prints the expected log messages.

## [](#crawling) Crawling links

The current scraper only visits the first URL, but we want data for all the countries. We can use the `Apify.utils.enqueueLinks()` function to help us with that. The function automatically extracts URLs from the current page, based on a provided CSS selector and adds them to the request queue. Once added, the crawler will automatically crawl them.

```js
// apify.js
import Apify from 'apify';

await Apify.utils.purgeLocalStorage();

const requestQueue = await Apify.openRequestQueue();
await requestQueue.addRequest({
    url: 'https://www.alexa.com/topsites/countries',
    // By labeling the Request, we can very easily
    // identify it later in the handlePageFunction.
    userData: {
        label: 'START',
    },
});

const crawler = new Apify.CheerioCrawler({
    requestQueue,
    handlePageFunction: async ({ $, request }) => {
        console.log('URL:', request.url);
        console.log('Title:', $('title').text());

        // We only want to enqueue the URLs from the first page.
        if (request.userData.label === 'START') {
            await Apify.utils.enqueueLinks({
                $,
                requestQueue,
                // The selector is from our earlier code.
                selector: 'ul.countries a[href]',
                // The baseUrl option automatically resolves relative URLs.
                baseUrl: request.loadedUrl,
            });
        }
    },
});

await crawler.run();
```

When you run the code, you'll immediately see that it crawls faster than the manually written code. This is thanks to parallelization. And it can go way faster. We're just keeping the default concurrency values low to be nice to websites.

> If the crawler gets stuck for you at the end, it's ok. It's not actually stuck, but waiting to retry pages that failed. For us, it was retrying the Aland Islands page that was failing for us in the previous chapters as well.

## [](#collecting-data) Collecting data

We have the crawler in place, and it's time to collect data. We already have the extraction code from the previous chapters, so we can just copy and paste it into the `handlePageFunction` with tiny changes.

The one small, but important change we did was to use the `Apify.pushData()` function to save the results to the run's default dataset. You will find the results in the `apify_storage` folder, under `datasets/default`.

```js
// apify.js
import Apify from 'apify';

await Apify.utils.purgeLocalStorage();

const requestQueue = await Apify.openRequestQueue();
await requestQueue.addRequest({
    url: 'https://www.alexa.com/topsites/countries',
    userData: {
        label: 'START',
    },
});

const crawler = new Apify.CheerioCrawler({
    requestQueue,
    handlePageFunction: async ({ $, request }) => {
        console.log('URL:', request.url);

        if (request.userData.label === 'START') {
            await Apify.utils.enqueueLinks({
                $,
                requestQueue,
                selector: 'ul.countries a[href]',
                baseUrl: request.loadedUrl,
            });
            // When on the START page, we don't want to
            // extract any data after we extract the links.
            return;
        }

        // We copied and pasted the extraction code from previous chapters.
        const sites = $('div.site-listing');
        for (const site of sites) {
            const fields = $(site).find('div.td');
            // Instead of saving the data to a variable,
            // we immediately save everything to a file.
            await Apify.pushData({
                countryCode: request.url.slice(-2),
                rank: fields.eq(0).text().trim(),
                site: fields.eq(1).text().trim(),
                dailyTimeOnSite: fields.eq(2).text().trim(),
                dailyPageViews: fields.eq(3).text().trim(),
                percentFromSearch: fields.eq(4).text().trim(),
                totalLinkingSites: fields.eq(5).text().trim(),
            });
        }
    },
});

await crawler.run();
```

By using the `apify` library, we were able to create a faster and more robust scraper with less code than needed for the simple scraper in earlier chapters. But this only scratches the surface of the Apify SDK's capabilities.

## [](#next) Next up

Apify SDK is a full-featured scraping library. That's why we can use it to scrape any website at any scale. In the [next chapter]({{@link crawling_basics/headless_browser.md}}) we will change only a few lines of code and turn our scraper into a full headless browser.
