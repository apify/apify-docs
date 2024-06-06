---
title: 🦜🔗 LangChain
sidebar_label: LangChain
description: Learn how to integrate Apify with 🦜🔗 LangChain, in order to feed vector databases and LLMs with data crawled from the web.
sidebar_position: 11.19
slug: /integrations/langchain
---

**Learn how to integrate Apify with LangChain, in order to feed vector databases and LLMs with data crawled from the web.**

---

> For more information on LangChain visit its [documentation](https://python.langchain.com/docs/).

In this example, we'll use the [Website Content Crawler](https://apify.com/apify/website-content-crawler) Actor, which can deeply crawl websites such as documentation, knowledge bases, help centers, or blogs and extract text content from the web pages.
Then we feed the documents into a vector index and answer questions from it.

This example focuses on how to integrate Apify with LangChain using the Python language,
but if you prefer to use JavaScript, you can follow the same steps in the [JavaScript LangChain documentation](https://js.langchain.com/docs/modules/indexes/document_loaders/examples/web_loaders/apify_dataset).

Before we start with the integration, we need to install all dependencies:

`pip install apify-client langchain langchain_community langchain_openai openai tiktoken`

After successful installation of all dependencies, we can start writing code.

First, import all required packages:

```python
import os

from langchain.indexes import VectorstoreIndexCreator
from langchain_community.utilities import ApifyWrapper
from langchain_core.document_loaders.base import Document
from langchain_openai import OpenAI
from langchain_openai.embeddings import OpenAIEmbeddings
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
    run_input={"startUrls": [{"url": "https://python.langchain.com/docs/get_started/introduction"}], "maxCrawlPages": 10, "crawlerType": "cheerio"},
    dataset_mapping_function=lambda item: Document(
        page_content=item["text"] or "", metadata={"source": item["url"]}
    ),
)
```

_NOTE: The Actor call may take some time, as it crawls the LangChain documentation website._

Initialize the vector index from the crawled documents:

```python
index = VectorstoreIndexCreator(embedding=OpenAIEmbeddings()).from_loaders([loader])
```

And finally, query the vector index:

```python
query = "What is LangChain?"
result = index.query_with_sources(query, llm=OpenAI())

print("answer:", result["answer"])
print("source:", result["sources"])
```

If you want to test the whole example, you can simply create a new file, `langchain_integration.py`, and copy the whole code into it.

```python
import os

from langchain.indexes import VectorstoreIndexCreator
from langchain_community.utilities import ApifyWrapper
from langchain_core.document_loaders.base import Document
from langchain_openai import OpenAI
from langchain_openai.embeddings import OpenAIEmbeddings

os.environ["OPENAI_API_KEY"] = "Your OpenAI API key"
os.environ["APIFY_API_TOKEN"] = "Your Apify API token"

apify = ApifyWrapper()

print("Call website content crawler ...")
loader = apify.call_actor(
    actor_id="apify/website-content-crawler",
    run_input={"startUrls": [{"url": "https://python.langchain.com/docs/get_started/introduction"}], "maxCrawlPages": 10, "crawlerType": "cheerio"},
    dataset_mapping_function=lambda item: Document(page_content=item["text"] or "", metadata={"source": item["url"]}),
)
print("Compute embeddings...")
index = VectorstoreIndexCreator(embedding=OpenAIEmbeddings()).from_loaders([loader])
query = "What is LangChain?"
result = index.query_with_sources(query, llm=OpenAI())

print("answer:", result["answer"])
print("source:", result["sources"])
```

To run it, you can use the following command: `python langchain_integration.py`

After running the code, you should see the following output:

```text
answer: LangChain is a framework for developing applications powered by language models. It provides standard, extendable interfaces, external integrations, and end-to-end implementations for off-the-shelf use. It also integrates with other LLMs, systems, and products to create a vibrant and thriving ecosystem.

source: https://python.langchain.com
```

LangChain is a standard interface through which you can interact with a variety of large language models (LLMs). It provides modules you can use to build language model applications. It also provides chains and agents with memory capabilities.

## Resources

- <https://python.langchain.com/docs/get_started/introduction>
- <https://python.langchain.com/docs/integrations/providers/apify>
- <https://python.langchain.com/docs/integrations/tools/apify>
- <https://python.langchain.com/docs/modules/model_io/llms/>
