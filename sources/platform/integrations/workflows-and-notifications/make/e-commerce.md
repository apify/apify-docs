---
title: Make - E-commerce Scraping Tool integration
description: Run the Apify E-commerce Scraping Tool in Make to extract product, review, seller, and marketplace data from retail sites and delivery platforms.
sidebar_label: E-commerce
slug: /integrations/make/e-commerce
toc_max_heading_level: 4
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

Use the Apify E-commerce Scraping Tool module in [Make](https://www.make.com/) to extract product, review, seller, and influencer-storefront data from hundreds of retail sites and marketplaces.

<ThirdPartyDisclaimer />

## Apify E-commerce Scraping Tool

The E-commerce Scraping Tool from [Apify](https://apify.com/) lets you extract product, review, seller, and influencer-storefront data from hundreds of retail sites and marketplaces, including Amazon, eBay, Best Buy, Home Depot, IKEA, Alibaba, Allegro, Alza, Idealo, Costco, Coles, and Ashley Furniture, plus delivery platforms like Instacart and DoorDash. You can pass direct product or category URLs, run keyword searches across multiple marketplaces in one go, or pull localized results from Google Shopping.

A single module, **Extract using E-commerce Scraping Tool**, powers six operation modes, each exposing only the input fields relevant to it. Every mode is powered by the [E-commerce Scraping Tool](https://console.apify.com/actors/2APbAvDfNDOWXbkWf) Actor and can be combined freely inside one Make scenario.

| Mode | What it returns |
| --- | --- |
| **Product Details** | Product data (title, price, brand, images, rating, variants, etc.) from detail pages, category listings, or a keyword search. Can include an AI-generated summary. |
| **Reviews** | Customer reviews for products, from detail/listing URLs or a keyword search, with sorting options. |
| **Sellers** | Seller / store profile data, including reputation and contact details, from seller profile URLs. |
| **Search Engine** | Product, review, or seller results pulled from Google Shopping-style results, localized by country/region/city. |
| **Food Delivery** | Products and reviews from food-delivery marketplaces (Instacart, DoorDash), localized by delivery address. |
| **Influencer storefronts** | Posts and (optionally) the products featured by influencers, from influencer storefront URLs. |

To use this module, you need an [Apify account](https://console.apify.com/sign-up) and either an OAuth connection (recommended) or an [API token](https://docs.apify.com/platform/integrations/api#api-token). Running the Actor consumes Apify platform usage on your account. Once connected, you can pipe results straight into pricing dashboards, repricing tools, CRMs, sheets, or any other system in your Make scenario.

## Connect Apify E-commerce Scraping Tool

1. Create an account at [console.apify.com](https://console.apify.com/). You can sign up using your email, Gmail, or GitHub account.

    ![Apify sign-up page](images/e-commerce/apify-sign-up-page.webp)

1. To connect your Apify account to Make, you can use an OAuth connection (recommended) or an Apify API token. To get the token, head to the **Settings > API & Integrations** tab at [console.apify.com/settings/integrations](https://console.apify.com/settings/integrations).

    ![Apify Console token for Make](images/apify-console-token-for-make.png)

1. Find your token under **Personal API tokens**. Alternatively, create a new API token with customizable permissions by clicking **+ Create a new token**.
1. **Copy the API token** and go back to Make.

    ![Apify token on Make](images/Apify_token_on_Make.png)

1. In Make, click **Add** to open the **Create a connection** dialog, select the **Apify API Token** connection type, paste the token into the **API token** field, name your connection, and click **Save**.

    ![Make API token field](images/e-commerce/apify-token-for-module-e-commerce.webp)

Once connected, you can build workflows to automate e-commerce data extraction (competitor price tracking, catalog comparisons, review mining, seller analysis) and pipe the results into your applications.

## Module: Extract using E-commerce Scraping Tool

This is a **search** module: it returns one bundle per item it collects (product, review, seller, etc.). When a run produces many items, the module outputs many bundles that the scenario iterates over automatically.

### How it works

1. The module starts an Actor run with your input.
1. It polls the run until it finishes (this can take from seconds to several minutes depending on how much data you request).
1. It reads the run's dataset and outputs each item as a bundle.

If the run does not finish successfully, the module returns an error with the run's status message so you can adjust your input and try again.

:::info Synchronous run timeout

This module runs the Actor **synchronously**: the scenario step waits for the run to finish before continuing. Make imposes a hard timeout on synchronous operations, and the limit varies based on your Make plan. If the Actor run takes longer than that timeout, the data will not be fully returned.

To keep runs fast and within the timeout, use the per-mode **maximum results** fields to cap how much data each run collects. For very large extractions, split the work across multiple scenario runs.

:::

:::tip Provide a data source

Each mode needs at least one data source: a URL, keyword, or profile URL. A mode with no source has nothing to work with.

:::

## Operation modes

Select an **Operation Type** first; the input fields below appear based on your choice. Each mode lists its input fields, the data it extracts, and a shortened sample of its output.

The samples show the fields the Make module exposes with labels for mapping. When **Include additional properties** is enabled, extra source-specific fields (SKUs, variants, badges, store context, and similar) are returned nested under `additionalProperties`.

### Product Details

Pull rich product data in product mode. You can feed the module direct **product detail URLs**, **category/listing URLs**, or a **keyword + a list of marketplaces** to search across (Amazon, eBay, Best Buy, IKEA, Allegro, Alza, Idealo, and many more). You can also pick a scrape mode (`Auto`, `Browser`, or `HTTP`) and cap the total number of products.

| Field | Description |
| --- | --- |
| **Mode** | How pages are loaded: `Auto` (default, lets the tool decide), `Browser` (full page rendering), or `HTTP` (lightweight requests). |
| **Product detail URLs** | Direct URLs to individual product pages. |
| **Category listing URLs** | URLs to category/listing pages containing multiple products. |
| **Keyword for search** | Keyword to find products across marketplaces. |
| **Marketplaces for keyword search** | Marketplaces to run the keyword search on (loaded dynamically). |
| **Include additional properties** | Include extra fields in the response (default: on). |
| **AI summary data points** | Data point(s) to send to AI for summarization. |
| **AI summary custom prompt** | Custom instructions for the AI summary. Leave blank to use Apify's default prompt. |
| **Total maximum products** | Cap on the number of products collected during the run. |

For each product, you will extract:

- **Product identity**: product name, brand, URL, SKU, MPN, GTIN-13, handle, and product type.
- **Pricing**: current offer price and currency, on-sale flag, price range, and regular price range.
- **Inventory and variants**: available variants (size, color, SKU ID), options, stock signals, and weight.
- **Media**: primary image, full image gallery (with dimensions, alt text, and positions).
- **Descriptions & marketing copy**: long description, HTML description, tags, features, and enticements.
- **Reviews summary**: average rating, total review count.
- **Additional metadata**: age groups, style number, color, created/updated timestamps, and any extra retailer-specific properties.
- **Optional AI summary**: when AI summary data points are set, the module returns an AI-generated summary of the chosen fields, using either Apify's default prompt or your custom prompt (see [AI summary](#ai-summary-product-details-mode) below).

```json title="Product Details bundle (shortened)"
[
    {
        "url": "https://www.example.com/product/wireless-headphones",
        "title": "Example Wireless Headphones",
        "brand": { "slogan": "Example Audio" },
        "mpn": "EX-WH-100",
        "image": "https://www.example.com/images/wireless-headphones.jpg",
        "description": "Over-ear wireless headphones with active noise cancellation and 40h battery life.",
        "offers": {
            "price": "199.00",
            "priceCurrency": "USD"
        },
        "rating": 4.5,
        "reviewCount": 1200,
        "aggregateRating": {
            "ratingValue": "4.5",
            "ratingCount": 1200
        },
        "additionalProperties": {
            "sku": "EX-WH-100",
            "gtin13": "1234567890123",
            "color": "Black",
            "onSale": true,
            "priceRange": { "min": 199.00, "max": 249.00 }
        }
    },
    {
        "url": "https://www.example.com/product/building-blocks-set",
        "title": "Example Building Blocks Set",
        "brand": { "slogan": "Example Toys" },
        "image": "https://www.example.com/images/building-blocks-set.jpg",
        "offers": {
            "price": "59.99",
            "priceCurrency": "USD"
        },
        "rating": 4.8,
        "reviewCount": 340,
        "additionalProperties": {
            "sku": "EX-BB-200",
            "ageGroups": ["18+"],
            "features": ["939 pieces", "Display-ready"]
        }
    }
]
```

#### AI summary (Product Details mode)

In **Product Details** mode you can have Apify generate an AI summary of the collected data:

- **AI summary data points**: pick which fields to feed into the AI (the available list is loaded dynamically from the Actor).
- **AI summary custom prompt**: optionally tell the AI exactly how to process those data points. If left blank, Apify's default prompt is used.

The result is returned in the `aiSummary` output field.

### Reviews

Mine customer reviews in review mode. You can pass **review detail URLs**, **review listing URLs**, or a **keyword + list of marketplaces** to search. Choose how reviews are sorted and set a cap on the total number of reviews.

| Field | Description |
| --- | --- |
| **Review detail URLs** | Product detail pages to read reviews from. |
| **Review listing URLs** | Listing pages from which to collect all reviews. |
| **Keyword for search** | Keyword to find product reviews across marketplaces. |
| **Marketplaces for keyword search** | Marketplaces to run the review keyword search on. |
| **Review sort type** | `Most recent` (default), `Most relevant`, `Most helpful`, `Highest rated`, or `Lowest rated`. |
| **Include additional review properties** | Include extra fields in the response (default: on). |
| **Total maximum reviews** | Cap on the number of reviews collected during the run. |

For each review, you will extract:

- **Review content**: review text/body and review title.
- **Ratings**: star rating and helpful-vote count.
- **Reviewer profile**: reviewer name or username, verified-buyer flag, and (where available) location.
- **Timestamps**: review date and timestamp.
- **Product association**: URL, name, and ID of the product the review belongs to.
- **Additional review properties**: variant purchased (size, color), media attachments (images/videos), and marketplace-specific metadata.

:::note Marketplace differences

Some sort options and extended review properties depend on the marketplace. If a marketplace doesn't support the requested sort, the tool falls back to the default sort. Review-heavy sites may require residential proxies and browser rendering, which are billed as flat per-product add-ons in the [Actor's pricing model](https://apify.com/apify/e-commerce-scraping-tool/pricing).

:::

```json title="Reviews bundle (shortened)"
[
    {
        "productUrl": "https://www.example.com/product/wireless-headphones",
        "author": "Jane D.",
        "datePublished": "2026-03-14",
        "reviewBody": "Battery easily lasts a full week of commuting and the noise cancellation is excellent.",
        "reviewRating": {
            "ratingValue": 5,
            "bestRating": 5,
            "worstRating": 1
        },
        "additionalProperties": {
            "title": "Best headphones I've owned",
            "verifiedPurchase": true,
            "helpfulCount": 42,
            "variant": { "color": "Black" }
        }
    },
    {
        "productUrl": "https://www.example.com/product/wireless-headphones",
        "author": "customer_02",
        "datePublished": "2026-02-02",
        "reviewBody": "Comfortable and lightweight, but I expected stronger noise cancellation at this price.",
        "reviewRating": {
            "ratingValue": 3,
            "bestRating": 5,
            "worstRating": 1
        },
        "additionalProperties": {
            "title": "Good, not great",
            "verifiedPurchase": true,
            "helpfulCount": 8,
            "variant": { "color": "Silver" }
        }
    }
]
```

### Sellers

Map the vendor side of a marketplace in seller mode. Provide one or more **seller profile URLs** (Amazon storefronts, eBay seller pages, Alibaba supplier pages, etc.) and set a cap on the number of sellers.

| Field | Description |
| --- | --- |
| **Seller profile URLs** | Seller profile / store page URLs to read. |
| **Total maximum sellers** | Cap on the number of sellers collected during the run. |

For each seller, you will extract:

- **Seller identity**: seller name, store name, seller ID, and storefront URL.
- **Reputation**: aggregate rating, total ratings count, positive feedback percentage, and badges (Top Rated, Pro Seller, etc.).
- **Business details**: business location, country, registration date, and contact info where available.
- **Catalog stats**: number of listed products, categories covered, and (depending on marketplace) shipping origin.
- **Logos and images**: storefront logo and banner URLs.
- **Marketplace-specific fields**: response time, return policy summary, and similar.

```json title="Sellers bundle (shortened)"
[
    {
        "name": "Example Store",
        "url": "https://www.example.com/seller/example-store",
        "sellerEmail": "seller@example.com",
        "sellerPhone": "123 456 789",
        "address": {
            "addressCountry": "US",
            "addressLocality": "Example City"
        },
        "parentOrganization": {
            "name": "Example Holdings",
            "url": "https://www.example.com",
            "additionalName": "Example Group"
        },
        "additionalProperties": {
            "marketplace": "www.example.com",
            "rating": 4.8,
            "ratingsCount": 12000,
            "positiveFeedbackPercent": 97,
            "badges": ["Top Rated Seller"]
        }
    },
    {
        "name": "Second Example Store",
        "url": "https://www.example.com/seller/second-example-store",
        "sellerEmail": "store@example.com",
        "sellerPhone": "234 567 890",
        "address": {
            "addressCountry": "US",
            "addressLocality": "Example Town"
        },
        "additionalProperties": {
            "marketplace": "www.example.com",
            "rating": 4.9,
            "ratingsCount": 3800,
            "positiveFeedbackPercent": 99,
            "badges": ["Pro Seller"]
        }
    }
]
```

### Search Engine

Discover products across the web with Google Shopping-style results. Provide one keyword per line (up to 50), pick the data type, and localize results with country, city, and region (e.g. `us` + `New York`, or `de` + `Bavaria`).

| Field | Description |
| --- | --- |
| **Keyword search** | Search term(s) used to find products, one keyword per line (up to 50). |
| **Mode** | `Google Listing` (default), `Products`, `Reviews`, or `Sellers`. |
| **Country codes** | Country/region for the search context; affects currency, shipping, and availability (default: United States). |
| **City** | City to localize results (e.g. "New York"). |
| **Region** | Region/state to localize results (e.g. "California"). |
| **Include additional properties** | Include extra fields in the products response (default: on). |
| **Maximum products per page** | Cap on products collected from a single results page. |
| **Maximum sellers per product** | Cap on sellers collected per product (when looking at sellers). |
| **Total maximum search engine results** | Overall cap on items (products/sellers/reviews) in this mode. |

For each search result, you will extract:

- **Result metadata**: product title, result URL, source domain, position in the SERP, and thumbnail image.
- **Commercial details**: price, currency, shipping cost (where shown), and condition (new/used/refurbished).
- **Aggregated offers**: number of sellers offering the product and price range across sellers.
- **Rating summary**: average rating and review count when Google surfaces them.
- **Localization**: the country, city, and region the result was returned for.

```json title="Search Engine bundle (shortened)"
[
    {
        "url": "https://www.example.com/product/wireless-earbuds",
        "title": "Example Wireless Earbuds",
        "offers": {
            "price": "149.99",
            "priceCurrency": "USD"
        },
        "rating": 4.6,
        "reviewCount": 5400,
        "keyword": "wireless earbuds",
        "additionalProperties": {
            "source": "Example Store",
            "position": 1,
            "country": "us",
            "city": "Example City"
        }
    },
    {
        "url": "https://www.example.com/product/wireless-earbuds-usb-c",
        "title": "Example Wireless Earbuds (USB-C)",
        "offers": {
            "price": "139.99",
            "priceCurrency": "USD"
        },
        "rating": 4.4,
        "reviewCount": 3100,
        "keyword": "wireless earbuds",
        "additionalProperties": {
            "source": "Second Example Store",
            "position": 2,
            "country": "us",
            "city": "Example City"
        }
    }
]
```

### Food Delivery

Pull localized data from food and grocery delivery platforms (currently Instacart and DoorDash) in delivery mode. Provide a **delivery address** (city, ZIP, or full address) plus either **delivery product URLs**, **delivery listing URLs**, or a **keyword + marketplaces** combination.

| Field | Description |
| --- | --- |
| **Keyword for search** | Keyword to find delivery products across selected delivery marketplaces. |
| **Marketplaces for keyword search** | Delivery marketplaces to search (loaded dynamically). |
| **Delivery product detail URLs** | Direct links to individual delivery product pages. |
| **Delivery listing URLs** | Delivery category/listing pages; products on them are processed automatically. |
| **Delivery address or location** | City, ZIP, or full address used to localize availability and results. |
| **Include extended delivery review data** | Include reviews in the output (default: off). |
| **Total maximum results** | Overall cap on delivery products/reviews collected. |

For each delivery product, you will extract:

- **Product identity**: product name, URL, brand, and category.
- **Pricing and availability**: price, currency, unit price, sale flag, and in-stock status for the selected delivery address.
- **Store/restaurant context**: store name, store URL, and (for DoorDash) restaurant menu category.
- **Media**: product images.
- **Optional reviews**: rating, total review count, and individual review records when extended review data is enabled.

```json title="Food Delivery bundle (shortened)"
[
    {
        "url": "https://www.example.com/delivery/organic-avocados",
        "title": "Organic Avocados, Bag",
        "offers": {
            "price": "6.99",
            "priceCurrency": "USD"
        },
        "rating": 4.6,
        "reviewCount": 120,
        "additionalProperties": {
            "storeName": "Example Grocery",
            "unitPrice": "1.40 each",
            "available": true,
            "deliveryAddress": "12345"
        }
    },
    {
        "url": "https://www.example.com/delivery/margherita-pizza",
        "title": "Margherita Pizza",
        "offers": {
            "price": "16.50",
            "priceCurrency": "USD"
        },
        "additionalProperties": {
            "storeName": "Example Restaurant",
            "available": true,
            "deliveryAddress": "Example City, 12345"
        }
    }
]
```

### Influencer storefronts

Map the social-commerce side of e-commerce by looking at influencer storefront pages (such as Amazon Influencer storefronts) in influencer mode. Provide one or more **influencer URLs** and optionally also pull the promoted products inside each post.

| Field | Description |
| --- | --- |
| **Influencer URLs** | Influencer storefront page URLs to read. |
| **Include products from influencer posts** | Also collect the products featured in the influencer's posts (default: off). |
| **Total maximum influencer results** | Cap on the number of influencer posts/items collected. |

For each influencer post, you will extract:

- **Influencer identity**: handle, display name, storefront URL, and profile image.
- **Post details**: post URL, post type (photo, video, idea list, livestream), caption, and timestamp.
- **Media**: post image or video URLs.
- **Engagement signals**: likes, comments, and views where available.
- **Promoted products** (when product scraping is enabled): the URLs of the products tagged inside the post, returned as a `productUrls` list, with `itemsCount` giving the number of tagged products.

```json title="Influencer storefronts bundle (shortened)"
[
    {
        "influencerUrl": "https://www.example.com/shop/example-creator",
        "type": "Idea list",
        "postId": "post-12345",
        "likes": 1800,
        "itemsCount": 2,
        "productUrls": [
            "https://www.example.com/product/cold-brew-coffee-maker",
            "https://www.example.com/product/porcelain-ramekins"
        ]
    }
]
```

## Example scenario: Extract products to Google Sheets

This example runs the Actor in **Product Details** mode and writes each product to a spreadsheet.

### Step 1: Add the "Extract using E-commerce Scraping Tool" module

Add the module to your scenario as the first step. Choose the **Product Details** operation type and provide a data source (for example, one or more **Product detail URLs** or a **Keyword for search**). Set **Total maximum products** to keep the run within your Make plan's synchronous timeout.

![Example input configuration for the Extract using E-commerce Scraping Tool module](images/e-commerce/apify-example-input.webp)

### Step 2: Add the Google Sheets "Add a Row" module

Add the Google Sheets **Add a Row** (or **Bulk Add Rows**) module after the Extract module. Map product fields from the module output (such as `name`, `offers: price`, `url`, and `rating`) into your spreadsheet columns.

### Step 3: Run the scenario

Run the scenario. The Extract module outputs one bundle per product, and Google Sheets adds a row for each.

![Successful run showing the extracted product bundles returned by the module](images/e-commerce/apify-result-e-commerce.webp)

## Tips and best practices

- **Provide a data source.** Each mode needs at least one URL, keyword, or profile URL.
- **Mind the synchronous timeout.** The module waits for the run to finish; use the per-mode "maximum results" fields to keep runs fast and within your Make plan's limit.
- **Usage is billed to your Apify account.** Larger limits mean more platform usage.
- **Marketplace and AI data-point lists are dynamic.** They're fetched from the Actor, so the available options reflect what the Actor currently supports.
- **Sorting may fall back.** If a marketplace doesn't support the chosen review sort, the tool uses its default order.

## Other scrapers available

There are other native Make apps powered by Apify. Check out Apify for:

- Instagram Data
- TikTok Data
- YouTube Data
- Facebook Data
- Google Search Data
- Google Maps Emails Data
- Amazon Data

And more! You can access any of the 30,000+ Actors on Apify Store by using the [general Apify connections on Make](https://www.make.com/en/integrations/apify).
