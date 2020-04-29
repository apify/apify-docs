---
title: Access rights
description: Documentation of access rights and publication at Apify platform.
menuWeight: 9
paths: 
    - access-rights
---

# [](./access_rights)Access rights

By default, each system resource (actor, key-value store, run, ...) created by the user is only available to its owner. There are two ways a user can grant access to their resources - either by using an access rights system or by publishing their own actor in [Apify Store](https://apify.com/store).

## [](#granting-access-rights)Granting access rights

Users can easily and securely share their own resources - actors, tasks, key-value stores, datasets and request queues with other users using a granular permission system. This enables a user to, for example, grant permissions to his colleague to run an actor but not allow him to modify it. It's also possible to grant permission to update the actor and build a new version. Storages (key-value stores, request queues and datasets) are sharable the same way with, for example, just read permission or a combination of both read and write permissions.

To be able to grant access rights to another user you must have a username set up in [account settings](https://my.apify.com/account#/profile). To share actor, task, key-value store, request queue or dataset, open its settings tab and at the very bottom you will find the access rights section. You can add a collaborator by using his user ID, email or username and once the collaborator is added you can configure his permissions.

![Access rights configuration]({{@asset images/access-rights.jpg}})

## [](#publishing-in-apify-store)Publishing in Apify Store

Another way to share what you have made is to publish your actor in [Apify Store](https://apify.com/store). The published actor appears in [Apify Store](https://apify.com/store), any user will be able to view its source code and run it. Nobody except the author can modify it. If a user runs the actor, it gets billed to his account and the actor run will be available only for him.

To publish the actor, open it in [Apify app](https://my.apify.com), go to the "Publication" tab and follow the instructions:

![Access rights configuration]({{@asset images/publication.png}})
