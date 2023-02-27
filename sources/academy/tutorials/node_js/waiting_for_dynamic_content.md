---
title: Waiting for dynamic content
description: You load the page. You execute the correct selectors. Everything should work. It doesn't? Learn how to wait for dynamic loading.
sidebar_position: 14.9
slug: /node-js/waiting-for-dynamic-content
---

Use these helper functions to wait for data:

- `page.waitFor`  in [Puppeteer](https://pptr.dev/) (or Puppeteer Scraper ([apify/puppeteer-scraper](https://apify.com/apify/puppeteer-scraper))).

- `context.waitFor`  in Web Scraper ([apify/web-scraper](https://apify.com/apify/web-scraper)).

Pass in time in milliseconds or a selector to wait for.

Examples:

- `await page.waitFor(10000)` - waits for 10 seconds.

- `await context.waitFor('my-selector')` - waits for `my-selector` to appear on the page.

For details, code examples, and advanced use cases, visit our [documentation](../../webscraping/puppeteer_playwright/page/waiting.md).
