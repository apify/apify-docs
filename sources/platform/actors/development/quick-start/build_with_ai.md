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

This guide provides best practices for building new Actors or improving existing ones using AI code generation tools by providing the AI agents with the right instructions and context.

The methods on this page are complementary. Start with the [AI coding assistant instructions](#ai-coding-assistant-instructions) or [Actor templates with AGENTS.md](#use-actor-templates-with-agentsmd) to get going, then add [Agent Skills](#use-agent-skills) and the [Apify MCP server](#use-apify-mcp-server) to give your assistant more context and better results.

## Quick start

<Tabs>
<TabItem value="prompt" label="Start with a prompt">

1. Create a directory: `mkdir my-new-actor`.
1. Open the directory in _Cursor_, _Claude Code_, _VS Code with GitHub Copilot_, etc.
1. Copy the [AI coding assistant prompt](#ai-coding-assistant-instructions) and paste it into your AI coding assistant.
1. Run it, and develop your first Actor with the help of AI.

</TabItem>
<TabItem value="template" label="Start with a template">

1. [Install the Apify CLI](/cli/docs/installation) if you haven't already.
1. Run `apify create` to initialize an Actor from a [template](https://apify.com/templates) (includes AGENTS.md).
1. Open the project in _Cursor_, _Claude Code_, _VS Code with GitHub Copilot_, etc.
1. Start developing - your AI coding assistant automatically picks up context from AGENTS.md.

</TabItem>
</Tabs>

## AI coding assistant instructions

Use the following prompt in your AI coding assistant such as [Cursor](https://cursor.com/), [Claude Code](https://claude.com/product/claude-code), or [GitHub Copilot](https://github.com/features/copilot):

<PromptButton prompt={AGENTS_PROMPT} title="Use pre-built prompt for your AI coding assistant" />

The prompt guides your AI coding assistant to create and deploy an Apify Actor step by step. It walks through setting up the Actor structure, configuring all required files, installing dependencies, running it locally, logging in, and pushing it to the Apify platform.

## Use Actor templates with AGENTS.md

All [Actor Templates](https://apify.com/templates) have AGENTS.md that will help you with AI coding. You can use the [Apify CLI](/cli/docs) to create Actors from Actor Templates.

```bash
apify create
```

If you do not have Apify CLI installed, see the [installation guide](/cli/docs/installation).

The command above will guide you through Apify Actor initialization, where you select an Actor Template that works for you. The result is an initialized Actor (with AGENTS.md) ready for development.

## Use Agent Skills

[Agent Skills](https://github.com/apify/agent-skills) are official Apify skills for Actor development, web scraping, data extraction, automation, etc. They work with Claude Code, Cursor, Codex, Gemini CLI, and other AI coding assistants.

Install Agent Skills in your project directory:

```bash
npx skills add apify/agent-skills
```

This adds skill files to your project that AI coding assistants automatically discover and use for context. No additional configuration is needed.

## Use Apify MCP server

The Apify MCP server has tools to search and fetch documentation. If you set it up in your AI editor, it will help you improve the generated code by providing additional context to the AI.

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
   - For _Cline_ or _Roo Code_: Go to the **MCP Servers** tab in the extension interface.
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
<TabItem value="claude-code" label="Claude Code">

Run the following command to add the Apify MCP server:

```bash
claude mcp add apify "https://mcp.apify.com/?tools=docs" -t http
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
