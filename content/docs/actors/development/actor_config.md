---
title: Actor config
description: Learn how to write the main actor config in the `.actor/actor.json` file.
paths:
    - actors/development/actor-config
---

# [](#actor-config) Actor config

The main actor config should live in the `.actor/actor.json` file in the actor's root directory. This file associates your local development project with an actor on the Apify platform. It contains information such as actor name, version, build tag, and environment variables. Make sure you commit this file to the Git repository.

For example, the `.actor/actor.json` file can look this:


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

Note that actor `name`, `version`, and `buildTag` are for informative purposes only, so they are not enforced on the platform right now. You will still need to properly name your actor during its creation, whether you create it directly on the platform or push it using the Apify CLI.

**`dockerfile` field**\
If you specify the path to your Docker file under the `dockerfile` field, this file will be used for actor builds on the platform. If not specified, the system will look for Docker files at `.actor/Dockerfile` and `Dockerfile`, in this order of preference.

**`readme` field** \
If you specify the path to your README file under the `readme` field, the README at this path will be used on the platform. If not specified, README at `.actor/README.md` or `README.md` will be used, in this order of preference.

**`input` field**\
You can embed your [input schema](/actors/development/input-schema#specification-version-1) object directly in `actor.json` under the `input` field. Alternatively, you can provide a path to a custom input schema. If not provided, the input schema at `.actor/INPUT_SCHEMA.json` or `INPUT_SCHEMA.json` is used, in this order of preference.

**`storages.dataset` field**\
You can define the schema of the items in your dataset under the `storages.dataset` field. This can be either an embedded object or a path to a JSON schema file. [Read more](/actors/development/output-schema#specification-version-1) about actor output schema.



