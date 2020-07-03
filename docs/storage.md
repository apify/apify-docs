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

Storages can be accessed using App, API, SDK, and CLI. 

Add links to all the relevant places (my.apify, sdk docs, cli docs/storage).



When accessing them from the app, go to the `Storages` section in the left menu and click around.

Only named datasets are displayed by default. Select the `Include unnamed datasets` checkbox to display all of your datasets.


## Dataset

[Dataset]({{@link storage/dataset.md}}) provides storage for sequential data objects such as results from web scraping, crawling or data processing jobs. These data can then be exported in various formats like JSON, CSV, XML, RSS, Excel or HTML.

![Dataset illustration]({{@asset storage/images/datasets-overview.png}})

The easiest way to access your datasets is via the
[Apify app](https://docs.apify.com/storage/dataset#apify-app), which provides a user-friendly interface for viewing or downloading the data and editing you datasets' names. 

For more access options and to add data to your datasets, you can use the
[Apify SDK](https://docs.apify.com/storage/dataset#apify-sdk),
Apify's [JavaScript API client](https://docs.apify.com/storage/dataset#javascript-api-client) or
the [Apify API](https://docs.apify.com/storage/dataset#apify-api).

For more information, see the [Dataset]({{@link storage/dataset.md}}) documentation.

## Key-value-store

*   [Key-value store]({{@link storage/key_value_store.md}}) - simple storage for strings and files

Store arbitrary data records along with their MIME content type. The records are accessible under a unique name and can be written and read at a rapid rate. The key-value store is ideal for saving files, such as screenshots of web pages or PDFs, or to persist the state of your actors and crawlers.

![Key-value store]({{@asset storage/images/key-value-overview.png}})

## Request queue

*   [Request queue]({{@link storage/request_queue.md}}) - dynamic queue of URLs to be processed


Maintain a queue of URLs of web pages in order to recursively crawl websites, starting from initial URLs and adding new links as they are found while skipping duplicates.

![Request queue]({{@asset storage/images/request-queue-overview.png}})

The request queue lets you query whether specific URLs were already found, push new URLs to the queue and fetch the next ones to process. Request queues support both breadth-first and depth-first crawling orders, and custom data attributes.

## Basic usage

?

## Named and unnamed storages

<!-- verify -->
All datasets are created equal - they are created without a name.
To name a dataset (and preserve it indefinitely), go to the 'datasets' tab of your 'Storage' section in the app, select 'Include unnamed datasets', and click on its ID. Then, in the dataset's 'settings' tab, you can give it a name, which will preserve it.

<!-- Is this true? -->
If a dataset is unnamed, it can still be accessed using its ID.


What's the difference?


> Named storages are retained indefinitely.
> Unnamed storages expire after 7 days unless otherwise specified.


