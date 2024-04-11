---
title: Scrape website from multiple Actor runs
description: Learn how to run multiple instances of an Actor to scrape a website faster. This tutorial will guide you through the process of setting up your scraper.
sidebar_position: 15.10
slug: /node-js/multiple-runs-scrape
---

# Scraping website from multiple Actor runs

**Learn how to run multiple instances of an Actor to scrape a website faster. This tutorial will guide you through the process of setting up your scraper.**

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import MasterActorMainTs from '!!raw-loader!../../../../examples/ts-parallel-runs-scraping-master/src/main.ts';
import MasterActorInputSchemaJson from '!!raw-loader!../../../../examples/ts-parallel-runs-scraping-master/.actor/input_schema.json';
import ScraperActorMainTs from '!!raw-loader!../../../../examples/ts-parallel-runs-scraping-scraper/src/main.ts';
import ScraperActorInputSchemaJson from '!!raw-loader!../../../../examples/ts-parallel-runs-scraping-scraper/.actor/input_schema.json';

Imagine a large website that you need to scrape. You have a scraper that works well, but it's slow to scrape the whole website.
You can speed up the scraping process by running multiple instances of the scraper in parallel.
This tutorial will guide you through the process of setting up your scraper to run multiple instances in parallel.

> In a rush? You can check [full code example](TODO) right away.

## How to manage scraper in multiple runs

To manage multiple instances of the scraper we will need to create a master Actor that will control the scraping process. The master Actor will create multiple instances of the scraper Actor and
manage the scraping process. It creates a request queue and dataset which other Actors will use crawling and saving results from the website.
Then you need to update or create a new Actor that will scrape the website. This Actor will use the request queue and dateset created by the master Actor.

## Master Actor

The master Actor will re-use a default request queue and dataset. It will then run multiple instances of the scraper Actor and pass the request queue and dataset to them.
As the first step we crate a new Actor and

### Input

Let's start by defining the input schema for the master Actor. The input will contain the number of parallel runs, the target Actor ID, the target Actor input, and the target Actor run options.

<Tabs groupId="main">
<TabItem value="input_schema.json" label="input_schema.json">

<CodeBlock language="json">{MasterActorInputSchemaJson}</CodeBlock>

</TabItem>
<TabItem value="main.ts" label="main.ts">

```typescript
import { Actor, ApifyClient, log } from 'apify';

interface Input {
    parallelRunsCount: number;
    targetActorId: string;
    targetActorInput: Record<string, any>;
    targetActorRunOptions: Record<string, any>;
}

await Actor.init();

const {
    parallelRunsCount= 1,
    targetActorId,
    targetActorInput = {},
    targetActorRunOptions = {},
} = await Actor.getInput<Input>() ?? {} as Input;
const apifyClient = new ApifyClient();

if (!targetActorId) throw new Error('Missing the "targetActorId" input!');
```

</TabItem>
</Tabs>

### Re-using dataset and request queue

The master Actor will re-use the default dataset and request queue. The dataset will store the results of the scraping process, and the request queue will be used as shared storage for processing requests.

```typescript
import { Actor } from 'apify';

const requestQueue = await Actor.openRequestQueue();
const dataset = await Actor.openDataset();
```


### State

The Actor will keep track of the state of the scraping runs. It will store Actor runs in the state by the first run.
The state will ensure, that after migration or ressurection, the Actor will continue with the same runs again.

```typescript
import { Actor, ApifyClient, log } from 'apify';

const apifyClient = new ApifyClient();
const state = await Actor.useState<State>('actor-state', { parallelRunIds: [], isInitialized: false });

if (state.isInitialized) {
    for (const runId of state.parallelRunIds) {
        const runClient = apifyClient.run(runId);
        const run = await runClient.get();

        // This should happen only if the run was deleted or the state was incorectly saved.
        if (!run) throw new Error(`The run ${runId} from state does not exists.`);

        if (run.status === 'RUNNING') {
            log.info('Parallel run is already running.', { runId });
        } else {
            log.info(`Parallel run was in state ${run.status}, resurrecting.`, { runId });
            await runClient.resurrect(targetActorRunOptions);
        }
    }
} else {
    for (let i = 0; i < parallelRunsCount; i++) {
        const run = await Actor.start(targetActorId, {
            ...targetActorInput,
            datasetId: dataset.id,
            requestQueueId: requestQueue.id,
        }, targetActorRunOptions);
        log.info(`Started parallel run with ID: ${run.id}`, { runId: run.id });
        state.parallelRunIds.push(run.id);
    }
    state.isInitialized = true;
}
```

Once Actor is initialized, it will start the parallel runs and waits until finishes, using `Promise.all()`.
By register the aborting event we can stop the parallel runs if the master Actor is stopped.

The final code of the master Actor will look like this:

<Tabs groupId="main">
<TabItem value="input_schema.json" label="input_schema.json">
<CodeBlock language="json">{MasterActorInputSchemaJson}</CodeBlock>
</TabItem>
<TabItem value="main.ts" label="main.ts">
<CodeBlock language="typescript">{MasterActorMainTs}</CodeBlock>
</TabItem>
</Tabs>

> You can check [full code example](TODO).

## Scraper Actor

The scraper Actor will scrape the website. It will use the request queue and dataset created by the master Actor.
You need to replace this Actor with scraper of your choice. The important part is to use the request queue and dataset created by the master Actor.
To use the request queue and dataset, you need to open these storages based on the Actor input.

```typescript
import { Actor } from 'apify';

interface Input {
    requestQueueId: string;
    datasetId: string;
}

const {
    requestQueueId,
    datasetId,
} = await Actor.getInput<Input>() ?? {} as Input;

const requestQueue = await Actor.openRequestQueue(requestQueueId);
const dataset = await Actor.openDataset(datasetId);
```

Once you initialized the request queue and dataset, you can start scraping the website.
In this example, we will use the CheerioCrawler to scrape the https://warehouse-theme-metal.myshopify.com/.

<Tabs groupId="main">
<TabItem value="input_schema.json" label="input_schema.json">
<CodeBlock language="json">{ScraperActorInputSchemaJson}</CodeBlock>
</TabItem>
<TabItem value="main.ts" label="main.ts">
<CodeBlock language="typescript">{ScraperActorMainTs}</CodeBlock>
</TabItem>
</Tabs>

> You can check [full code example](TODO).

## Summary






