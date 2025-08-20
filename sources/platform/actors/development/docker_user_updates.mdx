---
title: Dockerfile user updates
description: Learn what changes you need to do in your Actor Docker files with the new user changes
slug: /actors/development/docker-user-changes
---

**Learn what changes and issues you might encounter after some of our Docker images migrate to a privilege-less user**

---

:::danger A note about the warning

The warning in the base Docker images will be removed near the end of the year! Make sure you update your Docker files until then so you don't forget!

If you have issues or questions about it, feel free to open an issue on our [GitHub repository](https://github.com/apify/apify-actor-docker/issues/new)

:::

---

This page is mostly dedicated for the users of the following Docker images:

- `apify/actor-node`
- `apify/actor-python`
- `apify/actor-python-playwright`
- `apify/actor-python-selenium`

### What's changed?

These images are moving from using the built-in **`root`** user and a usually random work directory (for example `/usr/src/app`) to consistent ones with our other Docker images.

Specifically, the user is now **`myuser`**, and the working directory is **`/home/myuser`**.

Now, you might ask yourself: why?. Our node Docker images that come with browsers do this in order to ensure the Actor runs in a more-secure environment, should there be any vulnerabilities in the dependencies.

We want to ensure all our images follow this pattern. As such, after this Pull Request on [GitHub](https://github.com/apify/apify-actor-docker/pull/188), that will become the default for all our Docker images.

### Common issues

#### Crawlee images automatically installing `git` in Python images

If you've built your Actor using [Crawlee](https://crawlee.dev/) templates, you might have the following line in your Dockerfile:

```dockerfile
RUN apt update && apt install -yq git && rm -rf /var/lib/apt/lists/*
```

You can safely remove this line, as the `git` package is now installed in the base image.

#### `uv` package manager fails to install dependencies

If you've built your Actor using [Crawlee](https://crawlee.dev/) templates, or you hand-rolled your own Dockerfile,
you might have the following line in your Dockerfile:

```dockerfile
ENV UV_PROJECT_ENVIRONMENT="/usr/local"
```

As of the move to the new user, this variable will cause `uv` to throw an error due to permission errors. You can safely remove it!
Alternatively, you can adjust it to point to the `/home/myuser` directory.

#### How do I copy my files while also `chown`ing them to the new user?

When using the `COPY` instruction to copy your files to the container, you should append the `--chown=myuser:myuser` flag to the command.

Here's a few common example:

```dockerfile
COPY --chown=myuser:myuser requirements.txt ./

COPY --chown=myuser:myuser . ./
```

:::warning

If your Dockerfile contains a `RUN` instruction similar to the following one, you should remove it:

```dockerfile
RUN chown -R myuser:myuser /home/myuser
```

Instead, add the `chown` flag to the `COPY` instruction:

```dockerfile
COPY --chown=myuser:myuser . ./
```

Running `chown` across multiple files will needlessly slow down the build process.

:::

#### The template I used is trying to add an `apify` user

If your Docker file has instructions similar to the following:

```dockerfile
# Create and run as a non-root user.
RUN adduser -h /home/apify -D apify && \
    chown -R apify:apify ./
USER apify
```

You should remove it, as the new user is now **`myuser`**. Don't forget to update your `COPY` instructions to use the `chown` flag with the `myuser` user.

```dockerfile
COPY --chown=myuser:myuser . ./
```

#### How do I install dependencies that require root access via `apt` / `apk`?

The good news is that the **`root`** user is still available in the Docker images. If you must run steps that require root access, here's an example of how you should do it:

```dockerfile
FROM apify/actor-node:24

# Switch to root temporarily to install dependencies
USER root

RUN apt update \
    && apt install -y <dependencies here>

# Switch back to the non-root user
USER myuser

# ...
```

If your Actor *needs* to run as **`root`** for some reason, just add the `USER root` in your Dockerfile after the `FROM` instruction. But for a majority of Actors, this is not the case.
