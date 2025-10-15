---
title: Workato integration
description: Learn how to integrate your Apify Actors with Workato for automated workflows.
sidebar_label: Workato
sidebar_position: 7
slug: /integrations/workato
---

**Learn how to integrate your Apify Actors with Workato for automated workflows.**

---

[Workato](https://www.workato.com/) is an automation platform where you build recipes, automated workflows that connect your apps with no-code connectors. With the [Apify Connector](https://apify.com), you can run **Apify Actors** inside your recipes to launch web scraping and automation jobs, watch for run events, and further work with the results.

## Get started

To use the Apify integration with Workato, you will need:

- An [Apify account](https://console.apify.com/)
- A [Workato account](https://www.workato.com/)

## Step 1: Install the Apify Connector

The Apify Workato Connector is available in the Workato Community Library. Here's how to install it:

1. In your Workato workspace, navigate to **Community Library**.
1. Click on **Custom Connectors**.
1. Search for **Apify**.
1. Click on the connector and then click **Install**.


After successful installation, the Apify connector will appear in **Connector SDK** under Tools tab in your Workato workspace and after releasing it will be available for use in your projects.

## Step 2: Connect your Apify account

Before using the Apify connector in recipes, create a connection inside a Workato project.

### Create a project (if you don’t have one)

1. In Workato, go to **Workspace → Projects**.
1. Click **Create project**.
1. Choose either **Start from scratch** or **Build a workflow app**.
1. Name and create the project.

![Screenshot showing how to create a new project in Workato](../images/workato/create-project.png)

### Create a connection in your project

1. Open your project.
1. Click the **Create** button.
1. Select **Connection**.
1. Search for **Apify** and choose the Apify connector.

![Screenshot showing how to search for the Apify connector in Workato](../images/workato/create-connection-find-connector.png)

![Screenshot of the connection selection interface in Workato](../images/workato/connection-selection.png)

### Choose authentication type

You can authenticate the connection using either:

- **Apify API token**
- **Sign in with Apify** (OAuth 2.0)

#### Authenticate with API token

1. In the Apify connection dialog, select **Apify API token** as the authentication type.
1. Enter your **API Token**. In Apify Console, go to [**Settings → Integrations**](https://console.apify.com/account#/integrations) and copy your API token.
1. Click **Connect**. Workato will test the connection by making an authenticated call to verify your credentials.

![Screenshot of the Workato API Key authentication form](../images/workato/create-connection-api-key.png)
![Screenshot showing successful API Key authentication in Workato](../images/workato/create-connection-api-success.png)

#### Authenticate with OAuth 2.0

1. In the Apify connection dialog, select **Sign in with Apify** as the authentication type.
1. Click **Connect** to start the OAuth flow.
1. Sign in to Apify and authorize Workato to access your account.
1. After authorizing, you'll be redirected back to Workato and the connection will be established.

![Screenshot of the Workato OAuth 2.0 authentication interface](../images/workato/create-connection-oauth.png)
![Screenshot showing successful OAuth authentication in Workato](../images/workato/create-connection-oauth-success.png)

Once the connection is created and authenticated, you can use it in any recipe.

## Step 3: Create your first recipe

After connecting your Apify account, you can start creating recipes that use Apify triggers and actions. A recipe begins with a trigger (an event that starts the workflow) and includes one or more actions (operations to perform).

### Selection and input methods

The Apify connector provides dynamic dropdown lists (pick lists) and flexible input methods to make configuration easier:

### Pick lists and selection methods

- **Selection method (pick list vs. manual ID):** Choose from fetched lists or switch to manual and paste an ID. If an item doesn't appear, make sure it exists in your account and has been used at least once, or paste its ID manually.
- **Available pick lists:**
  - **Actors**: Lists your recently used Actors or Apify Store Actors, displaying the title and username/name
  - **Tasks**: Lists your saved tasks, displaying the task title and Actor name
  - **Datasets**: Lists available datasets, sorted by most recent first
  - **Key-Value Stores**: Lists available stores, sorted by most recent first
  - **Store Keys**: Dynamically shows keys available in the selected store

### Input types

- **Input type (schema‑based vs. JSON):** For Actor inputs, when you choose an Actor from the pick list, the connector fetches the input schema and renders dynamic fields based on the Actor's configuration. If schema fetching fails or you switch to manual input, a JSON input field appears where you can paste valid JSON instead. For Task inputs, you can optionally provide an override input as JSON to modify the task's pre-configured settings.

:::tip Copy the Actor/Task input JSON

Open the Actor or Task Input page in Apify Console, switch format to JSON, and copy the canonical structure:
`https://console.apify.com/actors/<actor_id>/input`
`https://console.apify.com/actors/tasks/<task_id>/input`

:::

![Screenshot showing different input modes available in the Workato connector](../images/workato/input-modes.png)

#### Where to find your IDs

When using manual input instead of pick lists, you'll need to provide the correct resource IDs. Here's how to find them in Apify Console:

- **Actor ID**: [Actor detail page](https://console.apify.com/actors) → API panel or URL.
  - Example URL: `https://console.apify.com/actors/<actorId>`
  - Actor name format: owner~name (for example, `apify~website-scraper`)
- **Task ID**: [Task detail page](https://console.apify.com/actors/tasks) → API panel or URL.
  - Example URL: `https://console.apify.com/actors/tasks/<taskId>`
- **Dataset ID**: [Storage → Datasets](https://console.apify.com/storage/datasets) → Dataset detail → API panel or URL.
  - Example URL: `https://console.apify.com/storage/datasets/<datasetId>`
  - Also available in the table on the `Storage → Datasets` page
- **Key-value store ID**: [Storage → Key-value stores](https://console.apify.com/storage/key-value-stores) → Store detail → API panel or URL.
  - Example URL: `https://console.apify.com/storage/key-value-stores/<storeId>`
  - Also available in the table on the `Storage → Key-value stores` page
- **Webhook ID**: [Actors](https://console.apify.com/actors) → Actor → Integrations.
  - Example URL: `https://console.apify.com/actors/<actor_id>/integrations/<webhook_id>`


## Triggers

:::tip Inline documentation

Each connector trigger and action field in Workato includes inline help text describing the parameter and expected format.

:::

The Apify connector provides the following triggers that monitor your Apify account for task completions:

### Actor Run Finished

**Triggers when an Apify Actor run finishes (succeeds, fails, times out, or gets aborted).**

This trigger monitors a specific Apify Actor and starts the recipe when any run of that Actor reaches a terminal status. You can:

- Select the Actor from recently used Actors or Apify store Actors
- Choose to trigger on specific statuses (`ACTOR.RUN.SUCCEEDED`, `ACTOR.RUN.FAILED`, `ACTOR.RUN.TIMED_OUT`, `ACTOR.RUN.ABORTED`)
- Access run details, status, and metadata in subsequent recipe steps

![Screenshot of the Actor Run Finished trigger configuration in Workato](../images/workato/trigger-actor.png)

### Task Run Finished  

**Triggers when an Apify Task run finishes (succeeds, fails, times out, or gets aborted).**

This trigger creates a webhook in your Apify account that will notify Workato when the selected Task run finishes with the specified statuses. This trigger watches a specific saved task (an Actor with preset inputs) and fires when that task's run completes with any terminal status. You can choose specific statuses to monitor (`ACTOR.RUN.SUCCEEDED`, `ACTOR.RUN.FAILED`, `ACTOR.RUN.TIMED_OUT`, `ACTOR.RUN.ABORTED`). This is particularly useful for:

- Monitoring scheduled or recurring tasks
- Building workflows dependent on specific data collection tasks
- Processing results from tasks with predefined configurations

![Screenshot of the Task Run Finished trigger configuration in Workato](../images/workato/trigger-task.png)

## Actions

The Apify connector offers comprehensive actions to interact with the Apify platform:

### Run Actor

**Run an Apify Actor with customizable execution parameters.**

This action runs an Apify Actor with your specified input and execution parameters. You can choose to wait for completion or start the run asynchronously. Actors are reusable serverless programs that can scrape websites, process data, and automate workflows. You can:

- Select from your recently used Actors or Apify store Actors
- Provide input using dynamic schema-based fields or raw JSON
- Configure run options like memory allocation, timeout, and build version
- Choose between synchronous (wait for completion) or asynchronous execution

:::tip Input field descriptions

Each input field includes helpful descriptions that guide you toward the correct format and expected values.

Default values for input fields will be displayed as placeholders, giving you a starting point for configuration.

:::

![Screenshot of the Run Actor action configuration interface in Workato](../images/workato/run-actor.png)

### Run Task

**Run an Apify Actor task with optional input overrides.**

This action runs an Apify Task with optional input overrides and execution parameters. Tasks are pre-configured Actor runs with saved input, making them ideal for repeated executions. You can optionally override the task's configured input. You can:

- Select from your saved tasks or input specific Task ID
- Override the task's pre-configured input with new JSON if needed
- Configure task options like memory, build version, or timeout

![Screenshot of the Run Task action configuration interface in Workato](../images/workato/run-task.png)

### Get Dataset Items

**Retrieves items from a dataset with dynamic field mapping.**

Select a dataset to dynamically generate output fields and retrieve its items. This action automatically analyzes the dataset structure and creates appropriate output fields for your recipe. Key features:

- Automatically detects and creates output fields based on dataset structure
- Retrieves data records from specified datasets with pagination support
- Returns structured data ready for downstream recipe steps

#### Dynamic Schema Detection

The connector samples your dataset to create appropriate output fields:

- **Works best with consistent data**: When all items have the same field names and data types
- **May have limitations with mixed data**: If items have different structures or field types
- **Samples up to 25 items**: Fields that only appear after the first 25 items won't be detected

:::tip Best practice

For optimal results, use datasets where all items follow a consistent structure. Test with a small sample to verify field mappings work as expected.

:::

![Screenshot of the Get Dataset Items action configuration interface in Workato](../images/workato/get-dataset.png)

### Get Key-Value Store Record

**Retrieves a single record from a Key-Value Store.**

Select a Key-Value Store and a key to retrieve the corresponding record as a text string or binary file. Key-Value stores often contain metadata, logs, or files from Actor runs. This action:

- Fetches named entries by key from specified stores with dynamic key selection
- Accesses configuration data, screenshots, or custom outputs
- Supports both text and binary content types
- Enables flexible data retrieval for various use cases

![Screenshot of the Get Key-Value Store record action configuration interface in Workato](../images/workato/get-key-val.png)

### Scrape Single URL

**Scrapes a single URL using a selected Apify crawler.**

Provide a single URL and a desired crawler type to get structured scraped data from that page as a JSON object. This action provides immediate, on-demand scraping capabilities:

- Scrapes content from a single specified URL
- Offers multiple crawler types (Adaptive, Firefox, Cheerio, JSDOM)
- Returns extracted content in structured format (text, markdown, HTML, metadata)
- Perfect for real-time data extraction triggered by recipes

![Screenshot of the Scrape Single URL action configuration interface in Workato](../images/workato/scrape-url.png)

## Long‑running scrapes and async pattern in Workato

Long-running scrapes can exceed typical step execution expectations. Use this asynchronous pattern to keep recipes reliable and scalable.

1. Start the run without waiting
   - In a recipe, add the **Run Actor** action and configure inputs as needed.
   - Run asynchronously (do not block downstream steps on completion).
   - ![Screenshot showing the Run Actor action configuration with async option in Workato](../images/workato/run-actor.png)
1. Continue when the run finishes
   - Build a separate recipe with the **Actor Run Finished** trigger.
   - Filter for the specific Actor or Task you started in Step 1.
   - ![Screenshot showing how to filter for specific Actor in the Run Finished trigger](../images/workato/trigger-actor.png)
1. Fetch results and process
   - In the triggered recipe, add **Get Dataset Items** (use the dataset ID from the trigger payload) and continue processing.
   - ![Screenshot showing how to use dataset ID from trigger payload in Get Dataset Items action](../images/workato/get-dataset.png)

## Example use cases

### Data mapping and workflow design

Workato's visual interface makes it easy to connect Apify data with other business applications:

- **Data pills:** Use output fields from Apify triggers and actions as inputs for subsequent steps
- **Field mapping:** Visually map scraped data fields to CRM, database, or spreadsheet columns  
- **Conditional logic:** Build workflows that respond differently based on Actor run status or data content
- **Data transformation:** Apply filters, formatting, and calculations to scraped data before sending to target systems

### Best practices

- **Use tasks for recurring workflows:** Create and use Apify tasks for consistent, repeatable scraping jobs
- **Handle async operations:** For long-running Actors, use asynchronous execution and separate triggers to monitor completion
- **Error handling:** Implement proper error handling for failed Actor runs using Workato's conditional logic
- **Rate limiting:** Be mindful of API rate limits when designing high-frequency workflows
- **Data validation:** Validate scraped data before sending to critical business systems

## Troubleshooting

- **Connection issues:** Verify your API token has the necessary permissions and hasn't expired
- **Actor selection:** If an Actor doesn't appear in dropdowns, ensure it has been run at least once
- **Timeout errors:** For long-running Actors, use asynchronous execution rather than waiting for completion
- **Data format:** Ensure JSON inputs are properly formatted and match expected Actor input schema
- **OAuth issues:** If using OAuth, make sure the redirect URI matches your Workato region (US or EU)
- **Resource not found errors:** Check that IDs are correct and case-sensitive
- **Dataset field mapping issues:** If you experience incorrect data types or missing fields in the Get Dataset Items action datapil, this may be caused by non-homogeneous data in your dataset. The connector samples only the first 25 items to determine field types, so inconsistent data structures can lead to mapping problems. Try to ensure your dataset has consistent field names and data types across all items.

If you have any questions or need help, feel free to reach out to us on our [Discord channel](https://discord.com/invite/jyEM2PRvMU).
