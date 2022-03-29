---
title: Node.js continued
description: Continue learning how to create a web scraper with Node.js and cheerio. Learn how to parse HTML and print results.
menuWeight: 20.7
paths:
    - data-collection-basics/node-continued
---

# [](#finish-scraper) Finish Node.js scraper

In the first part of the Node.js tutorial we downloaded the HTML of our <a href="https://commerce-qd83plqbj-mstephen19.vercel.app/search/on-sale" target="_blank">Morgan Webstore e-commerce site</a> and parsed it with Cheerio. Now, we will replicate the collection logic from the [Collecting Data with DevTools]({{@link data_collection_basics/using_devtools.md}}) chapters and finish our scraper.

## [](#querying-with-cheerio) Querying data with Cheerio

As a reminder, the data we need for each product on the page is available in each `a[href*="/product/"]` element.

![Selecting an element from the Elements tab]({{@asset data_collection_basics/images/selecting-container-element-new.png}})

To get all the elements with that CSS selector using Cheerio, we call the `$` function with the selector.

```JavaScript
$('a[href*="/product/"]');
```

We will use the same approach as in the previous DevTools chapters. Using a `for..of` loop we will iterate over the array of products we saved in the `products` variable. The code is a little different from DevTools, because we're using Node.js and Cheerio (which used jQuery syntax) instead of a browser (using Vanilla JavaScript syntax).

```JavaScript
// main.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

const response = await gotScraping('https://commerce-qd83plqbj-mstephen19.vercel.app/search/on-sale');
const html = response.body;

const $ = cheerio.load(html);
const products = $('a[href*="/product/"]');

for (const product of products) {
    const element = $(product);

    console.log(element.textContent);
}
```

After you run this script, you should see data of all the 32 products printed in your terminal. Don't forget about the `const element = $(product);` line. Without wrapping each `product` with `$()`, we wouldn't be able to call the `.text()` method on it.

## [](#collecting-data) Collecting final data

Now, we just need to repeat the process from the DevTools modules and add individual data point collection to the loop. From those chapters, we know that each of our product container `<a>` tags includes an `<h3>` element including the title, and a `<div>` price element matching the selector `div[class*="price"]`.

![Finding child elements in Elements tab]({{@asset data_collection_basics/images/find-child-elements.webp}})

We will loop over all the `products` and collect the data points from each of them using the `for..of` loop. For reference, this is the code from the DevTools chapter, where we collected the data **using a browser**:

```JavaScript
// This code will only work in the browser, and NOT in Node.js
const results = [];

for (const product of products) {
    const title = product.querySelector('h3').textContent.trim();
    const price = product.querySelector('div[class*="price"]').textContent.trim();

    results.push({
        title,
        price,
    });
};

console.log(results);
```

And this is how the code will look like when using **Node.js and Cheerio**. Similar, right?!

```JavaScript
const results = [];

for (const product of products) {
    const element = $(product);

    const title = element.find('h3').text();
    const price = element.find('div[class*="price"]').text();

    results.push({
        title,
        price,
    })
}

console.log(results);
```

The main difference is that we used the <a href="https://api.jquery.com/find/" target="_blank">`.find()`</a> function to select our `h3` and `div[class*="price"]` elements. If you find the differences confusing, don't worry about it. It will begin to feel very natural after a bit of practice. The final scraper code looks like this:

```js
// main.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

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
    })
}

console.log(results);
```

![Printing all products' data to terminal]({{@asset data_collection_basics/images/terminal-all-products-data.png}})

If you were able to get here, run the code, get results and also understand everything, you can pat yourself on the back and congratulate yourself on completing the **Basics of data collection** part of the Web Scraping Academy. Great job! 👏🎉

# [](#next) Next up

While we were able to collect the data, it's not very useful to have those printed to the console. In the [next, bonus chapter]({{@link data_collection_basics/save_to_csv.md}}), we will learn how to convert the data to a CSV and save it to a file.
