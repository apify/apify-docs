---
title: Residential proxy
description: Achieve a higher level of anonymity using real IP addresses. Access a wider pool of proxies and reduce blocking by websites' anti-scraping measures.
menuWeight: 7.4
paths:
    - proxy/residential-proxy
---

# [](#residential-proxy)Residential proxy

Sometimes datacenter proxy servers are not a viable option for certain solutions and for these cases Apify Proxy includes an option to use Residential Proxy. This proxy solution allows the user access to a much larger pool of proxy servers than with datacenter proxy servers and therefore it is usually a better option for situations where a large number of proxy servers is required.

On the Apify platform, users can use Residential Proxy after they are given access to it by the Apify Support Team. **Pricing is based on data traffic**, which is measured for each connection made through the proxy and displayed on the platform's dashboard.

Please [contact us](https://apify.com/contact) if you want to use Apify Residential Proxy or if you need more information.

## [](#connecting-to-residential-proxy) Connecting to residential proxy

For code examples on how to connect to residential proxies, see the [examples]({{@link proxy/residential_proxy/examples.md}}) page.

## [](#username-parameters) Username parameters

The **username** field enables you to pass various [parameters]({{@link proxy/connection_settings.md#username-parameters}}) for your proxy connection.

### [](#examples) Examples

The use randomly allocated IP addresses from all available countries:

```
groups-RESIDENTIAL
```

A random proxy from the US:

```
groups-RESIDENTIAL,country-US
```

The most complex variation: session set and IP selected from the United States:

```
groups-RESIDENTIAL,session-my_session_1,country-US
```

## [](#session-persistence) Session persistence

When using residential proxy with the **session** parameter set in the [username](#username-parameters), a single IP is assigned to the **session ID** provided after you make the first request. 

This **IP/session_id** combination is persited for 1 minute. Each subsequent request resets the expiration time to 1 minute.

If the proxy server becomes unresponsive or the session expires, a new IP is selected for the next request.

