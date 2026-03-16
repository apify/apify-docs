---
title: Agent Skills and MCPC
sidebar_label: Agent Skills + MCPC
description: Use Apify Agent Skills and MCPC to give AI coding assistants web scraping, data extraction, and automation capabilities through MCP servers.
sidebar_position: 1.5
slug: /integrations/agent-skills
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Apify Agent Skills](https://github.com/apify/agent-skills) give AI coding assistants pre-built capabilities for web scraping, data extraction, and automation. Skills work with Claude Code, Cursor, Codex, Gemini CLI, and other AI tools that support [Model Context Protocol (MCP)](https://modelcontextprotocol.io/).

[MCPC](https://github.com/apify/mcp-cli) is a command-line client for MCP that connects your terminal and AI agents to any MCP server - including Apify's.

Together, they let you add Apify's scraping and automation tools to any AI coding assistant with a single command.

## Prerequisites

- An [Apify account](https://console.apify.com/sign-up) with an [API token](https://console.apify.com/account#/integrations)
- [Node.js](https://nodejs.org/) version 20.6 or later
- An AI coding assistant that supports MCP (Claude Code, Cursor, VS Code with Copilot, Codex, Gemini CLI)

## Install Agent Skills

Agent Skills are pre-built skill files that AI coding assistants automatically discover and use for context. Install them in your project directory:

```bash
npx skills add apify/agent-skills
```

This adds skill definitions to your project. No additional configuration is needed - your AI assistant picks them up automatically.

### Available skills

The [apify/agent-skills](https://github.com/apify/agent-skills) repository contains official Apify skills. The community-maintained [apify/awesome-skills](https://github.com/apify/awesome-skills) repository contains additional skills contributed by the community.

:::note Skills consolidation
The Apify team is consolidating the official Agent Skills repository into two core skills. Check the [repository](https://github.com/apify/agent-skills) for the latest available skills.
:::

### How skills work

Each skill is a Markdown file (`SKILL.md`) that describes a capability and its tools. When an AI coding assistant opens your project, it reads these files and gains the ability to:

- Search and run Actors from [Apify Store](https://apify.com/store)
- Extract data from websites, social media, and e-commerce platforms
- Export results as JSON, CSV, or display them in chat

Skills use [MCPC](#install-mcpc) under the hood to communicate with MCP servers and execute Apify Actor calls.

## Install MCPC

MCPC is the command-line bridge between AI agents and MCP servers. Install it globally:

```bash
npm install -g @apify/mcpc
```

### Connect to the Apify MCP server

Authenticate and create a session:

```bash
# Log in with OAuth (opens browser)
mcpc login mcp.apify.com

# Create a named session
mcpc connect mcp.apify.com @apify
```

You can also authenticate with a bearer token:

```bash
mcpc connect https://mcp.apify.com @apify \
  --header "Authorization: Bearer YOUR_APIFY_TOKEN"
```

### Explore available tools

```bash
# List all tools in your session
mcpc @apify tools-list

# Get details about a specific tool
mcpc @apify tools-get search-actors

# Call a tool
mcpc @apify tools-call search-actors keywords:="website crawler"
```

### Use the interactive shell

The interactive shell lets you explore tools and test calls:

```bash
mcpc @apify shell
```

### JSON mode for scripting

Add `--json` to any command for machine-readable output. This is useful for piping results into scripts or other tools:

```bash
mcpc @apify tools-list --json
mcpc @apify tools-call search-actors keywords:="web scraper" --json
```

## Configure AI coding assistants

Set up Agent Skills and MCPC with your preferred AI coding assistant.

<Tabs groupId="coding-assistant">
<TabItem value="claude-code" label="Claude Code">

1. Install Agent Skills in your project:

    ```bash
    npx skills add apify/agent-skills
    ```

1. Add the Apify MCP server:

    ```bash
    claude mcp add apify "https://mcp.apify.com" -t http
    ```

1. Start using skills by asking your assistant to scrape data, extract information, or run Actors.

</TabItem>
<TabItem value="cursor" label="Cursor">

1. Install Agent Skills in your project:

    ```bash
    npx skills add apify/agent-skills
    ```

1. Create or open `.cursor/mcp.json` and add:

    ```json
    {
      "mcpServers": {
        "apify": {
          "url": "https://mcp.apify.com"
        }
      }
    }
    ```

1. Restart Cursor to load the new MCP configuration.

</TabItem>
<TabItem value="vscode" label="VS Code">

1. Install Agent Skills in your project:

    ```bash
    npx skills add apify/agent-skills
    ```

1. Install an MCP-compatible extension (GitHub Copilot, Cline, or Roo Code).
1. Open the extension's MCP configuration and add:

    ```json
    {
      "mcpServers": {
        "apify": {
          "url": "https://mcp.apify.com"
        }
      }
    }
    ```

</TabItem>
<TabItem value="other" label="Other tools">

For Codex, Gemini CLI, and other tools:

1. Install Agent Skills in your project:

    ```bash
    npx skills add apify/agent-skills
    ```

1. Reference skill files directly. Most AI tools automatically discover `AGENTS.md` or `SKILL.md` files in your project directory.

1. If your tool supports MCP, configure it to connect to `https://mcp.apify.com`.

</TabItem>
</Tabs>

## MCPC features

### Session management

MCPC maintains persistent sessions that survive across commands:

```bash
# List active sessions
mcpc

# Create a session
mcpc connect mcp.apify.com @apify

# Restart a session
mcpc restart @apify

# Close a session
mcpc close @apify
```

### OAuth authentication

MCPC stores credentials securely in your OS keychain:

```bash
# Log in (opens browser for OAuth flow)
mcpc login mcp.apify.com

# Create a named profile for multiple accounts
mcpc login mcp.apify.com --profile work

# Use a specific profile
mcpc connect mcp.apify.com @session --profile work

# Log out
mcpc logout mcp.apify.com
```

### MCP proxy

Expose authenticated sessions as local proxy servers to sandbox AI agents without revealing credentials:

```bash
# Start a proxy on port 8080
mcpc connect mcp.apify.com @relay --proxy 8080

# Connect through the proxy
mcpc connect localhost:8080 @sandboxed
```

### Argument syntax

Pass arguments to tool calls using `key:=value` syntax:

| Input | Parsed type |
|-------|------------|
| `count:=10` | Number |
| `enabled:=true` | Boolean |
| `greeting:=hello` | String |

You can also pass inline JSON or pipe from stdin:

```bash
# Inline JSON
mcpc @apify tools-call search-actors '{"keywords":"web scraper"}'

# Pipe from stdin
echo '{"keywords":"web scraper"}' | mcpc @apify tools-call search-actors
```

## Resources

- [Agent Skills repository](https://github.com/apify/agent-skills) - Official Apify skills
- [Awesome Skills repository](https://github.com/apify/awesome-skills) - Community-contributed skills
- [MCPC repository](https://github.com/apify/mcp-cli) - MCPC source code and documentation
- [Read the MCPC introduction](https://blog.apify.com/introducing-mcpc-universal-mcp-cli-client/) - Blog post with detailed walkthrough
- [Apify MCP server](/integrations/mcp) - Full MCP server documentation
- [Build Actors with AI](/actors/development/quick-start/build-with-ai) - Guide to AI-assisted Actor development
