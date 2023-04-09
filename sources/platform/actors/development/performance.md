---
title: Performance
sidebar_position: 9
description: Learn how to get the maximum value out of your Actors, minimize costs, and maximize results.
slug: /actors/development/performance
---

**Learn how to get the maximum value out of your Actors, minimize costs, and maximize results.**

---

There are many ways to improve the performance of your Actors. This guide will help you understand the different ways to improve your performance and how to measure it.

## Optimization Tips

### Batch jobs win over the single jobs

When you run a single job, the Actor will be started and stopped for each run. This is a very expensive operation. If your Actor is running the web browser or other heavy dependencies, their startup times add to this. Therefore if you want to minimize your cost, we recommend you run a batch of jobs instead of a single job.

For example, instead of starting an actor for every URL you want to process, group them in batches and run the actor only once for each batch. The browser will then be re-used, and the implementation will become much more cost-efficient.

### Speed up your builds with the Docker layer cache

When you build your Docker image, Docker will cache the layers that are not changed. This means that if you change only a small part of your Dockerfile, Docker will not have to rebuild the whole image but only the layers that were changed. This can save you a lot of time and money.

Consider the following Dockerfile:

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

We do first copy the `package.json`, `package-lock.json` , and install the dependencies before copying the rest of the source code. This way, we can take advantage of Docker's caching mechanism and only install the dependencies when the `package.json` or `package-lock.json` files change. This way, the build process is much faster.

### Speedup the Actor startup times by using standardised images

If you use one of [Apify's standardized images](https://github.com/apify/apify-actor-docker), the startup time will be faster. This is because the images are cached at each worker machine, and so only the layers you added in your Actor's [Dockefile](./actor_definition/dockerfile.md) need to be pulled.

  