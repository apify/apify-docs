---
title: Saving results to CSV
description: Learn how to save the results of your scraper to a CSV file.
menuWeight: 20.8
paths:
    - data-collection-basics/save-to-csv
---

# [](#saving-to-csv) Saving results to CSV

In the last chapter, we were able collect data about all the on-sale products from <a href="https://commerce-qd83plqbj-mstephen19.vercel.app/" target="_blank">Morgan Webstore</a>. That's great. But we ended up with results printed to the terminal, which is not very useful for further processing. In this chapter, we'll learn how to save that data into a CSV file that you can then open in Excel or Google Sheets.

## [](#converting-to-csv) Converting to CSV

It might look like a big programming challenge to transform a JavaScript object into a CSV, but thanks to NPM, this is going to be a walk in the park. After googling **json to csv npm** we found that there's a library called <a href="https://www.npmjs.com/package/json2csv" target="_blank">`json2csv`</a> that can convert a JavaScript object to CSV format with a single function call. _Perfect!_

First, we need to import the `parse()` function from the library.

```JavaScript
import { parse } from 'json2csv';
```

Next, we need to parse the `results` array from the previous chapter with the imported function.

```JavaScript
const csv = parse(results);
```

The full code including the earlier scraping part now looks like this.

```JavaScript
// main.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';
import { parse } from 'json2csv';

const response = await gotScraping('https://commerce-qd83plqbj-mstephen19.vercel.app/search/on-sale');
const html = response.body;

const $ = cheerio.load(html);
const products = $('a[href*="/product/"]');

const results = [];

for (const product of products) {
    const element = $(product);

    const title = element.find('h3').text();
    const price = element.find('div[class*="price"]').text();

    results.push({
        title,
        price,
    });
}

const csv = parse(results);
console.log(csv)
```

And here's our newly created CSV printed to the console after running the script.

![Printing CSV data to terminal]({{@asset data_collection_basics/images/terminal-csv-new.png}})

## [](#writing-to-file) Writing the CSV to a file

The final task that remains is to save our CSV formatted data to a file on our disk, so we can open it or send it to someone. For this, we don't need any extra NPM packages because functions for saving files are included in Node.js.

First, we import the `writeFileSync` function from the `fs` (file system) package.

```js
import { writeFileSync } from 'fs';
```

and then call it with a file name and the CSV data.

```js
writeFileSync('alexa-websites.csv', csv);
```

When we complete writing the code, it should look like this.

```js
// main.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';
import { parse } from 'json2csv';
import { writeFileSync } from 'fs';

const response = await gotScraping('https://commerce-qd83plqbj-mstephen19.vercel.app/search/on-sale');
const html = response.body;

const $ = cheerio.load(html);
const products = $('a[href*="/product/"]');

const results = [];

for (const product of products) {
    const element = $(product);

    const title = element.find('h3').text();
    const price = element.find('div[class*="price"]').text();

    results.push({
        title,
        price,
    });
}

const csv = parse(results);
writeFileSync('products.csv', csv);
```

Finally, after running it again, we will find the `products.csv` file in our project folder. And when we open it with Excel/Google Sheets – voila!

![Displaying CSV data in Google Sheets]({{@asset data_collection_basics/images/data-in-sheets.png}})

This marks the end of the **Basics of data collection** section of the Web Scraping Academy. If you enjoyed the tutorial, give us a thumbs up down below and if you're eager to learn more...

## [](#next) Next up

Next up are the [**Basics of crawling**]({{@link crawling_basics.md}}), where we will learn how to move between web pages and scrape data from all of them. We will build a scraper that first collects all the countries of the <a href="https://www.alexa.com/topsites/countries" target="_blank">Alexa Top Sites by Country index</a> and then crawls each of them to scrape the data for each country separately.
