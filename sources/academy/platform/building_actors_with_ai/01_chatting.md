---
title: Chatting to code
description: TBD
slug: /building-actors-with-ai/chatting
unlisted: true
---

**In this lesson we'll use ChatGPT and a few commands to create an application for watching prices on an e-commerce website.**

---

Even without knowing how to code, you can open [ChatGPT](https://chatgpt.com/), type the following, and you'll have a scraper ready:

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

To address all of these, we'll use the [Apify](https://apify.com/) platform, where it's possible to deploy any program, as far as it's structured as a so-called Actor. We'll thank ourselves later if we start our program as an Actor from the very beginning.

First, we'll use a few commands to setup an Actor template, and then we'll prompt ChatGPT to generate the code necessary for scraping that [Sales page](https://warehouse-theme-metal.myshopify.com/collections/sales) from the prompt above.

:::info The Warehouse store

In this course, we'll scrape a real e-commerce site instead of artificial playgrounds or sandboxes. Shopify, a major e-commerce platform, has a demo store at [warehouse-theme-metal.myshopify.com](https://warehouse-theme-metal.myshopify.com/). It strikes a good balance between being realistic and stable enough for a tutorial.

:::

## Creating an Actor

First, let's head to the [Installation page](https://docs.apify.com/cli/docs/installation) of the Apify CLI, a command line program, which works as a remote control for the Apiary platform.

On the page, choose an installation method suitable for you and run the necessary command(s) in your Terminal (macOS/Linux) or Command Prompt (Windows).

If you don't know what to do or get stuck, [instruct ChatGPT to read the installation page](https://chatgpt.com/?prompt=Read%20from%20https%3A%2F%2Fdocs.apify.com%2Fcli%2Fdocs%2Finstallation%20so%20I%20can%20ask%20questions%20about%20it.) and let it help you. Verify that you've successfully installed the tool by running this:

```text
apify --version
```

You are ready if it prints something like the following:

```text
apify-cli/0.0.0 (1a2b3c4) running on ... with node-0.0.0, installed via ...
```

<!--
TODO Now let's setup the Actor… Find a suitable folder and run `apify create`
-->

:::note Course under construction

This section hasn't been written yet. Come later, please!

:::

## Running code

<!--
Save it to the template, setup Node/npm environment, run it, get results. If the student gets stuck setting up Node/npm, they ask ChatGPT. Roughly explaining what the program does, establishing basic terms.
-->

:::note Course under construction

This section hasn't been written yet. Come later, please!

:::

#### Scraping stock units

<!--
Prompt ChatGPT to modify the program so that it scrapes stock units. Technically, modifying the program like this proves to be cumbersome, but doable. Run the program again, get better results.

Teaser: In one of the next lessons we'll get rid of copying and pasting and updating the files ourselves, but first, let's see how we can deploy the scraper and run it periodically.
-->

:::note Course under construction

This section hasn't been written yet. Come later, please!

:::
