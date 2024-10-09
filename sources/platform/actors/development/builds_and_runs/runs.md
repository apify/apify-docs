---
title: Runs
sidebar_position: 8
description: Learn about Actor runs, how to start them, and how to manage them.
slug: /actors/development/builds-and-runs/runs
---

**Learn about Actor runs, how to start them, and how to manage them.**

---

When you start an Actor, you create a run. A run is a single execution of your Actor with a specific input in a Docker container.

## Starting an Actor

You can start an Actor in several ways:

- Manually from the [Apify Console](https://console.apify.com/actors) UI
- Via the [Apify API](https://docs.apify.com/api/v2#/reference/actors/run-collection/run-actor)
- Using the [Scheduler](../../../schedules.md) provided by the Apify platform
- By one of the available [integrations](../../../integrations/index.mdx)

## Input and environment variables

The run receives input via the `INPUT` record of its default [key-value store](../../../storage/key_value_store.md). Environment variables are also passed to the run. For more information about environment variables check the [Environment variables](../programming_interface/environment_variables.md) section.

## Run duration and timeout

Actor runs can be short or long-running. To prevent infinite runs, you can set a timeout. The timeout is specified in seconds, and the default timeout varies based on the template from which you create your Actor. If the run doesn't finish within the timeout, it's automatically stopped, and its status is set to `TIMED-OUT`.

Depending on the template used for your Actor, the default timeout values may differ.

| Template name | Default timeout value in seconds |
|:---|:---|
| Scrapy | 3600 |
| Start with Python | 3600 |
| BeautifulSoup | 3600 |
| Playwright + Chrome | 3600 |
| Selenium + Chrome | 3600 |
| Empty Python project | 3600 |
| Standby Python project | 3600 |
| Crawlee + BeautifulSoup | 3600 |
| Crawlee + Playwright + Chrome | 3600 |
| Start with JavaScript | 360 |
| Start with TypeScript | 360 |
| Crawlee + Cheerio | 3600 |
| Crawlee + Puppeteer + Chrome | 3600 |
| Crawlee + Playwright + Chrome | 3600 |
| Bootstrap CheerioCrawler | 3600 |
| Crawlee + Cheerio | 3600 |
| Crawlee + Puppeteer + Chrome | 3600 |
| Crawlee + Playwright + Chrome| 3600 |
| Playwright + Chrome Test Runner | 3600 |
| Empty Typescript project | 3600 |
| Standby Typescript project  | 3600 |
| Cypress | 3600 |
| Empty JavaScript project | 3600 |
| Standby JavaScript project | 3600  |
| LangChain | 3600 |
| Start with TypeScript on Bun | 360 |

