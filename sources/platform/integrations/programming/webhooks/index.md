---
title: Webhooks
description: Learn how to integrate multiple Apify Actors or external systems with your Actor or task run. Send alerts when your Actor run succeeds or fails.
sidebar_position: 11.02
slug: /integrations/webhooks
---

# Webhooks

**Learn how to integrate multiple Apify Actors or external systems with your Actor or task run. Send alerts when your Actor run succeeds or fails.**

---

Webhooks allow you to configure the Apify platform to perform an action when a certain system event occurs. For example, you can use them to start another Actor when the current run finishes or fails.

You can find webhooks under the **Integrations** tab on an Actor's page in [Apify Console](https://console.apify.com/actors).

![Integrations tab in Apify Console](../../images/integrations-tab.png)

To define a webhook, select a system **event** that triggers the webhook. Then, provide the **action** to execute after the event. When the event occurs, the system executes the action.

> Currently, the only available action is to send a POST HTTP request to a URL specified in the webhook.

* [**Events**](/platform/integrations/webhooks/events)
* [**Actions**](/platform/integrations/webhooks/actions)
* [**Ad-hoc webhooks**](/platform/integrations/webhooks/ad-hoc-webhooks)
