---
title: Examples
description: Learn how to connect to Apify's datacenter proxies from your application using Node.js, Python 2 and 3 and PHP.
paths:
    - proxy/datacenter-proxy/nodejs-examples
    - proxy/datacenter-proxy/python-examples
    - proxy/datacenter-proxy/php-examples
    - proxy/datacenter-proxy/examples
---
<!-- Watch out! This file is hard to read because our own 'marked-tabs' language fences aren't syntax-highlighted -->

for JS, use these
Got:
https://www.npmjs.com/package/got
https://stackoverflow.com/questions/55981040/how-to-use-axios-with-a-proxy-server-to-make-an-https-call

Axios:
https://www.npmjs.com/package/axios
https://stackoverflow.com/questions/55981040/how-to-use-axios-with-a-proxy-server-to-make-an-https-call

I will need to send authentication tokens in the URLs when doing the proxy requests


Single request with a random IP address chosen from all available proxy groups.

```marked-tabs
<marked-tab header="NodeJS" lang="javascript">

</marked-tab>


<marked-tab header="Python 3+" lang="python">
import urllib.request as request
import ssl
# Replace <YOUR_PROXY_PASSWORD> below with your password
# found at https://my.apify.com/proxy
password = '<YOUR_PROXY_PASSWORD>'
proxy_url = f"http://auto:{password}@proxy.apify.com:8000"
proxy_handler = request.ProxyHandler({
    'http': proxy_url,
    'https': proxy_url,
})

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
httpHandler = request.HTTPSHandler(context=ctx)

opener = request.build_opener(httpHandler,proxy_handler)
print(opener.open('https://api.apify.com/v2/browser-info').read())
</marked-tab>


<marked-tab header="Python 2+" lang="python">
import six
from six.moves.urllib import request
# Replace <YOUR_PROXY_PASSWORD> below with your password
# found at https://my.apify.com/proxy
password = '<YOUR_PROXY_PASSWORD>'
proxy_url = (
    'http://auto:%s@proxy.apify.com:8000' %
    (password)
)
proxy_handler = request.ProxyHandler({
    'http': proxy_url,
    'https': proxy_url,
})
opener = request.build_opener(proxy_handler)
print(opener.open('https://api.apify.com/v2/browser-info').read())
</marked-tab>


<marked-tab header="PHP" lang="php">
<?php
$curl = curl_init('https://api.apify.com/v2/browser-info');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_PROXY, 'http://proxy.apify.com:8000');
// Replace <YOUR_PROXY_PASSWORD> below with your password
// found at https://my.apify.com/proxy
curl_setopt($curl, CURLOPT_PROXYUSERPWD, 'auto:<YOUR_PROXY_PASSWORD>');
$response = curl_exec($curl);
curl_close($curl);
if ($response) echo $response;
?>
</marked-tab>
```

Two requests with the same IP address chosen from all available proxy groups.

```marked-tabs
<marked-tab header="NodeJS" lang="javascript">

</marked-tab>


<marked-tab header="Python 3+" lang="python">
import urllib.request as request
import ssl

def do_request():
    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://my.apify.com/proxy
    password = '<YOUR_PROXY_PASSWORD>'
    proxy_url = f"http://session-my_session:{password}@proxy.apify.com:8000"
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
print('Should return the contain the same clientIp as ')
print(do_request())
</marked-tab>


<marked-tab header="Python 2+" lang="python">
import six
from six.moves.urllib import request
import ssl

def do_request():
    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://my.apify.com/proxy
    password = '<YOUR_PROXY_PASSWORD>'
    proxy_url = (
        'http://session-my_session:%s@proxy.apify.com:8000' %
        (password)
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
print('Should return the contain the same clientIp as ')
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
    curl_setopt($curl, CURLOPT_PROXYUSERPWD, 'session-my_session:<YOUR_PROXY_PASSWORD>');
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

Two requests with different IP addresses chosen from the `SHADER` and `BUYPROXIES94952` proxy groups.

```marked-tabs
<marked-tab header="NodeJS" lang="javascript">

</marked-tab>


<marked-tab header="Python 3+" lang="python">
import urllib.request as request
import ssl

def do_request():
    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://my.apify.com/proxy
    password = '<YOUR_PROXY_PASSWORD>'
    proxy_url = f"http://groups-SHADER+BUYPROXIES94952:{password}@proxy.apify.com:8000"
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
print('Should return the contain different clientIp than ')
print(do_request())
</marked-tab>


<marked-tab header="Python 2+" lang="python">
import six
from six.moves.urllib import request
import ssl

def do_request():
    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://my.apify.com/proxy
    password = '<YOUR_PROXY_PASSWORD>'
    proxy_url = (
        'http://groups-SHADER+BUYPROXIES94952:%s@proxy.apify.com:8000' %
        (password)
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
print('Should return the contain different clientIp than ')
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
    curl_setopt($curl, CURLOPT_PROXYUSERPWD, 'groups-SHADER+BUYPROXIES94952:<YOUR_PROXY_PASSWORD>');
    $response = curl_exec($curl);
    curl_close($curl);
    return $response;
}
$response1 = doRequest();
$response2 = doRequest();
echo $response1;
echo "\nShould have different clientIp than\n";
echo $response2;
?>
</marked-tab>
```


## Examples using the Apify SDK

Use one randomly selected IP address from all available proxy servers.

```marked-tabs
<marked-tab header="PuppeteerCrawler" lang="javascript">
const Apify = require('apify');

Apify.main(async () => {
    const requestList = await Apify.openRequestList(
        'my-list', ['http://www.example.com']
    );
    const proxyConfiguration = await Apify.createProxyConfiguration();

    const crawler = new Apify.PuppeteerCrawler({
        requestList,
        proxyConfiguration,
        handlePageFunction: async ({ page, request, proxyInfo }) => {
            return Apify.pushData({ title: await page.title() });
        },
        handleFailedRequestFunction: ({ request }) => {
            console.error('Request failed', request.url, request.errorMessages);
        },
    });

    await crawler.run();
});
</marked-tab>


<marked-tab header="requestAsBrowser()" lang="javascript">
const Apify = require('apify');

Apify.main(async () => {
    const proxyConfiguration = await Apify.createProxyConfiguration();
    try {
        const { body } = await Apify.utils.requestAsBrowser({
            url: 'https://www.example.com',
            proxyUrl: proxyConfiguration.newUrl(),
        });
        console.log(body); // returns HTML of returned page
    } catch (e) {
        console.error(e);
    }
});
</marked-tab>
```


Use one IP address chosen from the `SHADER` and `BUYPROXIES94952` proxy groups.

```marked-tabs
<marked-tab header="PuppeteerCrawler" lang="javascript">
const Apify = require('apify');

Apify.main(async () => {
    const requestList = await Apify.openRequestList(
        'my-list', ['http://www.example.com']
    );
    const proxyConfiguration = await Apify.createProxyConfiguration({
        // if you need to use more then one group
        // simply add the additional ID to the array below
        groups: ['SHADER', 'BUYPROXIES94952'],
    });

    const crawler = new Apify.PuppeteerCrawler({
        requestList,
        proxyConfiguration,
        handlePageFunction: async ({ page, request, proxyInfo }) => {
            return Apify.pushData({ title: await page.title() });
        },
        handleFailedRequestFunction: ({ request }) => {
            console.error('Request failed', request.url, request.errorMessages);
        },
    });

    await crawler.run();
});
</marked-tab>


<marked-tab header="Apify.launchPuppeteer()" lang="javascript">
// Randomly choose an IP address from all available proxy servers
const Apify = require('apify');

Apify.main(async () => {
    const proxyConfiguration = await Apify.createProxyConfiguration({
        groups: ['SHADER', 'BUYPROXIES94952'],
    });

    const browser = await Apify.launchPuppeteer({
        proxyUrl: proxyConfiguration.newUrl('my_session'),
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
        groups: ['SHADER', 'BUYPROXIES94952']
    });
    const proxyUrl = proxyConfiguration.newUrl();
    const url = 'https://api.apify.com/v2/browser-info';

    try {
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
        console.log('should be different than');
        console.log(response2.body.clientIp);
    } catch (e) {
        console.error(e);
    }
});
</marked-tab>
```


Using [PuppeteerCrawler](https://sdk.apify.com/docs/api/puppeteer-crawler#docsNav), get a new IP address selected from the `SHADER` proxy group for each browser opened during an entire run.

```marked-tabs
<marked-tab header="PuppeteerCrawler" lang="javascript">
const Apify = require('apify');

Apify.main(async () => {
    const requestList = await Apify.openRequestList(
        'my-list', ['http://www.example.com']
    );
    const proxyConfiguration = await Apify.createProxyConfiguration({
        // if you need to use more then one group
        // simply add the additional ID to the array below
        groups: ['SHADER'],
    });

    const crawler = new Apify.PuppeteerCrawler({
        requestList,
        proxyConfiguration,
        useSessionPool: true,
        handlePageFunction: async ({ page, request, proxyInfo }) => {
            return Apify.pushData({ title: await page.title() });
        },
        handleFailedRequestFunction: ({ request }) => {
            console.error('Request failed', request.url, request.errorMessages);
        },
    });

    await crawler.run();
});
</marked-tab>
```


Using [PuppeteerCrawler](https://sdk.apify.com/docs/api/puppeteer-crawler#docsNav), keep a single IP address selected from the `SHADER` proxy group until it fails (gets retired).

```marked-tabs
<marked-tab header="PuppeteerCrawler" lang="javascript">
const Apify = require('apify');

Apify.main(async () => {
    const requestList = await Apify.openRequestList('my-list', ['http://www.example.com']);
    const proxyConfiguration = await Apify.createProxyConfiguration({
        // if you need to use more then one group
        // simply add the additional ID to the array below
        groups: ['SHADER'],
    });

    const crawler = new Apify.PuppeteerCrawler({
        requestList,
        proxyConfiguration,
        useSessionPool: true,
        sessionPoolOptions: {
            sessionOptions: { maxPoolSize: 1 },
        },
        handlePageFunction: async ({ page, request, proxyInfo }) => {
            return Apify.pushData({ title: await page.title() });
        },
        handleFailedRequestFunction: ({ request }) => {
            console.error('Request failed', request.url, request.errorMessages);
        },
    });

    await crawler.run();
});
</marked-tab>
```


With [`requestAsBrowser()`](https://sdk.apify.com/docs/api/utils#utilsrequestasbrowseroptions), use one IP address from the `SHADER` proxy group for two requests.

```marked-tabs
<marked-tab header="PuppeteerCrawler" lang="javascript">
const Apify = require('apify');

Apify.main(async () => {
    const proxyConfiguration = await Apify.createProxyConfiguration({
        groups: ['SHADER']
    });
    const proxyUrl = proxyConfiguration.newUrl('my_session');

    try {
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
    } catch (e) {
        console.error(e);
    }
});
</marked-tab>
```

