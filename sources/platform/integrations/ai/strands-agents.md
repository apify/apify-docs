---
title: Strands Agents SDK integration
sidebar_label: Strands Agents SDK
description: >-
  Integrate Apify with the Strands Agents SDK to give your AI agents web
  scraping, search, crawling, and social media capabilities through 18 prebuilt tools.
sidebar_position: 20
slug: /integrations/strands-agents
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

The [Strands Agents SDK](https://github.com/strands-agents/sdk-python) is an open-source Python SDK by AWS for building AI agents. It follows a model-tools-prompt pattern: the SDK sends the prompt to the model, executes any tool calls the model requests, and feeds the results back until the task is complete.

The [strands-apify](https://pypi.org/project/strands-apify/) package provides 18 tools grouped into three tool sets, giving your agent scraping, crawling, search, and social media capabilities through the [Apify platform](https://apify.com/).

<ThirdPartyDisclaimer />

## Prerequisites

- Python 3.10 or newer
- [An Apify account](https://console.apify.com) and Apify API token from the [Integrations](https://console.apify.com/settings/integrations) page in Apify Console
- At least one model provider configured. Strands supports Amazon Bedrock, OpenAI, Anthropic, Google Gemini, Ollama, LiteLLM, and LMStudio.

## Installation

Install the Strands SDK and the Apify tools:

```bash
pip install strands-agents strands-apify
```

Export your Apify API token:

```bash
export APIFY_TOKEN=your_apify_api_token_here
```

:::tip Keep your token out of source code

Use a `.env` file or your secrets manager in production. Never commit `APIFY_TOKEN` to a repository.

:::

## Environment variables

The package reads the following environment variables:

| Variable | Description | Required |
| --- | --- | --- |
| `APIFY_TOKEN` | Apify API token used to authorize Actor runs and dataset reads. | Yes |
| `STRANDS_APIFY_QUIET` | Set to `1` to suppress the diagnostic panel printed on each tool call. Auto-suppressed in non-interactive environments. | No |

## Configure your model provider

Install the matching extra, set the provider's API key, and create a `model` instance to pass to your agent.

### Amazon Bedrock

Bedrock is the default provider and ships with the base `strands-agents` install. Configure your AWS credentials with `aws configure` or environment variables before running your agent. See the [Bedrock provider docs](https://strandsagents.com/docs/user-guide/concepts/model-providers/amazon-bedrock/) for the full configuration reference.

```python
from strands.models import BedrockModel

model = BedrockModel(model_id="global.anthropic.claude-sonnet-4-6", region_name="us-west-2")
```

### OpenAI

See the [OpenAI provider docs](https://strandsagents.com/docs/user-guide/concepts/model-providers/openai/) for the full configuration reference.

```bash
pip install 'strands-agents[openai]'
export OPENAI_API_KEY=your_openai_key
```

```python
import os
from strands.models.openai import OpenAIModel

model = OpenAIModel(
    client_args={"api_key": os.getenv("OPENAI_API_KEY")},
    model_id="gpt-4.1",
)
```

### Anthropic

See the [Anthropic provider docs](https://strandsagents.com/docs/user-guide/concepts/model-providers/anthropic/) for the full configuration reference.

```bash
pip install 'strands-agents[anthropic]'
export ANTHROPIC_API_KEY=your_anthropic_key
```

```python
import os
from strands.models.anthropic import AnthropicModel

model = AnthropicModel(
    client_args={"api_key": os.getenv("ANTHROPIC_API_KEY")},
    model_id="claude-sonnet-4-6",
    max_tokens=1024,
)
```

### Ollama (local)

No API key required. See the [Ollama provider docs](https://strandsagents.com/docs/user-guide/concepts/model-providers/ollama/) for the full configuration reference.

```bash
pip install 'strands-agents[ollama]'
ollama pull qwen3.5
```

```python
from strands.models.ollama import OllamaModel

model = OllamaModel(host="http://localhost:11434", model_id="qwen3.5")
```

:::tip Other providers

Strands also supports Google Gemini, LiteLLM, and LMStudio. See the [Strands model providers documentation](https://strandsagents.com/docs/user-guide/concepts/model-providers/) for the full list.

:::

## Quick start

This example scrapes a single URL and summarizes it:

```python
from strands import Agent
from strands_apify import apify_scrape_url

agent = Agent(model=model, tools=[apify_scrape_url])

agent("Scrape https://docs.apify.com and summarize the page in three bullet points.")
```

The agent calls `apify_scrape_url`, returns markdown to the model, and the model produces the summary.

## Choose the right tool set

`strands-apify` provides 18 tools split across three tool sets:

| Tool set             | Tools | Use case                                                                                |
| -------------------- | ----- | --------------------------------------------------------------------------------------- |
| `APIFY_CORE_TOOLS`   | 6     | Run any Actor or saved task, fetch dataset items, scrape single URLs to markdown        |
| `APIFY_SEARCH_TOOLS` | 5     | Google Search, Google Maps, YouTube, multi-page website crawling, e-commerce            |
| `APIFY_SOCIAL_TOOLS` | 7     | Instagram, LinkedIn, Twitter/X, TikTok, Facebook                                        |

LLMs select tools based on their names and descriptions. More tools means a larger decision space, which can lead to wrong tool selection, slower responses, and higher token usage. Register only the tools your agent needs.

Three ways to import tools:

1. Import a whole tool set when your agent needs the full category:

    ```python
    from strands import Agent
    from strands_apify import APIFY_CORE_TOOLS

    agent = Agent(model=model, tools=APIFY_CORE_TOOLS)
    ```

1. Import individual tools for tighter control:

    ```python
    from strands_apify import apify_scrape_url, apify_google_search_scraper

    agent = Agent(model=model, tools=[apify_scrape_url, apify_google_search_scraper])
    ```

1. Mix tool sets with individual tools:

    ```python
    from strands_apify import APIFY_CORE_TOOLS, apify_twitter_scraper

    agent = Agent(model=model, tools=[*APIFY_CORE_TOOLS, apify_twitter_scraper])
    ```

:::caution Avoid `APIFY_ALL_TOOLS` in production

`APIFY_ALL_TOOLS` bundles every tool from all three tool sets. Registering 18 tools at once degrades model accuracy. Use a focused tool set in production.

:::

## Examples

### Web research agent

This agent searches Google, scrapes the top result, and summarizes it:

```python
import os
from strands import Agent
from strands.models.openai import OpenAIModel
from strands_apify import apify_google_search_scraper, apify_scrape_url

model = OpenAIModel(
    client_args={"api_key": os.getenv("OPENAI_API_KEY")},
    model_id="gpt-4.1",
)

agent = Agent(model=model, tools=[apify_google_search_scraper, apify_scrape_url])

agent(
    "Search Google for 'Strands Agents SDK AWS' and return the top 3 results. "
    "Then scrape the first result and summarize the page content in 3 bullet points."
)
```

### Social media monitoring agent

This agent fetches recent tweets and Instagram posts on a topic:

```python
from strands import Agent
from strands_apify import apify_twitter_scraper, apify_instagram_scraper

agent = Agent(model=model, tools=[apify_twitter_scraper, apify_instagram_scraper])

agent("Find the latest 10 tweets mentioning #WebScraping and summarize the main topics.")
```

### Run any Actor from Apify Store

The pre-built tools cover the most common use cases, but [Apify Store](https://apify.com/store) has thousands of Actors. Use `apify_run_actor_and_get_dataset` to give your agent access to any of them.

Unlike pre-built tools (like `apify_google_search_scraper`) that expose typed parameters, `apify_run_actor_and_get_dataset` requires you to provide the Actor's input JSON directly. Your prompt must include the correct input shape.

1. Find the Actor on [Apify Store](https://apify.com/store).
1. Check the **Input** tab for the expected JSON schema.
1. Include the Actor ID and the input JSON in your agent prompt.

```python
from strands import Agent
from strands_apify import apify_run_actor_and_get_dataset

agent = Agent(model=model, tools=[apify_run_actor_and_get_dataset])

agent(
    "Run the Apify Actor 'apify/rag-web-browser' with input "
    '{"query": "latest AI safety research", "maxResults": 5} '
    "and summarize the results."
)
```

For long-running Actors (large crawls, datasets with thousands of items), increase `timeout_secs` in your prompt - the default is 300 seconds:

```python
agent(
    "Run 'apify/website-content-crawler' with input "
    '{"startUrls": [{"url": "https://docs.example.com"}], "maxCrawlPages": 100} '
    "with timeout_secs=600 and summarize the crawled pages."
)
```

:::note Include Actor input fields in your prompt

The agent passes `run_input` as a JSON object to the Actor. For Actors with complex input schemas, spell out the required fields directly in your prompt so the model knows exactly what to provide.

:::

## Tool reference

This section lists every tool in `strands-apify` with its parameters, default values, and an example prompt you can use directly in your agent.

### Core tools

The following tools are included in the `APIFY_CORE_TOOLS` tool set. They cover running Actors, fetching dataset items, scraping single URLs, and executing saved tasks.

#### `apify_scrape_url`

Scrape a single URL and return its content as markdown. No Actor input schema needed.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `url` | `str` | *required* | The URL to scrape (must include `http://` or `https://`) |
| `timeout_secs` | `int` | `120` | Maximum wait time in seconds |
| `crawler_type` | `str` | `"cheerio"` | Engine: `"cheerio"` (fast, no JS), `"playwright:adaptive"` (renders JS when needed), `"playwright:firefox"` (full JS, best anti-bot bypass) |

Example prompt:

```text
Scrape https://docs.apify.com/academy and summarize the page.
```

#### `apify_run_actor`

Run any Actor from [Apify Store](https://apify.com/store) and return run metadata only (run ID, status, dataset ID). Use this when you need the run metadata but will fetch results separately with `apify_get_dataset_items`.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `actor_id` | `str` | *required* | Actor identifier in `"username/actor-name"` format |
| `run_input` | `dict` | `None` | JSON-serializable input matching the Actor's input schema |
| `timeout_secs` | `int` | `300` | Maximum wait time in seconds |
| `memory_mbytes` | `int` | `None` | Memory allocation in MB (uses Actor default if not set) |
| `build` | `str` | `None` | Build tag or number to pin a specific Actor version |

To find the input schema, open the Actor's page on [Apify Store](https://apify.com/store) and check the **Input** tab. The `run_input` JSON object must match that schema.

Example prompt:

```text
Run the Actor 'apify/website-content-crawler' with input {"startUrls": [{"url": "https://example.com"}], "maxCrawlPages": 5} and return the run metadata.
```

#### `apify_run_actor_and_get_dataset`

Run any Actor and fetch its dataset results in a single call. Provides access to thousands of Actors in Apify Store, but requires you to provide the Actor's input JSON.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `actor_id` | `str` | *required* | Actor identifier in `"username/actor-name"` format |
| `run_input` | `dict` | `None` | JSON-serializable input matching the Actor's input schema |
| `timeout_secs` | `int` | `300` | Maximum wait time in seconds |
| `memory_mbytes` | `int` | `None` | Memory allocation in MB (uses Actor default if not set) |
| `build` | `str` | `None` | Build tag or number to pin a specific Actor version |
| `dataset_items_limit` | `int` | `100` | Maximum dataset items to return |
| `dataset_items_offset` | `int` | `0` | Items to skip (for pagination) |

Example prompt:

```text
Run the Actor 'apify/rag-web-browser' with input {"query": "latest AI safety research", "maxResults": 5} and summarize the results.
```

:::tip How to use this tool effectively

1. Browse [Apify Store](https://apify.com/store) and find the Actor you need.
1. Open the Actor's page and check the **Input** tab for the JSON schema.
1. In your agent prompt, provide the Actor ID and the input as a JSON object.
1. There is no schema validation on the agent side. The input must match what the Actor expects.

:::

#### `apify_get_dataset_items`

Fetch items from an existing Apify dataset. Use this after `apify_run_actor` to retrieve results, or to paginate through large datasets.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `dataset_id` | `str` | *required* | The dataset ID (returned by `apify_run_actor`) |
| `limit` | `int` | `100` | Maximum items to return |
| `offset` | `int` | `0` | Items to skip (for pagination) |

Example prompt:

```text
Fetch the first 50 items from dataset ID 'abc123' and summarize the key findings.
```

#### `apify_run_task`

Run a saved [Actor task](/platform/actors/running/tasks) with optional input overrides. Tasks are pre-configured Actor runs saved in Apify Console.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `task_id` | `str` | *required* | Task identifier in `"username/task-name"` format or a task ID |
| `task_input` | `dict` | `None` | Optional input fields to override the task's saved defaults |
| `timeout_secs` | `int` | `300` | Maximum wait time in seconds |
| `memory_mbytes` | `int` | `None` | Memory allocation in MB (uses task default if not set) |

Example prompt:

```text
Run my saved task 'john/daily-news-scrape' and return the run status.
```

#### `apify_run_task_and_get_dataset`

Run a saved task and fetch its dataset results in one call.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `task_id` | `str` | *required* | Task identifier in `"username/task-name"` format or a task ID |
| `task_input` | `dict` | `None` | Optional input fields to override the task's saved defaults |
| `timeout_secs` | `int` | `300` | Maximum wait time in seconds |
| `memory_mbytes` | `int` | `None` | Memory allocation in MB (uses task default if not set) |
| `dataset_items_limit` | `int` | `100` | Maximum dataset items to return |
| `dataset_items_offset` | `int` | `0` | Items to skip (for pagination) |

Example prompt:

```text
Run my task 'john/daily-news-scrape' and summarize the top 10 results.
```

---

### Search and crawling tools

The following tools are included in the `APIFY_SEARCH_TOOLS` tool set. They cover Google Search, Google Maps, YouTube, multi-page website crawling, and e-commerce scraping.

#### `apify_google_search_scraper`

Search Google and return structured results (organic links, ads, People Also Ask). Uses [Google Search Scraper](https://apify.com/apify/google-search-scraper).

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `search_query` | `str` | *required* | Google search query. Supports operators like `site:`, `"exact phrase"`, `OR` |
| `results_limit` | `int` | `10` | Maximum results to return (multiples of 10 trigger extra pages) |
| `country_code` | `str` | `None` | Two-letter country code for localized results (e.g. `"us"`, `"de"`) |
| `language_code` | `str` | `None` | Two-letter language code (e.g. `"en"`, `"es"`) |
| `timeout_secs` | `int` | `300` | Maximum wait time in seconds |

Example prompt:

```text
Search Google for 'best python web frameworks 2025' and return the top 5 results.
```

#### `apify_google_places_scraper`

Search Google Maps for businesses and places, optionally with reviews. Uses [Google Maps Scraper](https://apify.com/compass/crawler-google-places).

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `search_query` | `str` | *required* | Google Maps search query (e.g. `"restaurants in Prague"`) |
| `results_limit` | `int` | `20` | Maximum places to return |
| `language` | `str` | `None` | Language for results (e.g. `"en"`, `"de"`) |
| `include_reviews` | `bool` | `False` | Whether to include user reviews |
| `max_reviews` | `int` | `5` | Reviews per place (only used when `include_reviews=True`) |
| `timeout_secs` | `int` | `300` | Maximum wait time in seconds |

Example prompt:

```text
Find the top-rated Italian restaurants in Berlin with reviews.
```

#### `apify_youtube_scraper`

Scrape YouTube videos, channels, or search results. Uses [YouTube Scraper](https://apify.com/streamers/youtube-scraper). Provide at least one of `search_query` or `urls`.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `search_query` | `str` | `None` | YouTube search query (e.g. `"python tutorial"`) |
| `urls` | `list[str]` | `None` | Specific YouTube video or channel URLs to scrape |
| `results_limit` | `int` | `20` | Maximum results to return |
| `timeout_secs` | `int` | `300` | Maximum wait time in seconds |

Example prompt:

```text
Search YouTube for 'AWS re:Invent 2025 keynote' and return the top 5 videos with their view counts.
```

#### `apify_website_content_crawler`

Crawl a website and extract content from multiple pages as markdown. Uses [Website Content Crawler](https://apify.com/apify/website-content-crawler). This is the multi-page version - use `apify_scrape_url` for single pages.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `start_url` | `str` | *required* | Starting URL to crawl from |
| `max_pages` | `int` | `10` | Maximum number of pages to crawl |
| `max_depth` | `int` | `2` | Maximum link depth from the start URL |
| `timeout_secs` | `int` | `300` | Maximum wait time in seconds |

Example prompt:

```text
Crawl https://docs.example.com up to 20 pages and summarize the documentation structure.
```

#### `apify_ecommerce_scraper`

Scrape product data from e-commerce sites (Amazon, eBay, Walmart, and others). Uses [E-commerce Scraping Tool](https://apify.com/apify/e-commerce-scraping-tool). The Actor auto-detects the platform.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `url` | `str` | *required* | Product or listing page URL |
| `url_type` | `str` | `"product"` | `"product"` for a single product page, `"listing"` for a category/search results page |
| `results_limit` | `int` | `20` | Maximum products to return (relevant for listings) |
| `timeout_secs` | `int` | `300` | Maximum wait time in seconds |

Example prompt:

```text
Scrape the product details from https://www.amazon.com/dp/B0EXAMPLE and return the title, price, and rating.
```

---

### Social media tools

The following tools are included in the `APIFY_SOCIAL_TOOLS` tool set. They cover Instagram, LinkedIn, Twitter/X, TikTok, and Facebook.

#### `apify_instagram_scraper`

Scrape Instagram profiles, posts, reels, or hashtags. Uses [Instagram Scraper](https://apify.com/apify/instagram-scraper). Provide at least one of `search_query` or `urls`.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `search_query` | `str` | `None` | Username, hashtag, or keyword. If it looks like an Instagram URL, it's treated as a direct URL. |
| `urls` | `list[str]` | `None` | Direct Instagram URLs to scrape (profiles, posts, reels) |
| `results_type` | `str` | `"posts"` | What to scrape: `"posts"`, `"comments"`, or `"details"` (profile metadata) |
| `results_limit` | `int` | `20` | Maximum items per URL or search hit |
| `search_type` | `str` | `"hashtag"` | Search mode: `"hashtag"`, `"user"`, or `"place"` |
| `search_limit` | `int` | `10` | How many search results to process (each yields up to `results_limit` items) |
| `timeout_secs` | `int` | `300` | Maximum wait time in seconds |

Example prompt:

```text
Scrape the latest 15 posts from the hashtag #webdevelopment on Instagram.
```

#### `apify_linkedin_profile_posts`

Scrape recent posts from a LinkedIn profile. Uses [LinkedIn Profile Posts](https://apify.com/apimaestro/linkedin-profile-posts).

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `profile_url` | `str` | *required* | LinkedIn profile URL (e.g. `"https://www.linkedin.com/in/username"`) or bare username |
| `results_limit` | `int` | `20` | Maximum posts to return (capped at 100) |
| `timeout_secs` | `int` | `300` | Maximum wait time in seconds |

Example prompt:

```text
Get the last 10 posts from https://www.linkedin.com/in/satyanadella and summarize the main topics.
```

#### `apify_linkedin_profile_search`

Search for LinkedIn profiles by keywords with optional filters. Uses [LinkedIn Profile Search](https://apify.com/harvestapi/linkedin-profile-search).

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `search_query` | `str` | *required* | Keywords like job titles, skills, or names (e.g. `"software engineer"`) |
| `results_limit` | `int` | `20` | Maximum profiles to return |
| `locations` | `list[str]` | `None` | Filter by locations (e.g. `["San Francisco", "New York"]`) |
| `current_job_titles` | `list[str]` | `None` | Filter by current job title (e.g. `["CTO", "VP Engineering"]`) |
| `profile_scraper_mode` | `str` | `"Short"` | `"Short"` for basic data, `"Full"` for complete profile details (slower) |
| `timeout_secs` | `int` | `300` | Maximum wait time in seconds |

Example prompt:

```text
Find 10 machine learning engineers in London and return their profile summaries.
```

#### `apify_linkedin_profile_detail`

Get full details from a single LinkedIn profile (experience, education, skills). Uses [LinkedIn Profile Detail](https://apify.com/apimaestro/linkedin-profile-detail). No LinkedIn account or cookies required.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `profile_url` | `str` | *required* | LinkedIn profile URL or bare username |
| `include_email` | `bool` | `False` | Include email if publicly available |
| `timeout_secs` | `int` | `300` | Maximum wait time in seconds |

Example prompt:

```text
Get the full profile details for https://www.linkedin.com/in/example-user including their work experience and education.
```

#### `apify_twitter_scraper`

Scrape tweets from Twitter/X by search, handles, or URLs. Uses [Twitter Scraper Lite](https://apify.com/apidojo/twitter-scraper-lite). Supports Twitter advanced search operators. Provide at least one of `search_query`, `urls`, or `twitter_handles`.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `search_query` | `str` | `None` | Search query with support for operators like `from:user`, `#hashtag`, `min_faves:N`, `since:YYYY-MM-DD` |
| `urls` | `list[str]` | `None` | Specific tweet, profile, or list URLs |
| `twitter_handles` | `list[str]` | `None` | Handles without `@` (e.g. `["NASA", "WHO"]`) |
| `results_limit` | `int` | `20` | Maximum tweets to return |
| `sort` | `str` | `"Latest"` | `"Latest"` (chronological) or `"Top"` (most popular) |
| `tweet_language` | `str` | `None` | ISO 639-1 language code (e.g. `"en"`, `"es"`) |
| `timeout_secs` | `int` | `300` | Maximum wait time in seconds |

Example prompt:

```text
Find the latest 20 tweets mentioning #AI from the past week, sorted by most popular.
```

#### `apify_tiktok_scraper`

Scrape TikTok videos by search, hashtag, profile, or direct URL. Uses [TikTok Scraper](https://apify.com/clockworks/tiktok-scraper). Provide at least one of `search_query`, `hashtags`, `profiles`, or `urls`.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `search_query` | `str` | `None` | Keyword to search TikTok |
| `hashtags` | `list[str]` | `None` | Hashtags without `#` (e.g. `["fyp", "cooking"]`) |
| `profiles` | `list[str]` | `None` | TikTok usernames to scrape videos from |
| `urls` | `list[str]` | `None` | Specific TikTok post URLs |
| `results_limit` | `int` | `20` | Maximum videos per source |
| `timeout_secs` | `int` | `300` | Maximum wait time in seconds |

Example prompt:

```text
Scrape the top 10 TikTok videos for the hashtag 'programming' and return their view counts.
```

#### `apify_facebook_posts_scraper`

Scrape posts from a Facebook page or profile. Uses [Facebook Posts Scraper](https://apify.com/apify/facebook-posts-scraper).

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `page_url` | `str` | *required* | Facebook page or profile URL |
| `results_limit` | `int` | `20` | Maximum posts to return |
| `only_posts_newer_than` | `str` | `None` | Date filter: `"2024-01-01"`, `"1 week ago"`, `"3 months ago"` |
| `timeout_secs` | `int` | `300` | Maximum wait time in seconds |

Example prompt:

```text
Get the last 15 posts from https://www.facebook.com/apifytech newer than 1 month ago.
```

## Production environment best practices

- Increase `timeout_secs` to 600+ when crawling large sites or scraping high-volume datasets. The default is 300 seconds.
- Paginate datasets with `apify_get_dataset_items` using `limit` and `offset` instead of fetching everything in one call.
- Pin Actor versions by passing the `build` parameter (e.g. `build="1.2.3"` or `build="beta"`) to `apify_run_actor` / `apify_run_actor_and_get_dataset`.
- Monitor Actor costs in [Apify Console](https://console.apify.com/). Agentic loops can call Actors multiple times per user request. Set a billing limit to control spending.
- Register only the tools your agent needs. For example, if you only search Google and scrape one URL, register exactly those two tools instead of `APIFY_SEARCH_TOOLS` or `APIFY_ALL_TOOLS`.
- The package auto-detects non-interactive environments (CI, Docker, web services, Lambda) and suppresses the rich diagnostic panel. To suppress in interactive shells, set `STRANDS_APIFY_QUIET=1`.

## Troubleshooting

| Problem | Cause | Fix |
| --- | --- | --- |
| `APIFY_TOKEN environment variable is not set` | Token not configured | Run `export APIFY_TOKEN=your_apify_token` before executing your script |
| `apify-client package is required` | Missing dependency | Run `pip install strands-apify` |
| `Invalid URL` or `urls[N]: Invalid URL scheme '...'` | URL is not well-formed http(s) | Confirm the URL has an `http://` or `https://` scheme and a valid host. The index in `urls[N]` points to the offending entry. |
| Actor run finishes with status `FAILED` | Invalid input or Actor error | Check the `statusMessage` in the error text, or check the full run logs in [Apify Console](https://console.apify.com). |
| Actor run finishes with status `TIMED-OUT` | Timeout too short for the workload | Increase the `timeout_secs` parameter (use 600+ for large crawls) |
| Agent selects the wrong tool | Too many tools registered or ambiguous prompt | Reduce the number of registered tools, add more context to the prompt, or use a more capable model |
| Empty results from social media tools | Private or geo-restricted profile | Verify the profile is public. Test with a known public account first. |

## Resources

- [Strands Agents SDK documentation](https://strandsagents.com/)
- [Strands Agents SDK GitHub repository](https://github.com/strands-agents/sdk-python)
- [strands-apify on PyPI](https://pypi.org/project/strands-apify/)
- [strands-apify GitHub repository](https://github.com/apify/strands-apify)
- [Apify Store](https://apify.com/store)
- [Apify API reference](https://docs.apify.com/api/v2)
