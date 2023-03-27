---
title: LEGACY Container web server
description: Learn about how to run a web server inside your Actor, which enables you to communicate with the outer world via both UI and API.
slug: /actors/development/container-web-server
---

**Learn about how to run a web server inside your Actor, which enables you to communicate with the outer world via both UI and API.**

---

Each actor run is assigned a unique hard-to-guess URL (e.g. `kmdo7wpzlshygi.runs.apify.net`), which enables HTTP access to an optional web server running inside the actor run's Docker container. The URL is available in the following places:

- In the web application, on the Actor run details page as the **Container URL** field.
- In the API as the `containerUrl` property of the [Run object](/api/v2#/reference/actors/run-object/get-run).
- In the Actor run's container as the **APIFY_CONTAINER_URL** environment variable.

The web server running inside the container must listen at the port defined by the `APIFY_CONTAINER_PORT` environment variable (typically 4321). If you want to use another port, simply define the **APIFY_CONTAINER_PORT** environment variable with the desired port number in your actor version configuration - see [Custom environment variable](../development/source_code.md) for details.

The following example demonstrates how to start a simple web server in your Actor:

```js
import { Actor } from 'apify';
import express from 'express';

await Actor.init();

const app = express();
const port = process.env.APIFY_CONTAINER_PORT;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => console.log(`Web server is listening
    and can be accessed at
    ${process.env.APIFY_CONTAINER_URL}!`));

// Let the actor run for an hour.
await new Promise((r) => setTimeout(r, 60 * 60 * 1000));

await Actor.exit();
```
