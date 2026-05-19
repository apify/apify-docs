---
title: Tests driven prompting
description: TBD
slug: /scraping-with-apify-and-ai/tests-driven-prompting
unlisted: true
---

<!--
Adding fixtures, expectations. Setting up tests and teaching the agent to run tests. Dealing with corner cases by pointing the agent to the fixtures.

In lesson 3, students would try to make changes via ChatGPT and see that it gets tedious, which leads to introducing an agent-based IDE to work inside the template more comfortably.
-->

:::note Course under construction
This page hasn't been written yet. Come later, please!
:::

<!--
#### Creating tests
Explain tests, expectations. Create test folder, drop downloaded HTML of the listing there, let the agent set up tests around it. Let the agent run tests.
#### Scrape product variants
Change README so that it describes how the product variants should be handled. Drop HTML of the product detail page to the tests folder. Prompt the agent to implement scraping product variants. Run the program, get results.

Teaser: In the next lesson we'll learn how to deploy a similar scraper to a platform, schedule it to run regularly, automatically produce various formats, have a history of data, etc.
-->

<!-- Each product URL points to a so-called _product detail page_, or PDP. If we open one of the product URLs in the browser, e.g. the one about [Sony XBR-950G BRAVIA](https://warehouse-theme-metal.myshopify.com/products/sony-xbr-65x950g-65-class-64-5-diag-bravia-4k-hdr-ultra-hd-tv), we can see that it contains a vendor name, [SKU](https://en.wikipedia.org/wiki/Stock_keeping_unit), number of reviews, product images, product variants, stock availability, description, and perhaps more.

![Product detail page](../scraping_basics/images/pdp.png)

Let's scrape the vendor name.

## Adding product variants -->
