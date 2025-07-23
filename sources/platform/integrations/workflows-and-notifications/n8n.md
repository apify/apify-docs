---
title: n8n integration
description: Connect Apify with n8n to automate workflows by running Actors, extracting data, and responding to Actor or task events.
sidebar_label: n8n
sidebar_position: 7
slug: /integrations/n8n
---

**Connect Apify with n8n to automate workflows by running Actors, extracting structured data, and responding to Actor or task events.**

---

[n8n](https://n8n.io/) is an open source, fair-code licensed tool for workflow automation. With the [Apify integration for n8n](https://github.com/apify/n8n-nodes-apify), you can connect Apify Actors and storage to hundreds of services You can run scrapers, extract data, and trigger workflows based on Actor or task events.

In this guide, you'll learn how to install the Apify node, set up authentication, and incorporate it into your n8n workflows as either a trigger or an action.

## Prerequisites

Before you begin, make sure you have:

- An [Apify account](https://console.apify.com/)
- An [n8n instance](https://docs.n8n.io/getting-started/) (self‑hosted or cloud)

## Install the Apify Node (self-hosted)

If you're running a self-hosted n8n instance, you can install the Apify community node directly from the editor. This process adds the node to your available tools, enabling Apify operations in workflows.

1. Open your n8n instance.
1. Go to **Settings > Community Nodes**.
1. Select **Install**.
1. Enter the npm package name: `@apify/n8n-nodes-apify`  (for latest version). To install a specific [version](https://www.npmjs.com/package/@apify/n8n-nodes-apify?activeTab=versions) enter e.g `@apify/n8n-nodes-apify@0.4.4`.
1. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes and select **Install**.
1. You can now use the node in your workflows.

![Apify Install Node](../images/n8n-install-node-self-hosted.png)

## Install the Apify Node (n8n Cloud)

For n8n Cloud users, installation is even simpler and doesn't require manual package entry.  Just search and add the node from the canvas.

1. Go to the **Canvas** and open the **nodes panel**
2. Search for **Apify** in the community node registry
3. Click **Install node** to add the Apify node to your instance

![Apify Install Node](../images/n8n-install-node-cloud.png)

:::note Verified community nodes visibility

On n8n Cloud, instance owners can toggle visibility of verified community nodes in the Cloud Admin Panel. Ensure this setting is enabled to install the Apify node.

:::

Once installed, the next step is authentication.

## Authentication

The Apify node offers two authentication methods to securely connect to your Apify account. Choose based on your setup - API key works for both self-hosted and cloud instances, while OAuth2 is cloud-only.

### API Key (cloud & self-hosted instance)

1. In the n8n Editor UI, click on **Create Credential**.
1. Search for Apify API and click **Continue**.
1. Enter your Apify API token. (find it in the [Apify Console](https://console.apify.com/settings/integrations)).
1. Click **Save**.

  ![Apify Auth](../images/n8n-api-auth.png)

### OAuth2 (cloud instance only)

1. In n8n Cloud, select **Create Credential**.
1. Search for Apify OAuth2 API and select **Continue**.
1. Select **Connect my account** and authorize with your Apify account.
1. n8n automatically retrieves and stores the OAuth2 tokens.

  ![Apify Auth](../images/n8n-oauth.png)
  
:::note

For simplicity on n8n Cloud, use the API key method if you prefer manual control over credentials.

:::

With authentication set up, you can now create workflows that incorporate the Apify node.

## Create a Workflow with the Apify Node

Start by building a basic workflow in n8n, then add the Apify node to handle tasks like running Actors or fetching data.

1. Create a new workflow in n8n.
1. Select **Add Node**, search for **Apify**, and select it.
1. Choose the desired **Resource** and **Operation**.
1. In the node's **Credentials** dropdown, choose the Apify credential you configured earlier. If you haven't configured any credentials, you can do so in this step. The process will be the same.
1. You can now use Apify node as a trigger or action in your workflow.

![Apify Node](../images/n8n-list-of-operations.png)

## Use Apify node as trigger

Triggers let your workflow respond automatically to events in Apify, such as when an Actor run finishes. This is ideal for real-time automation, like processing scraped data as soon as it's available.

1. Create a new workflow.
1. Click **Add Node**, search for **Apify**, and select it.
1. Select **On new Apify Event** trigger.
1. Configure the trigger:
    - **Actor or Actor task**: select the Actor or task to listen for terminal events.
    - **Event Type**: the status of the Actor or task run that should trigger the workflow.
1. Add subsequent nodes (e.g., HTTP Request, Google Sheets) to process or store the output.
1. Save and execute the workflow.

![Apify Node](../images/n8n-trigger-example.png)

## Use Apify node as an action

Actions allow you to perform operations like running an Actor within a workflow. For instance, you could trigger a scraper and then retrieve its results.

1. Create a new workflow.
1. Click **Add Node**, search for **Apify**, and select it.
1. Select any operation. In this example we will use **Run Actor**.
1. Configure it:
    - **Custom input**: JSON input for the Actor run, which you can find on the Actor input page in Apify Console. See [Inputs](/platform/actors/running/input-and-output#input) for more information. If empty, the run uses the input specified in the default run configuration
    - **Timeout**: Timeout for the Actor run in seconds. Zero value means there is no timeout
    - **Memory**: Amount of memory allocated for the Actor run, in megabytes
    - **Build Tag**: Specifies the Actor build tag to run. By default, the run uses the build specified in the default run configuration for the Actor (typically `latest`)
    - **Wait for finish**: Whether to wait for the run to finish before continuing. If true, the node will wait for the run to complete (successfully or not) before moving to the next node

    ![Apify Node](../images/n8n-run-actor-example.png)

1. Add another Apify operation called **Get Dataset Items**.
    - Set **Dataset ID** parameter as **defaultDatasetId** value received from the previous **Run Actor** node. This will give you the output of the Actor run

    ![Apify Node](../images/n8n-get-dataset-items-example.png)

1. Add any subsequent nodes (e.g. Google Sheets) to process or store the output
1. Save and execute the workflow

    ![Apify Node](../images/n8n-workflow-example.png)

## Available Operations

The Apify node provides a range of operations for managing Actors, tasks, runs, and storage. These can be used as actions in your workflows. For triggers, focus on event-based activations to start workflows automatically.

### Actors

Run and manage Actors directly.

- **Run Actor**: Starts a specified Actor with customizable parameters
- **Scrape Single URL**: Runs a scraper for a specified website and returns its content
- **Get Last Run**: Retrieve metadata for the most recent run of an Actor

### Actor Tasks

Execute predefined tasks efficiently.

- **Run Task**: Executes a specified Actor task

### Actor Runs

Retrieve run details.

- **Get User Runs List**: Retrieve a list of all runs for a user
- **Get Run**: Retrieve detailed information for a specific run ID
- **Get Runs**: Retrieve all runs for a specific Actor

### Storage

Pull data from Apify storage.

#### Datasets

- **Get Items**: Retrieves items from a [dataset](/platform/storage/dataset)

#### Key-Value Stores

- **Get Record**:  Retrieves a value from a [key-value store](/platform/storage/key-value-store)

### Triggers

Automatically start an n8n workflow when an Actor or task run finishes:

- **Actor Run Finished**: Activates when a selected Actor run completes
- **Task Run Finished**: Activates when a selected Actor task run completes

## Resources

- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Apify API Documentation](https://docs.apify.com)
- [n8n Documentation](https://docs.n8n.io)

## Troubleshooting

If you encounter issues, start by double-checking basics.

- **Authentication errors**: Verify your API token or OAuth2 settings in **Credentials**.
- **Operation failures**: Check input parameters, JSON syntax, and resource IDs in your Apify account.

Feel free to explore other resources and contribute to the integration on [GitHub](https://github.com/apify/n8n-nodes-apify).
