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

Actors are serverless cloud programs running on the Apify platform that can perform computing jobs such
as send an email or crawl a website with millions of pages.
They can be started manually, using API or scheduler, and they can be easily integrated with other apps.

A single isolated actor consists of source code and various settings. You can think of an actor as a cloud app or service. The run of an actor is not limited to the lifetime of a single HTTP transaction. It can run for as long as necessary, even forever.

Like any other resource, you can share your actors with other Apify users via the [access rights]({{@link access_rights.md}}) system. See the full list of permissions [here]({{@link access_rights/list_of_permissions.md#actors}}).

> New to Apify? [Try actors with our **quick start** tutorial]({{@link tutorials/quick_start.md}}).

## In this section

* [Running]({{@link actors/running.md}})
  * [Input]({{@link actors/running/input.md}})
  * [Memory and CPU]({{@link actors/running/memory_and_cpu.md}})
  * [Compute units and consumption]({{@link actors/running/compute_units.md}})
* [Tasks]({{@link actors/tasks.md}})
* [Development]({{@ actors/development.md}})
  * [Base Docker images]({{@link actors/development/base_docker_images.md}})
  * [Builds]({{@link actors/development/builds.md}})
  * [Continuous integration]({{@link actors/development/continuous_integration.md}})
  * [Environment variables]({{@link actors/development/environment_variables.md}})
  * [Input schema]({{@link actors/development/input_schema.md}})
  * [Source code]({{@link actors/development/source_code.md}})
  * [State persistence]({{@link actors/development/state_persistence.md}})
* [Paid actors]({{@link actors/paid_actors.md}})
* [Publishing]({{@link actors/publishing.md}})
  * [Naming your actor]({{@link actors/publishing/naming_your_actor.md}})
  * [SEO for actors]({{@link actors/publishing/seo_for_actors.md}})
* [Security]({{@link actors/security.md}})
* [Limits]({{@link actors/limits.md}})
* [Examples]({{@link actors/examples.md}})

