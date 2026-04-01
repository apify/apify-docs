---
title: Claude Desktop integration
sidebar_label: Claude Desktop
description: Set up the Apify MCP server in Claude Desktop using the remote server or one-click connector install, and troubleshoot common issues.
sidebar_position: 1.5
slug: /integrations/claude-desktop
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Connect [Claude Desktop](https://claude.ai/download) to the [Apify MCP server](/platform/integrations/mcp) to give your conversations access to thousands of Actors from [Apify Store](https://apify.com/store). Once connected, Claude can search for, run, and retrieve results from Actors directly in your chat.

## Prerequisites

- An [Apify account](https://console.apify.com/sign-up) with an [API token](https://console.apify.com/account#/integrations)
- [Claude Desktop](https://claude.ai/download) installed

## Connect to Apify

Choose one of the following methods:

- [Remote server](#remote-server-recommended) - recommended, automatic updates, OAuth support, no local dependencies
- [One-click installation](#one-click-installation) via the connector directory

### Remote server (recommended)

The remote server at `https://mcp.apify.com` is the recommended way to connect. It provides automatic updates, OAuth authentication, and requires no local dependencies or API token management.

1. Open Claude Desktop.
1. Go to **Settings** > **Developer** > **Edit Config**.
1. Edit the configuration file to add the Apify MCP server:

<Tabs>
<TabItem value="OAuth" label="OAuth (recommended)">

```json
{
  "mcpServers": {
    "apify": {
      "url": "https://mcp.apify.com"
    }
  }
}
```

On first connection, your browser opens to sign in to Apify and authorize the connection. This OAuth flow keeps your API token secure.

</TabItem>
<TabItem value="Bearer token" label="Bearer token">

```json
{
  "mcpServers": {
    "apify": {
      "url": "https://mcp.apify.com",
      "headers": {
        "Authorization": "Bearer <APIFY_TOKEN>"
      }
    }
  }
}
```

Replace `<APIFY_TOKEN>` with your API token obtained from the [Apify Console](https://console.apify.com/account#/integrations).

</TabItem>
</Tabs>

### One-click installation

You can install the Apify MCP server directly from the Claude Desktop connector directory:

1. Open Claude Desktop.
1. Go to **Settings** > **Connectors** > **Browse connectors**.
1. Search for Apify and install the connector.

Alternatively, you can download and open the [Apify MCP server `.mcpb` file](https://github.com/apify/apify-mcp-server/releases/latest/download/apify-mcp-server.mcpb) to register the connector automatically.

## Verify the connection

1. Restart Claude Desktop after saving configuration changes.
1. Open a new conversation.
1. Check that Apify tools are available in the tools list.
1. Test with a prompt like: "Search for web scraping Actors on Apify."

## Troubleshooting

<!-- markdownlint-disable MD001 -->

If the steps below don't resolve your issue, [submit a GitHub issue](https://github.com/apify/apify-mcp-server/issues) or contact [Apify support](https://apify.com/contact).


#### "Unable to connect to extension server" error

This is the most common issue. It typically appears when installing from the Claude Desktop connector directory. In some cases, the MCP server starts and communicates correctly, but Claude Desktop still shows the error.

1. _Consider switching to the [remote server](#remote-server-recommended) setup._ Manual configuration with the remote server is the most reliable option.
1. _Uninstall and reinstall the extension._ In Claude Desktop, disable the Apify extension, remove it, then add it again.
1. _Clear the npx cache._ A stale cache can cause connection failures. Follow the steps in [Corrupted npx cache](#corrupted-npx-cache).
1. _Check the [Claude Desktop logs](#check-claude-desktop-logs)_ for specific error messages.
1. _Verify the server URL._ For remote setup, use exactly `https://mcp.apify.com` with no trailing slash.
1. _Check your network._ Ensure your firewall or VPN is not blocking the connection.
1. _Still not working?_ [Submit a GitHub issue](https://github.com/apify/apify-mcp-server/issues) or contact [Apify support](https://apify.com/contact).

#### Tools fail to load

The MCP server shows as connected but Apify tools don't appear in the tools list, or Claude doesn't recognize any Apify tools in conversation.

- _Restart Claude Desktop._ Configuration changes only take effect after a restart.
- _Check the config file location._ Verify you edited the correct file:
  - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
  - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- _Validate JSON syntax._ Ensure there are no trailing commas, missing quotes, or mismatched brackets. Paste your config into a JSON validator if needed.

#### Corrupted npx cache

A stale or corrupted npx cache can prevent the server from starting. Clear the cache and retry:

1. Clear the npx cache:

    - macOS and Linux:

        ```bash
        rm -rf ~/.npm/_npx
        ```

    - Windows:

        ```bash
        rmdir /s /q %LOCALAPPDATA%\npm-cache\_npx
        ```

1. Restart Claude Desktop to re-download the server package.
1. Check the [Claude Desktop logs](#check-claude-desktop-logs) for errors.
1. If the issue persists, switch to the [remote server](#remote-server-recommended) setup, which doesn't rely on local packages.

#### Authentication errors

Authentication errors occur when the MCP server can't verify your identity. You may see "Unauthorized" or "Invalid token" messages, or Actor runs may fail silently.

- _Check your API token._ Verify the token in the [Integrations section](https://console.apify.com/account#/integrations) of Apify Console.
- _For remote OAuth:_ Remove and re-add the Apify MCP server in Claude Desktop to re-authorize.

#### Check Claude Desktop logs

If the above steps don't resolve your issue, check the Claude Desktop logs for MCP-related errors:

- macOS: `~/Library/Logs/Claude/`
- Linux: `~/.config/Claude/logs/`
- Windows: `%APPDATA%\Claude\logs\`

Look for files with `mcp` in the name for server-specific error messages.

## Known limitations

- Some Claude Desktop versions have inconsistent behavior with remote MCP server connections. Update to the latest version if you experience issues.
- If the connector directory installation fails, use the [remote server](#remote-server-recommended) at `https://mcp.apify.com` instead.

## Next steps

- [Apify MCP server](/platform/integrations/mcp) - Explore tool selection, available tools, telemetry, and rate limits
- [Apify MCP server configurator](https://mcp.apify.com) - Select tools visually and copy configuration
- [Apify MCP server on GitHub](https://github.com/apify/apify-mcp-server) - Report bugs and suggest features
