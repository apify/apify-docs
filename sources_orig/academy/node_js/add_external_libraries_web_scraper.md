---
title: How to add external libraries to Web Scraper
description: Web Scraper does not provide an option to load external JavaScript libraries. Fortunately, there's an easy way to do it. Learn how.
menuWeight: 15.7
paths:
    - node-js/add-external-libraries-web-scraper
---

Sometimes you need to use some extra JavaScript in your [Web Scraper](https://apify.com/apify/web-scraper) page functions. Whether it is to work with dates and times using [Moment.js](https://momentjs.com/), or to manipulate the DOM using [jQuery](https://jquery.com/), libraries save precious time and make your code more concise and readable. Web Scraper already provides an easy way to add jQuery to your page functions. All you need to do is to check the Inject jQuery input option. There's also the option to Inject Underscore, a popular helper function library.

In this tutorial, we'll learn how to inject any JavaScript library into your page functions, with the only limitation being that the library needs to be available somewhere on the internet as a downloadable file (typically a CDN).

## Injecting Moment.js

Moment.js is a very popular library for working with date and time. It helps you with the parsing, manipulation, and formatting of datetime values in multiple locales and has become the de-facto standard for this kind of work in JavaScript.

To inject Moment.js into our page function (or any other library using the same method), we first need to find a link to download it from. We can easily find it in [Moment.js' documentation](https://momentjs.com/docs/#/use-it/browser/) under the CDN links.

> <https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js>

Now we have two options. Inject the library using plain JavaScript, or if you prefer working with jQuery, use a jQuery helper.

## Injecting a library with plain JavaScript

```JavaScript
async function pageFunction(context) {\
    const libraryUrl = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js";

// Inject Moment.js\
    await new Promise((resolve) => {\
        const script = document.createElement("script");\
        script.src = libraryUrl;\
        script.addEventListener('load', resolve);\
        document.body.append(script);\
    });

// Confirm that it works.\
    const now = moment().format("ddd, hA");\
    context.log.info("NOW: " + now);\
}
```

We're creating a script element in the page's DOM and waiting for the script to load. Afterwards, we just confirm that the library has been successfully loaded by using one of its functions.

## Injecting a library using jQuery

After you select the Inject jQuery input option, jQuery will become available in your page function as `context.jQuery` .

```JavaScript
async function pageFunction(context) {\
    const libraryUrl = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js";

const $ = context.jQuery;

// Inject Moment.js\
    await $.getScript(libraryUrl);

// Confirm that it works.\
    const now = moment().format("ddd, hA");\
    context.log.info("NOW: " + now);\
}
```

With jQuery, we're simply using the `$.getScript()` helper to fetch the script for us and wait for it to load.

## Dealing with errors

Some websites employ security measures that disallow loading external scripts within their pages. Luckily, those measures can be easily overridden with Web Scraper. If you are encountering errors saying that your library cannot be loaded due to a security policy, just select the Ignore CORS and CSP input option at the very bottom of Web Scraper input and the errors should go away.

Happy scraping!
