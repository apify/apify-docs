---
title: Build
description: Documentation of Apify actors - a serverless computing jobs that enable execution of long-running web scraping and automation tasks in the cloud.
menuWeight: 3.3
---

## [](#build)Build

Before the actor can be run, it first needs to be built. The build effectively creates a snapshot of a specific version of the actor's settings such as the [Source code]({{@link actor/source_code.md}}) and [Environment variables]({{@link actor/run.md}}#run-env-vars), and creates a Docker image that contains everything the actor needs for its run, including necessary NPM packages, web browsers, etc.

Each build is assigned a unique build number of the form `MAJOR.MINOR.BUILD` (e.g. `1.2.345`), where `MAJOR.MINOR` corresponds to the actor version number (see [Versioning]({{@link actor/source_code.md#versioning}})) and `BUILD` is an automatically-incremented number starting at `1`.

By default, the build has a timeout of 300 seconds and consumes 1024 MB of memory from the user's memory limit. See the [Resource limits]({{@link actor/run.md#resource-limits}}) section for more details.

### [](#build-tags)Tags

When running the actor, the caller needs to specify which actor build should actually be used. To simplify this process, the builds can be associated with a tag such `latest` or `beta`, which can be used instead of the version number when running the actor. The tags are unique - only one build can be associated with a specific tag.

To set a tag for builds of a specific actor version, set the **Build tag** property. Whenever a new build of the version is successfully finished, it is automatically assigned the tag. By default, the builds are set the `latest` tag.

### [](#base-images)Base images

Apify provides the following Docker images that can be used as a base for user actors:

*   **Node.js 10 on Alpine Linux** ([apify/actor-node-basic _open_in_new_](https://hub.docker.com/r/apify/actor-node-basic/))
    Slim and efficient image, contains only the most elementary tools. Note that neither Puppeteer nor Selenium Webdriver is available in this image.
*   **Node.js 10 + Chrome on Debian** ([apify/actor-node-chrome _open_in_new_](https://hub.docker.com/r/apify/actor-node-chrome/))
    Larger image with a bundled both Chromium and Google Chrome browsers, [puppeteer](https://www.npmjs.com/package/puppeteer) and [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver) NPM packages. With this image, you can use both [`Apify.launchPuppeteer()`](https://sdk.apify.com/docs/api/apify#module_Apify.launchPuppeteer) and [`Apify.launchWebDriver()`](https://sdk.apify.com/docs/api/apify#module_Apify.launchWebDriver) functions. Note that Chrome requires quite a lot of resources, therefore the actor should run with at least 1024 MB of memory.
*   **Node.js 10 + Chrome + Xvfb on Debian** ([apify/actor-node-chrome-xvfb _open_in_new_](https://hub.docker.com/r/apify/actor-node-chrome-xvfb/))
    This image extends `apify/actor-node-chrome` with X virtual framebuffer ([Xvfb](https://www.x.org/archive/X11R7.6/doc/man/man1/Xvfb.1.xhtml)) in order to support non-headless browsing. Note that with this image the [`Apify.launchPuppeteer()`](https://sdk.apify.com/docs/api/apify#module_Apify.launchPuppeteer) and [`Apify.launchWebDriver()`](https://sdk.apify.com/docs/api/apify#module_Apify.launchWebDriver) functions open non-headless Chrome by default.
*   **[DEPRECATED] Node.js 10 + Puppeteer on Debian** ([apify/actor-node-puppeteer _open_in_new_](https://hub.docker.com/r/apify/actor-node-puppeteer/))
    This image is deprecated and will be removed in the future. Use the `apify/actor-node-chrome` image instead.

All images come in two versions: the `latest` tag corresponds to the stable version and `beta` to images where we test new features. Use the beta version at your own risk.

Note that all Apify Docker images are pre-cached on Apify servers in order to speed-up the actor builds and runs. The source code used to generate the images is available in the [apify-actor-docker _open_in_new_](https://github.com/apifytech/apify-actor-docker) GitHub repository.

### [](#build-cache)Cache

By default, the build process pulls latest copies of all necessary Docker images and builds each new layer of Docker image from scratch. To speedup the builds triggered via API you can add `useCache=1` parameter. See API reference for more details.

### [](#build-lifecycle)Lifecycle

Each build starts with the initial status `READY` and goes through one or more transitional statuses to one of the terminal statuses.

|Status|Type|Description|
|--- |--- |--- |
|`READY`|initial|Started but not allocated to any worker yet|
|`RUNNING`|transitional|Executing on a worker|
|`SUCCEEDED`|terminal|Finished successfully|
|`FAILED`|terminal|Build failed|
|`TIMING-OUT`|transitional|Timing out now|
|`TIMED-OUT`|terminal|Timed out|
|`ABORTING`|transitional|Being aborted by user|
|`ABORTED`|terminal|Aborted by user|
