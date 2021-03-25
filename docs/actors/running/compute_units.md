---
title: Compute units and consumption
description: Apify actors' platform resource usage is calculated in compute units. Find out what they are, how they work, and how you are charged for running actors.
menuWeight: 3
paths:
# NOTE: IF ADDING A NEW PATH, LEAVE THE OLD ONES FOR REDIRECTS
    - actors/running/compute-units
---

# What is a compute unit?

**TL;DR: An [actor]({{@link actors.md}}) running with 1 GB of [memory]({{@link actors/running/memory_and_cpu.md}}) for one hour consumes 1 compute unit.**

A compute unit (CU) is the unit of measurement for the resources consumed by actor runs and builds. We charge you for using actors based on CU consumption.

For example, if you run an actor with 1GB of allocated memory for 1 hour, it will consume 1 CU. Depending on your [subscription plan](https://apify.com/pricing/actors#how-does-the-platform-pricing-work), this CU will cost you a certain amount of money.

You can see each actor run's exact CU usage under the **Info** tab in the run's details.

![An actor run's platform usage]({{@asset actors/images/actor-usage.png}})

You can [find a summary of your overall platform and CU usage](https://my.apify.com/billing-new) in the **Billing** section of the Apify app.

## How are CUs calculated?

To calculate CUs, you need to multiply two factors:

- Memory (GB) - Size of the allocated server for your actor or task run.

- Duration (hours) - How long the server is used (actor or task run).

**1 GB memory x 1 hour = 1 CU.**

## How do we charge for CU usage?

For running actors, you are charged for each CU you use. The amount charged depends on how many CUs you use, however the principle remains the same: 1 CU costs X amount of money. Each of our [subscription plans](https://apify.com/pricing/actors#how-does-the-platform-pricing-work) has a different rate per CU.

## Example use cases

All of the use cases below (and many more) are measured with the same predictable unit - the CU.

- Scraping 10 million pages with a one week-long scrape every month.

- Running 50 parallel runs of quick scrapes at peak time.

- Running a one-page scraper every 5 seconds.

- A complex system with many different actors integrated and produce high value data combined from many sources.

- Running an actor as a server.

### Memory

[Memory]({{@link actors/running/memory_and_cpu.md}}) determines the share of a server you are allocated. The number of MBs (megabytes) directly corresponds to RAM allocated. In addition, for each 4096 MB (4 GB) of RAM, you are allocated one CPU core (for 1024 MB (1 GB), you are allocated 25% of the CPU core, and so on).

**[See our article on memory and CPU]({{@link actors/running/memory_and_cpu.md}}) for more details.**

### Duration

CUs are calculated in seconds. If you know the number of seconds your run took (or should take), you just need to convert that into hours to get a number that you can use for CU calculation.

For example, if your run took 6 minutes (360 seconds), you can use 0.1 (hours) as the second number to calculate CUs.

## What determines consumption

The factors, in order of importance, are:

- Using a browser or plain HTTP: launching a browser ([Puppeteer](https://pptr.dev/)/[Playwright](https://playwright.dev/)) is resource-intensive and slow. Working with plain HTML ([Cheerio](https://cheerio.js.org/)) can be up to **20 times** faster.

- Run size and frequency: large runs can utilize full resource scaling and are not subjected to repeated actor start-ups (as opposed to many short runs). Always opt for larger batches, if possible.

- Page type: heavy pages like Amazon or Facebook will take more time to load regardless whether you use a browser or Cheerio. Large pages can take up to **3 times** more resources to load and parse than average pages.

**Our [article on estimating consumption](https://help.apify.com/en/articles/3470975-how-to-estimate-compute-unit-usage-for-your-project) contains more details on what determines consumption.**

## How to estimate consumption

Most actors in [Apify Store](https://apify.com/store) have some information in their README about how many CUs they consume per certain amount of data scraped.

If you read that you can scrape 1000 pages of data for 1 CU and you want to scrape approximately 2 million of them monthly, that means you need 2000 CUs monthly and should [subscribe to the Business plan](https://my.apify.com/billing-new#/subscription).

If the actor doesn't have this information, or you want to use your own solution, just run your solution like you want to use it long term. Let's say that you want to scrape the data **every hour for the whole month**. You set up a reasonable memory allocation like 4096 MB and the whole run takes 15 minutes. That should consume 1 CU (4 * 0.25 = 1). Now, you just need to multiply that by the number of hours in the day and by the number of days in the month and you get an estimated usage of 720 (1 * 24 * 30) CUs monthly.

**[See our article on estimating consumption](https://help.apify.com/en/articles/3470975-how-to-estimate-compute-unit-usage-for-your-project) for more details.**
