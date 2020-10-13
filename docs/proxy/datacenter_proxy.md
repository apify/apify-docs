---
title: Datacenter proxy
description: Learn how to reduce blocking when web scraping using IP address rotation. See proxy parameters and learn to implement Apify Proxy in an application.
menuWeight: 7.3
paths:
    - proxy/datacenter-proxy
---

# [](#datacenter-proxy) Datacenter proxy

Datacenter proxies are a cheap, fast and stable way to mask your identity online. When you access a website using a datacenter proxy, the site can only see the proxy center's credentials, not yours.

Datacenter proxies allow you to mask and [rotate]({{@link proxy.md#ip-address-rotation}}) your IP address during web scraping and automation jobs, reducing the possibility of them being [blocked]({{@link web_scraping_101/anti_scraping_techniques.md#ip-address-based-blocking}}). For each [HTTP/S request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), the proxy takes the list of all available IP addresses and selects the one used the longest time ago for the specific hostname.

[Apify Proxy](https://apify.com/proxy) currently offers two types of datacenter proxy:

* [Shared proxy groups](#shared-proxy-groups)
* [Dedicated proxy groups](#dedicated-proxy-groups)

## [](#features) Features

*   Periodic health checks of proxies in the pool so requests are not forwarded via [dead]({{@link proxy.md#dead-proxies}}) proxies.
*   Intelligent rotation of IP addresses so target hosts are accessed via proxies that have accessed them the longest time ago, to reduce the chance of blocking.
*   Periodically checks whether proxies are banned by selected target websites. If they are, stops forwarding traffic to them to get the proxies unbanned as soon as possible.
*   Ensures proxies are located in specific countries using IP geolocation.
*   Allows selection of groups of proxy servers with specific characteristics.
*   Supports persistent sessions that enable you to keep the same IP address for certain parts of your crawls.
*   Measures statistics of traffic for specific users and hostnames.
*   Allows selection of proxy servers by country.

## [](#shared-proxy-groups) Shared proxy groups

Each user has access to a selected number of proxy servers from a shared pool. These servers are spread into groups (called proxy groups). Each group shares a common feature (location, provider, speed and so on).

The number of proxy servers available depends on your subscription plan. When you first sign up to the Apify platform, you start a 30-day trial of the "[Freelancer](https://apify.com/pricing)" plan. Proxy servers are allocated accordingly. After the trial, you must subscribe to a paid plan to continue using Apify Proxy.

For a full list of plans and number of allocated proxy servers for each plan, see our [pricing](https://apify.com/pricing).

To access more servers or to use Apify Proxy without other parts of the Apify platform, [contact us](https://apify.com/contact).

## [](#dedicated-proxy-groups) Dedicated proxy groups

When you purchase access to dedicated proxy groups, they are assigned to you and only you can use them. You gain access to a range of static IP addresses from these groups.

This feature is useful if you have your own pool of proxy servers and still want to benefit from the features of Apify Proxy (like [IP address rotation]({{@link proxy.md#ip-address-rotation}}), [persistent sessions](#session-persistence), and health checking).

If you do not have your own pool, the [customer support](https://apify.com/contact) team can set up a dedicated group for you based on your needs and requirements.

Prices for dedicated proxy servers are mainly based on the number of proxy servers, their type, and location. [Contact us](https://apify.com/contact) for more information.

[Contact us](https://apify.com/contact) for more details or if you have any questions.

## [](#connecting-to-datacenter-proxies) Connecting to datacenter proxies

By default, each proxied HTTP request is potentially sent via a different target proxy server, which adds overhead and could be potentially problematic for websites which save cookies based on IP address.

If you want to pick an IP address and pass all subsequent connections via that same IP address, you can use the `session` [parameter]({{@link proxy.md#sessions}}).

For code examples on how to connect to datacenter proxies, see the [examples]({{@link proxy/datacenter_proxy/examples.md}}) page.

### [](#username-parameters) Username parameters

The `username` field enables you to pass various [parameters]({{@link proxy/connection_settings.md#username-parameters}}), such as groups, session and country, for your proxy connection.

**This parameter is optional**. By default, the proxy uses all available proxy servers from all groups you have access to.

If you do not want to specify either `groups` or `session` parameters and therefore use the default behavior for both, set the username to `auto`.

## [](#session-persistence) Session persistence

When you use datacenter proxy with the `session` [parameter]({{@link proxy.md#sessions}}) set in the `username` [field](#username-parameters), a single IP is assigned to the `session ID` provided after you make the first request.

**Session IDs represent IP addresses. Therefore, you can manage the IP addresses you use by managing sessions.**

This IP/session ID combination persists and expires 24 hours later. Each additional request resets the expiration time to 24 hours.

So, if you use the session at least once a day, it will never expire, with two possible exceptions:

*   The proxy server stops responding and is marked as [dead](#dead-proxies) during a health check.
*   If the proxy server is part of a proxy group that is refreshed monthly and is rotated out.

If the session is discarded due to the reasons above, it is assigned a new IP address.

To learn more about [sessions]({{@link proxy.md#sessions}}) and [IP address rotation]({{@link proxy.md#ip-address-rotation}}), see the proxy [overview page]({{@link proxy.md}}).

