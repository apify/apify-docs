---
title: Milvus integration
description: Learn how to integrate Apify with Milvus (Zilliz) to save data scraped from the websites into the Milvus vector database.
sidebar_label: Milvus
sidebar_position: 4
slug: /integrations/milvus
toc_min_heading_level: 2
toc_max_heading_level: 4
---

**Learn how to integrate Apify with Milvus (Zilliz) to save data scraped from websites into the Milvus vector database.**

---

[Milvus](https://milvus.io/) is an open-source vector database optimized for performing similarity searches on large datasets of high-dimensional vectors.
Its focus on efficient vector similarity search allows for the creation of powerful and scalable retrieval systems.

The Apify integration for Milvus allows exporting results from Apify Actors and Dataset items into a Milvus collection.
It can also be connected to a managed Milvus instance on [Zilliz Cloud](https://cloud.zilliz.com).

## Prerequisites

Before you begin, ensure that you have the following:

- A Milvus/Zilliz database universal resource identifier (URI) and Token to setup the client. Optionally, you can use a username and password in the URI. You can run Milvus on Docker or Kubernetes, but in this example, we'll use the hosted Milvus service at [Zilliz Cloud](https://cloud.zilliz.com).
- An [OpenAI API key](https://openai.com/index/openai-api/) to compute text embeddings.
- An [Apify API token](https://docs.apify.com/platform/integrations/api#api-token) to access [Apify Actors](https://apify.com/store).

### How to set up Milvus/Zilliz database

1. Sign up or log in to your Zilliz account and create a new cluster.

1. Find the `uri` and `token`, which correspond to the [Public Endpoint and API key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details) in Zilliz Cloud.

Note that the collection does not need to exist beforehand.
It will be automatically created when data is uploaded to the database.

Once the cluster is ready, and you have the `URI` and `Token`, you can set up the integration with Apify.


### Integration Methods

You can integrate Apify with Milvus using either the Apify Console or the Apify Python SDK.

:::note Website Content Crawler usage

These examples use the Website Content Crawler Actor, which performs deep website crawling, cleans HTML by removing modals and navigation elements, and converts the content into Markdown.

:::

#### Apify Console

1. Set up the [Website Content Crawler](https://apify.com/apify/website-content-crawler) Actor in the [Apify Console](https://console.apify.com). Refer to this guide on how to set up [website content crawl for your project](https://blog.apify.com/talk-to-your-website-with-large-language-models/).

1. After setting up the crawler, go to the **integration** section, select **Connect Actor or Task**, and search for the Milvus integration.

1. Select when to trigger this integration (typically when a run succeeds) and fill in all the required fields. If you haven't created a collection, it will be created automatically. You can learn more about the input parameters at the [Milvus integration input schema](https://apify.com/apify/milvus-integration/input-schema).

- For a detailed explanation of the input parameters, including dataset settings, incremental updates, and examples, see the [Milvus integration description](https://apify.com/apify/milvus-integration).

- For an explanation on how to combine Actors to accomplish more complex tasks, refer to the guide on [Actor-to-Actor](https://blog.apify.com/connecting-scrapers-apify-integration/) integrations.

#### Python

Another way to interact with Milvus is through the [Apify Python SDK](https://docs.apify.com/sdk/python/).

1. Install the Apify Python SDK by running the following command:

    ```py
    pip install apify-client
    ```

1. Create a Python script and import all the necessary modules:

    ```python
    from apify_client import ApifyClient

    APIFY_API_TOKEN = "YOUR-APIFY-TOKEN"
    OPENAI_API_KEY = "YOUR-OPENAI-API-KEY"

    MILVUS_COLLECTION_NAME = "YOUR-MILVUS-COLLECTION-NAME"
    MILVUS_URI = "YOUR-MILVUS-URI"
    MILVUS_TOKEN = "YOUR-MILVUS-TOKEN"
    client = ApifyClient(APIFY_API_TOKEN)
    ```

1. Call the [Website Content Crawler](https://apify.com/apify/website-content-crawler) Actor to crawl the Milvus documentation and Zilliz website and extract text content from the web pages:

    ```python
    actor_call = client.actor("apify/website-content-crawler").call(
        run_input={"maxCrawlPages": 10, "startUrls": [{"url": "https://milvus.io/"}, {"url": "https://zilliz.com/"}]}
    )
    ```

1. Call Apify's Milvus integration and store all data in the Milvus Vector Database:

    ```python
    milvus_integration_inputs = {
        "milvusUri": MILVUS_URI,
        "milvusToken": MILVUS_TOKEN,
        "milvusCollectionName": MILVUS_COLLECTION_NAME,
        "datasetFields": ["text"],
        "datasetId": actor_call["defaultDatasetId"],
        "deltaUpdatesPrimaryDatasetFields": ["url"],
        "expiredObjectDeletionPeriodDays": 30,
        "embeddingsApiKey": OPENAI_API_KEY,
        "embeddingsProvider": "OpenAI",
    }
    actor_call = client.actor("apify/milvus-integration").call(run_input=milvus_integration_inputs)
    ```

Congratulations! You've successfully integrated Apify with Milvus, and the scraped data is now stored in your Milvus database.
For a complete example of Retrieval-Augmented Generation (RAG), check out the Additional Resources below.

## Additional Resources

- [Apify Milvus Integration](https://apify.com/apify/milvus-integration)
- [Milvus documentation](https://milvus.io/docs)
- [Retrieval-Augmented Generation: Crawling Websites with Apify and Saving Data to Milvus for Question Answering](https://milvus.io/docs/apify_milvus_rag.md)
