---
title: 🇬 Google ADK integration
sidebar_label: Google ADK
description: Learn how to integrate Apify Actors as tools for AI with Google Agent Development Kit (ADK).
sidebar_position: 2
slug: /integrations/google-adk
---

**Learn how to integrate Apify Actors as tools for AI with Agent Development Kit (ADK).**

---

## What is the Google ADK

[Google Agent Development Kit](https://github.com/google/adk-python) is a framework for developing and deploying AI agents.

:::note Explore Google ADK

For more details, check out [Google ADK documentation](https://google.github.io/adk-docs/).

:::

## How to use Apify with Google ADK

Apify is a marketplace of web scraping and automation tools, AI agents, and MCP servers that you can integrate with your AI agents. This guide shows how to use Apify tools with an AI agent built with Google ADK.


### Prerequisites

- _Apify API token_: To use Apify Actors in Google ADK, you need an Apify API token. To obtain your token, check [Apify documentation](/platform/integrations/api#api-token).
- _Python packages_: Install the following Python packages:

    ```bash
    pip install google-adk
    ```

### Build a pub search AI agent

First, create an agent project:

```bash
adk create pub_search_agent
```

Create and configure the agent to use the Apify MCP server tools:

:::warning Set your API token

Make sure to set the `APIFY_TOKEN` environment variable in the `.env` file with your Apify API token before running the code.

:::

```python
from google.adk.agents import Agent
from google.adk.tools.mcp_tool import McpToolset
from google.adk.tools.mcp_tool.mcp_session_manager import StreamableHTTPServerParams
import os

root_agent = Agent(
    model="gemini-2.5-flash",
    name="pub_search_agent",
    instruction="You are a pub search agent that helps users find a great pub to visit based on their preferences. Use Apify tools to accomplish this.",
    tools=[
        McpToolset(
            connection_params=StreamableHTTPServerParams(
                # Configure Apify MCP Server URL with desired tools
                url="https://mcp.apify.com?tools=compass/crawler-google-places",
                headers={
                    "Authorization": f"Bearer {os.getenv('APIFY_TOKEN')}",
                },
            ),
        )
    ],
)
```

Run the agent via the web interface:

```bash
adk web
```

Or run the agent via command-line interface:

```bash
adk run pub_search_agent
```

Prompt the agent to find a pub in San Francisco:

```text
Find a pub near the Ferry Building in San Francisco.
```

## Resources

- [Apify Actors](https://docs.apify.com/platform/actors)
- [Google ADK documentation](https://google.github.io/adk-docs/get-started/)
- [What are AI agents?](https://blog.apify.com/what-are-ai-agents/)
- [Apify MCP Server](https://mcp.apify.com)
- [Apify MCP Server documentation](https://docs.apify.com/platform/integrations/mcp)
- [Apify OpenRouter proxy](https://apify.com/apify/openrouter)
