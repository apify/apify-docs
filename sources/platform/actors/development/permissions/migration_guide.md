---
title: Migration guide
description: How to migrate your Actor to work with limited permissions, including common questions and exact upgrade steps.
sidebar_position: 9
slug: /actors/development/permissions/migration-guide
---

**How to migrate your Actor to work with limited permissions, including common questions and exact upgrade steps.**

---

If you have existing Actors, or want to update your code for the new permission model, use this guide. The general prerequisite is to update the Actor to use the latest [Apify SDK](https://docs.apify.com/sdk).

TODO: "callout about js and sdk minimal versions":
- [js](https://github.com/apify/apify-sdk-js/releases/tag/apify%403.4.4)
- [python](https://github.com/apify/apify-sdk-python/releases/tag/v3.0.0)

Below you can read a guide that covers various, more advanced cases.

## What changes compared to full permissions?

- Actors now run with **limited permissions** by default (unless you explicitly request full permissions).
- Limited permissions mean your Actor can only access its own default storages, storages supplied via input (granted by user), and certain account metadata.
- Most platform APIs are still available, but operations affecting other users’ data are restricted.

##  Common migration paths

**Most Actors require no change**. If your Actor only uses its default dataset, key-value store, and request queue, it will keep working as before.

If your Actor creates its own storages, runs other Actors, or needs access to user-provided storages:

- Review your code for any Apify SDK calls that:
  - Create storages (`Apify.openDataset()`, `Apify.openKeyValueStore()`, ...)
  - Operate on storages not created by this run
  - Run other Actors (metamorph, `Apify.call()`)
- If you need access to a user-supplied storage, use the input schema `resourcePicker` input type and specify `resourcePermissions` your Actor needs (read more in the input schema docs).
- If your Actor MUST run with full permissions (rare, discouraged), update the Actor settings in Console/API to request full permissions, and document why.

If your Actor requests the /users/me endpoint to inspect data about the user:
- If you need to check if the user is a paying user you can use the `` environment var or Actor
