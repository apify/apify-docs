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
- Our scraper assumes certain page structure, but that can change over time. The README says what data we want, not what the page looked like back when everything worked.

There's a better way. We can save real-world examples of the pages we scrape, save the data we expect to get out of them, and let a program do the checking: load the example, process it as if we were scraping, compare the result to our expectation.

Software developers do this all the time, so each piece has a name. The saved examples are _fixtures_ or _snapshots_, the expected results are _expectations_, and the setup for running it all is a _test suite_.

Running such _tests_ is much faster than checking things by hand, and both we and the AI agent can do it anytime. And when the website changes, we can replace the saved example with a fresh one, and let the AI agent fix the code.

## Setting up a test suite

Let's start by adding a new section to the README:

```md
## Testing

- The `tests` directory contains real-world HTML snapshots of each page type we scrape.
- Each snapshot also has a JSON file of the same name with the data we expect to get out of it.
- Run `npm test` to run all automated tests.
- Use red-green test-driven development.
```

:::tip Test-driven development

_Red-green test-driven development_ means that whenever the AI agent modifies our project, it will start with expectations, run the tests to let them fail (which verifies the tests actually test something), and only then starts to add code to make them pass. It's an engineering technique which makes all development more reliable.

:::

Now let's send this prompt to the AI agent:

```text
Read the Testing section in README and set up a test suite
covering the behavior we already have.
```

When the AI agent gets to work, you should see it creating a new directory called `tests`, then it's very likely it'll use `curl`, which is a command line program for downloading, to create a HTML snapshot of the Sales listing.

When it's done, you should see new files inside `tests`, most likely `sales.html` with the downloaded HTML, then `sales.json` with the expected data, and then perhaps some other to orchestrate the testing.

When we run `npm test`, all the tests should pass. This is an example output of the command:

```text
npm notice run node --test tests/*.test.js
✔ parseMinPrice handles sale price text (0.532625ms)
✔ parseMinPrice returns null when no price is found (0.06775ms)
✔ parseSku handles inventory text (0.129875ms)
✔ parseSku returns null for empty inventory text (0.058833ms)
✔ toAbsoluteUrl resolves protocol-relative and relative URLs (0.325541ms)
✔ extractProducts matches expected output for sales (58.530583ms)
ℹ tests 6
ℹ suites 0
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 165.677875
```

## Handling product variants

Some prices in our data are "from" values. That's because many items in the listing represent several product variants. Let's scrape these variants as separate products, with their actual prices.

Each product in the listing links to a so-called _product detail page_, or PDP. If we open one of the product URLs in the browser, e.g. the one about [Sony XBR-950G BRAVIA](https://warehouse-theme-metal.myshopify.com/products/sony-xbr-65x950g-65-class-64-5-diag-bravia-4k-hdr-ultra-hd-tv), we can see that it contains a vendor name, [SKU](https://en.wikipedia.org/wiki/Stock_keeping_unit), number of reviews, product images, product variants, stock availability, description, and perhaps more.

![Product detail page](images/pdp.webp)

Before we tell the AI agent to update our project to handle variants, let's first check what we're dealing with so that we pursue the right design and correctly manage all possible situations.

## Identifying and handling edge cases

When [browsing the Sales page](https://warehouse-theme-metal.myshopify.com/collections/sales) we can see several situations to cover:

- Product with one price and no variants: [Sony SACS9 10" Active Subwoofer](https://warehouse-theme-metal.myshopify.com/products/sony-sacs9-10-inch-active-subwoofer)
- Product with several variants, each with different price: [Sony XBR-950G BRAVIA 4K HDR Ultra HD TV](https://warehouse-theme-metal.myshopify.com/products/sony-xbr-65x950g-65-class-64-5-diag-bravia-4k-hdr-ultra-hd-tv)
- Product with several variants, each with the same price: [JBL Flip 4 Waterproof Portable Bluetooth Speaker](https://warehouse-theme-metal.myshopify.com/products/jbl-flip-4-waterproof-portable-bluetooth-speaker?variant=17549970440243)
- When it comes to the Sales listing, the variants are either colors (like the JBL speaker) or sizes (like the Sony TV).

Let's save each variant as a separate product, with its own price and one extra field containing the variant name, such as `green` or `55"`. Let's add a new section to the README, right after _Prices handling_:

```md
### Variants handling

Downloads product detail pages. Instead of saving each listing item as a single product, it saves each variant as an individual product. Variants have these extra properties:

- Variant name
- Exact variant price as `price`

Minimum price from the listing stays as `minPrice`. Products without variants have empty variant name and `price` equal to `minPrice`.
```

Save the README and let's prepare a prompt for the AI agent, which hints on which pages should serve as fixtures for which edge cases.

It's best practice to address a single thing in each test, so our findings will result in 5 snapshots, albeit some will technically be the same HTML:

```text
Read the new Variants handling section and change
the project accordingly. Use red-green TDD. Fixtures:

one-price-no-variants.html
https://warehouse-theme-metal.myshopify.com/products/sony-sacs9-10-inch-active-subwoofer

variants-different-prices.html
https://warehouse-theme-metal.myshopify.com/products/sony-xbr-65x950g-65-class-64-5-diag-bravia-4k-hdr-ultra-hd-tv

variants-same-price.html
https://warehouse-theme-metal.myshopify.com/products/jbl-flip-4-waterproof-portable-bluetooth-speaker?variant=17549970440243

variants-colors.html
https://warehouse-theme-metal.myshopify.com/products/jbl-flip-4-waterproof-portable-bluetooth-speaker?variant=17549970440243

variants-sizes.html
https://warehouse-theme-metal.myshopify.com/products/sony-xbr-65x950g-65-class-64-5-diag-bravia-4k-hdr-ultra-hd-tv
```

After several `curl` calls and much crunching later, we should be able to see the files added to the `tests` directory, together with their JSON expectations. We can open them to eyeball if they're correct.

For example, `variants-colors.json` should contain 7 products, and the colors must correspond to what we can see on the JBL speaker page. Similarly, `variants-different-prices.json` should expect correct different prices, `one-price-no-variants.json` should contain just one product, and so on.

If all checks out and tests pass, which we can verify anytime by running `npm test`, we can be pretty sure that our scraper handles variants according to our spec, even before we've even attempted to really run it against the live website. Now let's do exactly that, for one final check:

```text
apify run
```

In the output, we should notice products with variant names and exact prices, like this:

```text
INFO  Saving product {"productName":"Sony XB-950B1 Extra Bass Wireless Headphones with App Control","productUrl":"https://warehouse-theme-metal.myshopify.com/products/sony-xb950-extra-bass-wireless-headphones-with-app-control","vendorName":"Sony","imageUrl":"https://warehouse-theme-metal.myshopify.com/cdn/shop/products/13261_147__1_2e3211f9-de49-4919-9e67-006800a5c5a0.jpg?v=1559727794","minPrice":128,"variantName":"Red","price":178,"sku":14}
```

With a bit of effort, we can see that `minPrice` is `128`, `price` is `178`, and `variantName` is `Red`.

## Wrapping up

If the target website introduces new edge cases, all we have to do now is to identify them and instruct the AI agent to add them as a snapshot to our test suite.

If the website significantly changes and our scraper stops delivering results or even starts crashing, we'll tell the AI agent to update all the snapshots and adjust the code accordingly.

And whenever we're making any changes to our projects, we can now make sure at any moment that it won't break existing behavior, without manual probes or stressing the target website.

With AI agent, docs, and tests, scraper development gets not only much easier, but also allows for a much more reliable and future-proof software.

If you happen to create one such, it would be shame to keep it just for yourself. In the next lesson, we'll publish our scraper to Apify Store so that other people can use it while paying you for its development and maintenance.
