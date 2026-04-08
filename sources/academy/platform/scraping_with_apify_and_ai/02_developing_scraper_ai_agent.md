---
title: Developing a scraper with AI agent
description: TBD
slug: /scraping-with-apify-and-ai/developing-scraper-with-ai-agent
unlisted: true
---

**In this lesson, we'll keep improving our app for tracking prices on an e-commerce website. We'll get its code onto our computer and use Cursor to streamline how we update our scraper.**

---

In the previous lesson, modifying our scraper involved navigating through the Web IDE, copying code, switching to ChatGPT and back, pasting new code, and so on.

That kind of grind is okay for small edits, but it's not sustainable in the long run. If we want to build something larger, or something robust that we can develop and maintain over time, we need to streamline the process.

To step up our game, we'll run a few commands and install a few tools so we can bring the tools of the trade onto our computer:

- _Local development:_ We'll have the Actor files downloaded and we'll be able to run the code locally. This makes it fast and easy to verify any changes.
- _Agentic coding:_ We'll have a locally installed IDE with a built-in AI agent that we can point at the Actor files. We'll be able to tell it what we need, and it'll change the files directly, without hand-holding.
- _Basic versioning:_ We'll be able to develop changes locally while the previous version of our code keeps running on the Apify platform undisturbed. Only once we're happy with what we have will we push the changes back, so they can replace the old version.

We're getting one tiny step closer to becoming developers, but don't worry. It's not like we'll suddenly need to read code.

## Installing Node.js

If we want to run our scraper on our own computer, whether we do it ourselves or have our AI agent do it for us, we first need to set up the environment so the code can run locally.

Previously we chose to develop our scraper in a mainstream programming language called JavaScript. To run command line programs written in JavaScript, we'll need a tool called Node.js.

Let's head to the [Download Node.js](https://nodejs.org/en/download) page. We should see a row of configuration dropdowns and a fairly large code block below it, with quite a few commands. Let's check whether the page guessed our operating system correctly, then copy the whole block to the clipboard:

![Download Node.js](images/nodejs-install.webp)

Now let's paste it as-is into Terminal (macOS/Linux) or PowerShell (Windows) and run it with <kbd>↵</kbd>. Once the installation finishes, we should see the versions of Node.js and npm, another related tool, printed out:

```text
...
$ node -v
v24.11.1
$ npm -v
11.6.2
```

The exact version numbers aren't very important. If we see them printed, we've successfully installed Node.js and npm.

## Installing Apify CLI

Now we'll need the Apify CLI. It's a command-line tool that works like a remote control for the Apify platform. It also happens to be written in JavaScript, so we can use the npm tool we just installed to get it onto our computer. Let's run this command:

```text
npm install -g apify-cli
```

Once the command finishes, let's check whether everything went right:

```text
apify --version
```

If it prints something like this, we have the tool installed:

```text
apify-cli/0.0.0 (1a2b3c4) running on ... with node-0.0.0, installed via ...
```

One more thing though. Before we can do any useful work with it, we also need to login:

```text
apify login
```

Let's confirm **Through Apify Console in your default browser** with <kbd>↵</kbd>. The command line tool opens a web page in our browser, where we'll allow it as a remote control to our Apify account. When we return back to the command line, we should see the following success message:

```text
Success: You are logged in to Apify as hjtest.
```

The message mentions our username, in this case `hjtest`. We'll remember it as we'll need it for our next task.

Awesome, now we're ready to remote control Apify from the command line!

## Downloading Actor files

We now got a hold of a handy remote control, let's use it to download the Actor files. In the following command, replace `hjtest` with your own username:

```text
apify pull hjtest/my-actor
```

The following output should appear:

```text
Success: Pulled to /.../my-actor/
```

The tool created a new folder called `my-actor` and pulled all Actor files to it, so that we can work on them on our computer instead of the Web IDE. Let's run another command to move us into this new folder:

```text
cd my-actor
```

Being inside the folder will help us to run following commands focused just on the project, not affecting any other folders on our disk.

Now we've got the code of our Actor, but we already know from the previous lesson that Actors first need to be _built_ before they can be _ran_. Let's run the following command, which installs software our Actor depends on:

```text
npm install
```

The command will flood us with output about what is installed, perhaps some warnings, recommendations, etc. Unfortunately it's hard to spot through the noise if the action was successful, but it is safe to assume success if it doesn't scream red about some errors.

:::tip If it doesn't install

If the output does scream red with errors, or if later in the lesson you find out you're unable to run the Actor, copy the whole output of `npm install` and paste it to ChatGPT for help.

:::

## Running the Actor locally

Now that we have the Actor available on our computer, does it work? Let's try!

```text
apify run --input '{"startUrls": [{"url": "https://warehouse-theme-metal.myshopify.com/collections/sales"}]}'
```

Plain `apify run` isn't enough for now, because the Actor we made expects that we give it an input with an URL which it's supposed to scrape. Adding `--input` with the subsequent ball of special characters is technically equivalent to what we've been previously doing in Apify when changing the field on the **Input** tab.

When the run is done, we should see an output similar to this one:

```text
Info: All default local stores were purged.
Run: npm run start

> crawlee-cheerio-javascript@0.0.1 start
> node src/main.js

INFO  System info {"apifyVersion":"3.7.0","apifyClientVersion":"2.22.3","crawleeVersion":"3.16.0","osType":"Darwin","nodeVersion":"v25.9.0"}
WARN  ProxyConfiguration: The "Proxy external access" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com
INFO  CheerioCrawler: Starting the crawler.
INFO  CheerioCrawler: Processing page: https://warehouse-theme-metal.myshopify.com/collections/sales
INFO  CheerioCrawler: All requests from the queue have been processed, the crawler will shut down.
INFO  CheerioCrawler: Final request statistics: {"requestsFinished":1,"requestsFailed":0,"retryHistogram":[1],"requestAvgFailedDurationMillis":null,"requestAvgFinishedDurationMillis":328,"requestsFinishedPerMinute":155,"requestsFailedPerMinute":0,"requestTotalDurationMillis":328,"requestsTotal":1,"crawlerRuntimeMillis":386}
INFO  CheerioCrawler: Finished! Total 1 requests: 1 succeeded, 0 failed. {"terminal":true}
```

Albeit we cannot quite see how do the scraped items look like, we can spot that our scraper made a single request to https://warehouse-theme-metal.myshopify.com/collections/sales and it finished without crashing. For a start, let's call it a success!

Now we could continue messing around with files and commands, but luckily, we don't have to. We have now everything in place to let an AI agent do all we wish from now on. But do we have one? One last installation, pinky promise!

## Installing Cursor

Cursor is an IDE for browsing code, similar to Apify's Web IDE, but it's an app we install on our computer. Also, it's an IDE with a built-in AI agent, which will help us with all the coding.

:::info Why Cursor

We use Cursor in this course because it's the only of the mainstream AI-first IDEs, which offers a free plan. If you're willing to pay, any IDE with an AI agent would fare the same, be it GitHub Copilot in VS Code, Claude Code, or OpenAI Codex.

:::

Using Cursor's AI features requires an account, so let's create one. In the browser, let's open the [Sign Up page](https://authenticator.cursor.sh/sign-up) and we'll create a new account in one of the standard ways. When asked to start a subscription, we'll select **Skip for now** to stay on the free plan.

![Skip starting a paid plan](images/cursor-plan.webp)

Similarly, when asked to connect GitHub, we'll choose **Maybe later**. Once we're all set, let's [download the app](https://cursor.com/download) and get it installed.

![Download Cursor](images/cursor-install.webp)

When we open the app for the first time, it requires a login. We'll click **Log In**, which will send us back to the browser. By choosing **Yes, Log In** we'll confirm that the app can use our account and let's get back to the app.

![Open project in Cursor](images/cursor-open.webp)

Let's click on **Open project** and select the folder with our Actor.

:::tip Locating the Actor folder

If you struggle to find where the Actor folder is, run `pwd` in the command line, which prints a full path to the folder you're in.

:::

When Cursor opens the Actor's project folder, we'll see something similar to the following:

![Cursor ready](images/cursor-ready.webp)

Now, finally, let's do some agentic coding!

## Modifying code with Cursor

:::note Course under construction
This section hasn't been written yet. Come later, please!
:::

## Verifying changes

:::note Course under construction
This section hasn't been written yet. Come later, please!
:::

## Pushing Actor to Apify

:::note Course under construction
This section hasn't been written yet. Come later, please!
:::

## Wrapping up

<!--

## Creating an Actor

Now let's use the Apify CLI to help us kick off a new Actor:

```text
apify create warehouse-scraper
```

It starts a wizard where we can choose from various options. For each option, let's press <kbd>↵</kbd> to accept the default:

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

Out of the box, the template includes a sample Actor that walks through the [crawlee.dev](https://crawlee.dev/) website and downloads all its pages. This process is called _crawling_, and the sample Actor uses a crawling tool called Crawlee, so its documentation is chosen as a sample target website. Let's see if we can run it:

```text
apify run
```

If we see a flood of output mentioning something called `CheerioCrawler`, it means the template works and we can move on to editing its files so that it does what we want.

```text
...
INFO  CheerioCrawler: Starting the crawler.
INFO  CheerioCrawler: enqueueing new URLs
INFO  CheerioCrawler: Crawlee · Build reliable crawlers. Fast. {"url":"https://crawlee.dev/"}
...
INFO  CheerioCrawler: Finished! Total 107 requests: 107 succeeded, 0 failed. {"terminal":true}
```

We're done with commands for now, but do not close the Terminal or Command Prompt window yet, as we'll soon need it again.

:::caution Debugging
If we run into issues with the template wizard or the sample Actor, let's share this tutorial with [ChatGPT](https://chatgpt.com/), include the errors we saw, and ask for help debugging.
:::

## Scraping products

Now we're ready to get our own scraper done. We'll open the `src` directory inside the Actor project and find a file called `main.js`.

We'll open it in a _plain text editor_. Every operating system includes one: Notepad on Windows, TextEdit on macOS, and similar tools on Linux.

:::danger Avoid rich text editors
Let's not use a _rich text editor_, such as Microsoft Word. They're great for human-readable documents with rich formatting, but for code editing, we'll use either dedicated coding editors, or the simplest tool possible.
:::

In the editor, we can see JavaScript code. Let's select all the code and copy to our clipboard. Then we'll open a _new ChatGPT conversation_ and start with a prompt like this:

```text
I'm building an Apify Actor that will run on the Apify platform.
I need to modify a sample template project so it downloads
https://warehouse-theme-metal.myshopify.com/collections/sales,
extracts all products in Sales, and returns data with
the following information for each product:

- Product name
- Product detail page URL
- Price

Before the program ends, it should log how many products it collected.
Code from main.js follows. Reply with a code block containing
a new version of that file.
```

We'll use <kbd>Shift+↵</kbd> to add a few empty lines, then paste the code from our clipboard. After submitting, the AI chat should return a large code block with a new version of `main.js`. Copy it, go back to our text editor, and replace the original `main.js` content.

:::info Code and colors
Code is plain text. Some tools color it to make it easier to read, and ChatGPT does this by default. Plain text editors usually show code in black and white, and that's completely fine.
:::

When we're done, we must not forget to _save the change_ with <kbd>Ctrl+S</kbd> or, on macOS, <kbd>Cmd+S</kbd>. Now let's see if the new code works. To run the program, let's go back to Terminal (macOS/Linux) or PowerShell (Windows) and use Apify CLI again:

```text
apify run
```

If all goes well, the output should be similar to this:

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

This output says `Total products collected: 24`. The Sales page displays 24 products per page and contains 50 products in total.

Depending on whether ChatGPT decided to walk through all pages or scrape just the first one, we might get 24 or more products. For now, any sign that it scraped products is good news.

:::caution Debugging
If our program crashes instead, let's copy the error message, send it to our ChatGPT conversation, and ask for a fix.
:::

## Exporting to CSV

Our program likely works, but we haven't seen the data yet. Let's add a CSV export. CSV is a format most data apps can read, including Microsoft Excel, Google Sheets, and Apple Numbers. Let's continue our ChatGPT conversation with:

```text
Before the program ends, I want it to export all data
as "dataset.csv" in the current working directory.
```

ChatGPT should return a new code block with CSV export added. Let's replace `main.js` with that version and save our changes. Then let's run the scraper again:

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

Well, does it? If we look closely, the prices include extra text, which isn't ideal. We'll improve this in one of the next lessons. We'll also improve the workflow so we don't have to keep copying and pasting.

Despite a few flaws, we've successfully created a first working prototype of a price-watching app with no coding knowledge. And with a bit of extra command-line work, we now have something we can deploy to a platform where it can run regularly and reliably. In the next lesson, we'll do exactly that.

-->

<!--
Explaining benefits (delegation and independent work, AGENTS.md). Getting environment ready, learning the ropes with a GUI/TUI. Using the `apify` CLI to start a project. Creating a basic scraper which does what we need.

In lesson 3, students would try to make changes via ChatGPT and see that it gets tedious, which leads to introducing an agent-based IDE to work inside the template more comfortably.

The lesson should use Cursor (or Google Antigravity). Only if it truly scales to zero as they claim and it is not required to have a paid account to try an agent. Minimal friction, just install – beats any other decision factors.

If the paragraph above turns out being a wrong direction, we should use VS Code and tell people to spend $10 to try Copilot. VS Code is mainstream. Paying for Copilot is the cheapest agent offering, and it's quite powerful.
-->

<!--
We'll choose [Cursor](https://cursor.com/), because it has a free plan and it's beginner-friendly.

#### Installing development environment
Explaining benefits (delegation and independent work, AGENTS.md). Getting environment ready. Use https://docs.apify.com/platform/actors/development/quick-start/build-with-ai
#### Scraping vendor names
Learning the ropes with a GUI/TUI, prompting the agent to update the code so that it scrapes vendor names. Run the program again, get better results.

Teaser: Explain why this is fragile. In the next lesson we'll learn how to develop features of the scraper in a robust way by first specifying them as documentation.
-->
