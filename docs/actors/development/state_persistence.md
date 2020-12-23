---
title: State persistence
description: Maintain a long-running actor's state to protect from unexpected restarts. See a code example on how to protect your run in case of server shutdown.
paths:
    - actor/development/state-persistence
    - actors/development/state-persistence
---

# [](#state-persistence)State persistence

Long-running [actor]({{@link actors.md}}) jobs may need to migrate from one server to another. Unless you save your job's progress, it will be lost during the migration. The actor will re-start from scratch on the new server, which can be costly.

To avoid this, long-running actors should save (persist) their state periodically and listen for [migration events](https://sdk.apify.com/docs/api/apify#apifyevents). On start, these actors should [check for persisted state](#code-example), so they can continue where they left off.

For short-running actors, the chance of a restart and the cost of repeated runs are low, so restarts can be ignored.

## [](#what-is-a-migration)What is a migration?

A migration is when a process running on a server has to stop and move to another. All in-progress processes on the current server are stopped. Unless you have saved your state, the actor run will restart on the new server. For example, if a request in your [request queue]({{@link storage/request_queue.md}}) has not been updated as **crawled** before the migration, it will be crawled again.

**When a migration event occurs, you only have a few seconds to save your work.**

## [](#why-migrations-happen)Why do migrations happen?

Migrations happen because of the availability of Amazon EC2's **spot instances**. [Visit Amazon for more information](https://aws.amazon.com/ec2/spot/?cards.sort-by=item.additionalFields.startDateTime&cards.sort-order=asc).

Other causes for migrations are server crashes (unlikely) or deploys of new [workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).

## [](#why-is-state-lost-during-migration)Why is state lost during migration?

Unless instructed to save its output or state to a [storage]({{@link storage.md}}), an actor keeps them in the server's memory. So, when it switches servers, the run loses access to the previous server's memory. Even if data were saved on the server's disk, we would also lose access to that.

We have [dataset]({{@link storage/dataset.md}}), [key-value store]({{@link storage/key_value_store.md}}), and [request queue]({{@link storage/request_queue.md}}) storage so we could store results **and** in-progress data.

## [](#how-often-do-migrations-occur)How often do migrations occur?

There is no specified interval at which migrations happen. They are dependent on the availability of spot instances, so they can happen at any time.

## [](#how-to-persist-state)How to persist state

The [Apify SDK](https://sdk.apify.com) persists its state automatically, using the `migrating` and `persistState` [events](https://sdk.apify.com/docs/api/apify#apifyevents). `persistState` notifies SDK components to persist their state at regular intervals in case a migration happens. The `migrating` event is emitted just before a migration.

### [](#code-examples)Code examples

To persist state manually, you can use the example below.

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
