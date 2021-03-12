---
title: Memory and CPU
description: Learn about your actors' memory and processing power requirements, their relationship with Docker resources, and minimum requirements for different use cases.
menuWeight: 7.5
paths:
# NOTE: IF ADDING A NEW PATH, LEAVE THE OLD ONES FOR REDIRECTS
    - actors/memory-and-cpu
---

# Memory and CPU

[Actors]({{@link actors.md}}) run in
[Docker containers](https://www.docker.com/resources/what-container),
which have a [limited amount of resources](https://phoenixnap.com/kb/docker-memory-and-cpu-limit). When starting, the actor needs to be allocated a certain share of those resources, such as how much CPU "horsepower" it will be able to use.

![Setting an actor's memory]({{@asset actors/images/memory-settings.png}})

By assigning an actor's **memory** capacity, you also assign it a proportional amount of **CPU power**. Every CPU core corresponds to 4 GB of memory. So, 512 MB = 1/8th of a core, 1 GB = 1/4 of core, 8 GB gives you 2 cores, and so on.

In addition to CPU power, the memory allocation also influences [disk size and Input/Output (I/O) limits](https://docs.docker.com/config/containers/runmetrics/#metrics-from-cgroups-memory-cpu-block-io).

## Memory requirements

Each use case has its own minimum memory requirements. The larger and more complex your project, the more memory/CPU power it will require. Some examples which have minimum requirements are:

- Actors using [Puppeteer](https://pptr.dev/): at least 1GB of memory.

- Large and complex sites like [Google Maps](https://apify.com/drobnikj/crawler-google-places): at least 4GB for optimal speed and [concurrency](https://sdk.apify.com/docs/api/autoscaled-pool#autoscaledpoolminconcurrency).

- Storing large amounts of data.

## Scaling

The amount of CPU power available to you is always **scaled**. So, if you are using 1GB, you have 25% of a CPU core, however that 25% is your 100%. The same applies when you are using 32 GB of memory - it is still your 100%.

## CPU usage spikes

![A usage spike on an actor's start-up]({{@asset actors/images/memory-cpu-usage-spike.png}})

Sometimes, you see the actor’s CPU use go over 100%. This is not unusual - to help an actor start up faster, it is sometimes allocated extra CPU. For example, if an actor is assigned 1GB (25% of a core), it will temporarily be allowed to use 2GB so it gets started quicker.

## Limits

[See the **Limits** page]({{@link actors/limits.md}}) for information on actor memory and CPU limits.
