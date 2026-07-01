---
title: Unblocker proxy
description: Bypass anti-bot and anti-captcha systems automatically when scraping, without building or maintaining your own bypass logic for blocked websites.
sidebar_position: 10.5
slug: /proxy/unblocker-proxy
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Unblocker proxy bypasses anti-bot and anti-captcha systems automatically, so you don't need to figure out how to get through them yourself.

Use Unblocker proxy when a website blocks scrapers with anti-bot protection or captchas, and you want the proxy to handle bypassing them for you instead of building and maintaining your own bypass logic.

## Pricing

Unblocker proxy uses unit-based pricing. Each request through Unblocker proxy is currently billed at 10 units.

## Connect to Unblocker proxy

Connecting to Unblocker proxy works the same way as [datacenter proxy](./datacenter_proxy.md), with one difference: the `groups` [username parameter](./index.md#username-parameters) should always specify `UNBLOCKER`.

### How to set a proxy group

When using [standard libraries and languages](./datacenter_proxy.md), specify the `groups` parameter in the [username](./index.md#username-parameters) as `groups-UNBLOCKER`.

For example, your **proxy URL** when using the [got-scraping](https://www.npmjs.com/package/got-scraping) JavaScript library will look like this:

```js
const proxyUrl = 'http://groups-UNBLOCKER:<YOUR_PROXY_PASSWORD>@proxy.apify.com:8000';
```

In the [Apify SDK](/sdk) you set the **groups** in your proxy configuration:

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
