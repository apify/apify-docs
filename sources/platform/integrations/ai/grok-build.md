---
title: Grok Build integration
sidebar_label: Grok Build
description: Learn how to install the Apify plugin for Grok Build to discover, run, and build Actors with the Apify MCP server directly from your terminal.
slug: /integrations/grok-build
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

[Grok Build](https://docs.x.ai/build) is xAI's agentic coding tool that runs in your terminal. It reads and edits your codebase, runs commands, and completes multi-step development tasks.

The Apify plugin connects Grok Build to Apify's library of [Actors](https://apify.com/store) and bundles the [Apify MCP server](/platform/integrations/mcp) for searching the Store, running Actors, and retrieving datasets through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro).

The plugin is published in the [official xAI plugin marketplace](https://github.com/xai-org/plugin-marketplace), so you can install it without leaving your terminal.

<ThirdPartyDisclaimer />

## Prerequisites

- [An Apify account](https://console.apify.com/sign-up) - sign up for free if you don't have one.
- [Grok Build](https://docs.x.ai/build) - installed and authenticated locally.

## Add the Apify marketplace

The Apify plugin lives in the official xAI marketplace. Make sure that marketplace is connected before you install.

1. List the marketplaces you have connected:

    ```bash
    grok plugin marketplace list
    ```

2. If the official marketplace (`plugin-marketplace`, `https://github.com/xai-org/plugin-marketplace.git`) isn't listed, add it:

    ```bash
    grok plugin marketplace add xai-org/plugin-marketplace
    ```

## Install the plugin

3. Start Grok Build:

    ```bash
    grok
    ```

4. Run `/plugins` to open the extensions manager, then open the **Marketplace** tab. The official `plugin-marketplace` appears in the list.

5. Search for `apify`.

6. Select the **apify** plugin and press `i` to install it.

## Authenticate to Apify

The plugin bundles the Apify MCP server. Read-only tools like searching the Store and fetching Actor details work without signing in, but you need to authenticate to run Actors and access your account data.

7. Open the **MCP servers** tab. The Apify MCP server appears with a **[needs auth]** label.


8. Select the Apify MCP server to start the OAuth flow. Grok Build opens a browser tab for Apify.

9. Review the permissions and click **Allow access**.

    :::caution Dynamic registration warning

    The OAuth page shows a warning that the application was registered dynamically and wasn't verified by Apify. This is expected - the plugin uses dynamic OAuth client registration. Make sure you trust this installation before allowing access.

    :::

10. After you finish the OAuth flow, the **[needs auth]** label disappears and the Apify MCP server is connected.

:::tip Session persistence

The connection stays authenticated for future sessions. You can revoke access at any time in [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations).

:::

## Run your first prompt

Describe what you want in natural language. Grok Build routes the request to the right Apify MCP tool, so you don't need to name tools yourself.

> "Use Apify to find a good Actor for scraping Google Maps places. Show me the best option, its input requirements, pricing model, and what kind of dataset output it returns. Do not run the Actor yet."

Grok Build searches Apify Store, fetches the top Actor's details through the Apify MCP server, and summarizes its inputs, pricing, and output - all without running the Actor.

## Troubleshooting

### The `/plugins` command isn't available

Plugins require a local installation of Grok Build. Install or update Grok Build locally, then restart your session.

### Browser doesn't open, or OAuth fails

If the browser doesn't open automatically, copy the OAuth URL shown in the terminal and paste it into your browser manually.

If you're running Grok Build in a headless environment (SSH, remote container) or the OAuth flow still fails, authenticate with an API token instead. Copy your token from [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations) and configure the Apify MCP server with an `Authorization` header set to `Bearer <YOUR_API_TOKEN>`. See the [Apify MCP server documentation](/platform/integrations/mcp) for details.

## Limitations

- Long-running Actors may exceed the time a single tool call waits for completion. Reduce the scope or split the work across multiple prompts.
- Each Actor run consumes Apify platform usage from your plan in addition to any Grok usage. See [Billing](/platform/console/billing) for details.

## Related integrations

- [Claude Code CLI integration](/platform/integrations/claude-code-cli) - Install the Apify plugin for Claude Code
- [MCP server integration](/platform/integrations/mcp) - Use the Apify MCP server with other clients

## Resources

- [xAI plugin marketplace](https://github.com/xai-org/plugin-marketplace) - Official catalog of Grok Build plugins
- [Grok Build documentation](https://docs.x.ai/overview) - Official Grok Build docs
- [Apify Store](https://apify.com/store) - Browse Actors you can run from Grok Build
