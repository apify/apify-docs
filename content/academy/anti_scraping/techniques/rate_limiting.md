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

In cases when a higher number of requests is expected for the crawler, using a [proxy]({{@link anti_scraping/mitigation/proxies.md}}) and rotating the IPs is essential to let the crawler run as smoothly as possible and avoid being blocked.

## [](#dealing-with-rate-limiting) Dealing rate limiting with proxy/session rotating

The most popular and effective way of avoiding rate-limiting issues is by rotating [proxies]({{@link anti_scraping/mitigation/proxies.md}}) after every **n** number of requests, which makes your scraper appear as if it is making requests from various different places. Since the majority of rate-limiting solutions are based on IP addresses, rotating IPs allows a scraper to make large amounts to a website without getting restricted.

In Crawlee, proxies are automatically rotated for you when you use `ProxyConfiguration` and a [**SessionPool**](https://crawlee.dev/api/core/class/SessionPool) within a crawler. The SessionPool handles a lot of the nitty gritty of proxy rotating, especially with [browser based crawlers]({{@link puppeteer_playwright.md}}) by retiring a browser instance after a certain number of requests have been sent from it in order to use a new proxy (a browser instance must be retired in order to use a new proxy).

Here is an example of these features being used in a **PuppeteerCrawler** instance:

```JavaScript
import { PuppeteerCrawler } from 'crawlee';
import { Actor } from 'apify';

const myCrawler = new PuppeteerCrawler({
    proxyConfiguration: await Actor.createProxyConfiguration({
        groups: ['RESIDENTIAL'],
    }),
    sessionPoolOptions: {
        // Note that a proxy is tied to a session
        sessionOptions: {
            // Let's say the website starts blocking requests after
            // 20 requests have been sent in the span of 1 minute from
            // a single user.
            // We can stay on the safe side and retire the browser
            // and rotate proxies after 15 pages (requests) have been opened.
            maxUsageCount: 15,
        },
    },
    // ...
});
```

> Take a look at the [**Using proxies**]({{@link anti_scraping/mitigation/using_proxies.md}}) lesson to learn more about how to use proxies and rotate them in Crawlee.

### [](#configuring-session-pool) Configuring a session pool

There are various configuration options available in `sessionPoolOptions` that can be used to set up the SessionPool for different rate-limiting scenarios. In the example above, we used `maxUsageCount` within `sessionOptions` to prevent more than 15 requests from being sent using a session before it was thrown away; however, a maximum age can also be set using `maxAgeSecs`.

When dealing with frequent and unpredictable blockage, the `maxErrorScore` option can be set to trash a session after it's hit a certain number of errors.

To learn more about all configurations available in `sessionPoolOptions`, refer to the [Crawlee documentation](https://crawlee.dev/api/core/interface/SessionPoolOptions).

> Don't worry too much about these configurations. Crawlee's defaults are usually good enough for the majority of use cases.

## [](#next) Next up

Though rate limiting is still common today, a lot of sites have improved over the years to use more complicated techniques such as **browser fingerprinting**, which is covered in the [next lesson]({{@link anti_scraping/techniques/fingerprinting.md}}).
