---
title: Dataset
menuTitle: Dataset
description: Documentation of Apify simple key-value store that enables storage of Actor inputs and results.
menuWeight: 6.2
redirectPaths:
    - storage/dataset
---

# [](#dataset)Dataset

The dataset is storage that enables the saving and retrieval of sequential data objects - typically the results of some long-running operation such as scraping or data extraction. The dataset is immutable - i.e. data can only be added and cannot be changed.

## [](#basic-usage)Basic usage

Each actor run is assigned its own dataset, created when the first item is stored to it. The ID of this dataset is available under `run.defaultDatasetId`.

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

If you want to use something other than the default dataset, e.g. some dataset that you share between actors or between actor runs, then you can use `Apify.openDataset()` [[see docs](https://sdk.apify.com/docs/api/apify#apifyopendatasetdatasetidorname-options)]:

    const dataset = await Apify.openDataset('some-name');

    await dataset.pushData({ foo: 'bar' });

## [](#hidden-fields)Hidden fields

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

## [](#api-and-javascript-client)API and JavaScript client

The dataset provides a [HTTP API](https://docs.apify.com/api/v2#/reference/datasets) to manage datasets and to add/retrieve their data. If you are developing a Node.js application, then you can also use the [Apify JavaScript client](https://docs.apify.com/api/apify-client-js/latest#ApifyClient-datasets).

