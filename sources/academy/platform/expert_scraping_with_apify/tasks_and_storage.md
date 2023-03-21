---
title: III - Tasks & storage
description: Understand how to save the configurations for actors with actor tasks. Also, learn about storage and the different types Apify offers.
sidebar_position: 6.3
slug: /expert-scraping-with-apify/tasks-and-storage
---

# Tasks & storage {#tasks-and-storage}

**Understand how to save the configurations for actors with actor tasks. Also, learn about storage and the different types Apify offers.**

---

Both of these are very different things; however, they are also tied together in many ways. **Tasks** run actors, actors return data, and data is stored in different types of **Storages**.

## Tasks {#tasks}

Tasks are a very useful feature which allow us to save pre-configured inputs for actors. This means that rather than configuring the actor every time, or rather than having to save screenshots of various different actor configurations, you can store the configurations right in your Apify account instead, and run the actor at will with them.

## Storage {#storage}

Storage allows us to save persistent data for further processing. As you'll learn, there are two main storage options on the Apify platform, as well as two main storage types (**named** and **unnamed**) with one big difference between them.

## Learning 🧠 {#learning}

- Check out [the docs about actor tasks](/platform/actors/running/tasks).
- Read about the [two main storage options](/platform/storage#dataset) on the Apify platform.
- Understand the [crucial differences between named and unnamed storages](/platform/storage#named-and-unnamed-storages).
- Learn about the [`Dataset`](/sdk/js/reference/class/Dataset) and [`KeyValueStore`](/sdk/js/reference/class/KeyValueStore) objects in the Apify SDK.

## Knowledge check 📝 {#quiz}

1. What is the relationship between actors and tasks?
2. What are the differences between default (unnamed) and named storage? Which one would you use for everyday usage?
3. What is data retention, and how does it work for all types of storages (default and named)?

## Our task {#our-task}

Once again, we'll be adding onto our main Amazon-scraping actor in this activity, but don't worry - this lesson will be quite light, just like the last one.

We have decided that we want to retain the data scraped by the actor for a long period of time, so instead of pushing to the default dataset, we will be pushing to a named dataset. Additionally, we want to save the absolute cheapest item found by the scraper into the default key-value store under a key named **CHEAPEST-ITEM**.

Finally, we'll create a task for the actor that saves the configuration with the **keyword** set to be **google pixel**.

[**Solution**](./solutions/using_storage_creating_tasks.md)

## Next up {#next}

The [next lesson](./apify_api_and_client.md) is very exciting, as it will unlock the ability to seamlessly integrate your Apify actors into your own external projects and applications with the Apify API.
