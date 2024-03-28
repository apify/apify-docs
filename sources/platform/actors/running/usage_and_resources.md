---
title: Usage and resources
description: Learn about your Actors' memory and processing power requirements, their relationship with Docker resources, minimum requirements for different use cases and its impact on the cost.
sidebar_position: 2
slug: /actors/running/usage-and-resources
---

# Usage and resources

**Learn about your Actors' memory and processing power requirements, their relationship with Docker resources, minimum requirements for different use cases and its impact on the cost.**

---

## Resources

[Actors](../index.mdx) run in [Docker containers](https://www.docker.com/resources/what-container), which have a [limited amount of resources](https://phoenixnap.com/kb/docker-memory-and-cpu-limit) (memory, CPU, disk size, etc). When starting, the Actor needs to be allocated a certain share of those resources, such as CPU capacity that is necessary for the Actor to run.

![Setting an Actor's memory](./images/usage_and_resources/memory-settings.png)

Assigning an Actor a specific **Memory** capacity, also determines the allocated CPU power and its disk size.

Check out the [Limits](../../limits.md) page for detailed information on Actor memory, CPU limits, disk size and other limits.

### Memory

When invoking an Actor, the caller must specify the memory allocation for the Actor run. The memory allocation must follow these requirements:

- It must be a power of 2.
- The minimum allowed value is `128MB`
- The maximum allowed value is `32768MB`
- Acceptable values include: `128MB`, `256MB`, `512MB`, `1024MB`, `2048MB`, `4096MB`, `8192MB`, `16384MB`, and `32768MB`

Additionally, each user has a certain total limit of memory for running Actors. The sum of memory allocated for all running Actors and builds needs to be within this limit, otherwise the user cannot start a new Actor. For more details, see [limits](../../limits.md).

### CPU

The CPU allocation for an Actor is automatically computed based on the assigned memory, following these rules:

- For every `4096MB` of memory, the Actor receives one full CPU core
- If the memory allocation is not a multiple of `4096MB`, the CPU core allocation is calculated proportionally
- Examples:
  - `512MB` = 1/8 of a CPU core
  - `1024MB` = 1/4 of a CPU core
  - `8192MB` = 2 CPU cores

#### CPU usage spikes

![A usage spike on an Actor's start-up](./images/usage_and_resources/memory-cpu-usage-spike.png)

[//]: # (Is it still relevant though? Does it still get CPU boost?)
Sometimes, you see the Actor's CPU use go over 100%. This is not unusual. To help an Actor start up faster, it is allocated a free CPU boost. For example, if an Actor is assigned 1GB (25% of a core), it will temporarily be allowed to use 100% of the core, so it gets started quicker.

### Disk

The Actor has hard disk space limited by twice the amount of memory. For example, an Actor with `1024MB` of memory will have `2048MB` of disk available.

## Requirements

Actors built with [Crawlee](https://crawlee.dev/) use autoscaling. This means that they will always run as efficiently as they can based on the allocated memory. So, if you double the allocated memory, the run should be twice as fast and consume the same amount of compute units (1 * 1 = 0.5 * 2).

A good middle ground is `4096MB`. If you need the results faster, increase the memory (bear in mind the [next point](#maximum-memory), though). You can also try decreasing it to lower the pressure on the target site.

Autoscaling only applies to solutions that run multiple tasks (URLs) for at least 30 seconds. If you need to scrape just one URL or use Actors like [Google Sheets](https://apify.com/lukaskrivka/google-sheets) that do just a single isolated job, we recommend you lower the memory.

[//]: # (TODO: It's pretty outdated, we now have platform credits in pricing)
<!-- vale off -->
[//]: # (If you read that you can scrape 1000 pages of data for 1 CU and you want to scrape approximately 2 million of them monthly, that means you need 2000 CUs monthly and should [subscribe to the Business plan]&#40;https://console.apify.com/billing-new#/subscription&#41;.)
<!-- vale on -->

If the Actor doesn't have this information, or you want to use your own solution, just run your solution like you want to use it long term. Let's say that you want to scrape the data **every hour for the whole month**. You set up a reasonable memory allocation like `4096MB`, and the whole run takes 15 minutes. That should consume 1 CU (4 \* 0.25 = 1). Now, you just need to multiply that by the number of hours in the day and by the number of days in the month, and you get an estimated usage of 720 (1 \* 24 \* 30) CUs monthly.

:::tip Estimating usage

Check out our article on [estimating consumption](https://help.apify.com/en/articles/3470975-how-to-estimate-compute-unit-usage-for-your-project) for more details.

:::

### Memory requirements

Each use case has its own memory requirements. The larger and more complex your project, the more memory/CPU power it will require. Some examples which have minimum requirements are:

- Actors using [Puppeteer](https://pptr.dev/) or [Playwright](https://playwright.dev/) for real web browser rendering require at least `1024MB` of memory.
- Large and complex sites like [Google Maps](https://apify.com/drobnikj/crawler-google-places) require at least `4096MB` for optimal speed and [concurrency](https://crawlee.dev/api/core/class/AutoscaledPool#minConcurrency).
- Projects involving large amount of data in memory.

### Maximum memory

Apify Actors are most commonly written in [Node.js](https://nodejs.org/en/), which uses a [single thread process](https://dev.to/arealesramirez/is-node-js-single-threaded-or-multi-threaded-and-why-ab1). Unless you use external binaries such as the Chrome browser, Puppeteer, Playwright, or other multi-threaded libraries you will not gain more CPU power from assigning your Actor more than `4096MB` of memory because Node.js cannot use more than 1 core.

In other words, giving a [Cheerio-based crawler](https://apify.com/apify/cheerio-scraper) `16384MB` of memory (4 CPU cores) will not improve its performance, because these crawlers cannot use more than 1 CPU core.

:::note Multi-threaded Node.js configuration

It's possible to [use multiple threads in Node.js-based Actor](https://dev.to/reevranj/multiple-threads-in-nodejs-how-and-what-s-new-b23) with some configuration. This can be useful if you need to offload a part of your workload.

:::

## Usage

When you run an Actor it generates platform usage that's charged to the user account. Platform usage comprises four main parts:

- **Compute units**: CPU and memory resources consumed by the Actor.
- **Data transfer**: The amount of data transferred between the web, Apify platform, and other external systems.
- **Proxy costs**: Residential or SERP proxy usage.
- **Storage operations**: Read, write, and other operations performed on the Key-value store, Dataset, and Request queue.

The platform usage can be represented either in raw units (e.g. gigabytes for data transfer, or number of writes for dataset operations), or in the dollar equivalents.

To view the usage of an Actor run, navigate to the **Runs** section and check out the **Usage** column.

<!-- here add screenshot of runs lines with arrow pointing to usage column -->

![Runs usage](./images/usage_and_resources/usage-and-resources-runs-usage.png)

 For a more detailed breakdown, click on the specific run you want to examine

<!-- here add screenshot of detailed run usage breakdown -->

![Actors run usage details](./images/usage_and_resources/usage-and-resources-runs-usage-details.png)

:::note Usage billing elements

For technical reasons, when viewing the usage in dollars for a specific historical Actor run or build in the API or Apify Console, your current service pricing is used to compute the dollar amount.
This should be used for informational purposes only.

:::

For detailed information, FAQ, and, pricing check out the [platform pricing page](https://apify.com/pricing/actors).

### What is a compute unit

A compute unit (CU) is the unit of measurement for the resources consumed by Actor runs and builds. You are charged for using Actors based on CU consumption.

For example, running an Actor with`1024MB` of allocated memory for 1 hour will consume 1 CU. The cost of this CU depends on your [subscription plan](https://apify.com/pricing/actors#how-does-the-platform-pricing-work).

You can check each Actor run's exact CU usage in the run's details.

![An Actor run's platform usage](./images/usage_and_resources/actor-usage.png)

You can [find a summary of your overall platform and CU usage](https://console.apify.com/billing) in the **Billing** section of Apify Console.

#### Compute unit calculation

CUs are calculated by multiplying two factors:

- **Memory** (MB) - The size of the allocated server for your Actor or task run.
- **Duration** (hours) - The duration for which the server is used (Actor or task run). For example, if your run took 6 minutes, you would use 0.1 (hours) as the second number to calculate CUs. The minimum granularity is a second.

Example: _1024MB memory x 1 hour = 1 CU_

### What determines consumption

The factors that influence resource consumption, in order of importance, are:

- _Browser vs. Plain HTTP_: Launching a browser (e.g., [Puppeteer](https://pptr.dev/)/[Playwright](https://playwright.dev/)) is resource-intensive and slower compared to working with plain HTML ([Cheerio](https://cheerio.js.org/)). Using Cheerio can be up to _20 times_ faster.

- _Run size and frequency_: Large runs can use full resource scaling and are not subjected to repeated Actor start-ups (as opposed to many short runs). Whenever possible, opt for larger batches.

- _Page type_: Heavy pages, such as Amazon or Facebook will take more time to load regardless whether you use a browser or Cheerio. Large pages can take up to _3 times_ more resources to load and parse than average pages.

You can check out our [article on estimating consumption](https://help.apify.com/en/articles/3470975-how-to-estimate-compute-unit-usage-for-your-project) for more details on what determines consumption.
