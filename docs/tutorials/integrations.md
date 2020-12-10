---
title: Integrations
description: Learn how to connect the Apify platform with your projects. You can use our tools in cloud services like Zapier, Integromat, Keboola, and many more.
menuWeight: 3.3
paths:
    - tutorials/integrations
---

# Integrations

You can connect Apify with practically any cloud service or web app. They allow you to pass your [actor]({{@link actors.md}}) run results to other services, process them, and receive notifications on important events.

## [](#what-are-software-integrations) What are software integrations?

Most applications are not connected to each other. All their processes and data are separate and unable to communicate. Integration allows you to combine two separate applications and take advantage of their combined capabilities.

## [](#how-do-integrations-work) How do integrations work?

Integrations use [APIs](/api/v2#) and [webhooks]({{@link webhooks.md}}) to transfer data between applications.
Our [RESTful API](https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/) allows you to control the Apify platform from any application.
You can create [actors](/api/v2#/reference/actors/actor-collection/create-actor) and [tasks](/api/v2#/reference/actor-tasks/task-collection/create-task),
[start and stop your runs](/api/v2#/reference/actor-tasks/run-task-synchronously/run-task-synchronously-(post)),
and [manage your data](/api/v2#/reference/datasets/item-collection/put-items) using only HTTP requests (or our handy [API client]({{@link apify_client_js.md}})). Meanwhile, webhooks allow you to perform tasks like sending a HTTP request or notification on certain [events]({{@link webhooks/events.md}}).

## [](#get-started) Get started

Below are some examples of the kind of integrations you can set up with Apify.

- [Zapier](https://zapier.com/apps/apify/integrations). See the [tutorial](https://help.apify.com/en/articles/3034235-getting-started-with-apify-integration-for-zapier).

- [Integromat](https://integromat.com/en/integrations/apify).

- [Keboola](https://components.keboola.com/components/apify.apify). See the [tutorial](https://help.apify.com/en/articles/2003234-keboola-integration).

- [Google](https://google.com). See the [tutorial](https://help.apify.com/en/articles/2424053-google-integration).

## [](#api-token) API token

To access our API in your integrations, you will need to use your secret API token. You can find it on the [Integrations](https://my.apify.com/account#/integrations) page in the Apify app.

![Integrations page in the Apify app]({{@asset tutorials/images/api-token.png}})

Add the secret API token to your request URL as the `token` query parameter.

```cURL
https://api.apify.com/v2/acts?token=[YOUR_TOKEN]
```

**IMPORTANT**: **Do not share the API token with untrusted parties, or use it directly from client-side code,
unless you fully understand the consequences!**

Note that some API endpoints, such as [Get list of keys](#reference/key-value-stores/key-collection/get-list-of-keys),
do not require an authentication token because they contain a hard-to-guess identifier that effectively serves as an authentication key.
