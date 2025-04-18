---
title: Dataset validation
description:  Specify the dataset schema within the Actors so you can add monitoring and validation at the field level.
slug: /actors/development/actor-definition/dataset-schema/validation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**Specify the dataset schema within the Actors so you can add monitoring and validation at the field level.**

---

To define a schema for a default dataset of an Actor run, you need to set `fields` property in the dataset schema.

:::info

The schema defines a single item in the dataset. Be careful not to define the schema as an array, it always needs to be a schema of an object.

Schema configuration is not available for named datasets or dataset views.

:::

You can either do that directly through `actor.json`:

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

Or in a separate file linked from the `.actor.json`:

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

If the validation succeeds, nothing changes from the current behavior, data is stored and an empty response with status code `201` is returned.

If the data you attempt to store in the dataset is _invalid_ (meaning any of the items received by the API fails validation), _the entire request will be discarded_, The API will return a response with status code `400` and the following JSON response:

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

The type of the AJV validation error object is [here](https://github.com/ajv-validator/ajv/blob/master/lib/types/index.ts#L86).

If you use the Apify JS client or Apify SDK and call `pushData` function you can access the validation errors in a `try catch` block like this:

<Tabs>
  <TabItem value="Javascript" label="Javascript" default>
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
  </TabItem>
  <TabItem value="Python" label="Python">
```python
try:
    await Actor.push_data(items)
except ApifyApiError as error:
    if "invalidItems" in error.data:
        validation_errors = e.data["invalidItems"]
```
  </TabItem>
</Tabs>

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

## Dataset field statistics

When you configure the dataset fields schema, we generate a field list and measure the following statistics:

- **Null count:** how many items in the dataset have the field set to null
- **Empty count:** how many items in the dataset are `undefined` , meaning that for example empty string is not considered empty
- **Minimum and maximum**
  - For numbers, this is calculated directly
  - For strings, this field tracks string length
  - For arrays, this field tracks the number of items in the array
  - For objects, this tracks the number of keys
  - For booleans, this tracks whether the boolean was set to true. Minimum is always 0, but maximum can be either 1 or 0 based on whether at least one item in the dataset has the boolean field set to true.


You can use them in [monitoring](../../../../monitoring#alert-configuration).

