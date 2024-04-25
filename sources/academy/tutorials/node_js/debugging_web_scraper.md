---
title: Debugging your Web Scraper pageFunction in browser's console
description: Test your Page Function's code directly in your browser's console
sidebar_position: 16.3
slug: /node-js/debugging-web-scraper
---

A lot of beginners struggle through trial and error while scraping a simple site. They write some code that might work, press the run button, see that error happened and they continue writing more code that might work but probably won't. This is extremely inefficient and gets tedious really fast.

What beginners are missing are simple tools and tricks to get things done quickly. One of these wow tricks is the option to run the JavaScript code directly in your browser.

Pressing F12 while browsing with Chrome, Firefox, or other popular browsers opens up the browser console, the magic toolbox of any web developer. The console allows you to run a code in the context of the website you are in. Don't worry, you cannot mess the site up (well, unless you start doing really nasty tricks) as the page content is downloaded on your computer and any change is only local to your PC.

# Running code in a browser console

> Test your Page Function's code directly in your browser's console.

First, you need to inject jQuery. You can try to paste and run this snippet.

```js
const jq = document.createElement('script');
jq.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(jq);
```

If that doesn't work because of a CORS violation, you can install [this extension](https://chrome.google.com/webstore/detail/ekkjohcjbjcjjifokpingdbdlfekjcgi) that injects jQuery on a button click.

You can test a `pageFunction` code in two ways in your console:

## Pasting and running a small code snippet

Usually, you don't need to paste in the whole pageFunction as you can isolate the critical part of the code you are trying to debug. You will need to remove any references to the `context` object and its properties like `request` and the final return statement but otherwise, the code should work 1:1.

I will also usually remove `const` declarations on the top level variables. This helps you to run the same code many times over without needing to restart the console (you cannot declare constants more than once). My declaration will change from:

```js
const results = [];
// Scraping something to fill the results
```

into

```js
results = [];
```

You can get all the information you need by running a snippet of your `pageFunction` like this:

```js
results = [];
$('.my-list-item').each((i, el) => {
    results.push({
        title: $(el).find('.title').text().trim(),
        // other fields
    });
});
```

Now the `results` variable stays on the page and you can do whatever you wish with it. Log it to analyze if your scraping code is correct. Writing a single expression will also log it in a browser console.

```js
results;
// Will log a nicely formatted [{ title: 'my-article-1'}, { title: 'my-article-2'}] etc.
```

## Pasting and running a full pageFunction

If you don't want to deal with copy/pasting a proper snippet, you can always paste the whole pageFunction. You will have to mock the context object when calling it. If you use some advanced tricks, this might not work but in most cases copy pasting this code should do it. This code is only for debugging your Page Function for a particular page. It does not crawl the website and the output is not saved anywhere.

<!-- eslint-disable -->
```js
async function pageFunction(context) {
    // this is your pageFunction
}
// Now you will call it with mocked context
pageFunction({
    request: {
        url: window.location.href,
        userData: { label: 'paste-a-label-if-you-use-one' },
    },
    async waitFor(ms) {
        console.log('(waitFor)');
        await new Promise((res) => setTimeout(res, ms));
    },
    enqueueRequest() { console.log('(enqueuePage)', arguments); },
    skipLinks() { console.log('(skipLinks)', arguments); },
    jQuery: $,
});
```

Happy debugging!
