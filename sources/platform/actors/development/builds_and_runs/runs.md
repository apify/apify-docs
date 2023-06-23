---
title: Runs
sidebar_position: 8
description: Learn about Actor runs, how to start them, and how to manage them.
slug: /actors/development/builds-and-runs/runs
---

**Learn about Actor runs, how to start them, and how to manage them.**

---

When you start an Actor, it creates a run. The run is a single execution of your Actor with a specific input. The run is a Docker container running your Actor build with the input you provided.

You can start an Actor in multiple ways:

1. Manually from the [Apify Console](https://my.apify.com/actors) UI.
2. Via [Apify API](https://docs.apify.com/api/v2#/reference/actors/run-collection/run-actor).
3. Using [Scheduler](../../../schedules.md) provided by the Apify platform.
4. By one of the available [integrations](../../../integrations/index.mdx).

The run gets input passed to it via the `INPUT` record of its default [key-value store](../../../storage/key_value_store.md). In addition to this, environment variables are also passed to the run. You can find more information about environment variables in the [Environment variables](../programming_interface/environment_variables.md) section.

Actor runs can be long or short. To prevent an indefinite run, you can set a timeout. The timeout is specified in seconds and is set to 300 seconds by default. If the run does not finish within the timeout, it is automatically stopped, and the run's status is set to `TIMEOUT`.

