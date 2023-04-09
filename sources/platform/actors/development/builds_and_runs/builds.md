---
title: Builds
description: Learn Apify's conventions for actor-build numbers and how to use a specific version of your actor in a run.
sidebar_position: 7
slug: /actors/development/builds-and-runs/builds
---

# [](#builds)Builds

**Apify's conventions for actor-build numbers. Learn to use a specific version of your actor in a run, understand an actor's lifecycle and manage its cache.**

---

Before the actor can be run, it first needs to be built. The build effectively creates a snapshot of a specific version of the actor's settings, such as the [Source code](../actor_definition/source_code/index.mdx) and [Environment variables](../actor_definition/environment_variables.md). It creates a Docker image that contains everything the actor needs for its run, including necessary NPM packages, web browsers, etc.

Each build is assigned a unique build number of the form **MAJOR\.MINOR\.BUILD** (e.g. **1\.2\.345**), where **MAJOR\.MINOR** corresponds to the actor version number (see [Versioning](#versioning)), and **BUILD** is an automatically-incremented number starting at **1**.

By default, the build has a timeout of 300 seconds and consumes 4096 MB (2048 MB on the free plan) of memory from the user's memory limit. See the [Resource limits](../../running/index.md) section for more details.

## [](#versioning)Versioning

In order to enable active development, the actor can have multiple versions of the source code and associated settings, such as the **Base image** and **Environment**. Each version is denoted by a version number of the form `MAJOR.MINOR`; the version numbers should adhere to the [Semantic Versioning](http://semver.org/) logic.

For example, the actor can have a production version **1.1**, a beta version **1.2** that contains new features but is still backward compatible, and a development version **2.0** that contains breaking changes.

## [](#tags)Tags

When running the actor, the caller needs to specify which actor build should actually be used. To simplify this process, the builds can be associated with a tag such **latest** or **beta**, which can be used instead of the version number when running the actor. The tags are unique - only one build can be associated with a specific tag.

To set a tag for builds of a specific actor version, set the **Build tag** property. Whenever a new build of the version is successfully finished, it is automatically assigned the tag. By default, the builds are set to the **latest** tag.

## [](#cache)Cache

By default, the build process pulls the latest copies of all necessary Docker images and builds each new layer of Docker images from scratch. To speed up the builds triggered via API, you can add **useCache=1** parameter. See the API reference for more details.



