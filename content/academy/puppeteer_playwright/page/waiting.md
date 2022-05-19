---
title: Waiting for content & events
description: Learn the importance of waiting for content and events before running interaction/collection code, as well as the best practices for doing so.
menuWeight: 2
paths:
    - puppeteer-playwright/page/waiting
---

# [](#waiting-for-elements-and-events) Waiting for elements and events

In a perfect world, every piece of content served on a website would be loaded instantaneously. We don't live in a perfect world though, and often times it can take anywhere between 1/10th of a second to a few seconds to load some content onto a page. Certain elements are also [generated dynamically]({{@link dynamic_pages_and_spas.md}}), which means that they are not present in the initial HTML, and that they are created by scripts or data from API calls.

Puppeteer and Playwright don't sit around waiting for a page (or specific elements) to load though - if we tell it to do something with an element that hasn't rendered yet, it'll start trying to do it (which will result in nasty errors). We've got to tell it to wait.

> For a thorough explanation on how dynamic rendering works, give the [**Dynamic pages & SPAs**]({{@link dynamic_pages_and_spas.md}}) course a quick readover, and check out the examples.

Different events and elements can be waited for using the various `waitFor...` methods offered.

## [](#waiting-for-elements) Elements

In the previous lesson, we ran into an error with Puppeteer due to the fact that we weren't waiting for the `.g a` selector to be present on the page before clicking it. The same error didn't occur in Playwright, because `page.click()` [automatically waits](https://playwright.dev/docs/actionability) for the element to be visible on the page before clicking it.

Elements with specific selectors can be waited for by using the `page.waitForSelector()` function. Let's use this knowledge to wait for the first result to be present on the page prior to clicking on it:

```JavaScript
// This example is relevant for Puppeteer only!
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: false });

const page = await browser.newPage();
await page.goto('https://google.com/');

await page.click('button + button');

await page.type('input[title="Search"]', 'hello world');
await page.keyboard.press('Enter');

// Wait for the element to be present on the page prior to clicking it
await page.waitForSelector('.g a');
await page.click('.g a');

await page.waitForTimeout(10000)
await browser.close();
```

Now, we won't see the error message anymore, and the first result will be successfully clicked by Puppeteer.

> Playwright also has a `page.waitForSelector()` function and it's useful in other scenarios than clicking, or for more granular control over the waiting process.

## [](#waiting-for-navigation) Navigation

If we remember properly, after clicking the first result, we want to console log the title of the result's page and save a screenshot into the filesystem. In order to grab a solid screenshot of the loaded page though, we should **wait for navigation**  before snapping the image. This can be done with [`page.waitForNavigation()`](https://pptr.dev/#?product=Puppeteer&version=v14.1.0&show=api-pagewaitfornavigationoptions).

> A navigation is simply when a new [page load]({{@link dynamic_pages_and_spas.md}}) happens. First, the `domcontentloaded` event is fired, then the `load` event. `page.waitForNavigation()` will wait for the `load` event to fire.

Naively, you might immediately think that this is the way we should wait for navigation after clicking the first result:

```JavaScript
await page.click('.g a');
await page.waitForNavigation();
```

Though in theory this is correct, it can result in a race condition in which the page navigates quickly before the `page.waitForNavigation()` function is ever run, which means that once it is finally called, it will hang and wait forever for the [`load` event](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event) event to fire even though it already fired. To solve this, we can stick the waiting logic and the clicking logic into a `Promise.all()` call (placing `page.waitForNavigation()` first).

```JavaScript
await Promise.all([page.waitForNavigation(), page.click('.g a')]);
```

Though the line of cod above is also valid in Playwright, it is recommended to use [`page.waitForLoadState('load')`](https://playwright.dev/docs/api/class-page#page-wait-for-load-state) instead of `page.waitForNavigaton()`, as it automatically handles the issues being solved in by using `Promise.all()`.

```JavaScript
await page.click('.g a');
await page.waitForLoadState('load');
```

This implementation will do the following:

1. Begin waiting for the page to navigate without blocking the `page.click()` function
2. Click the element, firing off a navigating event
3. Resolve once the page has navigated, allowing further code to run

## [](#current-code) Our code so far

Here's what our project's code looks like so far:

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';
import * as fs from 'fs/promises';

const browser = await chromium.launch({ headless: false });

// Create a page and visit Google
const page = await browser.newPage();
await page.goto('https://google.com');

// Agree to the cookies policy
await page.click('button:has-text("I agree")');

// Type the query and visit the results page
await page.type('input[title="Search"]', 'hello world');
await page.keyboard.press('Enter');

// Click on the first result
await page.click('.g a');
await page.waitForLoadState('load');

// Our title collecting and screenshotting logic
// will go here

await page.waitForTimeout(10000);

await browser.close();
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
import puppeteer from 'puppeteer';
import * as fs from 'fs/promises';

const browser = await puppeteer.launch({ headless: false });

// Create a page and visit Google
const page = await browser.newPage();
await page.goto('https://google.com');

// Agree to the cookies policy
await page.click('button + button');

// Type the query and visit the results page
await page.type('input[title="Search"]', 'hello world');
await page.keyboard.press('Enter');

// Wait for the first result to appear on the page,
// then click on it
await page.waitForSelector('.g a');
await Promise.all([page.waitForNavigation(), page.click('.g a')]);

// Our title collecting and screenshotting logic
// will go here

await page.waitForTimeout(10000);

await browser.close();
</marked-tab>
```

## [](#next) Next up

In the [final lesson]({{@link puppeteer_playwright/page/page_methods.md}}) of the **Opening & controlling a page** section of this course, we'll be learning about various methods on **Page** which aren't related to directly interacting with a page or waiting for stuff, as well as finally adding the final touches to our mini-project (page title grabbing and screenshotting).
