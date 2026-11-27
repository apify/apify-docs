---
title: Use the organization account
description: Learn how to use your organization account with Apify Console. Use organization API tokens and proxy passwords to connect from code and integrations.
sidebar_position: 2
slug: /account/collaboration/organization/how-to-use
sidebar_label: Usage
---

After you turn an account into an organization, you can no longer log into it. Instead, you can switch into the organization from one of its member accounts to manage account information, memberships, and Actor runs.

The resources you can access and account details you can edit depend on your [permissions in the organization](/account/collaboration/list-of-permissions#organization).

## View organizations

To view the organizations you belong to:

1. Log in to [Apify Console](https://console.apify.com).
1. In the left-side panel, go to **Settings**.
1. Select the **Organizations** tab.

### Switch between accounts

You can switch between your personal account and organizations you belong to without logging out of Apify Console.

To switch between accounts, select your account name and use the dropdown menu.

:::caution Check the active account before you start a run

Actor and task runs are billed to the account that's active when you start them.

:::

## Connect from code and integrations

Use the API to access organization's Actor and task runs, webhooks, schedules, and storages. You can't manage an organization's settings or members through the API.

Never share your API tokens or passwords.

### API tokens

To view the organization's API tokens:

1. In [Apify Console](https://console.apify.com), switch into the organization.
1. In the left-side panel, go to **Settings**.
1. Select the **API & Integrations** tab.

There are two kinds of API tokens:

| Token | Access | Usage |
| --- | --- | --- |
| Personal API tokens | Only you can see your token. Limited to your permissions in the organization. Stops working when you leave the organization. | Development and testing |
| Organization API tokens | All members with the **Manage access tokens** permission can see it. Grants full API access to the organization. | Shared integrations. |

### Proxy passwords

To view the organization's proxy passwords:

1. In [Apify Console](https://console.apify.com), switch into the organization.
1. In the left-side panel, go to **Proxy**.
1. Select the **HTTP settings** tab.

There are two types of passwords:

- Member password that only you can see.
- Organization password that all members with the **Manage access tokens** permission can see. Use it for shared integrations.

The organization pays for all Apify Proxy usage with these passwords.

To reset a password, select **Reset** next to it. The old password stops working immediately, so update every code, integration, or Actor input that uses it.

## Leave an organization

To leave an organization:

1. Log in to [Apify Console](https://console.apify.com).
1. In the left-side panel, go to **Settings**.
1. Select the **Organizations** tab.
1. In **My organizations**, select **Leave organization** next to the organization you want to leave.

To leave an organization that you own, first [transfer ownership](/account/collaboration/organization/setup#transfer-ownership) to another member.
