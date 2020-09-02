---
title: Organization account
description: Create a specialized account for your organization to encourage collaboration and manage permissions efficiently. Convert an existing account or create one from scratch.
menuWeight: 8.1
paths:
    - access-rights/organization-account
---

# Organization account

> **Warning** <br/>
> The organization account is currently in the **closed beta testing** stage and available only to users with [**business**](https://apify.com/pricing) or higher subscriptions.<br/>
> If you are interested in joining the closed beta testing, contact us at [support@apify.com](mailto:support@apify.com?subject=Organization%20account%20beta%20testing).

Apify's organization account allows multiple team members to collaborate on projects. It enables you to manage your team members' [permissions]({{@link access_rights/list_of_permissions.md}}) and to centralize your billing.

At the same time, a separate organization account means teams no longer have to share the credentials of a single personal account. You can [switch]({{@link access_rights/organization_account/how_to_use.md#in-the-apify-app}}) between your personal and organization accounts seamlessly in just two clicks.

You can start an organization account in two ways.
* [Convert an existing account](#convert-an-existing-account) into an organization. If your actors and integrations are set up in a personal account, it is probably best to convert that account into an organization. This will preserve all your integrations but means you will need a new personal account.
* [Create a brand-new account](#create-a-new-organization). If you don't have integrations set up yet, or if they are easy to change, you can create a new organization, preserving your personal account.

## [](#create-a-new-organization) Creating a new organization

> **Warning**: the organization account is under closed beta testing. If you'd like to try it, contact us at [support@apify.com](mailto:support@apify.com?subject=Organization%20account%20beta%20testing).

You can create a new organization by clicking the **Create a new organization** button under the **My organizations** tab in your [account](https://my.apify.com/account?redirect=/account#/myorganizations).

![Create a new organization]({{@asset access_rights/images/my-organizations-new.png}})

> You can own as many organizations and be a member of as many organizations as you need.

An organization needs its own email account for receiving notifications, invoices, etc. If your email provider supports it, you can set up an [email alias](https://support.cloudhq.net/how-to-setup-gmail-aliases/), so the organization's emails get redirected to your email address.

## [](#convert-an-existing-account) Convert an existing account

> **Warning: when you convert an existing user account into an organization,**
>  * **You will no longer be able to sign in to the converted user account.**
>  * **An organization cannot be converted back to a personal account.**
>  * **When converting or creating the account, you select an owner who will be responsible for [setting up]({{@link access_rights/organization_account/setup.md}}) the organization.**

Before converting your current user account into an organization, create a new personal account for the organization's owner.

> An organization can't be a member of other organizations. If you want to convert your account to an organization, you'll first need to leave all the organizations you are a part of.

Then, under the **Settings** tab of the soon-to-be organization [account](https://my.apify.com/account), click the **Convert your account to an organization** button.

![Convert your account to an organization]({{@asset access_rights/images/convert-to-organization.png}})

Next, set the organization's name and designate an owner (this can be your new personal account) who will [set up]({{@link access_rights/organization_account/setup.md}}) the organization.

And that's it! You will be logged out from your user account (which has become the organization), so you'll need to log in as the organization's owner.

Welcome to your new organization account. For information on adding members and assigning roles, see the [Setup]({{@link access_rights/organization_account/setup.md}}) page.

## [](#billing) Billing

Actor and task runs are billed to the account they are started from. Always make sure you start a run from the correct account to avoid having an organization's runs billed to your personal account.

To find out about organization pricing, please get in touch at [support@apify.com](mailto:support@apify.com?subject=Organization%20account%20pricing).
