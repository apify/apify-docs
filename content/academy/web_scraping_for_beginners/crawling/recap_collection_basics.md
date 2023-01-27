---
title: Recap! - Data extraction
description: Review our e-commerce website scraper and refresh our memory about its code and the programming techniques we used to extract and save the data.
menuWeight: 1
paths:
- web-scraping-for-beginners/crawling/recap-extraction-basics
- web-scraping-for-beginners/crawling/recap-collection-basics
---

# [](#quick-recap) Recap of data extraction basics

We finished off the [first section]({{@link web_scraping_for_beginners/data_extraction.md}}) of the _Web Scraping for Beginners_ course by creating a simple web scraper in Node.js. The scraper collected all the on-sale products from [our demo webstore](https://demo-webstore.apify.org/search/on-sale). Let's see the code with some comments added.

```JavaScript
// First, we imported all the libraries we needed to
// download, extract, and convert the data we wanted
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';
import { parse } from 'json2csv';
import { writeFileSync } from 'fs';

// Here, we fetched the website's HTML and saved it to a new variable.
const response = await gotScraping('https://demo-webstore.apify.org/search/on-sale');
const html = response.body;

// We used Cheerio, a popular library, to parse (process)
// the downloaded HTML so that we could manipulate it.
const $ = cheerio.load(html);

// Using the div.site-listing CSS selector, we collected
// all the HTML elements which contained the 32 products' data.
const products = $('a[href*="/product/"]');

// Then, we prepared a new array to store the results.
const results = [];

// And looped over all the 32 elements to extract information
// for the individual products.
for (const product of products) {
    const element = $(product);

    // The title data was in an <h3> element
    const title = element.find('h3').text();
    // The price data was in a <div> element with a class
    // including the keyword "price"
    const price = element.find('div[class*="price"]').text();

    // We added the data to the results array
    // in the form of an object with keys and values.
    results.push({
        title,
        price,
    });
}

// Finally, we parsed the results from JSON format
// to CSV format
const csv = parse(results);

// Then, we wrote the CSV into the filesystem
writeFileSync('products.csv', csv)
```

> If some of the code is hard for you to understand, please review the [Basics of data extraction]({{@link web_scraping_for_beginners/data_extraction.md}}) section. We will not go through the details again in this section about crawling.

## [](#next) Next up

The [next lesson]({{@link web_scraping_for_beginners/crawling/finding_links.md}}) is all about finding some links to crawl on [Fakestore](https://demo-webstore.apify.org/).
