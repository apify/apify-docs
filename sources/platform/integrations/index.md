---
title: Integrations
description: Learn how to connect the Apify platform with your projects. You can use our tools in cloud services like Zapier, Make (formerly Integromat), Keboola, and more.
sidebar_position: 11
category: platform
slug: /integrations
---

# Integrations

**Learn how to connect the Apify platform with your projects.**

 > The whole is greater than the sum of its parts.
 >
 > *Aristotle*

Integration allows you to combine separate applications and take advantage of their combined capabilities. It allows you to combine the abilities of applications that are not directly linked. This helps to free your data from isolation and make it more productive. That’s why we made Apify in a way that allows you to connect it with practically any cloud service or web app - and make it part of your larger projects.

Apify‘s RESTful API allows you to interact with platform programmatically and HTTP webhooks notify you when important events happen.

## API and webhooks

API and webhooks are useful when you either need something very simple or very custom. If you just need to let your app know that run has finished, it’s easy to set up a HTTP request (webhook) and let your app react on that. And if you need to get some other data from platform, start actor runs, or basically anything else you can do in platform UI, you can use any HTTP client to do that (we have handy API clients for Javascript and for Python). You can even set up the webhooks via API.

- [API](./integrations/api)
- [Webhooks](./integrations/webhooks)

## Built-in integrations

Apify offers easy to set up solutions for common scenarios. Like uploading your datasets to Google Drive when run succeeds, or creating an issue on Github when it fails.

- [Slack](./integrations/slack)
- [Drive](./integrations/drive)
- [Github](./integrations/github)
- [Gmail](./integrations/gmail)

## Complex integrations

For more complicated integrations we recommend using our connectors / components / nodes for common integration services.

- [Make](./integrations/make)
- [Zapier](./integrations/zapier)
- [Transposit](./integrations/transposit)

## ETL tools with Apify support

Some ETL tools offer connectors for Apify, which make it possible to use Apify datasets as data sources.

- [Keboola](./integrations/keboola)
- [Airbyte](./integrations/airbyte)
- [Hevo](./integrations/hevo)

## Workarounds? Other materials?

Not sure what to do with those:

- [Google](https://help.apify.com/en/articles/2424053-google-integration).
