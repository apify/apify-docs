---
title: Memory and CPU
description: Learn how to make your actor available to the public or keep it private. Prepare your actor for Apify Store with a description and README file.
menuWeight: 7.5
paths:
# NOTE: IF ADDING A NEW PATH, LEAVE THE OLD ONES FOR REDIRECTS
    - actors/memory-and-cpu
---

# Memory and CPU

[Actors]({{@link actors.md}}) run in
[Docker containers](https://www.docker.com/resources/what-container),
which have a limited amount of resources. When starting, the actor needs to be allocated a certain share of those resources. This determines how much "CPU horsepower" the actor has.


When you run an actor, you limit the memory it uses - you assign it 1gb, 2gb, whatever. The amount of CPU the actor receives is proportional–1 CPU core per GB of memory allocated.

The amount of CPU is always scaled. So, if you are using 1GB, you have 25% of a CPU core. But that 25% is your 100%. Same when you’re using 32GB of memory - it’s still your 100%.

**Note from Honza (needs clarifying): The Memory setting not only influences the CPU allocation, but also disk size and IO limits

## Memory requirements

Each use case has its own minimum memory requirements. The larger and more complex your project, the more memory it will require. Some examples with specific memory requirements:

- Actors using Puppeteer: at least 1GB of memory.

- Large and complex sites like Google Maps: at least 4GB for optimal speed and concurrency.

- Storing large amounts of data.

## CPU usage spikes

Sometimes, you see the actor’s CPU use go over 100%. This is not unusual - to help an actor start up faster, it is sometimes allocated extra CPU, just for the startup. For example, if an actor is assigned 1GB (25% of a core), it will temporarily be allowed to use 2GB so it gets started quicker.

-
-
-
probably leave out?
Capacity is limited, so actors have enough space when they run on the same machine.

## Limits

[See the **Limits** page]({{@link actors/limits.md}}) for information on actor memory and CPU limits.
