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

[Apify Proxy](https://apify.com/proxy) allows you to change your IP address when web scraping to reduce the chance of being [blocked](../web_scraping_101/anti_scraping_techniques.md) because of your geographical location.

You can use proxies in your [actors](../actors/index.md) or any other application that supports HTTP proxies. Apify Proxy monitors the health of your IP pool and intelligently [rotates addresses](#ip-address-rotation) to prevent IP address-based blocking.

**You can view your proxy settings and password on the [Proxy](https://console.apify.com/proxy) page in the Apify Console.**

## Our proxies {#our-proxies}

[Datacenter proxy](./datacenter_proxy/index.md) – the fastest and cheapest option, it uses datacenters to change your IP address. Note that there is a chance of being blocked because of the activity of other users. [[Code examples](./datacenter_proxy/examples.md)]

[Residential proxy](./residential_proxy/index.md) – IP addresses located in homes and offices around the world. These IPs are the least likely to be blocked. [[How to connect](./residential_proxy/index.md)]

[Google SERP proxy](./google_serp_proxy/index.md) – download and extract data from Google Search Engine Result Pages (SERPs). You can select country and language to get localized results. [[Code examples](./google_serp_proxy/examples.md)]

**For pricing information, visit [apify.com/proxy](https://apify.com/proxy).**

## Using your own proxies

In addition to our proxies, you can use your own both in Apify Console and SDK.

### Custom proxies in console {#console}

To use your own proxies with Apify Console, in your actor's **Input and options** tab, scroll down and open the **Proxy and browser configuration** section. Enter your proxy URLs, and you're good to go.

![Using custom proxy in Apify Console](../images/proxy-custom.png)

### Custom proxies in SDK {#SDK}

In the Apify SDK, use the `proxyConfiguration.newUrl(sessionId)` command to add your custom proxy URLs to the proxy configuration. See the [SDK docs](https://docs.apify.com/sdk/js/api/apify/class/ProxyConfiguration#newUrl) for more details.

## IP address rotation {#ip-address-rotation}

Web scrapers can rotate the IP addresses they use to access websites. They assign each request a different IP address, which makes it appear like they are all coming from different users. This greatly enhances performance and data throughout.

Depending on whether you use a [browser](https://apify.com/apify/web-scraper) or [HTTP requests](https://apify.com/apify/cheerio-scraper) for your scraping jobs, IP address rotation works differently.

* Browser – a different IP address is used for each browser.
* HTTP request – a different IP address is used for each request.

**You can use [sessions](#sessions) to manage how you rotate and [persist](#session-persistence) IP addresses.**

[Click here](../web_scraping_101/anti_scraping_techniques.md) to learn more about IP address rotation and our findings on how blocking works.

## Sessions {#sessions}

Sessions allow you to use the same IP address for multiple connections.

To set a new session, pass the [`session`](./connection_settings.md) parameter in your [username](./connection_settings.md#username-parameters) field when connecting to a proxy. This will serve as the session's ID and an IP address will be assigned to it. To [use that IP address in other requests](./datacenter_proxy/examples.md#multiple-requests-with-the-same-ip-address), pass that same session ID in the username field.

The created session will store information such as cookies and can be used to generate [browser fingerprints](https://pixelprivacy.com/resources/browser-fingerprinting/). You can also assign custom user data such as authorization tokens and specific headers.

Sessions are available for [datacenter](./datacenter_proxy/index.md) and [residential](./residential_proxy/index.md#session-persistence) proxies.

**This parameter is optional**. By default, each proxied request is assigned a randomly picked least used IP address.

### Session persistence {#session-persistence}

You can persist your sessions (use the same IP address) by setting the `session` parameter in the `username` [field](./connection_settings.md). This assigns a single IP address to a **session ID** after you make the first request.

**Session IDs represent IP addresses. Therefore, you can manage the IP addresses you use by managing sessions.** In cases where you need to keep the same session (e.g. when you need to log in to a website), it is best to keep the same proxy. By assigning an IP address to a **session ID**, you can use that IP for every request you make.

For datacenter proxies, a session persists for **26 hours** ([more info](./datacenter_proxy/index.md)). For residential proxies, it persists for **1 minute** ([more info](./residential_proxy/index.md#session-persistence)). Using a session resets its expiry timer.

Google SERP proxies do not support sessions.

## Dead proxies {#dead-proxies}

Our health check performs an HTTP and HTTPS request with each proxy server every few hours. If a server fails both requests 3 times in a row, it's marked as dead and all user sessions with this server are discarded.

Banned proxies are not considered dead, since they become usable after a while.

## A different approach to `502 Bad Gateway`

There are times when the `502` status code is not comprehensive enough. Therefore, we have modified our server with `590-599` codes instead to provide more insight.

* `590 Non Successful`: upstream responded with non-200 status code.

* `591 RESERVED`: *this status code is reserved for further use.*

* `592 Status Code Out Of Range`: upstream responded with status code different than 100-999.

* `593 Not Found`: DNS lookup failed - [`EAI_NODATA`](https://github.com/libuv/libuv/blob/cdbba74d7a756587a696fb3545051f9a525b85ac/include/uv.h#L82) or [`EAI_NONAME`](https://github.com/libuv/libuv/blob/cdbba74d7a756587a696fb3545051f9a525b85ac/include/uv.h#L83).

* `594 Connection Refused`: upstream refused connection.

* `595 Connection Reset`: connection reset due to loss of connection or timeout.

* `596 Broken Pipe`: trying to write on a closed socket.

* `597 Auth Failed`: incorrect upstream credentials.

* `598 RESERVED`: *this status code is reserved for further use.*

* `599 Upstream Error`: generic upstream error.

`590` and `592` indicate an issue on the upstream side.<br/>
`593` indicates an incorrect `proxy-chain` configuration.<br/>
`594`, `595` and `596` may occur due to connection loss.<br/>
`597` indicates incorrect upstream credentials.<br/>
`599` is a generic error, where the above is not applicable.
