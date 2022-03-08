---
title: Headless browser
description: Learn how to scrape the web with a headless browser using only a few lines of code. Chrome, Firefox, Safari, Edge - all are supported.
menuWeight: 21.8
paths:
- web-scraping-for-beginners/crawling/headless-browser
---

# [](#headless-browser) Headless browser

A headless browser is simply a browser that runs without the user interface. This means that it's normally controlled by automated scripts. Headless browsers are very popular in scraping because they can help you render JavaScript or behave like a human user to prevent blocking. The two most popular libraries for controlling headless browsers are [Puppeteer](https://pptr.dev/) and [Playwright](https://playwright.dev/). The Apify SDK supports both.

## [](#playwright-scraper) Building a Playwright scraper

Building a Playwright scraper with the Apify SDK is extremely easy. To show you how easy, we'll reuse the Cheerio scraper code from the previous chapter, and by changing only a few lines of code, we'll turn it into a full headless scraper.

First, we must not forget to install Playwright into our project.

```shell
npm install --save playwright
```

After Playwright installs, we can proceed with updating the scraper code. As always, the comments describe changes in the code. Everything else is the same as before.

```js
// apify.js
import Apify from 'apify';
// Don't forget to import cheerio, we will need it later.
import cheerio from 'cheerio';

await Apify.utils.purgeLocalStorage();

const requestQueue = await Apify.openRequestQueue();
await requestQueue.addRequest({
    url: 'https://www.alexa.com/topsites/countries',
    userData: {
        label: 'START',
    },
});

// Replace CheerioCrawler with PlaywrightCrawler
const crawler = new Apify.PlaywrightCrawler({
    requestQueue,
    handlePageFunction: async ({ page, request }) => {
        console.log('URL:', request.url);

        // Here we extract the HTML from the browser and parse
        // it with Cheerio. Thanks to that we can use exactly
        // the same code as before, when using CheerioCrawler.
        const html = await page.content();
        const $ = cheerio.load(html);

        const sites = $('div.site-listing');
        for (const site of sites) {
            const fields = $(site).find('div.td');
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

        if (request.userData.label === 'START') {
            await Apify.utils.enqueueLinks({
                $,
                requestQueue,
                selector: 'ul.countries a[href]',
                baseUrl: request.loadedUrl,
            });
        }
    },
});

await crawler.run();
```

Yes, that's it. We added 3 lines and changed 1 line of code. The scraper now runs exactly the same as before, but using a full Chromium browser instead of plain HTTP requests and Cheerio. This is the true power of the Apify SDK.

Using Playwright in combination with Cheerio like this is only one of many ways how you can utilize Playwright (and Puppeteer) with the Apify SDK. In the advanced courses of the Academy, we will go deeper into using headless browsers for scraping and web automation (RPA) use-cases.

## [](#headless) Running headless

We said that headless browsers didn't have a UI, but while scraping with the above scraper, we're sure your screen was full of browser tabs. That's because in the Apify SDK, browsers run **headful** (with UI) by default. This is useful for debugging and seeing what's going on in the browser. Once the scraper is complete, we switch to **headless**. There are two ways to do it.

### [](#headless-env-var) Environment variable

This is the programmer's preferred solution, because you don't have to change the source code to change the behavior. All you need to do is set the [`APIFY_HEADLESS=1`](https://sdk.apify.com/docs/guides/environment-variables#apify_headless) environment variable when running your scraper, and it will automatically run headless. For example like this:

```marked-tabs
<marked-tab header="MacOS/Linux" lang="shell">
APIFY_HEADLESS=1 node apify.js
</marked-tab>
<marked-tab header="Windows CMD" lang="shell">
set APIFY_HEADLESS=1 && node apify.js
</marked-tab>
<marked-tab header="Windows Powershell" lang="shell">
$env:APIFY_HEADLESS=1; & node apify.js
</marked-tab>
```

### [](#headless-code) Scraper code

If you always want the scraper to run headless, it might be better to hardcode it in the source. To do that, we need to access [Playwright's launch options](https://playwright.dev/docs/api/class-browsertype#browser-type-launch-option-headless). In the Apify SDK we can do that [in the `PlaywrightCrawler` constructor](https://sdk.apify.com/docs/typedefs/playwright-crawler-options#launchcontext).

```js
const crawler = new Apify.PlaywrightCrawler({
    requestQueue,
    launchContext: {
        launchOptions: {
            headless: true, // setting headless in code
        },
    },
    handlePageFunction: async ({ page, request }) => {
        // ...
    },
    // ...
});
```

[`launchContext`](https://sdk.apify.com/docs/typedefs/playwright-launch-context) and [`launchOptions`](https://playwright.dev/docs/api/class-browsertype#browser-type-launch) give you control over launching browsers with the Apify SDK.

## [](#next) Next up

We learned how to scrape with Cheerio and Playwright, but how do we process the scraped data? Let's learn that in the [next chapter]({{@link web_scraping_for_beginners/crawling/processing_data.md}}).
