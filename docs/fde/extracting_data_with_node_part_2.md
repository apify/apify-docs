---
title: Extracting data with Node.js - Part 2
description: Continue learning how to create a web scraper with Node.js and cheerio. Learn how to parse HTML and print results.
menuWeight: 20.7
paths:
    - fde/extracting-data-with-node-part-2
---

# [](#extracting-data-with-node) Extracting data with Node.js - Part 2

The first part of this chapter we downloaded the HTML of [Alexa Top Sites index](https://www.alexa.com/topsites) and parsed it with `cheerio`. Now we will replicate the extraction logic from the [Extracting Data with DevTools]({{@link academy/fde/extracting_data_with_devtools_part_1.md}}) chapters and finish our scraper.

## [](#querying-with-cheerio) Querying data with Cheerio

As a reminder, the data we need from the Top Sites index is available in the 50 `<div>` elements with class `site-listing`. The CSS selector to find those is `div.site-listing`.

![Selecting an element from the Elements tab]({{@asset fde/imagesselecting-container-element.webp}})

To get all the elements with that selector using `cheerio` we call the `$` function with the selector.

```js
$('div.site-listing');
```

Unfortunately Cheerio and JQuery do not use the JavaScript `.forEach()` and `.map()` methods, so we'll first convert the results into an array using the `.toArray()` method and then print all the unstructured data to the console to make sure everything's working correctly.

```js
// main.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

const response = await gotScraping('https://www.alexa.com/topsites');
const html = response.body;

const $ = cheerio.load(html);
const sites = $('div.site-listing').toArray();
sites.forEach((site) => {
    const element = $(site);
    console.log(element.text());
});
```

After you run this script, you should see data of all the 50 sites printed in your terminal.

## [](#extracting-data) Extracting final data

Now we only need to repeat the process from the DevTools chapters and add individual data point extraction to the loop. From those chapters we know that the data are in `<div>` elements with class `td`.

![Finding child elements in Elements tab]({{@asset fde/imagesfind-child-elements.webp}})

We will loop over all the `sites` and extract the data points from each of them using the `array.map()` function. For reference, this is the code from the DevTools chapter, where we extracted the data using a browser.

```js
// This is code from the browser Console. It won't work in Node.js
const results = Array.from(sites).map((site) => {
    const fields = site.querySelectorAll('div.td');
    return {
        rank: fields[0].textContent.trim(),
        site: fields[1].textContent.trim(),
        dailyTimeOnSite: fields[2].textContent.trim(),
        dailyPageViews: fields[3].textContent.trim(),
        percentFromSearch: fields[4].textContent.trim(),
        totalLinkingSites: fields[5].textContent.trim(),
    };
});
console.log(results);
```

And this is how the code will look like with Node.js and `cheerio`.

```js
const results = sites.map((site) => {
    const fields = $(site).find('div.td');
    return {
        rank: fields.eq(0).text().trim(),
        site: fields.eq(1).text().trim(),
        dailyTimeOnSite: fields.eq(2).text().trim(),
        dailyPageViews: fields.eq(3).text().trim(),
        percentFromSearch: fields.eq(4).text().trim(),
        totalLinkingSites: fields.eq(5).text().trim(),
    };
});
```

The main difference is that we used the [`.find()`](https://api.jquery.com/find/) function to select all the `div.td` elements and also that we need to access the individual fields with [`.eq()`](https://api.jquery.com/eq/). If you find the differences confusing, don't worry about it. It will become very natural once you do it a few times. The final scraper code looks like this:

```js
// main.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

const response = await gotScraping('https://www.alexa.com/topsites');
const html = response.body;

const $ = cheerio.load(html);
const sites = $('div.site-listing').toArray();
const results = sites.map((site) => {
    const fields = $(site).find('div.td');
    return {
        rank: fields.eq(0).text().trim(),
        site: fields.eq(1).text().trim(),
        dailyTimeOnSite: fields.eq(2).text().trim(),
        dailyPageViews: fields.eq(3).text().trim(),
        percentFromSearch: fields.eq(4).text().trim(),
        totalLinkingSites: fields.eq(5).text().trim(),
    };
});
console.log(results);
```

![Printing all websites' data to terminal]({{@asset fde/imagesterminal-all-websites-data.webp}})

If you were able to get here, run the code, get results and also understand everything, you can pat yourself on the back and congratulate yourself on completing the Fundamentals of data extraction part of the Web Scraping Academy. Great job! 👏🎉

# [](#next) Next up

While we were able to extract the data, it's not very useful to have those printed to the console. In the next, bonus chapter, we will learn how to convert the data to a CSV and save it to a file.
