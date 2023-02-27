---
title: List of permissions
description: Learn about the access rights you can grant to other users. See a list of all access options for Apify resources such as actors, actor runs/tasks and storage.
sidebar_position: 12.2
slug: /access-rights/list-of-permissions
---

# List of permissions

**Learn about the access rights you can grant to other users. See a list of all access options for Apify resources such as actors, actor runs/tasks and storage.**

---

This document contains all the access options that can be granted to resources on the Apify platform.

## Actors {#actors}

Click [here](../actors/index.md) to learn about Apify actors.

### Actor {#actor}

| Permission           | Description                                  |
|----------------------|----------------------------------------------|
| Read                 | View actor settings, source code and builds. |
| Write                | Edit actor settings and source code.         |
| Run                  | Run any of an actor's builds.                |
| Delete               | Remove the actor.                            |
| View runs            | View a list of actor runs and their details. |
| Manage access rights | Manage actor access rights.                  |

### Actor task {#actor-task}

| Permission           | Description                                       |
|----------------------|---------------------------------------------------|
| Read                 | View task configuration.                          |
| Write                | Edit task configuration and settings.             |
| Delete               | Remove the task.                                  |
| View runs            | View a list of actor task runs and their details. |
| Manage access rights | Manage actor task access rights.                  |

To learn about actor tasks, see the [documentation](../actors/tasks.md).

## Storage {#storage}

For more information about Storage, see its [documentation](../storage/index.md).

### Dataset {#dataset}

| Permission           | Description                                |
|----------------------|--------------------------------------------|
| Read                 | View dataset information and its data.     |
| Write                | Edit dataset settings and push data to it. |
| Delete               | Remove the dataset.                        |
| Manage access rights | Manage dataset access rights.              |

To learn about dataset storage, see its [documentation](../storage/dataset.md).

### Key-value-store {#key-value-store}

| Permission           | Description                                                                |
|----------------------|----------------------------------------------------------------------------|
| Read                 | View key-value store details and records.                                  |
| Write                | Edit key-value store settings and add, update or <br/> remove its records. |
| Delete               | Remove key-value store.                                                    |
| Manage access rights | Manage key-value store access rights.                                      |

To learn about key-value stores, see the [documentation](../storage/key_value_store.md).

### Request queue {#request-queue}

| Permission           | Description                                                              |
|----------------------|--------------------------------------------------------------------------|
| Read                 | View request queue details and records.                                  |
| Write                | Edit request queue settings and add, update or <br/> remove its records. |
| Delete               | Remove request queue.                                                    |
| Manage access rights | Manage request queue access rights.                                      |

To learn about request queue storage, see the [documentation](../storage/request_queue.md).

## Schedules {#schedules}

| Permission | Description                                        |
|------------|----------------------------------------------------|
| Read       | View schedule settings and scheduled actors/tasks. |
| Write      | Edit schedule settings and scheduled actors/tasks. |
| Delete     | Remove the schedule.                               |

To learn about schedules, see the [documentation](../schedules.md).

## Proxy {#proxy}

| Permission | Description               |
|------------|---------------------------|
| Proxy      | Allow to use Apify Proxy. |

To learn about Apify Proxy, see its [documentation](../proxy/index.md).

## User permissions {#user-permissions}

Permissions that can be granted to members of organizations. To learn about the organization account, see its [documentation](./organization_account/index.md).

| Permission          | Description                                                           |
|---------------------|-----------------------------------------------------------------------|
| Manage access keys  | Manage account access keys, i.e. API token and proxy password.        |
| Update subscription | Update the type of subscription, billing details and payment methods. |
| Update profile      | Make changes in profile information.                                  |
| Update email        | Update the contact email for the account.                             |
| Reset password      | Reset the account's password.                                         |
| View invoices       | See the account's invoices.                                           |
| Manage organization | Change the organization's settings.                                   |

## Custom Solutions {#custom-solutions}

| Permission       | Description                       |
|------------------|-----------------------------------|
| Custom Solutions | Allow access to Custom Solutions. |
