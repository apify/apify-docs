---
title: Usage and resources
description: Learn about your actors' memory and processing power requirements, their relationship with Docker resources, and minimum requirements for different use cases.
sidebar_position: 2
slug: /actors/running/memory-and-cpu
---

# Usage and resources

**Learn about your actors' memory and processing power requirements, their relationship with Docker resources, and minimum requirements for different use cases.**

---

[Actors](../index.md) run in
[Docker containers](https://www.docker.com/resources/what-container),
which have a [limited amount of resources](https://phoenixnap.com/kb/docker-memory-and-cpu-limit). When starting, the actor needs to be allocated a certain share of those resources, such as how much CPU "horsepower" it will be able to use.

![Setting an actor's memory](../images/memory-settings.png)

By assigning an actor's **memory** capacity, you also assign it a proportional amount of **CPU power**. Every CPU core corresponds to 4 GB of memory. So, 512 MB = 1/8th of a core, 1 GB = 1/4 of core, 8 GB gives you 2 cores, and so on.

In addition to CPU power, the memory allocation also influences disk size, which amounts to 2x the allocated memory.

## Memory requirements

Each use case has its own minimum memory requirements. The larger and more complex your project, the more memory/CPU power it will require. Some examples which have minimum requirements are:

- Actors using [Puppeteer](https://pptr.dev/): at least 1GB of memory.

- Large and complex sites like [Google Maps](https://apify.com/drobnikj/crawler-google-places): at least 4GB for optimal speed and [concurrency](https://crawlee.dev/api/core/class/AutoscaledPool#minConcurrency).

- Working with a large amount of data in memory.

## How much memory should you allocate?

Actors built on top of the [Apify SDK](/sdk/js) and [Crawlee](https://crawlee.dev/) use autoscaling. This means that they will always run as efficiently as they can with the memory they have allocated. So, if you allocate 2 times more memory, the run should be 2 times faster and consume the same amount of compute units (1 * 1 = 0.5 * 2).

A good middle ground to start is 4096 MB. If you need the results faster, increase the memory (bear in mind the [next point](#maximum-memory), though). You can also try decreasing it to lower the pressure on the target site.

Autoscaling only applies to solutions that run multiple tasks (URLs) for at least 30 seconds. If you need to scrape just one URL or use actors like [Google Sheets](https://apify.com/lukaskrivka/google-sheets) that do just a single isolated job, we recommend you lower the memory

### Maximum memory

Apify actors are most commonly written in [Node.js](https://nodejs.org/en/), which uses a [single process thread](https://betterprogramming.pub/is-node-js-really-single-threaded-7ea59bcc8d64). Unless you use external binaries such as the Chrome browser, Puppeteer, or other multi-threaded libraries you will not gain more CPU power from assigning your actor more than 4 GB of memory because Node.js cannot use more than 1 core.

In other words, giving a simple [Cheerio-based crawler](https://apify.com/apify/cheerio-scraper) 16GB of memory (4 CPU cores) will not make it faster because these crawlers simply cannot use more than 1 CPU core.

> It is possible to [use multiple threads in Node.js-based actor](https://dev.to/reevranj/multiple-threads-in-nodejs-how-and-what-s-new-b23) with some configuration. This can be useful if you need to offload a part of your workload.

## CPU usage spikes

![A usage spike on an actor's start-up](../images/memory-cpu-usage-spike.png)

[//]: # (Is it still relevant though? Does it still get CPU boost?)
Sometimes, you see the actor’s CPU use go over 100%. This is not unusual. To help an actor start up faster, it is allocated a free CPU boost. For example, if an actor is assigned 1GB (25% of a core), it will temporarily be allowed to use 100% of the core, so it gets started quicker.


## What is a compute unit?

**Apify actors' platform resource usage is calculated in compute units. Find out what they are, how they work, and how you are charged for running actors.**

---

**TL;DR: An [actor](../index.md) running with 1 GB of [memory](./usage_and_resources.md) for one hour consumes 1 compute unit.**

A compute unit (CU) is the unit of measurement for the resources consumed by actor runs and builds. We charge you for using actors based on CU consumption.

For example, if you run an actor with 1GB of allocated memory for 1 hour, it will consume 1 CU. Depending on your [subscription plan](https://apify.com/pricing/actors#how-does-the-platform-pricing-work), this CU will cost you a certain amount of money.

You can see each actor run's exact CU usage under the **Info** tab in the run's details.

![An actor run's platform usage](./images/usage_and_resources/actor-usage.png)

You can [find a summary of your overall platform and CU usage](https://console.apify.com/billing) in the **Billing** section of the Apify Console.

### How are CUs calculated?

To calculate CUs, you need to multiply two factors:

- Memory (GB) - Size of the allocated server for your actor or task run.

- Duration (hours) - How long the server is used (actor or task run).

**1 GB memory x 1 hour = 1 CU.**

### How do we charge for CU usage?

For running actors, you are charged for each CU you use. The amount charged depends on how many CUs you use, however the principle remains the same: 1 CU costs X amount of money. Each of our [subscription plans](https://apify.com/pricing/actors#how-does-the-platform-pricing-work) has a different rate per CU.

### Example use cases

All the use cases below (and many more) are measured with the same predictable unit - the CU.

- Scraping 10 million pages with a one week-long scrape every month.

- Running 50 parallel runs of quick scrapes at peak time.

- Running a one-page scraper every 5 seconds.

- A complex system with many different actors integrated and producing high-value data combined from many sources.

- Running an actor as a server.

#### Memory

[Memory](./usage_and_resources.md) determines the share of a server you are allocated. The number of MBs (megabytes) directly corresponds to RAM allocated. In addition, for each 4096 MB (4 GB) of RAM, you are allocated one CPU core (for 1024 MB (1 GB), you are allocated 25% of the CPU core, and so on).

**[See our article on memory and CPU](./usage_and_resources.md) for more details.**

#### Duration

CUs are calculated in seconds. If you know the number of seconds your run took (or should take), you just need to convert that into hours to get a number that you can use for CU calculation.

For example, if your run took 6 minutes (360 seconds), you can use 0.1 (hours) as the second number to calculate CUs.

### What determines consumption

The factors, in order of importance, are:

- **Using a browser or plain HTTP**: launching a browser ([Puppeteer](https://pptr.dev/)/[Playwright](https://playwright.dev/)) is resource-intensive and slow. Working with plain HTML ([Cheerio](https://cheerio.js.org/)) can be up to **20 times** faster.

- **Run size and frequency**: large runs can utilize full resource scaling and are not subjected to repeated actor start-ups (as opposed to many short runs). Always opt for larger batches, if possible.

- **Page type**: heavy pages like Amazon or Facebook will take more time to load regardless whether you use a browser or Cheerio. Large pages can take up to **3 times** more resources to load and parse than average pages.

**Our [article on estimating consumption](https://help.apify.com/en/articles/3470975-how-to-estimate-compute-unit-usage-for-your-project) contains more details on what determines consumption.**

### How to estimate consumption

Most actors in [Apify Store](https://apify.com/store) have some information in their README about how many CUs they consume per certain amount of data scraped.

[//]: # (TODO: It's pretty outdated, we now have platform credits in pricing)
[//]: # (If you read that you can scrape 1000 pages of data for 1 CU and you want to scrape approximately 2 million of them monthly, that means you need 2000 CUs monthly and should [subscribe to the Business plan]&#40;https://console.apify.com/billing-new#/subscription&#41;.)

If the actor doesn't have this information, or you want to use your own solution, just run your solution like you want to use it long term. Let's say that you want to scrape the data **every hour for the whole month**. You set up a reasonable memory allocation like 4096 MB and the whole run takes 15 minutes. That should consume 1 CU (4 * 0.25 = 1). Now, you just need to multiply that by the number of hours in the day and by the number of days in the month, and you get an estimated usage of 720 (1 * 24 * 30) CUs monthly.

**[See our article on estimating consumption](https://help.apify.com/en/articles/3470975-how-to-estimate-compute-unit-usage-for-your-project) for more details.**


## Limits

[See the **Limits** page](../limits.md) for information on actor memory and CPU limits.
