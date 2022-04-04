---
title: Basics of data collection
description: Learn about HTML, CSS, and JavaScript, the basic building blocks of a website, and how to use them in web scraping and data collection.
menuWeight: 2.2
category: courses
paths:
    - web-scraping-for-beginners/data-collection
---

# [](#basics) Basics of data collection

Every web scraping project starts with some detective work. To a human, it's completely obvious where the data is on the web page, but a computer needs very precise instructions to find the data we want. There are three elementary components of each website that we can leverage to give those instructions: HTML, CSS, and JavaScript.

## [](#html) HTML

For the browser to be able to show you the web page with all its text and images, the data needs to be present somewhere. This data source is called HTML (HyperText Markup Language) and it gets downloaded to your computer whenever you open a website. If you want to extract data from a website, you need to show your computer where to find it in the HTML.

> To learn about HTML, we recommend browsing the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank">MDN tutorials on HTML</a>.

## [](#css) CSS

CSS (Cascading Style Sheets) is a markup language that is used to give websites their style. It controls shapes, colors, positioning and even animations. The style is then added to the page's HTML and together, they define the page's content and structure. In web scraping, we can leverage CSS to find the data we want using CSS selectors.

> Find more information on CSS and CSS selectors in the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank">MDN tutorials on CSS</a>.

## [](#javascript) JavaScript

HTML and CSS give websites their structure and style, but they are static. To be able to meaningfully interact with a website, you need to throw JavaScript into the mix. It is the language of the web and you don't need to be a programmer to learn the basics. You don't even need any special software, because you can try it right now, in your browser.

> If you want to dive deeper into JavaScript, check out <a href="https://javascript.info/" target="_blank">this great tutorial</a>.

## [](#next) Next up

We will show you [how to use the browser DevTools]({{@link web_scraping_for_beginners/data_collection/browser_devtools.md}}) to inspect and interact with a web page.
