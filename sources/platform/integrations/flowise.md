---
title: Flowise
description: Learn how to integrate Apify with Flowise.
sidebar_position: 11.22
slug: /integrations/flowise
---

# Flowise

**Learn how to integrate Apify with Flowise.**

---

> For more information on Flowise, visit [documentation](https://flowiseai.com/).

## What is Flowise?

Flowise is an open-source UI visual tool to build your customized LLM flow using Langchain.

## How to use Apify with Flowise?

If you have any experience with Flowise, you need to download and run it locally.
You can find the instructions [here](https://github.com/FlowiseAI/Flowise#quick-start).

After running Flowise, you can start building your flow with Apify.

The first step is to create a new flow in the web UI.

In the left menu, you need to find Apify Website Content Crawler under Document Loaders.

![Flowise and Apify](images/flowise.png)

Now you need to configure the crawler. You can find more information about the crawler [here](https://apify.com/apify/website-content-crawler).
In the configuration, provide your Apify API token, which you can find in your [Apify account](https://my.apify.com/account#/integrations).

You can add more loaders, or you can add some processors to process the data.
In our case, we create the flow that loads data from the Apify docs using Website Content Crawler and save them into the in-memory vector database.
Connect the ChatOpenAI and the OpenAI embeddings and QA retrieval into the chatbot.

The final flow can answer questions about Apify docs.

![Flowise and Apify](images/flowise-2.png)

## Resources

* [Flowise](https://flowiseai.com/)
* [Flowise documentation](https://github.com/FlowiseAI/Flowise#quick-start)
