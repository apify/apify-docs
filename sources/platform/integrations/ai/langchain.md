---
title: 🦜🔗 LangChain integration
sidebar_label: LangChain
description: Learn how to integrate Apify with 🦜🔗 LangChain, in order to feed vector databases and LLMs with data crawled from the web.
sidebar_position: 1
slug: /integrations/langchain
---

**Learn how to integrate Apify with LangChain, in order to feed vector databases and LLMs with data crawled from the web.**

---

> For more information on LangChain visit its [documentation](https://python.langchain.com/docs/).

In this example, we'll use the [Website Content Crawler](https://apify.com/apify/website-content-crawler) Actor, which can deeply crawl websites such as documentation, knowledge bases, help centers, or blogs and extract text content from the web pages.
Then we feed the documents into a vector index and answer questions from it.

This example demonstrates how to integrate Apify with LangChain using the Python language.
If you prefer to use JavaScript, you can follow the  [JavaScript LangChain documentation](https://js.langchain.com/docs/integrations/document_loaders/web_loaders/apify_dataset/).

Before we start with the integration, we need to install all dependencies:

`pip install langchain langchain-openai langchain-apify`

After successful installation of all dependencies, we can start writing code.

First, import all required packages:

```python
import os

from langchain.indexes import VectorstoreIndexCreator
from langchain_apify import ApifyWrapper
from langchain_core.documents import Document
from langchain_core.vectorstores import InMemoryVectorStore
from langchain_openai import ChatOpenAI
from langchain_openai.embeddings import OpenAIEmbeddings
```

Find your [Apify API token](https://console.apify.com/account/integrations) and [OpenAI API key](https://platform.openai.com/account/api-keys) and initialize these into environment variable:

```python
os.environ["OPENAI_API_KEY"] = "Your OpenAI API key"
os.environ["APIFY_API_TOKEN"] = "Your Apify API token"
```

Run the Actor, wait for it to finish, and fetch its results from the Apify dataset into a LangChain document loader.

Note that if you already have some results in an Apify dataset, you can load them directly using `ApifyDatasetLoader`, as shown in [this notebook](https://github.com/langchain-ai/langchain/blob/fe1eb8ca5f57fcd7c566adfc01fa1266349b72f3/docs/modules/indexes/document_loaders/examples/apify_dataset.ipynb). In that notebook, you'll also find the explanation of the `dataset_mapping_function`, which is used to map fields from the Apify dataset records to LangChain `Document` fields.

```python
apify = ApifyWrapper()
llm = ChatOpenAI(model="gpt-4o-mini")

loader = apify.call_actor(
    actor_id="apify/website-content-crawler",
    run_input={"startUrls": [{"url": "https://python.langchain.com/docs/get_started/introduction"}], "maxCrawlPages": 10, "crawlerType": "cheerio"},
    dataset_mapping_function=lambda item: Document(
        page_content=item["text"] or "", metadata={"source": item["url"]}
    ),
)
```

:::note Crawling may take some time

The Actor call may take some time as it crawls the LangChain documentation website.

:::

Initialize the vector index from the crawled documents:

```python
index = VectorstoreIndexCreator(
    vectorstore_cls=InMemoryVectorStore,
    embedding=OpenAIEmbeddings()
).from_loaders([loader])
```

And finally, query the vector index:

```python
query = "What is LangChain?"
result = index.query_with_sources(query, llm=llm)

print("answer:", result["answer"])
print("source:", result["sources"])
```

If you want to test the whole example, you can simply create a new file, `langchain_integration.py`, and copy the whole code into it.

```python
import os

from langchain.indexes import VectorstoreIndexCreator
from langchain_apify import ApifyWrapper
from langchain_core.documents import Document
from langchain_core.vectorstores import InMemoryVectorStore
from langchain_openai import ChatOpenAI
from langchain_openai.embeddings import OpenAIEmbeddings

os.environ["OPENAI_API_KEY"] = "Your OpenAI API key"
os.environ["APIFY_API_TOKEN"] = "Your Apify API token"

apify = ApifyWrapper()
llm = ChatOpenAI(model="gpt-4o-mini")

print("Call website content crawler ...")
loader = apify.call_actor(
    actor_id="apify/website-content-crawler",
    run_input={"startUrls": [{"url": "https://python.langchain.com/docs/get_started/introduction"}], "maxCrawlPages": 10, "crawlerType": "cheerio"},
    dataset_mapping_function=lambda item: Document(page_content=item["text"] or "", metadata={"source": item["url"]}),
)
print("Compute embeddings...")
index = VectorstoreIndexCreator(
    vectorstore_cls=InMemoryVectorStore,
    embedding=OpenAIEmbeddings()
).from_loaders([loader])
query = "What is LangChain?"
result = index.query_with_sources(query, llm=llm)

print("answer:", result["answer"])
print("source:", result["sources"])
```

To run it, you can use the following command: `python langchain_integration.py`

After running the code, you should see the following output:

```text
answer: LangChain is a framework designed for developing applications powered by large language models (LLMs). It simplifies the
 entire application lifecycle, from development to productionization and deployment. LangChain provides open-source components a
nd integrates with various third-party tools, making it easier to build and optimize applications using language models.

source: https://python.langchain.com/docs/get_started/introduction
```

LangChain is a standard interface through which you can interact with a variety of large language models (LLMs).
It provides modules you can use to build language model applications as well as chains and agents with memory capabilities.

You can use all of Apify’s Actors as document loaders in LangChain.
For example, to incorporate web browsing functionality, you can use the [RAG-Web-Browser Actor](https://apify.com/apify/rag-web-browser).
This allows you to either crawl and scrape top pages from Google Search results or directly scrape text content from a URL and return it as Markdown.
To set this up, change the `actor_id` to `apify/rag-web-browser` and specify the `run_input`.

```python
loader = apify.call_actor(
    actor_id="apify/rag-web-browser",
    run_input={"query": "apify langchain web browser", "maxResults": 3},
    dataset_mapping_function=lambda item: Document(page_content=item["text"] or "", metadata={"source": item["metadata"]["url"]}),
)
print("Documents:", loader.load())
```

Similarly, you can use other Apify Actors to load data into LangChain and query the vector index.

## Resources

- [LangChain introduction](https://python.langchain.com/docs/get_started/introduction)
- [Apify Dataset loader](https://python.langchain.com/docs/integrations/document_loaders/apify_dataset)
- [LangChain Apify Provider](https://python.langchain.com/docs/integrations/providers/apify)
