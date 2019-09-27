---
title: Residential proxy
---

## [](#residential-proxy)Residential proxy

Sometimes datacenter proxy servers are not a viable option for certain solutions and for these cases Apify Proxy includes an option to use Residential Proxy. This proxy solution allows the user access to a much larger pool of proxy servers than with datacenter proxy servers and therefore it is usually a better option for situations where a large number of proxy servers is required.

On the Apify platform, users can use Residential Proxy after they are given access to it by the [](/contact)Apify Support Team. **Pricing is based on data traffic**, which is measured for each connection made through the proxy and displayed on the platform's dashboard.

Please [contact us](/contact) if you want to use Apify Residential Proxy or if you need more information.

### [](#residential-proxy--username-params)Username parameters

HTTP proxy username is used to pass various parameters for the proxy connection. For example, the simplest way to use residential proxy is with the username below:

    groups-RESIDENTIAL

The following table describes the available parameters:

|`groups`|
|--- |
|Required to be set to **RESIDENTIAL**|
|If specified, all proxied requests with the same session identifier are routed through the same IP address. For example `session-rand123456`.  
**This parameter is optional**, by default, each proxied request is assigned a randomly picked least used IP address.  
**The session string can only contain numbers (0-9), letters (a-z or A-Z), dot (.), underscore (_), a tilde (~) and the maximum length is 50 characters!**|
|If specified, all proxied requests will use IP addresses that geolocated to the specified country. For example `country-GB` for IP's from Great Britain.  
**This parameter is optional**, by default, each proxied request is assigned an IP address from a random country.  
**The country code needs to be a two letter ISO country code - see the [full list of available country codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)**|


This is how the username would look for the most complex variation: Session set and IP selected from the United States

    groups-RESIDENTIAL,session-my_session_1,country-US

And here is how it would look if you need a random proxy from the US

    groups-RESIDENTIAL,country-US

### [](#residential-proxy--session-persistence)Session persistence

When using Apify Proxy with `session` parameter set in the username (see [Username parameters](#residential-proxy--username-params)) a single IP is assigned to the session ID provided after the first request is made. This IP is persisted for one minute and its expiration is refreshed with each request. If the proxy server becomes unresponsive or the session expires a new IP is selected for the next request.


### [](#residential-proxy--nodejs-examples)NodeJS Examples

The following sections contain several examples of how to use Apify Proxy in NodeJS (used as the default language in [actors](./actor)).

#### Usage in [PuppeteerCrawler](/docs/sdk/apify-runtime-js/latest#PuppeteerCrawler)

Use a single session with IP from the US for the whole PuppeteerCrawler run (for as long as the session lasts)

    const Apify = require('apify');

    Apify.main(async () => {
        const requestList = new Apify.RequestList({ sources: [{ url: 'http://www.example.com' }] });
        await requestList.initialize();

        const password = process.env.APIFY_PROXY_PASSWORD;
        const username = 'groups-RESIDENTIAL,session-my_session,country-US';
        const proxyUrl = `http://${username}:${password}@proxy.apify.com:8000`;

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            launchPuppeteerOptions: { proxyUrl },
            handlePageFunction: async ({ page, request }) => {
                return Apify.pushData({ title: await page.title() });
            },
            handleFailedRequestFunction: ({ request }) => {
                console.error('Request failed', request.url, request.errorMessages);
            },
        });

        await crawler.run();
    });

Create a new session with IP from GB for each browser launched during the Crawler run.

    const Apify = require('apify');

    Apify.main(async () => {
        const requestList = new Apify.RequestList({ sources: [{ url: 'http://www.example.com' }] });
        await requestList.initialize();

        const password = process.env.APIFY_PROXY_PASSWORD;

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            // The main difference from the example above
            // is that we are creating new session id for each
            // browser launched.
            launchPuppeteerFunction: () => {
                const sessionNumber = Math.floor(Math.random() * 100000);
                const username = `groups-RESIDENTIAL,session-s_${sessionNumber},country-US`;
                const proxyUrl = `http://${username}:${password}@proxy.apify.com:8000`;
                return Apify.launchPuppeteer({ proxyUrl });
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

#### Usage in [Apify.launchPuppeteer()](/docs/sdk/apify-runtime-js/latest#module-Apify-launchPuppeteer)

Use a single IP from Germany for all requests done in the launched browser

    const Apify = require('apify');

    Apify.main(async () => {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const username = 'groups-RESIDENTIAL,session-my_session1,country-DE';
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

Make a request with Residential Proxy using the [request](https://www.npmjs.com/package/request) NPM package

    const request = require('request');

    const password = process.env.APIFY_PROXY_PASSWORD;
    const username = 'groups-RESIDENTIAL';
    request(
        {
            url: 'http://www.example.com',
            proxy: `http://${username}:${password}@proxy.apify.com:8000`
        },
        (err, response, HTML) => {
            if (err) {
                console.error(error);
                return;
            }
            console.log(HTML);
        }
    );

Use the same IP for two requests with proxy geolocated in France using [request-promise](https://www.npmjs.com/package/request-promise) NPM package.

    const request = require('request-promise');

    async function main() {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const username = 'groups-RESIDENTIAL,session-my_session_3,country-FR';
        const proxy = `http://${username}:${password}@proxy.apify.com:8000`;
        try {
            const response1 = await request({
                url: 'https://api.apify.com/v2/browser-info',
                proxy,
            });
            const response2 = await request({
                url: 'https://api.apify.com/v2/browser-info',
                proxy,
            });
            console.log(response1.clientIp);
            console.log('should be the same as');
            console.log(response2.clientIp);
        } catch (e) {
            console.error(e);
        }
    }
    main();

### [](#residential-proxy--php-examples)PHP Examples

The following section contain several examples of how to use Apify Proxy in PHP.

#### Usage with [CURL](http://php.net/manual/en/book.curl.php)

**IMPORTANT:** For all examples in this section you need to have cURL extension enabled in your PHP installation. See [installation instructions](http://php.net/manual/en/curl.installation.php) for more information.

Single request with random IP chosen from all available countries.

    <?php
    $curl = curl_init('https://api.apify.com/v2/browser-info');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_PROXY, 'http://proxy.apify.com:8000');
    // Replace <YOUR_PROXY_PASSWORD> below with your password
    // found at https://my.apify.com/proxy
    curl_setopt($curl, CURLOPT_PROXYUSERPWD, 'groups-RESIDENTIAL:<YOUR_PROXY_PASSWORD>');
    $response = curl_exec($curl);
    curl_close($curl);
    if ($response) echo $response;
    ?>

Two requests with the same session with IP geolocated in Australia.

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
            'groups-RESIDENTIAL,session-my_session_4,country-AU:<YOUR_PROXY_PASSWORD>'
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

Two requests with the different IPs both from the US.

    <?php
    function doRequest() {
        $curl = curl_init('https://api.apify.com/v2/browser-info');
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_PROXY, 'http://proxy.apify.com:8000');
        // Replace <YOUR_PROXY_PASSWORD> below with your password
        // found at https://my.apify.com/proxy
        curl_setopt($curl, CURLOPT_PROXYUSERPWD, 'groups-RESIDENTIAL,country-USA:<YOUR_PROXY_PASSWORD>');
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

### [](#residential-proxy--python-examples)Python Examples

The following section contain several examples of how to use Apify Proxy in python.

#### Usage with [Python 3+](https://www.python.org/downloads/)

Single request with random IP chosen from all available countries.

    import urllib.request as request
    import ssl
    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://my.apify.com/proxy
    password = '<YOUR_PROXY_PASSWORD>'
    proxy_url = f"http://groups-RESIDENTIAL:{password}@proxy.apify.com:8000"
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

Two requests with the same IP geolocated in Japan.

    import urllib.request as request
    import ssl

    def do_request():
        # Replace <YOUR_PROXY_PASSWORD> below with your password
        # found at https://my.apify.com/proxy
        password = '<YOUR_PROXY_PASSWORD>'
        username = f"groups-RESIDENTIAL,session-my_session_6,country-JP"
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

Two requests with the different IPs from the Czech Republic.

    import urllib.request as request
    import ssl

    def do_request():
        # Replace <YOUR_PROXY_PASSWORD> below with your password
        # found at https://my.apify.com/proxy
        password = '<YOUR_PROXY_PASSWORD>'
        username = f"groups-RESIDENTIAL,country-CZ"
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
    print('Should contain different clientIp than ')
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
        'http://groups-RESIDENTIAL:%s@proxy.apify.com:8000' %
        (password)
    )
    proxy_handler = request.ProxyHandler({
        'http': proxy_url,
        'https': proxy_url,
    })
    opener = request.build_opener(proxy_handler)
    print(opener.open('https://api.apify.com/v2/browser-info').read())

Two requests with the same session geolocated in the US.

    import six
    from six.moves.urllib import request
    import ssl

    def do_request():
        # Replace <YOUR_PROXY_PASSWORD> below with your password
        # found at https://my.apify.com/proxy
        password = '<YOUR_PROXY_PASSWORD>'
        username = 'groups-RESIDENTIAL,session-my_session_7,country-us'
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

Two requests with different IPs geolocated in the Czech Republic.

    import six
    from six.moves.urllib import request
    import ssl

    def do_request():
        # Replace <YOUR_PROXY_PASSWORD> below with your password
        # found at https://my.apify.com/proxy
        password = '<YOUR_PROXY_PASSWORD>'
        username = 'groups-RESIDENTIAL,country-CZ'
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
    print('Should contain different clientIp than ')
    print(do_request())

### [](#residential-proxy--tips)Tips and tricks

Since Residential proxy is less predictable than datacenter proxy and is priced differently (by number of IPs vs traffic used), there are some important things that need to be considered before you use the Residential proxy in your solutions.

#### The traffic used by automated browsers needs to be controlled

Since Residential proxy is priced by data traffic used, it's very easy to realy quickly use up all prepaid traffic, especialy when accessing websites with large files loaded on every page.

There are two main ways to reduce the traffic use of your solutions:

*   [Block requests which are not required for your solution](https://help.apify.com/en/articles/2423246-block-requests-in-puppeteer)
*   [Cache responses that you require but do not wish to load again and again](https://help.apify.com/en/articles/2424032-cache-responses-in-puppeteerr)

When both of these options are combined, the data traffic of your solution can be reduced dramatically.

#### The speed of connected proxy can vary greatly

Each host on the Residential proxy network uses a different device, has different network speed and different latencies. This means that request made with one session can be extremely fast, while another request with different session can be extremely slow. The difference can be from a few milliseconds to a few seconds.

If your solution requires quickly loaded content, the best option is to set session, try a small request and see if the response time is acceptable. If it is, you can use this session for other requests. Otherwise, repeat the attempt with a different session.  
Just remember that sessions are not persistent, so from time to time, you will have to reevaluate the speed of the session and switch to a different one if needed.

#### Connections can be interrupted

For this problem there is no easy solution, so either do not use the Residential proxy for larger requests or if you have no choice, expect that interruptions might happen and write your solution with this situation in mind.
