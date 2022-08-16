---
title: Scrape websites using the sitemap
description: The sitemap.xml file is a jackpot for every web scraper. Take advantage of this and learn a much easier way to extract data from websites using the Apify SDK.
menuWeight: 3.9
paths:
    - tutorials/scrape-websites-using-the-sitemap
---

# Scrape websites using the sitemap

Let's say we want to scrape a database of craft beers ([brewbound.com](https://www.brewbound.com)) before the summer season starts. If we are lucky, the website will contain a sitemap at [https://www.brewbound.com/sitemap.xml](https://www.brewbound.com/sitemap.xml).

> Check out [Sitemap Sniffer](https://apify.com/vaclavrut/sitemap-sniffer) tool, which can discover sitemaps in hidden locations.

## [](#the-sitemap) The sitemap

The sitemap is usually located at the path `/sitemap.xml`. It is always worth trying that URL, as it is rarely linked anywhere on the site. It usually contains a list of all pages in [XML format](https://www.w3.org/standards/xml/core).

```xml
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

The URLs of breweries are in the form

```cURL
http://www.brewbound.com/breweries/[BREWERY_NAME]
```

and the URLs of craft beers are in the form

```cURL
http://www.brewbound.com/breweries/[BREWERY_NAME]/[BEER_NAME]
```

They can be matched with the following regular expression (regex).

```cURL
/http(s)?:\/\/www\.brewbound\.com\/breweries\/[^\/]+\/[^\/<]+/gm
```

Note the two parts of the regular expression `[^\/<]` containing `<`. This is because we want to exclude the `</loc>` tag, which closes each URL.

## [](#using-the-sitemap-in-apify-sdk) Using the sitemap in Apify SDK

Our [web scraping and automation library](https://sdk.apify.com) is well-suited for scraping with sitemaps.

First, let's import the beer URLs from the sitemap to [RequestList](https://sdk.apify.com/docs/api/request-list#docsNav) using our regular expression to match only the (craft!) beer URLs and not pages of breweries, contact page, etc.

```javascript
const requestList = await RequestList.open(null, [{
    requestsFromUrl: 'https://www.brewbound.com/sitemap.xml',
    regex: /http(s)?:\/\/www\.brewbound\.com\/breweries\/[^\/<]+\/[^\/<]+/gm,
}]);
```

Now, let's use [PuppeteerCrawler](https://sdk.apify.com/docs/api/puppeteer-crawler#docsNav) to scrape the created [RequestList](https://sdk.apify.com/docs/api/request-list#docsNav) with [Puppeteer](https://pptr.dev) and push it to the final dataset.

```javascript
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

        await Actor.pushData(data);
    },
});
```

## [](#full-code-example) Full code example

If we create a new actor using the code below on the Apify [platform](https://console.apify.com/actors), it returns a nicely formatted spreadsheet containing a list of breweries with their beers and descriptions.

Make sure to select the **Node.js 12 + Chrome on Debian** ([apify/actor-node-chrome](https://hub.docker.com/r/apify/actor-node-chrome/)) [base image]({{@link actors/development/base_docker_images.md}}), otherwise the run will fail.

```javascript
import { Actor } from 'apify';
import { RequestList, PuppeteerCrawler } from 'crawlee';

await Actor.init();

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

        await Actor.pushData(data);
    },
});

await crawler.run();

await Actor.exit();
```
