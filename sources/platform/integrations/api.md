---
title: API
description: Learn how to integrate with Apify via API
sidebar_position: 11.01
slug: /integrations/api
---

# API integrations

The API is well described in api docs.

## API token

To access our API in your integrations, you will need to use your secret API token. You can find it on the [Integrations](https://console.apify.com/account?tab=integrations) page in the Apify Console. Give your token a reasonable description and never use one token for several services, much like you shouldn't use the same password for different accounts.

![Integrations page in the Apify Console](./images/api-token.png)

> When providing your API authentication token, we recommend using the request's `Authorization` header, rather than the URL. ([More info](#introduction/authentication)).

**IMPORTANT**: **Do not share the API token with untrusted parties, or use it directly from client-side code,
unless you fully understand the consequences!**

Note that some API endpoints, such as [Get list of keys](#reference/key-value-stores/key-collection/get-list-of-keys),
do not require an authentication token because they contain a hard-to-guess identifier that effectively serves as an authentication key.
