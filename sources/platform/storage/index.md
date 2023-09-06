---
title: Storage
description: Store anything from images and key-value pairs to structured output data. Learn how to access and manage your stored data from the Apify platform or via API.
sidebar_position: 9
category: platform
slug: /storage
---

# Storage {#storage}

**Learn how to access and manage your stored data from the Apify platform or via API. With Storage, store anything from images and key-value pairs to structured output data. **

---

import Card from "@site/src/components/Card";
import CardGrid from "@site/src/components/CardGrid";

<CardGrid>
    <Card
        title="Dataset"
        desc="Store and export web scraping, crawling or data processing job results. Learn how to access and manage datasets in Apify Console or via API."
        to="/platform/storage/dataset"
    />
    <Card
        title="Key-value store"
        desc="Store anything from actor or task run results JSON documents or images. Learn how to access and manage key-value stores from Apify Console or via API."
        to="/platform/storage/key-value-store"
    />
    <Card
        title="Request queue"
        desc="Queue URLs for an actor to visit in its run. Learn how to share your queues between actor runs. Access and manage request queues from Apify Console or via API."
        to="/platform/storage/request-queue"
    />
</CardGrid>

---

## Introduction to the Apify Storage

Apify Storage is a versatile solution for storing all kinds of data. You can use it within your Apify [actors](../actors/index.mdx) or access it externally via the Apify platform [API](/api/v2#/). 

In this guide, you'll be introduced to the three primary types of Apify Storage and learn how to use them effectively.

Let's start by exploring these three types of Apify Storage:

### Dataset {#dataset}

[Dataset](./dataset.md) storage is perfect for storing data objects, such as the results of web scraping, crawling, or data processing jobs. You can export datasets in various formats, such as JSON, CSV, XML, RSS, Excel, or HTML.

#### Accessing Datasets
The most user-friendly way to access your datasets is through the [Apify Console](https://console.apify.com/storage?tab=datasets), which provides an intuitive interface for data viewing, downloading, and editing dataset properties.

![Image describing a storage dataset](../images/datasets-overview.png)

#### Managing Datasets
You can manage your datasets using the
[Apify SDK](/sdk/js/api/apify/class/Dataset),
[JavaScript API client](/api/client/js/reference/class/DatasetClient),
[Python API client](/api/client/python#datasetclient),
or the [Apify API](/api/v2#/reference/datasets).

For more in-depth information, refer to the [dataset documentation](./dataset.md).

### Key-value store {#key-value-store}

The [key-value store](./key_value_store.md) is designed for preserving data records like files, web page screenshots, PDFs, or actor states. These records are accessible via unique names and can be read or written quickly.

![Image describing a Key-value store](../images/key-value-overview.svg)

#### Accessing Key-Value Stores
The most straightforward way to access your key-value stores is through the [Apify Console](https://console.apify.com/storage?tab=keyValueStores), offering a user-friendly interface for viewing or downloading the data and editing your key-value stores' properties.

#### Managing Key-Value Stores
You can manage your key-value stores using the
[Apify SDK](/sdk/js/api/apify/class/KeyValueStore),
[JavaScript API client](/api/client/js/reference/class/KeyValueStoreClient),
[Python API client](/api/client/python/reference/class/KeyValueStoreClient),
or the [Apify API](/api/v2#/reference/key-value-stores).

For more in-depth information, refer to the [key-value store documentation](./key_value_store.md).


### Request queue {#request-queue}

[Request queues](./request_queue.md) allow you to dynamically maintain a dynamic queue of web page URLs. You can use this when recursively crawling websites: you start from initial URLs and add new links as they are found while skipping duplicates.

![Image describing a storage request queue](../images/request-queue-overview.svg)

#### Accessing Request Queues
The most user-friendly method to access your request queues is through the
[Apify Console](https://console.apify.com/storage?tab=requestQueues), which provides a user-friendly interface for viewing your request queues and editing your queues' properties.

#### Managing Request Queues
To manage your request queues, you can use the
[Apify SDK](/sdk/js/api/apify/class/RequestQueue),
[JavaScript API client](/api/client/js/reference/class/RequestQueueClient),
[Python API client](/api/client/python/reference/class/RequestQueueClient),
or the [Apify API](/api/v2#/reference/request-queues).

For more in-depth information, refer to the [request queue documentation](./request_queue.md).

## Data retention {#data-retention}

Unnamed storages expire after 7 days unless otherwise specified. Named storages are retained indefinitely.

### Preserving your storages {#preserving-storages}

To preserve your storages indefinitely, give them a name. You can do this in Apify Console or using our API. First, you'll need your store's ID. You can find it in the details of the run that created it. In Apify Console, head over to your run's details and select the **Dataset**, **Key-value store**, or **Request queue** tab as appropriate. Check that store's details, and you will find its ID among them.

![Finding your store's ID](./images/find-store-id.png)

Then, head over to the **Storage** menu, select the appropriate tab, and tick the **Include unnamed \[storages\]** box. Find and open your storage using the ID you just found, select the Settings tab, and enter its new name in the field. Your storage will now be preserved indefinitely.

To name your storage via API, get its ID from the run that generated it using the [Get run](/api/v2#/reference/actor-runs/run-object-and-its-storages/get-run) endpoint. You can then give it a new name using the **Update \[storage\]** endpoint. For example, [Update dataset](/api/v2#/reference/datasets/dataset/update-dataset).

The [Apify SDK](/sdk/js), [Crawlee](https://crawlee.dev/), the [JavaScript](/api/client/js/) and [Python](/api/client/python/) clients have their own ways of naming storages - check their docs for details.


## Named and unnamed storages {#named-and-unnamed-storages}

The default storages for an actor run are created without a name (with only an **ID**). This design choice allows them to automatically expire after 7 days (and not take up your storage space), particularly on the free plan, although they persist longer on paid plans. If you want to preserve a storage, simply [give it a name](#preserving-storages), and it will be retained indefinitely.

> Storages' names can be up to 63 characters long.

Named and unnamed storages are the same in all regards except their retention period. The only difference is that named storages make it easier to verify you are using the correct store.

For example, the storage names **janedoe~my-storage-1** and **janedoe~web-scrape-results** are easier to tell apart than the alphanumerical IDs **cAbcYOfuXemTPwnIB** and **CAbcsuZbp7JHzkw1B**.

## Sharing {#sharing}

You can invite other Apify users to view or modify your storages with the [access rights](../collaboration/index.md) system. See the [full list of permissions](../collaboration/list_of_permissions.md).

### Sharing storages between runs {#sharing-storages-between-runs}

Any storage can be accessed from any [Actor](../actors/index.mdx) or [task](../actors/running/tasks.md) run as long as you know its **name** or **ID**. You can access and manage storages from other runs using the same methods or endpoints as with storages from your current run.

[Datasets](./dataset.md) and [key-value stores](./key_value_store.md) can be used concurrently by multiple actors. This means that multiple actors or tasks running at the same time can **write** data to a single dataset or key-value store. The same applies for reading data – multiple runs can **read** data from datasets and key-value stores concurrently.

[Request queues](./request_queue.md), on the other hand, only allow multiple runs to **add new data**. A request queue can only be processed by one actor or task run at any one time.

> When multiple runs try to write data to a storage at the same time, it isn't possible to control the order in which the data will be written. It will be written whenever the request is processed. <br/>
> In key-value stores and request queues, the same applies for deleting records: if a request to delete a record is made shortly before a request to read that same record, the second request will fail.

## Deleting storages {#deleting-storages}

Named storages are only removed when you request it. You can delete storages in the following ways.

* [Apify Console](https://console.apify.com/storage) - using the **Actions** button in the store's detail page.
* [Apify SDK](/sdk/js) - using the `.drop()` method of the
  [Dataset](/sdk/js/api/apify/class/Dataset#drop),
  [Key-value store](/sdk/js/api/apify/class/KeyValueStore#drop),
  or [Request queue](/sdk/js/api/apify/class/RequestQueue#drop) class.
* [JavaScript API client](/api/client/js) - using the `.delete()` method in the
[dataset](/api/client/js/reference/class/DatasetClient),
[key-value store](/api/client/js/reference/class/KeyValueStoreClient),
or [request queue](/api/client/js/reference/class/RequestQueueClient) clients.
* [Python API client](/api/client/python) - using the `.delete()` method in the
[dataset](/api/client/python#datasetclient),
[key-value store](/api/client/python/reference/class/KeyValueStoreClient),
or [request queue](/api/client/python/reference/class/RequestQueueClient) clients.
* [API](/api/v2#/reference/key-value-stores/store-object/delete-store) using the - **Delete [store]** endpoint, where **[store]** is the type of storage you want to delete.

