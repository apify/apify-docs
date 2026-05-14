---
title: Strands Agents integration
sidebar_label: Strands Agents
description: >-
  Learn how to integrate Apify with the Strands Agents SDK to give your
  AI agents web scraping, search, and social media capabilities.
sidebar_position: 20
slug: /integrations/strands-agents
---

## What is Strands Agents?

[Strands Agents](https://github.com/strands-agents/sdk-python) is an open-source Python SDK by AWS for building AI agents. It uses a simple model-tools-prompt pattern where the SDK runs the agentic loop for you. The SDK sends the prompt to your model, executes any tool calls the model requests, and feeds the results back until the task is complete.

:::note Explore Strands Agents

For more details, check out the [Strands Agents documentation](https://strandsagents.com/).

:::

## How to use Apify with Strands Agents

The [strands-apify](https://pypi.org/project/strands-apify/) package plugs Apify into the Strands agentic loop. It ships 18 ready-made tools grouped into three focused tool sets. Your agent can scrape, crawl, search, and pull social media data through the [Apify platform](https://apify.com/) without writing any HTTP or scraping code.

### Prerequisites

- _Python 3.10 or newer_.
- _Apify API token_: Get one from the [Integrations](https://console.apify.com/account/integrations) page in Apify Console.
- _Model provider_: Strands works with Amazon Bedrock, OpenAI, Anthropic, Google Gemini, Ollama (local), LiteLLM, and LMStudio. Pick one before you continue.

### Installation

Install the Strands SDK and the Apify tools:

```bash
pip install strands-agents strands-apify
```

Export your Apify token so the tools can authenticate:

```bash
export APIFY_TOKEN=your_apify_token_here
```

:::tip Keep your token out of source code

Use a `.env` file or your secrets manager in production. Never commit `APIFY_TOKEN` to a repository.

:::

### Configure your model provider

Strands swaps model providers with a one-line change. Install the matching extra, set the provider's API key, and create a `model` instance to pass to your agent.

#### OpenAI

```bash
pip install 'strands-agents[openai]'
export OPENAI_API_KEY=your_openai_key
```

```python
import os
from strands.models.openai import OpenAIModel

model = OpenAIModel(
    client_args={"api_key": os.getenv("OPENAI_API_KEY")},
    model_id="gpt-4o",
)
```

#### Anthropic

```bash
pip install 'strands-agents[anthropic]'
export ANTHROPIC_API_KEY=your_anthropic_key
```

```python
import os
from strands.models.anthropic import AnthropicModel

model = AnthropicModel(
    client_args={"api_key": os.getenv("ANTHROPIC_API_KEY")},
    model_id="claude-sonnet-4-5",
    max_tokens=1024,
)
```

#### Ollama (local)

Run models on your own machine, with no API key required:

```bash
pip install 'strands-agents[ollama]'
ollama pull qwen3.5
```

```python
from strands.models.ollama import OllamaModel

model = OllamaModel(host="http://localhost:11434", model_id="qwen3.5")
```

:::tip Other providers

Strands also supports Amazon Bedrock (the default), Google Gemini, LiteLLM, and LMStudio. See the [Strands model providers documentation](https://strandsagents.com/latest/user-guide/concepts/model-providers/overview/) for the full list.

:::

### Build your first agent

With the model configured, you can build an agent in three lines. This one scrapes a single URL and summarizes it:

```python
from strands import Agent
from strands_apify import apify_scrape_url

agent = Agent(model=model, tools=[apify_scrape_url])

agent("Scrape https://docs.apify.com and summarize the page in three bullet points.")
```

The agent calls `apify_scrape_url` under the hood, returns markdown to the model, and the model produces the summary.

### Choose the right tool set

`strands-apify` provides 18 tools split across three tool sets:

| Tool set             | Tools | Use case                                                                                |
| -------------------- | ----- | --------------------------------------------------------------------------------------- |
| `APIFY_CORE_TOOLS`   | 6     | Run any Actor or saved task, fetch dataset items, scrape single URLs to markdown        |
| `APIFY_SEARCH_TOOLS` | 5     | Google Search, Google Maps, YouTube, multi-page website crawling, e-commerce            |
| `APIFY_SOCIAL_TOOLS` | 7     | Instagram, LinkedIn, Twitter/X, TikTok, Facebook                                        |

LLMs select tools based on names and descriptions, so the more tools an agent has in context, the larger the decision space it must reason over. That can lead to wrong tool selection, slower responses, and higher token usage. Register only the tools your agent actually needs.

You have three ways to import tools:

1. Import a whole tool set when your agent needs the full category:

    ```python
    from strands import Agent
    from strands_apify import APIFY_CORE_TOOLS

    agent = Agent(model=model, tools=APIFY_CORE_TOOLS)
    ```

1. Import individual tools for the tightest control:

    ```python
    from strands_apify import apify_scrape_url, apify_google_search_scraper

    agent = Agent(model=model, tools=[apify_scrape_url, apify_google_search_scraper])
    ```

1. Mix tool sets with individual tools when you need most of one category plus a tool from another:

    ```python
    from strands_apify import APIFY_CORE_TOOLS, apify_twitter_scraper

    agent = Agent(model=model, tools=[*APIFY_CORE_TOOLS, apify_twitter_scraper])
    ```

:::caution Avoid `APIFY_ALL_TOOLS` in production

`APIFY_ALL_TOOLS` bundles every tool from all three tool sets. It's handy for prototyping, but registering 18 tools at once measurably degrades model accuracy. Trim down to a focused set before you ship.

:::

## Examples

### Web research agent

This agent searches Google, then scrapes the top result and summarizes it. The model chains the two tool calls automatically:

```python
import os
from strands import Agent
from strands.models.openai import OpenAIModel
from strands_apify import apify_google_search_scraper, apify_scrape_url

model = OpenAIModel(
    client_args={"api_key": os.getenv("OPENAI_API_KEY")},
    model_id="gpt-4o",
)

agent = Agent(model=model, tools=[apify_google_search_scraper, apify_scrape_url])

agent(
    "Search Google for 'Strands Agents SDK AWS' and return the top 3 results. "
    "Then scrape the first result and summarize the page content in 3 bullet points."
)
```

### Social media monitoring agent

This agent pulls recent tweets and Instagram posts on a topic:

```python
from strands import Agent
from strands_apify import apify_twitter_scraper, apify_instagram_scraper

agent = Agent(model=model, tools=[apify_twitter_scraper, apify_instagram_scraper])

agent("Find the latest 10 tweets mentioning #WebScraping and summarize the main topics.")
```

### Run any Actor from Apify Store

The pre-built tools cover the most common use cases, but [Apify Store](https://apify.com/store) has 4,000+ Actors. Use `apify_run_actor_and_get_dataset` to give your agent access to any of them. Pass the Actor ID and its input schema:

```python
from strands import Agent
from strands_apify import apify_run_actor_and_get_dataset

agent = Agent(model=model, tools=[apify_run_actor_and_get_dataset])

agent(
    "Run the Apify Actor 'apify/rag-web-browser' with input "
    "{\"query\": \"latest AI safety research\", \"maxResults\": 5} "
    "and summarize the results."
)
```

For long-running Actors (large crawls, datasets with thousands of items), increase the `timeout_secs` parameter. The default is 300 seconds.

## Available tools

Each tool below links to its underlying Actor on Apify Store. For parameter details, see the [strands-apify GitHub repository](https://github.com/apify/strands-apify).

| `APIFY_CORE_TOOLS`                                                              | `APIFY_SEARCH_TOOLS`                                                                | `APIFY_SOCIAL_TOOLS`                                                                |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `apify_run_actor`                                                               | [`apify_google_search_scraper`](https://apify.com/apify/google-search-scraper)      | [`apify_instagram_scraper`](https://apify.com/apify/instagram-scraper)              |
| `apify_get_dataset_items`                                                       | [`apify_google_places_scraper`](https://apify.com/compass/crawler-google-places)    | [`apify_linkedin_profile_posts`](https://apify.com/apimaestro/linkedin-profile-posts) |
| `apify_run_actor_and_get_dataset`                                               | [`apify_youtube_scraper`](https://apify.com/streamers/youtube-scraper)              | [`apify_linkedin_profile_search`](https://apify.com/harvestapi/linkedin-profile-search) |
| `apify_run_task`                                                                | [`apify_website_content_crawler`](https://apify.com/apify/website-content-crawler)  | [`apify_linkedin_profile_detail`](https://apify.com/apimaestro/linkedin-profile-detail) |
| `apify_run_task_and_get_dataset`                                                | [`apify_ecommerce_scraper`](https://apify.com/apify/e-commerce-scraping-tool)       | [`apify_twitter_scraper`](https://apify.com/apidojo/twitter-scraper-lite)           |
| [`apify_scrape_url`](https://apify.com/apify/website-content-crawler)           |                                                                                     | [`apify_tiktok_scraper`](https://apify.com/clockworks/tiktok-scraper)               |
|                                                                                 |                                                                                     | [`apify_facebook_posts_scraper`](https://apify.com/apify/facebook-posts-scraper)    |

## Tips for production

- Tune `timeout_secs` on Actor runs. The default of 300 seconds is fine for small jobs. Raise it to 600+ when crawling large sites or scraping high-volume datasets.
- Paginate datasets with `apify_get_dataset_items` using `limit` and `offset` instead of fetching everything in one call when results can run into the thousands.
- Pin Actor versions when stability matters. Use `actor_id` in the form `username/actor-name:1.2.3` to lock to a specific build.
- Watch Actor costs in [Apify Console](https://console.apify.com/). Agentic loops can call Actors multiple times per user request. Set a billing limit if you're concerned.
- Keep tool sets small. If your agent only needs to search Google and scrape one URL, register exactly those two tools, not `APIFY_SEARCH_TOOLS` or `APIFY_ALL_TOOLS`.

## Troubleshooting

| Problem                                         | Cause                                | Fix                                                                                                |
| ----------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `APIFY_TOKEN environment variable is not set`   | Token not configured                 | Run `export APIFY_TOKEN=your_token` before executing your script.                                  |
| `apify-client package is required`              | Missing dependency                   | Run `pip install strands-apify`.                                                                   |
| Actor run finishes with status `FAILED`         | Invalid input or Actor error         | Check the Actor input parameters and run logs in [Apify Console](https://console.apify.com).       |
| Actor run finishes with status `TIMED-OUT`      | Timeout too short for the workload   | Increase the `timeout_secs` parameter (use 600+ for large crawls).                                 |
| Agent selects the wrong tool                    | Too many tools registered            | Reduce the number of tools, make the prompt more specific, or use a more capable model.            |
| Empty results from social media tools           | Private or geo-restricted profile    | Verify the profile is public. Test with a known public account first.                              |

## Resources

- [Strands Agents SDK documentation](https://strandsagents.com/)
- [Strands Agents GitHub repository](https://github.com/strands-agents/sdk-python)
- [strands-apify on PyPI](https://pypi.org/project/strands-apify/)
- [strands-apify GitHub repository](https://github.com/apify/strands-apify)
- [Apify Store](https://apify.com/store)
- [Apify API reference](https://docs.apify.com/api/v2)
