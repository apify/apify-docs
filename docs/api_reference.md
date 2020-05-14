---
title: API reference
description: Documentation of Apify REST API that enables integration with external applications and systems.
menuWeight: 10
paths:
    - api
    - api-reference
---

# [](./api)API

Yeah, you guessed right - Apify also has its own API to enable programmatic access to the platform. Apify API is organized around [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) HTTP endpoints. Both requests and responses (including errors) are encoded in [JSON](https://www.json.org) format with UTF-8. All API endpoints run on the host `api.apify.com`.

Note that you can find API endpoints related to specific sections of the app in the API tab, if available. For example, see the [API tab](https://my.apify.com/actors#/api) on the actor list page.

**IMPORTANT: All requests with JSON payloads need to specify the `Content-Type: application/json` HTTP header or they will not work!**

For JavaScript / Node.js applications, the easiest way to access the Apify API is using the [`apify-client`](https://docs.apify.com/api/apify-client-js/latest) NPM package.

## [](#api-reference)API reference

The latest version of the API used to manage [Apify actors]({{@link actors.md}}) and associated resources. The API enables you to manage:

*   List actors and actor tasks, view and update their settings
*   Run and stop actors and actor tasks
*   Manage storage - key-value stores, datasets and request queues
*   Manage webhooks
*   View user information
*   Download logs

[View API reference](https://docs.apify.com/api/v2)

