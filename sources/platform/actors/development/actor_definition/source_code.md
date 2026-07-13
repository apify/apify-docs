---
title: Source code
description: Learn how to organize and structure your Actor source code, including directory placement conventions, programming language choice, and Dockerfile setup.
slug: /actors/development/actor-definition/source-code
sidebar_position: 2
---

The Apify Actor's source code placement is defined by its [Dockerfile](./docker.md). If you have created the Actor from one of Apify's [templates](https://apify.com/templates) then it's by convention placed in the `/src` directory.

You have the flexibility to choose any programming language, technologies, and dependencies (such as Chrome browser, Selenium, Cypress, or others) for your projects. The only requirement is to define a Dockerfile that builds the image for your Actor, including all dependencies and your source code.

## Example setup

Let's take a look at the example JavaScript Actor's source code. The following Dockerfile:

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

:::warning TypeScript Actors

The Dockerfile above uses `--omit=dev`, which strips `typescript`. If your `build` script invokes `tsc`, the image build fails with `tsc: not found`. Three fixes:

- **Multi-stage build** (smallest runtime image) — installs devDeps in a builder stage, copies the compiled output into a slim runtime stage. Most complex Dockerfile.
  <details><summary>Example</summary>

  ```dockerfile
  FROM apify/actor-node:24 AS builder
  COPY --chown=myuser:myuser package*.json ./
  RUN npm install --include=dev
  COPY --chown=myuser:myuser . ./
  RUN npm run build

  FROM apify/actor-node:24
  COPY --chown=myuser:myuser package*.json ./
  RUN npm install --omit=dev --omit=optional
  COPY --from=builder --chown=myuser:myuser /usr/src/app/dist ./dist
  CMD ["node", "dist/main.js"]
  ```

  </details>

- **Drop `--omit=dev`** (simplest Dockerfile, largest runtime image) — installs everything, including linters and type declarations, into the single-stage image.
  <details><summary>Example</summary>

  ```dockerfile
  FROM apify/actor-node:24
  COPY --chown=myuser:myuser package*.json ./
  RUN npm install
  COPY --chown=myuser:myuser . ./
  RUN npm run build
  CMD ["node", "dist/main.js"]
  ```

  </details>

- **Move `typescript` to `dependencies`** — keeps the single-stage Dockerfile but adds ~30 MB to the runtime image (`typescript` ~23 MB + `tsx` + esbuild ~10 MB). Runtime never uses these, so the space is wasted.
  <details><summary>Example</summary>

  ```json
  {
    "dependencies": {
      "apify": "^3.4.0",
      "typescript": "^5.5.0"
    }
  }
  ```

  </details>

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
