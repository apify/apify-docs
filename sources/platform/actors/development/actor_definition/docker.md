---
title: Dockerfile
description: Learn about the available Docker images you can use as a base for your Apify Actors. Choose the right base image based on your Actor's requirements and the programming language you're using.
slug: /actors/development/actor-definition/dockerfile
sidebar_position: 4
---

**Learn about the available Docker images you can use as a base for your Apify Actors. Choose the right base image based on your Actor's requirements and the programming language you're using.**

---

When developing an [Actor](/sources/platform/actors/index.mdx) on the Apify platform, you can choose from a variety of pre-built Docker iamges to serve as the base for your Actor. These base images come with pre-installed dependencies and tools, making it easier to set up your development envrionment and ensuring consistent behavior across different environments.

## Base Docker images

Apify provides several Docker images that can serve as base images for Actors. All images come in two versions:

- `latest` - This version represents the stable and production-ready release of the base image.
- `beta` - This version is intended for testing new features. Use at your own risk.

:::note Pre-cached Docker images

All Apify Docker images are pre-cached on Apify servers to speed up Actor builds and runs. The source code for generating these images is available in the [apify-actor-docker](https://github.com/apify/apify-actor-docker) repository.

:::

### Node.js base images

These images come with Node.js (versions `16`, `18`, `20`, or `22`) the [Apify SDK for JavaScript](/sdk/js), and [Crawlee](https://crawlee.dev/) preinstalled. The `latest` tag corresponds to the latest LTS version of Node.js.

| Image | Description |
| ----- | ----------- |
| [`actor-node`](https://hub.docker.com/r/apify/actor-node/) | Slim Alpine Linux image with only essential tools. Does not include headless browsers. |
| [`actor-node-puppeteer-chrome`](https://hub.docker.com/r/apify/actor-node-puppeteer-chrome/) | Debian image with Chromium, Google Chrome, and the [`puppeteer`](https://github.com/puppeteer/puppeteer) library. |
| [`actor-node-playwright-chrome`](https://hub.docker.com/r/apify/actor-node-playwright-chrome/) | Debian image with Chromium, Google Chrome, and the [`playwright`](https://github.com/microsoft/playwright) library. |
| [`actor-node-playwright-firefox`](https://hub.docker.com/r/apify/actor-node-playwright-firefox/) | Debian image with Firefox and the [`playwright`](https://github.com/microsoft/playwright) library . |
| [`actor-node-playwright-webkit`](https://hub.docker.com/r/apify/actor-node-playwright-webkit/) | Ubuntu image with WebKit and the [`playwright`](https://github.com/microsoft/playwright) library. |
| [`actor-node-playwright`](https://hub.docker.com/r/apify/actor-node-playwright/) | Ubuntu image with [`playwright`](https://github.com/microsoft/playwright) and all its browsers (Chromium, Google Chrome, Firefox, WebKit). |

See the [Docker image guide](/sdk/js/docs/guides/docker-images) for more details.

### Python base images

These images come with Python (version `3.8`, `3.9`, `3.10`, `3.11`, or `3.12`) and the [Apify SDK for Python](/sdk/python) preinstalled. The `latest` tag corresponds to the latest Python 3 version supported by the Apify SDK.

| Image | Description |
| ----- | ----------- |
| [`actor-python`](https://hub.docker.com/r/apify/actor-python) | Slim Debian image with only the Apify SDK for Python. Does not include headless browsers. |
| [`actor-python-playwright`](https://hub.docker.com/r/apify/actor-python-playwright) | Debian image with [`playwright`](https://github.com/microsoft/playwright) and all its browsers. |
| [`actor-python-selenium`](https://hub.docker.com/r/apify/actor-python-selenium) | Debian image with [`selenium`](https://github.com/seleniumhq/selenium), Google Chrome, and [ChromeDriver](https://chromedriver.chromium.org/). |

## Custom Dockerfile

Apify uses Docker to build and run Actors. If you create an Actor from a template, it already contains an optimized `Dockerfile` for the given use case.

To use a custom `Dockerfile`, you can either:

- Reference it from the `dockerfile` field in `.actor/actor.json`,
- Store it in `.actor/Dockerfile` or `Dockerfile` in the root directory (searched in this order of preference).

If no `Dockerfile` is provided, the system uses the following default:

```dockerfile
FROM apify/actor-node:20

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

For more information about `Dockerfile` syntax and commands, see the [Dockerfile reference](https://docs.docker.com/engine/reference/builder/).

:::note Custom base images

While `apify/actor-node` is a base Docker image provided by Apify, you can use other Docker images as the base for your Actors. <br/>
However, using the Apify images has some performance advantages, as they are pre-caches on Apify servers.

:::

By default, Apify base Docker images with the Apify SDK and Crawlee start your Node.js application the same way as `npm start`, i.e, by running the command specified in `package.json` under `scripts` - `start`. The default `package.json` is similar to:

```json
{
    "description": "Anonymous Actor on the Apify platform",
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

This means the system expects the source code to be in `main.js` by default. If you want to override this behavior, ues a custom `package.json` and/or `Dockerfile`.

:::tip Optimization tips

You can check out various optimization tips for Dockerfile in our [Performance](../performance.md) documentation.

:::
