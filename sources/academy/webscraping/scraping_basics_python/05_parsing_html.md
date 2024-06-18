---
title: Parsing HTML with Python
sidebar_label: Parsing HTML
description: TODO
sidebar_position: 5
slug: /scraping-basics-python/parsing-html
---

**In this lesson we'll look for products in the downloaded HTML. We'll use BeautifulSoup to turn the HTML into objects which we can work with in our Python program.**

---

From previous lessons we know that the HTML tags representing individual products have a `class` attribute which, among other values, contains `product-item`.

![Products have the ‘product-item’ class](./images/collection-class.png)

As a first step, let's try counting how many products is in the listing.

## Treating HTML as a string

Currently, the entire HTML is available in our program as a string. Our program can print it to the screen or save it to a file, but not much more. Can we use Python string operations to count the products? Each string has `.count()`, a [method for counting substrings](https://docs.python.org/3/library/stdtypes.html#str.count).

After manually inspecting the page in browser DevTools we can see that each product has the following structure:

```html
<div class="product-item product-item--vertical ...">
  <a href="/products/..." class="product-item__image-wrapper">
    ...
  </a>
  <div class="product-item__info">
    ...
  </div>
</div>
```

At first sight, counting `product-item` occurances wouldn't match only products. Let's try looking for `<div class="product-item`, a substring which represents the enitre beginning of each product tag. Because the substring contains a double quote character, we need to use single quotes as string boundaries. Replace your program with the following code:

```python
import httpx

url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
response = httpx.get(url)
response.raise_for_status()

html_code = response.text
count = html_code.count('<div class="product-item')
print(count)
```

:::info Handling errors

To have the code examples more concise, we're omitting error handling for now. Keeping `response.raise_for_status()` ensures that your program at least crashes and prints what happened in case there's an error.

:::

Unfortunately, this doesn't seem to be sufficient. Running the code above prints 123, which is a suspiciously high number. It seems there are more `div` tags with class names starting with `product-item`.

On closer look at the HTML, our substring matches also tags like `<div class="product-item__info">`. What if we force our code to count only those with a space after the class name?

```python
count = html_code.count('<div class="product-item ')
```

Now it prints number 24, which is in line with the text **Showing 1–24 of 50 products** above the product listing. Phew, that was tedious!

<!-- TODO image -->

While possible, we can see that processing HTML with [standard string methods](https://docs.python.org/3/library/stdtypes.html#string-methods) is difficult and fragile. Imagine we wouldn't be just counting, but trying to get the titles and prices.

In fact HTML can be so complex that even [regular expressions](https://docs.python.org/3/library/re.html) aren't able to process it reliably. To work with HTML we need a robust tool dedicated for the task.

:::tip Why regex can't parse HTML

While [Bobince's infamous StackOverflow answer](https://stackoverflow.com/a/1732454/325365) is funny, it doesn't go much into explaining. In formal language theory, HTML's hierarchical and nested structure makes it a [context-free language](https://en.wikipedia.org/wiki/Context-free_language). Regular expressions match patterns in [regular languages](https://en.wikipedia.org/wiki/Regular_language), which are much simpler. This difference makes it hard for a regex to handle HTML's nested tags. HTML's complex syntax rules and various edge cases also add to the difficulty.

:::

## Using HTML parser

An HTML parser takes a text with HTML markup and turns it into a tree of Python objects. We'll choose Beautiful Soup as our parser, as it's a popular library renowned for its ability to process even non-standard, broken markup. This is useful for scraping, because real-world websites often contain all sorts of errors and discrepancies.

```text
$ pip install beautifulsoup4
...
Successfully installed beautifulsoup4-4.0.0 soupsieve-0.0
```

Now let's use it for parsing the HTML:

```python
import httpx
from bs4 import BeautifulSoup

url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
response = httpx.get(url)
response.raise_for_status()

html_code = response.text
soup = BeautifulSoup(html_code, "html.parser")
print(soup.title)
```

The `BeautifulSoup` object contains our HTML, but unlike plain string, it allows us to work with the HTML elements in a structured way. As a demonstration, we use the shorthand `.title` for accessing the HTML `<title>` tag. Let's run the program:

```text
$ python main.py
<title>Sales
</title>
```

That looks promising! What if we want just the contents of the tag? Let's change the print line to the following:

```python
print(soup.title.text)
```

If we run our scraper again, it prints just the actual text of the `<title>` tag:

```text
$ python main.py
Sales
```

## Using CSS selectors

Beautiful Soup offers a `.select()` method, which runs a CSS selector against a parsed HTML document and returns all the matching elements. Scanning through [usage examples](https://beautiful-soup-4.readthedocs.io/en/latest/#css-selectors) will help us to figure out code for counting the products:

```python
import httpx
from bs4 import BeautifulSoup

url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
response = httpx.get(url)
response.raise_for_status()

html_code = response.text
soup = BeautifulSoup(html_code, "html.parser")
products = soup.select(".product-item")
print(len(products))
```

In CSS, `.product-item` selects all elements whose `class` attribute contains value `product-item`. We call `soup.select()` with the selector and get back a list of matching elements. On the last line, we use `len()` to count how many items is in the list. That's it!

```text
$ python main.py
24
```

We have managed to download a product listing, parse its HTML, and count how many products it contains. In the next lesson, we'll be looking for a way to extract detailed information about individual products.

---

## Exercises

These challenges are here to help you test what you’ve learned in this lesson. Try to resist the urge to peek at the solutions right away. Remember, the best learning happens when you dive in and do it yourself!

### Scrape F1 teams

Print a total count of F1 teams listed on this page:

```text
https://www.formula1.com/en/teams
```

<details>
  <summary>Solution</summary>

  ```python
  import httpx
  from bs4 import BeautifulSoup

  url = "https://www.formula1.com/en/teams"
  response = httpx.get(url)
  response.raise_for_status()

  html_code = response.text
  soup = BeautifulSoup(html_code, "html.parser")
  print(len(soup.select(".outline")))
  ```

</details>

### Scrape F1 drivers

Use the same URL as in the previous exercise, but this time print a total count of F1 drivers.

<details>
  <summary>Solution</summary>

  ```python
  import httpx
  from bs4 import BeautifulSoup

  url = "https://www.formula1.com/en/teams"
  response = httpx.get(url)
  response.raise_for_status()

  html_code = response.text
  soup = BeautifulSoup(html_code, "html.parser")
  print(len(soup.select(".f1-grid")))
  ```

</details>
