---
title: Chatting to code
description: TBD
slug: /building-actors-with-ai/chatting
unlisted: true
---

<!--
Copying from chat, pasting to local files. Running with uv (should be easy-ish?). Creating a basic scraper which does what we need.

The first lesson should use ChatGPT. It's mainstream. For chatting, it's free with limits, but many people might already pay for it, and for those it's gonna be without perceivable limits.

The implementation language can be JS or Python, it doesn't matter. However, the apify create template for Python is outdated, so I think (with a tear in my eye) that we should generate JavaScript – compared to outdated Python stack, I expect less issues to run it locally.

Start by explaining why running a scraper as an Actor makes sense (execution, storage, scheduling, history), and then install the CLI and use the template with those benefits in mind.

In lesson 1, students would work inside the template by copying/pasting from ChatGPT and focus on getting their first scraper working, without worrying too much about anything else.
-->

:::note Course under construction

This page hasn't been written yet. Come later, please!

:::


<!--
#### Creating first scraper
Prompt ChatGPT to get a simple JavaScript program which downloads https://warehouse-theme-metal.myshopify.com/collections/sales and lists the product names:

> Create a scraper in JavaScript which downloads https://warehouse-theme-metal.myshopify.com/collections/sales, extracts all the products in Sales and saves a CSV file, which contains:
> - Product name
> - Product detail page URL
> - Price

#### Running code
Save it as a scraper.js, setup Node/npm environment, run it, get results. If the student gets stuck setting up Node/npm, they ask ChatGPT. Roughly explaining what the program does, establishing basic terms.
#### Scraping stock units
Prompt ChatGPT to modify the program so that it scrapes stock units. Technically, modifying the program like this proves to be cumbersome, but doable. Run the program again, get better results.

Teaser: In the next lesson we'll get rid of copying and pasting and updating the files ourselves.
-->
