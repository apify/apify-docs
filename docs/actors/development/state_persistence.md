---
title: State persistence
description: Maintain a long-running actor's state to protect from unexpected restarts. See a code example on how to protect your run in case of server shutdown.
paths:
    - actor/development/state-persistence
    - actors/development/state-persistence
---

# [](#state-persistence)State persistence

Long-running [actor]({{@link actors.md}}) jobs may need to migrate from one server to another. Unless you save your job's progress, it will be lost during the migration. The actor will re-start from scratch on the new server, which can be costly.

To avoid this, long-running actors should save (persist) their state periodically and listen for [migration events](https://sdk.apify.com/docs/api/apify#apifyevents). On start, these actors should [check for persisted state](#code-examples), so they can continue where they left off.

For short-running actors, the chance of a restart and the cost of repeated runs are low, so restarts can be ignored.

## [](#what-is-a-migration)What is a migration?

A migration is when a process running on a server has to stop and move to another. All in-progress processes on the current server are stopped. Unless you have saved your state, the actor run will restart on the new server. For example, if a request in your [request queue]({{@link storage/request_queue.md}}) has not been updated as **crawled** before the migration, it will be crawled again.

**When a migration event occurs, you only have a few seconds to save your work.**

## [](#why-do-migrations-happen)Why do migrations happen?

- To optimize server workloads.
- When a server crashes (unlikely).
- When we release new features and fix bugs.

## [](#how-often-do-migrations-occur)How often do migrations occur?

There is no specified interval at which migrations happen. They are caused by the [above events](#why-do-migrations-happen), so they can happen at any time.

## [](#why-is-state-lost-during-migration)Why is state lost during migration?

Unless instructed to save its output or state to a [storage]({{@link storage.md}}), an actor keeps them in the server's memory. So, when it switches servers, the run loses access to the previous server's memory. Even if data were saved on the server's disk, we would also lose access to that.

## [](#how-to-persist-state)How to persist state

The [Apify SDK](https://sdk.apify.com) persists its state automatically, using the `migrating` and `persistState` [events](https://sdk.apify.com/docs/api/apify#apifyevents). `persistState` notifies SDK components to persist their state at regular intervals in case a migration happens. The `migrating` event is emitted just before a migration.

### [](#code-examples)Code examples

To persist state manually, you can use the [Apify.events](https://docs.apify.com/actors/development/state-persistence) method in the Apify SDK.

```javascript
Apify.events.on('migrating', () => {
    Apify.setValue('my-crawling-state', {
        foo: 'bar',
    }
});
```

To check for state saved in a previous run, use:

```javascript
const previousCrawlingState = await Apify.getValue('my-crawling-state') || {};
```

To improve your actor's performance, you can also [cache repeated page data]({{@link tutorials/improve_performance_by_caching_repeated_page_data.md}}).
