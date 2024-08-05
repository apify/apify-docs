---
title: Using proxies
description: Learn how to use and automagically rotate proxies in your scrapers by using Crawlee, and a bit about how to easily obtain pools of proxies.
sidebar_position: 2
slug: /anti-scraping/mitigation/using-proxies
---

# Using proxies {#using-proxies}

**Learn how to use and automagically rotate proxies in your scrapers by using Crawlee, and a bit about how to easily obtain pools of proxies.**

---

In the [**Web scraping for beginners**](../../scraping_basics_javascript/index.md) course, we learned about the power of Crawlee, and how it can streamline the development process of web crawlers. You've already seen how powerful the `crawlee` package is; however, what you've been exposed to thus far is only the tip of the iceberg.

Because proxies are so widely used in the scraping world, Crawlee has been equipped with features which make it easy to implement them in an effective way. One of the main functionalities that comes baked into Crawlee is proxy rotation, which is when each request is sent through a different proxy from a proxy pool.

## Implementing proxies {#implementing-proxies}

Let's build on top of the code which appears at the end of the [Professional scraping](../../scraping_basics_javascript/crawling/pro_scraping.md) lesson of the **Web Scraping for Beginners** course.

Let's paste the same code to a new file, `proxies.js`, and make some changes. The code crawls the [Sales](https://warehouse-theme-metal.myshopify.com/collections/sales) page of a sample e-commerce website. It goes through all of the product links, enqueues requests to each page with a product detail, and scrapes data about all of the products:

```js title=proxies.js
import { CheerioCrawler, Dataset } from 'crawlee';

const crawler = new CheerioCrawler({
    requestHandler: async ({ $, request, enqueueLinks }) => {
        console.log(`Fetching URL: ${request.url}`);

        if (request.label === 'start-url') {
            await enqueueLinks({
                selector: 'a.product-item__title',
            });
            return;
        }

        const title = $('h1').text().trim();
        const vendor = $('a.product-meta__vendor').text().trim();
        const price = $('span.price').contents()[2].nodeValue;
        const reviewCount = parseInt($('span.rating__caption').text(), 10);
        const description = $('div[class*="description"] div.rte').text().trim();

        await Dataset.pushData({
            title,
            vendor,
            price,
            reviewCount,
            description,
        });
    },
});

await crawler.addRequests([{
    url: 'https://warehouse-theme-metal.myshopify.com/collections/sales',
    label: 'start-url',
}]);

await crawler.run();
```

We'll want all the requests to go through a proxies. For that we obviously need proxies! To get some, we can use Matthias Stephens' [free proxy scraper](https://apify.com/mstephen190/proxy-scraper). It can find tens of reliable proxies out of the thousands it scrapes.

Once we have a list of proxies, we can add [`ProxyConfiguration`](https://crawlee.dev/api/core/class/ProxyConfiguration) and pass it to our crawler.

Proxy pools usually consist of many proxy URLs, but for the sake of simplicity of this lesson we'll list just three. At the time you're reading this text, they most probably won't work anymore, so be sure to use your own values.

```js
import { CheerioCrawler, Dataset, ProxyConfiguration } from 'crawlee';

const proxyConfiguration = new ProxyConfiguration({
    proxyUrls: ['http://45.42.177.37:3128', 'http://43.128.166.24:59394', 'http://51.79.49.178:3128'],
});

const crawler = new CheerioCrawler({
    proxyConfiguration,
    requestHandler: async ({ $, request, enqueueLinks }) => {
        console.log(`Fetching URL: ${request.url}`);

        if (request.label === 'start-url') {
            await enqueueLinks({
                selector: 'a.product-item__title',
            });
            return;
        }

        const title = $('h1').text().trim();
        const vendor = $('a.product-meta__vendor').text().trim();
        const price = $('span.price').contents()[2].nodeValue;
        const reviewCount = parseInt($('span.rating__caption').text(), 10);
        const description = $('div[class*="description"] div.rte').text().trim();

        await Dataset.pushData({
            title,
            vendor,
            price,
            reviewCount,
            description,
        });
    },
});

await crawler.addRequests([{
    url: 'https://warehouse-theme-metal.myshopify.com/collections/sales',
    label: 'start-url',
}]);

await crawler.run();
```

The crawler will now automatically rotate through the proxies we provided in the `proxyUrls` array.

## Debugging proxies {#debugging-proxies}

To check that we're scraping through the proxies, we can get `proxyInfo` from the handler's context, which includes useful data about the proxy used to make the request.

In the code example we already destructure the context object to `$` and `request`, so we can just add `proxyInfo` as something we want to access in the handler, too.

```js
const crawler = new CheerioCrawler({
    proxyConfiguration,
    // Destructure "proxyInfo" from the "context" object
    handlePageFunction: async ({ $, request, proxyInfo }) => {
        // Log its value
        console.log(proxyInfo);
        // ...
        // ...
    },
});
```

After modifying the code to log `proxyInfo` and after running the scraper, we can see proxy details about each request made:

![Sample logs of proxyInfo](./images/proxy-info-logs.png)

These logs confirm that Crawlee uses and automatically rotates the proxies. Such logs can be also useful for debugging slow or broken proxies.

## Carefree proxy scraping {#higher-level-proxy-scraping}

If scraping and managing proxies on your own feels tedious, there are services which do that for you. One of them is [Apify Proxy](https://apify.com/proxy), which provides proxies with both residential and datacenter IP addresses. The integration with Crawlee is seamless, but first you need the Apify SDK:

```shell
npm install apify
```

Then you can create the `proxyConfiguration` like this:

```js
import { Actor } from 'apify';

const proxyConfiguration = await Actor.createProxyConfiguration({
    countryCode: 'US',
});
```

For more information about the integration refer to the [Apify SDK documentation](https://docs.apify.com/sdk/js/docs/guides/proxy-management).

## Next up {#next}

[Next up](./generating_fingerprints.md), we'll be checking out how to use two npm packages to generate and inject [browser fingerprints](../techniques/fingerprinting.md).
