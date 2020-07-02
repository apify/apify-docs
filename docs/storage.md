---
title: Storage
description: Documentation of Apify Storage, which allows you to store actor inputs and outputs.
menuWeight: 5
category: platform
paths:
    - storage
---

# Storage

The Apify platform includes three storage types you can use both in your [actors]({{@link actors.md}}) and outside the Apify platform using the [Apify API](https://docs.apify.com/api/v2) and [JavaScript client](https://docs.apify.com/api/apify-client-js).



## Dataset

The [dataset]({{@link storage/dataset.md}}) provides storage for sequential data objects such as results from web scraping, crawling or data processing jobs. These data can then be exported in various formats like JSON, CSV, XML, RSS, Excel or HTML.

---- SHOULD I TALK ABOUT THE FORMATS? IS IT NECESSARY?

<!-- ADD THE MARKETING GRAPHIC HERE -->

Datasets are ideal for storing a list of items, products from an online store or contact details of prospective customers. The advanced formatting and filtering options let you easily integrate datasets into your data pipeline.



## Key-value-store



## Request queue




****
INCLUDE BASIC USAGE HERE TO AVOID REPETITION
at least how to access the storages from the App, maybe other stuff that's repetitive
****

## Named and unnamed storages

<!-- verify -->
All datasets are created equal - they are created without a name.
To name a dataset (and preserve it indefinitely), go to the 'datasets' tab of your 'Storage' section in the app, select 'Include unnamed datasets', and click on its ID. Then, in the dataset's 'settings' tab, you can give it a name, which will preserve it.

<!-- Is this true? -->
If a dataset is unnamed, it can still be accessed using its ID.


What's the difference?


> Named storages are retained indefinitely.
> Unnamed storages expire after 7 days unless otherwise specified.




*   [Key-value store]({{@link storage/key_value_store.md}}) - simple storage for strings and files
*   [Request queue]({{@link storage/request_queue.md}}) - dynamic queue of URLs to be processed

