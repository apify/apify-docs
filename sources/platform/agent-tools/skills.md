---
title: Apify Agent Skills
sidebar_label: Agent Skills
description: Install Apify Agent Skills to give a coding agent tested workflows for scraping, Actor development, actorization, output schemas, and app integration.
sidebar_position: 3
slug: /agent-tools/skills
---

Agent Skills are instructions your agent loads on demand when it needs Apify-specific procedural knowledge. Each skill describes a multi-step workflow that Apify has already validated, so the agent follows a known-good sequence instead of improvising one.

Skills layer on top of a connection you already have, whether that's a [plugin](/agent-tools/plugin) or the [MCP server](/mcp) on its own. See [Apify agent tools](/agent-tools) for how they relate to the other pieces.

## Skills or MCP tools

The two solve different halves of the same problem:

| Dimension | MCP tools | Agent Skills |
| :--- | :--- | :--- |
| What they provide | Capability - search Apify Store, run an Actor, read a dataset | Procedure - the order to call things in and what to do with the results |
| How you get them | Configured once with the MCP server | Installed with a plugin or the skills CLI |

In practice, MCP tools handle one-step requests like "search for a Google Maps scraper", while a skill carries multi-step work like "build an Actor that crawls this site and deploy it".

## Available skills

| Skill | What it does | Where you get it |
| :--- | :--- | :--- |
| `apify-ultimate-scraper` | Routes a scraping request to the right Actor and drives multi-step extraction and lead-generation workflows. | Plugins and skills CLI |
| `apify-actor-development` | Covers the full Actor lifecycle: template selection, development, local testing, and deployment with `apify push`. | Plugins and skills CLI |
| `apify-actorization` | Converts an existing JavaScript, TypeScript, Python, or CLI project into an Apify Actor. | Plugins and skills CLI |
| `apify-generate-output-schema` | Generates dataset and key-value store schemas for an existing Actor. | Plugins and skills CLI |
| `apify-sdk-integration` | Integrates Actor execution into an application using the `apify-client` package. | Plugins |
| `apify-integration-development` | Designs and builds an official Apify integration for another product, such as a workflow-automation app, an agent plugin, or an AI framework package. | Skills CLI |

The plugins and the standalone skills share four skills. Plugins ship `apify-sdk-integration`, and the skills CLI installs `apify-integration-development` in its place.

For the canonical list and each skill's contents, see the [Apify skills registry](https://skills.sh/apify/agent-skills).

## Install

The simplest route is a [plugin](/agent-tools/plugin), which ships the skills already installed. Claude Code, Codex, Cursor, GitHub Copilot, VS Code, OpenCode, Grok Build, Kimi Code, and Qoder get them this way.

To install the skills on their own - for a client without a plugin, or alongside a hand-configured MCP server - use the skills CLI:

```bash
npx skills add apify/agent-skills
```

The skills work in Claude Code, Cursor, Windsurf, Codex, and Gemini CLI. Run the command again to pick up new skill versions.

Agents that discover skills on their own can read the index at [`apify.com/.well-known/agent-skills/index.json`](https://apify.com/.well-known/agent-skills/index.json). It lists the standalone skills in the [Agent Skills discovery format](https://agentskills.io), with a link and a content digest for each `SKILL.md`.

## Write a prompt that triggers a skill

A skill fires when your request matches its purpose, so describe the outcome you want and let the agent pick the skill:

For `apify-ultimate-scraper`:

> "Find 10 highly rated coffee shops in Seattle with name, address, rating, phone, and website."

For `apify-actor-development`:

> "Create an Apify Actor that accepts a `startUrl` and `maxPages` input, crawls the site, and stores each page title and URL."

For `apify-sdk-integration`:

> "Add Apify to this project. The Node.js API route should run an Actor and return dataset items as JSON."

With a plugin installed, the `apify` routing agent handles the match for you on agents that bundle it.

:::caution Skills can edit your files

The Actor development, actorization, and integration skills write to your project. Review their changes before you commit or deploy.

:::

## Related resources

- [Apify plugin](/agent-tools/plugin) - The skills, the MCP server, and the routing agent in one install
- [Apify MCP server](/mcp) - The tools that skills call
- [Build Actors with AI](/actors/development/quick-start/build-with-ai) - The Actor lifecycle driven from a coding agent
- [Apify skills registry](https://skills.sh/apify/agent-skills) - The source of every published skill
