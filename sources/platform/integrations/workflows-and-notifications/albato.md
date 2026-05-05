---
title: Albato integration
description: Connect Apify Actors to over 1,000 apps with Albato. Trigger workflows when Actor or task runs finish and pass scraped data to any app.
sidebar_label: Albato
sidebar_position: 7
slug: /integrations/albato
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

With [Apify integration for Albato](https://albato.com/apps/apify), you can connect your Apify Actors to over 1,000 apps through a visual automation builder.

Your Albato workflows can start Apify Actors or tasks, fetch items from a dataset, retrieve records from key-value stores, find Actor or task runs, or send custom requests to the Apify API.

You can use the Albato integration to trigger a workflow whenever an Actor or a task finishes.

<ThirdPartyDisclaimer />

## Connect Apify with Albato

To use the Apify integration on Albato, you will need to:

- Have an [Apify account](https://console.apify.com/).
- Have an [Albato account](https://albato.com/) (free 7-day trial available).

### Step 1: Get your Apify API token

Log in to [Apify Console](https://console.apify.com/).

![Apify Console](../images/albato-apify-console.png)

Go to **Settings > API & Integrations**.

![API and integrations settings](../images/albato-api-settings.png)

Copy your **Personal API token**.

![Personal API token](../images/albato-api-token.png)

### Step 2: Create the Apify connection in Albato

Log in to [Albato](https://albato.com/).

![Albato login](../images/albato-login.png)

Go to **Apps** and click **Add a connection**.

![Add a connection](../images/albato-add-connection.png)

Search for **Apify**, select it, and click **Add a connection**.

![Search for Apify](../images/albato-search-apify.png)

Paste the API token you copied from Apify and click **Continue**.

![Paste API token](../images/albato-paste-token.png)

A success notification confirms the connection is active.

![Connection success](../images/albato-connection-success.png)

## Build a workflow with an Apify trigger

This example shows how to scrape data with an Apify Actor and automatically send the results to Google Sheets.

### Step 1: Create a new automation

In Albato, click **Create automation**. Select **Apify** as the trigger app and choose the **Finished Actor Run** trigger. This fires every time a selected Actor completes a run. Select your Apify connection and pick the Actor you want to monitor.

### Step 2: Add an action to retrieve the data

Click **+** to add the next step. Select **Apify** as the action app and choose the **Get dataset** action. Map the **Run ID** from the trigger output to fetch the correct dataset.

### Step 3: Send the data to Google Sheets

Click **+** to add another step. Select **Google Sheets** as the action app and choose the **Add Row** action. Select your spreadsheet and map the dataset fields to the corresponding columns. Click **Save** and turn on the automation.

Every time the selected Actor finishes a run, Albato fetches the scraped data and adds it to your spreadsheet automatically.

## Build a workflow with an Apify action

You can also start an Actor directly from an Albato workflow. This is useful when you want another event, such as a new CRM record or a form submission, to kick off a scraping job.

Create a new automation and choose any app as the trigger (for example, **HubSpot > New Contact**). Add **Apify** as the action app and select **Run Actor**. Pick the Actor you want to run and configure its input fields. Optionally, add a second Apify step with **Get dataset** to retrieve the results once the run completes.

## Triggers

### Finished Actor run

> Triggers when a selected Actor run is finished.

### Finished task run

> Triggers when a selected Actor task run is finished.

## Actions

### Run Actor

> Runs a selected Actor.

### Run task

> Runs a selected Actor task.

### Last Actor run

> Retrieves data from the most recent Actor run.

### Last task run

> Retrieves data from the most recent Actor task run.

### Find last Actor run

> Finds the most recent Actor run.

### Find last task run

> Finds the most recent Actor task run.

### Create Actor task

> Creates a new Actor task configuration.

### Get dataset

> Retrieves items from a [dataset](/platform/storage/dataset).

### Get key-value store record

> Retrieves a value from a [key-value store](/platform/storage/key-value-store).

### Get list of keys

> Lists keys in a [key-value store](/platform/storage/key-value-store).

### Custom API request

> Sends a custom request to any Apify API endpoint.

## Resources

- [Apify integration page on Albato](https://albato.com/apps/apify)
- [How to connect Apify to Albato](https://albato.com/blog/publications/how-to-connect-apify-to-albato)

If you have any questions or need help, feel free to reach out to us on our [developer community on Discord](https://discord.com/invite/jyEM2PRvMU).
