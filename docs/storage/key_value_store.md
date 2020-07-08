---
title: Key-value store
description: Documentation of Key-value stores, which allow you to store arbitrary data records such as actor inputs.
menuWeight: 6.2
paths:
    - storage/key-value-store
---

# Key-value store

The key-value store is simple storage that can be used for storing arbitrary data records as strings or files ([buffer](https://nodejs.org/api/buffer.html)) along with their [MIME content type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types). Each actor run is assigned its own key-value store when it is created. The store contains the actor's input, and, if necessary, other stores such as its output.

Key-value stores are mutable–you can both add entries and delete them.

> Named key-value stores are retained indefinitely. <br/>
> Unnamed key-value stores expire after 7 days unless otherwise specified.<br/>
> [Learn about named and unnamed stores]({{@link storage.md#data-retention}})

There are four ways to access your key-value stores:

* [Apify app](https://my.apify.com/storage#/keyValueStores) - provides an easy-to-understand interface ([more details](#apify-app))
* [Apify software development kit (SDK)](https://sdk.apify.com/docs/guides/data-storage#key-value-store) - when building your own Apify actor ([more details](#apify-sdk))
* [JavaScript API client](https://docs.apify.com/apify-client-js#ApifyClient-keyValueStores) - to access your key-value stores from outside the Apify platform ([more details](#javascript-api-client))
* [Apify API](https://docs.apify.com/api/v2#/reference/key-value-stores/get-items) - for accessing your key-value stores programmatically ([more details](#apify-api))

## Basic usage

### Apify app

In the [Apify app](https://my.apify.com), you can view your key-value stores in the [Storage](https://my.apify.com/storage) section under the [Key-value stores](https://my.apify.com/storage#/keyValueStores) tab.

Only named key-value stores are displayed by default. Select the `Include unnamed key-value stores` checkbox to display all of your stores.

![Key-value stores in app]({{@asset storage/images/key-value-stores-app.png}})

To view a key-value store's content, click on its `Store ID`, then click on a store's `View` button.
In the detail page, under the `Settings` tab, you can update the store's name (and, in turn, its retention period) and
[access rights]({{@link access_rights.md}}).
The API tab allows you to view and test a store's [API endpoints](https://docs.apify.com/api/v2#/reference/datasets).

![Key-value stores detail]({{@asset storage/images/key-value-stores-detail.png}})

### Apify SDK

If you are building an [Apify actor]({{@link actors.md}}), you will be using the [Apify software development kit (SDK)](https://sdk.apify.com).
In the [Apify SDK](https://sdk.apify.com/docs/guides/data-storage#key-value-store), the key-value store is represented by the
[`KeyValueStore`](https://sdk.apify.com/docs/guides/data-storage#key-value-store) class.

You can use the `KeyValueStore` class to specify whether your data is [stored locally or in the Apify cloud](https://sdk.apify.com/docs/api/key-value-store),
[get](https://sdk.apify.com/docs/api/key-value-store#keyvaluestoregetvaluekey) and
[set](https://sdk.apify.com/docs/api/key-value-store#keyvaluestoresetvaluekey-value-options)
values using the `Apify.getValue()` and `Apify.setValue()` methods or [iterate over your key-value store keys](https://sdk.apify.com/docs/api/key-value-store#keyvaluestoreforeachkeyiteratee-options) using the `forEachKey()` method.

Each actor run is associated with the default key-value store, which is created for the actor run. When running your actors and storing data locally, you can pass its [input]({{@link actors/running/input.md}}) using the `INPUT.json` key-value store. 

You can find INPUT.json and other key-value stores in the location below.

    {APIFY_LOCAL_STORAGE_DIR}/key_value_stores/{STORE_ID}/{KEY}.{EXT}

The default key-value store has the ID `default`, which you can override using the APIFY_DEFAULT_KEY_VALUE_STORE_ID environment variable. The {KEY} is the record's `key` and {EXT} corresponds to the data value's MIME content type.

To **get your actor's input**, use the `getValue()` method.

    // Get the default input
    const input = await Apify.getInput();

To **open a named key-value store**, and save a value (write a record) to it, use `setValue()`.

    // Open a named key-value store
    const exampleStore = await Apify.openKeyValueStore('my-store');

    // Write a record to `exampleStore`
    await exampleStore.setValue('some-key', { foo: 'bar' });

To **open a record in a key-value store**, use the `getValue()` method. Note that JSON is automatically parsed to a JavaScript object, text data returned as a string and other data is returned as binary buffer.

    // Read a record in `exampleStore`
    const value = await store.getValue('some-key');

To **delete a record**, just set its value to `null`.

    // Delete a record in `exampleStore`
    await exampleStore.setValue('some-key', null);

The `Apify.getInput()`method is not only a shortcut to `Apify.getValue('INPUT')`- it is also compatible with `Apify.metamorph()` [[see docs](https://docs.apify.com/actors/source-code#metamorph)]. This is because a metamorphed actor run's input is stored in the `INPUT-METAMORPH-1` key instead of `INPUT`, which hosts the original input.

    const Apify = require('apify');

    Apify.main(async () => {
        // Get input of your actor
        const input = await Apify.getInput();
        const value = await Apify.getValue('my-key');

        ...

        await Apify.setValue('OUTPUT', imageBuffer, { contentType: 'image/jpeg' });
    });

For more information on managing your key-value stores with the Apify SDK, see the SDK [documentation](https://sdk.apify.com/docs/guides/data-storage#key-value-store) and [API reference](https://sdk.apify.com/docs/api/key-value-store).


### JavaScript API client

Apify's [JavaScript API client](https://docs.apify.com/apify-client-js#ApifyClient-keyValueStores) (`apify-client`) allows you to access your key-value stores from outside the Apify platform (e.g. from a Node.js application).

For help with setting up the JavaScript API client, see the Storage documentation's [overview page](https://docs.apify.com/storage/#setting-up-the-javascript-api-client).

After importing the `apify-client` package into your application and creating an instance of it, save it to a variable for easier access.

    // Save your key-value stores to a variable for easier access
    const keyValueStores = apifyClient.keyValueStores;

You can then access your stores, retrieve records in stores, write new records or delete records.

    // Get the `my-store` key-value store or create it
    // if it doesn't exist
    const exampleStore = await keyValueStores.getOrCreateStore({ storeName: 'my-store' });

    // Get a record from `exampleStore` 
    const record = await exampleStore.getRecord({ key: 'foo' });

    // Write a record to the `exampleStore` storage
    await keyValueStores.putRecord({
        key: 'foo',
        body: 'bar',
        contentType: 'text/plain; charset=utf-8',
    });

    // Delete a record in `exampleStore`
    await exampleStore.deleteRecord({ key: 'foo' });

For more information on managing your key-value stores using the JavaScript API client, see its [documentation](https://docs.apify.com/apify-client-js#ApifyClient-keyValueStores).

### Apify API

The [Apify API](https://docs.apify.com/api/v2#/reference/key-value-stores) allows you to access your key-value stores programmatically using [HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) and easily share your crawling results.

If you are accessing your stores using the `username~store-name` [store ID format]({{@link storage.md#apify-api}}), you will need to append your [secret API token](https://docs.apify.com/api/v2#/introduction/authentication) as a query parameter (see below). You can find the token (and your user ID) on the [Integrations](https://my.apify.com/account#/integrations) page of your Apify account.

To **get a list of your key-value stores**, send a GET request to the [Get list of key-value stores](https://docs.apify.com/api/v2#/reference/key-value-stores/store-collection/get-list-of-key-value-stores) endpoint, providing your secret API token as a query parameter.

    https://api.apify.com/v2/key-value-stores?token={YOUR_API_TOKEN}

To **get information about a key-value store** such as its creation time and item count, send a GET request to the [Get store](https://docs.apify.com/api/v2#/reference/key-value-stores/store-object/get-store) endpoint.

    https://api.apify.com/v2/key-value-stores/{STORE_ID}?token={YOUR_API_TOKEN}

To **get a record** (its value) from a key-value store, send a GET request to the [Get record](https://docs.apify.com/api/v2#/reference/key-value-stores/key-collection/get-record) endpoint.

    https://api.apify.com/v2/key-value-stores/{STORE_ID}/records/{KEY_ID}?token={YOUR_API_TOKEN}

To **add a record** to a specific key in a key-value store, send a PUT request to the [Put record](https://docs.apify.com/api/v2#/reference/key-value-stores/record/put-record) endpoint.

    https://api.apify.com/v2/key-value-stores/{STORE_ID}/records/{KEY_ID}?token={YOUR_API_TOKEN}

Example payload:

    {
        "foo": "bar"
    }

> When adding a record, the request payload is limited to 9MB. To upload a larger record or speed up your upload, use the [Direct upload URL](https://docs.apify.com/api/v2#/reference/key-value-stores/direct-upload-url/get-direct-upload-url) endpoint.

To **delete a record**, send a DELETE request specifying the key from a key-value store to the [Delete record](https://docs.apify.com/api/v2#/reference/key-value-stores/record/delete-record) endpoint.

    https://api.apify.com/v2/key-value-stores/{STORE_ID}/records/{KEY_ID}?token={YOUR_API_TOKEN}

For a detailed breakdown of each API endpoint, see the [API documentation](https://docs.apify.com/api/v2#/reference/key-value-stores).