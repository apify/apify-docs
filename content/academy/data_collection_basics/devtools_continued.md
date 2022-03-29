---
title: DevTools continued
description: Continue learning how to collect data from a website using browser DevTools, CSS selectors and JavaScript.
menuWeight: 20.3
paths:
    - data-collection-basics/devtools-continued
---

# [](#finish-devtools) Finish with DevTools

In the first part of the DevTools tutorial, we were able to collect information about a single website from our <a href="https://commerce-qd83plqbj-mstephen19.vercel.app/" target="_blank">"Morgan Webstore" e-commerce site</a>. If you missed the previous part, we suggest going through it to understand the basic concepts, but you don't need any of the code from there, we will start from scratch.

## [](#looping) Looping over elements

> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration" target="_blank">Visit this tutorial</a> if you want to refresh the concept of loops in programming.

First, we will use the `querySelectorAll()` function from the previous chapter to get an array of all the product elements.

```JavaScript
const products = document.querySelectorAll('a[href*="/product/"]')

console.log(products);
```

![Print all product title elements]({{@asset data_collection_basics/images/print-all-product-elements.png}})

Second, we will loop over each product and print their unstructured data. The following `for..of` loop will iterate over all elements of the `products` array and execute the code provided in curly brackets `{}` for each element. In each iteration, the element is saved into the variable called `product` and we can use the variable to interact with the element.

```JavaScript
for (const product of products) {
    const titleElement = product.querySelector('h3')
    const priceElement = product.querySelector('div[class*="price"]')

    console.log(titleElement.textContent, '\n', priceElement.textContent);
}
```

> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of" target="_blank">Find out more</a> about the `for..of` loop.

![Print all websites' text]({{@asset data_collection_basics/images/print-all-products-text.png}})

## [](#collecting-data) Collecting data in a loop

In the previous chapter we created a `result` object that contained the data of one single product. Now we'll create an array of result objects which will contain all the titles and prices for each product. To do that, we'll first create an empty array called `results` and then use a `for..of` loop, and the collection skills we learned in the previous chapter.

```JavaScript
const results = [];

for (const product of products) {
    results.push({
        title: product.querySelector('h3').textContent.trim(),
        price: product.querySelector('div[class*="price"]').textContent.trim(),
    });
};

console.log(results);
```

The `results.push()` function takes its argument and pushes (adds) it to the `results` array. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push" target="_blank">Learn more about it here</a>. The rest of the code is just copy-pasted from the previous chapter. For each `product` of `products`, we find the `title` and `price`, then save them to the `results` array by pushing the object with the data into it. When you run the code, you should see all the data neatly structured.

![Print all websites' data]({{@asset data_collection_basics/images/print-all-products-data.webp}})

## [](#next) Next up

And that's it! With a bit of trial and error you will be able to collect any data from a webpage that's loaded in your browser. This is a useful skill on its own. It will save you time when you need one-off data for your project. More importantly though, it taught you the basics to start programming your own scrapers. In the [next chapters]({{@link data_collection_basics/computer_preparation.md}}), we will teach you how to create your own data collection script in JavaScript and Node.js.
