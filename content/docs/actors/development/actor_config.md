---
title: Actor config
description: Learn how to write the main actor config in the `.actor/actor.json` file.
paths:
    - actor/development/actor-config
    - actors/development/actor-config
---

# [](#actor-config) Actor config

The main actor config should live in the `.actor/actor.json` file in the actor's root directory. This file associates your local development project with an actor on the Apify platform. It contains information such as actor name, version, build tag and environment variables. Make sure you commit this file to the Git repository.

For example, `.actor/actor.json` file can look as follows:


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

Note that actor `name`, `version` and `buildTag` are for informative purposes only and are so far not enforced on the platform. You will still need to properly name your actor during its creation, whether you create it directly on the platform or you push it using Apify CLI.

**`Dockerfile` field**\
If you specify the path to your Docker file under the `dockerfile` field, this file will be used for actor builds on the platform. If not specified, the system will look for Docker files at `.actor/Dockerfile` and `Dockerfile` in this order of preference.

**`Readme` field** \
If you specify the path to your readme file under the `readme` field, the readme at this path will be used on the platform. If not specified, readme at `.actor/README.md` and `README.md` will be used in this order of preference.

**`Input` field**\
You can embed your [input schema](https://docs.apify.com/actors/development/input-schema#specification-version-1) object directly in `actor.json` under `input` field. Alternatively, you can provide a path to a custom input schema. If not provided, the input schema at `.actor/INPUT_SCHEMA.json` and `INPUT_SCHEMA.json` is used in this order of preference.

**`Storages.dataset` field**\
You can define the schema of the items in your dataset under the `storages.dataset` field. This can be either an embedded object or a path to a JSON schema file. You can read more about the schema of your actor output [here](https://docs.apify.com/actors/development/output-schema#specification-version-1).



