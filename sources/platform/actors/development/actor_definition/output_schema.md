---
title: Output schema
sidebar_position: 3
description: Learn how to define and present your output schema in an user-friendly output UI.
slug: /actors/development/actor-definition/output-schema
---

# Output Schema Specification

**Learn how to define and present your output schema in an user-friendly output UI.**

---

The output schema defines the structure and representation of data produced by an Actor, both in the API and the visual user interface.

## Example

Let's consider an example Actor that calls `Actor.pushData()` to store data into dataset:

```javascript title="main.js"
import { Actor } from 'apify';
// Initialize the JavaScript SDK
await Actor.init();

/**
 * Actor code
 */
await Actor.pushData({
    numericField: 10,
    pictureUrl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
    linkUrl: 'https://google.com',
    textField: 'Google',
    booleanField: true,
    dateField: new Date(),
    arrayField: ['#hello', '#world'],
    objectField: {},
});


// Exit successfully
await Actor.exit();
```

To set up the Actor's output tab UI using a single configuration file, use the following template for the `.actor/actor.json` configuration:

```json title=".actor/actor.json"
{
    "actorSpecification": 1,
    "name": "Actor Name",
    "title": "Actor Title",
    "version": "1.0.0",
    "storages": {
        "dataset": {
            "actorSpecification": 1,
            "views": {
                "overview": {
                    "title": "Overview",
                    "transformation": {
                        "fields": [
                            "pictureUrl",
                            "linkUrl",
                            "textField",
                            "booleanField",
                            "arrayField",
                            "objectField",
                            "dateField",
                            "numericField"
                        ]
                    },
                    "display": {
                        "component": "table",
                        "properties": {
                            "pictureUrl": {
                                "label": "Image",
                                "format": "image"
                            },
                            "linkUrl": {
                                "label": "Link",
                                "format": "link"
                            },
                            "textField": {
                                "label": "Text",
                                "format": "text"
                            },
                            "booleanField": {
                                "label": "Boolean",
                                "format": "boolean"
                            },
                            "arrayField": {
                                "label": "Array",
                                "format": "array"
                            },
                            "objectField": {
                                "label": "Object",
                                "format": "object"
                            },
                            "dateField": {
                                "label": "Date",
                                "format": "date"
                            },
                            "numericField": {
                                "label": "Number",
                                "format": "number"
                            }
                        }
                    }
                }
            }
        }
    }
}
```

The template above defines the configuration for the default dataset output view. Under the `views` property, there is one view titled _Overview_. The view configuration consists of two main steps:

1. `transformation` - set up how to fetch the data.
2. `display` - set up how to visually present the fetched data.

The default behavior of the Output tab UI table is to display all fields from `transformation.fields` in the specified order. You can customize the display properties for specific formats or column labels if needed.

![Output tab UI](./images/output-schema-example.png)

## Structure

Output configuration files need to be located in the `.actor` folder within the Actor's root directory.

You have two choices of how to organize files within the `.actor` folder.

### Single configuration file

```json title=".actor/actor.json"
{
    "actorSpecification": 1,
    "name": "this-is-book-library-scraper",
    "title": "Book Library scraper",
    "version": "1.0.0",
    "storages": {
        "dataset": {
            "actorSpecification": 1,
            "fields": {},
            "views": {
                "overview": {
                    "title": "Overview",
                    "transformation": {},
                    "display": {}
                }
            }
        }
    }
}
```

### Separate configuration files

```json title=".actor/actor.json"
{
    "actorSpecification": 1,
    "name": "this-is-book-library-scraper",
    "title": "Book Library scraper",
    "version": "1.0.0",
    "storages": {
        "dataset": "./dataset_schema.json"
    }
}
```

```json title=".actor/dataset_schema.json"
{
    "actorSpecification": 1,
    "fields": {},
    "views": {
        "overview": {
            "title": "Overview",
            "transformation": {},
            "display": {}
        }
    }
}
```

Both of these methods are valid so choose one that suits your needs best.

## Handle nested structures

The most frequently used data formats present the data in a tabular format (Output tab table, Excel, CSV). If your Actor produces nested JSON structures, you need to transform the nested data into a flat tabular format. You can flatten the data in the following ways:

- Use `transformation.flatten` to flatten the nested structure of specified fields. This transforms the nested object into a flat structure. e.g. with `flatten:["foo"]`, the object `{"foo": {"bar": "hello"}}` is turned into `{"foo.bar": "hello"}`. Once the structure is flattened, it's necessary to use the flattened property name in both `transformation.fields` and `display.properties`, otherwise, fields might not be fetched or configured properly in the UI visualization.

- Use `transformation.unwind` to deconstruct the nested children into parent objects.

- Change the output structure in an Actor from nested to flat before the results are saved in the dataset.

## Dataset schema structure definitions

The dataset schema structure defines the various components and properties that govern the organization and representation of the output data produced by an Actor. It specifies the structure of the data, the transformations to be applied, and the visual display configurations for the Output tab UI.

### DatasetSchema object definition

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `actorSpecification` | integer | true | Specifies the version of dataset schema <br/>structure document. <br/>Currently only version 1 is available. |
| `fields` | JSONSchema compatible object | true | Schema of one dataset object. <br/>Use JsonSchema Draft 2020–12 or <br/>other compatible formats. |
| `views` | DatasetView object | true | An object with a description of an API <br/>and UI views. |

### DatasetView object definition

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | string | true | The title is visible in UI in the Output tab <br/>and in the API. |
| `description` | string | false | The description is only available in the API response. |
| `transformation` | ViewTransformation object | true | The definition of data transformation <br/> applied when dataset data is loaded from <br/>Dataset API. |
| `display` | ViewDisplay object | true | The definition of Output tab UI visualization. |

### ViewTransformation object definition

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `fields` | string[] | true | Selects fields to be presented in the output. <br/>The order of fields matches the order of columns <br/>in visualization UI. If a field value <br/>is missing, it will be presented as **undefined** in the UI. |
| `unwind` | string | false | Deconstructs nested children into parent object, <br/>For example, with `unwind:["foo"]`, the object `{"foo": {"bar": "hello"}}` <br/> is transformed into `{"bar": "hello"}`. |
| `flatten` | string[] | false | Transforms nested object into flat structure. <br/>For example, with `flatten:["foo"]` the object `{"foo":{"bar": "hello"}}` <br/> is transformed into `{"foo.bar": "hello"}`. |
| `omit` | string | false | Removes the specified fields from the output. <br/>Nested fields names can be used as well. |
| `limit` | integer | false | The maximum number of results returned. <br/>Default is all results. |
| `desc` | boolean | false | By default, results are sorted in ascending based on the write event into the dataset. <br/> If `desc:true`, the newest writes to the dataset will be returned first. |

### ViewDisplay object definition

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `component` | string | true | Only the `table` component is available. |
| `properties` | Object | false | An object with keys matching the `transformation.fields` <br/> and `ViewDisplayProperty` as values. If properties are not set, the table will be rendered automatically with fields formatted as `strings`, `arrays` or `objects`. |

### ViewDisplayProperty object definition

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `label` | string | false | In the Table view, the label will be visible as the table column's header. |
| `format` | One of <ul><li>`text`</li><li>`number`</li><li>`date`</li><li>`link`</li><li>`boolean`</li><li>`image`</li><li>`array`</li><li>`object`</li></ul> | false | Describes how output data values are formatted to be rendered in the Output tab UI. |
