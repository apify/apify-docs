---
title: Webhooks
description: Documentation of Apify webhooks system that enables integration of multiple actors or external systems.
menuWeight: 8
---

# [](./webhooks)Webhooks

Webhooks provide an easy and reliable way to configure the Apify platform to carry out an action when a certain system event occurs. For example, you can use webhooks to start another actor when an actor run finishes or fails.

To define a webhook one needs to select an **event** that triggers the webhook, from the available system events and provide an **action** to be executed after the event occurs. When the event occurs, the system executes the action.

**Currently, the only available action is to send an HTTP POST request to a URL specified in the webhook.**

*   [**Actions**]({{@link webhooks/actions.md}})
*   [**Events**]({{@link webhooks/events.md}})
*   [**Ad hoc webhooks**]({{@link webhooks/ad_hoc_webhooks.md}})
