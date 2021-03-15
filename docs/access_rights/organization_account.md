---
title: Organization account
description: Create a specialized account for your organization to encourage collaboration and manage permissions efficiently. Convert an existing account or create one from scratch.
menuWeight: 12.1
paths:
    - access-rights/organization-account
---

# Organization account

> The organization account is only available to accounts using our [new billing system](https://blog.apify.com/launching-new-billing-system-3a26f8384a44). If you see the [migration message](https://blog.apify.com/launching-new-billing-system-3a26f8384a44#92f7) when you [log in](https://my.apify.com), you will need to migrate.
> ![Migration message]({{@asset access_rights/images/migration-message.png}})

Organization accounts allow groups to collaborate on projects. It enables you to manage your team members' [permissions]({{@link access_rights/list_of_permissions.md}}) and to centralize your billing without having to share the credentials of a single personal account.

You can [switch]({{@link access_rights/organization_account/how_to_use.md#in-the-apify-app}}) between your personal and organization accounts in just two clicks: in the [Apify app](https://my.apify.com), click the account button in the top-left corner, then select the organization.

You can set up an organization in two ways.

* [Create a new organization](#create-a-new-organization). If you don't have integrations set up yet, or if they are easy to change, you can create a new organization, preserving your personal account.
* [Convert an existing account](#convert-an-existing-account) into an organization. If your actors and [integrations]({{@link tutorials/integrations.md}}) are set up in a personal account, it is probably best to convert that account into an organization. This will preserve all your integrations but means you will have a new personal account created for you.

**[See our video tutorial](https://www.youtube.com/watch?v=BIL6HqtnvKk) on organization accounts.**

## [](#availability-and-pricing) Availability and pricing

The organization account is available on our Team, Business, and Custom plans. [Visit our pricing page](https://apify.com/pricing) for more information.

## [](#create-a-new-organization) Create a new organization

You can create a new organization by clicking the **Create new organization** button under the **Organizations** tab in your [account](https://my.apify.com/account#/myorganizations). If you want the organization to have a separate email address (used for notifications), enter it here. Otherwise, leave the **email** field empty and the owner's email will be used for notifications.

![Create a new organization]({{@asset access_rights/images/create-new-org.png}})

**You can own up to 5 and be a member of as many organizations as you need.**

## [](#convert-an-existing-account) Convert an existing account

> **When you convert an existing user account into an organization,**
>
> * **You will no longer be able to sign in to the converted user account.**
> * **An organization cannot be converted back to a personal account.**
> * **During conversion, a new account (with the same login credentials) will be created for you. You can then use that account to [set up]({{@link access_rights/organization_account/setup.md}}) the organization.**

Before converting your personal account into an organization, make sure it has a **username**.

An organization can't be a member of other organizations. If you want to convert your account to one, you'll first need to **leave all the organizations you are a part of**.

Then, under the **Organizations** [tab](https://my.apify.com/account#/myorganizations), click the **Convert this user account to an organization** button.

![Convert your account to an organization]({{@asset access_rights/images/convert-to-organization.png}})

Next, set the organization's name and click **Convert**.

And that's it! Your personal account becomes the organization and you will be logged out automatically. You can now log into your new personal account with the same credentials as you are currently logged in with. This applies to both **password** and **OAuth** methods.

For information on [adding members and assigning roles]({{@link access_rights/organization_account/setup.md}}), see the Setup page.

## [](#billing) Billing

Actor and task runs are billed to the account they are started from. **Always make sure you start your runs from the correct account** to avoid having an organization's runs billed to your personal account.

The Team plan is [restricted to 3 seats](https://apify.com/pricing), while the Business plan comes with 5, which you can increase later. If you are on the Business plan and want to add some more seats to the 5 it comes with, head over to your [Billing page and click on Subscriptions](https://my.apify.com/billing-new#/subscription). Click on **Upgrade**, and, in the **Add-ons** section, and add as many additional seats as you need. Then, just complete the upgrade process, and you're done.

![Adding more teams account seats]({{@asset access_rights/images/upgrade.png}})

To find out about organization pricing, get in touch at [support@apify.com](mailto:support@apify.com?subject=Organization%20account%20pricing) or [visit the pricing page](https://apify.com/pricing).

