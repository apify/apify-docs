---
title: How to use
description: Learn to use and manage your organization account using the Apify app or API. View the organizations you are in and manage your memberships.
paths:
    - access-rights/organization-account/how-to-use
---

# Using the organization account

Once an account becomes an organization, you can no longer log into that account. Instead, you can switch into that account using the [Apify app](https://my.apify.com/account) to manage account information, memberships and actor runs.

While you can't manage an organization account via [API](https://docs.apify.com/api/v2), you can still manage its runs and resources via API like you would with any other account.

## [](#in-the-apify-app) In the Apify app

You can switch into **Organization account** view using the account button in the top-right corner.

<<<**INSERT SCREENSHOT HERE**>>>

In the menu, the account you are currently using is displayed at the top, with all the accounts you can switch to displayed below. When you need to get back to your personal account, you can just switch right back to it–no need to log in and out.

The resources you can access and account details you can edit will depend on your [permissions]({{@link access_rights/list_of_permissions.md#user-permissions}}) in the organization.

> When switching between accounts, beware which account you start an actor run in. If you accidentally start an organization's actor run in your personal account, the run will be billed to your account (and vice versa).

### [](#manage-your-organizations) Manage your organizations

You can view and manage the organizations you are a member of from the **Organizations** tab in your [account page](https://my.apify.com/account#/organization).

<<<**INSERT SCREENSHOT**>>>

> If you want to leave an organization you own, you must first transfer ownership to someone else.

## [](#via-api) Via API

While you cannot manage an organization account's settings and members via API, you can access its actor and task runs, webhooks, schedules and storages just like you would with any other account.

For a detailed breakdown of all Apify API endpoints and help on using them, visit the API [documentation](https://docs.apify.com/api/v2).

notes:

as a member of a team, you're given your API token and proxy password, which are limited to your permissions in the org. These tokens are visible only to you and you can use them for any API-related tasks.

you get your tokens which let you do the stuff you're allowed to do in permissions

then, if you have the 'manage organization access keys' permission to manage organization tokens, you can see the org's organization-wide API tokens in the Integrations tab. They are shared across the organization, to anyone who has the permission 'manage organization access keys'.

then, you can make organization-wide integrations using those tokens.



