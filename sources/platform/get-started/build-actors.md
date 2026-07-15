---
title: Build Actors
sidebar_label: Build Actors
sidebar_position: 2
slug: /get-started/build-actors
description: Build your own Actor on the Apify platform - create it from a template, understand the Actor model, deploy it, and publish it to Apify Store.
pagination_next: null
pagination_prev: null
---

An Actor is ordinary code - JavaScript, Python, or anything that runs in a Docker container - packaged with a definition that tells the Apify platform how to run it: what input it accepts, what output it produces, and what environment it needs. That packaging is what makes an Actor more than a script. The platform handles the servers, scaling, storage, and scheduling, and every Actor you build gets an API, a user interface, and integrations for free.

The journey from idea to published Actor has three stages: develop it, deploy it to the platform, and - if you want other people to use it - publish it in [Apify Store](https://apify.com/store). This page walks you through those stages and points you to the right material at each one.

## Create your first Actor

The fastest way to a working Actor is a template - a runnable project you modify rather than a blank file. You can develop locally with your own tools, in the web IDE without any setup, or with an AI coding assistant.

- [Actor development quick start](/actors/development/quick-start) - pick your entry point:
  - [Local development](/actors/development/quick-start/locally) with the Apify CLI.
  - [Web IDE](/actors/development/quick-start/web-ide) - build in the browser, no local setup.
  - [Build with AI](/actors/development/quick-start/build-with-ai) - use AI coding assistants with the Apify MCP server.
- [Build an Actor from a template](/academy/getting-started/creating-actors) - a guided Apify Academy lesson using the web IDE.
- [Inputs and outputs from scratch](/academy/getting-started/inputs-outputs) - build an Actor that takes input and stores a result.
- [Develop AI agents](/actors/development/quick-start/develop-ai-agents) - templates, sandboxes, LLM access, and pay-per-event monetization.

## Understand the Actor model

What turns your code into an Actor is a small set of files: an `actor.json` manifest, a Dockerfile, and schemas that describe the input and output. The input schema is what generates the input form users see in Apify Console, and the Apify SDK gives your code access to input, storage, and platform events at runtime. Understand these pieces and the rest of Actor development falls into place.

- [Actor definition](/actors/development/actor-definition) - the `actor.json`, Dockerfile, and schemas:
  - [Input schema](/actors/development/actor-definition/input-schema)
  - [Dataset schema](/actors/development/actor-definition/dataset-schema)
  - [Key-value store schema](/actors/development/actor-definition/key-value-store-schema)
- [Programming interface](/actors/development/programming-interface) - the Apify SDK, environment variables, and state persistence.
- [Builds and runs](/actors/development/builds-and-runs) - the build and run lifecycle and versioning.
- [Storage](/storage) - how to read input and write results from code.

## Deploy and iterate

Deployment turns your source code into a build - a Docker image the platform can run. From there, development becomes a loop: push a change, build, run, check the results. You can drive the loop by hand with the CLI or wire it to a Git repository so every push deploys automatically.

- [Deploy your Actor](/actors/development/deployment) to the platform.
- [Set up continuous integration](/actors/development/deployment/continuous-integration) for automatic builds.
- [Optimize performance](/actors/development/performance) to reduce cost and increase throughput.
- [Configure permissions](/actors/development/permissions) to control what your Actor can access.

## Publish to Store

Publishing puts your Actor in front of everyone browsing Apify Store, and lets you charge for it. A good public Actor is more than working code: it has a clear input schema, a README that explains what it does and how to use it, and runs reliably enough that strangers can depend on it. The publishing guide covers all of it, including the monetization models you can choose from.

- [Publish and monetize](/actors/publishing) your Actor in Apify Store.
- Call your Actors from your own code with the [API](/api/v2) or the [API clients](/academy/getting-started/apify-client).

Just want to run Actors, not build them? See [Run Actors](/get-started/run-actors).
