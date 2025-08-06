---
title: Vibe coding
sidebar_position: 3
description: Learn how to set up your environment, choose the right tools, and establish workflows for effective vibe coding
slug: /actors/development/quick-start/vibe-coding
toc_max_heading_level: 4
---

**Set up your environment, choose tools, and build workflows for effective vibe coding.**

---

import { RULES_AND_INSTRUCTIONS_PROMPT } from "@site/src/utils/ai-prompts";
import PromptButton from "@site/src/components/PromptButton";

This guide explains how to enhance your development workflow by leveraging `llms.txt` and `llms-full.txt` with an AI assistant. You will learn how to provide foundational context and further refine AI's behavior with specific rules and instruction files.

## `llms.txt` and `llms-full.txt`

Search engines weren't built for Large Language Models (LLMs), but they needs context. That's why we've created `[llms.txt](https://docs.apify.com/llms.txt)` and `[llms-full.txt](https://docs.apify.com/llms-full.txt)` for our documentation. These files follow the [growing standard](https://llmstxt.org/) for LLMs consumption.

:::info LLMs.txt vs sitemap.xml vs robots.txt

`/sitemap.xml` lists pages but doesn't help with content. LLMs systems still need to parse complex HTML and handle extra info. This clutters the context window.

`/robots.txt` tells crawlers where to go. It doesn't help with content understanding.

`/llms.txt` solves LLMs problems. It overcomes context window limits. It removes markup and scripts. It presents content optimized for LLMs processing.

:::

### Use llms.txt and llms-full.txt

LLMs don't automatically discover llms.txt files, you need to add the link manually. Some tools like [Cursor](https://www.cursor.com/) provide settings for this.

#### Cursor

Go to: `Settings -> Cursor Settings -> Indexing & Docs -> Add Doc`.

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

### Add rules

To get the most from AI IDEs, add rules or instructions.

See how to set up rules for your AI IDEs:

- [Cursor Rules](https://docs.cursor.com/en/context/rules)
- [Windsurf Rules](https://docs.windsurf.com/windsurf/cascade/memories#rules)
- [GitHub Copilot instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)

#### Apify rules and instructions

The best rules and instructions are specific for individual use cases, but we provide a prompt to help you get start with creating rules and instructions:

<PromptButton prompt={RULES_AND_INSTRUCTIONS_PROMPT}/>

#### Keep your rules and instructions up to date

As the project evolves, you might introduce new things. Always make sure that your rules are up to date.

### Best practices

- **Small tasks**: Don't ask AI for many tasks at once. Break complex problems into smaller pieces. Solve them step by step.

- **Iterative approach**: Work iteratively with clear steps. Start with a basic implementation and gradually add complexity.

- **Versioning**: Version your changes often using git. This lets you track changes, roll back if needed, and maintain a clear history.

- **Security**: Don't expose API keys, secrets, or sensitive information in your code or conversations with LLM assistants.
