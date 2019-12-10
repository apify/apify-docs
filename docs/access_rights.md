---
title: Access rights
description: Documentation of access rights and publication at Apify platform.
menuWeight: 10
---

# [](./acess_rights)Access rights

By default, each system resource (actor, key-value store, run, ...) created by the user is only available to its owner. There are 2 ways how a user can grant access to their resources - either using an access rights system or by publishing own actor in [Apify Store](https://apify.com/store).

## Granting access rights

User can easily and securely share own resources - actors, tasks, key-value stores, datasets and requests queues with other users using a granular permission system. This enables a user to for example grant permissions to his colleague to run your actor but not allowing him to modify it. It's also possible to grant permission to update the actor and build a new version. Storages (key-value stores, request queues and datasets) are sharable the same way with for example just read permission or a combination of both read and write permissions.

To be able to grant access rights to another user you must set up your username in [account settings](https://my.apify.com/account#/profile). To share actor, task, key-value store, request queue or dataset open its settings tab and at the very bottom you find an access rights section. You can add collaborator using his user ID, email or username and once collaborator is added you can configure his permissions.

![Access rights configuration]({{@asset images/access-rights.jpg}})

## Publishing in Apify Store

Another way to share what you have made is to publish your actor in [Apify Store](https://apify.com/store). Published actor appears in [Apify Store](https://apify.com/store), any user will be able to view its source code and run it. Nobody except the author can modify it. If some user runs the actor then it gets billed against his account and actor run will be available only for him.

To publish the actor open it in [Apify app](https://my.apify.com), go to the "Publication" tab and follow instructions:

![Access rights configuration]({{@asset images/publication.png}})
