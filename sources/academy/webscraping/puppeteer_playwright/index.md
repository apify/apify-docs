---
title: Puppeteer & Playwright
description: Learn in-depth how to use two of the most popular Node.js libraries for controlling a headless browser - Puppeteer and Playwright.
sidebar_position: 2
category: web scraping & automation
slug: /puppeteer-playwright
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Puppeteer & Playwright course {#puppeteer-playwright-course}

**Learn in-depth how to use two of the most popular Node.js libraries for controlling a headless browser - Puppeteer and Playwright.**

---

[Puppeteer](https://pptr.dev/) and [Playwright](https://playwright.dev/) are both libraries which allow you to write code in Node.js which automates a headless browser.

> A headless browser is just a regular browser like the one you're using right now, but without the user-interface. Because they don't have a UI, they generally perform faster as they don't render any visual content. For an in-depth understanding of headless browsers, check out [this short article](https://blog.arhg.net/2009/10/what-is-headless-browser.html) about them.

Both packages were developed by the same team and are very similar, which is why we have combined the Puppeteer course and the Playwright course into one super-course that shows code examples for both technologies. There are some small differences between the two, which will be highlighted in the examples.

> Each lesson's activity will contain examples for both libraries, but we recommend using Playwright, as it is newer and has more features and better [documentation](https://playwright.dev/docs/intro)

## Advantages of using a headless browser {#advantages-of-headless-browsers}

When automating a headless browser, you can do a whole lot more in comparison to just making HTTP requests for static content. In fact, you can programmatically do pretty much anything a human could do with a browser, such as clicking elements, taking screenshots, typing into text areas, etc.

Additionally, since the requests aren't static, [dynamic content](../../glossary/concepts/dynamic_pages.md) can be rendered and interacted with (or, data from the dynamic content can be scraped).

## Setup {#setup}

For this course, we'll be jumping right into the features of these awesome libraries and expecting you to already have an environment set up. Here's how we set up our environment:

1. Make sure you've installed [Node.js](https://nodejs.org/en/)
2. Create a new folder called **puppeteer-playwright** (or whatever you want to call it)
3. Run the command `npm init -y` within your new folder to automatically initialize the project
4. Add `"type": "module"` to the **package.json** file
5. Create a new file named **index.js**
6. Install the library you're going to be using during this course:

<Tabs groupId="main">
<TabItem value="Install Playwright" label="Install Playwright">

```shell
npm install playwright

```

</TabItem>
<TabItem value="Install Puppeteer" label="Install Puppeteer">

```shell
npm install puppeteer

```

</TabItem>
</Tabs>

> For a more in-depth guide on how to set up the basic environment we'll be using in this tutorial, check out the [**Computer preparation**](../web_scraping_for_beginners/data_extraction/computer_preparation.md) lesson in the **Web scraping for beginners** course

## Course overview {#course-overview}

1. [Launching a browser](./browser.md)
2. [Opening a page](./page/index.md)
    - [Interacting with a page](./page/interacting_with_a_page.md)
    - [Waiting for content & events](./page/waiting.md)
    - [Page methods](./page/page_methods.md)
3. [Executing scripts](./executing_scripts/index.md)
    - [Injecting code](./executing_scripts/injecting_code.md)
    - [Extracting data](./executing_scripts/extracting_data.md)
4. [Reading & intercepting requests](./reading_intercepting_requests.md)
5. [Using proxies](./proxies.md)
6. [Creating multiple browser contexts](./browser_contexts.md)
7. [Common use cases](./common_use_cases/index.md)

## First up {#next}

In the [first lesson](./browser.md) of this course, we'll be learning a bit about how to create and use the **Browser** object.
