---
title: Datacenter proxy
description: Learn how to reduce blocking when web scraping using IP address rotation. See proxy parameters and learn to implement Apify Proxy in an application.
sidebar_position: 10.2
slug: /proxy/datacenter-proxy
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Datacenter proxy {#datacenter-proxy}

**Learn how to reduce blocking when web scraping using IP address rotation. See proxy parameters and learn to implement Apify Proxy in an application.**

---

Datacenter proxies are a cheap, fast and stable way to mask your identity online. When you access a website using a datacenter proxy, the site can only see the proxy center's credentials, not yours.

Datacenter proxies allow you to mask and [rotate](./usage.md#ip-address-rotation) your IP address during web scraping and automation jobs, reducing the possibility of them being [blocked](/academy/anti-scraping/techniques#access-denied). For each [HTTP/S request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), the proxy takes the list of all available IP addresses and selects the one used the longest time ago for the specific hostname.

[Apify Proxy](https://apify.com/proxy) currently offers two types of datacenter proxy:

* [Shared proxy groups](#shared-proxy-groups)
* [Dedicated proxy groups](#dedicated-proxy-groups)

## Features {#features}

* Periodic health checks of proxies in the pool so requests are not forwarded via dead proxies.
* Intelligent rotation of IP addresses so target hosts are accessed via proxies that have accessed them the longest time ago, to reduce the chance of blocking.
* Periodically checks whether proxies are banned by selected target websites. If they are, stops forwarding traffic to them to get the proxies unbanned as soon as possible.
* Ensures proxies are located in specific countries using IP geolocation.
* Allows selection of groups of proxy servers with specific characteristics.
* Supports persistent sessions that enable you to keep the same IP address for certain parts of your crawls.
* Measures statistics of traffic for specific users and hostnames.
* Allows selection of proxy servers by country.

## Shared proxy groups {#shared-proxy-groups}

Each user has access to a selected number of proxy servers from a shared pool. These servers are spread into groups (called proxy groups). Each group shares a common feature (location, provider, speed and so on).

For a full list of plans and number of allocated proxy servers for each plan, see our [pricing](https://apify.com/pricing).

To access more servers or to use Apify Proxy without other parts of the Apify platform, [contact us](https://apify.com/contact).

## Dedicated proxy groups {#dedicated-proxy-groups}

When you purchase access to dedicated proxy groups, they are assigned to you, and only you can use them. You gain access to a range of static IP addresses from these groups.

This feature is useful if you have your own pool of proxy servers and still want to benefit from the features of Apify Proxy (like [IP address rotation](./usage.md#ip-address-rotation), [persistent sessions](#session-persistence), and health checking).

If you do not have your own pool, the [customer support](https://apify.com/contact) team can set up a dedicated group for you based on your needs and requirements.

Prices for dedicated proxy servers are mainly based on the number of proxy servers, their type, and location. [Contact us](https://apify.com/contact) for more information.

[Contact us](https://apify.com/contact) for more details or if you have any questions.

## Connecting to datacenter proxies {#connecting-to-datacenter-proxies}

By default, each proxied HTTP request is potentially sent via a different target proxy server, which adds overhead and could be potentially problematic for websites which save cookies based on IP address.

If you want to pick an IP address and pass all subsequent connections via that same IP address, you can use the `session` [parameter](./usage.md#sessions).

### Username parameters {#username-parameters}

The `username` field enables you to pass various [parameters](./usage.md#connection-settings), such as groups, session and country, for your proxy connection.

**This parameter is optional**. By default, the proxy uses all available proxy servers from all groups you have access to.

If you do not want to specify either `groups` or `session` parameters and therefore use the default behavior for both, set the username to `auto`.

### Examples {#examples}

<Tabs groupId="main">
<TabItem value="PuppeteerCrawler" label="PuppeteerCrawler">

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


<TabItem value="CheerioCrawler" label="CheerioCrawler">

```javascript
import { Actor } from 'apify';
import { CheerioCrawler } from 'crawlee';

await Actor.init();

const proxyConfiguration = await Actor.createProxyConfiguration();

const crawler = new CheerioCrawler({
    proxyConfiguration,
    async requestHandler({ body }) {
        // ...
        console.log(body);
    },
});

await crawler.run(['https://proxy.apify.com']);

await Actor.exit();

```

</TabItem>

<TabItem value="Python SDK with requests" label="Python SDK with requests">

```python
from apify import Actor
import requests, asyncio

async def main():
    async with Actor:
        proxy_configuration = await Actor.create_proxy_configuration()
        proxy_url = await proxy_configuration.new_url()
        proxies = {
            'http': proxy_url,
            'https': proxy_url,
        }

        for _ in range(10):
            response = requests.get('https://api.apify.com/v2/browser-info', proxies=proxies)
            print(response.text)

if __name__ == '__main__':
    asyncio.run(main())
```

</TabItem>


<TabItem value="gotScraping()" label="gotScraping()">

```javascript
import { Actor } from 'apify';
import { gotScraping } from 'got-scraping';

await Actor.init();

const proxyConfiguration = await Actor.createProxyConfiguration();
const proxyUrl = await proxyConfiguration.newUrl();

const url = 'https://api.apify.com/v2/browser-info';

const response1 = await gotScraping({
    url,
    proxyUrl,
    responseType: 'json',
});

const response2 = await gotScraping({
    url,
    proxyUrl,
    responseType: 'json',
});

console.log(response1.body.clientIp);
console.log('Should be different than');
console.log(response2.body.clientIp);

await Actor.exit();

```

</TabItem>
</Tabs>

## Session persistence {#session-persistence}

When you use datacenter proxy with the `session` [parameter](./usage.md#sessions) set in the `username` [field](#username-parameters), a single IP is assigned to the `session ID` provided after you make the first request.

**Session IDs represent IP addresses. Therefore, you can manage the IP addresses you use by managing sessions.** [[More info](./usage.md#sessions)]

This IP/session ID combination is persisted and expires 26 hours later. Each additional request resets the expiration time to 26 hours.

So, if you use the session at least once a day, it will never expire, with two possible exceptions:

* The proxy server stops responding and is marked as dead during a health check.
* If the proxy server is part of a proxy group that is refreshed monthly and is rotated out.

If the session is discarded due to the reasons above, it is assigned a new IP address.

To learn more about [sessions](./usage.md#sessions) and [IP address rotation](./usage.md#ip-address-rotation), see the [proxy overview page](./index.md).


### Examples using sessions

<Tabs groupId="main">
<TabItem value="PuppeteerCrawler" label="PuppeteerCrawler">

```javascript
import { Actor } from 'apify';
import { PuppeteerCrawler } from 'crawlee';

await Actor.init();

const proxyConfiguration = await Actor.createProxyConfiguration();

const crawler = new PuppeteerCrawler({
    proxyConfiguration,
    sessionPoolOptions: { maxPoolSize: 1 },
    async requestHandler({ page}) {
        console.log(await page.content());
    },
});

await crawler.run([
    'https://proxy.apify.com/?format=json',
    'https://proxy.apify.com',
]);

await Actor.exit();

```

</TabItem>


<TabItem value="CheerioCrawler" label="CheerioCrawler">

```javascript
import { Actor } from 'apify';
import { CheerioCrawler } from 'crawlee';

await Actor.init();

const proxyConfiguration = await Actor.createProxyConfiguration();

const crawler = new CheerioCrawler({
    proxyConfiguration,
    sessionPoolOptions: { maxPoolSize: 1 },
    async requestHandler({ json }) {
        // ...
        console.log(json);
    },
});

await crawler.run([
    'https://api.apify.com/v2/browser-info',
    'https://proxy.apify.com/?format=json',
]);

await Actor.exit();

```

</TabItem>

<TabItem value="Python SDK with requests" label="Python SDK with requests">

```python
from apify import Actor
import requests, asyncio

async def main():
    async with Actor:
        proxy_configuration = await Actor.create_proxy_configuration()
        proxy_url = await proxy_configuration.new_url('my_session')
        proxies = {
            'http': proxy_url,
            'https': proxy_url,
        }

        # each request uses the same IP address
        for _ in range(10):
            response = requests.get('https://api.apify.com/v2/browser-info', proxies=proxies)
            print(response.text)

if __name__ == '__main__':
    asyncio.run(main())
```

</TabItem>


<TabItem value="gotScraping()" label="gotScraping()">

```javascript
import { Actor } from 'apify';
import { gotScraping } from 'got-scraping';

await Actor.init();

const proxyConfiguration = await Actor.createProxyConfiguration();
const proxyUrl = await proxyConfiguration.newUrl('my_session');

const response1 = await gotScraping({
    url: 'https://api.apify.com/v2/browser-info',
    proxyUrl,
    responseType: 'json',
});

const response2 = await gotScraping({
    url: 'https://api.apify.com/v2/browser-info',
    proxyUrl,
    responseType: 'json',
});

console.log(response1.body.clientIp);
console.log("Should be the same as");
console.log(response2.body.clientIp);

await Actor.exit();

```

</TabItem>
</Tabs>

## Examples using standard libraries and languages {#examples-using-standard-libraries-and-languages}

You can find your proxy password on the [Proxy page](https://console.apify.com/proxy) of the Apify Console.

> The `username` field is **not** your Apify username.<br/>
> Instead, you specify proxy settings (e.g. `groups-BUYPROXIES94952`, `session-123`).<br/>
> Use `auto` for default settings.

For examples using [PHP](https://www.php.net/), you need to have the [cURL](https://www.php.net/manual/en/book.curl.php) extension enabled in your PHP installation. See [installation instructions](https://www.php.net/manual/en/curl.installation.php) for more information.

Examples in [Python 2](https://www.python.org/download/releases/2.0/) use the [six](https://pypi.org/project/six/) library. Run `pip install six` to enable it.

<Tabs groupId="main">
<TabItem value="Node.js (axios)" label="Node.js (axios)">

```javascript
import axios from 'axios';

const proxy = {
    protocol: 'http',
    host: 'proxy.apify.com',
    port: 8000,
    // Replace <YOUR_PROXY_PASSWORD> below with your password
    // found at https://console.apify.com/proxy
    auth: { username: 'auto', password: <YOUR_PROXY_PASSWORD> },
};

const url = 'http://proxy.apify.com/?format=json';

const { data } = await axios.get(url, { proxy });

console.log(data);

```

</TabItem>


<TabItem value="Python 3" label="Python 3">

```python
import urllib.request as request
import ssl

# Replace <YOUR_PROXY_PASSWORD> below with your password
# found at https://console.apify.com/proxy
password = "<YOUR_PROXY_PASSWORD>"
proxy_url = f"http://auto:{password}@proxy.apify.com:8000"
proxy_handler = request.ProxyHandler({
    "http": proxy_url,
    "https": proxy_url,
})

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
httpHandler = request.HTTPSHandler(context=ctx)

opener = request.build_opener(httpHandler,proxy_handler)
print(opener.open("http://proxy.apify.com/?format=json").read())

```

</TabItem>


<TabItem value="Python 2" label="Python 2">

```python
import six
from six.moves.urllib import request

# Replace <YOUR_PROXY_PASSWORD> below with your password
# found at https://console.apify.com/proxy
password = "<YOUR_PROXY_PASSWORD>"
proxy_url = (
    "http://auto:%s@proxy.apify.com:8000" %
    (password)
)
proxy_handler = request.ProxyHandler({
    "http": proxy_url,
    "https": proxy_url,
})
opener = request.build_opener(proxy_handler)
print(opener.open("http://proxy.apify.com/?format=json").read())

```

</TabItem>


<TabItem value="PHP" label="PHP">

```php
<?php
$curl = curl_init("http://proxy.apify.com/?format=json");
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_PROXY, "http://proxy.apify.com:8000");
// Replace <YOUR_PROXY_PASSWORD> below with your password
// found at https://console.apify.com/proxy
curl_setopt($curl, CURLOPT_PROXYUSERPWD, "auto:<YOUR_PROXY_PASSWORD>");
$response = curl_exec($curl);
curl_close($curl);
if ($response) echo $response;
?>

```

</TabItem>


<TabItem value="PHP (Guzzle)" label="PHP (Guzzle)">

```php
<?php
require 'vendor/autoload.php';


$client = new \GuzzleHttp\Client([
    // Replace <YOUR_PROXY_PASSWORD> below with your password
    // found at https://console.apify.com/proxy
    'proxy' => 'http://auto:<YOUR_PROXY_PASSWORD>@proxy.apify.com:8000'
]);

$response = $client->get("http://proxy.apify.com/?format=json");
echo $response->getBody();

```

</TabItem>
</Tabs>
