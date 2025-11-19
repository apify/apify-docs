---
title: Proxy
description: Learn to anonymously access websites in scraping/automation jobs. Improve data outputs and efficiency of bots, and access websites from various geographies.
sidebar_position: 10
category: platform
slug: /proxy
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Card from "@site/src/components/Card";
import CardGrid from "@site/src/components/CardGrid";

**Learn how to use Apify Proxy to anonymously access websites, change IP addresses, and reduce blocking in your scraping and automation jobs.**

---

:::info
[Apify Proxy](https://apify.com/proxy) monitors the health of your IP pool and automatically rotates addresses to help avoid [blocking](/academy/anti-scraping/techniques). Note that while proxies significantly reduce blocking risks, they cannot eliminate them entirely. You may still encounter blocks depending on the target website's anti-scraping measures.
:::

You can use proxies in your [Actors](../actors/index.mdx) or any other application that supports HTTP proxies. You can view your proxy settings and password on the [Proxy](https://console.apify.com/proxy) page in Apify Console. For pricing information, visit [apify.com/pricing](https://apify.com/pricing).


## Quickstart

Usage of Apify Proxy means just a couple of lines of code, thanks to our [SDKs](/sdk):

<Tabs groupId="main">
<TabItem value="JavaScript SDK with PuppeteerCrawler" label="JavaScript SDK with PuppeteerCrawler">

```javascript
import { Actor } from 'apify';
import { PuppeteerCrawler } from 'crawlee';

await Actor.init();

const proxyConfiguration = await Actor.createProxyConfiguration();

const crawler = new PuppeteerCrawler({
    proxyConfiguration,
    async requestHandler({ page }) {
        console.log(await page.content());
    },
});

await crawler.run(['https://proxy.apify.com/?format=json']);

await Actor.exit();
```

</TabItem>
<TabItem value="Python SDK with `requests`" label="Python SDK with requests">

```python
import requests, asyncio
from apify import Actor

async def main():
    async with Actor:
        proxy_configuration = await Actor.create_proxy_configuration()
        proxy_url = await proxy_configuration.new_url()

        proxies = {
            'http': proxy_url,
            'https': proxy_url,
        }

        response = requests.get('https://api.apify.com/v2/browser-info', proxies=proxies)
        print(response.text)

if __name__ == '__main__':
    asyncio.run(main())
```

</TabItem>
</Tabs>

## Proxy types

Several types of proxy servers exist, each offering distinct advantages, disadvantages, and varying pricing structures. You can use them to access websites from various geographies and with different levels of anonymity.

<CardGrid>
    <Card
        title="Datacenter proxy"
        desc="The fastest and cheapest option. It uses datacenters to change your IP address. Note that there is a chance of being blocked because of the activity of other users."
        to="/platform/proxy/datacenter-proxy"
    />
    <Card
        title="Residential proxy"
        desc="IP addresses located in homes and offices around the world. These IPs are the least likely to be blocked, but are more expensive than datacenter proxies."
        to="/platform/proxy/residential-proxy"
    />
    <Card
        title="Google SERP proxy"
        desc="Download and extract data from Google Search Engine Result Pages (SERPs). You can select country and language to get localized results."
        to="/platform/proxy/google-serp-proxy"
    />
</CardGrid>

You can also integrate your own proxy servers with Apify Actors instead of using Apify Proxy. Learn more about [using your own proxies](./your_own_proxies.md).
