---
title: Datacenter proxy
description: Learn how to reduce blocking when web scraping using IP address rotation. See proxy parameters and learn to implement Apify Proxy in an application.
sidebar_position: 10.3
slug: /proxy/datacenter-proxy
---

# Datacenter proxy {#datacenter-proxy}

**Learn how to reduce blocking when web scraping using IP address rotation. See proxy parameters and learn to implement Apify Proxy in an application.**

---

Datacenter proxies are a cheap, fast and stable way to mask your identity online. When you access a website using a datacenter proxy, the site can only see the proxy center's credentials, not yours.

Datacenter proxies allow you to mask and [rotate](../index.md) your IP address during web scraping and automation jobs, reducing the possibility of them being [blocked](/academy/anti-scraping/techniques#access-denied). For each [HTTP/S request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), the proxy takes the list of all available IP addresses and selects the one used the longest time ago for the specific hostname.

[Apify Proxy](https://apify.com/proxy) currently offers two types of datacenter proxy:

* [Shared proxy groups](#shared-proxy-groups)
* [Dedicated proxy groups](#dedicated-proxy-groups)

## Features {#features}

* Periodic health checks of proxies in the pool so requests are not forwarded via [dead](../index.md) proxies.
* Intelligent rotation of IP addresses so target hosts are accessed via proxies that have accessed them the longest time ago, to reduce the chance of blocking.
* Periodically checks whether proxies are banned by selected target websites. If they are, stops forwarding traffic to them to get the proxies unbanned as soon as possible.
* Ensures proxies are located in specific countries using IP geolocation.
* Allows selection of groups of proxy servers with specific characteristics.
* Supports persistent sessions that enable you to keep the same IP address for certain parts of your crawls.
* Measures statistics of traffic for specific users and hostnames.
* Allows selection of proxy servers by country.

## Shared proxy groups {#shared-proxy-groups}

Each user has access to a selected number of proxy servers from a shared pool. These servers are spread into groups (called proxy groups). Each group shares a common feature (location, provider, speed and so on).

The number of proxy servers available depends on your subscription plan. When you first sign up to Apify platform, you get a 30-day free trial of Apify Proxy. After the trial, you must subscribe to a paid plan to continue using Apify Proxy.

For a full list of plans and number of allocated proxy servers for each plan, see our [pricing](https://apify.com/pricing).

To access more servers or to use Apify Proxy without other parts of the Apify platform, [contact us](https://apify.com/contact).

## Dedicated proxy groups {#dedicated-proxy-groups}

When you purchase access to dedicated proxy groups, they are assigned to you, and only you can use them. You gain access to a range of static IP addresses from these groups.

This feature is useful if you have your own pool of proxy servers and still want to benefit from the features of Apify Proxy (like [IP address rotation](../index.md), [persistent sessions](#session-persistence), and health checking).

If you do not have your own pool, the [customer support](https://apify.com/contact) team can set up a dedicated group for you based on your needs and requirements.

Prices for dedicated proxy servers are mainly based on the number of proxy servers, their type, and location. [Contact us](https://apify.com/contact) for more information.

[Contact us](https://apify.com/contact) for more details or if you have any questions.

## Connecting to datacenter proxies {#connecting-to-datacenter-proxies}

By default, each proxied HTTP request is potentially sent via a different target proxy server, which adds overhead and could be potentially problematic for websites which save cookies based on IP address.

If you want to pick an IP address and pass all subsequent connections via that same IP address, you can use the `session` [parameter](../index.md).

For code examples on how to connect to datacenter proxies, see the [examples](./examples.md) page.

### Username parameters {#username-parameters}

The `username` field enables you to pass various [parameters](../connection_settings.md), such as groups, session and country, for your proxy connection.

**This parameter is optional**. By default, the proxy uses all available proxy servers from all groups you have access to.

If you do not want to specify either `groups` or `session` parameters and therefore use the default behavior for both, set the username to `auto`.

## Session persistence {#session-persistence}

When you use datacenter proxy with the `session` [parameter](../index.md) set in the `username` [field](#username-parameters), a single IP is assigned to the `session ID` provided after you make the first request.

**Session IDs represent IP addresses. Therefore, you can manage the IP addresses you use by managing sessions.** [[More info](../index.md)]

This IP/session ID combination is persisted and expires 26 hours later. Each additional request resets the expiration time to 26 hours.

So, if you use the session at least once a day, it will never expire, with two possible exceptions:

* The proxy server stops responding and is marked as [dead](../index.md) during a health check.
* If the proxy server is part of a proxy group that is refreshed monthly and is rotated out.

If the session is discarded due to the reasons above, it is assigned a new IP address.

To learn more about [sessions](../index.md#sessions) and [IP address rotation](../index.md#ip-address-rotation), see the [proxy overview page](../index.md).

