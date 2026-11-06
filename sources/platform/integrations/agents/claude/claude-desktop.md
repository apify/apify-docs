---
title: Claude Desktop integration
sidebar_label: Claude Desktop
description: Learn how to set up the Apify MCP server in Claude Desktop with the Apify plugin, a custom connector, or the Desktop extension, and fix common issues.
slug: /integrations/claude-desktop
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

Connect [Claude Desktop](https://claude.ai/download) to the [Apify MCP server](/mcp) to give your conversations access to thousands of Actors from [Apify Store](https://apify.com/store). Once connected, Claude can search for, run, and retrieve results from Actors directly in your chat.

<ThirdPartyDisclaimer />

## Prerequisites

- An [Apify account](https://console.apify.com/sign-up)
- [Claude Desktop](https://claude.ai/download) installed

## Connect to Apify

Choose one of the following methods:

- [Apify plugin or custom connector](#apify-plugin-or-custom-connector) - recommended, automatic updates, OAuth support, no local dependencies
- [Desktop extension](#desktop-extension) - local install from the connector directory or an `.mcpb` file

### Apify plugin or custom connector (recommended) {#apify-plugin-or-custom-connector}

The Apify plugin bundles the Apify MCP server, skills, and a routing agent. The plugin and a custom connector both connect to the hosted Apify MCP server at `https://mcp.apify.com`. Key advantages:

- Automatic updates - always runs the latest version of the Apify MCP server
- OAuth authentication - secure sign-in through your browser, no API token needed
- No local dependencies - nothing to install or maintain on your machine

To set either one up, follow the [Claude.ai integration guide](/integrations/claude-ai). The connector works in both claude.ai and Claude Desktop.

### Desktop extension

Search for "Apify" in the [Claude Desktop connector directory](https://support.claude.com/en/articles/11176164) and install the **Apify** Desktop extension.

Alternatively, download and open the [Apify MCP server `.mcpb` file](https://github.com/apify/actors-mcp-server/releases/latest/download/apify-mcp-server.mcpb) to register the extension automatically.

## Verify the connection

1. Restart Claude Desktop after saving configuration changes.
1. Open a new conversation.
1. Check that Apify tools are available in the tools list.
1. Test with a prompt like: "Search for web scraping Actors on Apify."

## Troubleshooting

<!-- markdownlint-disable MD001 -->

If the steps below don't resolve your issue, [submit a GitHub issue](https://github.com/apify/apify-mcp-server/issues) or contact [Apify support](https://apify.com/contact).

:::tip Quick checks

Before diving into specific issues, check these two things first:

1. _Check the [Claude Desktop logs](#claude-desktop-logs)._ Look for files with `mcp` in the name.
1. _Check [tool permissions](#tools-fail-to-load)._ The connector may block some tools by default.

:::

#### Tools fail to load

The MCP server shows as connected but Apify tools don't appear in the tools list, or Claude doesn't recognize any Apify tools in conversation.

- _Check tool permissions._ Individual connector tools can be blocked in your [connector settings](https://support.claude.com/en/articles/11176164). Verify that Apify tools are set to **Always allow** or **Ask first**, not blocked.
- _Check the extension version._ If you use the [Desktop extension](#desktop-extension), Claude Desktop may silently downgrade it to an older version. If tools aren't appearing despite the extension showing as enabled, remove and re-add the extension to trigger an update.
- _Restart Claude Desktop._ Configuration changes only take effect after a restart.
- _Reinstall the extension or connector._ Remove the Apify extension or connector and add it again.

#### Authentication errors

Authentication errors occur when the MCP server can't verify your identity. You may see "Unauthorized" or "Invalid token" messages, or Actor runs may fail silently.

- _Re-authorize the connection._ Remove and re-add the Apify connector in Claude Desktop to trigger a new OAuth flow.

#### Claude Desktop logs

Check the Claude Desktop logs for MCP-related errors:

- macOS: `~/Library/Logs/Claude/`
- Linux: `~/.config/Claude/logs/`
- Windows: `%APPDATA%\Claude\logs\`

Look for files with `mcp` in the name for server-specific error messages.

### Desktop extension issues

The following troubleshooting steps apply only to the [Desktop extension](#desktop-extension). The Apify plugin and custom connector run entirely on Apify's infrastructure, so there are no local logs or configuration to debug. For issues with them, see [Claude.ai troubleshooting](/integrations/claude-ai#troubleshooting) or contact [Apify support](https://apify.com/contact).

#### "Unable to connect to extension server" error

This is the most common issue. It typically appears when installing from the Claude Desktop connector directory. In some cases, the MCP server starts and communicates correctly, but Claude Desktop still shows the error.

1. _Consider switching to the [Apify plugin or a custom connector](#apify-plugin-or-custom-connector)._ They're the most reliable option.
1. _Uninstall and reinstall the extension._ In Claude Desktop, disable the Apify extension, remove it, then add it again.
1. _Clear the npx cache._ A stale cache can cause connection failures. Follow the steps in [Corrupted npx cache](#corrupted-npx-cache).
1. _Check the [Claude Desktop logs](#claude-desktop-logs)_ for specific error messages.
1. _Check your network._ Ensure your firewall or VPN is not blocking the connection.
1. _Still not working?_ [Submit a GitHub issue](https://github.com/apify/apify-mcp-server/issues) or contact [Apify support](https://apify.com/contact).

#### Corrupted npx cache

A stale or corrupted npx cache can prevent the server from starting. Clear the cache and retry:

<Tabs groupId="operating-system">
<TabItem value="macos-linux" label="macOS and Linux">

```bash
rm -rf ~/.npm/_npx
```

</TabItem>
<TabItem value="windows" label="Windows">

```text
rmdir /s /q %LOCALAPPDATA%\npm-cache\_npx
```

</TabItem>
</Tabs>

After clearing the cache:

1. Restart Claude Desktop to re-download the server package.
1. Check the [Claude Desktop logs](#claude-desktop-logs) for errors.
1. If the issue persists, switch to the [Apify plugin or a custom connector](#apify-plugin-or-custom-connector), which doesn't rely on local packages.

#### Connector does not work in Claude Cowork

The Apify connector shows as connected in Cowork, but Claude doesn't recognize the tools or can't call them. The same connector works fine in regular Claude Chat.

Cowork launches local MCP servers with a different mechanism than Claude Chat and requires a system-wide `node` binary. If Node.js is only installed through a version manager (such as nvm, fnm, nodenv, or Volta), Cowork cannot find it and the server fails to start. The [Claude Desktop logs](#claude-desktop-logs) show `spawn node ENOENT` in this case.

Install Node.js system-wide and restart Claude Desktop:

<Tabs groupId="operating-system">
<TabItem value="macos" label="macOS">

```bash
brew install node
```

Or download the installer from [nodejs.org](https://nodejs.org).

</TabItem>
<TabItem value="windows" label="Windows">

Download and run the installer from [nodejs.org](https://nodejs.org).

</TabItem>
<TabItem value="linux" label="Linux">

```bash
# Debian/Ubuntu
sudo apt install nodejs

# Fedora
sudo dnf install nodejs
```

</TabItem>
</Tabs>

A system-wide installation can coexist with an existing version-manager installation. If installing Node.js system-wide is not an option, switch to the [Apify plugin or a custom connector](#apify-plugin-or-custom-connector), which doesn't require a local Node.js runtime.

## Known limitations

- Claude Desktop may silently downgrade an installed Desktop extension to an older version (for example, from 0.9.14 back to 0.9.6). This can cause tools to stop loading even though the extension still shows as enabled. Removing and re-adding the extension may prompt an update, but doesn't always resolve the issue.
- Some Claude Desktop versions have inconsistent behavior with remote MCP server connections. Update to the latest version if you experience issues.
- If the Desktop extension installation fails, use the [Apify plugin or a custom connector](#apify-plugin-or-custom-connector) instead.

## Next steps

- [Apify MCP server](/mcp) - Explore tool selection, available tools, telemetry, and rate limits
- [Apify MCP server configurator](https://mcp.apify.com) - Select tools visually and copy configuration
- [Apify MCP server on GitHub](https://github.com/apify/apify-mcp-server) - Report bugs and suggest features
