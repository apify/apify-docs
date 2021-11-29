---
title: DevTools continued
description: Continue learning how to collect data from a website using browser DevTools, CSS selectors and JavaScript.
menuWeight: 20.3
paths:
    - data-collection-fundamentals/devtools-continued
---

# [](#finish-devtools) Finish with DevTools

In the first part of the DevTools tutorial, we were able to collect information about a single website from the <a href="https://www.alexa.com/topsites" target="_blank">Alexa Top Sites index</a>. If you missed the previous part, we suggest going through it to understand the basic concepts, but you don't need any of the code from there, we will start from scratch.

## [](#looping) Looping over elements

If you're not familiar with the concept of loops in programming, <a href="https://javascript.info/while-for" target="_blank">check out this tutorial</a>. If you're not familiar with functions that iterate over an array, <a href="https://javascript.info/array-methods#iterate-foreach" target="_blank">this tutorial will help</a>.

First, we will use the `querySelectorAll()` function from the previous chapter to get an array of all the elements that contain the sites' data.

```js
const sites = document.querySelectorAll('div.site-listing');
console.log(sites);
```

![Print all websites]({{@asset data_collection_fundamentals/images/print-all-websites.webp}})

Second, we will loop over the sites and print their unstructured data. The `forEach` function accepts one argument, which is a function that will be invoked for each element of the `sites` array.

```js
sites.forEach((site) => console.log(site.textContent));
```

> If you're not familiar with arrow functions (`=>`), visit <a href="https://javascript.info/arrow-functions-basics" target="_blank">this tutorial</a> to learn more.

![Print all websites' text]({{@asset data_collection_fundamentals/images/print-all-websites-text.webp}})

## [](#collecting-data) Collecting data in a loop

In the previous chapter we created a `result` object that contained data of a single website. Now we'll create an array of those result objects which will contain all the 50 websites' data. To do that, we'll use a function called `map()` and the collection skills we learned in the previous chapter.

> <a href="https://javascript.info/array-methods#map" target="_blank">Learn more</a> about the `array.map()` function.

```js
const results = Array.from(sites).map((site) => {
    const fields = site.querySelectorAll('div.td');
    return {
        rank: fields[0].textContent.trim(),
        site: fields[1].textContent.trim(),
        dailyTimeOnSite: fields[2].textContent.trim(),
        dailyPageViews: fields[3].textContent.trim(),
        percentFromSearch: fields[4].textContent.trim(),
        totalLinkingSites: fields[5].textContent.trim(),
    };
});
console.log(results);
```

We have to admit that we were not honest with you in the previous chapter. The `querySelectorAll()` function does not really return an `Array`. It returns a `NodeList`, which is almost the same as an `Array`. One of the differences is that a `NodeList` does not have access to the `map()` function, so we first had to convert it to an `Array` using the `Array.from()` function.

With that said, the rest of the code is just copy-pasted from the previous chapter. For each `site` in `sites`, we find all the `fields` with data for that particular `site` and save them to the `results` array by returning the object with the data. When you run the code, you should see all the data neatly structured.

![Print all websites' data]({{@asset data_collection_fundamentals/images/print-all-websites-data.webp}})

## [](#next) Next up

And that's it. With a bit of trial and error you will be able to collect any data from a webpage that's loaded in your browser. This is a useful skill on its own. It will save you time when you need one-off data for your project. More importantly though, it taught you the basics to start programming your own scrapers. In the [next chapters]({{@link data_collection_fundamentals/computer_preparation.md}}), we will teach you how to create your own data collection script in JavaScript and Node.js.
