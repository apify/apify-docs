---
title: Creating an Actor with AI chat
description: TBD
slug: /scraping-with-apify-and-ai/creating-actor-with-ai-chat
unlisted: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**In this lesson we'll use ChatGPT and a few commands to create an application for watching prices on an e-commerce website.**

---

Want to get data about prices on [this Sales page](https://warehouse-theme-metal.myshopify.com/collections/sales)? Even without knowing how to code, you can open [ChatGPT](https://chatgpt.com/), type the following, and you'll have a scraper ready:

```text
Create a scraper in JavaScript which downloads
https://warehouse-theme-metal.myshopify.com/collections/sales,
extracts all the products in Sales and saves a CSV file,
which contains:

- Product name
- Product detail page URL
- Price
```

Try it! While the code generated will most likely work out of the box, the resulting program will have a few caveats. Some are usability issues:

- _User-operated:_ We have to run the scraper ourselves. If we're tracking price trends, we'd need to remember to run it daily. And if we want alerts for big discounts, manually running the program isn't much better than just checking the site in a browser every day.
- _Manual data management:_ Tracking prices over time means figuring out how to organize the exported data ourselves. Processing the data could also be tricky since different analysis tools often require different formats.

Some are technical challenges:

- _No monitoring:_ Even if we knew how to setup a server or home installation so that our scraper runs regularly, we'd have little insight into whether it ran successfully, what errors or warnings occurred, how long it took, or what resources it used.
- _Anti-scraping risks:_ If the target website detects our scraper, they can rate-limit or block us. Sure, we could run it from a coffee shop's Wi-Fi, but eventually, they'd block that too—risking seriously annoying our barista.

<!-- TODO START rewrite this paragraph, it's really bad -->
To address all of these, we'll use the [Apify](https://apify.com/) platform, where it's possible to deploy any program, as far as it's structured as a so-called Actor. We'll thank ourselves later if we start our program as an Actor from the very beginning.
<!-- TODO END rewrite this paragraph, it's really bad -->

First, we'll use a few commands to setup an Actor template, and then we'll prompt ChatGPT to generate the code necessary for scraping that Sales page.

:::info The Warehouse store

In this course, we'll scrape a real e-commerce site instead of artificial playgrounds or sandboxes. Shopify, a major e-commerce platform, has a demo store at [warehouse-theme-metal.myshopify.com](https://warehouse-theme-metal.myshopify.com/). It strikes a good balance between being realistic and stable enough for a tutorial.

:::

## Installing Node.js

With AI we don't need to learn how to code to develop a scraper. AI will write the code for us. We still need to setup our environment to be able to run that code, though.

We'll develop our scraper in a mainstream programming language called JavaScript. To run command line programs written in JavaScript, we'll need a tool called Node.js.

Let's head to the [Download Node.js](https://nodejs.org/en/download) web page. You should see a row of configuration dropdowns and a rather large code block below, with quite a few commands. Check if the website guessed your operating system correctly, and copy the whole block to the clipboard:

![Download Node.js](images/nodejs-install.webp)

Now paste it as-is to your Terminal (macOS/Linux) or Command Prompt (Windows) and run it using the <kbd>↵</kbd> key. Once the installation finishes, you should see versions of Node.js and npm (another related tool) printed:

```text
...
$ node -v
v24.11.1
$ npm -v
11.6.2
```

The exact version numbers are not really important. If you see the versions printed, it means we've successfully installed Node.js and npm.

## Installing Apify CLI

Now another thing we'll need is Apify CLI. It's a command line program, which works as a remote control for the Apiary platform. It'll also help us with structuring our scraper as an Actor, so that it can run on the platform.

Apify CLI happens to be also made in JavaScript, so we can use the npm tool we just installed to get it on our computer:

```text
npm install -g apify-cli
```

Once the command finishes, let's try if everything went all right:

```text
apify --version
```

If it prints something like the following, we're ready to start building:

```text
apify-cli/0.0.0 (1a2b3c4) running on ... with node-0.0.0, installed via ...
```

## Creating an Actor

Now let's use the Apify CLI to help us kick off a new Actor:

```text
apify create warehouse-scraper
```

It starts a wizard where you can choose from various options. For each option, only repeatedly use the <kbd>↵</kbd> key to confirm whatever is set as the first or default:

```text
✔ Choose the programming language of your new Actor: JavaScript
✔ Choose a template for your new Actor. You can check more information at https://apify.com/templates. Crawlee + Cheerio
✔ Almost done! Last step is to install dependencies. Install dependencies

...

Success: ✅ Actor 'warehouse-scraper' created successfully!

Next steps:

cd "warehouse-scraper"
apify run

💡 Tip: Use 'apify push' to deploy your Actor to the Apify platform
📖 Docs: https://docs.apify.com/platform/actors/development
🌱 Git repository initialized in 'warehouse-scraper'. You can now commit and push your Actor to Git.
```

Now that's a lot of output, but no worries, the important part is that we've successfully used a template to set up a new Actor project.

A new directory `warehouse-scraper` has been created for us, with a variety of files and directories inside. The output instructs us to go to this new project directory, so let's do it:

```text
cd "warehouse-scraper"
```

Now we can run commands which control this new project. We didn't change the template in any way though, so it won't scrape the Warehouse store for us yet.

Out of the box, the template implements a sample Actor which walks through the [crawlee.dev](https://crawlee.dev/) website and downloads all of its pages. Such thing is called _crawling_, and Crawlee is a popular tool for crawling which this Actor internally uses. Let's see if it works for us:

```text
apify run
```

If you see a flood of output mentioning something called `CheerioCrawler`, it means the template works and we can move on to editing its files so that it does what we want.

```text
...
INFO  CheerioCrawler: Starting the crawler.
INFO  CheerioCrawler: enqueueing new URLs
INFO  CheerioCrawler: Crawlee · Build reliable crawlers. Fast. {"url":"https://crawlee.dev/"}
...
INFO  CheerioCrawler: Finished! Total 107 requests: 107 succeeded, 0 failed. {"terminal":true}
```

If you struggle to use the template wizard or to run the sample Actor, share this tutorial with [ChatGPT](https://chatgpt.com/), add any errors you've encountered, and see if it can help you debug the issue.

## Scraping products

<!--
Save it to the template, setup Node/npm environment, run it, get results. If the student gets stuck setting up Node/npm, they ask ChatGPT. Roughly explaining what the program does, establishing basic terms.
-->

:::note Course under construction
This section hasn't been written yet. Come later, please!
:::

## Scraping stock units

<!--
Prompt ChatGPT to modify the program so that it scrapes stock units. Technically, modifying the program like this proves to be cumbersome, but doable. Run the program again, get better results.

Teaser: In one of the next lessons we'll get rid of copying and pasting and updating the files ourselves, but first, let's see how we can deploy the scraper and run it periodically.
-->

:::note Course under construction
This section hasn't been written yet. Come later, please!
:::
