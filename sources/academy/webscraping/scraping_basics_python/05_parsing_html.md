---
title: Parsing HTML with Python
sidebar_label: Parsing HTML
description: TODO
sidebar_position: 5
slug: /scraping-basics-python/parsing-html
---

:::danger Work in progress

This course is incomplete. As we work on adding new lessons, we would love to hear your feedback. You can comment right here under each page or [file a GitHub Issue](https://github.com/apify/apify-docs/issues) to discuss a problem.

This lesson contains just a fraction of what it should contain. In the end, the current content might get rewritten. Everything on this page is a subject to change!

:::

## Treating HTML as a string

Yay! The entire HTML is now available in our program as a string. For now, we are just printing it to the screen, but once it's a string, we can manipulate it using any Python string operations.

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

Now our program prints number 24, which is in line with the text **Showing 1–24 of 50 products** above the product listing.

<!-- TODO image -->

Oof, that was tedious! While successful, we can see that processing HTML with [standard string methods](https://docs.python.org/3/library/stdtypes.html#string-methods) is difficult and fragile. Imagine we wouldn't be just counting, but trying to get titles and prices.

In fact HTML can be so complex that even [regular expressions](https://docs.python.org/3/library/re.html) aren't able to process it reliably. In the next lesson we'll meet a tool dedicated for the task, a HTML parser.

## Exercises

- One
- Two
- Three
