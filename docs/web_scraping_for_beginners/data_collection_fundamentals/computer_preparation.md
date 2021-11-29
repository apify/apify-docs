---
title: Computer preparation
description: Set up your computer to be able to code scrapers with Node.js and JavaScript. Download Node.js and NPM and run a Hello World script.
menuWeight: 4
paths:
    - web-scraping-for-beginners/data-collection-fundamentals/computer-preparation
---

# [](#prepare) Prepare your computer for programming

Before you can start writing scraper code, you need to have your computer set up for it. In this chapter, we will show you all the tools you need to install to successfully write your first scraper.

## [](#install-node) Install Node.js

Let's start with installation of Node.js. Node.js is an engine for running JavaScript, quite similar to the browser console we used in the previous chapters. You feed it JavaScript code, and it executes it for you. Why not just use the browser console? Simply put, because it's limited in its capabilities. Node.js is way more powerful and is much better suited for coding scrapers.

To install Node.js [visit the official Node.js website](https://nodejs.org/en/download/), download the installer, and follow the instructions.

## [](#install-editor) Install a text editor

There are many text editors you can choose from for programming. You might already have a preferred one so feel free to use that. Just make sure it has syntax highlighting and support for Node.js. If you don't have any text editor, we suggest starting with VSCode. It's free, very popular, and well maintained. [Download it here](https://code.visualstudio.com/download).

## [](#hello-world) Hello World

Before we start, let's confirm that Node.js was successfully installed on your computer. To do that, run those two commands in your terminal and see if they correctly print your Node.js and NPM versions.

```shell
node -v
npm -v
```

> If you're wondering what a "terminal" is, we suggest googling for a terminal tutorial for your operating system because there are many different terminals.

Now that we confirmed that `node` is correctly installed on your computer, use your text editor to create a file called `script.js` in some directory, add this piece of code there and save the file.

```js
console.log('Hello World');
```

Now, in your terminal and in the directory with the `script.js` file, run this command:

```shell
node script.js
```

You should see **Hello World** printed in your terminal. If you do, congratulations, you are now officially a programmer! 🚀

## [](#next) Next up

You have your computer set up correctly, and you've run your first script. Great! In the next chapter we'll set up your project to download a website's HTML using Node.js instead of a browser.
