---
title: V - Migrations & maintaining state
description: Learn about what actor migrations are and how to handle them properly so that state is not lost and it can safely be resurrected.
menuWeight: 6.5
paths:
    - expert-scraping-with-apify/migrations-maintaining-state
---

# [](#migrations-maintaining-state) Migrations & maintaining state

We already know that actors are basically just Docker containers that can be run on any server. This means that they can be allocated anywhere there is space available, making them very efficient. Unfortunately, there is one big caveat: actors move - a lot. When an actor moves, it is called a **migration**.

On migration, the process inside of an actor is completely restarted and everything in its memory is lost, meaning that any values stored within variables or classes are lost.

When a migration happens, you want to do a so-called "state transition", which means saving any data you care about so the actor can continue right where it left off before the migration.

## [](#learning) Learning 🧠

Read this [article](https://docs.apify.com/actors/development/state-persistence) on migrations and dealing with state transitions.

Before moving forward, read about actor [events](https://sdk.apify.com/docs/api/apify#apifyevents) and how to listen for them.

## [](#quiz) Knowledge check 📝

1. Actors have an option the **Settings** tab to **Restart on error**. Would you use this feature for regular actors? When would you use this feature?
2. Migrations happen randomly, but by [aborting **gracefully**](https://docs.apify.com/actors/running#aborting-runs), you can simulate a similar situation. Try this out on the platform and observe what happens. What changes occur, and what remains the same for the restarted actor's run?
3. Why don't you (usually) need to add any special migration handling code for a standard crawling/scraping actor? Are there any features in the Crawlee/Apify SDK that handle this under the hood?
4. How can you intercept the migration event? How much time do you have after this event happens and before the actor migrates?
5. When would you persist data to the default key-value store instead of to a named key-value store?

## Our task

Once again returning to our Amazon **demo-actor**, let's say that we need to store an object in memory (as a variable) containing all of the scraped ASINs as keys and the number of offers scraped from each ASIN as values. The object should follow this format:

```JSON
{
    "B079ZJ1BPR": 3,
    "B07D4R4258": 21
}
```

Every 10 seconds, we should log the most up-to-date version of this object to the console. Additionally, the object should be able to solve actor migrations, which means that even if the actor were to migrate, its data would not be lost upon resurrection.

[**Solution**]({{@link expert_scraping_with_apify/solutions/handling_migrations.md}})

## [](#next) Next up

You might have already noticed that we've been using the **RESIDENTIAL** proxy group in the `proxyConfiguration` within our Amazon scraping actor. But what does that mean? Learn why we've used this group, about proxies, and about avoiding anti-scraping measures in the [next lesson]({{@link expert_scraping_with_apify/bypassing_anti_scraping.md}}).
