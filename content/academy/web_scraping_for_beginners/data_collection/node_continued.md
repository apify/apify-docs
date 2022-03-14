---
title: Node.js continued
description: Continue learning how to create a web scraper with Node.js and cheerio. Learn how to parse HTML and print results.
menuWeight: 20.7
paths:
    - web-scraping-for-beginners/data-collection/node-continued
---

# [](#finish-scraper) Finish Node.js scraper

In the first part of the Node.js lesson we downloaded the HTML of the <a href="https://www.alexa.com/topsites" target="_blank">Alexa Top Sites index</a> and parsed it with Cheerio. Now, we will replicate the collection logic from the [Collecting Data with DevTools]({{@link web_scraping_for_beginners/data_collection/using_devtools.md}}) lesson and finish our scraper.

## [](#querying-with-cheerio) Querying data with Cheerio

As a reminder, the data we need from the Top Sites index is available in the 50 `<div>` elements with class `site-listing`. The CSS selector to find those is `div.site-listing`.

![Selecting an element from the Elements tab]({{@asset web_scraping_for_beginners/data_collection/images/selecting-container-element.webp}})

To get all the elements with that CSS selector using Cheerio, we call the `$` function with the selector.

```js
$('div.site-listing');
```

We will use the same approach as in the previous DevTools lessons. Using a `for..of` loop we will iterate over the array of sites we saved in the `sites` variable. The code is a little different from DevTools, because we're using Node.js and Cheerio not a browser.

```js
// main.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

const response = await gotScraping('https://www.alexa.com/topsites');
const html = response.body;

const $ = cheerio.load(html);
const sites = $('div.site-listing');
for (const site of sites) {
    const element = $(site);
    console.log(element.text());
}
```

After you run this script, you should see data of all the 50 sites printed in your terminal. Don't forget about the `const element = $(site);` line. Without wrapping each `site` with `$()`, we wouldn't be able to call the `.text()` function on it.

## [](#collecting-data) Collecting final data

Now we only need to repeat the process from the DevTools lessons and add individual data point collection to the loop. From those chapters we know that the data are in `<div>` elements with class `td`.

![Finding child elements in Elements tab]({{@asset web_scraping_for_beginners/data_collection/images/find-child-elements.webp}})

We will loop over all the `sites` and collect the data points from each of them using the `for..of` loop. For reference, this is the code from the DevTools lesson, where we collected the data **using a browser**.

```js
// This is code from the browser Console. It won't work in Node.js
const results = [];

for (const site of sites) {
    const fields = site.querySelectorAll('div.td');
    results.push({
        rank: fields[0].textContent.trim(),
        site: fields[1].textContent.trim(),
        dailyTimeOnSite: fields[2].textContent.trim(),
        dailyPageViews: fields[3].textContent.trim(),
        percentFromSearch: fields[4].textContent.trim(),
        totalLinkingSites: fields[5].textContent.trim(),
    });
}

console.log(results);
```

And this is how the code will look like with **Node.js and Cheerio**.

```js
const results = [];

for (const site of sites) {
    const fields = $(site).find('div.td');
    results.push({
        rank: fields.eq(0).text().trim(),
        site: fields.eq(1).text().trim(),
        dailyTimeOnSite: fields.eq(2).text().trim(),
        dailyPageViews: fields.eq(3).text().trim(),
        percentFromSearch: fields.eq(4).text().trim(),
        totalLinkingSites: fields.eq(5).text().trim(),
    });
}
```

The main difference is that we used the <a href="https://api.jquery.com/find/" target="_blank">`.find()`</a> function to select all the `div.td` elements and also that we need to access the individual fields with <a href="https://api.jquery.com/eq/" target="_blank">`.eq()`</a>. If you find the differences confusing, don't worry about it. It will become very natural once you do it a few times. The final scraper code looks like this:

```js
// main.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

const response = await gotScraping('https://www.alexa.com/topsites');
const html = response.body;

const $ = cheerio.load(html);
const sites = $('div.site-listing');
const results = [];

for (const site of sites) {
    const fields = $(site).find('div.td');
    results.push({
        rank: fields.eq(0).text().trim(),
        site: fields.eq(1).text().trim(),
        dailyTimeOnSite: fields.eq(2).text().trim(),
        dailyPageViews: fields.eq(3).text().trim(),
        percentFromSearch: fields.eq(4).text().trim(),
        totalLinkingSites: fields.eq(5).text().trim(),
    });
}

console.log(results);
```

![Printing all websites' data to terminal]({{@asset web_scraping_for_beginners/data_collection/images/terminal-all-websites-data.webp}})

If you were able to get here, run the code, get results and also understand everything, you can pat yourself on the back and congratulate yourself on completing the **Basics of data collection** section of the Web scraping for beginners course. Great job! 👏🎉

# [](#next) Next up

While we were able to collect the data, it's not very useful to have those printed to the console. In the [next, bonus lesson]({{@link web_scraping_for_beginners/data_collection/save_to_csv.md}}), we will learn how to convert the data to a CSV and save it to a file.
