---
title: Using a scraping framework with Python
sidebar_label: Using a framework
description: Lesson about building a Python application for watching prices. Using the Crawlee framework to simplify creating a scraper.
sidebar_position: 12
slug: /scraping-basics-python/framework
---

**In this lesson, we'll rework our application for watching prices so that it builds on top of a scraping framework. We'll use Crawlee to make the program simpler, faster, and more robust.**

---

Before rewriting our code, let's point out several caveats in our current solution:

- **Hard to maintain:** All the data we need from the listing page is also available on the product page. By scraping both, we have to maintain selectors for two HTML documents. Instead, we could scrape links from the listing page and process all data on the product pages.
- **Slow:** The program runs sequentially, which is considerate toward the target website, but downloading even two product pages in parallel could improve speed by 200%.
- **No logging:** The scraper gives no sense of progress, making it tedious to use. Debugging issues becomes even more frustrating without proper logs.
- **Boilerplate code:** We implement tasks like downloading and parsing HTML or exporting to CSV with custom code that feels like [boilerplate](https://en.wikipedia.org/wiki/Boilerplate_code). We could replace it with standardized solutions.
- **Prone to anti-scraping:** If the target website implemented anti-scraping measures, a bare-bones program like ours would stop working.
- **Browser means rewrite:** We got lucky extracting variants. If the website didn't include a fallback, we might have had no choice but to spin up a browser instance and automate clicking on buttons. Such a change in the underlying technology would require a complete rewrite of our program.
- **No error handling:** The scraper stops if it encounters issues. It should allow for skipping problematic products with warnings or retrying downloads when the website returns temporary errors.

In this lesson, we'll tackle all the above issues by using a scraping framework while keeping the code concise.

:::info Why Crawlee and not Scrapy

From the two main open-source options for Python, [Scrapy](https://scrapy.org/) and [Crawlee](https://crawlee.dev/python/), we chose the latter—not just because we're the company financing its development.

We genuinely believe beginners to scraping will like it more, since it lets you create a scraper with less code and less time spent reading docs. Scrapy's long history ensures it's battle-tested, but it also means its code relies on technologies that aren't really necessary today. Crawlee, on the other hand, builds on modern Python features like asyncio and type hints.

:::

## Installing Crawlee

:::danger Work in progress

This course is incomplete. As we work on adding new lessons, we would love to hear your feedback. You can comment right here under each page or [file a GitHub Issue](https://github.com/apify/apify-docs/issues) to discuss a problem.

:::
