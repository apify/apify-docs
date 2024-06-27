---
title: Actor standby
description: Use the Actor as real-time API server.
sidebar_position: 7.3
slug: /actors/running/standby
sidebar_label: Actor standby
---

**Use the Actors in a lightweight mode as a blazingly fast API server.**

---

Traditional Actors are designed to run a single task and then stop. They are mostly intended to be used for batch jobs, when you e.g. need to do a big scrape or data processing task.
However, in some applications, waiting for an Actor to start is not an option. Actor standby mode solves this problem by enabling you to have the Actor ready
in the background, waiting for the incoming HTTP requests. In a sense, Actor behaves like a real-time web server or standard API server.

#### How do I know if standby mode is enabled?
You will know that the Actor is enabled for the Standby if you see the **Standby** tab on the Actor's detail page.
In the tab, you will most importantly find the hostname of the server. You will find the description of the endpoints for this Actor,
what parameters they accept, and what they return in the Actor README.

To use the Actor in the Standby mode, you do not need to do anything, no clicking start button, etc. Simply use the provided hostname and endpoint in your application,
hit the API endpoint, and consume results.

![Standby tab](./images/actor_standby/standby-tab.png)

#### Can I still run the Actor in normal mode?
Yes, you can still modify the input, and click the Start button to run the Actor in the normal mode. However, node that the Standby Actor might
not support this mode, the run might fail, or return empty results. The normal mode is always supported in the Standby Beta, even for Actors that do not handle
it well. Please, head to Actor README to learn more about the capabilities of your chosen Actor.

#### Is there any scaling to accommodate the incoming requests?
When you use the Actor in the Standby mode, the system automatically scales the Actor to accommodate the incoming requests. Under the hood,
the system starts new Actor runs, which you will see in the Actor runs tab, with origin set to Standby.

#### How do I customize standby configuration?
The Standby configuration currently consists of the following properties
- **Max requests per run** - The maximum number of concurrent HTTP requests a single standby Actor run can accept. If this limit is exceeded, the system starts a new Actor run to handle the request, which will take a few seconds.
- **Desired requests per run** - A desired number of concurrent HTTP requests a single standby Actor run can handle. If this limit is exceeded, the system preemptively starts a new Actor run to handle additional requests.
- **Memory (MB)** - The amount of memory (RAM) allocated for the Actor standby run, in megabytes. With more memory, the Actor can typically handle more requests in parallel, but the number of compute units consumed and the cost also grow.
- **Idle timeout (seconds)** - If a standby Actor run doesn’t receive any HTTP requests in this amount of time, the system will finish the run. When a new request comes, the system might need to start a new standby Actor run to handle it, which will take a few seconds. Higher idle timeout increases the responsiveness but increases the costs as the Actor needs to keep running longer.

You can see these in the Standby tab of the Actor detail page. However, note that these properties are not configurable at the Actor level. If you wish to
use the Actor-level hostname, this will always use the default configuration. In order to override this configuration, just create a new Task from the Actor.
You can then head to the Standby tab of the created Task and modify the configuration as needed. Note that the task has specific hostname, so make
sure to use that in your application if you wish to use the custom configuration.

#### Are the Standby runs billed differently?
No, the standby runs are billed in the same fashion as the normal runs.

#### Are the Standby runs shared among users?
No, even if you use the Actor-level hostname with the default configuration, the background Actor runs for your requests are not shared with other users.

#### How can I enable standby for my Actor?
You can head to Settings tab of your Actor, enabled Standby mode and set the default configuration.
![Standby for creators](./images/actor_standby/standby-creators.png)

Please make sure that you properly describe your Actors, its endpoints, and the schema for their
inputs and ouputs in your README.

#### Can I monetize my Actor in the Standby mode?
No, the Standby mode is currently in Beta and the monetization is not supported.
