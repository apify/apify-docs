---
title: Residential proxy
description: Achieve a higher level of anonymity using IP addresses from human users. Access a wider pool of proxies and reduce blocking by websites' anti-scraping measures.
sidebar_position: 10.3
slug: /proxy/residential-proxy
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Residential proxy {#residential-proxy}

**Achieve a higher level of anonymity using IP addresses from human users. Access a wider pool of proxies and reduce blocking by websites' anti-scraping measures.**

---

Residential proxies use IP addresses assigned by Internet Service Providers to the homes and offices of actual users. Unlike [datacenter proxies](./datacenter_proxy.md), traffic from residential proxies is indistinguishable from that of legitimate users.

This solution allows you to access a larger pool of servers than datacenter proxy. This makes it a better option in cases when you need a large number of different IP addresses.

Residential proxies support [IP address rotation](./usage.md#ip-address-rotation) and [sessions](#session-persistence).

**Pricing is based on data traffic**. It is measured for each connection made and displayed on your [proxy usage dashboard](https://console.apify.com/proxy/usage) in the Apify Console.

## Connecting to residential proxy {#connecting-to-residential-proxy}

Connecting to residential proxy works the same way as [datacenter proxy](./datacenter_proxy.md), with two differences.

1. The `groups` [username parameter](./usage.md#username-parameters) should always specify `RESIDENTIAL`.

2. You can specify the country in which you want your proxies to be.

### How to set a proxy group {#how-to-set-a-proxy-group}

When using [standard libraries and languages](./datacenter_proxy.md), specify the `groups` parameter in the [username](./usage.md#username-parameters) as `groups-RESIDENTIAL`.

For example, your **proxy URL** when using the [got-scraping](https://www.npmjs.com/package/got-scraping) JavaScript library will look like this:

```js
const proxyUrl = 'http://groups-RESIDENTIAL:<YOUR_PROXY_PASSWORD>@proxy.apify.com:8000';
```

In the Apify SDK ([JavaScript](/sdk/js) and [Python](/sdk/python)), you set the **groups** in your proxy configuration:

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();
// ...
const proxyConfiguration = await Actor.createProxyConfiguration({
    groups: ['RESIDENTIAL'],
});
// ...
await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async with Actor:
    # ...
    proxy_configuration = await Actor.create_proxy_configuration(groups=['RESIDENTIAL'])
    # ...

```

</TabItem>
</Tabs>

### How to set a proxy country {#how-to-set-a-proxy-country}

When using [standard libraries and languages](./datacenter_proxy.md), specify the `country` parameter in the [username](./usage.md#username-parameters) as `country-COUNTRY-CODE`.

For example, your `username` parameter when using [Python 3](https://docs.python.org/3/) will look like this:

```python
username = "groups-RESIDENTIAL,country-JP"
```

In the Apify SDK ([JavaScript](/sdk/js) and [Python](/sdk/python)), you set the country in your proxy configuration using two-letter [country codes](https://laendercode.net/en/2-letter-list.html). Specify the groups as `RESIDENTIAL`, then add a `countryCode`/`country_code` parameter:

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();
// ...
const proxyConfiguration = await Actor.createProxyConfiguration({
    groups: ['RESIDENTIAL'],
    countryCode: 'FR',
});
// ...
await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async with Actor:
    # ...
    proxy_configuration = await Actor.create_proxy_configuration(
        groups=['RESIDENTIAL'],
        country_code='FR',
    )
    # ...

```

</TabItem>
</Tabs>

## Session persistence {#session-persistence}

When using residential proxy with the `session` [parameter](./usage.md#sessions) set in the [username](./usage.md#username-parameters), a single IP address is assigned to the **session ID** provided after you make the first request.

**Session IDs represent IP addresses. Therefore, you can manage the IP addresses you use by managing sessions.** [[More info](./usage.md#sessions)]

This IP/session ID combination is persisted for 1 minute. Each subsequent request resets the expiration time to 1 minute.

If the proxy server becomes unresponsive or the session expires, a new IP address is selected for the next request.

> If you really need to persist the same session, you can try sending some data using that session (e.g. every 20 seconds) to keep it alive.<br/>
> Providing the connection is not interrupted, this will let you keep the IP address for longer.

To learn more about [sessions](./usage.md#sessions) and [IP address rotation](./usage.md#ip-address-rotation), see the proxy [overview page](./index.md).

## Tips to keep in mind {#tips-to-keep-in-mind}

[Residential](./index.md) proxies are less predictable than [datacenter](./datacenter_proxy.md) proxies and are priced differently (by number of IPs vs traffic used). Because of this, there are some important things to consider before using residential proxy in your solutions.

### Control traffic used by automated browsers {#control-traffic-used-by-automated-browsers}

Residential proxy is priced by data traffic used. Thus, it's easy to quickly use up all your prepaid traffic. In particular, when accessing websites with large files loaded on every page.

To reduce your traffic use, we recommend using the `blockRequests()` function of [`playwrightUtils`](https://crawlee.dev/api/playwright-crawler/namespace/playwrightUtils#blockRequests)/[`puppeteerUtils`](https://crawlee.dev/api/puppeteer-crawler/namespace/puppeteerUtils#blockRequests) (depending on the library used).

### Connected proxy speed variation {#connected-proxy-speed-variation}

Each host on the residential proxy network uses a different device. They have different network speeds and different latencies. This means that requests made with one [session](./usage.md#sessions) can be extremely fast, while another request with a different session can be extremely slow. The difference can range from a few milliseconds to a few seconds.

If your solution requires quickly loaded content, the best option is to set a [session](./usage.md#sessions), try a small request and see if the response time is acceptable. If it is, you can use this session for other requests. Otherwise, repeat the attempt with a different session.

### Connection interruptions {#connection-interruptions}

While sessions are persistent, they can be destroyed at any time if the host devices are turned off or disconnected.

For this problem there is no easy solution. One option is to not use residential proxy for larger requests (and use [datacenter](./datacenter_proxy.md) proxy instead). If you have no other choice, expect that interruptions might happen and write your solution with this in mind.
