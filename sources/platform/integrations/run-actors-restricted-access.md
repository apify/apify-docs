---
title: Run Actors with restricted access
sidebar_label: Run Actors with restricted access
description: Run Actors you don't control, such as ones your users pick from Apify Store, with a scoped API token so they can't reach the rest of your Apify account.
sidebar_position: 2
slug: /integrations/run-actors-restricted-access
---

When you run an Actor, Apify injects an API token into the run so the Actor can call the [Apify API](/api/v2). Depending on the token you start the run with and the Actor's [permission level](/actors/running/permissions), that token can reach more of your account than the Actor needs. This guide shows how to run arbitrary Actors in a sandbox, so that each run can only access the resources it needs to do its job.

## When you need this

Use this setup when you don't control which Actors run under your account. For example:

- Your platform lets users select and run any Actor from [Apify Store](https://apify.com/store) using your API token, without having their own Apify account. See [Whitelabel access](/integrations/integrate#whitelabel-access).
- You run Actors from developers you don't know or trust.

If you only run a small, fixed set of Actors from trusted developers, such as Actors maintained by Apify, you probably don't need this setup.

## Set up restricted access

The setup has three parts: restrict anonymous access to your resources, create a scoped token for starting runs, and use a separate token for reading results.

### Restrict general resource access

On older accounts, anyone who knows the ID of a storage, run, or build can read it without an API token by default. An Actor running under your account could use this to read the storages of runs started by your other users.

To prevent this, set [General resource access](/account/collaboration/general-resource-access) to **Restricted**:

1. In [Apify Console](https://console.apify.com), go to **Settings > Login & Privacy**. For organization accounts, go to **Settings > Security & Privacy**.
1. Under **General resource access**, select **Restricted**.

Accounts created after April 2026 use **Restricted** by default.

:::caution Anonymous reads stop working

After you switch to **Restricted**, any integration that reads datasets or key-value stores without a token stops working. Pass a valid API token on every request that reads run data.

:::

### Create a scoped token for running Actors

Create a [scoped token](/integrations/api#limited-permissions) that can run Actors, but restricts each run to the token's own scope:

1. In Apify Console, go to [**Settings > API & Integrations**](https://console.apify.com/settings/integrations). If you integrate through an organization, switch to it first.
1. Select **Create a new token**, and optionally add a description.
1. Turn on **Limit token permissions**.
1. Under **Account-level permissions**, find **Actors** and select **Read** and **Run**. This lets the token run any Actor in your account or in Apify Store.
1. Under **Running Actors**, select **Restricted access**. In this mode, each run gets a token with the same scope as the one that started it. See [Restricted access](/integrations/api#restricted-access-restrict-what-actors-can-access-using-the-scope-of-this-actor).
1. Leave **Allow this token to read and write to default storages of runs it triggers** turned off. Otherwise, the token could read the results of every run in your account, including runs of your other users. See [Default run storages](/integrations/api#default-run-storages).
1. Select **Create**.

The new token appears in the token list with a **Limited permissions** badge.

### Read results with a separate token

Because the token that starts runs can't read their default storages, use a different token to read results. This can be your main API token, or a second scoped token with **Read** access to datasets and key-value stores. Keep this token on your backend and never pass it to an Actor.

## Run an Actor

Start runs with the scoped token. With the REST API:

```bash
curl -X POST "https://api.apify.com/v2/acts/apify~website-content-crawler/runs" \
  -H "Authorization: Bearer <SCOPED_TOKEN>" \
  -H "Content-Type: application/json" \
  -H "x-apify-integration-platform: <YOUR_PLATFORM>" \
  -d '{"startUrls": [{"url": "https://docs.apify.com"}]}'
```

With the [JavaScript API client](/api/client/js):

```javascript
import { ApifyClient } from 'apify-client';

// Token for starting runs
const runClient = new ApifyClient({ token: process.env.APIFY_SCOPED_TOKEN });
// Token for reading results
const readClient = new ApifyClient({ token: process.env.APIFY_READ_TOKEN });

const run = await runClient.actor('apify/website-content-crawler').call({
    startUrls: [{ url: 'https://docs.apify.com' }],
});

const { items } = await readClient.dataset(run.defaultDatasetId).listItems();
```

Identify your platform on every request, as described in [Monitor and track](/integrations/integrate#monitor-and-track).

### Full-permission Actors

Most Actors in Apify Store use [limited permissions](/actors/running/permissions#permission-levels). Actors that need full permissions require a one-time approval in Apify Console before you can run them. Until you approve them, API calls fail with a `403` error of type `full-permission-actor-not-approved`. See [Full-permission Actors](/actors/running/permissions#full-permission-actors).

<!-- TODO: confirm how a Restricted access token interacts with full-permission Actors -->

## Track the cost of each run

Apify bills every run you start to your Apify account. To pass costs on to your users, read the cost of each run from the [run object](/api/v2/actor-run-get):

- `usageTotalUsd` - the total cost of the run in USD.

<!-- TODO: confirm field(s) that cover pay-per-event charges -->

To cap the cost of a single run, set `maxTotalChargeUsd` when you start it. Learn more about how Actors are priced in [Pricing models](/actors/running/actors-in-store#pricing-models).

## What a restricted run can do

An Actor that runs with a Restricted access token can:

- Read its input and write to its default storages.
- Run other Actors, which are restricted the same way.

All other operations fail. This makes it safe to run any Actor from Apify Store with this token.

<!-- TODO: confirm full list -->

Some Actors need more access, for example to read an existing dataset you pass in their input. These runs fail with `insufficient permissions` in the log, and there's no way to detect this before you run the Actor. To fix it, add the missing permission to the token's scope. To avoid granting extra access to every Actor, use a separate token for each Actor that needs more permissions. See [Troubleshooting](/integrations/api#my-run-failed-and-i-can-see-insufficient-permissions-in-the-logs).

Restricted access isn't supported for Actors in [Standby mode](/actors/running/standby).
