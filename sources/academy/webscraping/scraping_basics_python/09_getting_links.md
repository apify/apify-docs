---
title: Getting links form HTML with Python
sidebar_label: Getting links from HTML
description: Lesson about building a Python application for watching prices. Using the Beautiful Soup library to locate links to individual product pages.
sidebar_position: 9
slug: /scraping-basics-python/getting-links
---

import Exercises from './_exercises.mdx';

**In this lesson, we'll locate and extract links to individual product pages. We'll use BeautifulSoup to find the relevant bits of HTML.**

---

The previous lesson concludes our effort to create a scraper. Our program now downloads HTML, locates and extracts data from the markup, and saves the data in a structured and reusable way. For some use cases, this is already enough! In other cases, though, scraping just one page is hardly useful. The data is spread across the website, over several pages.

## Following links

We'll use a technique called crawling, i.e. following links and scraping multiple pages. The algorithm goes like this:

1. Visit the start URL.
1. Extract new URLs (and data), and save them.
1. Visit one of the newly found URLs and save data and/or more URLs from it.
1. Repeat 2 and 3 until you have everything you need.

This will help us figure out the actual prices of products, as right now, for some, we're only getting the minimum price.


:::danger Work in progress

This course is incomplete. As we work on adding new lessons, we would love to hear your feedback. You can comment right here under each page or [file a GitHub Issue](https://github.com/apify/apify-docs/issues) to discuss a problem.

:::
