---
title: Airbyte integration
description: Use the Airbyte Apify Dataset connector to move data from Apify datasets to any Airbyte-supported destination using pre-built open-source connectors.
sidebar_label: Airbyte
slug: /integrations/airbyte
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';
import { CreateApiTokenLink, CopyTokenStep } from '@site/src/components/ApiToken';

[Airbyte](https://airbyte.com) is an open-source data integration platform that moves data between sources and destinations using pre-built connectors, maintained by Airbyte or its community. The Apify Dataset connector lets you move data from your Apify datasets to any Airbyte-supported destination.

This guide shows you how to set up an Apify dataset as a source in Airbyte and connect it to a destination.

<ThirdPartyDisclaimer />

## Prerequisites

- An [Apify account](https://console.apify.com)
- An [Airbyte Cloud](https://airbyte.com) account or a self-hosted Airbyte instance

## Set up the Apify Dataset source in Airbyte

The Apify Dataset source reads items from a single dataset, identified by its ID or name. Each Actor run writes to a new default dataset with a new ID. To keep syncing the results of repeated runs, have your Actor write to a [named dataset](/storage#named-and-unnamed-storages) and enter the dataset's name in Airbyte. The name stays the same across runs, so you don't need to update the source after each run. For details, see [Use a dataset name](#use-a-dataset-name).

1. In [Apify Console](https://console.apify.com), open **Storage > Datasets**, select your dataset, and copy its ID or name.
1. <CreateApiTokenLink /> <CopyTokenStep />
1. In Airbyte, open the **Sources** tab and select **Apify Dataset**.
1. Enter the dataset ID or `~`-prefixed name in the **Dataset ID** field and the **API token** you copied, and save the source.

Your Apify dataset is now available as a source in Airbyte.

### Use a dataset name

Enter a dataset name with a `~` prefix, for example `~my-dataset`. Airbyte looks up the name in the account that owns your API token. For a dataset owned by another user or organization, enter `username~my-dataset`. The owner must [share the dataset](/storage/share#grant-access-rights) with you first, or the connection check fails.

A named dataset keeps the items of every run that writes to it, and Airbyte reads the whole dataset on every sync. To sync only the items of the latest run, make your Actor delete the named dataset at the start of each run and create it again.

## Connect the source to a destination

Setting up the source only tells Airbyte where your data comes from. To move the data, create a *connection*: an Airbyte pipeline that links your Apify Dataset source to a destination and controls how and when the data syncs. To set one up, follow [Set up a connection](https://docs.airbyte.com/using-airbyte/getting-started/set-up-a-connection) in the Airbyte documentation.

To sync the dataset's items, select the `item_collection` stream when you set up the connection.

To keep the destination up to date, set a sync schedule on the connection. If your Actor runs on a [schedule](/actors/running/schedules), time the syncs to start after the runs finish.
