---
title: Basics of data extraction
description: Learn about HTML, CSS, and JavaScript, the basic building blocks of a website, and how to use them in web scraping and data extraction.
sidebar_position: 1.2
category: courses
slug: /web-scraping-for-beginners/data-extraction
---

# Basics of data extraction {#basics}

**Learn about HTML, CSS, and JavaScript, the basic building blocks of a website, and how to use them in web scraping and data extraction.**

---

Every web scraping project starts with some detective work. To a human, it's completely obvious where the data is on the web page, but a computer needs very precise instructions to find the data we want. We can leverage three elementary components of each website to give those instructions: HTML, CSS, and JavaScript

## HTML {#html}

For the browser to be able to show you the web page with all its text and images, the data needs to be present somewhere. This data source is called HTML (HyperText Markup Language) and it gets downloaded to your computer whenever you open a website. If you want to extract data from a website, you need to show your computer where to find it in the HTML.

> To learn more about markup, we recommend the [resources about HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML) provided by MDN, the official documentation of the web.

## CSS {#css}

CSS (Cascading Style Sheets) is a language that is used to give websites their style. It controls shapes, colors, positioning and even animations. The style is then added to the page's HTML and together, they define the page's content and structure. In web scraping, we can leverage CSS to find the data we want using CSS selectors.

> To learn more about styles and selectors, we recommend the [resources about CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS) provided by MDN, the official documentation of the web.

## JavaScript {#javascript}

HTML and CSS give websites their structure and style, but they are static. To be able to meaningfully interact with a website, you need to throw JavaScript into the mix. It is the language of the web, and you don't need to be a programmer to learn the basics. You don't even need any special software, because you can try it right now, in your browser.

> To learn more about programming in browser, we recommend the [resources about JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript) provided by MDN, the official documentation of the web.

## Next up {#next}

We will show you [how to use the browser DevTools](./browser_devtools.md) to inspect and interact with a web page.
