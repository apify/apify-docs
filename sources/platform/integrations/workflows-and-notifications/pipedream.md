---
title: Pipedream integration
description: Connect Apify with Pipedream to automate workflows by running Actors, scraping single pages, managing storage, and reacting to Actor or task run events.
sidebar_label: Pipedream
slug: /integrations/pipedream
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

[Pipedream](https://pipedream.com/) is a workflow automation platform for developers. With the [Apify integration for Pipedream](https://pipedream.com/apps/apify), you can run Actors, manage datasets and key-value stores, and trigger workflows when Actor or task runs finish.

<ThirdPartyDisclaimer />

## Prerequisites

Before you begin, make sure you have:

- An [Apify account](https://console.apify.com/)
- A [Pipedream account](https://pipedream.com/)

## Connect Apify with Pipedream

1. Log into your Pipedream account and [create a new workflow](https://pipedream.com/docs/workflows).
1. [Add an Apify step](https://pipedream.com/docs/workflows/building-workflows/steps) (trigger or action) to your workflow. Select one of two Apify apps:

    ![Selecting the Apify app in Pipedream](../images/pipedream/pipedream-select-app.webp)

    - **Apify** - Authenticate with your Apify API token. Find it in [Apify Console](https://console.apify.com/settings/integrations) under **Settings > API & Integrations**.
    - **Apify (OAuth)** - Authorize access to your Apify account via OAuth.
1. Follow the prompts to authenticate your account.

    See Pipedream's [connected accounts documentation](https://pipedream.com/docs/apps/connected-accounts).
1. After connecting, you can use any Apify trigger or action in your workflows.

## Use Apify as a trigger

[Triggers](https://pipedream.com/docs/workflows/building-workflows/triggers) start your Pipedream workflow automatically when an event occurs in Apify.

1. [Create a new workflow](https://pipedream.com/docs/workflows) in Pipedream.
1. Select **Add Trigger** and search for **Apify**.
1. Select the trigger you want to use, e.g. **New finished Actor run (instant)**.
1. Configure the trigger by selecting the Actor or task to monitor. Leave **Trigger on run states** empty to fire on every terminal state, or pick the states you care about.

    ![Configuring an Apify trigger in Pipedream](../images/pipedream/pipedream-trigger.webp)
1. Add subsequent steps to process the output.

## Use Apify as an action

[Actions](https://pipedream.com/docs/workflows/building-workflows/actions) let you perform Apify operations as part of a workflow. For example, you can run an Actor and then retrieve its dataset items.

1. [Create a new workflow](https://pipedream.com/docs/workflows) in Pipedream with any trigger.
1. Click **+** to add a step and search for **Apify**.
1. Select the action you want to use, e.g. **Run Actor**.
1. Configure the action parameters:
    - Set **Search Actors from** to **Apify Store Actors** or **Recently used Actors**, then pick the Actor.
    - Fill in the Actor's input fields, which are generated from the Actor's input schema. Actors without an input schema get a single **Properties** field that accepts raw JSON.
    - Leave **Wait for finish** set to `true` (the default) to wait for the run and return its output, or set it to `false` to return the run details immediately. With `true`, **Output Record Key** selects which key-value store record is returned (`OUTPUT` by default).
    - Set optional fields as needed: **Build** (a build tag or build number), **Timeout (seconds)**, **Memory (MB)** (powers of two from 128 MB to 32 GB), **Max Items**, **Max Total Charge USD**, and **Webhook URL**.

    ![Configuring an Apify action in Pipedream](../images/pipedream/pipedream-action.webp)
1. Add another Apify step with **Get dataset items** to retrieve the Actor's output.
1. Add any subsequent steps to process or store the data.

:::caution Building workflows with AI

Pipedream's [Apify app page](https://pipedream.com/apps/apify) can generate a workflow for you with Pipedream's AI builder. Because the Apify connector is schema-driven, the AI builder can consume your Pipedream AI tokens quickly and might not configure required inputs reliably. For predictable results, add the Apify triggers and actions to your workflow directly, as described above.

:::

## Handle long-running Actor runs

Some Actor runs can outlast a single Pipedream step.

- **Run task**: waits asynchronously (webhook + 30-second polling fallback), up to one day.
- **Run Actor**: waits inside the step and can hit step timeout.

For longer runs with **Run Actor**, split across two workflows:

1. In the first workflow, add **Run Actor** and set **Wait for finish** to `false`. The step returns the run details immediately.
1. In a second workflow, use the **New finished Actor run (instant)** trigger for the same Actor.
1. Add **Get dataset items** after the trigger.

Alternatively, save the Actor configuration as a [task](/actors/running/tasks) and use **Run task**, which already handles waiting for you.

## Handle large Actor output

When **Run Actor** waits for a run, it returns the record named by **Output Record Key** (`OUTPUT` by default). If the record is over 256 KB, the step returns a reference instead of inline data.

To read large output:

- Fetch `recordUrl` in a later step, or
- Use **Get key-value store record** with `keyValueStoreId` and `recordKey`.

If the Actor writes to a dataset, use **Get dataset items**.

## Triggers

Both triggers register an Apify webhook when you deploy the workflow and remove it when you disable the workflow.

- **New finished Actor run (instant)** - Emits an event when a run of the selected Actor finishes.
- **New finished task run (instant)** - Emits an event when a run of the selected task finishes.

Each trigger takes a **Trigger on run states** field listing the terminal run states: **Succeeded**, **Failed**, **Timed out**, and **Aborted**. Leave it empty to fire on all four, which is the default.

## Actions

- **Run Actor** - Runs a selected Actor and, by default, waits for it to finish and returns its output. Input fields are generated from the Actor's input schema. Optional fields: **Build**, **Timeout (seconds)**, **Memory (MB)**, **Max Items**, **Max Total Charge USD**, **Webhook URL**, and **Output Record Key**.
- **Run task** - Runs a selected task and, by default, waits for it to finish. Use **Override Input (JSON)** to replace the task's saved input for a single run, and leave it empty to use the saved input. Optional fields: **Build**, **Timeout (seconds)**, and **Memory (MB)**.
- **Scrape single URL** - Runs a scraper on a specified URL and returns its content as HTML. Use this for extracting content from a single page, e.g. in LLM workflows. **Crawler Type** selects the engine: **Firefox (Headless Browser)** renders JavaScript and is the most resistant to blocking (the default), **Cheerio (Raw HTTP)** is the fastest and cheapest but renders no JavaScript, and **Adaptive** switches between the two per page.
- **Get dataset items** - Retrieves items from a [dataset](/storage/dataset), specified by ID or name. **Limit** and **Offset** page through the items, and **Fields**, **Omit**, **Flatten**, and **Clean** shape each item.
- **Get key-value store record** - Retrieves a record from a [key-value store](/storage/key-value-store). A JSON record is returned as parsed fields, and any other content type as a file reference.
- **Set key-value store record** - Creates or updates a record in a [key-value store](/storage/key-value-store).

## Use Apify with AI agents (MCP)

To use Apify Actors directly with AI agents and MCP-compatible clients, use the [Apify MCP server](/integrations/mcp).

Pipedream also hosts an [MCP server for Apify](https://mcp.pipedream.com/app/apify). Because Apify provides its own MCP server, use the Pipedream one only if you want Apify available alongside your other Pipedream apps in a single MCP client.

## Resources

- [Apify integration page on Pipedream](https://pipedream.com/apps/apify)
- [Pipedream documentation](https://pipedream.com/docs/)
- [Integration source code on GitHub](https://github.com/PipedreamHQ/pipedream/tree/master/components/apify)

If you have any questions or need help, reach out on the [Apify developer community on Discord](https://discord.com/invite/jyEM2PRvMU).
