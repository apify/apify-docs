---
title: Factory integration
sidebar_label: Factory
description: Learn how to install the Apify plugin for Factory Droid to discover, run, and build Actors with the Apify MCP server, skills, and a routing droid.
slug: /integrations/factory
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

[Factory](https://factory.ai) is an AI software engineering platform. Its CLI agent, Droid, runs in your terminal, reads and edits your codebase, runs commands, and completes multi-step development tasks from natural-language prompts.

The [Apify plugin for Factory](https://github.com/apify/apify-factory-plugin) connects Droid to Apify's library of [Actors](https://apify.com/store) and bundles:

- The [Apify MCP server](/integrations/mcp) for searching Apify Store, running Actors, and retrieving datasets through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro).
- An `apify` routing droid that picks the right tool or skill from a natural-language request.
- Five built-in skills for common workflows (see [Bundled skills](#bundled-skills) below).

This guide covers installation from the Factory plugin marketplace.

<ThirdPartyDisclaimer />

## Prerequisites

- [An Apify account](https://console.apify.com/sign-up) - sign up for free if you don't have one.
- [Factory](https://factory.ai) - the `droid` CLI installed and authenticated locally.

## Install the plugin

Droid registers the official [factory-plugins](https://github.com/Factory-AI/factory-plugins) marketplace during installation. If your setup is missing it, add it once:

```bash
droid plugin marketplace add https://github.com/Factory-AI/factory-plugins
```

Install the Apify plugin with the CLI:

```bash
droid plugin install apify@factory-plugins --scope user
```

Use `--scope project` instead to enable the plugin only in the current project.

You can also install interactively. Run `/plugins`, open the **Browse** tab, select **Apify**, and choose an install scope.

## Authenticate to Apify

The plugin bundles the Apify MCP server. Read-only tools like searching Apify Store and fetching Actor details work without signing in, but you need to authenticate to run Actors and access your account data.

1. In a Droid session, run `/mcp` to open the MCP server manager.

1. Find the **apify** server in the list. It shows as needing authentication.

1. Select **Authenticate**. Droid opens a browser tab for the Apify OAuth flow.

1. Review the permissions and click **Allow access**.

1. Back in the terminal, the **apify** MCP server is connected and tools are live.

:::tip One-time global authentication

The OAuth token is stored in your system keyring, so you authenticate once and it works across all projects. You can revoke access at any time in [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations).

:::

## Run your first prompt

Start your request with `@apify` so the routing droid handles it. It picks the right tool or skill from a natural-language request, so you don't need to name tools yourself.

> @apify Use Apify to find a good Actor for scraping Google Maps places. Show me the best option, its input requirements, pricing model, and what kind of dataset output it returns. Do not run the Actor yet.

The `apify` droid searches Apify Store, fetches the top Actor's details through the Apify MCP server, and summarizes its inputs, pricing, and output - all without running the Actor.

## Bundled skills

| Skill | Description |
| --- | --- |
| `apify-ultimate-scraper` | CLI-driven extraction using existing Actors for multi-step scraping and lead-generation workflows. |
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

## Troubleshooting

### The Apify plugin doesn't appear in Browse

Re-register the marketplace and try again:

```bash
droid plugin marketplace add https://github.com/Factory-AI/factory-plugins
```

Then run `/plugins`, open the **Browse** tab, and search for **Apify**. If the plugin still doesn't appear, update the marketplace:

```bash
droid plugin marketplace update factory-plugins
```

### Droid picks the wrong skill

Start your request with `@apify` so the routing droid handles it. The droid owns the guardrails that pick the right skill and avoid common traps, such as confusing the `apify` and `apify-client` packages.

### The Apify MCP server shows as unauthenticated

Run `/mcp`, select the **apify** server, and choose **Authenticate** to re-trigger the OAuth flow. See [Authenticate to Apify](#authenticate-to-apify).

### Browser doesn't open, or OAuth fails

If the browser doesn't open automatically, copy the OAuth URL shown in the terminal and paste it into your browser manually.

If you're running Droid in a headless environment (SSH, remote container) or the OAuth flow still fails, authenticate with an API token instead. Copy your token from [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations) and set it before starting Droid:

```bash
export APIFY_TOKEN=<YOUR_API_TOKEN>
```

## Limitations

- Long-running Actors may exceed the time a single tool call waits for completion. Reduce the scope or split the work across multiple prompts.
- Each Actor run consumes Apify platform usage from your plan in addition to any Factory usage. See [Billing](/account/billing) for details.
- Tool calls are confirmation-gated by your Droid autonomy level. Adjust it in your Factory settings if you want fewer confirmations.
- Skills that edit files in your project (Actor development, actorization, SDK integration) make local changes - review them before deploying or committing.

## Related integrations

- [MCP server integration](/integrations/mcp) - Use the Apify MCP server with other clients
- [ChatGPT integration](/integrations/chatgpt) - Connect the Apify MCP server to ChatGPT

## Resources

- [Apify plugin for Factory](https://github.com/apify/apify-factory-plugin) - Source repository and full README with advanced setup notes (all auth paths, available MCP tools)
- [Factory plugin documentation](https://docs.factory.ai/harness/plugins) - Official Factory plugin system docs
- [Apify Store](https://apify.com/store) - Browse Actors you can run from Factory
