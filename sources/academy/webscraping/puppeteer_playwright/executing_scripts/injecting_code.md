---
title: Injecting scripts
description: Learn how to inject scripts prior to a page's load (pre-injecting), as well as how to expose functions to be run at a later time on the page.
sidebar_position: 1
slug: /puppeteer-playwright/executing-scripts/injecting-code
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Injecting code {#injecting-code}

**Learn how to inject scripts prior to a page's load (pre-injecting), as well as how to expose functions to be run at a later time on the page.**

---

In the previous lesson, we learned how to execute code on the page using `page.evaluate()`, and though this fits the majority of use cases, there are still some more unusual cases. For example, what if we want to execute our custom script prior to the page's load? Or, what if we want to define a function in the page's context to be run at a later time?

We'll be covering both of these cases in this brief lesson.

## Pre-injecting scripts {#pre-injecting}

Sometimes, you need your custom code to run before any other code is run on the page. Perhaps you need to modify an object's prototype, or even re-define certain global variables before they are used by the page's native scripts.

Luckily, Puppeteer and Playwright both have functions for this. In Puppeteer, we use  the [`page.evaluateOnNewDocument()`](https://puppeteer.github.io/puppeteer/docs/puppeteer.page.evaluateonnewdocument/) function, while in Playwright we use [`page.addInitScript()`](https://playwright.dev/docs/api/class-page#page-add-init-script). We'll use these functions to override the native `addEventListener` function, setting it to a function that does nothing. This will prevent event listeners from being added to elements.

<Tabs groupId="main">
<TabItem value="Playwright" label="Playwright">

```javascript
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

await page.addInitScript(() => {
    // Override the prototype
    Node.prototype.addEventListener = () => { /* do nothing */ };
});

await page.goto('https://google.com');

await page.waitForTimeout(10000);
await browser.close();

```
</TabItem>
<TabItem value="Puppeteer" label="Puppeteer">

```javascript
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

await page.evaluateOnNewDocument(() => {
    // Override the prototype
    Node.prototype.addEventListener = null;
});

await page.goto('https://google.com');

await page.waitForTimeout(10000);
await browser.close();

```
</TabItem>
</Tabs>

> Go ahead and run this code. Can you click the **I accept** button to accept Google's cookies policy?

## Exposing functions {#exposing-functions}

Here's a super awesome function we've created called `returnMessage()`, which simply returns the string **Apify academy!**:

```js
const returnMessage = () => 'Apify academy!';
```

We want to **expose** this function to our loaded page so that it can be later executed there, which can be done with [`page.exposeFunction()`](https://playwright.dev/docs/api/class-page#page-expose-function). This will make `returnMessage()` available when running scripts not only inside of `page.evaluate()`, but also directly from DevTools.

<Tabs groupId="main">
<TabItem value="Playwright" label="Playwright">

```javascript
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();
await page.goto('https://google.com');

const returnMessage = () => 'Apify academy!';

await page.exposeFunction(returnMessage.name, returnMessage);

const msg = await page.evaluate(() => returnMessage());

console.log(msg);

await page.waitForTimeout(10000);
await browser.close();

```
</TabItem>
<TabItem value="Puppeteer" label="Puppeteer">

```javascript
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();
await page.goto('https://google.com');

const returnMessage = () => 'Apify academy!';

await page.exposeFunction(returnMessage.name, returnMessage);

const msg = await page.evaluate(() => returnMessage());

console.log(msg);

await page.waitForTimeout(20000);
await browser.close();

```
</TabItem>
</Tabs>

## Next up {#next}

Next, we'll be learning a bit about how to extract data using Playwright/Puppeteer. There are two main ways to do this, so [next exciting lesson](./extracting_data.md) will be about both of them!
