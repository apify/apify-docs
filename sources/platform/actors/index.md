---
title: Actors
description: Learn how to develop, run and share serverless cloud programs. Create your own web scraping and automation tools and publish them on the Apify platform.
sidebar_position: 7
category: platform
slug: /actors
---

# Actors

**Learn how to develop, run and share serverless cloud programs. Create your own web scraping and automation tools and publish them on the Apify platform.**

---

Actors are serverless cloud programs that can do almost anything a human can do in a web browser. They can do anything from small tasks like filling in forms or unsubscribing from online services, all the way up to scraping and processing vast numbers of web pages.

You can use actors [manually in the Apify Console](https://console.apify.com/actors), using [API](/api/v2) or [scheduler](../schedules.md). You can easily [integrate them with other apps](../integrations/index.md) and share your actors with other Apify users via our [access rights](../access_rights/index.md) system.

> New to Apify? [Try actors with our **quick start** tutorial](../tutorials/quick_start.md).

A single isolated actor consists of source code and various settings. You can think of an actor as a cloud app or service that runs on the Apify platform. The run of an actor is not limited to the lifetime of a single HTTP transaction. It can run for as long as necessary, even forever.

## Section overview

@TODO: Marek

* [Running](./running/index.md)
  * [Input](./running/input.md)
  * [Memory and CPU](./running/memory_and_cpu.md)
  * [Compute units and consumption](./running/compute_units.md)
  * [Actors in store](./running/store.md)
  * [Tasks](./running/tasks.md)
* [Development](./development/index.md)
  * [Base Docker images](./development/base_docker_images.md)
  * [Builds](./development/builds.md)
  * [Continuous integration](./development/continuous_integration.md)
  * [Environment variables](./development/environment_variables.md)
  * [Input schema](./development/input_schema.md)
  * [Secret input](./development/secret_input.md)
  * [Source code](./development/source_code.md)
  * [State persistence](./development/state_persistence.md)
  * [Testing and maintenance](./development/testing_and_maintenance.md)
* [Publishing](./publishing)
* [Naming your actor](/academy/get-most-of-actors/naming-your-actor)
* [SEO and promotion](/academy/get-most-of-actors/seo-and-promotion)
* [Security](./security.md)
* [Limits](./limits.md)
* [Examples](./examples.md)


## Public and private actors

Actors can be [public](./running/store.md) or private. Private actors are yours to use and keep, and no one will see them if you don't want them to. Public actors are [available to everyone](./running/store.md) in [Apify Store](https://apify.com/store). You can make them free to use, or you can [charge for them](https://blog.apify.com/make-regular-passive-income-developing-web-automation-actors-b0392278d085/).

