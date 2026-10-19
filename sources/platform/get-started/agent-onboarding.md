---
title: Agent quickstart
sidebar_label: Agent quickstart
sidebar_position: 3
description: Connect your AI agent to the Apify platform - scrape the web, run Actors, and retrieve structured data via MCP, Agent Skills, client libraries, or the REST API.
slug: /get-started/agent-onboarding
toc_max_heading_level: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ClaudeCodeWebEgress from '@site/sources/_partials/_claude-code-web-egress.mdx';

Connect your AI agent or application to Apify - the platform for web scraping, data extraction, and browser automation. The typical agent workflow: find an Actor, run it, get structured data back.

Apify also serves a quickstart for agents to read directly at [`apify.com/agents.md`](https://apify.com/agents.md).

## Core concepts

- _Actors_ - Serverless cloud programs that perform scraping, crawling, or automation tasks. Thousands of ready-made Actors are available in [Apify Store](https://apify.com/store).
- _Datasets_ - Append-only storage for structured results. Every Actor run creates a default dataset. Export as JSON, CSV, Excel, XML, or RSS.
- _API_ - RESTful API at `https://api.apify.com/v2` for all platform operations. Also accessible via [MCP](/mcp), [CLI](/cli), and client libraries.
- _MCP connectors_ - When you build an Actor that needs to act on a user's third-party accounts (Notion, Slack, GitHub, and others), use [MCP connectors](/integrations/mcp-connectors) to receive connector IDs as input instead of asking users for raw credentials.

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
| [API client](#api-client) | Backend apps (JavaScript/Python) | API token |
| [CLI](#cli) | Building and deploying custom Actors | API token |
| [REST API](#rest-api) | Any language, HTTP integrations, no-code tools | API token |
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

### API client

For integrating Apify into your application code.

:::warning Package naming

`apify-client` is the API client for _calling_ Actors. The `apify` package is the SDK for _building_ Actors. For backend integration, install `apify-client`.

:::

<Tabs>
<TabItem value="javascript" label="JavaScript / TypeScript">

```bash
npm install apify-client
```

```typescript
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
const run = await client.actor('apify/web-scraper').call({
    startUrls: [{ url: 'https://example.com' }],
});
const { items } = await client.dataset(run.defaultDatasetId).listItems();
```

Full reference: [JavaScript API client docs](https://docs.apify.com/api/client/js)

</TabItem>
<TabItem value="python" label="Python">

```bash
pip install apify-client
```

```python
import os
from apify_client import ApifyClient

client = ApifyClient(token=os.environ['APIFY_TOKEN'])
run = client.actor('apify/web-scraper').call(
    run_input={'startUrls': [{'url': 'https://example.com'}]}
)
items = client.dataset(run['defaultDatasetId']).list_items().items
```

Full reference: [Python API client docs](https://docs.apify.com/api/client/python)

</TabItem>
</Tabs>

### CLI

For running Actors and building custom ones from the command line.

Install on macOS or Linux (Windows and Homebrew alternatives in the [CLI install docs](/cli/docs/installation)):

```bash
curl -fsSL https://apify.com/install-cli.sh | bash
apify login                                      # authenticate with your API token
```

Discover and inspect Actors:

```bash
apify actors search scraping                     # search Apify Store
apify actors info apify/web-scraper --readme     # get Actor README
apify actors info apify/web-scraper --input      # get input schema
```

Run an Actor and get its output:

```bash
apify actors call apify/web-scraper \
    -i '{"startUrls": [{"url": "https://example.com"}]}' \
    --output-dataset
```

Build and deploy custom Actors:

```bash
apify create my-actor                            # scaffold (JS/TS/Python)
apify run                                        # test locally
apify push                                       # deploy to Apify cloud
```

Full reference: [Apify CLI documentation](/cli).

### REST API

For HTTP-native integrations or languages without a dedicated client. Base URL: `https://api.apify.com/v2`. Authenticate with the `Authorization: Bearer YOUR_TOKEN` header.

#### Quick reference

| Action | Method | Endpoint |
| :--- | :--- | :--- |
| [Search Actors in Store](/api/v2/store-get) | `GET` | `/v2/store` |
| [Get Actor details](/api/v2/actor-get) | `GET` | `/v2/actors/{actorId}` |
| [Run an Actor](/api/v2/actors-runs-post) | `POST` | `/v2/actors/{actorId}/runs` |
| [Run Actor (sync, get results)](/api/v2/actor-run-sync-get-dataset-items-post) | `POST` | `/v2/actors/{actorId}/run-sync-get-dataset-items` |
| [Get run status](/api/v2/actor-run-get) | `GET` | `/v2/actor-runs/{runId}` |
| [Get dataset items](/api/v2/dataset-items-get) | `GET` | `/v2/datasets/{datasetId}/items` |

The sync endpoint ([`run-sync-get-dataset-items`](/api/v2/actor-run-sync-get-dataset-items-post)) runs an Actor and returns results in a single request (waits up to 5 minutes). Use [async endpoints](/api/v2/actors-runs-post) for longer runs.

For runs that take longer than the sync timeout, prefer [webhooks](/integrations/webhooks) over polling - Apify will POST a notification to your URL when the run finishes, avoiding wasted requests.

Full reference: [Apify API v2](/api/v2).

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
