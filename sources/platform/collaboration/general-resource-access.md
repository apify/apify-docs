# General Resources Access

Some resources, like storages, actor runs or actor builds, support `unrestricted access`. You can share them simply by sending their unique resource ID or Console link and the recipient can then view the data in Console or fetch it via API without needing an API token. This is very useful for ad-hoc collaboration, integrating third party tools that connect to data in your Apify account or quick prototypes.

Thanks to the hard-to-guess, unique IDs, it’s also secure enough for most use cases. However, it doesn't offer features like access revocation or a formal audit trail and in some cases, you may want to have more direct control over data access and require users to have explicit permissions to your resources.

**General resource access** is an account setting that defines the default access policy at the account level. You can find general resource access in Apify Console under **Settings → Security & Privacy**. The two following options are supported:

- **Anyone with ID can read (default)**: Selected resources can be accessed using just with their unique resource ID. This means if you share the resource ID with someone, they would be able to view it without providing an API token or viewing the resource by visiting the console url.
- **Restricted**: With this setting, only signed-in users with an explicit access to the resources can access them. To access restricted resources via API, a valid token needs to be provided.

This setting affects the following resources:

- Actor runs
- Actor builds
- Storages:
  - Datasets
  - Key-value stores
  - Request queues

Access to resources that require explicit access — such as Actors, tasks or schedules are not affected by this setting.

![Setup account-level general resources access setting](./images/general-resouce-access//account-setting.png)

## Per-resource access control

The account level access control can be changed on individual resources. You can do by setting the general access level to other than Restricted  in the share dialog for a given resource. This way the resource level setting takes precedence over the account setting.
![Setup resource level access control](./images/general-resouce-access/share-resource-dialog.png)

## Sharing restricted resources with pre-signed URLs {#pre-signed-urls}
