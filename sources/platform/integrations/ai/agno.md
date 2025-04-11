---
title: Agno Integration
sidebar_label: Agno
description: Integrate Apify with Agno to power AI agents with web scraping, automation, and data insights.
sidebar_position: 1
slug: /integrations/agno
---

**Integrate Apify with Agno to power AI agents with web scraping, automation, and data insights.**

---

## What is Agno?

[Agno](https://docs.agno.com/) is an open-source framework for building intelligent AI agents. It provides a flexible architecture to create agents with custom tools, enabling seamless integration with external services like Apify for tasks such as web scraping, data extraction and automation.

> [!NOTE]
> Check out the [Agno documentation](https://docs.agno.com/introduction) for more details on building AI agents.

## How to Use Apify with Agno

This guide shows how to integrate Apify Actors with Agno to empower your AI agents with real-time web data. We'll use the [RAG Web Browser](https://apify.com/apify/rag-web-browser) Actor to fetch web content and the [Google Places Crawler](https://apify.com/compass/crawler-google-places) Actor to extract location-based data. It is very easy to use with any other Actor by just passing the name of the Actor. See and choose from 4,000+ Actors in the [Apify Store](https://apify.com/store).

### Prerequisites

- **Apify API token**: Obtain your token from the [Apify console](https://console.apify.com/account/integrations).  
- **Python environment**: Ensure Python is installed (version 3.8+ recommended).  
- **Required packages**: Install the following dependencies in your terminal:

```bash
pip install agno apify-client langchain-apify
```

## Basic Integration Example

Start by setting up an Agno agent with Apify tools. This example uses the RAG Web Browser Actor to extract content from a specific URL.

```python
from agno.agent import Agent
from agno.tools.apify import ApifyTools

# Initialize the agent with Apify tools
agent = Agent(
    tools=[
        ApifyTools(
            actors=["apify/rag-web-browser"],
            apify_api_token="YOUR_APIFY_API_TOKEN"  # Replace YOUR_APIFY_API_TOKEN with your token 
        )
    ],
    show_tool_calls=True,
    markdown=True
)

# Fetch and display web content
agent.print_response("Extract key details from https://docs.agno.com/introduction", markdown=True)
```

Running this code will scrape the specified URL and return formatted content your agent can use.

> [!TIP]
> You can also set the APIFY_API_TOKEN environment variable instead of passing it directly in the code.

### Advanced Scenario: Travel Planning Agent

Combine multiple Apify Actors to create a powerful travel planning agent. This example uses the RAG Web Browser and Google Places Crawler to gather travel insights and local business data.

```python
from agno.agent import Agent
from agno.tools.apify import ApifyTools

# Create a travel planning agent
agent = Agent(
    name="Travel Planner",
    instructions=[
        "You are a travel planning assistant. Use web data and location insights to provide detailed travel recommendations."
    ],
    tools=[
        ApifyTools(
            actors=[
                "apify/rag-web-browser",           # For general web research
                "compass/crawler-google-places"    # For location-based data
            ],
            apify_api_token="YOUR_APIFY_API_TOKEN"
        )
    ],
    show_tool_calls=True,
    markdown=True
)

# Plan a trip to Tokyo
agent.print_response(
    """
    I'm traveling to Tokyo next month.
    1. Research the best time to visit and top attractions.
    2. Find a highly rated sushi restaurant near Shinjuku.
    Compile a travel guide with this information.
    """,
    markdown=True
)
```

This agent will fetch travel-related data and restaurant recommendations, providing a comprehensive travel guide:

1. Use the RAG Web Browser to research Tokyo travel details.
2. Use the Google Places Crawler to find a top sushi restaurant.
3. Combine the results into a comprehensive guide.

> [!TIP]
> Browse the [Apify Store](https://apify.com/store) to find additional Actors for tasks like social media scraping, e-commerce data extraction, or news aggregation.

### Available Apify Tools

Agno supports any Apify Actor via the ApifyTools class. You can specify a single Actor ID or a list of Actor IDs to register multiple tools for your agent at once.

## Configuration Options

| Parameter                    | Type                | Default | Description                                                        |
| ---------------------------- | ------------------- | ------- | ------------------------------------------------------------------ |
| `apify_api_token`            | `str`               | `None`  | Apify API token (or set via APIFY_API_TOKEN environment variable)  |
| `actors`                     | `str` or `List[str]`| `None`  | Single Actor ID or list of Actor IDs to register                   |

## Resources

- [How to build an AI Agent](https://blog.apify.com/how-to-build-an-ai-agent/)
- [Agno Framework Documentation](https://docs.agno.com)
- [Apify Platform Documentation](https://docs.apify.com)
- [Apify Actor Documentation](https://docs.apify.com/actors)
- [Apify Store - Browse available Actors](https://apify.com/store)