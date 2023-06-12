---
title: LangChain Integration
description: Learn how to integrate Apify with LangChain, in order to feed vector databases and LLMs with data crawled from the web.
sidebar_position: 11.20
slug: /integrations/langchain
---

# 🦜🔗 LangChain Integration

**Learn how to integrate Apify with LangChain.**

---

> For more information on LangChain visit its [documentation](https://python.langchain.com/en/latest/index.html).

In this example, we'll use the Website [Content Crawler Actor](https://apify.com/apify/website-content-crawler), which can deeply crawl websites such as documentation, knowledge bases, help centers, or blogs and extract text content from the web pages.
Then we feed the documents into a vector index and answer questions from it.

This example focuses on how to integrate Apify with LangChain using Python language,
but if you prefer to use JavaScript, you can follow the same steps with [JavaScript LangChain documentation](https://js.langchain.com/docs/modules/indexes/document_loaders/examples/web_loaders/apify_dataset).

Before we start with the integration, we need to install all dependencies:

`pip install apify-client langchain openai chromadb`

After successful installation of all dependencies, we can start writing code.

First, import `os`, `Document`, `VectorstoreIndexCreator`, and `ApifyWrapper` into your source code:
```python
import os

from langchain.document_loaders.base import Document
from langchain.indexes import VectorstoreIndexCreator
from langchain.utilities import ApifyWrapper
```

Find your [Apify API token](https://console.apify.com/account/integrations) and [OpenAI API key](https://platform.openai.com/account/api-keys) and initialize these into environment variable:

```python
os.environ["OPENAI_API_KEY"] = "Your OpenAI API key"
os.environ["APIFY_API_TOKEN"] = "Your Apify API token"
```

Run the Actor, wait for it to finish, and fetch its results from the Apify dataset into a LangChain document loader.

Note that if you already have some results in an Apify dataset, you can load them directly using `ApifyDatasetLoader`, as shown in [this notebook](https://github.com/hwchase17/langchain/blob/fe1eb8ca5f57fcd7c566adfc01fa1266349b72f3/docs/modules/indexes/document_loaders/examples/apify_dataset.ipynb). In that notebook, you'll also find the explanation of the `dataset_mapping_function`, which is used to map fields from the Apify dataset records to LangChain `Document` fields.

```python
apify = ApifyWrapper()

loader = apify.call_actor(
    actor_id="apify/website-content-crawler",
    run_input={"startUrls": [{"url": "https://python.langchain.com/en/latest/"}], "maxCrawlPages": 10, "crawlerType": "cheerio"},
    dataset_mapping_function=lambda item: Document(
        page_content=item["text"] or "", metadata={"source": item["url"]}
    ),
)
```
_NOTE: The Actor call function can take some time as it loads the data from LangChain documentation website._

Initialize the vector index from the crawled documents:

```python
index = VectorstoreIndexCreator().from_loaders([loader])
```

And finally, query the vector index:

```python
query = "What is LangChain?"
result = index.query_with_sources(query)

print(result["answer"])
print(result["sources"])
```

If you want to test the whole example you can simple create a new file `langchain_integration.py` and copy the whole code into it.

```python
import os

from langchain.document_loaders.base import Document
from langchain.indexes import VectorstoreIndexCreator
from langchain.utilities import ApifyWrapper

os.environ["OPENAI_API_KEY"] = "Your OpenAI API key"
os.environ["APIFY_API_TOKEN"] = "Your Apify API token"

apify = ApifyWrapper()

loader = apify.call_actor(
    actor_id="apify/website-content-crawler",
    run_input={"startUrls": [{"url": "https://python.langchain.com/en/latest/"}], "maxCrawlPages": 10, "crawlerType": "cheerio"},
    dataset_mapping_function=lambda item: Document(
        page_content=item["text"] or "", metadata={"source": item["url"]}
    ),
)
index = VectorstoreIndexCreator().from_loaders([loader])
query = "What is LangChain?"
result = index.query_with_sources(query)

print(result["answer"])
print(result["sources"])
```

To run it, you can use the following command: `python langchain_integration.py`

After running the code, you should see the following output:

```text
LangChain is a framework for developing applications powered by language models. It provides standard, extendable interfaces, external integrations, and end-to-end implementations for off-the-shelf use. It also integrates with other LLMs, systems, and products to create a vibrant and thriving ecosystem.

https://python.langchain.com/en/latest/
```

LangChain is a standard interface through which you can interact with a variety of large language models (LLMs). It provides modules you can use to build language model applications. It also provides chains and agents with memory capabilities.

## Resources

- <https://python.langchain.com/en/latest/getting_started/getting_started.html>
- <https://python.langchain.com/en/latest/integrations/apify.html>
- <https://python.langchain.com/en/latest/modules/agents/tools/examples/apify.html>
- <https://python.langchain.com/en/latest/modules/models/llms.html>

