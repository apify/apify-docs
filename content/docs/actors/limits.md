---
title: Limits
description: Learn the Apify platform's resource capability and limitations such as max memory, disk size and number of actors/tasks per user or schedule.
menuWeight: 7.8
paths:
# NOTE: IF ADDING A NEW PATH, LEAVE THE OLD ONES FOR REDIRECTS
    - actor/limits
    - actors/limits
---

# [](#limits) Limits

The tables below demonstrate the Apify platform's default resource limits.

If needed, the limits shown below can be increased on paid accounts. For details, contact us on **hello@apify.com** or using the chat icon in the bottom-right corner.

* Maximum combined memory of all running jobs.
* Maximum number of actors per user.
* Maximum number of tasks per user.

## [](#actor-limits) Actor limits

| Description                                                      | Value                                                                                 |
|------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| Build memory size                                                | 4,096 MB (2,048 MB on the free plan)<!-- ACTOR_LIMITS.BUILD_DEFAULT_MEMORY_MBYTES --> |
| Run minimum memory                                               | 128 MB<!-- ACTOR_LIMITS.MIN_RUN_MEMORY_MBYTES -->                                     |
| Run maximum memory                                               | 32,768 MB<!-- ACTOR_LIMITS.MAX_RUN_MEMORY_MBYTES -->                                  |
| Maximum combined memory of all running jobs <br/>(Free plan)     | 4,096 MB<!-- ACTOR_LIMITS.FREE_PLAN_MAX_MEMORY_MBYTES -->                             |
| Maximum combined memory of all running jobs <br/>(Personal plan) | 32,768 MB<!-- ACTOR_LIMITS.PERSONAL_PLAN_MAX_MEMORY_MBYTES -->                        |
| Maximum combined memory of all running jobs <br/>(Team plan)     | 131,072 MB<!-- ACTOR_LIMITS.TEAM_PLAN_MAX_MEMORY_MBYTES -->                           |
| Build timeout                                                    | 600 secs<!-- ACTOR_LIMITS.BUILD_TIMEOUT_SECS -->                                      |
| Build/run disk size                                              | 2x job memory limit<!-- ACTOR_LIMITS.RUN_DISK_TO_MEMORY_SIZE_COEFF -->                |
| Memory per CPU core                                              | 4,096 MB<!-- ACTOR_LIMITS.RUN_MEMORY_MBYTES_PER_CPU_CORE -->                          |
| Build/run maximum log size                                       | 10,485,760 characters<!-- ACTOR_LIMITS.LOG_MAX_CHARS -->                               |
| Maximum number of dataset columns for xlsx format                | 2,000 columns                                                                         |
| Maximum size of input schema for a task/actor                    | 100 kB<!-- ACTOR_LIMITS.INPUT_SCHEMA_MAX_BYTES -->                                    |

## [](#platform-limits) Platform limits

| Description                                                        | Value                                                                               |
|--------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| Maximum number of actors per user                                  | 100<!-- DEFAULT_PLATFORM_LIMITS.MAX_ACTORS_PER_USER -->                             |
| Maximum number of tasks per user                                   | 1000<!-- DEFAULT_PLATFORM_LIMITS.MAX_TASKS_PER_USER -->                             |
| Maximum number of schedules per user                               | 100<!-- DEFAULT_PLATFORM_LIMITS.MAX_SCHEDULES_PER_USER -->                          |
| Maximum number of webhooks per user                                | 100<!-- DEFAULT_PLATFORM_LIMITS.MAX_TASKS_PER_USER -->                              |
| Maximum number of concurrent actor runs per user for free accounts | 25<!-- DEFAULT_PLATFORM_LIMITS.FREE_ACCOUNT_MAX_CONCURRENT_ACTOR_RUNS_PER_USER -->  |
| Maximum number of concurrent actor runs per user for paid accounts | 250<!-- DEFAULT_PLATFORM_LIMITS.PAID_ACCOUNT_MAX_CONCURRENT_ACTOR_RUNS_PER_USER --> |
| Maximum number of actors per schedule                              | 10<!-- DEFAULT_PLATFORM_LIMITS.MAX_ACTORS_PER_SCHEDULER -->                         |
| Maximum number of tasks per schedule                               | 10<!-- DEFAULT_PLATFORM_LIMITS.MAX_TASKS_PER_SCHEDULER -->                          |
