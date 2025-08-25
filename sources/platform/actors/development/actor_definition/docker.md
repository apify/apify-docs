---
title: Dockerfile
description: Learn about the available Docker images you can use as a base for your Apify Actors. Choose the right base image based on your Actor's requirements and the programming language you're using.
slug: /actors/development/actor-definition/dockerfile
sidebar_position: 4
---

**Learn about the available Docker images you can use as a base for your Apify Actors. Choose the right base image based on your Actor's requirements and the programming language you're using.**

---

When developing an [Actor](/sources/platform/actors/index.mdx) on the Apify platform, you can choose from a variety of pre-built Docker images to serve as the base for your Actor. These base images come with pre-installed dependencies and tools, making it easier to set up your development environment and ensuring consistent behavior across different environments.

## Base Docker images

Apify provides several Docker images that can serve as base images for Actors. All images come in two versions:

- `latest` - This version represents the stable and production-ready release of the base image.
- `beta` - This version is intended for testing new features. Use at your own risk.

:::note Pre-cached Docker images

All Apify Docker images are pre-cached on Apify servers to speed up Actor builds and runs. The source code for generating these images is available in the [apify-actor-docker](https://github.com/apify/apify-actor-docker) repository.

:::

### Node.js base images

These images come with Node.js (versions `20`, `22`, or `24`) the [Apify SDK for JavaScript](/sdk/js), and [Crawlee](https://crawlee.dev/) preinstalled. The `latest` tag corresponds to the latest LTS version of Node.js.

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

These images come with Python (version `3.9`, `3.10`, `3.11`, `3.12`, or `3.13`) and the [Apify SDK for Python](/sdk/python) preinstalled. The `latest` tag corresponds to the latest Python 3 version supported by the Apify SDK.

| Image | Description |
| ----- | ----------- |
| [`actor-python`](https://hub.docker.com/r/apify/actor-python) | Slim Debian image with only the Apify SDK for Python. Does not include headless browsers. |
| [`actor-python-playwright`](https://hub.docker.com/r/apify/actor-python-playwright) | Debian image with [`playwright`](https://github.com/microsoft/playwright) and all its browsers. |
| [`actor-python-selenium`](https://hub.docker.com/r/apify/actor-python-selenium) | Debian image with [`selenium`](https://github.com/seleniumhq/selenium), Google Chrome, and [ChromeDriver](https://developer.chrome.com/docs/chromedriver/). |

## Custom Dockerfile

Apify uses Docker to build and run Actors. If you create an Actor from a template, it already contains an optimized `Dockerfile` for the given use case.

To use a custom `Dockerfile`, you can either:

- Reference it from the `dockerfile` field in `.actor/actor.json`,
- Store it in `.actor/Dockerfile` or `Dockerfile` in the root directory (searched in this order of preference).

If no `Dockerfile` is provided, the system uses the following default:

```dockerfile
FROM apify/actor-node:24

COPY --chown=myuser:myuser package*.json ./

RUN npm --quiet set progress=false \
 && npm install --only=prod --no-optional \
 && echo "Installed NPM packages:" \
 && (npm list --only=prod --no-optional --all || true) \
 && echo "Node.js version:" \
 && node --version \
 && echo "NPM version:" \
 && npm --version

COPY --chown=myuser:myuser . ./
```

For more information about `Dockerfile` syntax and commands, see the [Dockerfile reference](https://docs.docker.com/reference/dockerfile/).

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

This means the system expects the source code to be in `main.js` by default. If you want to override this behavior, use a custom `package.json` and/or `Dockerfile`.

:::tip Optimization tips

You can check out various optimization tips for Dockerfile in our [Performance](../performance.md) documentation.

:::

## Updating older Dockerfiles

All Apify base Docker images now use a non-root user to enhance security. This change requires updates to existing Actor `Dockerfile`s that use the `apify/actor-node`, `apify/actor-python`, `apify/actor-python-playwright`, or `apify/actor-python-selenium` images. This section provides guidance on resolving common issues that may arise during this migration.

If you encounter an issue that is not listed here, or need more guidance on how to update your Dockerfile, please [open an issue in the apify-actor-docker GitHub repository](https://github.com/apify/apify-actor-docker/issues/new).

:::danger Action required

As of **August 25, 2025** the base Docker images display a deprecation warning that links you here. This warning will be removed start of **February 2026**, so you should update your Dockerfiles to ensure forward compatibility.

:::

### User and working directory

To improve security, the affected images no longer run as the `root` user. Instead, they use a dedicated non-root user, `myuser`, and a consistent working directory at `/home/myuser`. This configuration is now the standard for all Apify base Docker images.

### Common issues

#### Crawlee templates automatically installing `git` in Python images

If you've built your Actor using a [Crawlee](https://crawlee.dev/) template, you might have the following line in your `Dockerfile`:

```dockerfile
RUN apt update && apt install -yq git && rm -rf /var/lib/apt/lists/*
```

You can safely remove this line, as the `git` package is now installed in the base image.

#### `uv` package manager fails to install dependencies

If you are using the `uv` package manager, you might have the following line in your `Dockerfile`:

```dockerfile
ENV UV_PROJECT_ENVIRONMENT="/usr/local"
```

With the move to a non-root user, this variable will cause `uv` to throw a permission error. You can safely remove this line, or, if you need it set to a custom path, adjust it to point to a location in the `/home/myuser` directory.

#### Copying files with the correct permissions

When using the `COPY` instruction to copy your files to the container, you should append the `--chown=myuser:myuser` flag to the command to ensure the `myuser` user owns the files.

Here are a few common examples:

```dockerfile
COPY --chown=myuser:myuser requirements.txt ./

COPY --chown=myuser:myuser . ./
```

:::warning

If your `Dockerfile` contains a `RUN` instruction similar to the following one, you should remove it:

```dockerfile
RUN chown -R myuser:myuser /home/myuser
```

Instead, add the `--chown` flag to the `COPY` instruction:

```dockerfile
COPY --chown=myuser:myuser . ./
```

Running `chown` across multiple files needlessly slows down the build process. Using the flag on `COPY` is much more efficient.

:::

#### An `apify` user is being added by a template

If your `Dockerfile` has instructions similar to the following, they were likely added by an older template:

```dockerfile
# Create and run as a non-root user.
RUN adduser -h /home/apify -D apify && \
    chown -R apify:apify ./
USER apify
```

You should remove these lines, as the new user is now `myuser`. Don't forget to update your `COPY` instructions to use the `--chown` flag with the `myuser` user.

```dockerfile
COPY --chown=myuser:myuser . ./
```

#### Installing dependencies that require root access

The `root` user is still available in the Docker images. If you must run steps that require root access (like installing system packages with `apt` or `apk`), you can temporarily switch to the `root` user.

```dockerfile
FROM apify/actor-node:24

# Switch to root temporarily to install dependencies
USER root

RUN apt update \
    && apt install -y <dependencies here>

# Switch back to the non-root user
USER myuser

# ... your other instructions
```

If your Actor needs to run as `root` for a specific reason, you can add the `USER root` instruction after `FROM`. However, for a majority of Actors, this is not necessary.
