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

> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration" target="_blank">Visit this tutorial</a> if you want to refresh the concept of loops in programming.

First, we will use the `querySelectorAll()` function from the previous chapter to get an array of all the elements that contain the sites' data.

```js
const sites = document.querySelectorAll('div.site-listing');
console.log(sites);
```

![Print all websites]({{@asset data_collection_fundamentals/images/print-all-websites.webp}})

Second, we will loop over the sites and print their unstructured data. The following `for..of` loop will iterate over all elements of the `sites` array and execute the code provided in curly brackets `{}` for each element. In each iteration, the element is saved into the variable called `site` and we can use the variable to interact with the element.

```js
for (const site of sites) {
    console.log(site.textContent);
}
```

> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of" target="_blank">Find out more</a> about the `for..of` loop.

![Print all websites' text]({{@asset data_collection_fundamentals/images/print-all-websites-text.webp}})

## [](#collecting-data) Collecting data in a loop

In the previous chapter we created a `result` object that contained data of a single website. Now we'll create an array of those result objects which will contain all the 50 websites' data. To do that, we'll first create an empty array called `results` and then use a `for..of` loop, and the collection skills we learned in the previous chapter.

```js
const results = [];

for (const site of sites) {
    const fields = site.querySelectorAll('div.td');
    results.push({
        rank: fields[0].textContent.trim(),
        site: fields[1].textContent.trim(),
        dailyTimeOnSite: fields[2].textContent.trim(),
        dailyPageViews: fields[3].textContent.trim(),
        percentFromSearch: fields[4].textContent.trim(),
        totalLinkingSites: fields[5].textContent.trim(),
    });
}

console.log(results);
```

The `results.push()` function takes its argument and pushes (adds) it to the `results` array. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push" target="_blank">Learn more about it here</a>. The rest of the code is just copy-pasted from the previous chapter. For each `site` of `sites`, we find all the `fields` with data for that particular `site` and save them to the `results` array by returning the object with the data. When you run the code, you should see all the data neatly structured.

![Print all websites' data]({{@asset data_collection_fundamentals/images/print-all-websites-data.webp}})

## [](#next) Next up

And that's it. With a bit of trial and error you will be able to collect any data from a webpage that's loaded in your browser. This is a useful skill on its own. It will save you time when you need one-off data for your project. More importantly though, it taught you the basics to start programming your own scrapers. In the [next chapters]({{@link data_collection_fundamentals/computer_preparation.md}}), we will teach you how to create your own data collection script in JavaScript and Node.js.
