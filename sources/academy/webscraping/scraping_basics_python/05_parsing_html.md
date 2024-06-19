---
title: Parsing HTML with Python
sidebar_label: Parsing HTML
description: Lesson about building a Python application for watching prices. Using the Beautiful Soup library to parse HTML code of a product listing page.
sidebar_position: 5
slug: /scraping-basics-python/parsing-html
---

**In this lesson we'll look for products in the downloaded HTML. We'll use BeautifulSoup to turn the HTML into objects which we can work with in our Python program.**

---

From lessons about browser DevTools we know that the HTML tags representing individual products have a `class` attribute which, among other values, contains `product-item`.

![Products have the ‘product-item’ class](./images/product-item.png)

As a first step, let's try counting how many products is on the listing page.

## Treating HTML as a string

Currently, the entire HTML is available in our program as a string. Our program can print it to the screen or save it to a file, but not much more. If it's a string, could we use Python string operations to count the products? Each Python string has `.count()`, a [method for counting substrings](https://docs.python.org/3/library/stdtypes.html#str.count).

After manually inspecting the page in browser DevTools we can see that all products follow this structure:

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

At first sight, counting `product-item` occurances wouldn't match only products, but also `product-item__image-wrapper`. Hmm.

We could try looking for `<div class="product-item`, a substring which represents the enitre beginning of each product tag, but that would also count `<div class="product-item__info`! We'll need to add a space after the class name to avoid matching those. Replace your program with the following code:

```python
import httpx

url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
response = httpx.get(url)
response.raise_for_status()

html_code = response.text
count = html_code.count('<div class="product-item ')
print(count)
```

Note that because the substring contains a double quote character, we need single quotes as string boundaries.

:::info Handling errors

To have the code examples more concise, we're omitting error handling for now. Keeping `response.raise_for_status()` ensures that your program at least visibly crashes and prints what happened in case there's an error.

:::

Our scraper prints 24, which is in line with the text **Showing 1–24 of 50 products** above the product listing. Phew, figuring this out was quite tedious!

```text
$ python main.py
24
```

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

Now let's use it for parsing the HTML. Unlike plain string, the `BeautifulSoup` object allows us to work with the HTML elements in a structured way. As a demonstration, we'll first get the `<h1>` tag, which represents the main heading of the page.

![Tag of the main heading](./images/h1.png)

Update your code to the following:

```python
import httpx
from bs4 import BeautifulSoup

url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
response = httpx.get(url)
response.raise_for_status()

html_code = response.text
soup = BeautifulSoup(html_code, "html.parser")
print(soup.select("h1"))
```

Let's run the program:

```text
$ python main.py
[<h1 class="collection__title heading h1">Sales</h1>]
```

Our code lists all `<h1>` tags it can find on the page. It's the case that there's just one, so in the result we can see a list with a single item. What if we want to print just the text? Let's change the end of the program to the following:

```python
headings = soup.select("h1")
first_heading = headings[0]
print(first_heading.text)
```

If we run our scraper again, it prints the text of the first `<h1>` tag:

```text
$ python main.py
Sales
```

## Using CSS selectors

Beautiful Soup's `.select()` method runs a _CSS selector_ against a parsed HTML document and returns all the matching elements. It's like calling `document.querySelectorAll()` in browser DevTools.

Scanning through [usage examples](https://beautiful-soup-4.readthedocs.io/en/latest/#css-selectors) will help us to figure out code for counting the products:

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

In CSS, `.product-item` selects all elements whose `class` attribute contains value `product-item`. We call `soup.select()` with the selector and get back a list of matching elements. Beautiful Soup handles all the complexity of understanding the HTML markup for us. On the last line, we use `len()` to count how many items there is in the list.

```text
$ python main.py
24
```

That's it! We have managed to download a product listing, parse its HTML, and count how many products it contains. In the next lesson, we'll be looking for a way to extract detailed information about individual products.

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
