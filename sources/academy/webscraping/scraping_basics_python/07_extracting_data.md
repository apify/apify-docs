---
title: Extracting data from HTML with Python
sidebar_label: Extracting data from HTML
description: Lesson about building a Python application for watching prices. Using string manipulation to extract and clean data scraped from the product listing page.
sidebar_position: 7
slug: /scraping-basics-python/extracting-data
---

import Exercises from './_exercises.mdx';

**In this lesson we'll finish extracting product data from the downloaded HTML. With help of basic string manipulation we'll focus on cleaning and correctly representing the product price.**

---

Locating the right HTML elements is the first step of a successful data extraction, so it's no surprise that we're already close to having the data in the correct form. The last bit that still requires our attention is the price:

```text
$ python main.py
JBL Flip 4 Waterproof Portable Bluetooth Speaker | $74.95
Sony XBR-950G BRAVIA 4K HDR Ultra HD TV | From $1,398.00
...
```

Let's summarize what stands in our way if we want to have it in our Python program as a number:

- A dollar sign precedes the number,
- the number contains decimal commas for better human readability, and
- some prices start with `From`, which reveals there is a certain complexity in how the shop deals with prices.

## Representing price

The last bullet point is the most important to figure out before we start coding. We thought we'll be scraping numbers, but in the middle of our effort, we discovered that the price is actually a range.

It's because some products have variants with different prices. Later in the course we'll get to crawling, i.e. following links and scraping data from more than just one page. That will allow us to get exact prices for all the products, but for now let's extract just what's in the listing.

Ideally we'd go and discuss the problem with those who are about to use the resulting data. For their purposes, is the fact that some prices are just minimum prices important? What would be the most useful representation of the range for them? Maybe they'd tell us that it's okay if we just remove the `From` prefix?

```py
price_text = product.select_one(".price").contents[-1]
price = price_text.removeprefix("From ")
```

In other cases, they'd tell us the data must include the range. And in cases when we just don't know, the safest option is to include all the information we have and leave the decision on what's important to later stages. One approach could be having the exact and minimum prices as separate values. If we don't know the exact price, we leave it empty:

```py
price_text = product.select_one(".price").contents[-1]
if price_text.startswith("From "):
    min_price = price_text.removeprefix("From ")
    price = None
else:
    min_price = price_text
    price = min_price
```

:::tip Built-in string methods

If you're not proficient in Python's string methods, [.startswith()](https://docs.python.org/3/library/stdtypes.html#str.startswith) checks the beginning of a given string, and [.removeprefix()](https://docs.python.org/3/library/stdtypes.html#str.removeprefix) removes something from the beginning of a given string.

:::

The whole program would look like this:

```py
import httpx
from bs4 import BeautifulSoup

url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
response = httpx.get(url)
response.raise_for_status()

html_code = response.text
soup = BeautifulSoup(html_code, "html.parser")

for product in soup.select(".product-item"):
    title = product.select_one(".product-item__title").text

    price_text = product.select_one(".price").contents[-1]
    if price_text.startswith("From "):
        min_price = price_text.removeprefix("From ")
        price = None
    else:
        min_price = price_text
        price = min_price

    print(title, min_price, price, sep=" | ")
```

## Removing white space

Often, the strings we extract from a web page start or end with some amount of whitespace, typically space characters or newline characters, which come from the [indentation](https://en.wikipedia.org/wiki/Indentation_(typesetting)#Indentation_in_programming) of the HTML tags.

We call the operation of removing whitespace _stripping_ or _trimming_, and it's so useful in many applications that programming languages and libraries include ready-made tools for it. Let's add Python's built-in [.strip()](https://docs.python.org/3/library/stdtypes.html#str.strip):

```py
title = product.select_one(".product-item__title").text.strip()

price_text = product.select_one(".price").contents[-1].strip()
```

:::info Handling strings in Beautiful Soup

Beautiful Soup offers several attributes when it comes to working with strings:

- `.string`, which often is like `.text`,
- `.strings`, which [returns a list of all nested textual nodes](https://beautiful-soup-4.readthedocs.io/en/latest/#strings-and-stripped-strings),
- `.stripped_strings`, which does the same but with whitespace removed.

These might be useful in some complex scenarios, but in our case, they won't make scraping the title or price any shorter or more elegant.

:::

## Removing dollar sign and commas

We got rid of the `From` and possible whitespace, but we still can't save the price as a number in our Python program:

```py
>>> price = "$1,998.00"
>>> float(price)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: could not convert string to float: '$1,998.00'
```

:::tip Interactive Python

The demonstration above is inside the Python's [interactive REPL](https://realpython.com/interacting-with-python/). It's a useful playground where you can try how code behaves before you use it in your program.

:::

We need to remove the dollar sign and the decimal commas. For this type of cleaning, [regular expressions](https://docs.python.org/3/library/re.html) are often the best tool for the job, but in this case [`.replace()`](https://docs.python.org/3/library/stdtypes.html#str.replace) is also sufficient:

```py
price_text = (
    product
    .select_one(".price")
    .contents[-1]
    .strip()
    .replace("$", "")
    .replace(",", "")
)
```

## Representing money in programs

Now we should be able to add `float()`, so that we have the prices not as a text, but as numbers:

```py
if price_text.startswith("From "):
    min_price = float(price_text.removeprefix("From "))
    price = None
else:
    min_price = float(price_text)
    price = min_price
```

Great! Only if we didn't overlook an important pitfall called [floating-point error](https://en.wikipedia.org/wiki/Floating-point_error_mitigation). In short, computers save `float()` numbers in a way which isn't always reliable:

```py
>>> 0.1 + 0.2
0.30000000000000004
```

These errors are small and usually don't matter, but sometimes they can add up and cause unpleasant discrepancies. That's why it's typically best to avoid `float()` when working with money. Let's instead use Python's built-in [`Decimal()`](https://docs.python.org/3/library/decimal.html) type:

```py
import httpx
from bs4 import BeautifulSoup
from decimal import Decimal

url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
response = httpx.get(url)
response.raise_for_status()

html_code = response.text
soup = BeautifulSoup(html_code, "html.parser")

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

    print(title, min_price, price, sep=" | ")
```

If we run the code above, we have nice, clean data about all the products!

```text
$ python main.py
JBL Flip 4 Waterproof Portable Bluetooth Speaker | 74.95 | 74.95
Sony XBR-950G BRAVIA 4K HDR Ultra HD TV | 1398.00 | None
...
```

Well, not to spoil the excitement, but in its current form, the data isn't very useful. In the next lesson we'll save the product details to a file which data analysts can use or other programs can read.

---

<Exercises />

### Scrape units on stock

Change our scraper so that it extracts how many units of each product are on stock. Your program should print the following. Note the unit amounts at the end of each line:

```text
JBL Flip 4 Waterproof Portable Bluetooth Speaker 672
Sony XBR-950G BRAVIA 4K HDR Ultra HD TV 77
Sony SACS9 10" Active Subwoofer 7
Sony PS-HX500 Hi-Res USB Turntable 15
Klipsch R-120SW Powerful Detailed Home Speaker - Unit 0
Denon AH-C720 In-Ear Headphones 236
...
```

<details>
  <summary>Solution</summary>

  ```py
  import httpx
  from bs4 import BeautifulSoup

  url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
  response = httpx.get(url)
  response.raise_for_status()

  html_code = response.text
  soup = BeautifulSoup(html_code, "html.parser")

  for product in soup.select(".product-item"):
      title = product.select_one(".product-item__title").text.strip()

      units_text = (
          product
          .select_one(".product-item__inventory")
          .text
          .removeprefix("In stock,")
          .removeprefix("Only")
          .removesuffix(" left")
          .removesuffix("units")
          .strip()
      )
      if "Sold out" in units_text:
          units = 0
      else:
          units = int(units_text)

      print(title, units)
  ```

</details>

### Use regular expressions

Simplify the code from previous exercise. Use [regular expressions](https://docs.python.org/3/library/re.html) to parse the number of units. You can match digits using a range like `[0-9]` or by a special sequence `\d`. To match more characters of the same type you can use `+`.

<details>
  <summary>Solution</summary>

  ```py
  import re
  import httpx
  from bs4 import BeautifulSoup

  url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
  response = httpx.get(url)
  response.raise_for_status()

  html_code = response.text
  soup = BeautifulSoup(html_code, "html.parser")

  for product in soup.select(".product-item"):
      title = product.select_one(".product-item__title").text.strip()

      units_text = product.select_one(".product-item__inventory").text
      if re_match := re.search(r"\d+", units_text):
          units = int(re_match.group())
      else:
          units = 0

      print(title, units)
  ```

</details>

### Scrape publish dates of F1 news

Download Guardian's page with the latest F1 news and use Beautiful Soup to parse it. Print titles and publish dates of all the listed articles. This is the URL:

```text
https://www.theguardian.com/sport/formulaone
```

Your program should print something like the following. Note the dates at the end of each line:

```text
Wolff confident Mercedes are heading to front of grid after Canada improvement 2024-06-10
Frustrated Lando Norris blames McLaren team for missed chance 2024-06-09
Max Verstappen wins Canadian Grand Prix: F1 – as it happened 2024-06-09
...
```

Hints:

- HTML's `<time>` tag can have an attribute `datetime`, which [contains data in a machine-readable format](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time), such as the ISO 8601.
- Beautiful Soup gives you [access to attributes as if they were dictionary keys](https://beautiful-soup-4.readthedocs.io/en/latest/#attributes).
- In Python you can create `datetime` objects using `datetime.fromisoformat()`, a [built-in method for parsing ISO 8601 strings](https://docs.python.org/3/library/datetime.html#datetime.datetime.fromisoformat).
- To get just the date part, you can call `.date()` on any `datetime` object.

<details>
  <summary>Solution</summary>

  ```py
  import httpx
  from bs4 import BeautifulSoup
  from datetime import datetime

  url = "https://www.theguardian.com/sport/formulaone"
  response = httpx.get(url)
  response.raise_for_status()

  html_code = response.text
  soup = BeautifulSoup(html_code, "html.parser")

  for article in soup.select("#maincontent ul li"):
      title = article.select_one("h3").text.strip()

      time_iso = article.select_one("time")["datetime"].strip()
      published_at = datetime.fromisoformat(time_iso)
      published_on = published_at.date()

      print(title, published_on)
  ```

</details>
