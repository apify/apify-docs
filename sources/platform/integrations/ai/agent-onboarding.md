---
title: Apify for AI agents
sidebar_label: AI agents
description: Connect your AI agent to the Apify platform - scrape the web, run Actors, and retrieve structured data via MCP, Agent Skills, client libraries, or the REST API.
sidebar_position: 1
slug: /integrations/agent-onboarding
toc_max_heading_level: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Connect your AI agent or application to Apify - the platform for web scraping, data extraction, and browser automation. The typical agent workflow: find an Actor, run it, get structured data back.

## Core concepts

- _Actors_ - Serverless cloud programs that perform scraping, crawling, or automation tasks. Thousands of ready-made Actors are available in [Apify Store](https://apify.com/store).
- _Datasets_ - Append-only storage for structured results. Every Actor run creates a default dataset. Export as JSON, CSV, Excel, XML, or RSS.
- _API_ - RESTful API at `https://api.apify.com/v2` for all platform operations. Also accessible via [MCP](/platform/integrations/mcp), [CLI](/cli), and client libraries.

## Prerequisites

Sign up to [Apify Console](https://console.apify.com/sign-up). The free plan includes monthly platform usage credits with no credit card required. Get your API token from **[Console > Settings > Integrations](https://console.apify.com/settings/integrations)**.

:::tip Free exploration

The MCP server's `search-actors`, `fetch-actor-details`, and docs tools work without authentication. You can browse Actors and documentation without an account.

:::

## Run your first Actor

Every Apify Actor follows the same pattern: send input as JSON, get structured data back. The shortest path through each of the main integration methods, using the agent-optimized [RAG Web Browser](https://apify.com/apify/rag-web-browser) Actor:

<Tabs>
<TabItem value="mcp" label="MCP">

After [connecting the MCP server](#mcp-server) to your AI assistant, ask:

```text
Use Apify's RAG Web Browser to find the top 3 pages about Apify documentation, then summarize.
```

Your agent calls [`search-actors`](/platform/integrations/mcp#available-tools), [`call-actor`](/platform/integrations/mcp#available-tools), and reads the resulting dataset items - all through MCP, no code required.

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
</Tabs>

The pattern is the same across every integration method: pick an Actor, send input, receive structured data. Choose the connection method below that fits your stack.

:::caution Cost controls

When an agent calls Actors automatically, set run limits to prevent surprise bills. Pass these as query parameters on the [run Actor endpoint](/api/v2/act-runs-post):

- `memory` (MB) - power of 2, minimum 128. Lower memory means lower cost per second.
- `timeout` (seconds) - cap how long a single run can last.
- `maxTotalChargeUsd` - cap total run cost for pay-per-event Actors.

See [Usage and resources](/platform/actors/running/usage-and-resources) and [Billing](/platform/console/billing) for details.

:::

## Choose your integration method

| Method | Best for | Auth |
| :--- | :--- | :--- |
| [MCP server](#mcp-server) | AI agents and coding assistants | OAuth or API token |
| [API client](#api-client) | Backend apps (JavaScript/Python) | API token |
| [CLI](#cli) | Building and deploying custom Actors | API token |
| [REST API](#rest-api) | Any language, HTTP integrations, no-code tools | API token |

### MCP server

The [Apify MCP server](/platform/integrations/mcp) connects your agent to the full Apify platform via the [Model Context Protocol](https://modelcontextprotocol.io/). No local installation needed for remote-capable clients.

#### Remote (recommended)

Works with Claude Code, Cursor, VS Code, GitHub Copilot, and other remote-capable clients.

1. Add the following to your MCP client's configuration:

    ```json
    {
      "mcpServers": {
        "apify": {
          "url": "https://mcp.apify.com"
        }
      }
    }
    ```

1. Restart your client and sign in when prompted. OAuth handles authentication automatically.

#### Local/stdio

For clients that only support local MCP servers, for example Claude Desktop.

1. Add the following to your MCP client's configuration:

    ```json
    {
      "mcpServers": {
        "apify": {
          "command": "npx",
          "args": ["-y", "@apify/actors-mcp-server"],
          "env": { "APIFY_TOKEN": "YOUR_TOKEN" }
        }
      }
    }
    ```

1. Replace `YOUR_TOKEN` with your API token and restart the client.

For client-specific setup instructions, use the [MCP Configurator](https://mcp.apify.com) which generates ready-to-paste configs. For details, see the [MCP server documentation](/platform/integrations/mcp).

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

```bash
npm install -g apify-cli                        # or: brew install apify-cli
apify login                                      # authenticate with your API token

# Discover Actors
apify actors info apify/web-scraper --readme     # get Actor README
apify actors info apify/web-scraper --input      # get input schema

# Run an Actor and get output
apify actors call apify/web-scraper \
    -i '{"startUrls": [{"url": "https://example.com"}]}' \
    --output-dataset

# Build and deploy custom Actors
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
| [Get Actor details](/api/v2/act-get) | `GET` | `/v2/acts/{actorId}` |
| [Run an Actor](/api/v2/act-runs-post) | `POST` | `/v2/acts/{actorId}/runs` |
| [Run Actor (sync, get results)](/api/v2/act-run-sync-get-dataset-items-post) | `POST` | `/v2/acts/{actorId}/run-sync-get-dataset-items` |
| [Get run status](/api/v2/actor-run-get) | `GET` | `/v2/actor-runs/{runId}` |
| [Get dataset items](/api/v2/dataset-items-get) | `GET` | `/v2/datasets/{datasetId}/items` |

The sync endpoint ([`run-sync-get-dataset-items`](/api/v2/act-run-sync-get-dataset-items-post)) runs an Actor and returns results in a single request (waits up to 5 minutes). Use [async endpoints](/api/v2/act-runs-post) for longer runs.

For runs that take longer than the sync timeout, prefer [webhooks](/platform/integrations/webhooks) over polling - Apify will POST a notification to your URL when the run finishes, avoiding wasted requests.

Full reference: [Apify API v2](/api/v2).

## Agent Skills

Once your agent is connected via MCP or a coding assistant, [Apify Agent Skills](https://skills.sh/apify/agent-skills) add pre-built workflows on top - guiding the agent through multi-step scraping pipelines and Actor development tasks. Skills are not a separate integration method; they layer over your existing connection.

Install into Claude Code, Cursor, Gemini CLI, or OpenAI Codex:

```bash
npx skills add apify/agent-skills
```

| Skill | What it does |
| :--- | :--- |
| `apify-ultimate-scraper` | Routes web scraping requests to the right Actor for multi-step data pipelines |
| `apify-actor-development` | Guided workflow for building and deploying custom Actors |
| `apify-actorization` | Converts an existing project into an Apify Actor |
| `apify-generate-output-schema` | Auto-generates output schemas from Actor source code |

For the full list and details, see the [skills registry](https://skills.sh/apify/agent-skills).

## Documentation access for agents

Apify documentation is available in formats optimized for programmatic consumption.

| Resource | How to access |
| :--- | :--- |
| Specific doc page | Append `.md` to any docs URL (for example, `docs.apify.com/platform/actors.md`) |
| Specific doc page (alt) | Request with `Accept: text/markdown` header |
| Docs index | [docs.apify.com/llms.txt](https://docs.apify.com/llms.txt) |
| Full docs (large) | [docs.apify.com/llms-full.txt](https://docs.apify.com/llms-full.txt) |
| Actor Store pages | Append `.md` to any Apify Store URL |
| MCP docs tools | `search-apify-docs`, `fetch-apify-docs` |

For targeted lookups, prefer `.md` URLs for specific pages or the MCP docs tools over the full `llms-full.txt` file, which may be truncated by agents with limited context windows.

## Useful resources

- [MCP server integration](/platform/integrations/mcp) - Tool customization, dynamic Actor discovery, and advanced configuration
- [CLI documentation](/cli) - Complete command reference
- [API reference](/api/v2) - All REST API endpoints
- [API client for JavaScript](https://docs.apify.com/api/client/js) | [for Python](https://docs.apify.com/api/client/python) - Client libraries
- [Storage documentation](/platform/storage) - Datasets, key-value stores, and request queues
- [Build with AI](/platform/actors/development) - Build and deploy your first Actor
- [Framework integrations](./crewai.md) - CrewAI, LangChain, LlamaIndex, and more
