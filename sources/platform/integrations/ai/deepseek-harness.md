---
title: DeepSeek Harness integration
sidebar_label: DeepSeek Harness
description: Learn how to install the Apify plugin for DeepSeek Harness to discover, run, and build Actors with the Apify MCP server and bundled workflow skills.
slug: /integrations/deepseek-harness
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (`dsh`) is DeepSeek's open-source agent harness. It boots a profile, an ordered stack of plugin layers, and runs the agent either in your terminal or in a local web GUI, backed by the model provider you configure.

The [Apify plugin for DeepSeek Harness](https://www.npmjs.com/package/dsh-apify-plugin) connects `dsh` to Apify's library of [Actors](https://apify.com/store) and bundles:

- The [Apify MCP server](/integrations/mcp) for searching Apify Store, running Actors, and retrieving datasets through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro).
- An `apify` router skill that turns a natural-language request into the right tool or skill, and diagnoses missing authentication.
- Five workflow skills for common tasks (see [Bundled skills](#bundled-skills)).

<ThirdPartyDisclaimer />

## Prerequisites

- [An Apify account](https://console.apify.com/sign-up) - sign up for free if you don't have one.
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) - installed locally, running Node.js `^22.19.0 || >=24.0.0`. Older versions fail with a `node:sqlite` error.
- [pnpm](https://pnpm.io/installation) on your `PATH` - `dsh plugin` forwards its arguments to pnpm.
- A model provider configured in `dsh` - see [Connect a model provider](#connect-a-model-provider).

## Install the plugin

Install the plugin into the profile you launch. The `web` profile backs the web GUI (`dsh web`), and `tui` backs the terminal app:

```bash
dsh plugin --profile web add dsh-apify-plugin
```

If you run `dsh` through npx rather than a global install, prefix the command:

```bash
npx @deepseek-ai/dsh plugin --profile web add dsh-apify-plugin
```

To uninstall:

```bash
dsh plugin --profile web remove dsh-apify-plugin
```

## Connect your Apify account

The plugin enables the Apify MCP server on install. Searching Apify Store, inspecting Actors, and reading Apify documentation work without a token. Running Actors, reading datasets and key-value stores, and retrieving run data need one.

`dsh` sends static MCP headers and has no OAuth flow, so authenticate with an API token:

1. Copy your token from [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations?utm_source=deepseek-harness&utm_medium=integrations).

1. Create a `.env` file in the directory you launch `dsh` from:

    ```bash
    # .env
    APIFY_TOKEN=<YOUR_API_TOKEN>
    ```

1. Restart the profile.

:::tip Where the token is read from

`dsh` reads `.env` from the launch directory only, without searching parent directories. A `.env` in `$DSH_HOME` acts as a machine-wide fallback, and a variable already exported in your shell takes precedence over both. Add `.env` to your `.gitignore` so the token stays out of version control.

:::

The token is read once, at startup. Exporting it inside a running session has no effect, so restart the profile after you change it.

## Connect a model provider

`dsh` ships no model of its own. Open **Settings > Models** and select **Add provider**, then choose your provider and supply its API key.

For a model served on your own machine, such as LM Studio or Ollama, add a custom provider and enter the URL and port it listens on.

## Run your first prompt

Start the profile:

```bash
dsh web
```

Describe what you want in natural language. The `apify` skill loads on Apify requests and routes them, so you don't need to name tools yourself.

> Use Apify to find a good Actor for scraping Google Maps places. Show me the best option, its input requirements, pricing model, and what kind of dataset output it returns. Do not run the Actor yet.

The router searches Apify Store, fetches the top Actor's details through the Apify MCP server, and summarizes its inputs, pricing, and output - all without running the Actor.

## Bundled skills

| Skill | Description |
| --- | --- |
| `apify-ultimate-scraper` | Extraction with existing Actors for multi-step scraping and lead-generation workflows. |
| `apify-actor-development` | Full Actor lifecycle - template selection, development, local testing, and deployment with `apify push`. |
| `apify-actorization` | Converts existing JavaScript, TypeScript, Python, or CLI projects into Apify Actors. |
| `apify-generate-output-schema` | Generates dataset and key-value store schemas for existing Actors. |
| `apify-sdk-integration` | Integrates Actor execution into applications using the `apify-client` package. |

Example prompts that route to specific skills:

_Ultimate scraper:_

> Find 10 highly rated coffee shops in Seattle with name, address, rating, phone, and website.

_Actor development:_

> Create an Apify Actor that accepts a `startUrl` and `maxPages` input, crawls the site, and stores each page title and URL.

_SDK integration:_

> Add Apify to this project. The Node.js API route should run an Actor and return dataset items as JSON.

The Actor development, actorization, and ultimate scraper skills call the local `apify` command. Install the Apify CLI before using them:

```bash
npm install -g apify-cli
```

## Grant the Apify CLI file access

The Apify CLI keeps its credentials in `~/.apify/`, which sits outside the session workspace. Under the default `workspace-write` sandbox mode, `dsh` denies that path and every `apify` command fails with `EPERM`, even when the login itself is valid.

You have two ways to work around this:

- Approve the escalation prompt that the agent raises when a command is denied. It applies to that one command.
- Switch the session to **Full access** sandbox mode before you start, which applies for the whole session.

If you'd rather keep the sandbox narrow, set `APIFY_TOKEN` instead and let the agent run Actors through the Apify MCP server, which needs no local file access.

## Troubleshooting

### The agent says it can't run an Actor

No `APIFY_TOKEN` was set when `dsh` started, so only the anonymous MCP tools loaded and the agent can search but not run. Add the token to your `.env` file and restart the profile. See [Connect your Apify account](#connect-your-apify-account).

### The Apify MCP server fails to start with `invalid_token`

The token is present but rejected. Check for stray quotes or trailing whitespace in the `.env` file, regenerate the token in [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations?utm_source=deepseek-harness&utm_medium=integrations) if needed, and restart the profile.

### The `apify` command fails with `EPERM`

The sandbox is blocking `~/.apify/`, not your login, so running `apify login` again won't fix it. See [Grant the Apify CLI file access](#grant-the-apify-cli-file-access).

### The plugin doesn't show up after installing

Print the composed profile tree and confirm the plugin's rows are in it:

```bash
dsh --profile web --dump-config
```

Check that you installed into the profile you actually launch. Installing into `web` doesn't affect the `tui` profile.

## Limitations

- `dsh` sends static MCP headers and has no OAuth flow, so the Apify MCP server authenticates with an API token only.
- The token is read at startup, so a change to `.env` needs a restart of the profile.
- A tool call waits up to five minutes for an Actor run. Longer runs need a narrower scope, or the Apify CLI to start the run and poll for its result.
- Each Actor run consumes Apify platform usage from your plan in addition to any model provider costs. See [Billing](/account/billing) for details.
- Skills that edit files in your project (Actor development, actorization, SDK integration) make local changes - review them before deploying or committing.

## Related integrations

- [MCP server integration](/integrations/mcp) - Use the Apify MCP server with other clients
- [Kimi Code CLI integration](/integrations/kimi-code-cli) - The equivalent plugin for Kimi Code CLI
- [OpenCode integration](/integrations/opencode) - The equivalent plugin for OpenCode

## Resources

- [Apify plugin for DeepSeek Harness](https://www.npmjs.com/package/dsh-apify-plugin) - Plugin package and setup notes
- [DeepSeek Harness repository](https://github.com/deepseek-ai/deepseek-harness) - Source, profiles, and plugin packaging docs
- [Apify MCP server documentation](/integrations/mcp) - Tools, authentication, and configuration
- [Apify Store](https://apify.com/store) - Browse Actors you can run from DeepSeek Harness
