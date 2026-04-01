---
title: Platform basics
description: Understand the core concepts of the Apify platform - Actors, storage, runs, builds, and how they work together.
sidebar_position: 1
slug: /get-started/platform-basics
---

import Card from '@site/src/components/Card';
import CardGrid from '@site/src/components/CardGrid';

The Apify platform has a few core concepts. Understanding how they connect helps you get the most out of the tools available.

## Actors

An *Actor* is a serverless cloud program that takes structured input and produces output. Actors handle web scraping, data extraction, browser automation, and more. You can run thousands of pre-built Actors from [Apify Store](https://apify.com/store) or [build your own](/platform/get-started/build-an-actor).

Each time you run an Actor, it creates a *run* - an isolated execution with its own log, input, output, and storage.

## Storage

Actors store their results in three types of storage:

- **Dataset** - Append-only table for structured output (JSON rows). This is where most Actor results end up. [Read more](/platform/actors/storage/dataset).
- **Key-value store** - Store arbitrary data by string key (JSON, HTML, images, files). Useful for configuration, screenshots, or intermediate results. [Read more](/platform/actors/storage/key-value-store).
- **Request queue** - URL queue that coordinates crawling across pages. Actors that crawl websites use this to track which pages to visit next. [Read more](/platform/actors/storage/request-queue).

Every run gets a default dataset and key-value store automatically.

## Runs and builds

When you click **Start** on an Actor, two things happen:

1. **Build** - The Actor's source code is compiled into a Docker image. This happens once per version and is cached for subsequent runs.
1. **Run** - The Docker image starts in a container, reads its input, executes, and writes results to storage.

You can monitor runs in real time via the **Log** tab in [Apify Console](https://console.apify.com). Each run shows its status, duration, resource usage, and output.

## Automation

You don't have to start runs manually:

- **Schedules** - Run any Actor on a cron schedule (hourly, daily, custom). [Set up schedules](/platform/actors/running/schedules).
- **Webhooks** - Apify calls a URL when a run finishes, fails, or hits a threshold. [Configure webhooks](/platform/integrations/webhooks).
- **API** - Start runs, retrieve results, and manage Actors programmatically via the [REST API](/api/v2) or API clients for [JavaScript](/api/client/js/docs) and [Python](/api/client/python/docs).

## Next steps

<CardGrid>
    <Card
        title="Choose and run an Actor"
        desc="Try running your first Actor from Apify Store."
        to="/platform/get-started/choose-and-run-actor"
    />
    <Card
        title="Actors documentation"
        desc="Deep dive into developing, running, and publishing Actors."
        to="/platform/actors"
    />
    <Card
        title="Integrations"
        desc="Connect Apify to AI agents, workflow tools, and external services."
        to="/platform/integrations"
    />
</CardGrid>
