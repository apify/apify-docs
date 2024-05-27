---
title: Pinecone
description: Learn how to integrate Apify with Pinecone in order to feed data crawled from the web into the Pinecone vector database.
sidebar_position: 11.22
slug: /integrations/pinecone
---

**Learn how to integrate Apify with Pinecone to feed data crawled from the web into the Pinecone vector database.**

---

> For more information on Pinecone, visit its [documentation](https://docs.pinecone.io).

## What is Pinecone?

Pinecone is a managed vector database that allows users to store and query dense vectors for AI applications such as recommendation systems, semantic search, and retrieval augmented generation.

## How to integrate Apify with Pinecone?

This example focuses on integrating Apify with Pinecone using the Apify Actor.

Before we start, ensure you have a [Pinecone database](https://www.pinecone.io/) set up.
Create a Pinecone index and obtain the Pinecone API token.
Additionally, you need an [OpenAI API key](https://openai.com/index/openai-api/) and [Apify API token](https://docs.apify.com/platform/integrations/api#api-token).

Next, install the apify-client to interact with the Apify API:

`pip install apify-client`

After successfully installing the apify-client, we can start writing the Python code.

To use the Apify Actor, import `ApifyActor` and set your [Apify API token](https://docs.apify.com/platform/integrations/api#api-token) in the code.
The following example uses the [Website Content Crawler](https://apify.com/apify/website-content-crawler) Actor to crawl the entire Pinecone documentation and extract text content from the web pages.
The extracted text is formatted as a llama_index `Document` and can be fed to a vector store or language model like GPT.


```python
from apify_client import ApifyClient

APIFY_API_TOKEN = "YOUR APIFY TOKEN"
OPENAI_API_KEY = "YOUR OPENAI API KEY"
PINECONE_TOKEN = "YOUR PINECONE TOKEN"

client = ApifyClient(APIFY_API_TOKEN)

actor_call = client.actor("apify/website-content-crawler").call(
    run_input={"startUrls": [{"url": "https://docs.pinecone.io/home"}]}
)
```

Now, call Apify's Pinecone integration and store all data in the Pinecone Vector Database:

```python
pinecone_integration_inputs = dict(
    index_name="apify",
    pinecone_token=PINECONE_TOKEN,
    openai_token=OPENAI_API_KEY,
    fields=["text"],
    perform_chunking=True,
    chunk_size=2048,
    chunk_overlap=0,
)

pinecone_integration_inputs["dataset_id"] = actor_call["defaultDatasetId"]
actor_call = client.actor("jan.turon/pinecone-integration").call(run_input=pinecone_integration_inputs)

```

That's it! You have successfully integrated Apify with Pinecone and the data is now stored in the Pinecone vector database.

## Resources

* [Apify Pinecone integration](https://apify.com/jan.turon/pinecone-integration)
* [What is Pinecone and why use it with your LLMs?](https://blog.apify.com/what-is-pinecone-why-use-it-with-llms/)
* [Pinecone documentation](https://docs.pinecone.io/)
