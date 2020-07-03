---
title: Storage
description: Documentation of Apify Storage, which allows you to store actor inputs and outputs.
menuWeight: 5
category: platform
paths:
    - storage
---

# Storage

The Apify platform includes three storage types you can use both in your [actors]({{@link actors.md}}) and outside the Apify platform via [API](https://docs.apify.com/api/v2#/reference/key-value-stores), the Apify [software development kit](https://sdk.apify.com)(SDK) and the Apify [JavaScript API client](https://docs.apify.com/api/apify-client-js).

## Dataset

[Dataset]({{@link storage/dataset.md}}) provides storage for sequential data objects such as results from web scraping, crawling or data processing jobs.

![Dataset illustration]({{@asset storage/images/datasets-overview.png}})

The easiest way to access your datasets is via the
[Apify app](https://docs.apify.com/storage/dataset#apify-app), which provides a user-friendly interface for viewing or downloading the data and editing your datasets' names. 

For more access options and to add data to your datasets, you can use the
[Apify SDK](https://docs.apify.com/storage/dataset#apify-sdk),
Apify's [JavaScript API client](https://docs.apify.com/storage/dataset#javascript-api-client) or
the [Apify API](https://docs.apify.com/storage/dataset#apify-api).

For more information, see the [Dataset]({{@link storage/dataset.md}}) documentation.

## Key-value-store

Store arbitrary data records along with their MIME content type. The records are accessible under a unique name and can be written and read quickly. The key-value store is ideal for saving files such as screenshots of web pages or PDFs or for persisting the state of your actors and crawlers.

The easiest way to access your key-value stores is via the
[Apify app](https://docs.apify.com/storage/key-value-store#apify-app), which provides a user-friendly interface for viewing or downloading the data and editing your key-value stores' names. 

For more access options and to manage the data in your key-value stores, you can use the
[Apify SDK](https://docs.apify.com/storage/key-value-store#apify-sdk), Apify's [JavaScript API client](https://docs.apify.com/storage/key-value-store#javascript-api-client) or
the [Apify API](https://docs.apify.com/storage/key-value-store#apify-api).

![Key-value store]({{@asset storage/images/key-value-overview.png}})

For more information, see the [Key-value store]({{@link storage/key_value_store.md}}) documentation.

## Request queue

*   [Request queue]({{@link storage/request_queue.md}}) - dynamic queue of URLs to be processed


Maintain a queue of URLs of web pages in order to recursively crawl websites, starting from initial URLs and adding new links as they are found while skipping duplicates.

![Request queue]({{@asset storage/images/request-queue-overview.png}})

The request queue lets you query whether specific URLs were already found, push new URLs to the queue and fetch the next ones to process. Request queues support both breadth-first and depth-first crawling orders, and custom data attributes.

For more information, see the [Request queue]({{@link storage/request_queue.md}}) documentation.

## Basic usage

To access your storages from the Apify app, go to the [`Storage` section](https://my.apify.com/storage) in the left-side menu. From there, you can view your storages by cicking on their `ID` and test your storage API endpoints under the `API` tab.

![Datasets in app]({{@asset storage/images/datasets-app.png}})

> Only named datasets are displayed by default. Select the `Include unnamed datasets` checkbox to display all of your datasets.

To view or export a stored item, click on its `ID`, then select the format in which you want to download it. You can export your storages in JSON, CSV, XML, RSS, Excel or HTML formats.

You can edit your storages' names in the `Settings` tab of the store's detail page. There, you can also grant [access rights](https://docs.apify.com/access-rights) to other Apify users.

### Sharing

You can quickly share the contents of your storages by sharing the URLs you find under the `API` tab in a store's detail page. 

![Storage API]({{@asset storage/images/overview-api.png}})

These URLs provide links to API `endpoints`-the places where your data are stored. Some of the endpoints do not require an [authentication token](https://docs.apify.com/api/v2#/introduction/authentication)-the calls are authenticated using a hard-to-guess ID, so they can be shared freely.

> If an endpoint requires authentication, we suggest sharing the data another way

## Data retention

Named storages are retained indefinitely.

Unnamed storages expire after 7 days unless otherwise specified.

### Named and unnamed storages

<!-- verify -->
All datasets are created equal - they are created without a name.
To name a dataset (and preserve it indefinitely), go to the 'datasets' tab of your 'Storage' section in the app, select 'Include unnamed datasets', and click on its ID. Then, in the dataset's 'settings' tab, you can give it a name, which will preserve it.

<!-- Is this true? -->
If a dataset is unnamed, it can still be accessed using its ID.


What's the difference?




