---
title: Local development
sidebar_position: 1
description: Create your first Actor locally on your machine, deploy it to the Apify platform, and run it in the cloud.
slug: /actors/development/quick-start/locally
---

**Create your first Actor locally on your machine, deploy it to the Apify platform, and run it in the cloud.**

---

:::info Prerequisites

You need to have [Node.js](https://nodejs.org/en/) version 16 or higher with NPM installed on your computer.

:::

## Install Apify CLI

### MacOS/Linux

You can install the Apify CLI via the [Homebrew package manager](https://brew.sh/).

```bash
brew install apify-cli
```

### Other platforms

Use [NPM](https://www.npmjs.com/) to install the Apify CLI.

```bash
npm -g install apify-cli
```

Visit [Apify CLI documentation](https://docs.apify.com/cli/) for more information regarding installation and advanced usage.

## Create your Actor

To create a new Actor, use the following command:

```bash
apify create
```

The CLI will prompt you to:

1. _Name your Actor_: Enter a descriptive name for your Actor, such as `your-actor-name`
1. _Choose a programming language_: Select the language you want to use for your Actor (JavaScript, TypeScript, or Python).
1. _Select a development template_: Choose a template from the list of available options.

After selecting the template, the CLI will:

- Create a `your-actor-name` directory with the boilerplate code.
- Install all project dependencies

![Creation](./images/actor-create.gif)

Navigate to the newly created Actor directory:

```bash
cd your-actor-name
```

## Explore the source code in your editor

After creating your Actor, explore the source code in your preferred code editor, We'll use the `Crawlee + Puppeteer + Chrome` template code as an example, but all Actor templates follow a similar organizational pattern. The important directories and filer are:

### `src` Directory

- `srx/main.js`: This file contains the actual code of your Actor

### `actor` Directory

- `[actor/json](https://docs.apify.com/platform/actors/development/actor-definition/actor-json)`: This file defines the Actor's configuration, such as input and output specifications.
- `[Dockerfile](https://docs.apify.com/platform/actors/development/actor-definition/dockerfile)`: This file contains instructions for building the Docker image for your Actor.

### `storage` Directory

- This directory emulates the [Apify Storage](../../../storage/index.md)
  - [Dataset](../../../storage/dataset.md)
  - [Key-Value Store](../../../storage/key_value_store.md)
  - [Request Queue](../../../storage/request_queue.md)

![Actor source code](./images/actor-local-code.png)

## Run it locally

To run your Actor locally, use the following command:

```bash
apify run
```

After executing this command, you will see the Actor's log output in your terminal. The results of the Actor's execution will be stored in the local dataset located in the `storage/dastasets/default` directory.

![Actor source code](./images/actor-local-run.png)

:::note Local testing & debugging

Running the Actor locally allows you to test and debug your code before deploying it to the Apify platform.

:::

## Deploy it to Apify platform

Once you are satisfied with your Actor, to deploy it to the Apify platform, follow these steps:

1. _Sign in to Apify with the CLI tool_

    ```bash
    apify login
    ```

    This command will prompt you to provide your API token that you can find in Console.

1. _Push your Actor to the Apify platform_

    ```bash
    apify push
    ```

    This command will upload your Actor's code and configuration to the Apify platform, where it can be executed and managed.

    :::note Actor monetization

    If you have successfully completed your first Actor, you may consider [sharing it with other users and monetizing it](../../publishing/index.mdx). The Apify platform provides opportunities to publish and monetize your Actors, allowing you to share your work with the community and potentially generate revenue.

    :::

By following these steps, you can seamlessly deploy your Actors to the Apify platform, enabling you to leverage its scalability, reliability, and advanced features for your web scraping and data processing projects.
