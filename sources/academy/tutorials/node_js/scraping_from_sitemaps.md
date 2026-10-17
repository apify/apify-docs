---
title: How to scrape from sitemaps
description: The sitemap.xml file is a jackpot for every web scraper developer. Take advantage of this and learn an easier way to extract data from websites using Crawlee.
sidebar_position: 14.7
slug: /node-js/scraping-from-sitemaps
tags: [node-js, crawling]
---

import Example from '!!raw-loader!roa-loader!./scraping_from_sitemaps.js';

:::tip Processing sitemaps automatically with Crawlee

Crawlee allows you to scrape sitemaps with ease. If you are using Crawlee, you can skip the following steps and just gather all the URLs from the sitemap in a few lines of code.

:::

```js
import { RobotsFile } from 'crawlee';

const robots = await RobotsFile.find('https://www.mysite.com');

const allWebsiteUrls = await robots.parseUrlsFromSitemaps();
```

**The sitemap.xml file is a jackpot for every web scraper developer. Take advantage of this and learn an easier way to extract data from websites using Crawlee.**

---

Let's say we want to scrape a database of craft beers ([brewbound.com](https://www.brewbound.com/)) before summer starts. If we are lucky, the website will provide a sitemap. Brewbound does: [brewbound.com/sitemaps/breweries.xml](https://www.brewbound.com/sitemaps/breweries.xml) lists all the breweries and their beers.

> To find a website's sitemaps automatically, try the [Sitemap Detector](https://apify.com/coder_zoro/sitemap-detector) Actor.

## Analyzing the sitemap {#analyzing-the-sitemap}

The sitemap is usually located at the path **/sitemap.xml**. It is always worth trying that URL, as it is rarely linked anywhere on the site. It usually contains a list of all pages in [XML format](https://en.wikipedia.org/wiki/XML). Larger websites often split their sitemap into smaller files and list them in their [`robots.txt`](https://www.brewbound.com/robots.txt) file, as Brewbound does.

```XML
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.brewbound.com/breweries/Cisco_Brewers/Whales_Tale_Pale_Ale</loc>
        <lastmod>2020-04-13</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.89</priority>
    </url>
    <url>
    ...
```

The URLs of breweries take this form:

```text
https://www.brewbound.com/breweries/[BREWERY_NAME]
```

And the URLs of craft beers look like this:

```text
https://www.brewbound.com/breweries/[BREWERY_NAME]/[BEER_NAME]
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
    requestsFromUrl: 'https://www.brewbound.com/sitemaps/breweries.xml',
    regex: /http(s)?:\/\/www\.brewbound\.com\/breweries\/[^/<]+\/[^/<]+/gm,
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

If we create a new Actor using the code below on the [Apify platform](../../platform/apify_platform.md), it returns a nicely formatted spreadsheet containing a list of breweries with their beers with descriptions.

Make sure to use the **apify/actor-node-puppeteer-chrome** image for your Dockerfile, otherwise the run will fail.

<RunnableCodeBlock className="language-js" type="puppeteer">
    {Example}
</RunnableCodeBlock>
