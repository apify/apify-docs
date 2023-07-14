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

# [](./proxy) Proxy

**Learn to anonymously access websites in scraping/automation jobs. Improve data outputs and efficiency of bots, and access websites from various geographies.**

---

> [Apify Proxy](https://apify.com/proxy) allows you to change your IP address when web scraping to reduce the chance of being [blocked](/academy/anti-scraping/techniques) because of your geographical location.

You can use proxies in your [actors](../actors/index.mdx) or any other application that supports HTTP proxies. Apify Proxy monitors the health of your IP pool and intelligently [rotates addresses](#ip-address-rotation) to prevent IP address-based blocking.

You can view your proxy settings and password on the [Proxy](https://console.apify.com/proxy) page in the Apify Console. For pricing information, visit [apify.com/pricing](https://apify.com/pricing).


## Quickstart {#quickstart}

Usage of Apify Proxy means just a couple of lines of code thanks to our SDKs for ([JavaScript](/sdk/js) and [Python](/sdk/python)):

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
        console.log(await page.content())
    },
});

await crawler.run(['https://proxy.apify.com/?format=json']);

await Actor.exit();
```

</TabItem>
<TabItem value="Python SDK with `requests`" label="Python SDK with `requests`">

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

## Proxy types {#proxy-types}

There are several types of proxy servers each of them with different advantages, disadvantages, and price. You can use them to access websites from different geographies and with different levels of anonymity.

<CardGrid>
    <Card
        title="Datacenter proxy"
        desc="The fastest and cheapest option, it uses datacenters to change your IP address. Note that there is a chance of being blocked because of the activity of other users."
        to="/platform/proxy/datacenter-proxy"
    />
    <Card
        title="Residential proxy"
        desc="IP addresses located in homes and offices around the world. These IPs are the least likely to be blocked."
        to="/platform/proxy/residential-proxy"
    />
    <Card
        title="Google SERP proxy"
        desc="Download and extract data from Google Search Engine Result Pages (SERPs). You can select country and language to get localized results."
        to="/platform/proxy/google-serp-proxy"
    />
</CardGrid>

