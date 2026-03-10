---
title: State persistence
description: Learn how to maintain an Actor's state to prevent data loss during unexpected restarts. Includes code examples for handling server migrations.
sidebar_position: 9
slug: /actors/development/builds-and-runs/state-persistence
---

**Learn how to maintain an Actor's state to prevent data loss during unexpected restarts. Includes code examples for handling server migrations.**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Long-running [Actor](../../index.mdx) jobs may need to migrate between servers. Without state persistence, your job's progress is lost during migration, causing it to restart from the beginning on the new server. This can be costly and time-consuming.

To prevent data loss, long-running Actors should persist their state so they can resume from where they left off after a migration.

For short-running Actors, the risk of restarts and the cost of repeated runs are low, so you can typically ignore state persistence.

## Understand migrations

A migration occurs when a process running on one server must stop and move to another. During this process:

- All in-progress processes on the current server are stopped
- Unless you've saved your state, the Actor run will restart on the new server with an empty internal state
- You only have a few seconds to save your work when a migration event occurs

### Causes of migration

Migrations can happen for several reasons:

- Server workload optimization
- Server crashes (rare)
- New feature releases and bug fixes

### Frequency of migrations

Migrations don't follow a specific schedule. They can occur at any time due to the events mentioned above.

## Why state is lost during migration

By default, an Actor keeps its state in the server's memory. During a server switch, the run loses access to the previous server's memory. Even if data were saved on the server's disk, access to that would also be lost. Note that the Actor run's default dataset, key-value store and request queue are preserved across migrations, by state we mean the contents of runtime variables in the Actor's code.

## Implement state persistence

Use the JS SDK's [`Actor.useState()`](/sdk/js/reference/class/Actor#useState) or Python SDK's [`Actor.use_state()`](/sdk/python/reference/class/Actor#use_state) methods to persist state across migrations. This method automatically saves your state to the key-value store and restores it when the Actor restarts.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();

const state = await Actor.useState({ itemCount: 0, lastOffset: 0 });

// The state object is automatically persisted during migrations.
// Update it as your Actor processes data.
state.itemCount += 1;
state.lastOffset = 100;

await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        state = await Actor.use_state({'item_count': 0, 'last_offset': 0})

        # The state object is automatically persisted during migrations.
        # Update it as your Actor processes data.
        state['item_count'] += 1
        state['last_offset'] = 100
```

</TabItem>
</Tabs>

For improved Actor performance, consider [caching repeated page data](/academy/expert-scraping-with-apify/saving-useful-stats).

## Speed up migrations and ensure consistency

Once your Actor receives the `migrating` event, the Apify platform will shut it down and restart it on a new server within one minute.
To speed this process up and ensure state consistency, you can manually reboot the Actor in the `migrating` event handler using the `Actor.reboot()` method
available in the [Apify SDK for JavaScript](/sdk/js/reference/class/Actor#reboot) or [Apify SDK for Python](/sdk/python/reference/class/Actor#reboot).

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();
// ...
Actor.on('migrating', async () => {
    // ...
    // save state
    // ...
    await Actor.reboot();
});
// ...
await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor, Event

async def actor_migrate(_event_data):
    # ...
    # save state
    # ...
    await Actor.reboot()

async def main():
    async with Actor:
        # ...
        Actor.on(Event.MIGRATING, actor_migrate)
        # ...
```

</TabItem>
</Tabs>
