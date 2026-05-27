---
title: Claude Code integration
sidebar_label: Claude Code
description: Learn how to install the Apify plugin for Claude Code to discover, run, and build Actors with the Apify MCP server, skills, and a routing agent.
sidebar_position: 21
slug: /integrations/claude-code
---

[Claude Code](https://code.claude.com/docs/en/overview) is Anthropic's agentic coding tool. It reads and edits your codebase, runs commands, and completes multi-step development tasks, both from the command line and in the Claude Code app.

The [Apify plugin for Claude Code](https://github.com/apify/apify-claude-code-plugin) connects Claude Code to Apify's library of [Actors](https://apify.com/store) and bundles everything you need to use Apify without leaving your editor:

- The [Apify MCP server](/platform/integrations/mcp) for searching the Store, fetching Actor details, running Actors, and retrieving datasets through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro).
- An `apify` routing agent that reads your request and selects the right skill or transport (MCP, CLI, or SDK).
- Five skills covering Actor development, actorization, output schema generation, SDK integration, and a CLI-driven scraping workflow.

_Example prompt_:

> "Find a good Actor for scraping Google Maps places, then show its input requirements and pricing. Don't run it yet."

This guide covers the shared prerequisites, then two ways to install the plugin - from the command line and from the Claude Code app - and finishes with authentication and example prompts that apply to both.

:::info This is Claude Code, not the Claude app

This plugin requires Claude Code, Anthropic's coding tool. It does not work in the consumer Claude apps - Claude Desktop, the Claude web app, or Cowork. Install Claude Code first by following the [official documentation](https://code.claude.com/docs/en/overview).

:::

## Prerequisites

Before installing the plugin, you'll need:

- [An Apify account](https://console.apify.com/sign-up) - If you don't have one yet, sign up for free.
- [Claude Code](https://code.claude.com/docs/en/overview) installed and authenticated locally.

## What the plugin includes

The plugin works the same way regardless of how you run Claude Code.

### The `apify` routing agent

The plugin's skills are invoked through the `apify` agent rather than directly. The agent inspects your request and chooses the appropriate skill and transport - MCP for read-only discovery and quick runs, the CLI for Actor development, or the SDK for application integration.

### Bundled skills

| Skill | Description |
| --- | --- |
| `apify-ultimate-scraper` | CLI-driven extraction using existing Actors for multi-step scraping and lead-generation workflows. |
| `apify-actor-development` | Full Actor lifecycle - template selection, development, local testing, and deployment with `apify push`. |
| `apify-actorization` | Converts existing JavaScript, TypeScript, Python, or CLI projects into Apify Actors. |
| `apify-generate-output-schema` | Generates dataset and key-value store schemas for existing Actors. |
| `apify-sdk-integration` | Integrates Actor execution into applications using the `apify-client` package. |

The plugin also bundles the Apify MCP server. Once the plugin is installed and enabled, the MCP server starts automatically - there's no separate connection step.

## Set up in the CLI

Start Claude Code in your terminal and run `/plugin` to open the plugin manager. How you install depends on whether the plugin is in Claude Code's official marketplace.

### From the official marketplace

The official marketplace is built in, so there's nothing to add.

1. Open the **Marketplaces** tab and select **claude-plugins-official**.
1. Find the `apify` plugin and install it.

### By adding the Apify marketplace

If the plugin isn't in the official marketplace, add the Apify repository as a marketplace first.

1. Open the **Marketplaces** tab and select **Add Marketplace**, then enter the Apify repository:

    ```text
    apify/apify-claude-code-plugin
    ```

1. Find the `apify` plugin and install it.

After installing, open the **Installed** tab to confirm the `apify` plugin and its bundled MCP server are listed.

<!-- IMAGE PLACEHOLDER: images/claude-code/cli-plugin-installed.png
     Capture the /plugin manager "Installed" tab in the Claude Code CLI, showing the apify plugin entry and the apify MCP server listed beneath it. -->

The first time the MCP server needs your account, Claude Code prompts you to authorize the Apify connection. See [Authenticate](#authenticate) below.

## Set up in the Claude Code app

In the Claude Code app, open the **Customize** tab and select **Personal plugins**. From here you can install the plugin in the same two ways as the CLI:

- **Browse** the available plugins from the official marketplace, find `apify`, and install it.
- Or **Add** the Apify repository (`apify/apify-claude-code-plugin`) as a marketplace, then install the `apify` plugin from it.

<!-- IMAGE PLACEHOLDER: images/claude-code/app-personal-plugins.png
     Capture the Claude Code app Customize tab with Personal plugins selected, showing the browse/add options and the apify plugin. -->

The bundled MCP server starts automatically once the plugin is enabled. If you enable or disable the plugin during a session, run `/reload-plugins` to apply the change.

## Authenticate

The plugin uses three transports - MCP, the Apify CLI, and the Apify SDK - each with its own authentication path. You only need the ones relevant to your task.

### MCP (OAuth)

When the agent first calls a tool that runs an Actor or accesses your account, Claude Code opens a browser window to sign in to Apify via OAuth. After you authorize, the connection stays authenticated for future sessions.

<!-- IMAGE PLACEHOLDER: images/claude-code/oauth-login.png
     Capture the OAuth sign-in prompt that Claude Code shows the first time the apify MCP server needs authorization. -->

Read-only operations such as searching the Store and fetching Actor details work without signing in.

:::tip Revoke access

You can revoke the plugin's access to your Apify account at any time in [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations).

:::

### Apify CLI

Skills that use the Apify CLI (such as Actor development and the ultimate scraper) require the CLI to be installed and authenticated:

1. Install the CLI globally (requires [Node.js](https://nodejs.org)):

    ```bash
    npm install -g apify-cli
    ```

1. Authenticate, either interactively or with a token:

    ```bash
    apify login
    ```

    Alternatively, set your [API token](https://console.apify.com/settings/integrations) as an environment variable:

    ```bash
    export APIFY_TOKEN=<YOUR_API_TOKEN>
    ```

### Apify SDK

The SDK integration skill adds Apify to your application code using the `apify-client` package. It reads your API token from the `APIFY_TOKEN` environment variable:

```bash
export APIFY_TOKEN=<YOUR_API_TOKEN>
```

## Example prompts

In Claude Code, describe what you want in natural language. The `apify` agent routes the request to the right skill or MCP tool, so you don't need to name tools yourself. These prompts work the same in the CLI and the UI.

Search the Store and inspect an Actor without running it:

> "Find a good Actor for scraping Google Maps places, then show its input requirements, pricing model, and output fields. Don't run it yet."

Run an Actor and retrieve its results:

> "Run an Actor that extracts the page title from `https://example.com`, then show me the dataset items."

<!-- IMAGE PLACEHOLDER: images/claude-code/agent-routing.png
     Capture a Claude Code session where the apify agent picks up a request and calls an Apify MCP tool (for example, search-actors or call-actor). -->

Prompts that route to specific skills:

- _Ultimate scraper_ - "Find 10 highly rated coffee shops in Seattle with business name, address, rating, phone, and website."
- _Actor development_ - "Create an Apify Actor that accepts a `startUrl` and `maxPages` input, crawls the site, and stores each page title and URL in the default dataset."
- _SDK integration_ - "Add Apify to this project. The Node.js API route should run an Actor, wait for it to finish, and return dataset items as JSON."

## Available tools

The bundled Apify MCP server exposes tools for Actor discovery (`search-actors`, `fetch-actor-details`, `call-actor`, `get-actor-output`), web browsing (`apify/rag-web-browser`), and documentation search (`search-apify-docs`, `fetch-apify-docs`). The `apify` agent calls these for you - you don't need to select tools manually. See the [full tool reference](/platform/integrations/mcp#available-tools) for the complete list.

## Troubleshooting

### The `/plugin` command isn't available

Plugins require a local installation of Claude Code - the terminal CLI or the Claude Code app. They aren't available in remote or web sessions (claude.ai/code). Make sure you're on the latest version with a local install.

### The plugin or MCP server doesn't appear

Run `/plugin`, select the **Installed** tab, and confirm both the `apify` plugin and its MCP server are listed. If the MCP server is missing, run `/reload-plugins`, or reinstall the plugin from the **Marketplaces** tab and restart Claude Code.

### OAuth login doesn't work

If the OAuth prompt fails, authenticate the CLI-based skills with a token instead. Copy your token from [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations) and export it:

```bash
export APIFY_TOKEN=<YOUR_API_TOKEN>
```

### CLI skills fail with an authentication error

Skills that use the Apify CLI need a logged-in CLI. Run `apify login`, or set the `APIFY_TOKEN` environment variable before starting Claude Code.

## Limitations

- Long-running Actors may exceed the time a single tool call waits for completion. If a scrape times out, reduce the scope (fewer URLs, smaller result limits) or split the work across multiple prompts.
- Each Actor run consumes Apify platform usage in addition to any Claude usage. Complex workflows that chain multiple Actors can add up quickly.
- CLI and SDK skills run commands and edit files in your project. Review changes before deploying with `apify push` or committing generated code.

## Related integrations

- [MCP server integration](/platform/integrations/mcp) - Use the Apify MCP server with Claude Desktop, VS Code, and other clients
- [ChatGPT integration](/platform/integrations/chatgpt) - Connect the Apify MCP server to ChatGPT
- [Manus integration](/integrations/manus) - Connect Apify to Manus and import Apify Agent Skills

## Resources

- [Apify plugin for Claude Code](https://github.com/apify/apify-claude-code-plugin) - Source repository and installation reference
- [Claude Code documentation](https://code.claude.com/docs/en/overview) - Official Claude Code docs
- [Claude Code plugins](https://docs.anthropic.com/en/docs/claude-code) - How plugins, agents, and skills work in Claude Code
- [Apify MCP server configurator](https://mcp.apify.com) - Interactive tool to configure and preview the Apify MCP server
- [Apify Store](https://apify.com/store) - Browse Actors you can run from Claude Code
