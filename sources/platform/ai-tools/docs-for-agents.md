---
title: Apify docs for AI agents
sidebar_label: Docs for agents
description: Read Apify documentation programmatically through Markdown endpoints, llms.txt indexes, and MCP tools, and find every agent-facing surface Apify runs.
sidebar_position: 3
slug: /ai-tools/docs-for-agents
---

Every page on `docs.apify.com` is available as Markdown, and several indexes exist so an agent can discover pages before it reads them. Point your agent at these instead of letting it work from training data, which goes stale between releases.

## Read one page as Markdown

Append `.md` to any documentation URL:

```bash
curl https://docs.apify.com/actors.md
```

Or request the same page with a content negotiation header:

```bash
curl -H "Accept: text/markdown" https://docs.apify.com/actors
```

Apify Store listings work the same way, which is the fastest path to an Actor's README and input schema:

```bash
curl https://apify.com/apify/rag-web-browser.md
```

## Site-wide indexes

| Surface | URL | What it's for |
| :--- | :--- | :--- |
| Documentation index | [`docs.apify.com/llms.txt`](https://docs.apify.com/llms.txt) | A compact list of every documentation page, for discovery before a targeted fetch. |
| Full documentation | [`docs.apify.com/llms-full.txt`](https://docs.apify.com/llms-full.txt) | The entire corpus in one file. Roughly 45 MB, so most agents can't load it whole. |

:::caution Prefer targeted fetches

`llms-full.txt` exceeds the context window of most agents. Use `llms.txt` to find the page you need, then fetch that page's `.md` URL. Reach for `llms-full.txt` only when you're building an index offline.

:::

## Search the docs through MCP

The [Apify MCP server](/integrations/mcp) exposes two documentation tools, `search-apify-docs` and `fetch-apify-docs`. Both work without authentication, so an agent can read Apify documentation before the user has an account.

Use them over raw HTTP fetches when your agent is already connected through MCP - search returns ranked matches rather than making the agent guess at URLs.

## Other agent-facing surfaces

Apify runs several entry points outside the documentation. Agents rarely find them unless something links there, so they're collected here:

| Surface | What it does |
| :--- | :--- |
| [`apify.com/agents.md`](https://apify.com/agents.md) | Platform overview written for agents, served as Markdown. Also at [`apify.com/.well-known/agents.md`](https://apify.com/.well-known/agents.md). |
| [Apify Agent General Interface](https://agi.apify.com) | The front door for agents that need to pay their own way: buy a prepaid, spend-capped API token through an agentic-payment protocol, then call `api.apify.com` with it. See [agentic payments](/integrations/x402). |
| [MCP configurator](https://mcp.apify.com) | Generates a ready-to-paste MCP client configuration. |
| [Apify Store](https://apify.com/store) | Actor catalog. Every listing has a `.md` equivalent. |

## Choose the right surface

- For a page you can already name, fetch its `.md` URL. Cheapest option in tokens and always current.
- To find out which page covers a topic, use `search-apify-docs` over MCP, or `llms.txt` if the agent has no MCP connection.
- For API specifics, read the [OpenAPI definition](https://docs.apify.com/api/openapi.json) rather than prose documentation.

## Related resources

- [Apify AI tools](/ai-tools) - how documentation access fits with MCP, plugins, and skills
- [Apify MCP server](/integrations/mcp) - the documentation tools and everything else MCP exposes
- [Agent quickstart](/get-started/agent-onboarding) - connect an agent and run an Actor
