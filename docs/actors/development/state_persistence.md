---
title: State persistence
description: Maintain a long-running actor's state to protect from unexpected restarts. See a code example on how to protect your run in case of server shutdown.
paths:
    - actor/development/state-persistence
    - actors/development/state-persistence
---

# [](#state-persistence)State persistence

Unlike traditional serverless platforms, the duration of an Apify actor's run is unlimited. This means, however, that an actor might need to be restarted from time to time, e.g. when the server it's running on is to be shut down.

Actors need to account for this possibility. For short-running actors, the chance of a restart is quite low and the cost of repeated runs is low, so restarts can be ignored.

However, for long-running actors a restart might be very costly and therefore such actors should periodically persist their state, possibly to the key-value store associated with the actor run.

On start, actors should first check whether there is some state stored and if so they should continue where they left off.

## [](#example) Example

The actor below can be found in the Apify store as [apify/example-counter](https://apify.com/apify/example-counter). It simply counts from one up. In each run it prints one number. Its state (counter position) is stored in a named [key-value store]({{@link storage/key_value_store.md}}) called **example-counter**. You will find it in the [Storage](https://my.apify.com/key-value-stores) section of the app after you run the actor.

```js
const Apify = require('apify');

Apify.main(async () => {
    const keyValueStores = Apify.client.keyValueStores;

    // Get store with name 'example-counter'.
    const store = await keyValueStores.getOrCreateStore({
        storeName: 'example-counter',
    });

    // Get counter state record from store.
    const record = await keyValueStores.getRecord({
        key: 'counter',
        storeId: store.id,
    });

    // If there is no such record then start from zero.
    let counter = record ? record.body : 0;

    // Increase counter, print and set as output.
    counter ++;
    console.log(`Counter: ${counter}`);
    Apify.setValue('OUTPUT', counter);

    // Save increased value back to store.
    await keyValueStores.putRecord({
        storeId: store.id,
        key: 'counter',
        // Record body must be a string or buffer!
        body: counter.toString(),
    });
});
```
