---
title: Scraping dynamic content
description: Wait for dynamically loaded content when web scraping. See code examples and a detailed breakdown for setting timeouts and custom wait functions.
menuWeight: 3.4
paths:
    - tutorials/scraping-dynamic-content
---

# Scraping dynamic content

Many websites load data in the background via [XHR requests]({{@link web_scraping_101/web_scraping_techniques.md#xhrs}}). These are usually tracking data, ads and other content that may not be essential for the website to load or is useful to collect periodically. Sometimes, though it may contain actual core page data that you need.

## [](#quick-summary) Quick summary

Use these helper functions to wait for data. Pass in time in milliseconds or the [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) to wait for.

* `page.waitForTimeout` or `page.waitForSelector` in [Puppeteer](https://pptr.dev) (or **Puppeteer Scraper** ([apify/puppeteer-scraper](https://apify.com/apify/puppeteer-scraper))).
E.g. `await page.waitForTimeout(10000)` - waits for 10 seconds.

* `context.waitFor` in **Web Scraper** ([apify/web-scraper](https://apify.com/apify/web-scraper)).
E.g. `await context.waitFor('my-selector')` - waits for `my-selector`  to appear on the page.

## [](#how-page-loading-works) How page loading works

Before looking at code examples that solve this problem, let's review what the page loading process looks like.

1. **HTML document is loaded** (`domcontentloaded` event). This document contains the HTML as it was rendered on the website server. It also includes all the JavaScript that is executed and rendered in the next step. This HTML is what you get when you use [http-request](https://www.npmjs.com/package/@apify/http-request) or **Cheerio Scraper** ([apify/cheerio-scraper](https://apify.com/apify/cheerio-scraper)) ([CheerioCrawler](https://sdk.apify.com/docs/api/cheerio-crawler) class).

2. **JavaScript is executed and rendered** (`load` event). The page is fully rendered, but may still lack dynamically loaded data.

3. **Network XHR requests are loaded and rendered** (`networkidle0` or `networkidle2` events). Some websites load essential data this way. The execution of these requests may depend on user behavior like in [infinite scroll](https://www.smashingmagazine.com/2013/05/infinite-scrolling-lets-get-to-the-bottom-of-this/).
This is when you use Web Scraper or Puppeteer Scraper ([PuppeteerCrawler](https://sdk.apify.com/docs/api/puppeteer-crawler) class) to get the page. Be careful that pages often track you with additional requests and the load may never end.

## [](#how-to-wait-for-dynamic-content) How to wait for dynamic content

The section below describes how you can wait for dynamic content.

### [](#http-request-cheerio-scraper) http-request / Cheerio Scraper

Often, all the essential data are presented in the initial HTML. And scraping it without a browser (without Puppeteer) is much more efficient. That is why we created [Cheerio Scraper](https://apify.com/apify/cheerio-scraper).

But even if data are rendered via JavaScript or loaded dynamically, there are advanced techniques that allow you to reverse-engineer this data and still retain Cheerio's efficiency. For example, you can emulate the requests for dynamic data directly in your code.

### [](#web-scraper-puppeteer-scraper-puppeteer) Web Scraper / Puppeteer Scraper / Puppeteer

In 95% of cases, the JavaScript-rendered page that you get with Puppeteer is enough. If you actually need to wait for the dynamic content, Puppeteer has [several helper functions](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagewaitforselectororfunctionortimeout-options-args), of which the most important are: `page.waitForTimeout`, `page.waitForSelector`, `page.waitForResponse`, `page.waitForNavigation` and `page.waitForFunction`.

### [](#waitfor-function) waitFor function

This function can be found as `context.waitFor` in [Web Scraper](https://apify.com/apify/web-scraper#page-function) where it is a generic function that has three possible arguments.

* **Number of milliseconds** - `await context.waitFor(10000)`. The same as `page.waitForTimeout` (will wait for 10 seconds).

* **Selector string** - `await context.waitFor('my-selector')`. The same as `page.waitForSelector` (will wait until that selector appears on the page but timeouts after 30 seconds with an error).

* **Predicate function** - `await context.waitFor(functionThatReturnsTrueOrFalse)`. The same as `page.waitForFunction` (you can pass an arbitrary function that is executed periodically and the code waits until it returns `true`).

With newer versions of [Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v5.3.1&show=api-pagewaitforselectorselector-options) you have to use dedicated functions like `page.waitForTimeout`, `page.waitForSelector` or `page.waitForFunction`.

### [](#testing-it) Testing it

If you need to update your code with waiting logic, simply start by waiting 10 seconds. If that doesn't help, try 30 seconds. If it still doesn't work, the problem is elsewhere.

Try to debug it using logs and screenshots. If your code is working, you know that it was indeed dynamically loaded data that caused your problem. Now you can change the 10 seconds waiting time for `waitForSelector` to be more efficient.

### [](#timeout-and-errors) Timeout and errors

By default, `waitFor` times out after 30 seconds with an error. Usually, this means another error is preventing the selector from loading. The selector itself may be wrong, or your browser got blocked or redirected to another version of the website.

Most of the time, if the selector doesn't load in the first 5 seconds, it won't load at all. You can prevent wasteful waiting by changing the timeout to `await context.waitFor('my-selector', { timeout: 10000 })`.

The `waitFor` (the selector version) will throw an error once it reaches the timeout. That is usually a good thing because you don't want this to go unnoticed. But if the data are not too important or you want to fall back to some other solution, you can easily catch the waiting error:

```javascript
await page.waitForSelector('my-selector', { timeout: 10000 })
    .catch(() => console.log('Wait for my-selector timed out')
);
```

The code will then continue.

## [](#advanced-use-cases) Advanced use cases

So far, we have only scratched the surface of this topic. Let's have a quick look at some more advanced cases. We have not yet covered the third usage of `waitFor` – `waitForFunction`.

### [](#waitforfunction) waitForFunction

If a simple selector is not enough, we can implement a function to be evaluated in the browser context to tell us if the page is ready. Let's imagine that we know the page needs to load 24 products, but for some reason, they load over time. We can define a simple function to check it.

```javascript
// Let's assume JQuery is injected
const has24Products = () => {
    const numberOfProducts = $('.my-products').length;
    return numberOfProducts === 24;
};
```

Now we simply pass it to `waitForFunction`:

```javascript
// In Puppeteer you need to inject JQuery with
// await Apify.utils.Puppeteer.injectJQuery(page);
await page.waitForFunction(has24Products);
```

### [](#waitforresponse) waitForResponse

Sometimes, it may be handy to work directly with the XHR request's response.

* It is faster. You don't need to wait for the element to render.

* It may contain nicely structured [JSON data]({{@link web_scraping_101/web_scraping_techniques.md#xhrs}}).

Keep in mind that `waitForResponse` is not included in `waitFor` cases, so it does not work in Web Scraper. If you are interested in exploring the responses, you can look through them in your browser's developer console. In Firefox and Chrome, it is the **Network** tab with the **XHR** filter selected.

![The Network tab in a browser]({{@asset tutorials/images/network-tab.webp}})

We can catch this response by checking for its URL and method (we have to do it since the same URL is included in the OPTIONS method). We return `true` or `false` depending if it is the response we want. `waitForResponse` will even give us the response back.

```javascript
const responseChooser = async (response) => {
    const url = response.url();
    const method = response.request().method();
    if (url.includes('/prod_PUBLIC_STORE') && method === 'POST') {
        return true;
    };
    return false;
};
const correctResponse = await page.waitForResponse(responseChooser);
```

 Now, we simply extract the JSON.

```javascript
const data = await correctResponse.json();
const userAgent = data.user_agent;
```

## [](#custom-waiting-functions) Custom waiting functions

You don't need to rely on Puppeteer's smart functions to implement something. You can implement "waiters" using a simple loop. Then, you can add your own functionality to it. For example, a `waitForSelector` that logs its waiting.

```javascript
const waitAndLog = async (page, selector, timeout = 30000) => {
    const start = Date.now();
    let myElement = await page.$(selector);
    while (!myElement) {
        await page.waitFor(500); // wait 0.5s each time
        const alreadyWaitingFor = Date.now() - start;
        if (alreadyWaitingFor > timeout) {
            throw `Wait for ${selector} timed out after ${timeout} ms`;
        }
        console.log(`Waiting for ${selector} for ${alreadyWaitingFor}`);
        myElement = await page.$(selector);
    }
    console.log(`Selector ${selector} appeared on the page!`)
    return myElement;
};

// You can use the element handle it returns
await waitAndLog(page, 'my-selector');
```
