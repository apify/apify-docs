---
title: Claude Desktop integration
sidebar_label: Claude Desktop
description: Learn how to set up the Apify MCP server in Claude Desktop using the remote server or one-click connector install, and troubleshoot common issues.
sidebar_position: 2
slug: /integrations/claude-desktop
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

Connect [Claude Desktop](https://claude.ai/download) to the [Apify MCP server](/platform/integrations/mcp) to give your conversations access to thousands of Actors from [Apify Store](https://apify.com/store). Once connected, Claude can search for, run, and retrieve results from Actors directly in your chat.

<ThirdPartyDisclaimer />

## Prerequisites

- An [Apify account](https://console.apify.com/sign-up)
- [Claude Desktop](https://claude.ai/download) installed

## Connect to Apify

Choose one of the following methods:

- [Remote server](#remote-server-recommended) - recommended, automatic updates, OAuth support, no local dependencies
- [One-click installation](#one-click-installation) - install from the connector directory

### Remote server (recommended)

The remote server at `https://mcp.apify.com` is the recommended way to connect. Key advantages:

- Automatic updates - always runs the latest version of the Apify MCP server
- OAuth authentication - secure sign-in through your browser, no API token needed
- No local dependencies - nothing to install or maintain on your machine

To set up the remote server, [add a custom connector](https://support.claude.com/en/articles/11175166) in Claude Desktop and use `https://mcp.apify.com` as the server URL.

On first connection, your browser opens to sign in to Apify and authorize the connection.

### One-click installation

Search for "Apify" in the [Claude Desktop connector directory](https://support.claude.com/en/articles/11175166) and install the connector.

Alternatively, download and open the [Apify MCP server `.mcpb` file](https://github.com/apify/actors-mcp-server/releases/latest/download/apify-mcp-server.mcpb) to register the connector automatically.

## Verify the connection

1. Restart Claude Desktop after saving configuration changes.
1. Open a new conversation.
1. Check that Apify tools are available in the tools list.
1. Test with a prompt like: "Search for web scraping Actors on Apify."

## Troubleshooting

<!-- markdownlint-disable MD001 -->

If the steps below don't resolve your issue, [submit a GitHub issue](https://github.com/apify/apify-mcp-server/issues) or contact [Apify support](https://apify.com/contact).

#### Tools fail to load

The MCP server shows as connected but Apify tools don't appear in the tools list, or Claude doesn't recognize any Apify tools in conversation.

- _Restart Claude Desktop._ Configuration changes only take effect after a restart.
- _Reinstall the connector._ Remove the Apify connector and add it again.

#### Authentication errors

Authentication errors occur when the MCP server can't verify your identity. You may see "Unauthorized" or "Invalid token" messages, or Actor runs may fail silently.

- _Re-authorize the connection._ Remove and re-add the Apify connector in Claude Desktop to trigger a new OAuth flow.

#### Claude Desktop logs

Check the Claude Desktop logs for MCP-related errors:

- macOS: `~/Library/Logs/Claude/`
- Linux: `~/.config/Claude/logs/`
- Windows: `%APPDATA%\Claude\logs\`

Look for files with `mcp` in the name for server-specific error messages.

### One-click installation issues

The following troubleshooting steps apply specifically to the [one-click installation](#one-click-installation) method. The remote server runs entirely on Apify's infrastructure, so there are no local logs or configuration to debug. If you experience issues with the [remote server](#remote-server-recommended), contact [Apify support](https://apify.com/contact).

#### "Unable to connect to extension server" error

This is the most common issue. It typically appears when installing from the Claude Desktop connector directory. In some cases, the MCP server starts and communicates correctly, but Claude Desktop still shows the error.

1. _Consider switching to the [remote server](#remote-server-recommended) setup._ The remote server is the most reliable option.
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
1. If the issue persists, switch to the [remote server](#remote-server-recommended) setup, which doesn't rely on local packages.

## Known limitations

- Some Claude Desktop versions have inconsistent behavior with remote MCP server connections. Update to the latest version if you experience issues.
- If the connector directory installation fails, use the [remote server](#remote-server-recommended) at `https://mcp.apify.com` instead.

## Next steps

- [Apify MCP server](/platform/integrations/mcp) - Explore tool selection, available tools, telemetry, and rate limits
- [Apify MCP server configurator](https://mcp.apify.com) - Select tools visually and copy configuration
- [Apify MCP server on GitHub](https://github.com/apify/apify-mcp-server) - Report bugs and suggest features
