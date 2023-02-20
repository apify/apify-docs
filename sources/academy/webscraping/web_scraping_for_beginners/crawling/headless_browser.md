---
title: Headless browsers
description: Learn how to scrape the web with a headless browser using only a few lines of code. Chrome, Firefox, Safari, Edge - all are supported.
sidebar_position: 8
slug: /web-scraping-for-beginners/crawling/headless-browser
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Headless browsers {#headless-browser}

**Learn how to scrape the web with a headless browser using only a few lines of code. Chrome, Firefox, Safari, Edge - all are supported.**

---

A headless browser is simply a browser that runs without a user interface (UI). This means that it's normally controlled by automated scripts. Headless browsers are very popular in scraping because they can help you render JavaScript or programmatically behave like a human user to prevent blocking. The two most popular libraries for controlling headless browsers are [Puppeteer](https://pptr.dev/) and [Playwright](https://playwright.dev/). **Crawlee** supports both.

## Building a Playwright scraper {#playwright-scraper}

> We'll be focusing on Playwright today, as it was developed by the same team that created Puppeteer, and it is newer with more features and better documentation.

Building a Playwright scraper with Crawlee is extremely easy. To show you how easy it really is, we'll reuse the Cheerio scraper code from the previous lesson. By changing only a few lines of code, we'll turn it into a full headless scraper.

First, we must not forget to install Playwright into our project.

```shell
npm install playwright
```

After Playwright installs, we can proceed with updating the scraper code. As always, the comments describe changes in the code. Everything else is the same as before.

```js
// crawlee.js
import { PlaywrightCrawler, Dataset } from 'crawlee';
// Don't forget to import cheerio, we will need it later.
import cheerio from 'cheerio';

// Replace CheerioCrawler with PlaywrightCrawler
const crawler = new PlaywrightCrawler({
    requestHandler: async ({ page, request, enqueueLinks }) => {
        // Here, we extract the HTML from the browser and parse
        // it with Cheerio. Thanks to that we can use exactly
        // the same code as before, when using CheerioCrawler.
        const $ = cheerio.load(await page.content());

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

        // Because we're using a browser, we can now access
        // dynamically loaded data. Our target site has
        // dynamically loaded images.
        const imageRelative = $('img[alt="Product Image"]').attr('src');
        const base = new URL(request.url).origin;
        const image = new URL(imageRelative, base).href;

        // Instead of saving the data to a variable,
        // we immediately save everything to a file.
        await Dataset.pushData({
            title,
            description,
            price,
            image,
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

Yup, that's it. To quickly recap, we added 2 lines and changed 1 line of code to transform our crawler from a static HTTP request crawler to a headless-browser crawler. The scraper now runs exactly the same as before, but using a full Chromium browser instead of plain HTTP requests and Cheerio. This is a taste of the true power of Crawlee.

Notice that we are also scraping a new piece of data - `image`. We were unable to access this content before with Cheerio, as it is dynamically loaded in. If you're confused about the differences between PlaywrightCrawler/PuppeteerCrawler and CheerioCrawler, and why one might choose one over the other, give [this short article](https://blog.apify.com/what-is-a-dynamic-page/) about dynamic pages a quick read-over.

Using Playwright in combination with Cheerio like this is only one of many ways how you can utilize Playwright (and Puppeteer) with Crawlee. In the advanced courses of the Academy, we will go deeper into using headless browsers for scraping and web automation (RPA) use-cases.

## Running in headless mode {#running-headless}

We said that headless browsers didn't have a UI, but while scraping with the above scraper code, we're sure your screen was full of browser tabs. That's because in Crawlee, browsers run **headful** (with a UI) by default. This is useful for debugging and seeing what's going on in the browser. Once the scraper is complete, we switch it to **headless** mode using one of two methods:

### Environment variable {#headless-env-var}

This is the programmer's preferred solution, because you don't have to change the source code to change the behavior. All you need to do is set the [`CRAWLEE_HEADLESS=1`](https://crawlee.dev/docs/guides/configuration#crawlee_headless) environment variable when running your scraper, and it will automatically run headless. For example like this:

<Tabs groupId="main">
<TabItem value="MacOS/Linux" label="MacOS/Linux">

```shell
CRAWLEE_HEADLESS=1 node crawlee.js

```
</TabItem>
<TabItem value="Windows CMD" label="Windows CMD">

```shell
set CRAWLEE_HEADLESS=1 && node crawlee.js

```
</TabItem>
<TabItem value="Windows Powershell" label="Windows Powershell">

```shell
$env:CRAWLEE_HEADLESS=1; & node crawlee.js

```
</TabItem>
</Tabs>

### Scraper code {#headless-code}

If you always want the scraper to run headless, it might be better to hardcode it in the source. To do that, we need to access [Playwright's launch options](https://playwright.dev/docs/api/class-browsertype#browser-type-launch-option-headless). In Crawlee we can do that [in the `PlaywrightCrawler` constructor](https://crawlee.dev/api/playwright-crawler/interface/PlaywrightLaunchContext).

```js
const crawler = new PlaywrightCrawler({
    launchContext: {
        launchOptions: {
            headless: true, // setting headless in code
        },
    },
    requestHandler: async ({ page, request }) => {
        // ...
    },
    // ...
});
```

[`launchContext`](https://crawlee.dev/api/puppeteer-crawler/class/PuppeteerCrawler#launchContext) and [`launchOptions`](https://playwright.dev/docs/api/class-browsertype#browser-type-launch) give you control over launching browsers with Crawlee.

## Next up {#next}

We learned how to scrape with Cheerio and Playwright, but how do we process the scraped data? Let's learn that in the [next lesson](./processing_data.md).
