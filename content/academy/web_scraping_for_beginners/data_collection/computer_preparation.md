---
title: Computer preparation
description: Set up your computer to be able to code scrapers with Node.js and JavaScript. Download Node.js and NPM and run a Hello World script.
menuWeight: 4
paths:
    - web-scraping-for-beginners/data-collection/computer-preparation
---

# [](#prepare) Prepare your computer for programming

Before you can start writing scraper code, you need to have your computer set up for it. In this lesson, we will show you all the tools you need to install to successfully write your first scraper.

## [](#install-node) Install Node.js

Let's start with installation of Node.js. Node.js is an engine for running JavaScript, quite similar to the browser console we used in the previous lessons. You feed it JavaScript code, and it executes it for you. Why not just use the browser console? Simply put, because it's limited in its capabilities. Node.js is way more powerful and is much better suited for coding scrapers.

To install Node.js <a href="https://nodejs.org/en/download/" target="_blank">visit the official Node.js website</a>, download the installer, and follow the instructions.

## [](#install-editor) Install a text editor

There are many text editors you can choose from for programming. You might already have a preferred one so feel free to use that. Just make sure it has syntax highlighting and support for Node.js. If you don't have any text editor, we suggest starting with VSCode. It's free, very popular, and well maintained. <a href="https://code.visualstudio.com/download" target="_blank">Download it here</a>.

Once you downloaded and installed it, you can open a folder where we will build your scraper. We recommend starting with a new, empty folder.

![Showing how to open a folder in VSCode]({{@asset web_scraping_for_beginners/data_collection/images/vscode-open-folder.webp}})

## [](#hello-world) Hello World

Before we start, let's confirm that Node.js was successfully installed on your computer. To do that, run those two commands in your terminal and see if they correctly print your Node.js and NPM versions. The next lessons **require Node.js version 15.10 or higher**. If you skipped Node.js installation and want to use your existing version of Node.js, make sure that it's 15.10 or higher.

```shell
node -v
npm -v
```

If you installed VSCode in the previous paragraph, you can use the integrated terminal.

![Showing how to open a terminal in VSCode]({{@asset web_scraping_for_beginners/data_collection/images/vscode-open-terminal.webp}})

> If you're still wondering what a "terminal" is, we suggest googling for a terminal tutorial for your operating system because individual terminals are different. Sometimes a little, sometimes a lot.

After confirming that `node` is correctly installed on your computer, use your text editor to create a file called `hello.js` in your folder.

![Showing how to create a file in VSCode]({{@asset web_scraping_for_beginners/data_collection/images/vscode-create-file.webp}})

Now add this piece of code, save the file, and run the below command in your terminal.

```JavaScript
console.log('Hello World');
```

```shell
node hello.js
```

You should see **Hello World** printed in your terminal. If you do, congratulations, you are now officially a programmer! 🚀

![Showing hello world in VSCode]({{@asset web_scraping_for_beginners/data_collection/images/vscode-hello-world.webp}})

## [](#next) Next up

You have your computer set up correctly, and you've run your first script. Great! In the [next lesson]({{@link web_scraping_for_beginners/data_collection/project_setup.md}}) we'll set up your project to download a website's HTML using Node.js instead of a browser.
