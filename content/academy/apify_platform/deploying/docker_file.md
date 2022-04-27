---
title: Dockerfile
description: Understand how to write a Dockerfile (Docker image blueprint) for your project so that it can be run within a Docker container on the Apify platform.
menuWeight: 3
paths:
- apify-platform/deploying/docker-file
---

# [](#dockerfile) Dockerfile

The **Dockerfile** is a file which gives the Apify platform (or Docker, more specifically) instructions on how to create an environment for your code to run in. Every actor must have a Dockerfile, as actors run in Docker containers.

> Actors on the platform are always run in Docker containers; however, they can also be run in local Docker containers. This is not common pracice though, as it requires more setup and a deeper understanding of Docker. For testing, it's best to just run the actor on the local OS (this requires you to have the underlying runtime installed, such as Node.js, Python, Rust, GO, etc).

## [](#base-images) Base images

If your project doesn’t already contain a Dockerfile, don’t worry! [Docker Hub](https://hub.docker.com/) provides a ton of free Docker images for most use-cases, upon which you can create your own images. At the base level, each Docker image contains a Linux OS distribution and usually also a programming language runtime (such as Node.js). You can also find images with preinstalled libraries or just install them yourself during the build step.

> Apify offers many base images for building actors, which can be found [here](https://hub.docker.com/u/apify)

Once you find the base image you need, you can add it as the initial `FROM` statement:

```Dockerfile
FROM apify/actor-node:16
```

> For syntax highlighting in your Dockerfiles, download the **Docker** VSCode extension.

## [](#writing-the-file) Writing the file

The rest of the Dockerfile is about copying the source code from the local filesystem into the container's filesystem, installing libraries, and setting the `RUN` command (which falls back to the parent image).

> If you are not using a base image from Apify, then you should specify how to launch the source code of your actor with the `CMD` instruction.

Here's the Dockerfile for our example project's actor:

```Dockerfile
FROM apify/actor-node:16

# Second, copy just package.json and package-lock.json since they are the only files
# that affect NPM install in the next step
COPY package*.json ./

# Install NPM packages, skip optional and development dependencies to keep the
# image small. Avoid logging too much and print the dependency tree for debugging
RUN npm --quiet set progress=false \
 && npm install --only=prod --no-optional \
 && echo "Installed NPM packages:" \
 && (npm list --all || true) \
 && echo "Node.js version:" \
 && node --version \
 && echo "NPM version:" \
 && npm --version

# Next, copy the remaining files and directories with the source code.
# Since we do this after NPM install, quick build will be really fast
# for simple source file changes.
COPY . ./
```

## [](#examples) Examples

The example we just showed was for Node.js, however, to drive home the fact that actors can be written in any language, here are some examples of some Dockerfiles for actors written in different programming languages:

```marked-tabs
<marked-tab header="GO actor Dockerfile" lang="Dockerfile">
FROM golang:1.17.1-alpine

WORKDIR /app
COPY . .

RUN go mod download

RUN go build -o /example-actor
CMD ["/example-actor"]
</marked-tab>
<marked-tab header="Rust actor Dockerfile" lang="Dockerfile">
# Image with prebuilt Rust. We use the newest 1.* version
# https://hub.docker.com/_/rust
FROM rust:1

# We copy only package setup so we cache building all dependencies
COPY Cargo* ./

# We need to have dummy main.rs file to be able to build
RUN mkdir src && echo "fn main() {}" > src/main.rs

# Build dependencies only
# Since we do this before copying  the rest of the files,
# the dependencies will be cached by Docker, allowing fast
# build times for new code changes
RUN cargo build --release

# Delete dummy main.rs
RUN rm -rf src

# Copy rest of the files
COPY . ./

# Build the source files
RUN cargo build --release

CMD ["./target/release/actor-example"]
</marked-tab>
<marked-tab header="Julia actor Dockerfile" lang="Dockerfile">
FROM julia:1.7.1-alpine

WORKDIR /app
COPY . .

RUN julia install.jl

CMD ["julia", "main.jl"]
</marked-tab>
```

## [](#next) Next up

In the [next lesson]({{@link apify_platform/deploying/deploying.md}}), we'll be push our code directly to the Apify platform, or create and integrate a new actor on the Apify platform with our project's Github repository.
