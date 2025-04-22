---
title: Apify MCP server
sidebar_label: Apify MCP server
description: Learn how to use the Apify MCP server to integrate Apify Actors into your AI agents or applications.
sidebar_position: 1
slug: /integrations/mcp
---

<!-- markdownlint-disable MD024 -->

The Apify Model Context Protocol (MCP) server allows AI agents and frameworks compatible with the MCP standard to connect with the extensive library of Actors available on the [Apify Store](https://apify.com/store).

## Why use MCP with Apify?

- _Access a vast tool library_: Provide AI agents access to thousands of pre-built Actors for web scraping, data extraction, and automation.
- _Dynamic tool discovery_: Unlike static OpenAPI definitions, MCP enables agents to dynamically find and add relevant Actors to their context during runtime. Agents can use MCP operations like `discover-actors` and `add-actor-to-tools`.
- _Scalability_: Efficiently manage access to a large and growing number of tools, which is challenging with single, static API definitions.
- _Flexible integration_: Connect to the MCP server using HTTP Server-Sent Events (SSE) or local standard input/output (stdin/stdout). Compatible clients include Claude Desktop, LibreChat, and [Apify’s Tester MCP Client](https://apify.com/jiri.spilka/tester-mcp-client).

## Common use cases

- Extract data from websites, such as social media posts, search engine results, or specific URLs.
- Summarize web content or identify trends.
- Run automated web workflows without direct user interaction.

## Prerequisites

Before you start, ensure you have the following:

1. _Apify account_: You need an active account on the Apify platform.
2. _API Token_: Get your personal API token from the **Integrations** section in the [Apify Console](https://console.apify.com/account#/integrations).

## Connection methods

Apify provides two main ways to connect your MCP client to Actors:

1. Main Actors MCP Server: Access _all_ public Actors. Requires dynamic discovery or specifying Actors via URL parameters.
2. Actor-specific MCP Server: A dedicated endpoint for a _single_ Actor, which is pre-registered and ready for immediate use.

### Option 1: Use the main Actors MCP server

This method offers the most flexibility, allowing access to the entire Apify Store dynamically or by specifying Actors at connection time.

```text title="Server endpoint"
https://actors-mcp-server.apify.actor/sse?token=<YOUR_API_TOKEN>
```

Key features:

- Dynamic discovery: Agents can use MCP operations like `discover-actors` to search the Apify Store for tools.
- Dynamic registration: Agents can use the `add-actor-to-tools` operation to add discovered Actors to their available toolset for the current session.
- Pre-registration via URL: You can make specific Actors available immediately by adding the `&actors=` query parameter to the connection URL (for example, `&actors=apify/rag-web-browser`).

The following example demonstrates connecting to the main server while pre-registering the `apify/rag-web-browser` Actor.

#### Step 1: Start the SSE connection

Use `curl` or another SSE client to establish the connection. Append `&actors=apify/rag-web-browser` to pre-register the tool. Replace `<YOUR_API_TOKEN>` with your actual Apify API token.

```bash
# Start the Server-Sent Events (SSE) session and keep it active
curl "https://actors-mcp-server.apify.actor/sse?token=<YOUR_API_TOKEN>&actors=apify/rag-web-browser"

# The server responds with the session endpoint. Note the sessionId.
# event: endpoint
# data: /message?sessionId=9d820491-38d4-4c7d-bb6a-3b7dc542f1fa
```

#### Step 2: Send a tool call request

Use the `sessionId` obtained in Step 1 to send a POST request to the `/message` endpoint. This request invokes the pre-registered `apify/rag-web-browser` tool. Replace `<YOUR_API_TOKEN>` and `<SESSION_ID>` with your actual values.

```bash
curl -X POST "https://actors-mcp-server.apify.actor/message?token=<YOUR_API_TOKEN>&session_id=<SESSION_ID>" \
-H "Content-Type: application/json" \
-d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "arguments": {
      "query": "web browser for RAG pipelines -site:reddit.com",
      "proxyConfiguration": {
            "useApifyProxy": true
      },
      "removeElementsCssSelector": "nav, footer, script, style, noscript, svg, img[src^='\''data:'\''],\\n[role=\\"alert\\"],\\n[role=\\"banner\\"],\\n[role=\\"dialog\\"],\\n[role=\\"alertdialog\\"],\\n[role=\\"region\\"][aria-label*=\\"skip\\" i],\\n[aria-modal=\\"true\\"]",
      "htmlTransformer": "none"
    },
    "name": "apify/rag-web-browser"
  }
}'

# The server immediately confirms receipt of the request:
# Accepted
```

#### Step 3: Receive the result via SSE

The Actor's result is sent back asynchronously over the SSE connection established in Step 1.

```json
event: message
data: {
  "result": {
    "content": [
      {
        "type": "text",
        "text": "[{\"searchResult\":{\"title\":\"... RAG Web Browser Result ...\",\"description\":\"... Content extracted by the Actor ...\"}}]" // Example structure
      }
    ]
  }
}
```

### Option 2: Use an Actor-specific MCP server

Certain Actors, such as `apify/rag-web-browser`, offer their own dedicated MCP server endpoint. This simplifies integration when you only need to interact with that specific Actor.

```text title="Endpoint example for &#96;apify/rag-web-browser&#96;"
https://rag-web-browser.apify.actor/sse?token=<YOUR_API_TOKEN>
```

:::note

The hostname typically matches the Actor's name.

:::

This method is ideal for integrating a specific tool directly into an application (like Claude Desktop) or a custom client without needing the dynamic discovery capabilities of the main server.

The following example demonstrates use of `rag-web-browser` server.

#### Step 1: Start the SSE connection

Connect directly to the Actor's specific MCP endpoint. Replace `<YOUR_API_TOKEN>` with your actual Apify API token.

```bash
# Start the Server-Sent Events (SSE) session and keep it active
curl "https://rag-web-browser.apify.actor/sse?token=<YOUR_API_TOKEN>"

# The server responds with the session endpoint. Note the sessionId.
# event: endpoint
# data: /message?sessionId=5b2a...
```

#### Step 2: Send a tool call request

Use the `sessionId` from Step 1 to send a POST request to the Actor's `/message` endpoint. Replace `<YOUR_API_TOKEN>` and `<SESSION_ID>` with your actual values. The tool `name` in the parameters typically matches the Actor name.

```bash
curl -X POST "https://rag-web-browser.apify.actor/message?session_id=<SESSION_ID>&token=<YOUR_API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "arguments": { "query": "recent news about LLMs", "maxResults": 1 },
      "name": "rag-web-browser"
  }
}'

# The server immediately confirms receipt of the request:
# Accepted
```

#### Step 3: Receive the result via SSE

The result is sent back over the SSE connection established in Step 1.

```json
event: message
data: {"result":{"content":[{"type":"text","text":"[{\"searchResult\":{\"title\":\"Language models recent news\",\"description\":\"Amazon Launches New Generation of LLM Foundation Model...\"}}]"}]}}
```

## Testing and resources

- Testing:
  - Tester MCP Client: Use the [Tester MCP Client](https://apify.com/jiri.spilka/tester-mcp-client) on Apify to interact with either MCP server type. Enter the appropriate server URL (for example, `https://actors-mcp-server.apify.actor/sse` or `https://rag-web-browser.apify.actor/sse`) in the Actor input field, configure your API token, run the client Actor, and interact through its user interface.
- Protocol information:
  - MCP Documentation: For details on the protocol, see the [MCP Introduction](https://modelcontextprotocol.io/introduction).
  - MCP Client Examples: Find example client implementations at [MCP Clients](https://modelcontextprotocol.io/clients).
- Further reading:
  - Apify Blog: Read more about Apify's implementation in the post: [What is Anthropic's Model Context Protocol?](https://blog.apify.com/what-is-model-context-protocol/)

