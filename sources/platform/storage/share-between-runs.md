---
title: Share storage between runs
sidebar_label: Share between runs
description: Access a dataset, key-value store, or request queue from another Actor or task run using its name or ID, with the Apify SDK, API clients, or the API.
sidebar_position: 9.6
slug: /storage/share-between-runs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Storage can be accessed from any [Actor](../actors/index.mdx) or [task](../actors/running/tasks.md) run, provided you have its _name_ or _ID_. Use the same methods and endpoints you'd use for the current run's storages.

[Datasets](./dataset/index.md) and [key-value stores](./key_value_store/index.md) support concurrent use. Multiple Actors or tasks can write to the same dataset or key-value store, and multiple runs can read from them at the same time.

[Request queues](./request_queue.md), on the other hand, only allow multiple runs to add new data. A request queue can only be processed by one Actor or task run at any one time.

:::note Concurrent write order

When multiple runs write to a storage simultaneously, the order of writes is not guaranteed. Data is written as each request is processed. The same applies in key-value stores and request queues: if a delete request precedes a read request for the same record, the read request fails.

:::

:::info Accessing restricted storage resources between runs

If a storage resource access is set to **Restricted**, the run from which it's accessed must have explicit access to it. Learn how restricted access works in [General resource access](/account/collaboration/general-resource-access).

:::

## Datasets

To access a dataset from another run using the [Apify SDK](/sdk), open it using the same method as you would with any other dataset.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();

const otherDataset = await Actor.openDataset('old-dataset');
// ...

await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        other_dataset = await Actor.open_dataset(name='old-dataset')
        # ...
```

</TabItem>
</Tabs>

In the [JavaScript API client](/api/client/js/reference/class/DatasetClient) as well as in [Python API client](/api/client/python/reference/class/DatasetClient), you can access a dataset using its client. Once you've opened the dataset, you can read its contents and add new data in the same manner as you would for a dataset from your current run.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
const otherDatasetClient = apifyClient.dataset('jane-doe/old-dataset');
```

</TabItem>
<TabItem value="Python" label="Python">

```python
other_dataset_client = apify_client.dataset('jane-doe/old-dataset')
```

</TabItem>
</Tabs>

The same applies for the [Apify API](/storage/dataset#apify-api) - you can use the same endpoints as you would normally do.

## Key-value stores

To access a key-value store from another run using the [Apify SDK](/sdk), open it using the same method as you would do with any other store.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();

const otherStore = await Actor.openKeyValueStore('old-store');
// ...

await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        other_store = await Actor.open_key_value_store(name='old-store')
        # ...
```

</TabItem>
</Tabs>

In the [JavaScript API client](/api/client/js/reference/class/KeyValueStoreClient) as well as in [Python API client](/api/client/python/reference/class/KeyValueStoreClient), you can access a store using its client. Once you've opened a store, read and manage its contents like you would do with a key-value store from your current run.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
const otherStoreClient = apifyClient.keyValueStore('jane-doe/old-store');
```

</TabItem>
<TabItem value="Python" label="Python">

```python
other_store_client = apify_client.key_value_store('jane-doe/old-store')
```

</TabItem>
</Tabs>

The same applies for the [Apify API](/storage/key-value-store#apify-api) - you can use the same endpoints as you would normally do.

## Request queues

To access a request queue from another run using the [Apify SDK](/sdk), open it using the same method as you would do with any other request queue.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();

const otherQueue = await Actor.openRequestQueue('old-queue');
// ...

await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        other_queue = await Actor.open_request_queue(name='old-queue')
        # ...
```

</TabItem>
</Tabs>

In the [JavaScript API client](/api/client/js/reference/class/RequestQueueClient) as well as in [Python API client](/api/client/python/reference/class/RequestQueueClient), you can access a request queue using its respective client. Once you've opened the request queue, you can use it in your crawler or add new requests like you would do with a queue from your current run.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
const otherQueueClient = apifyClient.requestQueue('jane-doe/old-queue');
```

</TabItem>
<TabItem value="Python" label="Python">

```python
other_queue_client = apify_client.request_queue('jane-doe/old-queue')
```

</TabItem>
</Tabs>

The same applies for the [Apify API](/storage/request-queue#apify-api) - you can use the same endpoints as you would normally do.
