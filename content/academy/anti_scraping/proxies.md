---
title: Proxies
description: Learn all about proxies, how they work, and how they can be leveraged in a scraper to avoid blocking and other anti-scraping tactics.
menuWeight: 4.1
category: courses
paths:
- anti-scraping/proxies
---

# [](#proxies) Proxies

A proxy server provides a gateway between users and the internet, to be more specific in our case - between the crawler and the target website. Using a proxy in a crawler is important for a couple of main reasons:

1. Many websites have [rate-limiting]({{@link glossary/rate_limiting.md}}) set up, which is when a website **limits** the **rate** at which requests can be sent from a single IP address. In cases when a higher number of requests is expected for the crawler - using a proxy is essential to let the crawler run as smoothly as possible and avoid being blocked.

2. If the crawler is used on the Apify platform without a proxy and it's sending too many requests to the target website, the website owner could complain to AWS (where the Apify platform is running), from which it could be easily tracked to us. We want to avoid AWS abuse reports for obvious reasons, and thus, as a rule of a thumb, proxies should always be used on **all** crawlers running on the platform _(no matter what)_.

## [](#understanding-proxy-links) A bit about proxy links

When using proxies in your crawlers, you'll most likely be using them in a format that looks like this:

```text
http://proxy.example.com:8080
```

This link is separated into two main components: the **host**, and the **port**. In our case, our hostname is `http://proxy.example.com`, and our port is `8080`. Sometimes, a proxy might use an IP address as the host, such as `103.130.104.33`.

If authentication (a username and a password) is required, the format will look a bit different:

```text
http://USERNAME:PASSWORD@proxy.example.com:8080
```

## [](#next) Next up

This module's first lesson will be teaching you how to configure your crawler in the Apify SDK to use and automatically roatate proxies. [Let's get right into it!]({{@link anti_scraping/proxies/using_proxies.md}})
