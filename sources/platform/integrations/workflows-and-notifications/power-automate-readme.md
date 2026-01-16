# Apify Connector

Apify is a web scraping platform. Use this connector to run scrapers (called Actors), fetch results from datasets and key-value stores, and trigger flows when scraping jobs finish.


## Quick Start

1. **Sign up** for an Apify account at [console.apify.com](https://console.apify.com/)
2. **Add the connector** to your Power Automate flow
3. **Authenticate** by selecting *Sign in with Apify* and authorizing access
4. **Use triggers and actions** to integrate Apify into your workflows

For detailed instructions, visit the [Apify Microsoft Power Automate documentation](https://docs.apify.com/platform/integrations/microsoft-power-automate).

## Key Capabilities

**Triggers:**
- **[Actor Run Finished](#actor-run-finished):** Start a flow when an Actor completes
- **[Actor Task Finished](#actor-task-finished):** Start a flow when a Task completes

**Actions:**
- **[Run Actor](#run-actor):** Execute any Apify Actor
- **[Run Task](#run-task):** Execute a saved Actor Task
- **[Get Dataset Items](#get-dataset-items):** Retrieve scraped data from datasets
- **[Get Key-Value Store Record](#get-key-value-store-record):** Fetch stored data
- **[Scrape Single URL](#scrape-single-url):** Quick single-page scraping

## Prerequisites

Before using this connector, you need:

- An Apify account. Sign up at the [Apify Console](https://console.apify.com/).

## Authentication

The connector supports **OAuth 2.0** authentication with the following scopes:

- `profile`: Read your Apify username and account ID to identify the connection.
- `full_api_access`: Run Actors, start Tasks, read Datasets and Key-Value Stores, and manage webhooks.

When creating a connection in Power Automate, select *Sign in with Apify*. You will be redirected to Apify to authorize access to your account.

> **Note:** All requests include the header `x-apify-integration-platform: microsoft-power-automate` to identify the integration platform.

## Triggers

> **Note:** Triggers create webhooks in your Apify account to notify Power Automate. When you delete or disable a flow, manually remove the associated webhooks in the [Apify Console](https://console.apify.com/) to keep your account organized. We are working on automating this cleanup in the future.

### Actor Run Finished

Use the *Actor run finished* trigger to automatically execute your Power Automate flow when a specific Apify Actor run completes with a selected status.

- **Authentication:** Use *Sign in with Apify* [OAuth 2.0] (scopes: `profile`, `full_api_access`).
- **Headers:** `x-apify-integration-platform: microsoft-power-automate`.
- **Inputs:**
  - `Actor Scope`: Choose between *Recently used Actors* or *From store* (Apify store Actors).
  - `Actor`: Dynamic dropdown populated with Actors based on the selected scope.
  - `Trigger On`: Select which run statuses should trigger the flow (SUCCEEDED, FAILED, TIMED_OUT, ABORTED).
- **Output:** Webhook payload containing detailed information about the completed Actor run.

**How it works:**
- Actor dropdown is populated via `GET /v2/acts` (for recent Actors) or via `GET /v2/store` store API (for store Actors).
- The trigger creates a webhook via `POST /v2/webhooks` that subscribes to Actor run events.
- When the selected Actor finishes with one of the specified statuses, Apify sends a webhook payload to Power Automate.

### Actor Task Finished

Use the *Actor task finished* trigger to automatically execute your Power Automate flow when a specific Apify Actor task run completes with a selected status.

- **Authentication:** Use *Sign in with Apify* [OAuth 2.0] (scopes: `profile`, `full_api_access`).
- **Headers:** `x-apify-integration-platform: microsoft-power-automate`.
- **Inputs:**
  - `Task`: Dynamic dropdown populated with your Actor tasks.
  - `Trigger On`: Select which run statuses should trigger the flow (SUCCEEDED, FAILED, TIMED_OUT, ABORTED).
- **Output:** Webhook payload containing detailed information about the completed task run.

**How it works:**
- Creates a webhook via `POST /v2/webhooks` that subscribes to Actor task run events.
- Task dropdown is populated via `GET /v2/actor-tasks` to list your available tasks.

## Actions

### Get Dataset Items

Use the *Get dataset items* action to retrieve records from one of your Apify datasets.

- **Authentication:** Use *Sign in with Apify* [OAuth 2.0] (scopes: `profile`, `full_api_access`).
- **Headers:** `x-apify-integration-platform: microsoft-power-automate`.
- **Inputs:**
  - `Dataset`: Select a dataset from a dynamically populated dropdown of your datasets.
  - `Limit` (optional): Number of items to return.
  - `Offset` (optional): Number of items to skip (for pagination).
- **Output:** An array of dataset items. The item shape is dynamic and depends on the selected dataset.

**How it works:**
- The dataset dropdown is populated via `GET /v2/datasets` so you can pick by name.
- The connector calls `GET /v2/datasets/{datasetId}/items` with the provided `limit` and `offset` to fetch the data.
- To provide typed fields in Power Automate, it calls `GET /v2/datasets/{datasetId}/itemsSchemaHelper` to infer the item schema from a sample.

**Tips:**
- For large datasets, paginate using `limit` and `offset` to process items in batches.

### Get Key-Value Store Record

Retrieve a record's content from a selected key-value store.

- **Authentication:** Use *Sign in with Apify* [OAuth 2.0] (scopes: `profile`, `full_api_access`).
- **Headers:** `x-apify-integration-platform: microsoft-power-automate`.
- **Inputs:**
  - `Store` (`storeId`, required): Dynamic dropdown listing your stores.
  - `Record Key` (`recordKey`, required): Dependent dropdown listing keys for the selected store.
- **Output:**
  - Body: Raw record content (handled as binary; text and JSON are shown accordingly by Power Automate).
  - Header: `Content-Type` is exposed as an output value.

This action calls `GET /v2/key-value-stores/{storeId}/records/{recordKey}` via Apify API proxy.

### Scrape Single URL

Use the *Scrape single URL* action to scrape a single webpage using Apify's Web Scraper Actor.

- **Authentication:** Use *Sign in with Apify* [OAuth 2.0] (scopes: `profile`, `full_api_access`).
- **Headers:** `x-apify-integration-platform: microsoft-power-automate`.
- **Inputs:**
  - `URL`: The full URL of the single page to be scraped. Must be a valid URL format.
  - `Crawler Type`: Select the crawling engine to use:
    - `playwright:adaptive` (Adaptive - recommended)
    - `playwright:firefox` (Firefox Headless Browser)
    - `cheerio` (Cheerio - Raw HTTP, fastest)

The connector invokes `POST /v2/acts/aYG0l9s7dbB7j3gbS/runs` (Web Scraper Actor). This action returns the run details immediately. To process results, use the *Actor Run Finished* trigger.

### Run Actor

Use the *Run Actor* action to start an Apify Actor run.

- **Authentication:** Use *Sign in with Apify* [OAuth 2.0] (scopes: `profile`, `full_api_access`).
- **Headers:** `x-apify-integration-platform: microsoft-power-automate`.
- **Inputs:**
  - `Actor Scope`: Choose *Recently used Actors* or *From store*.
    - If *Recently used Actors*: pick from `Actor` populated by your account Actors.
    - If *From store*: pick from `Actor` populated by Apify Store (limit 1000).
  - `Input Body`: Provide JSON for the Actor input.
  - `Build` (optional): Specific build tag or id.
  - `Timeout` (optional): Timeout in seconds.
  - `Memory` (optional): Memory in MB (128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768).
  - `Wait for Finish` (optional): Wait time in seconds (max 60). Set 0 to return immediately.

The connector invokes `POST /v2/acts/{actorId}/runs` per [Apify docs](https://docs.apify.com/api/v2/act-runs-post). The `actorId` path segment is chosen automatically based on your `actorScope` selection.

> **Note:** Available memory options depend on your Apify subscription plan. For more information, see your [account limits](https://console.apify.com/billing/limits).

### Run Task

Use the *Run task* action to start an Apify task run.

- **Authentication:** Use *Sign in with Apify* [OAuth 2.0] (scopes: `profile`, `full_api_access`).
- **Headers:** `x-apify-integration-platform: microsoft-power-automate`.
- **Inputs:**
  - `Task`: Select the task from a dynamic dropdown of your available tasks.
  - `Input Body` (optional): Provide a raw JSON object to override the task's default input.
  - `Timeout` (optional): Timeout in seconds.
  - `Build` (optional): Specific build tag or id.
  - `Memory` (optional): Memory in MB (128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768).
  - `Wait for Finish` (optional): Wait time in seconds (max 60). If empty or 0, the call is asynchronous.

The connector invokes `POST /v2/actor-tasks/{taskId}/runs` per [Apify docs](https://docs.apify.com/api/v2/actor-task-runs-post). The `taskId` path segment is selected directly from the dropdown.

> **Note:** Available memory options depend on your Apify subscription plan. For more information, see your [account limits](https://console.apify.com/billing/limits).

## Common Use Cases

- **Price drop alerts:** Run a price scraper on a schedule, then notify via Teams when prices drop
- **CRM enrichment:** Scrape company websites and push the data to Dynamics 365 or SharePoint
- **Competitor tracking:** Detect changes on competitor pages and log them to Excel
- **Lead generation:** Scrape directories, filter results, and add leads to your CRM

## Known Issues and Limitations

- The *Wait for Finish* parameter has a maximum value of **60 seconds**. For long-running Actors, use webhooks (triggers) instead of waiting.
- The connector infers dataset schemas from sample data. This may not capture all possible fields.
- Dynamic schemas may not reflect all possible data structures in large or complex datasets.
- Start with default memory settings and only increase if needed to optimize costs.

## Troubleshooting

**Trigger not firing?**
- Verify the webhook was created in [Apify Console → Webhooks](https://console.apify.com/)
- Check that the Actor/Task is running and completing with the selected status
- Ensure your flow is enabled and saved

**Authentication errors?**
- Re-authenticate by creating a new connection in Power Automate
- Verify your Apify account has the required permissions

**Dataset items missing fields?**
- The connector infers schema from sample data; some fields may not appear if they're absent in the sample
- Use raw JSON output if you need all fields regardless of schema

**Webhook cleanup?**
- When you delete or disable a flow, manually remove associated webhooks from [Apify Console](https://console.apify.com/)

## Frequently Asked Questions

**How much does it cost?**
The connector is free. Apify charges for compute (runtime, memory, proxies). There's a free tier with monthly credits. For pricing details, visit [apify.com/pricing](https://apify.com/pricing).

**Where can I get help?**
- **Apify documentation:** [docs.apify.com](https://docs.apify.com)
- **API reference:** [docs.apify.com/api/v2](https://docs.apify.com/api/v2)
- **Apify store:** [apify.com/store](https://apify.com/store)
- **Support:** [apify.com/contact](https://apify.com/contact)
- **Community forum:** [community.apify.com](https://community.apify.com)
