---
title: Builds
description: Apify's conventions for actor build numbers. Learn to use a specific version of your actor in a run, understand an actor's lifecycle and manage its cache.
slug: /actors/development/builds
---

# [](#builds)Builds

**Apify's conventions for actor build numbers. Learn to use a specific version of your actor in a run, understand an actor's lifecycle and manage its cache.**

---

Before the actor can be run, it first needs to be built. The build effectively creates a snapshot of a specific version of the actor's settings such as the [Source code](./source_code.md) and [Environment variables](./environment_variables.md), and creates a Docker image that contains everything the actor needs for its run, including necessary NPM packages, web browsers, etc.

Each build is assigned a unique build number of the form **MAJOR\.MINOR\.BUILD** (e.g. **1\.2\.345**), where **MAJOR\.MINOR** corresponds to the actor version number (see [Versioning](./source_code.md)) and **BUILD** is an automatically-incremented number starting at **1**.

By default, the build has a timeout of 300 seconds and consumes 4096 MB (2048 MB on the free plan) of memory from the user's memory limit. See the [Resource limits](../running/index.md) section for more details.

## [](#tags)Tags

When running the actor, the caller needs to specify which actor build should actually be used. To simplify this process, the builds can be associated with a tag such **latest** or **beta**, which can be used instead of the version number when running the actor. The tags are unique - only one build can be associated with a specific tag.

To set a tag for builds of a specific actor version, set the **Build tag** property. Whenever a new build of the version is successfully finished, it is automatically assigned the tag. By default, the builds are set the **latest** tag.

## [](#cache)Cache

By default, the build process pulls the latest copies of all necessary Docker images and builds each new layer of Docker image from scratch. To speed up the builds triggered via API you can add **useCache=1** parameter. See API reference for more details.

## [](#lifecycle)Lifecycle

Each build starts with the initial status **READY** and goes through one or more transitional statuses to one of the terminal statuses.

| Status       | Type         | Description                                 |
|--------------|--------------|---------------------------------------------|
| `READY`      | initial      | Started but not allocated to any worker yet |
| `RUNNING`    | transitional | Executing on a worker                       |
| `SUCCEEDED`  | terminal     | Finished successfully                       |
| `FAILED`     | terminal     | Build failed                                |
| `TIMING-OUT` | transitional | Timing out now                              |
| `TIMED-OUT`  | terminal     | Timed out                                   |
| `ABORTING`   | transitional | Being aborted by user                       |
| `ABORTED`    | terminal     | Aborted by user                             |

## Sharing {#sharing}

You can allow other Apify users to view your Actor builds by using the [access rights](../../collaboration/index.md) system. [See the full list of permissions](../../collaboration/list_of_permissions.md).
