---
title: Web scraping techniques
description: An introduction to the techniques you can use to extract data from websites.
menuWeight: 3.1
paths:
    - web-scraping-101/web-scraping-techniques
---

# Web scraping techniques

This article is a quick summary of the blog post [link], which includes more details and code examples.

## [](#css-selectors) CSS selectors

The first method you'll use when trying web scraping is most likely
[HTML elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
[CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors). All content on a web page is contained in HTML elements. [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), meanwhile, determines the content's appearance.

To see which element contains the information you need, open your browser's Developer Tools. Right-click the content, then select **Inspect** on [Chrome](https://developers.google.com/web/tools/chrome-devtools) and **Inspect element** on [Mozilla](https://developer.mozilla.org/en-US/docs/Tools).

![Opening developer tools]({{@asset images/open-devtools.png}})

Here, you can see that the title's container is an \<h1></h1> tag. You can use just the HTML tag. If there are several tags of the same type, though, you'll want to be more specific. For example, you can use the element's [class](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class) name. Once you know which elements you need, pass them to your web scraping software.

## [](#schema-org-microdata) Schema.org microdata



## [](#json-ld) JSON-LD

## [](#internal-javascript-variables) Internal JavaScript variables

## [](#xhrs) XHRs

## [](#page-analyzer) Page analyzer


To learn about web scraping techniques in more detail and see code examples, visit
[this](https://blog.apify.com/web-scraping-in-2018-forget-html-use-xhrs-metadata-or-javascript-variables-8167f252439c) article.
