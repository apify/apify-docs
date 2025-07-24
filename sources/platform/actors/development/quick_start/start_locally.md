---
title: Local development
sidebar_position: 1
description: Create your first Actor locally on your machine, deploy it to the Apify platform, and run it in the cloud.
slug: /actors/development/quick-start/locally
---

**Create your first Actor locally on your machine, deploy it to the Apify platform, and run it in the cloud.**

---

## What you'll learn

- tbd


## Prerequisites

- [Node.js](https://nodejs.org/en/) version 16 or higher with `npm` installed on your computer.
- The [Apify CLI](/cli/docs/installation) installed.
- Optional: If you want to deploy your Actor to the Apify platform, you need to [sign in](https://console.apify.com/sign-in).

---

## Step 1: Create your Actor

Use Apify CLI to create a new Actor using the following command:

```bash
apify create
```

The Apify CLI will prompt you to:

1. Name your Actor: Enter a descriptive name for your Actor, such as `your-actor-name`.
1. Choose a programming language: Select the language you want to use for your Actor (JavaScript, TypeScript, or Python).
1. Select a development template: Choose a template from the list of available options.
   :::info

   If you’re unsure which template to use, browse the [full list of templates](https://apify.com/templates) with descriptions to find the best fit for your Actor.

   :::
1. After selecting the template, the Apify CLI will:
   - Create a `your-actor-name` directory with the boilerplate code.
   - Install all project dependencies.
1. Navigate to your new Actor directory:
    ```bash
    cd your-actor-name
    ```

## Step 2: Run your Actor

- tbd (see the result as soon as possible)

## Step 3: Explore the Result

- tbd (see the result - AHA moment, I get data)
- explain the "code"

## Step 4: Deploy your Actor

- tbd

## Step 5: It's time to build!

- Encourage developers to edit actors, build interesting stuff, etc.
- Optional...

## Next Steps

- tbd (deploy)

<!-- ## Explore the source code in your editor

After creating your Actor, explore the source code in your preferred code editor, We'll use the `Crawlee + Puppeteer + Chrome` template code as an example, but all Actor templates follow a similar organizational pattern. The important directories and filer are:

### `src` Directory

- `src/main.js`: This file contains the actual code of your Actor

### `.actor` Directory

- [`actor.json`](https://docs.apify.com/platform/actors/development/actor-definition/actor-json): This file defines the Actor's configuration, such as input and output specifications.
- [`Dockerfile`](https://docs.apify.com/platform/actors/development/actor-definition/dockerfile): This file contains instructions for building the Docker image for your Actor.

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

After executing this command, you will see the Actor's log output in your terminal. The results of the Actor's execution will be stored in the local dataset located in the `storage/datasets/default` directory.

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

By following these steps, you can seamlessly deploy your Actors to the Apify platform, enabling you to leverage its scalability, reliability, and advanced features for your web scraping and data processing projects. -->
