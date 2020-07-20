---
title: Storage
description: Documentation of Apify Storage, which allows you to store actor inputs and outputs.
menuWeight: 5
category: platform
paths:
    - storage
---
 
# Storage

The Apify platform includes three types of storage you can use both in your [actors]({{@link actors.md}}) and outside the Apify platform via [API](https://docs.apify.com/api/v2#/reference/key-value-stores), the Apify [software development kit (SDK)](https://sdk.apify.com) and Apify's [JavaScript API client](https://docs.apify.com/api/apify-client-js).

This page contains a brief introduction of the three types of Apify Storage.

* [Dataset](#dataset) - storage for data objects such as scrape results
* [Key-value store](#key-value-store) - storage for arbitrary data records like actor inputs
* [Request queue](#request-queue) - a queue of URLs for your actors to visit

You will then find [basic usage](#basic-usage) information relating to all three types of storage. For example, how to manage your storages in the [Apify app](#apify-app), the basics of setting up the [Apify SDK](#apify-sdk) and
[JavaScript API client](#javascript-api-client),
and general information for using storages with the [Apify API](#apify-api).

## Dataset

[Dataset]({{@link storage/dataset.md}}) storage allows you to store a series of data objects such as results from web scraping, crawling or data processing jobs. You can export your datasets in JSON, CSV, XML, RSS, Excel or HTML formats.

![Dataset illustration]({{@asset images/datasets-overview.png}})

The easiest way to access your datasets is via the
[Apify app](https://my.apify.com/storage#/datasets), which provides a user-friendly interface for viewing or downloading the data and editing your datasets' properties. 

To add data to your datasets (and for more management options), you can use the
[Apify SDK](https://sdk.apify.com/docs/api/dataset),
Apify's [JavaScript API client](https://docs.apify.com/apify-client-js#ApifyClient-datasets) or
the [Apify API](https://docs.apify.com/api/v2#/reference/datasets).

For more information, see the [Dataset]({{@link storage/dataset.md}}) documentation.

## Key-value store

The [key-value store]({{@link storage/key_value_store.md}}) is ideal for saving arbitrary data records such as files, screenshots of web pages, PDFs or for persisting the state of your actors and crawlers. The records are accessible under a unique name and can be written and read quickly. 

![Key-value store]({{@asset images/key-value-overview.svg}})

The easiest way to access your key-value stores is via the
[Apify app](https://my.apify.com/storage#/keyValueStores), which provides a user-friendly interface for viewing or downloading the data and editing your key-value stores' properties. 

To manage the data in your key-value stores (and for more access options), you can use the
[Apify SDK](https://sdk.apify.com/docs/api/key-value-store), Apify's [JavaScript API client](https://docs.apify.com/apify-client-js#ApifyClient-keyValueStores) or
the [Apify API](https://docs.apify.com/api/v2#/reference/key-value-stores).

For more information, see the [Key-value store]({{@link storage/key_value_store.md}}) documentation.

## Request queue

[Request queues]({{@link storage/request_queue.md}}) allow you to dynamically maintain a queue of URLs of web pages. You can use this in recursively crawling websites: you start from initial URLs and add new links as they are found, while skipping duplicates.

![Request queue]({{@asset images/request-queue-overview.svg}})

The easiest way to access your request queues is via the
[Apify app](https://my.apify.com/storage#/requestQueues), which provides a user-friendly interface for viewing your request queues and editing your queues' properties. 

To manage your request queues, you can use the
[Apify SDK](https://sdk.apify.com/docs/api/request-queue), Apify's [JavaScript API client](https://docs.apify.com/apify-client-js#ApifyClient-requestQueues) or
the [Apify API](https://docs.apify.com/api/v2#/reference/request-queues).

For more information, see the [Request queue]({{@link storage/request_queue.md}}) documentation. 

## Basic usage

### Apify app

To access your storages from the Apify app, go to the [`Storage` section](https://my.apify.com/storage) in the left-side menu. From there, you can click through the tabs to view your key-value stores, datasets, and request queues, as well as API endpoints. To view your storages, click their `ID`.

![Storages in app]({{@asset storage/images/datasets-app.png}})

> Only named storages are displayed by default. Select the `Include unnamed *store*` checkbox to display all of your storages.

You can edit your stores' names under the `Settings` tab of their detail page. There, you can also grant [access rights](https://docs.apify.com/access-rights) to other Apify users.

You can quickly share your storages' contents and details by sharing the URLs you find under the `API` tab in a store's detail page. 

![Storage API]({{@asset storage/images/overview-api.png}})

These URLs provide links to API `endpoints`–the places where your data are stored. Endpoints that allow you to `read` stored information do not require an [authentication token](https://docs.apify.com/api/v2#/introduction/authentication)-the calls are authenticated using a hard-to-guess ID, so they can be shared freely. Operations such as `update` or `delete`, however, will need the authentication token.

> Never share a URL containing your authentication token, as if will compromise your account's security. <br/>
> If the data you want to share requires a token, first download the data, then share it as a file.

### Apify SDK

The [Apify SDK](https://sdk.apify.com) is a JavaScript/Node.js library which allows you to build your own web scraping and automation solutions. It requires [Node.js](https://nodejs.org/en/) 10.17 or later, with the exception of `Node.js 11`. 

For setup instructions and to learn how to build your own actors, visit the [SDK documentation](https://sdk.apify.com/docs/guides/getting-started).

<!-- This will be included in the new JS API CLIENT docs -->
<!-- so all we'll have to do is link to the instructions -->
### JavaScript API client

Apify's [JavaScript API client](https://docs.apify.com/apify-client-js) (`apify-client`) allows you to access your datasets from any Node.js application, whether it is running on the Apify platform or elsewhere.

To use the `apify-client` in your application, you will first need to have [Node.js](https://nodejs.org/en/) version 10 or higher installed. You can use the following commands to check which version of Node.js you have.

    // Check the version
    node --version
    npm --version

You can then install the `apify-client` package from [NPM](https://www.npmjs.com/package/apify-cli) using the below command in your terminal.

    npm install apify-client

Once installed, `require` the `apify-client` package in your app and create a new instance of it using your `user ID` and secret `API token` (you can find these on the [Integrations](https://my.apify.com/account#/integrations) page of your Apify account).

```js
// Import the `apify-client` package
const ApifyClient = require('apify-client');

// Create a new instance of the client
// and configure it to use your credentials
const apifyClient = new ApifyClient({
    userId: 'RWnGtczasdwP63Mak',
    token: 'f5J7XsdaKDyRywwuGGo9',
});
```

### Apify API

The [Apify API](https://docs.apify.com/api/v2#/reference/key-value-stores) allows you to access your storages programmatically using [HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) and easily share your crawling results.

In most cases, when accessing your storages via API, you will need to provide a `store ID`, which you can do in the following formats:

* `WkzbQMuFYuamGv3YF` - the store's alpha-numerical ID if the store is unnamed
* `username~store-name` - your username and the store's name separated by a tilde (`~`) character (e.g. `janedoe~ecommerce-scraping-results`) if the store is named

To access your storages via the Apify API (if you are using the `username~store-name` store ID format), you will need to append your secret API token as a query parameter. This is because the alpha-numerical store IDs are harder for potential mischief makers to guess than the `username~store-name` format. You can find your token on the [Integrations](https://my.apify.com/account#/integrations) page of your Apify account.

For a detailed breakdown of each storage API endpoint, see the [API documentation](https://docs.apify.com/api/v2#/reference/datasets).

## Data retention

Unnamed storages expire after 7 days unless otherwise specified.

Named storages are retained indefinitely. 

You can edit your storages' names in the [Apify app](#apify-app) or using the access methods mentioned above.

## Named and unnamed storages

All storages are created without a name (with only an `ID`). This allows them to expire after 7 days and not take up your storage space. If you want to preserve a storage, simply [give it a name](#apify-app) and it will be retained indefinitely.

Apart from the retention period, the difference between named and unnamed storages is that named storages make it easier to verify you are using the correct store. In all other regards, including [sharing between runs](#sharing-storages-between-runs), named and unnamed storages are the same.

For example, the storage names `janeDoe~my-storage-1` and `janeDoe~web-scrape-results` are easier to tell apart than the IDs `cAbcYOfuXemTPwnIB` and `CAbcsuZbp7JHzkw1B`.

## Sharing storages between runs

Any storage can be accessed from any [actor]({{@link actors.md}}) or [task]({{@link actors/tasks.md}}) run as long as you know its `name` or `ID`. You can access and manage storages from other runs using the same methods or endpoints as with storages from your current run.

[Datasets]({{@link storage/dataset.md}}) and [key-value stores]({{@link storage/key_value_store.md}}) can be used concurently by multiple actors. This means that multiple actors or tasks running at the same time can **write** data to a single dataset or key-value store. The same applies for reading data - multiple runs can **read** data from datasets and key-value stores concurrently.

[Request queues]({{@link storage/request_queue.md}}), on the other hand only allow multiple runs to **add new data**. A request queue can only be processed by one actor or task run an any one time.

> When multiple runs try to write data to a storage at the same time, it isn't possible to control the order in which the data will be written. It will be written whenever the request is processed. <br/>
> In key-value stores and request queues, the same applies for deleting records: if a request to delete a record is made shortly before a request to read that same record, the second request will fail.

## Deleting storages

Named storages are only removed when you request it. You can delete storages in the following ways.

* [Apify app](https://my.apify.com/storage) - using the `Actions` button in the store's detail page
* [Apify SDK](https://sdk.apify.com/docs/api/key-value-store#keyvaluestoredrop) - using the `drop()` method
* [JavaScript API client](https://docs.apify.com/apify-client-js) - using the
[`deleteStore()`](https://docs.apify.com/apify-client-js#ApifyClient-datasets),
[`deleteDataset()`](https://docs.apify.com/apify-client-js#ApifyClient-keyValueStores)
or [`deleteQueue()`](https://docs.apify.com/apify-client-js#ApifyClient-requestQueues) methods.
* [API](https://docs.apify.com/api/v2#/reference/key-value-stores/store-object/delete-store) using the - `Delete {store}` endpoint, where `{store}` is the type of storage you want to delete.
 
