---
title: Using a scraping platform with Python
sidebar_label: Using a platform
description: Lesson about building a Python application for watching prices. Using the Apify platform to deploy a scraper.
sidebar_position: 13
slug: /scraping-basics-python/platform
---

import Exercises from './_exercises.mdx';

**In this lesson, we'll deploy our application to a scraping platform that automatically runs it daily. We'll also use the platform's API to retrieve and work with the results.**

---

Before starting with a scraping platform, let's highlight a few caveats in our current setup:

- **User-operated:** We have to run the scraper ourselves. If we're tracking price trends, we'd need to remember to run it daily. And if we want alerts for big discounts, manually running the program isn't much better than just checking the site in a browser every day.
- **No monitoring:** If we have a spare server or a Raspberry Pi lying around, we could use [cron](https://en.wikipedia.org/wiki/Cron) to schedule it. But even then, we'd have little insight into whether it ran successfully, what errors or warnings occurred, how long it took, or what resources it used.
- **Manual data management:** Tracking prices over time means figuring out how to organize the exported data ourselves. Processing the data could also be tricky since different analysis tools often require different formats.
- **Anti-scraping risks:** If the target website detects our scraper, they can rate-limit or block us. Sure, we could run it from a coffee shop's Wi-Fi, but eventually, they'd block that too—risking seriously annoying the barista.

In this lesson, we'll use a platform to address all of these issues. Generic cloud platforms like [GitHub Actions](https://github.com/features/actions) can work for simple scenarios. But platforms dedicated to scraping, like [Apify](https://apify.com/), offer extra features such as monitoring scrapers, managing retrieved data, and overcoming anti-scraping measures.

:::info Why Apify

Scraping platforms come in many varieties, offering a wide range of tools and approaches. As the course authors, we're obviously a bit biased toward Apify—we think it's both powerful and complete.

That said, the main goal of this lesson is to show how deploying to **any platform** can make life easier. Plus, everything we cover here fits within [Apify's free tier](https://apify.com/pricing).

:::

## Registering

First, let's [create a new Apify account](https://console.apify.com/sign-up). The process includes several verifications that you're a human being and that your e-mail address is valid. While annoying, these are necessary measures to prevent abuse of the platform.

Apify serves both as an infrastructure where to privately deploy and run own scrapers, and as a marketplace, where anyone can offer their ready scrapers to others for rent. But we'll overcome our curiosity for now and leave exploring the Apify Store for later.

## Getting access from the command line

To control the platform from our machine and send the code of our program there, we'll need the Apify CLI. On macOS, we can install the CLI using [Homebrew](https://brew.sh), otherwise we'll first need [Node.js](https://nodejs.org/en/download).

After following the [Apify CLI installation guide](https://docs.apify.com/cli/docs/installation), we'll verify that we installed the tool by printing its version:

```text
$ apify --version
apify-cli/0.0.0 system-arch00 node-v0.0.0
```

Now let's connect the CLI with the cloud platform using our account from previous step:

```text
$ apify login
...
Success: You are logged in to Apify as user1234!
```

## Starting a real-world project

Until now we kept our scrapers minimal, each being represented by just a single Python module, such as `main.py`. Also we've been adding dependencies to our project by only installing them by `pip` inside an activated virtual environment.

If we were to send our code to a friend like this, they wouldn't know what they need to install before they can run the scraper without import errors. The same applies if we were to send our code to a cloud platform.

To be able to share what we've built we need a packaged Python project. The best way to do that is to follow the official [Python Packaging User Guide](https://packaging.python.org/), but for the sake of this course let's take a shortcut with the Apify CLI.

Change directory in your terminal to a place where you start new projects. Then run the following command-it will create a new subdirectory called `warehouse-watchdog` for the new project, which will contain all the necessary files:

```text
$ apify create warehouse-watchdog --template=python-crawlee-beautifulsoup
Info: Python version 0.0.0 detected.
Info: Creating a virtual environment in ...
...
Success: Actor 'warehouse-watchdog' was created. To run it, run "cd warehouse-watchdog" and "apify run".
Info: To run your code in the cloud, run "apify push" and deploy your code to Apify Console.
Info: To install additional Python packages, you need to activate the virtual environment in the ".venv" folder in the actor directory.
```

## Adjusting the template

Inside the `warehouse-watchdog` directory, we should see a `src` subdirectory containing several Python files, a `main.py` among them. That is a sample BeautifulSoup scraper provided by the template.

The file contains a single asynchronous function `main()`. In the beginning it handles [input](https://docs.apify.com/platform/actors/running/input-and-output#input), then it passes that input to a small crawler built on top of the Crawlee framework.

Each program which should run on the Apify platform needs to be first packaged as a so-called Actor, a standardized box with places for input and output. Crawlee scrapers automatically connect to the Actor output, but the input needs to be explicitly handled in code.

We'll now adjust the template so it runs our program for watching prices. As a first step, we'll create a new empty file `crawler.py` inside the `warehouse-watchdog/src` directory, and we'll fill this new file with the [final code](./12_framework.md#logging) from the previous lesson:

```py title=warehouse-watchdog/src/crawler.py
import asyncio
from decimal import Decimal
from crawlee.crawlers import BeautifulSoupCrawler

async def main():
    crawler = BeautifulSoupCrawler()

    @crawler.router.default_handler
    async def handle_listing(context):
        context.log.info("Looking for product detail pages")
        await context.enqueue_links(selector=".product-list a.product-item__title", label="DETAIL")

    ...
```

Now let's change the contents of `warehouse-watchdog/src/main.py` to this:

```py title=warehouse-watchdog/src/main.py
from apify import Actor
from .crawler import main as crawl

async def main():
    async with Actor:
        await crawl()
```

We imported our program as a function and we await result of that function inside the Actor block. Unlike the sample scraper, our program doesn't expect any input data, so we could delete the code handling that part.

Now we'll change directory in our terminal so that we're inside `warehouse-watchdog`. There, we'll verify that everything works on our machine before we deploy our project to the cloud:

```text
$ apify run
Run: /Users/course/Projects/warehouse-watchdog/.venv/bin/python3 -m src
[apify] INFO  Initializing Actor...
[apify] INFO  System info ({"apify_sdk_version": "0.0.0", "apify_client_version": "0.0.0", "crawlee_version": "0.0.0", "python_version": "0.0.0", "os": "xyz"})
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
│ crawler_runtime               │ 0.016736 │
└───────────────────────────────┴──────────┘
[crawlee._autoscaling.autoscaled_pool] INFO  current_concurrency = 0; desired_concurrency = 2; cpu = 0; mem = 0; event_loop = 0.0; client_info = 0.0
[BeautifulSoupCrawler] INFO  Looking for product detail pages
[BeautifulSoupCrawler] INFO  Product detail page: https://warehouse-theme-metal.myshopify.com/products/jbl-flip-4-waterproof-portable-bluetooth-speaker
[BeautifulSoupCrawler] INFO  Saving a product variant
[BeautifulSoupCrawler] INFO  Saving a product variant
...
```

## Deploying to platform

The Actor configuration coming from the template instructs the platform to expect input, so we better change that before we attempt to run our scraper in the cloud.

Inside `warehouse-watchdog` there is a directory called `.actor`. Inside, we'll edit the `input_schema.json` file. It comes out of the template like this:

```json title=warehouse-watchdog/src/.actor/input_schema.json
{
    "title": "Python Crawlee BeautifulSoup Scraper",
    "type": "object",
    "schemaVersion": 1,
    "properties": {
        "start_urls": {
            "title": "Start URLs",
            "type": "array",
            "description": "URLs to start with",
            "prefill": [
                { "url": "https://apify.com" }
            ],
            "editor": "requestListSources"
        }
    },
    "required": ["start_urls"]
}
```

:::tip Hidden dot files

Beware that on some systems `.actor` might be by default hidden in the directory listing, because it starts with a dot. Try to locate the file using your editor's built-in file explorer.

:::

We'll empty the expected properties and remove the list of required ones. After our changes, the file should look like this:

```json title=warehouse-watchdog/src/.actor/input_schema.json
{
    "title": "Python Crawlee BeautifulSoup Scraper",
    "type": "object",
    "schemaVersion": 1,
    "properties": {}
}
```

:::danger Trailing commas in JSON

Make sure there is no trailing comma after `{}`, otherwise the file won't be valid JSON.

:::

Now we can proceed to deploying:

```text
$ apify push
Info: Created Actor with name warehouse-watchdog on Apify.
Info: Deploying Actor 'warehouse-watchdog' to Apify.
Run: Updated version 0.0 for Actor warehouse-watchdog.
Run: Building Actor warehouse-watchdog
...
Actor build detail https://console.apify.com/actors/a123bCDefghiJkLMN#/builds/0.0.1
? Do you want to open the Actor detail in your browser? (Y/n)
```

After agreeing to opening the Actor detail in our browser, assuming we're logged in we'll see a button to **Start Actor**. Hitting it brings us to a screen for specifying Actor input and run options. Without chaning anything we'll continue by hitting **Start** and immediately we should be presented with logs of the scraper run, similar to what we'd normally see in our terminal, but this time a remote copy of our program runs on a cloud platform.

When the run finishes, the interface should turn green. On the **Output** tab we're able to preview results of the scraper as a table or as JSON, and there's even a button to export the data to many different formats, including CSV, XML, Excel, RSS, and more.

:::note Accessing data programmatically

You don't need to click buttons to download the data. The same can be achieved by [Apify's API](https://docs.apify.com/api/v2/dataset-items-get), the [`apify datasets`](https://docs.apify.com/cli/docs/reference#datasets) CLI command, or by the [`apify`](https://docs.apify.com/api/client/python/reference/class/DatasetClientAsync) Python SDK.

:::

## Running the scraper periodically

Let's say we want our scraper to collect data about sale prices daily. In the Apify web interface, we'll go to [Schedules](https://console.apify.com/schedules). Hitting **Create new** will open a setup screen where we can specify periodicity (daily is the default) and identify Actors which should be started. When we're done, we can hit **Enable**. That's it!

From now on, the Actor will execute daily. We'll be able to inspect every single run. For each run we'll have access to its logs, and the data collected. We'll see stats, monitoring charts, and we'll be able to setup alerts sending us a notification under specified conditions.

## Adding support for proxies

If monitoring of our scraper starts showing that it regularly fails to reach the Warehouse shop website, we're most likely getting blocked. In such case we can use proxies so that our requests come from different locations in the world and our scraping is less apparent in the volume of the website's standard traffic.

Proxy configuration is a type of Actor input, so let's start with re-introducing the code taking care of that. We'll change `warehouse-watchdog/src/main.py` to this:

```py title=warehouse-watchdog/src/main.py
from apify import Actor
from .crawler import main as crawl

async def main():
    async with Actor:
        input_data = await Actor.get_input()

        if actor_proxy_input := input_data.get("proxyConfig"):
            proxy_config = await Actor.create_proxy_configuration(actor_proxy_input=actor_proxy_input)
        else:
            proxy_config = None

        await crawl(proxy_config)
```

Now we'll add `proxy_config` as an optional parameter to the scraper in `warehouse-watchdog/src/crawler.py`. Thanks to built-in integration between Apify and Crawlee, it's enough to pass it down to `BeautifulSoupCrawler()` and the class will do the rest:


```py title=warehouse-watchdog/src/crawler.py
import asyncio
from decimal import Decimal
from crawlee.crawlers import BeautifulSoupCrawler

# highlight-next-line
async def main(proxy_config = None):
    # highlight-next-line
    crawler = BeautifulSoupCrawler(proxy_configuration=proxy_config)
    # highlight-next-line
    crawler.log.info(f"Using proxy: {'yes' if proxy_config else 'no'}")

    @crawler.router.default_handler
    async def handle_listing(context):
        context.log.info("Looking for product detail pages")
        await context.enqueue_links(selector=".product-list a.product-item__title", label="DETAIL")

    ...
```

Last but not least we'll modify the Actor configuration in `warehouse-watchdog/src/.actor/input_schema.json` so that it includes the `proxyConfig` input parameter:

```json title=warehouse-watchdog/src/.actor/input_schema.json
{
    "title": "Python Crawlee BeautifulSoup Scraper",
    "type": "object",
    "schemaVersion": 1,
    "properties": {
        "proxyConfig": {
            "title": "Proxy config",
            "description": "Proxy configuration",
            "type": "object",
            "editor": "proxy",
            "prefill": {
                "useApifyProxy": true,
                "apifyProxyGroups": []
            },
            "default": {
                "useApifyProxy": true,
                "apifyProxyGroups": []
            }
        }
    }
}
```

Now if we run the scraper locally, it should all work without error. We'll use the `apify run` command again, but with the `--purge` option, which makes sure we're not re-using anything from the previous run.

```text
$ apify run --purge
Info: All default local stores were purged.
Run: /Users/course/Projects/warehouse-watchdog/.venv/bin/python3 -m src
[apify] INFO  Initializing Actor...
[apify] INFO  System info ({"apify_sdk_version": "0.0.0", "apify_client_version": "0.0.0", "crawlee_version": "0.0.0", "python_version": "0.0.0", "os": "xyz"})
[BeautifulSoupCrawler] INFO  Using proxy: no
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
│ crawler_runtime               │ 0.014976 │
└───────────────────────────────┴──────────┘
[crawlee._autoscaling.autoscaled_pool] INFO  current_concurrency = 0; desired_concurrency = 2; cpu = 0; mem = 0; event_loop = 0.0; client_info = 0.0
[BeautifulSoupCrawler] INFO  Looking for product detail pages
[BeautifulSoupCrawler] INFO  Product detail page: https://warehouse-theme-metal.myshopify.com/products/jbl-flip-4-waterproof-portable-bluetooth-speaker
[BeautifulSoupCrawler] INFO  Saving a product variant
[BeautifulSoupCrawler] INFO  Saving a product variant
...
```

In the logs we can notice a line `Using proxy: no`. When running the scraper locally, the Actor input doesn't contain any proxy configuration. The requests will be all made from our location, the same way as previously. Now let's update our cloud copy of the scraper with `apify push` so that it's based on our latest edits to the code:

```text
$ apify push
Info: Deploying Actor 'warehouse-watchdog' to Apify.
Run: Updated version 0.0 for Actor warehouse-watchdog.
Run: Building Actor warehouse-watchdog
(timestamp) ACTOR: Found input schema referenced from .actor/actor.json
...
? Do you want to open the Actor detail in your browser? (Y/n)
```

After opening the Actor detail in our browser, we should see the **Source** screen. We'll switch to the **Input** tab of that screen. There we can now see the **Proxy config** input option. By default it's set to **Datacenter - Automatic**, and we'll leave it like that. Let's hit the **Start** button! In the logs we should see the following:

```text
(timestamp) ACTOR: Pulling Docker image of build o6vHvr5KwA1sGNxP0 from repository.
(timestamp) ACTOR: Creating Docker container.
(timestamp) ACTOR: Starting Docker container.
(timestamp) [apify] INFO  Initializing Actor...
(timestamp) [apify] INFO  System info ({"apify_sdk_version": "0.0.0", "apify_client_version": "0.0.0", "crawlee_version": "0.0.0", "python_version": "0.0.0", "os": "xyz"})
(timestamp) [BeautifulSoupCrawler] INFO  Using proxy: yes
(timestamp) [BeautifulSoupCrawler] INFO  Current request statistics:
(timestamp) ┌───────────────────────────────┬──────────┐
(timestamp) │ requests_finished             │ 0        │
(timestamp) │ requests_failed               │ 0        │
(timestamp) │ retry_histogram               │ [0]      │
(timestamp) │ request_avg_failed_duration   │ None     │
(timestamp) │ request_avg_finished_duration │ None     │
(timestamp) │ requests_finished_per_minute  │ 0        │
(timestamp) │ requests_failed_per_minute    │ 0        │
(timestamp) │ request_total_duration        │ 0.0      │
(timestamp) │ requests_total                │ 0        │
(timestamp) │ crawler_runtime               │ 0.036449 │
(timestamp) └───────────────────────────────┴──────────┘
(timestamp) [crawlee._autoscaling.autoscaled_pool] INFO  current_concurrency = 0; desired_concurrency = 2; cpu = 0; mem = 0; event_loop = 0.0; client_info = 0.0
(timestamp) [crawlee.storages._request_queue] INFO  The queue still contains requests locked by another client
(timestamp) [BeautifulSoupCrawler] INFO  Looking for product detail pages
(timestamp) [BeautifulSoupCrawler] INFO  Product detail page: https://warehouse-theme-metal.myshopify.com/products/jbl-flip-4-waterproof-portable-bluetooth-speaker
(timestamp) [BeautifulSoupCrawler] INFO  Saving a product variant
...
```

The logs contain `Using proxy: yes`, which confirms that the scraper now uses proxies provided by the Apify platform.

## Congratulations!

You reached the end of the course, congratulations! Together we've built a program which crawls a shop, extracts data about products and their prices and exports the data. We managed to simplify our work with a framework and deployed our scraper to a scraping platform so that it can periodically run unassisted and accumulate data over time. The platform also helps us with monitoring or anti-scraping.

We hope that this will serve as a good start for your next adventure in the world of scraping. Perhaps creating scrapers which you publish for a fee so that others can re-use them? 😉

---

<Exercises />

:::danger Work in progress

This course is incomplete. As we work on adding new lessons, we would love to hear your feedback. You can comment right here under each page or [file a GitHub Issue](https://github.com/apify/apify-docs/issues) to discuss a problem.

:::
