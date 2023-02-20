---
title: Base Docker images
description: Learn about the Docker images you can use as your actor's base. Choose the correct base image for your actor's type and requirements.
slug: /actors/development/base-docker-images
---

# Base Docker images {#base-docker-images}

**Learn about the Docker images you can use as your actor's base. Choose the correct base image for your actor's type and requirements.**

---

Apify provides several Docker images that can be used as a base for user actors.

All images come in two versions: the **latest** tag corresponds to the stable version and **beta** to images where we test new features. Use the beta version at your own risk.

Note that all Apify Docker images are pre-cached on Apify servers in order to speed up the actor builds and runs. The source code used to generate the images is available in the [apify-actor-docker](https://github.com/apify/apify-actor-docker) GitHub repository.

## Images with Apify SDK and Crawlee preinstalled {#apify-sdk-actor-images}

The [Apify SDK for JavaScript](https://docs.apify.com/sdk/js) and [Crawlee](https://crawlee.dev/) are preinstalled on these images. You can read more about them in the [Apify SDK Docker image guide](https://docs.apify.com/sdk/js/docs/guides/docker-images).

- **Node.js 16 on Alpine Linux** ([`apify/actor-node`](https://hub.docker.com/r/apify/actor-node/)) - slim and efficient image, contains only the most elementary tools. Note that headless browsers (Puppeteer, Playwright) are not available in this image.

- **Node.js 16 + Puppeteer + Chrome on Debian** ([`apify/actor-node-puppeteer-chrome`](https://hub.docker.com/r/apify/actor-node-puppeteer-chrome/)) - larger image with the Chromium and Google Chrome browsers and the [`puppeteer`](https://github.com/puppeteer/puppeteer) library bundled. With this image, you can use the [`launchPuppeteer()`](https://crawlee.dev/api/puppeteer-crawler/function/launchPuppeteer) function and [`PuppeteerCrawler`](https://crawlee.dev/api/puppeteer-crawler/class/PuppeteerCrawler). Note that Chrome requires quite a lot of resources, therefore the actor should run with at least 2048 MB of memory.

- **Node.js 16 + Playwright + Chrome on Debian**  ([`apify/actor-node-playwright-chrome`](https://hub.docker.com/r/apify/actor-node-playwright-chrome/)) - similar to the `apify/actor-node-puppeteer-chrome` image, but it comes preinstalled the [`playwright`](https://github.com/microsoft/playwright) automation library instead of Puppeteer. With this image, you can use the [`launchPlaywright()`](https://crawlee.dev/api/playwright-crawler/function/launchPlaywright) function and [`PlaywrightCrawler`](https://crawlee.dev/api/playwright-crawler/class/PlaywrightCrawler). This image also comes with a `firefox` and `webkit` version.

For a full list of available images, [see the Apify SDK Docker image guide](https://docs.apify.com/sdk/js/docs/guides/docker-images). Note that some images available in the Apify UI can be marked as deprecated. This means that they should no longer be used for new projects and old projects are encouraged to migrate to one of the non-deprecated images.

## Images with Apify Client for Python preinstalled {#python-actor-images}

The [Apify API client for Python](https://docs.apify.com/api/client/python) is preinstalled on these images.

- **Python 3 on Alpine Linux** ([`apify/actor-python`](https://hub.docker.com/r/apify/actor-python/)) - a slim image with Python 3 and the [Apify API client for Python](https://docs.apify.com/api/client/python) preinstalled. Comes in multiple versions containing Python 3.7, 3.8, 3.9 or 3.10.
