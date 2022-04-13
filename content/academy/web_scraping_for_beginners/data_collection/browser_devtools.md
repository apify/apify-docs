---
title: Browser DevTools
description: Learn about browser DevTools, a valuable tool in the world of web scraping , and how you can use them to collect data from a website.
menuWeight: 1
paths:
    - web-scraping-for-beginners/data-collection/browser-devtools
---

# [](#devtools) Browser DevTools

Even though DevTools stands for developer tools, everyone can use them to inspect a website. Each major browser has their own DevTools. We will use Chrome DevTools as an example, but the advice is applicable to any browser, as the tools are extremely similar. To open Chrome DevTools, press **F12** or right-click anywhere in the page and choose **Inspect**.

## [](#elements-tab) Elements tab

When you first open Chrome DevTools, you will start on the Elements tab (In Firefox it's called the **Inspector**). You can use this tab to inspect the page's HTML on the left hand side, and its CSS on the right. The items in the HTML view are called **elements** or **nodes**. Each element is enclosed in an HTML tag. For example `<div>`, `<p>`, and `<span>` are all tags. When you add something inside of those tags, like `<p>Hello!</p>` you create an element. You can also see elements inside other elements in the **Elements** tab. This is called nesting, and it gives the page its structure.

At the bottom, there's the **JavaScript console**, which is a powerful tool which can be used to manipulate the website. If the console is not there, you can press <p><kbd>ESC</kbd></p> to toggle it. All of this might look super complicated at first, but don't worry, there's no need to understand everything just yet - we'll be walking you through all the important things you need to know.

![Chrome DevTools with elements tab and console]({{@asset web_scraping_for_beginners/data_collection/images/browser-devtools.webp}})

## [](#selecting-an-element) Selecting an element

In the top left corner of DevTools, there's a little arrow icon with a square. When you click it and hover your mouse over some of the website's content, DevTools will show you information about the HTML element being hovered over. When you click the element, it will be selected in the **Elements** tab, which allows for further inspection of the node and its content.

![Chrome DevTools element selection hover effect]({{@asset web_scraping_for_beginners/data_collection/images/hover-effect.webp}})

## [](#interacting-with-elements) Interacting with an element

After you select an element, you can right-click the highlighted element in the Elements tab to show a menu with available actions. For now, select **Store as global variable** (**Use in Console** in Firefox). You'll see that a new variable called `temp1` (`temp0` in Firefox) appeared in your DevTools Console. You can now use the console to access the element's properties using JavaScript.

For example, if you wanted to scrape the text in the element, you could use the `textContent` property to get it. The following command will get the text of your `temp1` element and print it to the console using the `console.log()` function.

```JavaScript
console.log(temp1.textContent);
```

You can also get the HTML of the element using this command:

```JavaScript
console.log(temp1.outerHTML);
```

And you could even change the text of the element, if you wanted to:

```JavaScript
temp1.textContent = 'Hello!';
```

![Chrome DevTools JavaScript command execution]({{@asset web_scraping_for_beginners/data_collection/images/basic-console-commands.webp}})

> You can interact with the page in many more ways using the Console. If you want to dive deeper we recommend this [tutorial on documents](https://javascript.info/document). A web page in a browser is called a document.

## [](#next) Next up

In this lesson, we learned the absolute basics of interaction with a page using the DevTools. In the [next lesson]({{@link web_scraping_for_beginners/data_collection/using_devtools.md}}), you will learn how to extract data from it. We will collect data about the on-sale products on [this e-commerce website](this e-commerce website). This isn't a real website, just a demo site for the Academy which uses the latest technologies that a real-world modern e-commerce web-application would use.
