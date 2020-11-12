---
title: Run actor and retrieve data via API
description: Learn how to perform the most common integration workflow - run the job, wait, collect data. Start your actors and collect data from your applications.
menuWeight: 3.3
paths:
    - tutorials/run-actor-and-retrieve-data-via-API
---

# Run an actor or task and retrieve data via API

The most common [integration](https://help.apify.com/en/collections/1669767-integrating-with-apify) of Apify with your system is usually very simple. You need to run an [actor]({{@link actors.md}}) or [task]({{@link actors/tasks.md}}), wait for it to finish, then collect the [data]({{@link storage/dataset.md}}). With all the features Apify provides, new users may not be sure of the standard/easiest way to implement this. So, let's dive in you can do it.

> Don't forget to check out our [API documentation]({{@link api.md}}) with examples in different languages and live API console. I also recommend testing the API with a nice desktop client like [Postman](https://www.getpostman.com/).

The process consists of three steps:

* [Run the actor or task](#run-the-actor-or-task)

* [Wait for the run to finish](#wait-for-the-run-to-finish)

* [Collect the data](#collect-the-data)


## [](#run-the-actor-or-task) Run the actor or task

API endpoints for
[actors](https://apify.com/docs/api/v2#/reference/actors/run-collection/run-actor)
and [tasks](https://apify.com/docs/api/v2#/reference/actor-tasks/run-collection/run-task)
and their usage are essentially the same. If you are unsure of the difference between an actor and task, read about it in the [tasks]({{@link actors/tasks.md}}) docs. In brief, tasks are just pre-configured inputs for actors, nothing more.

To run (or "call" in API language) an actor/task, you will need a few things:

* Name or ID of the actor/task. The name is in the format `username~actorName` or `username~taskName`.

* Your [API token](/api/v2#/introduction/authentication). You can find it on the Integrations page in the Apify [app](https://my.apify.com/account#/integrations) (make sure it doesn't leak anywhere!).

* Possibly an input or other settings if you want to change the default values (e.g. memory or build).

The template URL for a [POST request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) to run the actor looks like this:

```text
https://api.apify.com/v2/acts/ACTOR_NAME_OR_ID/runs?token=YOUR_TOKEN
```

For tasks, we just switch the path from acts to actor-tasks:

```text
https://api.apify.com/v2/actor-tasks/TASK_NAME_OR_ID/runs?token=YOUR_TOKEN
```

If we send a correct POST request to this endpoint, the actor/task will start just as if we had pressed the **Run** button in the Apify [app](https://my.apify.com).

### [](#additional-settings) Additional settings

We can also add any settings (these will override the default settings) as additional query parameters. So if you want to change how much memory you want to allocate and which build you want to run, simply add these as parameters separated with `&`.

```text
https://api.apify.com/v2/acts/ACTOR_NAME_OR_ID/runs?token=YOUR_TOKEN&memory=8192&build=beta
```

This works almost identically for actors and tasks. However, for tasks there's no reason to provide a [build]({{@link actors/development/builds.md}}) since a task already has only one specific actor build.

### [](#input-json) Input JSON

Most actors wouldn't be much use if you could not pass any input to change their behavior. And even though each task already has an input, it is handy to be able to always overwrite with the API call.

The input of an actor or task can be any [JSON object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON), so its structure really depends only on the specific actor. This input JSON should be sent in the POST request's **body**.

If you want to run one of the major actors from [Apify Store](https://apify.com/store), you usually don't need to provide all possible input fields. Good actors have reasonable defaults for most fields.

Let's try to run the most popular actor - generic [Web Scraper](https://apify.com/apify/web-scraper).

The full input with all possible fields is [pretty long and ugly](https://apify.com/apify/web-scraper?section=example-run), so we won't show it here. As it has default values for most of its fields, we can provide just a simple JSON input.

We will send a POST request to the endpoint below and add the JSON as a body.

```text
https://api.apify.com/v2/acts/apify~web-scraper/runs?token=YOUR_TOKEN
```

This is how it can look in [Postman](https://www.getpostman.com/).

![Run an actor via API in Postman]({{@asset tutorials/images/run-actor-postman.png}})

If we press **Send**, it will immediately return some info about the run. The `status` will be either `READY` (which means that it's waiting to be allocated on a server) or `RUNNING` (99% of cases).

![Actor run info in Postman]({{@asset tutorials/images/run-info-postman.png}})

We will later use this run info JSON to retrieve the data. You can also get this info about the run with another call to the [Get run](https://apify.com/docs/api/v2#/reference/actors/run-object/get-run) endpoint.

## [](#wait-for-the-run-to-finish) Wait for the run to finish

There may be cases where we need to simply run the actor and go away. But in any kind of integration, we are usually interested in its output. We have three basic options for how to wait for the actor/task to finish.

* [Synchronous call]((#synchronous-call))

* [Webhooks](#webhooks)

* [Polling](#polling)

### [](#synchronous-call) Synchronous call

For simple and short actor runs, the synchronous call is the easiest to implement. To make the POST request wait, add the `waitForFinish` parameter. It can have a value from `0` to `300`, which is time in seconds (max wait time is 5 minutes). You can extend the example URL like this:

```text
https://api.apify.com/v2/acts/apify~web-scraper/runs?token=YOUR_TOKEN&waitForFinish=300
```

Again, the final response will be the run info object, however now its `status` should be `SUCCEEDED` or `FAILED`. If the run exceeds the `waitForFinish` duration, the `status` will still be `RUNNING`.

#### [](#run-sync-endpoint) Run-sync endpoint

There is also one special case with a limited use case. The Apify API provides a special **run-sync** endpoint for [actors](https://apify.com/docs/api/v2#/reference/actors/run-actor-synchronously/with-input) and [tasks](https://apify.com/docs/api/v2#/reference/actor-tasks/run-task-synchronously/run-task-synchronously), which will wait as in the previous case.

Its advantage over the the `waitForFinish` parameter is that you will get back the data right away, along with the info JSON as a response. This saves you one more call.

The disadvantage is that this only works if the data is stored in a [key-value store]({{@link storage/key_value_store.md}}) belonging to the run. Most of the time, you store the data in a [dataset]({{@link storage/dataset.md}}), where this endpoint does not help.

### [](#webhooks) Webhooks

If you have a server, [webhooks]({{@link webhooks.md}}) are the most elegant and flexible solution. You can simply set up a webhook for any actor or task, and that webhook sends a POST request to your server after an [event]({{@link webhooks/events.md}}) occurs.

Usually, this event is a successfully finished run, but you can also set a different webhook for failed runs, etc.

![Webhook example]({{@asset tutorials/images/webhook.png}})

The webhook will send you a [pretty complicated JSON]({{@link webhooks/actions.md#http-request}}), but usually you are only interested in the `resource` object. It is essentially the run info JSON from the previous sections. You can leave the payload template as is as for our use case, since it's what we need.

Once you receive this request from the webhook, you know the event happened and you can ask for the complete data. Don't forget to respond to the webhook with a **200** status. Otherwise, it will ping you again.


### [](#polling) Polling

There are cases where you don't have a server and the run is too long to use a synchronous call. In these cases, periodic polling of the run status is the solution.

You run the actor with the [usual API call](#run-the-actor-or-task) shown in the beginning of this article. This will run the actor and give you back the run info JSON. From this JSON, extract the `id` field. It is the ID of the actor run that you just started.

Then, you can set an interval that will poll the Apify API (let's say every 5 seconds). In every interval, you will call the [Get run](https://apify.com/docs/api/v2#/reference/actors/run-object/get-run) endpoint to retrieve the run's status. Simply replace the `RUN_ID` with the ID you extracted earlier in the following URL.

```text
https://api.apify.com/v2/acts/ACTOR_NAME_OR_ID/runs/RUN_ID
```

Once you receive a `status` of `SUCCEEDED` or `FAILED`, you know the run has finished and you can cancel the interval and [collect the data](#collect-the-data).

## [](#collect-the-data) Collect the data

Unless you have used the special [run-sync endpoint](#run-sync-endpoint) mentioned above, you will have to make one additional request to the API to retrieve the data.

The run info JSON also contains IDs of the default [dataset]({{@link storage/dataset.md}}) and [key-value store]({{@link storage/key_value_store.md}}) that are allocated separately for each run. This is usually everything you need. The fields are called `defaultDatasetId` and `defaultKeyValueStoreId`.

### [](#retrieve-a-dataset) Retrieve a dataset

If you are scraping products or any list of items with similar fields, the dataset is your storage of choice. Do not forget, though, that dataset items are immutable: you can only add to the dataset, not change its content.

Retrieving the data is simple: Send a GET request to the [Get items](https://docs.apify.com/api/v2#/reference/datasets/item-collection/get-items) endpoint and pass the `defaultDatasetId` to the URL. For a GET request to the default dataset, no token is needed.

```text
https://api.apify.com/v2/datasets/DATASET_ID/items
```

By default, it will return the data in JSON format with some metadata. The actual data are in the `items` array.

There are plenty of additional parameters that you can use. You can learn about them in the [documentation](https://docs.apify.com/api/v2#/reference/datasets/item-collection/get-items). We will only mention that you can pass a `format` parameter that transforms the response into popular formats like CSV, XML, Excel, RSS, etc.

The items are paginated, which means you can ask only for a subset of the data. Specify this using the `limit` and `offset` parameters. There is actually an overall limit of 250,000 items that the endpoint can return per request. To retrieve more, you will need to send more requests incrementing the `offset` parameter.

```text
https://api.apify.com/v2/datasets/DATASET_ID/items?format=csv&offset=250000
```

### [](#retrieve-a-key-value-store) Retrieve a key-value store

[Key-value stores]({{@link storage/key_value_store.md}}) are mainly useful if you have a single output or any kind of files that cannot be [stringified](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) such as images or PDFs.

When you want to retrieve anything from a key-value store, the `defaultKeyValueStoreId` is not enough. You also need to know the **name** of the record you want to retrieve.

If you have a single output JSON, the convention is to return this as a record named `OUTPUT` to the default key-value store. To retrieve the record's content, call [Get record](https://docs.apify.com/api/v2#/reference/key-value-stores/record/get-record) endpoint. Again, no need for a token for simple GET requests.

```text
https://api.apify.com/v2/key-value-stores/STORE_ID/records/RECORD_KEY
```

If you don't know the keys (names) of the records in advance, you can retrieve just the keys with [List keys](https://apify.com/docs/api/v2#/reference/key-value-stores/key-collection/get-list-of-keys) endpoint.

Keep in mind that you can get a maximum of 1000 keys per request, so you will need to paginate over the keys using the `exclusiveStartKey` parameter if you have more than 1000 keys. To do this, after each call, take the last record key and provide it as the `exclusiveStartKey` parameter. You can do this until you get 0 keys back.

```text
https://api.apify.com/v2/key-value-stores/STORE_ID/keys?exclusiveStartKey=myLastRecordKey
```

