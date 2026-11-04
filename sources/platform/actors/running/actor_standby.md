---
title: Server Actors
description: Call Server Actors over HTTP to get real-time responses without waiting for a run to start. Learn about URLs, authentication, tenancy, limits, and billing.
sidebar_position: 7.3
slug: /actors/running/standby
sidebar_label: Server Actors
---

A standard Actor runs a single job and then stops. It works great for batch jobs, such as a large data extraction or processing task. However, some applications can't wait for an Actor to start. Server Actors (formerly Actor Standby mode) solve this with a server interface. The Actor stays ready in the background and serves incoming HTTP requests in real time, like a web server or an API server.

A Server Actor is either multi-tenant or single-tenant. A multi-tenant Server Actor runs in the developer's account and serves all its callers, while a single-tenant Server Actor starts a separate run in your account. This page describes what both have in common, then what [tenancy](#how-tenancy-affects-you) changes for you.

To build your own Server Actor, see [Develop Server Actors](../development/programming_interface/server-interface/index.md).

## Check if an Actor is a Server Actor

If an Actor has the server interface enabled, its detail page shows the **Server** tab. The tab contains the hostname of the Actor's server, and the Actor README describes the endpoints, the parameters they accept, and what they return.
If the Actor defines a [web server schema](../development/actor_definition/web_server_schema/index.md), the tab also shows an interactive list of its endpoints, where you can send requests directly from the browser.

You don't need to start the Actor. Send a request to that hostname and endpoint, and you get the results.

## Get the server interface URL

The server interface URL typically combines the Actor owner's username and the Actor name, for example:

```text
https://jane-doe--my-actor.apify.actor
```

The Actor also responds on a URL built from its ID, which keeps working if the Actor or its owner is renamed:

```text
https://92c4oi4fpzy7rprlf.apify.actor
```

The server interface URL stays the same for all runs of the Actor, so you can share it publicly or hardcode it in applications that call the Actor. Copy the URL from the **Server** tab instead of building it from the username and Actor name, because some Actors use a different hostname format, like `rag-web-browser.apify.actor`.

## Send requests to the Actor

If you use an Actor built by someone else, its README describes how to pass the input.

Server Actors behave as standard HTTP servers. Use any [HTTP request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), such as GET, POST, PUT, or DELETE, and pass the input in the [query string](https://en.wikipedia.org/wiki/Query_string) or the [request body](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#body).

## Authenticate requests

Authenticate requests to Server Actors the same way as [requests to the Apify API](../../integrations/programming/api.md). Provide your [API token](../../integrations/programming/api.md#api-token) in one of two ways:

- _(Recommended)_ Include the token in the `Authorization` header as `Bearer <token>`. This keeps the token out of server logs.

    ```bash
    curl -H "Authorization: Bearer my_apify_token" \
      https://rag-web-browser.apify.actor/search?query=apify
    ```

- Append the token to the request URL as the `token` query parameter. It's less secure, so use this option only when you can't modify the request headers.

    ```text
    https://rag-web-browser.apify.actor/search?query=apify&token=my_apify_token
    ```

The platform removes the token from the request before forwarding it, so the token doesn't reach the Actor's code. If the Actor reads the `Authorization` header for its own authentication, send your Apify token in the `X-Apify-Authorization` header instead.

Scoped tokens work for requests to Server Actors. To let a third-party service call your Actor without access to your entire account, give it a [scoped token](/integrations/api#limited-permissions) with only the permissions it needs.

:::caution Restricted access is not supported

A scoped token also has a [restricted access](/integrations/api#restricted-access-restrict-what-actors-can-access-using-the-scope-of-this-actor) option that limits what the Actor's run can access. Server Actors don't support that option.

:::

If you're developing a Server Actor, use the token from the `APIFY_TOKEN` [environment variable](../development/programming_interface/environment_variables.md#system-environment-variables) to call the Apify API, as in any other Actor.

## How tenancy affects you

The Actor's developer sets its tenancy. The Actor's detail page shows it in the **Features** section, as **Multi-tenant** or **Single-tenant**. Tenancy decides whose account runs the Actor, who pays for the platform usage, and who controls the configuration.

| Aspect | Multi-tenant | Single-tenant |
| --- | --- | --- |
| Where the runs live | The developer's account, shared by all callers | Your account, used only by you |
| Runs in your **Runs** tab | No | Yes |
| What you pay | Event charges only | Platform usage, plus event charges for pay-per-event Actors |
| Who sets the configuration | The developer | The developer, and you can override it with a task |
| Tasks | Not supported for the server interface | Supported |

When you call a multi-tenant Server Actor, no runs appear in your account. The Actor appears in your recently used Actors instead.

A multi-tenant Server Actor receives your Apify user ID in the `X-Apify-User-ID` header, so its developer can rate-limit or count requests per caller. The Actor doesn't receive your name, email, or API token, and it can't start runs or read storages in your account.

For what applies only to runs in your own account, see [Single-tenant Server Actors](#single-tenant-server-actors).

## Run the Actor through its input interface

If the Actor has an input schema, you can run it through its input interface, like a standard Actor. Modify the input in the **Input** tab and select **Start**. If the Actor has no input schema, Apify Console disables the **Input** tab. Not every Server Actor supports the input interface. If it doesn't, the run might fail, return empty results, or start its server. Check the Actor README for what the Actor supports.

Tasks of a multi-tenant Server Actor don't serve requests to the server interface. A task that runs the Actor through its input interface keeps working.

## Limits and scaling

The platform scales Server Actor runs automatically and applies timeouts and rate limits to the incoming requests.

### Automatic scaling

The platform scales the Actor to match the incoming requests. For a multi-tenant Server Actor, it starts runs in the developer's account, and the developer's configuration decides how many. For a single-tenant Server Actor, it starts runs in your account, which appear in the Actor **Runs** tab with the origin shown as **Server**. These runs aren't shared with other users, even when you use the Actor-level hostname with the default configuration.

The platform checks a run's readiness once, before the run starts serving requests, and performs no health checks after that.

:::caution Unresponsive servers aren't detected

If an Actor's server stays up but stops responding, the platform doesn't detect the failure, and requests keep going to that run. To learn how to handle this situation in your own Actors, see [Run lifecycle](../development/programming_interface/server-interface/index.md#run-lifecycle).

:::

### Request timeouts

A request to a Server Actor must receive its first response within 5 minutes. This is the overall timeout for the request.

Within this window, the platform first selects an Actor run to handle the request, which can take up to 2 minutes, for example when a new run needs to start. If no run becomes available within that time, the request fails with a `429` error.

### Rate limits

The platform rate-limits incoming requests to Server Actors per user account. The limit is the same on all standard subscription plans, and custom plans can raise it. Responses include the current limit in the `X-RateLimit-Limit` header. When you exceed the limit, the platform responds with a [`429 Too Many Requests`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429) error.

### Usage limit

If your account goes over its monthly usage hard limit, the platform rejects your new requests to Server Actors. A request that is already in progress isn't stopped.

## Billing

For a multi-tenant Server Actor, you pay only the event charges. You don't pay for the platform usage of the runs that serve you.

For a single-tenant Server Actor, you also pay for the platform usage of your runs. See [Billing of single-tenant runs](#billing-of-single-tenant-runs).

## Use Server Actors as MCP servers

If the Actor exposes a [Model Context Protocol (MCP)](../../agents/mcp.md) server, its MCP endpoint is the server interface URL followed by the path defined in the Actor's [`webServerMcpPath`](../development/actor_definition/actor_json.md) property. Apify Console shows the MCP URL in the Actor's **Server** tab. Authenticate requests to the MCP endpoint the same way as any other request to a Server Actor.

## Single-tenant Server Actors

A single-tenant Server Actor starts its runs in your account. You pay for their platform usage, and unless the developer locked it, you can change their server configuration with a task.

### Override the configuration with a task

If you use an Actor built by someone else, the Actor-level hostname always uses the developer's default [server configuration](../development/programming_interface/server-interface/index.md#configure-the-server). To override it:

1. In [Apify Console](https://console.apify.com), open the Actor and select **Save as a new task**.
1. Open the task's **Settings** tab.
1. Modify the configuration.
1. In your application, use the task's hostname instead of the Actor's.

:::note Developers can lock the configuration

If the developer locked the server configuration, the task-level settings have no effect.

:::

### Billing of single-tenant runs

The platform bills single-tenant Server Actor runs like standard runs. A run also consumes resources while it waits for requests, until the idle timeout stops it. Expect usage even when no requests arrive.

For Actors monetized with the [pay-per-event pricing model](/actors/monetize/pay-per-event), you pay the platform usage costs of the runs in addition to the event charges.
