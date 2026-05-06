---
title: OpenClaw integration
sidebar_label: OpenClaw
description: Learn how to integrate Apify with OpenClaw to give your AI agents access to web scraping, data extraction, and automation using pre-built Actors.
sidebar_position: 1
slug: /integrations/openclaw
toc_min_heading_level: 2
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

[OpenClaw](https://openclaw.io) is an open-source AI agent orchestration platform that enables you to build, deploy, and manage autonomous AI agents. The Apify plugin for OpenClaw gives your agents access to thousands of pre-built Actors for web scraping, data extraction, and automation through a single `apify` tool.

For more details about OpenClaw, refer to the [official documentation](https://docs.openclaw.ai/).

<ThirdPartyDisclaimer />

## Quick start

Install the plugin, run the setup wizard, and restart the gateway:

```bash
openclaw plugins install @apify/apify-openclaw-plugin
openclaw apify setup
openclaw gateway restart
```

Watch a quick demo of the Apify plugin for OpenClaw:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/-9XJxG4b4H4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Prerequisites

Before integrating Apify with OpenClaw, you'll need:

- _An Apify account_ - If you don't have one, [sign up here](https://console.apify.com/sign-up).
- _Apify API token_ - Get your token from the **API & Integrations** section in [Apify Console](https://console.apify.com/settings/integrations).
- _OpenClaw_ - Version 2026.1.0 or later. Install from the [OpenClaw website](https://openclaw.io/).
- _Node.js 22+_ - Required to run the plugin. Install from [nodejs.org](https://nodejs.org/en/download/).

## Set up the Apify plugin

Setting up the plugin involves three steps:

1. [Install the plugin](#install-the-plugin)
1. [Configure your API token](#configure-with-interactive-setup-recommended) (interactively or [manually](#configure-manually))
1. [Verify the setup](#verify-the-setup)

### Install the plugin

Use the OpenClaw CLI to install the Apify plugin from the plugin registry:

```bash
openclaw plugins install @apify/apify-openclaw-plugin
```

This downloads the plugin and registers it with your OpenClaw installation.

### Configure with interactive setup (recommended)

Run the setup wizard to configure your API key:

```bash
openclaw apify setup
```

The wizard prompts you for your Apify API token, verifies the connection, and writes the configuration to your OpenClaw config file. You can find your token in the **API & Integrations** section of [Apify Console](https://console.apify.com/settings/integrations).

After setup, restart the gateway to load the plugin:

```bash
openclaw gateway restart
```

### Configure manually

If you prefer to skip the wizard, add the plugin configuration directly to your `~/.openclaw/config.json`:

```json
{
  "plugins": {
    "entries": {
      "apify": {
        "enabled": true,
        "config": {
          "apiKey": "apify_api_..."
        }
      }
    }
  },
  "tools": {
    "alsoAllow": ["apify"]
  }
}
```

Then restart the gateway:

```bash
openclaw gateway restart
```

:::caution Tool allowlisting required

The `apify` tool must be listed in `tools.alsoAllow` in your config, or you can use `"group:plugins"` to allow all plugin tools. Without this, the tool won't be available to your agents.

:::

### Verify the setup

Check your configuration:

```bash
openclaw apify status
```

## Apify tool overview

The plugin registers a single `apify` tool with three actions:

| Action | Purpose |
| ------ | ------- |
| `discover` | Search Apify Store for Actors by keyword, or fetch an Actor's input schema |
| `start` | Run an Actor asynchronously and get a `runId` back |
| `collect` | Retrieve results from completed Actor runs |

### Two-phase async pattern

The tool uses an asynchronous workflow. Your agent starts an Actor run and gets a `runId` immediately, then collects results later when the run completes. This lets agents do other work while Actors are running.

```text
discover (search) -> discover (schema) -> start -> collect
```

### Batch multiple targets

Most Actors accept arrays in their input (for example, `startUrls`, `queries`, `usernames`). As a best practice, batch multiple targets into a single run - one run with 5 URLs is cheaper and faster than 5 separate runs.

## What you can do

Once the plugin is set up, your OpenClaw agents can:

- _Search for scrapers_ - Ask your agent to find an Actor for any platform (for example, "find me an Instagram scraper") and it discovers the right one from [Apify Store](https://apify.com/store).
- _Scrape any website_ - Your agent can extract data from Google Search, Instagram, TikTok, YouTube, Google Maps, e-commerce sites, and more.
- _Batch multiple targets_ - Scrape several URLs, profiles, or search queries in a single Actor run. One run with 5 targets is cheaper and faster than 5 separate runs.
- _Run multiple Actors in parallel_ - Start scrapers for different platforms at the same time and collect all results together.
- _Delegate to sub-agents_ - For complex research tasks, your agent can delegate scraping work to a sub-agent, keeping the parent agent's context focused on higher-level reasoning.

:::note Actor runs may take some time

Actor execution time varies depending on the task complexity. Check Actor run status in [Apify Console](https://console.apify.com/) if a run takes longer than expected.

:::

## Configuration options

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `apiKey` | string | `APIFY_API_KEY` env var | Your Apify API token |
| `baseUrl` | string | `https://api.apify.com` | Apify API base URL |
| `maxResults` | number | `20` | Maximum items to return per dataset (1-1000) |
| `enabledTools` | string[] | `[]` (all enabled) | Restrict which tool actions are available |

## Troubleshooting

### Authentication errors

- _Check your API token_ - Verify your Apify API token is correct by running `openclaw apify status`. You can find your token in the **API & Integrations** section of [Apify Console](https://console.apify.com/settings/integrations).
- _Environment variable_ - If you prefer not to store the key in config, set the `APIFY_API_KEY` environment variable instead.

### Tool not available to agents

- _Check allowlisting_ - Ensure `"apify"` is in the `tools.alsoAllow` array in your OpenClaw config, or use `"group:plugins"` to allow all plugin tools.
- _Restart the gateway_ - Config changes don't take effect until you run `openclaw gateway restart`.

### Actor run failures

- _Check run logs_ - If an Actor run fails, check the logs in [Apify Console](https://console.apify.com/) for details.
- _Verify input schema_ - Use `action: "discover"` with the `actorId` to check what input parameters the Actor expects.

### Report an issue

If you encounter a bug or have a feature request, [open an issue](https://github.com/apify/apify-openclaw-plugin/issues) on the plugin's GitHub repository.

## Resources

- [OpenClaw documentation](https://docs.openclaw.ai/) - Official OpenClaw docs
- [Apify Actors documentation](https://docs.apify.com/platform/actors) - Learn about Apify Actors
- [Apify Store](https://apify.com/store) - Browse pre-built Actors
- [Apify API reference](https://docs.apify.com/api/v2) - Full API documentation
- [Apify OpenClaw plugin on GitHub](https://github.com/apify/apify-openclaw-plugin) - Source code and issue tracker
