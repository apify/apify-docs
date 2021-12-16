---
title: First crawl
description: Learn how to crawl the web using Node.js, Cheerio and an HTTP client. Collect URLs from pages and use them to visit more websites.
menuWeight: 21.5
paths:
- crawling-basics/first-crawl
---

# [](#first-crawling) First crawl

In the previous chapters, we learned what crawling is and how to collect URLs from pages' HTML. The only thing that remains is to write the code. So let's get to it.

> If the code starts to look too complex for you, don't worry. We're showing it for educational purposes, so that you can learn how crawling works. At the end, we'll show you a much easier and faster way to crawl, using a specialized scraping library. If you want, you can skip the details and [go there now]({{@link crawling_basics/pro_scraping.md}}).

## [](#processing-urls) Processing URLs

In the previous chapters, we collected and filtered all the URLs pointing to individual country lists of the <a href="https://www.alexa.com/topsites/countries" target="_blank">Alexa Top Sites by Country index</a>. To crawl the URLs, we can't print them to the console, but rather we need to save them for future use. Once we do that, we must take this list of URLs and download the HTML of each of the pages. See the comments for changes and additions to the code.

```js
// crawler.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

const websiteUrl = 'https://www.alexa.com/topsites/countries';

const response = await gotScraping(websiteUrl);
const html = response.body;

const $ = cheerio.load(html);

const links = $('ul.countries a[href]');

// Prepare an empty array to store the URLs.
const countryUrls = [];

for (const link of links) {
    const relativeUrl = $(link).attr('href');
    const absoluteUrl = new URL(relativeUrl, websiteUrl);

    // Add the URL to the array.
    // We'll use the 'href', which is the URL in a string format.
    countryUrls.push(absoluteUrl.href);
}

// Loop over the stored URLs to process each page individually.
for (const url of countryUrls) {
    // Download HTML.
    const countryResponse = await gotScraping(url);
    const countryHtml = countryResponse.body;

    // Load into Cheerio to test the HTML.
    // We use $$ not to confuse with $ variable above.
    const $$ = cheerio.load(countryHtml);

    // Extract the page's title from the HTML.
    const pageTitle = $$('title').text();

    // Print the title to the terminal to see
    // whether we downloaded the correct HTML.
    console.log(pageTitle);
}
```

If you run the crawler from your terminal, it should print the titles. Or not? While writing this chapter, the <a href="https://www.alexa.com/topsites/countries/AX" target="_blank">Aland Islands</a> page was not available and therefore the crawler crashed a minute after visiting Afghanistan.

## [](#handling-errors) Handling errors

The code above is correct, but it's not robust. If something goes wrong, it will crash. That something could be a network error, internet connection error, or one of the websites you're trying to reach could simply be experiencing problems at that moment. Any error like that and your crawler would stop, and you would lose the data it collected so far.

In programming, you handle errors by catching them and then doing some action. Typically, printing information that the error occurred and/or retrying. Retrying is out of scope of this tutorial.

> The scraping library we'll [show you later]({{@link crawling_basics/pro_scraping.md}}) will handle errors and retries automatically for you.

```js
// crawler.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

const websiteUrl = 'https://www.alexa.com/topsites/countries';
const response = await gotScraping(websiteUrl);
const html = response.body;
const $ = cheerio.load(html);
const links = $('ul.countries a[href]');
const countryUrls = [];
for (const link of links) {
    const relativeUrl = $(link).attr('href');
    const absoluteUrl = new URL(relativeUrl, websiteUrl);
    countryUrls.push(absoluteUrl.href);
}

for (const url of countryUrls) {
    // Everything else is exactly the same.
    // We only wrapped the code in try/catch blocks.
    // The try block passes all errors into the catch block.
    // So, instead of crashing the crawler, they can be handled.
    try {
        // The try block attempts to execute our code
        const countryResponse = await gotScraping(url);
        const countryHtml = countryResponse.body;

        const $$ = cheerio.load(countryHtml);

        const pageTitle = $$('title').text();

        console.log(pageTitle);
    } catch (error) {
        // In the catch block, we handle errors.
        // This time, we will just print
        // the error message and the url.
        console.error(error.message, url);
    }
}
```

At the time of writing, only one website failed: the Aland Islands. In your crawling, you might get a different result. The important thing is that the crawler no longer crashes, and that it was able to download the HTML of all the countries except one.

> If you thought that the crawl was taking too long to complete, the [scraping library]({{@link crawling_basics/pro_scraping.md}}) will help once again. It automatically parallelizes the downloads and processing of HTML, which leads to significant speed improvements.

## [](#next) Next up

In the [next chapter]({{@link crawling_basics/scraping_the_data.md}}), we will complete the scraper. We will use the data collection code from the [Basics of data collection]({{@link data_collection_basics/node_continued.md}}) section and apply it to all the country pages.
