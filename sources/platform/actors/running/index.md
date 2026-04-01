---
title: Run and manage
description: Start an Actor from Apify Console or via API. Learn about Actor lifecycles, how to specify settings and version, provide input, and resurrect finished runs.
sidebar_position: 1
slug: /actors/running
---

This section covers running, scheduling, monitoring, and managing Actors on the Apify platform.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip New to Apify?
For a step-by-step walkthrough of running your first Actor, see [Choose and run an Actor](/platform/get-started/choose-and-run-actor).
:::

## Run Actors with the Apify API

To invoke Actors with the Apify API, send an HTTP POST request to the [Run Actor](/api/v2/act-runs-post) endpoint. For example:

```text
https://api.apify.com/v2/acts/compass~crawler-google-places/runs?token=<YOUR_API_TOKEN>
```

An Actor's input and its content type can be passed as a payload of the POST request, and additional options can be specified using URL query parameters. To learn more, see [Run an Actor and retrieve data via API](/academy/api/run-actor-and-retrieve-data-via-api).

## Run Actors programmatically

You can also invoke Actors programmatically from your own applications or from other Actors.

To start an Actor from your own application, we recommend using Apify API client libraries for [JavaScript](/api/client/js/reference/class/ActorClient#call) or [Python](/api/client/python/reference/class/ActorClient#call).

<Tabs groupId="main">

<TabItem value="JavaScript" label="JavaScript">

```javascript
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({
    token: 'MY-API-TOKEN',
});

// Start the Google Maps Scraper Actor and wait for it to finish.
const actorRun = await client.actor('compass/crawler-google-places').call({
    queries: 'apify',
});
// Fetch scraped results from the Actor's dataset.
const { items } = await client.dataset(actorRun.defaultDatasetId).listItems();
console.dir(items);
```

</TabItem>


<TabItem value="Python" label="Python">

```python
from apify_client import ApifyClient


apify_client = ApifyClient('MY-API-TOKEN')

# Start the Google Maps Scraper Actor and wait for it to finish.
actor_run = apify_client.actor('compass/crawler-google-places').call(
    run_input={ 'queries': 'apify' }
)

# Fetch scraped results from the Actor's dataset.
dataset_items = apify_client.dataset(actor_run['defaultDatasetId']).list_items().items
print(dataset_items)
```

</TabItem>

</Tabs>

The newly started Actor runs under the account associated with the provided `token`, so all consumed resources are charged to this user account.

Internally, the `call()` function invokes the [Run Actor](/api/v2/act-runs-post) API endpoint, waits for the Actor to finish, and reads its output using the [Get dataset items](/api/v2/dataset-items-get) API endpoint.
