---
title: Container web server
description: Learn about how to run a web server inside your Actor, which enables you to communicate with the outer world via both UI and API.
slug: /actors/development/programming-interface/container-web-server
sidebar_position: 7
---

**Learn about how to run a web server inside your Actor to enable communication with the outside world through both UI and API.**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Each Actor run is assigned a unique URL (e.g. `kmdo7wpzlshygi.runs.apify.net`) that allows HTTP access to an optional web server running inside the Actor's Docker container. This feature enhances your Actor's capabilities by enabling external communication.

:::tip
The container web server provides a way how to connect to one specific Actor run. To enable using your Actor as an API, with a pre-defined hostname, load balancing and autoscaling, check out [Actor Standby](./actor_standby.md).
:::

## Access the container URL

You can find the container URL in three locations:

- In the web application, on the Actor run details page as the **Container URL** field.
- In the API as the `containerUrl` property of the [Run object](/api/v2#/reference/actors/run-object/get-run).
- In the Actor run's container as the `ACTOR_WEB_SERVER_URL` environment variable.

## Set up the web server

The web server inside the container must listen on the port specified by the `ACTOR_WEB_SERVER_PORT` environment variable (typically: _4321_). To use a different port:

1. Go to your Actor version configuration

1. Define the `ACTOR_WEB_SERVER_PORT` environment variable with your desired port number.

Check out [Custom environment variables](./environment_variables.md) for more details.

## Example: Start a simple web server

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

Here's how to start a basic web server in your Actor using Express.js:

```js
// npm install express
import { Actor } from 'apify';
import express from 'express';

await Actor.init();

const app = express();
const port = process.env.ACTOR_WEB_SERVER_PORT;

app.get('/', (req, res) => {
    res.send('Hello world from Express app!');
});

app.listen(port, () => console.log(`Web server is listening
    and can be accessed at
    ${process.env.ACTOR_WEB_SERVER_URL}!`));

// Let the Actor run for an hour
await new Promise((r) => setTimeout(r, 60 * 60 * 1000));

await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

Here's how to start a basic web server in your Actor using Flask:

```python
# pip install flask
import asyncio
import os
from apify import Actor
from apify_shared.consts import ActorEnvVars
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
        url = os.environ.get(ActorEnvVars.WEB_SERVER_URL)
        Actor.log.info(f'Web server is listening and can be accessed at {url}')

        # Start the web server
        port = os.environ.get(ActorEnvVars.WEB_SERVER_PORT)
        app.run(host='0.0.0.0', port=port)
```

</TabItem>
</Tabs>
