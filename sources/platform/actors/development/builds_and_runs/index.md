---
title: Actor builds and runs
sidebar_label: Builds and runs
sidebar_position: 7
description: Learn about Actor builds and runs, including how Docker images are created, how runs are executed, and their lifecycle on the Apify platform.
slug: /actors/development/builds-and-runs
---

import ActorJobLifecycle from '@site/sources/_partials/_actor-job-lifecycle.mdx';

Actor **builds** and **runs** are fundamental concepts within the Apify platform. Understanding them is crucial for effective use of the platform.

```mermaid
flowchart LR
    accTitle: From your Actor to a run
    accDescr: The build process turns the Actor definition, made of source code, actor.json, and the Dockerfile, into a build. Starting the build with input creates a run.

    subgraph actor [Actor definition]
        %% LR stacks unlinked nodes vertically; TB would put them in a row
        direction LR
        code[Source code]
        json[actor.json]
        docker[Dockerfile]
    end

    actor -- build --> build[Build]
    build -- start with input --> run[Run]
```

## Build an Actor

When you start the build process for your Actor, you create a _build_. A build is a Docker image containing your source code and the required dependencies needed to run the Actor. The build uses the files in your [Actor definition](/actors/development/actor-definition), such as your [source code](/actors/development/actor-definition/source-code), [`actor.json`](/actors/development/actor-definition/actor-json), and [`Dockerfile`](/actors/development/actor-definition/dockerfile).

## Run an Actor

To create a _run_, you take your _build_ and start it with some input.

<ActorJobLifecycle />
