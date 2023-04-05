---
title: Your first crawl
description: Learn how to crawl the web using Node.js, Cheerio and an HTTP client. Extract URLs from pages and use them to visit more websites.
sidebar_position: 5
slug: /web-scraping-for-beginners/crawling/first-crawl
---

# Your first crawl {#your-first-crawl}

**Learn how to crawl the web using Node.js, Cheerio and an HTTP client. Extract URLs from pages and use them to visit more websites.**

---

In the previous lessons, we learned what crawling is and how to extract URLs from a page's HTML. The only thing that remains is to write the code - so let's get right to it!

> If the code starts to look too complex to you, don't worry. We're showing it for educational purposes, so that you can learn how crawling works. Near the end of this course, we'll show you a much easier and faster way to crawl, using a specialized scraping library. If you want, you can skip the details and [go there now](./pro_scraping.md).

## Processing URLs {#processing-urls}

In the previous lessons, we collected and filtered all the URLs pointing to individual products in the [Sales category of Warehouse store](https://warehouse-theme-metal.myshopify.com/collections/sales). To crawl the URLs, we must take the whole list we collected and download the HTML of each of the pages. See the comments for changes and additions to the code.

```js
// crawler.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

const WEBSITE_URL = 'https://warehouse-theme-metal.myshopify.com';
const storeUrl = `${WEBSITE_URL}/collections/sales`;

const response = await gotScraping(storeUrl);
const html = response.body;

const $ = cheerio.load(html);

const productLinks = $('a.product-item__title');

// Prepare an empty array for our product URLs.
const productUrls = [];

for (const link of productLinks) {
    const relativeUrl = $(link).attr('href');
    const absoluteUrl = new URL(relativeUrl, WEBSITE_URL)

    // Collect absolute product URLs.
    productUrls.push(absoluteUrl);
}

// Loop over the stored URLs to process
// each product page individually.
for (const url of productUrls) {
    // Download HTML.
    const productResponse = await gotScraping(url);
    const productHtml = productResponse.body;

    // Load into Cheerio to parse the HTML.
    const $productPage = cheerio.load(productHtml);

    // Extract the product's title from the <h1> tag.
    const productPageTitle = $productPage('h1').text().trim();

    // Print the title to the terminal to see
    // confirm we downloaded the correct pages.
    console.log(productPageTitle);
}
```

If you run the crawler from your terminal, it will print the titles of all the products on sale in the Warehouse store.

## Handling errors {#handling-errors}

The code above is correct, but it's not robust. If something goes wrong, it will crash. That something could be a network error, an internet connection error, or the websites you're trying to reach could be experiencing problems at that moment. Hitting any error like that would cause the current crawler to stop entirely, which means we would lose all the data it had collected so far.

In programming, you handle errors by catching and handling them. Typically by printing information that the error occurred and/or retrying.

> The scraping library we'll [show you in the following lessons](./pro_scraping.md) handles errors and retries automatically for you.

```js
// crawler.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

const WEBSITE_URL = 'https://warehouse-theme-metal.myshopify.com';
const storeUrl = `${WEBSITE_URL}/collections/sales`;

const response = await gotScraping(storeUrl);
const html = response.body;

const $ = cheerio.load(html);
const productLinks = $('a.product-item__title');

const productUrls = [];
for (const link of productLinks) {
    const relativeUrl = $(link).attr('href');
    const absoluteUrl = new URL(relativeUrl, WEBSITE_URL)
    productUrls.push(absoluteUrl);
}

for (const url of productUrls) {
    // Everything else is exactly the same.
    // We only wrapped the code in try/catch blocks.
    // The try block passes all errors into the catch block.
    // So, instead of crashing the crawler, they can be handled.
    try {
        // The try block attempts to execute our code
        const productResponse = await gotScraping(url);
        const productHtml = productResponse.body;
        const $productPage = cheerio.load(productHtml);
        const productPageTitle = $productPage('h1').text().trim();
        console.log(productPageTitle);
    } catch (error) {
        // In the catch block, we handle errors.
        // This time, we will just print
        // the error message and the url.
        console.error(error.message, url)
    }
}
```

At the time of writing, none of the links have failed; however, as you crawl more pages, you will surely hit a few errors 😉. The important thing is that the crawler will no longer crash if an error does in fact occur, and that it will be able to download the HTML from the working product links.

> If you thought that the crawl was taking too long to complete, the [scraping library](./pro_scraping.md) we keep referring to will help once again. It automatically parallelizes the downloads and processing of HTML, which leads to significant speed improvements.

## Next up {#next}

In the [next lesson](./scraping_the_data.md), we will complete the scraper by extracting data about all the products from their individual pages.
