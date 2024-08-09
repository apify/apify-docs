---
title: Environment variables
description: Learn how to provide your Actor with context that determines its behavior through a plethora of pre-defined environment variables offered by the Apify SDK.
slug: /actors/development/programming-interface/environment-variables
sidebar_position: 3
---

# Environment variables in Apify

**Learn how to provide your Actor with context that determines its behavior through a plethora of pre-defined environment variables offered by the Apify SDK.**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

## System environment variables

Apify sets several system environment variables for each Actor run. These variables provide essential context and information about the Actor's execution environment.

Here's a table of key system environment variables:

| Environment Variable | Description |
|----------------------|-------------|
| `ACTOR_ID` | ID of the Actor. |
| `ACTOR_RUN_ID` | ID of the Actor run. |
| `ACTOR_BUILD_ID` | ID of the Actor build used in the run. |
| `ACTOR_BUILD_NUMBER` | Build number of the Actor build used in the run. |
| `ACTOR_TASK_ID` | ID of the Actor task. Empty if Actor is run outside of any task, e.g. directly using the API. |
| `ACTOR_EVENTS_WEBSOCKET_URL` | Websocket URL where Actor may listen for [events](/platform/actors/development/programming-interface/system-events) from Actor platform. |
| `ACTOR_DEFAULT_DATASET_ID` | Unique identifier for the default dataset associated with the current Actor run. |
| `ACTOR_DEFAULT_KEY_VALUE_STORE_ID` | Unique identifier for the default key-value store associated with the current Actor run. |
| `ACTOR_DEFAULT_REQUEST_QUEUE_ID` | Unique identifier for the default request queue associated with the current Actor run. |
| `ACTOR_INPUT_KEY` | Key of the record in the default key-value store that holds the [Actor input](/platform/actors/running/input-and-output#input).  |
| `ACTOR_MAX_PAID_DATASET_ITEMS` | For paid-per-result Actors, the user-set limit on returned results. Do not exceed this limit. |
| `APIFY_HEADLESS` | If **1**, web browsers inside the Actor should run in headless mode (no windowing system available). |
| `APIFY_IS_AT_HOME` | Contains **1** if the Actor is running on Apify servers. |
| `ACTOR_MEMORY_MBYTES` | Size of memory allocated for the Actor run, in megabytes. Can be used to optimize memory usage or finetuning of low-level external libraries. |
| `APIFY_PROXY_PASSWORD` | Password for accessing Apify Proxy services. This password enables the Actor to utilize nproxy servers on behalf of the user who initiated the Actor run. |
| `APIFY_PROXY_PORT` | TCP port number to be used for connecting to the Apify Proxy. |
| `APIFY_PROXY_STATUS_URL` | URL for retrieving proxy status information. Appending `?format=json` to this URL returns the data in JSON format for programmatic processing. |
| `ACTOR_STANDBY_PORT` | TCP port for the Actor to start an HTTP server to receive messages in the [Actor Standby](/platform/actors/development/programming-interface/standby) mode. |
| `ACTOR_STARTED_AT` | Date when the Actor was started. |
| `ACTOR_TIMEOUT_AT` | Date when the Actor will time out. |
| `APIFY_TOKEN` | API token of the user who started the Actor. |
| `APIFY_USER_ID` | ID of the user who started the Actor. May differ from the Actor owner. |
| `ACTOR_WEB_SERVER_PORT` | TCP port for the Actor to start an HTTP server on. This server can be used to receive external messages or expose monitoring and control interfaces. |
| `ACTOR_WEB_SERVER_URL` | Unique public URL for accessing the Actor run web server from the outside world. |
| `APIFY_API_PUBLIC_BASE_URL` | Public URL of the Apify API. May be used to interact with the platform programmatically. Typically set to `api.apify.com`. |
| `APIFY_DEDICATED_CPUS` | Number of CPU cores reserved for the actor, based on allocated memory. |
| `APIFY_DISABLE_OUTDATED_WARNING` | Controls the display of outdated version warnings. Set to `1` to suppress notifications about updates. |
| `APIFY_WORKFLOW_KEY` | Identifier used for grouping related runs and API calls together. |
| `APIFY_META_ORIGIN` | Specifies how an Actor run was started. Possible values are [here](/platform/actors/running/runs-and-builds#origin) |
| `APIFY_SDK_LATEST_VERSION` | Specifies the most recent release version of the Apify SDK for Javascript. Used for checking for updates. |
| `APIFY_INPUT_SECRETS_KEY_FILE` | Path to the secret key used to decryt [Secret inputs](/platform/actors/development/actor-definition/input-schema/secret-input). |
| `APIFY_INPUT_SECRETS_KEY_PASSPHRASE` | Passphrase for the input secret key specified in `APIFY_INPUT_SECRETS_KEY_FILE`. |


<!-- vale Microsoft.RangeFormat = NO -->

:::note Date format

All date-related variables use the UTC timezone and are in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format (e.g., _2022-07-13T14:23:37.281Z_).

:::
<!-- vale Microsoft.RangeFormat = YES -->

## Access environment variables

You can access environment variables in your code as follows:

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

In Node.js, use the `process.env` object:

```js
console.log(process.env.APIFY_USER_ID);
```

</TabItem>
<TabItem value="Python" label="Python">

In Python, use the `os.environ` dictionary:

```python
import os
print(os.environ['APIFY_USER_ID'])
```

</TabItem>
</Tabs>

## Use the `Configuration` class

For more convenient access to Actor configuration, use the [`Configuration`](/sdk/js/reference/class/Configuration) class

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();

// get current token
const token = Actor.config.get('token');
// use different token
Actor.config.set('token', 's0m3n3wt0k3n');

await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        old_token = Actor.config.token
        Actor.log.info(f'old_token = {old_token}')

        # use different token
        Actor.config.token = 's0m3n3wt0k3n'

        new_token = Actor.config.token
        Actor.log.info(f'new_token = {new_token}')
```

</TabItem>
</Tabs>

## Custom environment variables

Actor owners can define custom environment variables to pass additional configuration to their Actors. To set custom variables:

1. Go to your Actor's **Source** page in the Apify Console

1. Navigate to the **Environment variables** section.

1. Add your custom variables.

For sensitive data like API keys or passwords, enable the **Secret** option. This encrypt the value and redacts it from logs to prevent accidental exposure.

:::info Build-time variables

Custom environment variables are set during the Actor's build process and cannot be changed for existing builds. For more information, check out the [Builds](../builds_and_runs/builds.md) page.

:::

## Build-time environment variables

You can also use environment variables during the Actor's build process. In this case, they function as Docker build arguments. To use them in your Dockerfile, include `ARG` instruction:

```docker
ARG MY_BUILD_VARIABLE
RUN echo $MY_BUILD_VARIABLE
```

:::caution Insecure build variables

Build-time environment variables are not suitable for secrets, as they are not encrypted.

:::

By leveraging environment variables effectively, you can create more flexible and configurable Actors that adapt to different execution contexts and user requirements.
