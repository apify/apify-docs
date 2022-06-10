---
title: Logging into a website
description: description
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

### [](#final-code) Final code

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

<!-- ## [](#lazy-loading-pagination) Lazy loading pagination -->

## [](#next) Next up

We're actively working in expanding this section of the course, so stay tuned!
