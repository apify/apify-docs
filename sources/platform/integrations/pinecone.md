---
title: Pinecone
description: Learn how to integrate Apify with Pinecone to feed data crawled from the web into the Pinecone vector database.
sidebar_position: 11.22
slug: /integrations/pinecone
---

**Learn how to integrate Apify with Pinecone to feed data crawled from the web into the Pinecone vector database.**

---

> For more information on Pinecone, visit its [documentation](https://docs.pinecone.io).

## What is Pinecone?

[Pinecone](https://pinecone.io) is a managed vector database that allows users to store and query dense vectors for AI applications such as recommendation systems, semantic search, and retrieval augmented generation.

## How to integrate Apify with Pinecone?

The Apify integration for Pinecone lets you export results from Actors and Dataset items into a specific Pinecone vector index.
Note that you also need an [OpenAI platform](https://platform.openai.com/docs/overview) account with an API key in order to compute the text embeddings.

The integration is facilitated using the [Pinecone integration](https://apify.com/jan.turon/pinecone-integration) Actor.

### Examples

These examples use the [Website Content Crawler](https://apify.com/apify/website-content-crawler), an Actor that can deeply crawl websites, clean their HTML by removing a cookies modal, footer, or navigation, and then transform the HTML to Markdown, which can be used as training data for AI models or for feeding LLM and generative AI applications with web content.

Before we start, ensure you have a [Pinecone database](https://www.pinecone.io/) set up.
Create a Pinecone index and obtain the Pinecone API token.
Additionally, you need an [OpenAI API key](https://openai.com/index/openai-api/) to compute the text embeddings and an [Apify API token](https://docs.apify.com/platform/integrations/api#api-token) to access Apify Actors.

#### User Interface - Apify Console

First, let's set up the [Website Content Crawler](https://apify.com/apify/website-content-crawler) Actor in the [Apify Console](https://console.apify.com).
Refer to this guide on how to set up [website content crawl for your project](https://blog.apify.com/talk-to-your-website-with-large-language-models/).
Once you have the crawler ready, go to the integration section and add Apify’s Pinecone integration.

![Website Content Crawler with Pinecone integration](./images/pinecone-wcc-integration.png)

Next, select when to trigger this integration (typically when a run succeeds) and fill in all the required fields for the Pinecone integration.
You can learn more about the input parameters at the [Pinecone integration input schema](https://apify.com/jan.turon/pinecone-integration/input-schema).

![Pinecone integration configuration](./images/pinecone-integration-setup.png)

Refer to our guide on [Actor-to-Actor](https://blog.apify.com/connecting-scrapers-apify-integration/) integrations for a comprehensive explanation on how to combine Actors to accomplish more complex tasks.

#### Python

Another way to interact with Pinecone is through the [Apify Python SDK](https://docs.apify.com/sdk/python/).
Install the apify-client:

`pip install apify-client`

After successfully installing the apify-client, we can start writing the Python code.

To use the Apify Actor, import `ApifyActor` and set your [Apify API token](https://docs.apify.com/platform/integrations/api#api-token) in the code.
The following example uses the [Website Content Crawler](https://apify.com/apify/website-content-crawler) Actor to crawl the entire Pinecone documentation and extract text content from the web pages.


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

That's it. You have successfully integrated Apify with Pinecone and the data is now stored in the Pinecone vector database.

## Resources

* [Apify Pinecone integration](https://apify.com/jan.turon/pinecone-integration)
* [What is Pinecone and why use it with your LLMs?](https://blog.apify.com/what-is-pinecone-why-use-it-with-llms/)
* [Pinecone documentation](https://docs.pinecone.io/)
