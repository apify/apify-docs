---
title: Actor usage and resources
sidebar_label: Usage and resources
description: Learn how memory determines CPU and disk for Apify Actor runs, what memory limits apply, how to choose memory, and how to check what a run costs.
sidebar_position: 2
slug: /actors/running/usage-and-resources
---

Every Actor run gets a set amount of computing resources. The resources you give a run affect how fast it finishes and how much it costs.

## Resource allocation

The memory you assign to an Actor run determines the allocated CPU and disk space in the following way:

| Memory | CPU cores | Disk |
| --- | --- | --- |
| 128 MB | 1/32 | 256 MB |
| 256 MB | 1/16 | 512 MB |
| 512 MB | 1/8 | 1,024 MB |
| 1,024 MB | 1/4 | 2,048 MB |
| 2,048 MB | 1/2 | 4,096 MB |
| 4,096 MB | 1 | 8,192 MB |
| 8,192 MB | 2 | 16,384 MB |
| 16,384 MB | 4 | 32,768 MB |
| 32,768 MB | 8 | 65,536 MB |

### CPU usage spikes

For the first 10 seconds of a run, an Actor can get additional CPU at no extra cost, so it starts faster. Because of the boost, CPU usage at the start of a run can go over 100%.

For example, if you assign 1 GB (1/4 of a CPU core) to an Actor, it can use up to a full core while it starts. The amount of additional CPU isn't guaranteed.

## Memory limits {#memory}

Apify limits how much memory a single run can use, and how much memory all your runs and builds can use at the same time.

For details, see [Limits](/account/limits).

### Per-run limits

Run memory must be a power of 2, from 128 MB to 32,768 MB. [See the allowed values](#resource-allocation).

Depending on the Actor, you might not be able to pick every value. Its developer can set a minimum and maximum memory.

If you don't set memory for a run, it uses the Actor's default memory. The Actor's developer sets this default and can configure the Actor to calculate it from your input using [dynamic memory](/actors/development/actor-definition/dynamic-actor-memory).

### Account memory limit

The total memory available to your account depends on your subscription plan. All Actor runs and builds that are running at the same time share this limit.

For example, if your plan has a limit of 16,384 MB and you have two runs using 8,192 MB each, you can't start another run or build until one of them finishes.

To free up memory, you can:

- Wait for your running jobs to finish or abort the ones you don't need.
- Start runs with less memory.
- [Upgrade your plan](/account/subscriptions). On a paid plan, you can also buy extra memory as an add-on.

## Choose memory for your Actor

Actors built with [Crawlee](https://crawlee.dev/) use autoscaling, which adjusts how many requests Actors process in parallel to the memory and CPU they get. If you double the memory, the run finishes in about half the time and uses the same number of [compute units](/actors/running/usage-and-resources/compute-units): 1 GB × 1 hour = 2 GB × 0.5 hours = 1 CU.

Start with 4,096 MB. To get results faster, [increase the memory](#maximum-memory). To reduce the load on the target website, decrease the memory.

Autoscaling only helps runs that process many URLs for at least 30 seconds. For Actors that scrape one URL or do a single isolated job, use less memory.

To estimate how many compute units your project needs, see [Estimate resource consumption](/actors/running/usage-and-resources/compute-units#estimate-resource-consumption).

### Minimum memory

The more complex the Actor's job, the more resources it needs. For example:

- Actors that render pages in a browser with [Puppeteer](https://pptr.dev/) or [Playwright](https://playwright.dev/) require at least 1,024 MB of memory.
- Actors that scrape large and complex sites, such as [Google Maps](https://apify.com/compass/crawler-google-places), require at least 4,096 MB to run at full speed.
- Actors that hold large amounts of data in memory require more memory.

### Maximum memory

Apify Actors are usually written in [Node.js](https://nodejs.org/en/), which uses a [single thread process](https://dev.to/arealesramirez/is-node-js-single-threaded-or-multi-threaded-and-why-ab1).

Node.js can't use more than 1 core, so you can't get more CPU power from assigning your Actor more than 4,096 MB of memory, unless you use external binaries such as the Chrome browser, Puppeteer, Playwright, or other multi-threaded libraries.

For example, giving a [Cheerio-based crawler](https://apify.com/apify/cheerio-scraper) 16,384 MB of memory (4 CPU cores) doesn't improve its performance. These crawlers can't use more than 1 CPU core.

:::note Multi-threaded Node.js configuration

As a developer, you can configure a Node.js-based Actor to [use multiple threads](https://dev.to/reevranj/multiple-threads-in-nodejs-how-and-what-s-new-b23). It can be useful if you need to offload a part of your workload.

:::

## Platform usage {#usage}

Running an Actor generates platform usage that includes:

- [Compute units](/actors/running/usage-and-resources/compute-units). Memory allocated to the Actor run or build, multiplied by how long it lasts.
- Data transfer. Data the run sends and receives.
- [Proxy](/proxy). Residential proxy traffic and SERP requests.
- [Storage operations](/storage). Reads, writes, and other operations on datasets, key-value stores, and request queues.

### Check cost per run

To view the total cost for the Actor run:

1. Log in to [Apify Console](https://console.apify.com/).
1. Go to the Actor's page.
1. Select the **Runs** tab.
1. In the table, check the **Usage** column.

To see the breakdown of the cost, hover over the amount in the **Usage** column.

:::note Costs of past runs and builds

A run's total cost uses the prices from when the run happened. The cost of each item in the breakdown uses the current prices. As a result, the items might not add up to the total cost if the prices have changed.

:::
