---
title: HTML elements
description: Learn about HTML elements. What they are, their types and how to work with them in a browser environment using JavaScript.
sidebar_position: 8.6
slug: /concepts/html-elements
---

An HTML element is a building block of an HTML document. It is used to represent a piece of content on a web page, such as text, images, or videos. Each element is defined by a tag, which is a set of characters enclosed in angle brackets, such as `<p>`, `<img>`, or `<video>`. For example, this is a paragraph element:

```html
<p>This is a paragraph of text.</p>
```

You can also add **attributes** to an element to provide additional information or to control how the element behaves. For example, the `src` attribute is used to specify the source of an image, like this:

```html
<img src="image.jpg" alt="A description of the image">
```

In modern JavaScript, you can use the **DOM** (Document Object Model) to interact with elements on a web page. For example, you can use the [`querySelector()` method](./querying_css_selectors.md) to select an element by its [CSS selector](./css_selectors.md), like this:

```js
const myElement = document.querySelector('#myId');
```

You can also use `getElementById()` method to select an element by its `id`, like this:

```js
const myElement = document.getElementById('myId');
```

You can also use `getElementsByTagName()` method to select all elements of a certain type, like this:

```js
const myElements = document.getElementsByTagName('p');
```

Once you have selected an element, you can use JavaScript to change its content, style, or behavior.

In summary, an HTML element is a building block of a web page, and it is defined by a **tag**, it can also have **attributes** which provide additional information or control how the element behaves and in modern JavaScript, you can use the **DOM** (Document Object Model) to interact with elements on a web page.
