---
title: Agent quickstart
sidebar_label: Agent quickstart
sidebar_position: 0.5
description: Connect your AI agent to Apify and run your first Actor through the MCP server, then pick the integration method and cost limits that fit your setup.
slug: /agents/quickstart
toc_max_heading_level: 3
pagination_next: null
pagination_prev: null
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ClaudeCodeWebEgress from '@site/sources/_partials/_claude-code-web-egress.mdx';

Connect your AI agent to Apify and run your first Actor. This page shows the shortest path through each connection method, then sets up the MCP server in full. For how the pieces compare, see [For AI agents](/agents).

Apify also serves a quickstart for agents to read directly at [`apify.com/agents.md`](https://apify.com/agents.md).

## Core concepts

An [Actor](/actors) is a serverless program that takes input and stores its results, most often in a [dataset](/storage/dataset). Everything an agent does with Apify goes through the [API](/api/v2), whether directly or through the MCP server, the CLI, or a client library.

## Prerequisites

Sign up to [Apify Console](https://console.apify.com/sign-up). The free plan includes monthly platform usage credits with no credit card required. Get your API token from **[Console > Settings > Integrations](https://console.apify.com/settings/integrations)**.

<ClaudeCodeWebEgress />

## Run your first Actor

Every Apify Actor follows the same pattern: send input as JSON, get structured data back. The shortest path through each of the main integration methods, using the agent-optimized [RAG Web Browser](https://apify.com/apify/rag-web-browser) Actor:

<Tabs>
<TabItem value="mcp" label="MCP">

After [connecting the MCP server](#mcp-server) to your AI assistant, ask:

```text
Use Apify's RAG Web Browser to find the top 3 pages about Apify documentation, then summarize.
```

Your agent calls [`search-actors`](/mcp#available-tools), [`call-actor`](/mcp#available-tools), and reads the resulting dataset items - all through MCP, no code required.

</TabItem>
<TabItem value="javascript" label="JavaScript">

```typescript
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
const run = await client.actor('apify/rag-web-browser').call({
    query: 'Apify documentation',
    maxResults: 3,
});
const { items } = await client.dataset(run.defaultDatasetId).listItems();
```

</TabItem>
<TabItem value="python" label="Python">

```python
import os
from apify_client import ApifyClient

client = ApifyClient(token=os.environ['APIFY_TOKEN'])
run = client.actor('apify/rag-web-browser').call(
    run_input={'query': 'Apify documentation', 'maxResults': 3},
)
items = client.dataset(run['defaultDatasetId']).list_items().items
```

</TabItem>
<TabItem value="cli" label="CLI">

```bash
apify login                                       # one-time
apify call apify/rag-web-browser \
    -i '{"query": "Apify documentation", "maxResults": 3}' \
    --output-dataset
```

</TabItem>
</Tabs>

The pattern is the same across every integration method: pick an Actor, send input, receive structured data. Choose the connection method below that fits your stack.

:::caution Cost controls

When an agent calls Actors automatically, set run limits to prevent surprise bills. Pass these as query parameters on the [run Actor endpoint](/api/v2/actors-runs-post):

- `maxTotalChargeUsd` - cap the total amount charged for the run. Works for all pricing models.
- `maxItems` - cap how many results you pay for on an Actor priced per result.
- `timeout` (seconds) - cap how long a single run can last.
- `memory` (MB) - set memory as a power of 2, minimum 128. Lower memory means lower cost per second.

See [Usage and resources](/actors/running/usage-and-resources) and [Billing](/account/billing) for details.

:::

## Choose your integration method

| Method | Best for | Auth |
| :--- | :--- | :--- |
| [MCP server](#mcp-server) | AI agents and coding assistants | OAuth or API token |
| [API client](/api) | Backend apps (JavaScript/Python) | API token |
| [CLI](/cli) | Building and deploying custom Actors | API token |
| [REST API](/api/v2) | Any language, HTTP integrations, no-code tools | API token |
| [Agentic payments](/agents/payments) | Autonomous agents with a crypto wallet and no one to sign in | Prepaid, spend-capped token |

### MCP server

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

For client-specific steps, use the [MCP Configurator](https://mcp.apify.com), which generates ready-to-paste configs. The [MCP server documentation](/mcp) also covers [running the server locally](/mcp#local-stdio), [tool selection](/mcp#tool-selection), and [Bearer token authentication](/mcp#streamable-http-with-oauth-recommended).

To cap runs that your agent starts over MCP, pass `maxTotalChargeUsd`, `maxItems`, `timeout`, or `memory` in the `callOptions` argument of [`call-actor`](/mcp#available-tools). Fields with these names in the Actor `input` don't cap the run. The Actor's input schema decides how it handles them.

### Other methods

The [API client](/api) for JavaScript or Python, the [CLI](/cli), and the [REST API](/api/v2) each run the same Actor the tabs above show. Their pages cover installation, authentication, and the full command and endpoint reference.

## Agent Skills

[Apify Agent Skills](/agents/skills) add tested workflows on top of an MCP or plugin connection, such as building an Actor or routing a scraping request. Coding agents with an [Apify plugin](/agents/plugins) get the skills already installed. To add them to any other agent, see [Install Agent Skills](/agents/skills#install).

## Documentation access for agents

Apify documentation is available in formats optimized for programmatic consumption: append `.md` to any documentation or Apify Store URL, request a page with the `Accept: text/markdown` header, discover pages through [`docs.apify.com/llms.txt`](https://docs.apify.com/llms.txt), or search from an MCP connection with `search-apify-docs` and `fetch-apify-docs`.

For the complete list, including the agent-facing surfaces outside the documentation, see [Resources for AI agents](/agents/resources).

## Useful resources

- [For AI agents](/agents) - Overview of the MCP server, plugins, Agent Skills, and machine-readable docs
- [Apify MCP server](/mcp) - Tool customization, dynamic Actor discovery, and advanced configuration
- [CLI documentation](/cli) - Complete command reference
- [API reference](/api/v2) - All REST API endpoints
- [API client for JavaScript](https://docs.apify.com/api/client/js) | [for Python](https://docs.apify.com/api/client/python) - Client libraries
- [Storage documentation](/storage) - Datasets, key-value stores, and request queues
- [Build with AI](/actors/development/quick-start/build-with-ai) - Build and deploy your first Actor
- [Framework integrations](/integrations/ai) - CrewAI, LangChain, LlamaIndex, and more
