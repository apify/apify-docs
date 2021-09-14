---
title: Tasks
description: Set up configurations of your Apify actors for simplified usage. Create multiple configurations of the same actor tailored to various use cases.
menuWeight: 7.2
paths:
    - tasks
    - actors/tasks
---

# Actor tasks

Tasks let you create multiple re-usable configurations of a single actor that are adapted for specific use cases. For example, you can create one **Web Scraper** ([apify/web-scraper](https://apify.com/apify/web-scraper)) configuration (task) that scrapes the lastest reviews from imdb.com, another that scrapes nike.com for the latest sneakers, and a third that scrapes your competitor's e-shop. You can then use and reuse these configurations directly from [Apify Console](https://console.apify.com/actors/tasks), [schedules]({{@link schedules.md}}), or [API](/api/v2#/reference/actor-tasks/run-collection/run-task).

All your tasks are listed at [https://console.apify.com/actors/tasks](https://console.apify.com/actors/tasks).

You can create tasks both for your personal actors and for those made by someone else. Just [search Apify Store](https://console-securitybyobscurity.apify.com/actors#/store/) to find an actor you want to use and click the **Create new task** button.

Like any other resource, you can share your actor tasks with other Apify users via the [access rights]({{@link access_rights.md}}) system.

## Create

Open any actor from [Apify Store](https://console-securitybyobscurity.apify.com/actors#/store/) or your list of [actors](https://console.apify.com/actors) in Apify Console. In the top-right section of the page, click the **Create new task** button.

![Create a new Apify task]({{@asset actors/images/create-task.webp}})

Alternatively, you can navigate to the [**Tasks** section in Apify Console](https://console.apify.com/actors/tasks) and select **Create a new task** in the top-right corner. This will take you to Apify Store, where you can choose an actor to create a task from.

## Configure

You can set up your task's input under the **Console** tab. A task's input configuration works just like an actor's. After all, it is just a copy of an actor you can pre-configure for a specific scenario. You can use either JSON or the visual input UI.

![Apify task configuration]({{@asset actors/images/create-task-configure.webp}})

Actors' input fields will vary depending on their purpose, but they all follow the same principle: you provide an actor with the information it needs so it can do what you want it to do.

You can set run options such as timeout and [memory]({{@link actors/running/memory_and_cpu.md}}) at the bottom of the input section.

### Settings

To make a task easier to identify, you can give it a name and description under the **Settings** tab. A task's name should be 3-63 characters long.

![Apify task settings]({{@asset actors/images/create-task-settings.webp}})

## Run

Once you've configured you task, you can run it using the **Run** button in the bottom-left side of the **Console**.

![Run an Apify task]({{@asset actors/images/create-task-run.webp}})

You can also run tasks using:

- [Schedules]({{@link schedules.md}}).
- Directly via the [Apify API](/api/v2#/reference/actor-tasks/run-collection/run-task).
- The [JavaScript API client]({{@link apify_client_js.md#taskclient}}).
- The [Python API client]({{@link apify_client_python.md#taskclient}}).
