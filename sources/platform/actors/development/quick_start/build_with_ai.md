---
title: Build with AI
sidebar_position: 3
description: Learn how to set up your environment, choose the right tools, and establish workflows for effective vibe coding
slug: /actors/development/quick-start/build-with-ai
toc_max_heading_level: 4
---

**Set up your environment, choose tools, and build workflows for effective AI development.**

---

import { AGENTS_PROMPT } from "@site/src/utils/agents-prompt";
import PromptButton from "@site/src/components/PromptButton";

This guide shows you how to build Actors efficiently with AI coding assistants. You'll learn how to use pre-built instructions, integrate Apify documentation into your AI editor, and apply best practices for AI-assisted development.

## AI coding assistant instructions

Use the following prompt in your favorite AI coding assistant:

<PromptButton prompt={AGENTS_PROMPT} title="Use pre-built prompt for your AI coding assistant" />

### Quick Start

- _Step 1_: Create directory: `mkdir my-new-actor`
- _Step 2_: Open the directory in _Cursor_, _VS Code_, etc.
- _Step 3_: Copy the prompt above and paste it into your AI coding assistant (Agent or Chat)
- _Step 4_: Run it, and develop your first actor with the help of AI 🎉

:::info Start in an AI coding assistant

To maximize efficiency, copy the prompt to Cursor, VS Code with GitHub Copilot, or another AI coding assistant. The AI will follow the guide step-by-step, and you'll avoid copy-pasting from tools like ChatGPT or Claude.

:::

## `llms.txt` and `llms-full.txt`

Search engines weren't built for Large Language Models (LLMs), but they needs context. That's why we've created [`llms.txt`](https://docs.apify.com/llms.txt) and [`llms-full.txt`](https://docs.apify.com/llms-full.txt) for our documentation. These files follow the [growing standard](https://llmstxt.org/) for LLMs consumption.

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

<!-- TODO: Consider to remove it to keep it simple... -->

### Use llms.txt and llms-full.txt

LLMs don't automatically discover `llms.txt` files, you need to add the link manually. Some tools like [Cursor](https://www.cursor.com/) provide settings for this.

#### Cursor

Go to: **Settings -> Cursor Settings -> Indexing & Docs -> Add Doc**.

Now, you can just provide the link to Apify `llms-full.txt`:

```markdown
https://docs.apify.com/llms-full.txt
```

![Add llms-full.txt to Cursor](./images/cursor.png)

#### Windsurf

Open Windsurf Cascade, and add context via `@web`:

![Add llms-full.txt to Windsurf](./images/windsurf.png)

:::note Windsurf @docs

Windsurf provides the `@docs` command, but you cannot customize it. It means that you cannot add your own documentation.

:::

#### GitHub Copilot

Open Copilot Chat mode, and add context via `#fetch`:

![Add llms.txt to Copilot](./images/github-copilot.png)

:::note GitHub Copilot and documentation

Similar to Windsurf, GitHub Copilot does not provide an option for adding your own documentation.

:::

#### Ask AI

New to Apify? Ask questions and provide the `llms.txt` link. Popular AI models can search the web. With the right context, you get better answers:

![Ask about Apify](./images/claude.png)

## Use Actor Templates with instructions

TODO:

- Just mention that you can init actor using `apify create` and use it in IDE with AGENTS.md

## Provide context to assistants

TBD:

- Mention "Copy for LLM" buttons

## Best practices

- _Small tasks_: Don't ask AI for many tasks at once. Break complex problems into smaller pieces. Solve them step by step.

- _Iterative approach_: Work iteratively with clear steps. Start with a basic implementation and gradually add complexity.

- _Versioning_: Version your changes often using git. This lets you track changes, roll back if needed, and maintain a clear history.

- _Security_: Don't expose API keys, secrets, or sensitive information in your code or conversations with LLM assistants.
