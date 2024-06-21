---
title: Performance
sidebar_position: 9
description: Learn how to get the maximum value out of your Actors, minimize costs, and maximize results.
slug: /actors/development/performance
---

**Learn how to get the maximum value out of your Actors, minimize costs, and maximize results.**

---

## Optimization Tips

This guide provides tips to help you maximize the poerformance of your Actors, minimize costs, and achieve optimal results.

### Run batch jobs instead of single jobs

Running a single job causes the Actor to start and stop for each execution, which is an expensive operation. If your Actor runs a web browser or other resource-intensive dependencies, their startup times further contribute to the cost. To minimize costs, we recommend running batch jobs instead of single jobs.

For example, instead of starting an Actor for every URL you want to process, group the URLs into batches and run the Actor once for each batch. This approach reuses the browser instance, resulting in a more cost-efficient implementation.

### Leverage Docker layer caching to speed up builds

When you build a Docker image, Docker caches the layers that haven't changed. This means that if you modify only a small part of your Dockerfile, Docker doesn't need to rebuild the entire image but only the changed layers. This can save significant time and money.

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

We first copy the `package.json`, `package-lock.json` files , and install the dependencies before copying the rest of the source code. This way, we can take advantage of Docker's caching mechanism and only install the dependencies when the `package.json` or `package-lock.json` files change, making the build process much faster.

:::tip Further optimization tips

- We recommend using as few layers as possible in your Docker images. This helps to reduce overall image sizes and improve build times.
- Use the [dive](https://github.com/wagoodman/dive) CLI tool to analyze the layers of a built Docker image. This toll provides insights into the composition of each layer, allowing you to understand and minimize their numbers.

:::

### Use standardized images to accelerate Actor startup times

Using on of [Apify's standardized images](https://github.com/apify/apify-actor-docker), can accelrate the Actor startup time. These images are cached on each worker machine, so only the layers you added in your Actor's [Dockerfile](./actor_definition/docker.md) need to be pulled.
