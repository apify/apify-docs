---
title: Agentic Payments with Skyfire
sidebar_label: Skyfire
description: Learn how to use agentic payments with to enable AI agents to autonomously run Apify Actors.
sidebar_position: 18
slug: /integrations/skyfire
---

Agentic payments enable AI agents to autonomously run Apify Actors using third-party payment providers, without requiring traditional Apify user accounts. This allows agents to discover, execute, and pay for web scraping and automation tasks independently.

Currently, Apify supports agentic payments through **Skyfire**, a payment network specifically designed for AI agents.

:::info Experimental Feature

Please keep in mind that agentic payments are an experimental feature and may undergo significant changes considering the rapid evolution of payment protocols and AI technologies.

:::

## What is Skyfire?

[Skyfire](https://skyfire.xyz/) is a payment network built specifically for AI agents, enabling autonomous transactions with digital wallets and spending controls. It provides the infrastructure necessary for agents to make payments on behalf of users, allowing truly autonomous AI-driven workflows.

With Skyfire integration, agents can discover available Apify Actors, execute scraping and automation tasks, and pay for services using pre-funded Skyfire tokens, all without human intervention.

## Using Skyfire with Apify MCP Server

The [Apify MCP server](https://docs.apify.com/platform/integrations/mcp) provides the simplest way for agents to access Apify's Actor library using Skyfire payments.

### Prerequisites

Before using agentic payments through MCP, you need:

1. **A Skyfire account** with a funded wallet - [sign up at Skyfire](https://app.skyfire.xyz/)
2. **An MCP client** that supports multiple server connections, such as [OpenCode](https://opencode.ai/), Claude Desktop with MCP support, or other compatible clients
3. **Both MCP servers configured**: Skyfire's MCP server and Apify's MCP server

### Configuration

Configure your MCP client to connect to both the Skyfire and Apify MCP servers. When connecting to the Apify MCP server for agentic payments, you must include the `?payment=skyfire` query parameter in the server URL. This enables the agentic payment flow and informs the agent about payment requirements.

#### OpenCode Configuration Example

If you're using [OpenCode](https://opencode.ai/), add this configuration to your `opencode.json` file (see [OpenCode configuration docs](https://opencode.ai/docs/config/) for file location on your system):

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "skyfire": {
      "enabled": true,
      "type": "remote",
      "url": "https://mcp.skyfire.xyz/mcp",
      "headers": {
        "skyfire-api-key": "YOUR_SKYFIRE_API_KEY"
      }
    },
    "apify": {
      "enabled": true,
      "type": "remote",
      "url": "https://mcp.apify.com?payment=skyfire"
    }
  }
}
```

Replace `YOUR_SKYFIRE_API_KEY` with your actual Skyfire buyer API key, which you can obtain from your [Skyfire dashboard](https://app.skyfire.xyz/).

### How It Works

When an agent uses the Apify MCP server with Skyfire payments, the workflow proceeds as follows. The agent searches for suitable Actors using the search tools or works with pre-loaded Actors. When attempting to run an Actor, the agent recognizes the need for a Skyfire PAY token with a minimum of five dollars. The agent automatically calls the Skyfire MCP server to create a payment token with sufficient funds.

The agent then calls the Actor tool with the payment token. The Apify platform validates the token and starts the Actor run. When the run completes, Apify's billing system charges the Skyfire PAY token for the actual usage cost. Any unused funds remain available in the token for future runs or are returned to your Skyfire wallet when the token expires. This means you won't lose money if the actual usage is less than the five dollar minimum.

Finally, the agent receives the Actor results and can retrieve additional data if needed.

### Pre-loading Actors

For more predictable workflows, you can pre-load specific Actors when connecting to the MCP server by adding them to the URL:

```text
https://mcp.apify.com?payment=skyfire&actors=actor1,actor2,actor3
```

Replace `actor1,actor2,actor3` with the actual Actor IDs you want to make available, such as `junglee/free-amazon-product-scraper,streamers/youtube-scraper`.

### Actor Discovery

When not pre-loading Actors, agents can discover suitable Actors dynamically using the search tools. The search automatically filters results to show only Actors that support agentic payments.

## Using Skyfire with Apify API

For direct API integration, you can use Skyfire PAY tokens to authenticate and pay for Actor runs.

### Authentication

Instead of using a traditional Apify API token, pass your Skyfire PAY token in the request header:

```text
skyfire-pay-id: YOUR_SKYFIRE_PAY_TOKEN
```

### Running an Actor

Make a standard Actor run request to the [run Actor endpoint](https://docs.apify.com/api/v2#/reference/actors/run-collection/run-actor), but include the Skyfire PAY token in the header. Here's an example using the synchronous run endpoint:

```bash
curl -X POST \
  'https://api.apify.com/v2/acts/ACTOR_ID/run-sync' \
  -H 'skyfire-pay-id: YOUR_SKYFIRE_PAY_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "input": {
      "your": "input"
    }
  }'
```

You can also use the asynchronous [run Actor endpoint](https://docs.apify.com/api/v2#/reference/actors/run-collection/run-actor) if you don't need to wait for results immediately.

### Retrieving Results

After your Actor run completes, you can retrieve results using the [dataset endpoints](https://docs.apify.com/api/v2#/reference/datasets) or [key-value store endpoints](https://docs.apify.com/api/v2#/reference/key-value-stores). Include the same `skyfire-pay-id` header to authenticate these requests.

## Limitations

### Supported Actors

Not all Actors in the Apify Store can be run using agentic payments.

Apify maintains a curated list of Actors approved for agentic payments. To check if an Actor supports agentic payments, use the `allowsAgenticUsers=true` query parameter when [searching the store via API](https://docs.apify.com/api/v2#/reference/store/store-actors-collection/get-list-of-actors-in-store).

### Payment Requirements

Your Skyfire PAY token must have at least **$5** available to run Actors. However, you'll only be charged for actual usage. If an Actor run costs less than five dollars, the unused funds remain available in your token for future runs or return to your Skyfire wallet when the token expires.

### Unsupported Features

The following operations are not supported with agentic payments:

- Schedule creation or management
- Standby run initiation
- Integration setup such as webhooks to external services
- Actor resurrection after the payment token has been settled

## Resources

- **[Model Context Protocol Documentation](https://docs.apify.com/platform/integrations/mcp)** - Complete guide to using the Apify MCP server
- **[Skyfire Documentation](https://skyfire.xyz/)** - Official Skyfire guides and API reference
- **[Apify API Reference](https://docs.apify.com/api/v2)** - Complete API documentation for direct integration
- **[Actor Permissions](https://docs.apify.com/platform/actors/development/permissions)** - Understanding Actor permission levels
