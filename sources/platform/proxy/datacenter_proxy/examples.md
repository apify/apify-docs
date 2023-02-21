---
title: Examples
description: Learn how to connect to Apify's datacenter proxies from your application with Node.js (axios and got-scraping), Python 2 and 3 and PHP using code examples.
slug: /proxy/datacenter-proxy/examples
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!-- Watch out! This file is hard to read because our own "marked-tabs" language fences aren't syntax-highlighted -->

# Connect to datacenter proxies

**Learn how to connect to Apify's datacenter proxies from your application with Node.js (axios and got-scraping), Python 2 and 3 and PHP using code examples.**

---

This page contains code examples for connecting to [datacenter proxies](./index.md) using [Apify Proxy](https://apify.com/proxy).

See the [connection settings](../connection_settings.md) page for connection parameters.

## Using the Apify SDK and Crawlee {#using-the-apify-sdk-and-crawlee}

If you are developing your own Apify [actor](../../actors/index.md) using the [Apify SDK](https://docs.apify.com/sdk/js) and [Crawlee](https://crawlee.dev/), you can use Apify Proxy in:

* [`CheerioCrawler`](https://crawlee.dev/api/cheerio-crawler/class/CheerioCrawler) by using the [`Actor.createProxyConfiguration()`](https://docs.apify.com/sdk/js/api/apify/class/Actor#createProxyConfiguration) function.
* [`PlaywrightCrawler`](https://crawlee.dev/api/playwright-crawler/class/PlaywrightCrawler) by using the [`Actor.createProxyConfiguration()`](https://docs.apify.com/sdk/js/api/apify/class/Actor#createProxyConfiguration) function.
* [`PuppeteerCrawler`](https://crawlee.dev/api/puppeteer-crawler/class/PuppeteerCrawler) by using the [`Actor.createProxyConfiguration()`](https://docs.apify.com/sdk/js/api/apify/class/Actor#createProxyConfiguration) function.
* [`JSDOMCrawler`](https://crawlee.dev/api/jsdom-crawler/class/JSDOMCrawler) by using the [`Actor.createProxyConfiguration()`](https://docs.apify.com/sdk/js/api/apify/class/Actor#createProxyConfiguration) function.
* [`launchPlaywright()`](https://crawlee.dev/api/playwright-crawler/function/launchPlaywright) by specifying the proxy configuration in the function's options.
* [`launchPuppeteer()`](https://crawlee.dev/api/puppeteer-crawler/function/launchPuppeteer) by specifying the proxy configuration in the function's options.
* [`got-scraping`](https://github.com/apify/got-scraping) [NPM package](https://www.npmjs.com/package/got-scraping) by specifying proxy URL in the options.

The Apify SDK's [ProxyConfiguration](https://docs.apify.com/sdk/js/api/apify/class/ProxyConfiguration) enables you to choose which proxies you use for all connections. You can inspect the current proxy's URL and other attributes using the [proxyInfo](https://crawlee.dev/api/cheerio-crawler/interface/CheerioCrawlingContext#proxyInfo) property of [crawling context](https://crawlee.dev/api/cheerio-crawler/interface/CheerioCrawlingContext) of your crawler's [requestHandler](https://crawlee.dev/api/cheerio-crawler/interface/CheerioCrawlerOptions#requestHandler).

### Rotate IP addresses {#rotate-ip-addresses}

IP addresses for each request are selected at random from all available proxy servers.

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


<TabItem value="launchPuppeteer()" label="launchPuppeteer()">

```javascript
import { Actor } from 'apify';
import { launchPuppeteer } from 'crawlee';

await Actor.init();

const proxyConfiguration = await Actor.createProxyConfiguration();
const proxyUrl = await proxyConfiguration.newUrl();

const browser = await launchPuppeteer({ proxyUrl });
const page = await browser.newPage();
await page.goto('https://www.example.com');
const html = await page.content();
await browser.close();

console.log('HTML:');
console.log(html);

await Actor.exit();

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

### Single IP address for multiple requests {#single-ip-address-for-multiple-requests}

Use a single IP address until it fails (gets retired).

The `maxPoolSize: 1` specified in `sessionPoolOptions` of [PuppeteerCrawler](https://crawlee.dev/api/puppeteer-crawler/class/PuppeteerCrawler) (works the same with other crawler classes) means that a single IP will be used by all browsers until it fails. Then, all running browsers are retired, a new IP is selected and new browsers opened. The browsers all use the new IP.

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


<TabItem value="launchPuppeteer()" label="launchPuppeteer()">

```javascript
import { Actor } from 'apify';
import { launchPuppeteer } from 'crawlee';

await Actor.init();

const proxyConfiguration = await Actor.createProxyConfiguration();
const proxyUrl = await proxyConfiguration.newUrl('my_session');
const browser = await launchPuppeteer({ proxyUrl });
const page = await browser.newPage();

await page.goto('https://proxy.apify.com/?format=json');
const html = await page.content();

await page.goto('https://proxy.apify.com');
const html2 = await page.content();

await browser.close();

console.log(html);
console.log('Should display the same clientIp as');
console.log(html2);

await Actor.exit();

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

### How to use proxy groups {#how-to-use-proxy-groups}

For simplicity, the examples above use the automatic proxy configuration (no specific proxy groups are specified), which selects IP addresses from all available groups.

To use IP addresses from specific proxy groups, add the `groups` [property](https://docs.apify.com/sdk/js/api/apify/interface/ProxyConfigurationOptions#groups)
to [`Actor.createProxyConfiguration()`](https://docs.apify.com/sdk/js/api/apify/class/Actor#createProxyConfiguration) and specify the group names. For example:

```js
import { Actor } from 'apify';

await Actor.init();
// ...
const proxyConfiguration = await Actor.createProxyConfiguration({
    groups: ['GROUP_NAME_1', 'GROUP_NAME_2'],
});
// ...
await Actor.exit();
```

## Using standard libraries and languages {#using-standard-libraries-and-languages}

You can find your proxy password on the [Proxy page](https://console.apify.com/proxy) of the Apify Console.

> The `username` field is **not** your Apify username.<br/>
> Instead, you specify proxy settings (e.g. `groups-BUYPROXIES94952`, `session-123`).<br/>
> Use `auto` for default settings.

For examples using [PHP](https://www.php.net/), you need to have the [cURL](https://www.php.net/manual/en/book.curl.php) extension enabled in your PHP installation. See [installation instructions](https://www.php.net/manual/en/curl.installation.php) for more information.

Examples in [Python 2](https://www.python.org/download/releases/2.0/) use the [six](https://pypi.org/project/six/) library. Run `pip install six` to enable it.

### Use IP rotation {#use-ip-rotation}

For each request, a random IP address is chosen from all [available proxy groups](https://console.apify.com/proxy). You can use random IP addresses from proxy groups by specifying the group(s) in the `username` parameter.

A random IP address will be used for each request.

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

### Multiple requests with the same IP address {#multiple-requests-with-the-same-ip-address}

The IP address in the example is chosen at random from all available proxy groups.

To use this option, set a session name in the `username` parameter.

<Tabs groupId="main">
<TabItem value="Node.js (axios)" label="Node.js (axios)">

```javascript
import axios from 'axios';
import { HttpsProxyAgent } from 'hpagent';

const httpsAgent = new HttpsProxyAgent({
    // Replace <YOUR_PROXY_PASSWORD> below with your password
    // found at https://console.apify.com/proxy
    proxy: 'http://session-my_session:<YOUR_PROXY_PASSWORD>@proxy.apify.com:8000',
});
const axiosWithProxy = axios.create({ httpsAgent });

const url = 'https://api.apify.com/v2/browser-info';

const response1 = await axiosWithProxy.get(url);
const response2 = await axiosWithProxy.get(url);
// Should return the same clientIp for both requests
console.log('clientIp1:', response1.data.clientIp);
console.log('clientIp2:', response2.data.clientIp);

```

</TabItem>


<TabItem value="Python 3" label="Python 3">

```python
import urllib.request as request
import ssl

def do_request():
    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://console.apify.com/proxy
    password = "<YOUR_PROXY_PASSWORD>"
    proxy_url = f"http://session-my_session:{password}@proxy.apify.com:8000"
    proxy_handler = request.ProxyHandler({
        "http": proxy_url,
        "https": proxy_url,
    })

    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    httpHandler = request.HTTPSHandler(context=ctx)

    opener = request.build_opener(httpHandler,proxy_handler)
    return opener.open("https://api.apify.com/v2/browser-info").read()

print(do_request())
print("Should return the same clientIp as ")
print(do_request())

```

</TabItem>


<TabItem value="Python 2" label="Python 2">

```python
import six
from six.moves.urllib import request
import ssl

def do_request():
    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://console.apify.com/proxy
    password = "<YOUR_PROXY_PASSWORD>"
    proxy_url = (
        "http://session-my_session:%s@proxy.apify.com:8000" %
        (password)
    )
    proxy_handler = request.ProxyHandler({
        "http": proxy_url,
        "https": proxy_url,
    })

    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    httpHandler = request.HTTPSHandler(context=ctx)

    opener = request.build_opener(httpHandler,proxy_handler)
    return opener.open("https://api.apify.com/v2/browser-info").read()

print(do_request())
print("Should return the same clientIp as ")
print(do_request())

```

</TabItem>


<TabItem value="PHP" label="PHP">

```php
<?php
function doRequest() {
    $curl = curl_init("https://api.apify.com/v2/browser-info");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_PROXY, "http://proxy.apify.com:8000");
    // Replace <YOUR_PROXY_PASSWORD> below with your password
    // found at https://console.apify.com/proxy
    curl_setopt($curl, CURLOPT_PROXYUSERPWD, "session-my_session:<YOUR_PROXY_PASSWORD>");
    $response = curl_exec($curl);
    curl_close($curl);
    return $response;
}
$response1 = doRequest();
$response2 = doRequest();
echo $response1;
echo "\nShould return the same clientIp as\n";
echo $response2;
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
    'proxy' => 'http://session-my_session:<YOUR_PROXY_PASSWORD>@proxy.apify.com:8000'
]);

$response = $client->get("https://api.apify.com/v2/browser-info");
echo $response->getBody();

// Should return the same clientIp as
$response = $client->get("https://api.apify.com/v2/browser-info");
echo $response->getBody();

```

</TabItem>
</Tabs>

## Username examples {#username-examples}

Use randomly allocated IP addresses from the `BUYPROXIES94952` group:

```text
groups-BUYPROXIES94952
```

Use a randomly allocated IP address for multiple requests:

```text
session-new_job_123
```

Use the same IP address from the `SHADER` and `BUYPROXIES94952` groups for multiple requests:

```text
groups-SHADER+BUYPROXIES94952,session-new_job_123
```

Set a session and select an IP from the `BUYPROXIES94952` group located in the USA:

```text
groups-BUYPROXIES94952,session-new_job_123,country-US
```
