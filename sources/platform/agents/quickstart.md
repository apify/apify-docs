---
title: Agent quickstart
sidebar_label: Agent quickstart
sidebar_position: 0.5
description: Connect your AI agent to the Apify MCP server, run your first Actor from a single prompt, and cap what a run your agent starts can cost you.
slug: /agents/quickstart
toc_max_heading_level: 3
pagination_next: null
pagination_prev: null
---

import ClaudeCodeWebEgress from '@site/sources/_partials/_claude-code-web-egress.mdx';

Connect your AI agent to the Apify MCP server and run your first Actor. For how the MCP server, plugins, and Agent Skills compare, and for the setup guide for your agent, see [For AI agents](/agents).

Apify also serves a quickstart for agents to read directly at [`apify.com/agents.md`](https://apify.com/agents.md).

## Prerequisites

Sign up to [Apify Console](https://console.apify.com/sign-up). The free plan includes monthly platform usage credits with no credit card required. Get your API token from **[Console > Settings > Integrations](https://console.apify.com/settings/integrations)**.

<ClaudeCodeWebEgress />

## Connect the MCP server

The [Apify MCP server](/mcp) connects your agent to the full Apify platform via the [Model Context Protocol](https://modelcontextprotocol.io/). No local installation needed for remote-capable clients.

If you don't have an Apify account yet, connect to `https://mcp.apify.com/?tools=search-actors,fetch-actor-details,search-apify-docs,fetch-apify-docs`. These tools search Actors and the documentation without an API token, but can't run Actors. For details, see [using the MCP server without an account](/mcp#use-without-an-account).

To connect a client that supports remote MCP servers, such as Claude Code, Cursor, VS Code, or GitHub Copilot, to `https://mcp.apify.com`:

1. Add the following to your MCP client's configuration:

    ```json
    {
      "mcpServers": {
        "apify": {
          "type": "http",
          "url": "https://mcp.apify.com"
        }
      }
    }
    ```

1. Restart your client and sign in when prompted. OAuth handles authentication automatically.

Claude Desktop doesn't accept a remote server URL in its configuration file. Add `https://mcp.apify.com` as a custom connector instead, as described in the [Claude Desktop integration guide](/integrations/claude-desktop).

For client-specific steps, use the [MCP Configurator](https://mcp.apify.com), which generates ready-to-paste configs.

## Run your first Actor

Every Apify Actor follows the same pattern: send input as JSON, get structured data back. With the MCP server connected, ask your agent to use the agent-optimized [RAG Web Browser](https://apify.com/apify/rag-web-browser) Actor:

```text
Use Apify's RAG Web Browser to find the top 3 pages about Apify documentation, then summarize.
```

Your agent calls [`search-actors`](/mcp#available-tools), [`call-actor`](/mcp#available-tools), and reads the resulting dataset items - all through MCP, no code required.

:::caution Cost controls

When an agent calls Actors automatically, set run limits to prevent surprise bills. Pass them in the `callOptions` argument of [`call-actor`](/mcp#available-tools). Fields with these names in the Actor `input` don't cap the run, because the Actor's input schema decides how it handles them.

- `maxTotalChargeUsd` - cap the total amount charged for the run. Works for all pricing models.
- `maxItems` - cap how many results you pay for on an Actor priced per result.
- `timeout` (seconds) - cap how long a single run can last.
- `memory` (MB) - set memory as a power of 2, minimum 128. Lower memory means lower cost per second.

See [Usage and resources](/actors/running/usage-and-resources) and [Billing](/account/billing) for details.

:::

## Next steps

- [For AI agents](/agents) - pick the setup guide for your agent, or install the plugin that bundles the MCP server and Agent Skills in one step.
- [Apify MCP server](/mcp) - run the server locally, choose which tools to load, and authenticate with a Bearer token instead of OAuth.
- [API client libraries](/api) - call the same Actor from JavaScript or Python when the caller is your own code rather than an agent.
