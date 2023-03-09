---
title: Environment variables
description: Learn how to provide your actor with context that determines its behavior through a plethora of pre-defined environment variables offered by the Apify SDK.
slug: /actors/development/environment-variables
---

# Environment variables {#environment-variables}

**Learn how to provide your actor with context that determines its behavior through a plethora of pre-defined environment variables offered by the Apify SDK.**

---

Aside from [custom environment variables](./source_code.md), the actor's process has several environment variables set to provide it with context:

| Environment Variable               | Description                                                                                                                                                                                                                |
|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIFY_ACTOR_ID`                   | ID of the actor.                                                                                                                                                                                                           |
| `APIFY_ACTOR_RUN_ID`               | ID of the actor run.                                                                                                                                                                                                       |
| `APIFY_ACTOR_BUILD_ID`             | ID of the actor build used in the run.                                                                                                                                                                                     |
| `APIFY_ACTOR_BUILD_NUMBER`         | Build number of the actor build used in the run.                                                                                                                                                                           |
| `APIFY_ACTOR_TASK_ID`              | ID of the actor task. It's empty if actor is run outside of any task, e.g. directly using the API.                                                                                                               |
| `APIFY_ACTOR_EVENTS_WS_URL`        | Websocket URL where actor may listen for events from Actor platform. See [documentation](/sdk/js/api/apify/class/PlatformEventManager) for more information.                                       |
| `APIFY_DEFAULT_DATASET_ID`         | ID of the dataset where you can push the data.                                                                                                                                                                        |
| `APIFY_DEFAULT_KEY_VALUE_STORE_ID` | ID of the key-value store where the actor's input and output data are stored.                                                                                                                                    |
| `APIFY_DEFAULT_REQUEST_QUEUE_ID`   | ID of the request queue that stores and handles requests that you enqueue.                                                                                                                                            |
| `APIFY_INPUT_KEY`                  | The key of the record in the default key-value store that holds the actor input. Typically it's **INPUT**, but it might be something else.                                                             |
| `APIFY_HEADLESS`                   | If set to **1**, the web browsers inside the actor should run in headless mode because there is no windowing system available.                                                                              |
| `APIFY_IS_AT_HOME`                 | Is set to **1** if the actor is running on Apify servers.                                                                                                                                                             |
| `APIFY_MEMORY_MBYTES`              | Indicates the size of memory allocated for the actor run, in megabytes. It can be used by actors to optimize their memory usage.                                                                       |
| `APIFY_PROXY_PASSWORD`             | The [Apify Proxy](../../proxy/index.md) password of the user who started the actor.                                                                                                                                            |
| `APIFY_STARTED_AT`                 | Date when the actor was started.                                                                                                                                                                                           |
| `APIFY_TIMEOUT_AT`                 | Date when the actor will time out.                                                                                                                                                                                         |
| `APIFY_TOKEN`                      | The API token of the user who started the actor.                                                                                                                                                                      |
| `APIFY_USER_ID`                    | ID of the user who started the actor. Note that it might be different than the owner of the actor.                                                                                                               |
| `APIFY_CONTAINER_PORT`             | TCP port on which the actor can start a HTTP server to receive messages from the outside world. See [Container web server](../running/index.md) section for more details. |
| `APIFY_CONTAINER_URL`              | A unique public URL under which the actor run web server is accessible from the outside world. See [Container web server](../running/index.md) section for more details.  |


Dates are always in the UTC timezone and are represented in simplified extended ISO format ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)), e.g. **2022-07-13T14:23:37.281Z**.

To access environment variables in Node.js, use the `process.env` object, for example:

```js
console.log(process.env.APIFY_USER_ID);
```

To access environment variables in Python, use the `os.environ` dictionary, for example:

```python
import os
print(os.environ['APIFY_USER_ID'])
```
