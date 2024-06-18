---
title: Downloading HTML with Python
sidebar_label: Downloading HTML
description: Lesson about building a Python application for watching prices. Using the HTTPX library to download HTML code of a product listing page.
sidebar_position: 4
slug: /scraping-basics-python/downloading-html
---

**In this lesson we'll start building a Python application for watching prices. As a first step, we'll use the HTTPX library to download HTML code of a product listing page.**

---

Using browser tools for developers is crucial for understanding the structure of a particular page, but it's a manual task. Let's start building our first automation, a Python program which downloads HTML code of the product listing.

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

Now let's test that all works. Inside the project directory create a new file called `main.py` with the following code:

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

And that's it! It's not particularly useful yet, but it's a good start of our scraper.

## About HTTP

Running `httpx.get(url)`, we made our first HTTP request and received our first response. HTTP is a network protocol powering most of the internet. Understanding it well is an important foundation for successful scraping, but for now it's enough to know the basic flow and terminology.

HTTP is an exchange of two participants. The _client_ sends a _request_ to the _server_, which replies with a _response_. In our case, `main.py` is the client, and the technology running at `warehouse-theme-metal.myshopify.com` replies to our request as the server.

<!-- TODO image basic HTTP chart -->

:::tip Deep dive to HTTP

The HTTP protocol is defined by several documents called RFCs, such as [RFC 7230: HTTP Message Syntax and Routing](https://www.rfc-editor.org/rfc/rfc7230) or [RFC 7231: HTTP Semantics and Content](https://www.rfc-editor.org/rfc/rfc7231). While these technical specifications are surprisingly digestible, you may also like [HTTP tutorials by MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP).

:::

## Checking status codes

Sometimes websites return all kinds of errors. Most often because:

- The server is temporarily down.
- The server breaks under a heavy load of requests.
- The server applies anti-scraping protections.
- The server application is buggy and just couldn't handle our request.

In HTTP, each response has a three-digit _status code_, which tells us whether it's an error or success. Let's change the last line of our program to print the code of the response we get:

```python
print(response.status_code)
```

If we run the program, it should print number 200, which means the server understood our request and was happy to respond with what we asked for:

```text
$ python main.py
200
```

Good! Now let's fix our code so that it can handle a situation when the server doesn't return 200.

:::tip All status codes

If you're curious, sneak a peek at the list of all [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status). There's plenty of them and they're categorized according to their first digit. If you're even more curious, we recommend browsing the [HTTP Cats](https://http.cat/) as a highly professional resource on the topic.

:::

## Handling errors

It's time to ask for trouble! Let's change the URL in our code to a page which doesn't exist, so that we get a response with [status code 404](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404):

```text
https://warehouse-theme-metal.myshopify.com/does/not/exist
```

We could check the value of `response.status_code` against a list of allowed numbers, but HTTPX also provides `response.raise_for_status()`, a method which analyzes the number and raises the `httpx.HTTPError` exception in case our request wasn't successful.

A robust scraper skips or retries requests when errors occur, but let's start simple. Our program will print an error message and stop further processing of the response.


We also want to play along with the conventions of the operating system, so we'll print to the [standard error output](https://en.wikipedia.org/wiki/Standard_streams#Standard_error_(stderr)) and exit our program with a non-zero [status code](https://en.wikipedia.org/wiki/Exit_status):

```python
import sys
import httpx

url = "https://warehouse-theme-metal.myshopify.com/does/not/exist"
try:
    response = httpx.get(url)
    response.raise_for_status()
    print(response.text)

except httpx.HTTPError as error:
    print(error, file=sys.stderr)
    sys.exit(1)
```

If you run the code above, you should see a nice error message:

```text
$ python main.py
Client error '404 Not Found' for url 'https://warehouse-theme-metal.myshopify.com/does/not/exist'
For more information check: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404
```

Done! We have managed to apply basic error handling. Now let's get back to our primary goal. In the next lesson, we'll be looking for a way to extract information about products from the downloaded HTML.

---

## Exercises

These challenges are here to help you test what you’ve learned in this lesson. Try to resist the urge to peek at the solutions right away. Remember, the best learning happens when you dive in and do it yourself!

### Scrape Amazon

Download HTML of a product listing page, but this time from a real world e-commerce website. For example this page with Amazon search results:

```text
https://www.amazon.com/s?k=darth+vader
```

<details>
  <summary>Solution</summary>

  ```python
  import sys
  import httpx

  url = "https://www.amazon.com/s?k=darth+vader"
  try:
      response = httpx.get(url)
      response.raise_for_status()
      print(response.text)

  except httpx.HTTPError as error:
      print(error, file=sys.stderr)
      sys.exit(1)
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

  ```python
  import sys
  import httpx
  from pathlib import Path

  url = "https://warehouse-theme-metal.myshopify.com/collections/sales"
  try:
      response = httpx.get(url)
      response.raise_for_status()
      Path("products.html").write_text(response.text)

  except httpx.HTTPError as error:
      print(error, file=sys.stderr)
      sys.exit(1)
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

  ```python
  from pathlib import Path
  import sys
  import httpx

  url = "https://warehouse-theme-metal.myshopify.com/cdn/shop/products/sonyxbr55front_f72cc8ff-fcd6-4141-b9cc-e1320f867785.jpg"
  try:
      response = httpx.get(url)
      response.raise_for_status()
      Path("tv.jpg").write_bytes(response.content)
  except httpx.HTTPError as e:
      print(e, file=sys.stderr)
      sys.exit(1)

  ```

</details>
