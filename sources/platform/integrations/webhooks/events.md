---
title: Events
description: Specify the types of events that trigger a webhook in an actor or task run. Trigger an action on actor or task run creation, success or failure.
sidebar_position: 1
slug: /integrations/webhooks/events
---

# Events

**Specify the types of events that trigger a webhook in an actor or task run. Trigger an action on actor or task run creation, success or failure.**

---

An event is represented by a **type** and related **data**. The type is a `string` that shows the event's name and its hierarchy in the tree of available events, e.g.: `ACTOR.RUN.SUCCEEDED`. The data are an `Object` with variable properties. See documentation of individual events for examples of data.

> Currently, webhooks are only available for actor run and build events, with new types in the pipeline.

## [](#actor-run)Actor run

Actor run events are triggered when an Actor run gets created or transitions into a new state. Webhook can be defined for all runs of an [actor](../../actors/index.md) at its detail page or for a specific [Actor task](../../actors/running/tasks.md) at its detail page. In that case, the webhook is invoked only for runs started for that task.

### Run event types

* `ACTOR.RUN.CREATED` - new actor run has been created.
* `ACTOR.RUN.SUCCEEDED` - actor run finished with status `SUCCEEDED`.
* `ACTOR.RUN.FAILED` - actor run finished with status `FAILED`.
* `ACTOR.RUN.ABORTED` - actor run finished with status `ABORTED`.
* `ACTOR.RUN.TIMED_OUT` - actor run finished with status `TIMED-OUT`.
* `ACTOR.RUN.RESURRECTED` - actor run has been resurrected.

### Run event data

```json
{
    "actorId": "ID of the triggering actor.",
    "actorTaskId": "If task was used, its ID.",
    "actorRunId": "ID of the triggering actor run.",
}
```

### Actor run results

To fetch the results from the actor run, you can take the `actorRunId` event property and call one of the [Run object and its storages](/api/v2#/reference/actor-runs/run-object-and-its-storages) API endpoints. For example:

```text
https://api.apify.com/v2/actor-runs/[ACTOR_RUN_ID]/dataset/items?token=[TOKEN]
```

Note that apart from event data, actions also have the `resource` object available, which can provide more details about the object that triggered the event. Therefore, for example, for the `ACTOR.RUN.SUCCEEDED` event, the provided resource is info about the successful run, which contains the `defaultDatasetId` property that you can also use to fetch the dataset contents. For more information about the `resource` objects, see the [Webhooks Actions page](/platform/integrations/webhooks/actions#resource).

## [](#actor-build)Actor build

Actor build events are triggered when an actor build is created or transitions into a new state. Webhooks can be defined for all of an [actor](../../actors/index.md)'s builds on its detail page.

### Build event types

* `ACTOR.BUILD.CREATED` - new actor build has been created.
* `ACTOR.BUILD.SUCCEEDED` - actor build finished with the status `SUCCEEDED`.
* `ACTOR.BUILD.FAILED` - actor build finished with the status `FAILED`.
* `ACTOR.BUILD.ABORTED` - actor build finished with the status `ABORTED`.
* `ACTOR.BUILD.TIMED_OUT` - actor build finished with the status `TIMED-OUT`.

### Build event data

```json
{
    "actorId": "ID of the triggering actor.",
    "actorBuildId": "ID of the triggering actor build.",
}
```

