---
title: Inspecting web pages with browser DevTools
sidebar_label: "DevTools: Inspecting"
description: Lesson about using the browser tools for developers to inspect and manipulate the structure of an e-commerce website.
sidebar_position: 1
slug: /scraping-basics-python/devtools-inspecting
---

**In this lesson we'll use the browser tools for developers to inspect and manipulate the structure of an e-commerce website.**

---

Browser is the most complete program which can walk through websites. Scrapers are something like automated browsers and in some cases, they _are_ automated browsers. The only difference is that there is no user to tell where to navigate, and there are no eyes to see what has loaded. Everything must be predefined in the program.

DevTools were made for website creators to debug their work. We'll use them to understand how websites are made and figure out behavior we'll need to teach our scraper. The scraper creator's workflow is the following:

1. Inspect the target website in DevTools. See how it's made and in what ways our scraper can automatically extract the data we need.
1. Translate our findings to code. Run the scraper.
1. If we forgot about some corner cases or the website has changed, the scraper crashes. We repeat from 1. to accomodate necessary changes.

## Opening DevTools

Every modern browser offers tools for developers, so called _DevTools_. Anyone can open them with a few keystrokes and see how any website is made.

Open the Google Chrome browser and go to [Wikipedia](https://www.wikipedia.org/). Now press **F12** or right-click anywhere in the page and choose **Inspect**.

:::info Browsers and DevTools

At the time of writing this lesson, Google Chrome is the most-used browser, and many other niche browsers share the same core. That's why we'll focus on [Chrome DevTools](https://developer.chrome.com/docs/devtools) here, but the steps would be almost identical also in browsers using different cores, such as Safari or Firefox.

:::

![Wikipedia with Chrome DevTools open](./images/browser-devtools-wikipedia.png)

## Selecting an element

## Interacting with an element

:::danger Work in Progress

This lesson is under development. Please read [Starting with browser DevTools](../scraping_basics_javascript/data_extraction/browser_devtools.md) in the meantime so you can follow the upcoming lessons.

:::

<!--
https://developer.chrome.com/docs/devtools/
https://firefox-dev.tools/
https://developer.apple.com/documentation/safari-developer-tools/web-inspector
-->
