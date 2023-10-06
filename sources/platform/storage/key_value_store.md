---
title: Key-value store
description: Store anything from Actor or task run results, JSON documents, or images. Learn how to access and manage key-value stores from Apify Console or via API.
sidebar_position: 9.2
slug: /storage/key-value-store
---

# Key-value store

**Apify's Key-Value storage is a multi-utility storage system to store Actor or task run results, JSON documents, or images etc.**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Every time, when an actor runs, it is assigned its own key-value store. The store contains the Actor's input, and, if necessary, other data such as its output.

Key-value stores are mutable in nature. You can add and delete the store entries.

## Basic usage

There are four ways to access your key-value stores:

1. [Apify Console](https://console.apify.com/storage?tab=keyValueStores) - provides an easy-to-understand interface.
2. [JavaScript](/sdk/js/docs/guides/result-storage#key-value-store) and [Python](sdk/python/docs/concepts/storages#working-with-key-value-stores) SDK - when building your own JavaScript or Python Actor.
3. [JavaScript](/api/client/js/reference/class/KeyValueStoreClient) and [Python](/api/client/python/reference/class/KeyValueStoreClient) API client - to access your key-value stores from any Node.js  or Python application.
4. [Apify API](/api/v2#/reference/key-value-stores/get-items) - for accessing your key-value stores programmatically.

### Apify Console

In [Apify Console](https://console.apify.com), you can view your key-value stores in the [Storage](https://console.apify.com/storage) section under the [Key-value stores](https://console.apify.com/storage?tab=keyValueStores) tab.

Only named key-value stores are displayed by default. Select the **Include unnamed key-value stores** checkbox to display all of your stores.

![Key-value stores in app](./images/key-value-stores-app.png)

To view a key-value store's content, click on its **Store ID**.

![Key-value stores detail](./images/key-value-stores-detail.png)

Under the **Settings** tab, you can update the store's name (and, in turn, its [retention period](./index.md)) and [access rights](../collaboration/index.md).
Click on the `API` button to view and test a store's [API endpoints](/api/v2#/reference/key-value-stores).

### JavaScript and Python SDK

Apify's Javascript and Python SDK for accessing Key-value store contain a `KeyValueStore` class. Other useful method like `getValue()`, `setValue()` and `forEachKey()` is defined on the `KeyValueStore` class.

`getValue()` (or `get_value()` in python) method is used to get value from a key. Similarly, `setValue()` (or `set_value()` in python) is useful to add new value or update an existing one in the KV store.

`forEachKey()` method is useful to iterate over your KV store keys.

You can lern more by reading the [Javascript](/sdk/js/reference/class/KeyValueStore) and [Python](/sdk/python/reference/class/KeyValueStore) reference for all the methods defined in the `KeyValueStore` class 

When running your Actors and storing data locally, you can pass its [input](../actors/running/input_and_output.md) using the **INPUT.json** file in the default key-value store directory. You can find **INPUT.json** and other key-value store files in the location below.

```text
{APIFY_LOCAL_STORAGE_DIR}/key_value_stores/{STORE_ID}/{KEY}.{EXT}
```

The default key-value store's ID is **default**. The `{KEY}` is the record's **key** and `{EXT}` corresponds to the record value's MIME content type.

To manage your key-value stores, you can use the following methods.

<Tabs>
<TabItem value="js" label="Javascript">

```js
import { Actor } from 'apify';

await Actor.init();
// ...

// Get the default input
const input = await Actor.getInput();

// Open a named key-value store
const exampleStore = await Actor.openKeyValueStore('my-store');

// Read a record in the exampleStore storage
const value = await exampleStore.getValue('some-key');

// Write a record to exampleStore
await exampleStore.setValue('some-key', { foo: 'bar' });

// Delete a record from exampleStore
await exampleStore.setValue('some-key', null);

// ...
await Actor.exit();
```

</TabItem>
<TabItem value="py" label="Python">

```python
from apify import Actor
from apify.storages import KeyValueStore

async def main():
    async with Actor:
        # Open a named key-value store
        example_store: KeyValueStore = await Actor.open_key_value_store(name='my-store')

        # Read a record in the example_store storage
        value = await example_store.get_value('some-key')

        # Write a record to example_store
        await example_store.set_value('some-key', {'foo': 'bar'})

        # Delete a record from example_store
        await example_store.set_value('some-key', None)
```

</TabItem>
</Tabs>

JSON is automatically parsed to a JavaScript object or a Python dictionary, text data is returned as a string and other data is returned as binary buffer. Let's see and example.

<Tabs>
<TabItem value="js" label="Javascript">

```js
import { Actor } from 'apify';

await Actor.init();
// ...

// Get input of your Actor
const input = await Actor.getInput();
const value = await Actor.getValue('my-key');

// ...
await Actor.setValue(
    'OUTPUT',
    imageBuffer,
    { contentType: 'image/jpeg' },
);

// ...
await Actor.exit();
```

</TabItem>
<TabItem value="py" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        value = await Actor.get_value('my-key')
        # ...
        image_buffer = ...  # Get image data
        await Actor.set_value(key='OUTPUT', value=image_buffer, content_type='image/jpeg')
```

</TabItem>
</Tabs>


The `Actor.getInput()` method is not only a shortcut to `Actor.getValue('INPUT')`; it is also compatible with `Actor.metamorph()` [docs](../actors/development/programming_interface/metamorph.md). This is because a metamorphed Actor run's input is stored in the **INPUT-METAMORPH-1** key instead of **INPUT**, which hosts the original input.

Apify also provide a nodejs library called [Crawlee](https://crawlee.dev/) to build your own web scraping and automation solutions. See [Crawlee documentation](https://crawlee.dev/docs/quick-start) for setup instruction. Follow this guide to learn how to build your own crawlers and run them on the [Apify platform](https://crawlee.dev/docs/guides/apify-platform).

### JavaScript and Python API client

Apify's [JavaScript](/api/client/js/reference/class/KeyValueStoreClient) and [Python](/api/client/python/reference/class/KeyValueStoreClient) API client allows you to access your key-value stores from any Node.js and Python application, whether it is running on the Apify platform or elsewhere.

After importing and initiating the client, you can save each key-value store to a variable for easier access.

<Tabs>
<TabItem value="js" label="Javascript">

```js
const myKeyValStoreClient = apifyClient.keyValueStore('jane-doe/my-key-val-store');
```

</TabItem>
<TabItem value="py" label="Python">

```python
my_key_val_store_client = apify_client.key_value_store('jane-doe/my-key-val-store')
```

</TabItem>
</Tabs>

You can then use this `myKeyValStoreClient` variable to access the key-value store's items and manage it programmetically.

### Apify API

The [Apify API](/api/v2#/reference/key-value-stores) allows you to access your key-value stores programmatically using [HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).

To access your Key Value stoere, you need to have an API token. You can find the token (and your user ID) on the [Integrations](https://console.apify.com/account#/integrations) page of your Apify account. The preferred way to send the API token with your API request, is to use the request's `Authorization` header.

To **get a list of your key-value stores**, send a GET request to the [Get list of key-value stores](/api/v2#/reference/key-value-stores/store-collection/get-list-of-key-value-stores) endpoint.

```text
https://api.apify.com/v2/key-value-stores
```

To **get information about a key-value store** such as its creation time and item count, send a GET request to the [Get store](/api/v2#/reference/key-value-stores/store-object/get-store) endpoint.

```text
https://api.apify.com/v2/key-value-stores/{STORE_ID}
```

To **get a record** (its value) from a key-value store, send a GET request to the [Get record](/api/v2#/reference/key-value-stores/key-collection/get-record) endpoint.

```text
https://api.apify.com/v2/key-value-stores/{STORE_ID}/records/{KEY_ID}
```

To **add a record** with a specific key in a key-value store, send a PUT request to the [Put record](/api/v2#/reference/key-value-stores/record/put-record) endpoint.

```text
https://api.apify.com/v2/key-value-stores/{STORE_ID}/records/{KEY_ID}
```

Example payload:

```json
{
    "foo": "bar",
    "fos": "baz"
}
```

To **delete a record**, send a DELETE request specifying the key from a key-value store to the [Delete record](/api/v2#/reference/key-value-stores/record/delete-record) endpoint.

```text
https://api.apify.com/v2/key-value-stores/{STORE_ID}/records/{KEY_ID}
```

See the [API documentation](/api/v2#/reference/key-value-stores) for a detailed breakdown of each API endpoint.

## Compression

In the past, every record uploaded using the [Put record](/api/v2#/reference/key-value-stores/record/put-record) endpoint was compressed using Gzip before uploading. This has changed. **Now, records are stored in the state you upload them. This means it is up to you if the record is stored compressed or uncompressed.**

You can compress a record and use the [Content-Encoding request header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding) to let our platform know which compression it uses. We recommend compressing large key-value records to save storage space and network traffic.

**If you use the [JavaScript SDK](/sdk/js/reference/class/KeyValueStore#setValue) or our [JavaScript API client](/api/client/js/reference/class/KeyValueStoreClient#setRecord), your files are compressed automatically by default.** We recommend using the JavaScript API client, which compresses your data before they are sent to our servers and decompresses them when you retrieve them. This makes your storage costs as low as possible.

## Sharing

You can invite other Apify users to view or modify your key-value stores with the [access rights](../collaboration/index.md) system. See the [full list of permissions](../collaboration/list_of_permissions.md).

>Note: Key-value stores can be used concurrently by multiple Actors. This means that multiple Actors or tasks running at the same time can **write** data to a single dataset or key-value store. The same applies for reading data – multiple runs can **read** data from datasets and key-value stores concurrently.

### Sharing key-value stores between runs

You can access a key-value store from any [Actor](../actors/index.mdx) or [task](../actors/running/tasks.md) run as long as you know its **name** or **ID**.

To access a key-value store from another run using the [JavaScript SDK](/sdk/js) or the [Python SDK](/sdk/python), open it using the same method as you would do with any other store.

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

You can also access a store using the [Javascript](/api/client/js/reference/class/KeyValueStoreClient) and [Python](/api/client/python/reference/class/KeyValueStoreClient) API client. Once you've opened a store, read and manage its contents like you would do with a key-value store from your current run.

<Tabs>
<TabItem value="js" label="Javascript">

```js
const otherStoreClient = apifyClient.keyValueStore('jane-doe/old-store');
```

</TabItem>
<TabItem value="py" label="Python">

```python
other_store_client = apify_client.key_value_store('jane-doe/old-store')
```

</TabItem>
</Tabs>


The same applies for the [Apify API](#apify-api) - you can use [the same endpoints](#apify-api) as you would normally do.

See the [Storage overview](/platform/storage#sharing-storages-between-runs) for details on sharing storages between runs.

## Data consistency

Key-value storage uses the [AWS S3](https://aws.amazon.com/s3/) service. According to the [S3 documentation](https://aws.amazon.com/s3/consistency/), it provides **strong read-after-write** consistency.

## Limits

Key-value store names can be up to 63 characters long.

## Data retention {#data-retention}

| KV Type          | Retention Period |
| ---------------- | ---------------- |
| Named KV store   | indefinitely     |
| Unnamed KV store | 7 Days           |

Follow [this link](./index.md#named-and-unnamed-storages) to learn more about Named and Unnamed Datasets.

## Deleting Key-value Store {#delete-kv-store}

Named Key-value store can be deleted using Apify's console, SDKs, API clients or simple HTTP API requests. There are four ways to delete a Key-value store. Let's discuss them in brief.

-  Apify's console: To Delete a key-value store through [Apify's console](https://console.apify.com/storage), use the Action button in the stoage's detail page.
- Apify's SDK: Use the `.drop()` method in the `KeyValueStore` class of Apify's [Javascript](/sdk/js) and [Python](/sdk/python) SDKs.
- Apify's API client: Use the `.delete()` method in the KeyValueStore of Apify's [Javascript](/api/client/js/reference/class/KeyValueStoreClient) and [Python](/api/client/python/reference/class/KeyValueStoreClient) API client.
- Apify's REST API: Use [Delete Key value store](/api/v2#/reference/key-value-stores/store-object/delete-store) endpoint.