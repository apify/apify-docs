---
title: Example setup
description: See an example setup of the Actor's Dockerfile and source code.
slug: /actors/development/actor-definition/source-code/example-setup
sidebar_position: 1
---

**See an example setup of Actor's Dockerfile and source code.**

---

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

will build the Actor from the `apify/actor-node:16` image, copy the `package.json` and `package-lock.json` files to the `/home/node` directory.

> We do first copy the `package.json`, `package-lock.json` , and install the dependencies before copying the rest of the source code. This way, we can take advantage of Docker's caching mechanism and only install the dependencies when the `package.json` or `package-lock.json` files change. This way, the build process is much faster.

Then it will install the NPM packages and copy the rest of the source code to the `/home/node/src` directory. Finally, it will run the `npm start` command, which is defined in the `package.json` file:

```json
{
    "name": "getting-started-node",
    "version": "0.0.1",
    "type": "module",
    "description": "This is an example of an Apify actor.",
    "dependencies": {
        "apify": "^3.0.0"
    },
    "devDependencies": {},
    "scripts": {
        "start": "node src/main.js",
        "test": "echo \"Error: oops, the actor has no tests yet, sad!\" && exit 1"
    },
    "author": "It's not you it's me",
    "license": "ISC"
}
```

So once the actor starts, the `src/main.js` gets executed.

  