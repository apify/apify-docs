---
title: Microsoft Power Automate integration
description: Automate your workflows by integrating Apify Actors with Microsoft Power Automate. Connect apps, trigger scrapers, and process data without writing code.
sidebar_label: Power Automate
sidebar_position: 7
slug: /integrations/power-automate
---

**Learn how to integrate your Apify Actors with Microsoft Power Automate for automated workflows.**

---

[Microsoft Power Automate](https://powerautomate.microsoft.com/) is an automation platform where you can build flows, automated workflows that connect your apps with no-code connectors. With the [Apify Connector](https://apify.com), you can run _Apify Actors_ inside your flows to launch web scraping and automation jobs, watch for run events, and further work with the results.

## Get started

To use the Apify integration with Power Automate, you will need:

- An [Apify account](https://console.apify.com/)
- A [Power Automate account](https://powerautomate.microsoft.com/)

## Install the Apify Connector

You can use the Apify Connector directly within Microsoft Power Automate.

1. Log in to your Power Automate account.
1. Navigate to the **Connectors** tab on the sidebar to check the page of the connector.
  - If you don't see the **Connectors** tab, click **More** in the sidebar.
  - Find **Connectors** in the list and click the **Pin** icon to pin it to your sidebar for easy access.
  - ![Pin Connectors tab in Power Automate](../images/power-automate/screenshot-pin-connectors-tab.png)
1. Open the **Connectors** tab and search for **Apify**.
  - ![Search for Apify in Connectors tab](../images/power-automate/screenshot-search-apify-connectors.png)
1. Select the **Apify** connector from the search results.
1. A page with connector info will show up, displaying all available triggers and flows (actions) you can use right away for your automation projects.
  - <!-- ![Apify Connector page with triggers and actions](../images/power-automate/TODO-screenshot-apify-connector-page.png) -->


## Connect your Apify account

Before using the Apify connector in flows, create a connection in Power Automate.

1. When you add an Apify action or trigger for the first time, you will be prompted to create a connection.
1. You can also manage connections under **Data > Connections**.

![Create new connection in Power Automate](../images/power-automate/screenshot-create-connection.png)

### Choose authentication type

The Apify Connector supports **OAuth 2.0** authentication.

#### Authenticate with OAuth 2.0

1. Select **Sign in with Apify**.
1. You will be redirected to the Apify login page (if not already logged in).
1. Authorize the connector to access your account.
   - The connector requires the following scopes:
     - `profile`: To view account details.
     - `full_api_access`: To run Actors, tasks, and access datasets.
1. Once authorized, you will be redirected back to Power Automate, and the connection will be ready to use.

![OAuth authorization screen](../images/power-automate/screenshot-oauth.png)

:::info Integration platform header

All requests made by the connector include the header `x-apify-integration-platform: microsoft-power-automate` to identify the integration platform.

:::

## Create your first flow

After connecting your Apify account, you can start creating flows that use Apify triggers and actions. A flow begins with a trigger (an event that starts the workflow) and includes one or more actions (operations to perform).

### Selection and input methods

The connector provides user-friendly ways to select resources and provide inputs.

### Pick lists and selection methods

Most actions allow you to select resources (Actors, Tasks, Datasets, etc.) from dynamic dropdown lists populated from your Apify account.

- **Recently used Actors**: Shows Actors you have used recently.
- **From store**: Allows you to select from popular Actors in the Apify Store.
- **My Tasks**: Lists your saved Actor tasks.

![Dropdown selection of Actors](../images/power-automate/screenshot-dropdown-selection.png)

### Input types

When configuring an Actor or Task run, you can provide input in JSON format.

- **Input Body**: For "Run Actor", provide the full JSON input object.
- **Input Override**: For "Run Task", provide a JSON object to override specific fields in the task's saved input.

:::tip Copy the Actor/Task input JSON

Open the Actor or Task Input page in Apify Console, switch format to **JSON**, and copy the content.

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

_Triggers allow your flow to start automatically when an event occurs in Apify._

:::caution Manage your webhooks

Currently, when you set up these triggers, the Apify connector creates a webhook on your Apify account. If you turn off or delete a workflow in Power Automate, the webhook on Apify is **not automatically removed**.

To prevent unused webhooks from accumulating, please manually remove old webhooks from your [Apify Console](https://console.apify.com/) by navigating to the **Integrations** tab of the Actor used in your trigger.

:::

### Actor Run Finished

_Automatically execute your Power Automate flow when a specific Apify Actor run completes with a selected status._

- **Actor Scope**: Choose between *Recently used Actors* or *From store*.
- **Actor**: Select the Actor from the dropdown.
- **Trigger On**: Select which run statuses should trigger the flow (e.g., `SUCCEEDED`, `FAILED`, `TIMED_OUT`, `ABORTED`).

**Output**: The trigger provides a webhook payload containing detailed information about the completed Actor run.

![Actor Run Finished trigger configuration](../images/power-automate/screenshot-trigger-actor-run.png)

### Task Run Finished

_Automatically execute your Power Automate flow when a specific Apify Actor task run completes with a selected status._

- **Task**: Select the task from your account.
- **Trigger On**: Select which run statuses should trigger the flow (e.g., `SUCCEEDED`, `FAILED`).

**Output**: The trigger provides a webhook payload containing detailed information about the completed task run.

![Task Run Finished trigger configuration](../images/power-automate/screenshot-trigger-task-run.png)

## Actions

_The Apify connector offers comprehensive actions to interact with the Apify platform._

### Run Actor

_Start an Apify Actor run with customizable execution parameters._

- **Actor Scope**: Choose *Recently used Actors* or *From store*.
- **Input Body**: Provide the JSON input for the Actor.
- **Options**:
  - `Build`: Specify a build tag or ID.
  - `Timeout`: execution timeout in seconds.
  - `Memory`: Allocate memory (MB) for the run (e.g., 1024, 4096).
  - `Wait for finish`: Specify seconds to wait (max 60s). Set to `0` for asynchronous execution.

![Run Actor action configuration](../images/power-automate/screenshot-action-run-actor.png)

### Run Task

_Start an Apify task run._

- **Task**: Select the task from your account.
- **Input Override**: Optional JSON to override the task's default input.
- **Options**:
  - `Timeout`: execution timeout in seconds.
  - `Memory`: Allocate memory (MB).
  - `Wait for finish`: Specify seconds to wait (max 60s). Set to `0` for asynchronous execution.

![Run Task action configuration](../images/power-automate/screenshot-action-run-task.png)

### Get Dataset Items

_Retrieve records from an Apify dataset._

- **Dataset**: Select a dataset from the dropdown.
- **Pagination**:
  - `Limit`: Number of items to return.
  - `Offset`: Number of items to skip.

**Output**: An array of dataset items. The connector attempts to infer the schema to provide dynamic fields in Power Automate.

![Get Dataset Items action configuration](../images/power-automate/screenshot-action-get-dataset.png)

### Get Key-value store Record

_Retrieve a single record from a Key-value store._

- **Store**: Select the store from the dropdown.
- **Record Key**: Select the key of the record to retrieve.

**Output**:
- **Body**: The raw record content (text/JSON).
- **Content-Type**: The MIME type of the record.

![Get Key-value store Record action configuration](../images/power-automate/screenshot-action-get-kv-record.png)

### Scrape Single URL

_Scrape a single webpage using Apify's Web Scraper Actor._

- **URL**: The full URL to scrape.
- **Crawler Type**: Select the engine:
  - `playwright:adaptive` (Recommended)
  - `playwright:firefox`
  - `cheerio` (Fastest, raw HTTP)
  - `jsdom`

**Note**: This action starts the scrape asynchronously. You should generally use this in combination with a trigger or a wait step to handle the results.

![Scrape Single URL action configuration](../images/power-automate/screenshot-action-scrape-url.png)

## Long‑running scrapes and async pattern in Power Automate

The **Wait for finish** parameter in "Run Actor" and "Run Task" actions has a maximum limit of **60 seconds**. If your Actor run takes longer than this, the action will time out if you try to wait for it synchronously.

For long-running scrapes, use the asynchronous pattern to ensure your flows are reliable:

1. **Start the run**: Use the **Run Actor** or **Run Task** action. Set **Wait for finish** to `0` to start the run asynchronously and move to the next step right away.

2. **Wait for completion**:
   - **Option A (Webhook)**: Create a separate flow using the **Actor/Task Run Finished** trigger. This flow will automatically start when the run completes.
     
     ![Power Automate flow: Start Actor run](../images/power-automate/screenshot-async-webhook-flow.png)

     _First, your flow starts the Actor asynchronously using the **Run Actor** action._

     ![Power Automate flow: Trigger catches successful Actor finish](../images/power-automate/screenshot-async-webhook-flow-trigger.png)

     _Next, set up a separate flow using the **Actor Run Finished** trigger. This trigger will automatically catch the completion event (such as success) and continue your processing steps._

   - **Option B (Polling)**: (Advanced) Implement a loop in your flow to periodically check the run status until it is finished.
     
     ![Polling pattern for run status in Power Automate](../images/power-automate/screenshot-async-polling-flow.png)

3. **Fetch results**: Once the run is finished—either through the triggered flow (webhook) or after the polling loop—use the **Get Dataset Items** action to retrieve your data.


## Example use cases

### Data mapping and workflow design

Power Automate allows you to map data from Apify actions to subsequent steps.

- Use **Get Dataset Items** output to iterate over scraped results.
- Map fields from the dataset item schema to columns in Excel, SharePoint lists, or database rows.

### Best practices

- _Async Execution:_ Always use webhooks (Triggers) for Actors that run longer than a minute.
- _Pagination:_ For large datasets, use the `limit` and `offset` parameters in "Get Dataset Items" to process data in chunks.
- _Memory:_ Start with default memory settings and increase only if necessary.

## Troubleshooting

### Common issues

- _Timeout errors:_ If an action fails with a timeout, check if you are waiting for a long-running Actor. Switch to the async pattern (set `Wait for finish` to `0`).
- _Schema issues:_ Dataset schemas are inferred from sample data. If fields are missing in Power Automate dynamic content, you might need to parse the raw JSON output manually.
- _Orphaned Webhooks:_ If you delete a flow that used a trigger, remember to delete the corresponding webhook in the Apify Console.

If you have any questions or need help, feel free to reach out to us on our [Discord channel](https://discord.com/invite/jyEM2PRvMU).
