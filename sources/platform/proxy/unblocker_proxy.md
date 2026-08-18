---
title: Unblocker proxy
description: Bypass anti-bot and anti-captcha systems automatically when scraping, without building or maintaining your own bypass logic for blocked websites.
sidebar_position: 10.5
slug: /proxy/unblocker-proxy
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Unblocker proxy is designed for scraping websites protected by anti-bot and anti-captcha systems. Instead of building and maintaining your own detection and bypass logic, you can route requests through Unblocker proxy, which automatically handles many common protection mechanisms.

This makes it a good choice for accessing websites with advanced bot protection while keeping your scraping code simple.

Pricing is based on Unblocker units, which are separate from [compute units](/actors/running/usage-and-resources#what-is-a-compute-unit). Each successful request costs 10 units. Units are priced per 1,000 at a rate that depends on your plan, and your consumption is displayed on your [proxy usage dashboard](https://console.apify.com/proxy/usage) in Apify Console.

## Connect to Unblocker proxy

Connecting to Unblocker proxy works the same way as [datacenter proxy](./datacenter_proxy.md), with two differences:

- The `groups` [username parameter](./index.md#username-parameters) must always specify `UNBLOCKER`.
- Unblocker proxy selects the country automatically, so you rarely need to set `country`.

Unlike [datacenter](./datacenter_proxy.md) or [residential](./residential_proxy.md) proxies, Unblocker proxy has no [session](./index.md#sessions) parameter, so you can't keep the same IP address across requests.

### How to set a proxy group

When using [standard libraries and languages](./datacenter_proxy.md), specify the `groups` parameter in the [username](./index.md#username-parameters) as `groups-UNBLOCKER`.

For example, your proxy URL when using the [got-scraping](https://www.npmjs.com/package/got-scraping) JavaScript library will look like this:

```js
const proxyUrl = 'http://groups-UNBLOCKER:<YOUR_PROXY_PASSWORD>@proxy.apify.com:8000';
```

In the [Apify SDK](/sdk) you set `groups` in your proxy configuration:

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();
// ...
const proxyConfiguration = await Actor.createProxyConfiguration({
    groups: ['UNBLOCKER'],
});
// ...
await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        # ...
        proxy_configuration = await Actor.create_proxy_configuration(groups=['UNBLOCKER'])
        # ...
```

</TabItem>
</Tabs>

### How to set a proxy country

Unblocker proxy selects the best available country automatically based on the target website. You don't need to set a country in most cases.

If you need requests to come from a specific country, specify the `country` [username parameter](./index.md#username-parameters) as `country-COUNTRY-CODE`. For example, to target Japan, set the username to `groups-UNBLOCKER,country-JP`.

:::tip Let Unblocker proxy decide

Only set a country when your use case requires it (for example, geo-restricted content). Setting a country limits the pool of available IP addresses and can reduce how effectively Unblocker proxy bypasses anti-bot protection.

:::

In the [Apify SDK](/sdk) you set the country in your proxy configuration using two-letter [country codes](https://laendercode.net/en/2-letter-list.html):

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();
// ...
const proxyConfiguration = await Actor.createProxyConfiguration({
    groups: ['UNBLOCKER'],
    countryCode: 'FR',
});
// ...
await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        # ...
        proxy_configuration = await Actor.create_proxy_configuration(
            groups=['UNBLOCKER'],
            country_code='FR',
        )
        # ...
```

</TabItem>
</Tabs>

## Related features

- [Datacenter proxy](./datacenter_proxy.md)
- [Residential proxy](./residential_proxy.md)
- [Google SERP proxy](./google_serp_proxy.md)
- [Anti-scraping techniques](/academy/anti-scraping/techniques)
