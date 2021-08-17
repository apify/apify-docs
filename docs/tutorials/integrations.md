---
title: Integrations
description: Learn how to connect the Apify platform with your projects. You can use our tools in cloud services like Zapier, Integromat, Keboola, and many more.
menuWeight: 3.3
paths:
    - tutorials/integrations
---

# Integrations

You can connect Apify with practically any cloud service or web app. They allow you to pass your [actor]({{@link actors.md}}) run results to other services, process them, and receive notifications on important events.

## [](#what-is-software-integration) What is software integration?

Integration allows you to combine separate applications and take advantage of their combined capabilities. It allows you to combine the abilities of applications that are not directly linked. This helps to free your data from isolation and make it more productive.

## [](#how-does-integration-work) How does integration work?

Integrations use [APIs](https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/) and [webhooks]({{@link webhooks.md}}) to transfer data between applications.
Our [RESTful API](/api/v2#) allows you to control the Apify platform from any application.
You can create [actors](/api/v2#/reference/actors/actor-collection/create-actor) and [tasks](/api/v2#/reference/actor-tasks/task-collection/create-task),
[start and stop your runs](/api/v2#/reference/actor-tasks/run-task-synchronously/run-task-synchronously-(post)),
and [manage your data](/api/v2#/reference/datasets/item-collection/put-items) using only HTTP requests (or our handy API clients [for JavaScript]({{@link apify_client_js.md}}) and [for Python]({{@link apify_client_python.md}})).
Meanwhile, webhooks allow you to perform tasks like sending HTTP requests or notifications when certain [events]({{@link webhooks/events.md}}) occur.

## [](#get-started) Get started

Below are some examples of the kind of integrations you can set up with Apify.

- [Zapier](https://zapier.com/apps/apify/integrations). See the [tutorial](https://help.apify.com/en/articles/3034235-getting-started-with-apify-integration-for-zapier).

- [Google](https://google.com). See the [tutorial](https://help.apify.com/en/articles/2424053-google-integration).

- [Keboola](https://components.keboola.com/components/apify.apify). See the [tutorial](https://help.apify.com/en/articles/2003234-keboola-integration).

- [Integromat](https://integromat.com/en/integrations/apify).

- [Airbyte](https://docs.airbyte.io/integrations/sources/apify-dataset).

## [](#api-token) API token

To access our API in your integrations, you will need to use your secret API token. You can find it on the [Integrations](https://my.apify.com/account#/integrations) page in the Apify app.

![Integrations page in the Apify app]({{@asset tutorials/images/api-token.webp}})

> When providing your API authentication token, we recommend using the request's `Authorization` header, rather than the URL. ([More info](#introduction/authentication)).

**IMPORTANT**: **Do not share the API token with untrusted parties, or use it directly from client-side code,
unless you fully understand the consequences!**

Note that some API endpoints, such as [Get list of keys](#reference/key-value-stores/key-collection/get-list-of-keys),
do not require an authentication token because they contain a hard-to-guess identifier that effectively serves as an authentication key.
