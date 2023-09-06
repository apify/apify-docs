---
title: Flowise
description: Learn how to integrate Apify with Flowise.
sidebar_position: 11.22
slug: /integrations/flowise
---

# Flowise

**Learn how to integrate Apify with Flowise**

---

> For more information on Flowise visit [documentation](https://flowiseai.com/).

## What is Flowise?

Flowise is an open source UI visual tool to build your customized LLM flow using Langchain.

## How to use Apify with Flowise?

If you do not work with Flowise yet, you need to download it and run it locally.
You can find the instructions [here](https://github.com/FlowiseAI/Flowise#quick-start).

After you have Flowise running, you can start building your flow with Apify.

In the first step you need to create new flow in the web UI.

After you need to find Apify Website Content Crawler under Document Loaders in the left menu.

![Flowise and Apify](images/flowise.png)

Then you need to configure the crawler. You can find more information about the crawler [here](https://apify.com/apify/website-content-crawler).
In the configuration you need to provide your Apify API token, which you can find in your [Apify account](https://my.apify.com/account#/integrations).

You can add more loaders or you can add some processors to process the data.
In our case we create the flow which load data from Apify docs using Website Content Crawler and save them into in-memory vector database.
After we use the ChatOpenAI and the OpenAI embeddings and QA retrieval to connect it together into chat bot.

The final flow is able to answer questions about Apify docs.

![Flowise and Apify](images/flowise-2.png)

## Resources

* [Flowise](https://flowiseai.com/)
* [Flowise documentation](https://github.com/FlowiseAI/Flowise#quick-start)



