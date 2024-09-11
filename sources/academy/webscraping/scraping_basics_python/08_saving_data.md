---
title: Saving data with Python
sidebar_label: Saving data
description: Lesson about building a Python application for watching prices. Using standard library to save data scraped from product listing pages in popular formats such as CSV or JSON.
sidebar_position: 8
slug: /scraping-basics-python/saving-data
---

import Exercises from './_exercises.mdx';
import Details from '@theme/Details';

**In this lesson, we'll save the data we scraped in the popular formats, such as CSV or JSON. We'll use Python's standard library to export the files.**

---

We managed to scrape data about products and print them, with each product separated by a new line, and each field separated by the `|` character. That's already a structured text that someone could parse, i.e., read programmatically.

```text
$ python main.py
JBL Flip 4 Waterproof Portable Bluetooth Speaker | 74.95 | 74.95
Sony XBR-950G BRAVIA 4K HDR Ultra HD TV | 1398.00 | None
...
```

However, the format of the text is rather _ad-hoc_ and does not adhere to any specific standard that others could follow. It's unclear what to do if a product title already contains the `|` character, or how to represent multi-line product descriptions. No ready-made library can handle all the parsing.

We should use widely popular formats that have well-defined solutions for all the corner cases and which other programs can read without much effort. Two such formats are CSV (_Comma-separated values_) and JSON (_JavaScript Object Notation_).

## Collecting data

To export data in a certain format, we first need to store it all in one variable. Let's make three changes to our program:

```py
from decimal import Decimal
import httpx
from bs4 import BeautifulSoup

url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
response = httpx.get(url)
response.raise_for_status()

html_code = response.text
soup = BeautifulSoup(html_code, "html.parser")

# highlight-next-line
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

    # highlight-next-line
    data.append({"title": title, "min_price": min_price, "price": price})

# highlight-next-line
print(data)
```

Before looping over the products, we prepare an empty list. Then, instead of printing each line, we append the data of each product to the list in the form of a Python dictionary. At the end of the program, we print the entire list.

```text
$ python main.py
[{'title': 'JBL Flip 4 Waterproof Portable Bluetooth Speaker', 'min_price': Decimal('74.95'), 'price': Decimal('74.95')}, {'title': 'Sony XBR-950G BRAVIA 4K HDR Ultra HD TV', 'min_price': Decimal('1398.00'), 'price': None}, ...]
```

:::tip Pretty print

If you find the complex data structures printed by `print()` difficult to read, try using [`pp()`](https://docs.python.org/3/library/pprint.html#pprint.pp) from the `pprint` module instead.

:::

## Saving data as CSV

TODO

## Saving data as JSON

TODO

---

<Exercises />
