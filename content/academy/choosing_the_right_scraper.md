---
title: How to choose the right scraper for the job
description: Understand how to choose the best scraper for your use-case by understanding some basic concepts.
menuWeight: 20
category: tutorials
paths:
    - choosing-the-right-scraper
---

# [](#choosing-the-right-scraper) Choosing the right scraper for the job

There are two main ways you can proceed with building your crawler:

1. Using plain HTTP requests.
2. Using an automated browser.

We will briefly go through the pros and cons of both, and also will cover the basic steps on how to determine which one should you go with.

## [](#performance) Performance

First, let's discuss performance. Plain HTTP request-based scraping will **always** be faster than browser-based scraping. When using plain requests, the page's HTML is not rendered, no JavaScript is executed, no images are loaded, etc. Also, there's no memory used by the browser, and there are no CPU-hungry operations.

If it were only a question of performance, you'd of course use request-based scraping every time; however, it's unfortunately not that simple.

## [](#dynamic-pages) Dynamic pages & blocking

Some websites do not load any data without a browser, as they need to execute some scripts to show it (these are known as [dynamic pages]({{@link dealing_with_dynamic_pages.md}})). Another problem is blocking. If the website is collecting a [browser fingerprint]({{@link anti_scraping/techniques/fingerprinting.md}}), it is very easy for it to distinguish between a real user and a bot (crawler) and block access.

## [](#making-the-choice) Making the choice

When choosing which scraper to use, we would suggest first checking whether the website works without JavaScript or not. Probably the easiest way to do so is to use the [Quick Javascript Switcher]({{@link tools/quick_javascript_switcher.md}}) extension for Chrome. If JavaScript is not needed, or you've spotted some XHR requests in the **Network** tab with the data you need, you probably won't need to use an automated browser browser. You can then check what data is received in response using [Postman]({{@link tools/postman.md}}) or [Insomnia]({{@link tools/insomnia.md}}) or try to sending a few requests programmatically. If the data is there and you're not blocked straight away, a request-based scraper is probably the way to go.

It also depends of course on whether you need to fill in some data (like a username and password) or select a location (such as entering zip code manually). Tasks where interacting with the page is absolutely necessary cannot be done using plain HTTP scraping, and require headless browsers. In some cases, you might also decide to use a browser-based solution in order to better blend in with the rest of the "regular" traffic coming from real users.

