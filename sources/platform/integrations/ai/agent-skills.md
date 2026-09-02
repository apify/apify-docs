---
title: Agent Skills and MCPC
sidebar_label: Agent Skills and MCPC
description: Use Apify Agent Skills with MCP CLI (mcpc) to give AI coding agents web scraping, data extraction, and automation capabilities through any MCP-compatible tool.
sidebar_position: 1.5
slug: /integrations/agent-skills
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Apify Agent Skills](https://github.com/apify/agent-skills) give AI agents pre-built capabilities for web scraping, data extraction, and building Apify Actors. Skills work with Claude Code, Cursor, Codex, Gemini CLI, and other coding agents that support [Model Context Protocol (MCP)](https://modelcontextprotocol.io/).

[MCPC](https://github.com/apify/mcp-cli) is a universal command-line client for MCP that connects your AI agents to any MCP server - including Apify's. This CLI utility reduces token usage and context size when working with MCP servers.

Together, they let you add Apify's scraping and automation tools to any AI agent with a single command.

## Prerequisites

- An [Apify account](https://console.apify.com/sign-up) with an [API token](https://console.apify.com/account#/integrations)
- [Node.js](https://nodejs.org/) version 20.6 or later
- An AI coding agent that supports MCP (Claude Code, Cursor, VS Code with Copilot, Codex, Gemini CLI, etc.)

## Install Agent Skills

Agent Skills are pre-built skill files that AI coding assistants automatically discover and use for context. Install them in your project directory:

```bash
npx skills add apify/agent-skills
```

This adds skill definitions to your project. No additional configuration is needed - your AI assistant picks them up automatically.

### Available skills

The [apify/agent-skills](https://github.com/apify/agent-skills) repository contains official Apify skills. The community-maintained [apify/awesome-skills](https://github.com/apify/awesome-skills) repository contains additional skills.

### Skill mechanics

Each skill is a Markdown file (`SKILL.md`) that describes a domain-specific capability and tools the agent should use to execute the desired task. Skills can be invoked directly by `/slash-commands` and agents can also load them dynamically based on your prompt. Apify Agent Skills give AI coding assistants the ability to:

- Search and run Actors from [Apify Store](https://apify.com/store)
- Extract data from websites, social media, and e-commerce platforms
- [Develop, test, and publish Actors](/platform/actors/development/quick-start/build-with-ai) in Apify Store

Skills include bundled scripts that communicate with the Apify API to execute Actor calls. They use your `APIFY_TOKEN` from the [`.env` file](#set-up-your-api-token).

## Set up your API token

Agent Skills need your Apify API token to run Actors. Create a `.env` file in your project root:

```bash
APIFY_TOKEN=your_api_token
```

Get your token from the [Integrations](https://console.apify.com/account/integrations) section in Apify Console.

:::caution Keep your token private
Don't commit the `.env` file to version control. Add it to your `.gitignore` file.
:::

## Install MCPC

[MCP CLI (mcpc)](https://blog.apify.com/introducing-mcpc-universal-mcp-cli-client/) is the command-line bridge between AI agents and MCP servers. Install it globally:

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

After [installing Agent Skills](#install-agent-skills) and setting up your [API token](#set-up-your-api-token), configure your AI coding assistant to use them.

<Tabs groupId="coding-assistant">
<TabItem value="claude-code" label="Claude Code">

Add skills from the plugin marketplace:

```bash
# Add the marketplace
/plugin marketplace add https://github.com/apify/agent-skills

# Install a skill
/plugin install apify-ultimate-scraper@apify-agent-skills
```

Ask your assistant to scrape data, extract information, or run Actors.

</TabItem>
<TabItem value="cursor" label="Cursor">

Cursor automatically discovers skill files (`SKILL.md`) in your project directory after running `npx skills add apify/agent-skills`. No additional configuration is needed.

</TabItem>
<TabItem value="vscode" label="VS Code">

VS Code with an AI extension (GitHub Copilot, Cline, or Roo Code) automatically discovers skill files in your project directory after running `npx skills add apify/agent-skills`. No additional configuration is needed.

</TabItem>
<TabItem value="other" label="Other tools">

For Codex, Gemini CLI, and other tools:

1. Run `npx skills add apify/agent-skills` to add skill files to your project.
1. Most AI tools automatically discover `AGENTS.md` or `SKILL.md` files in your project directory.

</TabItem>
</Tabs>

:::tip Connect the Apify MCP server for extra capabilities
For additional MCP-based tools like documentation search, you can optionally connect the [Apify MCP server](/platform/integrations/mcp). This is not required for Agent Skills to work.
:::

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
| ----- | ---------- |
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
- [Apify MCP server](/platform/integrations/mcp) - Full MCP server documentation
- [Build Actors with AI](/platform/actors/development/quick-start/build-with-ai) - Guide to AI-assisted Actor development
