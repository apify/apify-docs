---
title: Datacenter proxy
description: Documentation of Apify Proxy that enables anonymization of access to websites and IP rotation.
menuWeight: 7.3
---

# [](#datacenter-proxy)Datacenter proxy servers

Apify Proxy provides access to Apify's pool of datacenter IP addresses to [actors](./actor) or any other application that support HTTP proxies. The proxy enables intelligent rotation of IP addresses during web scraping to avoid being blocked by target websites.

## [](#datacenter-proxy--overview)Overview

Datacenter proxy automatically rotates IP addresses. For each HTTP or HTTPS request, the proxy takes the list of all IP addresses available to the user and selects the one that has been used the longest time ago for the specific hostname. This behavior minimizes the chance of the proxy being blocked.

Note that by default each proxied HTTP request is potentially sent via a different target proxy server, which adds overhead and could be potentially problematic for websites which save cookies based on IP address. If you want to force the proxy to pick an IP address and then pass all subsequent connections via the same IP address, you can use the `session` parameter. See [Username parameters](#datacenter-proxy--username-params) more details.

Prices for dedicated proxy servers are mainly based on the number of proxy servers, their type, and location. Please [contact us](/contact) for more information.

## [](#datacenter-proxy--features)Features

*   Periodic health checks of proxies in the pool to ensure requests are not forwarded via dead proxies.
*   Intelligent rotation of IP addresses to ensure target hosts are accessed via proxies that have accessed them the longest time ago, to reduce the chance of blocking.
*   Periodically checks whether proxies are banned by selected target websites, and if they are, stops forwarding traffic to them to get the proxies unbanned as soon as possible.
*   Ensures proxies are located in specific countries using IP geolocation.
*   Allows selection of groups of proxy servers with specific characteristics.
*   Supports persistent sessions that enable you to keep the same IP address for certain parts of your crawls.
*   Measures statistics of traffic for specific users and hostnames.
*   Allows selection of proxy servers by country.

## [](#datacenter-proxy--shared)Shared proxy groups

Each user has access to a selected number of proxy servers from a shared pool of Apify Proxy servers. These proxy servers are spread into groups (called Proxy Groups) on the Apify platform where each group shares a common feature (location, provider, speed and so on).

The number of proxy servers available depends on the user's subscription plan. When a user first signs up to the Apify platform, a 30-day trial of the "Freelancer" plan is started, and proxy servers are allocated accordingly. After the trial ends, the user has to subscribe to a paid plan to continue using Apify Proxy.

For a full list of plans and number of allocated proxy servers for each plan, please take a look at our [pricing](/pricing).

Please [contact us](/contact) if you need more proxy servers then the allocated numbers, or you wish to use the proxy by itself without access to other features of the Apify platform.

## [](#datacenter-proxy--dedicated)Dedicated proxy groups

Apify Proxy allows for the creation of special dedicated proxy groups. These are assigned to a single user and only the user can use them.

This feature is useful if you have your own pool of proxy servers and still want to benefit from the features of Apify Proxy (like IP rotation, persistent sessions, and health checking).

Also, if you do not have your own pool, the [](/contact)Apify customer support team can set up a dedicated group for you based on your needs and requirements.

Please [contact us](/contact) for more details or if you have any questions.

## [](#datacenter-proxy--username-params)Username parameters

HTTP proxy username is used to pass various parameters for the proxy connection. For example, the username can look as follows:

    groups-SHADER,session-rand123456

The following table describes the available parameters:

|`groups`|
|--- |
|If specified, all proxied requests will use proxy servers from selected proxy groups. For example `groups-SHADER+BUYPROXIES94952`.  
**This parameter is optional**, by default, the proxy uses all available proxy servers from all groups the user has access to.|
|If specified, all proxied requests with the same session identifier are routed through the same IP address. For example `session-rand123456`.  
**This parameter is optional**, by default, each proxied request is assigned a randomly picked least used IP address.  
**The session string can only contain numbers (0-9), letters (a-z or A-Z), dot (.), underscore (_), a tilde (~) and the maximum length is 50 characters!**|
|If specified, all proxied requests will use proxy servers from a selected country. Please be aware that if there are no proxy servers from the specified country the connection will fail. For example `groups-SHADER,country-US`.  
**This parameter is optional**, by default, the proxy uses all available proxy servers from all countries.|


If you do not want to specify both `groups` and `session` parameters and therefore use **default** behavior for both, use the following username:

    auto

## [](#datacenter-proxy--session-persistence)Session persistence

When using Apify Proxy with `session` parameter set in the username (see [Username parameters]({{@link proxy/datacenter_proxy.md#datacenter-proxy--username-params}})) a single IP is assigned to the session ID provided after the first request is made. This IP/session_id combination is persited, and its expiration is set to 24 hours later. Each additional request extends the expiration back to 24 hours, so if you use the session at least once a day it will never expire, with two possible exceptions:

*   Proxy server stops responding and is marked as dead during a health check
*   If the Proxy Server is part of a Proxy Group that is refreshed monthly and is rotated out.

If the session is discarded due to the reasons above, then a new IP is assigned to the session.
