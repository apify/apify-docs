---
title: III - Tasks & storage
description: Understand how to save the configurations for Actors with Actor tasks. Also, learn about storage and the different types Apify offers.
sidebar_position: 6.3
slug: /expert-scraping-with-apify/tasks-and-storage
---

# Tasks & storage {#tasks-and-storage}

**Understand how to save the configurations for Actors with Actor tasks. Also, learn about storage and the different types Apify offers.**

---

Both of these are very different things; however, they are also tied together in many ways. **Tasks** run Actors, Actors return data, and data is stored in different types of **Storages**.

## Tasks {#tasks}

Tasks are a very useful feature which allow us to save pre-configured inputs for Actors. This means that rather than configuring the Actor every time, or rather than having to save screenshots of various different Actor configurations, you can store the configurations right in your Apify account instead, and run the Actor at will with them.

## Storage {#storage}

Storage allows us to save persistent data for further processing. As you'll learn, there are two main storage options on the Apify platform, as well as two main storage types (**named** and **unnamed**) with one big difference between them.

## Learning 🧠 {#learning}

- Check out [the docs about Actor tasks](/platform/using-actors/running/tasks).
- Read about the [two main storage options](/platform/core-concepts/storage/dataset) on the Apify platform.
- Understand the [crucial differences between named and unnamed storages](/platform/core-concepts/storage/usage#named-and-unnamed-storages).
- Learn about the [`Dataset`](/sdk/js/reference/class/Dataset) and [`KeyValueStore`](/sdk/js/reference/class/KeyValueStore) objects in the Apify SDK.

## Knowledge check 📝 {#quiz}

1. What is the relationship between Actors and tasks?
2. What are the differences between default (unnamed) and named storage? Which one would you use for everyday usage?
3. What is data retention, and how does it work for all types of storages (default and named)?

[**Solution**](./solutions/using_storage_creating_tasks.md)

## Next up {#next}

The [next lesson](./apify_api_and_client.md) is very exciting, as it will unlock the ability to seamlessly integrate your Apify Actors into your own external projects and applications with the Apify API.
