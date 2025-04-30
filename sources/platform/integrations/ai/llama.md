---
title: LlamaIndex integration
description: Learn how to integrate Apify with LlamaIndex in order to feed vector databases and LLMs with data crawled from the web.
sidebar_label: Llamaindex
sidebar_position: 7
slug: /integrations/llama
---

**Learn how to integrate Apify with LlamaIndex to feed vector databases and LLMs with data crawled from the web.**

---

> For more information on LlamaIndex, visit its [documentation](https://docs.llamaindex.ai/en/stable/).

## What is LlamaIndex?

LlamaIndex is a platform that allows you to create and manage vector databases and LLMs.

## How to integrate Apify with LlamaIndex?

You can integrate Apify dataset or Apify Actor with LlamaIndex.

Before we start with the integration, we need to install all dependencies:

`pip install apify-client llama-index-core llama-index-readers-apify`

After successfully installing all dependencies, we can start writing Python code.

### Apify Actor

To use the Apify Actor, import `ApifyActor` and `Document`, and set your [Apify API token](https://docs.apify.com/platform/integrations/api#api-token) in the code.
The following example uses the [Website Content Crawler](https://apify.com/apify/website-content-crawler) Actor to crawl an entire website, which will extract text content from the web pages.
The extracted text is formatted as a llama_index `Document` and can be fed to a vector store or language model like GPT.


```python
from llama_index.core import Document
from llama_index.readers.apify import ApifyActor

reader = ApifyActor("<My Apify API token>")

documents = reader.load_data(
    actor_id="apify/website-content-crawler",
    run_input={
        "startUrls": [{"url": "https://docs.llamaindex.ai/en/latest/"}]
    },
    dataset_mapping_function=lambda item: Document(
        text=item.get("text"),
        metadata={
            "url": item.get("url"),
        },
    ),
)
```

### Apify Dataset

To download Apify Dataset, import `ApifyDataset` and `Document` and load the dataset using a dataset ID.

```python
from llama_index.core import Document
from llama_index.readers.apify import ApifyDataset

reader = ApifyDataset("<My Apify API token>")
documents = reader.load_data(
    dataset_id="my_dataset_id",
    dataset_mapping_function=lambda item: Document(
        text=item.get("text"),
        metadata={
            "url": item.get("url"),
        },
    ),
)
```

## Resources

* [Apify loaders](https://llamahub.ai/l/readers/llama-index-readers-apify)
* [LlamaIndex documentation](https://docs.llamaindex.ai/en/stable/)
