---
title: Scraping product variants with Node.js
sidebar_label: Scraping product variants
description: Lesson about building a Node.js application for watching prices. Using browser DevTools to figure out how to extract product variants and exporting them as separate items.
slug: /scraping-basics-javascript2/scraping-variants
unlisted: true
---

import Exercises from './_exercises.mdx';

**In this lesson, we'll scrape the product detail pages to represent each product variant as a separate item in our dataset.**

---

We'll need to figure out how to extract variants from the product detail page, and then change how we add items to the data list so we can add multiple items after scraping one product URL.

## Locating variants

First, let's extract information about the variants. If we go to [Sony XBR-950G BRAVIA](https://warehouse-theme-metal.myshopify.com/products/sony-xbr-65x950g-65-class-64-5-diag-bravia-4k-hdr-ultra-hd-tv) and open the DevTools, we can see that the buttons for switching between variants look like this:

```html
<div class="block-swatch-list">
  <div class="block-swatch">
    <input class="block-swatch__radio product-form__single-selector is-filled" type="radio" name="template--14851594125363__main-1916221128755-1" id="template--14851594125363__main-1916221128755-1-1" value="55&quot;" checked="" data-option-position="1">
    <label class="block-swatch__item" for="template--14851594125363__main-1916221128755-1-1" title="55&quot;">
    <!-- highlight-next-line -->
    <span class="block-swatch__item-text">55"</span>
    </label>
  </div>
  <div class="block-swatch">
    <input class="block-swatch__radio product-form__single-selector" type="radio" name="template--14851594125363__main-1916221128755-1" id="template--14851594125363__main-1916221128755-1-2" value="65&quot;" data-option-position="1">
    <label class="block-swatch__item" for="template--14851594125363__main-1916221128755-1-2" title="65&quot;">
    <!-- highlight-next-line -->
    <span class="block-swatch__item-text">65"</span>
    </label>
  </div>
</div>
```

Nice! We can extract the variant names, but we also need to extract the price for each variant. Switching the variants using the buttons shows us that the HTML changes dynamically. This means the page uses JavaScript to display this information.

![Switching variants](images/variants-js.gif)

If we can't find a workaround, we'd need our scraper to run browser JavaScript. That's not impossible. Scrapers can spin up their own browser instance and automate clicking on buttons, but it's slow and resource-intensive. Ideally, we want to stick to plain HTTP requests and Cheerio as much as possible.

After a bit of detective work, we notice that not far below the `block-swatch-list` there's also a block of HTML with a class `no-js`, which contains all the data!

```html
<div class="no-js product-form__option">
  <label class="product-form__option-name text--strong" for="product-select-1916221128755">Variant</label>
  <div class="select-wrapper select-wrapper--primary is-filled">
    <select id="product-select-1916221128755" name="id">
      <!-- highlight-next-line -->
      <option value="17550242349107" data-sku="SON-695219-XBR-55">
        <!-- highlight-next-line -->
        55" - $1,398.00
      </option>
      <!-- highlight-next-line -->
      <option value="17550242414643" data-sku="SON-985594-XBR-65" selected="selected">
        <!-- highlight-next-line -->
        65" - $2,198.00
      </option>
    </select>
  </div>
</div>
```

These elements aren't visible to regular visitors. They're there just in case browser JavaScript fails to work, otherwise they're hidden. This is a great find because it allows us to keep our scraper lightweight.

## Extracting variants

Using our knowledge of Cheerio, we can locate the `option` elements and extract the data we need. We'll loop over the options, extract variant names, and create a corresponding array of items for each product:

```js
const listingURL = "https://warehouse-theme-metal.myshopify.com/collections/sales"
const $ = await download(listingURL);

const $promises = $(".product-item").map(async (i, element) => {
  const $productItem = $(element);
  const item = parseProduct($productItem, listingURL);

  const $p = await download(item.url);
  item.vendor = $p(".product-meta__vendor").text().trim();

  // highlight-start
  const $items = $p(".product-form__option.no-js option").map((j, element) => {
    const $option = $(element);
    const variantName = $option.text().trim();
    return { variantName, ...item };
  });
  // highlight-end

  return item;
});
const data = await Promise.all($promises.get());
```

The CSS selector `.product-form__option.no-js` targets elements that have both the `product-form__option` and `no-js` classes. We then use the [descendant combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_combinator) to match all `option` elements nested within the `.product-form__option.no-js` wrapper.

We loop over the variants using Cheerio's `.map()` method to create a collection of item copies for each `variantName`. We now need to pass all these items onward, but the function currently returns just one item per product. And what if there are no variants?

Let's adjust the loop so it returns a promise that resolves to an array of items instead of a single item. If a product has no variants, we'll return an array with a single item, setting `variantName` to `null`:

```js
const listingURL = "https://warehouse-theme-metal.myshopify.com/collections/sales"
const $ = await download(listingURL);

const $promises = $(".product-item").map(async (i, element) => {
  const $productItem = $(element);
  const item = parseProduct($productItem, listingURL);

  const $p = await download(item.url);
  item.vendor = $p(".product-meta__vendor").text().trim();

  const $items = $p(".product-form__option.no-js option").map((j, element) => {
    const $option = $(element);
    const variantName = $option.text().trim();
    return { variantName, ...item };
  });

  // highlight-start
  if ($items.length > 0) {
    return $items.get();
  }
  return [{ variantName: null, ...item }];
  // highlight-end
});
// highlight-start
const itemLists = await Promise.all($promises.get());
const data = itemLists.flat();
// highlight-end
```

After modifying the loop, we also updated how we collect the items into the `data` array. Since the loop now produces an array of items per product, the result of `await Promise.all()` is an array of arrays. We use [`.flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) to merge them into a single, non-nested array.

If we run the program now, we'll see 34 items in total. Some items don't have variants, so they won't have a variant name. However, they should still have a price set—our scraper should already have that info from the product listing page.

<!-- eslint-skip -->
```json title=products.json
[
  ...
  {
    "variant": null,
    "url": "https://warehouse-theme-metal.myshopify.com/products/klipsch-r-120sw-powerful-detailed-home-speaker-set-of-1",
    "title": "Klipsch R-120SW Powerful Detailed Home Speaker - Unit",
    "minPrice": 32400,
    "price": 32400,
    "vendor": "Klipsch"
  },
  ...
]
```

Some products will break into several items, each with a different variant name. We don't know their exact prices from the product listing, just the min price. In the next step, we should be able to parse the actual price from the variant name for those items.

<!-- eslint-skip -->
```json title=products.json
[
  ...
  {
    "variant": "Red - $178.00",
    "url": "https://warehouse-theme-metal.myshopify.com/products/sony-xb950-extra-bass-wireless-headphones-with-app-control",
    "title": "Sony XB-950B1 Extra Bass Wireless Headphones with App Control",
    "minPrice": 12800,
    "price": null,
    "vendor": "Sony"
  },
  {
    "variant": "Black - $178.00",
    "url": "https://warehouse-theme-metal.myshopify.com/products/sony-xb950-extra-bass-wireless-headphones-with-app-control",
    "title": "Sony XB-950B1 Extra Bass Wireless Headphones with App Control",
    "minPrice": 12800,
    "price": null,
    "vendor": "Sony"
  },
  ...
]
```

Perhaps surprisingly, some products with variants will have the price field set. That's because the shop sells all variants of the product for the same price, so the product listing shows the price as a fixed amount, like _$74.95_, instead of _from $74.95_.

<!-- eslint-skip -->
```json title=products.json
[
  ...
  {
    "variant": "Red - $74.95",
    "url": "https://warehouse-theme-metal.myshopify.com/products/jbl-flip-4-waterproof-portable-bluetooth-speaker",
    "title": "JBL Flip 4 Waterproof Portable Bluetooth Speaker",
    "minPrice": 7495,
    "price": 7495,
    "vendor": "JBL"
  },
  ...
]
```

## Parsing price

The items now contain the variant as text, which is good for a start, but we want the price to be in the `price` property. Let's introduce a new function to handle that:

```js
function parseVariant($option) {
  const [variantName, priceText] = $option
    .text()
    .trim()
    .split(" - ");
  const price = parseInt(
    priceText
      .replace("$", "")
      .replace(".", "")
      .replace(",", "")
  );
  return { variantName, price };
}
```

First, we split the text into two parts, then we parse the price as a number. This part is similar to what we already do for parsing product listing prices. The function returns an object we can merge with `item`.

## Saving price

Now, if we use our new function, we should finally get a program that can scrape exact prices for all products, even if they have variants. The whole code should look like this now:

```js
import * as cheerio from 'cheerio';
import { writeFile } from 'fs/promises';
import { AsyncParser } from '@json2csv/node';

async function download(url) {
  const response = await fetch(url);
  if (response.ok) {
    const html = await response.text();
    return cheerio.load(html);
  } else {
    throw new Error(`HTTP ${response.status}`);
  }
}

function parseProduct(productItem, baseURL) {
  const title = productItem.find(".product-item__title");
  const titleText = title.text().trim();
  const url = new URL(title.attr("href"), baseURL).href;

  const price = productItem.find(".price").contents().last();
  const priceRange = { minPrice: null, price: null };
  const priceText = price
    .text()
    .trim()
    .replace("$", "")
    .replace(".", "")
    .replace(",", "");

  if (priceText.startsWith("From ")) {
      priceRange.minPrice = parseInt(priceText.replace("From ", ""));
  } else {
      priceRange.minPrice = parseInt(priceText);
      priceRange.price = priceRange.minPrice;
  }

  return { url, title: titleText, ...priceRange };
}

async function exportJSON(data) {
  return JSON.stringify(data, null, 2);
}

async function exportCSV(data) {
  const parser = new AsyncParser();
  return await parser.parse(data).promise();
}

// highlight-start
function parseVariant($option) {
  const [variantName, priceText] = $option
    .text()
    .trim()
    .split(" - ");
  const price = parseInt(
    priceText
      .replace("$", "")
      .replace(".", "")
      .replace(",", "")
  );
  return { variantName, price };
}
// highlight-end

const listingURL = "https://warehouse-theme-metal.myshopify.com/collections/sales"
const $ = await download(listingURL);

const $promises = $(".product-item").map(async (i, element) => {
  const $productItem = $(element);
  const item = parseProduct($productItem, listingURL);

  const $p = await download(item.url);
  item.vendor = $p(".product-meta__vendor").text().trim();

  const $items = $p(".product-form__option.no-js option").map((j, element) => {
    // highlight-next-line
    const variant = parseVariant($(element));
    // highlight-next-line
    return { ...item, ...variant };
  });

  if ($items.length > 0) {
    return $items.get();
  }
  return [{ variantName: null, ...item }];
});
const itemLists = await Promise.all($promises.get());
const data = itemLists.flat();

await writeFile('products.json', await exportJSON(data));
await writeFile('products.csv', await exportCSV(data));
```

Let's run the scraper and see if all the items in the data contain prices:

<!-- eslint-skip -->
```json title=products.json
[
  ...
  {
    "url": "https://warehouse-theme-metal.myshopify.com/products/sony-xb950-extra-bass-wireless-headphones-with-app-control",
    "title": "Sony XB-950B1 Extra Bass Wireless Headphones with App Control",
    "minPrice": 12800,
    "price": 17800,
    "vendor": "Sony",
    "variantName": "Red"
  },
  {
    "url": "https://warehouse-theme-metal.myshopify.com/products/sony-xb950-extra-bass-wireless-headphones-with-app-control",
    "title": "Sony XB-950B1 Extra Bass Wireless Headphones with App Control",
    "minPrice": 12800,
    "price": 17800,
    "vendor": "Sony",
    "variantName": "Black"
  },
  ...
]
```

Success! We managed to build a Node.js application for watching prices!

Is this the end? Maybe! In the next lesson, we'll use a scraping framework to build the same application, but with less code, faster requests, and better visibility into what's happening while we wait for the program to finish.

---

<Exercises />

### Build a scraper for watching Python jobs

You're able to build a scraper now, aren't you? Let's build another one! Python's official website has a [job board](https://www.python.org/jobs/). Scrape the job postings that match the following criteria:

- Tagged as "Database"
- Posted within the last 60 days

For each job posting found, use [`pp()`](https://docs.python.org/3/library/pprint.html#pprint.pp) to print a dictionary containing the following data:

- Job title
- Company
- URL to the job posting
- Date of posting

Your output should look something like this:

```py
{'title': 'Senior Full Stack Developer',
 'company': 'Baserow',
 'url': 'https://www.python.org/jobs/7705/',
 'posted_on': datetime.date(2024, 9, 16)}
{'title': 'Senior Python Engineer',
 'company': 'Active Prime',
 'url': 'https://www.python.org/jobs/7699/',
 'posted_on': datetime.date(2024, 9, 5)}
...
```

You can find everything you need for working with dates and times in Python's [`datetime`](https://docs.python.org/3/library/datetime.html) module, including `date.today()`, `datetime.fromisoformat()`, `datetime.date()`, and `timedelta()`.

<details>
  <summary>Solution</summary>

  After inspecting the job board, you'll notice that job postings tagged as "Database" have a dedicated URL. We'll use that as our starting point, which saves us from having to scrape and check the tags manually.

  ```py
  from pprint import pp
  import httpx
  from bs4 import BeautifulSoup
  from urllib.parse import urljoin
  from datetime import datetime, date, timedelta

  today = date.today()
  jobs_url = "https://www.python.org/jobs/type/database/"
  response = httpx.get(jobs_url)
  response.raise_for_status()
  soup = BeautifulSoup(response.text, "html.parser")

  for job in soup.select(".list-recent-jobs li"):
      link = job.select_one(".listing-company-name a")

      time = job.select_one(".listing-posted time")
      posted_at = datetime.fromisoformat(time["datetime"])
      posted_on = posted_at.date()
      posted_ago = today - posted_on

      if posted_ago <= timedelta(days=60):
          title = link.text.strip()
          company = list(job.select_one(".listing-company-name").stripped_strings)[-1]
          url = urljoin(jobs_url, link["href"])
          pp({"title": title, "company": company, "url": url, "posted_on": posted_on})
  ```

</details>

### Find the shortest CNN article which made it to the Sports homepage

Scrape the [CNN Sports](https://edition.cnn.com/sport) homepage. For each linked article, calculate its length in characters:

- Locate the element that holds the main content of the article.
- Use [`get_text()`](https://beautiful-soup-4.readthedocs.io/en/latest/index.html#get-text) to extract all the content as plain text.
- Use `len()` to calculate the character count.

Skip pages without text (like those that only have a video). Sort the results and print the URL of the shortest article that made it to the homepage.

At the time of writing, the shortest article on the CNN Sports homepage is [about a donation to the Augusta National Golf Club](https://edition.cnn.com/2024/10/03/sport/masters-donation-hurricane-helene-relief-spt-intl/), which is just 1,642 characters long.

<details>
  <summary>Solution</summary>

  ```py
  import httpx
  from bs4 import BeautifulSoup
  from urllib.parse import urljoin

  def download(url):
      response = httpx.get(url)
      response.raise_for_status()
      return BeautifulSoup(response.text, "html.parser")

  listing_url = "https://edition.cnn.com/sport"
  listing_soup = download(listing_url)

  data = []
  for card in listing_soup.select(".layout__main .card"):
      link = card.select_one(".container__link")
      article_url = urljoin(listing_url, link["href"])
      article_soup = download(article_url)
      if content := article_soup.select_one(".article__content"):
          length = len(content.get_text())
          data.append((length, article_url))

  data.sort()
  shortest_item = data[0]
  item_url = shortest_item[1]
  print(item_url)
  ```

</details>
