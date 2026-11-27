---
title: API integration
description: Use the Apify REST API to control all platform features from your code. Authenticate with an API token and use official JavaScript or Python clients.
sidebar_label: API integration
slug: /integrations/api
---

All aspects of the Apify platform can be controlled via a REST API, which is described in detail in the [**API Reference**](/api/v2).
If you want to use the Apify API from JavaScript/Node.js or Python, we strongly recommend using one of the API clients:

- [**apify-client**](/api/client/js/) `npm` package for JavaScript, supporting both browser and server
- [**apify-client**](/api/client/python/) PyPI package for Python.

You don't have to use those packages, because the REST API works with any HTTP client. The official API clients implement best practices such as exponential backoff and rate limiting.

## API token

To access the Apify API in your integrations, you need to authenticate using your secret API token. To create a token, set its expiration, rotate it, or limit its permissions, see [API tokens](/account/api-tokens).

## Authentication

You can authenticate the Apify API in two ways. You can either pass the token via the `Authorization` HTTP header or the URL `token` query parameter. We always recommend you use the authentication via the HTTP header as this method is more secure.

Note that some API endpoints, such as [Get list of key-value store keys](/api/v2/key-value-store-keys-get),
do not require an authentication token because they contain a hard-to-guess identifier that effectively serves as an authentication key.
