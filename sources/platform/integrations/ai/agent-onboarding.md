---
title: Apify for AI agents
sidebar_label: Apify for AI agents
description: Connect your AI agent to the Apify platform. Set up the MCP server, use Agent Skills, or integrate via the API client, CLI, or REST API.
sidebar_position: 0
slug: /integrations/apify-for-ai-agents
toc_max_heading_level: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Connect your AI agent or application to Apify - the platform for web scraping, data extraction, and browser automation. The typical agent workflow: find an Actor, run it, get structured data back.

## Core concepts

- *Actors* - Serverless cloud programs that perform scraping, crawling, or automation tasks. Thousands of ready-made Actors are available in [Apify Store](https://apify.com/store).
- *Datasets* - Append-only storage for structured results. Every Actor run creates a default dataset. Export as JSON, CSV, Excel, XML, or RSS.
- *API* - RESTful API at `https://api.apify.com/v2` for all platform operations. Also accessible via [MCP](./mcp.md), [CLI](cli), and client libraries.

For a full overview of platform concepts, see [Platform basics](/platform/get-started/platform-basics).

## Prerequisites

Sign up at [console.apify.com](https://console.apify.com/sign-up) using Google or GitHub. The free plan includes monthly platform usage credits with no credit card required. Get your API token from **Settings > Integrations** in [Apify Console](https://console.apify.com/settings/integrations).

:::tip Free exploration
The MCP server's `search-actors`, `fetch-actor-details`, and docs tools work without authentication. You can browse Actors and documentation without an account.
:::

## Choose your integration method

| Method | Best for | Auth |
|---|---|---|
| [MCP server](#mcp-server) | AI agents and coding assistants | OAuth or API token |
| [Agent Skills](#agent-skills) | Guided scraping workflows and Actor development | API token |
| [API client](#api-client) | Backend apps (JavaScript/Python) | API token |
| [CLI](#cli) | Building and deploying custom Actors | API token |
| [REST API](#rest-api) | Any language, HTTP integrations, no-code tools | API token |

### MCP server

The [Apify MCP server](./mcp.md) connects your agent to the full Apify platform via the [Model Context Protocol](https://modelcontextprotocol.io/). No local installation needed for remote-capable clients.

**Remote (recommended)** - works with Claude Code, Cursor, VS Code, GitHub Copilot, and other remote-capable clients:

```json
{
  "mcpServers": {
    "apify": {
      "url": "https://mcp.apify.com"
    }
  }
}
```

OAuth handles authentication automatically - you'll be prompted to sign in on first use.

**Local/stdio** - for clients that only support local MCP servers (e.g. Claude Desktop):

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

For client-specific setup instructions, use the [MCP Configurator](https://mcp.apify.com) which generates ready-to-paste configs. For advanced options and tool customization, see the full [MCP server documentation](./mcp.md).

### Agent Skills

Pre-built workflows that guide AI agents through data extraction and Actor development tasks.

```bash
npx skills add apify/agent-skills
```

| Skill | What it does |
|---|---|
| `apify-ultimate-scraper` | Routes web scraping requests to the right Actor for multi-step data pipelines |
| `apify-actor-development` | Guided workflow for building and deploying custom Actors |
| `apify-actorization` | Converts an existing project into an Apify Actor |
| `apify-generate-output-schema` | Auto-generates output schemas from Actor source code |

Skills work with Claude Code, Cursor, Gemini CLI, and OpenAI Codex. See the [skills registry](https://skills.sh/apify/agent-skills) for details.

### API client

For integrating Apify into your application code.

:::warning Package naming
`apify-client` is the API client for **calling** Actors. The `apify` package is the SDK for **building** Actors. For backend integration, install `apify-client`.
:::

<Tabs>
<TabItem value="javascript" label="JavaScript">

```bash
npm install apify-client
```

```javascript
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
const run = await client.actor('apify/web-scraper').call({
    startUrls: [{ url: 'https://example.com' }],
});
const { items } = await client.dataset(run.defaultDatasetId).listItems();
```

Full reference: [JavaScript API client docs](api/client/js/docs)

</TabItem>
<TabItem value="python" label="Python">

```bash
pip install apify-client
```

```python
import os
from apify_client import ApifyClient

client = ApifyClient(token=os.environ["APIFY_TOKEN"])
run = client.actor("apify/web-scraper").call(
    run_input={"startUrls": [{"url": "https://example.com"}]}
)
items = client.dataset(run["defaultDatasetId"]).list_items().items
```

Full reference: [Python API client docs](api/client/python/docs)

</TabItem>
</Tabs>

### CLI

For running Actors and building custom ones from the command line.

```bash
npm install -g apify-cli
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

Full reference: [Apify CLI documentation](cli)

### REST API

For HTTP-native integrations or languages without a dedicated client. Base URL: `https://api.apify.com/v2`. Authenticate with `Authorization: Bearer YOUR_TOKEN` header.

Run an Actor and get results in a single request (waits up to 5 minutes):

```bash
curl -X POST "https://api.apify.com/v2/acts/apify~web-scraper/run-sync-get-dataset-items" \
    -H "Authorization: Bearer YOUR_API_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"startUrls": [{"url": "https://example.com"}], "maxPagesPerCrawl": 10}'
```

For longer runs, start asynchronously and poll for completion:

```bash
# Start a run
curl -X POST "https://api.apify.com/v2/acts/apify~web-scraper/runs" \
    -H "Authorization: Bearer YOUR_API_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"startUrls": [{"url": "https://example.com"}]}'

# Check run status (use the runId from the response)
curl "https://api.apify.com/v2/actor-runs/RUN_ID" \
    -H "Authorization: Bearer YOUR_API_TOKEN"

# Get results from the default dataset
curl "https://api.apify.com/v2/datasets/DATASET_ID/items" \
    -H "Authorization: Bearer YOUR_API_TOKEN"
```

**Quick reference:**

| Action | Method | Endpoint |
|---|---|---|
| Search Actors in Store | `GET` | `/v2/store` |
| Get Actor details | `GET` | `/v2/acts/{actorId}` |
| Run an Actor | `POST` | `/v2/acts/{actorId}/runs` |
| Run Actor (sync, get results) | `POST` | `/v2/acts/{actorId}/run-sync-get-dataset-items` |
| Get run status | `GET` | `/v2/actor-runs/{runId}` |
| Get dataset items | `GET` | `/v2/datasets/{datasetId}/items` |

Full reference: [Apify API v2](/api/v2)

## Documentation access for agents

| Resource | How to access |
|---|---|
| Specific doc page | Append `.md` to any docs URL (e.g. `docs.apify.com/platform/actors.md`) |
| Specific doc page (alt) | Request with `Accept: text/markdown` header |
| Docs index | [docs.apify.com/llms.txt](https://docs.apify.com/llms.txt) |
| Full docs (large) | [docs.apify.com/llms-full.txt](https://docs.apify.com/llms-full.txt) |
| Actor Store pages | Append `.md` to any Apify Store URL |
| MCP docs tools | `search-apify-docs`, `fetch-apify-docs` |

For targeted lookups, prefer `.md` URLs for specific pages or MCP docs tools over `llms-full.txt`, which may be truncated by agents with limited context windows.

## Useful resources

- [MCP server documentation](./mcp.md) - Tool customization, dynamic Actor discovery, and advanced config
- [CLI documentation](cli) - Complete command reference
- [API reference](/api/v2) - All REST API endpoints
- [API client for JavaScript](api/client/js/docs) | [for Python](api/client/python/docs)
- [Storage documentation](/platform/actors/storage) - Datasets, key-value stores, and request queues
- [Build an Actor](/platform/get-started/build-an-actor) - Build and deploy your first Actor
- [Framework integrations](./crewai.md) - CrewAI, LangChain, LlamaIndex, and more
