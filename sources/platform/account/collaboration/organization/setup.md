---
title: Setup
description: Configure your organization account by inviting new members and assigning their roles. Manage team members' access permissions to the organization's resources.
sidebar_position: 1
slug: /account/collaboration/organization/setup
---

After creating your organization, you can configure its settings. The **Account** tab allows you to:

- Set the organization's email address
- Change the username
- Delete the account.

The **Members** tab lets you update your organization's members and set its owner.

In the **Security & Privacy** tab, you can set security requirements for organization members. These include:

- Maximum session lifespan
- Two-factor authentication requirement

**[See the video tutorial](https://www.youtube.com/watch?v=BIL6HqtnvKk) on organization accounts.**

## Add users to your organization

You can add members to your organization in the **Members** tab. You can use their **User ID**, **username**, or **email**. When adding a member to the organization, you must assign them a **Role** so their permissions are known right away.

![Organization members](../images/organizations/members.png)

## Define roles and permissions

Roles allow you to define permissions to your organization's resources by group. Every new organization comes with three pre-defined roles, which you can customize or remove.

To edit the permissions for each role, click on the **Configure permissions** button in the top-right corner.

![Organization roles](../images/organizations/roles.png)

> Each member can only have one role to avoid conflicting permissions.

You can configure individual permissions for each resource type such as Actors, Actor tasks or storage. Bear in mind that if a user has the **read** permission for [storages](/storage), you cannot prevent them from accessing a particular storage (e.g. a certain [dataset](/storage)) - they will have access to all of the organization's storages.

**Some permissions have dependencies**. For example, if someone has the **Actor run** permission, it is likely they will also need the **storage write** permission, so they can store the results from their Actor runs.

![Configure permissions](../images/organizations/configure-permissions.png)

[See the full list of permissions](../list_of_permissions.md) that can be granted to Apify resources.

## Transfer ownership

Each organization has one owner, who has full access to it.

To change the owner of an organization, you need the **Manage organization** permission. The new owner needs an Apify account with a verified email. They don't have to be a member of the organization yet.

To transfer ownership:

1. In [Apify Console](https://console.apify.com), switch into the organization.
1. In the left-side panel, go to **Settings**.
1. Select the **Members** tab.
1. Next to the owner, select **Transfer ownership**.
1. In **New owner**, enter the new owner's user ID, username, or email.
1. In **New role for previous owner**, choose a role for the previous owner. To remove them from the organization, select **None, previous owner is leaving the organization**.
1. Follow the instructions to confirm the transfer.
