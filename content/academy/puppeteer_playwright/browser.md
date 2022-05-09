---
title: I - Launching a browser
description: Understand what the Browser object is in Puppeteer/Playwright, how to create one, and a bit about how to interact with one.
menuWeight: 7.1
paths:
    - puppeteer-playwright/browser
---

# [](#browser) Browser

In order to automate a browser in Playwright or Puppeteer, we need to open one up programmatically. Playwright supports Chromium, Firefox, and Webkit (Safari), while Puppeteer only supports Chromium based browsers. For ease of understanding, we've chosen to use Chromium in the Playwright examples to keep things working on the same plane.

Let's start by using the `launch()` function in the **index.js** file we created in the intro to this course:

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';

await chromium.launch();

console.log('launched!');
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
import puppeteer from 'puppeteer';

await puppeteer.launch();

console.log('launched!');
</marked-tab>
```

When we run this code with the command `node index.js`, a browser will open up; however, we won't actually see anything. This is because the default mode of a browser after `launch()`ing it is **headless**, meaning that it has no visible UI.

> If you run this code right now, it will hang. Use **control^** + **C** to force quit the program.

## [](#launch-options) Launch options

In order to see what's actually happening, we can pass an **options** object ([Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v13.7.0&show=api-puppeteerlaunchoptions), [Playwright](https://playwright.dev/docs/api/class-browsertype#browser-type-launch)) with **headless** set to **false**.

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';

await chromium.launch({ headless: false });
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
import puppeteer from 'puppeteer';

await puppeteer.launch({ headless: false });
</marked-tab>
```

Now we'll actually see a browser open up.

![Chromium browser opened by Puppeteer/Playwright]({{@asset puppeteer_playwright/images/chromium.webp}})

There are a whole lot more options that we can pass into the `launch()` function, which we'll be getting into a little bit later on.

## [](#browser-methods) Browser methods

The `launch()` function also returns an object representation of the browser that we can use to interact with the browser right from our code. This **Browser** object ([Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v13.7.0&show=api-class-browser), [Playwright](https://playwright.dev/docs/api/class-browser)) has many functions which make it easy to do this. One of these functions is `close()`. Until now, we've been using **control^** + **C** to force quit the process, but with this function, we'll no longer have to do that.

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });

// code will be here in the future

await browser.close();
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: false });

// code will be here in the future

await browser.close();
</marked-tab>
```

<!-- In a few lessons from now, we'll be discussing the `browser.contexts()` (Playwright)/`browser.browserContexts()` (Puppeteer) functions and how to create **browser contexts** with another function on the **Browser** object. -->

## [](#next) Next up

Now that we can open a browser, let's move onto the [next lesson]({{@link puppeteer_playwright/page.md}}) where we will learn how to create pages and visit websites programmatically.

<!-- Talk about browser context later, it doesn't make sense to show it until we're actually creating pages -->

<!-- ## [](#browser-context) Browser context

**BrowserContext** objects ([Playwright](https://pptr.dev/#?product=Puppeteer&version=v13.7.0&show=api-class-browsercontext), [Playwright](https://playwright.dev/docs/api/class-browsercontext)) allow us to create and manage multiple browser sessions. -->
