---
title: Running actors
description: Start an actor from the Apify Console or via API. Learn about actor lifecycles, how to specify settings and version, provide input and resurrect finished runs.
menuTitle: Running
menuWeight: 7.1
paths:
# NOTE: IF ADDING A NEW PATH, LEAVE THE OLD ONES FOR REDIRECTS
    - actor/run
    - actor/running
    - actors/run
    - actors/running
---

# Running

You can start an Apify actor in a number of ways. One option is to start an actor from its page in [Apify Console](https://console.apify.com/actors):

![Apify developer console]({{@asset actors/images/actor-console.webp}})

You can specify options such as [build]({{@link actors/development/builds.md}}), timeout, and [memory]({{@link actors/running/memory_and_cpu.md}}) for your actor run.

<!-- Using an HTML table because it doesn't have a header - markdown doesn't allow tables with no headers -->
<table>
    <tr>
        <td>Build</td>
        <td>Tag or number of the build to run (e.g. **latest** or **1.2.34**).</td>
    </tr>
    <tr>
        <td>Timeout</td>
        <td>Timeout for the actor run in seconds. Zero value means there is no timeout.</td>
    </tr>
    <tr>
        <td>Memory</td>
        <td>Amount of memory allocated for the actor run, in megabytes.</td>
    </tr>
</table>

Actors can also be invoked using the Apify API, by sending a HTTP POST request to the [Run actor](/api/v2/#/reference/actors/run-collection/run-actor) endpoint, such as:

```text
https://api.apify.com/v2/acts/apify~hello-world/runs?token=<YOUR_API_TOKEN>
```

An actor's input and its content type can be passed as a payload of the POST request and additional options can be specified using URL query parameters. For more details, see the [Run actor](https://docs.apify.com/api/v2/#/reference/actors/run-collection/run-actor) section in the API reference.

Actors can also be invoked programmatically from other actors:

- JavaScript: using the [`call()`](https://sdk.apify.com/docs/api/apify#apifycallactid-input-options) function provided by the [`apify`](https://sdk.apify.com/) NPM package.
- Python: using the [`call()`](https://docs.apify.com/apify-client-python#actorclient-call) function provided by the [`apify-client`](https://docs.apify.com/apify-client-python) Python package.

```marked-tabs

<marked-tab header="NodeJS" lang="javascript">

const run = await Apify.call('apify/hello-world', {
    message: 'Hello!',
});
console.dir(run.output);

</marked-tab>


<marked-tab header="Python" lang="python">

run = apify_client.actor('apify/hello-world').call(run_input={ 'message': 'Hello!' })
print(run['id'])

</marked-tab>

```

The newly started actor runs under the same user account as the initial actor and therefore all resources consumed are charged to the same user account. This allows more complex actors to be built using simpler actors built and owned by other users.

Internally, the `call()` function takes the user's API token from the `APIFY_TOKEN` environment variable, then it invokes the [Run actor](https://docs.apify.com/api/v2/#/reference/actors/run-collection/run-actor) API endpoint, waits for the actor to finish and reads its output using the [Get record](https://docs.apify.com/api/v2/#/reference/key-value-stores/record/get-record) API endpoint.

## Resource limits

Actors run inside a Docker container whose resources are limited. When invoking the actor, the caller has to specify the amount of memory allocated for the actor. The amount of memory can be set to a power of 2 with a minimum of 128 MB, i.e., 256 MB, 512 MB, 1024 MB, 2048 MB, ..., 32768 MB.

Additionally, each user has a certain total limit of memory for running actors. The sum of memory allocated for all running actors and builds needs to fit into this limit, otherwise the user cannot start a new actor. For more details, see [Limits]({{@link actors/limits.md}}).

The share of CPU is computed automatically from the memory as follows: for each 4096 MB of memory, the actor gets 1 full CPU core. For other amounts of memory the number of CPU cores is computed fractionally. For example, an actor with 1024 MB of memory will have a 1/4 share of a CPU core.

The actor has hard disk space limited by twice the amount of memory. For example, an actor with 1024 MB of memory will have 2048 MB of disk available.

## Lifecycle

Each run starts with the initial status **READY** and goes through one or more transitional statuses to one of the terminal statuses.

|Status|Type|Description|
|--- |--- |--- |
|READY|initial|Started but not allocated to any worker yet|
|RUNNING|transitional|Executing on a worker|
|SUCCEEDED|terminal|Finished successfully|
|FAILED|terminal|Run failed|
|TIMING-OUT|transitional|Timing out now|
|TIMED-OUT|terminal|Timed out|
|ABORTING|transitional|Being aborted by user|
|ABORTED|terminal|Aborted by user|

## Aborting runs

You can abort runs with the statuses **READY**, **RUNNING**, or **TIMING-OUT** in two ways:

- Abort run - immediately abort the actor run. This is the default option.
- Gracefully abort run - the actor run receives a signal about aborting via the `aborting` and `persistState` events and is force-aborted after 30 seconds. This is helpful in cases where you plan to resurrect the run later because it saves the actor's state. When resurrected, the actor can re-start where it left off.

You can abort a run in the Apify Console using the **Abort** button or via API using the [Abort run](/api/v2#/reference/actor-runs/abort-run/abort-run) endpoint.

## Resurrection of finished run

Any actor run in terminal state, i.e. run with status **FINISHED**, **FAILED**, **ABORTED** and **TIMED-OUT**, might be resurrected back to a **RUNNING** state. This is helpful in many cases, for example when the timeout for actor run was too low or in case of an unexpected error.

The whole process of resurrection looks as follows:

- Run status will be updated to **RUNNING** and its container will be restarted with the same storages (the same behavior as when the run gets migrated to the new server).
- Existing run log will be discarded. If you need to backup it then please download it before you resurrect this run.
- Updated duration will include the time when actor was not running. This does not affect compute units consumption.
- Timeout will be counted from the point when this actor run was resurrected.

Resurrection can be performed in Apify Console using the **resurrect** button or via API using the [resurrect run](https://docs.apify.com/api/v2#/reference/actors/resurrect-run) API endpoint.

## Container web server

Each actor run is assigned a unique hard-to-guess URL (e.g. `kmdo7wpzlshygi.runs.apify.net`), which enables HTTP access to an optional web server running inside the actor run's Docker container. The URL is available in the following places:

- In the web application, on the actor run details page as the **Container URL** field.
- In the API as the `containerUrl` property of the [Run object](https://docs.apify.com/api/v2#/reference/actors/run-object/get-run).
- In the actor run's container as the **APIFY_CONTAINER_URL** environment variable.

The web server running inside the container must listen at the port defined by the `APIFY_CONTAINER_PORT` environment variable (typically 4321). If you want to use another port, simply define the **APIFY_CONTAINER_PORT** environment variable with the desired port number in your actor version configuration - see [Custom environment variable]({{@link actors/development/source_code.md#custom-environment-variables}}) for details.

The following example demonstrates how to start a simple web server in your actor:

```js
import { Actor } from 'apify';
import express from 'express';

const app = express();
const port = process.env.APIFY_CONTAINER_PORT;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => console.log(`Web server is listening
    and can be accessed at
    ${process.env.APIFY_CONTAINER_URL}!`));

await Actor.init();

// Let the actor run for an hour.
await new Promise(r => setTimeout(r, 60 * 60 * 1000));

await Actor.exit();
```

## Data retention

An actor run is deleted along with its default storages (key-value store, dataset, request queue) after a data retention period which is based on your [subscription plan](https://apify.com/pricing).

## Sharing

You can share your actor runs with other Apify users via the [access rights]({{@link access_rights.md}}) system. [See the full list of permissions]({{@link access_rights/list_of_permissions.md}}).
