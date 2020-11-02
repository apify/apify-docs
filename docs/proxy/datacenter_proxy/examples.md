---
title: Examples
description: Learn how to connect to Apify's datacenter proxies from your application with Node.js (axios and got), Python 2 and 3 and PHP using code examples.
paths:
    - proxy/datacenter-proxy/nodejs-examples
    - proxy/datacenter-proxy/python-examples
    - proxy/datacenter-proxy/php-examples
    - proxy/datacenter-proxy/examples
---
<!-- Watch out! This file is hard to read because our own "marked-tabs" language fences aren"t syntax-highlighted -->

# Connect to datacenter proxies

This page contains code examples for connecting to [datacenter proxies]({{@link proxy/datacenter_proxy.md}}) using [Apify Proxy](https://apify.com/proxy).

See the [connection settings]({{@link proxy/connection_settings.md}}) page for connection parameters.

## [](#using-the-apify-sdk) Using the Apify SDK

If you are developing your own Apify [actor]({{@link actors.md}}) using the [Apify SDK](https://sdk.apify.com), you can use Apify Proxy in:

* [PuppeteerCrawler](https://sdk.apify.com/docs/api/puppeteer-crawler#docsNav) using the [createProxyConfiguration()](https://sdk.apify.com/docs/api/apify#apifycreateproxyconfigurationproxyconfigurationoptions) function.
* [CheerioCrawler](https://sdk.apify.com/docs/api/cheerio-crawler#docsNav) using the [createProxyConfiguration()](https://sdk.apify.com/docs/api/apify#apifycreateproxyconfigurationproxyconfigurationoptions) function.
* [requestAsBrowser()](https://sdk.apify.com/docs/api/utils#utilsrequestasbrowseroptions) function by specifying proxy configuration in the options.
* [launchPuppeteer()](https://sdk.apify.com/docs/typedefs/launch-puppeteer#docsNav) by specifying the configuration in the function's options.

The Apify SDK's [ProxyConfiguration](https://sdk.apify.com/docs/api/proxy-configuration) enables you to choose which proxies you use for all connections. You can inspect the current proxy's URL and other attributes using the [ProxyInfo](https://sdk.apify.com/docs/typedefs/proxy-info) property in your crawler's [page function](https://sdk.apify.com/docs/typedefs/cheerio-crawler-options#handlepagefunction).

### [](#rotate-ip-addresses) Rotate IP addresses

IP addresses for each request are selected at random from all available proxy servers.

```marked-tabs
<marked-tab header="PuppeteerCrawler" lang="javascript">
const Apify = require("apify");

Apify.main(async () => {
    const requestList = await Apify.openRequestList(
        "my-list", ["http://proxy.apify.com/?format=json"]
    );
    const proxyConfiguration = await Apify.createProxyConfiguration();

    const crawler = new Apify.PuppeteerCrawler({
        requestList,
        proxyConfiguration,
        handlePageFunction: async ({ page, request, proxyInfo }) => {
            console.log(await page.content())
        },
    });

    await crawler.run();
});
</marked-tab>


<marked-tab header="CheerioCrawler" lang="javascript">
const Apify = require('apify');

Apify.main(async() => {
    const proxyConfiguration = await Apify.createProxyConfiguration();

    const requestList = await Apify.openRequestList(
        "my-list", [
            "http://proxy.apify.com",
        ]
    );

    const crawler = new Apify.CheerioCrawler({
        requestList,
        proxyConfiguration,
        handlePageFunction: async ({ request, response, body }) => {
            // ...
            console.log(await body);
        },
    });

    await crawler.run();
});
</marked-tab>


<marked-tab header="launchPuppeteer()" lang="javascript">
const Apify = require("apify");

Apify.main(async () => {
    const proxyConfiguration = await Apify.createProxyConfiguration();

    const browser = await Apify.launchPuppeteer({
        proxyUrl: proxyConfiguration.newUrl(),
    });

    const page = await browser.newPage();

    await page.goto("http://www.example.com");

    const html = await page.content();

    console.log("HTML:");
    console.log(html);
});
</marked-tab>


<marked-tab header="requestAsBrowser()" lang="javascript">
const Apify = require("apify");

Apify.main(async () => {
    const proxyConfiguration = await Apify.createProxyConfiguration();

    const proxyUrl = proxyConfiguration.newUrl();

    const url = "https://api.apify.com/v2/browser-info";

    const response1 = await Apify.utils.requestAsBrowser({
        url,
        proxyUrl,
        json: true
    });

    const response2 = await Apify.utils.requestAsBrowser({
        url,
        proxyUrl,
        json: true
    });

    console.log(response1.body.clientIp);
    console.log("Should be different than");
    console.log(response2.body.clientIp);
});
</marked-tab>
```

### [](#single-ip-address-for-multiple-requests) Single IP address for multiple requests

Use a single IP address until it fails (gets retired).

The `maxPoolSize: 1` configuration in [PuppeteerCrawler](https://sdk.apify.com/docs/api/puppeteer-crawler#docsNav) means that a single IP will be used by all browsers until it fails. Then, all running browsers are retired, a new IP is selected and new browsers opened. The browsers all use the new IP.

```marked-tabs
<marked-tab header="PuppeteerCrawler" lang="javascript">
const Apify = require("apify");

Apify.main(async () => {
    const requestList = await Apify.openRequestList(
        "my-list", [
            "http://proxy.apify.com/?format=json",
            "http://proxy.apify.com",
        ]
    );

    const proxyConfiguration = await Apify.createProxyConfiguration();

    const crawler = new Apify.PuppeteerCrawler({
        requestList,
        proxyConfiguration,
        useSessionPool: true,
        sessionPoolOptions: {
            sessionOptions: { maxPoolSize: 1 },
        },
        handlePageFunction: async ({ page, request, proxyInfo }) => {
            console.log(await page.content());
        },
    });

    await crawler.run();
});
</marked-tab>


<marked-tab header="CheerioCrawler" lang="javascript">
const Apify = require('apify');

Apify.main(async() => {
    const proxyConfiguration = await Apify.createProxyConfiguration();

    const requestList = await Apify.openRequestList(
        "my-list", [
            "https://api.apify.com/v2/browser-info",
            "http://proxy.apify.com/?format=json",
        ]
    );

    const crawler = new Apify.CheerioCrawler({
        requestList,
        proxyConfiguration,
        // Make CheerioCrawler process JSON
        additionalMimeTypes: ["application/json"],
        useSessionPool: true,
        sessionPoolOptions: {
            sessionOptions: { maxPoolSize: 1 },
        },
        handlePageFunction: async ({ request, response, body, json }) => {
            // ...
            console.log(await json);
        },
    });

    await crawler.run();
});
</marked-tab>


<marked-tab header="launchPuppeteer()" lang="javascript">
const Apify = require("apify");

Apify.main(async () => {
    const proxyConfiguration = await Apify.createProxyConfiguration();
    const browser = await Apify.launchPuppeteer({
        proxyUrl: proxyConfiguration.newUrl("my_session"),
    });
    const page = await browser.newPage();

    await page.goto("http://proxy.apify.com/?format=json");
    const html = await page.content();

    await page.goto("http://proxy.apify.com");
    const html2 = await page.content();

    console.log(html);
    console.log("Should display the same clientIp as");
    console.log(html2);
});
</marked-tab>


<marked-tab header="requestAsBrowser()" lang="javascript">
const Apify = require("apify");

Apify.main(async () => {
    const proxyConfiguration = await Apify.createProxyConfiguration();
    const proxyUrl = proxyConfiguration.newUrl("my_session");

    const response1 = await Apify.utils.requestAsBrowser({
        url: "https://api.apify.com/v2/browser-info",
        proxyUrl,
        json: true
    });

    const response2 = await Apify.utils.requestAsBrowser({
        url: "https://api.apify.com/v2/browser-info",
        proxyUrl,
        json: true
    });

    console.log(response1.body.clientIp);
    console.log("Should be the same as");
    console.log(response2.body.clientIp);
});
</marked-tab>
```

### [](#how-to-use-proxy-groups) How to use proxy groups

For simplicity, the examples above use the `auto` proxy group, which selects IP addresses from all available groups.

To use IP addresses from specific proxy groups, add a `groups` [property](https://sdk.apify.com/docs/api/proxy-configuration#docsNav)
to `createProxyConfiguration()` and specify the group names. For example:

```js
const proxyConfiguration = await Apify.createProxyConfiguration({
    groups: ['GROUP_NAME_1', 'GROUP_NAME_2'],
});
```

## [](#using-standard-libraries-and-languages) Using standard libraries and languages

You can find your proxy password on the [Proxy page](https://my.apify.com/proxy) of the Apify app.

> The `username` field is **not** your Apify username.<br/>
> Instead, you specify proxy settings (e.g. `groups-SHADER+BUYPROXIES94952`, `session-123`).<br/>
> Use `auto` for default settings.

For examples using [PHP](https://www.php.net/), you need to have the [cURL](https://www.php.net/manual/en/book.curl.php) extension enabled in your PHP installation. See [installation instructions](https://www.php.net/manual/en/curl.installation.php) for more information.

Examples in [Python 2](https://www.python.org/download/releases/2.0/) use the [six](https://pypi.org/project/six/) library. Run `pip install six` to enable it.

### [](#use-ip-rotation) Use IP rotation

For each request, a random IP address is chosen from all [available proxy groups](https://my.apify.com/proxy). You can use random IP addresses from proxy groups by specifying the group(s) in the `username` parameter.

A random IP address will be used for each request.

```marked-tabs
<marked-tab header="Node.js (axios)" lang="javascript">
const HttpsProxyAgent = require("https-proxy-agent");
const axios = require("axios");

const httpsAgent = new HttpsProxyAgent({
    host: "proxy.apify.com",
    port: "8000",
    // Replace <YOUR_PROXY_PASSWORD> below with your password
    // found at https://my.apify.com/proxy
    auth: "auto:<YOUR_PROXY_PASSWORD>"
});

const axiosWithProxy = axios.create({ httpsAgent });

async function useProxy() {
    const response = await axiosWithProxy.get("http://proxy.apify.com/?format=json");
    console.log(response.data);
};

useProxy();

</marked-tab>


<marked-tab header="Node.js (got)" lang="javascript">
const got = require("got");
const HttpsProxyAgent = require("https-proxy-agent");

// Replace <YOUR_PROXY_PASSWORD> below with your password
// found at https://my.apify.com/proxy
const proxyUrl = "http://auto:<YOUR_PROXY_PASSWORD>@proxy.apify.com:8000"

async function useProxy() {
    const response = await got("http://proxy.apify.com/?format=json", {
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
</marked-tab>


<marked-tab header="Python 2" lang="python">
import six
from six.moves.urllib import request

# Replace <YOUR_PROXY_PASSWORD> below with your password
# found at https://my.apify.com/proxy
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
</marked-tab>


<marked-tab header="PHP" lang="php">
<?php
$curl = curl_init("http://proxy.apify.com/?format=json");
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_PROXY, "http://proxy.apify.com:8000");
// Replace <YOUR_PROXY_PASSWORD> below with your password
// found at https://my.apify.com/proxy
curl_setopt($curl, CURLOPT_PROXYUSERPWD, "auto:<YOUR_PROXY_PASSWORD>");
$response = curl_exec($curl);
curl_close($curl);
if ($response) echo $response;
?>
</marked-tab>
```

### [](#multiple-requests-with-the-same-ip-address) Multiple requests with the same IP address

The IP address in the example is chosen at random from all available proxy groups.

To use this option, set a session name in the `username` parameter.

```marked-tabs
<marked-tab header="Node.js (axios)" lang="javascript">
const HttpsProxyAgent = require("https-proxy-agent");
const axios = require("axios");

const httpsAgent = new HttpsProxyAgent({
    host: "proxy.apify.com",
    port: "8000",
    // Replace <YOUR_PROXY_PASSWORD> below with your password
    // found at https://my.apify.com/proxy
    auth: "session-my_session:<YOUR_PROXY_PASSWORD>"
});

const axiosWithProxy = axios.create({ httpsAgent });

async function useProxy() {
    const response = await axiosWithProxy.get("https://api.apify.com/v2/browser-info");
    console.log(response.data);
};

useProxy();
// Should return the same clientIp as
useProxy();

</marked-tab>


<marked-tab header="Node.js (got)" lang="javascript">
const got = require("got");
const HttpsProxyAgent = require("https-proxy-agent");

// Replace <YOUR_PROXY_PASSWORD> below with your password
// found at https://my.apify.com/proxy
const proxyUrl = "http://session-my_session:<YOUR_PROXY_PASSWORD>@proxy.apify.com:8000"

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
</marked-tab>


<marked-tab header="Python 2" lang="python">
import six
from six.moves.urllib import request
import ssl

def do_request():
    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://my.apify.com/proxy
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
</marked-tab>


<marked-tab header="PHP" lang="php">
<?php
function doRequest() {
    $curl = curl_init("https://api.apify.com/v2/browser-info");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_PROXY, "http://proxy.apify.com:8000");
    // Replace <YOUR_PROXY_PASSWORD> below with your password
    // found at https://my.apify.com/proxy
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
</marked-tab>
```

## [](#username-examples) Username examples

Use randomly allocated IP addresses from the SHADER group:

```text
groups-SHADER
```

Use a randomly allocated IP address for multiple requests:

```text
session-new_job_123
```

Use the same IP address from the `SHADER` and `BUYPROXIES94952` groups for multiple requests:

```text
groups-SHADER+BUYPROXIES94952,session-new_job_123
```

Set a session and select an IP from the `BUYPROXIES94952` group geolocated in the USA:

```text
groups-BUYPROXIES94952,session-new_job_123,country-US
```
