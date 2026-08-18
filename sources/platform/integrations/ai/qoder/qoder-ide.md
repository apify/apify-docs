---
title: Qoder IDE integration
sidebar_label: Qoder IDE
description: Learn how to install the Apify plugin in the Qoder IDE to discover, run, and build Actors with the Apify MCP server, skills, and a routing agent.
slug: /integrations/qoder-ide
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

[Qoder IDE](https://qoder.com) is an agentic coding editor. It reads and edits your project, runs commands, and completes multi-step development tasks from a built-in chat.

The [Apify plugin for Qoder](https://github.com/apify/apify-qoder-plugin) connects the Qoder IDE to Apify's library of [Actors](https://apify.com/store) and bundles:

- The [Apify MCP server](/integrations/mcp) for searching Apify Store, running Actors, and retrieving datasets through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro).
- An `apify` routing agent that picks the right tool or skill from a natural-language request.
- Five built-in skills for common workflows (see [Bundled skills](#bundled-skills) below).

<ThirdPartyDisclaimer />

## Prerequisites

- [An Apify account](https://console.apify.com/sign-up) - sign up for free if you don't have one.
- [Qoder IDE](https://qoder.com) - installed and signed in.

## Install the plugin

You can install the plugin two ways: a one-click install from the Qoder Marketplace, or a manual import of the downloaded plugin package. The one-click install requires Qoder IDE v1.23.0 or newer.

### One-click install

1. Open the [Apify plugin on the Qoder Marketplace](https://qoder.com/marketplace/plugin?id=bbbdb1cb-8bad-441e-b42f-ce0e33e3a521) and select **Qoder IDE** to install directly.

    ![Apify plugin page on the Qoder Marketplace with the Qoder IDE install option](images/qoder-ide/1-marketplace.webp)

1. The Qoder IDE opens an install dialog. Review the plugin details and select **Install Plugin**.

    ![Qoder IDE install dialog for the Apify plugin with the Install Plugin action](images/qoder-ide/2-install-dialog.webp)

1. The **Apify** plugin appears under **Installed**. Make sure it's enabled.

    ![Plugins page showing the Apify plugin installed and enabled](images/qoder-ide/3-installed.webp)

### Manual install

If you're on an older version or prefer to install from a file:

1. On the [Apify plugin on the Qoder Marketplace](https://qoder.com/marketplace/plugin?id=bbbdb1cb-8bad-441e-b42f-ce0e33e3a521), under **For Human**, select the download icon to download the plugin package.

1. In the Qoder IDE, open the account menu and select **Qoder Settings**.

    ![Qoder IDE account menu with Qoder Settings selected](images/qoder-ide/4-settings.webp)

1. Select **Plugins**, then under **Custom** select **Import** and choose the plugin package you downloaded.

    ![Qoder Settings Plugins page with the Plugins section and the Import action](images/qoder-ide/5-import.webp)

1. The **Apify Qoder Plugin** appears under **Custom**. Make sure it's enabled.

    ![Plugins page showing the imported Apify Qoder Plugin enabled under Custom](images/qoder-ide/6-plugin-listed.webp)

After installing with either method, select **MCP Server** to confirm the `apify` server is registered from the plugin. It connects to `https://mcp.apify.com` and exposes the Apify tools.

![MCP Server page listing the apify server from the plugin with its tools](images/qoder-ide/7-mcp.webp)

## Authenticate to Apify

Read-only tools like searching Apify Store and fetching Actor details work without signing in, but you need to authenticate to run Actors and access your account data.

On the first action that needs your account, the Qoder IDE opens a browser tab for the Apify OAuth flow. Review the permissions and allow access to finish signing in. The connection stays authenticated for future sessions, and you can revoke access at any time in [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations).

## Run your first prompt

Open the chat and describe what you want in natural language. The `apify` agent routes the request to the right tool or skill, so you don't need to name tools yourself.

> What Apify tools do you have available?

The agent lists the Apify MCP tools and skills it can call.

![Qoder IDE chat listing the available Apify tools and skills](images/qoder-ide/8-test.webp)

## Bundled skills

| Skill | Description |
| --- | --- |
| `apify-ultimate-scraper` | Extraction using existing Actors for multi-step scraping and lead-generation workflows. |
| `apify-actor-development` | Full Actor lifecycle - template selection, development, local testing, and deployment with `apify push`. |
| `apify-actorization` | Converts existing JavaScript, TypeScript, Python, or CLI projects into Apify Actors. |
| `apify-generate-output-schema` | Generates dataset and key-value store schemas for existing Actors. |
| `apify-sdk-integration` | Integrates Actor execution into applications using the `apify-client` package. |

## Troubleshooting

### The Apify server doesn't appear under MCP Server

Confirm the Apify plugin is enabled on the **Plugins** page, then open the **MCP Server** page again. If the server is still missing, restart the Qoder IDE so the plugin's MCP server registers.

### Actor runs time out

Increase the request timeout for the `apify` server on the **MCP Server** page.

### Browser doesn't open, or OAuth fails

If the browser doesn't open automatically, copy the OAuth URL shown by the IDE and paste it into your browser manually. If sign-in still fails, authenticate with an API token from [Apify Console > Settings > Integrations](https://console.apify.com/settings/integrations).

## Limitations

- Long-running Actors may exceed the time a single tool call waits for completion. Reduce the scope or split the work across multiple prompts.
- Each Actor run consumes Apify platform usage from your plan in addition to any Qoder usage. See [Billing](/account/billing) for details.
- Skills that edit files in your project (Actor development, actorization, SDK integration) make local changes - review them before deploying or committing.

## Related integrations

- [Qoder CLI integration](/integrations/qoder-cli) - Install the same plugin in the Qoder CLI
- [QoderWork integration](/integrations/qoder-work) - Upload the plugin in QoderWork
- [MCP server integration](/integrations/mcp) - Use the Apify MCP server with other clients

## Resources

- [Apify plugin for Qoder](https://github.com/apify/apify-qoder-plugin) - Source repository and README with advanced setup notes
- [Qoder documentation](https://docs.qoder.com) - Official Qoder docs
- [Apify Store](https://apify.com/store) - Browse Actors you can run from the Qoder IDE
