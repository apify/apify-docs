---
title: Dataset validation
description:  Specify the dataset schema within the Actors so you can add monitoring and validation down to the field level.
slug: /actors/development/actor-definition/dataset-schema/validation
---

**Specify the dataset schema within the Actors so you can add monitoring and validation down to the field level.**

---

To define a schema for a default dataset of an Actor run, you need to set `fields` property in the dataset schema. It’s currently impossible to set a schema for a named dataset (same as for dataset views).

:::info

The schema defines a single item in the dataset. Be careful not to define the schema as an array, it always needs to be a schema of an object.

:::

You can either do that directly through `actor.json` like this:

```json title=".actor.json"
{
    "actorSpecification": 1,
    "storages": {
        "dataset": {
            "actorSpecification": 1,
            "fields": {
                "$schema": "http://json-schema.org/draft-07/schema#",
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    }
                },
                "required": ["name"]
            },
            "views": {}
        }
    }
}
```

Or in a separate separate file like this:

```json title=".actor.json"
{
    "actorSpecification": 1,
    "storages": {
        "dataset": "./dataset_schema.json"
    }
}
```

```json title="dataset_schema.json"
{
    "actorSpecification": 1,
    "fields": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {
            "name": {
                "type": "string"
            }
        },
        "required": ["name"]
    },
    "views": {}
}
```

:::important

Dataset schema needs to be a valid JSON schema draft-07, so the `$schema` line is important and must be exactly this value or it must be omitted:

`"$schema": "http://json-schema.org/draft-07/schema#"`

:::

## Dataset validation

When you define a schema of your default dataset, the schema is then always used when you insert data into the dataset to perform validation (we use [AJV](https://ajv.js.org/)).

If the validation succeeds, nothing changes from the current behavior, data is stored and an empty response with status code 201 is returned.

**If the data you attempt to store in the dataset is invalid** (meaning any of the items received by the API fails the validation), **the whole request is discarded** and the API will return a response with status code 400 and the following JSON response:

```json
{
    "error": {
        "type": "schema-validation-error",
        "message": "Schema validation failed",
        "data": {
            "invalidItems": [{
                "itemPosition": "<array index in the received array of items>",
                "validationErrors": "<Complete list of AJV validation error objects>"
            }]
        }
    }
}
```

The type of the AJV validation error object is [here](https://github.com/ajv-validator/ajv/blob/master/lib/types/index.ts#L86)

If you use the Apify JS client or Apify SDK and call `pushData` function you can access the validation errors in a `try catch` block like this:

```javascript
try {
    const response = await Actor.pushData(items);
} catch (error) {
    if (!error.data?.invalidItems) throw error;
    error.data.invalidItems.forEach((item) => {
        const { itemPosition, validationErrors } = item;
    });
}
```

## Examples of common types of validation

Optional field (price is optional in this case):

```json
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "price": {
                "type": "number"
        }
    },
    "required": ["name"]
}
```

Field with multiple types:

```json
{
    "price": {
        "type": ["string", "number"]
    }
}
```

Field with type `any`:

```json
{
    "price": {
        "type": ["string", "number", "object", "array", "boolean"]
    }
}
```

Enabling fields to be `null` :

```json
{
    "name": {
        "type": "string",
        "nullable": true
    }
}
```

Define type of objects in array:

```json
{
    "comments": {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "author_name": {
                    "type": "string"
                }
            }
        }
    }
}
```

Define specific fields, but allow anything else to be added to the item:

```json
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        }
    },
    "additionalProperties": true
}
```

See [json schema reference](https://json-schema.org/understanding-json-schema/reference) for additional options.

You can also use [conversion tools](https://www.liquid-technologies.com/online-json-to-schema-converter) to convert an existing JSON document into it's JSON schema.

# Dataset field statistics

When you have the dataset fields schema set up, we then use the schema to generate a list of fields and measure statistics for these fields.

The measured statistics are following:

- **Null count:** how many items in the dataset have the field set to null
- **Empty count:** how many items in the dataset are `undefined` , meaning that for example empty string is not considered empty
- **Minimum and maximum**
  - For numbers, this is calculated directly
  - For strings, this field tracks string length
  - For arrays, this field tracks the number of items in the array
  - For objects, this tracks the number of keys
- For booleans, this tracks whether the boolean was set to true. So minimum is always 0, but maximum can be either 1 or 0 based on whether at least on item in the dataset has the boolean field set to true.
:::note

Currently, you cannot view these statistics. We will add API endpoint soon. But you can already use them in monitoring.

:::
