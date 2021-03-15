---
title: Setup
description: Configure your organization account by inviting new members and assigning their roles. Manage team members' access permissions to the organization's resources.
menuWeight: 1
paths:
    - access-rights/organization-account/setup
---

# Setup

Once you have created your organization, you can customize it. Under the **Settings** tab, you can set the organization's email address, owner, or delete the account. The **Profile** tab allows you to update your organization's name or set a custom profile image.

**[See our video tutorial](https://www.youtube.com/watch?v=BIL6HqtnvKk) on organization accounts.**

## [](#add-users-to-your-organization) Add users to your organization

You can add members to your organization in the **Members** tab. You can use their **User ID**, **username** or **email**. When adding a member to the organization, you must assign them a **Role** so their permissions are known right away.

The **Members** tab allows you to view and manage your organization's members and transfer the organization's membership.

![Organization members]({{@asset access_rights/images/members.png}})

## [](#define-roles-and-permissions) Define roles and permissions

Roles allow you to define permissions to your organization's resources by group. Every new organization comes with three pre-defined roles, which you can customize or remove.

To edit the permissions for each role, click on the **Configure permissions** button in the top-right corner.

![Organization roles]({{@asset access_rights/images/roles.png}})

> Each member can only have one role to avoid conflicting permissions.

You can configure individual permissions for each resource type such as actors, actor tasks or storage. Bear in mind that if a user has the **read** permission for [storages]({{@link storage.md}}), you cannot prevent them from accessing a particular storage (e.g. a certain [dataset]({{@link storage.md}})) - they will have access to all of the organization's storages.

**Some permissions have dependencies**. For example, if someone has the **actor run** permission, it is likely they will also need the **storage write** permission, so they can store the results from their actor runs.

![Configure permissions]({{@asset access_rights/images/configure-permissions.png}})

[See the full list of permissions]({{@link access_rights/list_of_permissions.md}}) that can be granted to Apify resources.

