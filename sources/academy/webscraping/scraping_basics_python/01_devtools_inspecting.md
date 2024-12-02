---
title: Inspecting web pages with browser DevTools
sidebar_label: "DevTools: Inspecting"
description: Lesson about using the browser tools for developers to inspect and manipulate the structure of an e-commerce website.
sidebar_position: 1
slug: /scraping-basics-python/devtools-inspecting
---

**In this lesson we'll use the browser tools for developers to inspect and manipulate the structure of an e-commerce website.**

---

A browser is the most complete tool for navigating websites. Scrapers are like automated browsers—and sometimes, they actually are automated browsers. The key difference? There's no user to decide where to go or eyes to see what's displayed. Everything has to be pre-programmed.

All modern browsers provide developer tools, or DevTools, for website developers to debug their work. We'll use them to understand how websites are structured and identify the behavior our scraper needs to mimic. Here's the typical workflow for creating a scraper:

1. Inspect the target website in DevTools to understand its structure and determine how to extract the required data.
1. Translate those findings into code.
1. If the scraper fails due to overlooked edge cases or, over time, due to website changes, go back to step 1.

Now let's spend some time figuring out what the detective work from step 1 is about.

## Opening DevTools

As of now, Google Chrome is the most popular browser, and many others use the same core. For that reason we'll focus on [Chrome DevTools](https://developer.chrome.com/docs/devtools) here, but the steps are similar in other browsers like Safari ([Web Inspector](https://developer.apple.com/documentation/safari-developer-tools/web-inspector)) or Firefox ([DevTools](https://firefox-source-docs.mozilla.org/devtools-user/)).

Let's peek behind the scenes of a real-world website, for example Wikipedia. Open the Google Chrome browser and visit [wikipedia.org](https://www.wikipedia.org/). Press **F12**, or right-click anywhere on the page and select **Inspect**.

![Wikipedia with Chrome DevTools open](./images/devtools-wikipedia.png)

## Selecting an element

## Interacting with an element

:::danger Work in Progress

This lesson is under development. Please read [Starting with browser DevTools](../scraping_basics_javascript/data_extraction/browser_devtools.md) in the meantime so you can follow the upcoming lessons.

:::
