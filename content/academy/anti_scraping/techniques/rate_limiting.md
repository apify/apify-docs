---
title: Rate-limiting
description: Learn about rate-limiting, a common tactic used by websites to avoid a large and non-human rate of requests coming from a single IP address.
menuWeight: 1
paths:
    - anti-scraping/techniques/rate-limiting
---

# [](#rate-limiting) Rate-limiting

When crawling a website, a web scraping bot will typically send many more requests from a single IP address than a human user could generate over the same period. Websites can easily monitor how many requests they receive from a single IP address, and block it or require a [captcha]({{@link anti_scraping/techniques/captchas.md}}) test to continue making requests.

In the past, most websites had their own anti-scraping solutions, the most common of which was IP address rate-limiting. In recent years, the popularity of third-party specialized anti-scraping providers has dramatically increased, but a lot of websites still use rate-limiting to only allow a certain number of requests per second/minute/hour to be sent from a single IP; therefore, crawler requests have the potential of being blocked entirely quite quickly.

In cases when a higher number of requests is expected for the crawler, using a [proxy]({{@link anti_scraping/proxies.md}}) and rotating the IPs is essential to let the crawler run as smoothly as possible and avoid being blocked.

## [](#handling-rate-limiting) Dealing with sites which have rate-limiting

In the Apify SDK, you can use [`browserPoolOptions.retireBrowserAfterPageCount`](https://github.com/apify/browser-pool#features) for browser-based crawlers (Puppeteer/Playwright) to retire a browser instance after a certain number of requests have been sent from it. In request-based crawlers, the [Session Pool](https://sdk.apify.com/docs/api/session-pool) can be leveraged.

<!-- Add more here -->

## [](#next) Next up

Though rate limiting is still common today, a lot of sites have improved over the years to use more complicated techniques such as **browser fingerprinting**, which is covered in the [next lesson]({{@link anti_scraping/techniques/fingerprinting.md}}).
