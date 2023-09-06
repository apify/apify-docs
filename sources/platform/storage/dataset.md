---
title: Dataset
description: Store and export web scraping, crawling or data processing job results. Learn how to access and manage datasets in Apify Console or via API.
sidebar_position: 9.1
slug: /storage/dataset
---

# Dataset {#dataset}

**Store and export web scraping, crawling or data processing job results. Learn how to access and manage datasets in Apify Console or via API.**

---

import Card from "@site/src/components/Card";
import CardGrid from "@site/src/components/CardGrid";

<CardGrid>
    <Card
        title="Basic usage"
        desc="Learn about the various ways to access and manage your datasets."
        to="/platform/storage/dataset#basic-usage"
    />
    <Card
        title="Hidden fields"
        desc="Learn how to store debug information or metadata that should not appear in downloaded datasets."
        to="/platform/storage/dataset#hidden-fields"
    />
    <Card
        title="XML format extension"
        desc="Learn how to convert between data formats using the XML format extension."
        to="/platform/storage/dataset#xml-format-extension"
    />
    <Card
        title="Sharing"
        desc="Invite other Apify users to view or modify your datasets."
        to="/platform/storage/dataset#sharing"
    />
    <Card
        title="Rate limiting"
        desc="Learn about how rate limiting improves request queues."
        to="/platform/storage/dataset#rate-limiting"
    />
</CardGrid>

---

Dataset storage enables you to sequentially save and retrieve data. Each actor run is assigned its own dataset, which is created when the first item is stored to it.

Datasets usually contain results from web scraping, crawling or data processing jobs. The data can be visualized as a table where each object is a row and its attributes are the columns. The data can be exported in JSON, CSV, XML, RSS, Excel or HTML formats.

> Named datasets are retained indefinitely. <br/>
> Unnamed datasets expire after 7 days unless otherwise specified. <br/>
> [Learn about named and unnamed datasets.](./index.md#named-and-unnamed-storages)

Dataset storage is **append-only** - data can only be added and cannot be changed or deleted.

## Basic usage {#basic-usage}

In this section, we'll explore various ways to access your Storage datasets.  We'll cover managing your storages in [Apify Console](#apify-console), the fundamentals of setting up the [Apify SDK](#apify-sdk),
the [API clients](#api-client), as well as general information for using storages with the [Apify API](#apify-api).

These are the four primary ways to access your datasets:

* [Apify Console](https://console.apify.com/storage?tab=datasets) - provides an easy-to-understand interface [[How-to](#apify-console)].
* [Apify SDK](/sdk/js/docs/guides/result-storage#dataset) - provides Dataset classes to utilize when building your custom Apify actors. [[How-to](#apify-sdk)].
* [API clients](#api-client) - to access your datasets from any Node.js or Python application using the API client. [[How-to](#api-client)]
* [Apify API](/api/v2#/reference/datasets) - for accessing your datasets programmatically [[How-to](#apify-api)].

### Apify Console {#apify-console}

To access your storages from Apify Console, navigate to the [**Storage** section](https://console.apify.com/storage) in the left-side menu. From there, you can easily click through the tabs to view your datasets, under the [Datasets](https://console.apify.com/storage?tab=datasets) tab. To access a specific storage, simply click on its **ID**.

> By default, only named storages are displayed. To view all of your storages, check the **Include unnamed store** checkbox.

![Image describing datasets in Apify Console](./images/datasets-app.png)

To view or download a dataset in the above-mentioned formats, click on its **Dataset ID**. Under the **Settings** tab, you can update the dataset's name (and, in turn, its [retention period](./index.md)) and
[access rights](../collaboration/index.md). Click on the `API` button to view and test the dataset's [API endpoints](/api/v2#/reference/datasets).

![Image describing a dataset's detail view](./images/datasets-detail.png)

Additionally, under the **Settings** tab of the dataset's detail page, you can grant [access rights](../collaboration/index.md) to other Apify users.

For convenient sharing of your dataset contents and details, you can use the URLs found under the **API** tab on a dataset's detail page.

![Image describing a dataset's API](./images/overview-api.png)

These URLs provide links to API **endpoints** where your data is stored. Note that endpoints allowing data **read** operations do not require an [authentication token](/api/v2#/introduction/authentication). The calls are authenticated using a hard-to-guess ID, so they can be freely shared. However, for operations like **update** or **delete**, an authentication token is required.

> Remember never to share a URL containing your authentication token, as this will compromise your account's security. <br/>

> If the data you want to share requires a token, it's safer to download the data first and then share it as a file.

### Apify SDK {#apify-sdk}

If you are building an [Apify actor](../actors/index.mdx), you will be using the [Apify SDK](/sdk/js) or the [Apify Python SDK](/sdk/python). In the [Apify SDK](/sdk/js/docs/guides/result-storage#dataset), the dataset is represented by the [`Dataset`](/sdk/js/api/apify/class/Dataset) class, while in the Apify Python SDK, you can use the [`DatasetClient`](/api/client/python/reference/class/DatasetClient) to interact with datasets.

> Get in-depth information about the Apify Python SDK in the [documentation section](/sdk/python/docs/overview/introduction)

Using the Apify SDK, you can use the `Dataset` class to specify whether your data is stored locally or in the Apify cloud, push data to datasets of your choice using the [`pushData()`](/sdk/js/api/apify/class/Dataset#pushData) method. You could also use other methods such as [`getData()`](/sdk/js/api/apify/class/Dataset#getData), [`map()`](/sdk/js/api/apify/class/Dataset#map) and [`reduce()`](/sdk/js/api/apify/class/Dataset#reduce), see [example](/sdk/js/docs/examples/map-and-reduce).

> [Crawlee](https://crawlee.dev/) is a JavaScript/Node.js library which allows you to build your own web scraping and automation solutions (formerly was a part of Apify SDK).

> See [Crawlee documentation](https://crawlee.dev/docs/quick-start) for setup instructions and to learn how to build your own crawlers and run them on the [Apify platform](https://crawlee.dev/docs/guides/apify-platform).

If you have chosen to store your dataset locally, you can find it in the location below.

```text
{APIFY_LOCAL_STORAGE_DIR}/datasets/{DATASET_ID}/{INDEX}.json
```

**DATASET_ID** refers to the dataset's **name** or **ID**. The default dataset will be stored in the **default** directory.

To add data to the default dataset, you can use the example below:

```js
// Import the Apify SDK into your project
import { Actor } from 'apify';

await Actor.init();
// ...

// Add one item to the default dataset
await Actor.pushData({ foo: 'bar' });

// Add multiple items to the default dataset
await Actor.pushData([{ foo: 'hotel' }, { foo: 'cafe' }]);

// ...
await Actor.exit();
```

> Make sure to use the `await` keyword when calling `pushData()`, otherwise the actor process might finish before the data are stored.

If you want to use something other than the default dataset, e.g. a dataset that you share between actors or between actor runs, you can use the [Actor.openDataset()](/sdk/js/api/apify/class/Actor#openDataset) method.

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

When using the [`getData()`](/sdk/js/api/apify/class/Dataset#getData) method, you can specify the data you retrieve using the `fields` option. It should be an array of field names (strings) that will be included in the results. To include all the results, exclude the `fields` parameter.

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

See the [SDK documentation](/sdk/js/docs/guides/result-storage#dataset) and the `Dataset` class's [API reference](/sdk/js/api/apify/class/Dataset) for details on managing datasets with the Apify SDK.

### API clients {#api-client}

Apify provides API clients for [JavaScript](/api/client/js/reference/class/DatasetClient) (`apify-client`) and [Python](/api/client/python/reference/class/DatasetClient) (`apify-client`) enabling you to access your datasets from Node.js or Python applications, whether the application is running on the Apify platform or elsewhere. 

Here's an example on how to use datasets in both languages:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="js" label="JavaScript">

```js
// Import the Apify client
const ApifyClient = require('apify-client');

// Initialize the client
const apifyClient = new ApifyClient();

// Save the dataset to a variable for easier access
const myDatasetClient = apifyClient.dataset('jane-doe/my-dataset');

```

</TabItem>
<TabItem value="py" label="Python">

```py
# Import the Apify client
from apify_client import ApifyClient

# Initialize the client
apify_client = ApifyClient()

# Save the dataset to a variable for easier access
my_dataset_client = apify_client.dataset('jane-doe/my-dataset')

```

</TabItem>
</Tabs>

In both languages,you can use the respective client variable (`myDatasetClient`) [in JavaScript](/api/client/js/reference/class/DatasetClient) and (`my_dataset_client`) [in Python](/api/client/python/reference/class/DatasetClient) to interact with your dataset.

> Important note: When using the [`.listItems()`](/api/client/js/reference/class/DatasetClient#listItems) method in Javascript or the [`.list_items()`](/api/client/python/reference/class/DatasetClient#list_items) method in Python, if you mention the same field name in the `field` and `omit` parameters, the `omit` parameter will take precedence and the specified field will not be returned.

See the API client documentation for [JavaScript](/api/client/js/reference/class/DatasetClient) or [Python](/api/client/python/reference/class/DatasetClient) for help with [JS-related setup](/api/client/js/docs) or [Python-related setup](/api/client/python/docs/quick-start) and more details.


### Apify API {#apify-api}

The [Apify API](/api/v2#/reference/datasets) allows you to access your datasets programmatically using [HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) and easily share your crawling results.

If you are accessing your datasets using the **username~store-name** [store ID format](./index.md), you will need to use your [secret API token](../integrations/index.mdx#api-token). You can find the token (and your user ID) on the [Integrations](https://console.apify.com/account#/integrations) page of your Apify account.

> When providing your API authentication token, we recommend using the request's `Authorization` header, rather than the URL. ([More info](#introduction/authentication)).

To **get a list of your datasets**, send a GET request to the [Get list of datasets](/api/v2#/reference/datasets/get-list-of-datasets) endpoint.

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

You can **specify which data are exported** by adding a comma-separated list of fields to the **fields** query parameter. Likewise, you can also omit certain fields using the **omit** parameter.

**If you both specify and omit the same field in a request, the**omit**parameter will prevail and the field will not be returned.**

In addition, you can set the format in which you retrieve the data using the **?format=** parameter. The available formats are **json**, **jsonl**, **csv**, **html**, **xlsx**, **xml** and **rss**. The default value is **json**.

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

> Pushing data to dataset via API is limited to **200** requests per second to prevent our servers from being overloaded.

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

Datasets can contain top-level fields that start with the `#` character.
These fields may be easily omitted when downloading the data from a dataset by providing the **skipHidden=1** or **clean=1** query parameters. This provides a convenient way to store debug information that should not appear in the final dataset.

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

Data without hidden fields are called "clean" and can be downloaded from [Apify Console](https://console.apify.com/storage?tab=datasets) using the "Clean items" link or via API using the **clean=true** or **clean=1** [URL parameters](/api/v2#/reference/datasets/item-collection/get-items).

## XML format extension {#xml-format-extension}

When you export results to XML or RSS formats, object property names become XML tags, while the corresponding values become the tags' children.

For example, the JavaScript object:

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

becomes the following XML snippet:

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

If the JavaScript object contains a property named `@`, its sub-properties are exported as attributes of the parent XML element. If the parent XML element does not have any child elements, its value is taken from a JavaScript object property named `#`.

For example, the following JavaScript object:

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

will be transformed to the following XML snippet:

```xml
<address type="home">
    <street>21st</street>
    <city>Chicago</city>
</address>
<address type="office">unknown</address>
```

This feature is also useful when customizing your RSS feeds generated for various websites.

By default, the whole result is wrapped in an `<items/>` element, while each page object is contained in an `<item/>` element. You can change this using the `xmlRoot` and `xmlRow` URL parameters when GETting your data.

## Sharing {#sharing}

You can invite other Apify users to view or modify your datasets with the [access rights](../collaboration/index.md) system. See the [full list of permissions](../collaboration/list_of_permissions.md).

### Sharing datasets between runs {#sharing-datasets-between-runs}

You can access a dataset from any [Actor](../actors/index.mdx) or [task](../actors/running/tasks.md) run as long as you know its **name** or **ID**.

To access a dataset from another run using the Apify SDK, open it using the [`Actor.openDataset(datasetIdOrName)`](/sdk/js/api/apify/class/Actor#openDataset) method like you would do with any other dataset.

```js
const otherDataset = await Actor.openDataset('old-dataset');
```

In the [JavaScript API client](/api/client/js), you can access a dataset using [its client](/api/client/js/reference/class/DatasetClient). Once you've opened the dataset, read its contents and add new data like you would do with a dataset from your current run.

```js
const otherDatasetClient = apifyClient.dataset('jane-doe/old-dataset');
```

Likewise, in the [Python API client](/api/client/python), you can access a dataset using [its client](/api/client/python/reference/class/DatasetClient).

```python
other_dataset_client = apify_client.dataset('jane-doe/old-dataset')
```

The same applies for the [Apify API](#apify-api) - you can use [the same endpoints](#apify-api) as you would normally do.

See the [Storage overview](/platform/storage#sharing-storages-between-runs) for details on sharing storages between runs.

## Limits {#limits}

* Tabulated data storage formats (the ones that display the data in columns), such as HTML, CSV, and EXCEL, have a maximum limit of **3000** columns. All data that do not fit into this limit will not be retrieved.

* When using the `pushData()` method, the size of the data is limited by the receiving API. Therefore, `pushData()` will only allow objects whose JSON representation is smaller than **9MB**. When an array is passed, none of the included objects may be larger than 9MB, however the array itself may be of any size.

* Dataset names can be up to 63 characters long.

## Rate limiting {#rate-limiting}

To safeguard Apify servers from overloading, all API endpoints limit their rate of requests. The default rate limit is **30** requests per second per storage object. However, there are a few exceptions with a higher limit of **200** requests per second per storage object:

* [Push items](/api/v2#/reference/datasets/item-collection/put-items) to dataset.
* CRUD ([add](/api/v2#/reference/request-queues/request-collection/add-request),
[get](/api/v2#/reference/request-queues/request-collection/get-request),
[update](/api/v2#/reference/request-queues/request-collection/update-request),
[delete](/api/v2#/reference/request-queues/request-collection/delete-request))
operations of **request queue** requests.

If a client sends too many requests, the API endpoints respond with the HTTP status code **429**, indicating `Too Many Requests`. The response body will include the following information:

```json
{
    "error": {
        "type": "rate-limit-exceeded",
        "message": "You have exceeded the rate limit of ... requests per second"
    }
}
```

Please see the [API documentation](/api/v2#/introduction/rate-limiting) for further details on what to do if you exceed the rate limit.
