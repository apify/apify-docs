---
title: Airbyte integration
description: Use the Airbyte Apify Dataset connector to move data from Apify datasets to any Airbyte-supported destination using pre-built open-source connectors.
sidebar_label: Airbyte
slug: /integrations/airbyte
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

[Airbyte](https://airbyte.com) is an open-source data integration platform that moves data between sources and destinations using pre-built connectors, maintained by Airbyte or its community. The Apify Dataset connector lets you move data from your Apify datasets to any Airbyte-supported destination.

This guide shows you how to set up an Apify dataset as a source in Airbyte and connect it to a destination.

<ThirdPartyDisclaimer />

## Prerequisites

- An [Apify account](https://console.apify.com)
- An [Airbyte account](https://airbyte.com)

## Set up the Apify Dataset source in Airbyte

The Apify Dataset source reads a single dataset, identified by its ID. Each Actor run writes to a new default dataset. To keep syncing the results of repeated runs, have your Actor write to a [named dataset](/storage#named-and-unnamed-storages) and use its ID.

1. In [Apify Console](https://console.apify.com), open **Storage > Datasets**, select your dataset, and copy its ID.
1. Open **Settings > API & Integrations** and copy your API token.
1. In Airbyte, open the **Sources** tab and select **Apify Dataset**.
1. Enter the **Dataset ID** and **API token** you copied, and save the source.

Your Apify dataset is now available as a source in Airbyte.

## Connect the source to a destination

Setting up the source only tells Airbyte where your data comes from. To move the data, create a *connection*: an Airbyte pipeline that links your Apify Dataset source to a destination and controls how and when the data syncs. To set one up, follow [Set up a connection](https://docs.airbyte.com/using-airbyte/getting-started/set-up-a-connection) in the Airbyte documentation.
