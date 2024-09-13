---
title: Getting links from HTML with Python
sidebar_label: Getting links from HTML
description: Lesson about building a Python application for watching prices. Using the Beautiful Soup library to locate links to individual product pages.
sidebar_position: 9
slug: /scraping-basics-python/getting-links
---

import Exercises from './_exercises.mdx';

**In this lesson, we'll locate and extract links to individual product pages. We'll use BeautifulSoup to find the relevant bits of HTML.**

---

The previous lesson concludes our effort to create a scraper. Our program now downloads HTML, locates and extracts data from the markup, and saves the data in a structured and reusable way. For some use cases, this is already enough! In other cases, though, scraping just one page is hardly useful. The data is spread across the website, over several pages.

## Following links

We'll use a technique called crawling, i.e. following links and scraping multiple pages. The algorithm goes like this:

1. Visit the start URL.
1. Extract new URLs (and data), and save them.
1. Visit one of the newly found URLs and save data and/or more URLs from it.
1. Repeat 2 and 3 until you have everything you need.

This will help us figure out the actual prices of products, as right now, for some, we're only getting the min price.

## Introducing functions

Implementing the algorithm requires quite a few changes to our code. However, over the course of the previous lessons, the code of our program grew to almost 50 lines containing downloading, parsing, and exporting:

```py
from decimal import Decimal
import httpx
from bs4 import BeautifulSoup
import csv
import json

url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
response = httpx.get(url)
response.raise_for_status()

html_code = response.text
soup = BeautifulSoup(html_code, "html.parser")

data = []
for product in soup.select(".product-item"):
    title = product.select_one(".product-item__title").text.strip()

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

    data.append({"title": title, "min_price": min_price, "price": price})

with open("products.csv", "w") as file:
    writer = csv.DictWriter(file, fieldnames=["title", "min_price", "price"])
    writer.writeheader()
    for row in data:
        writer.writerow(row)

def serialize(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    raise TypeError("Object not JSON serializable")

with open("products.json", "w") as file:
    json.dump(data, file, default=serialize)
```

Let's introduce several functions which will make the whole thing easier to digest. First, we can turn the beginning of our program into this `download()` function, which takes a URL and returns a `BeautifulSoup` instance:

```py
def download(url):
    response = httpx.get(url)
    response.raise_for_status()

    html_code = response.text
    return BeautifulSoup(html_code, "html.parser")
```

Next, we can put parsing to a `parse_product()` function, which takes the product item element, and returns the dictionary with data:

```py
def parse_product(product):
    title = product.select_one(".product-item__title").text.strip()

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

    return {"title": title, "min_price": min_price, "price": price}
```

Now the CSV export. We'll make a small change here. Having to specify the field names here is not ideal. What if we add more field names in the parsing function? We'd have to always remember we need to go and edit the export function as well. If we could figure out the field names in place, we'd remove this dependency. One way would be to infer the field names from dictionary keys of the first row:

```py
def export_csv(file, data):
    # highlight-next-line
    fieldnames = list(data[0].keys())
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    for row in data:
        writer.writerow(row)
```

:::note Fragile code

The code above assumes that the data variable contains at least one item, and that all the items have the same keys. This isn't robust and could break, but in our program this isn't a problem and omitting these corner cases allows us to keep the code examples more succint.

:::

Last function we'll add will take care of the JSON export:

```py
def export_json(file, data):
    def serialize(obj):
        if isinstance(obj, Decimal):
            return str(obj)
        raise TypeError("Object not JSON serializable")

    json.dump(data, file, default=serialize)
```

Now let's put it all together:

```py
from decimal import Decimal
import httpx
from bs4 import BeautifulSoup
import csv
import json

def download(url):
    ...

def parse_product(product):
    ...

def export_csv(file, data):
    ...

def export_json(file, data):
    ...

url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
soup = download(url)
data = [parse_product(product) in soup.select(".product-item")]

with open("products.csv", "w") as file:
    export_csv(file, data)

with open("products.json", "w") as file:
    export_json(file, data)
```

The program is much easier to read now. With the `parse_product()` function handy we could also replace the convoluted loop with a [list comprehension](https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions).

:::tip Refactoring

We restructured existing code without changing its behavior to improve its structure. This process has a name: [refactoring](https://en.wikipedia.org/wiki/Code_refactoring).

:::
