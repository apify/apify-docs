---
title: Actors
description: Learn how to develop, run and share serverless cloud programs. Create your own web scraping and automation tools and publish them on the Apify platform.
menuWeight: 7
category: platform
paths:
# NOTE: IF ADDING A NEW PATH, LEAVE THE OLD ONES FOR REDIRECTS
    - actor
    - actors
---

# Actors

Actors are serverless cloud programs that can do almost anything a human can do in a web browser. They can do anything from small tasks like filling in forms or unsubscribing from online services, all the way up to scraping and processing vast numbers of web pages.

You can use actors [manually in the Apify Console](https://console.apify.com/actors), using [API](/api/v2) or [scheduler]({{@link schedules.md}}). You can easily [integrate them with other apps]({{@link tutorials/integrations.md}}) and share your actors with other Apify users via our [access rights]({{@link access_rights.md}}) system.

> New to Apify? [Try actors with our **quick start** tutorial]({{@link tutorials/quick_start.md}}).

A single isolated actor consists of source code and various settings. You can think of an actor as a cloud app or service that runs on the Apify platform. The run of an actor is not limited to the lifetime of a single HTTP transaction. It can run for as long as necessary, even forever.

## Section overview

* [Running]({{@link actors/running.md}})
  * [Input]({{@link actors/running/input.md}})
  * [Memory and CPU]({{@link actors/running/memory_and_cpu.md}})
  * [Compute units and consumption]({{@link actors/running/compute_units.md}})
* [Tasks]({{@link actors/tasks.md}})
* [Development]({{@link actors/development.md}})
  * [Base Docker images]({{@link actors/development/base_docker_images.md}})
  * [Builds]({{@link actors/development/builds.md}})
  * [Continuous integration]({{@link actors/development/continuous_integration.md}})
  * [Environment variables]({{@link actors/development/environment_variables.md}})
  * [Input schema]({{@link actors/development/input_schema.md}})
  * [Source code]({{@link actors/development/source_code.md}})
  * [State persistence]({{@link actors/development/state_persistence.md}})
  * [Testing and maintenance]({{@link actors/development/testing_and_maintenance.md}})
* [Paid actors]({{@link actors/paid_actors.md}})
* [Publishing](https://developers.apify.com/academy/apify-platform/publishing-actors-on-apify-store)
* [Naming your actor](https://developers.apify.com/academy/apify-platform/publishing-actors-on-apify-store/naming-your-actor)
* [SEO and promotion](https://developers.apify.com/academy/apify-platform/publishing-actors-on-apify-store/seo-and-promotion)
* [Security]({{@link actors/security.md}})
* [Limits]({{@link actors/limits.md}})
* [Examples]({{@link actors/examples.md}})

## Public, private, and paid actors

Actors can be public (free or [paid]({{@link actors/paid_actors.md}})) or private. Private actors are yours to use and keep, and no one will see them if you don't want them to. Public actors are [available to everyone](https://developers.apify.com/academy/apify-platform/publishing-actors-on-apify-store) in [Apify Store](https://apify.com/store). You can make them free to use, or you can [charge for them](https://blog.apify.com/make-regular-passive-income-developing-web-automation-actors-b0392278d085/).

