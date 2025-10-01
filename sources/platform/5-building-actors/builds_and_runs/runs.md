---
title: Runs
sidebar_position: 8
description: Learn about Actor runs, how to start them, and how to manage them.
slug: /building-actors/builds-and-runs/runs
---

**Learn about Actor runs, how to start them, and how to manage them.**

---

When you start an Actor, you create a run. A run is a single execution of your Actor with a specific input in a Docker container.

## Starting an Actor

You can start an Actor in several ways:

- Manually from the [Apify Console](https://console.apify.com/actors) UI
- Via the [Apify API](/api/v2/act-runs-post)
- Using the [Scheduler](/platform/using-actors/schedules) provided by the Apify platform
- By one of the available [integrations](/platform/integrations)

## Input and environment variables

The run receives input via the `INPUT` record of its default [key-value store](/platform/core-concepts/storage/key-value-store). Environment variables are also passed to the run. For more information about environment variables check the [Environment variables](///platform/building-actors/programming-interface/environment-variables) section.

## Run duration and timeout

Actor runs can be short or long-running. To prevent infinite runs, you can set a timeout. The timeout is specified in seconds, and the default timeout varies based on the template from which you create your Actor. If the run doesn't finish within the timeout, it's automatically stopped, and its status is set to `TIMED-OUT`.
