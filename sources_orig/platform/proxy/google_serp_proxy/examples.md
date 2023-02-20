---
title: Examples
description: Learn how to connect to Google SERP proxies from your applications with Node.js (axios and got-scraping), Python 2 and 3 and PHP using code examples.
paths:
    - proxy/google-serp-proxy/nodejs-examples
    - proxy/google-serp-proxy/python-examples
    - proxy/google-serp-proxy/php-examples
    - proxy/google-serp-proxy/examples
---
<!-- Watch out! This file is hard to read because our own "marked-tabs" language fences aren't syntax-highlighted -->

# Connect to Google SERP proxies

This page contains code examples for connecting to [Google SERP proxies]({{@link proxy/google_serp_proxy.md}}) using [Apify Proxy](https://apify.com/proxy).

See the [connection settings]({{@link proxy/connection_settings.md}}) page for connection parameters.

## [](#using-the-apify-sdk) Using the Apify SDK

If you are developing your own Apify [actor]({{@link actors.md}}) using the [Apify SDK](https://sdk.apify.com) and [Crawlee](https://crawlee.dev/), the most efficient way to use Google SERP proxy is [CheerioCrawler](https://crawlee.dev/api/cheerio-crawler/class/CheerioCrawler). This is because Google SERP proxy [only returns a page's HTML]({{@link proxy/google_serp_proxy.md#connecting-to-google-serp-proxy}}). Alternatively, you can use the [got-scraping](https://github.com/apify/got-scraping) [NPM package](https://www.npmjs.com/package/got-scraping) by specifying proxy URL in the options.

Apify Proxy also works with [PuppeteerCrawler](https://crawlee.dev/api/puppeteer-crawler/class/PuppeteerCrawler), [launchPuppeteer()](https://crawlee.dev/api/puppeteer-crawler/function/launchPuppeteer), [PlaywrightCrawler](https://crawlee.dev/api/playwright-crawler/class/PlaywrightCrawler), [launchPlaywright()](https://crawlee.dev/api/playwright-crawler/function/launchPlaywright) and [JSDOMCrawler](https://crawlee.dev/api/jsdom-crawler/class/JSDOMCrawler). However, `CheerioCrawler` is simply the most efficient solution for this use case.

### [](#get-a-list-of-search-results) Get a list of search results

Get a list of search results for the keyword **wikipedia** from the USA (`google.com`).

```marked-tabs
<marked-tab header="CheerioCrawler" lang="javascript">
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
</marked-tab>


<marked-tab header="gotScraping()" lang="javascript">
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
</marked-tab>
```

### [](#get-a-list-of-shopping-results) Get a list of shopping results

Get a list of shopping results for the query **Apple iPhone XS 64GB** from Great Britain (`google.co.uk`).


```marked-tabs
<marked-tab header="CheerioCrawler" lang="javascript">
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
</marked-tab>

<marked-tab header="gotScraping()" lang="javascript">
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
</marked-tab>
```

## [](#using-standard-libraries-and-languages) Using standard libraries and languages

You can find your proxy password on the [Proxy page](https://console.apify.com/proxy) of the Apify Console.

> The `username` field is **not** your Apify username.<br/>
> Instead, you specify proxy settings (e.g. `groups-GOOGLE_SERP`).<br/>
> Use `groups-GOOGLE_SERP` to use proxies from all available countries.

For examples using [PHP](https://www.php.net/), you need to have the [cURL](https://www.php.net/manual/en/book.curl.php) extension enabled in your PHP installation. See [installation instructions](https://www.php.net/manual/en/curl.installation.php) for more information.

Examples in [Python 2](https://www.python.org/download/releases/2.0/) use the [six](https://pypi.org/project/six/) library. Run `pip install six` to enable it.

### [](#html-from-search-results) HTML from search results

Get the HTML of search results for the keyword **wikipedia** from the USA (**google.com**).

Select this option by setting the `username` parameter to `groups-GOOGLE_SERP`. Add the item you want to search to the `query` parameter.

```marked-tabs
<marked-tab header="Node.js (axios)" lang="javascript">
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
</marked-tab>


<marked-tab header="Python 3" lang="python">
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
</marked-tab>


<marked-tab header="Python 2" lang="python">
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
</marked-tab>


<marked-tab header="PHP" lang="php">
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
</marked-tab>

<marked-tab header="PHP (Guzzle)" lang="php">
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
</marked-tab>
```

### [](#html-from-localized-shopping-results) HTML from localized shopping results

Get HTML of shopping results for the query **Apple iPhone XS 64GB** from Great Britain (`google.co.uk`).

Select this option by setting the `username` parameter to `groups-GOOGLE_SERP`. In the `query` parameter, add the item you want to search and specify the **shop** page as a URL parameter.

Set the domain (your country of choice) in the URL (in the `response` variable).

```marked-tabs
<marked-tab header="Node.js (axios)" lang="javascript">
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
</marked-tab>


<marked-tab header="Python 3" lang="python">
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
</marked-tab>


<marked-tab header="Python 2" lang="python">
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
</marked-tab>


<marked-tab header="PHP" lang="php">
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
</marked-tab>


<marked-tab header="PHP (Guzzle)" lang="php">
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
</marked-tab>
```
