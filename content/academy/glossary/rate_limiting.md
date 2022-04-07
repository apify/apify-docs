---
title: Rate-Limiting
description: Learn about rate-limiting, a common tactic used by websites to avoid a large rate of requests from a single IP address.
menuWeight: 6.2
paths:
    - glossary/rate-limiting
---

# Rate-Limiting

In the past, most websites had their own anti-scraping solutions, the most common of which was **IP address rate-limiting**. In recent years, the popularity of third-party specialized anti-scraping providers has dramatically increased, but a lot of websites still use rate-limiting to only allow a certain number of requests per second/minute/hour to be sent from a single IP; therefore, crawler requests have the potential of being blocked entirely quite quickly. Thus, in cases when a higher number of requests is expected for the crawler, using a proxy and rotating the IPs is essential to let the crawler run as smoothly as possible and avoid being blocked.

## Beyond Rate-Limiting

Although IP quality is still the most important factor when it comes to using proxies and avoiding [anti-scraping measures]({{@link anti_scraping.md}}), nowadays it's not just about avoiding rate-limiting, which brings new challenges for scrapers that can no longer just rely on simple IP rotation. Anti-scraping software providers, such as CloudFlare, have global databases of "suspicious" IP addresses. If you are unlucky, your newly bought IP might be blocked even before you use it. If the previous owners overused it, it might have already been marked as suspicious in many databases, or even (very likely) was blocked altogether. If you care about the quality of your IPs, use them as a real user, and any website will have a hard time banning them completely.

In the Apify SDK, you can use [`browserPoolOptions.retireBrowserAfterPageCount`](https://github.com/apify/browser-pool#features) for browser-based crawlers (Puppeteer/Playwright) to retire a browser instance after a certain number of requests have been sent from it. In request-based crawlers, the [Session Pool](https://sdk.apify.com/docs/api/session-pool) can be leveraged.
