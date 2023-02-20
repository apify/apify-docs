---
title: II - Opening & controlling a page
description: Learn how to create and open a Page with a Browser, and how to use it to visit and programmatically interact with a website.
sidebar_position: 2.2
slug: /puppeteer-playwright/page
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Opening a page {#opening-a-page}

**Learn how to create and open a Page with a Browser, and how to use it to visit and programmatically interact with a website.**

---

When you open up your regular browser and visit a website, you open up a new page (or tab) before entering the URL in the search bar and hitting the **Enter** key. In Playwright and Puppeteer, you also have to open up a new page before visiting a URL. This can be done with the `browser.newPage()` function, which will return a **Page** object ([Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v13.7.0&show=api-class-page), [Playwright](https://playwright.dev/docs/api/class-page)).

<Tabs groupId="main">
<TabItem value="Playwright" label="Playwright">

```javascript
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });

// Open a new page
const page = await browser.newPage();

await browser.close();

```
</TabItem>
<TabItem value="Puppeteer" label="Puppeteer">

```javascript
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: false });

// Open a new page
const page = await browser.newPage();

await browser.close();

```
</TabItem>
</Tabs>

Then, we can visit a website with the `page.goto()` method. Let's go to [Google](https://google.com) for now. We'll also use the `page.waitForTimeout()` function, which will force the program to wait for a number of seconds before quitting (otherwise, everything will just flash before our eyes and we won't really be able to tell what's going on):

<Tabs groupId="main">
<TabItem value="Playwright" label="Playwright">

```javascript
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });

// Open a new page
const page = await browser.newPage();

// Visit Google
await page.goto('https://google.com')

// wait for 10 seconds before shutting down
await page.waitForTimeout(10000)

await browser.close();

```
</TabItem>
<TabItem value="Puppeteer" label="Puppeteer">

```javascript
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: false });

// Open a new page
const page = await browser.newPage();

// Visit Google
await page.goto('https://google.com');

// wait for 10 seconds before shutting down
await page.waitForTimeout(10000)

await browser.close();

```
</TabItem>
</Tabs>

> If you haven't already, go ahead and run this code to see what happens.

## Next up {#next}

Now that we know how to open up a page, [let's learn](./interacting_with_a_page.md) how to automate page interaction, such as clicking, typing, and pressing keys.
