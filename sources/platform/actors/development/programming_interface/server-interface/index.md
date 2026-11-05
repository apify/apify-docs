---
title: Develop Server Actors
sidebar_label: Server interface
description: Develop Server Actors that run a persistent HTTP server, choose multi-tenant or single-tenant hosting, and serve fast real-time API responses to users.
slug: /actors/development/programming-interface/server-actors
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

There are two ways to use an Actor. Through the input interface, users give it an input and start a run. Through the server interface, users send an HTTP request to the Actor's URL and get the response straight back. Server Actors (formerly Actor Standby mode) are Actors with the server interface enabled. They run a persistent HTTP server and respond to requests in real time.

A Server Actor is either multi-tenant or single-tenant:

- A multi-tenant Server Actor runs in your account and serves all its users from shared runs. Users pay for events, and you or Apify cover the platform usage, depending on the user.
- A single-tenant Server Actor starts a separate run in each user's account, and the user pays for the platform usage.

Most of this page applies to both. [Choose the tenancy](#choose-the-tenancy) covers multi-tenant, and [Single-tenant Server Actors](#single-tenant-server-actors) covers what differs for single-tenant. To move an existing Actor to multi-tenant, see [Migrate an Actor to multi-tenant](./migrate-to-multi-tenant.md).

For the user's view, including endpoints, authentication, scaling, configuration, and billing, see [Server Actors](../../../running/actor_standby.md). To charge users of a multi-tenant Server Actor, see [Monetize multi-tenant Server Actors](/actors/monetize/server-actors).

## Start with a template

The fastest way to build a Server Actor is to create it from a Server Actor template, in [Apify Console](https://console.apify.com/actors/templates) or with `apify create` in the [Apify CLI](https://docs.apify.com/cli/). The templates contain minimal JavaScript, TypeScript, or Python code, and they have the server interface enabled with default settings.

## Enable the server interface

For an existing Actor, you can enable the server interface in Apify Console or in the Actor's source code.

### In Apify Console

To enable or change the server interface, open the **Settings** tab of the Actor and find the **Server** section.

### In the source code

You can enable the server interface by setting the [`usesStandbyMode`](../../actor_definition/actor_json.md) property to `true` in the `.actor/actor.json` file. When you push the Actor with the [Apify CLI](https://docs.apify.com/cli/), the setting syncs to the platform.

## Choose the tenancy

Tenancy decides whose account runs your Actor. A multi-tenant Server Actor serves all users from runs in your account. A single-tenant Server Actor starts a run in each user's account.

### Check whether your Actor fits

Multi-tenant pays off when many different users send the same small piece of work. Your Actor is a good fit when:

- Many distinct users call it. Every user who would have started their own run now shares yours, so the savings grow with the number of users.
- One request returns one answer, such as a profile lookup, a price check, a search query, or an MCP tool call.
- The work is short and the startup is long. If your median run lasts 1 to 3 seconds, users mostly wait for the container to start, and runs that are already warm remove that wait.
- The Actor is idle between calls. With shared runs, the same traffic keeps a few runs busy instead of many runs idle.

Keep the Actor single-tenant when:

- Users put their own API keys, cookies, or account details in the input. They need their own run.
- State belongs to one user, such as a per-organization web app or a login session.
- It uses a pricing model other than pay per event or pay per usage. Migrate the pricing first.

Long batch jobs, such as a crawl that runs for 20 minutes and writes thousands of results, suit the input interface in either tenancy. Keep the input interface for them alongside the server interface.

### Switch the tenancy

If the Actor already has users, or doesn't have the server interface yet, follow [Migrate an Actor to multi-tenant](./migrate-to-multi-tenant.md) first.

Before you switch an Actor to multi-tenant, make sure that:

- The Actor uses the [pay-per-event pricing model](/actors/monetize/pay-per-event) or [pay per usage](/actors/monetize#pricing-models). Pay per event is the only way to earn from a multi-tenant Server Actor. With pay per usage, users pay nothing, and you pay for its platform usage.
- The server interface is enabled.

To switch the tenancy:

1. In [Apify Console](https://console.apify.com), open the Actor and go to **Settings** > **Server**.
1. Set **Server tenancy** to **Multi-tenant** and confirm.

:::caution The switch applies to all users at once

The change takes effect within 2 minutes for everyone already calling your Actor. Their next request goes to a run in your account instead of a run in theirs. The platform doesn't queue or stage the change, so switch only when your account can handle the traffic. Switching back to single-tenant takes effect the same way.

:::

## Configure the server

The server configuration decides how the platform sizes and scales your Actor's runs. Set its defaults in the **Server** section of the Actor's **Settings** tab. For a multi-tenant Server Actor, the configuration applies to the runs that serve all users. For a single-tenant Server Actor, users can override it with a task, unless you [prevent it](#single-tenant-server-actors).

| Property | Description |
| --- | --- |
| Max requests per run | The maximum number of concurrent HTTP requests a single Server Actor run can accept. When a request exceeds this limit, the platform starts a new run to handle it, which can take a few seconds. |
| Desired requests per run | The number of concurrent HTTP requests a single Server Actor run is configured to handle. When requests exceed this number, the platform starts a new run ahead of time to handle the additional requests. |
| Memory (MB) | The amount of memory (RAM) allocated for the Actor's server, in megabytes. More memory usually lets the Actor handle more requests in parallel, but it also consumes more compute units and costs more. |
| Idle timeout (seconds) | If a run receives no HTTP requests within this time, the platform stops it. The next request might then need a new run, which can take a few seconds to start. A higher idle timeout improves responsiveness but costs more, because the run stays active longer. |
| Build | The Actor build that Server Actor runs use: a build tag (for example `latest`) or a build number (for example `0.1.2`). |
| Validate and pass Actor input | If enabled, the platform validates the Actor input and passes it to the run even when the run starts its server. Use it to start Server Actor runs with different configurations. If disabled, the input applies only to manual runs and testing, independent of the server interface. |

## Run an HTTP server

A Server Actor must run an HTTP server that listens on a specific port. The platform proxies incoming requests to that server. Requests can use any [HTTP request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), such as GET, POST, PUT, or DELETE, and pass input in the [query string](https://en.wikipedia.org/wiki/Query_string) or the [request body](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#body).

### Get the port

The server must listen on the port defined by the `ACTOR_WEB_SERVER_PORT` environment variable. If you use the Apify SDK, read the port from the Actor configuration instead: the option is named `containerPort` in JavaScript and `web_server_port` in Python.

If you can't change your server's port in code, define `ACTOR_WEB_SERVER_PORT` as a custom [environment variable](../environment_variables.md) of the Actor, set to that port. The platform then proxies the requests to your port.

### Example server

The example below is a minimal Server Actor.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```javascript
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

## Describe your endpoints

Describe your Actor's endpoints, their parameters, and responses with a [web server schema](../../actor_definition/web_server_schema/index.md) defined in the [`.actor/actor.json`](../../actor_definition/actor_json.md) file. Based on that definition, Apify Console renders an interactive **Server** tab on the Actor's detail page, where users can browse the endpoints and send requests directly from the browser. Describe the endpoints in your Actor's [README](../../../publishing/publish/actor-readme.mdx) as well, because users see the README in Apify Store before they open the Actor's detail page.

## Run lifecycle

The platform starts and stops Server Actor runs based on the incoming request load. It stops a run that receives no requests within the idle timeout and starts a new run when requests arrive again. Don't keep data only in the run's memory. Persist anything you need to a [dataset or key-value store](../../../../storage/index.md). For details, see [how scaling works](../../../running/actor_standby.md#automatic-scaling), [the server configuration](#configure-the-server), and [the timeouts and rate limits](../../../running/actor_standby.md#limits-and-scaling) that apply to incoming requests.

For a multi-tenant Server Actor, the platform keeps separate pools of runs for paying users, free users, and your own requests, and routes each request to one of them. For how the pools affect billing, see [How requests reach your runs](/actors/monetize/server-actors#how-requests-reach-your-runs). All pools run in your account and count against its memory and concurrent run limits, so set the server configuration to match the traffic you expect.

### Readiness probe

Before a Server Actor run serves requests, the platform checks that the web server is ready. It sends a GET request to the path `/` with the `x-apify-container-server-readiness-probe` header. When a request carries this header, you can return a simple response early to avoid wasting resources.

:::caution Return a response

Always return a response. Otherwise, the platform never marks the run as ready, and it won't process requests.

:::

The example below handles readiness probes separately from normal requests.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```javascript
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

server.listen(Actor.config.get('containerPort'));
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
        with HTTPServer(('', Actor.configuration.web_server_port), GetHandler) as http_server:
            http_server.serve_forever()
```

</TabItem>
</Tabs>

### Run termination

A run ends when its process exits, when it stays idle for longer than the idle timeout, or when the platform replaces it. During a worker migration, the platform doesn't move the run to another machine. Instead, it starts a replacement run, waits until that run is ready, then stops sending requests to the old run and aborts it.

Apart from the [readiness probe](#readiness-probe), the platform doesn't check your server's health while the run is alive. A server that stays up but stops responding keeps receiving requests, so on an unrecoverable error, exit the process instead of swallowing the error.

## Determine which interface started the Actor

Users can also start a Server Actor through its input interface, for example from Apify Console or through the API. To find out which interface started the run, read the `metaOrigin` option in `Actor.config`, or the `APIFY_META_ORIGIN` environment variable if you don't use the Apify SDK. The value `STANDBY` means the server interface started the run. Otherwise, the input interface started it.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```javascript
import { Actor } from 'apify';

await Actor.init();

if (Actor.config.get('metaOrigin') === 'STANDBY') {
    // Start your HTTP server here
} else {
    // Process the input here
}
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main() -> None:
    async with Actor:
        if Actor.configuration.meta_origin == 'STANDBY':
            ...  # Start your HTTP server here
        else:
            ...  # Process the input here
```

</TabItem>
</Tabs>

## Get the server interface URL

Each Server Actor has a URL that stays the same for all of its runs. The URL is exposed as the `ACTOR_STANDBY_URL` environment variable and as the `standbyUrl` option in `Actor.config`.

Unlike the server interface URL, the [container web server](../container_web_server.md) URL changes with every run. For the URL formats and where users find them, see [Get the server interface URL](../../../running/actor_standby.md#get-the-server-interface-url).

Requests to the server interface URL require an Apify API token. See [how to authenticate requests](../../../running/actor_standby.md#authenticate-requests). If your Actor exposes an MCP server, define the endpoint path with the [`webServerMcpPath`](../../actor_definition/actor_json.md) property. For details, see [Use Server Actors as MCP servers](../../../running/actor_standby.md#use-server-actors-as-mcp-servers).

## Identify the user

Every authenticated request to your Actor carries an `X-Apify-User-ID` header with the ID of the Apify user who sent it. The platform sets it after it validates the user's token. Use it to rate-limit, block, or count requests per user.

```javascript
http.createServer(async (req, res) => {
    const userId = req.headers['x-apify-user-id'];
    // Rate-limit, block, or count usage per user here.
    res.end('OK\n');
});
```

The header contains only the ID. Your Actor doesn't receive the user's name, email, or API token.

What the run knows about the user depends on the tenancy:

- In a single-tenant Server Actor, the run belongs to the user, and so do `APIFY_TOKEN`, `APIFY_USER_ID`, and the storages that the run creates.
- In a multi-tenant Server Actor, the run belongs to you and serves many users. `APIFY_TOKEN`, `APIFY_USER_ID`, and the storages that the run creates belong to you. The `X-Apify-User-ID` header is the only way to tell users apart, so use it to keep each user's data separate.

## Monetize Server Actors

How you monetize a Server Actor depends on its tenancy:

- For a multi-tenant Server Actor, pay-per-event pricing is the only way to earn. The Actor charges each request instead of each run, and you or Apify cover the platform usage of its runs. With pay per usage, users pay nothing, and you pay for its platform usage. See [Monetize multi-tenant Server Actors](/actors/monetize/server-actors).
- For a single-tenant Server Actor, you charge events the same way as for a run started through the input interface, as described in [Pay-per-event pricing model](/actors/monetize/pay-per-event). Unlike those runs, users always cover both the platform usage costs of their runs and the event costs.

## Single-tenant Server Actors

A single-tenant Server Actor starts a separate run in each user's account, and the user pays for the platform usage of that run. Users can override your server configuration by creating a task.

To enforce the same server configuration for all users, enable **Prevent users from overriding server settings** in the **Server** section of the Actor's **Settings** tab. Users then can't override it by creating a task. If all users get the same configuration anyway, consider [switching the Actor to multi-tenant](#switch-the-tenancy). Users then pay only for events, and their requests are more likely to reach a run that has already started.
