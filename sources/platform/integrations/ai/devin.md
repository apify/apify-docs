---
title: Devin integration
sidebar_label: Devin CLI
description: Learn how to install the Apify plugin for Devin CLI to discover, run, and build Actors directly with the Apify MCP server, skills, and a routing subagent.
slug: /integrations/devin
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

[Devin](https://devin.ai) is Cognition's AI software engineer. It reads and edits your codebase, runs commands, and completes multi-step development tasks.

The [Apify plugin for Devin](https://github.com/apify/apify-devin-plugin) connects Devin to Apify's library of [Actors](https://apify.com/store) and bundles:

- The [Apify MCP server](/integrations/mcp) for searching Apify Store, running Actors, and retrieving datasets through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro).
- An `apify` routing subagent that picks the right tool or skill from a natural-language request.
- Five built-in skills for common workflows (see [Bundled skills](#bundled-skills) below).

This guide covers installation from GitHub with the Devin CLI.

<ThirdPartyDisclaimer />

## Prerequisites

- [An Apify account](https://console.apify.com/sign-up) - sign up for free if you don't have one.
- [Devin CLI](https://docs.devin.ai/cli/index) - installed and signed in locally with `devin auth login`. Managing plugins requires an authenticated Devin session.

## Install the plugin

Install the plugin from its GitHub source. Devin shows what the plugin adds - skills, MCP servers, and any required plugins - then asks you to confirm. Pass `-y` to skip the prompt.

```bash
devin plugins install apify/apify-devin-plugin
```

The plugin is installed at the user level and is available across your projects. By default, Devin records it in your personal manifest, so it also loads on other machines you sign in to and in Devin Cloud sessions. Pass `--local` to install on the current machine only:

```bash
devin plugins install --local apify/apify-devin-plugin
```

Confirm the plugin is listed:

```bash
devin plugins list
```

## Authenticate to Apify

The plugin bundles the Apify MCP server. You need to authenticate to run Actors and access your account data.

1. Start the Apify OAuth flow:

    ```bash
    devin mcp login apify
    ```

    Devin opens a browser tab for the Apify OAuth flow.

1. Review the permissions and click **Allow access**.

1. Back in the terminal, the **apify** MCP server is connected and tools are live.

CLI credentials aren't shared with Devin Cloud. For cloud sessions, connect the Apify MCP server in the [Devin web app](https://docs.devin.ai/product-guides/plugins#mcps).

:::tip Session persistence

The connection stays authenticated for future sessions. You can revoke access at any time in [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations).

:::

## Run your first prompt

Ask Devin to use the `apify` subagent so the routing subagent handles it. It picks the right tool or skill from a natural-language request, so you don't need to name tools yourself.

> Use the apify subagent. Use Apify to find a good Actor for scraping Google Maps places. Show me the best option, its input requirements, pricing model, and what kind of dataset output it returns. Do not run the Actor yet.

The `apify` subagent searches Apify Store, fetches the top Actor's details through the Apify MCP server, and summarizes its inputs, pricing, and output - all without running the Actor.

Installed skills are also available as `/apify:<skill>` slash commands. See [Bundled skills](#bundled-skills) for the skill names.

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

### The Apify plugin doesn't appear in `devin plugins list`

Confirm you're signed in with `devin auth login`, then reinstall:

```bash
devin plugins install apify/apify-devin-plugin
```

If you installed with `--local`, the plugin stays on this machine and doesn't sync to Devin Cloud. An enterprise can disable CLI plugins for its members, in which case installed plugins aren't applied.

### Devin picks the wrong skill

Ask Devin to use the `apify` subagent so the routing subagent handles it. The subagent owns the guardrails that pick the right skill and avoid common traps, such as confusing the `apify` and `apify-client` packages.

### The Apify MCP server shows as unauthenticated

Clear stored credentials and run the browser flow again:

```bash
devin mcp logout apify
devin mcp login apify
```

See [Authenticate to Apify](#authenticate-to-apify).

### Browser doesn't open, or OAuth fails

If the browser doesn't open automatically, copy the OAuth URL shown in the terminal and paste it into your browser manually.

If you're running Devin in a headless environment (SSH, remote container) or the OAuth flow still fails, authenticate with an API token instead. Copy your token from [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations) and set it before starting Devin:

```bash
export APIFY_TOKEN=<YOUR_API_TOKEN>
```

## Limitations

- Plugin custom subagents load in the Devin CLI and Devin Desktop only - not in Devin Cloud sessions. Skills and the Apify MCP server still load in cloud sessions.
- Devin plugins are in beta, so install commands and MCP auth behavior may change between releases.
- Long-running Actors may exceed the time a single tool call waits for completion. Reduce the scope or split the work across multiple prompts.
- Each Actor run consumes Apify platform usage from your plan in addition to any Devin usage. See [Billing](/account/billing) for details.
- Skills that edit files in your project (Actor development, actorization, SDK integration) make local changes - review them before deploying or committing.

## Related integrations

- [MCP server integration](/integrations/mcp) - Use the Apify MCP server with other clients
- [ChatGPT integration](/integrations/chatgpt) - Connect the Apify MCP server to ChatGPT

## Resources

- [Apify plugin for Devin](https://github.com/apify/apify-devin-plugin) - Source repository and full README with advanced setup notes (all auth paths, available MCP tools)
- [Devin CLI plugins](https://docs.devin.ai/cli/extensibility/plugins/overview) - Official Devin plugin install and management reference
- [Devin CLI MCP](https://docs.devin.ai/cli/extensibility/mcp/overview) - Official Devin MCP configuration and authentication reference
- [Apify Store](https://apify.com/store) - Browse Actors you can run from Devin
