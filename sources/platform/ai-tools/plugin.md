---
title: Apify plugin for AI coding agents
sidebar_label: Plugin
description: Install the Apify plugin to give a coding agent the MCP server, the apify routing agent, and Agent Skills in one step. Compare coverage per client.
sidebar_position: 1
slug: /ai-tools/plugin
---

The Apify plugin is the shortest way to connect a coding agent to Apify: one install configures the MCP server and Agent Skills together, instead of setting each up separately.

Apify maintains a plugin per client, because each client has its own plugin format and install flow. What the plugins bundle differs slightly, so check [what your client gets](#coverage-by-client) before you start.

## What a plugin bundles

- The [Apify MCP server](/integrations/mcp) (`https://mcp.apify.com`) for the live connection to the platform. Its configuration ships inside the plugin, so you never edit an MCP config file by hand.
- An `apify` routing agent that picks the right tool or skill from a natural-language request, so you don't have to name tools yourself.
- [Agent Skills](/ai-tools/skills) covering scraping, Actor development, actorization, output schemas, and SDK integration.

## Coverage by client

| Client | Plugin source | MCP server | Routing agent | Agent Skills |
| :--- | :--- | :---: | :---: | :---: |
| [Claude Code CLI](/integrations/claude-code-cli) | [`apify/apify-claude-code-plugin`](https://github.com/apify/apify-claude-code-plugin) | Yes | Yes | Yes |
| [Cursor](/integrations/cursor) | [`apify/apify-cursor-plugin`](https://github.com/apify/apify-cursor-plugin) | Yes | Yes | Yes |
| [GitHub Copilot](/integrations/github-copilot) | [`apify/apify-github-copilot-plugin`](https://github.com/apify/apify-github-copilot-plugin) | Yes | Yes | Yes |
| [Codex in the ChatGPT desktop app](/integrations/codex-app) | [`apify/apify-codex-plugin`](https://github.com/apify/apify-codex-plugin) | Yes | No | Yes |
| [Codex CLI](/integrations/codex-cli) | [`apify/apify-codex-plugin`](https://github.com/apify/apify-codex-plugin) | Yes | No | Yes |
| [OpenCode](/integrations/opencode) | [`opencode-apify`](https://www.npmjs.com/package/opencode-apify) | Yes | No | No |
| [OpenClaw](/integrations/openclaw) | `@apify/apify-openclaw-plugin` | Yes | No | No |

If your client isn't listed, connect the [MCP server](/integrations/mcp) directly and install [Agent Skills](/ai-tools/skills) separately. The [MCP configurator](https://mcp.apify.com) generates a config for most clients.

## Install

Install flows differ per client. Some use a plugin marketplace, some a command palette, and some a single terminal command, so each has its own guide:

- [Claude Code CLI](/integrations/claude-code-cli) - add the marketplace, then install from the **Discover** tab.
- [Cursor](/integrations/cursor) - install from the Cursor plugin marketplace.
- [GitHub Copilot](/integrations/github-copilot) - install from source through the VS Code command palette.
- [Codex app](/integrations/codex-app) and [Codex CLI](/integrations/codex-cli) - add the marketplace with the `/plugins` command.
- [OpenCode](/integrations/opencode) - `opencode plugin opencode-apify`.
- [OpenClaw](/integrations/openclaw) - `openclaw plugins install @apify/apify-openclaw-plugin`.

Every plugin needs authentication before it can run Actors. Read-only tools such as searching Apify Store and fetching Actor details work without signing in.

:::tip Authenticate once

Most clients authenticate through OAuth in a browser tab and keep the connection for future sessions. Revoke access anytime in [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations).

:::

## Plugin or the parts separately

Installing the MCP server and Agent Skills yourself gives you roughly the same capability as the plugin, with two differences:

- You maintain the MCP configuration and the skill versions yourself. Skills installed with `npx skills add` don't update on their own - reinstall them to pick up changes. A plugin updates as a unit.
- You don't get the `apify` routing agent, so prompts have to name tools or skills more explicitly.

Choose the separate route when your client has no plugin, when you need a narrower [tool selection](/integrations/mcp#tool-selection) than the plugin ships with, or when you're wiring Apify into an agent framework rather than a coding assistant.

## Limitations

- Long-running Actors can exceed the time a single tool call waits for completion. Reduce the scope or split the work across prompts.
- Each Actor run consumes Apify platform usage on top of your agent's own usage. See [Billing](/account/billing).
- Skills that edit files - Actor development, actorization, and SDK integration - make local changes. Review them before you commit or deploy.

## Related resources

- [Agent Skills](/ai-tools/skills) - what the bundled skills do and how to install them standalone
- [Apify MCP server](/integrations/mcp) - tool reference, authentication, and production practices
- [Apify AI tools](/ai-tools) - how plugins, MCP, and skills fit together
