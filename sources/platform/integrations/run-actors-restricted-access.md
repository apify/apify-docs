---
title: Run Actors with restricted access
sidebar_label: Run Actors with restricted access
description: Run Actors you don't control, such as ones your users pick from Apify Store, with a scoped API token so they can't reach the rest of your Apify account.
sidebar_position: 2
slug: /integrations/run-actors-restricted-access
---

When you run an Actor, Apify injects an API token into the run so the Actor can call the [Apify API](/api/v2). Depending on the token you start the run with and the Actor's [permission level](/actors/running/permissions), that token can reach more of your account than the Actor needs. This guide shows how to run Actors you don't control with a scoped token, so that each run can only access the resources it needs.

## Use cases

Use this setup when you don't control which Actors run under your account. For example:

- Your platform lets users select and run any Actor from [Apify Store](https://apify.com/store) using your API token, without having their own Apify account. See [Whitelabel access](/integrations/integrate#whitelabel-access).
- You run Actors from developers you don't know or trust.

If you only run a small, fixed set of Actors from trusted developers, such as Actors maintained by Apify, you probably don't need this setup.

## How restricted access works

A [scoped token](/integrations/api#limited-permissions) set to **Restricted access** passes its own limits on to every Actor it runs. An Actor started this way can:

- Read its input, and read and write its default storages.
- Run other Actors, which get the same restrictions.

It can't list or manage your other runs, create new storages, or access storages that aren't its own, unless you add those permissions to the token. This limits what any Actor from Apify Store can reach in your account.

## Set up restricted access

The setup has four parts: [restrict anonymous access to your resources](#restrict-general-resource-access), [stop sharing run data with developers](#stop-sharing-run-data-with-developers), [create a scoped token to run Actors](#create-a-scoped-token-to-run-actors), and [read results with a separate token](#read-results-with-a-separate-token).

### Restrict general resource access

If [General resource access](/account/collaboration/general-resource-access) is set to **Anyone with ID can read**, anyone who knows the ID of a storage, run, or build can read it without an API token. An Actor running under your account could use this to read the storages of runs started by your other users.

To prevent this, check the setting and change it to **Restricted** if needed:

1. In [Apify Console](https://console.apify.com), go to **Settings > Login & Privacy**. For organization accounts, go to **Settings > Security & Privacy**.
1. Under **General resource access**, select **Restricted**.

:::caution Anonymous reads stop working

After you switch to **Restricted**, any integration that reads datasets or key-value stores without a token stops working. Pass a valid API token on every request that reads run data.

:::

### Stop sharing run data with developers

With **Share run data with developers** turned on, the developer of each public Actor you run can see the input and output of your runs, even if your general resource access is **Restricted**. Because these runs belong to your users, keep this setting off. You can find it in **Settings > Login & Privacy**. For details, see [Automatically sharing runs with public Actor creators](/account/collaboration/general-resource-access#automatically-sharing-runs-with-public-actor-creators).

### Create a scoped token to run Actors

Create a scoped token that can run Actors and passes its restrictions on to every run:

1. In Apify Console, go to [**Settings > API & Integrations**](https://console.apify.com/settings/integrations). If you integrate through an organization, switch to it first.
1. Select **Create a new token**, and optionally add a description.
1. Turn on **Limit token permissions**.
1. Under **Account-level permissions**, find **Actors** and select **Run**. Apify Console selects **Read** with it. This lets the token run any Actor in your account or in Apify Store.
1. Under **Running Actors**, select **Restricted access**.
1. **Allow this token to run full-permission Actors** is on by default. To run only Actors with limited permissions, turn it off. See [Full-permission Actors](#full-permission-actors).
1. Leave **Allow this token to access default run storages** turned off. This way, the token that starts runs can't read their results, so if it leaks, it can't expose your users' data. See [Default run storages](/integrations/api#default-run-storages).
1. Select **Create**.

The new token appears in the token list with a **Limited permissions** badge.

### Read results with a separate token

Because the token that starts runs can't read their default storages, use a different token to read results. This can be your main API token, or a second scoped token with **Read** access to datasets and key-value stores. Keep this token on your backend and never pass it to an Actor.

## Run an Actor

Start runs with the scoped token. Identify your platform on every request with the `x-apify-integration-platform` header, as described in [Monitor and track](/integrations/integrate#monitor-and-track).

With the REST API:

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

// Adds the platform header to every request
const requestInterceptors = [(config) => {
    config.headers['x-apify-integration-platform'] = '<YOUR_PLATFORM>';
    return config;
}];

// Token for starting runs
const runClient = new ApifyClient({ token: process.env.APIFY_SCOPED_TOKEN, requestInterceptors });
// Token for reading results
const readClient = new ApifyClient({ token: process.env.APIFY_READ_TOKEN, requestInterceptors });

const run = await runClient.actor('apify/website-content-crawler').call({
    startUrls: [{ url: 'https://docs.apify.com' }],
});

const { items } = await readClient.dataset(run.defaultDatasetId).listItems();
```

### Full-permission Actors

Actors in Apify Store use either [limited or full permissions](/actors/running/permissions#permission-levels). If your token can run [full-permission Actors](/actors/running/permissions#full-permission-actors), these runs still get only the token's scope in **Restricted access** mode, not access to your whole account.

You must approve each full-permission Actor once in Apify Console before you can run it through the API. Until then, the request fails with a `403` error of type `full-permission-actor-not-approved`.

## Track the cost of each run

Apify bills every run you start to your Apify account. To pass costs on to your users, read the cost of each run from the [run object](/api/v2/actor-run-get):

- `usageTotalUsd` is the total cost of the run in USD. For pay-per-event Actors, it includes the charged events and any platform usage the Actor charges on top. For pay-per-usage Actors, it's the platform usage. The value can change shortly after the run finishes, while Apify accounts for the last charged events.
- `eventUsage` breaks down the cost of a pay-per-event run by event type, which you can show to your users.

To cap the cost of a single run, set `maxTotalChargeUsd` when you start it. See [Actor pricing models](/actors/running/actors-in-store#pricing-models).

## Limitations and troubleshooting

Some Actors need more access than a restricted run gets, for example to create a new storage, or to read an existing dataset you pass in their input. These runs fail with `insufficient permissions` in the log, and there's no way to detect this before you run the Actor. To fix it, add the missing permission to the token's scope. To avoid granting extra access to every Actor, use a separate token for each Actor that needs more permissions. See [Troubleshoot insufficient permissions errors](/integrations/api#my-run-failed-and-i-can-see-insufficient-permissions-in-the-logs).

Restricted access isn't supported for Actors in [Standby mode](/actors/running/standby).
