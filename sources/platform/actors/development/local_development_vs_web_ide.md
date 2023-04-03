---
title: Local or web IDE
sidebar_position: 2
description: TODO
slug: /actors/development/local-vs-web-ide
---

# Local development vs web IDE

**TODO**

---


## [](#local-development)Local development

[//]: # (TODO: It's pretty outdated, we should probably update the actor too)
It is possible to develop actors locally on your computer and then only deploy them to the Apify cloud when they are ready. This is especially useful if you're using Git integration. See [Git repository](#git-repository) for more details. The boilerplate for creating an actor in a Git repository is available on [GitHub](https://github.com/apify/actor-quick-start).

Unfortunately, not all features of the Apify platform can be emulated locally, therefore you might still need to let the [`apify`](/api/client/js) NPM package use your API token in order to interact with the Apify platform. The simplest way to achieve that is by setting the `APIFY_TOKEN` environment variable on your local development machine.



TODO
