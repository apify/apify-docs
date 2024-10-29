---
title: State persistence
description: Learn how to maintain an Actor's state to prevent data loss during unexpected restarts. Includes code examples for handling server migrations.
slug: /actors/development/builds-and-runs/state-persistence
---

# State persistence

**Learn how to maintain an Actor's state to prevent data loss during unexpected restarts. Includes code examples for handling server migrations.**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Long-running [Actor](../../index.mdx) jobs may need to migrate between servers. Without state persistence, your job's progress is lost during migration, causing it to restart from the beginning on the new server. This can be costly and time-consuming.

To prevent data loss, long-running Actors should:

- Periodically save (persist) their state.
- Listem for [migration events](/sdk/js/api/apify/class/PlatformEventManager)
- Check for persisted state when starting, allowing them to resume from where they left off.

For short-running Actors, the risk of restarts and the cost of repeated runs are low, so you can typically ignore state persistence.

## Understanding migrations

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

## Implementing state persistence

The [Apify SDKs](/sdk) handle state persistence automatically.

This is done  using the `Actor.on()` method and the `migrating` event.

- The `migrating` event is triggered just before a migration occurs, allowing you to save your state.
- To retrieve previously saved state, you can use the [`Actor.getValue`](/sdk/js/reference/class/Actor#getValue)/[`Actor.get_value`](/sdk/python/reference/class/Actor#get_value) methods.

### Code examples

To manually persist state, use the `Actor.on` method in the Apify SDK:

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();
// ...
Actor.on('migrating', () => {
    Actor.setValue('my-crawling-state', {
        foo: 'bar',
    });
});
// ...
await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def actor_migrate():
    await Actor.set_value('my-crawling-state', {'foo': 'bar'})

async def main():
    async with Actor:
        # ...
        Actor.on('migrating', actor_migrate)
        # ...
```

</TabItem>
</Tabs>

To check for state saved in a previous run:

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
import { Actor } from 'apify';

await Actor.init();
// ...
const previousCrawlingState = await Actor.getValue('my-crawling-state') || {};
// ...
await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        # ...
        previous_crawling_state = await Actor.get_value('my-crawling-state')
        # ...
```

</TabItem>
</Tabs>

For improved Actor performance consider [caching repeated page data](/academy/expert-scraping-with-apify/saving-useful-stats).
