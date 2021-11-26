---
title: Browser DevTools
description: Learn about browser DevTools and how you can use them to extract data from a website.
menuWeight: 20.1
paths:
    - data_collection_fundamentals/browser-devtools
---

# [](#devtools) Browser DevTools

Even though DevTools stands for developer tools, everyone can use them to inspect a website. Each major browser has their own DevTools. We will use Chrome DevTools as an example, but the advice is applicable to any browser, as the tools are extremely similar. To open Chrome DevTools, press `F12` or right-click anywhere in the page and choose `Inspect`.

## [](#elements) Elements tab

When you first open Chrome DevTools, you will start on the Elements tab (In Firefox it's called the Inspector). You can use the tab to inspect the page's HTML on the left and also its CSS on the right. The items in the HTML view are called elements and they are all enclosed in HTML tags. For example `<div>`, `<p>` or `<span>` are tags. When you add something inside of those tags, like `<p>Hello!</p>` you create an element. You can also see elements inside elements in the Elements tab. This is called nesting and it gives the page its structure.

At the bottom there's the JavaScript console which you can use to manipulate the website. If the Console is not there, you can press `ESC` to toggle it. At first it looks super complicated, but don't worry, there's no need to understand everything.

![Chrome DevTools with elements tab and console]({{@asset data/images/browser-devtools.webp}})

## [](#select) Selecting an element

In the top left corner of the DevTools, there's a little arrow icon. When you click it and then hover your mouse over the website's content, DevTools will show you information about the HTML elements. And when you click, the element will be selected in the Elements tab.

![Chrome DevTools element selection hover effect]({{@asset data_collection_fundamentals/images/hover-effect.webp}})

## [](#interact) Interacting with an element

Now that you selected an element, you can right-click it to show many available actions. For now, select `Store as global variable` (`Use in Console` in Firefox). You'll see that a new variable called `temp1` (`temp0` in Firefox) appeared in your DevTools Console. You can now use the console to access the element's properties using JavaScript.

For example, you can print the text in the element using the following command:

```js
console.log(temp1.textContent);
```

Or the HTML of the element using this command:

```js
console.log(temp1.outerHTML);
```

![Chrome DevTools JavaScript command execution]({{@asset data_collection_fundamentals/images/basic-console-commands.webp}})

> You can interact with the page in many more ways using the Console. If you want to dive deeper we recommend this [tutorial on documents](https://javascript.info/document). A web page in a browser is called a document.

## [](#next) Next up

In this chapter we learned the absolute basics of interaction with a page using the DevTools. In the next chapter, you will learn how to extract data from it. We will collect the most popular websites on the internet from [Amazon Alexa](https://www.alexa.com/topsites).
