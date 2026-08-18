---
title: GitHub Copilot desktop app integration
sidebar_label: GitHub Copilot desktop app
description: Learn how to install the Apify plugin in the GitHub Copilot desktop app to discover, run, and build Actors with the Apify MCP server and skills.
slug: /integrations/github-copilot-desktop
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

The [GitHub Copilot desktop app](https://github.com/features/ai/github-app) is GitHub's standalone Copilot client. It runs agentic coding sessions in a chat interface, connects to your repositories, and supports plugins, skills, and Model Context Protocol (MCP) servers.

The [Apify plugin for GitHub Copilot](https://github.com/apify/apify-github-copilot-plugin) connects Copilot to Apify's library of [Actors](https://apify.com/store) and bundles:

- The [Apify MCP server](/integrations/mcp) for searching Apify Store, running Actors, and retrieving datasets.
- An `apify` routing agent that picks the right tool or skill based on your prompt.
- [Five built-in skills](#bundled-skills) for common workflows.

This guide covers installation in the GitHub Copilot desktop app.

<ThirdPartyDisclaimer />

## Prerequisites

- [An Apify account](https://console.apify.com/sign-up) - sign up for free if you don't have one.
- The [GitHub Copilot desktop app](https://github.com/features/ai/github-app) - installed and signed in.

## Install the plugin

1. Open **Settings**, select the **Plugins** tab, and search for `Apify`. The `apify` plugin appears in the results. Select **Install**.

    ![GitHub Copilot desktop app Plugins settings with the apify plugin in the search results](images/github-copilot-desktop/01-plugins-search-install.webp)

1. The plugin appears under **Installed** with its toggle enabled.

    ![GitHub Copilot desktop app showing the apify plugin installed and enabled](images/github-copilot-desktop/02-plugin-installed.webp)

## Connect the Apify MCP server

The plugin connects to the Apify MCP server (`https://mcp.apify.com/`) using HTTP transport. Read-only tools like searching Apify Store and fetching Actor details work without signing in. To run Actors and access your account data, you need to authenticate.

1. Open **Settings**, select the **MCP servers** tab, and find `apify-mcp-server` with the `HTTP` transport. Select **Sign in**.

    ![GitHub Copilot desktop app MCP servers settings with the apify-mcp-server Sign in button](images/github-copilot-desktop/03-mcp-server-signin.webp)

1. Complete the Apify OAuth flow in your browser and choose the account to connect.

    ![Browser window confirming the Apify authorization was successful](images/github-copilot-desktop/04-authorization-successful.webp)

:::tip Session persistence

The connection stays authenticated for future sessions. You can revoke access at any time in [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations).

:::

## Select the apify agent

Open the agent picker in the chat composer and select the `apify` agent.

![GitHub Copilot desktop app agent picker with the apify agent available](images/github-copilot-desktop/05-agent-picker.webp)

## Run your first prompt

With the `apify` agent selected, describe what you want in plain language.

> Use Apify to find a good Actor for scraping Google Maps places. Show me the best option, its input requirements, pricing model, and what kind of dataset output it returns. Do not run the Actor yet.

The agent searches Apify Store, fetches the top Actor's details, and summarizes its inputs, pricing, and output - without running the Actor.

![GitHub Copilot desktop app listing what the Apify plugin can do](images/github-copilot-desktop/06-example-prompt.webp)

## Bundled skills

| Skill | Description |
| --- | --- |
| `apify-ultimate-scraper` | CLI-driven extraction using existing Actors for multi-step scraping and lead-generation workflows. |
| `apify-actor-development` | Full Actor lifecycle - template selection, development, local testing, and deployment with `apify push`. |
| `apify-actorization` | Converts existing JavaScript, TypeScript, Python, or CLI projects into Apify Actors. |
| `apify-generate-output-schema` | Generates dataset and key-value store schemas for existing Actors. |
| `apify-sdk-integration` | Integrates Actor execution into applications using the `apify-client` package. |

Example prompts that route to specific skills:

_Ultimate scraper:_

> Find 10 highly rated coffee shops in Seattle with name, address, rating, phone, and website.

_Actor development:_

> Create an Apify Actor that accepts a `startUrl` and `maxPages` input, crawls the site, and stores each page title and URL.

_SDK integration:_

> Add Apify to this project. The Node.js API route should run an Actor and return dataset items as JSON.

## Troubleshooting

### The apify plugin doesn't appear in search

If the `apify` plugin doesn't appear when you search for `Apify`:

1. Quit the desktop app, reopen it, and search again.

1. If the plugin still doesn't appear, add its marketplace manually. Open **Settings > Plugins**, select **Install > Add marketplace**, and enter the repository URL:

    ```text
    https://github.com/apify/apify-github-copilot-plugin
    ```

    The `apify` plugin then appears in the **Plugins** list. Select **Install** and continue with [Connect the Apify MCP server](#connect-the-apify-mcp-server).

### The Apify MCP server won't sign in

Open **Settings > MCP servers**, confirm `apify-mcp-server` uses the `HTTP` transport, and select **Sign in** to restart the OAuth flow. Read-only tools work without signing in, so run a search prompt first to confirm the server is connected.

### The apify agent isn't available

Confirm the plugin is installed and enabled under **Settings > Plugins**, then reopen the agent picker in the chat composer. The `apify` agent appears once the plugin is active.

## Limitations

- Long-running Actors may time out during a single tool call. Reduce the scope or split the work across multiple prompts.
- Each Actor run counts toward your Apify plan usage in addition to any Copilot usage. See [Billing](/account/billing) for details.
- Skills that edit files in your project (Actor development, actorization, SDK integration) make local changes - review them before deploying or committing.

## Related integrations

- [VS Code integration](/integrations/vscode) - Install the same plugin from the VS Code plugin marketplace
- [GitHub Copilot CLI integration](/integrations/github-copilot-cli) - Install the Apify plugin in the GitHub Copilot CLI
- [MCP server integration](/integrations/mcp) - Use the Apify MCP server with other clients

## Resources

- [Apify plugin for GitHub Copilot](https://github.com/apify/apify-github-copilot-plugin) - Source repository and full README with advanced setup notes
- [GitHub Copilot documentation](https://docs.github.com/en/copilot) - Official GitHub Copilot docs
- [Apify Store](https://apify.com/store) - Browse Actors you can run from Copilot
