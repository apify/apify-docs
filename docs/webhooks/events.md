---
title: Events
description: Specify the types of events that trigger a webhook in an actor or task run. Trigger an action on actor or task run creation, success or failure.
menuWeight: 11.1
paths:
    - webhooks/events
---

# [](./webhooks#events)Events

An event is represented by a **type** and related **data**. The type is a `string` that shows the event's name and its hierarchy in the tree of available events, e.g.: `ACTOR.RUN.SUCCEEDED`. The data are an `Object` with variable properties. See documentation of individual events for examples of data.

> Currently, webhooks are only available for actor run events, with new types in the pipeline.

## [](#actor-run)Actor run

Actor run events are triggered when an actor run gets created or transitions into a new state. Webhook can be defined for all runs of an [actor]({{@link actors.md}}) at its detail page or for a specific [actor task]({{@link actors/tasks.md}}) at its detail page. In that case, the webhook is invoked only for runs started for that task.

### Event types

* `ACTOR.RUN.CREATED` - new actor run has been created.
* `ACTOR.RUN.SUCCEEDED` - actor run finished with status `SUCCEEDED`.
* `ACTOR.RUN.FAILED` - actor run finished with status `FAILED`.
* `ACTOR.RUN.ABORTED` - actor run finished with status `ABORTED`.
* `ACTOR.RUN.TIMED_OUT` - actor run finished with status `TIMED-OUT`.

### Event data

```json
{
    "actorId": "ID of the triggering actor.",
    "actorTaskId": "If task was used, its ID.",
    "actorRunId": "ID of the triggering actor run.",
}
```

