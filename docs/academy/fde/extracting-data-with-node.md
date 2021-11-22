---
title: Extracting data with Node.js - Part 1
description: Learn how to use JavaScript and Node.js to create a web scraper. With the help of the cheerio and got-scraping libraries.
menuWeight: 20.6
paths:
- academy/fde/extracting-data-with-node-part-1
---

# Extracting data with Node.js - Part 1
Finally we have everything ready to start scraping! Yes, the setup is a bit daunting, but luckily, you only have to do it once. We have our project, we have our `main.js` file, so let's add some code to it.

## Downloading HTML
We will use the `got-scraping` library to download the HTML of the [Alexa Top Sites index](https://www.alexa.com/topsites). Careful, the `import` statement is a little different than in the previous chapter.

```js
// main.js
import { gotScraping } from 'got-scraping'

const response = await gotScraping('https://www.alexa.com/topsites')
const html = response.body
console.log(html);
```

Now run the script (using `node main.js`). After a brief moment, you should see the page's HTML printed in your terminal.

> `gotScraping` is an `async` function and the `await` keyword is used to pause execution of the script until it returns the `response`. Learn more about `async` and `await` [in this tutorial](https://javascript.info/async-await).

## Parsing HTML
Having the HTML printed to the terminal is not very helpful. To extract the data, we first have to parse it. Thanks to parsing, we will be able to query the HTML elements similarly to the way we did it in browser in the [Extracting Data using DevTools]() chapters. To parse HTML, we load it into the `cheerio` library.

```js
// main.js
import { gotScraping } from 'got-scraping'
import cheerio from 'cheerio'

const response = await gotScraping('https://www.alexa.com/topsites')
const html = response.body

const $ = cheerio.load(html);
const titleElement = $('title')
const titleText = titleElement.text()
console.log(titleText)
```

When you run the above script `Alexa - Top sites` will be printed to the console. And that's great. It means that we successfully parsed the HTML and extracted the text of the `<title>` element from it using `cheerio`. Let's break it down.

First we loaded the downloaded `html` into `cheerio` using the `load()` function. This created a new function, conventionally named `$`, which allows us to work with the loaded HTML. Then we called `$('title')`, which found the `<title>` element by using the `title` CSS selector. Finally we extracted the text from the element using the `.text()` function and printed it to the console.

> `$('title')` is very similar to calling `document.querySelector('title')` in the browser and `element.text()` is similar to `element.textContent` from the earlier DevTools chapters.

> To learn more about `cheerio` syntax, which is the same as JQuery syntax, visit the [`cheerio` documentation](https://github.com/cheeriojs/cheerio#readme).

## Next up
In the next part of this chapter we will learn more about `cheerio` and use it to extract all the websites' data from the Alexa Top sites index.
