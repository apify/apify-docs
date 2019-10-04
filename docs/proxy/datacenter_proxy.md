---
title: Datacenter proxy
---

## [](#datacenter-proxy)Datacenter proxy servers

Apify Proxy provides access to Apify's pool of datacenter IP addresses to [actors](./actor) or any other application that support HTTP proxies. The proxy enables intelligent rotation of IP addresses during web scraping to avoid being blocked by target websites.

### [](#datacenter-proxy--overview)Overview

Datacenter proxy automatically rotates IP addresses. For each HTTP or HTTPS request, the proxy takes the list of all IP addresses available to the user and selects the one that has been used the longest time ago for the specific hostname. This behavior minimizes the chance of the proxy being blocked.

Note that by default each proxied HTTP request is potentially sent via a different target proxy server, which adds overhead and could be potentially problematic for websites which save cookies based on IP address. If you want to force the proxy to pick an IP address and then pass all subsequent connections via the same IP address, you can use the `session` parameter. See [Username parameters](#datacenter-proxy--username-params) more details.

Prices for dedicated proxy servers are mainly based on the number of proxy servers, their type, and location. Please [contact us](/contact) for more information.

### [](#datacenter-proxy--features)Features

*   Periodic health checks of proxies in the pool to ensure requests are not forwarded via dead proxies.
*   Intelligent rotation of IP addresses to ensure target hosts are accessed via proxies that have accessed them the longest time ago, to reduce the chance of blocking.
*   Periodically checks whether proxies are banned by selected target websites, and if they are, stops forwarding traffic to them to get the proxies unbanned as soon as possible.
*   Ensures proxies are located in specific countries using IP geolocation.
*   Allows selection of groups of proxy servers with specific characteristics.
*   Supports persistent sessions that enable you to keep the same IP address for certain parts of your crawls.
*   Measures statistics of traffic for specific users and hostnames.
*   Allows selection of proxy servers by country.

### [](#datacenter-proxy--shared)Shared proxy groups

Each user has access to a selected number of proxy servers from a shared pool of Apify Proxy servers. These proxy servers are spread into groups (called Proxy Groups) on the Apify platform where each group shares a common feature (location, provider, speed and so on).

The number of proxy servers available depends on the user's subscription plan. When a user first signs up to the Apify platform, a 30-day trial of the "Freelancer" plan is started, and proxy servers are allocated accordingly. After the trial ends, the user has to subscribe to a paid plan to continue using Apify Proxy.

For a full list of plans and number of allocated proxy servers for each plan, please take a look at our [pricing](/pricing).

Please [contact us](/contact) if you need more proxy servers then the allocated numbers, or you wish to use the proxy by itself without access to other features of the Apify platform.

### [](#datacenter-proxy--dedicated)Dedicated proxy groups

Apify Proxy allows for the creation of special dedicated proxy groups. These are assigned to a single user and only the user can use them.

This feature is useful if you have your own pool of proxy servers and still want to benefit from the features of Apify Proxy (like IP rotation, persistent sessions, and health checking).

Also, if you do not have your own pool, the [](/contact)Apify customer support team can set up a dedicated group for you based on your needs and requirements.

Please [contact us](/contact) for more details or if you have any questions.

### [](#datacenter-proxy--username-params)Username parameters

HTTP proxy username is used to pass various parameters for the proxy connection. For example, the username can look as follows:

    groups-SHADER,session-rand123456

The following table describes the available parameters:

|`groups`|
|--- |
|If specified, all proxied requests will use proxy servers from selected proxy groups. For example `groups-SHADER+BUYPROXIES94952`.  
**This parameter is optional**, by default, the proxy uses all available proxy servers from all groups the user has access to.|
|If specified, all proxied requests with the same session identifier are routed through the same IP address. For example `session-rand123456`.  
**This parameter is optional**, by default, each proxied request is assigned a randomly picked least used IP address.  
**The session string can only contain numbers (0-9), letters (a-z or A-Z), dot (.), underscore (_), a tilde (~) and the maximum length is 50 characters!**|
|If specified, all proxied requests will use proxy servers from a selected country. Please be aware that if there are no proxy servers from the specified country the connection will fail. For example `groups-SHADER,country-US`.  
**This parameter is optional**, by default, the proxy uses all available proxy servers from all countries.|


If you do not want to specify both `groups` and `session` parameters and therefore use **default** behavior for both, use the following username:

    auto

### [](#datacenter-proxy--session-persistence)Session persistence

When using Apify Proxy with `session` parameter set in the username (see [Username parameters]({{@link proxy/datacenter_proxy.md#datacenter-proxy--username-params}})) a single IP is assigned to the session ID provided after the first request is made. This IP/session_id combination is persited, and its expiration is set to 24 hours later. Each additional request extends the expiration back to 24 hours, so if you use the session at least once a day it will never expire, with two possible exceptions:

*   Proxy server stops responding and is marked as dead during a health check
*   If the Proxy Server is part of a Proxy Group that is refreshed monthly and is rotated out.

If the session is discarded due to the reasons above, then a new IP is assigned to the session.

### [](#datacenter-proxy--nodejs-examples)NodeJS Examples

The following sections contain several examples of how to use Apify Proxy in NodeJS (used as the default language in [actors]({{@link actor/index.md}})).

#### Usage in [PuppeteerCrawler](/docs/sdk/apify-runtime-js/latest#PuppeteerCrawler)

Use default functionality of Apify Proxy (randomly choose a proxy server from all available)

    const Apify = require('apify');

    Apify.main(async () => {
        const requestList = new Apify.RequestList({ sources: [{ url: 'http://www.example.com' }] });
        await requestList.initialize();

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            launchPuppeteerOptions: { useApifyProxy: true },
            handlePageFunction: async ({ page, request }) => {
                return Apify.pushData({ title: await page.title() });
            },
            handleFailedRequestFunction: ({ request }) => {
                console.error('Request failed', request.url, request.errorMessages);
            },
        });

        await crawler.run();
    });

Only use proxy servers from proxy group `SHADER` during the PuppeteerCrawler run

    const Apify = require('apify');

    Apify.main(async () => {
        const requestList = new Apify.RequestList({ sources: [{ url: 'http://www.example.com' }] });
        await requestList.initialize();

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            launchPuppeteerOptions: {
                useApifyProxy: true,
                // if you need to use more then one group
                // simply add the additional ID's to the array below
                apifyProxyGroups: ['SHADER'],
            },
            handlePageFunction: async ({ page, request }) => {
                return Apify.pushData({ title: await page.title() });
            },
            handleFailedRequestFunction: ({ request }) => {
                console.error('Request failed', request.url, request.errorMessages);
            },
        });

        await crawler.run();
    });

Keep a single IP selected from `SHADER` proxy group during the whole PuppeteerCrawler run

    const Apify = require('apify');

    Apify.main(async () => {
        const requestList = new Apify.RequestList({ sources: [{ url: 'http://www.example.com' }] });
        await requestList.initialize();

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            launchPuppeteerOptions: {
                useApifyProxy: true,
                // if you need to use more then one group
                // simply add the additional ID's to the array below
                apifyProxyGroups: ['SHADER'],
                apifyProxySession: 'my_session',
            },
            handlePageFunction: async ({ page, request }) => {
                return Apify.pushData({ title: await page.title() });
            },
            handleFailedRequestFunction: ({ request }) => {
                console.error('Request failed', request.url, request.errorMessages);
            },
        });

        await crawler.run();
    });

Get a new IP selected from `SHADER` proxy group for each browser opened during the whole PuppeteerCrawler run

    const Apify = require('apify');

    Apify.main(async () => {
        const requestList = new Apify.RequestList({ sources: [{ url: 'http://www.example.com' }] });
        await requestList.initialize();

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            // Notice that now we are setting options
            // in launchPuppeteerFunction instead of launchPuppeteerOptions
            launchPuppeteerFunction: () => Apify.launchPuppeteer({
                useApifyProxy: true,
                // if you need to use more then one group
                // simply add the additional ID's to the array below
                apifyProxyGroups: ['SHADER'],
                apifyProxySession: `my_sess_${Math.floor(Math.random() * 100000)}`,
            }),
            handlePageFunction: async ({ page, request }) => {
                return Apify.pushData({ title: await page.title() });
            },
            handleFailedRequestFunction: ({ request }) => {
                console.error('Request failed', request.url, request.errorMessages);
            },
        });

        await crawler.run();
    });

#### Usage in [Apify.launchPuppeteer()](/docs/sdk/apify-runtime-js/latest#module-Apify-launchPuppeteer)

Use one IP chosen from `SHADER` and `BUYPROXIES94952` proxy groups for the browser instance

    const Apify = require('apify');

    Apify.main(async () => {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const username = 'groups-SHADER+BUYPROXIES94952,session-my_session';
        const browser = await Apify.launchPuppeteer({
            proxyUrl: `http://${username}:${password}@proxy.apify.com:8000`,
        });

        const page = await browser.newPage();

        await page.goto('http://www.example.com');

        const html = await page.content();

        console.log('HTML:');
        console.log(html);
    });

#### Usage with [request](https://www.npmjs.com/package/request) and [request-promise](https://www.npmjs.com/package/request-promise) NPM packages

Use one randomly selected IP from all available proxy servers.

    const request = require('request');

    const password = process.env.APIFY_PROXY_PASSWORD;
    request(
        {
            url: 'http://www.example.com',
            proxy: `http://auto:${password}@proxy.apify.com:8000`
        },
        (err, response, HTML) => {
            if (err) {
                console.error(error);
                return;
            }
            console.log(HTML);
        }
    );

Use one IP selected from `SHADER` proxy group for two requests.

    const request = require('request-promise');

    async function main() {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const proxyUrl = `http://groups-SHADER,session-my_session:${password}@proxy.apify.com:8000`;
        try {
            const response1 = await request({
                url: 'https://api.apify.com/v2/browser-info',
                proxy: proxyUrl,
            });
            const response2 = await request({
                url: 'https://api.apify.com/v2/browser-info',
                proxy: proxyUrl,
            });
            console.log(response1.clientIp);
            console.log('should be the same as');
            console.log(response2.clientIp);
        } catch (e) {
            console.error(e);
        }
    }
    main();

Use randomly choose IP selected from `SHADER` and `BUYPROXIES94952` proxy groups for two requests.

    const request = require('request-promise');

    async function main() {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const proxyUrl = `http://groups-SHADER+BUYPROXIES94952:${password}@proxy.apify.com:8000`;
        try {
            const response1 = await request({
                url: 'https://api.apify.com/v2/browser-info',
                proxy: proxyUrl,
            });
            const response2 = await request({
                url: 'https://api.apify.com/v2/browser-info',
                proxy: proxyUrl,
            });
            console.log(response1.clientIp);
            console.log('should be different than');
            console.log(response2.clientIp);
        } catch (e) {
            console.error(e);
        }
    }
    main();

### [](#datacenter-proxy--php-examples)PHP Examples

The following section contain several examples of how to use Apify Proxy in PHP.

#### Usage with [CURL](http://php.net/manual/en/book.curl.php)

**IMPORTANT:** For all examples in this section you need to have cURL extension enabled in your PHP installation. See [installation instructions](http://php.net/manual/en/curl.installation.php) for more information.

Single request with random IP chosen from all available proxy groups.

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

Two requests with the same session chosen from all available proxy groups.

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

Two requests with the different IPs chosen from `SHADER` and `BUYPROXIES94952` proxy groups.

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

### [](#datacenter-proxy--python-examples)Python Examples

The following section contain several examples of how to use Apify Proxy in python.

#### Usage with [Python 3+](https://www.python.org/downloads/)

Single request with random IP chosen from all available proxy groups.

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

Two requests with the same session chosen from all available proxy groups.

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

Two requests with the different IPs chosen from `SHADER` and `BUYPROXIES94952` proxy groups.

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

#### Usage with [Python 2+](https://www.python.org/download/releases/2.7.2/)

**IMPORTANT:** For all examples in this section you need to have [six](https://pypi.org/project/six/) enabled in your Python installation. Run `pip install six` to enable it.

Single request with random IP chosen from all available proxy groups.

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

Two requests with the same session chosen from all available proxy groups.

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

Two requests with the different IPs chosen from `SHADER` and `BUYPROXIES94952` proxy groups.

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
