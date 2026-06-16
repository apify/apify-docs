---
title: Softr integration
description: Connect Apify Actors and tasks to your Softr no-code apps to run scrapers from user actions and surface live web data in workflows and dashboards.
sidebar_label: Softr
sidebar_position: 7
slug: /integrations/softr
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

[Softr](https://www.softr.io/) is a no-code platform for building web apps, client portals, and internal tools on top of your data. The community-built Apify integration lets your Softr workflows trigger Apify Actors and tasks, then bring the results back into your app for users to view, filter, or act on.

<ThirdPartyDisclaimer />

## What you can do

From a Softr workflow, you can:

- Run an Apify Actor with custom JSON input, with an option to wait for the run to finish.
- Run an Actor and return the dataset items in a single step.
- Get the most recent Actor run, optionally filtered by status.
- Run an Apify task.
- Run a task and return its dataset items in one step.
- Fetch items from an existing dataset by ID.
- Read a single record from a key-value store.

## Get started

You will need:

- An [Apify account](https://console.apify.com/) and an API token from **Settings → API & Integrations** in Apify Console.
- A Softr workspace with access to [Workflows](https://docs.softr.io/workflows).

In Softr, open your app's **Workflows**, add an Apify action, paste your Apify API token to connect, then pick the Actor, task, dataset, or key-value store you want to use and map your inputs.

For the full step-by-step setup, see [Softr's Apify integration docs](https://docs.softr.io/workflows/integrations/apify).

## Resources

- [Softr Apify integration docs](https://docs.softr.io/workflows/integrations/apify)
- [Softr Workflows documentation](https://docs.softr.io/workflows)
- [Apify integrations overview](/platform/integrations)
