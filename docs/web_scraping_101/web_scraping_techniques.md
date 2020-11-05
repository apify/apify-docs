---
title: Web scraping techniques
description: An introduction to the methods you can use to extract data from websites. Analyze web pages for hidden elements to find the most effective approach.
menuWeight: 4.1
paths:
    - web-scraping-101/web-scraping-techniques
---

# Web scraping techniques

This article provides a quick summary of ways websites structure and send their information. Knowing these techniques will help you extract data quicker and more efficiently.

Before scraping a new website, we recommend using our free-to-use [page analyzer](https://apify.com/page-analyzer) tool. It searches the page for all of the elements discussed below, allowing you to find the most effective way to scrape it.

You can find more in-depth discussion and code examples for all of the techniques in [this](https://blog.apify.com/web-scraping-in-2018-forget-html-use-xhrs-metadata-or-javascript-variables-8167f252439c) article.

## [](#css-selectors) CSS selectors

The first method you will use when trying web scraping is most likely
[CSS selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors). They allow you to select your desired elements by type, class, ID or attributes.

To see which element contains the information you need (and its details), open your browser's Developer Tools. Right-click the content, then select **Inspect** on [Chrome](https://developers.google.com/web/tools/chrome-devtools) and **Inspect element** on [Mozilla](https://developer.mozilla.org/en-US/docs/Tools).

![CSS selectors]({{@asset web_scraping_101/images/css-selectors.png}})

If you are only looking to scrape a couple of elements from a page, this method is sufficient. For more elaborate extraction use cases, however, there are other, more effective, methods.

## [](#schema-org-microdata) Schema.org microdata

Schemas provide a way to mark up web pages so major search engines like Google, Bing and Yahoo can understand them.

Pages with [schema.org](https://schema.org) markup still use HTML. The only difference is that they add machine-readable code markers into the HTML documents. This helps cut down on [ambiguity](https://schema.org/docs/gs.html) and allows search engines to [return more accurate results](https://moz.com/learn/seo/what-is-seo).

If a site uses microdata, you will find it in its `<head>` element using your browser's developer tools. It will be in a hidden element similar to the one below.

```html
<div itemscope itemtype="http://schema.org/Movie">
  <h1>Atlantics</h1>
  <span>Director: Mati Diop</span>
  <span>drama</span>
  <a href="../movies/atlantics-theatrical-trailer.html">Trailer</a>
</div>
```

Check out this [tutorial](https://help.apify.com/en/articles/1444245-scraping-data-from-websites-using-schema-org-microdata) to learn how to scrape pages using Schema.org microdata.

## [](#json-ld) JSON-LD

Similar to [Schema.org microdata](#schema-org-microdata), some sites use [JSON for Linking Data](https://json-ld.org/) (JSON-LD). Based on the [JSON](https://www.json.org/json-en.html) format, JSON-LD helps structure a web page's content in a way that's easy for humans and computers to read. This improves a site's [SEO](https://moz.com/learn/seo/what-is-seo).

To see if a website uses JSON-LD, check its `<head>` element using your browser's developer tools. You will find the JSON-LD data in a `<script>` element similar to the one below.

![JSON-LD data]({{@asset web_scraping_101/images/json-ld.png}})

Then, you can use the code below in your scraper to extract the data.

```js
const jsonLD = $('script[type="application/ld+json"]');
return JSON.parse(jsonLD.html());
```

## [](#internal-javascript-variables) Internal JavaScript variables

You can find internal JavaScript variables in a `<script>` tag in a web page's `<head>` element. These variables contain custom data that is set when the page loads.

To use internal variables, first load the page using [headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) (usually with [Puppeteer](https://github.com/GoogleChrome/puppeteer)). Once it is loaded, you can return the variable that contains it using `return {variable_name}` (within the page context).

For example, if you are searching for Kaffeine café on [Yelp](https://www.yelp.co.uk/search?find_desc=kaffeine&find_loc=London), search for the café's name in the page's HTML using developer tools. The data you would receive would look something like the example below.

```json
{
    "city": "London",
    "category_aliases": "cafe",
    "biz_id": "iUockw0CUssKZLyoGJYEXA",
    "biz_name": "Kaffeine London",
    "latitude": 51.5074,
    "longitude": 0.1278,
}
```

Check out [this tutorial](https://blog.apify.com/web-scraping-in-2018-forget-html-use-xhrs-metadata-or-javascript-variables-8167f252439c) for more information and code examples for scraping with internal Javascript variables.

## [](#xhrs) XHRs

[XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) (XHRs) allow you to scrape websites that load their data [dynamically](https://en.wikipedia.org/wiki/Dynamic_web_page#Client-side_scripting). When you perform the required action (e.g. click a **Load more** button), the page makes an [API](https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3214a82/) call to the XHR, which returns the data that will be displayed.

Using XHRs, you can access an entire API's content without even looking at the page. Just find the XHR that retrieves the data you want and use it to retrieve the data in a tidy structured format.

You can check the XHRs a web page sends under the **Network** tab, in the **XHR** section in your browser's developer tools.

![Network tab and XHR section]({{@asset web_scraping_101/images/xhrs.png}})

Check out [this tutorial](https://blog.apify.com/web-scraping-in-2018-forget-html-use-xhrs-metadata-or-javascript-variables-8167f252439c) for more information and code examples for scraping with XHRs.
