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

## Example

The following example Actor calls `Actor.setValue()` to save two files to the key-value store:

```javascript title="main.js"
import { Actor } from 'apify';
// Initialize the JavaScript SDK
await Actor.init();

/**
 * Store data in key-value store
 */
await Actor.setValue('document-1.txt', 'my text data', { contentType: 'text/plain' });

await Actor.setValue(`image-1.jpeg`, imageBuffer, { contentType: 'image/jpeg' });

// Exit successfully
await Actor.exit();
```

To specify that output is stored in the key-value store, update `.actor/actor.json`:

```json title=".actor/actor.json"
{
    "actorSpecification": 1,
    "name": "Actor Name",
    "title": "Actor Title",
    "version": "1.0.0",
    "output": {
        "actorOutputSchemaVersion": 1,
        "title": "Output schema of the Actor",
        "properties": {
            "files": {
                "type": "string",
                "title": "Files",
                "template": "{{links.apiDefaultKeyValueStoreUrl}}/keys"
            }
        }
    }
}
```

The schema defines one output called `files` that uses the `template` property to specify the URL for the default key-values store `GET keys` API endpoint.

Apify Console uses this configuration to display key-value store data

The **Output** tab will then display the contents of the key-value store:

![Output tab in Run](images/output-schema-simple-example.png)

The `GET Run` API endpoint response will include an `output` property.

```json
"output": {
    "files": "https://api.apify.com/v2/key-value-stores/<key-value-store-id>/keys"
}
```

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
        "properties": /* define your outputs here */
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
        "properties": /* define your outputs here */
    }
```

Choose the method that best suits your configuration.

## Output schema structure definitions

The key-value store schema defines the collections of keys and their properties. It allows you to organize and validate data stored by the Actor, making it easier to manage and retrieve specific records.

### Key-value store schema object definition

| Property                          | Type                          | Required | Description                                                                                                     |
|-----------------------------------|-------------------------------|----------|-----------------------------------------------------------------------------------------------------------------|
| `actorOutputSchemaVersion` | integer                       | true     | Specifies the version of output schema structure document. <br/>Currently only version 1 is available. |
| `title`                           | string                        | true     | Title of the schema                                                               |
| `description`                     | string                        | false    | Description of the schema                                                         |
| `properties`                      | Object                        | true     | An object where each key is an output ID and its value is an output object definition (see below).        |

### Output object definition

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

## Advanced examples

The output schema's `template` property support various Actor types. The following examples show common use cases:

### Linking dataset views and key-value store collections

This example shows a schema definition for a basic social media scraper. The scraper downloads post data into the dataset, and video and subtitle files into the key-value store.

After you define `views` and `collection` in `dataset_schema.json` and `key_value_store.json`, you can use them in the output schema.

```json title=".actor/output_schema.json"
{
    "actorOutputSchemaVersion": 1,
    "title": "Output schema of Social media scraper",
    "properties": {
        "overview": {
            "type": "string",
            "title": "Overview 🔎",
            "template": "{{links.apiDefaultDatasetUrl}}/items?view=overview"
        },
        "posts": {
            "type": "string",
            "title": "Posts ✉️",
            "template": "{{links.apiDefaultDatasetUrl}}/items?view=posts"
        },
        "author": {
            "type": "string",
            "title": "Authors 🧑‍🎤",
            "template": "{{links.apiDefaultDatasetUrl}}/items?view=author"
        },
        "music": {
            "type": "string",
            "title": "Music 🎶",
            "template": "{{links.apiDefaultDatasetUrl}}/items?view=music"
        },
        "video": {
            "type": "string",
            "title": "Video 🎞️",
            "template": "{{links.apiDefaultDatasetUrl}}/items?view=video"
        },
        "subtitleFiles": {
            "type": "string",
            "title": "Subtitle files",
            "template": "{{links.apiDefaultKeyValueStoreUrl}}/keys?collection=subtitles"
        },
        "videoFiles": {
            "type": "string",
            "title": "Video files",
            "template": "{{links.apiDefaultKeyValueStoreUrl}}/keys?collection=videos"
        }
    }
}
```

The schema above defines five dataset outputs and two key-value store outputs. The dataset outputs link to views, and the key-value store output link to collections, both defined in their respective schema files.

When a user runs the Actor in the Console, the UI will look like this:

![Video files in Output tab](images/output-schema-combination-example.png)

### Using container URL to display chat client

In this example, an Actor runs a web server that provides a chat interface to an LLM.
The conversation history is then stored in the dataset.

```json title=".actor/output_schema.json"
{
    "actorOutputSchemaVersion": 1,

    "title": "Chat client output",
    "description": "Chat client provides interactive view to converse with LLM and chat history in dataset",
    "type": "object",

    "properties": {
        "clientUrl": {
            "type": "string",
            "title": "Chat client",
            "template": "{{run.containerUrl}}"
        },
        "chatHistory": {
            "type": "string",
            "title": "Conversation history",
            "template": "{{links.apiDefaultDatasetUrl}}/items"
        }
    }
}
```

In the schema above we have two outputs.
The `clientUrl` output will return a link to the web server running inside the run.
The `chatHistory` links to the default dataset and contains the history of the whole conversation, with each message as a separate item.

When the run in the Console, the user will then see this:

![Chat in Output tab](images/output-schema-chat-example.png)

### Custom HTML as Actor run output

This example shows an output schema of an Actor that runs Cypress tests. When the run finishes, the Actor generates an HTML report and store it in the key-value store. You can link to this file and show it as an output:

```json title=".actor/output_schema.json"
{
    "actorOutputSchemaVersion": 1,

    "title": "Cypress test report output",
    "description": "Test report from Cypress",
    "type": "object",

    "properties": {
        "reportUrl": {
            "type": "string",
            "title": "HTML Report",
            "template": "{{links.apiDefaultKeyValueStoreUrl}}/records/report.html"
        }
    }
}
```

The `reportUrl` in this case links directly to the key-value store record stored in the default key-value store.

When the run finishes, Apify Console displays the HTML report in an iframe:

![HTML report in Output tab](images/output-schema-record-example.png)

### Actor with no output

If your Actor has no output (for example, if it's an integration that performs an action and exits), it can be confusing for users, as they will see the empty **Output** tab and think the Actor did not work.

You can force the Console to "know" that the Actor has no output by not defining any outputs in the output schema:

```json title=".actor/output_schema.json"
{
    "actorOutputSchemaVersion": 1,

    "title": "Send mail output",
    "description": "Send mail Actor does not generate any output.",
    "type": "object",

    "properties": {}
}
```

When you run an Actor with an output schema defined with no properties, the Console will default to showing the **Log** tab.

