---
title: Use Apify in Microsoft 365 Copilot
sidebar_label: User
description: Learn how to use the Apify agent in Microsoft 365 Copilot to discover, run, and retrieve Actors with the Apify MCP server from Copilot chat.
slug: /integrations/microsoft-365-copilot-user
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

[Microsoft 365 Copilot](https://www.microsoft.com/microsoft-365/copilot) is Microsoft's AI assistant for work. It answers questions, summarizes Microsoft 365 content, and runs agents from chat.

The Apify agent connects Microsoft 365 Copilot to Apify's library of [Actors](https://apify.com/store). It uses the [Apify MCP server](/integrations/mcp) to search Apify Store, run Actors, and retrieve datasets through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro).

This guide covers setup in Microsoft 365 Copilot. If you're an IT administrator deploying the agent for your organization, see [Deploy the Apify agent](/integrations/microsoft-365-copilot-admin).

<ThirdPartyDisclaimer />

## Prerequisites

- [An Apify account](https://console.apify.com/sign-up) - sign up for free if you don't have one.
- A Microsoft 365 Copilot license. Without it you can open the agent, but it cannot run Apify tools.
- The Apify agent available in your organization. If you cannot find it, contact your administrator.

## Install the agent

1. Open Microsoft 365 Copilot at [m365.cloud.microsoft/chat](https://m365.cloud.microsoft/chat).

1. Look for **Apify** under **Agents** in the sidebar.

1. If **Apify** is not listed, select **More agents** to open the Agent Store.

1. Search for **Apify**, open it, and select **Open** (or **Add**, if shown).

If Apify does not appear in the Agent Store, your administrator has not made it available yet.

## Authenticate to Apify

The agent uses the Apify MCP server at `https://mcp.apify.com`. Read-only tools like searching Apify Store and fetching Actor details work without signing in, but you need to authenticate to run Actors and access your account data.

1. Select **Apify** under **Agents** so the chat is scoped to the agent. Confirm the conversation title shows **Apify**.

1. Ask the agent to do something that needs your Apify account, for example `Find an Actor for scraping Google Maps`.

1. When Copilot shows **Sign in to apify**, select it. Copilot opens the Apify OAuth flow.

1. Review the permissions and click **Allow access**.

1. Back in Copilot, the agent can run Apify tools with your account.

:::tip Session persistence

The connection stays authenticated for future sessions. You can revoke access at any time in [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations).

:::

## Run your first prompt

Select **Apify** under **Agents** before you type. The agent routes the request to the right Apify tool, so you don't need to name tools yourself.

If you type into a normal Copilot chat instead, Copilot answers from general knowledge and cannot run anything on Apify.

> Use Apify to find a good Actor for scraping Google Maps places. Show me the best option, its input requirements, pricing model, and what kind of dataset output it returns. Do not run the Actor yet.

The agent searches Apify Store, fetches the top Actor's details through the Apify MCP server, and summarizes its inputs, pricing, and output - all without running the Actor.

## Example prompts

Start with short, specific requests. If you already know the Actor you want, name it explicitly - for example [`apify/web-scraper`](https://apify.com/apify/web-scraper) - rather than describing it.

_Search Apify Store:_

> Search Apify Store for Instagram scrapers.

_Actor details:_

> What does the apify/web-scraper Actor need as input?

_Retrieve results:_

> Show me the results from my last run.

## Troubleshooting

### The Apify agent doesn't appear in Copilot

Select **More agents** and search the Agent Store for **Apify**. If it is missing there too, your administrator has not made it available. Contact them and share [Deploy the Apify agent](/integrations/microsoft-365-copilot-admin).

### Copilot answers without using Apify tools

You are most likely in a normal Copilot chat. Select **Apify** under **Agents** and start a new chat. If a response explains what you would do in Apify rather than doing it, check that you are in the agent.

### The Apify MCP server shows as unauthenticated

Ask a direct request such as `Find an Actor for scraping Google Maps` so Copilot can show **Sign in to apify**. Complete the OAuth flow. See [Authenticate to Apify](#authenticate-to-apify).

If nothing happens and you are never asked to sign in, simplify the request. Long multi-step prompts can cause the agent to explain instead of act.

### Browser doesn't open, or OAuth fails

If the sign-in window doesn't open, retry the prompt and select **Sign in to apify** again.

If you don't have an Apify account, [sign up](https://console.apify.com/sign-up) and then retry the sign-in prompt.

If the agent fails to load, contact your IT administrator. The agent may not be fully deployed in your organization.

## Limitations

- Ask for one thing at a time. Long multi-step requests often fail in a single turn. Find the Actor first, then run it, then ask for results.
- Long-running Actors may exceed the time a single tool call waits for completion. Start the run from the agent, then check results in [Apify Console](https://console.apify.com).
- Each Actor run consumes Apify platform usage from your plan in addition to any Microsoft 365 Copilot usage. See [Billing](/account/billing) for details. Review the Actor's pricing in Apify Store before large jobs.
- The Apify agent cannot build or deploy Actors. That requires a local development environment. To develop Actors with AI assistance, use the [Cursor](/integrations/cursor), [GitHub Copilot](/integrations/github-copilot), or [Claude Code CLI](/integrations/claude-code-cli) integrations.

## Related integrations

- [Deploy the Apify agent](/integrations/microsoft-365-copilot-admin) - Make the agent available to your organization
- [MCP server integration](/integrations/mcp) - Use the Apify MCP server with other clients
- [ChatGPT integration](/integrations/chatgpt) - Connect the Apify MCP server to ChatGPT

## Resources

- [Get started with agents in Microsoft 365 Copilot](https://support.microsoft.com/en-us/topic/get-started-with-agents-in-microsoft-365-copilot-943e563d-602d-40fa-bdd1-dbc83f582466) - Official Microsoft 365 Copilot agent docs
- [Agent Store in Microsoft Copilot](https://learn.microsoft.com/en-us/microsoft-365/copilot/copilot-agent-store) - How the Agent Store works
- [Apify Store](https://apify.com/store) - Browse Actors you can run from Copilot
- [Apify Console](https://console.apify.com) - Runs, datasets, and usage
