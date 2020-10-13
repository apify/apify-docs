---
title: Residential proxy
description: Achieve a higher level of anonymity using real IP addresses. Access a wider pool of proxies and reduce blocking by websites' anti-scraping measures.
menuWeight: 7.4
paths:
    - proxy/residential-proxy
---

# [](#residential-proxy) Residential proxy

Residential proxies are connected to real Internet Service Provider-based proxies located in homes and offices. Unlike [datacenter proxies]({{@link proxy/datacenter_proxy.md}}), this makes them very hard to to block. 

This solution allows you access to a larger pool of servers than datacenter proxy. This makes it a better option in cases when you need a large number of different IP addresses.

Residential proxies support [IP address rotation]({{@link proxy.md#ip-address-rotation}}) and [sessions](#session-persistence).

**Pricing is based on data traffic**. It is measured for each connection made and displayed on your [dashboard](https://my.apify.com) in the Apify app.

If you would like to use residential proxy or for more information, [contact us](https://apify.com/contact).

## [](#connecting-to-residential-proxy) Connecting to residential proxy

For code examples on how to connect to residential proxies, see the [examples]({{@link proxy/residential_proxy/examples.md}}) page.

### [](#username-parameters) Username parameters

The `username` field enables you to pass various [parameters]({{@link proxy/connection_settings.md#username-parameters}}), such as [groups](https://my.apify.com/proxy), [session]({{@link proxy.md#sessions}}) and country, for your proxy connection.

When using residential proxies, the username should specify `groups-RESIDENTIAL`.

## [](#session-persistence) Session persistence

When using residential proxy with the `session` [parameter]({{@link proxy.md#sessions}}) set in the [username](#username-parameters), a single IP address is assigned to the **session ID** provided after you make the first request.

This IP/session ID combination persists for 1 minute. Each subsequent request resets the expiration time to 1 minute.

If the proxy server becomes unresponsive or the session expires, a new IP address is selected for the next request.

> If you really need to persist the same session, you can try sending some data using that session (e.g. every 20 seconds) to keep it alive.<br/>
> Providing the connection is not interrupted, this will let you keep the IP address for longer.

To learn more about [sessions]({{@link proxy.md#sessions}}) and [IP address rotation]({{@link proxy.md#ip-address-rotation}}), see the proxy [overview page]({{@link proxy.md}}).