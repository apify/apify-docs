---
title: Scraping sites with a shadow DOM
description: The shadow DOM enables the isolation of web components, but causes problems for those building web scrapers. Here's an easy workaround.
menuWeight: 4
paths:
- tutorials/scraping-shadow-doms
---

# [](#scraping-shadow-doms) Scraping sites with a shadow DOM

Each website is represented by an HTML DOM, a tree-like structure consisting of HTML elements (e.g. paragraphs, images, videos) and text. [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) allows the separate DOM trees to be attached to the main DOM while remaining isolated in terms of CSS inheritance and JavaScript DOM manipulation. The CSS and JavaScript codes of separate shadow DOM components do not clash, but the downside is that you can't easily access the content from outside.

Let's take a look at this page [alodokter.com](https://www.alodokter.com/). If you click on the menu and open a Chrome debugger, you will see that the menu tree is attached to the main DOM as shadow DOM under the element `<top-navbar-view id="top-navbar-view">`.

![Shadow root of the top-navbar-view custom element]({{@asset tutorials/images/shadow.webp}})

The rest of the content is rendered the same way. This makes it hard to scrape because `document.body.innerText`, `document.getElementsByTagName('a')`, and all others return an empty result.

The content of the menu can be accessed only via the [`shadowRoot`](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot) property. If you use jQuery you can do the following:

```JavaScript
// Find element that is shadow root of menu DOM tree.
const shadowRoot = document.getElementById('top-navbar-view').shadowRoot;

// Create a copy of its HTML and use jQuery find links.
const links = $(shadowRoot.innerHTML).find('a');

// Get URLs from link elements.
const urls = links.map((obj, el) => el.href);
```

However, this isn't very convenient, because you have to find the root element of each component you want to work with, and you can't easily take advantage of all the scripts and tools you already have.

So instead of that, we can replace the content of each element containing shadow DOM with the HTML of shadow DOM.

```JavaScript
// Iterate over all elements in the main DOM.
for (let el of document.getElementsByTagName('*')) {
   // If element contains shadow root then replace its 
   // content with the HTML of shadow DOM.
   if (el.shadowRoot) el.innerHTML = el.shadowRoot.innerHTML;
}
```

After you run this, you can access all the elements and content easily using jQuery or plain JavaScript. The downside is that it breaks all the interactive components because you create a new copy of the shadow DOM HTML content without the JavaScript code and CSS attached, so this must be done after all the content has been rendered.

Some websites may contain shadow DOMs recursively inside of shadow DOMs. In these cases, we must replace them with HTML recursively:

```JavaScript
// Returns HTML of given shadow DOM.
const getShadowDomHtml = (shadowRoot) => {
    let shadowHTML = '';
    for (let el of shadowRoot.childNodes) {
        shadowHTML += el.nodeValue || el.outerHTML;
    }
    return shadowHTML;
};

// Recursively replaces shadow DOMs with their HTML.
const replaceShadowDomsWithHtml = (rootElement) => {
    for (let el of rootElement.querySelectorAll('*')) {
        if (el.shadowRoot) {
            replaceShadowDomsWithHtml(shadowRoot);
            el.innerHTML += getShadowDomHtml(el.shadowRoot);
        }
    }
};

replaceShadowDomsWithHtml(document.body);
```
