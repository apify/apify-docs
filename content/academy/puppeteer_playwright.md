---
title: Puppeteer & Playwright
description: Learn in-depth how to use two of the most popular Node.js libraries for controlling a headless browser - Puppeteer and Playwright.
menuWeight: 2
category: web scraping courses
paths:
    - puppeteer-playwright
---

# [](#puppeteer-playwright-course) Puppeteer & Playwright course

[Puppeteer](https://pptr.dev/) and [Playwright](https://playwright.dev/) are both libraries which allow you to write code in Node.js which automates a headless browser.

> A headless browser is just a regular browser like the one you're using right now, but without the user-interface. Because they don't have a UI, they generally perform faster as they don't render any visual content. For an in-depth understanding of headless browsers, check out [this short article](https://blog.arhg.net/2009/10/what-is-headless-browser.html) about them.

Both packages were developed by the same team and are very similar, which is why we have combined the Puppeteer course and the Playwright course into one super-course that shows code examples for both technologies. There are some small differences between the two, which will be highlighted in the examples.

> Each lesson's activity will contain examples for both libraries, but we recommend using Playwright, as it is newer and has more features and better [documentation](https://playwright.dev/docs/intro)

## [](#advantages-of-headless-browsers) Advantages of using a headless browser

When automating a headless browser, you can do a whole lot more in comparison to just making HTTP requests for static content. In fact, you can programmatically do pretty much anything a human could do with a browser, such as clicking elements, taking screenshots, typing into text areas, etc.

Additionally, since the requests aren't static, [dynamic content]({{@link concepts/dynamic_pages.md}}) can be rendered and interacted with (or, data from the dynamic content can be scraped).

## [](#setup) Setup

For this course, we'll be jumping right into the features of these awesome libraries and expecting you to already have an environment set up. Here's how we set up our environment:

1. Make sure you've installed [Node.js](https://nodejs.org/en/)
2. Create a new folder called **puppeteer-playwright** (or whatever you want to call it)
3. Run the command `npm init -y` within your new folder to automatically initialize the project
4. Add `"type": "module"` to the **package.json** file
5. Create a new file named **index.js**
6. Install the library you're going to be using during this course:

```marked-tabs
<marked-tab header="Install Playwright" lang="shell">
npm install playwright
</marked-tab>
<marked-tab header="Install Puppeteer" lang="shell">
npm install puppeteer
</marked-tab>
```

> For a more in-depth guide on how to set up the basic environment we'll be using in this tutorial, check out the [**Computer preparation**]({{@link web_scraping_for_beginners/data_collection/computer_preparation.md}}) lesson in the **Web scraping for beginners** course

## [](#course-overview) Course overview

1. [Launching a browser]({{@link puppeteer_playwright/browser.md}})
2. [Opening a page]({{@link puppeteer_playwright/page.md}})
    - [Interacting with a page]({{@link puppeteer_playwright/page/interacting_with_a_page.md}})
    - [Waiting for content & events]({{@link puppeteer_playwright/page/waiting.md}})
    - [Page methods]({{@link puppeteer_playwright/page/page_methods.md}})
3. [Executing scripts]({{@link puppeteer_playwright/executing_scripts.md}})
    - [Injecting code]({{@link puppeteer_playwright/executing_scripts/injecting_code.md}})
    - [Collecting data]({{@link puppeteer_playwright/executing_scripts/collecting_data.md}})
4. [Reading & intercepting requests]({{@link puppeteer_playwright/reading_intercepting_requests.md}})
5. [Using proxies]({{@link puppeteer_playwright/proxies.md}})
6. [Creating multiple browser contexts]({{@link puppeteer_playwright/browser_contexts.md}})
7. [Common use cases]({{@link puppeteer_playwright/common_use_cases.md}})

## [](#next) First up

In the [first lesson]({{@link puppeteer_playwright/browser.md}}) of this course, we'll be learning a bit about how to create and use the **Browser** object.
