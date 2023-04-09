---
title: REMOVE What is an Actor
sidebar_position: 100
description: earn what is the Apify Actor and benefits of this concept and Apify Platform.
slug: /actors/development/what-is-actor
---

**Learn what is the Apify Actor and benefits of this concept and Apify Platform.**

---

Actors are serverless programs running in the cloud. They can perform anything from simple actions such as filling out a web form or sending an email, to complex operations such as crawling an entire website, or removing duplicates from a large dataset. Actors can run as short or as long as necessary, from seconds to hours, even infinitely.

> Basically, actors are programs packaged as [Docker images](https://hub.docker.com/), which accept a well-defined JSON input, perform an action, and optionally produce an output.

Actors have the following elements:

- **Dockerfile** which specifies where is the actor's source code, how to build it, and run it
- **Documentation** in a form of README.md file
- **Input and output schemas** that describe what input the actor requires, and what results it produces
- Access to an out-of-box **storage** system for actor data, results, and files
- **Metadata** such as the actor name, description, author, and version

The documentation and the input/output schemas make it possible for people to easily understand what the actor does, enter the required inputs both in user interface or API, and integrate the results of the actor into their other workflows. Actors can easily call and interact with each other, enabling building more complex systems on top of simple ones.

The Apify platform provides an open [API](/api/v2), cron-style [scheduler](../schedules), [webhooks]('../../integrations/webhooks) and [integrations](../../integrations) to services such as Zapier or Make, which make it easy for users to integrate actors into their existing workflows. Anyone is welcome to [publish Actors](/platform/actors/publishing) in the [Apify Store](https://apify.com/store), and you can even [monetize your Actors](/platform/actors/publishing/monetize) by renting them out to users of the platform.

Actors can be developed and run locally, and then using [Apify CLI](/cli) deployed to the Apify platform.

> **To get better idea of what Apify Actors are, visit [Apify Store](https://apify.com/store), and try out some of them!**
