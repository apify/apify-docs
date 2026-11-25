---
title: API tokens
description: Create an Apify API token in Apify Console, set its expiration, rotate it if it leaks, and limit its permissions so it reaches only the data it needs.
sidebar_position: 2
category: platform
slug: /account/api-tokens
---

To access the Apify API in your integrations, you need to authenticate using your secret API token. You manage your tokens on the [API & Integrations](https://console.apify.com/settings/integrations) page in Apify Console. A new personal account has no API token, so [create one](#create-api-token) before your first API call.

Apify Console shows the value of an API token only once, right after you create or [rotate](#rotation) it. The token list shows each token's name, a masked preview of its value, when it was last used, and when it expires. You can't view or copy the full value of an existing token. Use the preview to tell your tokens apart.

The Apify CLI doesn't need a copied token. When you sign in with [`apify login`](/cli/docs/reference#apify-auth-login--apify-login) in the browser, the sign-in creates a token for your device, and the CLI stores it for you.

When a token is created or rotated on your account, Apify sends you an email and a notification in Apify Console. This includes tokens that `apify login` creates. If you don't recognize the token, secure your account in **Settings > Login & Privacy** and delete the token.

:::caution Protect your API token
Unless you fully understand the consequences, don't share your API token with untrusted parties or use it directly in client-side code. You can also [limit the token's permissions](/account/api-tokens/limited-permissions) so that it can access only what it needs.
:::

## Create an API token {#create-api-token}

1. Go to [**Settings > API & Integrations**](https://console.apify.com/settings/integrations) in Apify Console.
1. In the **Personal API tokens** section, select **Create a new token**.
1. Enter a name that says where you will use the token. Optionally, add a description.
1. In **Expiration**, keep the default of **90 days** or [choose another option](#expiration).
1. Optionally, [limit the token's permissions](/account/api-tokens/limited-permissions).
1. Select **Create**.
1. Copy the token and store it somewhere safe, such as a password manager. Apify Console shows the token only this once.
1. Select **Done**.

If you lose a token, [rotate it](#rotation) to get a new value, or create a new token and delete the old one. You can delete any token, including your last one.

## Expiration

A token you create in Apify Console expires after 90 days unless you choose otherwise. An expired token stops working, which limits the damage if the token leaks. In the **Expiration** field of the token form, choose one of these options:

- If you choose **7 days**, **30 days**, **90 days**, or **365 days**, the token lasts that many full days and then expires at the next 00:00 UTC. A 90-day token therefore lasts between 90 and 91 days.
- If you choose **Custom date**, the token expires at 00:00 UTC at the start of the day you pick.
- If you choose **No expiration**, the token works until you delete or rotate it.

The token list shows the exact time each token expires, for example `Expires on February 15, 2027, 00:00 UTC`. To change the expiration of an existing token, edit the token and pick a new date, or clear the date to remove the expiration.

The 90-day default applies only to the token form. A token that `apify login` creates has no expiration.

## Rotation

If you suspect that a token is compromised or exposed, you can rotate it in Apify Console. Apify Console creates the new token right away. When you rotate a token, you can keep the old token active for 24 hours. Update every application that uses the old token before then, because after the 24 hours it stops working.

After you confirm the rotation, Apify Console shows the new token. This is the only time you can copy it, so store it somewhere safe. The new token has no [expiration](#expiration), even if the old one had. To set an expiration, edit the token and pick a date.

Apify Console marks tokens identified as compromised with a **Leaked** label, so that you can find them and act on them.

## Limited permissions

By default, a token can access all data in your account. To restrict a token to the data that a particular use case needs, limit its permissions when you create or edit the token. For the permission types, how they affect Actor runs, schedules, and webhooks, and troubleshooting, see [API tokens with limited permissions](/account/api-tokens/limited-permissions).

## Organization accounts

When you work under an organization account, the API & Integrations page shows two types of API tokens.

Personal API tokens in an organization are separate from the tokens of your personal account. If you use a personal token in an integration, it has the same permissions that you have within the organization. Apify ascribes every operation you use it for to you. When you join or create an organization, Apify creates one personal token for you in that organization. This token has no expiration. A personal token stops working when you leave the organization.

Organization API tokens have full permissions and are not tied to a specific member of the organization. You can access them only if you are the owner or have the **Manage access tokens** permission.

## Good practices

Treat an API token like a password:

- Use a separate token for each service, as you would use a separate password for each account.
- Give each token a name that says where you use it.
- [Limit the token's permissions](/account/api-tokens/limited-permissions) to what the service needs.
- Keep an [expiration](#expiration) on tokens you share with third-party services or use for temporary access.
- [Rotate](#rotation) a token as soon as you suspect it's exposed.
