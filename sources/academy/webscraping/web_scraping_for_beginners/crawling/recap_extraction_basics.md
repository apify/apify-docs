---
title: Recap - Data extraction
description: Review our e-commerce website scraper and refresh our memory about its code and the programming techniques we used to extract and save the data.
sidebar_position: 1
slug: /web-scraping-for-beginners/crawling/recap-extraction-basics
---

# Recap of data extraction basics {#quick-recap}

**Review our e-commerce website scraper and refresh our memory about its code and the programming techniques we used to extract and save the data.**

---

We finished off the [first section](../data_extraction/index.md) of the _Web Scraping for Beginners_ course by creating a simple web scraper in Node.js. The scraper collected all the on-sale products from [Warehouse store](https://warehouse-theme-metal.myshopify.com/collections/sales). Let's see the code with some comments added.

```js
// First, we imported all the libraries we needed to
// download, extract, and convert the data we wanted
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';
import { parse } from 'json2csv';
import { writeFileSync } from 'fs';

// Here, we fetched the website's HTML and saved it to a new variable.
const storeUrl = 'https://warehouse-theme-metal.myshopify.com/collections/sales';
const response = await gotScraping(storeUrl);
const html = response.body;

// We used Cheerio, a popular library, to parse (process)
// the downloaded HTML so that we could manipulate it.
const $ = cheerio.load(html);

// Using the .product-item CSS selector, we collected all the HTML
// elements which contained data about individual products.
const products = $('.product-item');

// Then, we prepared a new array to store the results.
const results = [];

// And looped over all the elements to extract
// information about the individual products.
for (const product of products) {
    // The product's title was in an <a> element
    // with the CSS class: product-item__title
    const titleElement = $(product).find('a.product-item__title');
    const title = titleElement.text().trim();
    // The product's price was in a <span> element
    // with the CSS class: price
    const priceElement = $(product).find('span.price');
    // Because the <span> also included some useless data,
    // we had to extract the price from a specific HTML node.
    const price = priceElement.contents()[2].nodeValue.trim();

    // We added the data to the results array
    // in the form of an object with keys and values.
    results.push({ title, price });
}

// Finally, we formatted the results
// as a CSV file instead of a JS object
const csv = parse(results);

// Then, we saved the CSV to the disk
writeFileSync('products.csv', csv)
```

> If some of the code is hard for you to understand, please review the [Basics of data extraction](../data_extraction/index.md) section. We will not go through the details again in this section about crawling.

## Next up {#next}

The [next lesson](./finding_links.md) is all about finding some links to crawl on [Warehouse store](https://warehouse-theme-metal.myshopify.com/collections/sales).
