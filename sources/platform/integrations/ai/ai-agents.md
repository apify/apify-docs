---
title: Apify for AI agents
sidebar_label: AI agents
description: Connect your AI agent to the Apify platform to scrape the web, extract data, and automate workflows using MCP, the CLI, or the REST API.
sidebar_position: 0.0
slug: /integrations/ai-agents
---

This page is for developers integrating AI agents with the Apify platform. It covers how to connect, run Actors, retrieve data, and access documentation programmatically.

## What Apify does

Apify is a cloud platform for web scraping, data extraction, and browser automation. The typical agent workflow is: find an Actor, run it, get structured data back.

### Core concepts

- _Actors_ - serverless cloud programs that perform scraping, crawling, or automation tasks. Over 4,000 ready-made Actors are available in [Apify Store](https://apify.com/store).
- _Datasets_ - Append-only storage for structured results. Every Actor run creates a default dataset containing its output. Export as JSON, CSV, Excel, XML, or RSS.
- The _Apify API_ - RESTful API at `https://api.apify.com/v2` for all platform operations.

### Additional concepts

- [Key-value stores](/platform/storage/key-value-store) - Store arbitrary data by string key (JSON, HTML, images, files)
- [Request queues](/platform/storage/request-queue) - URL queues that coordinate crawling across Actor runs
- [Apify Proxy](/platform/proxy) - Built-in proxy infrastructure with datacenter and residential IPs
- [Schedules](/platform/schedules) - Cron-based automation to trigger Actor runs on a recurring basis

## Get an API token

Sign up at [apify.com](https://apify.com), then get your API token from the **Integrations** section in [Apify Console](https://console.apify.com/account#/integrations). The token authenticates all API and CLI requests.

## Connect via MCP

The [Apify MCP server](https://mcp.apify.com) lets AI agents discover and run Actors, access storage, and search documentation through the [Model Context Protocol](https://modelcontextprotocol.io). Point your MCP client to `https://mcp.apify.com` to connect via OAuth, or run the server locally with `npx @apify/actors-mcp-server`.

Read the full [MCP server documentation](/platform/integrations/mcp) for configuration options, available tools, and client-specific setup.

## Use the Apify CLI

The [Apify CLI](/cli) provides direct command-line access to the platform. For AI agents, the CLI is a lightweight, token-efficient alternative to MCP.

Install and authenticate:

```bash
npm install -g apify-cli
apify login --token YOUR_API_TOKEN
```

Get an Actor's README and input schema:

```bash
apify actors info apify/web-scraper --readme
apify actors info apify/web-scraper --input
```

Run an Actor and print its dataset output:

```bash
apify actors call apify/web-scraper \
    -i '{"startUrls": [{"url": "https://example.com"}], "maxPagesPerCrawl": 10}' \
    --output-dataset
```

Retrieve items from an existing dataset:

```bash
apify datasets get-items DATASET_ID --format json
```

Read the full [CLI documentation](/cli) for all available commands.

## Use the API directly

All platform operations are available through the REST API. Authenticate with the `Authorization: Bearer YOUR_API_TOKEN` header.

Run an Actor and get results in a single request (waits up to 5 minutes):

```bash
curl -X POST "https://api.apify.com/v2/acts/apify~web-scraper/run-sync-get-dataset-items" \
    -H "Authorization: Bearer YOUR_API_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"startUrls": [{"url": "https://example.com"}], "maxPagesPerCrawl": 10}'
```

For longer runs, start the Actor asynchronously and poll for completion:

```bash
# Start a run
curl -X POST "https://api.apify.com/v2/acts/apify~web-scraper/runs" \
    -H "Authorization: Bearer YOUR_API_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"startUrls": [{"url": "https://example.com"}], "maxPagesPerCrawl": 10}'

# Check run status (use the runId from the response above)
curl "https://api.apify.com/v2/actor-runs/RUN_ID" \
    -H "Authorization: Bearer YOUR_API_TOKEN"

# Get results from the default dataset
curl "https://api.apify.com/v2/datasets/DATASET_ID/items" \
    -H "Authorization: Bearer YOUR_API_TOKEN"
```

### API quick reference

| Action | Method | Endpoint |
| --- | --- | --- |
| Search Actors in store | `GET` | `/v2/store` |
| Get Actor details | `GET` | `/v2/acts/{actorId}` |
| Run an Actor | `POST` | `/v2/acts/{actorId}/runs` |
| Run Actor (sync) | `POST` | `/v2/acts/{actorId}/run-sync-get-dataset-items` |
| Get run status | `GET` | `/v2/actor-runs/{runId}` |
| Get dataset items | `GET` | `/v2/datasets/{datasetId}/items` |
| Get key-value record | `GET` | `/v2/key-value-stores/{storeId}/records/{key}` |
| Abort a run | `POST` | `/v2/actor-runs/{runId}/abort` |

Base URL: `https://api.apify.com`

Read the full [API reference](/api/v2) for all available endpoints.

## Access documentation as plain text

Apify documentation is available in formats optimized for programmatic consumption.

Append `.md` to any documentation page URL to get a clean markdown version:

```text
https://docs.apify.com/platform/actors.md
https://docs.apify.com/platform/storage.md
https://docs.apify.com/api/v2.md
```

Request markdown through the `Accept` header:

```bash
curl -H "Accept: text/markdown" https://docs.apify.com/platform/actors
```

A documentation index is available at `https://docs.apify.com/llms.txt` and the complete documentation in a single file at `https://docs.apify.com/llms-full.txt`. These files follow the [llms.txt specification](https://llmstxt.org/), but can be very large and may be truncated by agents with limited context windows. For targeted lookups, prefer `.md` URLs for specific pages, the MCP server's documentation search tools, or the Apify CLI.

## Next steps

- [MCP server documentation](/platform/integrations/mcp) - Full setup and configuration guide
- [CLI documentation](/cli) - Complete command reference
- [API reference](/api/v2) - All REST API endpoints
- [API client for JavaScript](/api/client/js) - JavaScript client library
- [API client for Python](/api/client/python) - Python client library
- [Storage documentation](/platform/storage) - Datasets, key-value stores, and request queues
