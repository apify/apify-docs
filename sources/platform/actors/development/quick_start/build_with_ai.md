---
title: Build with AI
sidebar_position: 3
description: Use pre-built prompts, refer to Apify docs via llms.txt, and follow best practices for effective vibe coding.
slug: /actors/development/quick-start/build-with-ai
toc_max_heading_level: 4
---

**Use pre-built prompts, reference Apify docs via llms.txt, and follow best practices to build Actors efficiently with AI coding assistants.**

---

import { AGENTS_PROMPT } from "@site/src/utils/agents-prompt";
import PromptButton from "@site/src/components/PromptButton";
import InstallMCPButton from "@site/src/components/InstallMCPButton";
import copyForAI from "./images/copy-for-ai.png";

You will learn several approaches to building Apify Actors with the help of AI coding assistants. This guide includes independent instructions, tools, and best practices that you can use individually or combine together. Each section focuses on a specific part of the process such as prompt usage, Actor templates, Apify MCP server tools, or documentation integration, so you can follow only the parts that fit your development style.

## AI coding assistant instructions

Use the following prompt in your AI coding assistant such as [Cursor](https://www.cursor.com/), [Claude Code](https://www.claude.com/product/claude-code) or [GitHub Copilot](https://github.com/features/copilot):

<PromptButton prompt={AGENTS_PROMPT} title="Use pre-built prompt for your AI coding assistant" />

The prompt guides AI coding assistants such as Cursor, Claude Code or GitHub Copilot to help users create and deploy an Apify Actor step by step. It walks through setting up the Actor structure, configuring all required files, installing dependencies, running it locally, logging in, and pushing it to the Apify platform and following Apify’s best practices.

### Quick Start

1. Create directory: `mkdir my-new-actor`
1. Open the directory in _Cursor_, _Claude Code_, _VS Code with GitHub Copilot_, etc.
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

## Provide context to assistants

Every page in the Apify documentation has a **Copy for LLM** button. You can use it to add additional context to your AI assistant, or even open the page in ChatGPT, Claude, or Perplexity and ask additional questions.

<img src={copyForAI} alt="Copy for LLM" width="250" />

## Use `llms.txt` and `llms-full.txt`

Search engines weren't built for Large Language Models (LLMs), but LLMs need context. That's why we've created [`llms.txt`](https://docs.apify.com/llms.txt) and [`llms-full.txt`](https://docs.apify.com/llms-full.txt) for our documentation. These files can provide additional context if you link them.

<table>
  <thead>
    <tr>
      <th>File</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>llms.txt</code></td>
      <td>Contains index of the docs page in Markdown, with links to all subpages in Markdown.</td>
    </tr>
    <tr>
      <td>
        <code style={{ whiteSpace: 'nowrap' }}>llms-full.txt</code>
      </td>
      <td>Contains a full dump of documentation in Markdown.</td>
    </tr>
  </tbody>
</table>

:::note Provide link to AI assistants

LLMs don't automatically discover `llms.txt` files, you need to add the link manually to improve the quality of answers.

:::

## Best practices

- _Small tasks_: Don't ask AI for many tasks at once. Break complex problems into smaller pieces. Solve them step by step.

- _Iterative approach_: Work iteratively with clear steps. Start with a basic implementation and gradually add complexity.

- _Versioning_: Version your changes often using git. This lets you track changes, roll back if needed, and maintain a clear history.

- _Security_: Don't expose API keys, secrets, or sensitive information in your code or conversations with LLM assistants.
