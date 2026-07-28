---
title: Airbyte integration
description: Use the Airbyte Apify Dataset connector to move data from Apify datasets to any Airbyte-supported destination using pre-built open-source connectors.
sidebar_label: Airbyte
slug: /integrations/airbyte
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

Airbyte is an open-source data integration platform that allows you to move your data between different sources and destinations using pre-built connectors, which are maintained either by Airbyte itself or by its community.
One of these connectors is the Apify Dataset connector, which makes it simple to move data from Apify datasets to any supported destination.

To use Airbyte's Apify connector you need to:

* Have an Apify account.
* Have an Airbyte account.

<ThirdPartyDisclaimer />

## Set up Apify connector in Airbyte

Once you have all the necessary accounts set up, you need to set up the Apify connector.
To do so, you will need to navigate to **Sources** tab in Airbyte and select **Apify Dataset**

![Airbyte sources tab](../images/airbyte-sources.png)

You will need to provide a **dataset ID** and your Apify API Token. You can find both of these in [Apify Console](https://console.apify.com).

![Airbyte source setup](../images/airbyte-source-setup.png)

To find your **dataset ID**, you need to navigate to the **Storage** tab in Apify Console. Copy it and paste it in Airbyte.

![Datasets in app](../images/datasets-app.png)

To find your Apify API token, you need to navigate to the **Settings** tab and select **API & Integrations**. Copy it and paste it in the relevant field in Airbyte.

![Integrations token](../images/apify-integrations-token.png)

And that's it! You now have Apify datasets set up as a Source, and you can use Airbyte to transfer your datasets to one of the available destinations.

To learn more about how to setup a Connection, visit [Airbyte's documentation](https://docs.airbyte.com/using-airbyte/getting-started/set-up-a-connection)

## Trigger a sync automatically after an Actor run

Instead of syncing on a schedule, you can start an Airbyte sync as soon as an Actor run finishes. Use an Apify [webhook](/integrations/webhooks) to call the Airbyte API and refresh the connection whenever new data is scraped.

### Prerequisites

- An Airbyte connection that uses your Apify Dataset as a source.
- Airbyte API access: an access token and the **connection ID** (you can copy it from the connection's URL in Airbyte). The exact endpoint and authentication depend on whether you use Airbyte Cloud or a self-managed instance, so check the [Airbyte API reference](https://reference.airbyte.com/reference/createjob) for the current details.

### Set up the webhook

1. In [Apify Console](https://console.apify.com), open the Actor and go to the **Integrations** tab.
1. Under **Connect with Apify**, click **HTTP webhook**.
1. Configure the webhook:
    - **Event types**: select `Run succeeded` (`ACTOR.RUN.SUCCEEDED`).
    - **URL**: the Airbyte API endpoint that starts a sync, for example `https://api.airbyte.com/v1/jobs`.
1. Set the **Headers template** to authenticate with your Airbyte token:

    ```json
    {
        "Authorization": "Bearer YOUR_AIRBYTE_TOKEN",
        "Content-Type": "application/json"
    }
    ```

1. Set the **Payload template** to start a sync for your connection:

    ```json
    {
        "connectionId": "YOUR_CONNECTION_ID",
        "jobType": "sync"
    }
    ```

1. Click **Save**, then **Test** to confirm that Airbyte starts a sync.

Every successful Actor run now triggers Airbyte to move the freshly scraped data to your destination, with no manual step in between.
