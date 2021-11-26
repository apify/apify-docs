---
title: Project setup
description: Create a new scraper project with NPM and Node.js, install libraries and test that everything works correctly.
menuWeight: 20.5
paths:
    - data-collection-fundamentals/project-setup
---

# [](#setting-up) Setting up your project

When you open a website in a browser, the browser first downloads the page's initial HTML. To do the same thing with Node.js, we will install a program - an NPM module - to help us with it. NPM modules are installed using `npm`, which is a program automatically installed with Node.js.

> [NPM](https://www.npmjs.com/) has a huge collection of open-source libraries for Node.js. You can (and you should) utilize it to save time and tap into the amazing open-source community around JavaScript and Node.js.


## [](#create-project) Create a new NPM project

Before we can install NPM modules we need to create an NPM project. To do that, create a new directory and from that directory run this command in your terminal:

```shell
npm init -y
```

It will set up an empty NPM project for you and create a file called `package.json`. This is a very important file in Node.js programming as it contains information about the project.

### [](#modern-javascript) Use modern JavaScript

Node.js and NPM support two types of projects, let's call them legacy and modern. For backwards compatibility, the legacy version is used by default. To switch to the modern version, open your `package.json` and add this line to the end of the JSON object.

```text
"type": "module"
```

> If you want to learn more about JSON and its syntax, we recommend [this tutorial on MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON).

## [](#install-libraries) Install the libraries

Now that we have a project set up, we can install NPM modules into the project. We will do that and install a libraries that will help us very easily download and process websites' HTML. In the project directory, run the following command, which will install two libraries into your project. `got-scraping` and `cheerio`.

```shell
npm install --save got-scraping cheerio
```

[`got-scraping`](https://github.com/apify/got-scraping) is a library that's made especially for scraping and downloading page's HTML. It's based on the [very popular `got`](https://github.com/sindresorhus/got) library, which means any features of `got` are also available in `got-scraping`.

> More precisely, `got` and `got-scraping` are HTTP clients. To learn more about HTTP, [visit this MDN tutorial](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP).

[`cheerio`](https://github.com/cheeriojs/cheerio) is the most popular Node.js library for parsing (processing) HTML. It is a replica of probably the most popular JavaScript library of all time - [JQuery](https://jquery.com/). We can't use JQuery in Node.js, because it only works in the browser so we replace it with `cheerio`, which is exactly the same.

## [](#test) Test everything

With the libraries installed, create a new file in the project's folder called `main.js`. This is where we will put all our code. Before we start scraping though, let's do a simple check that everything installed correctly. Inside `main.js` add this piece of code.

```js
import gotScraping from 'got-scraping';
import cheerio from 'cheerio';

console.log('it works!');
```

Those `import` statements tell Node.js that it should give you access to the `got-scraping` library under the `gotScraping` variable and the `cheerio` library under the `cheerio` variable. Now run this command in your terminal:

```shell
node main.js
```

If you see `it works!` printed in your terminal, great job! You set up everything correctly. If you see an error that says `Cannot use import statement outside a module`, go back to the [Use modern JavaScript](#use-modern-javascript) section and add the `type` property to your `package.json`. If you see a different error, try copy pasting it into Google and you'll find a solution soon.

## [](#next) Next up

With the project set up, the next chapter will show you how to use `got-scraping` to download the website's HTML and collect data from it with `cheerio`.
