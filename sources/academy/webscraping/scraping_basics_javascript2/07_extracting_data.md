---
title: Extracting data from HTML with Node.js
sidebar_label: Extracting data from HTML
description: Lesson about building a Node.js application for watching prices. Using string manipulation to extract and clean data scraped from the product listing page.
slug: /scraping-basics-javascript2/extracting-data
unlisted: true
---

import Exercises from './_exercises.mdx';

**In this lesson we'll finish extracting product data from the downloaded HTML. With help of basic string manipulation we'll focus on cleaning and correctly representing the product price.**

---

Locating the right HTML elements is the first step of a successful data extraction, so it's no surprise that we're already close to having the data in the correct form. The last bit that still requires our attention is the price:

```text
$ node index.js
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

```js
const priceText = price.text().replace("From ", "");
```

In other cases, they'd tell us the data must include the range. And in cases when we just don't know, the safest option is to include all the information we have and leave the decision on what's important to later stages. One approach could be having the exact and minimum prices as separate values. If we don't know the exact price, we leave it empty:

```js
const priceRange = { minPrice: null, price: null };
const priceText = price.text()
if (priceText.startsWith("From ")) {
    priceRange.minPrice = priceText.replace("From ", "");
} else {
    priceRange.minPrice = priceText;
    priceRange.price = priceRange.minPrice;
}
```

:::tip Built-in string methods

If you're not proficient in JavaScript's string methods, [.startsWith()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith) checks the beginning of a given string, and [.replace()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) changes part of a given string.

:::

The whole program would look like this:

```js
import * as cheerio from 'cheerio';

const url = "https://warehouse-theme-metal.myshopify.com/collections/sales";
const response = await fetch(url);

if (response.ok) {
  const html = await response.text();
  const $ = cheerio.load(html);

  $(".product-item").each((i, element) => {
    const productItem = $(element);

    const title = productItem.find(".product-item__title");
    const titleText = title.text();

    const price = productItem.find(".price").contents().last();
    const priceRange = { minPrice: null, price: null };
    const priceText = price.text();
    if (priceText.startsWith("From ")) {
        priceRange.minPrice = priceText.replace("From ", "");
    } else {
        priceRange.minPrice = priceText;
        priceRange.price = priceRange.minPrice;
    }

    console.log(`${titleText} | ${priceRange.minPrice} | ${priceRange.price}`);
  });
} else {
  throw new Error(`HTTP ${response.status}`);
}
```

## Removing white space

Often, the strings we extract from a web page start or end with some amount of whitespace, typically space characters or newline characters, which come from the [indentation](https://en.wikipedia.org/wiki/Indentation_(typesetting)#Indentation_in_programming) of the HTML tags.

We call the operation of removing whitespace _trimming_ or _stripping_, and it's so useful in many applications that programming languages and libraries include ready-made tools for it. Let's add JavaScript's built-in [.trim()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim):

```js
const titleText = title.text().trim();

const priceText = price.text().trim();
```

## Removing dollar sign and commas

We got rid of the `From` and possible whitespace, but we still can't save the price as a number in our JavaScript program:

```js
> const priceText = "$1,998.00"
> parseFloat(priceText)
NaN
```

:::tip Interactive JavaScript

The demonstration above is inside the Node.js' [interactive REPL](https://nodejs.org/en/learn/command-line/how-to-use-the-nodejs-repl). It's similar to running arbitrary code in your browser's DevTools Console, and it's a useful playground where you can try how code behaves before you use it in your program.

:::

We need to remove the dollar sign and the decimal commas. For this type of cleaning, [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) are often the best tool for the job, but in this case [`.replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) is also sufficient:

```js
const priceText = price
  .text()
  .trim()
  .replace("$", "")
  .replace(",", "");
```

## Representing money in programs

Now we should be able to add `parseFloat()`, so that we have the prices not as a text, but as numbers:

```js
const priceRange = { minPrice: null, price: null };
const priceText = price.text()
if (priceText.startsWith("From ")) {
    priceRange.minPrice = parseFloat(priceText.replace("From ", ""));
} else {
    priceRange.minPrice = parseFloat(priceText);
    priceRange.price = priceRange.minPrice;
}
```

Great! Only if we didn't overlook an important pitfall called [floating-point error](https://en.wikipedia.org/wiki/Floating-point_error_mitigation). In short, computers save floating point numbers in a way which isn't always reliable:

```py
> 0.1 + 0.2
0.30000000000000004
```

These errors are small and usually don't matter, but sometimes they can add up and cause unpleasant discrepancies. That's why it's typically best to avoid floating point numbers when working with money. We won't store dollars, but cents:

```js
const priceText = price
  .text()
  .trim()
  .replace("$", "")
// highlight-next-line
  .replace(".", "")
  .replace(",", "");
```

In this case, removing the dot from the price text is the same as if we multiplied all the numbers with 100, effectively converting dollars to cents. This is how the whole program looks like now:

```js
import * as cheerio from 'cheerio';

const url = "https://warehouse-theme-metal.myshopify.com/collections/sales";
const response = await fetch(url);

if (response.ok) {
  const html = await response.text();
  const $ = cheerio.load(html);

  $(".product-item").each((i, element) => {
    const productItem = $(element);

    const title = productItem.find(".product-item__title");
    const titleText = title.text().trim();

    const price = productItem.find(".price").contents().last();
    const priceRange = { minPrice: null, price: null };
    const priceText = price
      .text()
      .trim()
      .replace("$", "")
      .replace(".", "")
      .replace(",", "");

    if (priceText.startsWith("From ")) {
        priceRange.minPrice = parseInt(priceText.replace("From ", ""));
    } else {
        priceRange.minPrice = parseInt(priceText);
        priceRange.price = priceRange.minPrice;
    }

    console.log(`${titleText} | ${priceRange.minPrice} | ${priceRange.price}`);
  });
} else {
  throw new Error(`HTTP ${response.status}`);
}
```

If we run the code above, we have nice, clean data about all the products!

```text
$ node index.js
JBL Flip 4 Waterproof Portable Bluetooth Speaker | 7495 | 7495
Sony XBR-950G BRAVIA 4K HDR Ultra HD TV | 139800 | null
...
```

Well, not to spoil the excitement, but in its current form, the data isn't very useful. In the next lesson we'll save the product details to a file which data analysts can use or other programs can read.

---

<Exercises />

### Scrape units on stock

Change our scraper so that it extracts how many units of each product are on stock. Your program should print the following. Note the unit amounts at the end of each line:

```text
JBL Flip 4 Waterproof Portable Bluetooth Speaker | 672
Sony XBR-950G BRAVIA 4K HDR Ultra HD TV | 77
Sony SACS9 10" Active Subwoofer | 7
Sony PS-HX500 Hi-Res USB Turntable | 15
Klipsch R-120SW Powerful Detailed Home Speaker - Unit | 0
Denon AH-C720 In-Ear Headphones | 236
...
```

<details>
  <summary>Solution</summary>

  ```js
  import * as cheerio from 'cheerio';

  const url = "https://warehouse-theme-metal.myshopify.com/collections/sales";
  const response = await fetch(url);

  if (response.ok) {
    const html = await response.text();
    const $ = cheerio.load(html);

    $(".product-item").each((i, element) => {
      const productItem = $(element);

      const title = productItem.find(".product-item__title");
      const titleText = title.text().trim();

      const unitsText = productItem
        .find(".product-item__inventory")
        .text()
        .replace("In stock,", "")
        .replace("Only", "")
        .replace(" left", "")
        .replace("units", "")
        .trim();
      const unitsCount = unitsText === "Sold out" ? 0
        : parseInt(unitsText);

      console.log(`${titleText} | ${unitsCount}`);
    });
  } else {
    throw new Error(`HTTP ${response.status}`);
  }
  ```

  :::tip Conditional (ternary) operator

  For brevity, the solution uses the [conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator). You can achieve the same with a plain `if` and `else` block.

  :::

</details>

### Use regular expressions

Simplify the code from previous exercise. Use [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) to parse the number of units. You can match digits using a range like `[0-9]` or by a special sequence `\d`. To match more characters of the same type you can use `+`.

<details>
  <summary>Solution</summary>

  ```js
  import * as cheerio from 'cheerio';

  const url = "https://warehouse-theme-metal.myshopify.com/collections/sales";
  const response = await fetch(url);

  if (response.ok) {
    const html = await response.text();
    const $ = cheerio.load(html);

    $(".product-item").each((i, element) => {
      const productItem = $(element);

      const title = productItem.find(".product-item__title");
      const titleText = title.text().trim();

      const unitsText = productItem
        .find(".product-item__inventory")
        .text()
        .trim();
      const unitsCount = unitsText === "Sold out" ? 0
        : parseInt(unitsText.match(/\d+/));

      console.log(`${titleText} | ${unitsCount}`);
    });
  } else {
    throw new Error(`HTTP ${response.status}`);
  }
  ```

  :::tip Conditional (ternary) operator

  For brevity, the solution uses the [conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator). You can achieve the same with a plain `if` and `else` block.

  :::

</details>

### Scrape publish dates of F1 news

Download Guardian's page with the latest F1 news and use Beautiful Soup to parse it. Print titles and publish dates of all the listed articles. This is the URL:

```text
https://www.theguardian.com/sport/formulaone
```

Your program should print something like the following. Note the dates at the end of each line:

```text
Brad Pitt in the paddock: how F1 the Movie went deep to keep fans coming | Fri Jun 20 2025
Wolff hits out at Red Bull protest after Russell’s Canadian GP win | Tue Jun 17 2025
F1 the Movie review – spectacular macho melodrama handles Brad Pitt with panache | Tue Jun 17 2025
Hamilton reveals distress over ‘devastating’ groundhog accident at Canadian F1 GP | Mon Jun 16 2025
...
```

Hints:

- HTML's `time` element can have an attribute `datetime`, which [contains data in a machine-readable format](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time), such as the ISO 8601.
- Cheerio gives you [.attr()](https://cheerio.js.org/docs/api/classes/Cheerio#attr) to access attributes.
- In JavaScript you can use an ISO 8601 string to create a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object.
- To get the date, you can call `.toDateString()` on `Date` objects.

<details>
  <summary>Solution</summary>

  ```js
  import * as cheerio from 'cheerio';

  const url = "https://www.theguardian.com/sport/formulaone";
  const response = await fetch(url);

  if (response.ok) {
    const html = await response.text();
    const $ = cheerio.load(html);

    $("#maincontent ul li").each((i, element) => {
      const article = $(element);

      const titleText = article
        .find("h3")
        .text()
        .trim();
      const dateText = article
        .find("time")
        .attr("datetime")
        .trim();
      const date = new Date(dateText);

      console.log(`${titleText} | ${date.toDateString()}`);
    });
  } else {
    throw new Error(`HTTP ${response.status}`);
  }
  ```

</details>
