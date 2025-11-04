---
title: ChatGPT and OpenAI Agents Integration
sidebar_label: ChatGPT and OpenAI Agents
description: Learn how to integrate Apify with ChatGPT and OpenAI Agents to provide web context in real-time.
sidebar_position: 10
slug: /integrations/chatgpt
---

**Learn how to integrate Apify Actors with ChatGPT, OpenAI API, and OpenAI Agents SDK using Model Context Protocol.**

---

ChatGPT provides easy conversational access to OpenAI's large language models (LLMs) until recently it has been limited to access third party data only using plugins or directly via API calls. But recently, OpenAI has also adopted the [Model Context Protocol (MCP)](https://openai.com/research/model-context-protocol) and allows access web data using Apify Actors.

In this tutorial, we will show you how to setup with ChagtGPT and OpenAI Agents using the Model Context Protocol (MCP) server provided by Apify. There are three main ways to integrate the Apify MCP server with OpenAI:
- *ChatGPT*: Add the server as a custom connector tool in ChatGPT (requires developer mode).
- *OpenAI API*: Use the server within the responses API endpoint.
- *OpenAI Agents SDK*: Integrate the server within OpenAI agents using the Agents SDK.

## Prerequisites

To use Apify MCP server with ChatGPT and OpenAI Agents, you need to have:
- An Apify account and an [API token](https://docs.apify.com/platform/integrations/api#api-token).
- An OpenAI account with access to ChatGPT and/or OpenAI API/Agents SDK.


## ChatGPT with Apify MCP server

:::note Developer mode

You need to enable [developer mode](https://platform.openai.com/docs/guides/developer-mode) in ChatGPT to add custom connectors like the Apify MCP server. When in developer mode, the box to sent message is wrapped with an orange border.

:::

### Create a connector

In ChatGPT, go to **Settings → Apps & Connectors → Create** (if you don't see the Create button, make sure the developer mode is enabled).

Provide the following information for your connector:
- **Name** – a user-facing title, e.g. "apify-mcp".
- **Description** – briefly describe what the connector does.
- **MCP Server URL** either use default set of tools or connect specific ones:
   – `https://mcp.apify.com` - (this will use Apify MCP with default set of tools, see mcp.apify.com for details)
- **Authentication** – select oAuth (you don't have to provide nether client ID nor secret ID).

:::caution ChatGPT currently does not allow to connect specific Actors

Currently, ChatGPT does not allow to select specific tools after the connector is created, leading to the following error: "Something went wrong". This error typically occurs for social media scrapers like Instagram or TikTok scrapers.
But you can still use them withing ChatGPT, follow the instructions in the next section.

Once you integrate and connect to Apify MPC, you won't be able to change the selected tools, so make sure to include all the tools you want to use.
You will have to create a new connector to change the selected tools.

:::

![ChatGPT create connector](../images/chatgpt-create-connector.png)

Click **Create**. you will be directed to the authentication page.
You will be redirected to Apify website to authorize ChatGPT to access your Apify account.
Make sure you are logged in to the correct Apify account before authorizing.

When you allow access, you will be redirected back to ChatGPT and you should see a success message and list of tools available from the Apify MCP server.

Once your connector with MCP server is created, you can try it out in a new ChatGPT conversation.

- Open a new chat in ChatGPT.
- Click the **+** button near the message composer, and click **More**.
- Choose the connector, this will add Apify MCP server to the conversation
- Prompt ChatGPT to use Apify tools by saying: "Search the web and summarize recent trends in AI Agents"

You will need to allow Apify tools to be used in the conversation.
You should see that ChatGPT is calling Apify tools (specifically [RAG Web browser](https://apify.com/apify/rag-web-browser)) to get the information needed to answer your question.

![ChatGPT Apify tools](../images/chatgpt-with-rag-web-browser.png)

### Use any Actor with ChatGPT

You can use any Apify Actor available on the [Apify Store](https://apify.com/store) with ChatGPT.

By default, Apify MCP exposes a set of tools that helps you to search any Actor and use it within ChatGPT.

To use any Actor, you can prompt ChatGPT like this:
- "Find and run an Actor that scrapers Instagram profiles, and get profile of @natgeo"


### Connect Apify Actors to ChatGPT

You can connect any Apify Actor to ChatGPT.
To do this:
1. Go to the [Apify MCP server configuration page](https://mcp.apify.com).
2. Select the Actor you want to add/remove
3. Copy the MCP server URL with selected Actors, e.g.  `https://mcp.apify.com?tools=mtrunkat/url-list-download-html`.
4. In ChatGPT, you need to delete the existing connector and create a new one as ChatGPT does not allow editing existing connectors.

::: caution
ChatGPT currently does not allow to select specific tools after the connector is created, leading to the following error: "Connection is not safe". This error typically occurs for social media scrapers like Instagram or TikTok scrapers.
:::

# Limitations
- MCP connection in ChatGPT is still in beta and may have some limitations or bugs.
- The tool selection and calling is quite slow, especially when using GPT-5 model family.
- ChatGPT custom connectors are only available to users with developer mode enabled.

## References:

- [ChatGPT developer mode](https://platform.openai.com/docs/guides/developer-mode)
- [Connectors and MCP servers](https://platform.openai.com/docs/guides/tools-connectors-mcp)
- [Apify MCP server](https://mcp.apify.com)
- [Apify MCP documentation](https://docs.apify.com/platform/integrations/mcp)
