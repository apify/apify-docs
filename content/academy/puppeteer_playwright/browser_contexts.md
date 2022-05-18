---
title: VI - Creating multiple browser contexts
description: description
menuWeight: 7.6
paths:
    - puppeteer-playwright/browser-contexts
---

# [](#creating-browser-contexts) Creating multiple browser contexts

A [**BrowserContext**](https://playwright.dev/docs/api/class-browsercontext) is an isolated session within a **Browser** instance. This means that contexts can have different device/screen size configurations, different language and color scheme settings, etc. It is useful to use multiple browser instances when dealing with automating logging into multiple accounts simultaneously (therefore requiring multiple sessions), or in any cases where multiple sessions are required.

When we create a **Browser** object by using the `launch()` function, a single [browser context](https://playwright.dev/docs/browser-contexts) is automatically created. In order to create more, we use the [`browser.newContext()`](https://playwright.dev/docs/api/class-browser#browser-new-context) function in Playwright, and [`browser.createIncognitoBrowserContext`](https://pptr.dev/#?product=Puppeteer&version=v14.1.0&show=api-browsercreateincognitobrowsercontextoptions) in Puppeteer.

<!-- for the example create two different contexts, one with iPhone config. Then go to a website like what's my device or something and show the double results. -->