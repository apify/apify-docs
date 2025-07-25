---
title: Local development
sidebar_position: 1
description: Create your first Actor locally on your machine, deploy it to the Apify platform, and run it in the cloud.
slug: /actors/development/quick-start/locally
---

**Create your first Actor locally on your machine, deploy it to the Apify platform, and run it in the cloud.**

---

## What you'll learn

- How to create and run your first Actor locally using Apify CLI
- How to understand and configure Actor input, output, and storage
- How to deploy your Actor to the Apify platform

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

After creating your Actor, you can run it with:

```bash
apify run
```

:::tip

During development, use `apify run --purge`. This command clears all results from previous runs, so it’s as if you’re running the Actor for the first time.

:::

This command runs your Actor, and you’ll see output similar to the following in your terminal:

```bash
INFO  System info {"apifyVersion":"3.4.3","apifyClientVersion":"2.12.6","crawleeVersion":"3.13.10","osType":"Darwin","nodeVersion":"v22.17.0"}
Extracted heading { level: 'h1', text: 'Your full‑stack platform for web scraping' }
Extracted heading { level: 'h3', text: 'TikTok Scraper' }
Extracted heading { level: 'h3', text: 'Google Maps Scraper' }
Extracted heading { level: 'h3', text: 'Instagram Scraper' }
```

As you can see in the logs, the Actor extracts text from a web page. All the main logic is defined in `src/main.js`. Depending on the template you chose, this file may also be `src/main.ts` (for TypeScript) or `src/main.py` (for Python).

In the next step, we’ll explore the results in more detail.

## Step 3: Explore the Actor

<!-- TODO: Add more examples -->

The following section will explain the Actor in more details.

### The `.actor` folder

The Actor configuration is in the folder `.actor`. The file `actor.json` defines the Actor's configuration, such as name, description, etc. You can find more info in [actor.json](https://docs.apify.com/platform/actors/development/actor-definition/actor-json) definition.

### Actor's `input`

Each Actor accepts an `input object`, which tells it what it should do. The object is passed in JSON format, and you can find it in `storage/key_value_stores/default/INPUT.json`.

:::info

To change the `INPUT.json`, edit first the `input_schema.json` in the `.actor` folder. 

This JSON Schema not only validates input automatically (so you don't need to handle input errors in your code), but also powers the Actor's user interface, generates API docs, and enables smart integration with tools like Zapier or Make by auto-linking input fields.

:::

You can find more info in the [Input schema](/platform/actors/development/actor-definition/input-schema) documentation.

### Actor's `storage`

The Actor system provides two specialized storages that can be used by Actors for storing files and results: `key-value` store and `dataset`.

#### Key-value store

The key-value store is a simple data storage that is used for saving and reading files or data records.

Key-value stores are ideal for saving things like screenshots, PDFs, or to persist the state of Actors e.g. as a JSON file.

#### Dataset 

The dataset is an append-only storage that allows you to store a series of data objects such as results from web scraping, crawling, or data processing jobs. You or your users can then export the dataset to formats such as JSON, CSV, XML, RSS, Excel, or HTML.

### Actor's `output`

While the input object provides a standardized way to invoke Actors, Actors can also generate an output object, which is a standardized way to display, consume, and integrate Actors’ results.

You can define how the Actor output looks using the Output schema file. The system uses this information to automatically generate an immutable JSON file, which tells users where to find the results produced by the Actor.

## Step 4: Deploy your Actor

Let's now deploy your Actor to the Apify platform, where you can for example run the Actor on scheduled basis, or you can make the Actor public for other users.

1. First of all, you need to login:

    ```bash
    apify login
    ```

    :::info
    After you succesfull login, your Apify token is stored in `~/.apify/auth.json`, or `C:\Users\<name>\.apify` based on your system.
    :::

1. Now, you can push your Actor to the Apify platform:

    ```bash
    apify push
    ```

## Step 5: It's time to build!

Good job, you have done it! 🎉  From here, you can develop your Actor.

:::tip Actor monetization

If you have successfully completed your first Actor, you may consider [sharing it with other users and monetizing it](../../publishing/index.mdx). The Apify platform provides opportunities to publish and monetize your Actors, allowing you to share your work with the community and potentially generate revenue.

:::

## Next Steps

- If you want to understand Actors in more details, read the [Actor Whitepaper](https://whitepaper.actor/).
- Check [Continuous integration](../deployment/continuous_integration.md) documentation to automate your Actor development process.
