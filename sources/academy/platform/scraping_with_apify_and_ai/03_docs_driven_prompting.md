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

## Understanding README

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

Cursor knows Markdown, so it helps with readability by coloring characters which take part in the formatting (this is done with code, too, and it's called _syntax highlighting_).

:::tip README playground and Markdown basics

The [Make a README](https://www.makeareadme.com/) website explains reasons why people shouldn't forget about adding README to their projects. It also includes a playground where you can write your document and immediately see how will your Markdown be understood and formatted.

To learn Markdown basics, check out the [Getting Started](https://www.markdownguide.org/getting-started/) page at Markdown Guide, which features also [Cheat Sheet](https://www.markdownguide.org/cheat-sheet/), and more.

:::

## Creating README

We could go through the existing README.md and only adjust and add what we need, but for the purpose of this lesson it's easier if we start from scratch. We'll delete the contents of the file and start with a title and intro:

```md
# My Actor

An app for tracking prices on an e-commerce website.
```

Now we'll add a section about how to develop the program:

```md
## Development

The project has a structure of Apify Actor.

- Have Node.js and Apify CLI installed
- Run `npm install` to install dependencies
- Run `apify run` to start scraping
- Run `apify push` to upload new version of the program to Apify
```

This should be good enough for any human or AI agent as a primer into how to orientate in the project, how to install it, and how to run it.

## Documenting current behavior

:::note Course under construction
This page hasn't been written yet. Come later, please!
:::

<!-- I'm building an Apify Actor that will run on the Apify platform.
I need to modify a sample template project so it downloads
https://warehouse-theme-metal.myshopify.com/collections/sales,
extracts all products in Sales, and returns data with
the following information for each product:

- Product name
- Product detail page URL
- Price

Before the program ends, it should log how many products it collected.
Code from routes.js follows. Reply with a code block containing
a new version of that file. -->

<!-- Change the default input URL of the Actor
to https://warehouse-theme-metal.myshopify.com/collections/sales -->

<!-- Change the code so that the Actor saves prices as numbers.
Because some prices are "from", let's call the "price" field
"minPrice" instead, as in minimum price. Example follows.

Before:
Sale price$74.95
Sale priceFrom $1,398.00
Sale price$158.00

After:
74.95
1398.00
158.00 -->

<!-- In the output of the scraper I want to see
how the items being saved look like. -->

<!-- Change the output schema of the Actor
so that it represents the items being
saved the best way in the Apify interface. -->

## Dealing with price intervals

:::note Course under construction
This page hasn't been written yet. Come later, please!
:::

<!--
In the next lesson, we'll take a look at how we can develop our scraper by documenting how it should behave instead of prompting the AI agent feature by feature, without a track record of our intentions.

Improving the README, e.g. input output. Pointing the agent to the README and turning the design to reality.
-->

<!--
#### Creating README.md
Create simple README.md where we document how the scraper behaves, what it produces as an output, etc. Primer to Markdown.
#### Dealing with price intervals
Explain focus on product and domain knowledge. In the README explain how the scraper should handle prices like "From $1,398.00", introduce minPrice, keep prices as numbers, etc.

Let the agent implement handling of variants based on the README. Run updated code, see results.

Teaser: Imagine the target website changes something (happens often!). In such case the README won't help. Let's deal with that.
-->
