---
title: Recap data collection
description: Review our Alexa Top Sites scraper and refresh our memory about its code and the programming techniques we used.
menuWeight: 21.1
category: web scraping academy
paths:
- crawling-basics/recap-collection-basics
---

# [](#recap) Recap of data collection basics

We finished the [first part]({{@link data_collection_basics.md}}) of the Web Scraping Academy by creating a web scraper in Node.js. The scraper collected browsing information from the [Alexa Top Sites index](https://www.alexa.com/topsites). Let's see the code with some comments.

```js
// First we imported all the libraries we needed to
// download and collect the data we wanted.
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

// Here we fetched the website's HTML and saved it to a new variable.
const response = await gotScraping('https://www.alexa.com/topsites');
const html = response.body;

// We used Cheerio, a popular library, to parse (process)
// the downloaded HTML so that we could manipulate it.
const $ = cheerio.load(html);
// Using the div.site-listing CSS selector, we collected
// all the HTML elements which contained the 50 websites data.
const sites = $('div.site-listing');
// Then we prepared a new array to store the results.
const results = [];
// And looped over all the 50 sites to extract information
// for the individual websites.
for (const site of sites) {
    // The data we wanted were in multiple
    // <div> elements with the class="td".
    const fields = $(site).find('div.td');
    // We added all the data to the results array
    // in the form of an object with keys and values.
    results.push({
        rank: fields.eq(0).text().trim(),
        site: fields.eq(1).text().trim(),
        dailyTimeOnSite: fields.eq(2).text().trim(),
        dailyPageViews: fields.eq(3).text().trim(),
        percentFromSearch: fields.eq(4).text().trim(),
        totalLinkingSites: fields.eq(5).text().trim(),
    });
}
// Finally, we printed the results to the terminal.
console.log(results);
// In the bonus chapter, we saved the files to a CSV,
// but we will skip that for now.
```

> If some of the code is hard to understand for you, please review the [Basics of data collection]({{@link data_collection_basics.md}}) section. We will not go through the details again in this section about crawling.

## [](#next) Next up

The [next chapter]({{@link crawling_basics/finding_links.md}}) is all about finding some links to crawl on the <a href="https://www.alexa.com/topsites/countries" target="_blank">Alexa Top Sites by Country index</a>.
