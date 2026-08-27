---
title: 🦜🔗 LangChain integration
sidebar_label: LangChain
description: Learn how to integrate Apify with LangChain to feed vector databases and large language models with web data crawled from the web using Actors.
slug: /integrations/langchain
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

> For more information on LangChain visit its [documentation](https://docs.langchain.com/oss/python/langchain/overview). The Apify integration lives in the [langchain-apify](https://github.com/apify/langchain-apify) repository.

<ThirdPartyDisclaimer />

The `langchain-apify` package connects Apify Actors to LangChain. Use it to pull live web data into a vector index for retrieval, or to give an agent a set of scraping tools it can call on its own.

Start with the [quick start](#quick-start) to scrape a single URL and confirm your setup. Then [load web data into a vector index](#load-web-data-into-a-vector-index) to crawl a site and answer questions from it, [use Actors as LangChain tools](#use-actors-as-langchain-tools) to bind search, crawling, and social media tools to an agent, or browse the [tool reference](#tool-reference) to list all 19 tools and the Actor each one wraps. For stateful or multi-agent workflows, see the [LangGraph integration](/integrations/langgraph), which uses the same package.

:::info Python only

The `langchain-apify` package is currently available for Python only.

:::

## Quick start

Install the package:

```bash
pip install langchain-apify
```

Then scrape a page to markdown with a single tool. This needs no LLM and no OpenAI key:

```python
import os

from langchain_apify import ApifyScrapeUrlTool

os.environ["APIFY_TOKEN"] = "Your Apify API token"

tool = ApifyScrapeUrlTool()
print(tool.invoke({"url": "https://docs.apify.com"}))
```

Find your token in [Apify Console](https://console.apify.com/settings/integrations). The tool returns a JSON string holding the run's metadata and the scraped markdown, in the single item's `content` field.

## Load web data into a vector index

In this example, we'll use the [Website Content Crawler](https://apify.com/apify/website-content-crawler) Actor, which can deeply crawl websites such as documentation, knowledge bases, help centers, or blogs and extract text content from the web pages.
Then we feed the documents into a vector index and answer questions from it.

### Install the packages

Before we start with the integration, we need to install all dependencies:

```bash
pip install langchain-openai langchain-apify
```

### Import the packages

First, import all required packages:

```python
import os

from langchain_apify import ApifyWrapper
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.vectorstores import InMemoryVectorStore
from langchain_openai import ChatOpenAI
from langchain_openai.embeddings import OpenAIEmbeddings
```

### Set the environment variables

Find your [Apify API token](https://console.apify.com/settings/integrations) and [OpenAI API key](https://platform.openai.com/account/api-keys) and initialize them as environment variables:

```python
os.environ["OPENAI_API_KEY"] = "Your OpenAI API key"
os.environ["APIFY_TOKEN"] = "Your Apify API token"
```

### Crawl a website

Run the Actor, wait for it to finish, and fetch its results from the Apify dataset into a LangChain document loader:

```python
apify = ApifyWrapper()
llm = ChatOpenAI(model="gpt-5.4-mini")

loader = apify.call_actor(
    actor_id="apify/website-content-crawler",
    run_input={"startUrls": [{"url": "https://docs.langchain.com/oss/python/langchain/quickstart"}], "maxCrawlPages": 10, "crawlerType": "cheerio"},
    dataset_mapping_function=lambda item: Document(
        page_content=item["text"] or "", metadata={"source": item["url"]}
    ),
)
```

:::note Crawling may take some time

The Actor call may take some time as it crawls the LangChain documentation website.

:::

The `dataset_mapping_function` converts each raw Apify dataset item into a LangChain `Document`, mapping dataset fields (for example `text` and `url`) onto the `Document`'s `page_content` and `metadata`. Whatever keys the function assigns to `metadata` are the ones available downstream.

#### Load results from an existing dataset

If the results are already in an Apify dataset, skip the Actor call and load them directly with `ApifyDatasetLoader`, passing the dataset ID and the same kind of mapping function:

```python
from langchain_apify import ApifyDatasetLoader
from langchain_core.documents import Document

loader = ApifyDatasetLoader(
    dataset_id="your-dataset-id",
    dataset_mapping_function=lambda item: Document(
        page_content=item["text"] or "", metadata={"source": item["url"]}
    ),
)
documents = loader.load()
```

### Build and query the vector index

Initialize the vector index from the crawled documents:

```python
vector_store = InMemoryVectorStore.from_documents(loader.load(), OpenAIEmbeddings())
retriever = vector_store.as_retriever()

prompt = ChatPromptTemplate.from_template(
    "Answer the question using only the context below.\n\n"
    "Context:\n{context}\n\nQuestion: {question}"
)
```

And finally, query the vector index:

```python
query = "What is LangChain?"
docs = retriever.invoke(query)
context = "\n\n".join(doc.page_content for doc in docs)
answer = (prompt | llm).invoke({"context": context, "question": query}).content
sources = ", ".join({doc.metadata["source"] for doc in docs})

print("answer:", answer)
print("source:", sources)
```

### Run the complete example

If you want to test the whole example, you can simply create a new file, `langchain_integration.py`, and copy the whole code into it.

```python
import os

from langchain_apify import ApifyWrapper
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.vectorstores import InMemoryVectorStore
from langchain_openai import ChatOpenAI
from langchain_openai.embeddings import OpenAIEmbeddings

os.environ["OPENAI_API_KEY"] = "Your OpenAI API key"
os.environ["APIFY_TOKEN"] = "Your Apify API token"

apify = ApifyWrapper()
llm = ChatOpenAI(model="gpt-5.4-mini")

print("Call website content crawler ...")
loader = apify.call_actor(
    actor_id="apify/website-content-crawler",
    run_input={"startUrls": [{"url": "https://docs.langchain.com/oss/python/langchain/quickstart"}], "maxCrawlPages": 10, "crawlerType": "cheerio"},
    dataset_mapping_function=lambda item: Document(page_content=item["text"] or "", metadata={"source": item["url"]}),
)
print("Compute embeddings...")
vector_store = InMemoryVectorStore.from_documents(loader.load(), OpenAIEmbeddings())
retriever = vector_store.as_retriever()

prompt = ChatPromptTemplate.from_template(
    "Answer the question using only the context below.\n\n"
    "Context:\n{context}\n\nQuestion: {question}"
)
query = "What is LangChain?"
docs = retriever.invoke(query)
context = "\n\n".join(doc.page_content for doc in docs)
answer = (prompt | llm).invoke({"context": context, "question": query}).content
sources = ", ".join({doc.metadata["source"] for doc in docs})

print("answer:", answer)
print("source:", sources)
```

To run it, you can use the following command: `python langchain_integration.py`

After running the code, you should see the following output:

```text
answer: LangChain is a framework designed for developing applications powered by large language models (LLMs). It simplifies the
 entire application lifecycle, from development to productionization and deployment. LangChain provides open-source components and integrates with various third-party tools, making it easier to build and optimize applications using language models.

source: https://docs.langchain.com/oss/python/langchain/quickstart
```

### Use a different Actor

You can use all of Apify’s Actors as document loaders in LangChain.
For example, to incorporate web browsing functionality, you can use the [RAG-Web-Browser Actor](https://apify.com/apify/rag-web-browser).
This allows you to either crawl and scrape top pages from Google Search results or directly scrape text content from a URL and return it as markdown.
To set this up, change the `actor_id` to `apify/rag-web-browser` and specify the `run_input`.

```python
loader = apify.call_actor(
    actor_id="apify/rag-web-browser",
    run_input={"query": "apify langchain web browser", "maxResults": 3},
    dataset_mapping_function=lambda item: Document(page_content=item["markdown"] or "", metadata={"source": item["metadata"]["url"]}),
)
print("Documents:", loader.load())
```

Similarly, you can use other Apify Actors to load data into LangChain and query the vector index.

## Use Actors as LangChain tools

The `ApifyWrapper` shown above loads Actor output into a vector index. For agent workflows, the `langchain-apify` package also ships dedicated tools that wrap specific Actors behind a simplified, LLM-friendly interface, so an agent can call them without knowing Actor IDs or input schemas. Each tool is a standard LangChain `BaseTool`, so it works anywhere LangChain tools do.

### Choose the right tool set

The package provides 19 tools split across three lists, so you can bind a focused subset to an agent instead of importing everything:

| Tool set | Tools | Use case |
| --- | --- | --- |
| `APIFY_CORE_TOOLS` | 6 | Run any Actor or saved task, fetch dataset items, scrape a single URL to markdown |
| `APIFY_SEARCH_TOOLS` | 6 | Google Search, Google Maps, YouTube, multi-page website crawling, RAG web browsing, e-commerce |
| `APIFY_SOCIAL_TOOLS` | 7 | Instagram, LinkedIn, Twitter/X, TikTok, Facebook |

A model selects tools based on their names and descriptions. The more tools you register, the larger the decision space, which can lead to wrong tool selection, slower responses, and higher token usage. Register only the tools your agent needs.

Each list holds tool *classes*, so instantiate them before passing them to an agent. There are three ways to compose your tool list:

1. Bind a whole tool set when your agent needs the full category:

    ```python
    from langchain_apify import APIFY_SEARCH_TOOLS

    tools = [tool_cls() for tool_cls in APIFY_SEARCH_TOOLS]
    ```

1. Import individual tools for tighter control:

    ```python
    from langchain_apify import ApifyScrapeUrlTool, ApifyGoogleSearchTool

    tools = [ApifyScrapeUrlTool(), ApifyGoogleSearchTool()]
    ```

1. Mix a tool set with individual tools:

    ```python
    from langchain_apify import APIFY_CORE_TOOLS, ApifyTwitterScraperTool

    tools = [tool_cls() for tool_cls in APIFY_CORE_TOOLS] + [ApifyTwitterScraperTool()]
    ```

### Call a tool directly

Each tool can run on its own, which is the quickest way to see what it returns. Every call runs a real Actor on the Apify platform, so it may take from seconds to minutes. Set your Apify API token and invoke the tool with its input:

```python
import json
import os

from langchain_apify import ApifyGoogleSearchTool

os.environ["APIFY_TOKEN"] = "Your Apify API token"

tool = ApifyGoogleSearchTool()
result = tool.invoke({"query": "what is langchain", "max_results": 3})

payload = json.loads(result)
print("Run status:", payload["run"]["status"])
print("Items returned:", len(payload["items"]))
```

Most tools return a JSON string with two keys: `run` (run metadata such as `status` and `dataset_id`) and `items` (the Actor's dataset items).

:::note Some components return a different shape

`ApifyScrapeUrlTool` follows the same JSON envelope, with the scraped markdown in the single item's `content` field. `ApifySearchRetriever` and `ApifyCrawlLoader` are the exceptions: they return LangChain `Document` objects instead.

:::

### Give the tools to an agent

To let a model decide when to call the tools, bind a tool list to an agent. The [LangGraph integration](/integrations/langgraph) covers that end to end: installing `langgraph`, binding one tool or a whole set, and streaming the agent's steps as it works.

### Retrieve documents for RAG

For retrieval-augmented generation, `ApifySearchRetriever` returns LangChain `Document` objects directly, so it plugs into a RAG chain in place of the vector index built earlier:

```python
import os

from langchain_apify import ApifySearchRetriever

os.environ["APIFY_TOKEN"] = "Your Apify API token"

retriever = ApifySearchRetriever(max_results=3)
docs = retriever.invoke("What is LangChain?")
print(docs)
```

To crawl a whole site into documents on demand, use `ApifyCrawlLoader` instead.

## Tool reference

Every dedicated tool below is importable from `langchain_apify`.

### Core tools (`APIFY_CORE_TOOLS`)

Generic platform primitives that run any Actor or task and read datasets.

- `ApifyRunActorTool` - start any Actor by ID and return run metadata only (run ID, status, dataset ID). Pair with `ApifyGetDatasetItemsTool`.
- `ApifyRunActorAndGetDatasetTool` - run any Actor and return both run metadata and dataset items in one call.
- `ApifyGetDatasetItemsTool` - read items from an existing dataset by ID, with `limit` / `offset` pagination.
- `ApifyScrapeUrlTool` - scrape a single URL and return its markdown content in a JSON envelope (in the item's `content` field).
- `ApifyRunTaskTool` - run a saved [Actor task](/actors/running/tasks) by ID and return run metadata.
- `ApifyRunTaskAndGetDatasetTool` - run a saved task and return both run metadata and dataset items.

### Search and crawling tools (`APIFY_SEARCH_TOOLS`)

Web search, crawling, and platform-specific search.

- `ApifyGoogleSearchTool` - structured Google Search results. Wraps [apify/google-search-scraper](https://apify.com/apify/google-search-scraper).
- `ApifyWebCrawlerTool` - crawl multiple pages of a site and return each as markdown. Wraps [apify/website-content-crawler](https://apify.com/apify/website-content-crawler).
- `ApifyRAGWebBrowserTool` - search the web and return the top results' content as JSON. Wraps [apify/rag-web-browser](https://apify.com/apify/rag-web-browser).
- `ApifyGoogleMapsTool` - Google Maps place results for a query. Wraps [compass/crawler-google-places](https://apify.com/compass/crawler-google-places).
- `ApifyYouTubeScraperTool` - search YouTube or scrape a video / channel URL. Wraps [streamers/youtube-scraper](https://apify.com/streamers/youtube-scraper).
- `ApifyEcommerceScraperTool` - extract product or category-listing data. Wraps [apify/e-commerce-scraping-tool](https://apify.com/apify/e-commerce-scraping-tool).

### Social media tools (`APIFY_SOCIAL_TOOLS`)

Scrape posts and profiles from major social platforms.

- `ApifyInstagramScraperTool` - users, hashtags, posts, or comments. Wraps [apify/instagram-scraper](https://apify.com/apify/instagram-scraper).
- `ApifyLinkedInProfilePostsTool` - recent posts from a LinkedIn profile. Wraps [apimaestro/linkedin-profile-posts](https://apify.com/apimaestro/linkedin-profile-posts).
- `ApifyLinkedInProfileSearchTool` - search LinkedIn profiles by keyword. Wraps [harvestapi/linkedin-profile-search](https://apify.com/harvestapi/linkedin-profile-search).
- `ApifyLinkedInProfileDetailTool` - full detail for a single LinkedIn profile. Wraps [apimaestro/linkedin-profile-detail](https://apify.com/apimaestro/linkedin-profile-detail).
- `ApifyTwitterScraperTool` - tweets via search, a user's timeline, or replies. Wraps [apidojo/twitter-scraper-lite](https://apify.com/apidojo/twitter-scraper-lite).
- `ApifyTikTokScraperTool` - TikTok by search, user, hashtag, or video URL. Wraps [clockworks/tiktok-scraper](https://apify.com/clockworks/tiktok-scraper).
- `ApifyFacebookPostsScraperTool` - posts from a public Facebook page. Wraps [apify/facebook-posts-scraper](https://apify.com/apify/facebook-posts-scraper).

### Run any other Actor

For Actors without a dedicated tool, use `ApifyActorsTool`. Construct it with the Actor ID; it builds an input schema from the Actor and accepts a `run_input` dict matching that Actor's input:

```python
from langchain_apify import ApifyActorsTool

tool = ApifyActorsTool("apify/google-trends-scraper")
result = tool.invoke({"run_input": {"searchTerms": ["web scraping", "data extraction"]}})
```

## Next steps

To bind these tools to a stateful agent and stream its steps as it works, continue to the [LangGraph integration](/integrations/langgraph).

## Resources

- [Apify Actors](/actors)
- [LangChain quickstart](https://docs.langchain.com/oss/python/langchain/quickstart)
- [LangChain Apify provider page](https://docs.langchain.com/oss/python/integrations/providers/apify)
- [langchain-apify repository](https://github.com/apify/langchain-apify)
