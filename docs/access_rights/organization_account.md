---
title: Organization account
description: Create a specialized account for your team to encourage collaboration and manage permissions efficiently. Convert an existing account or create one from scratch.
menuWeight: 8.1
paths:
    - access-rights/organization-account
---

# Organization account

Apify's organization account allows you to keep your business account separate from your personal account. It enables you to manage your team members' [permissions]({{@link access_rights/list_of_permissions.md}}) and to centralize your billing.

At the same time, a shared organization account means teams no longer have to share the credentials of a single personal account. You can [switch]({{@link access_rights/organization_account/how_to_use.md#in-the-apify-app}}) between your personal and organization accounts seamlessly in just two clicks.

You can start an organization account in two ways.
* [Convert an existing account](#convert-an-existing-account) into an organization. If your codebase is already established in a personal account, it is probably best to convert that account into an organization. This will preserve all your integrations but means you will need a new personal account.
* [Create a brand-new account](#create-a-new-organization). If you don't have integrations set up yet, or if they are easy to change, you can create a new organization, preserving your personal account.

> Any account can be converted into an organization. However, this option is only available on our **[[SPECIFY PLAN HERE]]** plan(s).

## [](#create-a-new-organization) Creating a new organization

<< **I will add this section when the UI is done, to avoid guessing and redoing it**>>

<< **It will just be a simple step-by-step tutorial** >>

In the user selection menu in the top-right corner, select the **Create a new organization** option.

<**screenshot**>

## [](#convert-an-existing-account) Convert an existing account

> **Warning: when you convert an existing user account into an organization,**
>  * **You will no longer be able to sign in to the converted user account.**
>  * **An organization cannot be converted back to a personal account.**
>  * **When converting or creating the account, you select an owner who will be responsible for [setting up]({{@link access_rights/organization_account/setup.md}}) the organization.**

Before converting your current user account into an organization, create a new personal account for the organization's owner.

> An organization can't be a member of other organizations. If you want to convert your account to an organization, you'll first need to leave all the teams you are a part of.

Then, in the **Organization** tab of the soon-to-be organization [account](https://my.apify.com/account#/organization), click the **Convert your user account to an organization** button.

Next, set the organization's name and designate an owner (this can be your new personal account) who will [set up]({{@link access_rights/organization_account/setup.md}}) the organization.

![Convert your account to an organization]({{@asset access_rights/images/convert_to_organization.png}})

And that's it! Welcome to your new organization account. For information on adding members and assigning roles, see the [Setup]({{@link access_rights/organization_account/setup.md}}) page.

## [](#billing) Billing

Actor and task runs are billed to the account they are started from. Always make sure you start a run from the correct account to avoid having an organization's runs billed to your personal account.

**CLARIFY THIS**
<!-- The organization account functions on a **pay-per-seat** basis. The basic plan will allow teams of up to 5 members. -->

<!-- 'pay per seat' - pay for each person (new billing) until new billing, will limit to 5 users or so -  apply for a custom plan to get higher (not sure, leave for later) -->
