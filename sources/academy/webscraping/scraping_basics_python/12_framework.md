---
title: Using a scraping framework with Python
sidebar_label: Using a framework
description: Lesson about building a Python application for watching prices. Using the Crawlee framework to simplify creating a scraper.
slug: /scraping-basics-python/framework
---

import Exercises from './_exercises.mdx';

**In this lesson, we'll rework our application for watching prices so that it builds on top of a scraping framework. We'll use Crawlee to make the program simpler, faster, and more robust.**

---

Before rewriting our code, let's point out several caveats in our current solution:

- _Hard to maintain:_ All the data we need from the listing page is also available on the product page. By scraping both, we have to maintain selectors for two HTML documents. Instead, we could scrape links from the listing page and process all data on the product pages.
- _Slow:_ The program runs sequentially, which is generously considerate toward the target website, but extremely inefficient.
- _No logging:_ The scraper gives no sense of progress, making it tedious to use. Debugging issues becomes even more frustrating without proper logs.
- _Boilerplate code:_ We implement downloading and parsing HTML, or exporting data to CSV, although we're not the first people to meet and solve these problems.
- _Prone to anti-scraping:_ If the target website implemented anti-scraping measures, a bare-bones program like ours would stop working.
- _Browser means rewrite:_ We got lucky extracting variants. If the website didn't include a fallback, we might have had no choice but to spin up a browser instance and automate clicking on buttons. Such a change in the underlying technology would require a complete rewrite of our program.
- _No error handling:_ The scraper stops if it encounters issues. It should allow for skipping problematic products with warnings or retrying downloads when the website returns temporary errors.

In this lesson, we'll address all of the above issues while keeping the code concise with the help of a scraping framework. We'll use [Crawlee](https://crawlee.dev/), not only because we created it, but also because we believe it's the best tool for the job.

:::info Why Crawlee and not Scrapy

From the two main open-source options for Python, [Scrapy](https://scrapy.org/) and [Crawlee](https://crawlee.dev/python/), we chose the latter—not just because we're the company financing its development.

We genuinely believe beginners to scraping will like it more, since it allows to create a scraper with less code and less time spent reading docs. Scrapy's long history ensures it's battle-tested, but it also means its code relies on technologies that aren't really necessary today. Crawlee, on the other hand, builds on modern Python features like asyncio and type hints.

:::

## Installing Crawlee

When starting with the Crawlee framework, we first need to decide which approach to downloading and parsing we prefer. We want the one based on Beautiful Soup, so let's install the `crawlee` package with the `beautifulsoup` extra specified in brackets. The framework has a lot of dependencies, so expect the installation to take a while.

```text
$ pip install crawlee[beautifulsoup]
...
Successfully installed Jinja2-0.0.0 ... ... ... crawlee-0.0.0 ... ... ...
```

## Running Crawlee

Now let's use the framework to create a new version of our scraper. First, let's rename the `main.py` file to `oldmain.py`, so that we can keep peeking at the original implementation while working on the new one. Then, in the same project directory, we'll create a new, empty `main.py`. The initial content will look like this:

```py
import asyncio
from crawlee.crawlers import BeautifulSoupCrawler, BeautifulSoupCrawlingContext

async def main():
    crawler = BeautifulSoupCrawler()

    @crawler.router.default_handler
    async def handle_listing(context: BeautifulSoupCrawlingContext):
        if title := context.soup.title:
            print(title.text.strip())

    await crawler.run(["https://warehouse-theme-metal.myshopify.com/collections/sales"])

if __name__ == '__main__':
    asyncio.run(main())
```

In the code, we do the following:

1. We import the necessary modules and define an asynchronous `main()` function.
1. Inside `main()`, we first create a crawler object, which manages the scraping process. In this case, it's a crawler based on Beautiful Soup.
1. Next, we define a nested asynchronous function called `handle_listing()`. It receives a `context` parameter, and Python type hints show it's of type `BeautifulSoupCrawlingContext`. Type hints help editors suggest what we can do with the object.
1. We use a Python decorator (the line starting with `@`) to register `handle_listing()` as the _default handler_ for processing HTTP responses.
1. Inside the handler, we extract the page title from the `soup` object and print its text without whitespace.
1. At the end of the function, we run the crawler on a product listing URL and await its completion.
1. The last two lines ensure that if the file is executed directly, Python will properly run the `main()` function using its asynchronous event loop.

Don't worry if some of this is new. We don't need to know exactly how [`asyncio`](https://docs.python.org/3/library/asyncio.html), decorators, or type hints work. Let's stick to the practical side and observe what the program does when executed:

```text
$ python main.py
[BeautifulSoupCrawler] INFO  Current request statistics:
┌───────────────────────────────┬──────────┐
│ requests_finished             │ 0        │
│ requests_failed               │ 0        │
│ retry_histogram               │ [0]      │
│ request_avg_failed_duration   │ None     │
│ request_avg_finished_duration │ None     │
│ requests_finished_per_minute  │ 0        │
│ requests_failed_per_minute    │ 0        │
│ request_total_duration        │ 0.0      │
│ requests_total                │ 0        │
│ crawler_runtime               │ 0.010014 │
└───────────────────────────────┴──────────┘
[crawlee._autoscaling.autoscaled_pool] INFO  current_concurrency = 0; desired_concurrency = 2; cpu = 0; mem = 0; event_loop = 0.0; client_info = 0.0
Sales
[crawlee._autoscaling.autoscaled_pool] INFO  Waiting for remaining tasks to finish
[BeautifulSoupCrawler] INFO  Final request statistics:
┌───────────────────────────────┬──────────┐
│ requests_finished             │ 1        │
│ requests_failed               │ 0        │
│ retry_histogram               │ [1]      │
│ request_avg_failed_duration   │ None     │
│ request_avg_finished_duration │ 0.308998 │
│ requests_finished_per_minute  │ 185      │
│ requests_failed_per_minute    │ 0        │
│ request_total_duration        │ 0.308998 │
│ requests_total                │ 1        │
│ crawler_runtime               │ 0.323721 │
└───────────────────────────────┴──────────┘
```

If our previous scraper didn't give us any sense of progress, Crawlee feeds us with perhaps too much information for the purposes of a small program. Among all the logging, notice the line `Sales`. That's the page title! We managed to create a Crawlee scraper that downloads the product listing page, parses it with Beautiful Soup, extracts the title, and prints it.

:::tip Advanced Python features

You don't need to be an expert in asynchronous programming, decorators, or type hints to finish this lesson, but you might find yourself curious for more details. If so, check out [Async IO in Python: A Complete Walkthrough](https://realpython.com/async-io-python/), [Primer on Python Decorators](https://realpython.com/primer-on-python-decorators/), and [Python Type Checking](https://realpython.com/python-type-checking/).

:::

## Crawling product detail pages

The code now features advanced Python concepts, so it's less accessible to beginners, and the size of the program is about the same as if we worked without a framework. The tradeoff of using a framework is that primitive scenarios may become unnecessarily complex, while complex scenarios may become surprisingly primitive. As we rewrite the rest of the program, the benefits of using Crawlee will become more apparent.

For example, it takes a single line of code to extract and follow links to products. Three more lines, and we have parallel processing of all the product detail pages:

```py
import asyncio
from crawlee.crawlers import BeautifulSoupCrawler, BeautifulSoupCrawlingContext

async def main():
    crawler = BeautifulSoupCrawler()

    @crawler.router.default_handler
    async def handle_listing(context: BeautifulSoupCrawlingContext):
        # highlight-next-line
        await context.enqueue_links(label="DETAIL", selector=".product-list a.product-item__title")

    # highlight-next-line
    @crawler.router.handler("DETAIL")
    # highlight-next-line
    async def handle_detail(context: BeautifulSoupCrawlingContext):
        # highlight-next-line
        print(context.request.url)

    await crawler.run(["https://warehouse-theme-metal.myshopify.com/collections/sales"])

if __name__ == '__main__':
    asyncio.run(main())
```

First, it's necessary to inspect the page in browser DevTools to figure out the CSS selector that allows us to locate links to all the product detail pages. Then we can use the `enqueue_links()` method to find the links and add them to Crawlee's internal HTTP request queue. We tell the method to label all the requests as `DETAIL`.

Below that, we give the crawler another asynchronous function, `handle_detail()`. We again inform the crawler that this function is a handler using a decorator, but this time it's not a default one. This handler will only take care of HTTP requests labeled as `DETAIL`. For now, all it does is print the request URL.

If we run the code, we should see how Crawlee first downloads the listing page and then makes parallel requests to each of the detail pages, printing their URLs along the way:

```text
$ python main.py
[BeautifulSoupCrawler] INFO  Current request statistics:
┌───────────────────────────────┬──────────┐
...
└───────────────────────────────┴──────────┘
[crawlee._autoscaling.autoscaled_pool] INFO  current_concurrency = 0; desired_concurrency = 2; cpu = 0; mem = 0; event_loop = 0.0; client_info = 0.0
https://warehouse-theme-metal.myshopify.com/products/sony-xbr-65x950g-65-class-64-5-diag-bravia-4k-hdr-ultra-hd-tv
https://warehouse-theme-metal.myshopify.com/products/jbl-flip-4-waterproof-portable-bluetooth-speaker
https://warehouse-theme-metal.myshopify.com/products/sony-sacs9-10-inch-active-subwoofer
https://warehouse-theme-metal.myshopify.com/products/sony-ps-hx500-hi-res-usb-turntable
...
[crawlee._autoscaling.autoscaled_pool] INFO  Waiting for remaining tasks to finish
[BeautifulSoupCrawler] INFO  Final request statistics:
┌───────────────────────────────┬──────────┐
│ requests_finished             │ 25       │
│ requests_failed               │ 0        │
│ retry_histogram               │ [25]     │
│ request_avg_failed_duration   │ None     │
│ request_avg_finished_duration │ 0.349434 │
│ requests_finished_per_minute  │ 318      │
│ requests_failed_per_minute    │ 0        │
│ request_total_duration        │ 8.735843 │
│ requests_total                │ 25       │
│ crawler_runtime               │ 4.713262 │
└───────────────────────────────┴──────────┘
```

In the final stats, we can see that we made 25 requests (1 listing page + 24 product pages) in less than 5 seconds. Your numbers might differ, but regardless, it should be much faster than making the requests sequentially. These requests are not made all at once without planning. They are scheduled and sent in a way that doesn't overload the target server. And if they do, Crawlee can automatically retry them.

## Extracting data

The Beautiful Soup crawler provides handlers with the `context.soup` attribute, which contains the parsed HTML of the handled page. This is the same `soup` object we used in our previous program. Let's locate and extract the same data as before:

```py
async def main():
    ...

    @crawler.router.handler("DETAIL")
    async def handle_detail(context: BeautifulSoupCrawlingContext):
        item = {
            "url": context.request.url,
            "title": context.soup.select_one(".product-meta__title").text.strip(),
            "vendor": context.soup.select_one(".product-meta__vendor").text.strip(),
        }
        print(item)
```

:::note Fragile code

The code above assumes the `.select_one()` call doesn't return `None`. If your editor checks types, it might even warn that `text` is not a known attribute of `None`. This isn't robust and could break, but in our program, that's fine. We expect the elements to be there, and if they're not, we'd rather the scraper break quickly—it's a sign something's wrong and needs fixing.

:::

Now for the price. We're not doing anything new here—just copy-paste the code from our old scraper. The only change will be in the selector.

The only change will be in the selector. In `oldmain.py`, we look for `.price` within a `product_soup` object representing a product card. Here, we're looking for `.price` within the entire product detail page. It's better to be more specific so we don't accidentally match another price on the same page:

```py
async def main():
    ...

    @crawler.router.handler("DETAIL")
    async def handle_detail(context: BeautifulSoupCrawlingContext):
        price_text = (
            context.soup
            # highlight-next-line
            .select_one(".product-form__info-content .price")
            .contents[-1]
            .strip()
            .replace("$", "")
            .replace(".", "")
            .replace(",", "")
        )
        item = {
            "url": context.request.url,
            "title": context.soup.select_one(".product-meta__title").text.strip(),
            "vendor": context.soup.select_one(".product-meta__vendor").text.strip(),
            "price": int(price_text),
        }
        print(item)
```

Finally, the variants. We can reuse the `parse_variant()` function as-is, and in the handler we'll again take inspiration from what we have in `oldmain.py`. The full program will look like this:

```py
import asyncio
from crawlee.crawlers import BeautifulSoupCrawler, BeautifulSoupCrawlingContext

async def main():
    crawler = BeautifulSoupCrawler()

    @crawler.router.default_handler
    async def handle_listing(context: BeautifulSoupCrawlingContext):
        await context.enqueue_links(selector=".product-list a.product-item__title", label="DETAIL")

    @crawler.router.handler("DETAIL")
    async def handle_detail(context: BeautifulSoupCrawlingContext):
        price_text = (
            context.soup
            .select_one(".product-form__info-content .price")
            .contents[-1]
            .strip()
            .replace("$", "")
            .replace(".", "")
            .replace(",", "")
        )
        item = {
            "url": context.request.url,
            "title": context.soup.select_one(".product-meta__title").text.strip(),
            "vendor": context.soup.select_one(".product-meta__vendor").text.strip(),
            "price": int(price_text),
            "variant_name": None,
        }
        if variants := context.soup.select(".product-form__option.no-js option"):
            for variant in variants:
                print(item | parse_variant(variant))
        else:
            print(item)

    await crawler.run(["https://warehouse-theme-metal.myshopify.com/collections/sales"])

def parse_variant(variant):
    text = variant.text.strip()
    name, price_text = text.split(" - ")
    price = int(
        price_text
        .replace("$", "")
        .replace(".", "")
        .replace(",", "")
    )
    return {"variant_name": name, "price": price}

if __name__ == '__main__':
    asyncio.run(main())
```

If we run this scraper, we should get the same data for the 24 products as before. Crawlee has saved us a lot of effort by managing downloading, parsing, and parallelization. The code is also cleaner, with two separate and labeled handlers.

Crawlee doesn't do much to help with locating and extracting the data—that part of the code remains almost the same, framework or not. This is because the detective work of finding and extracting the right data is the core value of custom scrapers. With Crawlee, we can focus on just that while letting the framework take care of everything else.

## Saving data

Now that we're _letting the framework take care of everything else_, let's see what it can do about saving data. As of now, the product detail page handler logs each item as soon as it's ready. Instead, we can push the item to Crawlee's default dataset:

```py
async def main():
    ...

    @crawler.router.handler("DETAIL")
    async def handle_detail(context: BeautifulSoupCrawlingContext):
        price_text = (
            ...
        )
        item = {
            ...
        }
        if variants := context.soup.select(".product-form__option.no-js option"):
            for variant in variants:
                # highlight-next-line
                await context.push_data(item | parse_variant(variant))
        else:
            # highlight-next-line
            await context.push_data(item)
```

That's it! If we run the program now, there should be a `storage` directory alongside the `main.py` file. Crawlee uses it to store its internal state. If we go to the `storage/datasets/default` subdirectory, we'll see over 30 JSON files, each representing a single item.

![Single dataset item](images/dataset-item.png)

We can also export all the items to a single file of our choice. We'll do it at the end of the `main()` function, after the crawler has finished scraping:

```py
async def main():
    ...

    await crawler.run(["https://warehouse-theme-metal.myshopify.com/collections/sales"])
    # highlight-next-line
    await crawler.export_data_json(path='dataset.json', ensure_ascii=False, indent=2)
    # highlight-next-line
    await crawler.export_data_csv(path='dataset.csv')
```

After running the scraper again, there should be two new files in your directory, `dataset.json` and `dataset.csv`, containing all the data. If we peek into the JSON file, it should have indentation.

## Logging

Crawlee gives us stats about HTTP requests and concurrency, but we don't get much visibility into the pages we're crawling or the items we're saving. Let's add some custom logging:

```py
import asyncio
from crawlee.crawlers import BeautifulSoupCrawler, BeautifulSoupCrawlingContext

async def main():
    crawler = BeautifulSoupCrawler()

    @crawler.router.default_handler
    async def handle_listing(context: BeautifulSoupCrawlingContext):
        # highlight-next-line
        context.log.info("Looking for product detail pages")
        await context.enqueue_links(selector=".product-list a.product-item__title", label="DETAIL")

    @crawler.router.handler("DETAIL")
    async def handle_detail(context: BeautifulSoupCrawlingContext):
        # highlight-next-line
        context.log.info(f"Product detail page: {context.request.url}")
        price_text = (
            context.soup
            .select_one(".product-form__info-content .price")
            .contents[-1]
            .strip()
            .replace("$", "")
            .replace(".", "")
            .replace(",", "")
        )
        item = {
            "url": context.request.url,
            "title": context.soup.select_one(".product-meta__title").text.strip(),
            "vendor": context.soup.select_one(".product-meta__vendor").text.strip(),
            "price": int(price_text),
            "variant_name": None,
        }
        if variants := context.soup.select(".product-form__option.no-js option"):
            for variant in variants:
                # highlight-next-line
                context.log.info("Saving a product variant")
                await context.push_data(item | parse_variant(variant))
        else:
            # highlight-next-line
            context.log.info("Saving a product")
            await context.push_data(item)

    await crawler.run(["https://warehouse-theme-metal.myshopify.com/collections/sales"])

    # highlight-next-line
    crawler.log.info("Exporting data")
    await crawler.export_data_json(path='dataset.json', ensure_ascii=False, indent=2)
    await crawler.export_data_csv(path='dataset.csv')

def parse_variant(variant):
    text = variant.text.strip()
    name, price_text = text.split(" - ")
    price = int(
        price_text
        .replace("$", "")
        .replace(".", "")
        .replace(",", "")
    )
    return {"variant_name": name, "price": price}

if __name__ == '__main__':
    asyncio.run(main())
```

Depending on what we find helpful, we can tweak the logs to include more or less detail. The `context.log` or `crawler.log` objects are [standard Python loggers](https://docs.python.org/3/library/logging.html).

If we compare `main.py` and `oldmain.py` now, it's clear we've cut at least 20 lines of code compared to the original program, even with the extra logging we've added. Throughout this lesson, we've introduced features to match the old scraper's functionality, but at each phase, the code remained clean and readable. Plus, we've been able to focus on what's unique to the website we're scraping and the data we care about.

In the next lesson, we'll use a scraping platform to set up our application to run automatically every day.

---

<Exercises />

### Build a Crawlee scraper of F1 Academy drivers

Scrape information about all [F1 Academy](https://en.wikipedia.org/wiki/F1_Academy) drivers listed on the official [Drivers](https://www.f1academy.com/Racing-Series/Drivers) page. Each item you push to Crawlee's default dataset should include the following data:

- URL of the driver's f1academy.com page
- Name
- Team
- Nationality
- Date of birth (as a `date()` object)
- Instagram URL

If you export the dataset as JSON, it should look something like this:

<!-- eslint-skip -->
```json
[
  {
    "url": "https://www.f1academy.com/Racing-Series/Drivers/29/Emely-De-Heus",
    "name": "Emely De Heus",
    "team": "MP Motorsport",
    "nationality": "Dutch",
    "dob": "2003-02-10",
    "instagram_url": "https://www.instagram.com/emely.de.heus/",
  },
  {
    "url": "https://www.f1academy.com/Racing-Series/Drivers/28/Hamda-Al-Qubaisi",
    "name": "Hamda Al Qubaisi",
    "team": "MP Motorsport",
    "nationality": "Emirati",
    "dob": "2002-08-08",
    "instagram_url": "https://www.instagram.com/hamdaalqubaisi_official/",
  },
  ...
]
```

:::tip Need a nudge?

- Use Python's `datetime.strptime(text, "%d/%m/%Y").date()` to parse dates in the `DD/MM/YYYY` format. Check out the [docs](https://docs.python.org/3/library/datetime.html#datetime.datetime.strptime) for more details.
- To locate the Instagram URL, use the attribute selector `a[href*='instagram']`. Learn more about attribute selectors in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors).

:::

<details>
  <summary>Solution</summary>

  ```py
  import asyncio
  from datetime import datetime

  from crawlee.crawlers import BeautifulSoupCrawler, BeautifulSoupCrawlingContext

  async def main():
      crawler = BeautifulSoupCrawler()

      @crawler.router.default_handler
      async def handle_listing(context: BeautifulSoupCrawlingContext):
          await context.enqueue_links(selector=".teams-driver-item a", label="DRIVER")

      @crawler.router.handler("DRIVER")
      async def handle_driver(context: BeautifulSoupCrawlingContext):
          info = {}
          for row in context.soup.select(".common-driver-info li"):
              name = row.select_one("span").text.strip()
              value = row.select_one("h4").text.strip()
              info[name] = value

          detail = {}
          for row in context.soup.select(".driver-detail--cta-group a"):
              name = row.select_one("p").text.strip()
              value = row.select_one("h2").text.strip()
              detail[name] = value

          await context.push_data({
              "url": context.request.url,
              "name": context.soup.select_one("h1").text.strip(),
              "team": detail["Team"],
              "nationality": info["Nationality"],
              "dob": datetime.strptime(info["DOB"], "%d/%m/%Y").date(),
              "instagram_url": context.soup.select_one(".common-social-share a[href*='instagram']").get("href"),
          })

      await crawler.run(["https://www.f1academy.com/Racing-Series/Drivers"])
      await crawler.export_data_json(path='dataset.json', ensure_ascii=False, indent=2)

  if __name__ == '__main__':
      asyncio.run(main())
  ```

</details>

### Use Crawlee to find the ratings of the most popular Netflix films

The [Global Top 10](https://www.netflix.com/tudum/top10) page has a table listing the most popular Netflix films worldwide. Scrape the movie names from this page, then search for each movie on [IMDb](https://www.imdb.com/). Assume the first search result is correct and retrieve the film's rating. Each item you push to Crawlee's default dataset should include the following data:

- URL of the film's IMDb page
- Title
- Rating

If you export the dataset as JSON, it should look something like this:

<!-- eslint-skip -->
```json
[
  {
    "url": "https://www.imdb.com/title/tt32368345/?ref_=fn_tt_tt_1",
    "title": "The Merry Gentlemen",
    "rating": "5.0/10"
  },
  {
    "url": "https://www.imdb.com/title/tt32359447/?ref_=fn_tt_tt_1",
    "title": "Hot Frosty",
    "rating": "5.4/10"
  },
  ...
]
```

To scrape IMDb data, you'll need to construct a `Request` object with the appropriate search URL for each movie title. The following code snippet gives you an idea of how to do this:

```py
from urllib.parse import quote_plus

async def main():
    ...

    @crawler.router.default_handler
    async def handle_netflix_table(context: BeautifulSoupCrawlingContext):
        requests = []
        for name_cell in context.soup.select(...):
            name = name_cell.text.strip()
            imdb_search_url = f"https://www.imdb.com/find/?q={quote_plus(name)}&s=tt&ttype=ft"
            requests.append(Request.from_url(imdb_search_url, label="..."))
        await context.add_requests(requests)

    ...
```

:::tip Need a nudge?

When navigating to the first IMDb search result, you might find it helpful to know that `context.enqueue_links()` accepts a `limit` keyword argument, letting you specify the max number of HTTP requests to enqueue.

:::

<details>
  <summary>Solution</summary>

  ```py
  import asyncio
  from urllib.parse import quote_plus

  from crawlee import Request
  from crawlee.crawlers import BeautifulSoupCrawler, BeautifulSoupCrawlingContext

  async def main():
      crawler = BeautifulSoupCrawler()

      @crawler.router.default_handler
      async def handle_netflix_table(context: BeautifulSoupCrawlingContext):
          requests = []
          for name_cell in context.soup.select('[data-uia="top10-table-row-title"] button'):
              name = name_cell.text.strip()
              imdb_search_url = f"https://www.imdb.com/find/?q={quote_plus(name)}&s=tt&ttype=ft"
              requests.append(Request.from_url(imdb_search_url, label="IMDB_SEARCH"))
          await context.add_requests(requests)

      @crawler.router.handler("IMDB_SEARCH")
      async def handle_imdb_search(context: BeautifulSoupCrawlingContext):
          await context.enqueue_links(selector=".find-result-item a", label="IMDB", limit=1)

      @crawler.router.handler("IMDB")
      async def handle_imdb(context: BeautifulSoupCrawlingContext):
          rating_selector = "[data-testid='hero-rating-bar__aggregate-rating__score']"
          rating_text = context.soup.select_one(rating_selector).text.strip()
          await context.push_data({
              "url": context.request.url,
              "title": context.soup.select_one("h1").text.strip(),
              "rating": rating_text,
          })

      await crawler.run(["https://www.netflix.com/tudum/top10"])
      await crawler.export_data_json(path='dataset.json', ensure_ascii=False, indent=2)

  if __name__ == '__main__':
      asyncio.run(main())
  ```

</details>
