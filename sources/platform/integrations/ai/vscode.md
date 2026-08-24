---
title: VS Code integration
sidebar_label: VS Code
description: Learn how to install the Apify agent plugin in VS Code to discover, run, and build Actors with the Apify MCP server, bundled skills, and a routing agent.
slug: /integrations/vscode
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

[Visual Studio Code (VS Code)](https://code.visualstudio.com/) is Microsoft's code editor. Its [agent plugins](https://code.visualstudio.com/docs/agent-customization/agent-plugins) are prepackaged bundles of agent customizations - skills, agents, and MCP servers - that you install from a plugin marketplace and use in chat.

The [Apify plugin](https://github.com/apify/apify-github-copilot-plugin) is published in the [Awesome Copilot](https://awesome-copilot.github.com/plugins) marketplace, which VS Code registers by default. It connects VS Code to Apify's library of [Actors](https://apify.com/store) and bundles:

- The [Apify MCP server](/integrations/mcp) for searching Apify Store, running Actors, and retrieving datasets through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro).
- An `apify` routing agent that picks the right tool or skill from a natural-language request.
- Five built-in skills for common workflows (see [Bundled skills](#bundled-skills) below).

This guide covers installation from the plugin marketplace in VS Code. It's the same plugin that powers the [GitHub Copilot CLI](/integrations/github-copilot-cli) and the [GitHub Copilot desktop app](/integrations/github-copilot-desktop) - install it once per client you use.

<ThirdPartyDisclaimer />

## Prerequisites

- [An Apify account](https://console.apify.com/sign-up) - sign up for free if you don't have one.
- [VS Code](https://code.visualstudio.com/) version 1.120 or newer, with AI features enabled and signed in.
- Agent plugin support enabled - set `chat.plugins.enabled` to `true` in Settings.

## Install the plugin

1. Open the Extensions view (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd>, or <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd> on macOS) and enter `@agentPlugins` in the search field. Alternatively, run **Chat: Plugins** from the Command Palette (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>, or <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> on macOS).

1. Find the **apify** plugin in the list. Type `apify` after the filter to narrow the results. The entry is labeled `github/awesome-copilot#marketplace`.

1. Select **Install** on the **apify** entry.

1. The first time you install a plugin from a marketplace, VS Code shows a trust prompt. Review the source and confirm.

The installed plugin appears in the **Agent Plugins - Installed** section of the Extensions view.

## Authenticate to Apify

The plugin bundles the Apify MCP server (`https://mcp.apify.com/`), and VS Code starts it as soon as the plugin is enabled. Read-only tools like searching Apify Store and fetching Actor details work without signing in, but you need to authenticate to run Actors and access your account data.

1. VS Code prompts that the MCP server wants to authenticate to `console-backend.apify.com`. Select **Allow**.

1. Complete the Apify OAuth flow in your browser and choose the account to connect.

1. Run **MCP: List Servers** from the Command Palette and confirm that `apify-mcp-server` is running.

:::tip Session persistence

The connection stays authenticated for future sessions. You can revoke access at any time in [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations).

:::

## Run your first prompt

Open Chat, select the **apify** agent from the mode picker, and describe what you want in natural language. The agent routes the request to the right tool or skill, so you don't need to name tools yourself.

> Use Apify to find a good Actor for scraping Google Maps places. Show me the best option, its input requirements, pricing model, and what kind of dataset output it returns. Do not run the Actor yet.

The agent searches Apify Store, fetches the top Actor's details through the Apify MCP server, and summarizes its inputs, pricing, and output - all without running the Actor.

To check what's available, ask the agent to list its Apify tools.

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

## Authentication paths

The `apify` agent picks the right transport for each task. Each transport authenticates differently:

- For MCP tools (search, run, retrieve data), authenticate with OAuth through the browser, as described in [Authenticate to Apify](#authenticate-to-apify). You don't need to set up a token.
- For the Apify CLI (building Actors, actorization, CLI fallback), run `apify login` once, or set `APIFY_TOKEN` in headless environments. Get your token from [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations).
- For SDK integration with `apify-client`, set the `APIFY_TOKEN` environment variable in your application's environment.

## Manage the plugin

- To update the plugin, run **Extensions: Check for Extension Updates** from the Command Palette. VS Code also checks every 24 hours when `extensions.autoUpdate` is enabled.
- To enable or disable the plugin, use its context menu in the **Agent Plugins - Installed** section of the Extensions view. Disabling it stops the bundled MCP server and hides the `apify` agent and skills from chat. You can disable it globally or for a single workspace.
- To remove the plugin, right-click it in **Agent Plugins - Installed** and select **Uninstall**.

## Troubleshooting

### The `apify` plugin doesn't appear in the list

Confirm that `chat.plugins.enabled` is set to `true` and that you're running VS Code 1.120 or newer. If you overrode the `chat.plugins.marketplaces` setting, restore both marketplaces that VS Code registers by default:

```json5
// settings.json
"chat.plugins.marketplaces": [
    "github/awesome-copilot",
    "github/copilot-plugins"
]
```

### The Apify MCP server doesn't start

Run **MCP: List Servers** from the Command Palette, select `apify-mcp-server`, and start or restart it. Check the **Output** panel (**MCP: apify-mcp-server**) - a successful start ends with a line about the discovered tools. In Chat, open **Configure Tools** and confirm that **Apify MCP Server** is enabled for the `apify` agent.

### Browser doesn't open, or OAuth fails

If the browser doesn't open automatically, copy the OAuth URL from the VS Code dialog and paste it into your browser manually.

If you're running VS Code over SSH, in a dev container, or in any environment without a browser, the MCP OAuth flow can't complete. Authenticate locally first so the connection is stored, or use the Apify CLI and SDK paths instead - run `apify login`, or set `APIFY_TOKEN` with a token from [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations):

```bash
export APIFY_TOKEN=<YOUR_API_TOKEN>
```

### Installation fails with "destination path already exists"

A previous install left a cached copy of the plugin. Delete the cached directory and install again:

- macOS: `~/Library/Application Support/Code/agentPlugins/github.com/apify/apify-github-copilot-plugin`
- Linux: `~/.config/Code/agentPlugins/github.com/apify/apify-github-copilot-plugin`
- Windows: `%APPDATA%\Code\agentPlugins\github.com\apify\apify-github-copilot-plugin`

### The agent picks the wrong skill or transport

Start from the **apify** agent. It is the single entry point that detects the available transport and routes each request to the correct tool or skill.

## Limitations

- Long-running Actors may exceed the time a single tool call waits for completion. Reduce the scope or split the work across multiple prompts.
- Each Actor run consumes Apify platform usage from your plan in addition to any VS Code usage. See [Billing](/account/billing) for details.
- Skills that edit files in your project (Actor development, actorization, SDK integration) make local changes - review them before deploying or committing.

## Related integrations

- [GitHub Copilot hub](/integrations/github-copilot) - Every client that runs the Apify plugin for GitHub Copilot
- [GitHub Copilot CLI integration](/integrations/github-copilot-cli) - Install the same plugin in your terminal
- [GitHub Copilot desktop app integration](/integrations/github-copilot-desktop) - Install the same plugin in the desktop app
- [Cursor integration](/integrations/cursor) - Install the Apify plugin in Cursor
- [MCP server integration](/integrations/mcp) - Use the Apify MCP server with other clients

## Resources

- [Apify plugin repository](https://github.com/apify/apify-github-copilot-plugin) - Source repository and full README with advanced setup notes
- [Agent plugins in VS Code](https://code.visualstudio.com/docs/agent-customization/agent-plugins) - Official VS Code documentation
- [Awesome Copilot plugin marketplace](https://awesome-copilot.github.com/plugins) - Browse the plugins VS Code registers by default
- [Apify Store](https://apify.com/store) - Browse Actors you can run from VS Code
