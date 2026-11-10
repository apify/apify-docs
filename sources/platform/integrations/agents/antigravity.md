---
title: Antigravity integration
sidebar_label: Antigravity
description: Install the Apify plugin in the Google Antigravity app and CLI to run and build Actors with the Apify MCP server, skills, a routing agent, and a routing rule.
slug: /integrations/antigravity
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';
import ApifyPluginSkills from '@site/sources/_partials/_apify-plugin-skills.mdx';
import ApifyPluginSkillPrompts from '@site/sources/_partials/_apify-plugin-skill-prompts.mdx';

[Google Antigravity](https://antigravity.google) is Google's agentic development platform, available as a desktop app and as the `agy` command-line tool. The same [Apify plugin for Antigravity](https://github.com/apify/apify-antigravity-plugin) works in both and connects them to Actors in [Apify Store](https://apify.com/store). The plugin bundles:

- The [Apify MCP server](/mcp) for searching Apify Store, running Actors, and retrieving datasets through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro).
- An `apify` routing agent that picks the right tool or skill from a natural-language request.
- An always-on `apify` rule with the same routing guidance, so every session knows when to use Apify.
- Five built-in [skills](#bundled-skills) for common workflows.

<ThirdPartyDisclaimer />

## Prerequisites

- [An Apify account](https://console.apify.com/sign-up) - sign up for free if you don't have one.
- [Antigravity](https://antigravity.google) - the desktop app, or the Antigravity CLI (`agy`) version 1.4.0 or newer, installed and signed in.
- [Gemini Enterprise AI developer tools settings](https://docs.cloud.google.com/gemini/enterprise/docs/ai-developer-tools-settings) - only if your organization manages MCP servers, where admins must allow remote servers such as `https://mcp.apify.com`.

## Install the plugin

Install the plugin with the [`agy` CLI](#antigravity-cli), or by adding it to the [Antigravity app](#antigravity-app) plugins folder.

### Antigravity CLI

1. Install the plugin from its repository:

    ```bash
    agy plugin install https://github.com/apify/apify-antigravity-plugin
    ```

1. Confirm the install:

    ```bash
    agy plugin list
    ```

    The `apify` plugin is listed as enabled, with its skills, agent, rule, and MCP server.

You can also install from the [release ZIP](https://github.com/apify/apify-antigravity-plugin/releases/latest/download/apify-antigravity-plugin.zip): extract it into `~/.gemini/config/plugins`, the folder the CLI and the app share.

### Antigravity app

The app loads plugins from a folder on your machine.

1. Download [`apify-antigravity-plugin.zip`](https://github.com/apify/apify-antigravity-plugin/releases/latest/download/apify-antigravity-plugin.zip) from the latest release and extract it into your global plugins folder, so the plugin ends up in `~/.gemini/config/plugins/apify`.

    If you have Git, you can clone the repository instead, which makes updates a `git pull`:

    ```bash
    git clone https://github.com/apify/apify-antigravity-plugin ~/.gemini/config/plugins/apify
    ```

    To enable the plugin for a single project only, put the `apify` folder in `.agents/plugins/` inside that project instead. These are the default plugin folders at the time of writing; check the current locations in the [Antigravity plugins guide](https://antigravity.google/docs/plugins).

1. Open **Customizations** > **Installed** and make sure **Apify** is listed under **Plugins**. It shows **Setup required** until you sign in.

## Authenticate to Apify

The plugin bundles the Apify MCP server, which signs you in with OAuth. No API token goes into any configuration file.

- CLI: run `/mcp`, select the Apify server, and select **Authenticate**.
- App: open **Customizations** > **Installed** > **Apify**, select the **Accounts** tab, and select **Sign in** next to the `apify` account.

Antigravity opens a browser tab for the Apify OAuth flow, which ends with an authorization code. Copy the code, then paste it at the CLI prompt and press Enter, or paste it into the app and select **Submit**. The connection stays authenticated for future sessions, and you can revoke access at any time in [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations).

## Run your first prompt

Describe what you want in natural language. The `apify` rule and agent route the request to the right tool or skill, so you don't need to name tools yourself. To talk to the agent directly, start the CLI with `agy --agent apify`, or select **apify** from the app's **Agents** menu.

> Use Apify to find a good Actor for scraping Google Maps places. Show me the best option, its input requirements, pricing model, and what kind of dataset output it returns. Do not run the Actor yet.

The agent searches Apify Store, fetches the top Actor's details through the Apify MCP server, and summarizes its inputs, pricing, and output - all without running the Actor.

## Bundled skills

<ApifyPluginSkills />

The agent invokes these skills automatically. Each skill is also a slash command, for example `/apify-ultimate-scraper`.

<ApifyPluginSkillPrompts />

The Actor development, actorization, and scraping skills call the Apify CLI. Install it with `npm install -g apify-cli` and run `apify login` before you use them.

## Troubleshooting

Most problems are a plugin that did not load, the wrong skill, OAuth on a machine without a browser, or the terminal sandbox.

### The Apify MCP server doesn't appear

Restart the CLI or the app after installing the plugin, then run `/mcp` in the CLI or open **Customizations** > **Installed** > **Apify** > **MCP** in the app. If the server is listed but not connected, authenticate it again; see [Authenticate to Apify](#authenticate-to-apify).

### Antigravity picks the wrong skill

Start the CLI with `agy --agent apify`, or select **apify** from the app's **Agents** menu, so the routing agent handles the request. The agent owns the guardrails that pick the right skill and avoid common traps, such as confusing the `apify` and `apify-client` packages.

### Commands that need the network hang or fail

With the default permission preset, Antigravity runs agent commands in a [terminal sandbox](https://antigravity.google/docs/sandbox) without network access. Commands that need the network, such as `npm install` or Apify CLI commands, retry and then fail. The Apify CLI then reports that it couldn't verify your API token, even though your login is fine. Let the agent run the command outside the sandbox and approve the request, or allow the domains the command needs in your [agent permissions](https://antigravity.google/docs/agent-settings).

### Browser doesn't open, or OAuth fails

The MCP sign-in doesn't need a browser on the machine that runs Antigravity. Over SSH or in a container, open the sign-in link that Antigravity shows in a browser on any machine, then paste the authorization code back at the `agy` prompt.

If you can't use OAuth at all, use the skills that don't need the MCP server and authenticate them with your API token. Copy it from [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations?utm_source=antigravity&utm_medium=integrations) and set it before starting Antigravity:

```bash
export APIFY_TOKEN=<YOUR_API_TOKEN>
```

The SDK integration skill uses the `apify-client` package, which reads `APIFY_TOKEN` from your environment. The Actor development, actorization, and scraping skills use the Apify CLI, which reads `APIFY_TOKEN` from version 1.11.0. On older versions, log in with the token once:

```bash
apify login --token "$APIFY_TOKEN"
```

## Limitations

- Long-running Actors may exceed the time a single tool call waits for completion. Reduce the scope or split the work across multiple prompts.
- Each Actor run consumes Apify platform usage from your plan in addition to any Antigravity usage. See [Billing](/account/billing) for details.
- Skills that edit files in your project (Actor development, actorization, and SDK integration) make local changes. Review them before deploying or committing.

## Related integrations

- [Claude Code CLI integration](/integrations/claude-code-cli) - Install the Apify plugin for Claude Code CLI
- [MCP server integration](/mcp) - Use the Apify MCP server with other clients

## Resources

- [Apify plugin for Antigravity](https://github.com/apify/apify-antigravity-plugin) - Source repository and README with advanced setup notes
- [Antigravity plugins guide](https://antigravity.google/docs/plugins) - Official docs for managing Antigravity plugins
- [Apify Store](https://apify.com/store) - Browse Actors you can run from Antigravity
