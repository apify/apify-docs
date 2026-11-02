---
title: Develop Server Actors
sidebar_label: Server interface
description: Develop Server Actors that run a persistent HTTP server, choose multi-tenant or single-tenant hosting, and serve fast real-time API responses to callers.
slug: /actors/development/programming-interface/standby
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

While a standard Actor runs a single job and stops, a Server Actor (formerly an Actor in Standby mode) runs a persistent HTTP server and responds to incoming requests in real time. Every Actor has an input interface, where users give it an input and start a run. A Server Actor also has a server interface, where users call its URL and get a response straight back.

A Server Actor is either multi-tenant or single-tenant:

- A multi-tenant Server Actor runs in your account and serves all its callers from shared runs. Callers pay for events, and you cover the platform usage.
- A single-tenant Server Actor starts a separate run in each caller's account, and the caller pays for the platform usage.

Most of this page applies to both. The sections on [tenancy](#choose-the-tenancy) and [migration](#migrate-an-actor-to-multi-tenant) cover multi-tenant, and [Single-tenant Server Actors](#single-tenant-server-actors) covers what differs for single-tenant.

For the caller's view, including endpoints, authentication, scaling, configuration, and billing, see [Server Actors](../../running/actor_standby.md). To charge callers of a multi-tenant Server Actor, see [Monetize multi-tenant Server Actors](/actors/monetize/server-actors).

## Start with a template

The fastest way to build a Server Actor is to create it from a Server Actor template, in [Apify Console](https://console.apify.com/actors/templates) or with `apify create` in the [Apify CLI](https://docs.apify.com/cli/). The templates contain minimal JavaScript, TypeScript, or Python code, and the server interface is enabled with default settings.

## Enable the server interface

For an existing Actor, you can enable the server interface in Apify Console or in the Actor's source code.

### In Apify Console

To enable or change the server interface, open the **Settings** tab of the Actor and find the **Server** section.

### In the source code

You can enable the server interface by setting the [`usesStandbyMode`](../actor_definition/actor_json.md) property to `true` in the `.actor/actor.json` file. When you push the Actor with the [Apify CLI](https://docs.apify.com/cli/), the setting syncs to the platform.

## Choose the tenancy

Tenancy decides whose account runs your Actor. A multi-tenant Server Actor serves all callers from runs in your account. A single-tenant Server Actor starts a run in each caller's account. To decide which one fits your Actor, see [Check whether your Actor fits](#check-whether-your-actor-fits).

Before you switch an Actor to multi-tenant, make sure that:

- The Actor uses the [pay-per-event pricing model](/actors/monetize/pay-per-event).
- The server interface is enabled.

To switch the tenancy:

1. In [Apify Console](https://console.apify.com), open the Actor and go to **Settings** > **Server**.
1. Set **Server tenancy** to **Multi-tenant** and confirm.

:::caution The switch applies to all callers at once

The change takes effect within 2 minutes for everyone already calling your Actor. Their next request goes to a run in your account instead of a run in theirs. Nothing is queued or staged, so switch only when your account can carry the traffic. Switching back to single-tenant takes effect the same way.

:::

## Run an HTTP server

A Server Actor must run an HTTP server that listens on a specific port. The platform proxies user requests to that server. Requests can use any [HTTP request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), such as GET, POST, PUT, or DELETE, and pass input in the [query string](https://en.wikipedia.org/wiki/Query_string) or the [request body](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#body).

### Get the port

The server must listen on the port defined by the `ACTOR_WEB_SERVER_PORT` environment variable. If you use the Apify SDK, read the port from the Actor configuration instead: the option is named `containerPort` in JavaScript and `web_server_port` in Python.

If your server must listen on a specific port that you can't change in code, define `ACTOR_WEB_SERVER_PORT` as a custom [environment variable](./environment_variables.md) of the Actor, with that port as the value. The platform then proxies the requests to your port.

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

Describe your Actor's endpoints, their parameters, and responses with a [web server schema](../actor_definition/web_server_schema/index.md) defined in the [`.actor/actor.json`](../actor_definition/actor_json.md) file. Based on that definition, Apify Console renders an interactive **Server** tab on the Actor's detail page, where users can browse the endpoints and send requests directly from the browser. Describe the endpoints in your Actor's [README](../../publishing/publish/actor-readme.mdx) as well, because users see the README in Apify Store before they open the Actor's detail page.

## Run lifecycle

The platform starts and stops Server Actor runs based on the incoming request load. It stops a run that receives no requests within the idle timeout and starts a new run when requests arrive again. Don't keep data only in the run's memory. Persist anything you need to a [dataset or key-value store](../../../storage/index.md). For details, see [how scaling works](../../running/actor_standby.md#automatic-scaling), [the server configuration](../../running/actor_standby.md#server-configuration), and [the timeouts and rate limits](../../running/actor_standby.md#limits-and-scaling) that apply to incoming requests.

For a multi-tenant Server Actor, the platform keeps separate pools of runs for paying callers, free callers, and your own requests, and routes each request to one of them. For how the pools affect billing, see [How requests reach your runs](/actors/monetize/server-actors#how-requests-reach-your-runs). All pools run in your account and count against its memory and concurrent run limits, so set the server configuration to match the traffic you expect.

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

Users can still start a Server Actor through its input interface, for example from Apify Console or through the API. To find out which interface started the run, read the `metaOrigin` option in `Actor.config`, or the `APIFY_META_ORIGIN` environment variable if you don't use the Apify SDK. The value `STANDBY` means the server interface started the run. Otherwise, the input interface started it.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```javascript
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
            ...  # Start your HTTP server here
        else:
            ...  # Perform the standard Actor operations here
```

</TabItem>
</Tabs>

## Get the server interface URL

Each Server Actor has a URL that stays the same for all of its runs. The URL is exposed as the `ACTOR_STANDBY_URL` environment variable and as the `standbyUrl` option in `Actor.config`.

Unlike the server interface URL, the [container web server](./container_web_server.md) URL changes with every run. For the URL formats and where users find them, see [Get the server interface URL](../../running/actor_standby.md#get-the-server-interface-url).

Requests to the server interface URL require an Apify API token. See [how to authenticate requests](../../running/actor_standby.md#authenticate-requests). If your Actor exposes an MCP server, define the endpoint path with the [`webServerMcpPath`](../actor_definition/actor_json.md) property. For details, see [Use Server Actors as MCP servers](../../running/actor_standby.md#use-server-actors-as-mcp-servers).

## Monetize Server Actors

Monetize Server Actors with the [pay-per-event pricing model](/actors/monetize/pay-per-event). How you charge depends on the tenancy:

- A multi-tenant Server Actor must use pay-per-event pricing. It charges each request instead of each run, and you cover the platform usage of its runs. See [Monetize multi-tenant Server Actors](/actors/monetize/server-actors).
- A single-tenant Server Actor charges events like a standard run, and users cover both the platform usage costs of their runs and the event costs.

## Migrate an Actor to multi-tenant

Most Actors need two changes to become multi-tenant: pay-per-event pricing, and charging per request instead of per run. This applies whether your Actor already has the server interface or not.

### Check whether your Actor fits

Multi-tenant pays off when many different callers send the same small piece of work. Your Actor is a good fit when:

- Many distinct callers use it. Every caller who would have started their own run now shares yours, so the savings grow with the number of callers.
- One request returns one answer, such as a profile lookup, a price check, a search query, or an MCP tool call.
- The work is short and the startup is long. If your median run lasts one to three seconds, callers mostly wait for the container to start, and runs that are already warm remove that wait.
- The Actor is idle between calls. With shared runs, the same traffic keeps a few runs busy instead of many runs idle.

Keep the Actor single-tenant when:

- It runs long batch jobs, such as a crawl that runs for 20 minutes and writes thousands of results.
- Callers put their own API keys, cookies, or account details in the input. They need their own run.
- State belongs to one caller, such as a per-organization web app or a session tied to one user.
- It doesn't use pay-per-event pricing. Migrate the pricing first.

### Migrate a standard Actor

1. Run an HTTP server on the port from `ACTOR_WEB_SERVER_PORT`, and set `usesStandbyMode` to `true`. See [Run an HTTP server](#run-an-http-server).
1. Branch on how the run started. See [Determine which interface started the Actor](#determine-which-interface-started-the-actor).
1. Describe your endpoints. See [Describe your endpoints](#describe-your-endpoints).
1. Charge each request. See [Charge for a request](/actors/monetize/server-actors#charge-for-a-request).
1. Switch the tenancy to multi-tenant. See [Choose the tenancy](#choose-the-tenancy).

Your input schema keeps working, so users can still run the Actor through its input interface.

### Migrate a single-tenant Server Actor

Your Actor already runs an HTTP server, so the migration is mostly about how you charge. In single-tenant, one run belongs to one caller, so the run knows whom to charge. In multi-tenant, one run serves many callers, so each charge has to name the request it's for. See [Charge for a request](/actors/monetize/server-actors#charge-for-a-request).

Before you switch an Actor that already has callers:

- Make your code support both ways of charging until the switch takes effect.
- Check that your plan has enough memory and concurrent runs to serve all your callers.
- Review the max requests per run, desired requests per run, and idle timeout settings. In single-tenant, each caller brought their own run, so these settings barely mattered. In multi-tenant, they decide how much traffic your runs absorb and what it costs you.
- Tell users who created tasks of your Actor that those tasks stop serving requests to the server interface. Tasks that run the Actor through its input interface keep working.

### Test the change

The tenancy applies to the whole Actor as soon as you confirm it. To test before your callers see the change:

- Build your changes under a [build tag](../builds_and_runs/builds.md) other than the one in the **Build** setting. Callers don't get the changes until you point the setting at the new tag. This prepares the code, but it doesn't test the multi-tenant path, because the tenancy applies to every build.
- Create a second, private Actor from the same source, enable the server interface and multi-tenant there, and send test requests to its URL. Once it behaves as expected, build the same changes into the original Actor and switch its tenancy. Don't publish the copy.

## Single-tenant Server Actors

A single-tenant Server Actor starts a separate run in each caller's account, and the caller pays for the platform usage of that run. Callers can override your server configuration by creating a task.

To enforce the same server configuration for all callers, enable **Prevent users from overriding server settings** in the **Server** section of the Actor's **Settings** tab. Users then can't override it by creating a task.

A single-tenant Server Actor charges events like a standard run, as described in [Pay-per-event pricing model](/actors/monetize/pay-per-event).
