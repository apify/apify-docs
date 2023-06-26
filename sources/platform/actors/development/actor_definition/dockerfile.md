---
title: Dockerfile
description: Learn about the Docker images you can use as your Actor's base. Choose the correct base image for your Actor's type and requirements.
slug: /actors/development/actor-definition/dockerfile
sidebar_position: 4
---

**Learn about the Docker images you can use as your actor's base. Choose the correct base image for your actor's type and requirements.**

---

Apify provides several Docker images that can be used as a base for user actors.

All images come in two versions: the **latest** tag corresponds to the stable version and **beta** to images where we test new features. Use the beta version at your own risk.

Note that all Apify Docker images are pre-cached on Apify servers in order to speed up the actor builds and runs. The source code used to generate the images is available in the [apify-actor-docker](https://github.com/apify/apify-actor-docker) GitHub repository.

## Images with Apify SDK and Crawlee preinstalled {#apify-sdk-actor-images}

The [Apify SDK for JavaScript](/sdk/js) and [Crawlee](https://crawlee.dev/) are preinstalled on these images. You can read more about them in the [Apify SDK Docker image guide](/sdk/js/docs/guides/docker-images).

- **Node.js 16 on Alpine Linux** ([`apify/actor-node`](https://hub.docker.com/r/apify/actor-node/)) - slim and efficient image, contains only the most elementary tools. Note that headless browsers (Puppeteer, Playwright) are not available in this image.

- **Node.js 16 + Puppeteer + Chrome on Debian** ([`apify/actor-node-puppeteer-chrome`](https://hub.docker.com/r/apify/actor-node-puppeteer-chrome/)) - larger image with the Chromium and Google Chrome browsers and the [`puppeteer`](https://github.com/puppeteer/puppeteer) library bundled. With this image, you can use the [`launchPuppeteer()`](https://crawlee.dev/api/puppeteer-crawler/function/launchPuppeteer) function and [`PuppeteerCrawler`](https://crawlee.dev/api/puppeteer-crawler/class/PuppeteerCrawler). Note that Chrome requires quite a lot of resources, therefore the actor should run with at least 2048 MB of memory.

- **Node.js 16 + Playwright + Chrome on Debian**  ([`apify/actor-node-playwright-chrome`](https://hub.docker.com/r/apify/actor-node-playwright-chrome/)) - similar to the `apify/actor-node-puppeteer-chrome` image, but it comes preinstalled the [`playwright`](https://github.com/microsoft/playwright) automation library instead of Puppeteer. With this image, you can use the [`launchPlaywright()`](https://crawlee.dev/api/playwright-crawler/function/launchPlaywright) function and [`PlaywrightCrawler`](https://crawlee.dev/api/playwright-crawler/class/PlaywrightCrawler). This image also comes with a `firefox` and `webkit` version.

For a full list of available images, [see the Apify SDK Docker image guide](/sdk/js/docs/guides/docker-images).

## Images with Apify Client for Python preinstalled {#python-actor-images}

The [Apify API client for Python](/api/client/python) is preinstalled on these images.

- **Python 3 on Alpine Linux** ([`apify/actor-python`](https://hub.docker.com/r/apify/actor-python/)) - a slim image with Python 3 and the [Apify API client for Python](/api/client/python) preinstalled. Comes in multiple versions containing Python 3.7, 3.8, 3.9 or 3.10.


## [](#custom-dockerfile)Custom Dockerfile

Internally, Apify uses Docker to build and run Actors. To control the build of the Actor, you can create a custom **Dockerfile** and either reference from the `dockerfile` field in the Actor's config in **.actor/actor.json**, or store it in **.actor/Dockerfile** or **Dockerfile** in its root directory. These three sites are searched for in this order of preference. If the **Dockerfile** is missing, the system uses the following default:

```dockerfile
FROM apify/actor-node:16

COPY package*.json ./

RUN npm --quiet set progress=false \
 && npm install --only=prod --no-optional \
 && echo "Installed NPM packages:" \
 && (npm list --only=prod --no-optional --all || true) \
 && echo "Node.js version:" \
 && node --version \
 && echo "NPM version:" \
 && npm --version

COPY . ./
```

For more information about Dockerfile syntax and commands, see the [Dockerfile reference](https://docs.docker.com/engine/reference/builder/).

Note that `apify/actor-node` is a base Docker image provided by Apify. There are other base images with other features available. However, you can use arbitrary Docker images as the base for your Actors, although using the Apify images has some performance advantages.

By default, all Apify base Docker images with the Apify SDK and Crawlee start your Node.js application the same way as **npm start** does, i.e. by running the command specified in the **package.json** file under the **scripts** - **start** key. The default **package.json** file is similar to the following.

```json
{
    "description": "Anonymous actor on the Apify platform",
    "version": "0.0.1",
    "license": "UNLICENSED",
    "main": "main.js",
    "scripts": {
        "start": "node main.js"
    },
    "dependencies": {
        "apify": "^3.0.0",
        "crawlee": "^3.0.0"
    },
    "repository": {}
}
```

*This means that by default the system expects the source code to be in the **main.js** file.* If you want to override this behavior, use a custom **package.json** and/or **Dockerfile**.

