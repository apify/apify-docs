---
title: Basics of crawling
description: Learn how to crawl the web with your scraper. How to extract links and URLs from web pages and how to manage the collected links to crawl the web.
sidebar_position: 1.3
category: courses
slug: /web-scraping-for-beginners/crawling
---

# Basics of crawling {#basics}

**Learn how to crawl the web with your scraper. How to extract links and URLs from web pages and how to manage the collected links to crawl the web.**

---

Welcome to the second section of our **Web scraping for beginners** course. In the [Basics of data collection](../data_extraction/index.md) section, we learned how to extract data from a web page. Specifically, our demo e-commerce site, which we'll call [Fake Webstore](https://demo-webstore.apify.org).

In this section, we will take a look at moving between web pages, which we call **crawling**. We will extract data about all of the on-sale products on [Fake Webstore](https://demo-webstore.apify.org/search/on-sale). To do that, we will need to crawl the individual product pages.

## How do you crawl? {#how-to-crawl}

Crawling websites is a fairly straightforward process. We'll start by opening the first web page and extracting all the links (URLs) that lead to the other pages we want to visit. To do that, we'll use the skills learned in the [Basics of data collection](../data_extraction/index.md) course. We'll add some extra filtering to make sure we only get the correct URLs. Then, we'll save those URLs, so in case something happens to our scraper, we won't have to extract them again. And, finally, we will visit those URLs one by one.

At any point, we can extract URLs, data, or both. Crawling can be separate from data collection but it's not a requirement and, in most projects, it's actually easier and faster to do both at the same time. To summarize, it goes like this:

1. Visit the start URL.
2. Extract next URLs (and data) and save them.
3. Visit one of the collected URLs and save data and/or more URLs.
4. Repeat 2 and 3 until you have everything you needed.

## Next up {#next}

First, let's make sure we all understand the foundations. In the [next lesson](./recap_collection_basics.md) we will review the scraper code we already have from the [Basics of data collection](../data_extraction/index.md) section of the course.
