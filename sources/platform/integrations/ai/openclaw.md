---
title: OpenClaw integration
sidebar_label: OpenClaw
description: Learn how to integrate Apify with OpenClaw to give your AI agents web scraping and data extraction capabilities using 20,000+ pre-built Actors.
sidebar_position: 14
slug: /integrations/openclaw
toc_min_heading_level: 2
toc_max_heading_level: 4
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

[OpenClaw](https://openclaw.io) is an open-source AI agent orchestration platform that enables you to build, deploy, and manage autonomous AI agents. The Apify plugin for OpenClaw gives your agents access to 20,000+ pre-built Actors for web scraping, data extraction, and automation through a single `apify` tool.

For more details about OpenClaw, refer to the [official documentation](https://docs.openclaw.io/).

<ThirdPartyDisclaimer />

## TLDR

```bash
openclaw plugins install @apify/apify-openclaw-plugin
openclaw apify setup
openclaw gateway restart
```

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/-9XJxG4b4H4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Prerequisites

Before integrating Apify with OpenClaw, you'll need:

- _An Apify account_ - If you don't have one, [sign up here](https://console.apify.com/sign-up).
- _Apify API token_ - Get your token from the **API & Integrations** section in [Apify Console](https://console.apify.com/settings/integrations).
- _OpenClaw_ - Version 2026.1.0 or later. Install from the [OpenClaw website](https://openclaw.io/).
- _Node.js 22+_ - Required to run the plugin.

## Set up the Apify plugin

### Install the plugin

```bash
openclaw plugins install @apify/apify-openclaw-plugin
```

### Configure with interactive setup (recommended)

Run the setup wizard to configure your API key:

```bash
openclaw apify setup
```

The wizard prompts you for your Apify API token, verifies the connection, and writes the configuration to your OpenClaw config file.

After setup, restart the gateway to load the plugin:

```bash
openclaw gateway restart
```

### Configure manually

Alternatively, add the plugin configuration directly to your `~/.openclaw/config.json`:

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

Check your configuration and test the connection:

```bash
openclaw apify status
openclaw apify test
```

## How the Apify tool works

The plugin registers a single `apify` tool with three actions:

| Action | Purpose |
|--------|---------|
| `discover` | Search the Apify Store for Actors by keyword, or fetch an Actor's input schema |
| `start` | Run an Actor asynchronously and get a `runId` back |
| `collect` | Retrieve results from completed Actor runs |

### Two-phase async pattern

The tool uses an asynchronous workflow. Your agent starts an Actor run and gets a `runId` immediately, then collects results later when the run completes. This lets agents do other work while Actors are running.

```text
discover (search) -> discover (schema) -> start -> collect
```

### Batch multiple targets

Most Actors accept arrays in their input (for example, `startUrls`, `queries`, `usernames`). Always batch multiple targets into a single run - one run with 5 URLs is cheaper and faster than 5 separate runs.

## Examples

### Search Google and collect results

This example walks through the full discover, start, and collect workflow to scrape Google Search results.

First, search for a suitable Actor:

```javascript
const search = await apify({
  action: "discover",
  query: "google search scraper",
});
```

Get the Actor's input schema to understand what parameters it accepts:

```javascript
const schema = await apify({
  action: "discover",
  actorId: "apify~google-search-scraper",
});
```

Start the Actor with your search queries:

```javascript
const started = await apify({
  action: "start",
  actorId: "apify~google-search-scraper",
  input: { queries: ["web scraping tools", "data extraction API"], maxPagesPerQuery: 1 },
  label: "google-search",
});
```

Collect the results when the run completes:

```javascript
const results = await apify({
  action: "collect",
  runs: started.runs,
});
// results.completed contains the scraped data
```

### Analyze Instagram profiles

Use batching to scrape multiple profiles in a single run:

```javascript
const started = await apify({
  action: "start",
  actorId: "apify~instagram-profile-scraper",
  input: { usernames: ["natgeo", "nasa", "spacex"] },
  label: "instagram-profiles",
});

const results = await apify({
  action: "collect",
  runs: started.runs,
});
```

### Multi-source research

Start multiple Actors in parallel for broader research, then collect all results together:

```javascript
// Start Google Search and TikTok scrapers
const googleRun = await apify({
  action: "start",
  actorId: "apify~google-search-scraper",
  input: { queries: ["AI trends 2026"], maxPagesPerQuery: 1 },
  label: "google",
});

const tiktokRun = await apify({
  action: "start",
  actorId: "clockworks~tiktok-scraper",
  input: { searchQueries: ["AI trends"], resultsPerPage: 20 },
  label: "tiktok",
});

// Collect results from both runs
const results = await apify({
  action: "collect",
  runs: [...googleRun.runs, ...tiktokRun.runs],
});
```

:::note Actor runs may take some time

Actor execution time varies depending on the task complexity. The `collect` action polls for completion and returns results when the runs finish. Check Actor run status in [Apify Console](https://console.apify.com/) if a run takes longer than expected.

:::

## Configuration options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | string | `APIFY_API_KEY` env var | Your Apify API token |
| `baseUrl` | string | `https://api.apify.com` | Apify API base URL |
| `maxResults` | number | `20` | Maximum items to return per dataset (1-1000) |
| `enabledTools` | string[] | `[]` (all enabled) | Restrict which tool actions are available |

## Troubleshooting

### Authentication errors

- _Check your API token_ - Verify your Apify API token is correct by running `openclaw apify test`. You can find your token in the **API & Integrations** section of [Apify Console](https://console.apify.com/settings/integrations).
- _Environment variable_ - If you prefer not to store the key in config, set the `APIFY_API_KEY` environment variable instead.

### Tool not available to agents

- _Check allowlisting_ - Ensure `"apify"` is in the `tools.alsoAllow` array in your OpenClaw config, or use `"group:plugins"` to allow all plugin tools.
- _Restart the gateway_ - Config changes don't take effect until you run `openclaw gateway restart`.

### Actor run failures

- _Check run logs_ - If an Actor run fails, check the logs in [Apify Console](https://console.apify.com/) for details.
- _Verify input schema_ - Use `action: "discover"` with the `actorId` to check what input parameters the Actor expects.

## Resources

- [OpenClaw documentation](https://docs.openclaw.io/) - Official OpenClaw docs
- [Apify Actors documentation](https://docs.apify.com/platform/actors) - Learn about Apify Actors
- [Apify Store](https://apify.com/store) - Browse 20,000+ pre-built Actors
- [Apify API reference](https://docs.apify.com/api/v2) - Full API documentation
