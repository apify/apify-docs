---
title: OpenAI Agents SDK integration
sidebar_label: OpenAI Agents SDK
description: Learn how to integrate Apify with OpenAI Agents SDK using Model Context Protocol to build AI agents with web data access.
sidebar_position: 11
slug: /integrations/openai-agents
---

**Learn how to integrate Apify Actors with OpenAI Agents SDK using Model Context Protocol.**

---

The [OpenAI Agents Python SDK](https://openai.github.io/openai-agents-python/) is a framework for building AI agents powered by OpenAI's language models.
It provides a way to create agents that can use tools, manage context, and interact with external systems through the [Model Context Protocol (MCP)](https://openai.com/research/model-context-protocol).
For more in-depth details on OpenAI Agents SDK, check out its [official documentation](https://openai.github.io/openai-agents-python/).

## How to use Apify with OpenAI Agents SDK

This guide demonstrates how to use Apify Actors with OpenAI Agents SDK by connecting to the Apify MCP server.
You'll build an agent that can search the web and use Apify Actors to gather information.

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

The `MCPServerStreamableHttp` connects to the Apify MCP server using streamable HTTP.
Key configuration options:

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

If you want to test the whole example, you can simply create a new file, `openai_agents_instagram.py`, and copy the whole code into it.

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

To run it, you can use the following command: `python openai_agents_instagram.py`

### Agent testing of different MCP servers

You can use the OpenAI Agents SDK to test MCP servers and verify they're working correctly.
The agent can list available tools and execute them to ensure proper functionality.

Here's an example of testing the Apify MCP server:

```python
async def main() -> None:
    # Connect to Apify MCP server for testing
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
        # List available tools
        tools = await server.list_tools()
        print(f"Available tools: {[tool.name for tool in tools]}")

        # Create a test agent
        agent = Agent(
            name="Tester",
            instructions="Test the available MCP tools by calling them with appropriate parameters.",
            mcp_servers=[server],
        )

        # Test a simple query
        result = await Runner.run(
            agent, "List all available tools and test the search-actors tool with query 'instagram'"
        )
        print(result.final_output)

asyncio.run(main())
```
For comprehensive example with error handling and reporting, refer [OpenAI Agent MCP Tester](https://apify.com/jiri.spilka/openai-agent-mcp-tester) Actor.
This Actor automates the testing process using OpenAI agents with a two-agent orchestrator pattern (planner and executor), generating detailed reports with pass/fail status for each tool.

## Related integrations

- [ChatGPT integration](/platform/integrations/chatgpt) — Add Apify MCP server as a custom connector in ChatGPT
- [OpenAI Assistants integration](/platform/integrations/openai-assistants) — Use Apify Actors with OpenAI Assistants API via function calling

## Resources

- [OpenAI Agents Python SDK documentation](https://openai.github.io/openai-agents-python/)
- [OpenAI Agents MCP guide](https://openai.github.io/openai-agents-python/mcp/)
- [OpenAI Agent MCP Tester Actor](https://apify.com/jiri.spilka/openai-agent-mcp-tester)
- [OpenAI Agent MCP Tester GitHub repository](https://github.com/apify/openai-agent-mcp-tester)
- [Apify MCP server](https://mcp.apify.com)
- [Apify MCP documentation](https://docs.apify.com/platform/integrations/mcp)
- [Model Context Protocol specification](https://modelcontextprotocol.io/)
