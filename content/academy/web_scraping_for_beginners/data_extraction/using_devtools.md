---
title: Browser DevTools - II
description: Learn how to use browser DevTools, CSS selectors, and JavaScript via the DevTools console to extract data from a website.
menuWeight: 2
paths:
    - web-scraping-for-beginners/data-extraction/using-devtools
    - web-scraping-for-beginners/data-collection/using-devtools
---

# [](#devtools-data-extraction) Data extraction with DevTools

We know the basics of HTML, CSS, JavaScript and DevTools and we can finally try doing something more practical - extracting data from a website. Let's try collecting the on-sale products from the [Warehouse store](https://warehouse-theme-metal.myshopify.com/). We will use CSS selectors, JavaScript, and DevTools to achieve this task.

> **Why use a Shopify demo and not a real e-commerce store like Amazon?** Because real websites are usually bulkier, littered with promotions, and they change very often. Many have multiple versions of pages, and you never know in advance which one you will get. It will be important to learn how to deal with these challenges in the future, but for this beginner course, we want to have a light and stable environment.
>
> Some other courses use so-called scraping playgrounds or sandboxes. Those are websites made solely for the purpose of learning scraping. We find those too dumbed down and not representative of real websites. The Shopify demo is a full-featured, real-world website.

## [](#getting-structured-data) Getting structured data from HTML

When you open up the [Sales section of Warehouse](https://warehouse-theme-metal.myshopify.com/collections/sales), you'll see that there's a grid of products on the page with names and pictures of products. We will learn how to extract all this information.

![Warehouse store with DevTools open]({{@asset web_scraping_for_beginners/data_extraction/images/devtools-collection-warehouse.webp}})

Open DevTools and select the name of the **Sony SACS9 Active Subwoofer**. When you click on it, it will get highlighted in the Elements tab.

![Selecting an element with DevTools]({{@asset web_scraping_for_beginners/data_extraction/images/devtools-collection-product-name.webp}})

Great, you have selected the element which contains the name of the subwoofer. Now we want to find all the elements that contain all the information about this subwoofer. Price, number of reviews, image and so on. We will use the **Elements** tab to do that. You can hover over the elements in the Elements tab, and they will get highlighted on the page as you move the mouse.

Start from the previously selected element with the subwoofer's name and move your mouse up, hovering over each element, until you find the one that highlights the entire product card. Alternatively, you can press the up arrow a few times to get the same result.

The element that contains all the information about the subwoofer is called a **parent element**, and all the nested elements, including the subwoofer's name, price and so on, are **child elements**.

![Selecting an element with hover]({{@asset web_scraping_for_beginners/data_extraction/images/devtools-collection-product-hover.webp}})

Now that we know how the parent element looks like, we can extract its data, including the data of its children. Notice that the element has a `class` attribute with multiple values like `product-item` or `product-item--vertical`. Let's use those classes in the Console to extract data.

![Class attribute in DevTools]({{@asset web_scraping_for_beginners/data_extraction/images/devtools-collection-class.webp}})

## [](#selecting-elements) Selecting elements in Console

We know how to find an element manually using the DevTools, but that's not very useful for automated scraping. We need to tell the computer how to find it as well. We can do that using JavaScript and CSS selectors. The function to do that is called `document.querySelector()` and it will find the first element in the page's HTML matching the provided CSS selector.

For example `document.querySelector('div')` will find the first `<div>` element. And `document.querySelector('.my-class')` (notice the period `.`) will find the first element with the class `my-class`, such as `<div class="my-class">` or `<p class="my-class">`.

You can also combine selectors. `document.querySelector('p.my-class')` will find all `<p class="my-class">` elements, but no `<div class="my-class">`.

> You can find available CSS selectors and their syntax on the [MDN CSS Selectors page](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

Let's try to use `document.querySelector()` to find the **Sony subwoofer**. Earlier we mentioned that the parent element of the subwoofer had, among others, the `product-item` class. We can use the class to look up the element. Copy or type (don't miss the period `.` in `.product-item`) the following function into the Console and press Enter.

```JavaScript
document.querySelector('.product-item');
```

It will produce a result like this, but it **won't be** the Sony subwoofer.

![Query a selector with JavaScript]({{@asset web_scraping_for_beginners/data_extraction/images/devtools-collection-query.webp}})

When we look more closely by hovering over the result in the Console, we find that instead of the Sony subwoofer, we found a JBL Flip speaker. Why? Because earlier we explained that `document.querySelector('.product-item')` finds the **first element** with the `product-item` class, and the JBL speaker is the first product in the list.

![Hover over a query result]({{@asset web_scraping_for_beginners/data_extraction/images/devtools-collection-query-hover.webp}})

We need a different function: `document.querySelectorAll()` (notice the `All` at the end). This function does not find only the first element, but all the elements that match the provided selector.

Run the following function in the Console:

```JavaScript
document.querySelectorAll('.product-item');
```

It will return a `NodeList` with many results. Expand the results by clicking the small arrow button and then hover over the third (number 2, indexing starts at 0) element in the list. You'll find that it's the Sony subwoofer we're looking for.

![Hover over a query result]({{@asset web_scraping_for_beginners/data_extraction/images/devtools-collection-query-all.webp}})

Naturally, this is the method we use mostly in web scraping, because we're usually interested in scraping all the products from a page, not just a single product.

## [](#choose-good-selectors) How to choose good selectors

There are always multiple ways to select an element using CSS selectors. Try to choose selectors that are **simple**, **human-readable**, **unique** and **semantically connected** to the data. Selectors that meet these criteria are sometimes called **resilient selectors**, because they're the most reliable and least likely to change with website updates. If you can, avoid randomly generated attributes like `class="F4jsL8"`. They change often and without warning.

The `product-item` class is simple, human-readable, and semantically connected with the data. The subwoofer is one of the products. A product item. Those are strong signals that this is a good selector. It's also sufficiently unique in the website's context. If the selector was only an `item`, for example, there would be a higher chance that the website's developers would add this class to something unrelated. Like an advertisement. And it could break your extraction code.

## [](#extraction-from-elements) Extracting data from elements

Now that we found the element, we can start poking into it to extract data. First, let's save the element to a variable so that we can work with it repeatedly.

Run the commands in the Console:

```JavaScript
const products = document.querySelectorAll('.product-item');
const subwoofer = products[2];
```

> If you're wondering what `products[2]` means, learn more in [this tutorial on JavaScript arrays](https://javascript.info/array).

Now that we have the subwoofer saved into a variable, run another command in the Console to print its text:

```javascript
subwoofer.textContent
```

![Print text content of an element]({{@asset web_scraping_for_beginners/data_extraction/images/print-text-content.webp}})

As you can see, we were able to extract the data, but the format is still not very useful - there's a whole lot of weird data there that we probably don't need. For further processing (ex. in a spreadsheet), we would like to have each piece of data as a separate field (column). To do that, we will look at the HTML structure in more detail.

### [](#selecting-child-elements) Selecting child elements

In the [Getting structured data from HTML](#getting-structured-data-from-html) section, we were hovering over the elements in the **Elements** tab to find the element that contains all the data. We can use that to find the individual data points as well. After a bit more inspection, we discover that the product's title is a `<span>` tag with a parent `<h3>` element, and the price is held inside a `<div>` with a `class` attribute including the keyword of **price**.

> Don't forget that the selectors may have changed, but the general principle of finding them will always be the same. Use what you see on your screen.

![Finding child elements in Elements tab]({{@asset web_scraping_for_beginners/data_extraction/images/find-child-elements.webp}})

The `document.querySelector()` function looks for a specific element in the whole HTML `document`, so if we called it with `h3`, it would find the first `<h3>` node in the `document`. Luckily we can also use this function to look for elements within an element.

There's a similar function called [`querySelectorAll()`](https://javascript.info/searching-elements-dom#querySelectorAll) that returns collection of all the elements matching the selector - not just the first one. We will use this function to grab all the elements holding our sought after data.

> Learn more about `Arrays` in [this tutorial](https://javascript.info/array).

Let's find the parent element of all of the products, which matches the selector `div.grid.gap-6`, select it with `document.querySelector()`, then find all of the product elements.

```JavaScript
const grid = document.querySelector('div.grid.gap-6');

const products = grid.querySelectorAll('a[href*="/product/"]')

console.log(products);
```

There are 32 products on the page, so if we've done this correctly, a list of 32 product elements should be logged to the console.

![List child elements with JavaScript]({{@asset web_scraping_for_beginners/data_extraction/images/list-child-elements.webp}})

### [](#extracting-data) Extracting data

The `products` array now contains all the elements we need, and we can access each one's data individually. Let's save the title and price of the first product into an [object](https://javascript.info/object). Those of you who know JavaScript will know that this is not the prettiest code ever written, but it is beginner-friendly and that's important here. We will also use the `.trim()` function to remove unnecessary whitespace from the results.

```JavaScript
const result = {
    title: products[0].querySelector('h3').textContent.trim(),
    price: products[0].querySelector('div[class*="price"]').textContent.trim(),
};

console.log(result);
```

![Print collected data to the Console]({{@asset web_scraping_for_beginners/data_extraction/images/print-product-data.webp}})

If you were able to get the same result in your browser console, congratulations! You successfully collected your first data. If not, don't worry and review your code carefully. You'll crush the bug soon enough.

## [](#next) Next up

We have learned how to collect information about a few products from an e-commerce website. In the [next lesson]({{@link web_scraping_for_beginners/data_extraction/devtools_continued.md}}), we will learn how to collect all of them.
