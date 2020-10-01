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

You can use proxies in your [actors]({{@link actors.md}}) or any other application that support HTTP, HTTPS and FTP protocols. Apify Proxy monitors the health of your IP pool and smartly rotates addresses to prevent detection.

**You can view your proxy settings on the [Proxy](https://my.apify.com/proxy) page in the Apify app.**

## [](#our-proxies) Our proxies

* [Datacenter proxy]({{@link proxy/datacenter_proxy.md}}) – the fastest and cheapest option, it uses data centers to mask your IP address. Chance of blocking due to other users' activity.

    * [Code examples]({{@link proxy/datacenter_proxy/examples.md}}) for connecting your application

* [Residential proxy]({{@link proxy/residential_proxy.md}}) – IP addresses located in homes and offices of people all around the world. These IPs have the lowest chance of blocking.

    * [Code examples]({{@link proxy/residential_proxy/examples.md}}) for connecting your application

* [Google SERP proxy]({{@link proxy/google_serp_proxy.md}}) – download and extract data from Google Search engine result pages (SERPs). You can select country and language to get localized results.

    * [Code examples]({{@link proxy/google_serp_proxy/examples.md}}) for connecting your application

**For pricing information, visit [apify.com/proxy](https://apify.com/proxy).**

## [](#sessions) Sessions

Sessions allow you to use the same IP address for multiple connections.

To set a new session, pass the [**session**]({{@link proxy/connection_settings.md#username-parameters}}) parameter in your [username]({{@link proxy/connection_settings.md#username-parameters}}) when connecting to a proxy. This will serve as the session's ID and an IP address will be assigned to it. To use that IP address in other requests, pass that same session ID in the username field.

The created session will store information such as cookies and can be used to generate [browser fingerprints](https://pixelprivacy.com/resources/browser-fingerprinting/). You can also assign custom user data such as authorization tokens and specific headers.

Sessions are available for [datacenter]({{@link proxy/datacenter_proxy.md#session-persistence}}) and [residential]({{@link proxy/residential_proxy.md#session-persistence}}) proxies.

**This parameter is optional**. By default, each proxied request is assigned a randomly picked least used IP address.

## [](#session-persistence) Session persistence

You can persist your sessions (use the same IP address) by setting the **session** parameter in the [**username**](#username-parameters).

This assigns a single IP address is assigned to the **session ID** after you make the first request.

For datacenter proxies, a session persists for **24 hours** ([more info]({{@link proxy/datacenter_proxy.md#session-persistence}})).

For residential proxies, a session persists for 1 minute ([more info]({{@link proxy/residential_proxy.md#session-persistence}})).

Google SERP proxies do not support sessions.

## [](#dead-proxies) Dead proxies

Our health check performs an HTTP and HTTPS request with each proxy server every few hours. If a server fails both requests 3 times in a row, it's marked as dead and all user sessions with this server are discarded.

Banned proxies are not considered dead.


