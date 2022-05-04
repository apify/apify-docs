---
title: Puppeteer/Playwright course
description: Learn in-depth how to use two of the most popular Node.js libraries for controlling a headless browser - Puppeteer and Playwright.
menuWeight: 7
category: courses
paths:
    - puppeteer-playwright
---

# [](#puppeteer-playwright-course) Puppeteer/Playwright course

[Puppeteeer](https://pptr.dev/) and [Playwright](https://playwright.dev/) are both libraries which allow you to write code in Node.js which automates a headless browser.

> A headless browser is just a regular browser like the one you're using right now, but without the user-interface. Because they don't have a UI, they generally perform faster as they don't render any visual content. For an in-depth understanding of headless browsers, check out [this short article](https://blog.arhg.net/2009/10/what-is-headless-browser.html) about them.

Both packages were developed by the same team and are very similar, which is why we have combined the Puppeteer course and the Playwright course into one super-course that shows code examples for both technologies. There are some small differences between the two, which will be highlighted in the examples.

> Each lesson's activity will contain examples for both libraries, but we recommend using Playwright, as it is newer and has more features and better [documentation](https://playwright.dev/docs/intro)

## [](#advantages-of-headless-browsers) Advantages of using a headless browser

When automating a headless browser, you can do a whole lot more in comparison to just making HTTP requests for static content. In fact, you can programmatically do pretty much anything a human could do with a browser, such as clicking elements, taking screenshots, typing into text areas, etc.

Additionally, since the requests aren't static, [dynamic content]({{@link dynamic_pages_and_spas.md}}) can be rendered and interacted with (or, data from the dynamic content can be scraped).

## [](#setup) Setup

For this course, we'll be jumping right into the features of these awesome libraries and expecting you to already have an environment set up. Here's how we set up our environment:

1. Make sure you've installed [Node.js](https://nodejs.org/en/)
2. Create a new folder called **puppeteer-playwright** (or whatever you want to call it)
3. Run the command `npm init -y` within your new folder to automatically initialize the project
4. Create a new file named **index.js**
5. Install the library you're going to be using during this course:

```marked-tabs
<marked-tab header="Install Playwright" lang="shell">
npm install playwright
</marked-tab>
<marked-tab header="Install Puppeteer" lang="shell">
npm install puppeteer
</marked-tab>
```

## [](#course-overview) Course overview

1. [Browser]({{@link puppeteer_playwright/browser.md}})
2. [Page]({{@link puppeteer_playwright/page.md}})
3. [Executing scripts]({{@link puppeteer_playwright/executing_scripts.md}})

<!-- Everything that will be learned in the course -->

<!-- Will be scraping fake-webstore -->
<!-- 1. opening a page (talk about what is browsercontext, what is a page, what is headless vs headful - it's headless by default) -->
<!-- 2. interacting with a page (talk about page.evaluate, page.click, page.type, etc.) -->
<!-- 3. collecting data from a page (using page.evaluate, or also using cheerio (better option) - but with cheerio it's running in a different context) -->
<!-- 4. Modifying headers, geolocation, adding proxies, etc. -->

<!-- Don't forget: In each lesson, have marked tabs examples for both puppeteer and playwright -->

## [](#next) Next up
