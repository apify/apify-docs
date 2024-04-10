---
title: Scraping website from multiple Actor runs
description: Learn how to run multiple instances of an Actor to scrape a website faster. This tutorial will guide you through the process of setting up your scraper.
sidebar_position: 3
slug: /advanced-web-scraping/multiple-runs-scrape
---

# Scraping website from multiple Actor runs

**Learn how to run multiple instances of an Actor to scrape a website faster. This tutorial will guide you through the process of setting up your scraper.**

---

Imagine a large website that you need to scrape. You have a scraper that works well, but it's slow to scrape the whole website.
You can speed up the scraping process by running multiple instances of the scraper in parallel. This tutorial will guide you through the process of setting up your scraper to run multiple instances in parallel.

> In a rush? You can check [full code example](https://github.com/metalwarrior665/apify-utils/tree/master/examples/crawler-with-filters) right away.

## How to manage scraper in multiple runs

To manage multiple instances of the scraper we will need to create a master actor that will control the scraping process. The master actor will create multiple instances of the scraper actor and
manage the scraping process. It creates a request queue and dataset which other actors will use crawling and saving results from the website.
Then you need to update or create a new actor that will scrape the website. This actor will use the request queue and dateset created by the master actor.

## Master Actor

The master actor will create a request queue and dataset. It will then run multiple instances of the scraper actor and pass the request queue and dataset to them.
As the first step we crate a new Actor and

```typescript
import { Actor, ApifyClient } from 'apify';

interface Input {
    parallelRunsCount: number;
    targetActorId: string;
    targetActorInput: Record<string, any>;
    targetActorRunOptions: Record<string, any>;
}

interface State {
    parallelRunIds: string[];
    isInitialized: boolean;
}

await Actor.init();

const {
    parallelRunsCount= 1,
    targetActorId,
    targetActorInput,
    targetActorRunOptions
} = await Actor.getInput<Input>() ?? {} as Input;

const requestQueue = await Actor.openRequestQueue();
const dataset = await Actor.openDataset();
```


