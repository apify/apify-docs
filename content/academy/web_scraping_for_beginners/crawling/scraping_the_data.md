---
title: Scraping the data
description: Learn how to add data collection logic to your crawler, which will allow you to extract data from all the websites you crawled.
menuWeight: 6
paths:
- web-scraping-for-beginners/crawling/scraping-the-data
---

# [](#scraping-data) Scraping the data

At the [very beginning of the course](({{@link web_scraping_for_beginners.md}})), we learned that the term web scraping usually means a combined process of data collection and crawling. And this is exactly what we'll do in this lesson. We will take the code we built in the previous lesson and in the [Basics of data collection]({{@link web_scraping_for_beginners/data_collection/node_continued.md}}) section, and we will combine that into a web scraper.

## [](#review-code) Review earlier code

Let's first remind ourselves of the earlier data collection code.

```js
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

And now the crawling code, for comparison.

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
    try {
        const countryResponse = await gotScraping(url);
        const countryHtml = countryResponse.body;
        const $$ = cheerio.load(countryHtml);
        const pageTitle = $$('title').text();
        console.log(pageTitle);
    } catch (error) {
        console.error(error.message, url);
    }
}
```

We can see that the code is extremely similar. Both scripts download HTML and then process the HTML. To get an idea how to put them together, we'll go back to the [original process of crawling]({{@link web_scraping_for_beginners/crawling.md}}).

1. Visit the start URL.
2. Collect next URLs (and data) and save them.
3. Visit one of the collected URLs and save data and/or more URLs.
4. Repeat 2 and 3 until you have everything you needed.

Using this flow as guidance, we should be able to connect the pieces of code together.

## [](#building-scraper) Building the scraper

First, we need to **visit the start URL**. To scrape all the countries, we need the country list as a start URL. We'll save the code to a new file - `final.js`.

```js
// final.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

const websiteUrl = 'https://www.alexa.com/topsites/countries';

const response = await gotScraping(websiteUrl);
const html = response.body;
```

Next, we need to **collect the next URLs** we want to visit: the country URLs. So far, the code is exactly the same as the `crawler.js` code.

```js
// final.js
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
```

Now, the code starts to differ. We will use the crawling code to visit all the URLs but we will replace the placeholder extraction logic we had there. The placeholder logic only read the page's title, but we want data about the top 50 websites in each country.

```js
// ...

// A new array to save the results for all countries.
// For simplicity, we will not create separate arrays for each
// country, but we will mark the country in each result.
const results = [];

for (const url of countryUrls) {
    try {
        // This part is the same as in crawler.js,
        // we download HTML of each country page.
        const response = await gotScraping(url);
        const countryHtml = response.body;
        const $$ = cheerio.load(countryHtml);

        // And this is where we plug in the data collection code.
        // Don't forget to update $ to $$, or you'll get errors.
        const sites = $$('div.site-listing');
        // const results = []; this will no longer be used

        for (const site of sites) {
            const fields = $$(site).find('div.td');
            results.push({
                // Because we now have all the countries in one array,
                // we use the two-letter country code to distinguish the results.
                countryCode: url.slice(-2),
                rank: fields.eq(0).text().trim(),
                site: fields.eq(1).text().trim(),
                dailyTimeOnSite: fields.eq(2).text().trim(),
                dailyPageViews: fields.eq(3).text().trim(),
                percentFromSearch: fields.eq(4).text().trim(),
                totalLinkingSites: fields.eq(5).text().trim(),
            });
        }
    } catch (error) {
        console.error(error.message, url);
    }
}
```

Aside from the [`url.slice(-2)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) function that we used to get the 2-letter country code from the URL, there's no new code. You already know everything from the previous lessons. When we put it all together, we arrive at the final scraper code. It's always a good idea to add some in-progress logging to a scraper. To be able to monitor how it's working. Let's add some now.

```js
// final.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

const websiteUrl = 'https://www.alexa.com/topsites/countries';

console.log('Going to', websiteUrl);
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

// This is called a template string.
// You can use it to inject variables.
console.log(`Collected ${countryUrls.length} country URLs.`);

const results = [];

for (const url of countryUrls) {
    try {
        console.log('Scraping', url);
        const countryResponse = await gotScraping(url);
        const countryHtml = countryResponse.body;
        const $$ = cheerio.load(countryHtml);

        const sites = $$('div.site-listing');

        for (const site of sites) {
            const fields = $$(site).find('div.td');
            results.push({
                countryCode: url.slice(-2),
                rank: fields.eq(0).text().trim(),
                site: fields.eq(1).text().trim(),
                dailyTimeOnSite: fields.eq(2).text().trim(),
                dailyPageViews: fields.eq(3).text().trim(),
                percentFromSearch: fields.eq(4).text().trim(),
                totalLinkingSites: fields.eq(5).text().trim(),
            });
        }
    } catch (error) {
        console.error('Failed opening', url);
        console.error('Reason:', error.message);
    }
}

console.log('Results:');
console.log(results);
console.log('Number of results:', results.length);
```

At the time of writing, we were getting 101 countries and 5000 results. That's because the Aland Islands page was not working for us. You might get a different result, depending on the situation.

## [](#next) Next up

And that's it for the basics of crawling. But don't leave just yet. As promised, in the [next lesson]({{@link web_scraping_for_beginners/crawling/pro_scraping.md}}) we will rewrite the scraper using a proper scraping library. It will make development much faster and the scraper more robust.
