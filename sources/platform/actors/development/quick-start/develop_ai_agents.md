---
title: Develop AI agents on Apify
description: Build, test, and deploy AI agents on the Apify platform using AI framework templates, sandboxes for code execution, OpenRouter for LLM access, and pay-per-event monetization.
sidebar_position: 4
sidebar_label: Develop AI agents
slug: /actors/development/quick-start/develop-ai-agents
---

The Apify platform provides everything you need to build, test, and deploy AI agents - from scaffolding to monetization. This page walks you through the full stack: start from a template, execute code in a sandbox, access LLMs through OpenRouter, monetize with pay-per-event pricing, and deploy to [Apify Store](https://apify.com/store).

:::tip Build Actors with AI coding assistants

Looking to use AI coding assistants (Claude Code, Cursor, GitHub Copilot) to help you _develop_ Actors? See [Build Actors with AI](/platform/actors/development/quick-start/build-with-ai).

:::

## Start from a template

The fastest way to start your AI agent is to use one of the AI framework templates. Each template comes pre-configured with the right file structure, dependencies, and Apify SDK integration.

Available AI framework templates include:

- **LangChain** - LLM pipelines with chain-of-thought and tool use
- **Mastra** - TypeScript-native AI agent framework
- **CrewAI** - multi-agent orchestration for complex tasks
- **LlamaIndex** - retrieval-augmented generation (RAG) workflows
- **PydanticAI** - Python agents with structured, validated outputs
- **Smolagents** - lightweight agents from Hugging Face
- **MCP** - expose your Actor as an MCP server

Initialize a template with the Apify CLI:

```bash
apify create my-agent
```

The command guides you through template selection. Browse all available templates at [apify.com/templates](https://apify.com/templates).

If you don't have the Apify CLI installed, see the [installation guide](/cli/docs/installation). <!-- served from apify-cli repo -->

## Use AI Sandbox for code execution

[AI Sandbox](https://apify.com/apify/ai-sandbox) is an isolated, containerized environment where your AI agent can execute code and system commands at runtime. Your agent Actor starts the sandbox and communicates with it through a REST API or MCP interface.

### Key capabilities

- **Code execution** - run JavaScript, TypeScript, Python, and bash via `POST /exec` with captured stdout/stderr and exit codes
- **Filesystem access** - read, write, list, and delete files through `/fs/{path}` endpoints
- **Dynamic reverse proxy** - start a web server inside the sandbox and expose it externally
- **Dependency installation** - install npm and pip packages at startup through Actor input
- **Idle timeout** - the sandbox automatically stops after a period of inactivity
- **MCP interface** - connect directly from Claude Code or other MCP clients for live debugging

### Example workflow

1. Your agent Actor starts AI Sandbox as a sub-Actor
1. The agent sends code to execute via the REST API (`POST /exec`)
1. AI Sandbox runs the code in isolation and returns results
1. The agent processes results and iterates

:::info Sandbox environment

AI Sandbox runs on a Debian image with Node.js 24 and Python 3 pre-installed. You can install additional dependencies through the Actor input configuration.

:::

## Access LLMs with OpenRouter

The [OpenRouter](https://apify.com/apify/openrouter) Actor provides access to 100+ LLM models (OpenAI, Anthropic, Google, Mistral, Meta, and more) through your Apify account. No separate API keys or billing setup required - all LLM costs are billed as platform usage on your Apify account.

OpenRouter exposes an OpenAI-compatible API, so you can use it with any SDK that supports the OpenAI API format.

### Connect to OpenRouter

Use the Apify OpenRouter proxy endpoint with your Apify token:

```javascript
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const openrouter = createOpenRouter({
    baseURL: 'https://openrouter.apify.actor/api/v1',
    apiKey: 'api-key-not-required',
    headers: {
        Authorization: `Bearer ${process.env.APIFY_TOKEN}`,
    },
});
```

The proxy supports chat completions, streaming, text embeddings, and image generation through vision-capable models.

:::caution Token usage tracking

If you plan to charge users per token with pay-per-event pricing, you need to extract token counts from OpenRouter responses. This workflow is still being finalized - check [OpenRouter Actor documentation](https://apify.com/apify/openrouter) for the latest guidance.

:::

## Monetize with pay-per-event pricing

[Pay-per-event (PPE)](/platform/actors/publishing/monetize/pay-per-event) pricing lets you charge users for specific actions your agent performs. Use `Actor.charge()` from the [JavaScript](/sdk/js/reference/class/Actor#charge) or [Python](/sdk/python/reference/class/Actor#charge) SDK to bill users for events like API calls, generated results, or token usage.

### PPE for AI agents

For AI agents that use OpenRouter, consider these pricing strategies:

- **Fixed pricing** - charge a flat fee per task or request, regardless of the underlying LLM costs
- **Usage-based pricing** - charge per token or per LLM call, passing costs through to users with a markup

Your profit is calculated as:

```text
profit = (0.8 × revenue) - platform costs
```

:::note Free-tier protection

If an Actor's net profit goes negative (for example, from free-tier users consuming LLM resources), the negative amount resets to $0 for aggregation purposes. Negative profit on one Actor doesn't affect earnings from your other Actors.

:::

For detailed pricing guidance, see the [pay-per-event documentation](/platform/actors/publishing/monetize/pay-per-event).

## Deploy to Apify

When your agent is ready, deploy it to the Apify platform:

```bash
apify push
```

This builds and deploys your Actor. Once deployed, you can:

- **Publish to Apify Store** - make your agent available to other users and start earning with PPE pricing. See the [publishing guide](/platform/actors/publishing).
- **Run via API** - trigger your agent programmatically through the [Apify API](/api/v2).
- **Set up schedules** - run your agent on a recurring schedule.

For more deployment options, see the [deployment documentation](/platform/actors/development/deployment).
