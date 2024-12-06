---
title: Extracting data from a web page with browser DevTools
sidebar_label: "DevTools: Extracting data"
description: Lesson about using the browser tools for developers to manually extract product data from an e-commerce website.
sidebar_position: 3
slug: /scraping-basics-python/devtools-extracting-data
---

import Exercises from './_exercises.mdx';

**In this lesson we'll use the browser tools for developers to manually extract product data from an e-commerce website.**

---

In our pursuit to scrape products from the [Sales page](https://warehouse-theme-metal.myshopify.com/collections/sales), we've been able to locate parent elements containing relevant data. Now how do we extract the data?

## Finding product details

Previously, we've figured out how to save the subwoofer product card to a variable in the **Console**:

```js
products = document.querySelectorAll('.product-item');
subwoofer = products[2];
```

The product details are within the element as text, so maybe if we extract the text, we could work out the individual values?

```js
subwoofer.textContent;
```

That indeed outputs all the text, but in a form which would be hard to break down to relevant pieces.

![Printing text content of the parent element](./images/devtools-extracting-text.png)

We'll need to first locate relevant child elements and extract the data from each of them individually.

## Extracting title

We'll use the **Elements** tab of DevTools to inspect all child elements of the product card for the Sony subwoofer. We can see that the title of the product is inside an `a` element with several classes. From those the `product-item__title` seems like a great choice to locate the element.

![Finding child elements](./images/devtools-product-details.png)

JavaScript represents HTML elements as [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) objects. Among properties we've already played with, such as `textContent` or `outerHTML`, it also has the [`querySelector()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector) method. Here the method looks for matches only within children of the element:

```js
title = subwoofer.querySelector('.product-item__title');
title.textContent;
```

Notice we're calling `querySelector()` on the `subwoofer` variable, not `document`. And just like this, we've scraped our first piece of data! We've extracted the product title:

![Extracting product title](./images/devtools-extracting-title.png)

## Extracting price

To figure out how to get the price, we'll use the **Elements** tab of DevTools again. We notice there are two prices, a regular price and a sale price. For the purposes of watching prices we'll need the sale price. Both are `span` elements with the `price` class.

![Finding child elements](./images/devtools-product-details.png)

We could either rely on the fact that the sale price is likely to be always the one which is highlighted, or that it's always the first price. For now we'll rely on the former and we'll let `querySelector()` to simply return the first result:

```js
price = subwoofer.querySelector('.price');
price.textContent;
```

It works, but the price isn't alone in the result. Before we'd use such data, we'd need to do some **data cleaning**:

![Extracting product price](./images/devtools-extracting-price.png)

But for now that's okay. We're just testing the waters now, so that we have an idea about what our scraper will need to do. Once we'll get to extracting prices in Python, we'll figure out how to get numbers out of them.

In the next lesson, we'll start with our Python project. First we'll be figuring out how to download the Sales page without browser and make it accessible in a Python program.

---

<Exercises />

:::danger Work in Progress

Under development.

:::
