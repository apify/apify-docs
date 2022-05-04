---
title: II - Page
description: Learn how to create a Page object on a Browser object, and how to use it to visit and programmatically interact with a website.
menuWeight: 7.2
paths:
    - puppeteer-playwright/page
---

# [](#page) Page

When you open a normal browser and visit a website, you open up a new page (or tab) before entering the URL in the search bar and hitting the **Enter** key. In Playwright and Puppeteer, you also have to open up a new page before visiting a URL. This can be done with the `browser.newPage()` function, which will return a **Page** object ([Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v13.7.0&show=api-class-page), [Playwright](https://playwright.dev/docs/api/class-page)).

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });

const page = await browser.newPage();

await browser.close();
</marked-tab>
<marked-tab header="Puppeteeer" lang="javascript">
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: false });

const page = await browser.newPage();

await browser.close();
</marked-tab>
```

Then, we can visit a website with the `page.goto()` method. Let's go to [Google](https://google.com) for now. We'll also create a custom function called `sleep`, which will force the program to wait for a number of seconds before moving quitting (otherwise, everything will just flash before our eyes and we won't really tell what's going on):

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';

const sleep = (secs) => new Promise((r) => setTimeout(r, secs * 1000));

const browser = await chromium.launch({ headless: false });

const page = await browser.newPage();

await page.goto('https://google.com')

// wait for 10 seconds before shutting down
await sleep(10);

await browser.close();
</marked-tab>
<marked-tab header="Puppeteeer" lang="javascript">
import puppeteer from 'puppeteer';

const sleep = (secs) => new Promise((r) => setTimeout(r, secs * 1000));

const browser = await puppeteer.launch({ headless: false });

const page = await browser.newPage();

await page.goto('https://google.com');

// wait for 10 seconds before shutting down
await sleep(10);

await browser.close();
</marked-tab>
```

> If you haven't already, go ahead and run this code.

## [](#interacting-with-a-page) Interacting with a page

The **Page** object has whole boat-load of functions which can be used to interact with the loaded page. We're not going to go over all of them, but we _will_ use a few very important ones to add some functionality to our current project.

Let's say that we want automate searching for **hello world** on Google, then click on the first result and log the title of the page to the console, then take a screenshot and write it it to the filesystem. In order to understand how we're going to automate this, let's break down how we would do it manually:

1. Click on the button which accepts Google's cookies policy
2. Type **hello world** into the search bar
3. Press **Enter**
4. Wait for the results page to load
5. Click on the first result
6. Read the title of the result's page
7. Screenshot the page

Though it seems complex, the wonderful **Page** API makes all of these actions extremely easy to perform.

### Clicking & pressing keys

Let's first focus on the first 3 steps listed above. By using `page.click()` and the CSS selector of the element to click, we can click an element:

```JavaScript
// Click the "I understand" button
await page.click('button + button:nth-child(2)');
```

Then, we can type some text into an input field with `page.type()`; passing a CSS selector as the first, and the string to input as the second parameter:

```JavaScript
// Type the query into the search box
await page.type('input[title]', 'hello world');
```

Finally, we can press a single key by access the `keyboard` property of `page` and calling the `press()` function on it:

```JavaScript
// Press enter
await page.keyboard.press('Enter');
```

So far, we've got this:

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';

const sleep = (secs) => new Promise((r) => setTimeout(r, secs * 1000));

const browser = await chromium.launch({ headless: false });

const page = await browser.newPage();

await page.goto('https://google.com/');

// Click the "I understand" button
await page.click('button + button:nth-child(2)');

// Type the query into the search box
await page.type('input[title]', 'hello world');

// Press enter
await page.keyboard.press('Enter');

await sleep(10);
await browser.close();
</marked-tab>
<marked-tab header="Puppeteeer" lang="javascript">
import puppeteer from 'puppeteer';

const sleep = (secs) => new Promise((r) => setTimeout(r, secs * 1000));

const browser = await puppeteer.launch({ headless: false });

const page = await browser.newPage();

await page.goto('https://google.com/');

// Click the "I understand" button
await page.click('button + button:nth-child(2)');

// Type the query into the search box
await page.type('input[title]', 'hello world');

// Press enter
await page.keyboard.press('Enter');

await sleep(10);
await browser.close();
</marked-tab>
```

When we run it, we leave off on the results page:

![Google results page reached by headless browser]({{@asset puppeteer_playwright/images/google-results.webp}})

### Waiting for elements/events

In a perfect world, every piece of content served on a website would be loaded instantly. We don't live in a perfect world though, and often times it can take anywhere between 1/10th of a second to a few seconds to load some content onto a page. Puppeteer and Playwright don't sit around waiting for the pages to load though - if we tell it to do something with an element that hasn't rendered yet, it'll start trying to do it (which will result in nasty errors). We've got to tell it to wait.

Different events can be waited for using the various `waitFor...` methods offered, while elements can be waited for with `page.waitForSelector()` in both Playwright and Puppeteer. In Playwright you can also create a locator for an element and use the `locator.waitFor()` function. Luckily, we'll only have to use `page.waitForSelector()` before clicking the first result in our Puppeteer code, because Playwright automatically waits for the element to appear before clicking.

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
// You don't need to add any fancy code to wait for
// an element before clicking it in Playwright!
</marked-tab>
<marked-tab header="Puppeteeer" lang="javascript">
// Wait for the first result element to be visible
await page.waitForSelector('.g a');
</marked-tab>
```

> If we were to omit the `page.waitForSelector()` before `page.click()` in Puppeteer, an error would be thrown.

### Getting general page data

There are two main page functions which will return general data:

1. `page.content()` will return the entire HTML content of the page.
2. `page.title()` will return the title of the current page.

For our case, we'll click on the first result, then utilize `page.title()` to grab the title and log it to the console:

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
// Click the first result
await page.click(':nth-match(.g a, 1)');

// Grab hold of the page's title
const title = await page.title();

// Log the title to the console
console.log(title);
</marked-tab>
<marked-tab header="Puppeteeer" lang="javascript">
// Wait for the first result element to be visible
await page.waitForSelector('.g a');

// Click the first result
await page.click('.g a');

// Grab hold of the page's title
const title = await page.title();

// Log the title to the console
console.log(title);
</marked-tab>
```

### Screenshotting

The `page.screenshot()` will return a buffer which can be written to the filesystem as an image:

```JavaScript
import * as fs from 'fs/promises';
// ...

// Take the screenshot
const screenshot = await page.screenshot();

// Write it to the filesystem
await fs.writeFile('screenshot.png', screenshot);
```

## [](#final-code) Final code

Here's what our final code looks like:

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';
import * as fs from 'fs/promises';

const browser = await chromium.launch({ headless: false });

const page = await browser.newPage();

await page.goto('https://google.com/');

// 1. Click on the button which accepts Google's cookies policy
await page.click('button + button:nth-child(2)');

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
<marked-tab header="Puppeteeer" lang="javascript">
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

After running this, you should see the title of a Wikipedia article logged to console, as well as a new file in your project's root directory named **screenshot.jpg**.

Once again, we've only covered a few of the methods the **Page** object has to offer in this lesson. We won't learn about all of them in this course, so we highly recommend referencing the official documentation ([Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v13.7.0&show=api-class-page), [Playwright](https://playwright.dev/docs/api/class-page)) for insight into all of the functionality offered by **Page**.

## [](#next) Next up

In the [next exciting lesson]({{@link puppeteer_playwright/executing_scripts.md}}), we'll gain a solid understanding of the two different contexts we can run our code in when using Puppeteer and Playwright, and how to run code in the context of the browser.
