---
title: Using proxies
description: Learn how to use and automagically rotate proxies in your scrapers by using Crawlee, and a bit about how to obtain pools of proxies.
sidebar_position: 2
slug: /anti-scraping/mitigation/using-proxies
pagination: true
---

**Learn how to use and automagically rotate proxies in your scrapers by using Crawlee, and a bit about how to obtain pools of proxies.**

---

[Crawlee](https://crawlee.dev) is an open-source web scraping and browser automation library for Node.js. Because proxies are so widely used in the scraping world, Crawlee has built-in features for implementing them in an effective way. One of the main functionalities that comes baked into Crawlee is proxy rotation, which is when each request is sent through a different proxy from a proxy pool.

## Implementing proxies in a scraper {#implementing-proxies}

Let's start with a Crawlee scraper. If you'd like to learn how to build such a scraper step by step, see the [Using a framework](../../scraping_basics_javascript/12_framework.md) lesson. Paste the following code into a new file called `proxies.js`. It enqueues all of the product links on the [Sales](https://warehouse-theme-metal.myshopify.com/collections/sales) page of a demo store, then makes a request to each product page and scrapes data about each one:

```js title="proxies.js"
import { CheerioCrawler } from 'crawlee';

function parseVariant($option) {
    const [variantName, priceText] = $option
        .text()
        .trim()
        .split(' - ');
    const price = parseInt(
        priceText
            .replace('$', '')
            .replace('.', '')
            .replace(',', ''),
    );
    return { variantName, price };
}

const crawler = new CheerioCrawler();

crawler.router.addDefaultHandler(async ({ enqueueLinks, log }) => {
    log.info('Looking for product detail pages');
    await enqueueLinks({ selector: '.product-list a.product-item__title', label: 'DETAIL' });
});

crawler.router.addHandler('DETAIL', async ({ $, request, pushData, log }) => {
    log.info(`Product detail page: ${request.url}`);

    const $price = $('.product-form__info-content .price').contents().last();
    const priceRange = { minPrice: null, price: null };
    const priceText = $price
        .text()
        .trim()
        .replace('$', '')
        .replace('.', '')
        .replace(',', '');

    if (priceText.startsWith('From ')) {
        priceRange.minPrice = parseInt(priceText.replace('From ', ''));
    } else {
        priceRange.minPrice = parseInt(priceText);
        priceRange.price = priceRange.minPrice;
    }

    const item = {
        url: request.url,
        title: $('.product-meta__title').text().trim(),
        vendor: $('.product-meta__vendor').text().trim(),
        ...priceRange,
        variantName: null,
    };

    const $variants = $('.product-form__option.no-js option');
    if ($variants.length === 0) {
        log.info('Saving a product');
        await pushData(item);
    } else {
        for (const element of $variants.toArray()) {
            const variant = parseVariant($(element));
            log.info('Saving a product variant');
            await pushData({ ...item, ...variant });
        }
    }
});

await crawler.run(['https://warehouse-theme-metal.myshopify.com/collections/sales']);
crawler.log.info('Exporting data');
await crawler.exportData('dataset.json');
await crawler.exportData('dataset.csv');
```

In order to implement a proxy pool, we will first need some proxies. We'll quickly use the free [proxy scraper](https://apify.com/mstephen190/proxy-scraper) on the Apify platform to get our hands on some quality proxies. Next, we'll need to set up a [`ProxyConfiguration`](https://crawlee.dev/api/core/class/ProxyConfiguration) and configure it with our custom proxies, like so:

```js
import { ProxyConfiguration } from 'crawlee';

const proxyConfiguration = new ProxyConfiguration({
    proxyUrls: ['http://45.42.177.37:3128', 'http://43.128.166.24:59394', 'http://51.79.49.178:3128'],
});
```

Awesome, so there's our proxy pool! Usually, a proxy pool is much larger than this; however, a three proxies pool is totally fine for tutorial purposes. Finally, we can pass the `proxyConfiguration` into our crawler's options:

```js
// highlight-next-line
const crawler = new CheerioCrawler({ proxyConfiguration });
```

The rest of the code stays the same.

> Note that if you run this code, it may not work, as the proxies could potentially be down/non-operating at the time you are going through this course.

That's it! The crawler will now automatically rotate through the proxies we provided in the `proxyUrls` option.

## A bit about debugging proxies {#debugging-proxies}

At the time of writing, the scraper above utilizing our custom proxy pool is working just fine. But how can we check that the scraper is for sure using the proxies we provided it, and more importantly, how can we debug proxies within our scraper? Luckily, within the same `context` object we've been destructuring `$` and `request` out of, there is a `proxyInfo` key as well. `proxyInfo` is an object which includes useful data about the proxy which was used to make the request.

```js
// Destructure "proxyInfo" from the "context" object
crawler.router.addHandler('DETAIL', async ({ $, request, pushData, log, proxyInfo }) => {
    // Log its value
    console.log(proxyInfo);
    // ...
});
```

After modifying your code to log `proxyInfo` to the console and running the scraper, you're going to see some logs which look like this:

```text
$ node proxies.js
...
{
  sessionId: 'session_bOhBbNllfJ',
  url: 'http://43.128.166.24:59394',
  username: '',
  password: '',
  hostname: '43.128.166.24',
  port: '59394',
  proxyTier: undefined
}
{
  sessionId: 'session_Uj7aBGaQlk',
  url: 'http://45.42.177.37:3128',
  username: '',
  password: '',
  hostname: '45.42.177.37',
  port: '3128',
  proxyTier: undefined
}
...
```

These logs confirm that our proxies are being used and rotated successfully by Crawlee, and can also be used to debug slow or broken proxies.

## Higher level proxy scraping {#higher-level-proxy-scraping}

Crawlee has integrated support for the Apify SDK, which supports [Apify Proxy](https://apify.com/proxy) - a service that provides access to pools of both residential and datacenter IP addresses. A `proxyConfiguration` using Apify Proxy might look something like this:

```js
import { Actor } from 'apify';

const proxyConfiguration = await Actor.createProxyConfiguration({
    countryCode: 'US',
});
```

Notice that we didn't provide it a list of proxy URLs. Apify Proxy serves as our proxy pool, and because we didn't specify any `groups`, it uses all proxy groups available to our account, limited to IP addresses from the US.

## Next up {#next}

[Next up](./generating_fingerprints.md), we'll be checking out how to use two npm packages to generate and inject [browser fingerprints](../techniques/fingerprinting.md).
