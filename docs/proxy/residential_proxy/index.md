---
title: Residential proxy
description: Documentation of Apify Proxy that enables anonymization of access to websites and IP rotation.
---

## [](#residential-proxy)Residential proxy

Sometimes datacenter proxy servers are not a viable option for certain solutions and for these cases Apify Proxy includes an option to use Residential Proxy. This proxy solution allows the user access to a much larger pool of proxy servers than with datacenter proxy servers and therefore it is usually a better option for situations where a large number of proxy servers is required.

On the Apify platform, users can use Residential Proxy after they are given access to it by the Apify Support Team. **Pricing is based on data traffic**, which is measured for each connection made through the proxy and displayed on the platform's dashboard.

Please [contact us](https://apify.com/contact) if you want to use Apify Residential Proxy or if you need more information.

### [](#residential-proxy--username-params)Username parameters

HTTP proxy username is used to pass various parameters for the proxy connection. For example, the simplest way to use residential proxy is with the username below:

    groups-RESIDENTIAL

The following table describes the available parameters:

|`groups`|
|--- |
|Required to be set to **RESIDENTIAL**|
|If specified, all proxied requests with the same session identifier are routed through the same IP address. For example `session-rand123456`.  
**This parameter is optional**, by default, each proxied request is assigned a randomly picked least used IP address.  
**The session string can only contain numbers (0-9), letters (a-z or A-Z), dot (.), underscore (_), a tilde (~) and the maximum length is 50 characters!**|
|If specified, all proxied requests will use IP addresses that geolocated to the specified country. For example `country-GB` for IP's from Great Britain.  
**This parameter is optional**, by default, each proxied request is assigned an IP address from a random country.  
**The country code needs to be a two letter ISO country code - see the [full list of available country codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)**|


This is how the username would look for the most complex variation: Session set and IP selected from the United States

    groups-RESIDENTIAL,session-my_session_1,country-US

And here is how it would look if you need a random proxy from the US

    groups-RESIDENTIAL,country-US

### [](#residential-proxy--session-persistence)Session persistence

When using Apify Proxy with `session` parameter set in the username (see [Username parameters]({{@link proxy/residential_proxy/index.md#residential-proxy--username-params}})) a single IP is assigned to the session ID provided after the first request is made. This IP is persisted for one minute and its expiration is refreshed with each request. If the proxy server becomes unresponsive or the session expires a new IP is selected for the next request.
