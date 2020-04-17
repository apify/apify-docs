---
title: Limits
description: Documentation of Apify actors - a serverless computing jobs that enable execution of long-running web scraping and automation tasks in the cloud.
menuWeight: 3.8
paths:
    - actor/limits
---

# [](#limits)Limits

This section describes various resource limits of the Apify platform. Do you need to increase any of them? Please [contact us](https://apify.com/contact).

|Description|Value|
|--- |--- |
|Build memory size|1,024 MB <!-- ACTOR_LIMITS.BUILD_DEFAULT_MEMORY_MBYTES -->|
|Build timeout|600 secs <!-- ACTOR_LIMITS.BUILD_TIMEOUT_SECS --> |
|Build/run disk size|2x job memory limit<!-- ACTOR_LIMITS.RUN_DISK_TO_MEMORY_SIZE_COEFF -->|
|Run minimum memory|128 MB<!-- ACTOR_LIMITS.MIN_RUN_MEMORY_MBYTES -->|
|Run maximum memory|32,768 MB<!-- ACTOR_LIMITS.MAX_RUN_MEMORY_MBYTES -->|
|Maximum combined memory of all running jobs (free accounts)|8,192 MB<!-- ACTOR_LIMITS.FREE_ACCOUNT_MAX_MEMORY_MBYTES -->|
|Maximum combined memory of all running jobs (paid accounts)|65,536 MB<!-- ACTOR_LIMITS.PAID_ACCOUNT_MAX_MEMORY_MBYTES -->|
|Build/run maximum log size|5,000,000 characters<!-- ACTOR_LIMITS.LOG_MAX_CHARS -->|

