---
title: Google SERP proxy
---

## [](#google-serp)Google SERP proxy

If you need to get search results from Google Search or other google search powered services from multiple countries with an option to dynamically switch between countries then you can use Google SERP proxy.

Requests made through the proxy are automatically routed through a proxy server from the selected country and pure **HTML code of the search result page is returned**.

Currently supported google search services are:

*   Google Search (http://www.google.<country domain>/search)
*   Google Shopping (http://www.google.<country domain>/search?tbm=shop)

**Important:** Only HTTP requests are allowed, and the Google hostname needs to start with `www.` subdomain.

**Pricing is based on the number of requests made**. Please [contact us](https://apify.com/contact) if you want to use Google SERP Proxy or if you need more information.

### [](#google-serp--username-params)Username parameters

HTTP proxy username is used to pass various parameters for the proxy connection.

In the case of Google SERP proxy, the username should always look like this

    groups-GOOGLE_SERP

Unlike datacenter or residential proxies, there is no session parameter.

### [](#google-serp--country)Country selection

A correct google domain needs to be used to get results for the desired country code.  
For example:

Search results from the US: `http://www.google.com/search?q=<query>`

Shopping results from Great Britain: `http://www.google.co.uk/seach?tbm=shop&q=<query>`

Search results from Germany: `http://www.google.de/search?q=<query>`

See [full list of available domain names](https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/List_of_Google_domains.html) for specific countries. When used, always remember to prepend the domain name with `www.` prefix.

### [](#google-serp--nodejs-examples)NodeJS Examples

The following sections contain several examples of how to use Google SERP proxy in [actors]({{@link actor/index.md}}).

#### Usage in [PuppeteerCrawler](https://apify.com/docs/sdk/apify-runtime-js/latest#PuppeteerCrawler)

Get a list of results from the US for keyword `wikipedia` and parse them through cheerio

    const Apify = require('apify');

    Apify.main(async() => {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const proxyUrl = `http://groups-GOOGLE_SERP:${password}@localhost:8000`;
        const url = 'http://www.google.com/search?q=wikipedia';

        const requestList = new Apify.RequestList({
            sources: [{ url }],
        });
        await requestList.initialize(); // Load requests.

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            launchPuppeteerOptions: {
                headless: true,
                proxyUrl,
            },
            gotoFunction: async({ page, request }) => {
                await page.setRequestInterception(true);
                page.on('request', request => {
                    if (request.resourceType() !== 'document') return request.abort();
                    return request.continue();
                });
                return page.goto(url, { waitUntil: 'domcontentloaded' });
            },
            handlePageFunction: async({ page, request }) => {
                await Apify.utils.puppeteer.injectJQuery(page);
                const searchResults = await page.evaluate(() => {
                    return $('[class$="list-result"] div div:nth-child(2) ').map(function() {
                        const title = $(this).find('a[jsaction="spop.c"]')[0];
                        return {
                            title: $(title).text(),
                            url: $(title).attr('href'),
                            price: $(this).find('div:nth-child(2)').text(),
                        }
                    }).toArray();
                });
                console.log(searchResults);
            },
            handleFailedRequestFunction: async({ request }) => {
                console.error(request.errorMessages);
            },
        });

        await crawler.run();
    });

Get a list of shopping results from the Czech Republic for keyword `Apple iPhone XS 64GB` and parse them through cheerio

    const Apify = require('apify');

    Apify.main(async() => {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const proxyUrl = `http://groups-GOOGLE_SERP:${password}@localhost:8000`;
        const url = 'http://www.google.cz/search?q=Apple+iPhone+XS+64GB&tbm=shop';

        const requestList = new Apify.RequestList({
            sources: [{ url }],
        });
        await requestList.initialize(); // Load requests.

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            launchPuppeteerOptions: {
                headless: true,
                proxyUrl,
            },
            gotoFunction: async({ page, request }) => {
                await page.setRequestInterception(true);
                page.on('request', request => {
                    if (request.resourceType() !== 'document') return request.abort();
                    return request.continue();
                });
                return page.goto(url, { waitUntil: 'domcontentloaded' });
            },
            handlePageFunction: async({ page, request }) => {
                await Apify.utils.puppeteer.injectJQuery(page);
                const searchResults = await page.evaluate(() => {
                    return $('[class$="list-result"] > div > div:nth-child(2)').map(function() {
                        const title = $(this).find('a[jsaction="spop.c"]')[0];
                        return {
                            title: $(title).text(),
                            price: $(this).find('div:nth-child(2) > div:nth-child(1)').text(),
                        }
                    }).toArray();
                });
                console.log(searchResults);
            },
            handleFailedRequestFunction: async({ request }) => {
                console.error(request.errorMessages);
            },
        });

        await crawler.run();
    });

#### Usage in [Apify.launchPuppeteer()](https://apify.com/docs/sdk/apify-runtime-js/latest#module-Apify-launchPuppeteer)

Get a list of results from the US for keyword `wikipedia` and parse them through cheerio

    const Apify = require('apify');

    Apify.main(async() => {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const proxyUrl = `http://groups-GOOGLE_SERP:${password}@localhost:8000`;
        const url = 'http://www.google.com/search?q=wikipedia';

        try {
            const browser = await Apify.launchPuppeteer({
                headless: true,
                proxyUrl,
            });
            const page = await browser.newPage();
            await page.setRequestInterception(true);
            page.on('request', request => {
                if (request.resourceType() !== 'document') return request.abort();
                return request.continue();
            });
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            await Apify.utils.puppeteer.injectJQuery(page);
            const searchResults = await page.evaluate(() => {
                return $('[class$="list-result"] div div:nth-child(2) ').map(function() {
                    const title = $(this).find('a[jsaction="spop.c"]')[0];
                    return {
                        title: $(title).text(),
                        url: $(title).attr('href'),
                        price: $(this).find('div:nth-child(2)').text(),
                    }
                }).toArray();
            });
            console.log(searchResults);
            await page.close();
            await browser.close();
        } catch (error) {
            console.error(error.message());
        }
    });

Get a list of shopping results from the Czech Republic for keyword `Apple iPhone XS 64GB` and parse them through cheerio

    const Apify = require('apify');

    Apify.main(async() => {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const proxyUrl = `http://groups-GOOGLE_SERP:${password}@localhost:8000`;
        const url = 'http://www.google.cz/search?q=Apple+iPhone+XS+64GB&tbm=shop';

        try {
            const browser = await Apify.launchPuppeteer({
                headless: true,
                proxyUrl,
            });
            const page = await browser.newPage();
            await page.setRequestInterception(true);
            page.on('request', request => {
                if (request.resourceType() !== 'document') return request.abort();
                return request.continue();
            });
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            await Apify.utils.puppeteer.injectJQuery(page);
            const searchResults = await page.evaluate(() => {
                return $('[class$="list-result"] > div > div:nth-child(2)').map(function() {
                    const title = $(this).find('a[jsaction="spop.c"]')[0];
                    return {
                        title: $(title).text(),
                        price: $(this).find('div:nth-child(2) > div:nth-child(1)').text(),
                    }
                }).toArray();
            });
            console.log(searchResults);
            await page.close();
            await browser.close();
        } catch (error) {
            console.error(error.message());
        }
    });

#### Usage with [request-promise](https://www.npmjs.com/package/request-promise) and [cheerio](https://www.npmjs.com/package/cheerio) NPM packages

Get a list of results from the US for keyword `wikipedia` and parse them through cheerio

    const request = require('request-promise');
    const cheerio = require('cheerio');

    async function main() {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const proxyUrl = `http://groups-GOOGLE_SERP:${password}>@proxy.apify.com:8000`;
        const html = await request({ url: 'http://www.google.com/search?q=wikipedia', proxy: proxyUrl });
        const $ = cheerio.load(html);
        const searchResults = $('#search div.g').map(function() {
            return {
                title: $($(this).find('h3')[0]).text(),
                url: $(this).find('div cite').text(),
                description: $(this).find('.s div .st').text(),
            }
        }).toArray();
        console.log(searchResults);
    }

    main();

Get a list of shopping results from the Czech Republic for query `Apple iPhone XS 64GB` and parse them through cheerio

    const request = require('request-promise');
    const cheerio = require('cheerio');

    async function main() {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const proxyUrl = `http://groups-GOOGLE_SERP:${password}>@proxy.apify.com:8000`;
        const query = encodeURI('Apple iPhone XS 64GB');

        try {
            const html = await request({
                url: `http://www.google.cz/search?tbm=shop&q=${query}`,
                proxy: proxyUrl,
            });
            const $ = cheerio.load(html);
            const searchResults = $('[class$="list-result"] > div > div:nth-child(2) ').map(function() {
                const title = $(this).find('a[jsaction="spop.c"]')[0];
                return {
                    title: $(title).text(),
                    price: $(this).find('div:nth-child(2)').text(),
                }
            }).toArray();
            console.log(searchResults);
        } catch (error) {
            console.error(error.message)
        }
    }

    main();

### [](#google-serp--php-examples)PHP Examples

The following section contain several examples of how to use Google SERP proxy in PHP.

#### Usage with [CURL](http://php.net/manual/en/book.curl.php)

**IMPORTANT:** For all examples in this section you need to have cURL extension enabled in your PHP installation. See [installation instructions](http://php.net/manual/en/curl.installation.php) for more information.

Get HTML of search results from the US for keyword `wikipedia`

    <?php
    $query = urlencode('wikipedia');
    $curl = curl_init('http://www.google.com/search?q=' . $query);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_PROXY, 'http://proxy.apify.com:8000');
    // Replace <YOUR_PROXY_PASSWORD> below with your password
    // found at https://my.apify.com/proxy
    curl_setopt($curl, CURLOPT_PROXYUSERPWD, 'groups-GOOGLE_SERP:<YOUR_PROXY_PASSWORD>');
    $response = curl_exec($curl);
    curl_close($curl);
    echo $response;
    ?>

Get HTML of shopping results from the Czech Republic for query `Apple iPhone XS 64GB`

    <?php
    $query = urlencode('Apple iPhone XS 64GB');
    $curl = curl_init('http://www.google.com/search?tbm=shop&q=' . $query);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_PROXY, 'http://proxy.apify.com:8000');
    // Replace <YOUR_PROXY_PASSWORD> below with your password
    // found at https://my.apify.com/proxy
    curl_setopt($curl, CURLOPT_PROXYUSERPWD, 'groups-GOOGLE_SERP:<YOUR_PROXY_PASSWORD>');
    $response = curl_exec($curl);
    curl_close($curl);
    echo $response;
    ?>

### [](#google-serp--python-examples)Python Examples

The following section contain several examples of how to use Google SERP proxy in python.

#### Usage with [Python 3+](https://www.python.org/downloads/)

Get HTML of search results from the US for keyword `wikipedia`

    import urllib.request as request
    import urllib.parse as parse

    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://my.apify.com/proxy
    password = '<YOUR_PROXY_PASSWORD>'
    proxy_url = f"http://groups-GOOGLE_SERP:{password}@proxy.apify.com:8000"

    proxy_handler = request.ProxyHandler({
        'http': proxy_url,
    })

    opener = request.build_opener(proxy_handler)

    query = parse.urlencode({ 'q': 'wikipedia' })
    print(opener.open(f"http://www.google.com/search?{query}").read())

Get HTML of shopping results from the Czech Republic for query `Apple iPhone XS 64GB`

    import urllib.request as request
    import urllib.parse as parse

    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://my.apify.com/proxy
    password = '<YOUR_PROXY_PASSWORD>'
    proxy_url = f"http://groups-GOOGLE_SERP:{password}@proxy.apify.com:8000"
    proxy_handler = request.ProxyHandler({
        'http': proxy_url,
    })
    opener = request.build_opener(proxy_handler)

    query = parse.urlencode({ 'q': 'Apple iPhone XS 64GB', 'tbm': 'shop' })
    print(opener.open(f"http://www.google.cz/search?{query}").read())

#### Usage with [Python 2+](https://www.python.org/download/releases/2.7.2/)

**IMPORTANT:** For all examples in this section you need to have [six](https://pypi.org/project/six/) enabled in your Python installation. Run `pip install six` to enable it.

Get HTML of search results from the US for keyword `wikipedia`

    import six
    from six.moves.urllib import request, urlencode

    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://my.apify.com/proxy
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

Get HTML of shopping results from the Czech Republic for query `Apple iPhone XS 64GB`

    import six
    from six.moves.urllib import request, urlencode

    # Replace <YOUR_PROXY_PASSWORD> below with your password
    # found at https://my.apify.com/proxy
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
        'http://www.google.cz/search?%s' %
        (query)
    )
    print(opener.open(url).read())
