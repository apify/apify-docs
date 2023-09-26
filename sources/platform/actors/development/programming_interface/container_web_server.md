---
title: Container web server
description: Learn about how to run a web server inside your Actor, which enables you to communicate with the outer world via both UI and API.
slug: /actors/development/programming-interface/container-web-server
sidebar_position: 7
---

**Learn about how to run a web server inside your Actor, which enables you to communicate with the outer world via both UI and API.**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Each Actor run is assigned a unique hard-to-guess URL (e.g. `kmdo7wpzlshygi.runs.apify.net`), which enables HTTP access to an optional web server running inside the Actor run's Docker container. The URL is available in the following places:

- In the web application, on the Actor run details page as the **Container URL** field.
- In the API as the `containerUrl` property of the [Run object](/api/v2#/reference/actors/run-object/get-run).
- In the Actor run's container as the **APIFY_CONTAINER_URL** environment variable.

The web server running inside the container must listen at the port defined by the `APIFY_CONTAINER_PORT` environment variable (typically 4321). If you want to use another port, simply define the **APIFY_CONTAINER_PORT** environment variable with the desired port number in your Actor version configuration - see [Custom environment variables](./environment_variables.md) for details.

The following example demonstrates how to start a simple web server in your Actor:

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
// npm install express
import { Actor } from 'apify';
import express from 'express';

await Actor.init();

const app = express();
const port = process.env.APIFY_CONTAINER_PORT;

app.get('/', (req, res) => {
    res.send('Hello world from Express app!');
});

app.listen(port, () => console.log(`Web server is listening
    and can be accessed at
    ${process.env.APIFY_CONTAINER_URL}!`));

// Let the Actor run for an hour
await new Promise((r) => setTimeout(r, 60 * 60 * 1000));

await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

```python
# pip install flask
import asyncio
import os
from apify import Actor
from flask import Flask

async def main():
    async with Actor:
        # Create a Flask app
        app = Flask(__name__)

        # Define a route
        @app.route('/')
        def hello_world():
            return 'Hello world from Flask app!'

        # Log the public URL
        url = os.environ.get('APIFY_CONTAINER_URL')
        Actor.log.info(f'Web server is listening and can be accessed at {url}')

        # Start the web server
        port = os.environ.get('APIFY_CONTAINER_PORT')
        app.run(host='0.0.0.0', port=port)
```

</TabItem>
</Tabs>
