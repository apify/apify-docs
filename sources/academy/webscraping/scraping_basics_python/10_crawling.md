---
title: Crawling websites with Python
sidebar_label: Crawling websites
description: Lesson about building a Python application for watching prices. Using the HTTPX library to follow links to individual product pages.
sidebar_position: 10
slug: /scraping-basics-python/crawling
---

import Exercises from './_exercises.mdx';

**In this lesson, we'll follow links to individual product pages. We'll use HTTPX to download them, and BeautifulSoup to process them.**

---

In previous lessons we've managed to download HTML code of a single page, parse it with BeautifulSoup, and extract relevant data from it. We'll do the same now for each of the products.

Thanks to the refactoring we have functions ready for each of the tasks, so we won't need to repeat ourselves in our code. This is what you should see in your editor now:

```py
import httpx
from bs4 import BeautifulSoup
from decimal import Decimal
import csv
import json
from urllib.parse import urljoin

def download(url):
    response = httpx.get(url)
    response.raise_for_status()

    html_code = response.text
    return BeautifulSoup(html_code, "html.parser")

def parse_product(product, base_url):
    title_element = product.select_one(".product-item__title")
    title = title_element.text.strip()
    url = urljoin(base_url, title_element["href"])

    price_text = (
        product
        .select_one(".price")
        .contents[-1]
        .strip()
        .replace("$", "")
        .replace(",", "")
    )
    if price_text.startswith("From "):
        min_price = Decimal(price_text.removeprefix("From "))
        price = None
    else:
        min_price = Decimal(price_text)
        price = min_price

    return {"title": title, "min_price": min_price, "price": price, "url": url}

def export_csv(file, data):
    fieldnames = list(data[0].keys())
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    for row in data:
        writer.writerow(row)

def export_json(file, data):
    def serialize(obj):
        if isinstance(obj, Decimal):
            return str(obj)
        raise TypeError("Object not JSON serializable")

    json.dump(data, file, default=serialize, indent=2)

listing_url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
listing_soup = download(listing_url)

data = []
for product in listing_soup.select(".product-item"):
    item = parse_product(product, listing_url)
    data.append(item)

with open("products.csv", "w") as file:
    export_csv(file, data)

with open("products.json", "w") as file:
    export_json(file, data)
```

## Extracting vendor name

Each product URL points to a so-called _product detail page_, or PDP. If we open one of the product URLs in the browser, e.g. the one about [Sony XBR-950G BRAVIA](https://warehouse-theme-metal.myshopify.com/products/sony-xbr-65x950g-65-class-64-5-diag-bravia-4k-hdr-ultra-hd-tv), we can see that it contains a vendor name, [SKU](https://en.wikipedia.org/wiki/Stock_keeping_unit), number of reviews, product images, product variants, stock availability, description, and perhaps more.

![Product detail page](./images/pdp.png)

Depending on what's valuable for our use case, we can now use the same techniques as in previous lessons to extract any of the above. As a demonstration, let's scrape the vendor name. In browser DevTools we can see that the HTML around the vendor name has the following structure:

```html
<div class="product-meta">
  <h1 class="product-meta__title heading h1">
    Sony XBR-950G BRAVIA 4K HDR Ultra HD TV
  </h1>
  <div class="product-meta__label-list">
    ...
  </div>
  <div class="product-meta__reference">
    <!-- highlight-next-line -->
    <a class="product-meta__vendor link link--accented" href="/collections/sony">
        <!-- highlight-next-line -->
        Sony
    <!-- highlight-next-line -->
    </a>
    <span class="product-meta__sku">
      SKU:
      <span class="product-meta__sku-number">SON-985594-XBR-65</span>
    </span>
  </div>
  <a href="#product-reviews" class="product-meta__reviews-badge link" data-offset="30">
    <div class="rating">
      <div class="rating__stars" role="img" aria-label="4.0 out of 5.0 stars">
        ...
      </div>
      <span class="rating__caption">3 reviews</span>
    </div>
  </a>
  ...
</div>
```

It looks like using a CSS selector to locate element having the `product-meta__vendor` class and extracting its text should be enough to get the vendor name as a string:

```py
vendor = product_soup.select_one(".product-meta__vendor").text.strip()
```

But where do we put this line in our program?

## Crawling product detail pages

In the `data` loop we already go through all the products. Let's expand it so it also includes downloading the product detail page, parsing it, extracting the name of the vendor, and adding it as a new dictionary key to the item:

```py
...

listing_url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
listing_soup = download(listing_url)

data = []
for product in listing_soup.select(".product-item"):
    item = parse_product(product, listing_url)
    # highlight-next-line
    product_soup = download(item["url"])
    # highlight-next-line
    item["vendor"] = product_soup.select_one(".product-meta__vendor").text.strip()
    data.append(item)

...
```

If you run the program now, it will take longer to finish, as it now makes 24 more HTTP requests, but in the end it should produce exports with a new field containing the vendor:

<!-- eslint-skip -->
```json title=products.json
[
  {
    "title": "JBL Flip 4 Waterproof Portable Bluetooth Speaker",
    "min_price": "74.95",
    "price": "74.95",
    "url": "https://warehouse-theme-metal.myshopify.com/products/jbl-flip-4-waterproof-portable-bluetooth-speaker",
    "vendor": "JBL"
  },
  {
    "title": "Sony XBR-950G BRAVIA 4K HDR Ultra HD TV",
    "min_price": "1398.00",
    "price": null,
    "url": "https://warehouse-theme-metal.myshopify.com/products/sony-xbr-65x950g-65-class-64-5-diag-bravia-4k-hdr-ultra-hd-tv",
    "vendor": "Sony"
  },
  ...
]
```

## Extracting price

Being able to scrape vendor name is nice, but the main reason we started peeking at the detail pages in the first place was to figure out how to get a price for each product, because from the product listing we could only scrape the min price. And we're building a Python application for watching prices, remember?

Looking at [Sony XBR-950G BRAVIA](https://warehouse-theme-metal.myshopify.com/products/sony-xbr-65x950g-65-class-64-5-diag-bravia-4k-hdr-ultra-hd-tv), it's apparent that the listing features only min prices, because some of the products have variants, each with a different price. And different stock availability. And different SKU…

![Morpheus revealing the existence of product variants](images/variants.png)

In the next lesson we'll scrape the product detail pages in such way that each product variant gets represented as a separate item in our dataset.

---

<Exercises />

TODO
