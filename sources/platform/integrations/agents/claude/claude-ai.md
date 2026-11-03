---
title: Claude.ai integration
sidebar_label: Claude.ai
description: Learn how to install the Apify plugin in claude.ai to search, run, and build Actors from your chats with the Apify MCP server, skills, and a routing agent.
slug: /integrations/claude-ai
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';
import ApifyPluginSkills from '@site/sources/_partials/_apify-plugin-skills.mdx';
import ApifyPluginSkillPrompts from '@site/sources/_partials/_apify-plugin-skill-prompts.mdx';

[Claude.ai](https://claude.ai) is Anthropic's AI assistant in the browser. It answers questions, works with files, and calls external tools through connectors.

The Apify plugin connects Claude to Apify's library of [Actors](https://apify.com/store) and bundles:

- The [Apify MCP server](/mcp) for searching Apify Store, running Actors, and retrieving datasets through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro).
- An `apify` routing agent that picks the right tool or skill from a natural-language request.
- Five built-in skills for common workflows (see [Bundled skills](#bundled-skills) below).

This guide covers setup in claude.ai in your browser. For the desktop app, see the [Claude Desktop integration](/integrations/claude-desktop).

<ThirdPartyDisclaimer />

## Prerequisites

- [An Apify account](https://console.apify.com/sign-up) - sign up for free if you don't have one.
- [A Claude account](https://claude.ai) - you need to be signed in.

## Install the plugin

1. In claude.ai, open **Customize**, then select **Connectors**.

1. Select the **Discover** tab and search for "Apify".

1. Select the **Apify** plugin, marked with a verified badge.

    <!-- TODO: screenshot of the Discover search results with the verified Apify plugin -->

1. Select **Add**.

The plugin is now installed, but its Apify connector isn't connected yet. Connect it in the next section.

## Authenticate to Apify

The plugin bundles the Apify MCP server as a connector. Connect it and sign in to Apify so Claude can run Actors and access your account data.

1. On the **Apify** plugin page, open the **Connectors** tab. The `apify` connector shows as **Not added**.

    The plugin page stays open after you select **Add**. To get back to it later, open **Customize** > **Plugins**, select the **Yours** tab, and select the **Apify** plugin.

1. Select **Connect**. The **Add custom connector** dialog opens with the name and server URL already filled in.

1. Select **Continue**. Claude detects the authentication settings from the server.

1. Keep the detected settings and select **Add**. Claude opens the Apify sign-in page.

    <!-- TODO: screenshot of the Add custom connector dialog with the detected authentication settings -->

1. Check the Apify account and that the redirect URL in the warning is `https://claude.ai/api/mcp/auth_callback`, then select **Allow access**.

    :::caution Dynamic registration warning

    The Apify sign-in page warns that the application was registered dynamically and wasn't verified by Apify. This warning is expected for Claude.

    :::

1. Back in claude.ai, check that the `apify` connector shows as connected.

The connection stays authenticated for future chats. You can revoke access at any time in [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations).

## Run your first prompt

New chats have the Apify connector turned on by default. To turn it on or off for a chat, select **+** in the message box, select **Connectors**, and turn **Apify** on or off.

Describe what you want in natural language. You don't need to name Apify tools yourself.

```prompt title="Example prompt"
Use Apify to find a good Actor for scraping Google Maps places. Show me the best option, its input requirements, pricing model, and what kind of dataset output it returns. Do not run the Actor yet.
```

Claude searches Apify Store, fetches the top Actor's details through the Apify MCP server, and summarizes its inputs, pricing, and output - all without running the Actor.

<!-- TODO: screenshot of a chat with Apify tool calls and results -->

## Bundled skills

<ApifyPluginSkills />

Example prompts that route to specific skills:

<ApifyPluginSkillPrompts />

## Connect without the plugin

To choose which Apify tools Claude can use, add the Apify MCP server as a custom connector instead of installing the plugin. This setup doesn't include the plugin's skills or routing agent.

1. Build your setup in the [Apify MCP server configurator](https://mcp.apify.com) and copy the server URL it generates. To use the default tool set, use `https://mcp.apify.com`.
1. In claude.ai, open **Customize** > **Connectors**, select **Add**, then select **Add custom connector**.
1. Fill in the dialog:
    - **Name** - A name for the connector, for example `Apify`
    - **MCP server URL** - The server URL from step 1
1. Select **Continue**, keep the detected settings, and select **Add**.
1. Sign in to Apify and select **Allow access**, as described in [Authenticate to Apify](#authenticate-to-apify).

Claude doesn't let you edit a custom connector. To change the tools later, remove the connector and add it again with a new URL. For the full list of options, see [tool selection](/mcp#tool-selection).

## Troubleshooting

### The Apify plugin doesn't appear in Discover

Make sure you're on the **Connectors** tab, then search for "Apify" in **Discover**. If the plugin is already installed, it appears in **Plugins** > **Yours** instead.

### Apify tools don't run

Open **Customize** > **Connectors** and select the **Yours** tab. The `apify` connector should show a check mark in the **Status** column.

If `apify` isn't listed, or shows **Connect**, connect it as described in [Authenticate to Apify](#authenticate-to-apify). To reach the plugin page, open **Customize** > **Plugins**, select the **Yours** tab, and select the **Apify** plugin.

Also check that the chat has the connector turned on: select **+** in the message box, then **Connectors**.

### Authentication errors or wrong Apify account

Remove the `apify` connector and connect it again to trigger a new sign-in. On the Apify sign-in page, use **Wrong account?** to pick the account Claude should use.

## Limitations

- Long-running Actors may exceed the time a single tool call waits for completion. Reduce the scope or split the work across multiple prompts.
- Each Actor run consumes Apify platform usage from your plan in addition to any Claude usage. See [Apify billing](/account/billing).
- Skills that build or deploy Actors need a local project. They work best in [Claude Code](/integrations/claude-code-cli).

## Related integrations

- [Claude Desktop integration](/integrations/claude-desktop) - Connect the Apify MCP server to the Claude desktop app
- [Claude Code CLI integration](/integrations/claude-code-cli) - Install the Apify plugin in Claude Code
- [MCP server integration](/mcp) - Use the Apify MCP server with other clients
- [ChatGPT integration](/integrations/chatgpt) - Connect the Apify MCP server to ChatGPT

## Resources

- [Anthropic: Get started with custom connectors using remote MCP](https://support.claude.com/en/articles/11175166) - Official docs for connectors, including plan availability and organization setup
- [Apify plugin for Claude](https://github.com/apify/apify-claude-code-plugin) - Source repository for the plugin
- [Apify Store](https://apify.com/store) - Browse Actors you can run from Claude
