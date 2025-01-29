---
title: System events
description: Learn about system events sent to your Actor and how to benefit from them.
slug: /actors/development/programming-interface/system-events
sidebar_position: 4
---

# System events in Apify Actors

**Learn about system events sent to your Actor and how to benefit from them.**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

## Understand system events

Apify's system notifies Actors about various events, such as:

- Migration to another server
- Abort operations triggered by another Actor
- CPU overload

These events help you manage your Actor's behavior and resources effectively.

## System events

The following table outlines the system events available:


| Event name     | Payload | Description |
| -------------- | ------- | ----------- |
| `cpuInfo`      | `{ isCpuOverloaded: Boolean }` | Emitted approximately every second, indicating whether the Actor is using maximum available CPU resources. |
| `migrating`    | `{ timeRemainingSecs: Float }` | Signals that the Actor will soon migrate to another worker server on the Apify platform. |
| `aborting`     | N/A | Triggered when a user initiates a graceful abort of an Actor run, allowing time for cleanup. |
| `persistState` | `{ isMigrating: Boolean }` | Emitted at regular intervals  (default: _60 seconds_) to notify Apify SDK components to persist their state. |

## How system events work

Actors receive system events through a WebSocket connection. The address is specified by the `ACTOR_EVENTS_WEBSOCKET_URL` environment variable. Messages are sent in JSON format with the following structure:

```json5
{
    // Event name
    name: String,

    // Time when the event was created, in ISO format
    createdAt: String,

    // Optional object with payload
    data: Object,
}
```

:::note Virtual events

Some events like `persistState`, are generated virtually at the Actor SDK level, not sent via WebSocket.

:::

## Handle system events

To work with system events in your Actor, use the following methods:

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();

// Add event handler
Actor.on('cpuInfo', (data) => {
    if (data.isCpuOverloaded) console.log('Oh no, we need to slow down!');
});

// Remove all handlers for a specific event
Actor.off('systemInfo');

// Remove a specific event handler
Actor.off('systemInfo', handler);

await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor
from apify_shared.consts import ActorEventTypes

def handler_foo(arg: dict):
    Actor.log.info(f'handler_foo: arg = {arg}')

def handler_boo(arg: dict):
    pass

async def main():
    async with Actor:
        # Add event handler
        Actor.on(ActorEventTypes.ABORTING, handler_foo)

        # Remove all handlers for a specific event
        Actor.off('systemInfo')

        # Remove a specific event handler
        Actor.off('systemInfo', handler_boo)

```

</TabItem>
</Tabs>

By utilizing these system events, you can create more robust and efficient Actors that respond dynamically to changes in their environment.
