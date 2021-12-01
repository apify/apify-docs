---
title: Filtering links
description: When you collect links from a web page, you often end up with a lot of irrelevant URLs. Learn how to filter the links to only keep the ones you need.
menuWeight: 21.3
category: web scraping academy
paths:
- crawling-basics/filtering-links
---

# Filtering links

Web pages are full of links and frankly, most of them are useless for us. There are two approaches to this. First tries to target the links we're interested in by using unique CSS selectors. Second collects all links and then uses pattern matching to find the correct URLs. In real scraping scenarios, those two approaches are often combined for the most powerful filtering.

## Filtering with unique CSS selectors

In the previous chapter we simply grabbed all the links from the HTML document.

```js
$('a');
```

But that's not the only way. Since we're interested in the `href` attributes, a first very reasonable filter is to exclusively target the `<a>` tags that have the `href` attribute (yes, anchors without it can exist). You can do that by using the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors" target="_blank">CSS attribute selector</a>.

```js
$('a[href]');
```

Always adding the `[href]` selector will save you from nasty bug hunts on some pages. Next, we can limit the number of results by only targeting the country links. In DevTools we see that all the country links are in an HTML list denoted by `<ul>` and `<li>` tags. And that the `<ul>` element has the class `countries`. We can leverage that.

> Learn more about HTML lists and the `<ul` and `<li>` tags.
