---
title: Downloading HTML with Python
sidebar_label: Downloading HTML
description: Lesson about building a Python application for watching prices. Using the HTTPX library to download HTML code of a product listing page.
slug: /scraping-basics-python/downloading-html
---

import Exercises from './_exercises.mdx';

**In this lesson we'll start building a Python application for watching prices. As a first step, we'll use the HTTPX library to download HTML code of a product listing page.**

---

Using browser tools for developers is crucial for understanding the structure of a particular page, but it's a manual task. Let's start building our first automation, a Python program which downloads HTML code of the product listing.

## Starting a Python project

Before we start coding, we need to set up a Python project. Create new directory with a virtual environment, then inside the directory and with the environment activated, install the HTTPX library:

```text
$ pip install httpx
...
Successfully installed ... httpx-0.0.0
```

:::tip Installing packages

Being comfortable around Python project setup and installing packages is a prerequisite of this course, but if you wouldn't say no to a recap, we recommend the [Installing Packages](https://packaging.python.org/en/latest/tutorials/installing-packages/) tutorial from the official Python Packaging User Guide.

:::

Now let's test that all works. Inside the project directory create a new file called `main.py` with the following code:

```py
import httpx

print("OK")
```

Running it as a Python program will verify that your setup is okay and you've installed HTTPX:

```text
$ python main.py
OK
```

:::info Troubleshooting

If you see errors or for any other reason cannot run the code above, it means that your environment isn't set up correctly. We're sorry, but figuring out the issue is out of scope of this course.

:::

## Downloading product listing

Now onto coding! Let's change our code so it downloads HTML of the product listing instead of printing `OK`. The [documentation of the HTTPX library](https://www.python-httpx.org/) provides us with examples how to use it. Inspired by those, our code will look like this:

```py
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

Running `httpx.get(url)`, we made a HTTP request and received a response. It's not particularly useful yet, but it's a good start of our scraper.

:::tip Client and server, request and response

HTTP is a network protocol powering the internet. Understanding it well is an important foundation for successful scraping, but for this course, it's enough to know just the basic flow and terminology:

- HTTP is an exchange between two participants.
- The _client_ sends a _request_ to the _server_, which replies with a _response_.
- In our case, `main.py` is the client, and the technology running at `warehouse-theme-metal.myshopify.com` replies to our request as the server.

:::

## Handling errors

Websites can return various errors, such as when the server is temporarily down, applying anti-scraping protections, or simply being buggy. In HTTP, each response has a three-digit _status code_ that indicates whether it is an error or a success.

:::tip All status codes

If you've never worked with HTTP response status codes before, briefly scan their [full list](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) to get at least a basic idea of what you might encounter. For further education on the topic, we recommend [HTTP Cats](https://http.cat/) as a highly professional resource.

:::

A robust scraper skips or retries requests on errors. Given the complexity of this task, it's best to use libraries or frameworks. For now, we'll at least make sure that our program visibly crashes and prints what happened in case there's an error.

First, let's ask for trouble. We'll change the URL in our code to a page that doesn't exist, so that we get a response with [status code 404](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404). This could happen, for example, when the product we are scraping is no longer available:

```text
https://warehouse-theme-metal.myshopify.com/does/not/exist
```

We could check the value of `response.status_code` against a list of allowed numbers, but HTTPX already provides `response.raise_for_status()`, a method that analyzes the number and raises the `httpx.HTTPError` exception if our request wasn't successful:

```py
import httpx

url = "https://warehouse-theme-metal.myshopify.com/does/not/exist"
response = httpx.get(url)
response.raise_for_status()
print(response.text)
```

If you run the code above, the program should crash:

```text
$ python main.py
Traceback (most recent call last):
  File "/Users/.../main.py", line 5, in <module>
    response.raise_for_status()
  File "/Users/.../.venv/lib/python3/site-packages/httpx/_models.py", line 761, in raise_for_status
    raise HTTPStatusError(message, request=request, response=self)
httpx.HTTPStatusError: Client error '404 Not Found' for url 'https://warehouse-theme-metal.myshopify.com/does/not/exist'
For more information check: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404
```

Letting our program visibly crash on error is enough for our purposes. Now, let's return to our primary goal. In the next lesson, we'll be looking for a way to extract information about products from the downloaded HTML.

---

<Exercises />

### Scrape AliExpress

Download HTML of a product listing page, but this time from a real world e-commerce website. For example this page with AliExpress search results:

```text
https://www.aliexpress.com/w/wholesale-darth-vader.html
```

<details>
  <summary>Solution</summary>

  ```py
  import httpx

  url = "https://www.aliexpress.com/w/wholesale-darth-vader.html"
  response = httpx.get(url)
  response.raise_for_status()
  print(response.text)
  ```

</details>

### Save downloaded HTML as a file

Download HTML, then save it on your disk as a `products.html` file. You can use the URL we've been already playing with:

```text
https://warehouse-theme-metal.myshopify.com/collections/sales
```

<details>
  <summary>Solution</summary>

  Right in your Terminal or Command Prompt, you can create files by _redirecting output_ of command line programs:

  ```text
  python main.py > products.html
  ```

  If you want to use Python instead, it offers several ways how to create files. The solution below uses [pathlib](https://docs.python.org/3/library/pathlib.html):

  ```py
  import httpx
  from pathlib import Path

  url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
  response = httpx.get(url)
  response.raise_for_status()
  Path("products.html").write_text(response.text)
  ```

</details>

### Download an image as a file

Download a product image, then save it on your disk as a file. While HTML is _textual_ content, images are _binary_. You may want to scan through the [HTTPX QuickStart](https://www.python-httpx.org/quickstart/) for guidance. You can use this URL pointing to an image of a TV:

```text
https://warehouse-theme-metal.myshopify.com/cdn/shop/products/sonyxbr55front_f72cc8ff-fcd6-4141-b9cc-e1320f867785.jpg
```

<details>
  <summary>Solution</summary>

  Python offers several ways how to create files. The solution below uses [pathlib](https://docs.python.org/3/library/pathlib.html):

  ```py
  from pathlib import Path
  import httpx

  url = "https://warehouse-theme-metal.myshopify.com/cdn/shop/products/sonyxbr55front_f72cc8ff-fcd6-4141-b9cc-e1320f867785.jpg"
  response = httpx.get(url)
  response.raise_for_status()
  Path("tv.jpg").write_bytes(response.content)
  ```

</details>
