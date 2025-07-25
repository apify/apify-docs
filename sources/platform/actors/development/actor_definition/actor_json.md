---
title: actor.json
description: Learn how to write the main Actor config in the `.actor/actor.json` file.
slug: /actors/development/actor-definition/actor-json
sidebar_position: 1
---

**Learn how to write the main Actor configuration in the `.actor/actor.json` file.**

---

Your main Actor configuration is in the `.actor/actor.json` file at the root of your Actor's directory. This file links your local development project to an Actor on the Apify platform. It should include details like the Actor's name, version, build tag, and environment variables. Make sure to commit this file to your Git repository.

For example, the `.actor/actor.json` file can look like this:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="main">
<TabItem value="Full actor.json" label="Full actor.json">

```json
{
    "actorSpecification": 1, // always 1
    "name": "name-of-my-scraper",
    "version": "0.0",
    "buildTag": "latest",
    "minMemoryMbytes": 256,
    "maxMemoryMbytes": 4096,
    "environmentVariables": {
        "MYSQL_USER": "my_username",
        "MYSQL_PASSWORD": "@mySecretPassword"
    },
    "usesStandbyMode": false,
    "dockerfile": "./Dockerfile",
    "readme": "./ACTOR.md",
    "input": "./input_schema.json",
    "storages": {
        "dataset": "./dataset_schema.json"
    },
    "webServerSchema": "./web_server_openapi.json"
}
```

</TabItem>
<TabItem value="Minimal actor.json" label="Minimal actor.json">

```json
{
    "actorSpecification": 1, // always 1
    "name": "name-of-my-scraper",
    "version": "0.0"
}
```

</TabItem>
</Tabs>

## Reference

:::note Deployment metadata

Actor `name`, `version`, `buildTag`, and `environmentVariables` are currently only used when you deploy your Actor using the [Apify CLI](/cli) and not when deployed, for example, via GitHub integration. There, it serves for informative purposes only.

:::

| Property | Type | Description |
| --- | --- | --- |
| `actorSpecification` | Required | The version of the Actor specification. This property must be set to `1`, which is the only version available.  |
| `name` | Required | The name of the Actor. |
| `version` | Required | The version of the Actor, specified in the format `[Number].[Number]`, e.g., `0.1`, `0.3`, `1.0`, `1.3`, etc. |
| `buildTag` | Optional | The tag name to be applied to a successful build of the Actor. If not specified, defaults to `latest`. Refer to the [builds](../builds_and_runs/builds.md) for more information. |
| `environmentVariables` | Optional | A map of environment variables to be used during local development. These variables will also be applied to the Actor when deployed on the Apify platform. For more details, see the [environment variables](/cli/docs/vars) section of Apify CLI documentation. |
| `dockerfile` | Optional | The path to the Dockerfile to be used for building the Actor on the platform. If not specified, the system will search for Dockerfiles in the `.actor/Dockerfile` and `Dockerfile` paths, in that order. Refer to the [Dockerfile](./docker.md) section for more information. |
| `dockerContextDir` | Optional | The path to the directory to be used as the Docker context when building the Actor. The path is relative to the location of the `actor.json` file. This property is useful for monorepos containing multiple Actors. Refer to the [Actor monorepos](../deployment/source_types.md#actor-monorepos) section for more details. |
| `readme` | Optional | The path to the README file to be used on the platform. If not specified, the system will look for README files in the `.actor/README.md` and `README.md` paths, in that order of preference. Check out [Apify Marketing Playbook to learn how to write a quality README files](https://apify.notion.site/How-to-create-an-Actor-README-759a1614daa54bee834ee39fe4d98bc2) guidance. |
| `input` | Optional | You can embed your [input schema](./input_schema/index.md) object directly in `actor.json` under the `input` field. You can also provide a path to a custom input schema. If not provided, the input schema at `.actor/INPUT_SCHEMA.json` or `INPUT_SCHEMA.json` is used, in this order of preference. |
| `changelog` | Optional | The path to the CHANGELOG file displayed in the Information tab of the Actor in Apify Console next to Readme. If not provided, the CHANGELOG at `.actor/CHANGELOG.md` or `CHANGELOG.md` is used, in this order of preference. Your Actor doesn't need to have a CHANGELOG but it is a good practice to keep it updated for published Actors. |
| `storages.dataset` | Optional | You can define the schema of the items in your dataset under the `storages.dataset` field. This can be either an embedded object or a path to a JSON schema file. [Read more](/platform/actors/development/actor-definition/dataset-schema) about Actor dataset schemas. |
| `minMemoryMbytes` | Optional | Specifies the minimum amount of memory in megabytes required by the Actor to run. Requires an _integer_ value. If both `minMemoryMbytes` and `maxMemoryMbytes` are set, then `minMemoryMbytes` must be equal or lower than `maxMemoryMbytes`. Refer to the [Usage and resources](https://docs.apify.com/platform/actors/running/usage-and-resources#memory) for more details about memory allocation. |
| `maxMemoryMbytes` | Optional | Specifies the maximum amount of memory in megabytes required by the Actor to run. It can be used to control the costs of run, especially when developing pay per result Actors. Requires an _integer_ value. Refer to the [Usage and resources](https://docs.apify.com/platform/actors/running/usage-and-resources#memory) for more details about memory allocation. |
| `usesStandbyMode` | Optional | Boolean specifying whether the Actor will have [Standby mode](../programming_interface/actor_standby.md) enabled. |
| `webServerSchema` | Optional | Defines an OpenAPI v3 schema for the web server running in the Actor. This can be either an embedded object or a path to a JSON schema file. Use this when your Actor starts its own HTTP server and you want to describe its interface. |
