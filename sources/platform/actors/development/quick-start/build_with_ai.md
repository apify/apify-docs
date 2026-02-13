---
title: Build Actors with AI
sidebar_position: 3
sidebar_label: Build with AI
description: Learn how to build new Actors or improve existing ones using AI code generation and vibe coding tools.
slug: /actors/development/quick-start/build-with-ai
toc_max_heading_level: 4
---

import { AGENTS_PROMPT } from "@site/src/utils/agents-prompt";
import PromptButton from "@site/src/components/PromptButton";
import copyForAI from "./images/copy-for-ai.png";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides best practices for building new Actors or improving existing ones using AI code generation and vibe coding tools such as Antigravity, Cursor, Claude Code, or Visual Studio Code, by providing the AI agents with the right instructions and context.

## AI coding assistant instructions

Use the following prompt in your AI coding assistant such as [Antigravity](https://antigravity.google/), [Cursor](https://cursor.com/), [Claude Code](https://claude.com/product/claude-code) or [GitHub Copilot](https://github.com/features/copilot):

<PromptButton prompt={AGENTS_PROMPT} title="Use pre-built prompt for your AI coding assistant" />

The prompt guides AI coding assistants such as Antigravity, Cursor, Claude Code or GitHub Copilot to help users create and deploy an Apify Actor step by step. It walks through setting up the Actor structure, configuring all required files, installing dependencies, running it locally, logging in, and pushing it to the Apify platform and following Apify’s best practices.

### Quick Start

1. Create directory: `mkdir my-new-actor`
1. Open the directory in _Antigravity_, _Cursor_, _Claude Code_, _VS Code with GitHub Copilot_, etc.
1. Copy the prompt above and paste it into your AI coding assistant (Agent or Chat)
1. Run it, and develop your first actor with the help of AI

:::info Avoid copy-pasting

The AI will follow the guide step-by-step, and you'll avoid copy-pasting from tools like ChatGPT or Claude.

:::

## Use Actor templates with AGENTS.md

All [Actor Templates](https://apify.com/templates) have AGENTS.md that will help you with AI coding. You can use the [Apify CLI](/cli/docs) to create Actors from Actor Templates.

```bash
apify create
```

If you do not have Apify CLI installed, see the [installation guide](/cli/docs/installation).

The command above will guide you through Apify Actor initialization, where you select an Actor Template that works for you. The result is an initialized Actor (with AGENTS.md) ready for development.

## Use Apify MCP Server

The Apify MCP Server has tools to search and fetch documentation. If you set it up in your AI editor, it will help you improve the generated code by providing additional context to the AI.

:::info Use Apify MCP server configuration

We have prepared the [Apify MCP server configuration](https://mcp.apify.com/), which you can configure for your needs.

:::

<Tabs>
<TabItem value="cursor" label="Cursor">

To add Apify MCP server to Cursor manually:

1. Create or open the `.cursor/mcp.json` file.
1. Add the following to the configuration file:

    ```json
    {
      "mcpServers": {
        "apify": {
          "url": "https://mcp.apify.com/?tools=docs"
        }
      }
    }
    ```

</TabItem>
<TabItem value="vscode" label="VS Code">

VS Code supports MCP through MCP-compatible extensions like _GitHub Copilot_, _Cline_, or _Roo Code_.

1. Install an MCP-compatible extension (e.g., GitHub Copilot, Cline).
1. Locate the extension's MCP settings or configuration file (often `mcp.json`).
   - For _GitHub Copilot_: Run the **MCP: Open User Configuration** command.
   - For _MCP-compatible extension_: Go to the MCP Servers tab in the extension interface.
1. Add the Apify server configuration:

    ```json
    {
      "mcpServers": {
        "apify": {
          "url": "https://mcp.apify.com/?tools=docs"
        }
      }
    }
    ```

</TabItem>
<TabItem value="claude" label="Claude">

1. Go to **Settings** > **Connectors** in Claude.
1. Click **Add custom connector**.
1. Set the name to `Apify` and the URL to `https://mcp.apify.com/?tools=docs`.
1. When chatting, select the **+** button and choose the **Apify** connector to add documentation context.

</TabItem>
<TabItem value="antigravity" label="Antigravity">

To add Apify MCP server to Antigravity:

1. Click on the **Chat tab**.
2. Click the three dots (**Additional options**) menu.
3. Select **Manage MCP Servers**.
4. Click **View raw config** to open the configuration file.
5. Add the following to the configuration file:

    ```json
    {
      "mcpServers": {
        "apify": {
          "command": "npx",
          "args": [
            "-y",
            "@apify/actors-mcp-server",
            "--tools",
            "docs"
          ]
        }
      }
    }
    ```

</TabItem>
</Tabs>

## Provide context to assistants

Every page in the Apify documentation has a **Copy for LLM** button. You can use it to add additional context to your AI assistant, or even open the page in ChatGPT, Claude, or Perplexity and ask additional questions.

<img src={copyForAI} alt="Copy for LLM" width="250" />

## Use `/llms.txt` files

The entire Apify documentation is available in Markdown format for use with LLMs and AI coding tools. Two consolidated files are available:

- `https://docs.apify.com/llms.txt`: A Markdown file with an index of all documentation pages in Markdown format, based on the [llmstxt.org](https://llmstxt.org/) standard.
- `https://docs.apify.com/llms-full.txt`: All Apify documentation consolidated in a single Markdown file.

:::tip Access Markdown source

Add `.md` to any documentation page URL to view its Markdown source.

Example: `https://docs.apify.com/platform/actors` > `https://docs.apify.com/platform/actors.md`

:::

:::note Provide link to AI assistants

LLMs don't automatically discover `llms.txt` files, you need to add the link manually to improve the quality of answers.

:::

## Best practices

- _Small tasks_: Don't ask AI for many tasks at once. Break complex problems into smaller pieces. Solve them step by step.

- _Iterative approach_: Work iteratively with clear steps. Start with a basic implementation and gradually add complexity.

- _Versioning_: Version your changes often using git. This lets you track changes, roll back if needed, and maintain a clear history.

- _Security_: Don't expose API keys, secrets, or sensitive information in your code or conversations with LLM assistants.
