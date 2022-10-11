---
title: Webhooks
description: Learn how to integrate multiple Apify actors or external systems with your actor or task run. Send alerts when your actor run succeeds or fails.
menuWeight: 11.1
paths:
    - webhooks
    - integrations/webhooks
---

# Webhooks

Webhooks allow you to configure the Apify platform to perform an action when a certain system event occurs. For example, you can use them to start another actor when the current run finishes or fails.

You can find webhooks under the **Integrations** tab on an actor's page in [Apify Console](https://console.apify.com/actors).

![Integrations tab in Apify Console]({{@asset integrations/images/integrations-tab.webp}})

To define a webhook, select a system **event** that triggers the webhook. Then, provide the **action** to execute after the event. When the event occurs, the system executes the action.

> Currently, the only available action is to send a POST HTTP request to a URL specified in the webhook.

* [**Events**]({{@link integrations/webhooks/events.md}})
* [**Actions**]({{@link integrations/webhooks/actions.md}})
* [**Ad-hoc webhooks**]({{@link integrations/webhooks/ad_hoc_webhooks.md}})

