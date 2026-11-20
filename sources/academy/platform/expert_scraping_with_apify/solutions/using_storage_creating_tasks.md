---
title: Using storage & creating tasks
description: Get quiz answers and explanations for the lesson about using storage and creating tasks on the Apify platform.
sidebar_position: 3
sidebar_label: III - Using storage & creating tasks
slug: /expert-scraping-with-apify/solutions/using-storage-creating-tasks
pagination: true
---

## Quiz answers 📝 {#quiz-answers}

**Q: What is the relationship between Actors and tasks?**

**A:** Tasks are pre-configured runs of Actors. The configurations of an Actor can be saved as a task so that it doesn't have to be manually configured every single time.

**Q: What are the differences between default (unnamed) and named storage? Which one would you use for everyday usage?**

**A:** Unnamed storage is deleted when your plan's data retention period ends, while named storage is persisted indefinitely. For everyday usage, it is best to use default unnamed storages unless the data should explicitly be persisted for longer.

> With named storages, it's easier to verify that you're using the correct store, as they can be referred to by name rather than by an ID.

**Q: What is data retention, and how does it work for all types of storages (default and named)?**

**A:** Default/unnamed storages are deleted when your plan's data retention period ends. Named storages are retained indefinitely.

## Wrap up {#wrap-up}

You've learned how to use the different storage options available on Apify, the two different types of storage, as well as how to create tasks for Actors.
