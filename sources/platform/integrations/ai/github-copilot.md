---
title: GitHub Copilot integration
sidebar_label: GitHub Copilot
description: Learn how to install the Apify plugin for GitHub Copilot in VS Code to discover, run, and build Actors with the Apify MCP server, skills, and a routing agent.
slug: /integrations/github-copilot
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

[GitHub Copilot](https://github.com/features/copilot) is GitHub's AI coding assistant. In VS Code, its agent mode reads and edits your workspace, runs commands, and completes multi-step development tasks.

The [Apify plugin for GitHub Copilot](https://github.com/apify/apify-github-copilot-plugin) connects Copilot to Apify's library of [Actors](https://apify.com/store) and bundles:

- The [Apify MCP server](/platform/integrations/mcp) for searching Apify Store, running Actors, and retrieving datasets through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro).
- An `apify` routing agent that picks the right tool or skill from a natural-language request.
- Five built-in skills for common workflows (see [Bundled skills](#bundled-skills) below).

This guide covers setup in VS Code.

<ThirdPartyDisclaimer />

## Prerequisites

- [An Apify account](https://console.apify.com/sign-up) - sign up for free if you don't have one.
- [VS Code](https://code.visualstudio.com/) version 1.120 or newer, with the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension installed and signed in with Copilot access.

## Install the plugin

Install the plugin directly from its GitHub repository - there's no need to clone it.

1. Copy the plugin repository URL:

    ```text
    https://github.com/apify/apify-github-copilot-plugin
    ```

1. In VS Code, open the Command Palette (`Ctrl+Shift+P`, or `Cmd+Shift+P` on macOS) and run **Chat: Install Plugin from Source**.

    ![VS Code Command Palette with the Chat: Install Plugin from Source command selected](images/github-copilot/install-plugin-command.webp)

1. Paste the repository URL into the input field and press Enter.

    ![VS Code input field with the Apify plugin repository URL pasted in](images/github-copilot/install-plugin-url.webp)

1. In the trust dialog, review the source and select **Trust**.

    ![VS Code dialog asking whether to trust plugins from the Apify repository](images/github-copilot/install-plugin-trust.webp)

1. VS Code installs the plugin and opens the **Plugin: apify** panel, which shows **Disable** and **Uninstall** actions. You can reopen it anytime from the Command Palette (`Ctrl+Shift+P`, or `Cmd+Shift+P` on macOS) with **Chat: Plugins**, which lists your installed agent plugins.

    ![VS Code Plugin: apify panel open over the Agent Plugins list, showing the installed Apify plugin](images/github-copilot/plugin-installed.webp)

1. Open Copilot Chat, open the mode picker, and select the **apify** agent.

    ![Copilot Chat mode picker with the apify agent selected](images/github-copilot/agent-picker.webp)

## Connect the Apify MCP server

The plugin bundles the Apify MCP server (`https://mcp.apify.com/`) - its configuration ships in the plugin's `.mcp.json`, so you don't add it manually. Read-only tools like searching Apify Store and fetching Actor details work without signing in, but you need to authenticate to run Actors and access your account data.

1. Open the tools picker in Copilot Chat and confirm that **Apify MCP Server** is selected for the `apify` agent.

    ![Configure Tools dialog with Apify MCP Server enabled for the apify agent](images/github-copilot/configure-tools.webp)

1. Open the plugin's `.mcp.json`. A **Start** action appears above the `apify-mcp-server` entry - select it to start the server.

    ![Bundled .mcp.json with the Start action above the apify-mcp-server entry](images/github-copilot/mcp-start.webp)

1. VS Code prompts that the MCP server wants to authenticate to `console-backend.apify.com`. Select **Allow**, complete the Apify OAuth flow in your browser, and choose the account to connect.

    ![VS Code dialog asking to allow the apify-mcp-server to authenticate to console-backend.apify.com](images/github-copilot/mcp-oauth-allow.webp)

1. The `apify-mcp-server` entry shows **Running** and exposes its tools.

    ![Bundled .mcp.json showing the apify-mcp-server as Running with Stop and Restart actions](images/github-copilot/mcp-running.webp)

:::tip Session persistence

The connection stays authenticated for future sessions. You can revoke access at any time in [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations).

:::

## Run your first prompt

Select the **apify** agent and describe what you want in natural language. The agent routes the request to the right tool or skill, so you don't need to name tools yourself.

> Use Apify to find a good Actor for scraping Google Maps places. Show me the best option, its input requirements, pricing model, and what kind of dataset output it returns. Do not run the Actor yet.

The agent searches Apify Store, fetches the top Actor's details through the Apify MCP server, and summarizes its inputs, pricing, and output - all without running the Actor.

To check what's available, ask the agent to list its Apify tools.

![Copilot Chat listing the available Apify MCP tools](images/github-copilot/verify-tools.webp)

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

The `apify` agent uses the transport that fits the task, and each one authenticates differently:

- For MCP tools (search, run, retrieve data), authenticate with OAuth through the browser, as described in [Connect the Apify MCP server](#connect-the-apify-mcp-server). No token setup is needed.
- For the Apify CLI (building Actors, actorization, CLI fallback), run `apify login` once, or set `APIFY_TOKEN` in headless environments. Get your token from [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations).
- For SDK integration with `apify-client`, set the `APIFY_TOKEN` environment variable in your application's environment.

## Troubleshooting

### The `apify` agent doesn't appear in the picker

Confirm that the plugin is installed and trusted (rerun **Chat: Install Plugin from Source** if needed), that **Chat: Plugins** is enabled in Settings, and that you reloaded the window after installing. Plugin support requires VS Code 1.120 or newer.

### The Apify MCP server won't start

Open the plugin's `.mcp.json` and select the **Start** action above the `apify-mcp-server` entry, then complete the **Allow** prompt and account selection. Check the **Output** panel (**MCP: apify-mcp-server**) - a successful start ends with a line about the discovered tools. Confirm the **Apify MCP Server** tool is enabled for the `apify` agent in the tools picker.

### Browser doesn't open, or OAuth fails

If the browser doesn't open automatically, copy the OAuth URL from the VS Code dialog and paste it into your browser manually.

If you're running VS Code over SSH, in a dev container, or in any environment without a browser, the MCP OAuth flow can't complete. Authenticate locally first so the connection is stored, or use the CLI and SDK paths instead - run `apify login`, or set `APIFY_TOKEN`:

```bash
export APIFY_TOKEN=<YOUR_API_TOKEN>
```

### The agent picks the wrong skill or transport

Start from the **apify** agent. It is the single entry point that detects the available transport and routes each request to the correct tool or skill.

## Limitations

- Copilot plugin support is a preview feature in VS Code, so its settings and behavior may change between releases.
- The plugin is installed from its GitHub repository URL; it isn't published to a plugin marketplace yet.
- Long-running Actors may exceed the time a single tool call waits for completion. Reduce the scope or split the work across multiple prompts.
- Each Actor run consumes usage on the Apify platform from your plan in addition to any Copilot usage. See the [Apify billing documentation](/platform/console/billing) for details.
- Skills that edit files in your project (Actor development, actorization, SDK integration) make local changes - review them before deploying or committing.

## Related integrations

- [Claude Code CLI integration](/platform/integrations/claude-code-cli) - Install the Apify plugin in the Claude Code CLI
- [MCP server integration](/platform/integrations/mcp) - Use the Apify MCP server with other clients

## Resources

- [Apify plugin for GitHub Copilot](https://github.com/apify/apify-github-copilot-plugin) - Source repository and full README with advanced setup notes
- [GitHub Copilot documentation](https://docs.github.com/en/copilot) - Official GitHub Copilot docs
- [Apify MCP server documentation](/platform/integrations/mcp) - Connect the Apify MCP server to other clients
- [Apify Store](https://apify.com/store) - Browse Actors you can run from Copilot
