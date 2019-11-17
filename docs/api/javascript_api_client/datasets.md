---
title: ApifyClient.datasets
description: Documentation of ApifyClient.datasets
menuWeight: 3
---

## ApifyClient.datasets

### Basic usage 

    const ApifyClient = require('apify-client');

    const apifyClient = new ApifyClient({
           userId: 'RWnGtczasdwP63Mak',
           token: 'f5J7XsdaKDyRywwuGGo9',
    });
    const datasets = apifyClient.datasets;

    // Get dataset with name 'my-dataset' and set it as default
    // to be used in following commands.
    const dataset = await datasets.getOrCreateDataset({
        datasetName: 'my-dataset',
    });
    apifyClient.setOptions({ datasetId: dataset.id });

    // Save some object and array of objects to dataset.
    await datasets.putItems({
         data: { foo: 'bar' }
    });
    await datasets.putItems({
         data: [{ foo: 'hotel' }, { foo: 'restaurant' }],
    });

    // Get items from dataset and delete it.
    const paginationList = await datasets.getItems();
    const items = paginationList.items;
    await datasets.deleteDataset();

Every method can be used as either promise or with callback. If your Node version supports await/async then you can await promise result.

    // Awaited promise
    try {
         const items = await datasets.getItems();
         // Do something with the items ...
    } catch (err) {
         // Do something with error ...
    }

    // Promise
    datasets.getItems()
    .then((paginationList) => {
         console.log(paginationList.items)
         // Do something with items ...
    })
    .catch((err) => {
         // Do something with error ...
    });

    // Callback
    datasets.getItems((err, paginationList) => {
         console.log(paginationList.items)
         // Do something with error or items ...
    });


### Methods (6)

#### deleteDataset (options, callback  opt) → {*}

Deletes given dataset.

##### Parameters:

* **`options`** ( Object )

* **`datasetId`** ( String ) - Unique dataset ID * **`token`** ( String ) <optional>- Your API token at apify.com

* **`callback`** ( function ) <optional>- Callback function

##### Returns: * ( * )

#### getDataset (options, callback  opt) → {Dataset}

Returns given dataset.

##### Parameters:

* **`options`** ( Object )

* **`datasetId`** ( String ) - Unique dataset ID * **`token`** ( String ) <optional>- Your API token at apify.com

* **`callback`** ( function ) <optional>- Callback function

##### Returns: * ( Dataset )

#### getItems (options, callback  opt) → {PaginationList}

Returns items in the dataset based on the provided parameters

##### Parameters:

* **`options`** ( Object )

* **`datasetId`** ( String ) - Unique dataset ID * **`format`** ( String ) <optional>- Format of the items, possible values are: json, csv, xlsx, html, xml and rss. Defaults to `'json'`. * **`offset`** ( Number ) <optional>- Number of array elements that should be skipped at the start. Defaults to `0`. * **`limit`** ( Number ) <optional>- Maximum number of array elements to return. Defaults to `100000`. * **`desc`** ( Number ) <optional>- If `true` then the objects are sorted by `createdAt` in descending order. Otherwise they are sorted in ascending order. * **`fields`** ( Array ) <optional>- An array of field names that will be included in the result. If omitted, all fields are included in the results. * **`unwind`** ( String ) <optional>- Specifies a name of the field in the result objects that will be used to unwind the resulting objects. By default, the results are returned as they are. * **`disableBodyParser`** ( Boolean ) <optional>- If `true` then response from API will not be parsed * **`attachment`** ( Number ) <optional>- If `true` then the response will define the `Content-Disposition: attachment` HTTP header, forcing a web browser to download the file rather than to display it. By default, this header is not present. * **`delimiter`** ( String ) <optional>- A delimiter character for CSV files, only used if `format` is `csv`. You might need to URL-encode the character (e.g. use `%09` for tab or `%3B` for semicolon). Defaults to `','`. * **`bom`** ( Number ) <optional>- All responses are encoded in UTF-8 encoding. By default, the CSV files are prefixed with the UTF-8 Byte Order Mark (BOM), while JSON, JSONL, XML, HTML and RSS files are not. If you want to override this default behavior, set `bom` option to `true` to include the BOM, or set `bom` to `false` to skip it. * **`xmlRoot`** ( String ) <optional>- Overrides the default root element name of the XML output. By default, the root element is `results`. * **`xmlRow`** ( String ) <optional>- Overrides the default element name that wraps each page or page function result object in XML output. By default, the element name is `page` or `result`, depending on the value of the `simplified` option. * **`skipHeaderRow`** ( Boolean ) <optional>- If set to `true` then header row in csv format is skipped. * **`clean`** ( Boolean ) <optional>- If `true` then the function returns only non-empty items and skips hidden fields (i.e. fields starting with `#` character). Note that the `clean` parameter is a shortcut for `skipHidden: true` and `skipEmpty: true` options. * **`skipHidden`** ( Boolean ) <optional>- If `true` then the function doesn't return hidden fields (fields starting with "#" character). * **`skipEmpty`** ( Boolean ) <optional>- If `true` then the function doesn't return empty items. Note that in this case the returned number of items might be lower than limit parameter and pagination must be done using the `limit` value. * **`simplified`** ( Boolean ) <optional>- If true then, the function applies the `fields: ['url','pageFunctionResult','errorInfo']` and `unwind: 'pageFunctionResult'` options. This feature is used to emulate simplified results provided by the legacy Apify Crawler product and it's not recommended to use it in new integrations. * **`skipFailedPages`** ( Boolean ) <optional>- If true then, the all the items with errorInfo property will be skipped from the output. This feature is here to emulate functionality of API v1 used for the legacy Apify Crawler product and it's not recommended to use it in new integrations. * **`token`** ( String ) <optional>- Your API token at apify.com

* **`callback`** ( function ) <optional>- Callback function

##### Returns: * ( PaginationList )

#### getOrCreateDataset (options, callback  opt) → {Dataset}

Creates dataset of given name and returns it's object. If data with given name already exists then returns it's object.

##### Parameters:

* **`options`** ( Object )

* **`token`** ( String ) - Your API token at apify.com * **`datasetName`** ( String ) - Custom unique name to easily identify the dataset in the future.

* **`callback`** ( function ) <optional>- Callback function

##### Returns: * ( Dataset )

#### listDatasets (options, callback  opt) → {PaginationList}

Returns a list of datasets owned by a user. By default, the objects are sorted by the createdAt field in ascending order, therefore you can use pagination to incrementally fetch all datasets while new ones are still being created. To sort them in descending order, use `desc: true` option. The endpoint supports pagination using limit and offset parameters and it will not return more than 1000 array elements.

##### Parameters:

* **`options`** ( Object )

* **`token`** ( String ) - Your API token at apify.com * **`offset`** ( Number ) <optional>- Number of array elements that should be skipped at the start. Defaults to `0`. * **`limit`** ( Number ) <optional>- Maximum number of array elements to return. Defaults to `1000`. * **`desc`** ( Boolean ) <optional>- If `true` then the objects are sorted by the startedAt field in descending order. * **`unnamed`** ( Boolean ) <optional>- If `true` then also unnamed stores will be returned. By default only named stores are returned.

* **`callback`** ( function ) <optional>- Callback function

##### Returns: * ( PaginationList )

#### putItems (options, callback  opt) → {*}

Saves the object or an array of objects into dataset.

##### Parameters:

* **`options`** ( Object )

* **`datasetId`** ( String ) - Unique dataset ID * **`data`** ( Object | Array | String ) - Object, Array of objects or a String. String must be a valid JSON. Arrays and Objects must be JSON.stringifiable. * **`token`** ( String ) <optional>- Your API token at apify.com

* **`callback`** ( function ) <optional>- Callback function

##### Returns: * ( * )
