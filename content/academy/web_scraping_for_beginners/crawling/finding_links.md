---
title: Finding Links
description: Learn what a link looks like in HTML and how to find and collect their URLs when web scraping using both DevTools and Node.js.
menuWeight: 2
paths:
- web-scraping-for-beginners/crawling/finding-links
---

# [](#finding-links) Finding links

There are many kinds of links on the internet, and we'll cover them in the advanced courses of the Academy. For now, let's think of links as <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a" target="_blank">HTML anchor elements</a> with `<a>` tags. A typical link looks like this:

```HTML
<a href="https://example.com">This is a link to example.com</a>
```

On a web page, the link above will look like this: "<a href="https://example.com" target="_blank">This is a link to example.com</a>," and when you click it, your browser will navigate to the URL in the `<a>` tag's `href` attribute (`https://example.com`).

> `href` means **H**ypertext **REF**erence. You don't need to remember this - just know that `href` typically means some sort of link.

## [](#collecting-links) Collecting links 🔗

So, if a link is just an HTML element, and the URL is just an attribute, this means that we can collect links exactly the same way as we collected data.💡 Easy!

To test this theory in a browser, we can try running the following code in our DevTools console on any website.

```JavaScript
// Select all the <a> elements.
const links = document.querySelectorAll('a');
// For each of the links...
for (const link of links) {
    // get the value of its 'href' attribute...
    const url = link.href;
    // and print it to console.
    console.log(url);
}
```

**_Boom_** 💥, all the links from the website have now been printed to the console. Unless you were on example.com, it's usually a lot of links. By doing this, we can get a first-hand look at how interconnected the web really is.

## [](#collecting-in-node) Collecting links in Node.js

DevTools are fun, but Node.js is way more useful. Let's create a new file in our project called `crawler.js` and start adding some basic crawling code. We'll start with the same boilerplate as with our original scraper, but this time, we'll download the HTML of <a href="https://demo-webstore.apify.org/" target="_blank">the demo site's main page</a>.

```JavaScript
// crawler.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

// This time we open main page
const response = await gotScraping('https://demo-webstore.apify.org/');
const html = response.body;

const $ = cheerio.load(html);

const links = $('a');

for (const link of links) {
    const url = $(link).attr('href');
    console.log(url);
}
```

Aside from importing libraries and downloading HTML, we loaded the HTML into Cheerio and then used it to retrieve all the `<a>` elements. After that, we iterated over the collected links and printed their `href` attributes, which we accessed using the <a href="https://api.jquery.com/attr/" target="_blank">`.attr()`</a> function. Remember, Cheerio functions are exactly the same as they are in jQuery.

## [](#next) Next up

After running the code, you will see quite a lot of links in the terminal. Some of them may look weird because they don't start with the regular `https://` protocol. We'll learn what to do with them in the [next lesson]({{@link web_scraping_for_beginners/crawling/filtering_links.md}}).
