---
title: II - Opening a page
description: Learn how to create an open a Page with a Browser, and how to use it to visit and programmatically interact with a website.
menuWeight: 7.2
paths:
    - puppeteer-playwright/page
---

# [](#opening-a-page) Opening a page

When you open up your regular browser and visit a website, you open up a new page (or tab) before entering the URL in the search bar and hitting the **Enter** key. In Playwright and Puppeteer, you also have to open up a new page before visiting a URL. This can be done with the `browser.newPage()` function, which will return a **Page** object ([Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v13.7.0&show=api-class-page), [Playwright](https://playwright.dev/docs/api/class-page)).

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });

// Open a new page
const page = await browser.newPage();

await browser.close();
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: false });

// Open a new page
const page = await browser.newPage();

await browser.close();
</marked-tab>
```

Then, we can visit a website with the `page.goto()` method. Let's go to [Google](https://google.com) for now. We'll also use the `page.waitForTimeout()` function, which will force the program to wait for a number of seconds before quitting (otherwise, everything will just flash before our eyes and we won't really be able to tell what's going on):

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });

// Open a new page
const page = await browser.newPage();

// Visit Google
await page.goto('https://google.com')

// wait for 10 seconds before shutting down
await page.waitForTimeout(10000)

await browser.close();
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: false });

// Open a new page
const page = await browser.newPage();

// Visit Google
await page.goto('https://google.com');

// wait for 10 seconds before shutting down
await page.waitForTimeout(10000)

await browser.close();
</marked-tab>
```

> If you haven't already, go ahead and run this code to see what happens.

## [](#next) Next up

Now that we know how to open up a page, [let's learn]({{@link puppeteer_playwright/page/interacting.md}}) how to automate page interaction, such as clicking, typing, and pressing keys.


<!-- ## [](#final-code) Final code

Here's what our final code looks like:

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';
import * as fs from 'fs/promises';

const browser = await chromium.launch({ headless: false });

const page = await browser.newPage();

await page.goto('https://google.com/');

// 1. Click on the button which accepts Google's cookies policy
await page.click('button:has-text("I agree")');

// 2. Type "hello world" into the search bar
await page.type('input[title]', 'hello world');

// 3. Press Enter
await page.keyboard.press('Enter');

// 4. Wait for the first result to load
// 5. Click on the first result
await page.click(':nth-match(.g a, 1)');

// 6. Grab the title of the result's page
const title = await page.title();
console.log(title);

// 7. Screenshot the page
const screenshot = await page.screenshot();
await fs.writeFile('screenshot.png', screenshot);

await browser.close();
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
import puppeteer from 'puppeteer';
import * as fs from 'fs/promises';

const browser = await puppeteer.launch({ headless: false });

const page = await browser.newPage();

await page.goto('https://google.com/');

// 1. Click on the button which accepts Google's cookies policy
await page.click('button + button:nth-child(2)');

// 2. Type "hello world" into the search bar
await page.type('input[title]', 'hello world');

// 3. Press Enter
await page.keyboard.press('Enter');

// 4. Wait for the first result to load
await page.waitForSelector('.g a');

// 5. Click on the first result
await page.click('.g a');

// 6. Grab the title of the result's page
const title = await page.title();
console.log(title);

// 7. Screenshot the page
const screenshot = await page.screenshot();
await fs.writeFile('screenshot.png', screenshot);

await browser.close();
</marked-tab>
```

After running this, you should see the title of a Wikipedia article logged to console, as well as a new file in your project's root directory named **screenshot.png**.

Once again, we've only covered a few of the methods **Page** has to offer in this lesson. To learn more we highly recommend referencing the official documentation ([Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v13.7.0&show=api-class-page), [Playwright](https://playwright.dev/docs/api/class-page)) for insight into all of the functionality offered by **Page**. -->
