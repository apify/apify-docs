---
title: API tokens with limited permissions
description: Limit an Apify API token to specific Actors, tasks, schedules, and storages, and control what an Actor can access when you run it with a scoped token.
sidebar_label: Limited permissions
sidebar_position: 1
category: platform
slug: /account/api-tokens/limited-permissions
---

By default, an [API token](/account/api-tokens) can access all data in your account. To restrict a token to the data that a particular use case needs, limit its permissions. A token with limited permissions is called a _scoped_ token. A scoped token can access only the resources that you explicitly allow.

Scoped tokens can't create or modify Actors. To create or modify Actors through the Apify API, use an unscoped token.

## Create a scoped token

You manage scoped tokens in the same place as other API tokens. For the other fields of the token form, see [Create an API token](/account/api-tokens#create-api-token).

1. Go to [**Settings > API & Integrations**](https://console.apify.com/settings/integrations) in Apify Console.
1. Select **Create a new token**, or edit an existing token.
1. Turn on **Limit token permissions**.
1. Choose the account-level and resource-specific permissions that the token needs.
1. Select **Create** for a new token, or **Save** for an existing one.
1. Copy a new token and store it somewhere safe. Apify Console shows it only once.

## Account-level vs resource-specific permissions

A token's permissions come in two types:

- Account-level permissions apply to all resources in the account. For example, they can allow the token to run all your Actors.
- Resource-specific permissions apply only to specific, existing resources. For example, they can allow the token to read from one dataset.

A single token can combine both types. For example, a token can read any storage but write to only one key-value store.

![An example scoped token that combines account-level permissions and resource-specific permissions](../../images/api-token-scoped-with-combining-permissions.webp)

## Allow tokens to create resources

To create new resources with the token, such as a task or a storage, you need to allow that explicitly.

After the token creates a resource, the token has full access to that resource, regardless of its other permissions. You can't create a token that can create a dataset but can't write to it.

For example, a token can create and populate datasets without access to the other datasets in your account.

## Permission dependencies

Some permissions require other permissions alongside them. These are called _permission dependencies_.

### Automatic dependencies

The token form enforces some dependencies automatically. For example, when you grant the **Write** permission for a dataset, the form also selects the **Read** permission. This way, a token that can write to a dataset can also read from it.

### Manual dependencies

Other dependencies are more complex, so you need to configure them yourself:

- To create or update a schedule, the token needs access to the schedule and to what the schedule runs. For an Actor, that is the **Run** permission. For a task, it is the **Read** permission.
- To create or update a task, the token needs the **Run** permission on the task's Actor. To run a task, it also needs the **Read** permission on the task.

For example, to create schedules for one Actor programmatically, give the token two permissions: the account-level **Create** permission on schedules, and the resource-specific **Run** permission on that Actor. Such a token has the permissions it needs and no more. The runs that the schedule starts aren't limited by the token's scope, as [Schedules](#schedules) explains.

## Actor execution

When you run an Actor, Apify creates a short-lived run API token and injects it into the Actor's environment. This also applies to scoped tokens. An Actor that you run with a scoped token runs with a different token, and you choose that token's scope.

In the token form, **Permission mode** sets the scope of the run API token. That scope determines what the Actor can access during its run. Apify supports two modes, and **Full access** is the default:

- With **Full access**, Actors can access all your account's data.
- With **Restricted access**, Actors can access only what the scoped token's scope allows.

### Full access

When you run an Actor with a scoped token in this mode, Apify injects an _unscoped_ token into the Actor's runtime.

The run works whatever the Actor needs to access, so you don't have to work out its permissions. However, you need to trust the Actor.

Use this mode to let a third-party service run your Actors. Create a scoped token that can run only the Actor you need, and share it with the service. If the token leaks, it can only run that Actor.

### Restricted access

When you run an Actor with a scoped token in this mode, Apify injects a token with the same scope as the original token.

Actors can't access data they shouldn't, by accident or on purpose. However, an Actor might not work properly if the scope is insufficient.

The restriction is transitive: if the Actor runs another Actor, that Actor's access is restricted as well.

:::caution Server Actors limitation
[Server Actors](/actors/running/server-actors) don't support restricted access mode. You can send requests to a Server Actor with a scoped token configured for restricted access, but Apify doesn't guarantee that it works.
:::

### Default run storages

When Apify [runs an Actor](/actors/running/runs-and-builds#runs), it creates a set of default storages that the Actor can use: a dataset, a key-value store, and a request queue.

The **Allow this token to access default run storages** setting controls whether the scoped token you use to run the Actor gets access to these default storages. The setting is off by default.

If the setting is on, the token can read and write to the default storages of the Actor runs it starts, without an explicit permission. It can also read the default storages of other runs that it can access through the **List runs** permission on an Actor. Use this to let a third-party service, such as an AI agent, run an Actor and then read its output.

If the setting is off, the token can still trigger and inspect runs, but its access to the default storages is restricted:

- In an account with **Restricted** [general resource access](/account/collaboration/general-resource-access), the token can't read or write to default storages.
- In an account with **Unrestricted** general resource access, the default storages can still be read anonymously using their IDs, but the token can't write to them.

For example, your Actor might produce data that you want to delete right after the run finishes. Turn the setting on so that the scoped token can delete that data.

### Full-permission Actors

The **Allow this token to run full-permission Actors** setting controls whether the scoped token can run [full-permission Actors](/actors/running/permissions#full-permission-actors). The setting is on by default. Before you can run a full-permission Actor through the API, you still need to approve it in Apify Console.

## Schedules

You can use scoped tokens to schedule Actors and tasks. Each schedule invocation triggers a new Actor run, and Apify creates a run API token and injects it into the Actor.

**This run token is always unscoped.** The scheduled Actor can therefore access all your account's data, whatever the scope of the token that created the schedule.

## Webhooks configuration

A token that can run an Actor can also manage the Actor's webhooks. The same applies to tasks.

When a webhook points to the Apify API, the Apify platform injects a token when it dispatches the webhook. If you set up such a webhook with a scoped token, the platform dispatches it with a token that has the same limited permissions.

The token needs permissions both to set up the webhook and to perform the webhook's operation. For example, take a webhook that pushes an item to a dataset each time an Actor run succeeds. The token needs to run the Actor, which lets it create the webhook, and to write to that dataset.

## Troubleshooting

Most problems with scoped tokens come from a missing permission.

### Allow a token to run a task

Tasks have no dedicated **Run** permission. Give the token these permissions instead:

- **Run** on the Actor that the task runs
- **Read** on the task

For details, see [permission dependencies](#permission-dependencies).

### A run fails with `insufficient permissions` in the log

This error usually means that the Actor runs with a scoped token set to **Restricted access**.

The Actor is trying to access a resource, such as a dataset or a key-value store, or to perform an operation that the token's scope doesn't allow.

If you know which permission is missing, add it to the token's scope. If you don't, switch **Permission mode** to **Full access**, which lets the Actor access all your account's data.

For details, see [Actor execution](#actor-execution).
