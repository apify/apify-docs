---
title: Developing a scraper with docs driven prompting
description: Improve your Apify scraper by first documenting its behavior and letting AI agent to follow it as a spec.
slug: /scraping-with-apify-and-ai/docs-driven-prompting
unlisted: true
---

**In this lesson, we'll keep improving our app for tracking prices on an e-commerce website. We'll write documentation, which is not only useful to people, but also works as a context for Cursor.**

---

We made our life easier with an AI agent. When improving our scraper, there's now a lot less back and forth than with AI chat. Both approaches share one downside though.

Prompting a chat or agent is quick and straightforward, but it doesn't leave us with any trace of our intentions:

- If want to let someone else to take over the development in the future, it's gonna be a tough call for them to figure out why certain decisions were made and if certain behavior is intentional or accidental.
- If we attend to something else for a while and come to this project after several months, we'll happen to be almost like the someone else from the first bullet point. After a week we very clearly remember why we process prices certain way, but one year later it's gonna be just a spotty distant memory.
- If we ever want to let anyone else to use our scraper as a user, they'll need instructions on how to run it and what to expect.

Traditionally, we'd create such documentation after having made our software. With AI, we can describe how our program works before we have it done, and then point the AI agent to it as a specification and tell it to make it happen.

## Starting with README

It's a good practice to always have a README file alongside a software project. It's a plain text file where the project authors write down information that is commonly required to understand what is it all about.

The file is just text, but people started using special characters to add formatting to it. One such popular convention is called Markdown, and if README is formatted with it, it's called README.md.

If we take a look at our files in Cursor, we can see that Apify's template already has one README.md included. After opening it we should see something like this:

```md
# JavaScript Crawlee & CheerioCrawler Actor Template

<!-- This is an Apify template readme -->

This template example was built with [Crawlee](https://crawlee.dev/) to scrape data from a website using [Cheerio](https://cheerio.js.org/) wrapped into [CheerioCrawler](https://crawlee.dev/api/cheerio-crawler/class/CheerioCrawler).

## Quick Start

...
```

Many sections follow, which detail every aspect of the project, how to develop it, put it to the platform, and so on.

Notice that headings start with one or more `#` characters, and there are also bullet points, links, or even code blocks. That's Markdown.

![Markdown syntax highlighting in Cursor](images/cursor-readme.webp)

Cursor knows Markdown, so it helps with readability by coloring characters which take part in the formatting (this is done with code, too, and it's called _syntax highlighting_). The **Preview** button gives you an idea how will your Markdown be understood and formatted if published.

![Markdown preview in Cursor](images/cursor-readme-preview.webp)

:::tip README and Markdown basics

The [Make a README](https://www.makeareadme.com/) website explains reasons why people shouldn't forget about adding README to their projects. To learn Markdown basics, check out the [Getting Started](https://www.markdownguide.org/getting-started/) page at Markdown Guide, which features also [Cheat Sheet](https://www.markdownguide.org/cheat-sheet/), and more.

:::

## Recreating README.md

We could go through the existing README.md and only adjust and add what we need, but for the purpose of this lesson it's easier if we start from scratch. We'll delete the contents of the file and start with a new title and intro:

```md
# My Actor

An app for tracking prices on an e-commerce website.
```

Now we'll add a section about how to develop the program:

```md
## Development

This project is an Apify Actor that runs on the Apify platform.

- Have Node.js and Apify CLI installed
- Run `npm install` to install dependencies
- Run `apify run` to start scraping
- Run `apify push` to upload new version of the program to Apify
```

This should be good enough for any human or AI agent as a primer into how to orientate in the project, how to install it, and how to run it.

## Documenting current behavior

Now let's add a summary of the scraper's current behavior:

```md
## Behavior

- Downloads the Sales page at
https://warehouse-theme-metal.myshopify.com/collections/sales
- The Sales page is the default input URL of the Actor.
- Extracts all products, and returns data with the following info for each product:
    - Product name
    - Product detail page URL
    - Price
- Logs each item before it's saved.
- Before it ends, it logs how many products it collected.
- The output schema of the Actor aims to represent the items being saved the best way in the Apify interface.

### Prices handling

Saves prices as numbers. Because some prices are "from", the price field is called `minPrice`, as in minimum price.

- `Sale price$74.95` becomes `74.95`
- `Sale priceFrom $1,398.00` becomes `1398.00`
- `Sale price$158.00` becomes `158.00`
```

Most of the text above is just all our past prompts, slightly rephrased. Because we now describe the behavior of the program in the README, it's straightforward for anyone to for example understand the specifics of price processing. If later there's a bug, it's now clear what were our original intentions.

## Adding vendor name

The README documents everything we already have. Now let's use it as a specification of what should be done. Let's add vendor name to the output data:

```md
- Extracts all products, and returns data with the following info for each product:
    - Product name
    - Product detail page URL
    - Price
<!-- highlight-next-line -->
    - Vendor name
```

We'll save the file with <kbd>Ctrl+S</kbd> (or <kbd>⌘+S</kbd> on macOS), and give the following prompt to the AI agent:

```text
Ensure that all behavior documented in README is correctly implemented.
```

Very likely we'll need to approve some commands, as the agent will fetch the Warehouse store page for inspection, and run various development tools.

When done, it'll print a summary of its work and we'll be able to review all changes made. We'll approve all changes and go to the command line to check whether the Actor now scrapes vendor name as well:

```text
apify run
```

In the output, we should see each item being logged before it's saved, and they'll now contain vendor name. It's not the easiest to spot, but in the following example output, the first product has `vendorName` se to `JBL` and the other to `Sony`:

```text
INFO  Saving product {"productName":"JBL Flip 4 Waterproof Portable B
luetooth Speaker","productUrl":"https://warehouse-theme-metal.myshopi
fy.com/products/jbl-flip-4-waterproof-portable-bluetooth-speaker","ve
ndorName":"JBL","minPrice":74.95}
INFO  Saving product {"productName":"Sony XBR-950G BRAVIA 4K HDR Ultr
a HD TV","productUrl":"https://warehouse-theme-metal.myshopify.com/pr
oducts/sony-xbr-65x950g-65-class-64-5-diag-bravia-4k-hdr-ultra-hd-tv"
,"vendorName":"Sony","minPrice":1398}
...
```

We've successfully prompted the AI agent in a docs-first approach!

## Adding image URL and SKU

Now let's add two more details about each product. We'll want the scraper to figure out URL to the product image, and a number of units in stock, a so called [SKU](https://en.wikipedia.org/wiki/Stock_keeping_unit):

```md
- Extracts all products, and returns data with the following info for each product:
    - Product name
    - Product detail page URL
    - Price
    - Vendor name
<!-- highlight-next-line -->
    - Product image URL
<!-- highlight-next-line -->
    - SKU
```

For the SKU, we better describe how exactly we want it handled, by adding another section to the README. We'll scroll the whole Sales page in our browser, pick all forms in which the SKU is presented, and write down concrete example on what's expected to happen:

```md
### SKU handling

Saves SKU as a number. Examples:

- `In stock, 672 units` becomes `672`
- `Only 2 units left` becomes `2`
- `Sold out` becomes `0`
```

We won't forget to save the file again and we'll repeat the same prompt as before to bring our specification to reality:

```text
Ensure that all behavior documented in README is correctly implemented.
```

When it's done, let's check how do the scraped items look like now:

```text
apify run
```

This is the first product we see in the output:

```text
INFO  Saving product {"productName":"JBL Flip 4 Waterproof Portable B
luetooth Speaker","productUrl":"https://warehouse-theme-metal.myshopi
fy.com/products/jbl-flip-4-waterproof-portable-bluetooth-speaker","ve
ndorName":"JBL","imageUrl":"https://warehouse-theme-metal.myshopify.c
om/cdn/shop/products/13549_790__2_73a2a189-b3d5-4ec8-a4c3-b506e1beab7
0.jpg?v=1559820925&width=500","minPrice":74.95,"sku":672}
```

With a bit of effort we can recognize it has `sku` set to `672` and if we copy the `imageUrl` value and open it in our browser, we can visually verify that it's a correct image for the JBL bluetooth speaker. This is somewhat tedious, so let's see if Apify displays it better.

## Pushing Actor to Apify

We've made quite some changes to our Actor and we tested that they work as intended, and that's the best time to push a new version of the project to Apify:

```text
apify push
```

After the command finishes, we'll navigate to the URL it gives us at the end:

```text
...
Actor detail https://console.apify.com/actors/EL7U7aNddXOzwEJ66
Success: Actor was deployed to Apify cloud and built there.
```

In the Apify interface, we'll click the **Start** button. Soon we should see items popping up in the **Output** section.

Thanks to the sentence ‘The output schema of the Actor aims to represent the items being saved the best way in the Apify interface’ the agent improved how our Actor talks to Apify and we don't have to switch to **All fields** anymore:

![Improved Apify output](images/apify-output-products.webp)

What more, we can even see the images!

## Wrapping up

We wrote down words about how our scraper should behave, then we waved a magic wand, and our words turned to reality. But instead of letting all our precious specifications and decisions to flush through the prompt windows, we saved it to a file in form of eternal documentation for anyone to read.

This approach can still be improved though. Scrapers assume that the target page has a certain structure. But what if it suddenly changes? That unfortunately happens very often. And what if we need to support corner cases that appear only from time to time?

In the next lesson, we'll take a look at how we can develop our scraper by saving pieces of the target website and testing our program against it.
