---
title: Relative URLs
description: Learn about absolute and relative URLs used on web pages and how to work with them when parsing HTML with Cheerio in your scraper.
menuWeight: 21.4
paths:
- web-scraping-for-beginners/crawling/relative-urls
---

# [](#filtering-links) Relative URLs

Maybe you noticed in the previous chapter that while printing URLs to the DevTools console, they would always show in full length, like this:

```text
https://www.alexa.com/topsites/countries/GB
```

But in the Elements tab, when checking the `<a href="...">` attributes, the URLs would look like this:

```text
countries/GB
```

This short version of the URL is called a **relative URL** and the full length one is called an **absolute URL**.

> <a href="https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL#absolute_urls_vs_relative_urls" target="_blank">Learn more about absolute and relative URLs</a>.

We'll see why that's important in a minute.

## [](#browser-vs-cheerio) Browser and Cheerio differences

Let's update the Node.js code from the [Finding links chapter]({{@link web_scraping_for_beginners/crawling/finding_links.md}}) to see why links with relative URLs can be a problem.

```js
// crawler.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

const response = await gotScraping('https://www.alexa.com/topsites/countries');
const html = response.body;

const $ = cheerio.load(html);

// Update the selector to find only the countries' URLs
const links = $('ul.countries a[href]');
for (const link of links) {
    const url = $(link).attr('href');
    console.log(url);
}
```

When you run this code in your terminal, you'll immediately see the difference. Unlike in the browser, where looping over elements produced absolute URLs, here in Node.js it only produces the relative ones. This is bad, because we can't use the relative URLs to crawl. They simply don't include all the necessary information.

## [](#resolve-url) Resolving URLs

Luckily, there's a process called resolving URLs that creates absolute URLs from relative ones. We need two things. The relative URL, such as `countries/GB` and the URL of the website where we found the relative URL: `https://www.alexa.com/topsites/countries`.

```js
const websiteUrl = 'https://www.alexa.com/topsites/countries';
const relativeUrl = 'countries/GB';

const absoluteUrl = new URL(relativeUrl, websiteUrl);
console.log(absoluteUrl.href);
```

In Node.js, when you create a `new URL()`, you can optionally pass a second argument, the base URL. When you do, the URL in the first argument will be resolved using the URL in the second argument. Note that the URL created from `new URL` is an object, not a string. To get the URL in a string format, we use the `url.href` property.

When we plug this into our crawler code, we will get the correct - absolute - URLs.

```js
// crawler.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

const websiteUrl = 'https://www.alexa.com/topsites/countries';

const response = await gotScraping(websiteUrl);
const html = response.body;

const $ = cheerio.load(html);

const links = $('ul.countries a[href]');
for (const link of links) {
    const relativeUrl = $(link).attr('href');
    const absoluteUrl = new URL(relativeUrl, websiteUrl);
    console.log(absoluteUrl.href);
}
```

Cheerio can't resolve the URL itself, because until you provide the necessary information, it doesn't know where you originally downloaded the HTML from. The browser always knows which page you're on, so it will do the resolving automatically.

## [](#next) Next up

The [next chapter]({{@link web_scraping_for_beginners/crawling/first_crawl.md}}) will teach you how to use the collected URLs to crawl all the country-specific pages.
