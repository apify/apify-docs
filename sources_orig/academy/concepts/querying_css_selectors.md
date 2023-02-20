---
title: Querying elements
description: Learn how to query DOM elements using CSS selectors with the document.querySelector() and document.querySelectorAll() functions.
menuWeight: 8.5
paths:
- concepts/querying-css-selectors
---

`document.querySelector()` and `document.querySelectorAll()` are JavaScript functions that allow you to select elements on a web page using [CSS selectors]({{@link concepts/css_selectors.md}}).

`document.querySelector()` is used to select the first element that matches the provided [CSS selector]({{@link concepts/css_selectors.md}}). It returns the first matching element or null if no matching element is found.

Here's an example of how you can use it:

```javascript
const firstButton = document.querySelector("button");
```

This will select the first button element on the page and store it in the variable **firstButton**.

`document.querySelectorAll()` is used to select all elements that match the provided CSS selector. It returns a `NodeList` (a collection of elements) that can be accessed and manipulated like an array.

Here's an example of how you can use it:

```javascript
const buttons = document.querySelectorAll("button");
```

This will select all button elements on the page and store them in the variable "buttons".

Both functions can be used to access and manipulate the elements in the web page. Here's an example on how you can use it to extract the text of all buttons.

```javascript
const buttons = document.querySelectorAll("button");
const buttonTexts = buttons.forEach(button => button.textContent);
```

It's important to note that when using `querySelectorAll()` in a browser environment, it returns a live `NodeList`, which means that if the DOM changes, the NodeList will also change.
