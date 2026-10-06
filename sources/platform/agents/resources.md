---
title: Resources for AI agents
sidebar_label: Resources
subtitle: Current Apify documentation, in formats agents read
description: Read Apify documentation programmatically through Markdown endpoints, llms.txt indexes, and MCP tools, and find every agent-facing file Apify publishes.
sidebar_position: 5
slug: /agents/resources
---

Apify publishes its documentation and platform information in formats an agent can read directly. Point your agent at these instead of letting it work from training data, which goes stale between releases.

## Read a page as Markdown

Append `.md` to any documentation URL, or request the page with an `Accept: text/markdown` header. Every documentation page also links its Markdown version in a `<link rel="alternate" type="text/markdown">` tag.

```bash
curl https://docs.apify.com/actors.md
curl -H "Accept: text/markdown" https://docs.apify.com/actors
```

apify.com works the same way. The homepage, `/pricing`, `/store`, and every Actor page return Markdown, which is the fastest path to an Actor's README, input schema, and pricing. Each Actor also has a Markdown changelog:

```bash
curl https://apify.com/apify/rag-web-browser.md
curl https://apify.com/apify/rag-web-browser/changelog.md
```

## Documentation indexes

| Surface | URL | What it's for |
| :--- | :--- | :--- |
| Documentation index | [`docs.apify.com/llms.txt`](https://docs.apify.com/llms.txt) | A compact list of every documentation page, for discovery before a targeted fetch. |
| Full documentation | [`docs.apify.com/llms-full.txt`](https://docs.apify.com/llms-full.txt) | The entire corpus in one file. Roughly 45 MB, so most agents can't load it whole. |
| Section indexes | [`/sdk/js/llms.txt`](https://docs.apify.com/sdk/js/llms.txt), [`/sdk/python/llms.txt`](https://docs.apify.com/sdk/python/llms.txt), [`/api/client/js/llms.txt`](https://docs.apify.com/api/client/js/llms.txt), [`/api/client/python/llms.txt`](https://docs.apify.com/api/client/python/llms.txt), [`/cli/llms.txt`](https://docs.apify.com/cli/llms.txt) | Indexes for the SDK, API client, and CLI documentation. |
| API definition | [`docs.apify.com/api/openapi.json`](https://docs.apify.com/api/openapi.json) | The OpenAPI definition of the Apify API, also available as `openapi.yaml`. |

Use `llms.txt` to find the page you need, then fetch that page's `.md` URL. Reach for `llms-full.txt` only when you're building an index offline.

## Search the docs through MCP

The [Apify MCP server](/mcp) exposes two documentation tools, `search-apify-docs` and `fetch-apify-docs`. Both work without an API token when the connection lists only the tools you can [use without an account](/mcp#use-without-an-account), so an agent can read the Apify documentation before the user has an account.

Use them over raw HTTP fetches when your agent is already connected through MCP - search returns ranked matches rather than making the agent guess at URLs.

## Agent-facing files on apify.com

apify.com publishes a set of machine-readable files for agents. The homepage advertises them in its `Link` response header, and `robots.txt` points to the catalog with an `Agentmap` line. Start with `agents.md`, the agent quickstart:

| File | What it's for |
| :--- | :--- |
| [`apify.com/agents.md`](https://apify.com/agents.md) | The agent quickstart: what Apify is, the three ways an agent connects, and how to run a first Actor. Also served at [`/.well-known/agents.md`](https://apify.com/.well-known/agents.md). |
| [`apify.com/auth.md`](https://apify.com/auth.md) | How an agent gets an Apify credential: device authorization, browser OAuth through an MCP client, an API token from the user, or a prepaid token. |
| [`apify.com/llms.txt`](https://apify.com/llms.txt) | The `llms.txt` index of apify.com, which is also the homepage's Markdown version. |
| [`apify.com/openapi.json`](https://apify.com/openapi.json) | The OpenAPI definition of the Apify API. |
| [`/.well-known/ai-catalog.json`](https://apify.com/.well-known/ai-catalog.json) | A catalog of every agent-facing resource, including the MCP server card, the skills, the Apify Store search API, and the payment guide. |
| [`/.well-known/api-catalog`](https://apify.com/.well-known/api-catalog) | An [RFC 9727](https://www.rfc-editor.org/info/rfc9727) API catalog linking the Apify API and the MCP server. |
| [`/.well-known/agent-skills/index.json`](https://apify.com/.well-known/agent-skills/index.json) | The standalone [Agent Skills](/agents/skills) in the Agent Skills discovery format. |
| [`mcp.apify.com/.well-known/mcp/server-card.json`](https://mcp.apify.com/.well-known/mcp/server-card.json) | The server card for the [Apify MCP server](/mcp): its endpoint, transport, and tools. apify.com serves a copy at the same path. |
| [`/.well-known/oauth-protected-resource`](https://apify.com/.well-known/oauth-protected-resource), [`/.well-known/oauth-authorization-server`](https://apify.com/.well-known/oauth-authorization-server) | OAuth discovery metadata that MCP clients read to start the sign-in. |
| [`agi.apify.com/AGENTS.md`](https://agi.apify.com/AGENTS.md) | Instructions for agents that pay for Actor runs on their own. See [agentic payments](/agents/payments). |

`robots.txt` also declares a `Content-Signal` line that allows search, AI input, and AI training. The [MCP configurator](https://mcp.apify.com) generates a ready-to-paste MCP client configuration.

## Choose the right surface

- For a page you can already name, fetch its `.md` URL. Cheapest option in tokens and always current.
- To find out which page covers a topic, use `search-apify-docs` over MCP, or `llms.txt` if the agent has no MCP connection.
- For API specifics, read the [OpenAPI definition](https://docs.apify.com/api/openapi.json) rather than prose documentation.

## Related resources

- [For AI agents](/agents) - Documentation access alongside the MCP server, plugins, and skills
- [Apify MCP server](/mcp) - The documentation tools and everything else the MCP server exposes
- [Agentic payments](/agents/payments) - Prepaid access for agents that pay their own way
