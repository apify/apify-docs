---
title: Using a scraping framework with Python
sidebar_label: Using a framework
description: Lesson about building a Python application for watching prices. Using the Crawlee framework to simplify creating a scraper.
sidebar_position: 12
slug: /scraping-basics-python/framework
---

**In this lesson, we'll rework our application for watching prices so that it builds on top of a scraping framework. We'll use Crawlee to make the program simpler, faster, and more robust.**

---

Before rewriting our code, let's point out several caveats in our current solution:

- **Hard to maintain:** All the data we need from the listing page is also available on the product page. By scraping both, we have to maintain selectors for two HTML documents. Instead, we could scrape links from the listing page and process all data on the product pages.
- **Slow:** The program runs sequentially, which is considerate toward the target website, but downloading even two product pages in parallel could improve speed by 200%.
- **No logging:** The scraper gives no sense of progress, making it tedious to use. Debugging issues becomes even more frustrating without proper logs.
- **Boilerplate code:** We implement tasks like downloading and parsing HTML or exporting to CSV with custom code that feels like [boilerplate](https://en.wikipedia.org/wiki/Boilerplate_code). We could replace it with standardized solutions.
- **Prone to anti-scraping:** If the target website implemented anti-scraping measures, a bare-bones program like ours would stop working.
- **Browser means rewrite:** We got lucky extracting variants. If the website didn't include a fallback, we might have had no choice but to spin up a browser instance and automate clicking on buttons. Such a change in the underlying technology would require a complete rewrite of our program.
- **No error handling:** The scraper stops if it encounters issues. It should allow for skipping problematic products with warnings or retrying downloads when the website returns temporary errors.

In this lesson, we'll tackle all the above issues by using a scraping framework while keeping the code concise.

:::info Why Crawlee and not Scrapy

From the two main open-source options for Python, [Scrapy](https://scrapy.org/) and [Crawlee](https://crawlee.dev/python/), we chose the latter—not just because we're the company financing its development.

We genuinely believe beginners to scraping will like it more, since it allows to create a scraper with less code and less time spent reading docs. Scrapy's long history ensures it's battle-tested, but it also means its code relies on technologies that aren't really necessary today. Crawlee, on the other hand, builds on modern Python features like asyncio and type hints.

:::

## Installing Crawlee

When starting with the Crawlee framework, we first need to decide which approach to downloading and parsing we prefer. We want the one based on BeautifulSoup, so let's install the `crawlee` package with the `beautifulsoup` extra specified in brackets. The framework has a lot of dependencies, so expect the installation to take a while.

```text
$ pip install crawlee[beautifulsoup]
...
Successfully installed Jinja2-0.0.0 ... ... ... crawlee-0.0.0 ... ... ...
```

## Running Crawlee

Now let's use the framework to create a new version of our scraper. In the same project directory where our `main.py` file lives, create a file `newmain.py`. This way, we can keep peeking at the original implementation while working on the new one. The initial content will look like this:

```py title="newmain.py"
import asyncio
from crawlee.beautifulsoup_crawler import BeautifulSoupCrawler

async def main():
    crawler = BeautifulSoupCrawler()

    @crawler.router.default_handler
    async def handle_listing(context):
        print(context.soup.title.text.strip())

    await crawler.run(["https://warehouse-theme-metal.myshopify.com/collections/sales"])

if __name__ == '__main__':
    asyncio.run(main())
```

In the code, we do the following:

1.  We perform imports and specify an asynchronous `main()` function.
1.  Inside, we first create a crawler. The crawler objects control the scraping. This particular crawler is of the BeautifulSoup flavor.
1.  In the middle, we give the crawler a nested asynchronous function `handle_listing()`. Using a Python decorator (that line starting with `@`), we tell it to treat it as a default handler. Handlers take care of processing HTTP responses. This one finds the title of the page in `soup` and prints its text without whitespace.
1.  The function ends with running the crawler with the product listing URL. We await the crawler to finish its work.
1.  The last two lines ensure that if we run the file as a standalone program, Python's asynchronous machinery will run our `main()` function.

Don't worry if this involves a lot of things you've never seen before. For now, you don't need to know exactly how [`asyncio`](https://docs.python.org/3/library/asyncio.html) works or what decorators do. Let's stick to the practical side and see what the program does when executed:

```text
$ python newmain.py
[crawlee.beautifulsoup_crawler._beautifulsoup_crawler] INFO  Current request statistics:
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
[crawlee.beautifulsoup_crawler._beautifulsoup_crawler] INFO  Final request statistics:
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

If our previous scraper didn't give us any sense of progress, Crawlee feeds us with perhaps too much information for the purposes of a small program. Among all the diagnostics, notice the line `Sales`. That's the page title! We managed to create a Crawlee scraper that downloads the product listing page, parses it with BeautifulSoup, extracts the title, and prints it.

## Crawling product detail pages




<!--



pip install 'crawlee[beautifulsoup]'


-->

:::danger Work in progress

This course is incomplete. As we work on adding new lessons, we would love to hear your feedback. You can comment right here under each page or [file a GitHub Issue](https://github.com/apify/apify-docs/issues) to discuss a problem.

:::
