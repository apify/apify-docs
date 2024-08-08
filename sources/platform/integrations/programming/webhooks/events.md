---
title: Events types for webhooks
description: Specify the types of events that trigger a webhook in an Actor or task run. Trigger an action on Actor or task run creation, success, failure, abortion, or timeout.
sidebar_position: 1
slug: /integrations/webhooks/events
---


**Specify the types of events  that trigger a webhook in an Actor or task run. Trigger an action on Actor or task run creation, success, failure, abortion or timeout.**

---

You can configure webhooks to trigger actions based on specific events that occur during Actor runs or builds.

## Actor run events

Actor run events are triggered when an Actor run is created or transitions to a new state. You can define webhooks for all runs of an Actor on its detail page or for a specific Actor task on its detail page. In the latter case, the webhook is invoked only for runs started for that task.

### Event types

* `ACTOR.RUN.CREATED` - A new Actor run has been created.
* `ACTOR.RUN.SUCCEEDED` - An Actor run finished with status `SUCCEEDED`.
* `ACTOR.RUN.FAILED` - An Actor run finished with status `FAILED`.
* `ACTOR.RUN.ABORTED` - An Actor run finished with status `ABORTED`.
* `ACTOR.RUN.TIMED_OUT` - An Actor run finished with status `TIMED-OUT`.
* `ACTOR.RUN.RESURRECTED` - An Actor run has been resurrected.

### Event data

The following data is provided for Actor run events:

```json5
{
    "actorId": "ID of the triggering Actor.",
    "actorTaskId": "If task was used, its ID.",
    "actorRunId": "ID of the triggering Actor run.",
}
```

To fetch the results from the Actor run, you can use the `actorRunId` event property and call one of the [Run object and its storages](/api/v2#/reference/actor-runs/run-object-and-its-storages) API endpoints. For example:

```text
https://api.apify.com/v2/actor-runs/[ACTOR_RUN_ID]/dataset/items?token=[TOKEN]
```

Apart from the event data, actions also have the `resource` object available, which can provide more details about the object that triggered the event. For more information about the `resource` objects, see the [Webhooks Actions page](/platform/integrations/webhooks/actions#resource)

## Actor build events

Actor build events are triggered when an Actor build is created or transitions into a new state. You can define webhooks for all builds on its detail page.

### Event types

* `ACTOR.BUILD.CREATED` - A new Actor build has been created.
* `ACTOR.BUILD.SUCCEEDED` - An Actor build finished with the status `SUCCEEDED`.
* `ACTOR.BUILD.FAILED` - An Actor build finished with the status `FAILED`.
* `ACTOR.BUILD.ABORTED` - An Actor build finished with the status `ABORTED`.
* `ACTOR.BUILD.TIMED_OUT` - An Actor build finished with the status `TIMED-OUT`.

### Event Data

The following data is provided for Actor build events:

```json5
{
    "actorId": "ID of the triggering Actor.",
    "actorBuildId": "ID of the triggering Actor build.",
}
```
