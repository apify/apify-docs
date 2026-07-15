---
title: Organization account
description: Create a specialized account for your organization to encourage collaboration and manage permissions. Convert an existing account, or create one from scratch.
sidebar_position: 12.1
slug: /account/collaboration/organization
---

Organization accounts allow groups to collaborate on projects. It enables you to manage your team members' [permissions](../list_of_permissions.md) and to centralize your billing without having to share the credentials of a single personal account.

You can [switch](./how_to_use.md) between your personal and organization accounts in just two clicks: in [Apify Console](https://console.apify.com), click the account button in the top-left corner, then select the organization.

You can set up an organization in two ways:

- [Create a new organization](#create-a-new-organization). If you don't have integrations set up yet, or if they are easy to change, you can create a new organization, preserving your personal account.
- [Convert an existing account](#convert-an-existing-account) into an organization. If your Actors and [integrations](/integrations) are set up in a personal account, it is probably best to convert that account into an organization. This will preserve all your integrations but means you will have a new personal account created for you.

Prefer video to reading? [See the video tutorial](https://www.youtube.com/watch?v=BIL6HqtnvKk) for organization accounts.

## Availability and pricing

The organization account is available on all plans. [Visit the pricing page](https://apify.com/pricing) for more information.

## Create an organization

To create an organization account:
<!-- vale off -->
1. Log in to [Apify Console](https://console.apify.com).
1. In the left-side panel, go to **Settings**.
1. Select the **Organizations** tab.
1. In **My organizations**, select **Create a new organization**.
1. Complete the following information:
   - Organization name
   - Organization username
   - Organization email _(optional)_ – a dedicated email address for notifications. To use the owner's email address instead, leave this field empty.
<!-- vale on -->
You can create up to 10 organizations and be a member of as many organizations as you need.

## Convert an existing account

When you convert an existing user account into an organization:

- You won't be able to sign in to the converted account.
- An organization cannot be converted back to a personal account.
- During conversion, a new account with the same login credentials is created for you. You can then use that account to [set up the organization](./setup.md).

Before converting your personal account into an organization, make sure it has a username.

You can't convert your account to an organization while you're on the Creator plan. Upgrade to a different plan to continue.

An organization can't be a member of other organizations. If you want to convert your account to one, you'll first need to **leave all the organizations you are a part of**.

Then, under the **Organizations** [tab](https://console.apify.com/settings/organizations), click the **Convert this user account to an organization** button.

Next, enter an organization name and select **Convert**.

The name you enter becomes the organization's display name. The original account **username** stays the same, so any public Actors or API references (for example, `my_profile/my_actor`) keep their existing URLs. A new personal account is created for you with the same login credentials and a username based on your original username with `-owner` added (for example, `my_profile-owner`). This applies to both **password** and **OAuth** methods. You'll use this new personal account to manage and own the organization.

And that's it! Your personal account becomes the organization, and you will be logged out automatically.

For information on [adding members and assigning roles](./setup.md), see the Setup page.

## Billing {#billing}

Actor and task runs are billed to the account they are started from. **Always make sure you start your runs from the correct account** to avoid having an organization's runs billed to your personal account.

To learn about organization pricing, [contact support](http://apify.com/contact) or [visit the pricing page](https://apify.com/pricing).
