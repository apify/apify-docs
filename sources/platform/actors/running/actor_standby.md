---
title: Server Actors
description: Use single-tenant and multi-tenant Server Actors to serve real-time HTTP requests, with automatic scaling and billing based on the Actor's pricing model.
sidebar_position: 7.3
slug: /actors/running/standby
sidebar_label: Server Actors
---

Traditional Actors are designed to run a single job and then stop. They're mostly intended for batch jobs, such as when you need to perform a large scrape or data processing task.
However, in some applications, waiting for an Actor to start is not an option. Server Actors solve this problem by keeping the Actor ready
in the background, waiting for the incoming HTTP requests. In a sense, the Actor behaves like a real-time web server or standard API server.

Server Actors can be single-tenant or multi-tenant:

- Single-tenant Server Actors use separate runs for each user.
- Multi-tenant Server Actors share the developer's runs among users.

## Identify a Server Actor {#how-do-i-know-if-standby-mode-is-enabled}

You will know that an Actor supports server mode if you see the **Endpoints** tab on the Actor's detail page.
In the tab, you will find the hostname of the server, the description of the Actor's endpoints,
the parameters they accept, and what they return in the Actor README.
If the Actor defines a [web server schema](../development/actor_definition/web_server_schema/index.md), the tab also shows an interactive list of its endpoints, where you can send requests directly from the browser.

To use a Server Actor, you don't need to click a start button. Use the provided hostname and endpoint in your application to send requests and get results.

## Pass input to Server Actors {#how-do-i-pass-input-to-actors-in-standby-mode}

If you're using an Actor built by someone else, see its Information tab to find out how the input should be passed.

Generally speaking, Server Actors behave as standard HTTP servers. You can use any of the existing [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) like GET, POST, PUT, DELETE, etc. You can pass the input via [HTTP request query string](https://en.wikipedia.org/wiki/Query_string) or via [HTTP request body](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#body).

## How do I authenticate my requests

To authenticate requests to a Server Actor, follow the same process as [authenticating requests to the Apify API](../../integrations/programming/api.md).
You can provide your [API token](../../integrations/programming/api.md#api-token) in one of two ways:

1. _Recommended_: Include the token in the `Authorization` header of your request as `Bearer <token>`. This approach is recommended because it prevents your token from being logged in server logs.

    ```shell
    curl -H "Authorization: Bearer my_apify_token" \
      https://rag-web-browser.apify.actor/search?query=apify
    ```

2. Append the token as a query parameter named `token` to the request URL.
This approach can be useful if you cannot modify the request headers.

    ```text
    https://rag-web-browser.apify.actor/search?query=apify&token=my_apify_token
    ```

:::tip Scoped tokens
You can use [scoped tokens](/integrations/api#limited-permissions) to send requests to Server Actors. This is useful for allowing third-party services to interact with your Actor without granting access to your entire account.

However, [restricting what an Actor can access](/integrations/api#restricted-access-restrict-what-actors-can-access-using-the-scope-of-this-actor) using a scoped token is not supported in server mode.
:::

## Can I still run the Actor in normal mode

Yes, you can still modify the input and click the **Start** button to run the Actor in normal mode. However, the Server Actor might not support this mode; the run might fail or return empty results. Check the Actor README to learn more about the capabilities of your chosen Actor.

## Is there any scaling to accommodate the incoming requests

When you use a Server Actor, the system automatically scales the Actor to accommodate the incoming requests. Under the hood,
the system starts new Actor runs. The API identifies these runs with the origin set to `STANDBY`.

## Server Actor health checks {#does-the-platform-check-that-standby-runs-are-healthy}

The platform checks a run's readiness once, before the run starts serving requests, and performs no health checks after that. A run ends when its process exits, when it migrates to another machine, or when it stays idle for longer than the idle timeout.

If an Actor's server stays up but stops responding, the platform doesn't detect the failure, and requests keep going to that run. To learn how to handle this in your own Actors, see the [Server Actor lifecycle](../development/programming_interface/actor_standby.md#run-lifecycle-in-standby-mode).

## What is the timeout for incoming requests

For requests sent to a Server Actor, the maximum time allowed until receiving the first response is _5 minutes_. This represents the overall timeout for the operation.

## What is the rate limit for incoming requests

The rate limit for incoming requests to a Server Actor is _2000 requests per second_ per user account.

## Customize the server configuration {#how-do-i-customize-standby-configuration}

The server configuration currently consists of the following properties:

- **Max requests per run** - The maximum number of concurrent HTTP requests a single Server Actor run can accept. If this limit is exceeded, the system starts a new Actor run to handle the request, which may take a few seconds.
- **Desired requests per run** - The number of concurrent HTTP requests a single Server Actor run is configured to handle. If this limit is exceeded, the system preemptively starts a new Actor run to handle the additional requests.
- **Memory (MB)** - The amount of memory (RAM) allocated for the Actor in server mode, in megabytes. With more memory, the Actor can typically handle more requests in parallel, but this also increases the number of compute units consumed and the associated cost.
- **Idle timeout (seconds)** - If a Server Actor run doesn’t receive any HTTP requests within this time, the system will terminate the run. When a new request arrives, the system might need to start a new Server Actor run to handle it, which can take a few seconds. A higher idle timeout improves responsiveness but increases costs, as the Actor remains active for a longer period.
- **Build** - The Actor build that the runs of the Server Actor will use. Can be either a build tag (e.g. `latest.`), or a build number (e.g. `0.1.2`).

For single-tenant Server Actors, you can see these in the **Endpoints** tab of the Actor detail page. However, note that these properties are not configurable at the Actor level. If you wish to
use the Actor-level hostname, this will always use the default configuration. To override this configuration, just create a new Task from the Actor.
You can then head to the **Endpoints** tab of the created Task and modify the configuration as needed. Note that the task has a specific hostname, so make
sure to use that in your application if you wish to use the custom configuration. Multi-tenant Server Actors don't support tasks.

## Server Actor billing {#are-the-standby-runs-billed-differently}

Single-tenant Server Actors use separate runs for each user. With pay-per-event pricing, users pay for platform usage and any configured events. Runs consume resources even when no requests are being sent, until they stop after the idle timeout.

For multi-tenant Server Actors that use pay-per-event pricing, callers pay for events. Platform usage for requests from paying users reduces the developer's payout, while Apify covers platform usage for requests from free users. When you call your own Actor directly, you pay for platform usage, while events only update statistics.

## Shared runs {#are-the-standby-runs-shared-among-users}

Multi-tenant Server Actors share the developer's runs among users. Single-tenant Server Actors keep runs separate for each user.

If you develop a multi-tenant Server Actor that calls other multi-tenant Server Actors, check how to [compose multi-tenant Server Actors](../development/programming_interface/actor_standby.md#compose-server-actors).

## Develop Server Actors {#how-can-i-develop-actors-using-standby-mode}

See the [Server Actor development section](../development/programming_interface/actor_standby.md).
