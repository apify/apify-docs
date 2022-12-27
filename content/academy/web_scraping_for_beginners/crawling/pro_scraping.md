---
title: Professional scraping
description: Learn how to build scrapers quicker and get better and more robust results by using Crawlee, an open-source library for scraping in Node.js.
menuWeight: 7
paths:
- web-scraping-for-beginners/crawling/pro-scraping
---

# [](#pro-scraping) Professional scraping 💪

While it's definitely an interesting exercise to do all the programming manually, and we hope you enjoyed it, it's neither the most effective, nor the most efficient way of scraping websites. Because we scrape for a living at Apify, we've built a library that we use to scrape tens of millions of pages every day.

It's called [Crawlee](https://crawlee.dev/) and it is, **and always will be**, completely open-source and **free** to use. You don't need to sign up for an Apify account or use the Apify platform. You can use it on your personal computer, on any server, or in any cloud environment you want.

We mentioned the benefits of developing with a dedicated scraping library in the previous lessons, but to recap:

1. **Faster development time** because you don't have to write boilerplate code.
2. **Fewer bugs**. Crawlee is fully unit-tested and battle-tested on millions of scraper runs.
3. **Faster and cheaper scrapers** because Crawlee automatically scales based on system resources and is optimized for enterprise-grade performance.
4. **More robust scrapers**. Annoying details like retries, proxy management, error handling, and result storage are all handled automatically by Crawlee.
5. **Helpful community**. You can [join our Discord](https://discord.gg/qkMS6pU4cF) or talk to us [on GitHub](https://github.com/apify/crawlee). We're almost always there to talk about scraping and programming in general!

> If you're still not convinced, [read this story](https://apify.com/success-stories/daltix-analytics-scrapy-python-to-apify) how a data analytics company saved 90% of scraping costs by switching from Scrapy (a scraping library for Python) to Crawlee. To be honest, it shocked even us! 💪

The Crawlee library factors away and manages the hard parts of the scraping/automation development under the hood, such as:

- Autoscaling
- Request concurrency
- Queueing requests
- Data storage
- Using and rotating [proxies]({{@link anti_scraping/mitigation/proxies.md}})
- Puppeteer/Playwright setup overhead
- Plus much more!

As a developer, your goal is to take Crawlee, which is quite generic on its own, and write website-specific or use-case-specific [actors]({{@link getting_started/actors.md}}).

Crawlee and its resources can be found in various different places:

1. [Official Crawlee documentation](https://crawlee.dev/)
2. [Crawlee Github repository (source code, issues)](https://github.com/apify/crawlee)
3. [Crawlee on NPM](https://www.npmjs.com/package/crawlee)

## [](#crawlee-installation) Install Crawlee

To use Crawlee, we have to install it from NPM. Let's add it to our project from the previous lessons.

```shell
npm install crawlee@latest
```

In a new file we'll call **crawlee.js**, add the following code:

```JavaScript
// crawlee.js
import { CheerioCrawler } from 'crawlee';

console.log('Crawlee works!');
```

Then, run the code using this command:

```shell
node crawlee.js
```

If you see **Crawlee works!** printed to the console, it means you successfully installed the Crawlee library.

## [](#coding-the-scraper) Coding the scraper

You probably noticed that we did not `import` Cheerio or got-scraping. That's because they're both already included in a component of Crawlee called [`CheerioCrawler`](https://crawlee.dev/docs/guides/cheerio-crawler-guide). It automatically visits URLs that you feed to it, downloads the HTML, and parses it with Cheerio. The benefit of this over writing the code yourself is that it automatically handles errors and retries the request when one occurs. It also parallelizes the downloads, making them faster, and removes a lot of boilerplate code that you would have to write yourself.

```JavaScript
import { CheerioCrawler } from 'crawlee';

const crawler = new CheerioCrawler({
    requestHandler: async ({ $, request }) => {
        console.log('URL: ', request.url);
        console.log('Title: ', $('title').text());
    },
});
```

To feed it with URLs, we need to store them somewhere. This is where the [`RequestQueue`](https://crawlee.dev/api/core/class/RequestQueue) comes in. It's a persistent storage, which means that if your crawler crashes, it doesn't have to start over, but it can continue from where it left off (which is also something that you would normally have to implement yourself). `CheerioCrawler` automatically opens a request queue for you and assigns it to itself, so all you have to do is use the [`addRequests`](https://crawlee.dev/docs/upgrading/upgrading-to-v3#crawleraddrequests) function to add new requests to the queue.

```JavaScript
import { CheerioCrawler } from 'crawlee';

const crawler = new CheerioCrawler({
    requestHandler: async ({ $, request }) => {
        console.log('URL: ', request.url);
        console.log('Title: ', $('title').text());
    },
});

await crawler.addRequests([{ url: 'https://demo-webstore.apify.org/search/on-sale' }]);
```

Here, we added the first request to the crawler - the first page we want to visit. Behind the scenes, `CheerioCrawler` will automatically create a `RequestQueue`, take the first (and currently only) URL from it, download its HTML, and parse it using Cheerio. The [`requestHandler`](https://crawlee.dev/api/cheerio-crawler/interface/CheerioCrawlerOptions#requestHandler) is the place where we can interact with the downloaded page and collect its data. It gives you access to the parsed HTML in the [`$`](https://crawlee.dev/api/cheerio-crawler/interface/CheerioCrawlingContext) variable. You can also access various data about the request from the queue using the [`request`](https://crawlee.dev/api/cheerio-crawler/interface/CheerioCrawlingContext#request) variable.

When you run the code above you'll see that it prints various log messages. Among the many you'll find the URL and `<title>` of the web page, which we printed out ourselves in the `requestHandler`.

```text
URL: https://demo-webstore.apify.org/search/on-sale
Title: Fakestore
```

## [](#crawling-links) Crawling links

The current scraper only visits the on-sale products URL, but we want data for all the countries. We can use the [`enqueueLinks()`](https://crawlee.dev/api/cheerio-crawler/interface/CheerioCrawlingContext#enqueueLinks) function to help us with that. The function automatically extracts URLs from the current page based on a provided CSS selector and adds them to the request queue. Once added, the crawler will automatically crawl them.

```JavaScript
// crawlee.js
import { CheerioCrawler } from 'crawlee';

const crawler = new CheerioCrawler({
    requestHandler: async ({ $, request, enqueueLinks }) => {
        console.log('URL: ', request.url);
        console.log('Title: ', $('title').text());

        // We only want to enqueue the URLs from the first page.
        if (request.userData.label === 'START') {
            await enqueueLinks({
                // The selector is from our earlier code.
                selector: 'a[href*="/product/"]',
                // The baseUrl option automatically resolves relative URLs.
                baseUrl: new URL(request.url).origin,
            });
        }
    },
});

await crawler.addRequests([{
    url: 'https://demo-webstore.apify.org/search/on-sale',
    // By labeling the Request, we can very easily
    // identify it later in the requestHandler.
    userData: {
        label: 'START',
    },
}]);

await crawler.run();
```

When you run the code, you'll immediately see that it crawls faster than the manually written code. This is thanks to parallelization, which allows it to run much faster. We're just keeping the default concurrency values low to be nice to the websites.

> If the crawler gets stuck for you at the end, it's ok. It's not actually stuck, but waiting to retry any pages that potentially failed.

## [](#collecting-data) Collecting data

We have the crawler in place, and it's time to collect data. We already have the extraction code from the previous lesson, so we can just copy and paste it into the `requestHandler` with tiny changes.

The one small, but important, change we did was to use the [`Dataset.pushData()`](https://crawlee.dev/docs/introduction/saving-data#whats-datasetpushdata) function to save the results to the run's default dataset. You will find the results in the **storage** folder, under **datasets/default**.

```JavaScript
// crawlee.js
import { CheerioCrawler, Dataset } from 'crawlee';

const crawler = new CheerioCrawler({
    requestHandler: async ({ $, request, enqueueLinks }) => {
        if (request.userData.label === 'START') {
            await enqueueLinks({
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
        await Dataset.pushData({
            title,
            description,
            price,
        });
    },
});

await crawler.addRequests([{
    url: 'https://demo-webstore.apify.org/search/on-sale',
    // By labeling the Request, we can very easily
    // identify it later in the requestHandler.
    userData: {
        label: 'START',
    },
}]);

await crawler.run();
```

By using the `crawlee` library, we were able to create a faster and more robust scraper, but with less code than what was needed for the simple scraper in the earlier lessons. What we've learned so far only scratches the surface of Crawlee's full capabilities.

## [](#next) Next up

Crawlee is a full-featured scraping library. That's why we can use it to scrape any website at any scale. In the [next lesson]({{@link web_scraping_for_beginners/crawling/headless_browser.md}}) we will change only a few lines of code and turn our scraper into a full **headless browser**.
