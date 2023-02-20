---
title: Input
description: Configure your actor's input parameters using the Apify Console, locally or via API. Access parameters in key-value stores from your actor's code.
menuWeight: 1
paths:
    - actor/run
    - actor/run#input-and-output
    - actor/running/input-and-output
    - actors/run#input-and-output
    - actors/running/input-and-output
    - actors/running/input
---

# Input

An Apify actor's input is stored in the **INPUT.json** key-value store in the actor's **apify_storage/key_value_stores/default** directory.

> Note that the actor can store other values such as crawling results or screenshots of web pages under arbitrary keys.

The key-value store associated with an actor run can be conveniently accessed using the [`getValue()`](https://sdk.apify.com/api/apify/class/Actor#getValue) and [`setValue()`](https://sdk.apify.com/api/apify/class/Actor#setValue) functions of [`Actor`](https://sdk.apify.com/api/apify/class/Actor) class provided by the `apify` [NPM package](https://www.npmjs.com/package/apify). Internally, these functions read the ID of the key-value store from the **APIFY_DEFAULT_KEY_VALUE_STORE_ID** environment variable. They then access the key-value store using the [Apify API](https://docs.apify.com/api).

> For more details about the key-value stores, visit the [Storage]({{@link storage.md}}) section.

## Passing input

There are three ways to pass input to an actor:

* Using the INPUT tab if you are running the actor in [Apify Console](https://console.apify.com).
* By creating or editing the **INPUT.json** file in the key-value store.
* Using a POST payload when running the actor using the [Apify API](https://docs.apify.com/api).

