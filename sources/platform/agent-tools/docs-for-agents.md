---
title: Apify docs for AI agents
sidebar_label: Docs for agents
description: Read Apify documentation programmatically through Markdown endpoints, llms.txt indexes, and MCP tools, and find every agent-facing surface Apify runs.
sidebar_position: 5
slug: /agent-tools/docs-for-agents
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

The [Apify MCP server](/mcp) exposes two documentation tools, `search-apify-docs` and `fetch-apify-docs`. Both work without an API token when the connection lists only tools enabled for [anonymous access](/mcp#anonymous-access), so an agent can read the Apify documentation before the user has an account.

Use them over raw HTTP fetches when your agent is already connected through MCP - search returns ranked matches rather than making the agent guess at URLs.

## Agent-facing files on apify.com

apify.com publishes a set of machine-readable files for agents. Agents rarely find them unless something links there, so they're collected here. Start with `agents.md`, the agent quickstart:

| File | What it's for |
| :--- | :--- |
| [`apify.com/agents.md`](https://apify.com/agents.md) | The agent quickstart: what Apify is, the three ways an agent connects, and how to run a first Actor. Also served at [`/.well-known/agents.md`](https://apify.com/.well-known/agents.md). |
| [`apify.com/auth.md`](https://apify.com/auth.md) | How an agent registers for Apify credentials on its own, from anonymous access to a verified account. |
| [`apify.com/llms.txt`](https://apify.com/llms.txt) | An index of apify.com pages that have Markdown versions. |
| [`apify.com/openapi.json`](https://apify.com/openapi.json) | The OpenAPI definition of the Apify API. |
| [`/.well-known/agent-skills/index.json`](https://apify.com/.well-known/agent-skills/index.json) | The standalone [Agent Skills](/agent-tools/skills) in the Agent Skills discovery format. |
| [`/.well-known/mcp/server-card.json`](https://apify.com/.well-known/mcp/server-card.json) | The server card for the [Apify MCP server](/mcp): its endpoint, transport, and tools. |
| [`/.well-known/ai-catalog.json`](https://apify.com/.well-known/ai-catalog.json) | A catalog of the agent-facing resources above, from the MCP server card to the skills and API definitions. |
| [`/.well-known/api-catalog`](https://apify.com/.well-known/api-catalog) | An [RFC 9727](https://www.rfc-editor.org/info/rfc9727) API catalog linking the Apify API and the MCP server. |
| [`/.well-known/oauth-protected-resource`](https://apify.com/.well-known/oauth-protected-resource) | OAuth discovery metadata for the MCP server, which MCP clients read to start the sign-in. |

Every Actor page in [Apify Store](https://apify.com/store) has a Markdown version, and so do `apify.com/store.md` and `apify.com/pricing.md`. The [MCP configurator](https://mcp.apify.com) generates a ready-to-paste MCP client configuration. To pay for Actor runs without an Apify account, see [agentic payments](/agent-tools/agentic-payments).

## Choose the right surface

- For a page you can already name, fetch its `.md` URL. Cheapest option in tokens and always current.
- To find out which page covers a topic, use `search-apify-docs` over MCP, or `llms.txt` if the agent has no MCP connection.
- For API specifics, read the [OpenAPI definition](https://docs.apify.com/api/openapi.json) rather than prose documentation.

## Related resources

- [Apify agent tools](/agent-tools) - how documentation access fits with MCP, plugins, and skills
- [Apify MCP server](/mcp) - the documentation tools and everything else MCP exposes
- [Agent quickstart](/get-started/agent-onboarding) - connect an agent and run an Actor
