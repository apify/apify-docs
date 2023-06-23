---
title: V - Migrations & maintaining state
description: Learn about what actor migrations are and how to handle them properly so that state is not lost and it can safely be resurrected.
sidebar_position: 6.5
slug: /expert-scraping-with-apify/migrations-maintaining-state
---

# Migrations & maintaining state {#migrations-maintaining-state}

**Learn about what actor migrations are and how to handle them properly so that state is not lost and it can safely be resurrected.**

---

We already know that actors are basically just Docker containers that can be run on any server. This means that they can be allocated anywhere there is space available, making them very efficient. Unfortunately, there is one big caveat: actors move - a lot. When an actor moves, it is called a **migration**.

On migration, the process inside of an actor is completely restarted and everything in its memory is lost, meaning that any values stored within variables or classes are lost.

When a migration happens, you want to do a so-called "state transition", which means saving any data you care about so the actor can continue right where it left off before the migration.

## Learning 🧠 {#learning}

Read this [article](/platform/actors/development/builds-and-runs/state-persistence) on migrations and dealing with state transitions.

Before moving forward, read about actor [events](/sdk/js/docs/upgrading/upgrading-to-v3#events) and how to listen for them.

## Knowledge check 📝 {#quiz}

1. Actors have an option the **Settings** tab to **Restart on error**. Would you use this feature for regular actors? When would you use this feature?
2. Migrations happen randomly, but by [aborting **gracefully**](/platform/actors/running#aborting-runs), you can simulate a similar situation. Try this out on the platform and observe what happens. What changes occur, and what remains the same for the restarted actor's run?
3. Why don't you (usually) need to add any special migration handling code for a standard crawling/scraping actor? Are there any features in the Crawlee/Apify SDK that handle this under the hood?
4. How can you intercept the migration event? How much time do you have after this event happens and before the actor migrates?
5. When would you persist data to the default key-value store instead of to a named key-value store?

## Our task

Once again returning to our Amazon **demo-actor**, let's say that we need to store an object in memory (as a variable) containing all of the scraped ASINs as keys and the number of offers scraped from each ASIN as values. The object should follow this format:

```json
{
    "B079ZJ1BPR": 3,
    "B07D4R4258": 21
}
```

Every 10 seconds, we should log the most up-to-date version of this object to the console. Additionally, the object should be able to solve actor migrations, which means that even if the actor were to migrate, its data would not be lost upon resurrection.

[**Solution**](./solutions/handling_migrations.md)

## Next up {#next}

You might have already noticed that we've been using the **RESIDENTIAL** proxy group in the `proxyConfiguration` within our Amazon scraping actor. But what does that mean? Learn why we've used this group, about proxies, and about avoiding anti-scraping measures in the [next lesson](./bypassing_anti_scraping.md).
