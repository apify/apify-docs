---
title: IV - Collecting data
description: Learn how to collect data from a page with evaluate functions, then how to safely collect it by using a second library called Cheerio.
menuWeight: 7.4
paths:
    - puppeteer-playwright/collecting-data
---

# [](#collecting-data) Collecting data

Now that we know how to execute scripts on a page, we're ready to learn a bit about [data collection]({{@link web_scraping_for_beginners/data_collection.md}}). In this lesson, we'll be scraping all of the on-sale products from our [Fakestore](https://demo-webstore.apify.org/search/on-sale) website.

> Most data collection cases involve looping through a list of items of some sort.

There are two main ways to collect data with Playwright and Puppeteer:

1. Directly in `page.evaluate()` and other evaluate functions such as `page.$$eval()`.
2. In the Node.js context using a parsing library such as [Cheerio](https://www.npmjs.com/package/cheerio)

Here is the base set up for our code, upon which we'll be building off of in this lesson:

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';

const autoScroll = async (page) => {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            let distance = 100;
            let interval = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;

                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(interval);
                    resolve();
                }
            }, 200);
        });
    });
};

const sleep = (secs) => new Promise((r) => setTimeout(r, secs * 1000));

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

await page.goto('https://demo-webstore.apify.org/search/on-sale');

await page.waitForLoadState('networkidle');

await autoScroll(page);

// code will go here

await sleep(10);

await browser.close();
</marked-tab>
<marked-tab header="Puppeteeer" lang="javascript">
import puppeteer from 'puppeteer';

const autoScroll = async (page) => {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            let distance = 100;
            let interval = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;

                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(interval);
                    resolve();
                }
            }, 200);
        });
    });
};

const sleep = (secs) => new Promise((r) => setTimeout(r, secs * 1000));

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

await page.goto('https://demo-webstore.apify.org/search/on-sale');

await page.waitForNetworkIdle();

await autoScroll(page);

// code will go here

await sleep(10);

await browser.close();
</marked-tab>
```

Notice that we've written and are using a custom `autoScroll()` function, which will scroll to the very bottom of the page. We are doing this because the images of the products are lazy-loaded (they are only loaded once they've been scrolled into view).

## [](#collecting-in-page-evaluate) Collecting in the browser context

Whatever is returned from the callback function in `page.evaluate()` will be returned by the evaluate function, which means that we can set it to a variable like so:

```JavaScript
const products = await page.evaluate(() => {});
```

We'll be returning a bunch of product objects from this function, which will be accessible back in our Node.js context after the promise has resolved. Let's now go ahead and write some data collection code to collect each product:

```JavaScript
const products = await page.evaluate(() => {
    return [...document.querySelectorAll('a[class*="ProductCard_root"]')].map((elem) => {
        const name = elem.querySelector('h3[class*="ProductCard_name"]').textContent;
        const price = elem.querySelector('div[class*="ProductCard_price"]').textContent;
        const image = elem.querySelector('img').getAttribute('src');

        return {
            name,
            price,
            image: `https://demo-webstore.apify.org${image}`,
        };
    });
});

console.log(products);
```

When we run this code, we see this logged to our console:

![Products logged to the console]({{@asset puppeteer_playwright/images/log-products.webp}})

Great! So we're done, right? Well, not quite. Let's throw an error within the function if it includes the keyword **sunglasses**:

```JavaScript
const products = await page.evaluate(() => {
    return [...document.querySelectorAll('a[class*="ProductCard_root"]')].map((elem) => {
        const name = elem.querySelector('h3[class*="ProductCard_name"]').textContent;

        if (name.toLowerCase().includes('sunglasses')) {
            throw new Error('oops');
        }

        const price = elem.querySelector('div[class*="ProductCard_price"]').textContent;
        const image = elem.querySelector('img').getAttribute('src');

        return {
            name,
            price,
            image: `https://demo-webstore.apify.org${image}`,
        };
    });
});

console.log(products);
```

When we run this code, we get a nasty error that looks like this:

```text
Error: Evaluation failed: Error: oops
    at __puppeteer_evaluation_script__:6:19
    at Array.map (<anonymous>)
    at __puppeteer_evaluation_script__:2:75
    ...
```

So, just because our function is failing to collect one or two of the products, it's failing to collect all of them and completely crashing our program. The solution for this is to parse the data in the Node.js context instead.

## [](#parsing-in-node-context) Parsing in the Node.js context

One of the most popular parsing libraries for Node.js is [Cheerio](https://www.npmjs.com/package/cheerio), which can be used in tandem with Playwright and Puppeteer. To install it, we can run the following command within your project's directory:

```shell
npm install cheerio
```

Then, we'll import the `load` function like so:

```JavaScript
import { load } from 'cheerio';
```

Finally, we can create a `Cheerio` object based on our page's current content like so:

```JavaScript
const $ = load(await page.content());
```

> It's important to note that this `$` object is static. If any content on the page changes, the `$` variable will not automatically be updated. It will need to be redeclared or redefined.

Here's our full code so far:

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';
import { load } from 'cheerio';

const autoScroll = async (page) => {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            let distance = 100;
            let interval = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;

                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(interval);
                    resolve();
                }
            });
        });
    }, 200);
};

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

await page.goto('https://demo-webstore.apify.org/search/on-sale');

await page.waitForLoadState('networkidle');

await autoScroll(page);

const $ = load(await page.content());

// collection code will go here

await browser.close();
</marked-tab>
<marked-tab header="Puppeteeer" lang="javascript">
import puppeteer from 'puppeteer';
import { load } from 'cheerio';

const autoScroll = async (page) => {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            let distance = 100;
            let interval = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;

                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(interval);
                    resolve();
                }
            });
        });
    }, 200);
};

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

await page.goto('https://demo-webstore.apify.org/search/on-sale');

await page.waitForNetworkIdle();

await autoScroll(page);

const $ = load(await page.content());

// collection code will go here

await browser.close();
</marked-tab>
```

Now, to loop through all of the products, we'll make use of the `$` object and loop through them while safely in the server-side context rather than running the code in the browser.

```JavaScript
const $ = load(await page.content());

const products = [...$('a[class*="ProductCard_root"]')].map((elem) => {
    const card = $(elem);

    const name = card.find('h3[class*="ProductCard_name"]').text() || null;
    const price = card.find('div[class*="ProductCard_price"]').text() || null;
    const image = card.find('img').attr('src') || null;

    return {
        name,
        price,
        image: `https://demo-webstore.apify.org${image}`,
    };
});

console.log(products);
```

What's good about this is that if one of the values isn't defined, or one of the elements is not even found, no errors will be thrown and the value will be set to `null`.

## Wrap up

So far in this course, you've learned how to launch a browser, open a page, run scripts on a page, and collect data from a page. In future lessons, you'll be learning about managing multiple pages, browser contexts, configuring proxies, and more.

Stay tuned for new lessons!

<!-- next lessons, talk about 1. running code in the context of the browser -> simple filter algorithm running in page.eval then another running in the context of Node.js, 2. Collecting data, 3. browser contexts, 4. parsing with cheerio instead, 5. setting up proxies with puppeteer. -->
