---
title: Google Drive integration
description: Automatically save Apify Actor run results to Google Drive. Set up the integration on your task to upload files to your Drive after each successful run.
sidebar_label: Google Drive
sidebar_position: 3
slug: /integrations/drive
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

Save Apify Actor run results directly to Google Drive. Set up the integration on your task to automatically upload files after each successful run.

<ThirdPartyDisclaimer />

## Get started

To use the Apify integration for Google Drive, you will need:

- An [Apify account](https://console.apify.com/).
- A Google account
- A saved Actor Task

## Set up Google Drive integration

1. Head over to **Integrations** tab in your saved task and click on the **Upload results to GDrive** integration.

    ![Google Drive integration](../images/google/google-integrations-add.png)

1. Click on **Connect with Google** button and select the account with which you want to use the integration.

    ![Google Drive integration](../images/google/google-integrations-connect-drive.png)

1. Set up the integration details. You can choose the **Filename** and **Format** , which can make use of available variables.
The file will be uploaded to your Google Drive account to `Apify Uploads` folder. By default, the integration is triggered by successful runs only.

    ![Google Drive integration](../images/google/google-integrations-details-drive.png)

1. Click on **Save** & enable the integration.

Once this is done, run your Actor to test whether the integration is working.

You can manage your connected accounts at **[Settings > API & Integrations](https://console.apify.com/settings/integrations)**.

![Google Drive integration](../images/google/google-integrations-accounts.png)
