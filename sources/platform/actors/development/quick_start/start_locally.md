---
title: Local development
sidebar_position: 1
description: Create your first Actor locally on your machine, deploy it to the Apify platform, and run it in the cloud.
slug: /actors/development/quick-start/locally
---

**Create your first Actor locally on your machine, deploy it to the Apify platform, and run it in the cloud.**

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Prerequisites

- You need to have [Node.js](https://nodejs.org/en/) version 16 or higher with `npm` installed on your computer.
- An Apify account. You can [sign-up for a free account](https://console.apify.com/sign-up) on the Apify website.

:::

## Install Apify CLI

The Apify Command-Line Interface (CLI) allows you to manage your Actors from your terminal.

<Tabs>
    <TabItem value="macOS/Linux" label="macOS/Linux">
    You can install the Apify CLI via the [Homebrew package manager](https://brew.sh/).
    ```bash
    brew install apify-cli
    ```
    </TabItem>
    <TabItem value="other platforms" label="Other platforms">
    Use [NPM](https://www.npmjs.com/) to install the Apify CLI on other platforms.
    ```bash
    npm -g install apify-cli
    ```
    </TabItem>
</Tabs>

Visit [Apify CLI documentation](https://docs.apify.com/cli/) for more information regarding installation and advanced usage.

### Create your Actor from a template

1. Use the `apify create` command:

    To create a new Actor project from a template, run:

    ```bash
    apify create MY-FIRST-ACTOR -t getting_started_node
    ```

    - `MY-FIRST-ACTOR` is the name of your Actor's directory. You can choose any name.
    - `-t gettings_started_node` specifies the **Start with JavaScript** template. This is a simple template good for beginners.

    Alternatively, you can run `apify create` without arguments, and the CLI will prompt you to:
    1. _Name your Actor_: Enter a descriptive name, e.g., `my-scraper`
    1. _Choose a programming language_: Select JavaScript TypeScript, or Python.
    1. _Select a development template_: Choose from a list of available options.

    After selecting the template, the CLI will:

    - Create a `MY-FIRST-ACTOR` (or your chosen name) directory
    - Install all project dependencies

1. Navigate to the Actor directory

    ```bash
    cd MY-FIRST-ACTOR
    ```

### Explore the source code of your Actor

Open the `MY-FIRST-ACTOR` directory in your preferred code editor. The **Start with JavaScript** template (`getting-started-node`) structure includes:

#### `src` directory

- `main.js`: This file contains the Actor's main logic. For the **Start with JavaScript** template, it's set up to download a webpage using `Axios` and parse its headings using `Cheerio`

    ```js
    // Axios - Promise based HTTP client for the browser and node.js.
    import { Actor } from 'apify';
    import axios from 'axios';
    // Cheerio - Fast, flexible & elegant library for parsing and manipulating HTML and XML.
    import * as cheerio from 'cheerio';
    // Apify SDK - Toolkit for building Apify Actors.

    await Actor.init();
    const input = await Actor.getInput();
    const { url } = input; // Expects a URL in the input

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const headings = [];
    $('h1, h2, h3, h4, h5, h6').each((i, element) => {
        headings.push({
            level: $(element).prop('tagName').toLowerCase(),
            text: $(element).text(),
        });
    });
    console.log('Extracted headings:', headings);
    await Actor.pushData(headings);
    await Actor.exit();

    ```

#### `.actor` directory

- `actor.json`: Defines Actor configuration, including name, version, and build settings.
- `input_schema.json`: Defines the structure of the Actor's input. For this template, it expects a `url` field.
- `Dockerfile`: Contains instructions for building the Docker image of your Actor.

#### `storage` direstory

This directory emulates [Apify Storage](/platform/storage/index) locally when you run the Actor.

- `datasets/default`: Stores results pushed via `Actor.pushData()`.
- `key_value_store/default`: For storing  files and other data.
- `request_queues/default`: Manages URLs to crawl.


### Run your Actor locally

To test your Actor on your machine run:

```bash
apify run
```

This commands executes your Actor.

- Input: By default, for the **Start with JavaScript** template, it will use the `url` defined in `actor.input_schema.json` in no other input is provided. You can edit the default input in `storage/key_value_stores/default/INPUT.json` or provide one by creating/editing this file. For example, to scrape `https://apifi.com`:

    ```json
    // storage/key_value_stores/default/INPUT.json
    {
        "url": "https://apify.com"
    }
    ```

- Output: You'll see log messages in your terminal.
- Results: Extracted data will be stored in JSON files within the `storage/datasets/default` directory.

:::note Local testing & debugging

Running the Actor locally is crucial for testing and debugging your code efficiently before deploying it to the Apify platform. You can use your IDE's debugger and iterate quickly.

:::

### Deploy to the Apify platform

Once you're satisfied with your Actor, deploy it to the Apify platform to run it in the cloud.

1. Log in to Apify
    If you haven't already, sign it with the CLI:

    ```bash
    apify login
    ```

    This command will prompt for your Apify API token. You can find it in [**Apify Console > Settings > Integrations**](https://console.apify.com/settings/integrations)

1. Push your Actor
    From your Actor's directory (`MY-FIRST-ACTOR`), run:

    ```bash
    apify push
    ```

    This command uploads your Actor's code and configuration to the Apify platform. The CLI will create the Actor in your Apify account if it doesn't exist or update the existing one.

After pushing, you can find your Actor in Apify Console under the Development section. From there, you can build it, configure its input, and run it just like an Actor created in the Web IDE.

:::tip Actor monetization

If you've built a useful Actor, consider sharing it in Apify Store and monetizing it.

:::

By following these steps, you can develop Actors locally and seamlessly deploy them to the Apify platform, leveraging its scalability and robust features.
