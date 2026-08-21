---
title: Hermes Agent integration
sidebar_label: Hermes Agent
description: Learn how to integrate Apify with Hermes Agent to give your AI agent access to thousands of pre-built AI tools, called Actors, for scraping and automation.
slug: /integrations/hermes-agent
toc_min_heading_level: 2
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

[Hermes Agent](https://hermes-agent.nousresearch.com) is an open-source autonomous AI agent from [Nous Research](https://nousresearch.com/). The Apify plugin for Hermes Agent gives your agent access to thousands of pre-built AI tools, called Actors. The plugin comes with three tools: `apify_discover`, `apify_start`, and `apify_collect`, which your agent can use autonomously.

For more details about Hermes Agent, refer to the [official documentation](https://hermes-agent.nousresearch.com/docs).

<ThirdPartyDisclaimer />

## Prerequisites

Before integrating Apify with Hermes Agent, you'll need:

- _An Apify account_ - If you don't have one, [sign up here](https://console.apify.com/sign-up).
- _Apify API token_ - Get your token from the **API & Integrations** section in [Apify Console](https://console.apify.com/settings/integrations).
- _Hermes Agent_ - Install the CLI from the [official documentation](https://hermes-agent.nousresearch.com/docs).
- _Python 3.11 - 3.13_ - Required to install the plugin.

## Set up the Apify plugin

### Install the plugin

Install the plugin from PyPI, then enable it:

```bash
pip install apify-hermes-agent-plugin
hermes plugins enable apify
```

### Configure your API token

Run the setup command to save your Apify API token:

```bash
hermes apify-setup
```

This prompts for your `APIFY_API_TOKEN`, saves it to `~/.hermes/.env`, and enables the `apify` toolset for the CLI. You can find your token in the **API & Integrations** section of [Apify Console](https://console.apify.com/settings/integrations).

To skip the interactive prompt, pass the token directly:

```bash
hermes apify-setup --token apify_api_...
```

If the toolset isn't enabled automatically, run `hermes tools` and enable `apify` manually.

## Apify tool overview

The plugin registers three tools under the `apify` toolset:

| Tool             | Purpose                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| `apify_discover` | Search Apify Store by keyword, or fetch an Actor's input schema and README by `actor_id`         |
| `apify_start`    | Start up to 10 Actor runs in a single call and get run references back immediately               |
| `apify_collect`  | Poll run statuses using the references from `apify_start` and retrieve completed dataset results |

### Fire-and-forget batch pattern

The tools follow an asynchronous workflow built around batching. Your agent starts up to 10 Actor runs in one `apify_start` call and gets run references immediately, then polls `apify_collect` with those references until every run finishes. Re-call `apify_collect` with the same references until the response's `all_done` field is `true`.

```text
apify_discover (search) -> apify_discover (schema) -> apify_start (batch) -> apify_collect (poll)
```

### Actor ID format

Actor IDs accept either the unique ID or the `username~actor-name` format (for example, `apify~google-search-scraper`). `apify_discover` returns Actor IDs in this format when it fetches an Actor's schema or searches the Store.

## What you can do

Once the plugin is set up, your Hermes Agent can:

- _Search for Actors_ - Ask the agent to find an Actor to add to its AI tools. Actors can be scrapers, lead generation tools, or any other kind of tool - for example, try asking it to `find me an Actor to scrape Instagram` and it discovers the right one from [Apify Store](https://apify.com/store).
- _Inspect input requirements_ - Fetch an Actor's input schema and README with `apify_discover` before starting a run, so the agent knows exactly what input to provide.
- _Extract data from any website_ - Scrapers are just one category of Actor. The agent can extract data from Google Search, Instagram, TikTok, YouTube, Google Maps, e-commerce sites, and more.
- _Batch multiple targets_ - Start up to 10 Actor runs in a single `apify_start` call and collect all results together with `apify_collect`.

:::note Actor runs may take some time

Actor execution time varies depending on the task complexity. `apify_collect` reports runs as `pending` until they reach a terminal status. Check Actor run status in [Apify Console](https://console.apify.com/) if a run takes longer than expected.

:::

:::note Dataset results are untrusted content

`apify_collect` wraps returned dataset items between `<<<EXTERNAL_UNTRUSTED_CONTENT>>>` markers, since scraped data comes from external websites and Actors, not from you or Hermes Agent. Results are also capped at 50,000 characters per run. If `may_have_more` is `true` in the response, re-call `apify_collect` with a higher `limit`, though the 50,000-character cap still applies regardless of `limit`.

:::

## Configuration

| Setting           | Description                                                                                                    |
| ----------------- | -------------------------------------------------------------------------------------------------------------- |
| `APIFY_API_TOKEN` | Your Apify API token, saved to `~/.hermes/.env` by `hermes apify-setup`. Required for every `apify` tool call. |

## Troubleshooting

### Authentication errors

- _Check your API token_ - Verify `APIFY_API_TOKEN` is set in `~/.hermes/.env`. Re-run `hermes apify-setup` to update it.
- _Get a new token_ - Find or generate one in the **API & Integrations** section of [Apify Console](https://console.apify.com/settings/integrations).

### Plugin or tool not available

- _Check plugin enablement_ - Re-run `hermes plugins enable apify`. If it fails with `Plugin 'apify' is not installed or bundled.`, your Hermes Agent predates version 0.18.1, when entry-point plugin discovery was fixed upstream - update with `pip install --upgrade hermes-agent`. If you can't upgrade, add `apify` under `plugins.enabled` in `~/.hermes/config.yaml` manually instead:

    ```yaml
    plugins:
        enabled:
            - apify
    ```

- _Check toolset enablement_ - Run `hermes tools` and confirm `apify` is enabled for the CLI. `hermes apify-setup` enables it automatically in most cases.

### Actor run failures

- _Check run logs_ - If an Actor run fails, check the logs in [Apify Console](https://console.apify.com/) for details.
- _Verify input schema_ - Use `apify_discover` with `actor_id` to check what input parameters the Actor expects before calling `apify_start`.
- _Check batch size_ - `apify_start` accepts a maximum of 10 runs per call.

### Report an issue

If you encounter a bug or have a feature request, [open an issue](https://github.com/apify/apify-hermes-agent-plugin/issues) on the plugin's GitHub repository.

## Resources

- [Hermes Agent documentation](https://hermes-agent.nousresearch.com/docs) - Official Hermes Agent docs
- [Apify Actors documentation](https://docs.apify.com/actors) - Learn about Apify Actors
- [Apify Store](https://apify.com/store) - Browse pre-built Actors
- [Apify API reference](https://docs.apify.com/api/v2) - Full API documentation
- [Apify Hermes Agent plugin on GitHub](https://github.com/apify/apify-hermes-agent-plugin) - Source code and issue tracker
