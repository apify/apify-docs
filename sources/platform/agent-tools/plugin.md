---
title: Apify plugin for AI coding agents
sidebar_label: Plugin
description: Install the Apify plugin to give your coding agent the MCP server, Agent Skills, and a routing agent in one step. Pick your agent to get its commands.
sidebar_position: 1
slug: /agent-tools/plugin
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Apify plugin is the shortest way to connect a coding agent to Apify. One install configures the [Apify MCP server](/mcp) and [Agent Skills](/agent-tools/skills) together, so you don't edit an MCP configuration or install skills by hand.

Apify maintains a separate plugin for each agent, because each agent has its own plugin format and install flow. Check [what your agent gets](#coverage-by-agent), then follow its [install steps](#install).

## What a plugin bundles

Most plugins bundle three parts:

- The [Apify MCP server](/mcp) at `https://mcp.apify.com`, for the live connection to the Apify platform. Its configuration ships inside the plugin.
- Five [Agent Skills](/agent-tools/skills) covering scraping with existing Actors, Actor development, actorization, output schemas, and application integration.
- An `apify` routing agent that picks the right tool or skill from a plain-language request, so you don't have to name tools yourself.

The OpenClaw, Hermes Agent, and Kilo Code plugins work differently. Instead of connecting to the MCP server, they register native Apify tools that start Actor runs and collect the results asynchronously, so the agent can keep working while an Actor runs.

## Coverage by agent

| Agent | MCP server | Agent Skills | Routing agent | Plugin source |
| :--- | :---: | :---: | :---: | :--- |
| Claude Code | Yes | Yes | Yes | [`apify/apify-claude-code-plugin`](https://github.com/apify/apify-claude-code-plugin) |
| Codex (app and CLI) | Yes | Yes | No | [`apify/apify-codex-plugin`](https://github.com/apify/apify-codex-plugin) |
| Cursor | Yes | Yes | Yes | [`apify/apify-cursor-plugin`](https://github.com/apify/apify-cursor-plugin) |
| GitHub Copilot and VS Code | Yes | Yes | Yes | [`apify/apify-github-copilot-plugin`](https://github.com/apify/apify-github-copilot-plugin) |
| OpenCode | Yes | Yes | Yes | [`opencode-apify`](https://github.com/apify/apify-opencode-plugin) |
| Grok Build | Yes | Yes | Yes | [`apify/apify-grok-build-plugin`](https://github.com/apify/apify-grok-build-plugin) |
| Kimi Code | Yes | Yes | No | [`apify/apify-kimi-code-plugin`](https://github.com/apify/apify-kimi-code-plugin) |
| Qoder and Qwen Code | Yes | Yes | Yes | [`apify/apify-qoder-plugin`](https://github.com/apify/apify-qoder-plugin) |
| OpenClaw | Native tool | No | No | [`@apify/apify-openclaw-plugin`](https://github.com/apify/apify-openclaw-plugin) |
| Hermes Agent | Native tools | Routing skill | No | [`apify-hermes-agent-plugin`](https://github.com/apify/apify-hermes-agent-plugin) |
| Kilo Code | Native tool | No | No | [`@apify/kilocode-plugin`](https://github.com/apify/kilocode-plugin) |

If your agent isn't listed, connect the [MCP server](/mcp) directly and install [Agent Skills](/agent-tools/skills#install) separately. The [MCP configurator](https://mcp.apify.com) generates a configuration for most MCP clients.

## Install

Pick your agent. Each tab shows the install commands, where to run them, and how to sign in. The full guide for each agent covers manual setup and troubleshooting.

<Tabs groupId="agent-client" queryString>
<TabItem value="claude-code" label="Claude Code">

1. In Claude Code, add the Apify marketplace, install the plugin, and reload:

    ```text
    /plugin marketplace add apify/apify-claude-code-plugin
    /plugin install apify@apify
    /reload-plugins
    ```

1. Run `/mcp`, open `plugin:apify:apify`, select **Enable**, then select **Authenticate** and complete the Apify sign-in in your browser.

You can also add the marketplace from the `/plugins` manager. Read the full [Claude Code guide](/integrations/claude-code-cli).

</TabItem>
<TabItem value="codex" label="Codex">

1. In the Codex CLI or the Codex app, run `/plugins` and open the **Add Marketplace** tab.
1. Enter the Apify plugin repository:

    ```text
    apify/apify-codex-plugin
    ```

1. Open the **Apify Plugin** tab, select **Apify**, and select **Install plugin**.

Codex opens the Apify sign-in the first time it calls a tool that needs authentication, such as running an Actor. Read the full [Codex CLI guide](/integrations/codex-cli) or [Codex app guide](/integrations/codex-app).

</TabItem>
<TabItem value="cursor" label="Cursor">

1. In the Cursor agent chat, run:

    ```text
    /add-plugin apify
    ```

    You can also search for `Apify` under **Plugins** in Cursor Settings, or install it from the [Cursor Marketplace](https://cursor.com/marketplace/apify).

1. In Cursor Settings, open **Tools & MCPs**, select **Connect** on the **Apify MCP** server, and complete the Apify sign-in in your browser.

Read the full [Cursor guide](/integrations/cursor).

</TabItem>
<TabItem value="github-copilot" label="GitHub Copilot">

In the GitHub Copilot CLI, install the plugin from the [Awesome Copilot](https://awesome-copilot.github.com/plugins) marketplace, which the CLI registers by default:

```text
/plugin install apify@awesome-copilot
```

Copilot opens a browser tab for the Apify sign-in. In the desktop app, open **Settings** > **Plugins**, search for `Apify`, and select **Install**, then sign in from **Settings** > **MCP servers**.

Read the full [GitHub Copilot CLI guide](/integrations/github-copilot-cli) or [desktop app guide](/integrations/github-copilot-desktop).

</TabItem>
<TabItem value="vscode" label="VS Code">

1. Open the Extensions view and enter `@agentPlugins apify` in the search field.
1. Select **Install** on the `apify` entry from the Awesome Copilot marketplace, then confirm the trust prompt.
1. When VS Code asks to authenticate the MCP server, select **Allow** and complete the Apify sign-in in your browser.

VS Code installs the same plugin as GitHub Copilot. Read the full [VS Code guide](/integrations/vscode).

</TabItem>
<TabItem value="opencode" label="OpenCode">

1. In your project, install the plugin from npm:

    ```bash
    opencode plugin opencode-apify
    ```

1. Start the Apify sign-in:

    ```bash
    opencode mcp auth apify
    ```

Read the full [OpenCode guide](/integrations/opencode).

</TabItem>
<TabItem value="grok-build" label="Grok Build">

In Grok Build, install the plugin from its repository:

```text
/install-plugin https://github.com/apify/apify-grok-build-plugin
```

Grok Build opens the Apify sign-in on the first Actor run. There's no Apify guide for Grok Build yet, so check the [plugin README](https://github.com/apify/apify-grok-build-plugin) for details.

</TabItem>
<TabItem value="kimi-code" label="Kimi Code">

1. In Kimi Code, install the plugin from its repository, then reload the session:

    ```text
    /plugins install https://github.com/apify/apify-kimi-code-plugin
    /reload
    ```

    You can also run `/plugins`, switch to the **Curated** tab, and select **Apify**.

1. Kimi Code doesn't start the sign-in on its own, so run it once:

    ```text
    /mcp-config login apify
    ```

Read the full [Kimi Code CLI guide](/integrations/kimi-code-cli).

</TabItem>
<TabItem value="qoder" label="Qoder">

1. In the Qoder CLI, run `/plugins`, open the **Marketplaces** tab, and add the Apify plugin repository:

    ```text
    https://github.com/apify/apify-qoder-plugin
    ```

1. Install the `apify` plugin from the **Discover** tab, run `/plugins reload`, and restart the CLI.

The Qoder IDE installs from the [Qoder Marketplace](https://qoder.com/marketplace/plugin?id=bbbdb1cb-8bad-441e-b42f-ce0e33e3a521) page in one step, and the Desktop app and QoderWork import the plugin package from the same page. Qwen Code installs the Qoder plugin as an extension. Read the full [Qoder guide](/integrations/qoder) or [Qwen Code guide](/integrations/qwen).

</TabItem>
<TabItem value="openclaw" label="OpenClaw">

1. Install the plugin from npm:

    ```bash
    openclaw plugins install @apify/apify-openclaw-plugin
    ```

1. Run the setup wizard, which asks for your [Apify API token](https://console.apify.com/settings/integrations), then restart the gateway:

    ```bash
    openclaw apify setup
    openclaw gateway restart
    ```

Read the full [OpenClaw guide](/integrations/openclaw).

</TabItem>
<TabItem value="hermes" label="Hermes Agent">

1. Install the plugin from PyPI and enable it:

    ```bash
    pip install apify-hermes-agent-plugin
    hermes plugins enable apify
    ```

1. Save your [Apify API token](https://console.apify.com/settings/integrations) and enable the `apify` toolset:

    ```bash
    hermes apify-setup
    ```

Read the full [Hermes Agent guide](/integrations/hermes-agent).

</TabItem>
<TabItem value="kilo-code" label="Kilo Code">

1. Install the plugin from npm:

    ```bash
    kilo plugin @apify/kilocode-plugin
    ```

1. Store your [Apify API token](https://console.apify.com/settings/integrations) through Kilo's auth flow, then restart Kilo Code so the plugin picks it up:

    ```bash
    kilo auth login --provider apify
    ```

There's no Apify guide for Kilo Code yet, so check the [plugin README](https://github.com/apify/kilocode-plugin) for details.

</TabItem>
</Tabs>

Plugins that use the MCP server sign in through OAuth and keep the connection for future sessions. You can revoke access at any time in [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations). The OpenClaw, Hermes Agent, and Kilo Code plugins use an Apify API token instead.

## Plugin or the parts separately

Installing the MCP server and Agent Skills yourself gives you roughly the same capability as the plugin, with two differences:

- You maintain the MCP configuration and the skill versions yourself. The plugin ships both together.
- You don't get the `apify` routing agent, so prompts have to name tools or skills more explicitly.

Choose the separate route when your agent has no plugin, when you need a narrower [tool selection](/mcp#tool-selection) than the plugin ships with, or when you're wiring Apify into an agent framework rather than a coding agent.

## Limitations

- Long-running Actors can exceed the time a single tool call waits for completion. Reduce the scope or split the work across prompts.
- Each Actor run consumes Apify platform usage on top of your agent's own usage. Check [billing](/account/billing) for details.
- Skills that edit files, meaning Actor development, actorization, and application integration, make local changes. Review them before you commit or deploy.

## Related resources

- [Agent Skills](/agent-tools/skills) - What the bundled skills do and how to install them on their own
- [Apify MCP server](/mcp) - Tool reference, authentication, and production practices
- [Apify agent tools](/agent-tools) - How the plugin, the MCP server, and Agent Skills fit together
