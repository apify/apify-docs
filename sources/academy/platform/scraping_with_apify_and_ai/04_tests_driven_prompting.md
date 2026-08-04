---
title: Using examples as a spec for AI
description: Improve your Apify scraper by adding automated tests with real-world examples which an AI agent can use as a spec.
slug: /scraping-with-apify-and-ai/tests-driven-prompting
unlisted: true
---

**In this lesson, we'll keep developing our app for tracking prices on an e-commerce website. We'll describe edge cases with real-world examples, and Cursor will use them not only to get things right, but also to check that nothing breaks next time we change something.**

---

The README as a source of truth for the AI agent gets us far, but it has limits:

- Describing a large set of edge cases is tedious. "If this tiny detail is a certain way, process it as X, otherwise Y" for each situation is possible, but messy.
- Sometimes the edge case lies in how the HTML of the page is built, and we'd have to say "if you encounter exactly this markup, process it like this". Pasting long snippets of HTML into a README isn't great.
- After each change, we have to trust the agent that it didn't break what already worked. We can prompt it to "go through the whole README and verify all the behavior", but that's slow and unreliable.

There's a better way. We can save real-world examples of the pages we scrape, save the data we expect to get out of them, and let a program do the checking: load the example, process it as if we were scraping, compare the result to our expectation.

Software developers do this all the time, so each piece has a name. The saved examples are _fixtures_, the expected results are _expectations_, and the setup for running it all is a _test suite_.

Running such _tests_ is much faster than manual probes, and both the AI agent and us humans can run it anytime.

## Setting up a test suite

Let's start by adding a new section to the README:

```md
## Testing

- The `tests` directory contains real-world HTML snapshots of each page type we scrape.
- Each snapshot also has a JSON file of the same name with the data we expect to get out of it.
- Run `npm test` to run all automated tests. Do this after any significant change to the code.
```

Then we'll send this prompt to the AI agent:

```text
Read the Testing section in README and set up a test suite
covering the behavior we already have.
```

<!--
Adding fixtures, expectations. Setting up tests and teaching the agent to run tests. Dealing with corner cases by pointing the agent to the fixtures.

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
