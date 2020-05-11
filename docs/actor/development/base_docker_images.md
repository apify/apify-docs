---
title: Base Docker images
description: Documentation of Apify actors - options for Docker images to use as your actor's base.
paths:
    - actor/development/base-docker-images
    - actors/development/base-docker-images
---

# [](#base-images)Base Docker images

Apify provides the following Docker images that can be used as a base for user actors:

*   **Node.js 12 on Alpine Linux** ([apify/actor-node-basic](https://hub.docker.com/r/apify/actor-node-basic/))
    Slim and efficient image, contains only the most elementary tools. Note that Puppeteer is not available in this image.
*   **Node.js 12 + Chrome on Debian** ([apify/actor-node-chrome](https://hub.docker.com/r/apify/actor-node-chrome/))
    Larger image with the Chromium and Google Chrome browsers and the [puppeteer](https://www.npmjs.com/package/puppeteer) NPM package bundled. With this image, you can use the [`Apify.launchPuppeteer()`](https://sdk.apify.com/docs/api/apify#apifylaunchpuppeteeroptions) function. Note that Chrome requires quite a lot of resources, therefore the actor should run with at least 1024 MB of memory.
*   **Node.js 12 + Chrome + Xvfb on Debian** ([apify/actor-node-chrome-xvfb](https://hub.docker.com/r/apify/actor-node-chrome-xvfb/))
    This image extends `apify/actor-node-chrome` with X virtual framebuffer ([Xvfb](https://www.x.org/archive/X11R7.6/doc/man/man1/Xvfb.1.xhtml)) in order to support non-headless browsing. Note that with this image the [`Apify.launchPuppeteer()`](https://sdk.apify.com/docs/api/apify#apifylaunchpuppeteeroptions) function opens non-headless Chrome by default.
*   **[DEPRECATED] Node.js 10 + Puppeteer on Debian** ([apify/actor-node-puppeteer](https://hub.docker.com/r/apify/actor-node-puppeteer/))
    This image is deprecated and will be removed in the future. Use the `apify/actor-node-chrome` image instead.

All images come in two versions: the `latest` tag corresponds to the stable version and `beta` to images where we test new features. Use the beta version at your own risk.

Note that all Apify Docker images are pre-cached on Apify servers in order to speed-up the actor builds and runs. The source code used to generate the images is available in the [apify-actor-docker](https://github.com/apifytech/apify-actor-docker) GitHub repository.