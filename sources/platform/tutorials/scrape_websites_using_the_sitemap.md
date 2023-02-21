---
title: Scrape websites using the sitemap
description: The sitemap.xml file is a jackpot for every web scraper. Take advantage of this and learn a much easier way to extract data from websites using the Apify SDK.
sidebar_position: 3.9
slug: /tutorials/scrape-websites-using-the-sitemap
---

# Scrape websites using the sitemap

**The sitemap.xml file is a jackpot for every web scraper. Take advantage of this and learn a much easier way to extract data from websites using the Apify SDK.**

---

Let's say we want to scrape a database of craft beers ([brewbound.com](https://www.brewbound.com)) before summer starts. If we are lucky, the website will contain a sitemap at [https://www.brewbound.com/sitemap.xml](https://www.brewbound.com/sitemap.xml).

> Check out [Sitemap Sniffer](https://apify.com/vaclavrut/sitemap-sniffer) tool, which can discover sitemaps in hidden locations.

## The sitemap {#the-sitemap}

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

## Using the sitemap in Apify SDK and Crawlee {#using-the-sitemap-in-apify-sdk}

Our [web scraping and automation library](https://crawlee.dev/) is well-suited for scraping with sitemaps.

First, let's import the beer URLs from the sitemap to [RequestList](https://crawlee.dev/api/core/class/RequestList) using our regular expression to match only the (craft!) beer URLs and not pages of breweries, contact page, etc.

```js
const requestList = await RequestList.open(null, [{
    requestsFromUrl: 'https://www.brewbound.com/sitemap.xml',
    regex: /http(s)?:\/\/www\.brewbound\.com\/breweries\/[^\/<]+\/[^\/<]+/gm,
}]);
```

Now, let's use [PuppeteerCrawler](https://crawlee.dev/api/puppeteer-crawler/class/PuppeteerCrawler) to scrape the created [RequestList](https://crawlee.dev/api/core/class/RequestList) with [Puppeteer](https://pptr.dev) and push it to the final dataset.

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

        await Actor.pushData(data);
    },
});
```

## Full code example {#full-code-example}

If we create a new actor using the code below on the [Apify platform](https://console.apify.com/actors), it returns a nicely formatted spreadsheet containing a list of breweries with their beers and descriptions.

Make sure to use the [`apify/actor-node-puppeteer-chrome`](https://hub.docker.com/r/apify/actor-node-puppeteer-chrome) [image](../actors/development/base_docker_images.md) for your Dockerfile, otherwise the run will fail.

```js
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
