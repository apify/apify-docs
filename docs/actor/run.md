---
title: Run
---

## [](#run)Run

The actor can be invoked in a number of ways. One option is to start the actor manually in **Console** in the app:

![Apify actor run console]({{@asset actor/images/run-console.png}})

The following table describes the run settings:

|||
|--- |--- |
|**Build**|Tag or number of the build to run (e.g. `latest` or `1.2.34`).|
|**Timeout**|Timeout for the actor run in seconds. Zero value means there is no timeout.|
|**Memory**|Amount of memory allocated for the actor run, in megabytes.|
|**Input**|Input data for the actor. The maximum length is 1M characters.|
|**Content type**|Indicates what kind of data is in the input (e.g. `application/json`).|


The owner of the actor can specify default values for all the above settings in the **Default run configuration** section in the app. If the actor caller does not specify a particular setting, the default value is used.

The actor can also be invoked using the Apify API by sending a HTTP POST request to the [Run actor](https://apify.com/docs/api/v2/#/reference/actors/run-collection/run-actor) API endpoint, such as:

    https://api.apify.com/v2/acts/apify~hello-world/runs?token=<YOUR_API_TOKEN>

The actor's input and its content type can be passed as a payload of the POST request and additional options can be specified using URL query parameters. For more details, see the [Run actor](https://apify.com/docs/api/v2/#/reference/actors/run-collection/run-actor) section in the API reference.

Actors can also be invoked programmatically from other actors using the [`call()`](https://sdk.apify.com/docs/api/apify#module_Apify.call) function provided by the [`apify`](https://sdk.apify.com/) NPM package. For example:

    const run = await Apify.call('apify/hello-world', { message: 'Hello!' });
    console.dir(run.output);

The newly started actor runs under the same user account as the initial actor and therefore all resources consumed are charged to the same user account. This allows more complex actors to be built using simpler actors built and owned by other users.

Internally, the `call()` function takes the user's API token from the `APIFY_TOKEN` environment variable, then it invokes the [Run actor](https://apify.com/docs/api/v2/#/reference/actors/run-collection/run-actor) API endpoint, waits for the actor to finish and reads its output using the [Get record](https://apify.com/docs/api/v2/#/reference/key-value-stores/record/get-record) API endpoint.

### [](#input-output)Input and output

As demonstrated in the hello world example above, actors can accept input and generate output. Both input and output are stored in a key-value store that is created when the actor is started, under the `INPUT` and `OUTPUT` keys, respectively. Note that the actor can store other values under arbitrary keys, for example crawling results or screenshots of web pages.

The key-value store associated with the actor run can be conveniently accessed using the [`getValue()`](https://sdk.apify.com/docs/api/apify#module_Apify.getValue) and [`setValue()`](https://sdk.apify.com/docs/api/apify#module_Apify.setValue) functions provided by the `apify` NPM package. Internally, these functions read the ID of the key-value store from the `APIFY_DEFAULT_KEY_VALUE_STORE_ID` environment variable and then access the store using the Apify API. For more details about the key-value stores, go to the [Storage]({{@link storage/index.md}}) section.

The input can be passed to the actor either manually in the Console or using a POST payload when running the actor using API. See [Run]({{@link actor/run.md}}) section for details.

### [](#run-env-vars)Environment variables

Aside from [custom environment variables]({{@link actor/source_code.md#source-env-vars}}), the actor's process has several environment variables set to provide it with context:

|||
|--- |--- |
|`APIFY_ACTOR_ID`|ID of the actor.|
|`APIFY_ACTOR_RUN_ID`|ID of the actor run.|
|`APIFY_ACTOR_TASK_ID`|ID of the actor task. It's empty if actor is run outside of any task, e.g. directly using the API.|
|`APIFY_ACTOR_EVENTS_WS_URL`|Websocket URL where actor may listen for events from Actor plaform. See [documentation](https://sdk.apify.com/docs/api/apify#module_Apify.events) for more information.|
|`APIFY_DEFAULT_DATASET_ID`|ID of the dataset where you can push the data.|
|`APIFY_DEFAULT_KEY_VALUE_STORE_ID`|ID of the key-value store where the actor's input and output data is stored.|
|`APIFY_DEFAULT_REQUEST_QUEUE_ID`|ID of the request queue that stores and handles requests that you enqueue.|
|`APIFY_INPUT_KEY`|The key of the record in the default key-value store that holds the actor input. Typically it's `INPUT`, but it might be something else.|
|`APIFY_HEADLESS`|If set to `1`, the web browsers inside the actor should run in the headless mode because there is no windowing system available.|
|`APIFY_IS_AT_HOME`|Returns `1` if the act is running on Apify servers.|
|`APIFY_MEMORY_MBYTES`|Indicates the size of memory allocated for the actor run, in megabytes. It can be used by actors to optimize their memory usage.|
|`APIFY_PROXY_PASSWORD`|The [Apify Proxy](/docs/proxy) password of the user who started the actor.|
|`APIFY_STARTED_AT`|Date when the actor was started.|
|`APIFY_TIMEOUT_AT`|Date when the actor will time out.|
|`APIFY_TOKEN`|The API token of the user who started the actor.|
|`APIFY_USER_ID`|ID of the user who started the actor. Note that it might be different than the owner of the actor.|
|`APIFY_CONTAINER_PORT`|TCP port on which the actor can start a HTTP server to receive messages from the outside world. See [Container web server]({{@link actor/run.md#container-web-server}}) section for more details.|
|`APIFY_CONTAINER_URL`|A unique public URL under which the actor run web server is accessible from the outside world. See [Container web server]({{@link actor/run.md#container-web-server}}) section for more details.|


Dates are always in the UTC timezone and are represented in simplified extended ISO format ([ISO 8601 _open_in_new_](https://en.wikipedia.org/wiki/ISO_8601)), e.g. `2017-10-13T14:23:37.281Z`

To access environment variables in Node.js, use the `process.env` object, for example:

    console.log(process.env.APIFY_USER_ID);

### [](#resource-limits)Resource limits

Actors run inside a Docker container whose resources are limited. When invoking the actor, the caller has to specify the amount of memory allocated for the actor. Additionally, each user has a certain total limit of memory for running actors. The sum of memory allocated for all running actors and builds needs to fit into this limit, otherwise the user cannot start a new actor. For more details, see [Limits]({{@link actor/limits.md}}).

The share of CPU is computed automatically from the memory as follows: for each 4096 MB of memory, the actor gets 1 full CPU core. For other amounts of memory the number of CPU cores is computed fractionally. For example, an actor with 1024 MB of memory will have a 1/4 share of a CPU core.

The actor has hard disk space limited by twice the amount of memory. For example, an actor with 1024 MB of memory will have 2048 MB of disk available.

### [](#state-persistence)State persistence

Unlike traditional serverless platforms, actors have no limits on the duration of an actor run. However, that means that an actor might need to be restarted from time to time, e.g. when the server it's running on is to be shutdown. Actors need to account for this possibility. For short-running actors, the chance of a restart is quite low and the cost of repeated runs is low, so restarts can be ignored. However, for long-running actors a restart might be very costly and therefore such actors should periodically persist their state, possibly to the key-value store associated with the actor run. On start, actors should first check whether there is some state stored and if so they should continue where they left off.

### [](#run-lifecycle)Lifecycle

Each run starts with the initial status `READY` and goes through one or more transitional statuses to one of the terminal statuses.

|Status|Type|Description|
|--- |--- |--- |
|`READY`|initial|Started but not allocated to any worker yet|
|`RUNNING`|transitional|Executing on a worker|
|`SUCCEEDED`|terminal|Finished successfully|
|`FAILED`|terminal|Run failed|
|`TIMING-OUT`|transitional|Timing out now|
|`TIMED-OUT`|terminal|Timed out|
|`ABORTING`|transitional|Being aborted by user|
|`ABORTED`|terminal|Aborted by user|

### [](#run-resurrect)Resurrection of finished run

Any actor run in terminal state, i.e. run with status `FINISHED`, `FAILED`, `ABORTED` and `TIMED-OUT`, might be resurrected back to a `RUNNING` state. This is helpful in many cases, for example when the timeout for actor run was too low or any a case of an unexpected error.

The whole process of resurrection looks as follows:

*   Run status will be updated to a `RUNNING` and its container will be restarted with the same storages (the same behaviour as when the run gets migrated to the new server).
*   Existing run log will be discarded. If you need to backup it then please download it before you resurrect this run.
*   Updated duration will include the time when actor was not running. This does not affect compute units consumption.
*   Timeout will be counted from the point when this actor run was resurrected.

Resurrection can be peformed in Apify app using the **resurrect** button or via API using the [resurrect run](https://apify.com/docs/api/v2#/reference/actors/resurrect-run) API endpoint.

### [](#container-web-server)Container web server

Each actor run is assigned a unique hard-to-guess URL (e.g. `http://kmdo7wpzlshygi.runs.apify.net`), which enables HTTP access to an optional web server running inside the actor run's Docker container. The URL is available in the following places:

*   In the web application, on the actor run details page as the **Container URL** field.
*   In the API as the `containerUrl` property of the [Run object](https://apify.com/api/v2#/reference/actor/run-object/get-run).
*   In the actor run's container as the `APIFY_CONTAINER_URL` environment variable.

The web server running inside the container must listen at the port defined by the `APIFY_CONTAINER_PORT` environment variable (typically 4321). If you want to use another port, simply define the `APIFY_CONTAINER_PORT` environment variable with the desired port number in your actor version configuration - see [Custom environment variable]({{@link actor/source_code.md#source-env-vars}}) for details.

The following example demonstrates how to start a simple web server in your actor:

    const Apify = require('apify');
    const express = require('express');

    const app = express()
    const port = process.env.APIFY_CONTAINER_PORT;

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.listen(port, () => console.log(`Web server is listening and can be accessed at ${process.env.APIFY_CONTAINER_URL}!`))

    Apify.main(async () => {
        // Let the actor run for an hour.
        await Apify.utils.sleep(60 * 60 * 1000);
    });

### [](#data-retention)Data retention

Actor run gets deleted along with its default storages (key-value store, dataset, request queue) after a data retention period which is based on [subscription plan](https://apify.com/pricing) of a user.
