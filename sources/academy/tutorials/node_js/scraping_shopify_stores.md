---
title: How to scrape Shopify stores via their JSON endpoints
description: Most Shopify stores expose /collections.json and /collections/{handle}/products.json as unauthenticated JSON APIs. Prefer them over HTML parsing — you get structured data, cheap pagination, and no rendering.
sidebar_position: 15.3
slug: /node-js/scraping-shopify-stores
---

**Most Shopify storefronts expose their catalog as JSON at well-known paths. Fetch structured data directly instead of parsing HTML.**

---

Shopify serves the same product catalog you see in the storefront as JSON at a small number of well-known URLs. These endpoints are unauthenticated on almost every Shopify store, return clean, structured records, and pageinate deterministically — which makes them dramatically simpler to scrape than the rendered HTML.

Before you reach for a headless browser or a Cheerio selector, try the JSON endpoints first.

## The two endpoints you need {#endpoints}

For any Shopify storefront at `https://<store>.com` (or a `.myshopify.com` subdomain), the following paths generally work:

- **`/collections.json`** — lists all public collections, with handles, titles, and IDs.
- **`/collections/{handle}/products.json?limit=250&page=N`** — lists products in a collection, up to 250 per page, with variants, prices, images, tags, and options.
- **`/products.json?limit=250&page=N`** — lists all products in the store, if you don't need the collection grouping.

`limit=250` is the maximum Shopify accepts. `page` is 1-indexed. Keep incrementing `page` until the `products` array comes back empty — that's how you know you've paginated to the end.

## Discovering collections {#collections}

```js
import { gotScraping } from 'got-scraping';

const store = 'https://www.allbirds.com';

const { body } = await gotScraping({
    url: `${store}/collections.json`,
    responseType: 'json',
});

for (const collection of body.collections) {
    console.log(collection.handle, '-', collection.title);
}
```

The response includes `handle` (the URL slug you plug into the next endpoint), `title`, `id`, `updated_at`, and a `products_count`.

## Paginating a collection {#pagination}

```js
import { gotScraping } from 'got-scraping';
import { Dataset } from 'crawlee';

const store = 'https://www.allbirds.com';
const handle = 'mens-shoes';

for (let page = 1; ; page++) {
    const { body } = await gotScraping({
        url: `${store}/collections/${handle}/products.json?limit=250&page=${page}`,
        responseType: 'json',
    });

    if (!body.products?.length) break;

    for (const product of body.products) {
        await Dataset.pushData({
            id: product.id,
            handle: product.handle,
            title: product.title,
            vendor: product.vendor,
            productType: product.product_type,
            tags: product.tags,
            variants: product.variants.map((v) => ({
                id: v.id,
                title: v.title,
                price: v.price,
                available: v.available,
                sku: v.sku,
            })),
            images: product.images.map((i) => i.src),
            url: `${store}/products/${product.handle}`,
        });
    }
}
```

Each product record contains the fields you'd normally piece together from multiple HTML pages: title, vendor, tags, description HTML, image URLs, and one entry per variant with price, availability, and SKU.

## Why prefer this over HTML scraping {#why-json}

Scraping the rendered storefront works, but for a typical mid-sized Shopify store it means:

- Loading a JS-heavy page for each of hundreds or thousands of product URLs.
- Parsing prices, variants, and stock state out of markup that changes with every theme update.
- Handling infinite-scroll or "load more" widgets on collection pages.

The JSON endpoints skip all of that. A store with 5,000 products across 40 collections is typically ~20-40 requests in total, each a small JSON payload, with no browser needed. On the Apify platform that's the difference between a run that finishes in seconds on `apify/actor-node` and one that spins up `apify/actor-node-puppeteer-chrome` for tens of minutes.

## Caveats {#caveats}

- **The endpoints can be disabled.** A small number of stores block `/products.json` at the CDN or return an empty list. Detect this by checking the first page's response and fall back to HTML if needed.
- **They only return published, publicly visible products.** Draft or password-protected products are excluded — that's usually what you want.
- **Rate limits still apply.** Space out requests, and use [Apify Proxy](/platform/proxy) if you're pulling large catalogs.
- **Hard cap of ~10,000 records per collection.** Shopify limits `page` traversal on `products.json`. For very large collections, page through sub-collections or use `/products.json` with the store-wide `page` cursor, and reconcile with `/collections/{handle}.json` for grouping.

## When you still need HTML {#when-html}

Some things aren't in the JSON payload — for example, the on-page recommended-products carousel, review widgets, or storefront-specific metafields that a theme surfaces but the JSON hides. For those, scrape the individual `/products/{handle}` pages, but only after you've used the JSON endpoint to enumerate the products you actually need to visit.
