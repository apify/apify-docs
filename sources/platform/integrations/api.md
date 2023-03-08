---
title: API
description: Learn how to integrate with Apify via API
sidebar_position: 11.01
slug: /integrations/api
---

# API integrations

The API is well described in API Reference. If you want to access API from browser or Node.js, we recommend to use `apify-client` npm package. If from Python, we recommend `apify-client` PyPI package. You are not limited to those packages, any HTTP client can be used (`axios`, `curl`, `wget` ...).

For the details of specific endpoints, see API reference.

## API token

To access our API in your integrations, you will need to use your secret API token. You can find it on the [Integrations](https://console.apify.com/account?tab=integrations) page in the Apify Console. Give your token a reasonable description and never use one token for several services, much like you shouldn't use the same password for different accounts.

![Integrations page in the Apify Console](./images/api-token.png)

> When providing your API authentication token, we recommend using the request's `Authorization` header, rather than the URL. ([More info](#introduction/authentication)).

**IMPORTANT**: **Do not share the API token with untrusted parties, or use it directly from client-side code,
unless you fully understand the consequences!**

Note that some API endpoints, such as [Get list of keys](/api/v2#/reference/key-value-stores/key-collection/get-list-of-keys),
do not require an authentication token because they contain a hard-to-guess identifier that effectively serves as an authentication key.

### API tokens in organization accounts

 > This information is only relevant to members or owners of organization accounts.

When working under organization account, you will see two types of API tokens in the Integrations page.

![Integrations page in the Apify Console in organizatoin mode](./images/api-token-organization.png)

The Personal API tokens are different than your own Personal API tokens mentioned above. If you use this token in an integration, it will have the same permissions you do within the organization and all the operations you use it for will be ascribed to you.

On the other hand the Organization API tokens (only visible if you are the owner or have Manage access tokens permission) have full permissions and are not tied to a specific member of the organization.
