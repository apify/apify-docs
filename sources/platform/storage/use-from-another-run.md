---
title: Use storage from another run
sidebar_label: Use from another run
description: Open a dataset, key-value store, or request queue that belongs to another Actor or task run by its name or ID, from the SDK, API clients, or the API.
sidebar_position: 9.6
slug: /storage/use-from-another-run
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

If you have the storage's _name_ or _ID_, you can access it from any [Actor](../actors/index.mdx) or [task](../actors/running/tasks.md) run. Use the same methods and endpoints you'd use for the current run's storages.

[Datasets](./dataset/index.md) and [key-value stores](./key_value_store/index.md) support concurrent use. Multiple Actors or tasks can write to the same dataset or key-value store, and multiple runs can read from them at the same time.

[Request queues](./request_queue.md) only allow multiple runs to add new data. A request queue can be processed by one Actor or task run at a time.

:::note Concurrent write order

When multiple runs use the same storage at the same time, the order in which their operations are processed is not guaranteed. For example, if a delete of a key-value store record is processed before a read of the same record, the read fails.

:::

:::info Accessing restricted storage resources between runs

If a storage resource access is set to **Restricted**, the run from which it's accessed must have explicit access to it. Learn how restricted access works in [General resource access](/account/collaboration/general-resource-access), and how to grant it in [Share storage](./share.md).

:::

## Open a storage with the SDK

Open the storage with the same method you would use for the current run's storage, and pass the name or ID of the one you want.

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

Only the method name changes with the storage type:

| Storage type    | [JavaScript SDK](/sdk/js)   | [Python SDK](/sdk/python)      |
| --------------- | --------------------------- | ------------------------------ |
| Dataset         | `Actor.openDataset()`       | `Actor.open_dataset()`         |
| Key-value store | `Actor.openKeyValueStore()` | `Actor.open_key_value_store()` |
| Request queue   | `Actor.openRequestQueue()`  | `Actor.open_request_queue()`   |

## Open a storage with an API client

Construct the storage's client with the name or ID of the storage you want. To use a storage owned by another user, prefix the name with their username, as in `jane-doe/old-dataset`. Then read and write exactly as you would with the current run's storage.

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

Only the accessor changes with the storage type:

| Storage type    | JavaScript client                                                                   | Python client                                                                              |
| --------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Dataset         | [`apifyClient.dataset()`](/api/client/js/reference/class/DatasetClient)             | [`apify_client.dataset()`](/api/client/python/reference/class/DatasetClient)               |
| Key-value store | [`apifyClient.keyValueStore()`](/api/client/js/reference/class/KeyValueStoreClient) | [`apify_client.key_value_store()`](/api/client/python/reference/class/KeyValueStoreClient) |
| Request queue   | [`apifyClient.requestQueue()`](/api/client/js/reference/class/RequestQueueClient)   | [`apify_client.request_queue()`](/api/client/python/reference/class/RequestQueueClient)    |

## Use the Apify API

Send requests to the same endpoints you would use for the current run's storages, passing the name or ID of the storage you want. See the endpoint reference for [datasets](./dataset/index.md#apify-api), [key-value stores](./key_value_store/index.md#apify-api), and [request queues](./request_queue.md#apify-api).
