---
title: Interacting with a page
description: Learn how to programmatically do actions on a page such as clicking, typing, and pressing keys. Also, discover a common roadblock that comes up when automating. 
menuWeight: 1
paths:
    - puppeteer-playwright/page/interacting-with-a-page
---

# [](#interacting-with-a-page) Interacting with a page

The **Page** object has whole boat-load of functions which can be used to interact with the loaded page. We're not going to go over every single one of them right now, but we _will_ use a few of the most common ones to add some functionality to our current project.

Let's say that we want to automate searching for **hello world** on Google, then click on the first result and log the title of the page to the console, then take a screenshot and write it it to the filesystem. In order to understand how we're going to automate this, let's break down how we would do it manually:

1. Click on the button which accepts Google's cookies policy (To see how it looks, open Google in an anonymous window.)
2. Type **hello world** into the search bar
3. Press **Enter**
4. Wait for the results page to load
5. Click on the first result
6. Read the title of the result's page
7. Screenshot the page

Though it seems complex, the wonderful **Page** API makes all of these actions extremely easy to perform.

## [](#clicking-and-pressing-keys) Clicking & pressing keys

Let's first focus on the first 3 steps listed above. By using `page.click()` and the CSS selector of the element to click, we can click an element:

```marked-tabs
<marked-tab header="Playwright" lang="JavaScript">
// Click the "I agree" button
await page.click('button:has-text("I agree")');
<marked-tab>
<marked-tab header="Puppeteer" lang="JavaScript">
// Click the "I agree" button
await page.click('button + button:nth-child(2)');
<marked-tab>
```

> Notice that in the Playwright example, we are using a different selector than in the Puppeteer example. This is because Playwright supports [many custom CSS selectors](https://playwright.dev/docs/selectors#text-selector), such as the **has-text** pseudo class.

Then, we can type some text into an input field with `page.type()`; passing a CSS selector as the first, and the string to input as the second parameter:

```JavaScript
// Type the query into the search box
await page.type('input[title="Search"]', 'hello world');
```

Finally, we can press a single key by accessing the `keyboard` property of `page` and calling the `press()` function on it:

```JavaScript
// Press enter
await page.keyboard.press('Enter');
```

So far, we've got this:

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });

const page = await browser.newPage();

await page.goto('https://google.com/');

// Click the "I agree" button
await page.click('button:has-text("I agree")');

// Type the query into the search box
await page.type('input[title="Search"]', 'hello world');

// Press enter
await page.keyboard.press('Enter');

await page.waitForTimeout(10000)
await browser.close();
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: false });

const page = await browser.newPage();

await page.goto('https://google.com/');

// Click the "I agree" button
await page.click('button + button:nth-child(2)');

// Type the query into the search box
await page.type('input[title="Search"]', 'hello world');

// Press enter
await page.keyboard.press('Enter');

await page.waitForTimeout(10000)
await browser.close();
</marked-tab>
```

When we run it, we leave off on the results page:

![Google results page reached by headless browser]({{@asset puppeteer_playwright/page/images/google-results.webp}})

Great! So now all we have to do is click the first result, which matches the selector `.g a`:

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });

const page = await browser.newPage();

await page.goto('https://google.com/');

await page.click('button:has-text("I agree")');

await page.type('input[title="Search"]', 'hello world');

await page.keyboard.press('Enter');

// Click the first result
await page.click('.g a');

await page.waitForTimeout(10000)
await browser.close();
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
// This code will throw an error!
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: false });

const page = await browser.newPage();

await page.goto('https://google.com/');

await page.click('button + button:nth-child(2)');

await page.type('input[title="Search"]', 'hello world');

await page.keyboard.press('Enter');

// Click the first result
await page.click('.g a');

await page.waitForTimeout(10000)
await browser.close();
</marked-tab>
```

But wait, when we try to run the Puppeteer code, we run into this nasty error:

```text
/Users/me/Desktop/playwright-puppeteer/node_modules/puppeteer/lib/cjs/puppeteer/common/assert.js:26
        throw new Error(message);
              ^

Error: No node found for selector: .g a
    at assert (/Users/me/Desktop/playwright-puppeteer/node_modules/puppeteer/lib/cjs/puppeteer/common/assert.js:26:15)
...
```

We hit this error because we attempted to click an element that wasn't yet present on the page. The results page hadn't even loaded yet!

## [](#next) Next up

In the [next lesson]({{@link puppeteer_playwright/page/waiting.md}}), we'll be taking a look at how to **wait for** navigation, events, and content before resuming interactions.
