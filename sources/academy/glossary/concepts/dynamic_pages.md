---
title: Dynamic pages
description: Understand what makes a page dynamic, and how a page being dynamic might change your approach when writing a scraper for it.
sidebar_position: 8.3
slug: /concepts/dynamic-pages
---

# Dynamic pages and single-page applications (SPAs) {#dynamic-pages}

**Understand what makes a page dynamic, and how a page being dynamic might change your approach when writing a scraper for it.**

---

Oftentimes, web pages load additional information dynamically, long after their main body is loaded in the browser. A subset of dynamic pages takes this approach further and loads all of its content dynamically. Such style of constructing websites is called Single-page applications (SPAs), and it's widespread thanks to some popular JavaScript libraries, such as [React](https://react.dev/) or [Vue](https://vuejs.org/).

As you progress in your scraping journey, you'll quickly realize that different websites load their content and populate their pages with data in different ways. Some pages are rendered entirely on the server, some retrieve the data dynamically, and some use a combination of both those methods.

## How page loading works {#about-page-loading}

The process of loading a page involves three main events, each with a designated corresponding name:

1. `DOMContentLoaded` - The initial HTML document is loaded, which contains the HTML as it was rendered on the website's server. It also includes all of the JavaScript which will be run in the next step.
2. `load` - The page's JavaScript is executed.
3. `networkidle` - Network [XHR/Fetch requests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) are sent and loaded, and data from these requests is populated onto the page. Many websites load essential data this way. These requests might be sent upon certain page events as well (not just the first load), such as scrolling or clicking.

Now that we have a solid understanding of the different stages of page-loading, and the order they happen in, we can fully understand what a dynamic page is.

## What is dynamic content {#what-is-dynamic-content}

Dynamic content is any content that is rendered **after** the `DOMContentLoaded` event, which means any content loaded by JavaScript during the `load` event, or after any network XHR/Fetch requests have been made.

Sometimes, it can be quite obvious when content is dynamically being rendered. For example, take a look at this gif:

<!-- This image comes from this blog post https://blog.apify.com/what-is-a-dynamic-page/ -->
<!-- It is pretty large, so it doesn't make sense to upload it a second time here -->

![Image](https://blog.apify.com/content/images/2022/02/dynamicLoading-1--1--2.gif)

Here, it's very clear that new content is being generated. As we scroll down the Twitter feed, we can see the scroll bar jumping back up, signifying that more elements have been created using JavaScript.

Other times, it's less obvious though. Content can appear to be static (non-dynamic) when it is not, or even sometimes the other way around.
