---
title: Proxy
description: Learn how to anonymously access websites when running web scraping or automation jobs. Reduce IP address-based blocking using IP address rotation.
menuWeight: 7
category: platform
paths:
    - proxy
---

# [](./proxy) Proxy

<!-- TODO: when code example files are merged, link to them  -->

[Apify Proxy](https://apify.com/proxy) allows you to disguise yourself when web scraping to reduce your chance of being [blocked]({{@link web_scraping_101/anti_scraping_techniques.md#ip-address-based-blocking}}).

You can use proxies in your [actors]({{@link actors.md}}) or any other application that support HTTP, HTTPS and FTP protocols. Apify Proxy monitors the health of your IP pool and smartly rotates addresses to prevent detection.

**You can view your proxy settings on the [Proxy](https://my.apify.com/proxy) page in the Apify app.**

Currently, Apify Proxy provides access to the following options.

* [Datacenter proxy]({{@link proxy/datacenter_proxy.md}}) – the fastest and cheapest option, it uses datacentres to mask your IP address. Chance of blocking due to other users' activity.

    <!-- * [Code examples]({{@link proxy/datacenter_proxy/examples.md}}) for connecting your application -->

* [Residential proxy]({{@link proxy/residential_proxy.md}}) – IP addresses located in homes and offices of people all around the world. These IPs have the lowest chance of blocking.

    <!-- * [Code examples]({{@link proxy/residential_proxy/examples.md}}) for connecting your application -->

* [Google SERP proxy]({{@link proxy/google_serp_proxy.md}}) – download and extract data from Google Search engine result pages (SERPs). You can select country and language to get localized results.

    <!-- * [Code examples]({{@link proxy/google_serp_proxy/examples.md}}) for connecting your application -->

**For pricing information, visit [apify.com/proxy](https://apify.com/proxy).**

## [](#connecting-to-proxies) Connecting to proxies

Link here to code examples and connection settings

## [](#session-persistence) Session persistence

You can persist your sessions (use the same IP address) by setting the **session** parameter in the [**username**](#username-parameters).

This assigns a single IP address is assigned to the **session ID** after you make the first request.

For datacenter proxies, a session persists for **24 hours** ([more info]({{@link proxy/datacenter_proxy.md#session-persistence}})).

For residential proxies, a session persists for 1 minute ([more info]({{@link proxy/residential_proxy.md#session-persistence}})).

Google SERP proxies do not support sessions.

## [](#dead-proxies) Dead proxies

Our health check performs an HTTP and HTTPS request with each proxy server every few hours. If a server fails both requests 3 times in a row, it's marked as dead and all user sessions with this server are discarded.

Banned proxies are not considered dead.


