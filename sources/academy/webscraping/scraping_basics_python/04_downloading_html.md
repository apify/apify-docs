---
title: Downloading HTML with Python
sidebar_label: Downloading HTML
description: Lesson about building a Python application for watching prices and using the HTTPX library to download HTML code of a product listing page.
sidebar_position: 4
slug: /scraping-basics-python/downloading-html
---

**In this lesson we'll start building a Python application for watching prices. As a first step, we'll use the HTTPX library to download HTML code of a product listing page.**

---

Using browser tools for developers is crucial for understanding structure of a particular page, but it's a manual task. Now let's start building our first automation, a Python program which downloads HTML code of the product listing.

## Starting a Python project

Before we start coding, we need to setup a Python project. Create new directory with a virtual environment, then inside the directory and with the environment activated, install the HTTPX library:

```text
$ pip install httpx
...
Successfully installed ... httpx-0.0.0
```

:::tip Installing packages

Being comfortable around Python project setup and installing packages is a prerequisite of this course, but if you wouldn't say no to a recap, we recommend the [Installing Packages](https://packaging.python.org/en/latest/tutorials/installing-packages/) tutorial from the official Python Packaging User Guide.

:::

Now let's test that all works. In the project directory create a new file called `main.py` with the following code:

```python
import httpx

print("OK")
```

Running it as a Python program will verify that your setup is okay and you've installed HTTPX:

```text
$ python main.py
OK
```

:::info Troubleshooting

If you see errors or for any other reason cannot run the code above, we're sorry, but figuring out the issue is out of scope of this course.

:::

## Downloading product listing

Now onto coding! Let's change our code so it downloads HTML of the product listing instead of printing OK. The [documentation of the HTTPX library](https://www.python-httpx.org/) provides us with examples how to use it. Inspired by those, our code will look like this:

```python
import httpx

url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
response = httpx.get(url)

print(response.text)
```

If you run the program now, it should print the downloaded HTML:

```text
$ python main.py
<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, height=device-height, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="theme-color" content="#00badb">
    <meta name="robots" content="noindex">
    <title>Sales</title>
  ...
  </body>
</html>
```

Yay! The entire HTML is now available in our program as a string. For now, we are just printing it to the screen, but once it's a string, we can manipulate it using any Python string operations.

## Treating HTML as a string

Let's try counting how many products is in the listing. Manually inspecting the page in browser developer tools, we can see that HTML code of each product has roughly the following structure:

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

At first sight, counting `product-item` occurances wouldn't match only products. Let's try looking for `<div class="product-item`, a substring which represents the enitre beginning of each product tag. Because the substring contains a double quote character, we need to use single quotes as string boundaries.

```python
import httpx

url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
response = httpx.get(url)

html_code = response.text
count = html_code.count('<div class="product-item')
print(count)
```

Unfortunately, this doesn't seem to be sufficient. Running the code above prints 123, which is a suspiciously high number. It seems there are more div elements with class names starting with `product-item`.

On closer look at the HTML, our substring matches also tags like `<div class="product-item__info">`. What if we force our code to count only those with a space after the class name?

```python
count = html_code.count('<div class="product-item ')
```

Now our program prints number 24, which is in line with the text _Showing 1 - 24 of 50 products_ above the product listing. Oof, that was tedious! While successful, we can see that processing HTML with [standard string methods](https://docs.python.org/3/library/stdtypes.html#string-methods) is difficult and fragile.

In fact HTML can be so complex that even [regular expressions](https://docs.python.org/3/library/re.html) aren't able to process it reliably. In the next lesson we'll meet a tool dedicated for the task, a HTML parser.

## Exercises

- One
- Two
- Three
