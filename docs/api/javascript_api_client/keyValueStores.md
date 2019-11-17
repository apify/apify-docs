---
title: ApifyClient.keyValueStores
description: Documentation of ApifyClient.keyValueStores
menuWeight: 4
---

## ApifyClient.keyValueStores

### Basic usage

    const ApifyClient = require('apify-client');

    const apifyClient = new ApifyClient({
           userId: 'RWnGtczasdwP63Mak',
           token: 'f5J7XsdaKDyRywwuGGo9',
    });
    const keyValueStores = apifyClient.keyValueStores;

    const store = await keyValueStores.getOrCreateStore({ storeName: 'my-store' });
    apifyClient.setOptions({ storeId: store.id });
    await keyValueStores.putRecord({
         key: 'foo',
         body: 'bar',
         contentType: 'text/plain; charset=utf-8',
    });
    const record = await keyValueStores.getRecord({ key: 'foo' });
    const keys = await keyValueStores.getRecordsKeys();
    await keyValueStores.deleteRecord({ key: 'foo' });

Every method can be used as either promise or with callback. If your Node version supports await/async then you can await promise result.

    // Awaited promise
    try {
         const record = await keyValueStores.getRecord({ key: 'foo' });
         // Do something record ...
    } catch (err) {
         // Do something with error ...
    }

    // Promise
    keyValueStores.getRecord({ key: 'foo' })
    .then((RECORD) => {
         // Do something record ...
    })
    .catch((err) => {
         // Do something with error ...
    });

    // Callback
    keyValueStores.getRecord({ key: 'foo' }, (err, record) => {
         // Do something with error or record ...
    });



### Methods (8)

#### deleteRecord(options, callback opt)

Deletes given record.



##### Parameters:

*   **`options`** ( Object )

    

    *   **`storeId`** ( String ) - Unique store ID
    *   **`key`** ( String ) - Key of the record
    *   **`token`** ( String ) <optional> - Your API token at apify.com

    

*   **`callback`** ( function ) <optional> - Callback function





#### deleteStore(options, callback opt) → {*}



Deletes key-value store.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`storeId`** ( String ) - Unique store ID
    *   **`token`** ( String ) <optional> - Your API token at apify.com

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( * )

#### getOrCreateStore(options, callback opt) → {KeyValueStore}



Creates store of given name and returns it's object. If store with given name already exists then returns it's object.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`storeName`** ( String ) - Custom unique name to easily identify the store in the future.

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( KeyValueStore )

#### getRecord(options, callback opt) → {KeyValueStoreRecord}



Gets value stored in the key-value store under the given key.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`storeId`** ( String ) - Unique store ID
    *   **`key`** ( String ) - Key of the record
    *   **`disableBodyParser`** ( Boolean ) <optional> - It true, it doesn't parse record's body based on content type.
    *   **`disableRedirect`** ( Boolean ) <optional> - API by default redirects user to signed record url for faster download. If disableRedirect=1 is set then API returns the record value directly.
    *   **`token`** ( String ) <optional> - Your API token at apify.com

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( KeyValueStoreRecord )

#### getStore(options, callback opt) → {KeyValueStore}



Gets key-value store.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`storeId`** ( String ) - Unique store ID
    *   **`token`** ( String ) <optional> - Your API token at apify.com

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( KeyValueStore )

#### listKeys(options, callback opt) → {PaginationList}



Returns an array containing objects representing keys in given store.

You can paginated using exclusiveStartKey and limit parameters.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`storeId`** ( String ) - Unique store ID
    *   **`exclusiveStartKey`** ( String ) <optional> - All keys up to this one (including) are skipped from the result.
    *   **`limit`** ( Number ) <optional> - Number of keys to be returned. Maximum value is 1000
    *   **`token`** ( String ) <optional> - Your API token at apify.com

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( PaginationList )

#### listStores(options, callback opt) → {PaginationList}



Gets list of key-value stores.

By default, the objects are sorted by the createdAt field in ascending order, therefore you can use pagination to incrementally fetch all stores while new ones are still being created. To sort them in descending order, use desc: `true` parameter. The endpoint supports pagination using limit and offset parameters and it will not return more than 1000 array elements.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`offset`** ( Number ) <optional> - Number of array elements that should be skipped at the start. Defaults to `0`.
    *   **`limit`** ( Number ) <optional> - Maximum number of array elements to return. Defaults to `1000`.
    *   **`desc`** ( Boolean ) <optional> - If `true` then the objects are sorted by the startedAt field in descending order.
    *   **`unnamed`** ( Boolean ) <optional> - If `true` then also unnamed stores will be returned. By default only named stores are returned.

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( PaginationList )

#### putRecord(options, callback opt) → {*}



Saves the record into key-value store.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`storeId`** ( String ) - Unique store ID
    *   **`key`** ( String ) - Key of the record
    *   **`contentType`** ( String ) - Content type of body
    *   **`body`** ( String | Buffer ) - Body in string or Buffer
    *   **`token`** ( String ) <optional> - Your API token at apify.com

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( * )


