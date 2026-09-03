---
title: Deploy the Apify agent
sidebar_label: Admin
description: Learn how to deploy the Apify agent in Microsoft 365 Copilot so your organization can search Apify Store, run Actors, and retrieve results from chat.
slug: /integrations/microsoft-365-copilot-admin
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

This guide is for Microsoft 365 administrators. It covers making the Apify agent available to users in [Microsoft 365 Copilot](https://www.microsoft.com/microsoft-365/copilot).

The Apify agent is a declarative agent for Microsoft 365 Copilot. It connects Copilot to Apify's library of [Actors](https://apify.com/store) through the [Apify MCP server](/integrations/mcp). Users can search Apify Store, run Actors, and retrieve datasets through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro).

The agent calls Apify's remote MCP server at `https://mcp.apify.com`. No data flows to Apify until a user signs in with their own Apify account and runs a tool.

Once you complete these steps, users follow [Use Apify in Microsoft 365 Copilot](/integrations/microsoft-365-copilot-user).

<ThirdPartyDisclaimer />

## Prerequisites

- A Teams Administrator or Global Administrator role. You need it to allow and deploy the app.
- Microsoft 365 Copilot licenses for users who will run Apify tools. Users without a license can open the agent, but tool calls will not run.
- [An Apify account](https://console.apify.com/sign-up) for each end user. Free accounts work. You cannot pre-provision a shared Apify login.

:::note MCP connection is automatic

You do not need to register `mcp.apify.com` as an MCP server. The MCP connection is part of the app package. It is configured when you deploy the app.

:::

## Install the agent

### Allow the app

1. Go to the [Teams admin center](https://admin.teams.microsoft.com) > **Teams apps** > **Manage apps**.

1. Search for **Apify**.

1. Open the app and confirm its status is **Allowed**. If it is **Blocked**, change it to **Allowed**.

Making the app allowed means users can find and install it from the Agent Store. If that is all you want, stop here and send users [Use Apify in Microsoft 365 Copilot](/integrations/microsoft-365-copilot-user).

### Install the app for users

If you want the agent to appear without users installing it:

1. In the Teams admin center, go to **Teams apps** > **Setup policies**.

1. Open **Global (Org-wide default)**, or create a new policy and assign it to a specific group if you are piloting.

1. Under **Installed apps**, select **Add apps**, find **Apify**, and add it.

1. Optionally add it under **Pinned apps** so it is visible without users searching.

1. Click **Save**.

Alternatively, on the app's page in **Manage apps**, use the **Users and groups** tab to assign the app to specific people or groups.

:::tip Pilot with a group first

Assign the app to a small group rather than editing the Global policy. It is easier to reverse and avoids a tenant-wide change while you evaluate.

:::

Policy changes are not instant. Allow up to 24 hours before concluding that a deployment failed. Users who had Copilot open should reload it and start a new chat.

## Authenticate to Apify

Each user signs in with their own Apify account. You cannot pre-approve this centrally.

The first time a user runs a tool, Copilot prompts them to sign in. Users complete the Apify OAuth flow themselves. Apify tokens are not visible to Microsoft 365 or to administrators.

Read-only tools like searching Apify Store work without signing in. Users need to authenticate to run Actors and access their account data.

:::tip Session persistence

The connection stays authenticated for future sessions. Users can revoke access at any time in [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations).

:::

## Run your first prompt

1. Open Microsoft 365 Copilot at [m365.cloud.microsoft/chat](https://m365.cloud.microsoft/chat).

1. Confirm **Apify** appears under **Agents** in the sidebar.

1. Select **Apify** and send:

> Use Apify to find a good Actor for scraping Google Maps places. Show me the best option, its input requirements, pricing model, and what kind of dataset output it returns. Do not run the Actor yet.

Copilot prompts you to sign in to Apify. That confirms the agent and its tools are working.

The agent searches Apify Store, fetches the top Actor's details through the Apify MCP server, and summarizes its inputs, pricing, and output - all without running the Actor.

## Brief your users

Tell users these two points when you announce the rollout.

### Select the agent first

Users must select **Apify** under **Agents** before typing. In a normal Copilot chat, the agent's tools are not available. Copilot may answer Apify questions from general knowledge without saying it is not connected.

### Each user signs in individually

The first time a user runs a tool, they are prompted to sign in to Apify. This is per-user. Users need their own Apify account.

## Data and privacy

- Prompts and parameters relevant to a tool call are sent to `mcp.apify.com` when a user invokes an Apify tool.
- Apify is a non-Microsoft service. Data processed by Apify is governed by Apify's terms, not by your Microsoft agreements.
- Review [Apify's privacy policy](https://apify.com/privacy-policy) and [terms of use](https://apify.com/terms-of-use) before deploying.
- Users authenticate with their own Apify credentials through OAuth. Apify tokens are not visible to Microsoft 365 or to administrators.

## Manage and remove the agent

- To block the agent for the organization, go to the Teams admin center > **Manage apps** > **Apify** and set the status to **Blocked**.
- To remove it for specific users, remove the app from the setup policy assigned to them, or unassign it under **Users and groups**.
- To restrict which agents are available, go to the Microsoft 365 admin center > **Copilot** > **Settings** > **Data access** > **Agents**. You can control which users can access agents and which publisher types are permitted.

## Troubleshooting

### Users can't find the Apify agent

Confirm the app status is **Allowed** in **Teams apps** > **Manage apps**. If users report "We couldn't load the info about this agent," the app is in the catalog but not fully published. Check that the app shows a published version, not `--`.

Policy changes can take up to 24 hours. Ask users to reload Copilot and start a new chat.

### Copilot answers without using Apify tools

Users are almost always in a plain Copilot chat rather than in the agent. Have them select **Apify** under **Agents** first. If they are in the agent, check that they hold a Microsoft 365 Copilot license.

### Some users see the agent, others don't

Check the setup policy assigned to each user, and confirm propagation has completed. Policy changes can take up to 24 hours.

### Browser doesn't open, or OAuth fails

Sign-in is per-user and cannot be completed by an administrator. Have the user select **Apify**, send a simple prompt such as `Find an Actor for scraping Google Maps`, and complete **Sign in to apify**. See [Authenticate to Apify](#authenticate-to-apify) and [Use Apify in Microsoft 365 Copilot](/integrations/microsoft-365-copilot-user).

## Limitations

- Changes to app availability and setup policies can take up to 24 hours to propagate.
- Long-running Actors may exceed the time a single tool call waits for completion. Have users reduce the scope or split the work across multiple prompts.
- Each Actor run consumes Apify platform usage from the user's Apify plan in addition to any Microsoft 365 Copilot usage. See [Billing](/account/billing) for details.
- The Apify agent cannot build or deploy Actors. Point developers to the [Cursor](/integrations/cursor), [GitHub Copilot](/integrations/github-copilot), or [Claude Code CLI](/integrations/claude-code-cli) integrations.

## Related integrations

- [Use Apify in Microsoft 365 Copilot](/integrations/microsoft-365-copilot-user) - End-user setup and first prompts
- [MCP server integration](/integrations/mcp) - Use the Apify MCP server with other clients
- [ChatGPT integration](/integrations/chatgpt) - Connect the Apify MCP server to ChatGPT

## Resources

- [Manage your apps in the Microsoft Teams admin center](https://learn.microsoft.com/en-us/microsoftteams/manage-apps) - Allow or block the Apify app
- [Manage agents and app setup policies](https://learn.microsoft.com/en-us/microsoftteams/teams-app-setup-policies) - Install and pin the app for users
- [Manage agents for Microsoft 365 Copilot](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/manage) - Admin controls for Copilot agents
- [Agents admin guide for Microsoft 365](https://learn.microsoft.com/en-us/copilot/microsoft-365/agent-essentials/m365-agents-admin-guide) - Official Microsoft admin guidance
- [Apify Store](https://apify.com/store) - Browse Actors users can run from Copilot
