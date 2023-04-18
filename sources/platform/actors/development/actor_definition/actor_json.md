---
title: actor.json
description: Learn how to write the main actor config in the `.actor/actor.json` file.
slug: /actors/development/actor-config
sidebar_position: 1
---

**Learn how to write the main Actor config in the `.actor/actor.json` file.**

---

The main Actor config should live in the `.actor/actor.json` file in the Actor's root directory. This file associates your local development project with an Actor on the Apify platform. It contains information such as Actor name, version, build tag, and environment variables. Make sure you commit this file to the Git repository.

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
  "environmentVariables": {
      "MYSQL_USER": "my_username",
      "MYSQL_PASSWORD": "@mySecretPassword"
  },
  "dockerfile": "./Dockerfile",
  "readme": "./ACTOR.md",
  "input": "./input_schema.json",
  "storages": {
    "dataset": "./dataset_schema.json",
  }
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

> Note that actor `name`, `version`, `buildTag`, and `environmentVariables` are currently only used when you deploy your actor using [Apify CLI](/cli) and not when deployed, for example, via GitHub integration. There it serves for informative purposes only. This is suspected to change in the future.


| Property         | Type     | Description |
| ---------------- | -------- |----------- |
| `actorSpecification`   | Required | We are at a version `1` which is the only one available so this must be set to `1`. |
| `name`                 | Required | Name of the Actor. |
| `version`              | Required | Actor version in the form `[Number].[Number]`, i.e. for example `0.0`, `0.1`, `2.3`, ... |
| `buildTag`             | Optional | The tag name applied for the successful build of the Actor. Defaults to `latest`. For more information see the [builds](../builds_and_runs/builds.md) section. |
| `environmentVariables` | Optional | An map of environment variables used during the local development that will be also applied to Actor at Apify platform. For more see the [environment variables](/cli/docs/vars) section of Apify CLI documentation. |
| `dockerFile`           | Optional | If you specify the path to your Docker file under the `dockerfile` field, this file will be used for actor builds on the platform. If not specified, the system will look for Docker files at `.actor/Dockerfile` and `Dockerfile`, in this order of preference. For more see the [Dockerfile](./dockerfile.md) section. |
| `readme`               | Optional | If you specify the path to your README file under the `readme` field, the README at this path will be used on the platform. If not specified, README at `.actor/README.md` or `README.md` will be used, in this order of preference. See our [Apify Academy article on writing a quality README files](/academy/get-most-of-actors/actor-readme). |
| `input`                | Optional | You can embed your [input schema](./input_schema/index.md) object directly in `actor.json` under the `input` field. Alternatively, you can provide a path to a custom input schema. If not provided, the input schema at `.actor/INPUT_SCHEMA.json` or `INPUT_SCHEMA.json` is used, in this order of preference. |
`storages.dataset`       | Optional | You can define the schema of the items in your dataset under the `storages.dataset` field. This can be either an embedded object or a path to a JSON schema file. [Read more](./output_schema.md#specification-version-1) about Actor output schemas. |

