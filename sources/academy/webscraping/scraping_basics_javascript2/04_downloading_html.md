---
title: Downloading HTML with Python
sidebar_label: Downloading HTML
description: Lesson about building a Python application for watching prices. Using the HTTPX library to download HTML code of a product listing page.
slug: /scraping-basics-javascript2/downloading-html
unlisted: true
---

import Exercises from './_exercises.mdx';

**In this lesson we'll start building a Python application for watching prices. As a first step, we'll use the HTTPX library to download HTML code of a product listing page.**

---

Using browser tools for developers is crucial for understanding the structure of a particular page, but it's a manual task. Let's start building our first automation, a JavaScript program which downloads HTML code of the product listing.

## Starting a Node.js project

Before we start coding, we need to set up a Node.js project. Let's create new directory and let's name it `product-scraper`. Inside the directory, we'll initialize new project:

```text
$ npm init
This utility will walk you through creating a package.json file.
...

Press ^C at any time to quit.
package name: (product-scraper)
version: (1.0.0)
description: Product scraper
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
# highlight-next-line
type: (commonjs) module
About to write to /Users/.../product-scraper/package.json:

{
  "name": "product-scraper",
  "version": "1.0.0",
  "description": "Product scraper",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
# highlight-next-line
  "type": "module"
}
```

The above creates a `package.json` file with configuration of our project. While most of the values are arbitrary, it's important that the project's type is set to `module`. Now let's test that all works. Inside the project directory we'll create a new file called `index.js` with the following code:

```js
import process from 'node:process';

console.log(`All is OK, ${process.argv[2]}`);
```

Running it as a Node.js program will verify that our setup is okay and we've correctly set the type to `module`. The program takes a single word as an argument and will address us with it, so let's pass it "mate", for example:

```text
$ node index.js mate
All is OK, mate
```

:::info Troubleshooting

If you see `ReferenceError: require is not defined in ES module scope, you can use import instead`, double check that in your `package.json` the type property is set to `module`.

If you see other errors or for any other reason cannot run the code above, it means that your environment isn't set up correctly. We're sorry, but figuring out the issue is out of scope of this course.

:::

## Downloading product listing

Now onto coding! Let's change our code so it downloads HTML of the product listing instead of printing `All is OK`. The [documentation of the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) provides us with examples how to use it. Inspired by those, our code will look like this:

```js
const url = "https://warehouse-theme-metal.myshopify.com/collections/sales";
const response = await fetch(url);
console.log(await response.text());
```

If we run the program now, it should print the downloaded HTML:

```text
$ node index.js
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

Running `await fetch(url)`, we made a HTTP request and received a response. It's not particularly useful yet, but it's a good start of our scraper.

:::tip Client and server, request and response

HTTP is a network protocol powering the internet. Understanding it well is an important foundation for successful scraping, but for this course, it's enough to know just the basic flow and terminology:

- HTTP is an exchange between two participants.
- The _client_ sends a _request_ to the _server_, which replies with a _response_.
- In our case, `index.js` is the client, and the technology running at `warehouse-theme-metal.myshopify.com` replies to our request as the server.

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

We could check the value of `response.status` against a list of allowed numbers, but the Fetch API already provides `response.ok`, a property which returns `false` if our request wasn't successful:

```js
const url = "https://warehouse-theme-metal.myshopify.com/does/not/exist";
const response = await fetch(url);

if (response.ok) {
  console.log(await response.text());
} else {
  throw new Error(`HTTP ${response.status}`);
}
```

If you run the code above, the program should crash:

```text
$ node index.js
file:///Users/.../index.js:7
  throw new Error(`HTTP ${response.status}`);
        ^

Error: HTTP 404
    at file:///Users/.../index.js:7:9
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
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

  ```js
  const url = "https://www.aliexpress.com/w/wholesale-darth-vader.html";
  const response = await fetch(url);

  if (response.ok) {
    console.log(await response.text());
  } else {
    throw new Error(`HTTP ${response.status}`);
  }
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
  node index.js > products.html
  ```

  If you want to use Node.js instead, it offers several ways how to create files. The solution below uses the [Promises API](https://nodejs.org/api/fs.html#promises-api):

  ```js
  import { writeFile } from 'node:fs/promises';

  const url = "https://warehouse-theme-metal.myshopify.com/collections/sales";
  const response = await fetch(url);

  if (response.ok) {
    const html = await response.text();
    await writeFile('products.html', html);
  } else {
    throw new Error(`HTTP ${response.status}`);
  }
  ```

</details>

### Download an image as a file

Download a product image, then save it on your disk as a file. While HTML is _textual_ content, images are _binary_. You may want to scan through the [Fetch API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#reading_the_response_body) for guidance. Especially check `Response.arrayBuffer()`. You can use this URL pointing to an image of a TV:

```text
https://warehouse-theme-metal.myshopify.com/cdn/shop/products/sonyxbr55front_f72cc8ff-fcd6-4141-b9cc-e1320f867785.jpg
```

<details>
  <summary>Solution</summary>

  Node.js offers several ways how to create files. The solution below uses [Promises API](https://nodejs.org/api/fs.html#promises-api):

  ```js
  import { writeFile } from 'node:fs/promises';

  const url = "https://warehouse-theme-metal.myshopify.com/cdn/shop/products/sonyxbr55front_f72cc8ff-fcd6-4141-b9cc-e1320f867785.jpg";
  const response = await fetch(url);

  if (response.ok) {
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile('tv.jpg', buffer);
  } else {
    throw new Error(`HTTP ${response.status}`);
  }
  ```

</details>
