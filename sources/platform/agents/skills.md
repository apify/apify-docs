---
title: Agent Skills
sidebar_label: Agent Skills
subtitle: Give your AI agent Apify know-how
description: Install Apify Agent Skills to give a coding agent tested workflows for scraping, Actor development, actorization, and building Apify integrations.
sidebar_position: 3
slug: /agents/skills
---

Agent Skills are instructions your agent loads on demand when it needs Apify-specific procedural knowledge. Each skill describes a multi-step workflow that Apify has already validated, so the agent follows a known-good sequence instead of improvising one.

Skills layer on top of a connection you already have, whether that's a [plugin](/agents/plugins) or the [MCP server](/mcp) on its own. The [For AI agents](/agents) overview shows how they relate to the other pieces.

## Install

The simplest route is a [plugin](/agents/plugins), which ships the skills already installed. Claude Code, Codex, Cursor, GitHub Copilot, VS Code, OpenCode, Grok Build, Kimi Code, and Qoder get them this way.

To install the skills on their own, for an agent without a plugin or alongside a hand-configured MCP server, use the skills CLI:

```bash
npx skills add apify/agent-skills
```

The skills work in Claude Code, Cursor, Windsurf, Codex, and Gemini CLI. Run the command again to pick up new skill versions.

In Claude Code, you can also add the skills marketplace and install skills one at a time:

```text
/plugin marketplace add https://github.com/apify/agent-skills
/plugin install apify-ultimate-scraper@apify-agent-skills
```

Standalone skills call Apify through the [Apify CLI](/cli), so install it with `npm install -g apify-cli` and run `apify login`. In headless environments such as CI, set the `APIFY_TOKEN` environment variable instead. The CLI and the `apify-ultimate-scraper` skill need Node.js version 20.6 or later.

Agents that discover skills on their own can read the index at [`apify.com/.well-known/agent-skills/index.json`](https://apify.com/.well-known/agent-skills/index.json). It lists the standalone skills in the [Agent Skills discovery format](https://agentskills.io), with a link and a content digest for each `SKILL.md`.

## Available skills

| Skill | What it does | Where you get it |
| :--- | :--- | :--- |
| `apify-ultimate-scraper` | Routes a scraping request to the right Actor and drives multi-step extraction and lead-generation workflows. | Plugins and skills CLI |
| `apify-actor-development` | Covers the full Actor lifecycle: template selection, development, local testing, output schemas, and deployment with `apify push`. | Plugins and skills CLI |
| `apify-actorization` | Converts an existing JavaScript, TypeScript, Python, or CLI project into an Apify Actor. | Plugins and skills CLI |
| `apify-generate-output-schema` | Generates dataset and key-value store schemas for an existing Actor. | Plugins |
| `apify-sdk-integration` | Integrates Actor execution into an application using the `apify-client` package. | Plugins |
| `apify-integration-development` | Designs and builds an official Apify integration for another product, such as a workflow-automation app, an agent plugin, or an AI framework package. | Skills CLI |

Plugins ship `apify-generate-output-schema` and `apify-sdk-integration`. In the skills CLI, `apify-actor-development` now generates output schemas itself, and `apify-integration-development` takes the place of the SDK integration skill.

For the canonical list and each skill's contents, see the [Apify skills registry](https://skills.sh/apify/agent-skills).

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

- [Apify plugin](/agents/plugins) - The skills, the MCP server, and the routing agent in one install
- [Apify MCP server](/mcp) - The live connection that pairs with skills
- [Build Actors with AI](/actors/development/quick-start/build-with-ai) - The Actor lifecycle driven from a coding agent
- [Apify skills registry](https://skills.sh/apify/agent-skills) - The source of every published skill
