---
title: Key-value store
description: Documentation of Key-value store, which allows you to store arbitrary data records such as actor inputs.
menuWeight: 6.2
paths:
    - storage/key-value-store
---

# Key-value store

The key-value store is simple storage that can be used for storing arbitrary data records as strings or files ([buffer](https://nodejs.org/api/buffer.html)) along with their [MIME content type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types). Each actor run is assigned its own key-value store when it is created. The store contains the actor's input and possibly output.

Key-value stores are mutable–you can both add entries and delete them.

> Named key-value stores are retained indefinitely. <br/>
> Unnamed key-value stores expire after 7 days unless otherwise specified.

There are four ways to access your key-value stores:

* [Apify app](https://my.apify.com/storage#/keyValueStores) - provides an easy-to-understand interface ([more details](#apify-app))
* [Apify software development kit (SDK)](https://sdk.apify.com/docs/guides/data-storage#key-value-store) - when building your own Apify actor ([more details](#apify-sdk))
* [JavaScript API client](https://docs.apify.com/apify-client-js#ApifyClient-keyValueStores) - to access your key-value stores from outside the Apify platform ([more details](#javascript-api-client))
* [Apify API](https://docs.apify.com/api/v2#/reference/key-value-stores/get-items?console=1) - for accessing your key-value stores programmatically ([more details](#apify-api))

## Basic usage

### Apify app

In the [Apify app](https://my.apify.com), you can view your key-value stores in the [Storage](https://my.apify.com/storage) section under the [Key-value stores](https://my.apify.com/storage#/keyValueStores) tab.

Only named key-value stores are displayed by default. Select the `Include unnamed key-value stores` checkbox to display all of your key-value stores.

![Key-value stores in app]({{@asset storage/images/key-value-stores-app.png}})

To view a key-value store's content, click on its `Store ID`, then click on a store's `View` button.
In the detail page, under the `Settings` tab, you can update the store's name (and, in turn, its retention period) and
[access rights]({{@link access_rights.md}}).
The API tab allows you to view and test a store's [API endpoints](https://docs.apify.com/api/v2#/reference/datasets).

### Apify SDK

If you are building an [Apify actor]({{@link actors.md}}), you will be using the [Apify softwware development kit (SDK)](https://sdk.apify.com).
In the [Apify SDK](https://sdk.apify.com/docs/guides/data-storage#key-value-store), the key-value store is represented by the
[`KeyValueStore`](https://sdk.apify.com/docs/guides/data-storage#key-value-store) class.




-------OLD STUFF, mainly SDK 


Each actor run is assigned its own key-value store containing its input and possibly output. The ID of this key-value store is available under `run.defaultKeyValueStoreId`.

In an actor you can use three shorthand methods to save and read records from its default key-value store - `Apify.setValue()` [[see docs](https://sdk.apify.com/docs/api/apify#apifysetvaluekey-value-options)], `Apify.getInput()` [[see docs](https://sdk.apify.com/docs/api/apify#apifygetinput)], and `Apify.getValue()` [[see docs](https://sdk.apify.com/docs/api/apify#apifygetvaluekey)]. So, to fetch an actor's INPUT and set OUTPUT value, call:


<!-- keep this -->
The `Apify.getInput()`method is not only a shortcut to `Apify.getValue('INPUT')`- it is also compatible with `Apify.metamorph()` [[see docs](https://docs.apify.com/actors/source-code#metamorph)]. This is because metamorphed actor run' input is stored in the `INPUT-METAMORPH-1` key instead of `INPUT`, which hosts the original input.

    const Apify = require('apify');

    Apify.main(async () => {
        // Get input of your actor
        const input = await Apify.getInput();
        const value = await Apify.getValue('my-key');

        ...

        await Apify.setValue('OUTPUT', imageBuffer, { contentType: 'image/jpeg' });
    });

If you want to use something other than the default key-value store, e.g. some store that you share between actors or between actor runs, then you can use `Apify.openKeyValueStore()` [[see docs](https://sdk.apify.com/docs/api/apify#apifyopenkeyvaluestorestoreidorname-options)]:

    const store = await Apify.openKeyValueStore('some-name');

    const value = await store.getValue('some-value-key');






### JavaScript API client

Apify's [JavaScript API client](https://docs.apify.com/apify-client-js#ApifyClient-keyValueStores) (`apify-client`) allows you to access your key-value stores from outside the Apify platform (e.g. from a Node.js application).

For help with setting up the JavaScript API client, see the Storage documentation's [overview page](https://docs.apify.com/storage/#setting-up-the-javascript-api-client).

After importing the `apify-client` package into your application and creating an instance of it, save it to a variable for easier access.

    // Save your key-value stores to a variable for easier access
    const keyValStores = apifyClient.keyValueStores;


### Apify API

The [Apify API](https://docs.apify.com/api/v2#/reference/key-value-stores) allows you to access your key-value stores programmatically using [HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) and easily share your crawling results.

You can find your secret API token on the [Integrations](https://my.apify.com/account#/integrations) page of your Apify account.

#### Get list of stores






