---
title: Processing the same page multiple times with different setups in Web Scraper
description: Solving a common problem with scraper automatically deduplicating the same URLs
sidebar_position: 15.6
slug: /node-js/processing-multiple-pages-web-scraper
---

There is a certain scraping scenario in which you need to process the same URL many times, but each time with a different setup (e.g. filling in a form with different data each time). This is easy to do with Apify, but how to go about it may not be obvious at first glance.

We'll show you how to do this with a simple example: starting a scraper with an array of keywords, inputting each of the keywords separately into Google, and retrieving the results on the last page. The tutorial will be split into these three main parts.

This whole thing could be done in a much easier way, by directly enqueuing the search URL, but we're choosing this approach to demonstrate some of the not so obvious features of the Apify scraper.

# Enqueuing start pages for all keywords

> Solving a common problem with scraper automatically deduplicating the same URLs.

First, we need to start the scraper on the page from which we're going to do our enqueuing. To do that, we create one start URL with the label "enqueue" and URL "[https://example.com](https://example.com/)". Now we can proceed to enqueue all the pages. The first part of our pageFunction will look like this:

```js
async function pageFunction(context) {
const $ = context.jQuery;

if (context.request.userData.label === 'enqueue') {

// parse input keywords
    const keywords = context.customData;

// process all the keywords
 for (const keyword of keywords) {
        // enqueue the page and pass the keyword in
        // the interceptRequestData attribute
        await context.enqueueRequest({
            url: 'https://google.com',
            uniqueKey: Math.random() + '',
 userData: {
 label: 'fill-form',
 keyword,
 }
        });
    }
 // No return here because we don't extract any data yet
}
}
```

To set the keywords, we're using the customData scraper parameter. This is useful for smaller data sets, but may not be perfect for bigger ones. For such cases you may want to use something like [Importing a list of URLs from an external source](http://kb.apify.com/integration/importing-a-list-of-urls-from-an-external-source).

Since we're enqueuing the same page more than once, we need to set our own uniqueKey so the page will be added to the queue (by default uniqueKey is set to be the same as the URL). The label for the next page will be "fill-form". We're passing the keyword to the next page in the userData field (this can contain any data).

# Inputting the keyword into Google

Now we come to the next page (Google). We need to retrieve the keyword and input it into the Google search bar. This will be the next part of the pageFunction:

```js
// Add this code into the previous pageFunction
else if (context.request.userData.label === 'fill-form'){

// retrieve the keyword
    const { keyword } = context.request.userData;

// input the keyword into the search bar
    $('#lst-ib').val(keyword);

// submit the form
    $('#tsf').submit();
}
```

For the next page to correctly enqueue, we're going to need a new pseudoURL. Create a pseudoURL with the label "result" and the URL "[https://www.google.com/search?[.+]](https://www.google.com/search?%5B.+%5D)".

Now we're on the last page and can finally extract the results.

```js
// Add this code into the previous pageFunction
else if (context.request.userData.label === 'result') {

// create result array
    const result = [];

// process all the results
    $('.rc').each(function(index, elem){

// wrap element in jQuery
        const gResult = $(elem);

// lookup link and text
        const link = gResult.find('.r a');
        const text = gResult.find('.s .st');

// extract data and add it to result array
      result.push({
            name: link.text(),
            link: link.attr('href'),
            text: text.text(),
        });

});

    // Now we finally return

return result;
}
```

To test the scraper, set the customData to something like this `["apple", "orange", "banana"]` and push the Run button to start.
