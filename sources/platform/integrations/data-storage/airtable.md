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

### Follow the steps below to connect your Airtable account to Apify:

1. Visit the [API & Integrations tab](https://console.apify.com/settings/integrations) in the Settings section of Apify Console.

2. Scroll down to the **Account-level integrations** and click on the **Add account** button.

    ![Airtable integration](../images/airtable/connect-account-1.png)

3. From the list of available services, select **Airtable**.

    ![Airtable integration](../images/airtable/connect-account-2.png)

4. The OAuth 2.0 authorization flow will initiate, allowing you to securely connect your Airtable account.

5. After authorization, you’ll be prompted to select the workspaces and bases you want to grant Apify access to.

## Set up Airtable integration

1. [Choose an Actor or Task](https://console.apify.com/actors) to integrate with Airtable and head to its **Integrations** tab.

2. Click **Upload data to Airtable** to initiate the integration setup.

    ![Airtable integration](../images/airtable/set-up-integration-1.png)

3. Select a connected Airtable account and choose the base where the integration will upload run results.

4. Enter a table name. A new table will be created for each execution of this integration. To ensure uniqueness, use dynamic variables. If a table with the same name already exists, a random token will be appended.

    ![Airtable integration](../images/airtable/set-up-integration-2.png)

5. Save the integration. Once your Actor runs, you’ll see its results uploaded to Airtable.

    ![Airtable integration](../images/airtable/set-up-integration-3.png)

