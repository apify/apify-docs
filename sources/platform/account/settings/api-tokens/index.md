---
title: API tokens
description: Create an Apify API token in Apify Console, set its expiration, rotate it if it leaks, and limit its permissions so it reaches only the data it needs.
sidebar_position: 2
category: platform
slug: /account/api-tokens
---

To access the Apify API in your integrations, you need to authenticate using your secret API token. You manage your tokens on the [API & Integrations](https://console.apify.com/settings/integrations) page in Apify Console. A new personal account has no API token, so [create one](#create-api-token) before your first API call.

## Create an API token {#create-api-token}

1. Go to [**Settings > API & Integrations**](https://console.apify.com/settings/integrations) in Apify Console.
1. In the **Personal API tokens** section, select **Create a new token**.
1. Enter a name that says where you will use the token. Optionally, add a description.
1. In **Expiration**, keep the default of **90 days** or [choose another option](#expiration).
1. Optionally, [limit the token's permissions](/account/api-tokens/limited-permissions).
1. Select **Create**.
1. Copy the token and store it somewhere safe, such as a password manager.
1. Select **Done**.

:::info You can view a token only once
Apify Console shows the value of an API token only once, right after you create or [rotate](#rotation) it. You can't view or copy the full value of an existing token.
:::

The token list shows each token's name, a masked preview of its value, when it was last used, and when it expires. Use the preview to tell your tokens apart. If you lose a token's value, [rotate the token](#rotation) to get a new value, or create a new token and delete the old one. You can delete any token, including your last one.

The Apify CLI doesn't need a copied token. When you sign in with [`apify login`](/cli/docs/reference#apify-auth-login--apify-login) in the browser, the sign-in creates a token for your device, and the CLI stores it for you.

## Expiration

A token you create in Apify Console expires after 90 days unless you choose otherwise. An expired token stops working, which limits the damage if the token leaks. In the **Expiration** field of the token form, choose one of these options:

- If you choose **7 days**, **30 days**, **90 days**, or **365 days**, the token lasts that many full days and then expires at the next 00:00 UTC. A 90-day token therefore lasts between 90 and 91 days.
- If you choose **Custom date**, the token expires at 00:00 UTC at the start of the day you pick.
- If you choose **No expiration**, the token doesn't expire.

The token list shows the exact time each token expires, for example `Expires on February 15, 2027, 00:00 UTC`. To change the expiration of an existing token, edit the token and pick a new date, or clear the date to remove the expiration.

The 90-day default applies only to a token you create in the token form. Three kinds of token have no expiration unless you set one:

- A token that `apify login` creates
- A token that you [rotate](#rotation)
- The personal token that Apify creates for you in an [organization](#organization-accounts)

## Rotation

Rotating a token replaces its value and keeps its name and permissions. Rotate a token in Apify Console if you suspect that it is compromised or exposed.

After you confirm the rotation, Apify Console shows the new value. This is the only time you can copy it, so store it somewhere safe. The new value works right away.

You can keep the old value active for 24 hours, which gives you time to update every application that uses it. If the token leaked, turn that option off, so that the old value stops working immediately.

Rotation removes the token's [expiration](#expiration). To keep one, edit the token after you rotate it and pick a date.

Apify Console marks tokens identified as compromised with a **Leaked** label, so that you can find them and act on them.

## Token notifications

When a token is created or rotated on your account, Apify sends you an email and a notification in Apify Console. This includes tokens that `apify login` creates. If you don't recognize the token, delete it, then secure your account in **Settings > Login & Privacy**.

## Limited permissions

A token can access all data in your account unless you limit its permissions when you create or edit it. A token with limited permissions is called a _scoped_ token. For the permission types and how they affect Actor runs, schedules, and webhooks, see [API tokens with limited permissions](/account/api-tokens/limited-permissions).

## Organization accounts

When you work under an organization account, the API & Integrations page shows two types of API tokens.

Personal API tokens in an organization are separate from the tokens of your personal account. If you use a personal token in an integration, it has the same permissions that you have within the organization. Apify attributes every operation made with the token to you. When you join or create an organization, Apify creates one personal token for you in that organization. This token has no expiration. A personal token stops working when you leave the organization.

Organization API tokens have full permissions and are not tied to a specific member of the organization. You create them in the **Organization API tokens** section. You can access them only if you are the owner or have the **Manage access tokens** permission.

## Good practices

Treat an API token like a password:

- Don't share a token with untrusted parties or use it directly in client-side code, unless you fully understand the consequences.
- Use a separate token for each service, as you would use a separate password for each account.
- Don't commit a token to code or a repository.
- Use a [scoped token](/account/api-tokens/limited-permissions) that can reach only what the service needs.
- Keep an [expiration](#expiration) on tokens you share with third-party services or use for temporary access.
- [Rotate](#rotation) a token as soon as you suspect it's exposed.
