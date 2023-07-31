---
title: Dockerfile
description: Learn about the Docker images you can use as your Actor's base. Choose the correct base image for your Actor's type and requirements.
slug: /actors/development/actor-definition/dockerfile
sidebar_position: 4
---

**Learn about the Docker images you can use as your actor's base. Choose the correct base image for your actor's type and requirements.**

---

## Base Docker images

Apify provides several Docker images that can be used as a base for user actors.

All images come in two versions: the **latest** tag corresponds to the stable version and **beta** to images where we test new features. Use the beta version at your own risk.

Note that all Apify Docker images are pre-cached on Apify servers in order to speed up the actor builds and runs. The source code used to generate the images is available in the [apify-actor-docker](https://github.com/apify/apify-actor-docker) GitHub repository.

### Node.js base images

Apify provides several Docker images with Node.js, the [Apify SDK for JavaScript](/sdk/js) and [Crawlee](https://crawlee.dev/) preinstalled.
These images come with either Node.js 16, 18 or 20, you can choose which one you want using one of the `16`, `18` or `20` tags. The `latest` tag corresponds to the latest LTS version of Node.js.

| Image | Description |
| ----- | ----------- |
| Node.js on Alpine Linux ([`actor-node`](https://hub.docker.com/r/apify/actor-node/)) | Slim and efficient image, contains only the most elementary tools. Note that headless browsers (Puppeteer, Playwright) are not available in this image. |
| Node.js + Puppeteer + Chrome on Debian ([`actor-node-puppeteer-chrome`](https://hub.docker.com/r/apify/actor-node-puppeteer-chrome/)) | Larger image with the Chromium and Google Chrome browsers and the [`puppeteer`](https://github.com/puppeteer/puppeteer) library bundled. |
| Node.js + Playwright + Chrome on Debian ([`actor-node-playwright-chrome`](https://hub.docker.com/r/apify/actor-node-playwright-chrome/)) | Larger image with the Chromium and Google Chrome browsers and the [`playwright`](https://github.com/microsoft/playwright) library bundled. |
| Node.js + Playwright + Firefox on Debian ([`actor-node-playwright-firefox`](https://hub.docker.com/r/apify/actor-node-playwright-firefox/)) | Larger image with the Firefox browser and the [`playwright`](https://github.com/microsoft/playwright) library bundled. |
| Node.js + Playwright + WebKit on Ubuntu ([`actor-node-playwright-webkit`](https://hub.docker.com/r/apify/actor-node-playwright-webkit/)) | Larger image with the Webkit browser engine and the [`playwright`](https://github.com/microsoft/playwright) library bundled. |
| Node.js + Playwright + all browsers on Ubuntu ([`actor-node-playwright`](https://hub.docker.com/r/apify/actor-node-playwright/)) | A very large and slow image with the [`playwright`](https://github.com/microsoft/playwright) library and all Playwright browsers (Chromium, Chrome, Firefox, WebKit) bundled. |

You can read more about each of the images in the [Apify SDK Docker image guide](/sdk/js/docs/guides/docker-images).

### Python base images

Apify provides several Docker images with Python 3 and the [Apify SDK for Python](/sdk/python) preinstalled.
These images come with either Python 3.8, 3.9, 3.10 or 3.11, you can choose which one you want using one of the `3.8`, `3.9`, `3.10` or `3.11` tags. The `latest` tag corresponds to the latest version of Python 3 supported by the Apify SDK.

These images are all based on Debian Bullseye.

| Image | Description |
| ----- | ----------- |
| Python ([`actor-python`](https://hub.docker.com/r/apify/actor-python)) | Slim and efficient image, containing just the Apify SDK for Python. Headless browsers (Playwright, Selenium) are not available in this image. |
| Python + Playwright ([`actor-python-playwright`](https://hub.docker.com/r/apify/actor-python-playwright)) | Larger image with the [`playwright`](https://github.com/microsoft/playwright) library and all its browsers bundled. |
| Python + Selenium + Chrome ([`actor-python-selenium`](https://hub.docker.com/r/apify/actor-python-selenium)) | Larger image with the [`selenium`](https://github.com/seleniumhq/selenium) library, Google Chrome and [ChromeDriver](https://chromedriver.chromium.org/) bundled. |

## Custom Dockerfile

Internally, Apify uses Docker to build and run Actors. If you create an Actor from a template, the Actor already contains an optimized Dockerfile for the given use-case.

To control the build of the Actor, you can create a custom **Dockerfile** and either reference from the `dockerfile` field in the Actor's config in **.actor/actor.json**, or store it in **.actor/Dockerfile** or **Dockerfile** in its root directory. These three sites are searched for in this order of preference. If the **Dockerfile** is missing, the system uses the following default:

```dockerfile
FROM apify/actor-node:18

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

