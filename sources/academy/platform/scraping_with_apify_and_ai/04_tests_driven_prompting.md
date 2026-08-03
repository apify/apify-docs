---
title: Using examples as a spec for AI
description: Improve your Apify scraper by adding automated tests with real-world examples which an AI agent can use as a spec.
slug: /scraping-with-apify-and-ai/tests-driven-prompting
unlisted: true
---

**In this lesson, we'll continue developing our app for tracking prices on an e-commerce website. We'll use real-world examples to describe various edge cases our scraper can encounter. Cursor will not only make sure they're all accounted for, but next time we change something, it'll always test whether everything still works.**

---

Documenting behavior of our scraper in the README and telling the AI agent it's the source of truth about our project can get us far, but the approach has certain limitations:

- Describing a large set of edge cases is tedious. Documenting "if this tiny detail is certain way, then we'll process it as X, otherwise Y" for each situation is possible, but a bit messy.
- Sometimes the edge cases lie in how the HTML code of the page is constructed, and we need to say something like "if you encounter exactly this HTML markup, process it like this". Including long snippets of HTML in our README usually isn't really desirable.
- Each time we modify our project, we must trust the AI agent that it didn't break existing stuff when adding new things. Neither the agent nor us have an efficient way to verify whether everything still holds together. We can prompt it to "go through the whole README and verify all the behavior", but that's slow and not reliable.

That's why it's a good practice to include additional files with real-world examples (_test fixtures_) together with a examples of how the resulting data should look like (_test expectations_). Loading the real-world examples, processing it as if it was during scraping, and verifying that the result fits the expectation, can be then automated (_test suite_), for the benefit of both AI agents and humans.

## Setting up a test suite

We'll start with adding a new section to the README:

```md
## Testing

- Inside `tests`, there are real-world HTML snapshots of each page type we're scraping, together with JSON files of the same name containing corresponding data as expectations.
- Command `npm test` runs all automated tests.
```

Then we'll instruct the AI agent with the following prompt:

```text
Setup a test suite which covers current project according to the Testing section in README.
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
