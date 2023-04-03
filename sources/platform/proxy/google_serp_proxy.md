---
title: Google SERP proxy
description: Learn how to collect search results from Google Search-powered tools. Get search results from localized domains in multiple countries, e.g. the US and Germany.
sidebar_position: 10.5
slug: /proxy/google-serp-proxy
---

# Google SERP proxy {#google-serp-proxy}

**Learn how to collect search results from Google Search-powered tools. Get search results from localized domains in multiple countries, e.g. the US and Germany.**

---

Google SERP proxy allows you to extract search results from Google Search-powered services. It allows searching in [various countries](#country-selection) and to dynamically switch between country domains.

Our Google SERP proxy currently supports the below services.

* Google Search (`http://www.google.<country domain>/search`).
* Google Shopping (`http://www.google.<country domain>/search?tbm=shop`).

> Google SERP proxy can **only** be used for Google Search and Shopping. It cannot be used to access other websites.

When using the proxy, **pricing is based on the number of requests made**.

To use Google SERP proxy or for more information, [contact us](https://apify.com/contact).

## Connecting to Google SERP proxy {#connecting-to-google-serp-proxy}

Requests made through the proxy are automatically routed through a proxy server from the selected country and pure **HTML code of the search result page is returned**.

**Important:** Only HTTP requests are allowed, and the Google hostname needs to start with the `www.` prefix.

For code examples on how to connect to Google SERP proxies, see the [examples](#examples) section.

### Username parameters {#username-parameters}

The `username` field enables you to pass various [parameters](./usage.md), such as groups and country, for your proxy connection.

When using Google SERP proxy, the username should always be:

```text
groups-GOOGLE_SERP
```

Unlike [datacenter](./datacenter_proxy.md) or [residential](./residential_proxy.md) proxies, there is no [session](./usage.md) parameter.

If you use the `country` [parameter](./usage.md), the Google proxy location is used if you access a website whose hostname (stripped of `www.`) starts with **google**.

## Country selection {#country-selection}

You must use the correct Google domain to get results for your desired country code.

For example:

* Search results from the USA: `http://www.google.com/search?q=<query>`


* Shopping results from Great Britain: `http://www.google.co.uk/seach?tbm=shop&q=<query>`

See a [full list](https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/List_of_Google_domains.html) of available domain names for specific countries. When using them, remember to prepend the domain name with the `www.` prefix.

# Examples {#examples}

**Learn how to connect to Google SERP proxies from your applications with Node.js (axios and got-scraping), Python 2 and 3 and PHP using code examples.**

---

This page contains code examples for connecting to [Google SERP proxies](./index.md) using [Apify Proxy](https://apify.com/proxy).

See the [connection settings](./usage.md) page for connection parameters.

## Using the Apify SDK {#using-the-apify-sdk}

If you are developing your own Apify [actor](../actors/index.md) using the [Apify SDK](/sdk/js) and [Crawlee](https://crawlee.dev/), the most efficient way to use Google SERP proxy is [CheerioCrawler](https://crawlee.dev/api/cheerio-crawler/class/CheerioCrawler). This is because Google SERP proxy [only returns a page's HTML](./index.md). Alternatively, you can use the [got-scraping](https://github.com/apify/got-scraping) [NPM package](https://www.npmjs.com/package/got-scraping) by specifying proxy URL in the options.

Apify Proxy also works with [PuppeteerCrawler](https://crawlee.dev/api/puppeteer-crawler/class/PuppeteerCrawler), [launchPuppeteer()](https://crawlee.dev/api/puppeteer-crawler/function/launchPuppeteer), [PlaywrightCrawler](https://crawlee.dev/api/playwright-crawler/class/PlaywrightCrawler), [launchPlaywright()](https://crawlee.dev/api/playwright-crawler/function/launchPlaywright) and [JSDOMCrawler](https://crawlee.dev/api/jsdom-crawler/class/JSDOMCrawler). However, `CheerioCrawler` is simply the most efficient solution for this use case.

### Get a list of search results {#get-a-list-of-search-results}

Get a list of search results for the keyword **wikipedia** from the USA (`google.com`).

<Tabs groupId="main">
<TabItem value="CheerioCrawler" label="CheerioCrawler">

```javascript
import { Actor } from 'apify';
import { CheerioCrawler } from 'crawlee';

await Actor.init();

const proxyConfiguration = await Actor.createProxyConfiguration({
    groups: ['GOOGLE_SERP'],
});

const crawler = new CheerioCrawler({
    proxyConfiguration,
    async requestHandler({ body }) {
        // ...
        console.log(body)
    },
});

await crawler.run(['http://www.google.com/search?q=wikipedia']);

await Actor.exit();

```

</TabItem>


<TabItem value="gotScraping()" label="gotScraping()">

```javascript
import { Actor } from 'apify';
import { gotScraping } from 'got-scraping';

await Actor.init();

const proxyConfiguration = await Actor.createProxyConfiguration({
    groups: ['GOOGLE_SERP'],
});
const proxyUrl = await proxyConfiguration.newUrl();

const { body } = await gotScraping({
    url: 'http://www.google.com/search?q=wikipedia',
    proxyUrl,
});

console.log(body);

await Actor.exit();

```

</TabItem>
</Tabs>

### Get a list of shopping results {#get-a-list-of-shopping-results}

Get a list of shopping results for the query **Apple iPhone XS 64GB** from Great Britain (`google.co.uk`).


<Tabs groupId="main">
<TabItem value="CheerioCrawler" label="CheerioCrawler">

```javascript
import { Actor } from 'apify';
import { CheerioCrawler } from 'crawlee';

await Actor.init();

const proxyConfiguration = await Actor.createProxyConfiguration({
    groups: ['GOOGLE_SERP'],
});

const crawler = new CheerioCrawler({
    proxyConfiguration,
    async requestHandler({ body }) {
        // ...
        console.log(body)
    },
});

const query = encodeURI('Apple iPhone XS 64GB');
await crawler.run([`http://www.google.co.uk/search?q=${query}&tbm=shop`]);

await Actor.exit();

```

</TabItem>

<TabItem value="gotScraping()" label="gotScraping()">

```javascript
import { Actor } from 'apify';
import { gotScraping } from 'got-scraping';

await Actor.init();

const proxyConfiguration = await Actor.createProxyConfiguration({
    groups: ['GOOGLE_SERP'],
});
const proxyUrl = await proxyConfiguration.newUrl();

const query = encodeURI('Apple iPhone XS 64GB');
const { body } = await gotScraping({
    url: `http://www.google.co.uk/search?tbm=shop&q=${query}`,
    proxyUrl,
});

console.log(body);

await Actor.exit();

```

</TabItem>
</Tabs>

## Using standard libraries and languages {#using-standard-libraries-and-languages}

You can find your proxy password on the [Proxy page](https://console.apify.com/proxy) of the Apify Console.

> The `username` field is **not** your Apify username.<br/>
> Instead, you specify proxy settings (e.g. `groups-GOOGLE_SERP`).<br/>
> Use `groups-GOOGLE_SERP` to use proxies from all available countries.

For examples using [PHP](https://www.php.net/), you need to have the [cURL](https://www.php.net/manual/en/book.curl.php) extension enabled in your PHP installation. See [installation instructions](https://www.php.net/manual/en/curl.installation.php) for more information.

Examples in [Python 2](https://www.python.org/download/releases/2.0/) use the [six](https://pypi.org/project/six/) library. Run `pip install six` to enable it.

### HTML from search results {#html-from-search-results}

Get the HTML of search results for the keyword **wikipedia** from the USA (**google.com**).

Select this option by setting the `username` parameter to `groups-GOOGLE_SERP`. Add the item you want to search to the `query` parameter.

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
    auth: { username: 'groups-GOOGLE_SERP', password: <YOUR_PROXY_PASSWORD> },
};

const url = 'http://www.google.com/search';
const params = { q: 'wikipedia' };

const { data } = await axios.get(url, { proxy, params });

console.log(data);

```

</TabItem>


<TabItem value="Python 3" label="Python 3">

```python
import urllib.request as request
import urllib.parse as parse

# Replace <YOUR_PROXY_PASSWORD> below with your password
# found at https://console.apify.com/proxy
password = '<YOUR_PROXY_PASSWORD>'
proxy_url = f"http://groups-GOOGLE_SERP:{password}@proxy.apify.com:8000"

proxy_handler = request.ProxyHandler({
    'http': proxy_url,
})

opener = request.build_opener(proxy_handler)

query = parse.urlencode({ 'q': 'wikipedia' })
print(opener.open(f"http://www.google.com/search?{query}").read())

```

</TabItem>


<TabItem value="Python 2" label="Python 2">

```python
import six
from six.moves.urllib import request, urlencode

# Replace <YOUR_PROXY_PASSWORD> below with your password
# found at https://console.apify.com/proxy
password = '<YOUR_PROXY_PASSWORD>'
proxy_url = (
    'http://groups-GOOGLE_SERP:%s@proxy.apify.com:8000' %
    (password)
)
proxy_handler = request.ProxyHandler({
    'http': proxy_url,
})
opener = request.build_opener(proxy_handler)
query = parse.urlencode({ 'q': 'wikipedia' })
url = (
    'http://www.google.com/search?%s' %
    (query)
)
print(opener.open(url).read())

```

</TabItem>


<TabItem value="PHP" label="PHP">

```php
<?php
$query = urlencode('wikipedia');
$curl = curl_init('http://www.google.com/search?q=' . $query);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_PROXY, 'http://proxy.apify.com:8000');
// Replace <YOUR_PROXY_PASSWORD> below with your password
// found at https://console.apify.com/proxy
curl_setopt($curl, CURLOPT_PROXYUSERPWD, 'groups-GOOGLE_SERP:<YOUR_PROXY_PASSWORD>');
$response = curl_exec($curl);
curl_close($curl);
echo $response;
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
    'proxy' => 'http://groups-GOOGLE_SERP:<YOUR_PROXY_PASSWORD>@proxy.apify.com:8000'
]);

$response = $client->get("http://www.google.com/search", [
    'query' => ['q' => 'wikipedia']
]);
echo $response->getBody();

```

</TabItem>
</Tabs>

### HTML from localized shopping results {#html-from-localized-shopping-results}

Get HTML of shopping results for the query **Apple iPhone XS 64GB** from Great Britain (`google.co.uk`).

Select this option by setting the `username` parameter to `groups-GOOGLE_SERP`. In the `query` parameter, add the item you want to search and specify the **shop** page as a URL parameter.

Set the domain (your country of choice) in the URL (in the `response` variable).

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
    auth: { username: 'groups-GOOGLE_SERP', password: <YOUR_PROXY_PASSWORD> },
};

const url = 'http://www.google.co.uk/search';
const params = { q: 'Apple iPhone XS 64GB', tbm: 'shop' }

const { data } = await axios.get(url, { proxy, params });

console.log(data);

```

</TabItem>


<TabItem value="Python 3" label="Python 3">

```python
import urllib.request as request
import urllib.parse as parse

# Replace <YOUR_PROXY_PASSWORD> below with your password
# found at https://console.apify.com/proxy
password = '<YOUR_PROXY_PASSWORD>'
proxy_url = f"http://groups-GOOGLE_SERP:{password}@proxy.apify.com:8000"
proxy_handler = request.ProxyHandler({
    'http': proxy_url,
})
opener = request.build_opener(proxy_handler)

query = parse.urlencode({ 'q': 'Apple iPhone XS 64GB', 'tbm': 'shop' })
print(opener.open(f"http://www.google.co.uk/search?{query}").read())

```

</TabItem>


<TabItem value="Python 2" label="Python 2">

```python
import six
from six.moves.urllib import request, urlencode

# Replace <YOUR_PROXY_PASSWORD> below with your password
# found at https://console.apify.com/proxy
password = '<YOUR_PROXY_PASSWORD>'
proxy_url = (
    'http://groups-GOOGLE_SERP:%s@proxy.apify.com:8000' %
    (password)
)
proxy_handler = request.ProxyHandler({
    'http': proxy_url,
})
opener = request.build_opener(proxy_handler)
query = parse.urlencode({ 'q': 'Apple iPhone XS 64GB', 'tbm': 'shop' })
url = (
    'http://www.google.co.uk/search?%s' %
    (query)
)
print(opener.open(url).read())

```

</TabItem>


<TabItem value="PHP" label="PHP">

```php
<?php
$query = urlencode('Apple iPhone XS 64GB');
$curl = curl_init('http://www.google.co.uk/search?tbm=shop&q=' . $query);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_PROXY, 'http://proxy.apify.com:8000');
// Replace <YOUR_PROXY_PASSWORD> below with your password
// found at https://console.apify.com/proxy
curl_setopt($curl, CURLOPT_PROXYUSERPWD, 'groups-GOOGLE_SERP:<YOUR_PROXY_PASSWORD>');
$response = curl_exec($curl);
curl_close($curl);
echo $response;
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
    'proxy' => 'http://groups-GOOGLE_SERP:<YOUR_PROXY_PASSWORD>@proxy.apify.com:8000'
]);

$response = $client->get("http://www.google.co.uk/search", [
    'query' => [
        'q' => 'Apple iPhone XS 64GB',
        'tbm' => 'shop'
    ]
]);
echo $response->getBody();

```

</TabItem>
</Tabs>
