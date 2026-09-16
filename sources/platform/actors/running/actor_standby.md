---
title: Actor Standby mode
description: Use Actor Standby mode to keep an Actor ready in the background and serve real-time HTTP requests without waiting for a cold start each time.
sidebar_position: 7.3
slug: /actors/running/standby
sidebar_label: Standby mode
---

Traditional Actors are designed to run a single job and then stop. They're mostly intended for batch jobs, such as when you need to perform a large scrape or data processing task.
However, in some applications, waiting for an Actor to start is not an option. Actor Standby mode solves this problem by letting you have the Actor ready
in the background, waiting for the incoming HTTP requests. In a sense, the Actor behaves like a real-time web server or standard API server.

To build your own Standby Actor, see [Develop Actors in Standby mode](../development/programming_interface/actor_standby.md).

## Check whether an Actor supports Standby mode

If an Actor has Standby mode enabled, its detail page shows the **Endpoints** tab. The tab contains the hostname of the Actor's server, and the Actor README describes the endpoints, the parameters they accept, and what they return.
If the Actor defines a [web server schema](../development/actor_definition/web_server_schema/index.md), the tab also shows an interactive list of its endpoints, where you can send requests directly from the browser.

To use the Actor in Standby mode, you don't need to start the Actor or do anything else. Send a request to the provided hostname and endpoint, and you get the results.

![Endpoints tab on the Actor detail page](./images/actor_standby/standby-tab.png)

## Standby URLs

The Standby URL typically combines the Actor owner's username and the Actor name, for example:

```text
https://jane-doe--my-actor.apify.actor
```

The Actor also responds on a URL built from its ID, which keeps working if the Actor or its owner is renamed:

```text
https://92c4oi4fpzy7rprlf.apify.actor
```

The Standby URL stays the same for all runs of the Actor, so you can share it publicly or hardcode it in applications that call the Actor. Copy the URL from the **Endpoints** tab instead of building it from the username and Actor name, because some Actors use a different hostname format, like `rag-web-browser.apify.actor` in the examples below.

## Send requests to the Actor

If you're using an Actor built by someone else, see its **Readme** tab to find out how to pass the input.

Generally speaking, Actors in Standby mode behave as standard HTTP servers. Use any of the existing [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), such as GET, POST, PUT, or DELETE, and pass the input via the [query string](https://en.wikipedia.org/wiki/Query_string) or the [request body](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#body).

## Authenticate requests

To authenticate requests to Actor Standby, follow the same process as [authenticating requests to the Apify API](../../integrations/programming/api.md).
You can provide your [API token](../../integrations/programming/api.md#api-token) in one of two ways:

1. _Recommended_: Include the token in the `Authorization` header of your request as `Bearer <token>`. This approach is recommended because it prevents your token from being logged in server logs.

    ```bash
    curl -H "Authorization: Bearer my_apify_token" \
      https://rag-web-browser.apify.actor/search?query=apify
    ```

1. Append the token as a query parameter named `token` to the request URL.
This approach can be useful if you cannot modify the request headers.

    ```text
    https://rag-web-browser.apify.actor/search?query=apify&token=my_apify_token
    ```

The platform removes the token from the request before forwarding it, so the token doesn't reach the Actor's code. If the Actor reads the `Authorization` header for its own authentication, send your Apify token in the `X-Apify-Authorization` header instead.

If you're developing a Standby Actor, use the token from the `APIFY_TOKEN` [environment variable](../development/programming_interface/environment_variables.md#system-environment-variables) to call the Apify API, as in any other Actor.

If you want to let third-party services interact with your Actor without granting access to your entire account, use [scoped tokens](/integrations/api#limited-permissions) to send Standby requests.

:::caution Restricted access is not supported

[Restricting what an Actor can access](/integrations/api#restricted-access-restrict-what-actors-can-access-using-the-scope-of-this-actor) using a scoped token is not supported when running in Standby mode.

:::

## Run the Actor in normal mode

You can still modify the input and select **Start** to run the Actor in normal mode. However, the Standby Actor might not support it; the run might fail or return empty results. The platform always allows starting the run, even for Actors that don't handle the normal mode well. Head to the Actor README to learn about the capabilities of your chosen Actor.

## Limits and scaling

The platform scales Standby runs automatically and applies timeouts and rate limits to the incoming requests.

### Automatic scaling

When you use the Actor in Standby mode, the system automatically scales the Actor to accommodate the incoming requests. Under the hood,
the system starts new Actor runs, which you will see in the Actor **Runs** tab, with the origin set to Standby.

The background runs that serve your requests are not shared with other users, even if you use the Actor-level hostname with the default configuration.

The platform checks a run's readiness once, before the run starts serving requests, and performs no health checks after that.

:::caution Unresponsive servers aren't detected

If an Actor's server stays up but stops responding, the platform doesn't detect the failure, and requests keep going to that run. To learn how to handle this in your own Actors, see [Run lifecycle](../development/programming_interface/actor_standby.md#run-lifecycle).

:::

### Request timeouts

For requests sent to an Actor in Standby mode, the maximum time allowed until receiving the first response is _5 minutes_. This represents the overall timeout for the operation.

Within this window, the platform first selects an Actor run to handle the request, which can take up to _2 minutes_, for example when a new run needs to start. If no run becomes available within that time, the request fails with a `429` error.

### Rate limits

Incoming requests to Standby Actors are rate-limited per user account. The limit is the same on all standard subscription plans, and custom plans can raise it. Responses include the current limit in the `X-RateLimit-Limit` header. When you exceed the limit, the platform responds with a `429` error.

## Standby configuration

The Standby configuration consists of the following properties:

| Property | Description |
| --- | --- |
| Max requests per run | The maximum number of concurrent HTTP requests a single Standby Actor run can accept. If this limit is exceeded, the system starts a new Actor run to handle the request, which may take a few seconds. |
| Desired requests per run | The number of concurrent HTTP requests a single Standby Actor run is configured to handle. If this limit is exceeded, the system preemptively starts a new Actor run to handle the additional requests. |
| Memory (MB) | The amount of memory (RAM) allocated for the Actor in Standby mode, in megabytes. With more memory, the Actor can typically handle more requests in parallel, but this also increases the number of compute units consumed and the associated cost. |
| Idle timeout (seconds) | If a Standby Actor run doesn't receive any HTTP requests within this time, the system terminates the run. When a new request arrives, the system might need to start a new Standby Actor run to handle it, which can take a few seconds. A higher idle timeout improves responsiveness but increases costs, as the Actor remains active for a longer period. |
| Build | The Actor build that the runs of the Standby Actor will use. Can be either a build tag (e.g. `latest`) or a build number (e.g. `0.1.2`). |

You can see the current values in the **Endpoints** tab of the Actor detail page. If you own the Actor, you can change its default Standby configuration in the **Settings** tab.

### Override the configuration with a task

If you use an Actor built by someone else, the Actor-level hostname always uses the developer's default configuration. To override it:

1. In [Apify Console](https://console.apify.com), create a new task from the Actor.
1. Open the **Endpoints** tab of the created task.
1. Modify the configuration as needed.
1. In your application, use the task's hostname instead of the Actor's.

:::note Developers can lock the configuration

The Actor's developer can lock the Standby configuration. In that case, the task-level settings have no effect.

:::

## Billing

Standby runs are billed in the same fashion as normal runs. However, they might have unexpected costs. The Actors run in the background and consume resources even when no requests arrive, until the idle timeout terminates them.

For Actors monetized with the [pay-per-event pricing model](/actors/monetize/pay-per-event), you pay the platform usage costs of the Standby runs in addition to the event charges.

## Use Standby Actors as MCP servers

If the Actor exposes a [Model Context Protocol (MCP)](../../agents/mcp.md) server, its MCP endpoint is the Standby URL followed by the path defined in the Actor's [`webServerMcpPath`](../development/actor_definition/actor_json.md) property. Authenticate requests to the MCP endpoint the same way as any other Standby request.
