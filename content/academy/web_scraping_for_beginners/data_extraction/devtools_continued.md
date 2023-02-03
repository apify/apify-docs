---
title: Browser DevTools - III
description: Continue learning how to extract data from a website using browser DevTools, CSS selectors, and JavaScript via the DevTools console.
menuWeight: 3
paths:
    - web-scraping-for-beginners/data-extraction/devtools-continued
    - web-scraping-for-beginners/data-collection/devtools-continued
---

# [](#finish-devtools) Finish with DevTools

In the previous parts of the DevTools tutorial, we were able to extract information about a single product from the Sales collection of the [Warehouse store](https://warehouse-theme-metal.myshopify.com/collections/sales). If you missed the previous lessons, please go through them to understand the basic concepts. You don't need any of the code from there, though. We will start from scratch.

## [](#find-all-products) Find all product elements

First, we will use the `querySelectorAll()` function from the previous lessons to get a list of all the product elements.

Run this command in your Console:

```JavaScript
const products = document.querySelectorAll('.product-item');
products.length
```

The `length` property of `products` tells us how many products we have in the list. It says **24** and if you count the number of products on the page, you'll find that it's correct. Good, that means our CSS selector is working perfectly to get all the products.

![Print all products]({{@asset web_scraping_for_beginners/data_extraction/images/devtools-count-products.webp}})

## [](#looping-over-elements) Looping over elements

> [Visit this tutorial](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration) if you need to refresh the concept of loops in programming.

Now, we will loop over each product and print their titles. We will use a so-called `for..of` loop to do it. It is a simple loop that iterates through all items of an array.

Run the following command in the Console. Some notes:

- The `a.product-item__title` selector and the extraction code comes from the previous lesson.
- The `console.log()` function prints the results to the Console.
- The `trim()` function makes sure there are no useless whitespace characters around our data.

```JavaScript
for (const product of products) {
    const titleElement = product.querySelector('a.product-item__title');
    const title = titleElement.textContent.trim();
    console.log(title);
}
```

> [Learn more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) about the `for..of` loop.

![Print all products' text]({{@asset web_scraping_for_beginners/data_extraction/images/devtools-product-titles.webp}})

## [](#extracting-data-in-loop) Extracting more data

We will add the price extraction from the previous lesson to the loop. And we will also save all the data to an array so that we can easily work with it. Run this in the Console:

> The `results.push()` function takes its argument and pushes (adds) it to the `results` array. [Learn more about it here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push).

```JavaScript
const results = [];

for (const product of products) {
    const titleElement = product.querySelector('a.product-item__title');
    const title = titleElement.textContent.trim();

    const priceElement = product.querySelector('span.price');
    const price = priceElement.childNodes[2].nodeValue.trim();

    results.push({ title, price });
}
```

After running the code, you'll see **24** printed to the Console. That's because the `results` array includes 24 products.

Now, run this command in the Console to print all the products:

```javascript
console.log(results);
```

![Print all products' data]({{@asset web_scraping_for_beginners/data_extraction/images/devtools-print-all-products.webp}})

> You may notice that some prices include the word **From**, indicating that the price is not final. If you wanted to process this data further, you would want to remove this from the price and instead save this information to another field.

## Summary

Let's recap the web scraping process. First, we used DevTools to **find the element** that holds data about a single product. Then, inside this **parent** element we **found child elements** that contained the data (title, price) we were looking for.

Second, we used the `document.querySelector()` function and its `All` variant to **find the data programmatically**, using their **CSS selectors**.

And third, we wrapped this data extraction logic in a **loop** to automatically find the data not only for a single product, but for **all the products** on the page. 🎉

## [](#next) Next up

And that's it! With a bit of trial and error, you will be able to extract data from any webpage that's loaded in your browser. This is a useful skill on its own. It will save you time copy-pasting stuff when you need data for a project.

More importantly though, it taught you the basics to start programming your own scrapers. In the [next lessons]({{@link web_scraping_for_beginners/data_extraction/computer_preparation.md}}), we will teach you how to create your own web data extraction script using JavaScript and Node.js.
