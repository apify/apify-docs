---
title: Filtering links
description: When you collect links from a web page, you often end up with a lot of irrelevant URLs. Learn how to filter the links to only keep the ones you need.
menuWeight: 21.3
category: web scraping academy
paths:
- crawling-basics/filtering-links
---

# [](#filtering-links) Filtering links

Web pages are full of links and frankly, most of them are useless for us. There are two approaches to this. First tries to target the links we're interested in by using unique CSS selectors. Second collects all links and then uses pattern matching to find the correct URLs. In real scraping scenarios, those two approaches are often combined for the most powerful filtering.

## [](#css-filter) Filtering with unique CSS selectors

In the previous chapter we simply grabbed all the links from the HTML document.

```marked-tabs
<marked-tab header="DevTools" lang="javascript">
document.querySelectorAll('a');
</marked-tab>
<marked-tab header="Node.js" lang="javascript">
$('a');
</marked-tab>
```

### [](#attribute-selector) Attribute selector

But that's not the only way. Since we're interested in the `href` attributes, a first very reasonable filter is to exclusively target the `<a>` tags that have the `href` attribute (yes, anchors without it can exist). You can do that by using the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors" target="_blank">CSS attribute selector</a>.

```marked-tabs
<marked-tab header="DevTools" lang="javascript">
document.querySelectorAll('a[href]');
</marked-tab>
<marked-tab header="Node.js" lang="javascript">
$('a[href]');
</marked-tab>
```

Always adding the `[href]` selector will save you from nasty bug hunts on some pages. Next, we can limit the number of results by only targeting the country links. In DevTools we see that all the country links are in an HTML list denoted by `<ul>` and `<li>` tags. And that the `<ul>` element has the class `countries`. We can leverage that.

> <a href="https://www.w3schools.com/html/html_lists_unordered.asp" target="_blank">Learn more</a> about HTML lists and the `<ul` and `<li>` tags.

### [](#descendant-selector) Descendant selector

```marked-tabs
<marked-tab header="DevTools" lang="javascript">
document.querySelectorAll('ul.countries a[href]');
</marked-tab>
<marked-tab header="Node.js" lang="javascript">
$('ul.countries a[href]');
</marked-tab>
```

We already know both the `ul.countries` and `a[href]` selectors, but their combination is new. It's called a <a href="https://css-tricks.com/almanac/selectors/d/descendant/" target="_blank">descendant selector</a> and it selects all `<a href="...">` elements that are descendants of an `<ul class="countries">` element. A descendant is any element that's nested somewhere inside another element.

![nested HTML tags]({{@asset crawling_basics/images/nested-tag.webp}})

When we print all the URLs in the DevTools console, we'll see that we've correctly filtered only the country links.

```js
for (const a of document.querySelectorAll('ul.countries a[href]')) {
    console.log(a.href);
}
```

![country URLs printed to console]({{@asset crawling_basics/images/nested-tag.webp}})

## [](#pattern-filter) Filtering with pattern matching

Another common way to filter links (or any text really) is to match patterns with regular expressions.

> <a href="https://javascript.info/regexp-introduction" target="_blank">Learn more</a> about regular expressions.

We can inspect the country URLs, and we'll soon find that they all look like the following. That is, they're exactly the same except for the last 2 letters.

```text
https://www.alexa.com/topsites/countries/AF
https://www.alexa.com/topsites/countries/AX
https://www.alexa.com/topsites/countries/AL
https://www.alexa.com/topsites/countries/DZ
https://www.alexa.com/topsites/countries/AR
...
https://www.alexa.com/topsites/countries/{2_LETTER_COUNTRY_CODE}
```

Now we create a regular expression that matches those links. There are many ways to do this. For simplicity, let's go with this one:

```regexp
alexa\.com\/topsites\/countries\/[A-Z]{2}
```

This regular expression matches all URLs that include the `alexa.com/topsites/countries/` substring in them and then follow with 2 capital letters.

> A great way to learn more about regular expression syntax and to test your expressions are tools like <a href="https://regexr.com/" target="_blank">regexr.com</a> or <a href="https://regex101.com/" target="_blank">regex101.com</a>.

To test our regular expression in the DevTools console, we'll first create a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp" target="_blank">`RegExp`</a> object and then test the URLs with the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test" target="_blank">`regExp.test(string)`</a> function.

```js
// To demonstrate pattern matching, we use only the 'a'
// selector to select all links on the page.
for (const a of document.querySelectorAll('a')) {
    const regExp = new RegExp(/alexa\.com\/topsites\/countries\/[A-Z]{2}/);
    const url = a.href;
    if (regExp.test(url)) {
        console.log(url);
    }
}
```

If you run the code in DevTools, you'll see that it produces exactly the same URLs as the CSS filter.

> Yes, filtering with CSS selectors is often the better option. But sometimes it's not enough. Learning regular expressions is a very useful skill in many scenarios.

## [](#next) Next up

In the [next chapter]({{@link crawling_basics/relative_urls.md}}) we'll see how rewriting this code to Node.js is not so simple and learn about absolute and relative URLs in the process.
