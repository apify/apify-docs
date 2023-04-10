---
title: Professional scraping
description: Learn how to build scrapers quicker and get better and more robust results by using Crawlee, an open-source library for scraping in Node.js.
sidebar_position: 7
slug: /web-scraping-for-beginners/crawling/pro-scraping
---

# Professional scraping 👷 {#pro-scraping}

**Learn how to build scrapers quicker and get better and more robust results by using Crawlee, an open-source library for scraping in Node.js.**

---

While it's definitely an interesting exercise to do all the programming manually, and we hope you enjoyed it, it's neither the most effective, nor the most efficient way of scraping websites. Because we scrape for a living at Apify, we've built a library that we use to scrape tens of millions of pages every day.

It's called [**Crawlee**](https://crawlee.dev/), and it is, and **always will be**, completely **open-source** and **free** to use. You don't need to sign up for an Apify account or use the Apify platform. You can use it on your personal computer, on any server, or in any cloud environment you want.

We mentioned the benefits of developing with a dedicated scraping library in the previous lessons, but to recap:

1. **Faster development time** because you don't have to write boilerplate code.
2. **Fewer bugs**. Crawlee is fully unit-tested and battle-tested on millions of scraper runs.
3. **Faster and cheaper scrapers** because Crawlee automatically scales based on system resources, and we optimize its performance regularly.
4. **More robust scrapers**. Annoying details like retries, proxy management, error handling, and result storage are all handled out-of-the-box by Crawlee.
5. **Helpful community**. You can [join our Discord](https://discord.gg/qkMS6pU4cF) or talk to us [on GitHub](https://github.com/apify/crawlee). We're almost always there to talk about scraping and programming in general.

:::tip

If you're still not convinced, [read this story](https://apify.com/success-stories/daltix-analytics-scrapy-python-to-apify) how a data analytics company saved 90% of scraping costs by switching from Scrapy (a scraping library for Python) to Crawlee. We were pretty surprised ourselves, to be honest.

:::

Crawlee factors away and manages the dull and repetitive parts of web scraper development under the hood, such as:

- Auto-scaling
- Request concurrency
- Queueing requests
- Data storage
- Using and rotating [proxies](../../anti_scraping/mitigation/proxies.md)
- Puppeteer/Playwright setup overhead
- [See all the features](https://crawlee.dev/docs/introduction)

Crawlee and its resources can be found in various different places:

1. [Official Crawlee documentation](https://crawlee.dev/)
2. [Crawlee GitHub repository (source code, issues)](https://github.com/apify/crawlee)
3. [Crawlee on NPM](https://www.npmjs.com/package/crawlee)

## Install Crawlee {#crawlee-installation}

To use Crawlee, we have to install it from NPM. Let's add it to our project from the previous lessons by executing this command in your project's folder.

```shell
npm install crawlee
```

After the installation completes, create a new file called **crawlee.js** and add the following code to it:

```js title=crawlee.js
import { CheerioCrawler } from 'crawlee';

console.log('Crawlee works!');
```

Then, run the code using `node` as usual:

```shell
node crawlee.js
```

You'll see "**Crawlee works!**" printed to the console. If it doesn't work, it means Crawlee didn't install correctly. If that's the case, try deleting the `node_modules` directory and `package-lock.json` file in your project and install Crawlee again.

> You don't need to `import` any other libraries like Cheerio or Got-Scraping. That's because they're both included in Crawlee's [`CheerioCrawler`](https://crawlee.dev/docs/guides/cheerio-crawler-guide).

## Prepare the scraper {#coding-the-scraper}

 `CheerioCrawler` automatically visits URLs, downloads HTML using **Got-Scraping**, and parses it with **Cheerio**. The benefit of this over writing the code yourself is that it automatically handles the URL queue, errors, retries, proxies, parallelizes the downloads, and much more. Overall, it removes the need to write a lot of boilerplate code.

To create a crawler with Crawlee, you only need to provide it with a request handler - a function that gets executed for each page it visits.

```js title=crawlee.js
import { CheerioCrawler } from 'crawlee';

const crawler = new CheerioCrawler({
    // This function will run on every page.
    // Among other things, tt gives you access
    // to parsed HTML with the Cheerio $ function.
    requestHandler: async ({ $, request }) => {
        console.log('URL:', request.url);
        // Print the heading of each visited page.
        console.log('Title:', $('h1').text().trim());
    },
});
```

But the above code still doesn't crawl anything. We need to provide it with URLs to crawl. To do that, we call the crawler's `addRequests` function.

```js title=crawlee.js
import { CheerioCrawler } from 'crawlee';

const crawler = new CheerioCrawler({
    requestHandler: async ({ $, request }) => {
        console.log('URL:', request.url);
        console.log('Title:', $('h1').text().trim());
    },
});

// Add the Sales category of Warehouse store to the queue of URLs.
await crawler.addRequests([
    'https://warehouse-theme-metal.myshopify.com/collections/sales'
]);

await crawler.run();
```

When you run the above code, you'll see some internal Crawlee logs and then the two messages your code printed:

```text
URL: https://warehouse-theme-metal.myshopify.com/collections/sales
Title: Sales

```

> `crawler.addRequests` uses the [`RequestQueue`](https://crawlee.dev/docs/guides/request-storage#request-queue) under the hood. It's a persistent storage, which means that if your crawler crashes, it doesn't have to start over, but it can continue from where it left off.

### Summary:

1. We added the first URL to the crawler using the `addRequests` function.
2. `CheerioCrawler` will automatically take the URL from the queue, download its HTML using Got Scraping, and parse it using Cheerio.
3. The crawler executes the [`requestHandler`](https://crawlee.dev/api/cheerio-crawler/interface/CheerioCrawlerOptions#requestHandler), where we extract the page's data using the [`$`](https://crawlee.dev/api/cheerio-crawler/interface/CheerioCrawlingContext) variable. You can also access the request itself using the [`request`](https://crawlee.dev/api/cheerio-crawler/interface/CheerioCrawlingContext#request) variable.

## Crawling links {#crawling-links}

The current scraper only visits the Sales category page, but we want detailed data for all the products. We can use the [`enqueueLinks()`](https://crawlee.dev/api/cheerio-crawler/interface/CheerioCrawlingContext#enqueueLinks) function to add more URLs to the queue. The function automatically extracts URLs from the current page based on a provided CSS selector and adds them to the queue. Once added, the crawler will automatically crawl them.

```js title=crawlee.js
import { CheerioCrawler } from 'crawlee';

const crawler = new CheerioCrawler({
    requestHandler: async ({ $, request, enqueueLinks }) => {
        console.log('URL:', request.url);
        console.log('Title:', $('h1').text().trim());

        // We only want to enqueue the URLs from the start URL.
        if (request.label === 'start-url') {
            // enqueueLinks will add all the links
            // that match the provided selector.
            await enqueueLinks({
                // The selector comes from our earlier code.
                selector: 'a.product-item__title',
            });
        }
    },
});

// Instead of using a simple URL string, we're now
// using a request object to add more options.
await crawler.addRequests([{
    url: 'https://warehouse-theme-metal.myshopify.com/collections/sales',
    // We label the Request to identify
    // it later in the requestHandler.
    label: 'start-url',
}]);

await crawler.run();
```

When you run the code, you'll see the names and URLs of all the products printed to the console. You'll also see that it crawls faster than the manually written code. This is thanks to parallelization of the requests.

> If the crawler gets stuck for you at the end, it's ok. It's not actually stuck, but waiting to retry any pages that may have failed.

## Extracting data {#extracting-data}

We have the crawler in place, and it's time to extract data. We already have the extraction code from the previous lesson, so we can just copy and paste it into the `requestHandler` with tiny changes.

```js title=crawlee.js
import { CheerioCrawler, Dataset } from 'crawlee';

const crawler = new CheerioCrawler({
    requestHandler: async ({ $, request, enqueueLinks }) => {
        console.log(`Fetching URL: ${request.url}`)

        if (request.label === 'start-url') {
            await enqueueLinks({
                selector: 'a.product-item__title',
            });
            // When on the start URL, we don't want to
            // extract any data after we extract the links.
            return;
        }

        // We copied and pasted the extraction code
        // from the previous lesson with small
        // refactoring: e.g. `$productPage` to `$`.
        const title = $('h1').text().trim();
        const vendor = $('a.product-meta__vendor').text().trim();
        const price = $('span.price').contents()[2].nodeValue;
        const reviewCount = parseInt($('span.rating__caption').text());
        const description = $('div[class*="description"] div.rte').text().trim();

        // Instead of printing the results to
        // console, we save everything to a file.
        await Dataset.pushData({
            title,
            vendor,
            price,
            reviewCount,
            description,
        });
    },
});

await crawler.addRequests([{
    url: 'https://warehouse-theme-metal.myshopify.com/collections/sales',
    label: 'start-url',
}]);

await crawler.run();
```

When you run the code as usual, you'll see the product URLs printed to the terminal and you'll find the scraped data saved to your disk. Thanks to using the [`Dataset.pushData()`](https://crawlee.dev/docs/introduction/saving-data#whats-datasetpushdata) function, Crawlee automatically created a `storage` directory in your project's location. The results will be saved there, with each product's data stored as a separate JSON file:

```text
./storage/datasets/default/*.json
```

Thanks to **Crawlee**, we were able to create a **faster and more robust scraper**, but **with less code** than what was needed for the simple scraper in the earlier lessons.

## Next up {#next}

In the [next lesson](./headless_browser.md) we'll show you how to turn this plain HTTP crawler into a **headless browser** scraper in only a few lines of code.
