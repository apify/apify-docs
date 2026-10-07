---
title: Develop Server Actors
sidebar_label: Server Actors
description: Develop single-tenant and multi-tenant Server Actors that serve HTTP requests. Configure their lifecycle, charge for events, and call other Actors.
slug: /actors/development/programming-interface/standby
sidebar_position: 9
---

Traditional Actors are designed to run a single task and then stop. They're mostly intended for batch jobs, such as when you need to perform a large scrape or data processing task.
However, in some applications, waiting for an Actor to start is not an option. Server Actors solve this problem by keeping the Actor ready
in the background, waiting for the incoming HTTP requests. In a sense, the Actor behaves like a real-time web server or standard API server.

Server Actors can be single-tenant or multi-tenant:

- Single-tenant Server Actors use separate runs for each user.
- Multi-tenant Server Actors share the developer's runs among users.

## Develop Server Actors {#developing-actors-using-standby-mode}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The best way to start developing Server Actors is to use the predefined templates in the [Console UI](https://console.apify.com/actors/templates) or in [CLI](https://docs.apify.com/cli/) via `apify create`. The templates contain minimal code to get you up to speed for development in JavaScript, TypeScript or Python. Server mode will automatically be enabled with default settings.

If you already have an existing Actor, or you just want to tweak its server configuration, you can head to the **Settings** tab of your Actor.

Server Actors must run an HTTP server listening on a specific port. The user requests will then be proxied to the HTTP server. You can use any of the existing [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) like GET, POST, PUT, DELETE, etc. You can pass the input via [HTTP request query string](https://en.wikipedia.org/wiki/Query_string) or via [HTTP request body](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#body).

Sometimes, you want the HTTP server to listen on a specific port and cannot change it yourself. You can use `ACTOR_WEB_SERVER_PORT` environment variable to override the port so that your Server Actor will work with your code.

You can get the port using the Actor configuration available in Apify SDK.
See example below with a simple Server Actor.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import http from 'http';
import { Actor } from 'apify';

await Actor.init();

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from a Server Actor!\n');
});

server.listen(Actor.config.get('containerPort'));
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from http.server import HTTPServer, SimpleHTTPRequestHandler
from apify import Actor

class GetHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b'Hello from a Server Actor!')

async def main() -> None:
    async with Actor:
        with HTTPServer(('', Actor.configuration.web_server_port), GetHandler) as http_server:
            http_server.serve_forever()
```

</TabItem>
</Tabs>

Describe your Actor's endpoints, their parameters, and responses with a [web server schema](../actor_definition/web_server_schema/index.md) defined in the [`.actor/actor.json`](../actor_definition/actor_json.md) file. Based on that definition, Apify Console renders an interactive **Endpoints** tab on the Actor's detail page, where users can browse the endpoints and send requests directly from the browser. Describe the endpoints in your Actor's [README](../../publishing/publish/actor-readme.mdx) as well, because that's what users see in Apify Store before they ever open the Actor's detail page.

### Readiness probe

Before Server Actor runs are ready to serve requests, the Apify platform checks the web server's readiness using a readiness probe.
The platform sends a GET request to the path `/` with a header `x-apify-container-server-readiness-probe`. If the header is present in the request, you can perform an early return with a simple response to prevent wasting resources.

:::note Return a response

You must return a response; otherwise, the Actor run will never be marked as ready and won't process requests.

:::

See example code below that distinguishes between "normal" and "readiness probe" requests.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import http from 'http';
import { Actor } from 'apify';

await Actor.init();

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    if (req.headers['x-apify-container-server-readiness-probe']) {
        console.log('Readiness probe');
        res.end('Hello, readiness probe!\n');
    } else {
        console.log('Normal request');
        res.end('Hello from a Server Actor!\n');
    }
});

server.listen(Actor.config.get('standbyPort'));
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from http.server import HTTPServer, SimpleHTTPRequestHandler
from apify import Actor

class GetHandler(SimpleHTTPRequestHandler):
    def do_GET(self) -> None:
        self.send_response(200)
        self.end_headers()
        if self.headers['x-apify-container-server-readiness-probe']:
            print('Readiness probe')
            self.wfile.write(b'Hello, readiness probe!')
        else:
            print('Normal request')
            self.wfile.write(b'Hello, normal request!')

async def main() -> None:
    async with Actor:
        with HTTPServer(('', Actor.configuration.standby_port), GetHandler) as http_server:
            http_server.serve_forever()
```

</TabItem>
</Tabs>

## Detect server mode {#determining-an-actor-is-started-in-standby}

Server Actors can still be started in standard mode, for example from the Console or via the API.
To find out in which mode was the Actor started, you can read the `metaOrigin` option in `Actor.config`, or the `APIFY_META_ORIGIN` environment variable in case you're not using the Apify SDK.
If it is equal to `STANDBY`, the Actor was started in server mode, otherwise it was started in standard mode.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();

if (Actor.config.get('metaOrigin') === 'STANDBY') {
    // Start your HTTP server here
} else {
    // Perform the standard Actor operations here
}
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main() -> None:
    async with Actor:
        if Actor.configuration.meta_origin == 'STANDBY':
            # Start your HTTP server here
        else:
            # Perform the standard Actor operations here
```

</TabItem>
</Tabs>

## Server Actor run lifecycle {#run-lifecycle-in-standby-mode}

The platform starts and stops Server Actor runs automatically based on the incoming request load. It stops a run that receives no requests within the configured idle timeout and starts a new run when requests arrive again. Don't keep data only in the run's memory: persist anything you need to a [dataset or key-value store](../../../storage/index.md). See [how Server Actor scaling works](../../running/actor_standby.md#is-there-any-scaling-to-accommodate-the-incoming-requests) and [how to customize the server configuration](../../running/actor_standby.md#how-do-i-customize-standby-configuration).

Apart from the [readiness probe](#readiness-probe), the platform doesn't check your server's health while the run is alive. A run ends when its process exits, when it migrates to another machine, or when it stays idle for longer than the idle timeout. A server that stays up but stops responding keeps receiving requests, so on an unrecoverable error, exit the process instead of swallowing the error.

## Timeouts

When you send a request to a Server Actor, the total timeout for receiving the first response is _5 minutes_. Before the platform forwards the request to a specific Actor run, it performs a _run selection_ process to determine the specific Actor run that will handle it. This process has internal timeout of _2 minutes_.

## Get the Server Actor URL {#get-the-url-of-the-standby-actor}

The URL is exposed as an environment variable `ACTOR_STANDBY_URL`. You can also use `Actor.config`, where the `standbyUrl` option is available.

The URL typically combines the Actor owner's username and the Actor name, for example:

```text
https://jane-doe--my-actor.apify.actor
```

The Actor also responds on a URL built from its ID, which keeps working if the Actor or its owner is renamed:

```text
https://92c4oi4fpzy7rprlf.apify.actor
```

Unlike the [container web server](./container_web_server.md) URL, which changes with every run, the Server Actor URL stays the same for all runs of the Actor. You can share it publicly or hardcode it in applications that call the Actor: copy it from the **Endpoints** tab on the Actor's detail page. Don't build the URL from the username and Actor name, because some Actors use a different hostname format.

If the Actor exposes an MCP server, its endpoint is the Server Actor URL followed by the path defined in the [`webServerMcpPath`](../actor_definition/actor_json.md) property.

Requests to the Server Actor URL require an Apify API token. See [how to authenticate your requests](../../running/actor_standby.md#how-do-i-authenticate-my-requests).

## Monetize Server Actors {#monetization-of-actors-in-standby-mode}

You can monetize Server Actors with the [pay-per-event pricing model](/actors/publishing/monetize/pay-per-event).

Single-tenant Server Actors use separate runs for each user. With pay-per-event pricing, users cover both the platform usage costs of their runs and the event costs.

For multi-tenant Server Actors that use pay-per-event pricing, callers pay for events. Platform usage for requests from paying users reduces the developer's payout, while Apify covers platform usage for requests from free users. When you call your own Actor directly, you pay for platform usage, while events only update statistics.

## Multi-tenant Server Actor request billing {#server-actor-request-billing}

These instructions apply to multi-tenant Server Actors that use pay-per-event pricing. Single-tenant Server Actors charge events like ordinary Actor runs and don't need a request ID.

A multi-tenant Server Actor run belongs to the Actor's developer, but each request can come from a different user. Apify provides an `X-Actor-Request-ID` header with a new ID for every request it forwards to your Actor.

### Charge requests

When your Actor receives a request, read its `X-Actor-Request-ID` header. To charge that request, copy the header's value into the JSON body's `requestId` field when calling the [charge events endpoint](/api/v2/post-charge-run). Authenticate with the current run's `APIFY_TOKEN` and use its `ACTOR_RUN_ID` in the endpoint path.

```json
{
    "eventName": "result",
    "count": 1,
    "requestId": "INCOMING_REQUEST_ID"
}
```

Replace `result` with a [custom event](/actors/publishing/monetize/pay-per-event#custom-events) configured in your Actor. Automatic Actor-start and dataset-item events don't charge multi-tenant Server Actor requests, so call the charge endpoint explicitly for each billable event. Include an `idempotency-key` header for each charge, as described in the endpoint reference.

### Compose multi-tenant Server Actors {#compose-server-actors}

When your multi-tenant Server Actor calls another multi-tenant Server Actor, send the request to the [receiving Actor's URL](#get-the-url-of-the-standby-actor). Authenticate with your current run's `APIFY_TOKEN`, rather than a personal API token. This identifies which Actor run made the call.

Forward your incoming `X-Actor-Request-ID` in the outgoing request's header with the same name to preserve your incoming request's pricing tier. This forwarded ID is the _parent request ID_. The pricing tier selects the corresponding event prices configured by the receiving Actor. There is no `parentRequestId` body or run-start parameter; use the header.

For example, call this helper from your HTTP request handler. Pass the receiving Actor's URL as `actorUrl` and the incoming header as `parentRequestId`:

```js
async function callDownstreamActor(actorUrl, parentRequestId) {
    const headers = {
        Authorization: `Bearer ${process.env.APIFY_TOKEN}`,
    };
    if (parentRequestId !== undefined) {
        headers['X-Actor-Request-ID'] = parentRequestId;
    }

    const response = await fetch(actorUrl, { headers });
    if (!response.ok) {
        throw new Error(`Downstream Actor returned HTTP ${response.status}`);
    }
    return response.text();
}
```

In a Node.js HTTP handler, read the parent ID from `req.headers['x-actor-request-id']`.

Forwarding the parent ID is optional. Without it, the called Actor's event pricing uses the calling developer's pricing tier instead of the tier from the parent request. Omitting the parent ID doesn't change who pays for the call.

Apify creates a new request ID for the receiving Actor, even when you forward a parent ID. The receiving Actor charges events with its own incoming ID and forwards that ID if it calls another Actor.

When an Actor calls another Actor to handle a paying user's request, the called Actor's event charges reduce the calling Actor's payout. Requests from free users don't generate developer payouts or payout deductions.

When you call your own Actor directly and it calls another developer's Actor, those event charges use your account. If both Actors belong to you, the events only update statistics.

Custom event prices set for the calling developer still apply, even when the pricing tier comes from the parent request.
