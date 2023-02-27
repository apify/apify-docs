---
title: Webhooks
description: Learn how to integrate multiple Apify actors or external systems with your actor or task run. Send alerts when your actor run succeeds or fails.
sidebar_position: 11.1
slug: /integrations/webhooks
---

# Webhooks

**Learn how to integrate multiple Apify actors or external systems with your actor or task run. Send alerts when your actor run succeeds or fails.**

---

Webhooks allow you to configure the Apify platform to perform an action when a certain system event occurs. For example, you can use them to start another actor when the current run finishes or fails.

You can find webhooks under the **Integrations** tab on an actor's page in [Apify Console](https://console.apify.com/actors).

![Integrations tab in Apify Console](../images/integrations-tab.png)

To define a webhook, select a system **event** that triggers the webhook. Then, provide the **action** to execute after the event. When the event occurs, the system executes the action.

> Currently, the only available action is to send a POST HTTP request to a URL specified in the webhook.

* [**Events**](./events.md)
* [**Actions**](./actions.md)
* [**Ad-hoc webhooks**](./ad_hoc_webhooks.md)

