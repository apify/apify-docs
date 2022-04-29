---
title: VI - Migrations & maintaining state
description: Learn about what actor migrations are and how to handle them properly so that state is not lost and it can safely be resurrected.
menuWeight: 6.6
paths:
    - expert-scraping-with-apify/migrations-maintaining-state
---

# [](#migrations-maintaining-state) Migrations & maintaining state

We already know that actors are basically just Docker containers that can be run on any server. This means that they can be allocated anywhere there is space available, making them very efficient. Unfortunately, there is one big caveat: actors move - a lot. When an actor moves, it is called **migration**.

On migration, the process inside of an actor is completely restarted and everything in its memory is lost, meaning that any values stored within variables or classes are lost.

When a migration happens, you want to do a so-called "state transition", which means saving any data you care about so the actor can continue right where it left off before the migration.

## [](#learning) Learning 🧠

Before moving forward, read about actor [events](https://sdk.apify.com/docs/api/apify#apifyevents) and how to listen for them.

## [](#quiz) Knowledge check 📝
