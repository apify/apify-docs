---
title: Limits
description: Documentation of Apify actors - serverless computing jobs that enable execution of long-running web scraping and automation tasks in the cloud.
menuWeight: 3.8
paths:
    - actor/limits
    - actors/limits
---

# [](#limits) Limits

The tables below demonstrate the Apify platform's resource limits. 

If needed, resources such as `Maximum combined memory of all running jobs` can be increased on paid accounts. For details, contact us on `hello@apify.com` or using the chat icon in the bottom-right corner.

## [](#actor-limits) Actor limits

|Description|Value|
|--- |--- |
|Build memory size|1,024 MB <!-- ACTOR_LIMITS.BUILD_DEFAULT_MEMORY_MBYTES -->|
|Build timeout|600 secs <!-- ACTOR_LIMITS.BUILD_TIMEOUT_SECS --> |
|Build/run disk size|2x job memory limit<!-- ACTOR_LIMITS.RUN_DISK_TO_MEMORY_SIZE_COEFF -->|
|Memory per CPU core|4,096 MB<!-- ACTOR_LIMITS.RUN_MEMORY_MBYTES_PER_CPU_CORE -->|
|Run minimum memory|128 MB<!-- ACTOR_LIMITS.MIN_RUN_MEMORY_MBYTES -->|
|Run maximum memory|32,768 MB<!-- ACTOR_LIMITS.MAX_RUN_MEMORY_MBYTES -->|
|Maximum combined memory of all running jobs (free accounts)|8,192 MB<!-- ACTOR_LIMITS.FREE_ACCOUNT_MAX_MEMORY_MBYTES -->|
|Maximum combined memory of all running jobs (paid accounts)|65,536 MB<!-- ACTOR_LIMITS.PAID_ACCOUNT_MAX_MEMORY_MBYTES -->|
|Build/run maximum log size|5,000,000 characters<!-- ACTOR_LIMITS.LOG_MAX_CHARS -->|
|Maximum size of input schema for a task/actor|100 * 1024 B<!-- ACTOR_LIMITS.INPUT_SCHEMA_MAX_BYTES -->|

## [](#platform-limits) Platform limits

|Description|Value|
|--- |--- |
|Maximum number of actors per user|100<!-- DEFAULT_PLATFORM_LIMITS.MAX_ACTORS_PER_USER -->|
|Maximum number of tasks per user|1000<!-- DEFAULT_PLATFORM_LIMITS.MAX_TASKS_PER_USER -->|
|Maximum number of schedules per user|100<!-- DEFAULT_PLATFORM_LIMITS.MAX_SCHEDULES_PER_USER -->|
|Maximum number of webhooks per user|100<!-- DEFAULT_PLATFORM_LIMITS.MAX_TASKS_PER_USER -->|
|Maximum number of actors per scheduler|10<!-- DEFAULT_PLATFORM_LIMITS.MAX_ACTORS_PER_SCHEDULER -->|
|Maximum number of tasks per scheduler|10<!-- DEFAULT_PLATFORM_LIMITS.MAX_TASKS_PER_SCHEDULER -->|
