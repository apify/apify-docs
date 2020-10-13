---
title: Examples
description: Learn how to connect to Apify's residential proxies from your application with Node.js (axios and got), Python 2 and 3 and PHP using code examples.
paths:
    - proxy/residential-proxy/nodejs-examples
    - proxy/residential-proxy/python-examples
    - proxy/residential-proxy/php-examples
    - proxy/residential-proxy/examples
---
<!-- Watch out! This file is hard to read because our own "marked-tabs" language fences aren't syntax-highlighted -->

# Connect to residential proxies

This page contains code examples for connecting to [residential proxies]({{@link proxy/residential_proxy.md}}) using [Apify Proxy](https://apify.com/proxy).

If you are building your own Apify [actor]({{@link actors.md}}), below are [examples](#using-the-apify-sdk) specific to the [Apify SDK](https://sdk.apify.com).

See the [connection settings]({{@link proxy/connection_settings.md}}) page for connection parameters.

## [](#using-the-apify-sdk) Using the Apify SDK

If you're developing an actor using the [Apify SDK](https://sdk.apify.com), you can use Apify Proxy in:

* [PuppeteerCrawler](https://sdk.apify.com/docs/api/puppeteer-crawler#docsNav) using the [createProxyConfiguration()](https://sdk.apify.com/docs/api/apify#apifycreateproxyconfigurationproxyconfigurationoptions) function.
* [requestAsBrowser()](https://sdk.apify.com/docs/api/utils#utilsrequestasbrowseroptions) function by specifying proxy configuration in the options.
* [launchPuppeteer()](https://sdk.apify.com/docs/typedefs/launch-puppeteer#docsNav) by specifying the configuration in the function's options.

### [](#single-ip-address) Single IP address

Use a single session with an IP address from Germany (DE) for the whole run.

```marked-tabs
<marked-tab header="PuppeteerCrawler" lang="javascript">
const Apify = require('apify');

Apify.main(async () => {
    const requestList = await Apify.openRequestList(
        'my-list', ['http://www.example.com']
    );
    const proxyConfiguration = await Apify.createProxyConfiguration({
        groups: ['RESIDENTIAL'],
        countryCode: 'DE'
    });

    const crawler = new Apify.PuppeteerCrawler({
        requestList,
        proxyConfiguration,
        useSessionPool: true,
        sessionPoolOptions: {
            sessionOptions: { maxPoolSize: 1 }, // Using single session
        },
        handlePageFunction: async ({ page, request }) => {
            return Apify.pushData({ title: await page.title() });
        },
    });

    await crawler.run();
});
</marked-tab>


<marked-tab header="launchPuppeteer()" lang="javascript">
const Apify = require('apify');

Apify.main(async () => {
    const proxyConfiguration = await Apify.createProxyConfiguration({
        groups: ['RESIDENTIAL'],
        countryCode: 'DE'
    });
    const proxyUrl = proxyConfiguration.newUrl('my_session');

    const browser = await Apify.launchPuppeteer({
        proxyUrl
    });

    const page = await browser.newPage();

    await page.goto('http://www.example.com');

    const html = await page.content();

    console.log('HTML:');
    console.log(html);
});
</marked-tab>


<marked-tab header="requestAsBrowser()" lang="javascript">
const Apify = require('apify');

Apify.main(async () => {
    const proxyConfiguration = await Apify.createProxyConfiguration({
        groups: ['RESIDENTIAL'],
        countryCode: 'DE'
    });

    const { body } = await Apify.utils.requestAsBrowser({
        url: 'https://www.example.com',
        proxyUrl: proxyConfiguration.newUrl(),
    });

    console.log(body); // returns HTML of returned page
});
</marked-tab>
```

### [](#new-session-for-each-browser-using-puppeteercrawler) New session for each browser using PuppeteerCrawler

Using [PuppeteerCrawler](https://sdk.apify.com/docs/api/puppeteer-crawler#docsNav), create a new session with an IP address from France (FR) for each browser launched during the crawler run.

```marked-tabs
<marked-tab header="PuppeteerCrawler" lang="javascript">
const Apify = require('apify');

Apify.main(async () => {
    const requestList = await Apify.openRequestList(
        'my-list', ['http://www.example.com']
    );
    const proxyConfiguration = await Apify.createProxyConfiguration({
        groups: ['RESIDENTIAL'],
        countryCode: 'FR'
    });

    const crawler = new Apify.PuppeteerCrawler({
        requestList,
        proxyConfiguration,
        useSessionPool: true,
        handlePageFunction: async ({ page, request }) => {
            return Apify.pushData({ title: await page.title() });
        },
    });

    await crawler.run();
});
</marked-tab>
``` 

### [](#use-a-single-ip-address-for-multiple-requests) Single IP address for multiple requests

With the `requestAsBrowser()` [function](https://sdk.apify.com/docs/api/utils#utilsrequestasbrowseroptions), use the same IP address geolocated in France (FR) for two requests.

```marked-tabs
<marked-tab header="requestAsBrowser()" lang="javascript">
const Apify = require('apify');

Apify.main(async () => {
    const proxyConfiguration = await Apify.createProxyConfiguration({
        groups: ['RESIDENTIAL'],
        countryCode: 'FR',
    });
    const proxyUrl = proxyConfiguration.newUrl('my_session');

    const response1 = await Apify.utils.requestAsBrowser({
        url: 'https://api.apify.com/v2/browser-info',
        proxyUrl,
        json: true
    });

    const response2 = await Apify.utils.requestAsBrowser({
        url: 'https://api.apify.com/v2/browser-info',
        proxyUrl,
        json: true
    });

    console.log(response1.body.clientIp);
    console.log('should be the same as');
    console.log(response2.body.clientIp);
});
</marked-tab>
```

## [](#using-standard-libraries-and-languages) Using standard libraries and languages

You can find your proxy password on the [Proxy page](https://my.apify.com/proxy) of the Apify app.

> The `username` field is **not** your Apify username.<br/>
> Instead, you specify proxy settings (e.g. `groups-RESIDENTIAL`).<br/>
> Use `groups-RESIDENTIAL` to use proxies from all available countries.

For examples using [PHP](https://www.php.net/), you need to have the [cURL](https://www.php.net/manual/en/book.curl.php) extension enabled in your PHP installation. See [installation instructions](https://www.php.net/manual/en/curl.installation.php) for more information.

Examples in [Python 2](https://www.python.org/download/releases/2.0/) use the [six](https://pypi.org/project/six/) library. Run `pip install six` to enable it.

### [](#requests-with-random-ip-addresses) Requests with random IP addresses

For each request, a random IP address is chosen from all available countries.

Select this option by setting the `username` parameter to `groups-RESIDENTIAL`.

```marked-tabs
<marked-tab header="Node.js (axios)" lang="javascript">
const HttpsProxyAgent = require("https-proxy-agent");
const axios = require("axios");

const httpsAgent = new HttpsProxyAgent({
    host: "proxy.apify.com",
    port: "8000",
    // Replace <YOUR_PROXY_PASSWORD> below with your password
    // found at https://my.apify.com/proxy
    auth: "groups-RESIDENTIAL:<YOUR_PROXY_PASSWORD>"
});

const axiosWithProxy = axios.create({ httpsAgent });

async function useProxy() {
    const response = await axiosWithProxy.get("https://proxy.apify.com/?format=json");
    console.log(response.data)
};

useProxy();
</marked-tab>


<marked-tab header="Node.js (got)" lang="javascript">
const got = require("got");
const HttpsProxyAgent = require("https-proxy-agent");

// Replace <YOUR_PROXY_PASSWORD> below with your password
// found at https://my.apify.com/proxy
const proxyUrl = "http://groups-RESIDENTIAL:<YOUR_PROXY_PASSWORD>@proxy.apify.com:8000";

async function useProxy() {
    const response = await got("https://proxy.apify.com/?format=json", {
        agent: {
            https: new HttpsProxyAgent(proxyUrl),
        }
    });
    console.log(response.body);
};

useProxy();
</marked-tab>


<marked-tab header="Python 3" lang="python">
import urllib.request as request
import ssl

# Replace <YOUR_PROXY_PASSWORD> below with your password
# found at https://my.apify.com/proxy
password = "<YOUR_PROXY_PASSWORD>"
proxy_url = f"http://groups-RESIDENTIAL:{password}@proxy.apify.com:8000"
proxy_handler = request.ProxyHandler({
    "http": proxy_url,
    "https": proxy_url,
})

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
httpHandler = request.HTTPSHandler(context=ctx)

opener = request.build_opener(httpHandler,proxy_handler)
print(opener.open("https://proxy.apify.com/?format=json").read())
</marked-tab>


<marked-tab header="Python 2" lang="python">
import six
from six.moves.urllib import request

# Replace <YOUR_PROXY_PASSWORD> below with your password
# found at https://my.apify.com/proxy
password = "<YOUR_PROXY_PASSWORD>"
proxy_url = (
    "http://groups-RESIDENTIAL:%s@proxy.apify.com:8000" %
    (password)
)

proxy_handler = request.ProxyHandler({
    "http": proxy_url,
    "https": proxy_url,
})

opener = request.build_opener(proxy_handler)
print(opener.open("https://proxy.apify.com/?format=json").read())
</marked-tab>


<marked-tab header="PHP" lang="php">
<?php
$curl = curl_init("https://proxy.apify.com/?format=json");
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_PROXY, "http://proxy.apify.com:8000");
// Replace <YOUR_PROXY_PASSWORD> below with your password
// found at https://my.apify.com/proxy
curl_setopt($curl, CURLOPT_PROXYUSERPWD, "groups-RESIDENTIAL:<YOUR_PROXY_PASSWORD>");
$response = curl_exec($curl);
curl_close($curl);
if ($response) echo $response;
?>
</marked-tab>
```

### [](#multiple-requests-with-the-same-ip-address) Multiple requests with the same IP address

The examples below use an IP address geolocated in Japan (JP).

To use this option, set the `username` parameter to `groups-RESIDENTIAL,session-session_name,country-country_code`.

```marked-tabs
<marked-tab header="Node.js (axios)" lang="javascript">
const HttpsProxyAgent = require("https-proxy-agent");
const axios = require("axios");

const username = "groups-RESIDENTIAL,session-my_session,country-JP";

const httpsAgent = new HttpsProxyAgent({
    host: "proxy.apify.com",
    port: "8000",
    // Replace <YOUR_PROXY_PASSWORD> below with your password
    // found at https://my.apify.com/proxy
    auth: `${username}:<YOUR_PROXY_PASSWORD>`
});

const axiosWithProxy = axios.create({ httpsAgent });

async function useProxy() {
    const response = await axiosWithProxy.get("https://api.apify.com/v2/browser-info");
    console.log(response.data)
};

useProxy();
// Should return the same clientIp as
useProxy();
</marked-tab>


<marked-tab header="Node.js (got)" lang="javascript">
const got = require("got");
const HttpsProxyAgent = require("https-proxy-agent");

const username = "groups-RESIDENTIAL,session-my_session,country-JP";

// Replace <YOUR_PROXY_PASSWORD> below with your password
// found at https://my.apify.com/proxy
const proxyUrl = `${username}:<YOUR_PROXY_PASSWORD>@proxy.apify.com:8000`;

async function useProxy() {
    const response = await got("https://api.apify.com/v2/browser-info", {
        agent: {
            https: new HttpsProxyAgent(proxyUrl),
        }
    });
    console.log(response.body);
};

useProxy();
// Should return the same clientIp as
useProxy();
</marked-tab>


<marked-tab header="Python 3" lang="python">
import urllib.request as request
import ssl

def do_request():
    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://my.apify.com/proxy
    password = '<YOUR_PROXY_PASSWORD>'
    username = f"groups-RESIDENTIAL,session-my_session,country-JP"
    proxy_url = f"http://{username}:{password}@proxy.apify.com:8000"
    proxy_handler = request.ProxyHandler({
        'http': proxy_url,
        'https': proxy_url,
    })

    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    httpHandler = request.HTTPSHandler(context=ctx)

    opener = request.build_opener(httpHandler,proxy_handler)
    return opener.open('https://api.apify.com/v2/browser-info').read()

print(do_request())
print('Should contain the same clientIp as')
print(do_request())
</marked-tab>


<marked-tab header="Python 2" lang="python">
import six
from six.moves.urllib import request
import ssl

def do_request():
    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://my.apify.com/proxy
    password = '<YOUR_PROXY_PASSWORD>'
    username = 'groups-RESIDENTIAL,session-my_session,country-JP'
    proxy_url = (
        'http://%s:%s@proxy.apify.com:8000' %
        (username, password)
    )
    proxy_handler = request.ProxyHandler({
        'http': proxy_url,
        'https': proxy_url,
    })

    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    httpHandler = request.HTTPSHandler(context=ctx)

    opener = request.build_opener(httpHandler,proxy_handler)
    return opener.open('https://api.apify.com/v2/browser-info').read()

print(do_request())
print('Should contain the same clientIp as ')
print(do_request())
</marked-tab>


<marked-tab header="PHP" lang="php">
<?php
function doRequest() {
    $curl = curl_init('https://api.apify.com/v2/browser-info');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_PROXY, 'http://proxy.apify.com:8000');
    // Replace <YOUR_PROXY_PASSWORD> below with your password
    // found at https://my.apify.com/proxy
    curl_setopt(
        $curl,
        CURLOPT_PROXYUSERPWD,
        'groups-RESIDENTIAL,session-my_session,country-JP:<YOUR_PROXY_PASSWORD>'
    );
    $response = curl_exec($curl);
    curl_close($curl);
    return $response;
}
$response1 = doRequest();
$response2 = doRequest();
echo $response1;
echo "\nShould be contain same clientIp as\n";
echo $response2;
?>
</marked-tab>
```

## [](#username-examples) Username examples

Use randomly allocated IP addresses from all available countries:

```
groups-RESIDENTIAL
```

A random proxy from the US:

```
groups-RESIDENTIAL,country-US
```

Set a session and select an IP address from the United States:

```
groups-RESIDENTIAL,session-my_session_1,country-US
```
