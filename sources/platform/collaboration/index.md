---
title: Collaboration
description: Learn how to collaborate with other users and manage permissions for organizations or private resources such as Actors, Actor runs, and storages.
sidebar_position: 12
category: platform
slug: /collaboration
---

**Learn how to collaborate with other users and manage permissions for organizations or private resources such as Actors, Actor runs, and storages.**

---
Apify was built from the ground up as a collaborative platform. Whether you’re publishing your Actor in Apify Store or sharing a dataset with a teammate, collaboration is deeply integrated into how Apify works. You can share your resources (like Actors, runs, or storages) with others, manage permissions, or invite collaborators to your organization. By default, each system resource you create is only available to you, the owner. However, you can grant access to other users, making it easy to collaborate effectively and securely.

While most resources can be shared by assigning permissions (see [Access Rights](./access_rights.md)), some resources can also be shared simply by using their unique links or IDs. There are two types of resources in terms of sharing:

- _Resources that require explicit access by default:_
  - [Actors](../actors/running/index.md), [tasks](../actors/running/tasks.md)
  - Can be shared only by inviting collaborators using [Access Rights](./access_rights.md)) or using [Organization Accounts](./organization_account/index.md)
- _Resources supporting both explicit access and link sharing:_
  - Actor runs, Actor builds and storage resources (datasets, key-value stores, request queues)
  - Can be shared by inviting collaborators or simply by sharing a unique direct link

You can control access to your resources in four ways:

<table>
    <tr>
        <td><strong><a href="/platform/collaboration/access-rights">Access rights</a></strong></td>
        <td>Enables you to grant access to another user for a certain resource you own. This way, you can share results with your client, or two engineers can collaborate on developing one Actor.</td>
    </tr>
    <tr>
        <td><strong><a href="/platform/collaboration/general-resource-access">Share resources by link</a></strong></td>
        <td>Certain resources (runs, builds and storages) can by shared just by their link. Anyone with their ID is able to access them. This is configurable via <a href="/platform/collaboration/general-resource-access">General resource access</a></td>
    </tr>
    <tr>
        <td><strong><a href="/platform/collaboration/organization-account">Organization account</a></strong></td>
        <td>Apify's organization account allows multiple engineers to collaborate on team projects with role-specific access permissions.</td>
    </tr>
    <tr>
        <td><strong><a href="/platform/actors/publishing">Publishing in Apify Store</a></strong></td>
        <td>Another way to share your Actor with other users is to publish it in <a href="https://apify.com/store">Apify Store</a>. When publishing your Actor, you can make it a Paid Actor and get paid by the users benefiting from your tool. For more information, read the <a href="/platform/actors/publishing">publishing and monetization</a> section.</td>
    </tr>
</table>
