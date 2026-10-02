---
title: Develop Actors on the local Actor runtime
sidebar_label: Local runtime
description: Run a local Apify platform in one container and push, build, run, and debug your Actors there with the Apify CLI, at no cost and without a network.
sidebar_position: 5
slug: /actors/development/local-runtime
---

The Actor runtime is a local Apify platform that runs in a single container on your machine. You point the Apify CLI at it and use the same commands as against the platform. `apify push` builds your Actor's Docker image locally, and `apify call` runs that image in a container with the platform's API, storages, events, and environment variables around it. Builds and runs use no platform compute and, after the first build, no network.

This guide shows how to install the runtime, run an Actor on it, iterate on your code, and use the features the runtime adds on top of the platform. The runtime is a development tool, not a place to host Actors.

## Before you start

- Install [Docker](https://docs.docker.com/get-docker/) or [Podman](https://podman.io/docs/installation) and make sure it's running. The CLI uses the first engine it finds on your `PATH`. Set `APIFY_CONTAINER_ENGINE=podman` to choose Podman.
- Install the Apify CLI from the `runtime` channel. The `apify runtime` commands are in preview and not yet in the stable release:

    ```bash
    npm install -g apify-cli@runtime
    apify runtime --help
    ```

    If the second command reports `Command runtime not found`, another `apify` on your `PATH` wins. Open a new terminal, or check with `which -a apify`.

- Have an Actor to work on. Create one with [`apify create`](/cli/docs/quick-start), or use an existing one.

## Step 1: Install and start the runtime

1. Download the runtime image and start the container in the background:

    ```bash
    apify runtime install
    apify runtime start --detach
    ```

    The runtime serves an Apify-compatible API on `http://localhost:3333` and a web console on `http://localhost:3000`. It keeps Actors, builds, runs, and storages in `~/.apify/actor-runtime/data`. If another program uses one of the ports, move it with `apify runtime start --api-port 4333 --console-port 4000`.

1. Check that it's running:

    ```bash
    apify runtime status
    ```

    The command prints the ports, the data directory, and which API the CLI currently talks to.

## Step 2: Point the Apify CLI at the runtime

1. Send every CLI command to the runtime instead of the Apify platform:

    ```bash
    apify runtime connect
    ```

    The setting applies to every terminal until you run `apify runtime disconnect`. To aim a single shell instead, export `APIFY_CLIENT_BASE_URL=http://localhost:3333` and `APIFY_CONSOLE_URL=http://localhost:3000`. These variables take precedence over `connect`.

1. Log in, if you haven't already. The runtime accepts any non-empty token and doesn't check it against a real account:

    ```bash
    apify login --token local-dev-token
    ```

    If you're already logged in with a real token, skip this step. `connect` and `disconnect` don't touch your login.

## Step 3: Push and run your Actor

1. Navigate to your Actor's directory and push it:

    ```bash
    cd my-actor
    apify push
    ```

    The command creates the Actor on the runtime, builds its Docker image with your container engine, and streams the build log. The first build takes about a minute. Later builds reuse the engine's layer cache.

1. Run the Actor:

    ```bash
    apify call --input '{"maxPages": 3}'
    ```

    The command starts a run in a fresh container, streams its log, waits for it to finish, and prints the IDs of the run's default storages. Use `--input-file input.json` to read the input from a file. The runtime validates the input against your [input schema](/actors/development/actor-definition/input-schema) and fills in defaults, as the platform does.

In the logs, every line the runtime itself writes starts with a blue `[actor-runtime]` prefix. Your Actor's output passes through unchanged.

:::note apify run and apify call
`apify run` still executes your Actor as a plain local process, with no container around it. Use `apify call` for anything that should behave like a run on the platform.
:::

## Step 4: Inspect the results

Open the console at [http://localhost:3000](http://localhost:3000) to browse Actors, builds, runs, and storages. Or use the IDs that `apify call` printed:

| Command | Shows |
| --- | --- |
| `apify runs ls` | Every run of the Actor |
| `apify runs log <runId>` | The run log |
| `apify datasets get-items <datasetId> --format json` | Dataset items |
| `apify api v2/key-value-stores/<storeId>/records/OUTPUT` | One key-value store record |

`apify api` reaches every endpoint the runtime supports, and the Apify SDKs and API clients work against it too. Named storages work as on the platform, so `apify api GET v2/datasets/~my-results/items` reads your dataset named `my-results`.

## Step 5: Iterate on your code

The default loop is the same as on the platform: edit the code, `apify push`, `apify call`. If your source hasn't changed since the last build, the CLI refuses the push. Use `apify push --force`.

To skip the rebuild for source edits, turn on the Actor's live dev folder. The runtime registers the directory you pushed from as the Actor's dev folder. Once you enable the live dev folder, every later run mounts it over the built image:

1. Enable the live dev folder once per Actor, with the checkbox on the Actor's page in the console or with the API:

    ```bash
    apify api POST /actor-runtime/live-dev-folder/<actorId> --body '{"enabled": true}'
    ```

1. Edit the code, compile it if your language needs it, and run the Actor again:

    ```bash
    npm run build
    apify call
    ```

Edits apply to the next run, not to one in progress. Dependencies still come from the built image, so a change to `package.json` or `requirements.txt` needs `apify push --force`. To run once from the built image alone, use `apify call --no-dev-folder`.

## Step 6: Switch back to the platform

When you're done, point the CLI at the Apify platform again and stop the container:

```bash
apify runtime disconnect
apify runtime stop
```

Your Actors, runs, and storages stay in the data directory. The next `apify runtime start` picks them up.

## Use features the platform doesn't have

Because the runtime runs on your machine, it can do things the platform can't. Each feature is a per-Actor or per-run setting that you turn on through `apify api` or on the Actor's page in the console.

### Debug with your IDE

Turn on debug mode for the Actor. Every later run starts paused and waits for a debugger to attach, with no change to your source or `Dockerfile`:

```bash
apify api POST /actor-runtime/debug/<actorId> --body '{"enabled": true}'
apify call
```

The run log prints the attach address. Use VS Code's **Attach** on port `9229` for Node.js, or PyCharm's **Attach to DAP** or VS Code's **Python: Remote Attach** on port `5678` for Python. A Node.js Actor must start with `node` directly, for example `CMD ["node", "dist/main.js"]`, not through `npm start`. The run's timeout keeps counting while it waits for you, so pass a larger `--timeout`. Send `{"enabled": false}` to turn debug mode off.

For a run on the platform, see [Debug Actors on the Apify platform](/actors/development/debugging) instead.

### Watch the browser

Turn on the browser view to see the browser your Actor drives:

```bash
apify api POST /actor-runtime/browser-view/<actorId> --body '{"enabled": true}'
apify call
```

The run log prints a viewer URL on the console, `http://localhost:3000/runs/<runId>/browser`. Add `"interactive": true` to control the browser with your mouse and keyboard. The browser must run headful on an image that provides a display, such as Apify's Playwright and Puppeteer base images.

### Trigger a migration

Test how your Actor survives a [migration](/actors/development/builds-and-runs/state-persistence) whenever you want. While a run is `RUNNING`:

```bash
apify api POST /actor-runtime/migrate/<runId>
```

The run receives the `migrating` event, its container stops a few seconds later, and a fresh one starts for the same run, with the same run ID, environment, and storages but no in-memory state. The run's console page has a **Migrate** button that does the same.

### Test pay-per-event pricing at no cost

Give the Actor a [pay-per-event](/actors/publishing/monetize/pay-per-event) pricing, and every run charges events as it would on the platform. No money changes hands:

```bash
apify api PUT /v2/actors/<actorId> --body '{"pricingInfos":[{"pricingModel":"PAY_PER_EVENT",
  "pricingPerEvent":{"actorChargeEvents":{
    "page-scraped":{"eventTitle":"Page scraped","eventPriceUsd":0.002}}}}]}'
apify call
apify api GET actor-runs/<runId>
```

The run object and its console page show the charged events and the run's estimated cost in `usageTotalUsd`. The estimate covers compute units and events, not storage, data transfer, or proxy. To cap a run's spend, start it with `apify api POST '/v2/actors/<actorId>/runs?maxTotalChargeUsd=0.5'`.

### Relay missing calls to the platform

Calls to endpoints the runtime doesn't implement, or to IDs it doesn't know, fail by default. You can relay them to the real Apify API with your token instead. This also makes named platform storages, such as `apify~some-public-dataset`, readable from the runtime:

```bash
apify api POST /actor-runtime/api-fallback \
  --body '{"fallbackUnimplementedEnabled": true, "fallbackNotFoundEnabled": true}'
```

Both options are off by default and reset on every restart.

:::caution The relay can write to your real Apify account
The relay forwards every HTTP method, so a `POST`, `PUT`, or `DELETE` the runtime can't answer becomes a real write on the platform. Turn the relay on only with a token whose account you're willing to change.
:::

## Know the limits of the emulation

The runtime emulates the part of the Apify platform that the development loop needs: Actors, versions, builds, runs, storages, input schemas, environment variables and secrets, run events, migrations, pay-per-event charging, and single-tenant [Actor Standby](/actors/development/programming-interface/standby). It isn't a complete platform. Among other things, it has no tasks, schedules, webhooks, integrations, Apify Store, dataset exports, Metamorph, or per-account limits.

For the full list, see [Unsupported platform behavior](https://github.com/apify/actor-runtime/blob/master/requirements/unsupported.md) in the runtime's repository. An unsupported API call answers `501` or `404`, unless you turned on the relay to the platform.

Two things are real even on the runtime. Apify Proxy is the real proxy: when the runtime knows a proxy password, from your account or from its own `APIFY_PROXY_PASSWORD`, runs get it and Apify bills the traffic to your account. The run log warns you, and the console's Settings page has a switch to give runs no password. And the first `apify push` of a new Actor needs network access, because the CLI fetches its templates manifest.

Before you publish, run the Actor on the platform at least once. The runtime doesn't enforce the platform's memory steps, disk limits, record and item size limits, or network isolation.

## Give your coding agent the runtime's instructions

The runtime ships an Agent Skill that documents every command and setting in this guide, for the exact runtime version you have installed:

```bash
apify runtime skill            # print it
apify runtime skill --install  # install it for the coding agents on this machine
```

Run `--install` again after you update the runtime with `apify runtime install`. The [`actor-runtime` skill](https://github.com/apify/agent-skills) from Apify Agent Skills tells an agent how to install the runtime and load this skill.

## Next steps

- For every `apify runtime` command and flag, see the [Apify CLI command reference](/cli/docs/reference).
- To learn about builds and runs, see [Builds and runs](/actors/development/builds-and-runs).
- To deploy your Actor to the platform, see [Deployment](/actors/development/deployment).
