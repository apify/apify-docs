---
title: 🔺 Vercel AI SDK integration
sidebar_label: Vercel AI SDK
description: Learn how to integrate Apify Actors as tools for AI with Vercel AI SDK 🔺.
sidebar_position: 2
slug: /integrations/vercel-ai-sdk
---

**Learn how to integrate Apify Actors as tools for AI with Vercel AI SDK.**

---

## What is the Vercel AI SDK

[Vercel AI SDK](https://ai-sdk.dev/) is the TypeScript toolkit designed to help developers build AI-powered applications and agents with React, Next.js, Vue, Svelte, Node.js, and more.

:::note Explore Vercel AI SDK

For more in-depth details, check out [Vercel AI SDK documentation](https://ai-sdk.dev/docs/introduction).

:::

## How to use Apify with Vercel AI SDK

Apify is a marketplace of ready-to-use web scraping and automation tools, AI agents, and MCP servers that you can equip your own AI with. This guide demonstrates how to use Apify tools with a simple AI agent built with Vercel AI SDK.


### Prerequisites

- _Apify API token_: To use Apify Actors in Vercel AI SDK, you need an Apify API token. To obtain your token check [Apify documentation](https://docs.apify.com/platform/integrations/api).
- _Node.js packages_: Install the following Node.js packages:

    ```bash
    npm install @modelcontextprotocol/sdk @openrouter/ai-sdk-provider ai
    ```

### Building a simple pub search AI agent using Apify Google Maps scraper

First, import all required packages:

```typescript
import { experimental_createMCPClient as createMCPClient, generateText, stepCountIs } from 'ai';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
```

Connect to the Apify MCP server and get all available tools for the AI agent:

:::warning Required setup

Make sure to set the `APIFY_TOKEN` environment variable with your Apify API token before running the code.

:::

```typescript
// Connect to the Apify MCP server and get the available tools
const url = new URL('https://mcp.apify.com');
const mcpClient = await createMCPClient({
  transport: new StreamableHTTPClientTransport(url, {
      requestInit: {
        headers: {
            "Authorization": `Bearer ${process.env.APIFY_TOKEN}`
        }
      }
  }),
});
const tools = await mcpClient.tools();
console.log('Tools available:', Object.keys(tools).join(', '));
```

Create Apify OpenRouter LLM provider so we can run the AI agent:

:::tip Single token

By using the [Apify OpenRouter](https://apify.com/apify/openrouter) you don't need to provide a separate API key for OpenRouter or any other LLM provider. Only your Apify token is needed. All token costs go to your Apify account.

:::

```typescript
// Configure the Apify OpenRouter LLM provider
const openrouter = createOpenRouter({
    baseURL: 'https://openrouter.apify.actor/api/v1',
    apiKey: 'api-key-not-required',
    headers: {
        "Authorization": `Bearer ${process.env.APIFY_TOKEN}`
    }
});
```

Run the AI agent with the Apify Google Maps scraper tool to find a pub near the Ferry Building in San Francisco:

```typescript
// Run the AI agent and generate a response
const response = await generateText({
    model: openrouter('x-ai/grok-4-fast'),
    tools,
    stopWhen: stepCountIs(5),
    messages: [
        {
            role: 'user',
            content: [{ type: 'text', text: 'Find a pub near the Ferry Building in San Francisco using the Google Maps scraper.' }],
        },
    ],
});
console.log('Response:', response.text);
console.log('\nDone!');
await mcpClient.close();
```

## Resources

- [Apify Actors](https://docs.apify.com/platform/actors)
- [Vercel AI SDK documentation](https://ai-sdk.dev/docs/introduction)
- [What are AI agents?](https://blog.apify.com/what-are-ai-agents/)
- [Apify MCP Server](https://mcp.apify.com)
- [Apify MCP Server documentation](https://docs.apify.com/platform/integrations/mcp)
- [Apify OpenRouter proxy](https://apify.com/apify/openrouter)
