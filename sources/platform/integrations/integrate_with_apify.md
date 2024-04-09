---
title: Integrate with Apify 🤝
sidebar_label: Integrate with Apify
description: Learn about how to integrate your service with Apify to benefit from a mutual integration.
sidebar_position: 90.00
slug: /integrations/integrate
---

If you are building a service and your users could benefit from integrating with Apify or wise-versa, we would love to hear from you! Contact us at [partners@apify.com](mailto:partners@apify.com) to discuss potential collaboration. We are always looking for ways to make our platform more useful and powerful for our users. Here are some examples of services and tools integrating with Apify:

- [Langchain](./langchain.md) integration enables developers building their projects, such as AI chatbots, with Langchain to easily feed them with data from the web.
- [Zapier](./zapier.md) integration allows Zapier users to enrich their automation workflows with data from the web or to add additional Actions performed by [Apify Actors](https://apify.com/store).
- [Keboola]('./keboola.md') integration enables Keboola users to easily pull data crawled from the web into their data pipelines.
- ...and many more that you can see at [integrations]('./index.md').

## Integrating with Apify

There are 2 ways how you can integrate your service with Apify. You can either build an [Apify actor](https://apify.com/docs/actor) that will be used as integration within the [Apify Console]('https://console.apify.com') or you build an external integration, such as [Zapier](./zapier.md).

![Integration-ready Actors](./images/integration-ready-actors.png)

### Building an integration Actor

The best how to reach out to Apify users is directly within [Apify Console]('https://console.apify.com'). To do that you need to build integrable Actor that can be piped into other Actors to, for example, upload existing data into a database. This can be then easily configured within Apify Console. Follow the [guide on building integration-ready Actors](./actors/integration_ready_actors.md).

### Building an external integration

Alternatively, you can let your users manage the connection directly on your side using [Apify API](https://docs.apify.com/api/v2) and our API clients for [JavaScript](/api/client/js/) or [Python](/api/client/python/). This way, you can provide a seamless experience for your users and let them manage the connection directly from your service.

For inspiration take a look at the public repositories of our existing external integrations [Zapier](https://github.com/apify/apify-zapier-integration) or [Keboola](https://github.com/apify/keboola-ex-apify) both done in JavaScript or [Aitbyte](https://github.com/airbytehq/airbyte/tree/master/airbyte-integrations/connectors/source-apify-dataset) written in Python.

![Airbyte sources tab](./images/airbyte-sources-web.png)
