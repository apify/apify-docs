---
title: Source code
description: Learn about the Actor's source code placement and its structure.
slug: /actors/development/actor-definition/source-code
sidebar_position: 4
---

**Learn about the Actor's source code placement and its structure.**

---

The structure and placement of an Apify Actor's source code is defined by its [`Dockerfile`](./dockerfile.md). If you create the Actor from one of Apify's [templates](https://apify.com/templates), the source code by default is placed in the `/src`.

You have the flexibility to choose any programming language, technologies, and dependencies (such as Chrome browser, Selenium, Cypress, or others) for your projects. The only requirement is to define a Dockerfile that builds the image for your Actor, including all dependencies and your source code.

## Example setup

To better understand how to structure your Actor's source code, let's take a look at an example for a JavaScript Actor.

### `Dockerfile`

Here's the complete `Dockerfile`

```dockerfile
FROM apify/actor-node:20

COPY package*.json ./

RUN npm --quiet set progress=false \
    && npm install --omit=dev --omit=optional \
    && echo "Installed NPM packages:" \
    && (npm list --omit=dev --all || true) \
    && echo "Node.js version:" \
    && node --version \
    && echo "NPM version:" \
    && npm --version \
    && rm -r ~/.npm

COPY . ./

CMD npm start --silent
```

This `Dockerfile` does the following tasks:

1. Builds the Actor from the `apify/actor-node:20` base image.

    ```dockerfile
    FROM apify/actor-node:20
    ```

2. Copies the `package.json` and `package-lock.json` files to the image.

    ```dockerfile
    COPY package*.json ./
    ```

3. Installs the npm packages specified in package.json, omitting development and optional dependencies.

    ```dockerfile
    RUN npm --quiet set progress=false \
        && npm install --omit=dev --omit=optional \
        && echo "Installed NPM packages:" \
        && (npm list --omit=dev --all || true) \
        && echo "Node.js version:" \
        && node --version \
        && echo "NPM version:" \
        && npm --version \
        && rm -r ~/.npm
    ```

4. Copies the rest of the source code to the image

    ```dockerfile
    COPY . ./
    ```

5. Runs the `npm start` command defined in `package.json`

    ```dockerfile
    CMD npm start --silent
    ```

:::note Optimized build cache

By copying the `package.json` and `package-lock.json` files and installing dependencies before the rest of the source code, you can take advantage of Docker's caching mechanism. This approach ensures that dependencies are only reinstalled when the `package.json` or `package-lock.json` files change, significantly reducing build times. Since the installation of dependencies is often the most time-consuming part of the build process, this optimization can lead to substantial performance improvements, especially for larger projects with many dependencies.


:::

### `package.json`

The `package.json` file defines the `npm start` command:

```json
{
    "name": "getting-started-node",
    "version": "0.0.1",
    "type": "module",
    "description": "This is an example of an Apify Actor.",
    "dependencies": {
        "apify": "^3.0.0"
    },
    "devDependencies": {},
    "scripts": {
        "start": "node src/main.js",
        "test": "echo \"Error: oops, the Actor has no tests yet, sad!\" && exit 1"
    },
    "author": "It's not you; it's me",
    "license": "ISC"
}
```

When the Actor starts, the `src/main.js` file is executed.
