---
title: V - Reading & intercepting requests
description: You can use DevTools, but did you know that you can do all the same stuff (plus more) programmatically? Read and intercept requests in Puppeteer/Playwright.
menuWeight: 7.5
paths:
    - puppeteer-playwright/reading-intercepting-requests
---

# [](#reading-intercepting-requests) Reading & intercepting requests

On any website that serves up images, makes [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest), or fetches content in some other way, you can see those requests (and their responses) in the [**Network** tab]({{@link api_scraping/general_api_scraping/locating_and_learning.md}}) of your browser's DevTools. Lots of data about the request can be found there, such as the headers, payload, and response body.

In Playwright and Puppeteer, it is also possible to read (and even intercept) requests being made on the page after its initial load - programmatically. This is very useful for things like reading dynamic headers, saving API responses, blocking certain resources, and much more.

During this lesson, we'll be using [Tiësto's following list](https://soundcloud.com/tiesto/following) on SoundCloud to demonstrate request/response reading and interception. Here's our basic setup for opening the page:

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

// Our code will go here

await page.goto('https://soundcloud.com/tiesto/following');

await page.waitForTimeout(10000);
await browser.close();
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

// Our code will go here

await page.goto('https://soundcloud.com/tiesto/following');

await page.waitForTimeout(10000);
await browser.close();
</marked-tab>
```

## [](#reading-requests) Reading requests

In Puppeteer, we can use the [`page.on()`](https://pptr.dev/#?product=Puppeteer&version=v14.0.0&show=api-event-close) function to listen for the **request** event, passing in a callback function. The first parameter of the passed in callback function is an object representing the request.

With Playwright, it's a bit different. We can use the [`page.route()`](https://playwright.dev/docs/api/class-page#page-route) function, passing in a string, regular expression, or a function that will match the URL of the request we'd like to read from. The second parameter is also a callback function, but with the [**Route**](https://playwright.dev/docs/api/class-route) object passed into it instead.

Upon visiting Tiësto's following page, we can see in the **Network** tab that a request is made to fetch all of the users which he is following.

![Request to grab Tiësto's following list]({{@asset puppeteer_playwright/images/tiesto-request.webp}})

Let's go ahead and listen for this request in our code:

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
// Listen for all requests where our function returns
// "true" when the URL is passed in
page.route(
    (url) => url.toString().includes('followings'),
    (route) => console.log('Request was made!')
);
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
// Listen for all requests
page.on('request', async (req) => {
    // If the URL doesn't include our keyword, ignore it
    if (!req.url().includes('followings')) return;

    console.log('Request was made!')
});
</marked-tab>
```

> Note that you should always define any request reading/interception code prior to calling the `page.goto()` function.

Cool! So now when we run our code, we'll see this logged to the console:

```text
Request was made!
```

This request includes some useful query parameters, namely the `client_id`. Let's go ahead and grab these values from the request URL and print them to the console:

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

// Listen for all requests where our function returns
// "true" when the URL is passed in
page.route(
    (url) => url.toString().includes('followings'),
    (route) => {
        // Convert the request URL into a URL object
        const url = new URL(route.request().url());

        // Print the search parameters in object form
        console.log(Object.fromEntries(url.searchParams));
    }
);

await page.goto('https://soundcloud.com/tiesto/following');

await page.waitForTimeout(10000);
await browser.close();
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

// Listen for all requests
page.on('request', async (req) => {
    // If the URL doesn't include our keyword, ignore it
    if (!req.url().includes('followings')) return;

    // Convert the request URL into a URL object
    const url = new URL(req.url());

    // Print the search parameters in object form
    console.log(Object.fromEntries(url.searchParams));
});

await page.goto('https://soundcloud.com/tiesto/following');

await page.waitForTimeout(10000);
await browser.close();
</marked-tab>
```

After running this code, we can see this logged to the console:

```text
{
  client_id: 'llCGDUjKpxUslgO1yEce7Zh95PXE78Bo',
  limit: '12',
  offset: '0',
  linked_partitioning: '1',
  app_version: '1652347025',
  app_locale: 'en'
}
```

## [](#reading-responses) Reading responses

Listening for and reading responses is very similar to reading requests.

In Puppeteer, the only difference is that we need to listen for the **response** event instead of **request**. Additionally, the object passed into the callback function represents the response instead of the request.

To access the response object from **Route** in Playwright, we need to wait for it with `await route.request().response()`. Nothing else needs to change.

This time, instead of grabbing the query parameters of the request URL, let's grab hold of the response body and print it to the console in JSON format:

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
page.route(
    (url) => url.toString().includes('followings'),
    // Notice that the callback function is now async
    async (route) => {
        // Allow the request to continue
        await route.continue();

        // Wait for the response object
        const res = await route.request().response();

        // Grab the response body in JSON format
        const json = await res.json();
        console.log(json);
    }
);
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
// Notice that the callback function is now async
page.on('response', async (res) => {
    if (!res.request().url().includes('followings')) return;

    // Grab the response body in JSON format
    const json = await res.json();
    console.log(json);
});
</marked-tab>
```

Upon running this code, we'll see the API response logged into the console:

![API response in console]({{@asset puppeteer_playwright/images/api-response-tiesto.webp}})

## [](#intercepting-requests) Intercepting requests

One of the most popular ways of speeding up website loading in Puppeteer and Playwright is by blocking certain resources from loading. These resources are usually CSS files, images, and other miscellanous resources that aren't super necessary (mainly because the computer doesn't have eyes - it doesn't care how the website looks!).

We'll first create an array of some file extensions that we'd like to block:

```JavaScript
const blockedExtensions = ['.png', '.css', '.jpg', '.jpeg', '.pdf', '.svg'];
```

In Puppeteer, we must first enable request interception with the `page.setRequestInterception()` function. Then, we can check whether or not the request's resource ends with one of our blocked extensions. If so, we'll abort the request. Otherwise, we'll let it continue.

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

const blockedExtensions = ['.png', '.css', '.jpg', '.jpeg', '.pdf', '.svg'];

// Only listen for requests with one of our blocked extensions
// Abort all matching requests
page.route(`**/*{${blockedExtensions.join(',')}}`, async (route) => route.abort());

await page.goto('https://soundcloud.com/tiesto/following');

await page.waitForTimeout(10000);
await browser.close();
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

const blockedExtensions = ['.png', '.css', '.jpg', '.jpeg', '.pdf', '.svg'];

// Enable request interception (skipping this step will result in an error)
await page.setRequestInterception(true);

// Listen for all requests
page.on('request', async (req) => {
    // If the request ends in a blocked extension, abort the request
    if (blockedExtensions.some((str) => req.url().endsWith(str))) return req.abort();
    // Otherwise, continue
    await req.continue();
});

await page.goto('https://soundcloud.com/tiesto/following');

await page.waitForTimeout(10000);
await browser.close();
</marked-tab>
```

> You can also use `request.resourceType()` to grab the resource type.

Here's what we see when we run this logic:

![SoundCloud with no CSS or image resources loaded]({{@asset puppeteer_playwright/images/ugly-soundcloud.webp}})

This confirms that we've successfully blocked the CSS and image resources from loading.

## Wrap up

So far in this course, you've learned how to launch a browser, open a page, run scripts on a page, collect data from a page, and intercept requests made on the page after its initial load. In future lessons, you'll be learning about managing multiple pages, browser contexts, configuring proxies, and more.

Stay tuned for new lessons!
