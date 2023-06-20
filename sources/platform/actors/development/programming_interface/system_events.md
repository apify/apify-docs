---
title: System events
description: Learn about system events sent to your Actor and how to benefit from them.
slug: /actors/development/programming-interface/system-events
sidebar_position: 4
---

**Learn about system events sent to your Actor and how to benefit from them.**

---

Actors are notified by the system about various events such as a migration to another server, [abort operation](#abort-another-actor) triggered by another actor, or the CPU being overloaded.

Currently, the system sends the following events:

| Event name     | Payload | Description |
| -------------- | ------- | ----------- |
| `cpuInfo`      | `{ isCpuOverloaded: Boolean }` | The event is emitted approximately every second and it indicates whether the actor is using the maximum of available CPU resources. If that’s the case, the actor should not add more workload. For example, this event is used by the AutoscaledPool class. |
| `migrating`    | N/A | Emitted when the actor running on the Apify platform is going to be migrated to another worker server soon. You can use it to persist the state of the actor and abort the run, to speed up migration. For example, this is used by the RequestList class. |
| `aborting`     | N/A | When a user aborts an actor run on the Apify platform, they can choose to abort gracefully to allow the actor some time before getting killed. This graceful abort emits the `aborting` event which the SDK uses to gracefully stop running crawls and you can use it to do your own cleanup as well.|
| `persistState` | `{ isMigrating: Boolean }` | Emitted in regular intervals (by default 60 seconds) to notify all components of Apify SDK that it is time to persist their state, in order to avoid repeating all work when the actor restarts. This event is automatically emitted together with the migrating event, in which case the `isMigrating` flag is set to `true`. Otherwise the flag is `false`. Note that the `persistState` event is provided merely for user convenience, you can achieve the same effect using `setInterval()` and listening for the `migrating` event. |

Under the hood, actors receive the system events by connecting to a web socket address specified by the `ACTOR_EVENTS_WEBSOCKET_URL` environment variable. The system sends messages in JSON format in the following structure:

```js
{
    // Event name
    name: String,

    // Time when the event was created, in ISO format
    createdAt: String,

    // Optional object with payload
    data: Object,
}
```

Note that some events (e.g. `persistState`) are not sent by the system via the web socket, but generated virtually on the Actor SDK level.

```js
// Add event handler
Actor.on('cpuInfo', (data) => {
    if (data.isCpuOverloaded) console.log('Oh no, we need to slow down!');
});

// Remove all handlers for a specific event
Actor.off('systemInfo');

// Remove a specific event handler
Actor.off('systemInfo', handler);
```
