---
title: Camunda integration
description: Learn how to integrate Apify Actors with Camunda 8 for automated BPMN workflows.
sidebar_label: Camunda
sidebar_position: 8
slug: /integrations/camunda
---

**Learn how to integrate Apify Actors with Camunda 8 for automated BPMN workflows.**

---

[Camunda](https://camunda.com/) is a process orchestration platform that enables you to design, automate, and optimize business workflows using BPMN. With the **Apify Connectors**, you can run Apify Actors, tasks, or retrieve datasets directly from your BPMN processes.

## Prerequisites

To use the Apify integration with Camunda, you will need:

- An [Apify account](https://console.apify.com/)
- A [Camunda 8](https://camunda.com/) environment (SaaS or Self-Managed)

## Authentication

All Apify Connector tasks require an **Apify API Token**.

1.  Log in to [Apify Console](https://console.apify.com/).
2.  Navigate to **Settings → Integrations**.
3.  Copy your **API Token**.

:::tip Security Best Practice
In Camunda, avoid hardcoding your token directly in the process design. Instead, use **Camunda Secrets** (e.g., `secrets.APIFY_TOKEN`) to store your API token securely.
:::

## Apify Outbound Connector

The **Apify Outbound Connector** allows your BPMN process to "call out" to Apify to invoke operations. It supports the following operations:

> [!NOTE]
> **Illustration suggestion**: A screenshot of the Camunda Modeler property panel showing the "Apify Outbound Connector" selected and the "Operation" dropdown menu.

### Run Actor or task

Use this action to start a new execution of an Actor or a saved task.

**Configuration:**

*   **Operation**: Select `Run Actor` or `Run task`.
*   **Run Actor inputs**:
    *   **Actor**: The Actor ID (e.g., `apify/hello-world` or `E2jjCZBezvAZnX8Rb`).
    *   **Input Body**: The input configuration for the run (e.g., `= { "message": "Hello from Camunda!" }`).
*   **Run task inputs**:
    *   **Task**: The task ID (e.g., `author/task-name`).
    *   **Input Override**: (Optional) JSON to override the task's saved input.
*   **Options**:
    *   **Wait for Finish**:
        *   `true` (Synchronous): The process waits at this task until the Actor run completes. Use this for short-running tasks.
        *   `false` (Asynchronous): The process starts the run and immediately moves to the next step. Use this for long-running scrapes or "fire-and-forget" tasks.
    *   **Timeout (seconds)**: Set a maximum duration (e.g., `60`).
    *   **Memory (MB)**: Allocate specific memory in MB (e.g., `1024`).
    *   **Build**: Specify a build tag (e.g., `latest`).

### Scrape single URL

Quickly scrape a webpage using one of Apify's standard crawlers.

**Configuration:**

*   **Operation**: Select `Scrape single URL`.
*   **URL**: The full URL to scrape (e.g., `https://example.com`).
*   **Crawler Type**: Choose from:
    *   `Cheerio` (Lightweight, static HTML)
    *   `JSDOM` (Static HTML with DOM API)
    *   `Playwright Adaptive` (Best for modern dynamic sites)
    *   `Playwright Firefox`

### Get dataset items

Retrieve the results of an Actor run. This is typically used after a `Run Actor` task has completed.

**Configuration:**

*   **Operation**: Select `Get dataset items`.
*   **Dataset**: The unique identifier of the dataset to retrieve items from. You can often use the variable from a previous run, e.g., `=runResult.defaultDatasetId`.
*   **Limit / Offset**: (Optional) Control pagination.

### Get key-value store record

Fetch a specific record (like `OUTPUT`) from a key-value store.

**Configuration:**

*   **Operation**: Select `Get key-value store record`.
*   **Key-Value Store**: The unique identifier of the key-value store (e.g., `=runResult.defaultKeyValueStoreId`).
*   **Key**: The record key to retrieve from the store (e.g., `OUTPUT`).

## Apify Inbound Connectors

Inbound connectors allow Apify to start or resume your Camunda processes via webhooks.

### Start Event (Message Catch Event)

Use the **Apify Message Catch Event Connector** to begin a *new* process instance whenever a specific event occurs in Apify (e.g., "Run Succeeded").

> [!NOTE]
> **Illustration suggestion**: A simple BPMN diagram: `[Apify Start Event] -> [Service Task] -> [End Event]`.

**When to use:**
*   You want to trigger a workflow solely based on an external event (e.g., "Every time this daily scrape finishes, start a review process").

**Configuration:**
*   **Resource Type**: `Actor` or `Task`.
*   **Resource Identifier**: The ID or name to watch (e.g., `author/actor-name`).
*   **Activation Condition**: A FEEL expression to filter events.
    *   *Example*: `=connectorData.status = "SUCCEEDED"` (Only trigger on success).
    *   *Default*: Empty (Process all events).
*   **Result Variable**: Name of the variable to store the webhook payload (e.g., `webhookResponse`).
*   **Result Expression**: A FEEL expression to transform the data (e.g., `={ result: connectorData }`).

### Intermediate Catch Event

Use the **Apify Message Intermediate Catch Event Connector** to pause a running process and wait for a callback from Apify.

**When to use:**
*   You have a long-running Actor (async execution) and want to wait for it to finish without blocking the process engine resources.
*   You want to run tasks in parallel while waiting for the scrape to complete.

**Correlation:**
To ensure the webhook resumes the *correct* process instance, you must configure **Correlation Keys**. The value in the process must match the value in the incoming webhook.

| Setting | Value Expression (FEEL) | Description |
| :--- | :--- | :--- |
| **Correlation Key (Process)** | `=previousEventResponse.runId` | The correlation key from process variables. |
| **Correlation Key (Payload)** | `=connectorData.runId` | A FEEL expression to extract the correlation key from the incoming message payload. |

## Usage Patterns

### Async Execution with Parallel Gateway

This is the recommended pattern for handling long-running scrapes reliably. It prevents timeout issues associated with synchronous calls and allows you to perform other tasks while waiting.

> [!NOTE]
> **Illustration suggestion**: A BPMN diagram showing the Parallel Gateway pattern:
> `[Start] -> [Apify Outbound (Run Async)] -> [Fork]`
> `   Upper Branch: [Apify Intermediate Catch Event]`
> `   Lower Branch: [Other Tasks (Optional)]`
> `-> [Join] -> [Apify Outbound (Get Dataset)] -> [End]`

1.  **Apify Outbound Connector (Run Async)**:
    *   Select `Run Actor` or `Run task`.
    *   Set **Wait for Finish** to `false`.
    *   Save the response to a result variable (e.g., `runResult`).
2.  **Parallel Gateway (Fork)**: Split the flow immediately after the run starts.
3.  **Apify Message Intermediate Catch Event Connector**:
    *   In one branch, add the intermediate connector.
    *   Set **Correlation Key (Process)** to `=runResult.id`.
    *   Set **Correlation Key (Payload)** to `=connectorData.runId`.
4.  **Parallel Gateway (Join)**: Merge the branches. The process continues only when the webhook is received (and any other parallel tasks are done).
5.  **Apify Outbound Connector (Get dataset items)**:
    *   Select `Get dataset items`.
    *   Set **Dataset** to `=runResult.defaultDatasetId`.

## Reference

### Finding Resource IDs

You can find IDs in the [Apify Console](https://console.apify.com/):

*   **Actor ID**: `https://console.apify.com/actors/<THIS_IS_THE_ID>` or see the API tab.
*   **Task ID**: `https://console.apify.com/actors/tasks/<THIS_IS_THE_ID>` or see the API tab.
*   **Dataset ID**: Found in the Storage section or run details.

### Common FEEL Expressions

Camunda uses FEEL (Friendly Enough Expression Language) for dynamic values.

| Expression | Use Case |
| :--- | :--- |
| `=secrets.APIFY_TOKEN` | Accessing a secure credential. |
| `=runResult.id` | Accessing a property of a JSON object variable. |
| `=connectorData.status` | Reading the status from the inbound webhook payload. |
| `=connectorData.runId` | Reading the Run ID from the inbound webhook payload. |

### Webhook Payload Structure

When an Apify inbound connector is triggered, it receives a payload containing information about the event and the Actor run. You can access this data using FEEL expressions.

**Top-Level Structure:**

*   `connectorData`: The primary object containing the most important fields (simpler to access).
*   `request`: The raw webhook request, including headers and the body.
*   `connectorData.resource` / `request.body.resource`: The full **Actor Run** object (see [Apify API Reference](https://docs.apify.com/api/v2/act-runs-post)).

**Payload Example:**

```json
{
  "connectorData": {
    "eventType": "ACTOR.RUN.SUCCEEDED",
    "userId": "user1234",
    "createdAt": "2026-01-03T12:00:00.000Z",
    "runId": "efgh5678",
    "status": "SUCCEEDED",
    "actorId": "abcd1234",
    "defaultDatasetId": "d9E0f1G2h3I4j5K6",
    "eventData": {
      "actorId": "abcd1234",
      "actorRunId": "efgh5678"
    },
    "resource": {
      "id": "efgh5678",
      "status": "SUCCEEDED",
      "stats": { ... },
      "options": { ... },
      "usage": { ... }
    }
  },
  "request": {
    "body": {
      "eventType": "ACTOR.RUN.SUCCEEDED",
      "resource": { ... }
    },
    "headers": { ... }
  }
}
```

### Event Types and Statuses

**Event Types (`eventType`):**
These events trigger the connector.

*   `ACTOR.RUN.CREATED`: A new Actor run has been created.
*   `ACTOR.RUN.SUCCEEDED`: Run finished with status `SUCCEEDED`.
*   `ACTOR.RUN.FAILED`: Run finished with status `FAILED`.
*   `ACTOR.RUN.ABORTED`: Run finished with status `ABORTED`.
*   `ACTOR.RUN.TIMED_OUT`: Run finished with status `TIMED-OUT`.
*   `ACTOR.RUN.RESURRECTED`: Run has been resurrected (moved back to `RUNNING`).

**Run Statuses (`status`):**
The status of the Actor run found in `connectorData.status` or `resource.status`.

*   `SUCCEEDED`
*   `FAILED`
*   `ABORTED`
*   `TIMED-OUT`

## Troubleshooting

*   **Webhook not triggering**: Ensure you have deployed the process. For Start Events, deploying automatically creates the webhook in Apify. Check the **Integrations** tab of your Actor in Apify Console to verify the webhook exists.
*   **Process stuck at Intermediate Event**: Check your **Correlation Keys**. The value in the process variable must *exacty match* the value in the webhook payload. Use "Operate" to inspect variable values.
*   **401 Unauthorized**: Check your API Token. Regenerate it in Apify Console if necessary.
