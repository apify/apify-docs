---
title: Input
# Description update: Documentation of input and output configurations for Apify actors
description: Documentation of Apify actors - serverless computing jobs that enable execution of long-running web scraping and automation tasks in the cloud.
paths:
    - actor/run
    - actor/run#input-and-output
    - actor/running/input-and-output
    - actors/run#input-and-output
    - actors/running/input-and-output
    - actors/running/input
---

# [](#input) Input

An Apify actor's input is stored in the `INPUT.json` key-value store in the actor's `apify_storage/key_value_stores/default` directory.

> Note that the actor can store other values such as crawling results or screenshots of web pages under arbitrary keys.

The key-value store associated with an actor run can be conveniently accessed using the [`getValue()`](https://sdk.apify.com/docs/api/apify#apifygetvaluekey) and [`setValue()`](https://sdk.apify.com/docs/api/apify#apifysetvaluekey-value-options) functions provided by the `apify` [NPM package](https://www.npmjs.com/package/apify). Internally, these functions read the ID of the key-value store from the `APIFY_DEFAULT_KEY_VALUE_STORE_ID` environment variable. They then access the key-value store using the [Apify API](https://docs.apify.com/api). 

> For more details about the key-value stores, visit the [Storage]({{@link storage.md}}) section.

## [](#passing-input) Passing input

There are three ways to pass input to an actor  
  * using the INPUT tab if you are running the actor in the Apify [app](https://my.apify.com)
  * by creating or editing the `INPUT.json` file in the key-value store
  * using a POST payload when running the actor using the [Apify API](https://docs.apify.com/api)

