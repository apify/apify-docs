---
title: Zapier
description: Learn how to integrate your Apify Actors with Zapier.
sidebar_position: 11.12
slug: /integrations/zapier
---

# Zapier integration

**Learn how to integrate your Apify Actors with Zapier.**

---

With (Apify integration for Zapier)[https://zapier.com/apps/apify/integrations], you can connect Apify with more than 1,500 apps, including Slack, Trello, Google Sheets, Dropbox, Salesforce, and loads more.
Your Zapier workflows can start Apify actors or tasks, fetch items from a dataset, set and get records from key-value stores or find actor or task runs.
You can use the Zapier integration to trigger a workflow whenever an actor or a task finishes.

## Connect Apify with Zapier

To use the Apify integration on Zapier, you will need:

- Have an (Apify account)[https://console.apify.com/].
- Have a (Zapier account)[https://zapier.com/].

## Step 1: Find Apify on Zapier


## Step 2: Create a connection to your Apify account


## Triggers

### Watch Actor Runs

> Triggers when a selected actor run is finished.

<img src={require("./images/apify-make-trigger.png").default} width="50%" />

| Input        | Description                                                            |
| :----------- | :--------------------------------------------------------------------- |
| Webhook name | Enter the desired name for the webhook. E.g. Finished Web Scraper Run. |
| Connection   | [Create an Apify connection](#connect-apify-to-make).                  |
| Actor        | Select the Actor you want to monitor for finished runs.                |

## Searches

### Get Dataset Items

> Retrieves items from a [dataset](/platform/storage/dataset).

<img src={require("./images/apify-make-dataset.png").default} width="50%" />


| Input               | Description                                                                                                                                                                                                                   |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Connection          | [Create an Apify connection](#connect-apify-to-make).                                                                                                                                                                         |
| Dataset ID          | Enter the ID of the dataset you want to retrieve items from.                                                                                                                                                                  |
| Data transformation | **Clean** - it returns only non-empty items and skips hidden fields (fields starting with the # character).<br/>**Simplified** - it formats items to emulate simplified results provided by the Legacy Apify Crawler product. |
| Format              | Select the format of the dataset items.                                                                                                                                                                                       |
| Limit               | Set the maximum number of items Make will return during one execution cycle.                                                                                                                                                  |
| Offset              | Enter the number of items to skip.                                                                                                                                                                                            |

If you have any questions or need help, feel free to reach out to us on our [developer community on Discord](https://discord.com/invite/jyEM2PRvMU).
