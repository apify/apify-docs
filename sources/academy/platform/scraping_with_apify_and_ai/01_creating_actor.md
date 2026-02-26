---
title: Creating an Actor with AI chat
description: TBD
slug: /scraping-with-apify-and-ai/creating-actor-with-ai-chat
unlisted: true
---

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

Now paste it as-is to your Terminal (macOS/Linux) or Command Prompt (Windows) and let it execute using the <kbd>↵</kbd> key. Once the installation finishes, you should see versions of Node.js and npm (another related tool) printed:

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

Now that's a lot of output, but no worries, the important part is that we've successfully used a template to set up a new Actor project!

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

We're done with commands for now, but do not close the Terminal or Command Prompt window yet, as we'll soon need it again.

If you struggle to use the template wizard or to run the sample Actor, share this tutorial with [ChatGPT](https://chatgpt.com/), add any errors you've encountered, and see if it can help you debug the issue.

## Scraping products

Now we're ready to get our own scraper done. We'll open the `src` directory inside the Actor project and find a file called `main.js`.

We'll open it in a _plain text editor_. Every operating system contains one out of the box: For Windows it's Notepad, for macOS it's TextEdit, etc.

:::danger Avoid rich text editors
Do not use a _rich text editor_, such as Microsoft Word. They're great for documents aimed at humans with all their formatting and advanced features, but for editing code we'll be better off with a tool as straightforward as possible.
:::

In the editor, we can see JavaScript code. Let's select all the code and copy to our clipboard. Then we'll open a _new ChatGPT conversation_ and start with a prompt like this:

```text
I'm building Apify Actor which will run on the Apify platform.
I need to modify sample template project so that it downloads
https://warehouse-theme-metal.myshopify.com/collections/sales,
extracts all the products in Sales. The data should contain
the following information for each product:

- Product name
- Product detail page URL
- Price

Before the program ends, it should log how many products got collected.
Code of main.js follows. You'll reply with a code block containing
a new version of that file.
```

Use <kbd>Shift+↵</kbd> to add a few more empty lines and then paste the code from your clipboard. After submitting, the AI chat should return a large code block with a new version of `main.js`. We'll copy its contents. Now we'll go back to our text editor, and replace the original contents of `main.js` with the version of the file from ChatGPT.

:::info Code and colors
Code is truly just a plain text, but some tools can display it colored. They analyze the code and display different parts of code in different colors so that human coders can better orientate in it. This is what ChatGPT does, so you'll see the code colored there. But the plain text editor you're using isn't really meant as a tool for coders, so it'll display the code just black and white. That's okay!
:::

When we're done, we must not forget to _save the change_ with <kbd>Ctrl+S</kbd> or, on macOS, <kbd>Cmd+S</kbd>. Now let's see if the new code works! To run our program, let's go back to the Terminal (macOS/Linux) or Command Prompt (Windows) and use the Apify CLI again:

```text
apify run
```

If we are lucky, the output should be similar to this:

```text
Run: npm run start

> warehouse-scraper@0.0.1 start
> node src/main.js

INFO  System info {"apifyVersion":"3.6.0","apifyClientVersion":"2.22.2","crawleeVersion":"3.16.0","osType":"Darwin","nodeVersion":"v25.6.1"}
...
INFO  CheerioCrawler: Starting the crawler.
INFO  CheerioCrawler: Processing page: https://warehouse-theme-metal.myshopify.com/collections/sales
...
INFO  CheerioCrawler: Finished!
INFO  Total products collected: 24
```

This particular output says `Total products collected: 24`. The Sales page displays 24 products per page, and contains 50 products in total.

Depending on whether ChatGPT decided to walk through the pages or scrape just the first one, we might get 24 or more products, but for a start, any indication that it scrapes the products is good news!

:::caution Debugging
If we saw our program crashing instead, we'd have to copy any error message and send it to the conversation with ChatGPT to nail down the issue and get it working.
:::

## Exporting to CSV

Our program supposedly works, but we haven't seen the data yet. Let's add an export to CSV, which is a format which any data app can read, including Microsoft Excel, Google Sheets, or Numbers by Apple. Let's continue our conversation with ChatGPT:

```text
Before the program ends, I want it to export all data
as "dataset.csv" in the current working directory.
```

ChatGPT should return a new code block with the CSV export implemented. We'll replace the contents of `main.js` with it and again, we won't forget to save our changes. Only then, we'll re-run the scraper:

```text
apify run
```

In the project directory, a new file called `dataset.csv` should emerge. We can use any of the programs mentioned earlier to check what's inside:

| productName | productUrl | price |
| --- | --- | --- |
| JBL Flip 4 Waterproof Portable Bluetooth Speaker | https://warehouse-theme-metal.myshopify.com/products/jbl-flip-4-waterproof-portable-bluetooth-speaker | Sale price$74.95 |
| Sony XBR-950G BRAVIA 4K HDR Ultra HD TV | https://warehouse-theme-metal.myshopify.com/products/sony-xbr-65x950g-65-class-64-5-diag-bravia-4k-hdr-ultra-hd-tv | Sale priceFrom $1,398.00 |
| Sony SACS9 10" Active Subwoofer | https://warehouse-theme-metal.myshopify.com/products/sony-sacs9-10-inch-active-subwoofer | Sale price$158.00 |

…and so on. Looks good!

Well, does it? With more attention to detail, we can see that the prices include some text, which isn't exactly ideal. We'll need to improve this part in one of the next lessons. And we'll better improve our workflow as well, so that we don't have to copy and paste something all the time.

Despite a few flaws, we managed to create a first working prototype of an application for watching prices, with no coding knowledge. And with some minimal effort in command line, we've got something we can immediately to deploy to a platform where it can run regularly and reliably. In the next lesson we'll do exactly that.
