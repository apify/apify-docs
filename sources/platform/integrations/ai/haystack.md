---
title: Haystack integration
sidebar_label: Haystack
description: Learn how to integrate Apify with Haystack to work with web data in the Haystack ecosystem.
sidebar_position: 1
slug: /integrations/haystack
---

**Learn how to integrate Apify with Haystack to work with web data in the Haystack ecosystem.**

---

> For more information on Haystack, visit its [documentation](https://docs.haystack.deepset.ai/docs/intro).

In this example, we'll use the [Website Content Crawler](https://apify.com/apify/website-content-crawler) Actor, which can deeply crawl websites such as documentation sites, knowledge bases, or blogs, and extract text content from the web pages.
Then, we'll use the `OpenAIDocumentEmbedder` to compute text embeddings and the `InMemoryDocumentStore` to store documents in a temporary in-memory database.
The last step will be to retrieve the most similar documents.

This example uses the Apify-Haystack Python integration published on [PyPi](https://pypi.org/project/apify-haystack/).
Before we start with the integration, we need to install all dependencies:

```bash
pip install apify-haystack haystack-ai
```

Import all required packages:

```python
from haystack import Document, Pipeline
from haystack.components.embedders import OpenAIDocumentEmbedder, OpenAITextEmbedder
from haystack.components.preprocessors import DocumentCleaner, DocumentSplitter
from haystack.components.writers import DocumentWriter
from haystack.document_stores.in_memory import InMemoryDocumentStore
from haystack.utils.auth import Secret

from apify_haystack import ApifyDatasetFromActorCall
```

Find your [Apify API token](https://console.apify.com/account/integrations) and [OpenAI API key](https://platform.openai.com/account/api-keys) and initialize these into environment variable:

```python
import os

os.environ["APIFY_API_TOKEN"] = "YOUR-APIFY-API-TOKEN"
os.environ["OPENAI_API_KEY"] = "YOUR-OPENAI-API-KEY"
```

First, you need to create a document loader that will crawl the haystack website using the Website Content Crawler:

```python
document_loader = ApifyDatasetFromActorCall(
    actor_id="apify/website-content-crawler",
    run_input={
        "maxCrawlPages": 3,  # limit the number of pages to crawl
        "startUrls": [{"url": "https://haystack.deepset.ai/"}],
    },
    dataset_mapping_function=lambda item: Document(content=item["text"] or "", meta={"url": item["url"]}),
)
```

You can learn more about input parameters on the [Website Content Crawler inputs page](https://apify.com/apify/website-content-crawler/input-schema).
The dataset mapping function is described in more detail in the [Retrieval augmented generation example](https://colab.research.google.com/github/deepset-ai/haystack-cookbook/blob/main/notebooks/apify_haystack_rag.ipynb).

Next, you can utilize the [Haystack pipeline](https://docs.haystack.deepset.ai/docs/pipelines), which helps you connect several processing components together. I
n this example, we connect the document loader with the document splitter, document embedder, and document writer components.

```python
document_store = InMemoryDocumentStore()

document_splitter = DocumentSplitter(split_by="word", split_length=150, split_overlap=50)
document_embedder = OpenAIDocumentEmbedder()
document_writer = DocumentWriter(document_store)

pipe = Pipeline()
pipe.add_component("document_loader", document_loader)
pipe.add_component("document_splitter", document_splitter)
pipe.add_component("document_embedder", document_embedder)
pipe.add_component("document_writer", document_writer)

pipe.connect("document_loader", "document_splitter")
pipe.connect("document_splitter", "document_embedder")
pipe.connect("document_embedder", "document_writer")
```

Run all the components in the pipeline:

```python
pipe.run({})
```

:::note Crawling may take some time

The Actor call may take some time as it crawls the Haystack website.

:::

After running the pipeline code, you can print the results

```python
print(f"Added {document_store.count_documents()} to vector from Website Content Crawler")

print("Retrieving documents from the document store using BM25")
print("query='Haystack'")
bm25_retriever = InMemoryBM25Retriever(document_store)
for doc in bm25_retriever.run("Haystack", top_k=1)["documents"]:
  print(doc.content)
```

If you want to test the whole example, you can simply create a new file, `apify_integration.py`, and copy the whole code into it.

```python
import os

from haystack import Document, Pipeline
from haystack.components.embedders import OpenAIDocumentEmbedder, OpenAITextEmbedder
from haystack.components.preprocessors import DocumentSplitter
from haystack.components.writers import DocumentWriter
from haystack.document_stores.in_memory import InMemoryDocumentStore

from apify_haystack import ApifyDatasetFromActorCall

os.environ["APIFY_API_TOKEN"] = "YOUR-APIFY-API-TOKEN"
os.environ["OPENAI_API_KEY"] = "YOUR-OPENAI-API-KEY"

document_loader = ApifyDatasetFromActorCall(
    actor_id="apify/website-content-crawler",
    run_input={
        "maxCrawlPages": 3,  # limit the number of pages to crawl
        "startUrls": [{"url": "https://haystack.deepset.ai/"}],
    },
    dataset_mapping_function=lambda item: Document(content=item["text"] or "", meta={"url": item["url"]}),
)

document_store = InMemoryDocumentStore()
print(f"Initialized InMemoryDocumentStore with {document_store.count_documents()} documents")

document_splitter = DocumentSplitter(split_by="word", split_length=150, split_overlap=50)
document_embedder = OpenAIDocumentEmbedder()
document_writer = DocumentWriter(document_store)

pipe = Pipeline()
pipe.add_component("document_loader", document_loader)
pipe.add_component("document_splitter", document_splitter)
pipe.add_component("document_embedder", document_embedder)
pipe.add_component("document_writer", document_writer)

pipe.connect("document_loader", "document_splitter")
pipe.connect("document_splitter", "document_embedder")
pipe.connect("document_embedder", "document_writer")

print("\nCrawling will take some time ...")
print("You can visit https://console.apify.com/actors/runs to monitor the progress\n")

pipe.run({})
print(f"Added {document_store.count_documents()} to vector from Website Content Crawler")

print("\nRetrieving documents from the document store using BM25")
print("query='Haystack'\n")

bm25_retriever = InMemoryBM25Retriever(document_store)

for doc in bm25_retriever.run("Haystack", top_k=1)["documents"]:
  print(doc.content)

print("\nRetrieving documents from the document store using vector similarity.\n")
retrieval_pipe = Pipeline()
retrieval_pipe.add_component("embedder", OpenAITextEmbedder())
retrieval_pipe.add_component("retriever", InMemoryEmbeddingRetriever(document_store, top_k=1))

retrieval_pipe.connect("embedder.embedding", "retriever.query_embedding")

results = retrieval_pipe.run({"embedder":{"text": "What is Haystack?"}})

for doc in results["retriever"]["documents"]:
  print(doc.content)
```

To run it, you can use the following command: `python apify_integration.py`

[Haystack](https://haystack.deepset.ai/) is an open source framework for building production-ready LLM applications, agents, advanced retrieval-augmented generative pipelines, and state-of-the-art search systems that work intelligently over large document collections. 

## Resources

- <https://docs.haystack.deepset.ai/docs/intro>
- <https://haystack.deepset.ai/integrations/apify>
- <https://github.com/apify/apify-haystack>
