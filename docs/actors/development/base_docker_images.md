---
title: Base Docker images
description: Learn about the Docker images you can use as your actor's base. Choose the correct base image for your actor's type and requirements.
paths:
    - actor/development/base-docker-images
    - actors/development/base-docker-images
---

# [](#base-docker-images) Base Docker images

Apify provides several Docker images that can be used as a base for user actors.

All images come in two versions: the **latest** tag corresponds to the stable version and **beta** to images where we test new features. Use the beta version at your own risk.

Note that all Apify Docker images are pre-cached on Apify servers in order to speed up the actor builds and runs. The source code used to generate the images is available in the [apify-actor-docker](https://github.com/apifytech/apify-actor-docker) GitHub repository.

## [](#apify-sdk-actor-images) Images with Apify SDK preinstalled

The [Apify SDK for JavaScript](https://sdk.apify.com) is preinstalled on these images. You can read more about them in the [Apify SDK Docker image guide](https://sdk.apify.com/docs/guides/docker-images).

- **Node.js 14 on Alpine Linux** ([`apify/actor-node`](https://hub.docker.com/r/apify/actor-node/)) - slim and efficient image, contains only the most elementary tools. Note that headless browsers (Puppeteer, Playwright) are not available in this image.

- **Node.js 14 + Puppeteer + Chrome on Debian** ([`apify/actor-node-puppeteer-chrome`](https://hub.docker.com/r/apify/actor-node-puppeteer-chrome/)) - larger image with the Chromium and Google Chrome browsers and the [`puppeteer`](https://github.com/puppeteer/puppeteer) library bundled. With this image, you can use the [`Apify.launchPuppeteer()`](https://sdk.apify.com/docs/api/apify#launchpuppeteer) function and [`PuppeteerCrawler`](https://sdk.apify.com/docs/api/puppeteer-crawler). Note that Chrome requires quite a lot of resources, therefore the actor should run with at least 2048 MB of memory.

- **Node.js 14 + Playwright + Chrome on Debian**  ([`apify/actor-node-playwright-chrome`](https://hub.docker.com/r/apify/actor-node-playwright-chrome/)) - similar to the `apify/actor-node-puppeteer-chrome` image, but it comes preinstalled the [`playwright`](https://github.com/microsoft/playwright) automation library instead of Puppeteer. With this image, you can use the [`Apify.launchPlaywright()`](https://sdk.apify.com/docs/api/apify#launchplaywright) function and [`PlaywrightCrawler`](https://sdk.apify.com/docs/api/playwright-crawler). This image also comes with a `firefox` and `webkit` version.

For a full list of available images, [see the Apify SDK Docker image guide](https://sdk.apify.com/docs/guides/docker-images). Note that some images available in the Apify UI can be marked as deprecated. This means that they should no longer be used for new projects and old projects are encouraged to migrate to one of the non-deprecated images.

## [](#python-actor-images) Images with Apify Client for Python preinstalled

The [Apify API client for Python](https://docs.apify.com/apify-client-python) is preinstalled on these images.

- **Python 3 on Alpine Linux** ([`apify/actor-python`](https://hub.docker.com/r/apify/actor-python/)) - a slim image with Python 3 and the [Apify API client for Python](https://docs.apify.com/apify-client-python) preinstalled. Comes in multiple versions containing Python 3.7, 3.8 or 3.9.
