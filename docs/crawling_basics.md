---
title: Basics of crawling
description: Learn how to crawl the web with your scraper. How to extract links and URLs from web pages and how to manage the collected links to crawl the web.
menuWeight: 21
category: web scraping academy
paths:
- crawling-basics
---

# [](#basics) Basics of crawling

Basics of crawling is the second part of our web scraping for beginners course. In the [Basics of data collection]({{@link data_collection_basics.md}}) part, we learned how to extract data from a web page. Specifically the [Alexa Top Sites index](https://www.alexa.com/topsites).

In this part we will take a look at moving between web pages which we call crawling. We will collect data for all the countries in the [Alexa Top Sites by Country index](https://www.alexa.com/topsites/countries) and

## [](#how-to) How to crawl?

Crawling websites is a fairly straightforward process. We'll start by opening the first web page and collecting all the links (URLs) that lead to the other pages we want to visit. To do that, we'll use the skills learned in the [Basics of data collection]({{@link data_collection_basics.md}}) course and some extra filtering, to make sure we only get the correct URLs. Then we'll save those URLs, so in case something happens with our scraper, we won't have to collect them again. And finally, we will visit those URLs one by one.

At any point, we can collect URLs, data, or both. Crawling can be separate from data collection, but it's not a requirement and in most projects, it's actually easier and faster to do both at the same time. To summarize, it goes like this:

1. Visit the start URL.
2. Collect next URLs (and data) and save them.
3. Visit one of the collected URLs and save data and/or more URLs.
4. Repeat 2 and 3 until you have everything you needed.

## [](#next) Next up

We will review the code we already have from the Basics of data collection section, and we'll start adding more code that will help us move around the website. Let's go 🏃
