---
title: Environment variables
description: Learn how to provide your actor with context that determines its behavior through a plethora of pre-defined environment variables offered by the Apify SDK.
paths:
    - actor/development/environment-variables
    - actors/development/environment-variables
---

# [](#environment-variables) Environment variables

Aside from [custom environment variables]({{@link actors/development/source_code.md#custom-environment-variables}}), the actor's process has several environment variables set to provide it with context:

|||
|--- |--- |
|`APIFY_ACTOR_ID`|ID of the actor.|
|`APIFY_ACTOR_RUN_ID`|ID of the actor run.|
|`APIFY_ACTOR_TASK_ID`|ID of the actor task. <br/>It's empty if actor is run outside of any task, <br/>e.g. directly using the API.|
|`APIFY_ACTOR_EVENTS_WS_URL`|Websocket URL where actor may listen <br/>for events from Actor platform. <br/>See [documentation](https://sdk.apify.com/docs/api/apify#apifyevents) for more information.|
|`APIFY_DEFAULT_DATASET_ID`|ID of the dataset where you can <br/>push the data.|
|`APIFY_DEFAULT_KEY_VALUE_STORE_ID`|ID of the key-value store where <br/>the actor's input and output data <br/>are stored.|
|`APIFY_DEFAULT_REQUEST_QUEUE_ID`|ID of the request queue that stores <br/>and handles requests that you enqueue.|
|`APIFY_INPUT_KEY`|The key of the record in <br/>the default key-value store <br/>that holds the actor input. <br/>Typically it's **INPUT**, but <br/>it might be something else.|
|`APIFY_HEADLESS`|If set to **1**, the web browsers inside <br/>the actor should run in <br/>headless mode because there is no <br/>windowing system available.|
|`APIFY_IS_AT_HOME`|Returns **1** if the actor is running <br/>on Apify servers.|
|`APIFY_MEMORY_MBYTES`|Indicates the size of memory <br/>allocated for the actor run, <br/>in megabytes. <br/>It can be used by actors <br/>to optimize their memory usage.|
|`APIFY_PROXY_PASSWORD`|The [Apify Proxy](/docs/proxy) password of the user <br/>who started the actor.|
|`APIFY_STARTED_AT`|Date when the actor was started.|
|`APIFY_TIMEOUT_AT`|Date when the actor will time out.|
|`APIFY_TOKEN`|The API token of the user <br/>who started the actor.|
|`APIFY_USER_ID`|ID of the user who started the actor. <br/>Note that it might be different <br/>than the owner of the actor.|
|`APIFY_CONTAINER_PORT`|TCP port on which the actor can <br/>start a HTTP server to receive <br/>messages from the outside world. <br/>See [Container web server]({{@link actors/running.md#container-web-server}}) section <br/>for more details.|
|`APIFY_CONTAINER_URL`|A unique public URL under which <br/>the actor run web server is accessible <br/>from the outside world. <br/>See [Container web server]({{@link actors/running.md#container-web-server}}) section <br/>for more details.|


Dates are always in the UTC timezone and are represented in simplified extended ISO format ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)), e.g. **2017-10-13T14:23:37.281Z**.

To access environment variables in Node.js, use the `process.env` object, for example:

```js
console.log(process.env.APIFY_USER_ID);
```

To access environment variables in Python, use the `os.environ` dictionary, for example:

```python
import os
print(os.environ['APIFY_USER_ID'])
```
