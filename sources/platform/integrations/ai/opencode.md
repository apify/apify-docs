---
title: OpenCode integration
sidebar_label: OpenCode
description: Learn how to install the Apify plugin for OpenCode to discover, search, run, and build Actors with the Apify MCP server directly from your terminal.
slug: /integrations/opencode
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

[OpenCode](https://opencode.ai) is an open-source AI coding agent that runs in your terminal. It reads and edits your codebase, runs commands, and completes multi-step development tasks.

The [Apify plugin for OpenCode](https://www.npmjs.com/package/opencode-apify) connects OpenCode to Apify's library of [Actors](https://apify.com/store) by bundling the [Apify MCP server](/integrations/mcp) for searching Apify Store, running Actors, and retrieving datasets through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro).

<ThirdPartyDisclaimer />

## Prerequisites

- [An Apify account](https://console.apify.com/sign-up) - sign up for free if you don't have one.
- [OpenCode](https://opencode.ai) - installed and authenticated locally.

## Install the plugin

You can add the plugin with the OpenCode CLI or by editing your configuration file directly.

Run the following command in your project:

```bash
opencode plugin opencode-apify
```

Alternatively, add the plugin to your `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-apify"]
}
```

## Authenticate to Apify

The plugin bundles the Apify MCP server. Read-only tools like searching Apify Store and fetching Actor details work without signing in, but you need to authenticate to run Actors and access your account data.

1. List the configured MCP servers:

    ```bash
    opencode mcp list
    ```

    The Apify MCP server appears as **not connected** until you authenticate.

1. Start the Apify OAuth flow:

    ```bash
    opencode mcp auth apify
    ```

    OpenCode opens a browser tab for the Apify OAuth flow.

1. Review the permissions and click **Allow access**.

After you complete the flow, the Apify MCP server shows as connected and you're all set.

:::tip Session persistence

The connection stays authenticated for future sessions. You can revoke access at any time in [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations).

:::

## Run your first prompt

Describe what you want in natural language. OpenCode routes the request to the Apify MCP server, so you don't need to name tools yourself.

> Use Apify to find a good Actor for scraping Google Maps places. Show me the best option, its input requirements, pricing model, and what kind of dataset output it returns. Do not run the Actor yet.

OpenCode searches Apify Store, fetches the top Actor's details through the Apify MCP server, and summarizes its inputs, pricing, and output - all without running the Actor.

## Troubleshooting

### The Apify MCP server shows as not connected

Run `opencode mcp list` to confirm the server is registered. If it appears as not connected, authenticate with `opencode mcp auth apify` and complete the OAuth flow. See [Authenticate to Apify](#authenticate-to-apify).

### The plugin isn't loaded

Print the resolved OpenCode configuration to confirm the plugin is registered:

```bash
opencode debug config
```

Check that `opencode-apify` is listed under `plugin`. If it's missing, add it to your `opencode.json` or run `opencode plugin opencode-apify` again.

### Browser doesn't open, or OAuth fails

If the browser doesn't open automatically, copy the OAuth URL shown in the terminal and paste it into your browser manually.

If you're running OpenCode in a headless environment (SSH, remote container) or the OAuth flow still fails, authenticate with an API token instead. Copy your token from [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations) and set it before starting OpenCode:

```bash
export APIFY_TOKEN=<YOUR_API_TOKEN>
```

## Limitations

- Long-running Actors may exceed the time a single tool call waits for completion. Reduce the scope or split the work across multiple prompts.
- Each Actor run consumes Apify platform usage from your plan in addition to any OpenCode usage. See [Billing](/account/billing) for details.

## Related integrations

- [Claude Code CLI integration](/integrations/claude-code-cli) - Install the Apify plugin for Claude Code CLI
- [MCP server integration](/integrations/mcp) - Use the Apify MCP server with other clients

## Resources

- [Apify plugin for OpenCode](https://www.npmjs.com/package/opencode-apify) - Plugin package and setup notes
- [OpenCode documentation](https://opencode.ai/docs) - Official OpenCode docs
- [Apify Store](https://apify.com/store) - Browse Actors you can run from OpenCode
