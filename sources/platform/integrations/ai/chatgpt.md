---
title: ChatGPT Integration
sidebar_label: ChatGPT
description: Learn how to integrate Apify with ChatGPT to provide web context in real-time.
sidebar_position: 11
slug: /integrations/chatgpt
---

**Learn how to integrate Apify Actors with ChatGPT to provide web context in real-time.**

---

ChatGPT provides easy conversational access to OpenAI's large language models (LLMs).
Until recently, ChatGPT could access third-party data only through plugins or direct API calls.
Now, OpenAI supports the [Model Context Protocol (MCP)](https://openai.com/research/model-context-protocol), which enables integration with web data using Apify Actors.

In this tutorial, you'll learn how to connect ChatGPT to the **Apify MCP server** using a custom connector.
This allows ChatGPT to use Apify tools and Actors directly in conversations.

## Prerequisites

To use the Apify MCP server with ChatGPT, you need:

- An [Apify account and API token](https://docs.apify.com/platform/integrations/api#api-token)
- An OpenAI account with access to ChatGPT
- ChatGPT with **Developer Mode** enabled

## Enable developer mode in ChatGPT

You must enable [Developer Mode](https://platform.openai.com/docs/guides/developer-mode) in ChatGPT to add custom connectors like the Apify MCP server.
When Developer Mode is active, the message input box is outlined in orange.

## Create a connector

1. In ChatGPT, go to **Settings → Apps & Connectors → Create**. If you don't see the **Create** button, enable developer mode or reload the page.

2. Fill in the following fields:

    - **Name** – a user-facing title, e.g., `apify-mcp`
    - **Description** – a short description of what the connector does
    - **MCP Server URL** – choose one of the following:
        - `https://mcp.apify.com` — use the default set of Apify tools
        - `https://mcp.apify.com?tools=actors,docs,mtrunkat/url-list-download-html` — use specific tools
          (See [mcp.apify.com](https://mcp.apify.com) for details.)
    - **Authentication** – OAuth, you don’t need to provide a client ID or secret.

:::caution ChatGPT currently cannot change selected tools after connector creation
At the moment, ChatGPT does not allow modifying the selected tools after the connector is created.
If you need to add or remove tools later, you’ll need to create a new connector.

If you try to use a connector with social media scrapers like Instagram or TikTok, you may see the error:
"Something went wrong with setting up the connection."
This error typically occurs for social media scrapers like Instagram, TikTok, etc. 
But you can still use these Actors with ChatGPT by including them when initially setting up the connector.

:::

## Authorize access

Click **Create** to proceed to the authentication page.
You’ll be redirected to the Apify website to authorize ChatGPT to access your Apify account.
Ensure you're logged into the correct Apify account before approving access.

Once authorized, you’ll return to ChatGPT and see a success message with a list of tools available from the Apify MCP server.

## Try the connector

Once your connector is ready:

1. Open a **new chat** in ChatGPT.
2. Click the **+** button near the message composer and select **More**.
3. Choose your **Apify MCP connector** to add it to the conversation.
4. Ask ChatGPT to use Apify tools, for example:

   > “Search the web and summarize recent trends in AI agents”

You’ll need to grant permission for each Apify tool when it’s used for the first time.
You should see ChatGPT calling Apify tools — such as the [RAG Web Browser](https://apify.com/apify/rag-web-browser) — to gather information.

![ChatGPT Apify tools](../images/chatgpt-with-rag-web-browser.png)

## Use any actor with ChatGPT

You can use any [Apify Actor](https://apify.com/store) with ChatGPT.
By default, the Apify MCP server exposes a set of tools that lets you search and use Actors directly.

**Example query:**

> “Find and run an Actor that scrapes Instagram profiles, and get the profile of @natgeo”


# Limitations

- MCP integration in ChatGPT is still in **beta** and may have some limitations or bugs.
- Tool selection and execution can be **slow**, especially with the latest GPT models.
- **Custom connectors** are only available in ChatGPT **Developer Mode**.

## Related integrations

- [OpenAI Assistants integration](/platform/integrations/openai-assistants) — Use Apify Actors with OpenAI Assistants API via function calling
- [OpenAI Agents SDK integration](/platform/integrations/openai-agents) — Integrate Apify MCP server with OpenAI Agents SDK

## References

- [ChatGPT Developer Mode](https://platform.openai.com/docs/guides/developer-mode)
- [Connectors and MCP servers](https://platform.openai.com/docs/guides/tools-connectors-mcp)
- [Apify MCP server](https://mcp.apify.com)
- [Apify MCP documentation](https://docs.apify.com/platform/integrations/mcp)
