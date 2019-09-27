---
title: Key-value store
---

### [](#key-value-store)Key-value store

The key-value store is simple storage that can be used for string or file ([buffer](https://nodejs.org/api/buffer.html)) records.

#### [](#key-value-store-basic)Basic usage

Each actor run is assigned its own key-value store containing its input and possibly output. The ID of this key-value store is available under `run.defaultKeyValueStoreId`.

In an actor you can use three shorthand methods to save and read records from its default key-value store - `Apify.setValue()` [[see docs](https://sdk.apify.com/docs/api/apify#module_Apify.setValue)], `Apify.getInput()` [[see docs](https://sdk.apify.com/docs/api/apify#module_Apify.getInput)], and `Apify.getValue()` [[see docs](https://sdk.apify.com/docs/api/apify#module_Apify.getValue)]. So to fetch an actor's INPUT and set OUTPUT value, call:

Method `Apify.getInput()` is not only a shortcut to `Apify.getValue('INPUT')` but it's also compatible with `Apify.metamorph()` [[see docs](https://apify.com/docs/actor#metamorph)] as metamorphed actor run has input stored in key `INPUT-METAMORPH-1` instead of `INPUT` which hosts original input.

    const Apify = require('apify');

    Apify.main(async () => {
        // Get input of your actor
        const input = await Apify.getInput();
        const value = await Apify.getValue('my-key');

        ...

        await Apify.setValue('OUTPUT', imageBuffer, { contentType: 'image/jpeg' });
    });

If you want to use something other than the default key-value store, e.g. some store that you share between actors or between actor runs, then you can use `Apify.openKeyValueStore()` [[see docs](https://sdk.apify.com/docs/api/apify#module_Apify.openKeyValueStore)]:

    const store = await Apify.openKeyValueStore('some-name');

    const value = await store.getValue('some-value-key');

#### [](#key-value-store-api-client)API and JavaScript client

The key-value store also provides a [HTTP API](/docs/api/v2#/reference/key-value-stores) to manage key-value stores and their records. If you are developing a Node.js application then you can also use the [Apify JavaScript client](/docs/api/apify-client-js/latest#ApifyClient-keyValueStores).
