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

That said, the main goal of this lesson is to show how deploying to **any platform** can make life easier—it's not Apify-specific. Plus, everything we cover here fits within [Apify's free tier](https://apify.com/pricing).

:::

## Packaging the project

Until now we've been adding dependencies to our project by only installing them by `pip` inside an activated virtual environment. If we were to send our code to a friend, they wouldn't know what they need to install before they can run the scraper without import errors. The same applies if we were to send our code to a cloud platform.

In the root of the project, let's create a file called `requirements.txt`, with a single line consisting of a single word:

```text title="requirements.txt"
crawlee
```

Each line in the file represents a single dependency, but so far our program has just one. With `requirements.txt` in place, Apify can run `pip install -r requirements.txt` to download and install all dependencies of the project before starting our program.

:::tip Packaging projects

The [requirements file](https://pip.pypa.io/en/latest/user_guide/#requirements-files) is an obsolete approach to packaging a Python project, but it still works and it's the simplest, which is convenient for the purposes of this lesson.

For any serious work the best and future-proof approach to packaging is to create the [`pyproject.toml`](https://packaging.python.org/en/latest/guides/writing-pyproject-toml/) configuration file. We recommend the official [Python Packaging User Guide](https://packaging.python.org/) for more info.

:::

## Registering

As a second step, let's [create a new Apify account](https://console.apify.com/sign-up). The process includes several verifications that you're a human being and that your e-mail address is valid. While annoying, these are necessary measures to prevent abuse of the platform.

Apify serves both as an infrastructure where to privately deploy and run own scrapers, and as a marketplace, where anyone can offer their ready scrapers to others for rent. We'll overcome our curiosity for now and leave exploring the Apify Store for later.

## Getting access from the command line

To control the platform from our machine and send the code of our program there, we'll need the Apify CLI. On macOS, we can install the CLI using [Homebrew](https://brew.sh), otherwise we'll first need [Node.js](https://nodejs.org/en/download).

After following the [Apify CLI installation guide](https://docs.apify.com/cli/docs/installation), we'll verify that we installed the tool by printing its version:

```text
$ apify --version
apify-cli/0.0.0 system-arch00 node-v0.0.0
```

Now let's connect the CLI with the platform using our account:

```text
$ apify login
...
Success: You are logged in to Apify as user1234!
```

<!--
    it seems apify init won't recognize the project only with requirements.txt
    https://crawlee.dev/python/docs/introduction/deployment
    https://packaging.python.org/en/latest/tutorials/installing-packages/
    https://docs.apify.com/sdk/python/docs/overview/introduction
-->

## Creating an Actor

...

## What's next

---

<Exercises />

:::danger Work in progress

This course is incomplete. As we work on adding new lessons, we would love to hear your feedback. You can comment right here under each page or [file a GitHub Issue](https://github.com/apify/apify-docs/issues) to discuss a problem.

:::
