---
title: Dynamic Pages and SPAs
description: Learn all about how the professionals scrape various types of APIs with various configurations, parameters, and requirements.
menuWeight: 3
category: courses
paths:
- dynamic-pages-and-spas
---

# [](#dynamic-pages-and-spas) Dynamic pages and single-page applications (SPAs)

In the modern web, single-page applications (SPAs) are becoming increasingly popular, especially due to JavaScript libraries like [React.js](https://reactjs.org/) and [Vue.js](https://vuejs.org/) pushing their development to the mainstream. Often times, single-page applications (and loads of non-SPAs too) have dynamic content. As you progress in your scraping journey, you'll quickly realize that different websites load their content and populate their pages with data in different ways. Some pages are rendered entirely on the server, some retrieve the data dynamically, and some use a combination of both those methods.

## [](#about-page-loading) How page loading works

There are three main events that occur during the process of loading a page, all of which have a designated corresponding name:

1. `DOMContentLoaded` - The initial HTML document is loaded, which contains the HTML as it was rendered on the website's server. It also includes all of the JavaScript which will be run in the next step.
2. `load` - The page's JavaScript is executed.
3. `networkidle` - Network [XHR/Fetch requests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) are sent and loaded, and data from these requests is populated onto the page. Many websites load essential data this way. These requests might be sent upon certain page events as well (not just the first load), such as scrolling or clicking.

Now that we have a solid understanding of the different stages of page-loading, and the order they happen in, we can fully understand what a dynamic page is.

## [](#what-is-dynamic-content) So, what is dynamic content?

Dynamic content is any content that is rendered **after** the `DOMContentLoaded` event, which means any content loaded by JavaScript during the `load` event, or after any network XHR/Fetch requests have been made.

Sometimes, it can be quite obvious when content is dynamically being rendered. For example, take a look at this gif:

<!-- This image comes from this blog post https://blog.apify.com/what-is-a-dynamic-page/ -->
<!-- It is pretty large, so it doesn't make sense to upload it a second time here -->

![Image](https://blog.apify.com/content/images/2022/02/dynamicLoading-1--1--2.gif)

Here, it's very clear that new content is being generated. As we scroll down the Twitter feed, we can see the scroll bar jumping back up, signifying that more elements have been created using Javascript.

Other times, it's less obvious though. Content can appear to be static (non-dynamic) when it is not, or even sometimes the other way around. We'll see an example of that in the next sections.

## [](#next) Next up

This section's [first lesson]({{@link dynamic_pages_and_spas/js_in_html.md}}) will be all about finding JavaScript objects inside HTML documents, and scraping the data from there instead of from HTML elements.
