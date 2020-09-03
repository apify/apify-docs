---
title: Key-value store
description: Store anything from actor or task run results JSON documents or images. Learn how to access and manage key-value stores from the Apify app or via API.
menuWeight: 6.2
paths:
    - storage/key-value-store
---

# [](#key-value-store) Key-value store

The key-value store is simple storage that can be used for storing any kind of data. It can be JSON or HTML documents, zip files, images, or simply strings. The data are stored along with their [MIME content type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types).

Each actor run is assigned its own key-value store when it is created. The store contains the actor's input, and, if necessary, other stores such as its output.

Key-value stores are mutable–you can both add entries and delete them.

> Named key-value stores are retained indefinitely. <br/>
> Unnamed key-value stores expire after 7 days unless otherwise specified.<br/>
> [Learn about named and unnamed key-value stores.]({{@link storage.md#named-and-unnamed-storages}})

## [](#basic-usage) Basic usage

There are four ways to access your key-value stores:

* [Apify app](https://my.apify.com/storage#/keyValueStores) - provides an easy-to-understand interface [[details](#apify-app)].
* [Apify software development kit (SDK)](https://sdk.apify.com/docs/guides/data-storage#key-value-store) - when building your own Apify actor [[details](#apify-sdk)].
* [JavaScript API client](https://docs.apify.com/apify-client-js#ApifyClient-keyValueStores) - to access your key-value stores from any Node.js application [[details](#javascript-api-client)].
* [Apify API](https://docs.apify.com/api/v2#/reference/key-value-stores/get-items) - for accessing your key-value stores programmatically [[details](#apify-api)].

### [](#apify-app) Apify app

In the [Apify app](https://my.apify.com), you can view your key-value stores in the [Storage](https://my.apify.com/storage) section under the [Key-value stores](https://my.apify.com/storage#/keyValueStores) tab.

Only named key-value stores are displayed by default. Select the **Include unnamed key-value stores** checkbox to display all of your stores.

![Key-value stores in app]({{@asset storage/images/key-value-stores-app.png}})

To view a key-value store's content, click on its **Store ID**, then click on a store's **View** button.
In the detail page, under the **Settings** tab, you can update the store's name (and, in turn, its [retention period]({{@link storage.md#data-retention}})) and
[access rights]({{@link access_rights.md}}).
The API tab allows you to view and test a store's [API endpoints](https://docs.apify.com/api/v2#/reference/key-value-stores).

![Key-value stores detail]({{@asset storage/images/key-value-stores-detail.png}})

### [](#apify-sdk) Apify SDK

If you are building an [Apify actor]({{@link actors.md}}), you will be using the [Apify software development kit (SDK)](https://sdk.apify.com).
In the [Apify SDK](https://sdk.apify.com/docs/guides/data-storage#key-value-store), the key-value store is represented by the
[`KeyValueStore`](hhttps://sdk.apify.com/docs/api/key-value-store) class.

You can use the `KeyValueStore` class to specify whether your data is [stored locally or in the Apify cloud](https://sdk.apify.com/docs/api/key-value-store),
[get](https://sdk.apify.com/docs/api/key-value-store#keyvaluestoregetvaluekey) and
[set](https://sdk.apify.com/docs/api/key-value-store#keyvaluestoresetvaluekey-value-options)
values using the `Apify.getValue()` and `Apify.setValue()` methods or [iterate over your key-value store keys](https://sdk.apify.com/docs/api/key-value-store#keyvaluestoreforeachkeyiteratee-options) using the `forEachKey()` method.

Each actor run is associated with the default key-value store, which is created for the actor run. When running your actors and storing data locally, you can pass its [input]({{@link actors/running/input.md}}) using the **INPUT.json** key-value store.

You can find INPUT.json and other key-value stores in the location below.

    {APIFY_LOCAL_STORAGE_DIR}/key_value_stores/{STORE_ID}/{KEY}.{EXT}

The default key-value store's ID is **default**\. The {KEY} is the record's **key** and {EXT} corresponds to the data value's MIME content type.

To manage your key-value stores, you can use the following methods. For a full list of methods, see the `KeyValueStore` class's [API reference](https://sdk.apify.com/docs/api/key-value-store#keyvaluestoregetvaluekey).

```js
// Get the default input
const input = await Apify.getInput();

// Open a named key-value store
const exampleStore = await Apify.openKeyValueStore("my-store");

// Read a record in the exampleStore storage
const value = await exampleStore.getValue("some-key");

// Write a record to exampleStore
await exampleStore.setValue("some-key", { foo: "bar" });

// Delete a record in exampleStore
await exampleStore.setValue("some-key", null);
```

> Note that JSON is automatically parsed to a JavaScript object, text data returned as a string and other data is returned as binary buffer.

```js
const Apify = require("apify");

// The optional Apify.main() function performs the
// actor's job and terminates the process when it is finished
Apify.main(async () => {
    // Get input of your actor
    const input = await Apify.getInput();
    const value = await Apify.getValue("my-key");

    ...

    await Apify.setValue(
        "OUTPUT",
        imageBuffer,
        { contentType: "image/jpeg" }
    );
});
```

The `Apify.getInput()`method is not only a shortcut to `Apify.getValue("INPUT")`- it is also compatible with `Apify.metamorph()` [[docs](https://docs.apify.com/actors/source-code#metamorph)]. This is because a metamorphed actor run's input is stored in the **INPUT-METAMORPH-1** key instead of **INPUT**, which hosts the original input.

For more information on managing your key-value stores with the Apify SDK, see the SDK [documentation](https://sdk.apify.com/docs/guides/data-storage#key-value-store) and the `KeyValueStore` class's [API reference](https://sdk.apify.com/docs/api/key-value-store#keyvaluestoregetvaluekey).

### [](#javascript-api-client) JavaScript API client

Apify's [JavaScript API client](https://docs.apify.com/apify-client-js#ApifyClient-keyValueStores) (`apify-client`) allows you to access your key-value stores from any Node.js application, whether it is running on the Apify platform or elsewhere.

For help with setting up the client, see the JavaScript API client section on the [overview page](https://docs.apify.com/storage/#javascript-api-client).

After [importing](https://docs.apify.com/storage/#javascript-api-client) the `apify-client` package into your application and creating an instance of it, save it to a variable for easier access.

```js
// Save your key-value stores to a variable for easier access
const keyValueStores = apifyClient.keyValueStores;
```

You can then access your stores, retrieve records in stores, write new records or delete records.

```js
// Get the "my-store" key-value store or create it
// if it doesn't exist and set it as the default
const exampleStore = await keyValueStores.getOrCreateStore({
    storeName: "my-store"
});
apifyClient.setOptions({ storeId: store.id });

// Get a record from exampleStore
const record = await keyValueStores.getRecord({ key: "foo" });

// Write a record to exampleStore
await keyValueStores.putRecord({
    key: "foo",
    body: "bar",
    contentType: "text/plain; charset=utf-8",
});

// Delete a record in exampleStore
await keyValueStores.deleteRecord({ key: "foo" });
```

For more information on managing your key-value stores using the JavaScript API client, see its [documentation](https://docs.apify.com/apify-client-js#ApifyClient-keyValueStores).

### [](#apify-api) Apify API

The [Apify API](https://docs.apify.com/api/v2#/reference/key-value-stores) allows you to access your key-value stores programmatically using [HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) and easily share your crawling results.

If you are accessing your stores using the **username~store-name** [store ID format]({{@link storage.md#apify-api}}), you will need to append your [secret API token](https://docs.apify.com/api/v2#/introduction/authentication) as a query parameter (see below). You can find the token (and your user ID) on the [Integrations](https://my.apify.com/account#/integrations) page of your Apify account.

To **get a list of your key-value stores**, send a GET request to the [Get list of key-value stores](https://docs.apify.com/api/v2#/reference/key-value-stores/store-collection/get-list-of-key-value-stores) endpoint, providing your secret API token as a query parameter.

    https://api.apify.com/v2/key-value-stores?token={YOUR_API_TOKEN}

To **get information about a key-value store** such as its creation time and item count, send a GET request to the [Get store](https://docs.apify.com/api/v2#/reference/key-value-stores/store-object/get-store) endpoint.

    https://api.apify.com/v2/key-value-stores/{STORE_ID}?token={YOUR_API_TOKEN}

To **get a record** (its value) from a key-value store, send a GET request to the [Get record](https://docs.apify.com/api/v2#/reference/key-value-stores/key-collection/get-record) endpoint.

    https://api.apify.com/v2/key-value-stores/{STORE_ID}/records/{KEY_ID}?token={YOUR_API_TOKEN}

To **add a record** to a specific key in a key-value store, send a PUT request to the [Put record](https://docs.apify.com/api/v2#/reference/key-value-stores/record/put-record) endpoint.

    https://api.apify.com/v2/key-value-stores/{STORE_ID}/records/{KEY_ID}?token={YOUR_API_TOKEN}

Example payload:

```json
{
    "foo": "bar",
    "fos": "baz"
}
```

> When adding a record, the request payload is limited to 9MB. To upload a larger record or speed up your upload, use the [Direct upload URL](https://docs.apify.com/api/v2#/reference/key-value-stores/direct-upload-url/get-direct-upload-url) endpoint.

To **delete a record**, send a DELETE request specifying the key from a key-value store to the [Delete record](https://docs.apify.com/api/v2#/reference/key-value-stores/record/delete-record) endpoint.

    https://api.apify.com/v2/key-value-stores/{STORE_ID}/records/{KEY_ID}?token={YOUR_API_TOKEN}

For a detailed breakdown of each API endpoint, see the [API documentation](https://docs.apify.com/api/v2#/reference/key-value-stores).

## [](#sharing) Sharing

You can invite other Apify users to view or modify your key-value stores using the [access rights]({{@link access_rights.md}}) system. See the full list of permissions [here]({{@link access_rights/list_of_permissions.md#key-value-store}}).

### [](#sharing-key-value-stores-between-runs) Sharing key-value stores between runs

You can access a key-value store from any [actor]({{@link actors.md}}) or [task]({{@link actors/tasks.md}}) run as long as you know its **name** or **ID**.

To access a key-value store from another run using the Apify SDK, open it using the `Apify.openDataset([store])` [method](https://sdk.apify.com/docs/api/apify#openkeyvaluestore) like you would any other store.

```js
const otherStore = await Apify.openKeyValueStore("old-store");
```

To access a key-value store using the [JavaScript API client](#javascript-api-client), use the `getOrCreateStore()` [method](https://docs.apify.com/apify-client-js#ApifyClient-keyValueStores).

```js
const otherStore = await keyValueStores.getOrCreateStore({
    storeName: "my-store",
});
```

Once you've opened a store, read and manage its contents like you would with a key-value store from your current run.

The same applies for the [Apify API](#apify-api) - you can use [the same endpoints](#apify-api) as you would normally.

For more information on sharing storages between runs, see the Storage [overview page](https://docs.apify.com/storage/#sharing-storages-between-runs).

## [](#data-consistency) Data consistency

Key-value storage uses the [AWS S3](https://aws.amazon.com/s3/) service. According to the S3 [documentation](https://docs.aws.amazon.com/AmazonS3/latest/dev/Introduction.html), it provides **read-after-write** consistency for newly-created items. This means that if a record does not exist and you create it, then read it right after, you will be able to see it.

However, S3 storage has a caveat, described in the below quote from the S3 [documentation](https://docs.aws.amazon.com/AmazonS3/latest/dev/Introduction.html).

> [...] if you make a HEAD or GET request to a key name before the object is created, then create the object shortly after that, a subsequent GET might not return the object due to eventual consistency. <br/>
> Amazon S3 offers eventual consistency for overwrite PUTS and DELETES in all Regions.

[Eventual consistency](https://en.wikipedia.org/wiki/Eventual_consistency) means that if you update a value and then retrieve it from storage, the value will be consistent with the last update **eventually**. Before enough time has passed, however, the returned value may be inconsistent.

Visit [this](https://codeburst.io/quick-explanation-of-the-s3-consistency-model-6c9f325e3f82) article for more details on the issue and [this](https://medium.com/@dhruvsharma_50981/s3-eventual-data-consistency-model-issues-and-tackling-them-47093365a595) article for some ideas on how to tackle the issue.

## [](#limits) Limits

* When adding a record using the [Put record](https://docs.apify.com/api/v2#/reference/key-value-stores/record/put-record) API endpoint, the request payload is limited to **9MB**. To upload a larger record or speed up your upload, use the [Direct upload URL](https://docs.apify.com/api/v2#/reference/key-value-stores/direct-upload-url/get-direct-upload-url) endpoint.

* Key-value store names can be up to 63 characters long.
