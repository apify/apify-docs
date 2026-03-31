---
title: Strands Agents SDK integration
sidebar_label: Strands Agents SDK
description: >-
  Learn how to integrate Apify with the Strands Agents SDK to give your
  AI agents web scraping, search, and social media capabilities.
sidebar_position: 20
slug: /integrations/strands-agents
---

The [Strands Agents SDK](https://github.com/strands-agents/sdk-python) is an open-source Python SDK by AWS for building AI agents. It provides a simple model-tools-prompt pattern where the SDK handles the agentic loop: sending prompts to the model, executing tool calls, and feeding results back until the task is complete.

The [Apify integration for Strands](https://pypi.org/project/strands-agents-tools/) provides 18 ready-made tools across three presets that give your agents web scraping, search, crawling, and social media scraping capabilities through the Apify platform.

## Prerequisites

- **Python 3.10+**
- **Apify API token** - Get yours from the **Integrations** section in [Apify Console](https://console.apify.com/account/integrations)
- **A model provider** - Strands supports multiple providers (Amazon Bedrock, OpenAI, Anthropic, Ollama, and more). You need at least one configured.
- **Required packages**:

    ```bash
    pip install strands-agents strands-agents-tools[apify]
    ```

## Configure your model provider

Strands supports multiple model providers with a single-line swap. Install the provider extra and create a model instance.

### OpenAI

```bash
pip install 'strands-agents[openai]'
```

```python
import os
from strands.models.openai import OpenAIModel

model = OpenAIModel(
    client_args={"api_key": os.getenv("OPENAI_API_KEY")},
    model_id="gpt-4o",
)
```

### Anthropic

```bash
pip install 'strands-agents[anthropic]'
```

```python
import os
from strands.models.anthropic import AnthropicModel

model = AnthropicModel(
    client_args={"api_key": os.getenv("ANTHROPIC_API_KEY")},
    model_id="claude-sonnet-4-20250514",
    max_tokens=1024,
)
```

### Ollama (local)

```bash
pip install 'strands-agents[ollama]'
ollama pull qwen3.5
```

```python
from strands.models.ollama import OllamaModel

model = OllamaModel(host="http://localhost:11434", model_id="qwen3.5")
```

:::tip Other providers

Strands also supports Amazon Bedrock (the default provider), Google Gemini, LiteLLM, and LMStudio. See the [Strands model providers documentation](https://strandsagents.com/latest/user-guide/concepts/model-providers/overview/) for the full list.

:::

## Use Apify tools with Strands Agents

### Set up the environment

Export your Apify API token:

```bash
export APIFY_API_TOKEN=your_api_token_here
```

### Import tool presets

The integration provides three tool presets:

| Preset | Tools | Capabilities |
|--------|-------|--------------|
| `APIFY_CORE_TOOLS` | 6 | Run Actors, run tasks, fetch datasets, scrape URLs |
| `APIFY_SEARCH_TOOLS` | 5 | Google Search, Google Maps, YouTube, website crawling, e-commerce |
| `APIFY_SOCIAL_TOOLS` | 7 | Instagram, LinkedIn, Twitter/X, TikTok, Facebook |

Import a preset and pass it to an agent:

```python
from strands import Agent
from strands_tools.apify import APIFY_CORE_TOOLS

agent = Agent(model=model, tools=APIFY_CORE_TOOLS)
```

You can also import individual tools for a more focused agent:

```python
from strands_tools.apify import apify_scrape_url, apify_google_search_scraper

agent = Agent(model=model, tools=[apify_scrape_url, apify_google_search_scraper])
```

:::tip Focused tool sets

Keep the tool set small and relevant to the task. Registering too many tools at once can overwhelm the model, leading to degraded reasoning or incorrect tool selection.

:::

### Build a web research agent

This example creates an agent that searches Google and then scrapes the top result to produce a summary:

```python
import os
from strands import Agent
from strands.models.openai import OpenAIModel
from strands_tools.apify import apify_google_search_scraper, apify_scrape_url

model = OpenAIModel(
    client_args={"api_key": os.getenv("OPENAI_API_KEY")},
    model_id="gpt-4o",
)

agent = Agent(model=model, tools=[apify_google_search_scraper, apify_scrape_url])

agent(
    "Search Google for 'Strands Agents SDK AWS' and return the top 3 results. "
    "Then scrape the first result and summarize the page content."
)
```

The agent automatically chains the two tools: it runs a Google search first, then scrapes the top result URL and produces a summary.

### Build a social media monitoring agent

This example uses the social media preset to scrape recent posts from a Twitter/X account:

```python
import os
from strands import Agent
from strands.models.openai import OpenAIModel
from strands_tools.apify import apify_twitter_scraper, apify_instagram_scraper

model = OpenAIModel(
    client_args={"api_key": os.getenv("OPENAI_API_KEY")},
    model_id="gpt-4o",
)

agent = Agent(model=model, tools=[apify_twitter_scraper, apify_instagram_scraper])

agent("Find the latest 10 tweets mentioning #WebScraping and summarize the main topics.")
```

### Combine tool presets

Mix presets or pick individual tools from different groups to match your use case:

```python
from strands_tools.apify import APIFY_CORE_TOOLS, apify_instagram_scraper

agent = Agent(
    model=model,
    tools=[*APIFY_CORE_TOOLS, apify_instagram_scraper],
)
```

## Available tools

### Core tools (`APIFY_CORE_TOOLS`)

- `apify_run_actor` - Run any [Apify Actor](https://apify.com/store) by ID with custom input
- `apify_get_dataset_items` - Fetch items from an Apify dataset with pagination
- `apify_run_actor_and_get_dataset` - Run an Apify Actor and fetch its dataset results in one call
- `apify_run_task` - Run a saved [Actor task](/platform/actors/running/tasks) with optional input overrides
- `apify_run_task_and_get_dataset` - Run a task and fetch its dataset results in one call
- `apify_scrape_url` - Scrape a single URL using [Website Content Crawler](https://apify.com/apify/website-content-crawler) and return markdown

### Search and crawling tools (`APIFY_SEARCH_TOOLS`)

- `apify_google_search_scraper` - Search Google and return structured results using [Google Search Scraper](https://apify.com/apify/google-search-scraper)
- `apify_google_places_scraper` - Search Google Maps for businesses and places using [Google Maps Scraper](https://apify.com/compass/crawler-google-places)
- `apify_youtube_scraper` - Scrape YouTube videos, channels, or search results using [YouTube Scraper](https://apify.com/streamers/youtube-scraper)
- `apify_website_content_crawler` - Crawl a website and extract content from multiple pages using [Website Content Crawler](https://apify.com/apify/website-content-crawler)
- `apify_ecommerce_scraper` - Scrape product data from e-commerce sites using [E-commerce Scraping Tool](https://apify.com/apify/e-commerce-scraping-tool)

### Social media tools (`APIFY_SOCIAL_TOOLS`)

- `apify_instagram_scraper` - Scrape Instagram profiles, posts, reels, or hashtags using [Instagram Scraper](https://apify.com/apify/instagram-scraper)
- `apify_linkedin_profile_posts` - Scrape recent posts from a LinkedIn profile using [LinkedIn Profile Posts](https://apify.com/apimaestro/linkedin-profile-posts)
- `apify_linkedin_profile_search` - Search for LinkedIn profiles by keywords using [LinkedIn Profile Search](https://apify.com/harvestapi/linkedin-profile-search)
- `apify_linkedin_profile_detail` - Get detailed LinkedIn profile information using [LinkedIn Profile Detail](https://apify.com/apimaestro/linkedin-profile-detail)
- `apify_twitter_scraper` - Scrape tweets by search query or specific URLs using [Twitter Scraper Lite](https://apify.com/apidojo/twitter-scraper-lite)
- `apify_tiktok_scraper` - Scrape TikTok videos, profiles, or hashtags using [TikTok Scraper](https://apify.com/clockworks/tiktok-scraper)
- `apify_facebook_posts_scraper` - Scrape posts from a Facebook page or profile using [Facebook Posts Scraper](https://apify.com/apify/facebook-posts-scraper)

For full parameter details on each tool, see the [Strands Apify tools documentation](https://strandsagents.com/latest/user-guide/concepts/tools/built-in-tools/apify/).

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| `APIFY_API_TOKEN environment variable is not set` | Token not configured | Run `export APIFY_API_TOKEN=your_token` before executing your script |
| `apify-client package is required` | Missing dependency | Run `pip install strands-agents-tools[apify]` |
| Actor run finishes with status `FAILED` | Invalid input or Actor error | Check the Actor input parameters and run logs in [Apify Console](https://console.apify.com) |
| Actor run finishes with status `TIMED-OUT` | Timeout too short for the workload | Increase the `timeout_secs` parameter (use 600+ for large crawls) |
| Agent selects the wrong tool | Too many tools registered | Reduce the number of tools, make the prompt more specific, or use a more capable model |
| Empty results from social media tools | Private or geo-restricted profile | Verify the profile is public. Test with a known public account first. |

## Full example

```python
import os

from strands import Agent
from strands.models.openai import OpenAIModel
from strands_tools.apify import apify_google_search_scraper, apify_scrape_url

# Configure the model
model = OpenAIModel(
    client_args={"api_key": os.getenv("OPENAI_API_KEY")},
    model_id="gpt-4o",
)

# Create an agent with search and scraping tools
agent = Agent(model=model, tools=[apify_google_search_scraper, apify_scrape_url])

# Run a multi-step research task
agent(
    "Search Google for 'Strands Agents SDK AWS' and return the top 3 results. "
    "Then scrape the first result and summarize the page content in 3 bullet points."
)
```

## Resources

- [Strands Agents SDK documentation](https://strandsagents.com/)
- [Strands Agents SDK GitHub repository](https://github.com/strands-agents/sdk-python)
- [Strands Agents Tools on PyPI](https://pypi.org/project/strands-agents-tools/)
- [Strands Agents Tools GitHub repository](https://github.com/strands-agents/tools)
- [Apify Store](https://apify.com/store) - Browse 4,000+ ready-made Actors
- [Apify API reference](https://docs.apify.com/api/v2)
