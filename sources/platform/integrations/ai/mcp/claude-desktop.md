---
title: Claude Desktop integration
sidebar_label: Claude Desktop
description: Learn how to set up the Apify MCP server in Claude Desktop with remote or local configuration, and troubleshoot common connection issues.
sidebar_position: 1.5
slug: /integrations/claude-desktop
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Connect [Claude Desktop](https://claude.ai/download) to the [Apify MCP server](/integrations/mcp) to give your conversations access to thousands of Actors from [Apify Store](https://apify.com/store). Once connected, Claude can search for, run, and retrieve results from Actors directly in your chat.

## Prerequisites

- An [Apify account](https://console.apify.com/sign-up) with an [API token](https://console.apify.com/account#/integrations)
- [Claude Desktop](https://claude.ai/download) installed
- [Node.js](https://nodejs.org/) version 18 or higher (only required for [local stdio setup](#local-stdio-server))

## Connect to Apify

Choose one of the following methods, from simplest to most flexible:

- [One-click installation](#one-click-installation-recommended) with the `.mcpb` file (recommended)
- [Remote server configuration](#remote-server-manual-configuration) (no local dependencies)
- [Local stdio server](#local-stdio-server) (development, testing, or offline access)

### One-click installation (recommended)

Download and open the [Apify MCP server `.mcpb` file](https://github.com/apify/actors-mcp-server/releases/latest/download/apify-mcp-server.mcpb). Claude Desktop automatically registers the Apify MCP server and prompts you to approve the connection.

:::note Direct install from Claude Desktop may fail

Installing Apify directly from Claude Desktop's connector list may fail silently or show connection errors. Use the `.mcpb` file above or [manual configuration](#remote-server-manual-configuration) instead. See [troubleshooting](#unable-to-connect-to-extension-server-error) for details.

:::

### Remote server (manual configuration)

The remote server at `https://mcp.apify.com` is the simplest manual setup - no local dependencies required.

1. Open Claude Desktop.
1. Go to **Settings** > **Developer** > **Edit Config**.
1. Add the Apify MCP server configuration:

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

Replace `<APIFY_TOKEN>` with your API token from the [Integrations section](https://console.apify.com/account#/integrations) in Apify Console.

</TabItem>
</Tabs>

### Local stdio server

Run the MCP server locally for development, testing, or when you need offline access. This method requires Node.js.

1. Open Claude Desktop.
1. Go to **Settings** > **Developer** > **Edit Config**.
1. Add the following configuration:

```json
{
  "mcpServers": {
    "actors-mcp-server": {
      "command": "npx",
      "args": ["-y", "@apify/actors-mcp-server"],
      "env": {
        "APIFY_TOKEN": "<APIFY_TOKEN>"
      }
    }
  }
}
```

Replace `<APIFY_TOKEN>` with your API token from the [Integrations section](https://console.apify.com/account#/integrations) in Apify Console.

:::info Output schema inference

The local stdio server does not support output schema inference for structured Actor results. Use the [remote server](#remote-server-manual-configuration) to get automatic output schemas with field-level type information.

:::

## Verify the connection

1. Restart Claude Desktop after saving configuration changes.
1. Open a new conversation.
1. Check that Apify tools are available in the tools list.
1. Test with a prompt like: "Search for web scraping Actors on Apify."

## Troubleshooting

### Tools fail to load

The MCP server shows as connected but Apify tools don't appear in the tools list, or Claude doesn't recognize any Apify tools in conversation.

- **Restart Claude Desktop.** Configuration changes only take effect after a restart.
- **Check the config file location.** Verify you edited the correct file:
  - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
  - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- **Validate JSON syntax.** Ensure there are no trailing commas, missing quotes, or mismatched brackets. Paste your config into a JSON validator if needed.

### "Unable to connect to extension server" error

This error commonly appears when installing from the Claude Desktop connector directory. In some cases, the MCP server starts and communicates correctly, but Claude Desktop still shows the error.

- **Uninstall and reinstall the extension.** In Claude Desktop, disable the Apify extension, remove it, then add it again.
- **Switch to manual configuration.** If reinstalling doesn't help, use the [remote server](#remote-server-manual-configuration) or [local stdio](#local-stdio-server) setup instead of the connector directory.
- **Verify the server URL.** For remote setup, use exactly `https://mcp.apify.com` with no trailing slash.
- **Check your network.** Ensure your firewall or VPN is not blocking the connection.
- **For local stdio setup:** Confirm Node.js version 18 or higher is installed by running `node -v` in your terminal.

### Corrupted npx cache

A stale or corrupted npx cache can prevent the local server from starting. Clear the cache and retry:

- macOS and Linux:

    ```bash
    rm -rf ~/.npm/_npx
    ```

- Windows:

    ```bash
    rmdir /s /q %LOCALAPPDATA%\npm-cache\_npx
    ```

After clearing the cache, restart Claude Desktop to re-download the server package.

### Authentication errors

Authentication errors occur when the MCP server can't verify your identity. You may see "Unauthorized" or "Invalid token" messages, or Actor runs may fail silently.

- **Check your API token.** Verify the token in the [Integrations section](https://console.apify.com/account#/integrations) of Apify Console.
- **For local stdio setup:** Ensure the `APIFY_TOKEN` environment variable is set correctly in your config file.
- **For remote OAuth:** Remove and re-add the Apify MCP server in Claude Desktop to re-authorize.

### Check Claude Desktop logs

If the above steps don't resolve your issue, check the Claude Desktop logs for MCP-related errors:

- macOS: `~/Library/Logs/Claude/`
- Linux: `~/.config/Claude/logs/`
- Windows: `%APPDATA%\Claude\logs\`

Look for files with `mcp` in the name for server-specific error messages.

## Known limitations

- The Claude Desktop connector directory may not install Apify correctly. Use the [`.mcpb` file](#one-click-installation-recommended) or [manual configuration](#remote-server-manual-configuration) instead.
- Multi-agent cowork mode may not pass MCP tool results between agents reliably when using the local stdio server.
- Some Claude Desktop versions have inconsistent behavior with remote MCP server connections. Update to the latest version if you experience issues.

## Next steps

- [Apify MCP server](/integrations/mcp) - Explore tool selection, available tools, telemetry, and rate limits
- [Apify MCP server configurator](https://mcp.apify.com) - Select tools visually and copy configuration
- [Apify MCP server on GitHub](https://github.com/apify/apify-mcp-server) - Report bugs and suggest features
