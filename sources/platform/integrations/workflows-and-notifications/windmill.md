---
title: Windmill integration
description: Use Windmill to run Apify Actors and Tasks, react to Apify events via webhooks or polling, and move data between Apify and other services with Windmill scripts and flows.
sidebar_label: Windmill
sidebar_position: 8
slug: /integrations/windmill
---

**Use Windmill to run Apify Actors and Tasks, react to Apify events via webhooks or polling, and move data between Apify and other services with Windmill scripts and flows.**

---

[Windmill](https://www.windmill.dev/) is an open-source automation platform for building scripts and flows that connect your tools and data. With the Apify integration for Windmill, you can run Actors and Tasks, scrape websites, extract data from storage, and trigger workflows based on Apify events.

This guide shows you how to install the Apify package, set up authentication, and create automated workflows that integrate with Apify.

## Prerequisites

Before you begin, make sure you have:

-   An [Apify account](https://console.apify.com/)
-   A [Windmill instance](https://www.windmill.dev/docs/getting_started/how_to_use_windmill) (self-hosted or cloud)

## Install the Apify integration

The Apify integration provides scripts, flows, and resources that will be available through the Windmill Hub.

<!-- SCREENSHOT: Windmill Hub showing available integrations including Apify alongside with other integrations -->

### Step 1: Import Apify scripts from Windmill Hub

You can import Apify integration scripts into your flows from the Windmill Hub, regardless of whether you're using Windmill Cloud or a self-hosted instance. The following components will be available:

**Scripts (Actions):**

-   Run Actor
-   Run Task
-   Scrape Single URL
-   Get Dataset Items
-   Get Key-Value Store

**Scripts (Triggers):**

-   Polling-based Actor Run Trigger
-   Polling-based Task Trigger

**Flows (Triggers):**

-   Webhook-based Actor Trigger
-   Webhook-based Task Trigger

**Resources:**

-   Apify Auth Resource (for storing your API token)
-   Webhook Config Resource (optional, for managing webhook-based triggers)

<!-- SCREENSHOT: Windmill Hub showing available integrations including Apify -->
<!-- SCREENSHOT: Importing Apify scripts from Windmill Hub -->

### Step 2: Authentication

You can provide the token to scripts via a **Windmill Resource**. Create it either in the **Resources** tab or directly from a script.

#### Option A — Create in the Resources tab

1. Open **Resources** → **New Resource**.
2. Select `apify_api_key` resource type.
3. Name it (e.g., `apify_token`) and paste your Apify API token.
4. Save, then reference this resource in your scripts/flows.

<!-- SCREENSHOT: from readme -->

#### Option B — Create/bind from a script

1. Open the script in Windmill UI.
2. Add a secret input parameter (e.g., `apify_token`) .
3. Bind it to the resource you created (or create a new one inline).
4. Use the bound token inside the script to call Apify.

<!-- SCREENSHOT: from readme -->

## Create your first workflow

Let's create a simple workflow that runs an Actor and fetches its results.

### Step 1: Create a new flow

1. In the Windmill UI, click **New Flow**.
2. Give your flow a descriptive name (e.g., "Run Actor and Get Results").

### Step 2: Add the Run Actor script

1. Click **Add Step** and search for "Run Actor".
2. Select the **Run Actor** script.
3. Configure the inputs:
    - **Apify Auth**: Select your `apify_token` resource
    - **Actor ID or Slug**: Enter the Actor you want to run
    - **Input**: JSON input for the Actor (optional)
    - **Wait for Finish**: Set to `true` to wait for completion
    - **Memory**: Memory allocation in MB (optional)
    - **Timeout**: Timeout in seconds (optional)

<!-- SCREENSHOT: Run Actor script configuration form -->

### Step 3: Add the Get Dataset Items script

1. Add another step and search for "Get Dataset Items".
2. Configure the inputs:
    - **Apify Auth**: Select your `apify_token` resource
    - **Dataset ID**: Use the `defaultDatasetId` from the previous step
    - **Limit**: Number of items to retrieve (optional)

<!-- SCREENSHOT: Get Dataset Items script configuration -->
<!-- SCREENSHOT: Flow showing both scripts connected -->

### Step 4: Test and run

1. Click **Test** to run the flow with sample data.
2. Review the results and ensure both steps completed successfully.
3. Save and activate your flow.

<!-- SCREENSHOT: Flow execution results showing successful completion -->

## Use webhooks to trigger workflows

Windmill provides webhook-based triggers that can automatically start workflows when Apify events occur.

### Step 1: Create a webhook-triggered flow

1. Create a new flow and add the **Webhook-based Actor Trigger** script.
2. Configure the webhook:
    - **Apify Auth**: Select your `apify_token` resource
    - **Actor ID**: Select the Actor to monitor
    - **Event Types**: Choose events (e.g., `succeeded`, `failed`)
    - **Webhook URL**: Copy the webhook URL from the script's trigger section

<!-- SCREENSHOT: Webhook trigger configuration -->
<!-- SCREENSHOT: Webhook URL display in trigger section -->

### Step 2: Register the webhook in Apify

1. Go to your Actor's **Integrations** tab in Apify Console.
2. Click **Add Integration** → **Webhook**.
3. Enter the webhook URL from Windmill.
4. Select the event types you want to monitor.
5. Save the webhook.

<!-- SCREENSHOT: Apify Console webhook configuration -->
<!-- SCREENSHOT: Webhook integration setup form -->

### Step 3: Test the webhook

1. Run your Actor in Apify Console.
2. When the Actor finishes, the webhook should trigger your Windmill flow automatically.
3. Check the flow execution logs to verify the trigger worked.

<!-- SCREENSHOT: Flow execution triggered by webhook -->
<!-- SCREENSHOT: Execution logs showing webhook payload -->

## Available operations

The Apify integration provides several operations you can use in your Windmill workflows.

### Actions (Scripts)

**Run Actor**

-   Starts an Actor with optional input and configuration
-   Can wait for completion or run asynchronously
-   Returns run metadata including dataset ID

**Run Task**

-   Executes a predefined Actor task
-   Similar to Run Actor but uses task configuration
-   Ideal for recurring operations

**Scrape Single URL**

-   Runs a lightweight scraper for a single webpage
-   Returns content as text, markdown, and HTML
-   Perfect for quick content extraction

**Get Dataset Items**

-   Retrieves items from a dataset
-   Can filter by dataset ID or last run
-   Supports pagination and item limits

**Get Key-Value Store**

-   Reads values from key-value stores
-   Can retrieve specific keys or list all keys
-   Useful for configuration and state management

### Triggers

**Webhook-based Triggers**

-   **Actor Webhook Trigger**: Responds to Actor run events
-   **Task Webhook Trigger**: Responds to task run events
-   Real-time event processing with full payload data

**Polling-based Triggers**

-   **Actor Run Polling Trigger**: Periodically checks for new Actor runs
-   **Task Run Polling Trigger**: Periodically checks for new task runs
-   Fallback option when webhooks aren't available

## Resources

-   [Windmill Documentation](https://www.windmill.dev/docs)
-   [Windmill Local Development](https://www.windmill.dev/docs/advanced/local_development)
-   [Apify API Documentation](https://docs.apify.com)
-   [Apify Webhooks](https://docs.apify.com/webhooks)
-   [Apify Actors & Tasks](https://docs.apify.com/actors)
