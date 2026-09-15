---
title: Share storage
sidebar_label: Share
description: Grant access rights to your storages, share them by link using their ID or name, and generate time-limited pre-signed URLs for restricted resources.
sidebar_position: 9.5
slug: /storage/share
---

Share a storage with other Apify users, by link, or through a time-limited URL for one-off access to a restricted resource. This applies to all three storage types: [datasets](./dataset/index.md), [key-value stores](./key_value_store/index.md), and [request queues](./request_queue.md). To use a storage that belongs to a different run, see [Use storage from another run](./use-from-another-run.md).

## Grant access rights

Grant [access rights](/account/collaboration) to let other Apify users view or modify your storages. For what each right allows, see the [list of permissions](/account/collaboration/list-of-permissions).

In [Apify Console](https://console.apify.com/storage), open the storage's detail page and use the **Share** button under the **Actions** menu.

## Share by link

Share storages by link using their ID or name. Whether the link works for others depends on your account or resource-level general access setting; learn how link-based access works in [General resource access](/account/collaboration/general-resource-access).

For one-off sharing of individual records or items when access is restricted, generate time-limited pre-signed URLs. These are available for selected dataset and key-value store endpoints only. See [Sharing restricted resources with pre-signed URLs](/account/collaboration/general-resource-access#pre-signed-urls).

:::tip Accessing restricted storage resources via API

If your storage resource is set to _restricted_, all API calls must include a valid authentication token in the `Authorization` header. If you're using `apify-client` the header is passed in automatically.

:::
