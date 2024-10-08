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

```python
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
data = [
    parse_product(product, listing_url)
    for product in listing_soup.select(".product-item")
]

with open("products.csv", "w") as file:
    export_csv(file, data)

with open("products.json", "w") as file:
    export_json(file, data)
```

## Crawling product URLs

In a new loop below the list comprehension we'll go through the product URLs, download and parse each of them, and extract some new data, e.g. name of the vendor. Then we'll save the data to the `product` dictionary as a new key.

```python
...

listing_url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
listing_soup = download(listing_url)
data = [
    parse_product(product, listing_url)
    for product in listing_soup.select(".product-item")
]

# highlight-next-line
for product in data:
    # highlight-next-line
    product_soup = download(product["url"])
    # highlight-next-line
    product["vendor"] = product_soup.select_one(".product-meta__vendor").text.strip()

...
```

If you run the program now, it will take longer to finish, but should produce exports with a new field containing the vendor:

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

<!--
- show image of how we figured out the vendor or have a note about devtools

caveats:
- all the info in the listing is already at the product page, so it's a bit redundant to scrape the products in the listing, we could just scrape the links
- scrape price for the variants

caveats and reasons for framework:
- it's slow
- logging
- a lot of boilerplate code
- anti-scraping protection
- browser crawling support
-->


:::danger Work in progress

This course is incomplete. As we work on adding new lessons, we would love to hear your feedback. You can comment right here under each page or [file a GitHub Issue](https://github.com/apify/apify-docs/issues) to discuss a problem.

This particular page is a placeholder for several lessons which should teach crawling.

:::
