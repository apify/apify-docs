---
title: Finding links
description: Learn what a link looks like in HTML and how to find and collect their URLs when web scraping using both DevTools and Node.js.
menuWeight: 21.2
paths:
- crawling-basics/finding-links
---

# [](#find) Finding links

There are many kinds of links on the internet, and we'll cover them in the advanced crawling course of the Academy. For now, let's think of links as the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a" target="_blank">HTML anchor elements</a> with `<a>` tags. A typical link looks like this:

```html
<a href="https://example.com">This is a link to example.com</a>
```

On a web page, the link above will look like this: <a href="https://example.com" target="_blank">This is a link to example.com</a> and when you click it, your browser will navigate to the provided URL `https://example.com`.

> The URL is in the `href` HTML attribute. It means Hypertext REFerence and you don't need to remember it. Just know that `href` typically means some sort of a link.

## [](#collect) Collecting links 🔗

So, if a link is just an HTML element and the URL is just an attribute, this means that we can collect links exactly the same way as we collected data.💡 Easy.

To test this in a browser, you can try running this code in your DevTools console, on any website.

```js
// Select all the <a> elements.
const links = document.querySelectorAll('a');
// For each of the links...
for (const link of links) {
    // get the value its 'href' attribute...
    const url = link.href;
    // and print it to console.
    console.log(url);
}
```

And boom 💥, all the links from the website are now in your Console. Unless you were on example.com, it's usually a lot of links. You can see first-hand, how the Web is inter-connected.

## [](#node) Collecting links in Node.js

DevTools are fun, but Node.js is way more useful. Let's create a new file in our project called `crawler.js` and start adding some basic crawling code. We'll start the same as with our scraper, but this time we'll download the <a href="https://www.alexa.com/topsites/countries" target="_blank">Alexa Top Sites by Country index</a>.

```js
// crawler.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

// This time we open the per-country list of the Alexa Top Sites index
const response = await gotScraping('https://www.alexa.com/topsites/countries');
const html = response.body;

const $ = cheerio.load(html);

const links = $('a');

for (const link of links) {
    const url = $(link).attr('href');
    console.log(url);
}
```

Aside from importing libraries and downloading HTML, we loaded the HTML into Cheerio and then used it to retrieve all the `<a>` elements. After that, we iterated over the collected links and printed their `href` attribute, which we accessed using the <a href="https://api.jquery.com/attr/" target="_blank">`.attr('href')`</a> function. Remember, Cheerio functions are exactly the same as JQuery.

## [](#next) Next up

After running the code, you will see quite a lot of links in the terminal. Some of them may look weird because they don't start with the regular `https://` protocol. We'll learn what to do with them in the [next chapter]({{@link crawling_basics/filtering_links.md}}).
