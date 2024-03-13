---
title: LlamaIndex
description: Learn how to integrate Apify with LlamaIndex in order to feed vector databases and LLMs with data crawled from the web.
sidebar_position: 11.21
slug: /integrations/llama
---

**Learn how to integrate Apify with LlamaIndex to feed vector databases and LLMs with data crawled from the web.**

---

> For more information on LlamaIndex, visit its [documentation](https://gpt-index.readthedocs.io/en/stable/).

## What is LlamaIndex?

LlamaIndex is a platform that allows you to create and manage vector databases and LLMs. It is a part of the [LangChain](https://langchain.ai/) ecosystem.

## How to integrate Apify with LlamaIndex?

These two components that you can integrate with LlamaIndex:

* Apify dataset
* Apify Actor

This example focuses on integrating Apify with LlamaIndex using the Apify Actor.

Before we start with the integration, we need to install all dependencies:

`pip install apify-client llama-index`

After successfully installing all dependencies, we can start writing Python code.
To use the Apify Actor loader, import `download_loader`, `Document`.
Then, we need to import the loader using the method `download_loader`.

```python
from llama_index import download_loader
from llama_index.readers.schema.base import Document

# Converts a single record from the Actor's resulting dataset to the LlamaIndex format
def tranform_dataset_item(item):
    return Document(
        text=item.get("text"),
        extra_info={
            "url": item.get("url"),
        },
    )

ApifyActor = download_loader("ApifyActor")

reader = ApifyActor("<My Apify API token>")
documents = reader.load_data(
    actor_id="apify/website-content-crawler",
    run_input={"startUrls": [{"url": "https://gpt-index.readthedocs.io/en/latest"}]},
    dataset_mapping_function=tranform_dataset_item,
)
```

## Resources

* [Apify loaders](https://llamahub.ai/l/readers/llama-index-readers-apify)
* [LlamaIndex documentation](https://gpt-index.readthedocs.io/en/stable/)
