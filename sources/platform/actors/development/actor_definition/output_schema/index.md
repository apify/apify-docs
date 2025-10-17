---
title: Actor output schema
sidebar_label: Actor output schema
sidebar_position: 5
description: Learn how to define and present output of your Actor.
slug: /actors/development/actor-definition/output-schema
---

**Learn how to define and present the output of your Actor.**

---

The Actor output schema builds upon the schemas for the [dataset](/platform/actors/development/actor-definition/dataset-schema) and [key-value store](/platform/actors/development/actor-definition/key-value-store-schema). It specifies where an Actor stores its output and defines templates for accessing that output. Apify Console uses these output definitions to display run results, and the Actor run's `GET` endpoint includes them in the output property.

## Structure

Place the output configuration files in the `.actor` folder in the Actor's root directory.

You can organize the files using one of these structures:

### Single configuration file

```json title=".actor/actor.json"
{
    "actorSpecification": 1,
    "name": "files-scraper",
    "title": "Files scraper",
    "version": "1.0.0",
    "output": {
        "actorOutputSchemaVersion": 1,
        "title": "Output schema of the files scraper",
        "properties": { /* define your outputs here */ }
    }
}
```

### Separate configuration files

```json title=".actor/actor.json"
{
    "actorSpecification": 1,
    "name": "files-scraper",
    "title": "Files scraper",
    "version": "1.0.0",
    "output": "./output_schema.json"
}
```

```json title=".actor/output_schema.json"
{
    "actorOutputSchemaVersion": 1,
    "title": "Output schema of the files scraper",
    "properties": { /* define your outputs here */ }
}
```

## Output schema structure definitions

The key-value store schema defines the collections of keys and their properties. It allows you to organize and validate data stored by the Actor, making it easier to manage and retrieve specific records.

### Output schema object definition

| Property                          | Type                          | Required | Description                                                                                                     |
|-----------------------------------|-------------------------------|----------|-----------------------------------------------------------------------------------------------------------------|
| `actorOutputSchemaVersion` | integer                       | true     | Specifies the version of output schema structure document. <br/>Currently only version 1 is available. |
| `title`                           | string                        | true     | Title of the schema                                                               |
| `description`                     | string                        | false    | Description of the schema                                                         |
| `properties`                      | Object                        | true     | An object where each key is an output ID and its value is an output object definition (see below).        |

### Property object definition

| Property       | Type         | Required     | Description                                                                                                                                     |
|----------------|--------------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`        | string       | true         | The output's title, shown in the run's output tab if there are multiple outputs and in API as key for the generated output URL.    |
| `description`  | string       | false        | A description of the output. Only used when reading the schema (useful for LLMs)  |
| `template`     | string       | true | Defines a template which will be translated into output URL. The template can use variables (see below) |

### Available template variables

| Variable       | Type         | Description |
|----------------|--------------|--------------|
| `links`        | object       | Contains quick links to most commonly used URLs    |
| `links.publicRunUrl`        | string       | Public run url in format `https://console.apify.com/view/runs/:runId` |
| `links.consoleRunUrl`        | string       | Console run url in format `https://console.apify.com/actors/runs/:runId` |
| `links.apiRunUrl`        | string       | API run url in format `https://api.apify.com/v2/actor-runs/:runId` |
| `links.apiDefaultDatasetUrl`        | string       | API url of default dataset in format `https://api.apify.com/v2/datasets/:defaultDatasetId` |
| `links.apiDefaultKeyValueStoreUrl`        | string       | API url of default key-value store in format `https://api.apify.com/v2/key-value-stores/:defaultKeyValueStoreId` |
| `links.containerRunUrl`        | string       | URL of a webserver running inside the run in format `https://<containerId>.runs.apify.net/` |
| `run`        | object       | Contains information about the run same as it is returned from the `GET Run` API endpoint |
| `run.defaultDatasetId`  | string | ID of the default dataset  |
| `run.defaultKeyValueStoreId`     | string       | ID of the default key-value store |

