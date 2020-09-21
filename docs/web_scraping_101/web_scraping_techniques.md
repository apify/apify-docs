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
[CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors). They allow you to select your desired elements by type, class, ID or attributes. 

To see which element contains the information you need (and its details), open your browser's Developer Tools. Right-click the content, then select **Inspect** on [Chrome](https://developers.google.com/web/tools/chrome-devtools) and **Inspect element** on [Mozilla](https://developer.mozilla.org/en-US/docs/Tools).

If you're only looking to scrape a couple of elements from a page, this method is sufficient. For more elaborate extraction use cases, however, there are other, more effective, methods.

## [](#schema-org-microdata) Schema.org microdata

Schemas provide a way to mark up web pages so major search engines like Google, Bing and Yahoo can understand them. In fact, the [schema.org](https://schema.org) website was created via collaboration between the three companies. 

Pages with schema markup still use HTML. The only difference is that they add machine-readable code markers into the HTML documents. This helps cut down on [ambiguity](https://schema.org/docs/gs.html) and allows search engines to return more accurate results.

**** ADD how to scrape them...

## [](#json-ld) JSON-LD

## [](#internal-javascript-variables) Internal JavaScript variables

## [](#xhrs) XHRs

## [](#page-analyzer) Page analyzer


To learn about web scraping techniques in more detail and see code examples, visit
[this](https://blog.apify.com/web-scraping-in-2018-forget-html-use-xhrs-metadata-or-javascript-variables-8167f252439c) article.
