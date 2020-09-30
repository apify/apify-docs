---
title: Proxy
description: Learn how to anonymously access websites when running web scraping or automation jobs. Reduce IP address-based blocking using IP address rotation.
menuWeight: 7
category: platform
paths:
    - proxy
---

# [](./proxy) Proxy

[Apify Proxy](https://apify.com/proxy) reduces IP address-based blocking. You can use it in your [actors]({{@link actors.md}}) or any other application that supports HTTP, HTTPS and FTP protocols. Apify Proxy monitors the health of your IP pool and smartly rotates addresses to prevent detection.

**You can view your proxy settings on the [Proxy](https://my.apify.com/proxy) page in the Apify app.**

Currently, Apify Proxy provides access to the following options.

* [Datacenter proxy]({{@link proxy/datacenter_proxy.md}}) – the fastest and cheapest option, they use dedicated datacentres to mask your IP address. Chance of blocking due to other users' activity.

    * [Code examples]({{@link proxy/datacenter_proxy/examples.md}}) for connecting your application

* [Residential proxy]({{@link proxy/residential_proxy.md}}) – IP addresses located in homes and offices of people all around the world. These IPs have the lowest chance of blocking.

    * [Code examples]({{@link proxy/residential_proxy/examples.md}}) for connecting your application

* [Google SERP proxy]({{@link proxy/google_serp_proxy.md}}) – download and extract data from Google Search engine result pages (SERPs). You can select country and language to get localized results.

    * [Code examples]({{@link proxy/google_serp_proxy/examples.md}}) for connecting your application

**For pricing information, visit [apify.com/proxy](https://apify.com/proxy).**



