---
title: Make - LLMs Actor integration
description: Learn about LLM browser modules. Search the web and extract clean Markdown for AI assistants and RAG.
sidebar_label: LLMs
sidebar_position: 7
slug: /integrations/make/llm
toc_max_heading_level: 4
---

## Apify Scraper for LLMs

Apify Scraper for LLMs from [Apify](https://apify.com) is a web browsing module for OpenAI Assistants, RAG pipelines, and AI agents. It can query Google Search, scrape the top results, and return page content as Markdown for downstream AI processing.

To use these modules, you need an [Apify account](https://console.apify.com) and an [API token](https://docs.apify.com/platform/integrations/api#api-token). You can find your token in the Apify Console under **Settings > Integrations**. After connecting, you can automate content extraction and integrate results into your AI workflows.

## Connect Apify Scraper for LLMs

1. Create an account at [Apify](https://console.apify.com/). You can sign up using your email, Gmail, or GitHub account.

   <!-- TODO: Add signup screenshot. Suggested path: images/llm/signup.png -->

1. To connect your Apify account to Make, you can use an OAuth connection (recommended) or an Apify API token. To get the token, go to **[Settings > API & Integrations](https://console.apify.com/settings/integrations)** in the Apify Console.

   <!-- TODO: Add console token screenshot. You can reuse: images/Apify_Console_token_for_Make.png -->

1. Find your token under **Personal API tokens**. You can also create a new token with custom permissions by clicking **+ Create a new token**.
1. Click the **Copy** icon to copy your API token, then return to your Make scenario.

   <!-- TODO: Add Make token connection screenshot. You can reuse: images/Apify_token_on_Make.png -->

1. In Make, click **Add** to open the **Create a connection** dialog of the chosen Apify Scraper module.
1. In the **API token** field, paste your token, provide a clear **Connection name**, and click **Save**.

   <!-- TODO: Add Make connection dialog screenshot. Suggested path: images/llm/make-connection.png -->

Once connected, you can build workflows that search the web, extract content, and pass it to your AI applications.

## Apify Scraper for LLMs modules

After connecting the app, you can use two modules to search and extract content.

### Standard Settings module

Use Standard Settings to quickly search the web and extract content with optimized defaults. This is ideal for AI agents that need to answer questions or gather information from multiple sources.

The module supports two modes:

- _Search mode_ (keywords)
  - Queries Google Search with your keywords (supports advanced operators)
  - Retrieves the top N organic results
  - Loads each result and extracts the main content
  - Returns Markdown-formatted content

- _Direct URL mode_ (URL)
  - Navigates to a specific URL
  - Extracts page content
  - Skips Google Search

#### How it works

When you provide keywords, the module runs Google Search, parses the results, and collects organic URLs. For content extraction, it loads pages, waits for dynamic content to render, removes clutter, extracts the main content, and converts it to Markdown. Finally, it generates output by combining content, adding metadata and sources, and formatting everything for AI consumption.

#### Output data

```json title="Standard Settings output (shortened)"
{
  "query": "web browser for RAG pipelines -site:reddit.com",
  "crawl": {
    "httpStatusCode": 200,
    "httpStatusMessage": "OK",
    "loadedAt": "2025-06-30T10:15:23.456Z",
    "uniqueKey": "https://example.com/article",
    "requestStatus": "handled"
  },
  "searchResult": {
    "title": "Building RAG Pipelines with Web Browsers",
    "description": "Integrate web browsing into your RAG pipeline for real-time retrieval.",
    "url": "https://example.com/article",
    "resultType": "organic",
    "rank": 1
  },
  "metadata": {
    "title": "Building RAG Pipelines with Web Browsers",
    "description": "Add web browsing to RAG systems",
    "languageCode": "en",
    "url": "https://example.com/article"
  },
  "markdown": "# Building RAG Pipelines with Web Browsers\n\n..."
}
```

#### Configuration (Standard Settings)

- _Search query_: Google Search keywords or a direct URL
- _Maximum results_: Number of top search results to process (default: 3)
- _Output formats_: Markdown, text, or HTML
- _Remove cookie warnings_: Dismiss cookie consent dialogs
- _Debug mode_: Enable extraction diagnostics

### Advanced Settings module

Advanced Settings give you full control over search and extraction. Use it for complex sites or production RAG pipelines.

#### Key features

- _Advanced search options_: full Google operator support
- _Flexible crawling tools_: browser-based (Playwright) or HTTP-based (Cheerio)
- _Proxy configuration_: handle geo-restrictions and rate limits
- _Granular content control_: include, remove, and click selectors
- _Dynamic content handling_: wait strategies for JavaScript rendering
- _Multiple output formats_: Markdown, HTML, or text
- _Request management_: timeouts, retries, and concurrency

#### Configuration options

- _Search_: query, max results (1–100), SERP proxy group, SERP retries
- _Scraping_: tool (browser-playwright, raw-http), HTML transformer, selectors (remove/keep/click), expand clickable elements
- _Requests_: timeouts, retries, dynamic content wait
- _Proxy_: use Apify Proxy, proxy groups, countries
- _Output_: formats, save HTML/Markdown, debug mode, save screenshots

#### Output data

```json title="Advanced Settings output (shortened)"
{
  "query": "advanced RAG implementation strategies",
  "crawl": {
    "httpStatusCode": 200,
    "httpStatusMessage": "OK",
    "loadedUrl": "https://ai-research.com/rag-strategies",
    "loadedTime": "2025-06-30T10:45:12.789Z",
    "referrerUrl": "https://www.google.com/search?q=advanced+RAG+implementation+strategies",
    "uniqueKey": "https://ai-research.com/rag-strategies",
    "requestStatus": "handled",
    "depth": 0
  },
  "searchResult": {
    "title": "Advanced RAG Implementation: A Complete Guide",
    "description": "Cutting-edge strategies for RAG systems.",
    "url": "https://ai-research.com/rag-strategies",
    "resultType": "organic",
    "rank": 1
  },
  "metadata": {
    "canonicalUrl": "https://ai-research.com/rag-strategies",
    "title": "Advanced RAG Implementation: A Complete Guide | AI Research",
    "description": "Vector DBs, chunking, and optimization techniques.",
    "languageCode": "en"
  },
  "markdown": "# Advanced RAG Implementation: A Complete Guide\n\n...",
  "debug": {
    "extractorUsed": "readableText",
    "elementsRemoved": 47,
    "elementsClicked": 3
  }
}
```

### Use cases

- Quick information retrieval for AI assistants
- General web search integration and Q&A
- Production RAG pipelines that need reliability
- Extracting content from JavaScript-heavy sites
- Building specialized knowledge bases and research workflows

### Best practices

To get the best search results, use specific keywords and operators, and exclude unwanted domains with `-site:`. For better performance, use HTTP mode for static sites and only switch to browser mode when necessary. You can also tune concurrency settings based on your needs. To maintain content quality, remove non-content elements, choose the right HTML transformer, and enable debug mode when troubleshooting. Finally, ensure reliable operation by setting appropriate timeouts and retries, and monitoring HTTP status codes for errors.

## Other scrapers available

There are other native Make Apps powered by Apify. You can check out Apify Scraper for:

- [TikTok Data](/platform/integrations/make/tiktok)
- [Google Search](/platform/integrations/make/search)
- [Google Maps Emails Data](/platform/integrations/make/maps)
- [YouTube Data](/platform/integrations/make/youtube)
- [AI crawling](/platform/integrations/make/ai-crawling)
- [Amazon](/platform/integrations/make/amazon)

And more! Because you can access any of thousands of our scrapers on Apify Store by using the [general Apify connections](https://www.make.com/en/integrations/apify).
