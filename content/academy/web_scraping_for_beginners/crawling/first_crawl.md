---
title: First Crawl
description: Learn how to crawl the web using Node.js, Cheerio and an HTTP client. Collect URLs from pages and use them to visit more websites.
menuWeight: 5
paths:
    - web-scraping-for-beginners/crawling/first-crawl
---

# [](#first-crawling) First crawl

In the previous lessons, we learned what crawling is and how to collect URLs from a page's HTML. The only thing that remains is to write the code - so let's get right to it!

> If the code starts to look too complex for you, don't worry. We're showing it for educational purposes, so that you can learn how crawling works. Near the end of this module, we'll show you a much easier and faster way to crawl, using a specialized scraping library. If you want, you can skip the details and [go there now]({{@link web_scraping_for_beginners/crawling/pro_scraping.md}}).

## [](#processing-urls) Processing URLs

In the previous lessons, we collected and filtered all the URLs pointing to individual products on our beloved <a href="https://demo-webstore.apify.org/" target="_blank">demo e-commerce site</a>. To crawl the URLs, we can't print them to the console, but rather we need to save them for future use. Once we do that, we must take this list of URLs and download the HTML of each of the pages. See the comments for changes and additions to the code.

```JavaScript
// crawler.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

const WEBSITE_URL = 'https://demo-webstore.apify.org/';

const response = await gotScraping('https://demo-webstore.apify.org/');
const html = response.body;

const $ = cheerio.load(html);

const productLinks = $('a[href*="/product/"]');

// Prepare an empty array for our product Urls
const productsToScrape = [];

for (const link of productLinks) {
    const relativeUrl = $(link).attr('href');
    const absoluteUrl = new URL(relativeUrl, WEBSITE_URL);

    // add each product link to our array
    productsToScrape.push(absoluteUrl.href);
}

// Loop over the stored URLs to process each
// product page individually
for (const link of productsToScrape) {
    // Download HTML.
    const productResponse = await gotScraping(link);
    const productHTML = productResponse.body;

    // Load into Cheerio to test the HTML.
    // We use $$ to avoid confusion with $ variable above.
    const $$ = cheerio.load(productHTML);

    // Extract the product's title from the <h3> tag
    const productPageTitle = $$('h3').text();

    // Print the title to the terminal to see
    // whether we downloaded the correct HTML.
    console.log(productPageTitle);
}
```

If you run the crawler from your terminal, it should print the titles.

## [](#handling-errors) Handling errors

The code above is correct, but it's not robust. If something goes wrong, it will crash. That something could be a network error, an internet connection error, or just that one of the websites you're trying to reach could simply be experiencing problems at that moment. Hitting any error like that would cause our current crawler to stop entirely, which means we would lose all the data it had collected so far.

In programming, you handle errors by catching them and then doing some action. Typically, printing information that the error occurred and/or retrying.

> The scraping library we'll [show you later]({{@link web_scraping_for_beginners/crawling/pro_scraping.md}}) will handle errors and retries automatically for you.

```JavaScript
// crawler.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

const WEBSITE_URL = 'https://demo-webstore.apify.org/';

const response = await gotScraping('https://demo-webstore.apify.org/');
const html = response.body;
const $ = cheerio.load(html);

const productLinks = $('a[href*="/product/"]');

const productsToScrape = [];
for (const link of productLinks) {
    const relativeUrl = $(link).attr('href');
    const absoluteUrl = new URL(relativeUrl, WEBSITE_URL);
    productsToScrape.push(absoluteUrl.href);
}

for (const link of productsToScrape) {
    // Everything else is exactly the same.
    // We only wrapped the code in try/catch blocks.
    // The try block passes all errors into the catch block.
    // So, instead of crashing the crawler, they can be handled.
    try {
        // The try block attempts to execute our code
        const productResponse = await gotScraping(link);
        const productHTML = productResponse.body;
        const $$ = cheerio.load(productHTML);
        const productPageTitle = $$('h3').text();
        console.log(productPageTitle);
    } catch (error) {
        // In the catch block, we handle errors.
        // This time, we will just print
        // the error message and the url.
        console.error(error.message, link)
    }
}
```

At the time of writing, none of the links have failed; however, in your crawling endeavors, you will surely hit a few errors 😉. The important thing is that the crawler no longer crashes if an error does in fact occur, and that it was able to download the HTML from each product's link.

> If you thought that the crawl was taking too long to complete, the [scraping library]({{@link web_scraping_for_beginners/crawling/pro_scraping.md}}) we keep referring to will help once again. It automatically parallelizes the downloads and processing of HTML, which leads to significant speed improvements.

## [](#next) Next up

In the [next lesson]({{@link web_scraping_for_beginners/crawling/scraping_the_data.md}}), we will complete the scraper by using the data collection code from the [Basics of data collection]({{@link web_scraping_for_beginners/data_collection/node_continued.md}}) section and applying it to all of the product pages.
