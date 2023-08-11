---
title: Actors
description: Learn how to integrate with other Actors and tasks
sidebar_position: 11.10
slug: /integrations/actors
---

*The feature is experimental and currently available on-request, ask our support to enable it for your account.*

### What are Actors integrations?

It is a way how to use Actors with other Actors easily. It provides new level of flexibility as adding a new integration simply means creating the Integration-ready Actor. Thus, new integrations can be created by the community itself.

### How to integrate Actor with other Actors?

To integrate an Actor with another one, go to the `Integrations tab`, select `Apify (Connect Actor or Task)`, find the Actor that should be used as integration and click `Connect`. This leads you to a set up screen, where you can provide:

  - **triggers**: events, that will trigger the integrated Actor, the same ones as webhook [events types](https://docs.apify.com/platform/integrations/webhooks/events), i.e. run succeeded, build failed, ..
  - **input for the integrated Actor**: typically, the input has two parts. The information that is independent of run triggering it and information that is specific for that run. The “independent” information (e.g. connection string to database or table name) can be filled to input as-is. The information specific to run (e.g. dataset id) is either obtained from implicit `payload` field (this is the case for most Actors that are integration-ready), or they can be provided using variables.
  - The **available variables** are the same ones as in webhooks. The one that you probably are going to need the most is `{{resource}}` - which is run object in the same shape you get from [API](https://docs.apify.com/api/v2#/reference/actor-runs/run-object-and-its-storages/get-run) (in case of build event types, it’s build). The variables can make use of dot notation, so most likely, you’ll just need `{{resource.defaultDatasetId}}` or `{{resource.defaultKeyValueStoreId}}`.
