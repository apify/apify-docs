---
title: CSS selectors
description: Learn about CSS selectors. What they are, their types, why they are important for web scraping and how to use them.
menuWeight: 8.4
paths:
- concepts/css-selectors
---

CSS selectors are patterns used to select [HTML elements]({{@link concepts/html_elements.md}}) on a web page. They are used in combination with CSS styles to change the appearance of web pages, and also in JavaScript to access and manipulate the elements on a web page.

> Querying of CSS selectors with JavaScript is done using [query selector functions]({{@link concepts/querying_css_selectors.md}}).

## Common types of CSS selectors

There are several types of CSS selectors, some of the most common are:

### Element selector

This is used to select elements by their tag name. For example, to select all `<p>` elements, you would use the `p` selector.

```javascript
const paragraphs = document.querySelectorAll('p');
```

### Class selector

This is used to select elements by their class attribute. For example, to select all elements with the class of `highlight`, you would use the `.highlight` selector.

```javascript
const highlightedElements = document.querySelectorAll('.highlight');
```

### ID selector

This is used to select an element by its `id` attribute. For example, to select an element with the id of `header`, you would use the `#header` selector.

```javascript
const header = document.querySelector(`#header`);
```

### Attribute selector

This is used to select elements based on the value of an attribute. For example, to select all elements with the attribute `data-custom` whose value is `yes`, you would use the `[data-custom="yes"]` selector.

```javascript
const customElements = document.querySelectorAll('[data-custom="yes"]');
```

### Chaining selectors

You can also chain multiple selectors together to select elements more precisely. For example, to select an element with the class `highlight` that is inside a `<p>` element, you would use the `p.highlight` selector.

```javascript
const highlightedParagraph = document.querySelectorAll('p.highlight');
```

## CSS selectors in web scraping

CSS selectors are important for web scraping because they allow you to target specific elements on a web page and extract their data. When scraping a web page, you typically want to extract specific pieces of information from the page, such as text, images, or links. CSS selectors allow you to locate these elements on the page, so you can extract the data that you need.

For example, if you wanted to scrape a list of all the titles of blog posts on a website, you could use a CSS selector to select all the elements that contain the title text. Once you have selected these elements, you can extract the text from them and use it for your scraping project.

Additionally, when web scraping it is important to understand the structure of the website and CSS selectors can help you to navigate it easily. With them, you can select specific elements and their children, siblings, or parent elements. This allows you to extract data that is nested within other elements, or to navigate through the page structure to find the data you need.

## Resources

- Find all the available CSS selectors and their syntax on the [MDN CSS Selectors page](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).
