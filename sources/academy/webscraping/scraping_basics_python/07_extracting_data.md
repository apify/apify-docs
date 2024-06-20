---
title: Extracting data from HTML with Python
sidebar_label: Extracting data from HTML
description: Lesson about building a Python application for watching prices. Using string manipulation to extract and clean data scraped from the product listing page.
sidebar_position: 7
slug: /scraping-basics-python/extracting-data
---

**In this lesson we'll finish extracting product data from the downloaded HTML. With help of basic string manipulation we'll focus on cleaning and correctly representing the product price.**

---

Locating the right HTML elements is the first step of a successful data extraction, so it's no surprise that we're already close to having the data in the correct form. The last bit that still requires our attention is the price:

```text
$ python main.py
JBL Flip 4 Waterproof Portable Bluetooth Speaker $74.95
Sony XBR-950G BRAVIA 4K HDR Ultra HD TV From $1,398.00
Sony SACS9 10" Active Subwoofer $158.00
Sony PS-HX500 Hi-Res USB Turntable $398.00
...
```

Let's summarize what stands in our way if we want to have it in our Python program as a number:

- A dollar sign preceeds the number,
- the number contains decimal commas so it better reads by humans,
- and some prices start with `From`, which reveals there is a certain complexity in how the shop deals with prices.

## Representing price as an interval

The last bullet point is the most important to figure out before we start coding. We thought we'll be scraping numbers, but in the middle of our effort, we discovered that the price is actually an [interval](https://en.wikipedia.org/wiki/Interval_(mathematics)).

In such a situation, we'd normally go and discuss the problem with those who are about to use the resulting data. For their purposes, is the fact that some prices are just minimum prices important? What would be the most useful representation of the interval in the data for them?

Maybe they'd tell us that we can just remove the `From` prefix and it's fine!

```py
price_text = product.select_one(".price").contents[-1]
price = price_text.removeprefix("From ")
```

In other cases, they'd tell us the data must include this information. And in cases when we just don't know, the safest option is to include in the data everything we have from the input and leave the decision on what's important to later stages.

We can represent interval in various ways. One approach could be having min price and max price. For regular prices, these two numbers would be the same. For prices starting with `From`, the max price would be none, because we don't know it:

```py
price_text = product.select_one(".price").contents[-1]
if price_text.startswith("From "):
    min_price = price_text.removeprefix("From ")
    max_price = None
else:
    min_price = price_text
    max_price = min_price
```

We're using Python's built-in string methods:

- `.startswith()`, a method for [checking the beginning of a string](https://docs.python.org/3/library/stdtypes.html#str.startswith).
- `.removeprefix()`, a method for [removing something from the beginning of a string](https://docs.python.org/3/library/stdtypes.html#str.removeprefix).

The whole program now looks like this:

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
        max_price = None
    else:
        min_price = price_text
        max_price = min_price

    print(title, min_price, max_price)
```

## Removing white space

Often, the strings we extract from a web page start or end with some amount of whitespace, typically space characters or newline characters, which come from the [indentation](https://en.wikipedia.org/wiki/Indentation_(typesetting)#Indentation_in_programming) of the HTML tags.

We call the operation of removing whitespace _stripping_ or _trimming_, and it's so useful in many applications that programming languages and libraries include ready-made tools for it.

In Python, we have `.strip()`, a built-in string method for [removing whitespace from both the beginning and the end](https://docs.python.org/3/library/stdtypes.html#str.strip). Let's add it to our code:

```py
title = product.select_one(".product-item__title").text.strip()

price_text = product.select_one(".price").contents[-1].strip()
```

While we're at it, let's see what Beautiful Soup offers when it comes to working with strings:

- `.string`, which often is like `.text`,
- `.strings`, which [returns a list of all nested textual nodes](https://beautiful-soup-4.readthedocs.io/en/latest/#strings-and-stripped-strings),
- `.stripped_strings`, which does the same but with whitespace removed.

These might be useful in some complex scenarios, but in our case, they won't make scraping the title or price any shorter or more elegant.

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

We need to remove the dollar sign and the decimal commas. For this type of cleaning, [regular expressions](https://docs.python.org/3/library/re.html) are often the best tool for the job, but our case is so simple that we can just throw in `.replace()`, Python's built-in string method for [replacing substrings](https://docs.python.org/3/library/stdtypes.html#str.replace):

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
    max_price = None
else:
    min_price = float(price_text)
    max_price = min_price
```

Great! Only if we didn't overlook an important pitfall called [floating-point error](https://en.wikipedia.org/wiki/Floating-point_error_mitigation). In short, computers save `float()` numbers in a way which isn't always reliable:

```py
>>> 0.1 + 0.2
0.30000000000000004
```

These errors are small and usually don't matter, but sometimes they can add up and cause unpleasant discrepancies. That's why it's typically best to avoid `float()` when working with money. Let's instead use Python's built-in `Decimal()`, a [type designed to represent decimal numbers exactly](https://docs.python.org/3/library/decimal.html):

```py
from decimal import Decimal
import httpx
from bs4 import BeautifulSoup

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
        max_price = None
    else:
        min_price = Decimal(price_text)
        max_price = min_price

    print(title, min_price, max_price)
```

If we run the code above, we have nice, clean data about all the products!

```text
$ python main.py
JBL Flip 4 Waterproof Portable Bluetooth Speaker 74.95 74.95
Sony XBR-950G BRAVIA 4K HDR Ultra HD TV 1398.00 None
Sony SACS9 10" Active Subwoofer 158.00 158.00
Sony PS-HX500 Hi-Res USB Turntable 398.00 398.00
...
```

Well, not to spoil the excitement, but in its current form, the data isn't very useful. In the next lesson we'll save the product details to a file which data analysts can use or other programs can read.

---

## Exercises

These challenges are here to help you test what you’ve learned in this lesson. Try to resist the urge to peek at the solutions right away. Remember, the best learning happens when you dive in and do it yourself!

TODO
