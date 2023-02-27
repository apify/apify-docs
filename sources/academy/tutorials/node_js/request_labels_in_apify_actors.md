---
title: Request labels and how to pass data to other requests
description: How to handle request labels in Apify actors with Cheerio or Puppeteer Crawler
sidebar_position: 15.1
slug: /node-js/request-labels-in-apify-actors
---

Are you trying to use actors for the first time and don't know how to deal with the request label or how to pass data to the request easily?

Here's how to do it.

If you are using the requestQueue, you can do it this way.

When you add a request to the queue, use the userData attribute.

```js
// Create a request list.
const requestQueue = await Apify.openRequestQueue();
//Add the request to the queue
await requestQueue.addRequest({
    url: 'https://www.example.com/',
    userData: {
        label: "START"
    }
});
```

So right now, we have one request in the queue that has the label "START".  Now we can specify which code should be executed for this request in the handlePageFunction.

```js
if (request.userData.label === "START") {
 // your code for the first request for example
 // enqueue the items of a shop
} else if (request.userData.label === "ITEM") {
 // other code for the item of a shop
}
```

And in the same way you can keep adding requests in the handlePageFunction.

You can also handle the passing of data to the request like this. For example, when we have extracted the item from the shop above, we want to extract some information about the seller. So we need to pass the item object to the seller page, where we save the rating of a seller, e.g..

```js
await requestQueue.addRequest({
    url: sellerDetailUrl,
    userData: {
        label: "SELLERDETAIL",
        data: itemObject
    }
});
```

Now, in the "SELLERDETAIL" url, we can just evaluate the page and extracted data merge to the object from the item detail, for example like this

```js
const result = Object.assign({}, request.userData.data, sellerDetail);
```

So next just save the results and we're done!

```js
await Apify.pushData(result);
```
