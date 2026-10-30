---
title: Grok Build integration
sidebar_label: Grok Build
description: Learn how to install the Apify plugin for Grok Build to discover, run, and build Actors with the Apify MCP server directly from your terminal.
slug: /integrations/grok-build
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';
import ApifyPluginSkills from '@site/sources/_partials/_apify-plugin-skills.mdx';
import ApifyPluginSkillPrompts from '@site/sources/_partials/_apify-plugin-skill-prompts.mdx';

[Grok Build](https://docs.x.ai/build/overview) is xAI's agentic coding tool that runs in your terminal. It reads and edits your codebase, runs commands, and completes multi-step development tasks.

The [Apify plugin for Grok Build](https://github.com/apify/apify-grok-build-plugin) connects Grok Build to Apify's library of [Actors](https://apify.com/store) and bundles:

- The [Apify MCP server](/mcp) for searching Apify Store, running Actors, and retrieving datasets through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro).
- An `apify` routing agent that picks the right tool or skill from a natural-language request.
- Five built-in skills for common workflows (see [Bundled skills](#bundled-skills) below).

This guide covers installation from the plugin's GitHub repository.

<ThirdPartyDisclaimer />

## Prerequisites

- [An Apify account](https://console.apify.com/sign-up) - sign up for free if you don't have one.
- [Grok Build](https://docs.x.ai/build/overview) - installed and authenticated locally.
- [Apify CLI](/cli/docs/installation) - installed and logged in, for the scraping, Actor development, and actorization skills.

## Install the plugin

1. Install the plugin from its GitHub repository:

    ```bash
    grok plugin install apify/apify-grok-build-plugin
    ```

1. Confirm that you trust the plugin when Grok Build prompts you.

1. Check that the plugin is installed:

    ```bash
    grok plugin list
    ```

    The `apify` plugin appears in the list.

## Authenticate to Apify

The plugin bundles the Apify MCP server. Read-only tools like searching Apify Store and fetching Actor details work without signing in, but you need to authenticate to run Actors and access your account data.

1. Start Grok Build:

    ```bash
    grok
    ```

1. Run `/mcps` to open the MCP tab. The Apify MCP server appears with a **[needs auth]** label.

1. Select the Apify MCP server and press `i` to start the OAuth flow. Grok Build opens a browser tab for Apify.

1. Review the permissions and select **Allow access**. Apify requests access to your profile and to run Actors and manage your runs and storage on your behalf.

1. After you finish the OAuth flow, the **[needs auth]** label disappears and the Apify MCP server is connected.

:::tip Session persistence

The connection stays authenticated for future sessions. You can revoke access at any time in [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations).

:::

## Run your first prompt

Describe what you want in natural language. The `apify` agent routes the request to the right Apify MCP tool or skill, so you don't need to name tools yourself.

> Use Apify to find a good Actor for scraping Google Maps places. Show me the best option, its input requirements, pricing model, and what kind of dataset output it returns. Do not run the Actor yet.

Grok Build searches Apify Store, fetches the top Actor's details through the Apify MCP server, and summarizes its inputs, pricing, and output - all without running the Actor.

## Bundled skills

<ApifyPluginSkills />

Example prompts that route to specific skills:

<ApifyPluginSkillPrompts />

## Troubleshooting

### Browser doesn't open, or OAuth fails

If the browser doesn't open automatically, copy the OAuth URL shown in the terminal and paste it into your browser manually.

If the OAuth flow still can't complete, for example because no browser is available on the machine, the Apify MCP server stays unauthenticated. You can still work without MCP: use the CLI and SDK skills instead, which authenticate through the Apify CLI:

```bash
apify login
```

In a non-interactive environment, pass an API token from [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations) instead:

```bash
apify login -t <YOUR_API_TOKEN>
```

## Limitations

- Long-running Actors may exceed the time a single tool call waits for completion. Reduce the scope or split the work across multiple prompts.
- Each Actor run consumes Apify platform usage from your plan in addition to any Grok usage. See [Billing](/account/billing) for details.
- Skills that edit files in your project (Actor development, actorization, SDK integration) make local changes - review them before deploying or committing.

## Related integrations

- [Claude Code CLI integration](/integrations/claude-code-cli) - Install the Apify plugin for Claude Code
- [MCP server integration](/mcp) - Use the Apify MCP server with other clients

## Resources

- [Apify plugin for Grok Build](https://github.com/apify/apify-grok-build-plugin) - Source repository and full README with advanced setup notes
- [Grok Build plugin documentation](https://docs.x.ai/build/features/skills-plugins-marketplaces) - Official Grok Build docs on skills, plugins, and marketplaces
- [Apify Store](https://apify.com/store) - Browse Actors you can run from Grok Build
