---
title: Submitting forms on .ASPX pages
description: How to handle pages created with ASP.NET in Web Scraper.
sidebar_position: 15.4
slug: /node-js/submitting-forms-on-aspx-pages
---

Apify users sometimes need to submit a form on pages created with ASP.NET (URL typically ends with .aspx). These pages have a different approach for how they submit forms and navigate through pages.

This tutorial shows you how to handle these kinds of pages. This approach is based on a [blog post](https://web.archive.org/web/20230530120937/https://toddhayton.com/2015/05/04/scraping-aspnet-pages-with-ajax-pagination/) from Todd Hayton, where he explains how crawlers for ASP.NET pages should work.

First of all, you need to copy&paste this function to your [Web Scraper](https://apify.com/apify/web-scraper) _Page function_:

```js
const enqueueAspxForm = async function (request, formSelector, submitButtonSelector, async) {
    request.payload = $(formSelector).serialize();
    if ($(submitButtonSelector).length) {
        request.payload += decodeURIComponent(`&${$(submitButtonSelector).attr('name')}=${$(submitButtonSelector).attr('value')}`);
    }
    request.payload += decodeURIComponent(`&__ASYNCPOST=${async.toString()}`);
    request.method = 'POST';
    request.uniqueKey = Math.random();
    await context.enqueueRequest(request);
    return request;
};
```

The function has these parameters:

`request` - the object that describes the next request

`formSelector` - selector for a form to be submitted e.g 'form[name="test"]'

`submitButtonSelector` - selector for a button for submit form e.g. '#nextPageButton'

`async` - if true, request returns only params, not HTML content

Then you can use it in your Page function as follows:

```js
await enqueueAspxForm({
    url: 'http://architectfinder.aia.org/frmSearch.aspx',
    userData: { label: 'SEARCH-RESULT' },
}, 'form[name="aspnetForm"]', '#ctl00_ContentPlaceHolder1_btnSearch', false);
```
