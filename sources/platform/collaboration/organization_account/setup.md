---
title: Setup
description: Configure your organization account by inviting new members and assigning their roles. Manage team members' access permissions to the organization's resources.
sidebar_position: 1
slug: /collaboration/organization-account/setup
---

# Setup

**Configure your organization account by inviting new members and assigning their roles. Manage team members' access permissions to the organization's resources.**

---

Once you have created your organization, you can customize it. Under the **Account** tab, you can set the organization's email address, username, security, or delete the account. The **Members** tab allows you to update your organization's members and set its owner.

In the **Account** tab's **Security** section, you can impose security requirements on organization members, such as their maximum session lifespan or whether they are required to turn on two-factor authentication.

**[See our video tutorial](https://www.youtube.com/watch?v=BIL6HqtnvKk) on organization accounts.**

## Add users to your organization {#add-users-to-your-organization}

You can add members to your organization in the **Members** tab. You can use their **User ID**, **username**, or **email**. When adding a member to the organization, you must assign them a **Role** so their permissions are known right away.

![Organization members](../images/organizations/members.png)

## Define roles and permissions {#define-roles-and-permissions}

Roles allow you to define permissions to your organization's resources by group. Every new organization comes with three pre-defined roles, which you can customize or remove.

To edit the permissions for each role, click on the **Configure permissions** button in the top-right corner.

![Organization roles](../images/organizations/roles.png)

> Each member can only have one role to avoid conflicting permissions.

You can configure individual permissions for each resource type such as Actors, Actor tasks or storage. Bear in mind that if a user has the **read** permission for [storages](../../storage/index.md), you cannot prevent them from accessing a particular storage (e.g. a certain [dataset](../../storage/index.md)) - they will have access to all of the organization's storages.

**Some permissions have dependencies**. For example, if someone has the **Actor run** permission, it is likely they will also need the **storage write** permission, so they can store the results from their Actor runs.

![Configure permissions](../images/organizations/configure-permissions.png)

[See the full list of permissions](../list_of_permissions.md) that can be granted to Apify resources.
