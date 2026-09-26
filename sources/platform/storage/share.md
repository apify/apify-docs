---
title: Share storage
sidebar_label: Share
description: Grant access rights to your storages, share them by link using their ID or name, and generate time-limited pre-signed URLs for restricted resources.
sidebar_position: 9.5
slug: /storage/share
---

You can share [datasets](./dataset/index.md), [key-value stores](./key_value_store/index.md), and [request queues](./request_queue.md) in three ways:

- [Grant access rights](#grant-access-rights) to other Apify users.
- [Share a storage by link](#share-by-link).
- [Generate a pre-signed URL](#share-by-link) that gives temporary access to a restricted resource.

To use a storage that belongs to a different run, see [Use storage from another run](./use-from-another-run.md).

## Grant access rights

Grant [access rights](/account/collaboration) to let other Apify users view or modify your storages. For what each right allows, see the [list of permissions](/account/collaboration/list-of-permissions).

To grant access rights:

1. In [Apify Console](https://console.apify.com/storage), open the storage's detail page.
1. Under the **Actions** menu, select **Share**.

## Share by link

Share storages by link using their ID or name. Whether the link works for others depends on your account or resource-level general access setting. For details, see [General resource access](/account/collaboration/general-resource-access).

To share individual records or items from a restricted storage, generate a pre-signed URL. The URL expires after a set time and works only for selected dataset and key-value store endpoints. See [Sharing restricted resources with pre-signed URLs](/account/collaboration/general-resource-access#pre-signed-urls).

:::tip Accessing restricted storage resources via API

If your storage resource is set to _restricted_, all API calls must include a valid authentication token in the `Authorization` header. If you're using `apify-client` the header is passed in automatically.

:::
