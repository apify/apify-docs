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

## Creating a package

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

A new `warehouse-watchdog` subdirectory should appear. Inside, we should see a `src` directory containing several Python files, a `main.py` among them. That is a sample BeautifulSoup scraper provided by the template. Let's edit the file and overwrite the contents with our scraper (full code is provided in the previous lesson as the [last code example](./12_framework.md#logging)).

## Deploying to platform

As a first step, we'll change directory in our terminal so that we're inside `warehouse-watchdog`. There, we'll verify that everything works on our machine before we deploy our project to the cloud:

```text
$ apify run
Run: /Users/course/Projects/warehouse-watchdog/.venv/bin/python3 -m src
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

If the scraper run ends without errors, we can proceed to deploying:

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

Let's agree to opening the Actor detail in browser. There we'll find a button to **Start Actor**.

## What's next

---

<Exercises />

:::danger Work in progress

This course is incomplete. As we work on adding new lessons, we would love to hear your feedback. You can comment right here under each page or [file a GitHub Issue](https://github.com/apify/apify-docs/issues) to discuss a problem.

:::
