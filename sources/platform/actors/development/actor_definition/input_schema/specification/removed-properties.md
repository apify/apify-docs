---
title: Removed input schema properties
sidebar_label: Removed properties
sidebar_position: 6
description: The patternKey and patternValue properties were removed from the Actor input schema on June 30, 2026. See what replaces them for arrays and objects.
slug: /actors/development/actor-definition/input-schema/specification/v1/removed-properties
---

::::warning Removed properties
**The following properties were deprecated, with support ending on June 30, 2026, and are no longer supported:**

- `patternKey` - Used to validate keys in objects and arrays
- `patternValue` - Used to validate values in objects and arrays

Building an Actor whose input schema contains them fails with a validation error. Existing builds are not affected, but you need to migrate your input schema before you build the Actor again.
::::

These properties were removed to better align with the JSON schema specification. By moving to standard JSON schema, a more consistent experience is provided that matches industry standards while enabling more powerful validation capabilities through the ability to define sub-properties.

## Alternatives for arrays

For arrays, you can replace `patternKey` and `patternValue` by using the `items` property with a subschema.

Example of replacing `patternValue` for an array of strings:

```json title="Old approach with patternValue"
{
    "title": "Tags",
    "type": "array",
    "description": "Enter tags",
    "editor": "stringList",
    "patternValue": "^[a-zA-Z0-9-_]+$"
}
```

```json title="New approach with items subschema"
{
    "title": "Tags",
    "type": "array",
    "description": "Enter tags",
    "editor": "stringList",
    "items": {
        "type": "string",
        "pattern": "^[a-zA-Z0-9-_]+$"
    }
}
```

Example of replacing both `patternKey` and `patternValue` for an array with key-value pairs:

```json title="Old approach with patternKey and patternValue"
{
    "title": "Headers",
    "type": "array",
    "description": "HTTP headers",
    "editor": "keyValue",
    "patternKey": "^[a-zA-Z0-9-]+$",
    "patternValue": "^.+$"
}
```

```json title="New approach with items subschema"
{
    "title": "Headers",
    "type": "array",
    "description": "HTTP headers",
    "editor": "keyValue",
    "items": {
        "type": "object",
        "properties": {
            "key": {
                "title": "Name",
                "type": "string",
                "description": "Header name",
                "pattern": "^[a-zA-Z0-9-]+$"
            },
            "value": {
                "title": "Value",
                "type": "string",
                "description": "Header value",
                "pattern": "^.+$"
            }
        },
        "required": ["key", "value"]
    }
}
```

## Alternatives for objects

For objects, there is no direct replacement for `patternKey` and `patternValue` properties.

If you need to validate object properties, consider using a predefined schema with the `properties` field instead of allowing arbitrary properties with validation patterns.
