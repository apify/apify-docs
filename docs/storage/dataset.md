---
title: Dataset
description: Documentation of Apify Storage, which allows you to store actor inputs and outputs.
menuWeight: 6.1
paths:
    - storage/dataset
---

# [](#dataset)Dataset

Dataset storage enables you to save and retrieve sequential data objects which share the same attribute. Each actor run is assigned its own dataset–it is created when the first item is stored to it.

Datasets usually contain results from web scraping, crawling or data processing jobs. The data can be visualized as a table where each object is a row and its attributes are the columns. Data from the dataset can be exported in JSON, CSV, XML, RSS, Excel or HTML formats.

> Named datasets are retained indefinitely <br/>
> Unnamed datasets expire after 7 days unless otherwise specified

Dataset storage is immutable - data can only be added and cannot be changed. You [add data to a dataset](#api) using the `Put items` endpoint in the [Apify API](https://docs.apify.com/api/v2#/reference/datasets/item-collection/put-items?console=1).

There are four ways to access your datasets:

* [Apify app](https://my.apify.com) - provides an easy-to-understand interface ([more details](#app))
* [Apify software development kit (SDK)](https://sdk.apify.com/docs/guides/data-storage#dataset) - when building your own Apify actor ([more details](#sdk))
* [Apify JavaScript client](https://docs.apify.com/api/apify-client-js/latest#ApifyClient-datasets) - to access your datasets from outside the Apify platform (e.g. when building a Node.js application) ([more details](#js-client))
* [Apify API](#https://docs.apify.com/api/v2#/reference/datasets) - for accessing your datasets programmatically ([more details](#api))

## [](#basic-usage) Basic usage

### [](#app) Apify app

In the [Apify app](https://my.apify.com), you can view your datasets under the [Datasets](https://my.apify.com/storage#/datasets) tab in the [Storage](https://my.apify.com/storage) section.

Only named datasets are displayed by default. Select the `Include unnamed datasets` checkbox to display all of your datasets.

![Datasets in app]({{@asset storage/images/datasets-app.png}})

To view or download a dataset in various formats, click on its `Dataset ID`. In the detail page, you can update the dataset's name (and, in turn, its retention period) and
[access rights]({{@link access_rights.md}}) under the `Settings` tab. The API tab allows you to view and test the dataset's [API endpoints](https://docs.apify.com/api/v2#/reference/datasets).

### [](#sdk) Apify SDK

If you are building an [Apify actor]({{@link actors.md}}), you will be using the [Apify SDK](https://sdk.apify.com).
In the [Apify SDK](https://sdk.apify.com/docs/guides/data-storage#dataset), the dataset is represented by the [`Dataset`](https://sdk.apify.com/docs/guides/data-storage#dataset) class.

You can use the `Dataset` class to specify whether your data is stored locally on in the Apify cloud, push data to datasets of your choice using the `pushData()` method, and perform functions such as `getData()` and `reduce()`. For more information on this, see the [Apify SDK documentation](https://sdk.apify.com/docs/guides/data-storage#dataset).

If you have chosen to store your dataset locally, you can find it in the following files:

    {APIFY_LOCAL_STORAGE_DIR}/datasets/{DATASET_ID}/{INDEX}.json

> `DATASET_ID` refers to the dataset's `name` or `ID`. The default dataset will be stored in the `default` directory.

To add data to the default dataset, you can use the below example.

    const Apify = require('apify');

    Apify.main(async () => {
        
        // Add one item to the default dataset:
        await Apify.pushData({ foo: 'bar' });

        // Add multiple items to the default dataset:
        await Apify.pushData([
            { foo: 'hotel' },
            { foo: 'restaurant' },
        ]);
    });

> Make sure to use the `await` keyword when calling `pushData()`, otherwise the actor process might finish before the data is stored!

If you want to use something other than the default dataset, e.g. a dataset that you share between actors or between actor runs, you can use the [`Apify.openDataset()` method](https://sdk.apify.com/docs/api/apify#apifyopendatasetdatasetidorname-options)].

    const dataset = await Apify.openDataset('some-name');

    // Add data to the named dataset
    await dataset.pushData({ foo: 'bar' });

For more information on managing datasets using the Apify SDK, see the [SDK documentation](https://sdk.apify.com/docs/api/dataset).

### [](#js-client) Apify JavaScript client

Use if you're accessing your dataset from a Node.js application outside the Apify platform.





### [](#api) Apify API
[Apify API](https://docs.apify.com/api/v2#/reference/datasets)

Talk about the API and provide links to several endpoints, such as update, create, get list of datasets.

ADD HOW TO ADD DATA USING THE PUT DATA ENDPOINT

## [](#hidden-fields) Hidden fields

Hidden fields are fields starting with the `#` character. These fields might be easily omitted when downloading the data from a dataset and therefore provides a convenient way to store debug information that should not appear in the final dataset. Here is an example of a dataset record containing hidden fields with an HTTP response and error:

    {
        "url": "https://example.com",
        "title": "Example page",
        "data": {
            "foo": "bar"
        },
        "#error": null,
        "#response": {
            "statusCode": 201
        }
    }

Data without hidden fields are called "clean" and can be downloaded at Apify app using the "clean items" link or via API using a URL parameter `clean=true`.






# ------- OLD STUFF ---------
Each actor run is assigned its own dataset, created when the first item is stored to it. 

<!-- Where? How can I access it? Talk about the ID -->
The ID of this dataset is available under `run.defaultDatasetId`.

<!-- elaborate. provide info for SDK and app users -->
In your actor you can use shorthand methods to save items into the default dataset - `Apify.pushData()` [[see docs](https://sdk.apify.com/docs/api/apify#apifypushdataitem)].

    const Apify = require('apify');

    Apify.main(async () => {
        // Put one item into the dataset:
        await Apify.pushData({ foo: 'bar' });

        // Put multiple items into the dataset:
        await Apify.pushData([
            { foo: 'hotel' },
            { foo: 'restaurant' },
        ]);
    });

<!--  How can we do this in-app? -->
If you want to use something other than the default dataset, e.g. some dataset that you share between actors or between actor runs, then you can use `Apify.openDataset()` [[see docs](https://sdk.apify.com/docs/api/apify#apifyopendatasetdatasetidorname-options)]:

    const dataset = await Apify.openDataset('some-name');

    await dataset.pushData({ foo: 'bar' });

## [](#api-and-javascript-client)API and JavaScript client

The dataset provides a [HTTP API](https://docs.apify.com/api/v2#/reference/datasets) to manage datasets and to add/retrieve their data. If you are developing a Node.js application, then you can also use the [Apify JavaScript client](https://docs.apify.com/api/apify-client-js/latest#ApifyClient-datasets).

