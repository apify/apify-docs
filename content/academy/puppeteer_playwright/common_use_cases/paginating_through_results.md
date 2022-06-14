---
title: Paginating through results
description: Learn how to paginate through websites that use either page number-based pagination or lazy-loading pagination.
menuWeight: 2
paths:
    - puppeteer-playwright/common-use-cases/paginating-through-results
---

# [](#paginating-through-results) Paginating through results

If you're trying to [collect data]({{@link puppeteer_playwright/executing_scripts/collecting_data.md}}) on a website that has millions, thousands, or even just hundreds of results, it is very likely that they are paginating their results to reduce strain on their backend as well as on the users loading and rendering the content.

![Amazon pagination](https://apify-docs.s3.amazonaws.com/master/docs/assets/tutorials/images/pagination.webp)

Attempting to scrape thousands to tens of thousands of results using a headless browser on a website that only shows 30 results at a time might be daunting at first, but be rest assured that by the end of this lesson you'll feel confident when faced with this use case.

## [](#page-number-based-pagination) Page number-based pagination

At the time of writing, Facebook has [115 repositories on Github](https://github.com/orgs/facebook/repositories). By default, Github lists repositories in descending order based on when they were last updated (the most recently updated repos are at the top of the list).

We want to scrape all of the titles, links, and descriptions for Facebook's repositories; however, Github only displays 30 repos per page. This means we've gotta paginate through all of the results.

Let's first start off by defining some basic variables:

```JavaScript
// This is where we'll push all of the scraped repos
const repositories = [];

const BASE_URL = 'https://github.com';

// We'll use this URL a couple of times within our code, so we'll
// store it in a constant variable to prevent typos and so it's
// easier to tell what it is
const REPOSITORIES_URL = `${BASE_URL}/orgs/facebook/repositories`;
```

### [](#finding-the-last-page) Finding the last page

What we want to do now is grab the last page number, so that we know exactly how many requests we need to send in order to paginate through all of the repositories. Luckily, this information is available right on the page here:

![Final page number]({{@asset puppeteer_playwright/common_use_cases/images/github-last-page.webp}})

Let's grab this number now with a little bit of code:

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';
import { load } from 'cheerio';

const repositories = [];

const BASE_URL = 'https://github.com';
const REPOSITORIES_URL = `${BASE_URL}/orgs/facebook/repositories`;

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

await page.goto(REPOSITORIES_URL);

const lastPageElement = page.locator('a[aria-label*="Page "]:nth-last-child(2)');
// This will output 4
const lastPage = +(await lastPageElement.getAttribute('aria-label')).replace(/\D/g, '');

console.log(lastPage);

await browser.close();
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
import puppeteer from 'puppeteer';
import { load } from 'cheerio';

const repositories = [];

const BASE_URL = 'https://github.com';
const REPOSITORIES_URL = `${BASE_URL}/orgs/facebook/repositories`;

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

await page.goto(REPOSITORIES_URL);

const lastPageLabel = await page.$eval('a[aria-label*="Page "]:nth-last-child(2)', (elem) => elem.getAttribute('aria-label'));
// This will output 4
const lastPage = +lastPageLabel.replace(/\D/g, '');

console.log(lastPage);

await browser.close();
</marked-tab>
```

> Learn more about the `:nth-last-child` pseudo-class [on W3Schools](https://www.w3schools.com/cssref/sel_nth-last-child.asp). It works similar to `:nth-child`, but starts from the bottom of the parent element's children instead of from the top.

When we run this code, here's what we see:

```text
4
```

And since we're already on the first page, we'll go ahead and scrape the repos from it. However, since we are going to reuse this logic on the other pages as well, let's create a function that will handle the data collection and reliably return a nice array of results:

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';
import { load } from 'cheerio';

const repositories = [];

const BASE_URL = 'https://github.com';
const REPOSITORIES_URL = `${BASE_URL}/orgs/facebook/repositories`;

// Create a function which grabs all repos from a page
const scrapeRepos = async (page) => {
    const $ = load(await page.content());

    return [...$('li.Box-row')].map((item) => {
        const elem = $(item);
        const titleElement = elem.find('a[itemprop*="name"]');

        return {
            title: titleElement.text().trim(),
            description: elem.find('p[itemprop="description"]').text().trim(),
            link: new URL(titleElement.attr('href'), BASE_URL).href,
        };
    });
};

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

await page.goto(REPOSITORIES_URL);

const lastPageElement = page.locator('a[aria-label*="Page "]:nth-last-child(2)');
const lastPage = +(await lastPageElement.getAttribute('aria-label')).replace(/\D/g, '');

// Push all results from the first page to results array
repositories.push(...(await scrapeRepos(page)));

// Log the 30 repositories scraped from the first page
console.log(repositories);

await browser.close();
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
import puppeteer from 'puppeteer';
import { load } from 'cheerio';

const repositories = [];

const BASE_URL = 'https://github.com';
const REPOSITORIES_URL = `${BASE_URL}/orgs/facebook/repositories`;

// Create a function which grabs all repos from a page
const scrapeRepos = async (page) => {
    const $ = load(await page.content());

    return [...$('li.Box-row')].map((item) => {
        const elem = $(item);
        const titleElement = elem.find('a[itemprop*="name"]');

        return {
            title: titleElement.text().trim(),
            description: elem.find('p[itemprop="description"]').text().trim(),
            link: new URL(titleElement.attr('href'), BASE_URL).href,
        };
    });
};

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

await page.goto(REPOSITORIES_URL);

const lastPageLabel = await page.$eval('a[aria-label*="Page "]:nth-last-child(2)', (elem) => elem.getAttribute('aria-label'));
const lastPage = +lastPageLabel.replace(/\D/g, '');

// Push all results from the first page to results array
repositories.push(...(await scrapeRepos(page)));

// Log the 30 repositories scraped from the first page
console.log(repositories);

await browser.close();
</marked-tab>
```

### [](#making-a-request-for-each-results-page) Making a request for each results page

Cool, so now we have all the tools we need to write concise logic that will be run for every single page. First, we'll create an array of numbers from 0-4:

```JavaScript
// We must add 1 to the lastPage, since the array starts at 0 and we
// are creating an array from its index values
Array(lastPage + 1).keys() // -> [0, 1, 2, 3, 4]
```

Then, we'll slice the first two values from that array so that it starts from 2 and ends at 4:

```JavaScript
[...Array(lastPage + 1).keys()].slice(2) // -> [2, 3, 4]
```

This array now accurately represents the pages we need to go through. We'll map through it and create an array of promises, all of which make a request to each page, scrape its data, then push it to the **repositories** array:

```JavaScript
// Map through the range. The value from the array is the page number
// to make a request for
const promises = [...Array(lastPage + 1).keys()].slice(2).map((pageNumber) =>
    (async () => {
        const page2 = await browser.newPage();

        // Prepare the URL before making the request by setting the "page"
        // parameter to whatever the pageNumber is currently
        const url = new URL(REPOSITORIES_URL);
        url.searchParams.set('page', pageNumber);

        await page2.goto(url.href);

        // Scrape the data and push it to the "repositories" array
        repositories.push(...(await scrapeRepos(page2)));

        await page2.close();
    })()
);

await Promise.all(promises);

console.log(repositories.length);
```

> **IMPORTANT!** Usually, within the map function's callback you'd want to add the requests to a request queue, especially when paginating through hundreds (or even thousands) of pages. But since we know that we have 4 pages and only 3 left to go through, it is totally safe to use `Promise.all()` for this specific use-case.

### [](#final-pagination-code) Final code

After all is said and done, here's what our final code looks like:

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';
import { load } from 'cheerio';

const repositories = [];

const BASE_URL = 'https://github.com';
const REPOSITORIES_URL = `${BASE_URL}/orgs/facebook/repositories`;

const scrapeRepos = async (page) => {
    const $ = load(await page.content());

    return [...$('li.Box-row')].map((item) => {
        const elem = $(item);
        const titleElement = elem.find('a[itemprop*="name"]');

        return {
            title: titleElement.text().trim(),
            description: elem.find('p[itemprop="description"]').text().trim(),
            link: new URL(titleElement.attr('href'), BASE_URL).href,
        };
    });
};

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

await page.goto(REPOSITORIES_URL);

const lastPageElement = page.locator('a[aria-label*="Page "]:nth-last-child(2)');
const lastPage = +(await lastPageElement.getAttribute('aria-label')).replace(/\D/g, '');

repositories.push(...(await scrapeRepos(page)));

await page.close();

const promises = [...Array(lastPage + 1).keys()].slice(2).map((pageNumber) =>
    (async () => {
        const page2 = await browser.newPage();

        const url = new URL(REPOSITORIES_URL);
        url.searchParams.set('page', pageNumber);

        await page2.goto(url.href);

        repositories.push(...(await scrapeRepos(page2)));

        await page2.close();
    })()
);

await Promise.all(promises);

// Log the final length of the "repositories" array
console.log(repositories.length);

await browser.close();
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
import puppeteer from 'puppeteer';
import { load } from 'cheerio';

const repositories = [];

const BASE_URL = 'https://github.com';
const REPOSITORIES_URL = `${BASE_URL}/orgs/facebook/repositories`;

// Create a function which grabs all repos from a page
const scrapeRepos = async (page) => {
    const $ = load(await page.content());

    return [...$('li.Box-row')].map((item) => {
        const elem = $(item);
        const titleElement = elem.find('a[itemprop*="name"]');

        return {
            title: titleElement.text().trim(),
            description: elem.find('p[itemprop="description"]').text().trim(),
            link: new URL(titleElement.attr('href'), BASE_URL).href,
        };
    });
};

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

await page.goto(REPOSITORIES_URL);

const lastPageLabel = await page.$eval('a[aria-label*="Page "]:nth-last-child(2)', (elem) => elem.getAttribute('aria-label'));
const lastPage = +lastPageLabel.replace(/\D/g, '');

repositories.push(...(await scrapeRepos(page)));

await page.close();

const promises = [...Array(lastPage + 1).keys()].slice(2).map((pageNumber) =>
    (async () => {
        const page2 = await browser.newPage();

        const url = new URL(REPOSITORIES_URL);
        url.searchParams.set('page', pageNumber);

        await page2.goto(url.href);

        repositories.push(...(await scrapeRepos(page2)));

        await page2.close();
    })()
);

await Promise.all(promises);

// Log the final length of the "repositories" array
console.log(repositories.length);

await browser.close();
</marked-tab>
```

If we remember correctly, Facebook has 115 Github repositories (at the time of writing this lesson), so the final output should be:

```text
115
```

## [](#lazy-loading-pagination) Lazy-loading pagination

Though page number-based pagination is quite straightforward to automate the pagination process with, and though it is still an extremely common implementation, [lazy-loading](https://en.wikipedia.org/wiki/Lazy_loading) is becoming extremely popular on the modern web, which makes it an important and relevant topic to discuss.

> Note that on websites with lazy-loading pagination, [API scraping]({{@link api_scraping.md}}) is usually a viable option, and a much better one due to reliability and performance.

Take a moment to look at and scroll through the women's clothing section [on About You's website](https://www.aboutyou.com/c/women/clothing-20204). Notice that the items are loaded as you scroll, and that there are no page numbers. Because of how drastically different this pagination implementation is from the previous one, it also requires a different workflow to scrape.

We're going to scrape the brand and price from the first 75 results on the **About You** page linked above. Here's our basic setup:

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';
import { load } from 'cheerio';

// Create an array where all scraped products will
// be pushed to
const products = [];

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

await page.goto('https://www.aboutyou.com/c/women/clothing-20204');

await browser.close();
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
import puppeteer from 'puppeteer';
import { load } from 'cheerio';

// Create an array where all scraped products will
// be pushed to
const products = [];

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

await page.goto('https://www.aboutyou.com/c/women/clothing-20204');

await browser.close();
</marked-tab>
```

### [](#auto-scrolling) Auto scrolling

Now, what we'll do is grab the height in pixels of a result item to have somewhat of a reference to how much we should scroll each time, as well as create a variable for keeping track of how many pixels have been scrolled.

```JavaScript
// Grab the height of result item in pixels, which will be used to scroll down
const itemHeight = await page.$eval('a[data-testid*="productTile"]', (elem) => elem.clientHeight);

// Keep track of how many pixels have been scrolled down
let totalScrolled = 0;
```

Then, within a `while` loop that ends once the length of the **products** array has reached 75, we'll run some logic that scrolls down the page and waits 1 second before running again.

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
while (products.length < 75) {
    await page.mouse.wheel(0, itemHeight * 3);
    totalScrolled += itemHeight * 3;
    // Allow the products 1 second to load
    await page.waitForTimeout(1000);
}
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
while (products.length < 75) {
    await page.mouse.wheel({ deltaY: itemHeight * 3 });
    totalScrolled += itemHeight * 3;
    // Allow the products 1 second to load
    await page.waitForTimeout(1000);
}
</marked-tab>
```

This will work; however, what if we reach the bottom of the page and there are say, only 55 total products on the page? That would result in an infinite loop. Because of this edge case, we have to keep track of the constantly changing available scroll height on the page.

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
while (products.length < 75) {
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);

    await page.mouse.wheel(0, itemHeight * 3);
    totalScrolled += itemHeight * 3;
    // Allow the products 1 second to load
    await page.waitForTimeout(1000);

    // Data collection login will go here

    const innerHeight = await page.evaluate(() => window.innerHeight);

    // if the total pixels scrolled is equal to the true available scroll
    // height of the page, we've reached the end and should stop scraping.
    // even if we haven't reach our goal of 75 products.
    if (totalScrolled >= scrollHeight - innerHeight) {
        break;
    }
}
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
while (products.length < 75) {
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);

    await page.mouse.wheel({ deltaY: itemHeight * 3 });
    totalScrolled += itemHeight * 3;
    // Allow the products 1 second to load
    await page.waitForTimeout(1000);

    // Data collection login will go here

    const innerHeight = await page.evaluate(() => window.innerHeight);

    // if the total pixels scrolled is equal to the true available scroll
    // height of the page, we've reached the end and should stop scraping.
    // even if we haven't reach our goal of 75 products.
    if (totalScrolled >= scrollHeight - innerHeight) {
        break;
    }
}
</marked-tab>
```

Now, the `while` loop will exit out if we've reached the bottom of the page.

> Generally, you'd want to create a utility function that handles this scrolling logic instead of putting all of the code directly into the while loop.

### [](#collecting-data) Collecting data

Within the loop, we can grab hold of the total number of items on the page. To avoid collecting and pushing duplicate items to the **products** array, we can use the `.slice()` method to cut out the items we've already scraped.

```JavaScript
const $ = load(await page.content());

// Grab the newly loaded items
const items = [...$('a[data-testid*="productTile"]')].slice(products.length);

const newItems = items.map((item) => {
    const elem = $(item);

    return {
        brand: elem.find('p[data-testid="brandName"]').text().trim(),
        price: elem.find('span[data-testid="finalPrice"]').text().trim(),
    };
});

products.push(...newItems);
```

### [](#final-lazy-loading-code) Final code

With everything completed, this is what we're left with:

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';
import { load } from 'cheerio';

const products = [];

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

await page.goto('https://www.aboutyou.com/c/women/clothing-20204');

// Grab the height of result item in pixels, which will be used to scroll down
const itemHeight = await page.$eval('a[data-testid*="productTile"]', (elem) => elem.clientHeight);

// Keep track of how many pixels have been scrolled down
let totalScrolled = 0;

while (products.length < 75) {
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);

    await page.mouse.wheel(0, itemHeight * 3);
    totalScrolled += itemHeight * 3;
    // Allow the products 1 second to load
    await page.waitForTimeout(1000);

    const $ = load(await page.content());

    // Grab the newly loaded items
    const items = [...$('a[data-testid*="productTile"]')].slice(products.length);

    const newItems = items.map((item) => {
        const elem = $(item);

        return {
            brand: elem.find('p[data-testid="brandName"]').text().trim(),
            price: elem.find('span[data-testid="finalPrice"]').text().trim(),
        };
    });

    products.push(...newItems);

    const innerHeight = await page.evaluate(() => window.innerHeight);

    // if the total pixels scrolled is equal to the true available scroll
    // height of the page, we've reached the end and should stop scraping.
    // even if we haven't reach our goal of 75 products.
    if (totalScrolled >= scrollHeight - innerHeight) {
        break;
    }
}

console.log(products.slice(0, 75));

await browser.close();
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
import puppeteer from 'puppeteer';
import { load } from 'cheerio';

const products = [];

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

await page.goto('https://www.aboutyou.com/c/women/clothing-20204');

// Grab the height of result item in pixels, which will be used to scroll down
const itemHeight = await page.$eval('a[data-testid*="productTile"]', (elem) => elem.clientHeight);

// Keep track of how many pixels have been scrolled down
let totalScrolled = 0;

while (products.length < 75) {
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);

    await page.mouse.wheel({ deltaY: itemHeight * 3 });
    totalScrolled += itemHeight * 3;
    // Allow the products 1 second to load
    await page.waitForTimeout(1000);

    const $ = load(await page.content());

    // Grab the newly loaded items
    const items = [...$('a[data-testid*="productTile"]')].slice(products.length);

    const newItems = items.map((item) => {
        const elem = $(item);

        return {
            brand: elem.find('p[data-testid="brandName"]').text().trim(),
            price: elem.find('span[data-testid="finalPrice"]').text().trim(),
        };
    });

    products.push(...newItems);

    const innerHeight = await page.evaluate(() => window.innerHeight);

    // if the total pixels scrolled is equal to the true available scroll
    // height of the page, we've reached the end and should stop scraping.
    // even if we haven't reach our goal of 75 products.
    if (totalScrolled >= scrollHeight - innerHeight) {
        break;
    }
}

console.log(products.slice(0, 75));

await browser.close();
</marked-tab>
```

## [](#quick-note) Quick note

The examples shown in this lesson are not the only ways to paginate through websites. They are here to serve as solid examples, but don't view them as the end-all be-all of scraping paginated websites. The methods you use and algorithms you write might differ to various degrees based on what pages you're scraping and how your specific target website implemented pagination.

## [](#next) Next up

We're actively working in expanding this section of the course, so stay tuned!
