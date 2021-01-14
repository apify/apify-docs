---
title: Organization account
description: Create a specialized account for your organization to encourage collaboration and manage permissions efficiently. Convert an existing account or create one from scratch.
menuWeight: 12.1
paths:
    - access-rights/organization-account
---

# Organization account

> The organization account is only available to accounts using our new billing system. If you see the migration message when you [log in](https://my.apify.com), you will need to migrate.

Apify's organization account allows groups to collaborate on projects. It enables you to manage your team members' [permissions]({{@link access_rights/list_of_permissions.md}}) and to centralize your billing.

At the same time, a separate organization account means teams no longer have to share the credentials of a single personal account. You can [switch]({{@link access_rights/organization_account/how_to_use.md#in-the-apify-app}}) between your personal and organization accounts in just two clicks: click on your **username** in the top-right corner, then select the organization.

You can start an organization account in two ways.

* [Convert an existing account](#convert-an-existing-account) into an organization. If your actors and [integrations]({{@link tutorials/integrations.md}}) are set up in a personal account, it is probably best to convert that account into an organization. This will preserve all your integrations but means you will need a new personal account.
* [Create a new organization](#create-a-new-organization). If you don't have integrations set up yet, or if they are easy to change, you can create a new organization, preserving your personal account.

## [](#availablity-and-pricing) Availability and pricing

The organization account is available on our Team, Business, and Custom plans. [Visit our pricing page](https://apify.com/pricing) for more information.

## [](#create-a-new-organization) Create a new organization

You can create a new organization by clicking the **Create new organization** button under the **Organizations** tab in your [account](https://my.apify.com/account#/myorganizations).

![Create a new organization]({{@asset access_rights/images/my-organizations-new.png}})

**You can own as many organizations and be a member of as many organizations as you need.**

## [](#convert-an-existing-account) Convert an existing account

> **When you convert an existing user account into an organization,**
>
> * **You will no longer be able to sign in to the converted user account.**
> * **An organization cannot be converted back to a personal account.**
> * **During conversion, a new account (with the same login credentials) will be created for you. You can then use that account to [set up]({{@link access_rights/organization_account/setup.md}}) the organization.**
> * **An organization can't be a member of other organizations. If you want to convert your account to one, you'll first need to leave all the organizations you are a part of**.

Before converting your personal account into an organization, make sure it has a **username**.

Then, under the **Organizations** [tab](https://my.apify.com/account#/myorganizations), click the **Convert this user account to an organization** button.

![Convert your account to an organization]({{@asset access_rights/images/convert-to-organization.png}})

Next, set the organization's name and click **Convert**.

And that's it! Your personal account becomes the organization and you will be logged out automatically. You can now log into your new personal account with the same credentials as before.

For information on adding members and assigning roles, see the [Setup]({{@link access_rights/organization_account/setup.md}}) page.

## [](#billing) Billing

Actor and task runs are billed to the account they are started from. Always **make sure you start your runs from the correct account** to avoid having an organization's runs billed to your personal account.

To find out about organization pricing, please get in touch at [support@apify.com](mailto:support@apify.com?subject=Organization%20account%20pricing).

