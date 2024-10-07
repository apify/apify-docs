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

Actor runs can be short or long-running. To prevent an indefinite runs, you can set a timeout. The timeout is specified in seconds and defaults to 300 seconds. If the run doesn't finish within the timeout, it's automatically stopped, and its status is set to `TIMED-OUT`.
