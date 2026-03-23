---
title: Upsonic integration
sidebar_label: Upsonic
description: Learn how to integrate Apify Actors with Upsonic to give your AI agents real-time web scraping, data extraction, and automation capabilities from Apify Store.
sidebar_position: 20
slug: /integrations/upsonic
---

## What is Upsonic?

[Upsonic](https://upsonic.ai) is an open-source Python framework for building AI agents. Supporting any LLM (e.g. OpenAI, Anthropic, Azure, Bedrock), it provides an `AutonomousAgent` class, an OpenClaw-like autonomous agent with built-in shell and filesystem access, a safety engine for policy-based content filtering, built-in OCR and document processing, session and long-term memory, multi-agent coordination, MCP server support, and [Universal Commerce Protocol (UCP)](https://github.com/Upsonic/awesome-ucp) tools for AI-driven commerce workflows.

:::note Upsonic documentation

Check out the [Upsonic documentation](https://docs.upsonic.ai) for more details on building AI agents.

:::

## How to use Apify with Upsonic

This guide shows how to integrate Apify Actors with Upsonic using the built-in `ApifyTools` class. The example builds a restaurant discovery agent that uses the [Google Places Crawler](https://apify.com/compass/crawler-google-places) Actor to search Google Maps with a natural language query and save the results to a Markdown file.

### Prerequisites

- _Apify API token_: Obtain your API token from [Apify Console](https://console.apify.com/account/integrations).
- _Anthropic API key_ (or another LLM provider): Get one from the [Anthropic Console](https://console.anthropic.com).
- _Python environment_: Python 3.9 or later.
- _Required packages_: Install the following dependencies:

```bash
pip install 'upsonic[custom-tools]' python-dotenv apify-client anthropic
```

:::tip Alternative LLM providers

Upsonic uses LiteLLM under the hood, so you can swap `anthropic/claude-sonnet-4-6` for any supported model string, e.g. `openai/gpt-4o` or `gemini-3-flash-preview`. Update the environment variable and model name accordingly.

:::

## Basic integration example

Set up a Upsonic agent with Apify tools. This example uses the [RAG Web Browser](https://apify.com/apify/rag-web-browser) Actor to extract content from a URL.

```python
import os
from upsonic import Agent, Task
from upsonic.tools.custom_tools.apify import ApifyTools

agent = Agent(
    "anthropic/claude-sonnet-4-6",
    tools=[
        ApifyTools(
            actors=["apify/rag-web-browser"],
            apify_api_token=os.getenv("APIFY_API_TOKEN"),
        )
    ],
)

task = Task("What information can you find on https://docs.apify.com/platform/actors?")
agent.print_do(task)
```

Running this code fetches and summarizes the content from the provided URL.

## Advanced scenario: Restaurant discovery agent

Combine `ApifyTools` with the Google Places Crawler to build an agent that accepts a natural language query and returns a list of matching restaurants.

`actor_defaults` pre-sets configuration that never needs to change - such as result limits and output format - while leaving the search query under the LLM's control. The `timeout` override is necessary because the Actor takes 60-90 seconds to crawl Google Maps.

```python
import os
from upsonic import Agent, Task
from upsonic.tools.custom_tools.apify import ApifyTools
from dotenv import load_dotenv

load_dotenv()

agent = Agent(
    "anthropic/claude-sonnet-4-6",
    tools=[
        ApifyTools(
            actors=["compass/crawler-google-places"],
            apify_api_token=os.getenv("APIFY_API_TOKEN"),
            actor_defaults={
                "compass/crawler-google-places": {
                    "maxCrawledPlacesPerSearch": 10,
                    "maxImages": 0,
                    "outputFormats": ["markdown"],
                }
            },
            timeout=180.0,
            max_retries=0,
        )
    ],
)

task = Task("Find cheap and tasty falafel places in Kadikoy, Istanbul")
agent.print_do(task)

with open("results.md", "w") as f:
    f.write(task.response)

print("Results saved to results.md")
```

The agent interprets the natural language query, calls the Actor with appropriate search parameters, and formats the response:

```text
## Best cheap and tasty falafel places in Kadikoy

### 1. Falafella - 4.3/5
- Price: very affordable
- Address: Caferaga, Moda Cd. No:53A, Kadikoy
- Hours: 11 AM - 2 AM
- Vegan options available

### 2. Nohut Falafel & Humus - 4.8/5
- Address: Osmanaga, Sakiz Sk. No:22C, Kadikoy
- Hours: 12 PM - 10 PM
- Gluten-free and vegan, known for fresh ingredients
```

:::note Crawl time

Each run takes 60-90 seconds as the Actor crawls Google Maps. Keep `maxCrawledPlacesPerSearch` at 10 or below - more results can exceed the model's context limit.

:::

## Configuration options

`actors` (string or `List[string]`, default: `None`)
: Single Actor ID or list of Actor IDs to register as tools.

`apify_api_token` (string, default: `None`)
: Apify API token. Falls back to the `APIFY_API_TOKEN` environment variable.

`actor_defaults` (`Dict[string, Dict[string, Any]]`, default: `None`)
: Per-actor default input values. Keys are Actor IDs, values are dicts of parameter to value. Hidden from the LLM and merged at call time.

`timeout` (float, default: `30.0`)
: Maximum seconds to wait for the Actor run to finish.

`max_retries` (int, default: `3`)
: Number of retry attempts on failure. Set to `0` to prevent parallel duplicate runs on timeout.

:::tip Apify Store

Browse [Apify Store](https://apify.com/store) to find Actors for social media scraping, e-commerce data extraction, news aggregation, and more. Pass any Actor ID to `actors` to use it immediately.

:::

## Resources

- [Upsonic documentation](https://docs.upsonic.ai)
- [Upsonic ApifyTools reference](https://docs.upsonic.ai/concepts/tools/scraping-tools/apify)
- [Upsonic restaurant scout example](https://github.com/Upsonic/Examples/tree/master/examples/web_search_and_scraping/apify_google_maps_restaurant_scout)
- [Apify Actor documentation](/platform/actors)
- [Apify Store - browse available Actors](https://apify.com/store)
