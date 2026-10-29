---
title: Haystack integration
sidebar_label: Haystack
description: Integrate Apify with Haystack to load web content into RAG pipelines, search the web, and give Haystack agents access to any Actor from Apify Store.
slug: /integrations/haystack
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

[Haystack](https://haystack.deepset.ai/) is an open-source framework by deepset for building LLM applications, retrieval-augmented generation (RAG) pipelines, and AI agents. To learn more, see the [Haystack documentation](https://docs.haystack.deepset.ai/docs/intro).

The [`apify-haystack`](https://pypi.org/project/apify-haystack/) package connects Haystack to the [Apify platform](https://apify.com/). It provides these components:

- `ApifyDatasetFromActorCall` runs an Actor, waits for it to finish, and loads its default dataset as Haystack `Document` objects.
- `ApifyDatasetFromTaskCall` does the same for a saved [Actor task](/actors/running/tasks).
- `ApifyDatasetLoader` loads an existing [dataset](/storage/dataset) by its ID.
- `ApifyWebSearch` searches the web with the [RAG Web Browser](https://apify.com/apify/rag-web-browser) Actor and returns the content of the top result pages.
- `ApifyActorTool` lets a Haystack `Agent` run any Actor and work with its results.

<ThirdPartyDisclaimer />

## Prerequisites

- Python 3.11 or newer
- An [Apify account](https://console.apify.com/sign-up) and your API token from the [Integrations](https://console.apify.com/settings/integrations) page in Apify Console
- An [OpenAI API key](https://platform.openai.com/account/api-keys) for the examples on this page

Haystack supports many other model providers too.

## Installation

Install Haystack and the Apify integration:

```bash
pip install haystack-ai apify-haystack
```

Set your Apify API token and OpenAI API key as environment variables:

```bash
export APIFY_TOKEN="YOUR-APIFY-API-TOKEN"
export OPENAI_API_KEY="YOUR-OPENAI-API-KEY"
```

The components read the token from `APIFY_TOKEN`, or from `APIFY_API_TOKEN` if `APIFY_TOKEN` isn't set. To read it from another variable, pass a Haystack `Secret`, for example `apify_token=Secret.from_env_var("MY_APIFY_TOKEN")`.

## Answer questions about website content

This example crawls a part of the Haystack documentation with [Website Content Crawler](https://apify.com/apify/website-content-crawler), stores the pages in a document store, and answers questions about them.

1. Crawl the pages, split them into chunks, compute their embeddings, and store them:

    ```python
    from haystack import Pipeline
    from haystack.components.embedders import OpenAIDocumentEmbedder
    from haystack.components.preprocessors import DocumentSplitter
    from haystack.components.writers import DocumentWriter
    from haystack.document_stores.in_memory import InMemoryDocumentStore

    from apify_haystack import ApifyDatasetFromActorCall

    document_store = InMemoryDocumentStore()

    crawler = ApifyDatasetFromActorCall(
        actor_id="apify/website-content-crawler",
        run_input={
            "startUrls": [{"url": "https://docs.haystack.deepset.ai/docs/intro"}],
            "maxCrawlPages": 10,
        },
    )

    indexing = Pipeline()
    indexing.add_component("crawler", crawler)
    indexing.add_component("splitter", DocumentSplitter(split_by="word", split_length=150, split_overlap=50))
    indexing.add_component("embedder", OpenAIDocumentEmbedder())
    indexing.add_component("writer", DocumentWriter(document_store))
    indexing.connect("crawler", "splitter")
    indexing.connect("splitter", "embedder")
    indexing.connect("embedder", "writer")

    indexing.run({})
    print(f"Stored {document_store.count_documents()} documents")
    ```

    The crawler turns each page into a `Document` with the page Markdown as its content and the page `url`, `title`, and `description` in `meta`. To change what it crawls, see the [Website Content Crawler input](https://apify.com/apify/website-content-crawler/input-schema). The crawl can take a few minutes. You can follow it on the [Runs](https://console.apify.com/actors/runs) page in Apify Console.

1. Retrieve the chunks closest to a question and let the LLM answer it:

    ```python
    from haystack.components.builders import ChatPromptBuilder
    from haystack.components.embedders import OpenAITextEmbedder
    from haystack.components.generators.chat import OpenAIChatGenerator
    from haystack.components.retrievers import InMemoryEmbeddingRetriever
    from haystack.dataclasses import ChatMessage

    template = [
        ChatMessage.from_user(
            """Answer the question based on the documents.

    Documents:
    {% for document in documents %}
    {{ document.content }}
    {% endfor %}

    Question: {{ question }}"""
        )
    ]

    querying = Pipeline()
    querying.add_component("embedder", OpenAITextEmbedder())
    querying.add_component("retriever", InMemoryEmbeddingRetriever(document_store, top_k=3))
    querying.add_component("prompt_builder", ChatPromptBuilder(template=template, required_variables="*"))
    querying.add_component("llm", OpenAIChatGenerator())
    querying.connect("embedder.embedding", "retriever.query_embedding")
    querying.connect("retriever", "prompt_builder.documents")
    querying.connect("prompt_builder", "llm")

    question = "What is a Haystack pipeline?"
    result = querying.run({"embedder": {"text": question}, "prompt_builder": {"question": question}})
    print(result["llm"]["replies"][0].text)
    ```

## Search the web

`ApifyWebSearch` runs the RAG Web Browser Actor, which searches Google, scrapes the top results, and returns their content as Markdown. It has the same outputs as other Haystack web search components, so you can use it as a drop-in replacement in a pipeline:

```python
from apify_haystack import ApifyWebSearch

search = ApifyWebSearch(top_k=3)
result = search.run(query="What is new in Haystack 3?")

for document in result["documents"]:
    print(document.meta["url"], document.meta.get("title"))
```

The `documents` output holds the result pages, and `links` holds their URLs. To pass more input to the Actor, use `search_params`, for example `search_params={"scrapingTool": "browser-playwright"}` for pages that need a browser to render.

## Use Actors as agent tools

`ApifyActorTool` turns any Actor into a tool for a Haystack `Agent`. The tool takes its parameters from the Actor's input schema and its description from the Actor's description, so the LLM knows how to call it:

```python
from haystack.components.agents import Agent
from haystack.components.generators.chat import OpenAIChatGenerator
from haystack.dataclasses import ChatMessage

from apify_haystack import ApifyActorTool

browser = ApifyActorTool("apify/rag-web-browser", dataset_items_limit=3, max_total_charge_usd=0.5)
agent = Agent(chat_generator=OpenAIChatGenerator(), tools=[browser])

result = agent.run([ChatMessage.from_user("What is new in Haystack 3?")])
print(result["last_message"].text)
```

Note that:

- `dataset_items_limit` caps the number of dataset items the tool returns, which keeps its output within the model's context window.
- `max_total_charge_usd` caps the cost of each run the agent starts with a [pay-per-event](/actors/running/actors-in-store#pay-per-event) Actor.
- The tool wraps the items it returns in markers that tell the LLM to treat them as untrusted external content, which helps guard against prompt injection in scraped pages.

## Load data from tasks and datasets

To run a saved Actor task, use `ApifyDatasetFromTaskCall` with the task ID. The `task_input` overrides fields of the input saved in the task. It's required and can't be empty, so pass it to the constructor or to `run()`:

```python
from apify_haystack import ApifyDatasetFromTaskCall

task = ApifyDatasetFromTaskCall(task_id="YOUR-TASK-ID", task_input={"maxCrawlPages": 5})
documents = task.run()["documents"]
```

To load a dataset that already exists, for example the result of an earlier run, use `ApifyDatasetLoader`:

```python
from apify_haystack import ApifyDatasetLoader

loader = ApifyDatasetLoader(dataset_id="YOUR-DATASET-ID")
documents = loader.run()["documents"]
```

## Map dataset items to documents

The dataset components and `ApifyWebSearch` turn dataset items into documents with `default_dataset_mapping_function`. It takes the `markdown` or `text` field of website and search Actors as the content, and the page `url`, `title`, and `description` as `meta`. For other Actors, the content is the whole item as JSON.

To build the documents differently, pass your own mapping function:

```python
from haystack import Document

from apify_haystack import ApifyDatasetFromActorCall


def to_document(item: dict) -> Document:
    return Document(content=item["text"], meta={"url": item["url"], "language": item["metadata"]["languageCode"]})


crawler = ApifyDatasetFromActorCall(
    actor_id="apify/website-content-crawler",
    dataset_mapping_function=to_document,
    run_input={"startUrls": [{"url": "https://docs.haystack.deepset.ai/docs/intro"}], "maxCrawlPages": 10},
)
```

## Run components asynchronously

Every component has `run_async`, and `ApifyActorTool` works with `Agent.run_async`. `Pipeline.run_async` uses them to wait for Actor runs without blocking the event loop. This example runs the `indexing` pipeline from [Answer questions about website content](#answer-questions-about-website-content):

```python
import asyncio

result = asyncio.run(indexing.run_async({}))
```

When an Actor or task run finishes with any status other than `SUCCEEDED`, the component raises a `RuntimeError` and loads no documents.

## Save and load pipelines

The components and the tool support [Haystack serialization](https://docs.haystack.deepset.ai/docs/serialization). They save the API token as the name of its environment variable, never as its value. Haystack only loads classes and functions from modules you trust, so allow `apify_haystack` and the module with your mapping function, if you use one. This example saves and restores the `indexing` pipeline from [Answer questions about website content](#answer-questions-about-website-content):

```python
from haystack import Pipeline

yaml = indexing.dumps()
restored = Pipeline.loads(yaml, allowed_modules=["apify_haystack", "my_project.mapping"])
```

## Resources

- [Apify integration on the Haystack website](https://haystack.deepset.ai/integrations/apify)
- [`apify-haystack` source code and examples](https://github.com/apify/apify-haystack)
- [Example: Extract and use website content for question answering](https://haystack.deepset.ai/cookbook/apify_haystack_rag)
- [Example: Web search and analysis with Apify and Haystack](https://haystack.deepset.ai/cookbook/apify_haystack_rag_web_browser)
- [Example: Analyze your Instagram comments' vibe](https://haystack.deepset.ai/cookbook/apify_haystack_instagram_comments_analysis)
