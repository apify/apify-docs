---
title: Actor definition
sidebar_position: 3
description: Learn how to turn your arbitrary code into an actor simply by adding an Actor definition directory.
slug: /actors/development/actor-definition
---

**Learn how to turn your arbitrary code into an actor simply by adding an Actor definition directory.**

---

A single isolated Actor consists of source code and various settings. You can think of an Actor as a cloud app or service that runs on the Apify platform. The run of an Actor is not limited to the lifetime of a single HTTP transaction. It can run for as long as necessary, even forever.

Basically, actors are programs packaged as [Docker images](https://hub.docker.com/), which accept a well-defined JSON input, perform an action, and optionally produce an output.

Actors have the following elements:

- The main **[actor.json](./actor_json.md)** file contains **metadata** such as the actor name, description, author, version, and links pointing to the other definition files below.
- **[Dockerfile](./dockerfile.md)** which specifies where is the actor's source code, how to build it, and run it.
- **Documentation** in the form of a README.md file.
- **[Input](./input_schema/index.md)** and **[output schemas](./output_schema.md)** that describe what input the actor requires and what results in it produces.
- Access to an out-of-box **[storage](../../../storage/index.md)** system for actor data, results, and files.

The documentation and the input/output schemas make it possible for people to easily understand what the actor does, enter the required inputs both in the user interface or API and integrate the results of the actor into their other workflows. Actors can easily call and interact with each other, enabling building more complex systems on top of simple ones.

The Apify platform provides an open [API](/api/v2), cron-style [scheduler](../schedules), [webhooks]('../../integrations/webhooks), and [integrations](../../integrations) to services such as Zapier or Make, which make it easy for users to integrate actors into their existing workflows. Anyone is welcome to [publish Actors](/platform/actors/publishing) in the [Apify Store](https://apify.com/store), and you can even [monetize your Actors](/platform/actors/publishing/monetize) by renting them out to users of the platform.

Actors can be developed and run locally and then easily deployed to the Apify platform using [Apify CLI](/cli) or [Github integration](../../../integrations/github.md). For more, see [Deployment](../deployment/index.md) section.

> **To get a better idea of what Apify Actors are, visit [Apify Store](https://apify.com/store), and try out some of them!**


  
