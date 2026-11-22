---
title: Actor environment variables
description: Access the system environment variables that the Apify platform sets for Actor runs, and manage custom variables on the platform and in .env files.
slug: /actors/development/programming-interface/environment-variables
sidebar_position: 3
sidebar_label: Environment variables
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Actor runs get their environment variables from two sources:

- [System environment variables](#system-environment-variables) - set automatically by the Apify platform for each Actor run.
- [Custom environment variables](#custom-environment-variables) - defined by the Actor owner on the Actor version, and in a `.env` file for local runs.

By default, both kinds of variables are passed only to the Actor **run**, not to the **build**. For variables passed to the build process (Docker build arguments), see [Build-time environment variables](#build-time-environment-variables).

Check out how you can [access environment variables in Actors](#access-environment-variables).

## System environment variables

Apify sets several system environment variables for each Actor run. They come in two groups, identified by their name prefix: standard `ACTOR_` variables defined by the Actor specification, and Apify-specific `APIFY_` variables that extend it.

:::info Runtime only

System variables apply only to Actor runs and are never passed to builds - not even when **Apply environment variables also to the build process** is enabled in **Source** > **Code** > **Environment variables**. That option forwards only your custom variables.

:::

### Standard Actor variables

Variables prefixed with `ACTOR_` are defined by the [Actor specification](https://whitepaper.actor/#environment-variables). They describe the run's execution context - identifiers, default storages, resource limits, and timing - and aren't specific to the Apify platform.

| Environment variable | Description |
| -------------------- | ----------- |
| `ACTOR_ID` | ID of the Actor. |
| `ACTOR_FULL_NAME` | Full technical name of the Actor, in the format `owner-username/actor-name`. |
| `ACTOR_RUN_ID` | ID of the Actor run. |
| `ACTOR_DEFAULT_DATASET_ID` | Unique identifier for the default dataset associated with the current Actor run. |
| `ACTOR_DEFAULT_KEY_VALUE_STORE_ID` | Unique identifier for the default key-value store associated with the current Actor run. |
| `ACTOR_DEFAULT_REQUEST_QUEUE_ID` | Unique identifier for the default request queue associated with the current Actor run. |
| `ACTOR_INPUT_KEY` | Key of the record in the default key-value store that holds the [Actor input](/actors/running/input-and-output#input). |
| `ACTOR_STORAGES_JSON` | JSON-encoded unique identifiers of storages associated with the current Actor run, e.g. `{ "keyValueStores": { "default": "<id>" }, "datasets": { "default": "<id>" }, "requestQueues": { "default": "<id>" } }`. |
| `ACTOR_MEMORY_MBYTES` | Size of memory allocated for the Actor run, in megabytes. Can be used to optimize memory usage or finetuning of low-level external libraries. |
| `ACTOR_MAX_TOTAL_CHARGE_USD` | For all pricing models, the user-set limit on total run cost. Do not exceed this limit. |
| `ACTOR_PERMISSION_LEVEL` | [Permission level](../../running/permissions.md) the Actor is run under (`LIMITED_PERMISSIONS` or `FULL_PERMISSIONS`). This determines what resources in the user’s account the Actor can access. |
| `ACTOR_RESTART_ON_ERROR` | If **1**, the Actor run will be restarted if it fails. |
| `ACTOR_STARTED_AT` | Date when the Actor was started. |
| `ACTOR_TIMEOUT_AT` | Date when the Actor will time out. |
| `ACTOR_BUILD_ID` | ID of the Actor build used in the run. |
| `ACTOR_BUILD_NUMBER` | Build number of the Actor build used in the run. |
| `ACTOR_BUILD_TAGS` | A comma-separated list of tags of the Actor build used in the run. Note that this environment variable is assigned at the time of start of the Actor and doesn't change over time, even if the assigned build tags change. |
| `ACTOR_TASK_ID` | ID of the Actor task. Empty if Actor is run outside of any task, e.g. directly using the API. |
| `ACTOR_WEB_SERVER_URL` | Unique public URL for accessing the Actor run web server from the outside world. Each run gets its own URL, which stops working when the run finishes. |
| `ACTOR_WEB_SERVER_PORT` | TCP port for the Actor to start an HTTP server on. This server can be used to receive external messages or expose monitoring and control interfaces. The server also receives requests to the server interface of a [Server Actor](/actors/development/programming-interface/server-actors). |
| `ACTOR_STANDBY_URL` | Public URL of the server interface of a [Server Actor](/actors/development/programming-interface/server-actors). It stays the same for all runs of the Actor, so it's safe to hardcode in calling applications. |
| `ACTOR_EVENTS_WEBSOCKET_URL` | Websocket URL where Actor may listen for [events](/actors/development/programming-interface/system-events) from Actor platform. |
| `ACTOR_MCP_CONNECTOR_BASE_URL` | Base URL of the Apify MCP Proxy. Connect to an [MCP connector](/integrations/mcp-connectors) at `${ACTOR_MCP_CONNECTOR_BASE_URL}/<connectorId>` using `APIFY_TOKEN` as the bearer token. |

<!-- vale Microsoft.RangeFormat = NO -->

:::note Date format

All date-related variables use the UTC timezone and are in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format (e.g., _2022-07-13T14:23:37.281Z_).

:::
<!-- vale Microsoft.RangeFormat = YES -->

### Apify platform variables

Variables prefixed with `APIFY_` are Apify-platform-specific extensions that go beyond the Actor specification. They expose features unique to the Apify platform, such as a run-specific API token, Apify Proxy, and details about the user who started the run.

| Environment variable | Description |
| -------------------- | ----------- |
| `APIFY_TOKEN` | [Run-specific API token](/integrations/api#actor-execution) for the user who started the Actor, with access limited by the Actor's [permission level](/actors/development/permissions#permission-levels). It differs from the API token in Apify Console and expires shortly after the run finishes. |
| `APIFY_USER_ID` | ID of the user who started the Actor. May differ from the Actor owner. |
| `APIFY_USER_IS_PAYING` | If it is `1`, it means that the user who started the Actor is a paying user. |
| `APIFY_IS_AT_HOME` | Contains **1** if the Actor is running on Apify servers. |
| `APIFY_DEDICATED_CPUS` | Number of CPU cores reserved for the Actor, based on allocated memory. |
| `APIFY_PROXY_PASSWORD` | Run-specific password for Apify Proxy on behalf of the user who started the Actor. It differs from the proxy password in Apify Console and expires shortly after the run finishes. |
| `APIFY_PROXY_PORT` | TCP port number to be used for connecting to Apify Proxy. |
| `APIFY_PROXY_STATUS_URL` | URL for retrieving proxy status information. Appending `?format=json` to this URL returns the data in JSON format for programmatic processing. |
| `APIFY_API_PUBLIC_BASE_URL` | Public URL of the Apify API. May be used to interact with the platform programmatically. Typically set to `api.apify.com`. |
| `APIFY_WORKFLOW_KEY` | Identifier used for grouping related runs and API calls together. |
| `APIFY_META_ORIGIN` | Specifies how an Actor run was started. Possible values are in [Runs and builds](/actors/running/runs-and-builds#origin) documentation. |
| `APIFY_INPUT_SECRETS_PRIVATE_KEY_FILE` | Private key used to decrypt [Secret inputs](/actors/development/actor-definition/input-schema/secret-input), as base64-encoded PEM text. Despite the name, it holds the key itself, not a file path. |
| `APIFY_INPUT_SECRETS_PRIVATE_KEY_PASSPHRASE` | Passphrase for the private key provided in `APIFY_INPUT_SECRETS_PRIVATE_KEY_FILE`. |
| ~~`APIFY_HEADLESS`~~ | _Deprecated_ - on the Apify platform this is always set to **1**, so web browsers inside the Actor always run in headless mode (no windowing system available). |

## Custom environment variables

Actor owners define custom environment variables to pass configuration and secrets to their Actors. Each environment has one source of truth:

- Apify platform - the variables stored on the Actor version, which you set in [Apify Console](#set-in-apify-console), with the [Apify CLI](#set-with-the-apify-cli), or with the [Apify MCP server](#set-with-the-apify-mcp-server)
- Local runs - the [`.env` file](#local-variables-in-env) in the Actor directory

Deploying code doesn't change the platform variables. Neither `apify push` nor a [Git repository source](/actors/development/deployment/source-types) sends them. Each build copies the variables of its Actor version, so after you change a variable, [build the Actor](/actors/development/builds-and-runs/builds) again for new runs to get the new value.

### Set in Apify Console

1. Open your Actor in [Apify Console](https://console.apify.com/actors) and go to **Source** > **Code** > **Environment variables**.
1. Add your variables. Enable **Secret** for sensitive values.
1. Save the changes and build the Actor.

### Set with the Apify CLI

The `apify env` commands of the [Apify CLI](/cli) manage the variables of the Actor defined in `.actor/actor.json`, on the version from its `version` field. If `version` is missing, they use version `0.0`. To target another Actor or version, use the `--actor` and `--version` flags. In a monorepo, pick the Actor directory with `--dir`.

| Command | Description |
| --- | --- |
| `apify env ls` | List the variables of the Actor version. Secret values stay hidden. |
| `apify env set <name> [--secret]` | Create or update one variable. The value comes from a prompt or from standard input, never from an argument. |
| `apify env rm <name>` | Delete one variable. |
| `apify env push` | Upload the variables from `.env`. Shows the changes and asks before it applies them. New variables are secret unless you pass `--plain`, keys with an empty value are skipped, and `--prune` also deletes variables that aren't in `.env`. |
| `apify env pull` | Write the platform variables into `.env`. Secret variables get an empty value, or keep the value already in `.env`. |
| `apify env diff` | Compare `.env` with the platform, and exit with code 1 when they differ. Use it in pre-commit hooks and CI. |

To set a secret without putting its value in the command, let the CLI prompt for it, or pipe it to standard input:

```bash
apify env set MYSQL_PASSWORD --secret
printf '%s' "$MYSQL_PASSWORD" | apify env set MYSQL_PASSWORD --secret
```

For all options, read the [environment variables guide](/cli/docs/vars) of the Apify CLI.

### Set with the Apify MCP server

The [Apify MCP server](/mcp#tool-selection) lets AI agents manage the variables with the tools of its `env-vars` category. The category is off by default. The `tools` parameter of the server URL replaces the default selection, so list `env-vars` with the other tools you use, for example `https://mcp.apify.com?tools=actors,docs,env-vars`.

| Tool | Description |
| --- | --- |
| `get-actor-env-var-list` | List the variables of an Actor version, with the values of plain variables |
| `set-actor-env-var` | Create or update one variable, plain or secret |
| `delete-actor-env-var` | Delete one variable |

The server never returns secret values and keeps the values you set out of its logs.

### Local variables in `.env`

For local runs, keep the values in a `.env` file in the Actor directory, next to `.actor/`:

```text
MYSQL_USER=my_username
MYSQL_PASSWORD=my_password
```

- `apify run` loads `.env`. Its values are literal and override variables from your shell and the ones the CLI sets for the run.
- `apify push` never uploads `.env` or `.env.*` files, except `.env.example`.
- `apify init` and `apify create` add `.env` to `.gitignore`.

To fill `.env` from the platform, run `apify env pull`. To upload it, run `apify env push`.

### Move from `environmentVariables` in `actor.json`

Earlier versions of the Apify CLI uploaded `environmentVariables` from `.actor/actor.json` on every `apify push`, which replaced the variables set in Apify Console. `environmentVariables`, `@secret` references, and the `apify secrets` command are deprecated. The values apply to local runs only, and `apify push` warns when `actor.json` contains them.

To move an existing project, run:

```bash
# Moves the values into .env, resolves @secret references, and removes environmentVariables from actor.json
apify env migrate
# Uploads .env to the Actor version
apify env push
```

### Secure environment variables

For sensitive data such as API keys or passwords, mark the variable as secret: enable **Secret** in Apify Console, pass `--secret` to `apify env set`, or set `isSecret` with the `set-actor-env-var` MCP tool. Secret values are encrypted at rest and redacted from Actor run logs. They're write-only: once saved, Apify Console, the Apify API, the Apify CLI, and the Apify MCP server never return them.

:::caution Visibility of environment variables in public Actors

When you [publish your Actor](/actors/publishing/publish), environment variables not marked as **Secret** are visible to anyone on the Actor detail page alongside the source code. Enable **Hide source files from Actor detail** in the Actor's **Settings** to hide both.

Secret environment variables are never exposed on the Actor detail page regardless of this setting. Always mark sensitive values as **Secret**.

:::

## Access environment variables

You can access environment variables in your code as follows:

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

In Node.js, use the `process.env` object:

```js
import { Actor } from 'apify';

await Actor.init();

// get MYSQL_USER
const mysql_user = process.env.MYSQL_USER

// print MYSQL_USER to console
console.log(mysql_user);

await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

In Python, use the `os.environ` dictionary:

```python
import os
print(os.environ['MYSQL_USER'])

from apify import Actor

async def main():
    async with Actor:
        # get MYSQL_USER
        mysql_user = os.environ['MYSQL_USER']

        # print MYSQL_USER to console
        print(mysql_user)
```

</TabItem>
</Tabs>


### Use the `Configuration` class

For more convenient access to Actor configuration, use the [`Configuration`](/sdk/js/reference/class/Configuration) class.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();

// get current token
const token = Actor.config.get('token');
// use different token
Actor.config.set('token', 's0m3n3wt0k3n');

await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        old_token = Actor.configuration.token
        Actor.log.info(f'old_token = {old_token}')

        # use different token
        Actor.configuration.token = 's0m3n3wt0k3n'

        new_token = Actor.configuration.token
        Actor.log.info(f'new_token = {new_token}')
```

</TabItem>
</Tabs>


## Build-time environment variables

The environment variables described above apply only to Actor **runs**. To make a variable available during the Actor's **build** process, you need to opt in explicitly. In this case, the variables function as Docker build arguments. To use them in your Dockerfile, include the `ARG` instruction:

```docker
ARG MY_BUILD_VARIABLE
RUN echo $MY_BUILD_VARIABLE
```

To pass your custom environment variables to the build, enable **Apply environment variables also to the build process** in **Source** > **Code** > **Environment variables** in Apify Console. With the Apify CLI, set `"applyEnvVarsToBuild": true` in `.actor/actor.json`, or pass `--apply-env-vars-to-build` to `apify push`. If you use neither, `apify push` keeps the setting stored on the platform.

:::caution Only user-defined variables are passed to the build

Even with **Apply environment variables also to the build process** enabled, only the custom variables stored on the Actor version are forwarded to the build. The Apify [system environment variables](#system-environment-variables) (such as `ACTOR_RUN_ID`, `APIFY_TOKEN`, or `ACTOR_DEFAULT_DATASET_ID`) are never available at build time, since the build is not associated with a specific run.

:::

:::caution Variables set during the build

Build-time environment variables are not suitable for secrets, as they are not encrypted.

:::

Once a build starts, its environment variables are frozen into that build's Docker image. To change them, you need to create a new build. Learn more in [Builds](../builds_and_runs/builds.md).
