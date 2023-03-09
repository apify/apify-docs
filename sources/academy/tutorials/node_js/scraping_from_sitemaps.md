---
title: How to scrape from sitemaps
description: The sitemap.xml file is a jackpot for every web scraper developer. Take advantage of this and learn an easier way to extract data from websites using Crawlee.
sidebar_position: 14.7
slug: /node-js/scraping-from-sitemaps
---

# How to scrape from sitemaps {#scraping-with-sitemaps}

**The sitemap.xml file is a jackpot for every web scraper developer. Take advantage of this and learn an easier way to extract data from websites using Crawlee.**

---

Let's say we want to scrape a database of craft beers ([brewbound.com](https://brewbound.com)) before summer starts. If we are lucky, the website will contain a sitemap at [https://www.brewbound.com/sitemap.xml](https://www.brewbound.com/sitemap.xml).

> Check out [Sitemap Sniffer](https://apify.com/vaclavrut/sitemap-sniffer), which can discover sitemaps in hidden locations!

## Analyzing the sitemap {#analyzing-the-sitemap}

The sitemap is usually located at the path **/sitemap.xml**. It is always worth trying that URL, as it is rarely linked anywhere on the site. It usually contains a list of all pages in [XML format](https://www.w3.org/standards/xml/core).

```XML
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>http://www.brewbound.com/advertise</loc>
        <lastmod>2015-03-19</lastmod>
        <changefreq>daily</changefreq>
    </url>
    <url>
    ...
```

The URLs of breweries take this form:

```text
http://www.brewbound.com/breweries/[BREWERY_NAME]
```

And the URLs of craft beers look like this:

```text
http://www.brewbound.com/breweries/[BREWERY_NAME]/[BEER_NAME]
```

They can be matched using the following regular expression:

```regexp
http(s)?:\/\/www\.brewbound\.com\/breweries\/[^\/]+\/[^\/<]+
```

Note the two parts of the regular expression `[^\/<]` containing the `<` symbol. This is because we want to exclude the `</loc>` tag, which closes each URL.

## Scraping the sitemap in Crawlee {#scraping-the-sitemap}

If you're scraping sitemaps (or anything else, really), [Crawlee](https://crawlee.dev) is perfect for the job.

First, let's add the beer URLs from the sitemap to the [`RequestList`](https://crawlee.dev/api/core/class/RequestList) using our regular expression to match only the (craft!!) beer URLs and not pages of breweries, contact page, etc.

```js
const requestList = await RequestList.open(null, [{
    requestsFromUrl: 'https://www.brewbound.com/sitemap.xml',
    regex: /http(s)?:\/\/www\.brewbound\.com\/breweries\/[^\/<]+\/[^\/<]+/gm,
}]);
```

Now, let's use [`PuppeteerCrawler`](https://crawlee.dev/api/puppeteer-crawler/class/PuppeteerCrawler) to scrape the created `RequestList` with [Puppeteer](https://pptr.dev/) and push it to the final dataset.

```js
const crawler = new PuppeteerCrawler({
    requestList,
    async requestHandler({ page }) {
        const beerPage = await page.evaluate(() => {
            return document.getElementsByClassName('productreviews').length;
        });
        if (!beerPage) return;

        const data = await page.evaluate(() => {
            const title = document.getElementsByTagName('h1')[0].innerText;
            const [brewery, beer] = title.split(':');
            const description = document.getElementsByClassName('productreviews')[0].innerText;

            return { brewery, beer, description };
        });

        await Dataset.pushData(data);
    },
});
```

## Full code {#full-code}

If we create a new actor using the code below on the [Apify platform](../../platform/apify_platform.md), it returns a nicely formatted spreadsheet containing a list of breweries with their beers with descriptions.

Make sure to use the **apify/actor-node-puppeteer-chrome** image for your Dockerfile, otherwise the run will fail.

```js
import { Dataset, RequestList, PuppeteerCrawler } from 'crawlee';

const requestList = await RequestList.open(null, [{
    requestsFromUrl: 'https://www.brewbound.com/sitemap.xml',
    regex: /http(s)?:\/\/www\.brewbound\.com\/breweries\/[^\/<]+\/[^\/<]+/gm,
}]);

const crawler = new PuppeteerCrawler({
    requestList,
    async requestHandler({ page }) {
        const beerPage = await page.evaluate(() => {
            return document.getElementsByClassName('productreviews').length;
        });
        if (!beerPage) return;

        const data = await page.evaluate(() => {
            const title = document.getElementsByTagName('h1')[0].innerText;
            const [brewery, beer] = title.split(':');
            const description = document.getElementsByClassName('productreviews')[0].innerText;

            return { brewery, beer, description };
        });

        await Dataset.pushData(data);
    },
});

await crawler.run();
```
