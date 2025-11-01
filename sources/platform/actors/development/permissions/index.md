---
title: Permissions
description: Learn how to declare and manage permissions for your Actor, what access levels mean, and how to build secure, trusted Actors for Apify users.
sidebar_position: 7.5
slug: /actors/development/permissions
---

**Learn how to declare and manage permissions for your Actor, what access levels mean, and how to build secure, trusted Actors for Apify users.**

---

Every time a user runs your Actor, it runs under their Apify account. **Actor Permissions** is an Actor level setting that defines the level of access your Actor needs to be able to run. This gives users transparency and control over what data your Actor can access, building trust in your tools.

There are two levels of access your Actors can request:
- **Limited permissions (preferred):**  Actors with this permission level have restricted access, primarily to their own storages and the data they generate. They cannot access other user data on the Apify platform.
- **Full permissions:** This level grants an Actor access to all of a user's Apify account data.

Most Actors should

## How Actor permissions work

When a user runs an Actor, it receives an Apify API token. This token is injected to the Actor's runtime and has a scope of access as requested by the Actor permission level.

Actors with **full permissions** receive a token with full access to the users account, this token grants access to the user's entire Apify account via Apify API.

Actors with **limited permissions** receive [a restricted scoped token](link). This token only allows the Actor to perform a specific set of actions, which covers the vast majority of common use cases. A limited-permission Actor can:

- Read and write to its default storages.
- Update the current run’s status, abort the run, or metamorph to another Actor (as long as it also has limited permissions).
- Read basic user information (whether the user is paying, proxy password, public profile).
- Read or also write to storages provided via Actor input (sample scenario: the user provides the Actor with a dataset that the Actor should write into).
- Run any other Actor with limited permissions.
- Create any additional storage, and write to that storage.
- Read and write to storages created in previous runs.

This approach ensures your Actor has everything it needs to function while protecting user data from unnecessary exposure.

### Accessing user provided storages

TODO: a section detailing how a limited permission actor can expand its scope

### Declaring permissions

You can set the permission level for your Actor in the Apify Console under its **Settings** tab. All the existing Actors are configured to use full permissions, but the plan is to make limited permissions the default for all new Actors.

![Actor permissions configuration in Actor settings](./images/actor_settings_permissions.webp)

### End-user experience

Initially, users will begin to see a gray, muted badge on your Actor's detail page indicating whether it requires "Limited permissions" or "Full permissions". At this stage, the experience of running an Actor will not change for the user.

![User experience for users viewing limited permission Actor in console](./images/end_user_ux_limited_permissions.png)

![User experience for users viewing full permission Actor in console](./images/end_user_ux_full_permissions.png)

### Impact of permission level

TODO: Section about current and future implications of keeping an actor on full

TODO: Link to migration guide or inline it fully
