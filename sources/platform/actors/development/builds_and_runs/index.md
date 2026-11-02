---
title: Actor builds and runs
sidebar_label: Builds and runs
sidebar_position: 7
description: Learn about Actor builds and runs, including how Docker images are created, how runs are executed, and their lifecycle on the Apify platform.
slug: /actors/development/builds-and-runs
---

import ActorJobLifecycle from '@site/sources/_partials/_actor-job-lifecycle.mdx';

Actor **builds** and **runs** are fundamental concepts within the Apify platform. Understanding them is crucial for effective use of the platform.

## Build an Actor

When you start the build process for your Actor, you create a _build_. A build is a Docker image containing your source code and the required dependencies needed to run the Actor:

```mermaid
flowchart LR
    subgraph AD [Actor Definition files]
        direction LR
        Dockerfile
        .actor/actor.json
        src/main.js
    end

    AD -- "build process" --> Build
```

## Run an Actor

To create a _run_, you take your _build_ and start it with some input:

```mermaid
flowchart LR
    subgraph AD [Run Definition]
        direction LR
        Build
        Input
    end

    AD -- "start Actor" --> Run
```

<ActorJobLifecycle />
