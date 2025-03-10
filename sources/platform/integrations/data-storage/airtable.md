---
title: Airtable integration
description: Learn how to integrate Apify with Airtable
sidebar_label: Airtable
sidebar_position: 4
slug: /integrations/airtable
---

**Learn how to integrate your Apify Actors with Airtable. This article shows you how to automatically upload results to your Airtable when an Actor run succeeds.**

---

[Airtable](https://www.airtable.com/)  is a cloud-based platform for organizing, managing, and collaborating on data. With Apify integration for Airtable, you can automatically upload Actor run results to Airtable after a successful run.

This integration uses OAuth 2.0, a secure authorization protocol, to connect your Airtable account to Apify and manage data transfers.

## Connect Apify with Airtable

To use the Apify integration for Airtable, ensure you have:

- An [Apify account](https://console.apify.com/)
- An [Airtable account](https://www.airtable.com/)

### Set up connection within Apify Console

1. In Apify Console, go to the [API & Integrations tab](https://console.apify.com/settings/integrations) in the **Settings** section.
1. Under **Account-level integrations**, click **Add account**.

    ![Add account button in Account-level integrations section of the settings](../images/airtable/connect-account-1.png)

1. Select **Airtable** from the list of available services.

    ![Connect with Airtable button among other buttons for connection of other available services](../images/airtable/connect-account-2.png)

1. Follow the OAuth 2.0 authorization flow to securely connect your Airtable account.

1. Grant Apify access to the workspaces and bases you want to use.

### Set up Airtable integration

1. [Choose an Actor or Task](https://console.apify.com/actors) to integrate with Airtable.

1. Go to the **Integrations** tab and click **Upload data to Airtable**.

    ![Airtable integration option among other available integrations](../images/airtable/set-up-integration-1.png)

1. Select a connected Airtable account and choose the base where the Actor run results will be uploaded.

1. Enter a table name. A new table will be created for each execution of this integration. To ensure uniqueness, use dynamic variables. If a table with the same name already exists, a random token will be appended.

    ![Airtable integration configuration form](../images/airtable/set-up-integration-2.png)

1. Save the integration. Once your Actor runs, you’ll see its results uploaded to Airtable.

    ![Airtable table filled with data](../images/airtable/set-up-integration-3.png)

