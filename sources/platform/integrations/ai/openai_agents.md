---
title: OpenAI Agents SDK integration
sidebar_label: OpenAI Agents SDK
description: Learn how to integrate Apify with the OpenAI Agents SDK using the Model Context Protocol to build AI agents with web data access.
sidebar_position: 13
slug: /integrations/openai-agents
---

The _OpenAI Agents Python SDK_ enables you to build AI agents powered by OpenAI's language models that can use tools, manage context, and interact with external systems through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro).
By connecting to the Apify MCP server, your agents can access Apify's extensive library of Actors to perform web scraping, data extraction, and automation tasks in real time.

For more details about the OpenAI Agents SDK, refer to the [official documentation](https://openai.github.io/openai-agents-python/).

## Prerequisites

Before integrating Apify with OpenAI Agents SDK, you'll need:

- _An Apify account_ - If you don't have an Apify account already, you can [sign up](https://console.apify.com/sign-up)
- _Apify API token_ - Get your API token from the **Integrations** section in [Apify Console](https://console.apify.com/account#/integrations). This token authorizes the Apify MCP server to run Actors on your behalf. Make sure to keep it secure.
- _OpenAI API key_ - Get your API key from the [OpenAI platform](https://platform.openai.com/account/api-keys). You need this to use OpenAI Agents SDK.
- _Python packages_ - Install the required packages:

    ```bash
    pip install agents openai
    ```

## Building a web search agent with Apify MCP

You can connect to the Apify MCP server using streamable HTTP with Bearer token authentication. Use your Apify API token by setting the `Authorization: Bearer <APIFY_TOKEN>` header in the MCP server configuration.

```python
import asyncio
import os

from agents import Agent, Runner
from agents.mcp import MCPServerStreamableHttp

os.environ["APIFY_TOKEN"] = "Your Apify API token"
os.environ["OPENAI_API_KEY"] = "Your OpenAI API key"


async def main() -> None:
    # Create MCP server connection with Bearer token
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


if __name__ == "__main__":
    asyncio.run(main())
```

### Configuration options

The `MCPServerStreamableHttp` connects to the Apify MCP server using streamable HTTP. Key configuration options:

- `params`: Dictionary containing:
  - `url`: The MCP server URL (`https://mcp.apify.com` for Apify)
  - `headers`: Authentication headers (Bearer token for Apify)
  - `timeout`: Request timeout in seconds
- `cache_tools_list`: A boolean property that specifies whether to cache the tool list to reduce API calls
- `max_retry_attempts`: Number of retry attempts for failed requests

:::note Tool execution may take some time

The agent may take some time (seconds or even minutes) to execute tool calls, especially when using web scraping Actors or searching the web. Actor runs can take time to complete depending on their task complexity.

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

:::tip Easy configuration

Use the [UI MCP configurator](https://mcp.apify.com/) to select your tools in a user interface, then copy the configuration to your code.

:::

## Examples

### Web search agent

This example demonstrates how to build an agent that can search the web and use Apify Actors to gather information:

```python
import asyncio
import os

from agents import Agent, Runner
from agents.mcp import MCPServerStreamableHttp

os.environ["APIFY_TOKEN"] = "Your Apify API token"
os.environ["OPENAI_API_KEY"] = "Your OpenAI API key"


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


if __name__ == "__main__":
    asyncio.run(main())
```

### Instagram profile analysis

This example shows how to use a specific Actor for Instagram profile analysis:

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

### MCP server testing Agent

You can use the OpenAI Agents SDK to test MCP servers and verify they're working correctly. The agent can list available tools and execute them to ensure proper functionality:

```python
import asyncio
import os

from agents import Agent, Runner
from agents.mcp import MCPServerStreamableHttp

os.environ["APIFY_TOKEN"] = "Your Apify API token"
os.environ["OPENAI_API_KEY"] = "Your OpenAI API key"


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


if __name__ == "__main__":
    asyncio.run(main())
```

For a comprehensive example with error handling and reporting, refer to the [OpenAI Agent MCP Tester](https://apify.com/jiri.spilka/openai-agent-mcp-tester) Actor. This Actor automates the testing process using OpenAI agents with a two-agent orchestrator pattern (planner and executor), generating detailed reports with pass/fail status for each tool.

## Troubleshooting

### Authentication errors

- _Check your API token_: Verify that your Apify API token is correct. You can find it in the **Integrations** section of the [Apify Console](https://console.apify.com/account#/integrations). Without a valid token, the server cannot start Actor runs.
- _Set environment variables_: When running your agent, ensure you have set the `APIFY_TOKEN` and `OPENAI_API_KEY` environment variables.

### Agent execution issues

- _No response or long delays_: Actor runs can take time to complete depending on their task. If you're experiencing long delays, check the Actor's logs in Apify Console. The logs will provide insight into the Actor's status and show if it's processing a long operation or has encountered an error.
- _Tool execution timeout_: If tool calls are timing out, increase the `timeout` parameter in the `MCPServerStreamableHttp` configuration.

## Related integrations

- [ChatGPT integration](/platform/integrations/chatgpt) - Add Apify MCP server as a custom connector in ChatGPT
- [OpenAI Assistants integration](/platform/integrations/openai-assistants) - Use Apify Actors with OpenAI Assistants API via function calling

## Resources

- [OpenAI Agents Python SDK documentation](https://openai.github.io/openai-agents-python/) - Official documentation for the OpenAI Agents SDK
- [OpenAI Agents MCP guide](https://openai.github.io/openai-agents-python/mcp/) - Learn how to use MCP with OpenAI Agents SDK
- [OpenAI Agent MCP Tester Actor](https://apify.com/jiri.spilka/openai-agent-mcp-tester) - A specialized Actor for testing MCP server integration
- [OpenAI Agent MCP Tester GitHub repository](https://github.com/apify/openai-agent-mcp-tester) - Source code for the MCP tester Actor
- [Apify MCP server](https://mcp.apify.com) - Interactive configuration tool for the Apify MCP server
- [Apify MCP documentation](/platform/integrations/mcp) - Complete guide to using the Apify MCP server
- [Model Context Protocol specification](https://modelcontextprotocol.io/) - Learn about the MCP specification
