---
title: Build on Apify with AI agents
sidebar_label: Agent onboarding
description: Connect your AI agent to the Apify platform to scrape the web, extract data, and automate workflows using MCP, APIs, and plain-text docs.
sidebar_position: 0
slug: /integrations/agent-onboarding
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page helps AI agents and LLM-powered applications integrate with the Apify platform. It covers how to access Apify's documentation, connect to the platform, and run Actors programmatically.

## What Apify does

Apify is a cloud platform for web scraping, data extraction, and browser automation. The core building blocks are:

- **Actors** - Serverless cloud programs that perform scraping, crawling, or automation tasks. Over 4,000 ready-made Actors are available in [Apify Store](https://apify.com/store).
- **Datasets** - Append-only storage for structured results (JSON, CSV, Excel, XML).
- **Key-value stores** - Storage for arbitrary data by string key (JSON, HTML, images, files).
- **Request queues** - URL queues that coordinate crawling across Actor runs.
- **Apify Proxy** - Built-in proxy infrastructure with datacenter and residential IPs.
- **Schedules** - Cron-based automation to trigger Actor runs on a recurring basis.

## Prerequisite: Get an API token

A human must create the Apify account and API token. Sign up at [apify.com](https://apify.com), then get your token from the **Integrations** section in [Apify Console](https://console.apify.com/account#/integrations).

:::caution Token security
Store the API token securely. It grants full access to the Apify account, including running Actors, accessing storage, and managing resources.
:::

## Connect via MCP

The fastest way to give an AI agent access to Apify is through the [Apify MCP server](https://mcp.apify.com). It lets agents discover and run Actors, access storage, and search documentation - all through the Model Context Protocol.

### Streamable HTTP (recommended)

Provide this server URL to your MCP client:

```text
https://mcp.apify.com
```

You'll be redirected to sign in and approve the connection via OAuth.

### Local stdio

For development and testing, run the MCP server locally:

```bash
npx @apify/mcp-server
```

Configure it in your MCP client:

```json
{
    "mcpServers": {
        "apify": {
            "command": "npx",
            "args": ["-y", "@apify/mcp-server"],
            "env": {
                "APIFY_TOKEN": "your-api-token"
            }
        }
    }
}
```

Read the full [MCP server documentation](/integrations/mcp) for configuration options, available tools, and client-specific setup instructions.

## Access documentation as plain text

All Apify documentation is available in formats optimized for LLM consumption.

### Markdown URLs

Append `.md` to any documentation page URL to get a clean markdown version:

```text
https://docs.apify.com/platform/actors.md
https://docs.apify.com/platform/storage.md
https://docs.apify.com/api/v2.md
```

### Content negotiation

Request markdown through the `Accept` header:

```bash
curl -H "Accept: text/markdown" https://docs.apify.com/platform/actors
```

### llms.txt

The documentation index is available at:

```text
https://docs.apify.com/llms.txt
```

This file lists all documentation pages with descriptions and links. For the complete documentation in a single file:

```text
https://docs.apify.com/llms-full.txt
```

:::note File size
`llms.txt` is large (190K+ characters). For targeted lookups, prefer `.md` URLs for specific pages or use the MCP server's documentation search tool.
:::

## Common agent workflows

### Find an Actor for a task

Search [Apify Store](https://apify.com/store) for an Actor that matches your needs. Use the Apify API to search programmatically:

```bash
curl "https://api.apify.com/v2/store?search=google+maps&limit=5" \
    -H "Authorization: Bearer YOUR_API_TOKEN"
```

Each Actor in the response includes its `id`, `name`, `description`, and `stats` (total runs, user ratings).

### Run an Actor and get results

The typical workflow is: start a run, wait for it to finish, then fetch results from the default dataset.

<Tabs groupId="language">
<TabItem value="javascript" label="JavaScript">

```javascript
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: 'YOUR_API_TOKEN' });

// Run an Actor and wait for it to finish
const run = await client.actor('apify/web-scraper').call({
    startUrls: [{ url: 'https://example.com' }],
    maxPagesPerCrawl: 10,
});

// Fetch results from the default dataset
const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log(items);
```

</TabItem>
<TabItem value="python" label="Python">

```python
from apify_client import ApifyClient

client = ApifyClient("YOUR_API_TOKEN")

# Run an Actor and wait for it to finish
run = client.actor("apify/web-scraper").call(run_input={
    "startUrls": [{"url": "https://example.com"}],
    "maxPagesPerCrawl": 10,
})

# Fetch results from the default dataset
items = client.dataset(run["defaultDatasetId"]).list_items().items
print(items)
```

</TabItem>
</Tabs>

### Run an Actor with synchronous response

For quick tasks, use the synchronous endpoint to start a run and get results in a single request (waits up to 5 minutes):

```bash
curl -X POST "https://api.apify.com/v2/acts/apify~web-scraper/run-sync-get-dataset-items" \
    -H "Authorization: Bearer YOUR_API_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "startUrls": [{"url": "https://example.com"}],
        "maxPagesPerCrawl": 10
    }'
```

This returns dataset items directly in the response body.

### Get results from an existing run

If you have a run ID, fetch results from its default dataset:

<Tabs groupId="language">
<TabItem value="javascript" label="JavaScript">

```javascript
const { items } = await client.dataset('DATASET_ID').listItems({
    limit: 100,
    offset: 0,
    format: 'json',
});
```

</TabItem>
<TabItem value="python" label="Python">

```python
items = client.dataset("DATASET_ID").list_items(
    limit=100,
    offset=0,
).items
```

</TabItem>
</Tabs>

Datasets also support CSV, Excel, XML, and RSS export formats through the `format` parameter.

## API quick reference

| Action | Method | Endpoint |
|---|---|---|
| List Actors in store | `GET` | `/v2/store` |
| Get Actor details | `GET` | `/v2/acts/{actorId}` |
| Run an Actor | `POST` | `/v2/acts/{actorId}/runs` |
| Run Actor (sync) | `POST` | `/v2/acts/{actorId}/run-sync-get-dataset-items` |
| Get run status | `GET` | `/v2/actor-runs/{runId}` |
| Get dataset items | `GET` | `/v2/datasets/{datasetId}/items` |
| Get key-value record | `GET` | `/v2/key-value-stores/{storeId}/records/{key}` |
| Abort a run | `POST` | `/v2/actor-runs/{runId}/abort` |

Base URL: `https://api.apify.com`

All endpoints require authentication via `Authorization: Bearer YOUR_API_TOKEN` header.

Read the full [API reference](/api/v2) for all available endpoints.

## AI framework integrations

Apify integrates with popular AI and agent frameworks:

| Framework | Integration |
|---|---|
| LangChain | [Use Apify with LangChain](/integrations/langchain) |
| LangGraph | [Use Apify with LangGraph](/integrations/langgraph) |
| CrewAI | [Use Apify with CrewAI](/integrations/crewai) |
| OpenAI Agents SDK | [Use Apify with OpenAI Agents](/integrations/openai-agents) |
| Google ADK | [Use Apify with Google ADK](/integrations/google-adk) |
| Vercel AI SDK | [Use Apify with Vercel AI SDK](/integrations/vercel-ai-sdk) |
| Haystack | [Use Apify with Haystack](/integrations/haystack) |
| Mastra | [Use Apify with Mastra](/integrations/mastra) |

## Popular Actors for AI agents

These Actors are commonly used in agentic workflows:

| Actor | What it does |
|---|---|
| [Website Content Crawler](https://apify.com/apify/website-content-crawler) | Crawl websites and extract text content in markdown, HTML, or plain text |
| [Google Search Scraper](https://apify.com/apify/google-search-scraper) | Scrape Google Search results for any query |
| [Google Maps Scraper](https://apify.com/compass/crawler-google-places) | Extract business data from Google Maps |
| [Instagram Scraper](https://apify.com/apify/instagram-scraper) | Scrape posts, profiles, and hashtags from Instagram |
| [Amazon Product Scraper](https://apify.com/junglee/amazon-crawler) | Extract product data, pricing, and reviews from Amazon |

Browse all 4,000+ Actors in [Apify Store](https://apify.com/store).

## Next steps

- [MCP server documentation](/integrations/mcp) - Full MCP setup and configuration guide
- [Actor development](/platform/actors/development) - Build your own Actors
- [API reference](/api/v2) - Complete REST API documentation
- [API client for JavaScript](/api/client/js) - JavaScript client library
- [API client for Python](/api/client/python) - Python client library
- [Storage documentation](/platform/storage) - Datasets, key-value stores, and request queues
