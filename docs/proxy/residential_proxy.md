---
title: Residential proxy
description: Achieve a higher level of anonymity using IP addresses from human users. Access a wider pool of proxies and reduce blocking by websites' anti-scraping measures.
menuWeight: 10.4
paths:
    - proxy/residential-proxy/nodejs-examples
    - proxy/residential-proxy/python-examples
    - proxy/residential-proxy/php-examples
    - proxy/residential-proxy
---

# [](#residential-proxy) Residential proxy

Residential proxies use IP addresses assigned by Internet Service Providers to the homes and offices of actual users. Unlike [datacenter proxies]({{@link proxy/datacenter_proxy.md}}), traffic from residential proxies is indistiguishable from that of legitimate users.

This solution allows you access to a larger pool of servers than datacenter proxy. This makes it a better option in cases when you need a large number of different IP addresses.

Residential proxies support [IP address rotation]({{@link proxy.md#ip-address-rotation}}) and [sessions](#session-persistence).

**Pricing is based on data traffic**. It is measured for each connection made and displayed on your [dashboard](https://console.apify.com) in the Apify Console.

If you would like to use residential proxy or for more information, [contact us](https://apify.com/contact).

## [](#connecting-to-residential-proxy) Connecting to residential proxy

Connecting to residential proxy works the same way as [datacenter proxy]({{@link proxy/datacenter_proxy/examples.md}}), with two differences.

1. The `groups` [username parameter]({{@link proxy/connection_settings.md#username-parameters}}) should always specify `RESIDENTIAL`.

2. You can specify the country in which you want your proxies to be.

### [](#how-to-set-a-proxy-group) How to set a proxy group

When using [standard libraries and languages]({{@link proxy/datacenter_proxy/examples.md#using-standard-libraries-and-languages}}), specify the `groups` parameter in the [username]({{@link proxy/connection_settings.md#username-parameters}}) as `groups-RESIDENTIAL`.

For example, your **proxy URL** when using the [got](https://www.npmjs.com/package/got) JavaScript library will look like this:

```js
const proxyUrl = 'http://groups-RESIDENTIAL:<YOUR_PROXY_PASSWORD>@proxy.apify.com:8000';
```

In the [Apify SDK](https://sdk.apify.com), you set the **group** in your [proxy configuration](https://sdk.apify.com/docs/api/apify#apifycreateproxyconfigurationproxyconfigurationoptions):

```js
const proxyConfiguration = await Apify.createProxyConfiguration({
    groups: ['RESIDENTIAL'],
});
```

### [](#how-to-set-a-proxy-country) How to set a proxy country

When using [standard libraries and languages]({{@link proxy/datacenter_proxy/examples.md#using-standard-libraries-and-languages}}), specify the `country` parameter in the [username]({{@link proxy/connection_settings.md#username-parameters}}) as `country-COUNTRY-CODE`.

For example, your `username` parameter when using [Python 3](https://docs.python.org/3/) will look like this:

```python
username = "groups-RESIDENTIAL,session-my_session,country-JP"
```

In the [Apify SDK](https://sdk.apify.com), you set the country in your [proxy configuration](https://sdk.apify.com/docs/api/apify#apifycreateproxyconfigurationproxyconfigurationoptions) using two-letter [country codes](https://laendercode.net/en/2-letter-list.html). Specify the groups as `RESIDENTIAL`, then add a `countryCode` parameter.

```js
const proxyConfiguration = await Apify.createProxyConfiguration({
    groups: ['RESIDENTIAL'],
    countryCode: 'FR',
});
```

### [](#username-examples) Username examples

Use randomly allocated IP addresses from all available countries:

```text
groups-RESIDENTIAL
```

A random proxy from the US:

```text
groups-RESIDENTIAL,country-US
```

Set a session and select an IP address from the United States:

```text
groups-RESIDENTIAL,session-my_session_1,country-US
```


## [](#session-persistence) Session persistence

When using residential proxy with the `session` [parameter]({{@link proxy.md#sessions}}) set in the [username]({{@link proxy/connection_settings.md#username-parameters}}), a single IP address is assigned to the **session ID** provided after you make the first request.

**Session IDs represent IP addresses. Therefore, you can manage the IP addresses you use by managing sessions.** [[More info]({{@link proxy.md#sessions}})]

This IP/session ID combination persists for 1 minute. Each subsequent request resets the expiration time to 1 minute.

If the proxy server becomes unresponsive or the session expires, a new IP address is selected for the next request.

> If you really need to persist the same session, you can try sending some data using that session (e.g. every 20 seconds) to keep it alive.<br/>
> Providing the connection is not interrupted, this will let you keep the IP address for longer.

To learn more about [sessions]({{@link proxy.md#sessions}}) and [IP address rotation]({{@link proxy.md#ip-address-rotation}}), see the proxy [overview page]({{@link proxy.md}}).
