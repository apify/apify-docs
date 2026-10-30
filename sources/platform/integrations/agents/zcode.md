---
title: ZCode integration
sidebar_label: ZCode
description: Learn how to install the Apify plugin for ZCode to discover, run, and build Actors with the Apify MCP server, skills, and a routing subagent.
slug: /integrations/zcode
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';
import ApifyPluginSkills from '@site/sources/_partials/_apify-plugin-skills.mdx';
import ApifyPluginSkillPrompts from '@site/sources/_partials/_apify-plugin-skill-prompts.mdx';

[ZCode](https://zcode.z.ai) is Z.ai's agentic coding client. It reads and edits your codebase, runs commands, and completes multi-step development tasks from natural-language prompts.

The [Apify plugin for ZCode](https://github.com/apify/apify-zcode-plugin) connects ZCode to Apify's library of [Actors](https://apify.com/store) and bundles:

- The [Apify MCP server](/mcp) for searching Apify Store, running Actors, and retrieving datasets through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro).
- An `apify` routing subagent that picks the right tool or skill from a natural-language request.
- Five built-in skills for common workflows (see [Bundled skills](#bundled-skills) below).

This guide covers installation from the ZCode plugin marketplace.

<ThirdPartyDisclaimer />

## Prerequisites

- [An Apify account](https://console.apify.com/sign-up) - sign up for free if you don't have one.
- [ZCode](https://zcode.z.ai) - installed with a workspace open (the plugin store requires an open workspace).
- [Apify CLI](/cli/docs/installation) - installed and logged in, for the scraping, Actor development, and actorization skills.

## Install the plugin

1. In ZCode, open **Settings** > **Plugins**.

1. Select **Create** > **Add marketplace**.

1. Enter the Apify plugin repository as the source:

    ```text
    apify/apify-zcode-plugin
    ```

1. ZCode validates and adds the marketplace. The **Apify** plugin appears under the **Personal** segment.

1. Select **Install** on the Apify plugin card. The plugin is enabled by default and its components are available immediately.

## Authenticate to Apify

The plugin bundles the Apify MCP server. Read-only tools like searching Apify Store and fetching Actor details work without signing in, but you need to authenticate to run Actors and access your account data.

1. In ZCode, open **Settings** > **MCP Servers**.

1. Scroll to the **Plugin MCP servers** group. The Apify MCP server row shows **Authorization required**.

1. Select **Open authorization**. ZCode opens the Apify OAuth page in your system browser.

1. Review the permissions and select **Allow access**.

1. Back in ZCode, the Apify MCP server reconnects and loads its tools automatically.

:::tip Session persistence

The connection stays authenticated for future sessions. You can revoke access at any time in [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations).

:::

## Run your first prompt

Start your request with `@apify` so the routing subagent handles it. It picks the right tool or skill from a natural-language request, so you don't need to name tools yourself.

> @apify Use Apify to find a good Actor for scraping Google Maps places. Show me the best option, its input requirements, pricing model, and what kind of dataset output it returns. Do not run the Actor yet.

The `apify` subagent searches Apify Store, fetches the top Actor's details through the Apify MCP server, and summarizes its inputs, pricing, and output - all without running the Actor.

## Bundled skills

<ApifyPluginSkills />

Example prompts that route to specific skills:

<ApifyPluginSkillPrompts />

## Troubleshooting

### The Apify plugin doesn't appear in the store

Confirm you have a workspace open - the plugin page requires one. Open the **Marketplace sources** panel (gear icon above the search box) and select **Refresh this marketplace** for the Apify entry. If the marketplace is missing entirely, re-add it with **Create** > **Add marketplace** using the source `apify/apify-zcode-plugin`. The catalog is served from GitHub, so installs may fail when GitHub is unreachable.

### ZCode picks the wrong skill

Route the request through the `apify` subagent, as shown in [Run your first prompt](#run-your-first-prompt). The subagent owns the guardrails that pick the right skill and avoid common traps, such as confusing the `apify` and `apify-client` packages.

### The Apify MCP server shows as unauthenticated

Open **Settings** > **MCP Servers**, find the Apify server under **Plugin MCP servers**, and select **Open authorization** to re-trigger the OAuth flow. See [Authenticate to Apify](#authenticate-to-apify).

### Browser doesn't open, or OAuth fails

ZCode never opens a browser window on its own - it shows an **Open authorization** button instead. Select the button to open the OAuth page. If the page doesn't load, copy the URL and paste it into your browser manually.

If the OAuth flow still can't complete, for example because no browser is available on the machine, the Apify MCP server stays unauthenticated. You can still work without MCP: use the CLI and SDK skills instead, which authenticate through the Apify CLI:

```bash
apify login
```

In a non-interactive environment, pass an API token from [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations) instead:

```bash
apify login -t <YOUR_API_TOKEN>
```

## Limitations

- MCP servers connected mid-session are invisible to subagents until a new session starts.
- Long-running Actors may exceed the time a single tool call waits for completion. Reduce the scope or split the work across multiple prompts.
- Each Actor run consumes Apify platform usage from your plan in addition to any ZCode usage. See [Billing](/account/billing) for details.
- Skills that edit files in your project (Actor development, actorization, SDK integration) make local changes - review them before deploying or committing.

## Related integrations

- [Cursor integration](/integrations/cursor) - Install the Apify plugin in Cursor
- [MCP server integration](/mcp) - Use the Apify MCP server with other clients

## Resources

- [Apify plugin for ZCode](https://github.com/apify/apify-zcode-plugin) - Source repository and full README with advanced setup notes
- [ZCode plugin documentation](https://zcode.z.ai/en/docs/plugin) - Official ZCode plugin docs
- [Apify Store](https://apify.com/store) - Browse Actors you can run from ZCode
