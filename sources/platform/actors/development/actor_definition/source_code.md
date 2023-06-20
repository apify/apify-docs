---
title: Source code
description: Learn about the Actor's source code placement and its structure.
slug: /actors/development/actor-definition/source-code
sidebar_position: 4
---

**Learn about the Actor's source code placement and its structure.**

---

The Apify Actor's source code placement is defined by its [Dockerfile](./dockerfile.md). If you have created the Actor from one of Apify's [templates](https://apify.com/templates) then it's by convention placed in the `/src` directory.

It's completely up to you what language and technologies, including various binaries (Chrome browser, Selenium, Cypress, or any other dependency of your choice) you use in your project. The only requirement is that you have to define the Dockerfile that will build the image for your Actor, including all the dependencies and your source code.

## Example setup

Let's take a look at the example JavaScript Actor's source code. The following Dockerfile

```dockerfile
FROM apify/actor-node:16

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

will build the Actor from the `apify/actor-node:16` image, copy the `package.json` and `package-lock.json` files to the image.

> We first copy the `package.json`, `package-lock.json` , and install the dependencies before copying the rest of the source code. This way, we can take advantage of Docker's caching mechanism and only install the dependencies when the `package.json` or `package-lock.json` files change. This way, the build process is much faster.

Then it will install the NPM packages and copy the rest of the source code to the image. Finally, it will run the `npm start` command, which is defined in the `package.json` file:

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

So once the Actor starts, the `src/main.js` gets executed.

