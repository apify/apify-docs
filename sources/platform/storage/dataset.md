---
title: Dataset
description: Store and export web scraping, crawling or data processing job results. Learn how to access and manage datasets in Apify Console or via API.
sidebar_position: 9.1
slug: /storage/dataset
---

# Dataset {#dataset}

**You can use Apify's Dataset Storage to store and export web scraping, crawling and data processing job results.**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Dataset storage enables you to sequentially save and retrieve data. Every Actor has its own Dataset to store web srapping data. Dataset initialise when Actor store the first item to the Dataset.

Datasets usually contain results from web scraping, crawling or data processing jobs. The data can be visualized as a table. Each Dataset object is a row and its attributes are the columns. The data can be converted into JSON, CSV, XML, RSS, Excel or HTML formats.

## How to use a Dataset{#basic-usage}

There are four ways to access your datasets:

1. [Apify Console](https://console.apify.com/storage?tab=datasets) provides an easy-to-understand interface.
2. Apify's [JavaScript](/sdk/js/docs/guides/result-storage#dataset) and [Python](sdk/python/docs/concepts/storages#working-with-datasets) SDK is used when building your own JavaScript Actor.
3. Apify's [JavaScript](/api/client/js/reference/class/DatasetClient) and [Python](/api/client/python/reference/class/DatasetClient) API clients is used to access your datasets from any Node.js and Python application.
4. [Apify API](/api/v2#/reference/datasets) is for accessing your datasets programmatically using HTTP.

> Remember: Dataset storage is **append-only** - data can only be added and cannot be changed or deleted.

### Apify Console {#apify-console}

In [Apify Console](https://console.apify.com), you can view your datasets in the [Storage](https://console.apify.com/storage) section under the [Datasets](https://console.apify.com/storage?tab=datasets) tab.

By default, only named datasets are displayed in the Apify console. Please select the **Include unnamed datasets** checkbox to display all of your datasets.

![Datasets in app](./images/datasets-app.png)

To view or download a dataset using Apify console, click on its **Dataset ID**. Under the **info** tab, you will get the database details and option to select the export format.

Under the **Settings** tab, you can update the dataset's name (and, in turn, its [retention period](./index.md)) and
[access rights](../collaboration/access_rights.md). 

Under the **API** tab, you can view and test the dataset's [API endpoints](/api/v2#/reference/datasets).

![Datasets detail view](./images/datasets-detail.png)

### JavaScript and Python SDK {#javascript-python-sdk}

If you are building an [Actor](../actors/index.mdx) in Apify, you should use the [JavaScript SDK](/sdk/js/docs/guides/result-storage#dataset) or [Python SDK](/sdk/python/docs/concepts/storages#working-with-datasets). The dataset is represented by the `Dataset` class in both [Javasctipt](/sdk/js/reference/class/Dataset) and [Python](/sdk/python/reference/class/Dataset) SDKs. 

You can use this `Dataset` class to specify whether your data is stored locally or in the Apify cloud. The `Dataset` class comes with a lot of useful methods. Out of which `pushData()` method is usefull to append new data to the (default) `Dataset` class. This method is avaiable in both [Javascript](/sdk/js/reference/class/Dataset#pushData) and [Python](/python/reference/class/Dataset#push_data) SDKs.

There are important methods like `getData()`, `map()` and `reduce()`. Please refer to `Dataset`'s [Javascript](sdk/js/reference/class/Dataset) and [Python](/sdk/python/reference/class/Dataset) documentation for more reference.

If you store your dataset locally, you can find the dataset in this location.

```text
{APIFY_LOCAL_STORAGE_DIR}/datasets/{DATASET_ID}/{INDEX}.json
```

Here, `DATASET_ID` refers to the dataset's `name` or `ID`. The default dataset is stored in the **default** directory.

Let's see how to add data to the default dataset using the Javascript and Python SDK.

<Tabs>
<TabItem value="js" label="Javascript">

```js
// Import the JavaScript SDK into your project
import { Actor } from 'apify';

await Actor.init();
// ...

// Add one item to the default dataset
await Actor.pushData({ foo: 'bar' });

// Add multiple items to the default dataset
await Actor.pushData([{ foo: 'hotel' }, { foo: 'cafe' }]);

await Actor.exit();
```

</TabItem>
<TabItem value="py" label="Python">

```py
from apify import Actor

async def main():
    async with Actor:
        # Add one item to the default dataset
        await Actor.push_data({'foo': 'bar'})

        # Add multiple items to the default dataset
        await Actor.push_data([{'foo': 'hotel'}, {'foo': 'cafe'}])
```

</TabItem>
</Tabs>

> Make sure to use the `await` keyword when calling `pushData()`, otherwise the Actor process might finish before the data are stored.

In addition to the default dataset, you can also use shared datasets to build Actors. Shared datasets are shared between Actors. 

Use `openDataset()` method to open shared datasets. This method is defined on the `Actor` class. You can find more on this on this method on their respective [Javascript](/sdk/js/reference/class/Actor#openDataset) and [Python](/sdk/python/reference/class/Actor#open_dataset) documentations.

<Tabs>
<TabItem value="js" label="Javascript">

```js
import { Actor } from 'apify';

await Actor.init();
// ...

// Save a named dataset to a variable
const dataset = await Actor.openDataset('some-name');

// Add data to the named dataset
await dataset.pushData({ foo: 'bar' });

// ...
await Actor.exit();
```

</TabItem>
<TabItem value="py" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        # Save a named dataset to a variable
        dataset = await Actor.open_dataset(name='some-name')

        # Add data to the named dataset
        await dataset.push_data({'foo': 'bar'})
```

</TabItem>
</Tabs>

You can use the `getData()` method to retrive data from a Dataset. You have to specify what fields you want to retrive using the `fields` parameter. If you need all the fields, just omit using the `fields` parameter. 

See the [Javascript](/sdk/js/reference/class/Dataset#getData) and [Python](/sdk/python/reference/class/Dataset#get_data) documentation on the `getData()` method.


<Tabs>
<TabItem value="js" label="Javascript">

```js
import { Actor } from 'apify';

await Actor.init();
// ...

const dataset = await Actor.openDataset();

// Only get the 'hotel' and 'cafe' fields
const hotelAndCafeData = await dataset.getData({
    fields: ['hotel', 'cafe'],
});

// ...
await Actor.exit();
```

</TabItem>
<TabItem value="py" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        dataset = await Actor.open_dataset()

        # Only get the 'hotel' and 'cafe' fields
        hotel_and_cafe_data = await dataset.get_data(fields=['hotel', 'cafe'])
```

</TabItem>
</Tabs>

Apify also provide a nodejs library called [Crawlee](https://crawlee.dev/) to build your own web scraping and automation solutions. See [Crawlee documentation](https://crawlee.dev/docs/quick-start) for setup instruction. Follow this guide to learn how to build your own crawlers and run them on the [Apify platform](https://crawlee.dev/docs/guides/apify-platform).


### JavaScript and Python API client {#javascript-python-api-client}

Apify's API client for [Javascript](/api/client/js/reference/class/DatasetClient) and [Python](/api/client/python/reference/class/DatasetClient) allows you to access your datasets from any Node.js and Python application, whether it is running on the Apify platform or elsewhere.

After importing and initiating the client, you can save each dataset to a variable for easier access.

<Tabs>
<TabItem value="js" label="Javascript">

```js
const myDatasetClient = apifyClient.dataset('jane-doe/my-dataset');
```

</TabItem>
<TabItem value="py" label="Python">

```python
my_dataset_client = apify_client.dataset('jane-doe/my-dataset')
```

</TabItem>
</Tabs>

You can then use this `myDatasetClient` variable to access the dataset's items and manage it.

> When using the [`.listItems()`](/api/client/js/reference/class/DatasetClient#listItems) method, if you mention the same field name in the `field` and `omit` parameters, the `omit` parameter will prevail and the field will not be returned.

### Apify API {#apify-api}

The [Apify API](/api/v2#/reference/datasets) allows you to access your datasets programmatically using [HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).

You will need an API token to access Apify's datasets. You can find the API token on the [integrations page](https://console.apify.com/account#/integrations) of your Apify Account.

> When providing your API authentication token, we recommend using the request's `Authorization` header, rather than the URL.

To **get a list of your datasets**, send a GET request to the [Get list of datasets](/api/v2#/reference/datasets/dataset-collection/get-list-of-datasets) endpoint.

```text
https://api.apify.com/v2/datasets
```

To **get information about a dataset** such as its creation time and **item count**, send a GET request to the [Get dataset](/api/v2#/reference/datasets/dataset/get-dataset) endpoint.

```text
https://api.apify.com/v2/datasets/{DATASET_ID}
```

To **view a dataset's data**, send a GET request to the
[Get dataset items](/api/v2#/reference/datasets/item-collection/get-items) Apify API endpoint.

```text
https://api.apify.com/v2/datasets/{DATASET_ID}/items
```

You can specify which data are exported by adding a comma-separated list of fields to the **fields** query parameter. Likewise, you can also omit certain fields using the **omit** parameter.

> If you both specify and omit the same field in a request, the**omit**parameter will prevail and the field will not be returned.

In addition, you can set the format in which you retrieve the data using the `?format=` parameter. The available formats are `json`, `jsonl`, `csv`, `html`, `xlsx`, `xml` and `rss`. The default value is `json`.

To retrieve the **hotel** and **cafe** fields, you would send your GET request to the URL below.

```text
https://api.apify.com/v2/datasets/{DATASET_ID}/items?format=json&fields=hotel%2Ccafe
```

> Instead of commas, you will need to use the `%2C` code, which represents `,` in URL encoding.<br/>
> Learn more about URL encoding [here](https://www.url-encode-decode.com).

To **add data to a dataset**, send a POST request, with a JSON object containing the data you want to add as the payload to the [Put items](/api/v2#/reference/datasets/item-collection/put-items) endpoint.

```text
https://api.apify.com/v2/datasets/{DATASET_ID}/items
```

Example payload:

```json
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
```

See the [API documentation](/api/v2#/reference/datasets) for a detailed breakdown of each API endpoint.

## Hidden fields {#hidden-fields}

Top-level fields starting with the `#` character are considered hidden.
These fields may be easily omitted when downloading the data from a dataset by providing the `skipHidden=1` or `clean=1` query parameters. This provides a convenient way to store debug information that should not appear in the final dataset.

Below is an example of a dataset record containing hidden fields with an HTTP response and error.

```json
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
```

Data without hidden fields are called "clean" and can be downloaded from [Apify Console](https://console.apify.com/storage?tab=datasets) using the "Clean items" link or via API using the `clean=true` or `clean=1` [URL parameters](/api/v2#/reference/datasets/item-collection/get-items).

## XML format extension {#xml-format-extension}

When you export results to XML or RSS formats, object property names become XML tags, while the corresponding values become the tags' children.

Click on the XML tab to see the geneated XML from the following JSON snippet.

<Tabs>
<TabItem value="json" label="JSON">

```json
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
```

</TabItem>
<TabItem value="xml" label="XML">

```xml
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
```

</TabItem>
</Tabs>

If the JavaScript object contains a property named `@`, its sub-properties are exported as attributes of the parent XML element. If the parent XML element does not have any child elements, its value is taken from a JavaScript object property named `#`.

<Tabs>
<TabItem value="json" label="JSON">

```json
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
        "#": "unknown",
    }]
}
```

</TabItem>
<TabItem value="xml" label="XML">

```xml
<address type="home">
    <street>21st</street>
    <city>Chicago</city>
</address>
<address type="office">unknown</address>
```

</TabItem>
</Tabs>

This feature is also useful when customizing your RSS feeds generated for various websites.

By default, the whole result is wrapped in an `<items/>` element, while each page object is contained in an `<item/>` element. You can change this using the `xmlRoot` and `xmlRow` URL parameters when GETting your data.

## Sharing {#sharing}

You can invite other Apify users to view or modify your datasets with the [access rights](../collaboration/index.md) system. See the [full list of permissions](../collaboration/list_of_permissions.md).

>Note: Datasets can be used concurrently by multiple Actors. This means that multiple Actors or tasks running at the same time can **write** data to a single dataset or key-value store. The same applies for reading data – multiple runs can **read** data from datasets and key-value stores concurrently.

### Sharing datasets between runs {#sharing-datasets-between-runs}

You can access a dataset from any [Actor](../actors/index.mdx) or [task](../actors/running/tasks.md) as long as you know its **name** or **ID**.

To access a dataset from another run using the [JavaScript SDK](/sdk/js) or the [Python SDK](/sdk/python), open it using the same method as you would with any other dataset.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();

const otherDataset = await Actor.openDataset('old-dataset');
// ...

await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        other_dataset = await Actor.open_dataset(name='old-dataset')
        # ...
```

</TabItem>
</Tabs>

In addition, You can also access a dataset from you current run using [Javascript](/api/client/js) and [Python](/api/client/python) API clients. Once you've opened the dataset, read its contents and add new data like you would do with a dataset from your current run.

<Tabs>
<TabItem value="js" label="Javascript">

```js
const otherDatasetClient = apifyClient.dataset('jane-doe/old-dataset');
```

</TabItem>
<TabItem value="py" label="Python">

```python
other_dataset_client = apify_client.dataset('jane-doe/old-dataset')
```

</TabItem>
</Tabs>

The same rules applies for the [Apify API](#apify-api). You can use the [Get Dataset Items](api/v2#/reference/datasets/item-collection/get-items) endpoint to acess a dataset from your current run.

## Limits {#limits}

* Tabulated data storage formats (the ones that display the data in columns), such as HTML, CSV, and EXCEL, have a maximum limit of **3000** columns. All data that do not fit into this limit will not be retrieved.

* When using the `pushData()` method, the size of the data is limited by the receiving API. Therefore, `pushData()` will only allow objects whose JSON representation is smaller than **9MB**. When an array is passed, none of the included objects may be larger than 9MB, however the array itself may be of any size.

* Dataset names can be up to 63 characters long.

### Rate limiting {#rate-limiting}

When pushing data to a dataset via [API](/api/v2#/reference/datasets/item-collection/put-items), the request rate is limited to **200** per second per dataset. This helps protect Apify servers from being overloaded.

All other dataset API [endpoints](/api/v2#/reference/datasets) are limited to **30** requests per second per dataset.

See the [API documentation](/api/v2#/introduction/rate-limiting) for details and to learn what to do if you exceed the rate limit.

## Data retention  {#data-retention}

| Dataset Type    | Retention Period |
| --------------- | ---------------- |
| Named Dataset   | indefinitely     |
| Unnamed Dataset | 7 Days           |

Follow [this link](./index.md#named-and-unnamed-storages) to learn more about Named and Unnamed Datasets.

## Deleting Dataset {#delete-dataset}

Named Dataset can be deleted using Apify's console, SDKs, API clients or simple HTTP API requests. There are four ways to delete a Dataset. Let's discuss them in brief.

-  Apify's console: To Delete a Dataset through [Apify's console](https://console.apify.com/storage), use the Action button in the stoage's detail page.
- Apify's SDK: Use the `.drop()` method in the `Dataset` class of Apify's [Javascript](/sdk/js) and [Python](/sdk/python) SDKs.
- Apify's API client: Use the `.delete()` method in the KeyValueStore of Apify's [Javascript](/api/client/js/reference/class/DatasetClient) and [Python](/api/client/python/reference/class/DatasetClient) API client.
- Apify's REST API: Use [Delete Key value store](/api/v2#/reference/datasets/dataset/delete-dataset) endpoint.