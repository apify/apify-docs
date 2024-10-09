---
title: Parsing product variants with Python
sidebar_label: Parsing product variants
description: Lesson about building a Python application for watching prices. Using browser DevTools to figure out how to parse product variants and exporting them as separate items.
sidebar_position: 11
slug: /scraping-basics-python/parsing-variants
---

:::danger Work in progress

This course is incomplete. As we work on adding new lessons, we would love to hear your feedback. You can comment right here under each page or [file a GitHub Issue](https://github.com/apify/apify-docs/issues) to discuss a problem.

:::

<!--

import Exercises from './_exercises.mdx';

**Blah blah.**

---

We'll need to change our code so that instead of having one item per product in the listing, we let the code which handles product detail pages to decide how many items it generates.

But first let's see if we can

The design of our program now assumes that a single URL from the products listing represents a single product. As it turns out, each URL from the product listing can represent one or more products. Instead of having one item per product in the listing, we should let the code which handles product detail pages to decide how many items it generates.

```python
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
-->

