---
title: Key-value store
description: Store anything from actor or task run results JSON documents or images. Learn how to access and manage key-value stores from Apify Console or via API.
sidebar_position: 9.2
slug: /storage/key-value-store
---

# Key-value store

**Store anything from actor or task run results JSON documents or images. Learn how to access and manage key-value stores from Apify Console or via API.**

---

The key-value store is simple storage that can be used for storing any kind of data. It can be JSON or HTML documents, zip files, images, or simply strings. The data are stored along with their [MIME content type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types).

Each actor run is assigned its own key-value store when it is created. The store contains the actor's input, and, if necessary, other data such as its output.

Key-value stores are mutable–you can both add entries and delete them.

> Named key-value stores are retained indefinitely. <br/>
> Unnamed key-value stores expire after 7 days unless otherwise specified.<br/>
> [Learn about named and unnamed key-value stores.](./index.md)

## Basic usage

There are five ways to access your key-value stores:

* [Apify Console](https://console.apify.com/storage?tab=keyValueStores) - provides an easy-to-understand interface [[details](#apify-console)].
* [Apify SDK](/sdk/js/docs/guides/result-storage#key-value-store) - when building your own Apify actor [[details](#apify-sdk)].
* [JavaScript API client](/api/client/js/reference/class/KeyValueStoreClient) - to access your key-value stores from any Node.js application [[details](#javascript-api-client)].
* [Python API client](/api/client/python/reference/class/KeyValueStoreClient) - to access your key-value stores from any Python application [[details](#python-api-client)].
* [Apify API](/api/v2#/reference/key-value-stores/get-items) - for accessing your key-value stores programmatically [[details](#apify-api)].

### Apify Console

In [Apify Console](https://console.apify.com), you can view your key-value stores in the [Storage](https://console.apify.com/storage) section under the [Key-value stores](https://console.apify.com/storage?tab=keyValueStores) tab.

Only named key-value stores are displayed by default. Select the **Include unnamed key-value stores** checkbox to display all of your stores.

![Key-value stores in app](./images/key-value-stores-app.png)

To view a key-value store's content, click on its **Store ID**.
Under the **Settings** tab, you can update the store's name (and, in turn, its [retention period](./index.md)) and [access rights](../access_rights/index.md).
Click on the `API` button to view and test a store's [API endpoints](/api/v2#/reference/key-value-stores).

![Key-value stores detail](./images/key-value-stores-detail.png)

### Apify SDK

If you are building an [Apify actor](../actors/index.md), you will be using the [Apify SDK](/sdk/js).
In the [Apify SDK](/sdk/js/docs/guides/result-storage#key-value-store), the key-value store is represented by the [`KeyValueStore`](/sdk/js/api/apify/class/KeyValueStore) class.

You can use the `KeyValueStore` class to specify whether your data is stored locally or in the Apify cloud,
get and set values using the [`getValue()`](/sdk/js/api/apify/class/KeyValueStore#getValue) and [`setValue()`](/sdk/js/api/apify/class/KeyValueStore#setValue) methods respectively, or iterate over your key-value store keys using the [`forEachKey()`](/sdk/js/api/apify/class/KeyValueStore#forEachKey) method.

Each actor run is associated with the default key-value store, which is created for the actor run. When running your actors and storing data locally, you can pass its [input](../actors/running/input.md) using the **INPUT.json** file in the default key-value store directory.

You can find `INPUT.json` and other key-value store files in the location below.

```text
{APIFY_LOCAL_STORAGE_DIR}/key_value_stores/{STORE_ID}/{KEY}.{EXT}
```

The default key-value store's ID is **default**. The {KEY} is the record's **key** and {EXT} corresponds to the record value's MIME content type.

To manage your key-value stores, you can use the following methods. See the `KeyValueStore` class's [API reference](/sdk/js/api/apify/class/KeyValueStore) for the full list.

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

> Note that JSON is automatically parsed to a JavaScript object, text data returned as a string and other data is returned as binary buffer.

```js
import { Actor } from 'apify';

await Actor.init();
// ...

// Get input of your actor
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

The `Actor.getInput()` method is not only a shortcut to `Actor.getValue('INPUT')` - it is also compatible with `Actor.metamorph()` [[docs](../actors/development/source_code.md#metamorph)]. This is because a metamorphed actor run's input is stored in the **INPUT-METAMORPH-1** key instead of **INPUT**, which hosts the original input.

See the [SDK documentation](/sdk/js/docs/guides/result-storage#key-value-store) and the `KeyValueStore` class's [API reference](/sdk/js/api/apify/class/KeyValueStore) for details on managing your key-value stores with the Apify SDK.

### JavaScript API client

Apify's [JavaScript API client](/api/client/js/reference/class/KeyValueStoreClient) (`apify-client`) allows you to access your key-value stores from any Node.js application, whether it is running on the Apify platform or elsewhere.

After importing and initiating the client, you can save each key-value store to a variable for easier access.

```js
const myKeyValStoreClient = apifyClient.keyValueStore('jane-doe/my-key-val-store');
```

You can then use that variable to [access the key-value store's items and manage it](/api/client/js/reference/class/KeyValueStoreClient).

See the [JavaScript API client documentation](/api/client/js/reference/class/KeyValueStoreClient) for [help with setup](/api/client/js/docs) and more details.

### Python API client

Apify's [Python API client](/api/client/python/reference/class/KeyValueStoreClient) (`apify-client`) allows you to access your key-value stores from any Python application, whether it is running on the Apify platform or elsewhere.

After importing and initiating the client, you can save each key-value store to a variable for easier access.

```python
my_key_val_store_client = apify_client.key_value_store('jane-doe/my-key-val-store')
```

You can then use that variable to [access the key-value store's items and manage it](/api/client/python/reference/class/KeyValueStoreClient).

See the [Python API client documentation](/api/client/python/reference/class/KeyValueStoreClient) for [help with setup](/api/client/python/docs/quick-start) and more details.

### Apify API

The [Apify API](/api/v2#/reference/key-value-stores) allows you to access your key-value stores programmatically using [HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) and easily share your crawling results.

If you are accessing your datasets using the **username~store-name** [store ID format](./index.md), you will need to use your [secret API token](../integrations/index.md#api-token). You can find the token (and your user ID) on the [Integrations](https://console.apify.com/account#/integrations) page of your Apify account.

> When providing your API authentication token, we recommend using the request's `Authorization` header, rather than the URL. ([More info](#introduction/authentication)).

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

**If you use the [Apify SDK](/sdk/js/api/apify/class/KeyValueStore#setValue) or our [JavaScript API client](/api/client/js/reference/class/KeyValueStoreClient#setRecord), your files are compressed automatically by default.** We recommend using the JavaScript API client, which compresses your data before they are sent to our servers and decompresses them when you retrieve them. This makes your storage costs as low as possible.

## Sharing

You can invite other Apify users to view or modify your key-value stores using the [access rights](../access_rights/index.md) system. See the [full list of permissions](../access_rights/list_of_permissions.md).

### Sharing key-value stores between runs

You can access a key-value store from any [actor](../actors/index.md) or [task](../actors/tasks.md) run as long as you know its **name** or **ID**.

To access a key-value store from another run using the Apify SDK, open it using the [`Actor.openKeyValueStore(storeIdOrName)`](/sdk/js/api/apify/class/Actor#openKeyValueStore) method like you would do with any other store.

```js
const otherStore = await Actor.openKeyValueStore('old-store');
```

In the [JavaScript API client](/api/client/js), you can access a store using [its client](/api/client/js/reference/class/KeyValueStoreClient). Once you've opened a store, read and manage its contents like you would do with a key-value store from your current run.

```js
const otherStoreClient = apifyClient.keyValueStore('jane-doe/old-store');
```

Likewise, in the [Python API client](/api/client/python), you can access a store using [its client](/api/client/python/reference/class/KeyValueStoreClient).

```python
other_store_client = apify_client.key_value_store('jane-doe/old-store')
```

The same applies for the [Apify API](#apify-api) - you can use [the same endpoints](#apify-api) as you would normally do.

See the [Storage overview](/platform/storage#sharing-storages-between-runs) for details on sharing storages between runs.

## Data consistency

Key-value storage uses the [AWS S3](https://aws.amazon.com/s3/) service. According to the [S3 documentation](https://aws.amazon.com/s3/consistency/), it provides **strong read-after-write** consistency.

## Limits

* Key-value store names can be up to 63 characters long.
