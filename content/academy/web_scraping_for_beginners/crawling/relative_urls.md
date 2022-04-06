---
title: Relative URLs
description: Learn about absolute and relative URLs used on web pages and how to work with them when parsing HTML with Cheerio in your scraper.
menuWeight: 4
paths:
- web-scraping-for-beginners/crawling/relative-urls
---

# [](#filtering-links) Relative URLs

You might have noticed in the previous lesson that while printing URLs to the DevTools console, they would always show in full length, like this:

```text
https://demo-webstore.apify.org/product/macbook-pro
```

But in the Elements tab, when checking the `<a href="...">` attributes, the URLs would look like this:

```text
/product/macbook-pro
```

What's up with that?! This short version of the URL is called a **relative URL**, and the full length one is called an **absolute URL**.

> <a href="https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL#absolute_urls_vs_relative_urls" target="_blank">Learn more about absolute and relative URLs</a>.

We'll see why the difference between relative URLs and absolute URLs is important a bit later in this lesson.

## [](#browser-vs-cheerio) Browser vs Cheerio: The Differences

Let's update the Node.js code from the [Finding links lesson]({{@link web_scraping_for_beginners/crawling/finding_links.md}}) to see why links with relative URLs can be a problem.

```JavaScript
// crawler.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

const response = await gotScraping('https://demo-webstore.apify.org/');
const html = response.body;

const $ = cheerio.load(html);

const productLinks = $('main.fit a[href*="/product/"]');

for (const link of productLinks) {
    const url = $(link).attr('href');
    console.log(url);
}
```

When you run this code in your terminal, you'll immediately see the difference. Unlike in the browser, where looping over elements produced absolute URLs, here in Node.js it only produces the relative ones. This is bad, because we can't use the relative URLs to crawl. They simply don't include all the necessary information.

## [](#resolving-urls) Resolving URLs

Luckily, there's a process called resolving URLs that creates absolute URLs from relative ones. We need two things. The relative URL, such as `/product/lightweight-jacket`, and the URL of the website where we found the relative URL (which is `https://demo-webstore.apify.org/` in our case).

```JavaScript
const websiteUrl = 'https://demo-webstore.apify.org/';
const relativeUrl = '/product/lightweight-jacket';

const absoluteUrl = new URL(relativeUrl, websiteUrl);
console.log(absoluteUrl.href);
```

In Node.js, when you create a `new URL()`, you can optionally pass a second argument, the base URL. When you do, the URL in the first argument will be resolved using the URL in the second argument. Note that the URL created from `new URL()` is an object, not a string. To get the URL in a string format, we use the `url.href` property, or alternatively the `url.toString()` function.

When we plug this into our crawler code, we will get the correct - absolute - URLs.

```JavaScript
// crawler.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

const WEBSITE_URL = 'https://demo-webstore.apify.org/';

const response = await gotScraping('https://demo-webstore.apify.org/');
const html = response.body;

const $ = cheerio.load(html);

const productLinks = $('main.fit a[href*="/product/"]');

for (const link of productLinks) {
    const relativeUrl = $(link).attr('href');
    const absoluteUrl = new URL(relativeUrl, WEBSITE_URL)
    console.log(absoluteUrl.href);
}
```

Cheerio can't resolve the URL itself, because until you provide the necessary information - it doesn't know where you originally downloaded the HTML from. The browser always knows which page you're on, so it will resolve the absolute URLs automatically.

## [](#next) Next up

The [next lesson]({{@link web_scraping_for_beginners/crawling/first_crawl.md}}) will teach you how to use the collected URLs to crawl all the individual product pages.
