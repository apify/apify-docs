---
title: Persisting state across runs
description: Read data written by a previous run of the same Actor - useful for scheduled or cron-driven Actors that need to remember progress between invocations.
slug: /actors/development/programming-interface/persisting-state-across-runs
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

An Actor run's default [key-value store](../../../storage/key_value_store.md), [dataset](../../../storage/dataset.md), and [request queue](../../../storage/request_queue.md) exist only for that one run. When you need a run to pick up where the previous run left off - for example, a scheduled Actor that tracks the last cursor it processed, deduplicates against previously-seen items, or resumes a partial job - you have to write state somewhere the next run can find it.

This page describes two recommended patterns for cross-run state and the pitfalls to watch out for.

## Pattern 1: read the previous run's default key-value store

The simplest way to persist state is to use a run's own default key-value store, then have the next run list your previous runs and read from the most recent one.

This pattern works under any [permission level](/platform/actors/running/permissions) and doesn't require a named storage.

### 1. Give the Actor a full-power API token

Under [limited permissions](../permissions/index.md#how-actor-permissions-work) the built-in `APIFY_TOKEN` has restricted access and can't list arbitrary runs of the Actor across the user's account. Ask the user to provide their own token via an environment variable:

1. During local development, store the token as a CLI-managed secret:

    ```bash
    apify secrets add MY_APIFY_TOKEN apify_api_...
    ```

    Secrets are stored in `~/.apify` and never committed to source control. See [Environment variables](./environment_variables.md#secure-environment-variables) for details.

2. Reference the secret from `.actor/actor.json`:

    ```json
    {
        "actorSpecification": 1,
        "name": "my-scheduled-actor",
        "version": "0.0",
        "environmentVariables": {
            "MY_APIFY_TOKEN": "@MY_APIFY_TOKEN"
        }
    }
    ```

    The `@` prefix tells the Apify CLI to resolve the value from the secrets store when the Actor is pushed. `environmentVariables` is a **JSON object** (key -> value), not an array. See [`actor.json`](../actor_definition/actor_json.md).

3. When someone else runs the Actor from Apify Console, they set `MY_APIFY_TOKEN` in the Actor's **Environment variables** tab with the **Secret** flag enabled.

### 2. List previous runs and read from the most recent one

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```ts
import { Actor } from 'apify';
import { ApifyClient } from 'apify-client';

await Actor.init();

const actorId = process.env.ACTOR_ID!;
const currentRunId = process.env.ACTOR_RUN_ID!;
const userToken = process.env.MY_APIFY_TOKEN;

const client = new ApifyClient({ token: userToken });

// List previous SUCCEEDED runs of this Actor, newest first.
const { items: runs } = await client.actor(actorId).runs().list({
    status: 'SUCCEEDED',
    desc: true,
    limit: 10,
});

const previousRun = runs.find((r) => r.id !== currentRunId);

if (previousRun) {
    // Read a record written by the previous run to its OWN default key-value store.
    const previousKvs = client.keyValueStore(previousRun.defaultKeyValueStoreId);
    const state = await previousKvs.getRecord('STATE');
    console.log('Previous state:', state?.value);
}

// Write this run's state to our OWN default key-value store.
await Actor.setValue('STATE', { cursor: 42, lastRunAt: new Date().toISOString() });

await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

```python
import os
from apify import Actor
from apify_client import ApifyClientAsync

async def main():
    async with Actor:
        actor_id = os.environ['ACTOR_ID']
        current_run_id = os.environ['ACTOR_RUN_ID']
        user_token = os.environ.get('MY_APIFY_TOKEN')

        client = ApifyClientAsync(token=user_token)

        runs_page = await client.actor(actor_id).runs().list(
            status='SUCCEEDED',
            desc=True,
            limit=10,
        )
        previous_run = next(
            (r for r in runs_page.items if r['id'] != current_run_id),
            None,
        )

        if previous_run:
            previous_kvs = client.key_value_store(previous_run['defaultKeyValueStoreId'])
            record = await previous_kvs.get_record('STATE')
            Actor.log.info(f'Previous state: {record["value"] if record else None}')

        await Actor.set_value('STATE', {'cursor': 42})
```

</TabItem>
</Tabs>

Notes:

- Filter by `status: 'SUCCEEDED'` to skip failed or aborted runs whose state may be incomplete.
- `desc: true` returns newest first; skip the current run's ID.
- Store one canonical record (`STATE`) rather than accumulating history in the default store - the default store lives with each run and doesn't grow unboundedly.

## Pattern 2: named key-value store

A [named key-value store](../../../storage/key_value_store.md#named-and-unnamed-key-value-stores) outlives any single run, so a scheduled Actor can open it every run and keep appending.

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```ts
import { Actor } from 'apify';

await Actor.init();

const store = await Actor.openKeyValueStore('my-actor-state');
const previous = await store.getValue('STATE');
// ... use previous ...
await store.setValue('STATE', { cursor: 42 });

await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        store = await Actor.open_key_value_store(name='my-actor-state')
        previous = await store.get_value('STATE')
        await store.set_value('STATE', {'cursor': 42})
```

</TabItem>
</Tabs>

:::caution Limited-permissions caveats

Under [limited permissions](../permissions/index.md#how-actor-permissions-work), a named storage created on the Actor's first limited-permissions run is retained across subsequent runs by the same user - but there are edge cases:

- If the store was created earlier under **full permissions**, a limited-permissions run will not have access to it. See [The Actor accesses named storages](../permissions/migration_guide.md#the-actor-accesses-named-storages) for the migration path.
- Named storages are per-user. If two different users run the Actor, each gets their own store; state does not flow between them. Pattern 1 has the same property (each user only sees their own runs), so this is usually what you want.

If in doubt, Pattern 1 avoids the named-storage lifecycle entirely.

:::

## Choosing between the patterns

| | Pattern 1: read previous run | Pattern 2: named store |
| --- | --- | --- |
| Works out of the box under limited permissions | Yes (with user-supplied token) | Yes for stores created under limited permissions |
| Requires user to supply an API token | Yes | No |
| Survives Actor deletions of prior runs | No (once the run's storage expires) | Yes |
| Convenient key layout | One `STATE` record per run | Free-form |

For most scheduled or cron-triggered Actors, Pattern 1 is enough and requires no special storage lifecycle handling.

## See also

- [Environment variables](./environment_variables.md) - custom vars and secret references.
- [`actor.json`](../actor_definition/actor_json.md) - `environmentVariables` schema.
- [Permissions](../../running/permissions.md) and the [migration guide](../permissions/migration_guide.md) - what limited permissions do and don't allow.
- [Key-value store](../../../storage/key_value_store.md).
