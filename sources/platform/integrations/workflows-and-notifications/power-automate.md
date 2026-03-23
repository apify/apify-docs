---
title: Microsoft Power Automate integration
description: Learn how to integrate Apify Actors with Microsoft Power Automate to automate workflows, trigger scraping jobs, and process results without code.
sidebar_label: Microsoft Power Automate
sidebar_position: 7
slug: /integrations/microsoft-power-automate
---

**Learn how to integrate Apify Actors with Microsoft Power Automate for automated workflows.**

---

[Microsoft Power Automate](https://powerautomate.microsoft.com/) is an automation platform where you can build flows, automated workflows that connect your apps with no-code connectors. With the [Apify connector](https://apify.com), you can run Apify Actors inside your flows to launch web scraping and automation jobs, watch for run events, and process the results.

## Key capabilities

### Triggers

- **Actor run finished:** Start a flow when an Actor completes.
- **Actor task finished:** Start a flow when a task completes.

### Actions

- **Run Actor:** Execute any Apify Actor with custom inputs.
- **Run task:** Execute a saved Actor task.
- **Get dataset items:** Retrieve scraped data from datasets with dynamic schema support.
- **Get key-value store record:** Fetch stored data (e.g. screenshots, JSON state).
- **Scrape single URL:** Scrape a single page using the [Web Scraper](https://apify.com/apify/web-scraper) Actor.

## Get started

To use the Apify integration with Power Automate, you will need:

- An [Apify account](https://console.apify.com/)
- A [Power Automate account](https://powerautomate.microsoft.com/)

## Install the Apify connector

You can use the Apify connector directly within Microsoft Power Automate.

1. Log in to your Power Automate account.
1. Navigate to the **Connectors** tab on the sidebar to view the connector page.
   - If you don't see the **Connectors** tab, select **More** in the sidebar.
   - Find **Connectors** in the list and select the **Pin** icon to pin it to your sidebar for easy access.
   ![Pin Connectors tab in Power Automate](../images/power-automate/pin_connectors_tab.png)
1. Open the **Connectors** tab and search for **Apify**.
1. Select the **Apify** connector from the search results.
1. The connector page shows all available triggers and actions you can use in your flows.

## Connect your Apify account

Before using the Apify connector in flows, create a connection in Power Automate.

1. When you add an Apify action or trigger for the first time, Power Automate prompts you to create a connection.
1. You can also manage connections under **Data > Connections**.

![Create new connection in Power Automate](../images/power-automate/create_connection.png)

### Choose authentication type

The Apify connector supports **OAuth 2.0** authentication.

#### Authenticate with OAuth 2.0

1. Select **Sign in with Apify**.
1. The connector redirects you to the Apify's login page (sign in if not already logged in).
1. Authorize the connector to access your account.
   - The connector requires the following scopes:
     - `profile`: To view account details.
     - `full_api_access`: To run Actors, tasks, access datasets, and manage webhooks.
     ![OAuth authorization screen](../images/power-automate/oauth2_login.png)
1. After authorization, Apify redirects you back to Power Automate and the connection is ready to use.
   ![Successful OAuth connection in Power Automate](../images/power-automate/created_connection.png)

:::info Integration platform header

All requests made by the connector include the header `x-apify-integration-platform: microsoft-power-automate` to identify the integration platform.

:::

## Create your first flow

After connecting your Apify account, you can start creating flows that use Apify triggers and actions. A flow begins with a trigger (an event that starts the workflow) and includes one or more actions (operations to perform).

### Select resources and provide input

Most actions let you select resources (Actors, tasks, datasets) from dropdown lists populated from your Apify account.

- **Recently used Actors**: Shows Actors you have used recently.
- **From store**: Allows you to select from popular Actors in Apify Store.
- **My tasks**: Lists your saved Actor tasks.

![Dropdown selection of Actors](../images/power-automate/actor_dropdown_selection.png)

### Input types

When configuring an Actor or task run, you can provide input in JSON format.

- **Input Body**: For "Run Actor", provide the full JSON input object.
- **Input Override**: For "Run task", provide a JSON object to override specific fields in the task's saved input.

:::tip Copy the Actor/task input JSON

Open the Actor or task Input page in Apify Console, switch format to **JSON**, and copy the content.

:::

#### Where to find your IDs

When using manual input instead of pick lists, you'll need to provide the correct resource IDs. Here's how to find them in Apify Console:

- **Actor ID**: [Actor detail page](https://console.apify.com/actors) > API panel or URL.
  - Example URL: `https://console.apify.com/actors/<actorId>`
  - Actor name format: owner~name (for example, `apify~website-scraper`)
- **Task ID**: [Task detail page](https://console.apify.com/actors/tasks) > API panel or URL.
  - Example URL: `https://console.apify.com/actors/tasks/<taskId>`
- **Dataset ID**: [Storage > Datasets](https://console.apify.com/storage/datasets) > Dataset detail > API panel or URL.
  - Example URL: `https://console.apify.com/storage/datasets/<datasetId>`
  - Also available in the table on the `Storage > Datasets` page
- **Key-value store ID**: [Storage > Key-value stores](https://console.apify.com/storage/Key-value-stores) > Store detail > API panel or URL.
  - Example URL: `https://console.apify.com/storage/Key-value-stores/<storeId>`
  - Also available in the table on the `Storage > Key-value stores` page
- **Webhook ID**: [Actors](https://console.apify.com/actors) > Actor > Integrations.
  - Example URL: `https://console.apify.com/actors/<actor_id>/integrations/<webhook_id>`

## Triggers

Triggers allow your flow to start automatically when an event occurs in Apify. When you set up a trigger, the Apify connector creates a webhook on your account.

:::caution Manage your webhooks

If you turn off or delete a workflow in Power Automate, the webhook on Apify is **not automatically removed**. To prevent unused webhooks from accumulating, manually remove old webhooks from your [Apify Console](https://console.apify.com/) by navigating to the **Integrations** tab of the Actor used in your trigger.

:::

### Actor run finished

Automatically execute your Power Automate flow when a specific Apify Actor run completes with a selected status.

- **Actor Scope**: Choose between **Recently used Actors** or **From store**.
- **Actor**: Select the Actor from the dropdown.
- **Trigger On**: Select which run statuses should trigger the flow (e.g. `SUCCEEDED`, `FAILED`, `TIMED_OUT`, `ABORTED`).

The trigger returns a webhook payload with the completed Actor run's data.

![Actor run finished trigger configuration](../images/power-automate/trigger_actor_run.png)

### Task run finished

Automatically execute your Power Automate flow when a specific Apify Actor task run completes with a selected status.

- **Task**: Select the task from your account.
- **Trigger On**: Select which run statuses should trigger the flow (e.g. `SUCCEEDED`, `FAILED`).

The trigger returns a webhook payload with the completed task run's data.

![Task run finished trigger configuration](../images/power-automate/trigger_task_run.png)

## Actions

The Apify connector provides the following actions.

### Run Actor

Start an Apify Actor run with customizable execution parameters.

- **Actor Scope**: Choose **Recently used Actors** or **From store**.
- **Input Body**: Provide the JSON input for the Actor.
- **Options**:
  - `Build`: Specify a build tag or ID.
  - `Timeout`: execution timeout in seconds.
  - `Memory`: Allocate memory (MB) for the run (options: 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768).
  - `Wait for finish`: Specify seconds to wait (max 60s). Set to `0` for asynchronous execution.

![Run Actor action configuration](../images/power-automate/action_run_actor.png)

### Run task

Start an Apify task run.

- **Task**: Select the task from your account.
- **Input Override**: Optional JSON to override the task's default input.
- **Options**:
  - `Timeout`: execution timeout in seconds.
  - `Memory`: Allocate memory (MB) (options: 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768).
  - `Wait for finish`: Specify seconds to wait (max 60s). Set to `0` for asynchronous execution.

![Run task action configuration](../images/power-automate/action_run_task.png)

### Get dataset items

Retrieve records from an Apify dataset.

- **Dataset**: Select a dataset from the dropdown.
- **Pagination**:
  - `Limit`: Number of items to return.
  - `Offset`: Number of items to skip.

Returns an array of dataset items. The connector attempts to infer the schema to provide dynamic fields in Power Automate.

![Get dataset items action configuration](../images/power-automate/action_get_dataset.png)

### Get key-value store record

Retrieve a single record from a key-value store.

- **Store**: Select the store from the dropdown.
- **Record Key**: Select the key of the record to retrieve.

Returns:

- `Body`: The raw record content (text/JSON).
- `Content-Type`: The MIME type of the record.

![Get key-value store record action configuration](../images/power-automate/action_get_kv_record.png)

### Scrape single URL

Scrape a single webpage using Apify's Web Scraper Actor.

- **URL**: The full URL to scrape.
- **Crawler Type**: Select the engine:
  - `playwright:adaptive` (Recommended)
  - `playwright:firefox`
  - `cheerio` (Fastest, raw HTTP)

:::note Web Scraper Actor run behavior

This action starts the Web Scraper Actor and returns the run details immediately. To process the scraped results, you can use the **Actor run finished** trigger or follow the [asynchronous pattern](#long-running-scrapes-and-async-pattern-in-power-automate) described below.

:::

![Scrape single URL action configuration](../images/power-automate/action_scrape_url.png)

## Long-running scrapes and async pattern in Power Automate

The **Wait for finish** parameter in "Run Actor" and "Run task" actions has a maximum limit of 60 seconds. If your Actor run takes longer than this, the action will time out if you try to wait for it synchronously.

For long-running scrapes, use the asynchronous pattern to ensure your flows are reliable:

1. Use the **Run Actor** or **Run task** action. Set **Wait for finish** to `0` to start the run asynchronously and move to the next step right away.

1. Wait for completion using one of two approaches:

   - Option A (Webhook): Create a separate flow with the **Actor run finished** or **Task run finished** trigger. This flow starts automatically when the run completes.

   - Option B (Polling): Implement a loop in your flow to periodically check the run status until it finishes. This is more complex but keeps everything in a single flow.

The following steps walk through Option B (polling):

1. Start the Actor or task: Trigger the run asynchronously by setting `Wait for finish` to `0`.
   ![Starting an async Actor run in Power Automate](../images/power-automate/polling_flow_1.png)
1. Initialize a result variable to track the run status (initially empty).
   ![Initializing a status variable in Power Automate](../images/power-automate/polling_flow_2.png)
1. Add a "Do until" loop that runs while the variable is empty.
   ![Adding a Do until loop in Power Automate](../images/power-automate/polling_flow_3.png)
1. Inside the loop, check if the run has finished or if the dataset is ready.
   ![Checking Actor run status inside the loop](../images/power-automate/polling_flow_4.png)
1. If the run is complete, update the variable to exit the loop.
   ![Updating the status variable on completion](../images/power-automate/polling_flow_5.png)
1. Insert a **Delay** action to wait a few seconds before the next check.
   ![Adding a delay between status checks](../images/power-automate/polling_flow_6.png)
1. Once the loop finishes, use the result variable to proceed with your flow.
   ![Processing results after the polling loop completes](../images/power-automate/polling_flow_7.png)

## Example use cases

- Run a price scraper on a schedule, then notify via Teams when prices drop.
- Scrape company websites and push the data to Dynamics 365 or SharePoint.
- Detect changes on competitor pages and log them to Excel.
- Scrape directories, filter results, and add leads to your CRM.

### Data mapping and workflow design

Power Automate allows you to map data from Apify actions to subsequent steps.

- Use **Get dataset items** output to iterate over scraped results.
- Map fields from the dataset item schema to columns in Excel, SharePoint lists, or database rows.

### Best practices

- Always use webhooks (triggers) for Actors that run longer than a minute instead of waiting synchronously.
- For large datasets, use the `limit` and `offset` parameters in **Get dataset items** to process data in chunks.
- Start with default memory settings and increase only if your Actor needs it.

## Troubleshooting

- _Timeout errors:_ If an action fails with a timeout, check if you are waiting for a long-running Actor. Switch to the async pattern (set `Wait for finish` to `0`).
- _Schema issues:_ Dataset schemas are inferred from sample data. If fields are missing in Power Automate dynamic content, you might need to parse the raw JSON output manually. Fields may not appear if they are absent in the initial sample records.
- _Orphaned webhooks:_ If you delete a flow that used a trigger, remember to delete the corresponding webhook in Apify Console. Cleanup is not automatic.

## Pricing

The Apify connector itself is free. Apify charges for compute resources (runtime, memory, and proxies) used by your Actors. A free tier with monthly credits is available. For more details, visit the [pricing page](https://apify.com/pricing).

If you have any questions or need help, reach out on the [Apify developer community on Discord](https://discord.com/invite/jyEM2PRvMU).
