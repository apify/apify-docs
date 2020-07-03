---
title: Dataset
description: Documentation of Dataset storage, provides storage for sequential data objects such as actor outputs.
menuWeight: 6.1
paths:
    - storage/dataset
---

# Dataset

Dataset storage enables you to save and retrieve sequential data objects. Each actor run is assigned its own dataset, which is created when the first item is stored to it.

Datasets usually contain results from web scraping, crawling or data processing jobs. It can be visualized as a table where each object is a row and its attributes are the columns. The data can be exported in JSON, CSV, XML, RSS, Excel or HTML formats.

> Named datasets are retained indefinitely. <br/>
> Unnamed datasets expire after 7 days unless otherwise specified.

Dataset storage is immutable - data can only be added and cannot be changed.

There are four ways to access your datasets:

* [Apify app](https://my.apify.com) - provides an easy-to-understand interface ([more details](#apify-app))
* [Apify software development kit (SDK)](https://sdk.apify.com/docs/guides/data-storage#dataset) - when building your own Apify actor ([more details](#apify-sdk))
* [JavaScript API client](https://docs.apify.com/api/apify-client-js/latest#ApifyClient-datasets) - to access your datasets from outside the Apify platform ([more details](#javascript-api-client))
* [Apify API](https://docs.apify.com/api/v2#/reference/datasets) - for accessing your datasets programmatically ([more details](#apify-api))

## Basic usage

### Apify app

In the [Apify app](https://my.apify.com), you can view your datasets in the [Storage](https://my.apify.com/storage) section under the [Datasets](https://my.apify.com/storage#/datasets) tab.

Only named datasets are displayed by default. Select the `Include unnamed datasets` checkbox to display all of your datasets.

![Datasets in app]({{@asset storage/images/datasets-app.png}})

To view or download a dataset in the above mentioned formats, click on its `Dataset ID`. In the detail page, you can update the dataset's name (and, in turn, its retention period) and
[access rights]({{@link access_rights.md}}) under the `Settings` tab. The API tab allows you to view and test the dataset's [API endpoints](https://docs.apify.com/api/v2#/reference/datasets).

### Apify SDK

If you are building an [Apify actor]({{@link actors.md}}), you will be using the [Apify softwware development kit (SDK)](https://sdk.apify.com).
In the [Apify SDK](https://sdk.apify.com/docs/guides/data-storage#dataset), the dataset is represented by the
[`Dataset`](https://sdk.apify.com/docs/guides/data-storage#dataset) class.

You can use the `Dataset` class to specify whether your data is stored locally on in the Apify cloud, push data to datasets of your choice using the `pushData()` [method](https://sdk.apify.com/docs/examples/add-data-to-dataset), and perform functions such as `getData()`, `map()` and `reduce()`([example](https://sdk.apify.com/docs/examples/map-and-reduce)).
For more information, see the [Apify SDK documentation](https://sdk.apify.com/docs/guides/data-storage#dataset).

If you have chosen to store your dataset locally, you can find it in the location below.

    {APIFY_LOCAL_STORAGE_DIR}/datasets/{DATASET_ID}/{INDEX}.json

> `DATASET_ID` refers to the dataset's `name` or `ID`. The default dataset will be stored in the `default` directory.

To add data to the default dataset, you can use the example below.

    // Import the `apify` package to your project
    const Apify = require('apify');

    // The main function, which performs the actor's job
    // and terminates the process when it is finished
    Apify.main(async () => {
        
        // Add one item to the default dataset:
        await Apify.pushData({ foo: 'bar' });

        // Add multiple items to the default dataset:
        await Apify.pushData([
            { foo: 'hotel' },
            { foo: 'cafe' },
        ]);
    });

> Make sure to use the `await` keyword when calling `pushData()`, otherwise the actor process might finish before the data are stored.

If you want to use something other than the default dataset, e.g. a dataset that you share between actors or between actor runs, you can use the [Apify.openDataset()](https://sdk.apify.com/docs/api/apify#apifyopendatasetdatasetidorname-options) method.

    // Save a named dataset to a variable
    const dataset = await Apify.openDataset('some-name');

    // Add data to the named dataset
    await dataset.pushData({ foo: 'bar' });

When using the `getData()` method, you can specify the data you retrieve using the `[fields]` parameter. It should be an array of field names (strings) that will be included in the results. To include all the results, simply omit the `[fields]` parameter.

    // Only get the 'hotel' and 'cafe' fields
    const hotelAndCafeData = await dataset.getData(
        fields=[
            'hotel',
            'cafe',
        ]
    );

For more information on managing datasets using the Apify SDK, see the [SDK documentation](https://sdk.apify.com/docs/api/dataset).

### JavaScript API client

Apify's [JavaScript API client](https://docs.apify.com/apify-client-js#ApifyClient-datasets) allows you to access your datasets from outside the Apify platform (e.g. from a Node.js application).

To use the `apify client` in your application, you will first need to have [Node.js](https://nodejs.org/en/) version 10 or higher installed. You can use the following commands to check which version of Node.js you have.

    node --version
    npm --version

You can then install the `apify-client` package from [NPM](https://www.npmjs.com/package/apify-cli) using the below command in your terminal.

    npm install apify-cli

Once installed, `require` the `apify-client` package in your app, create a new instance of it using your account `user ID` and secret `API token` (you can find these on the [Integrations](https://my.apify.com/account#/integrations) page of your Apify account), and save your datasets to a variable for easier access.

    // Import the `apify-client` package
    const ApifyClient = require('apify-client');

    // Create a new instance of the client
    const apifyClient = new ApifyClient({
        userId: 'RWnGtczasdwP63Mak',
        token: 'f5J7XsdaKDyRywwuGGo9',
    });

    // Save your datasets to a variable for easier access
    const datasets = apifyClient.datasets;

You can then create, update, and delete datasets using the commands below.

    // Get the dataset with the name 'my-dataset'
    const dataset = await datasets.getOrCreateDataset({
        datasetName: 'my-dataset',
    });

    // Set the dataset as the default to be used
    // in the following commands
    apifyClient.setOptions({ datasetId: dataset.id });

    // Add an object and and array of objects to the dataset
    await datasets.putItems({
        data: { foo: 'bar' }
    });

    await datasets.putItems({
        data: [
            { foo: 'hotel' },
            { foo: 'cafe' },
        ],
    });

    // Get items from a dataset
    const paginationList = await datasets.getItems();
    
    const items = paginationList.items;

    // Delete a dataset
    await datasets.deleteDataset();

When using the `getItems()` method, you can specify the data you retrieve using the `[fields]` parameter. It should be an array of field names (strings) that will be included in the results. To include all the results, simply omit the `[fields]` parameter.

    // Only get the 'hotel' and 'cafe' fields
    const hotelAndCafeData = await datasets.getItems(
        fields=[
            'hotel',
            'cafe',
        ]
    );

For more information, see the [JavaScript API client](https://docs.apify.com/apify-client-js#ApifyClient-datasets) documentation.

### Apify API

The [Apify API](https://docs.apify.com/api/v2#/reference/datasets) allows you to access your datasets programmatically using [HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) and easily share your crawling results.

To access your datasets via the Apify API, you will need your secret API token, which you can find on the [Integrations](https://my.apify.com/account#/integrations) page of your Apify account. 

In most cases, you will also need to provide a `dataset ID` (demonstrated in the examples below as `DATASET_ID`), which can be provided in the following formats:

* `WkzbQMuFYuamGv3YF` - the dataset's numerical ID if the dataset is unnamed
* `username~dataset-name` - your username and the dataset's name separated by a tilde (`~`) character (e.g. `janedoe~ecommerce-scraping-results`) if the dataset is named

For a detailed breakdown of each API endpoint, see the [API documentation](https://docs.apify.com/api/v2#/reference/datasets).

#### Get a list of datasets

To get a list of your datasets, send a GET request to the [Get list of datasets](https://docs.apify.com/api/v2#/reference/datasets/get-list-of-datasets?console=1) endpoint, providing your API token as a query parameter. 

    https://api.apify.com/v2/datasets?token={YOUR_API_TOKEN}

#### Get dataset information

To get information about a dataset such as its creation time and `item count`, send a GET request to the [Get dataset](https://docs.apify.com/api/v2#/reference/datasets/dataset/get-dataset?console=1) endpoint.

    https://api.apify.com/v2/datasets/{DATASET_ID}?token={YOUR_API_TOKEN}

#### Get dataset items

To export a dataset's data, send a GET request to the
[Get dataset items](https://docs.apify.com/api/v2#/reference/datasets/item-collection/get-items) Apify API endpoint.

    https://api.apify.com/v2/datasets/{DATASET_ID}/items/?token={YOUR_API_TOKEN}

You can specify which data are exported by adding a comma-separated list of fields to the `fields` query parameter. Likewise, you can also omit certain fields using the `omit` parameter.

> Instead of commas, however, you will need to use the `%2C` code, which represents `,` in URL encoding.<br/>
> Learn more about URL encoding [here](https://www.url-encode-decode.com).

To retrieve the `hotel` and `cafe` fields, while omitting `restaurant` and `bar`, you would use the send your GET request to the URL below. 

    https://api.apify.com/v2/datasets/{DATASET_ID}/items?token={YOUR_API_TOKEN}&fields=hotel%2Ccafe&omit=restaurant%2Cbar

#### Put data

To add data to a dataset, send a POST request, with a JSON object containing the data you want to add as the payload to the [Put items](https://docs.apify.com/api/v2#/reference/datasets/item-collection/put-items?console=1) endpoint.

    https://api.apify.com/v2/datasets/{DATASET_ID}/items/?token={YOUR_API_TOKEN}

Example payload:

    [
        {
            "foo": "bar"
        },
        {
            "foo": "hotel"
        },
        {
            "foo": "cafe"
        }
    ]

## Hidden fields

Top-level fields starting with the `#` character are considered [hidden](https://docs.apify.com/api/v2#/reference/datasets/item-collection/put-items?console=1).
These fields may be easily omitted when downloading the data from a dataset. This provides a convenient way to store debug information that should not appear in the final dataset. 

Below is an example of a dataset record containing hidden fields with an HTTP response and error.

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

Data without hidden fields are called "clean" and can be downloaded from the [Apify app](https://my.apify.com/storage#/datasets) using the "Clean items" link or via API using the `clean=true` or `clean=1` [URL parameters](https://docs.apify.com/api/v2#/reference/datasets/item-collection/put-items?console=1).

## XML format extension

When you export results to XML or RSS formats, object property names become XML tags, while the corresponding values become the tags' children.

For example, the JavaScript object:

    {
        name: "Rashida Jones",
        address: [
            {
                type: "home",
                street: "21st",
                city: "Chicago",
            },
            {
                type: "office",
                street: null,
                city: null,
            }
        ]
    }

becomes the following XML snippet:

    <name>Rashida Jones</name>
    <address>
        <type>home</type>
        <street>21st</street>
        <city>Chicago</city>
    </address>
    <address>
        <type>office</type>
        <street/>
        <city/>
    </address>

If the JavaScript object contains a property named `@`, its sub-properties are exported as attributes of the parent XML element. If the parent XML element does not have any child elements, its value is taken from a JavaScript object property named `#`. 

For example, the following JavaScript object:

    {
        "address": [{
            "@": {
                "type": "home",
            },
            "street": "21st",
            "city": "Chicago",
        },
        {
            "@": {
                "type": "office",
            },
            "#": 'unknown',
        }]
    }

will be transformed to the following XML snippet:

    <address type="home">
        <street>21st</street>
        <city>Chicago</city>
    </address>
    <address type="office">unknown</address>

This feature is also useful when customizing your RSS feeds generated for various websites.

By default, the whole result and each page object are wrapped in an `–` element. You can change this using the `xmlRoot` and `xmlRow` URL parameters when GETting your data.

## Limits

Tabulated data storage formats (ones that display the data in columns), such as HTML, CSV, and EXCEL, have a maximum limit of `3000` columns. All data that do not fit into this limit will be lost.
