---
title: OpenAI Agents SDK integration
sidebar_label: OpenAI Agents SDK
description: Learn how to integrate Apify with OpenAI Agents SDK using Model Context Protocol to build AI agents with web data access.
sidebar_position: 11
slug: /integrations/openai-agents
---

**Learn how to integrate Apify Actors with OpenAI Agents SDK using Model Context Protocol.**

There are three main ways to integrate the Apify MCP server with OpenAI:

- **ChatGPT**: Add the server as a custom connector tool in ChatGPT (requires developer mode) — see [ChatGPT integration](/platform/integrations/chatgpt)
- **OpenAI Assistants API**: Use Apify Actors with OpenAI Assistants via function calling — see [OpenAI Assistants integration](/platform/integrations/openai-assistants)
- **OpenAI Agents SDK**: Integrate the server within OpenAI agents using the Agents SDK — **this guide**

---

## What is OpenAI Agents SDK

The [OpenAI Agents Python SDK](https://openai.github.io/openai-agents-python/) is a framework for building AI agents powered by OpenAI's language models. It provides a simple way to create agents that can use tools, manage context, and interact with external systems through the [Model Context Protocol (MCP)](https://openai.com/research/model-context-protocol).

:::note Explore OpenAI Agents SDK

For more in-depth details on OpenAI Agents SDK, check out its [official documentation](https://openai.github.io/openai-agents-python/).

:::

## How to use Apify with OpenAI Agents SDK

This guide demonstrates how to use Apify Actors with OpenAI Agents SDK by connecting to the Apify MCP server. You'll build an agent that can search the web and use Apify Actors to gather information.

### Prerequisites

- **Apify API token**: To use Apify Actors in OpenAI Agents SDK, you need an Apify API token. If you don't have one, you can learn how to obtain it in the [Apify documentation](https://docs.apify.com/platform/integrations/api).

- **OpenAI API key**: In order to work with agents in OpenAI Agents SDK, you need an OpenAI API key. If you don't have one, you can get it from the [OpenAI platform](https://platform.openai.com/account/api-keys).

- **Python packages**: You need to install the following Python packages:

    ```bash
    pip install agents openai
    ```

### Building a web search agent with Apify MCP

First, import all required packages:

```python
import asyncio
import os

from agents import Agent, Runner
from agents.mcp import MCPServerStreamableHttp
```

Next, set the environment variables for the Apify API token and OpenAI API key:

```python
os.environ["APIFY_TOKEN"] = "Your Apify API token"
os.environ["OPENAI_API_KEY"] = "Your OpenAI API key"
```

Create an async function to connect to the Apify MCP server and create an agent:

```python
async def main() -> None:
    # Create MCP server connection
    async with MCPServerStreamableHttp(
        name="Apify MCP Server",
        params={
            "url": "https://mcp.apify.com",
            "headers": {"Authorization": f"Bearer {os.environ['APIFY_TOKEN']}"},
            "timeout": 120,
        },
        cache_tools_list=True,
        max_retry_attempts=3,
    ) as server:
        # Create agent with MCP server
        agent = Agent(
            name="Assistant",
            instructions="Use the Apify MCP tools to answer questions. Search the web when needed.",
            mcp_servers=[server],
        )

        # Run the agent
        result = await Runner.run(agent, "Search the web and summarize recent trends in AI agents")
        print(result.final_output)

asyncio.run(main())
```

The `MCPServerStreamableHttp` connects to the Apify MCP server using HTTP streaming. Key configuration options:

- `params`: Dictionary containing:
  - `url`: The MCP server URL (`https://mcp.apify.com` for Apify)
  - `headers`: Authentication headers (Bearer token for Apify)
  - `timeout`: Request timeout in seconds
- `cache_tools_list`: Caches the tool list to reduce API calls
- `max_retry_attempts`: Number of retry attempts for failed requests

:::note Tool execution may take some time

The agent may take some time to execute tool calls, especially when using web scraping Actors or searching the web.

:::

### Using specific Actors

You can configure the Apify MCP server to expose specific Actors by including them in the URL query parameters. For example, to use an Instagram scraper:

```python
async with MCPServerStreamableHttp(
    name="Apify MCP Server",
    params={
        "url": "https://mcp.apify.com?tools=apify/instagram-scraper",
        "headers": {"Authorization": f"Bearer {os.environ['APIFY_TOKEN']}"},
        "timeout": 120,
    },
    cache_tools_list=True,
) as server:
    agent = Agent(
        name="Assistant",
        instructions="Use the Instagram scraper to analyze Instagram profiles and posts.",
        mcp_servers=[server],
    )

    # Run the agent
    result = await Runner.run(
        agent, "Get the latest posts from @natgeo Instagram profile and summarize the content"
    )
    print(result.final_output)
```

Visit the [Apify MCP server configuration page](https://mcp.apify.com) to see available Actors and generate custom URLs with specific tools.

### Example: Instagram profile analysis

If you want to test the whole example, you can simply create a new file, `openai_agents_integration.py`, and copy the whole code into it.

```python
import asyncio
import os

from agents import Agent, Runner
from agents.mcp import MCPServerStreamableHttp

os.environ["APIFY_TOKEN"] = "Your Apify API token"
os.environ["OPENAI_API_KEY"] = "Your OpenAI API key"


async def main() -> None:
    # Create MCP server connection with Instagram scraper
    async with MCPServerStreamableHttp(
        name="Apify MCP Server",
        params={
            "url": "https://mcp.apify.com?tools=apify/instagram-scraper",
            "headers": {"Authorization": f"Bearer {os.environ['APIFY_TOKEN']}"},
            "timeout": 120,
        },
        cache_tools_list=True,
        max_retry_attempts=3,
    ) as server:
        # Create agent with MCP server
        agent = Agent(
            name="Assistant",
            instructions="Use the Instagram scraper to analyze Instagram profiles and posts.",
            mcp_servers=[server],
        )

        # Run the agent
        result = await Runner.run(
            agent, "Get the latest posts from @natgeo Instagram profile and summarize the main themes"
        )
        print(result.final_output)


if __name__ == "__main__":
    asyncio.run(main())
```

To run it, you can use the following command: `python openai_agents_integration.py`

### Testing MCP servers with OpenAI Agent MCP Tester

The [OpenAI Agent MCP Tester](https://apify.com/jiri.spilka/openai-agent-mcp-tester) Actor automates testing of MCP servers using OpenAI agents. It connects to multiple MCP servers, tests available tools using a two-agent orchestrator pattern (planner and executor), and generates detailed reports.

You can use this Actor to test your MCP server integration:

1. Navigate to the [OpenAI Agent MCP Tester Actor page](https://apify.com/jiri.spilka/openai-agent-mcp-tester)
2. Provide the MCP server URLs you want to test
3. Add authentication headers if required
4. Start the test
5. Review the generated comprehensive report

The Actor accepts the following input:

```json
{
  "mcpUrls": [
    "https://mcp.apify.com"
  ],
  "headers": {
    "Authorization": "Bearer your-token"
  }
}
```

The Actor provides detailed test results including:
- Individual test records for each tool (dataset output)
- Overall test summaries with pass/fail statistics (key-value store output)
- Detailed explanations for each test result

For more information about the architecture and usage, see the [GitHub repository](https://github.com/apify/openai-agent-mcp-tester).

## Resources

- [OpenAI Agents Python SDK documentation](https://openai.github.io/openai-agents-python/)
- [OpenAI Agents MCP guide](https://openai.github.io/openai-agents-python/mcp/)
- [OpenAI Agent MCP Tester Actor](https://apify.com/jiri.spilka/openai-agent-mcp-tester)
- [OpenAI Agent MCP Tester GitHub repository](https://github.com/apify/openai-agent-mcp-tester)
- [Apify MCP server](https://mcp.apify.com)
- [Apify MCP documentation](https://docs.apify.com/platform/integrations/mcp)
- [Model Context Protocol specification](https://modelcontextprotocol.io/)

promptIn this tutorial, we will show you how to setup with ChagtGPT and OpenAI Agents using the Model Context Protocol (MCP) server provided by Apify. There are three main ways to integrate the Apify MCP server with OpenAI:
- *ChatGPT*: Add the server as a custom connector tool in ChatGPT (requires developer mode).
- *OpenAI API*: Use the server within the responses API endpoint.
- *OpenAI Agents SDK*: Integrate the server within OpenAI agents using the Agents SDK.

