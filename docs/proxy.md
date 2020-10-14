---
title: Proxy
description: Learn how to anonymously access websites when running web scraping or automation jobs. Reduce IP address-based blocking using IP address rotation.
menuWeight: 7
category: platform
paths:
    - proxy
---

# [](./proxy) Proxy

[Apify Proxy](https://apify.com/proxy) allows you to disguise yourself when web scraping to reduce your chance of being [blocked]({{@link web_scraping_101/anti_scraping_techniques.md#ip-address-based-blocking}}).

You can use proxies in your [actors]({{@link actors.md}}) or any other application that supports HTTP, HTTPS and FTP protocols. Apify Proxy monitors the health of your IP pool and intelligently [rotates addresses](#ip-address-rotation) to prevent detection.

**You can view your proxy settings and password on the [Proxy](https://my.apify.com/proxy) page in the Apify app.**

## [](#our-proxies) Our proxies

[Datacenter proxy]({{@link proxy/datacenter_proxy.md}}) – the fastest and cheapest option, it uses data centers to mask your IP address. Chance of blocking due to other users' activity. [[Code examples]({{@link proxy/datacenter_proxy/examples.md}})]

[Residential proxy]({{@link proxy/residential_proxy.md}}) – IP addresses located in homes and offices around the world. These IPs have the lowest chance of blocking. [[Code examples]({{@link proxy/residential_proxy.md#connecting-to-residential-proxy}})]

[Google SERP proxy]({{@link proxy/google_serp_proxy.md}}) – download and extract data from Google Search engine result pages (SERPs). You can select country and language to get localized results. [[Code examples]({{@link proxy/google_serp_proxy/examples.md}})]

**For pricing information, visit [apify.com/proxy](https://apify.com/proxy).**

## [](#ip-address-rotation) IP address rotation

Web scrapers can rotate the IP addresses they use to access websites. They assign each request a different IP address, which makes it appear like they are all coming from different users.

Depending on whether you use a [browser](https://apify.com/apify/web-scraper) or [HTTP requests](https://apify.com/apify/cheerio-scraper) for your scraping jobs, IP address rotation works differently.

* Browser – a different IP address is used for each browser.
* HTTP request – a different IP address is used for each request.

**You can use [sessions](#sessions) to manage how you rotate and [persist](#session-persistence) IP addresses.**

[Click here]({{@link web_scraping_101/anti_scraping_techniques.md#bypassing-ip-address-based-blocking}}) to learn more about IP address rotation and other ways of bypassing blocking.

## [](#sessions) Sessions

Sessions allow you to use the same IP address for multiple connections.

To set a new session, pass the `session` [parameter]({{@link proxy/connection_settings.md#username-parameters}}) in your [username]({{@link proxy/connection_settings.md#username-parameters}}) field when connecting to a proxy. This will serve as the session's ID and an IP address will be assigned to it. To [use that IP address in other requests]({{@link proxy/datacenter_proxy/examples.md#multiple-requests-with-the-same-ip-address}}), pass that same session ID in the username field.

The created session will store information such as cookies and can be used to generate [browser fingerprints](https://pixelprivacy.com/resources/browser-fingerprinting/). You can also assign custom user data such as authorization tokens and specific headers.

Sessions are available for [datacenter]({{@link proxy/datacenter_proxy.md#session-persistence}}) and [residential]({{@link proxy/residential_proxy.md#session-persistence}}) proxies.

**This parameter is optional**. By default, each proxied request is assigned a randomly picked least used IP address.

### [](#session-persistence) Session persistence

You can persist your sessions (use the same IP address) by setting the `session` parameter in the `username` [field]({{@link proxy/connection_settings.md#username-parameters}}). This assigns a single IP address to a **session ID** after you make the first request.

**Session IDs represent IP addresses. Therefore, you can manage the IP addresses you use by managing sessions.** In cases where you need to keep the same session (e.g. when you need to log in to a website), it is best to keep the same proxy. By assigning an IP address to a **session ID**, you can use that IP for every request you make.

For datacenter proxies, a session persists for **24 hours** ([more info]({{@link proxy/datacenter_proxy.md#session-persistence}})). For residential proxies, it persists for **1 minute** ([more info]({{@link proxy/residential_proxy.md#session-persistence}})).

Google SERP proxies do not support sessions.

## [](#dead-proxies) Dead proxies

Our health check performs an HTTP and HTTPS request with each proxy server every few hours. If a server fails both requests 3 times in a row, it's marked as dead and all user sessions with this server are discarded.

Banned proxies are not considered dead, since they become useable after a while.
