---
title: Proxy
description: Learn to anonymously access websites in scraping/automation jobs. Improve data outputs and efficiency of bots, and access websites from various geographies.
sidebar_position: 10
category: platform
slug: /proxy
---

# [](./proxy) Proxy

**Learn to anonymously access websites in scraping/automation jobs. Improve data outputs and efficiency of bots, and access websites from various geographies.**

---

[Apify Proxy](https://apify.com/proxy) allows you to change your IP address when web scraping to reduce the chance of being [blocked](/academy/anti-scraping/techniques) because of your geographical location.

You can use proxies in your [actors](../actors/index.md) or any other application that supports HTTP proxies. Apify Proxy monitors the health of your IP pool and intelligently [rotates addresses](#ip-address-rotation) to prevent IP address-based blocking.

**You can view your proxy settings and password on the [Proxy](https://console.apify.com/proxy) page in the Apify Console.**

## Our proxies {#our-proxies}

[Datacenter proxy](./datacenter_proxy.md) – the fastest and cheapest option, it uses datacenters to change your IP address. Note that there is a chance of being blocked because of the activity of other users.

[Residential proxy](./residential_proxy.md) – IP addresses located in homes and offices around the world. These IPs are the least likely to be blocked.

[Google SERP proxy](./google_serp_proxy.md) – download and extract data from Google Search Engine Result Pages (SERPs). You can select country and language to get localized results.

**For pricing information, visit [apify.com/proxy](https://apify.com/proxy).**

## IP address rotation {#ip-address-rotation}

Web scrapers can rotate the IP addresses they use to access websites. They assign each request a different IP address, which makes it appear like they are all coming from different users. This greatly enhances performance and data throughout.

Depending on whether you use a [browser](https://apify.com/apify/web-scraper) or [HTTP requests](https://apify.com/apify/cheerio-scraper) for your scraping jobs, IP address rotation works differently.

* Browser – a different IP address is used for each browser.
* HTTP request – a different IP address is used for each request.

**You can use [sessions](#sessions) to manage how you rotate and [persist](#session-persistence) IP addresses.**

[Click here](/academy/anti-scraping/techniques) to learn more about IP address rotation and our findings on how blocking works.

## Sessions {#sessions}

Sessions allow you to use the same IP address for multiple connections.

To set a new session, pass the [`session`](./usage.md) parameter in your [username](./usage.md#username-parameters) field when connecting to a proxy. This will serve as the session's ID and an IP address will be assigned to it. To [use that IP address in other requests](./datacenter_proxy.md#multiple-requests-with-the-same-ip-address), pass that same session ID in the username field.

The created session will store information such as cookies and can be used to generate [browser fingerprints](https://pixelprivacy.com/resources/browser-fingerprinting/). You can also assign custom user data such as authorization tokens and specific headers.

Sessions are available for [datacenter](./datacenter_proxy.md) and [residential](./residential_proxy.md#session-persistence) proxies.

**This parameter is optional**. By default, each proxied request is assigned a randomly picked least used IP address.

### Session persistence {#session-persistence}

You can persist your sessions (use the same IP address) by setting the `session` parameter in the `username` [field](./usage.md). This assigns a single IP address to a **session ID** after you make the first request.

**Session IDs represent IP addresses. Therefore, you can manage the IP addresses you use by managing sessions.** In cases where you need to keep the same session (e.g. when you need to log in to a website), it is best to keep the same proxy. By assigning an IP address to a **session ID**, you can use that IP for every request you make.

For datacenter proxies, a session persists for **26 hours** ([more info](./datacenter_proxy.md)). For residential proxies, it persists for **1 minute** ([more info](./residential_proxy.md#session-persistence)). Using a session resets its expiry timer.

Google SERP proxies do not support sessions.

