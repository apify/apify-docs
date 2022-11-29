---
title: Input schema
description: Learn how to generate a user interface on the platform for your actor's input with a single file - the INPUT_SCHEMA.json file.
menuWeight: 2
paths:
    - apify-platform/deploying-your-code/input-schema
    - deploying-your-code/input-schema
---

# [](#input-schema) Input schema

Though writing an [input schema](https://docs.apify.com/actors/development/input-schema) for an actor is not a required step, it is most definitely an ideal one. The Apify platform will read the **INPUT_SCHEMA.json** file within the root of your project and generate a user interface for entering input into your actor, which makes it significantly easier for non-developers (and even developers) to configure and understand the inputs your actor can receive. Because of this, we'll be writing an input schema for our example actor.

> Without an input schema, the users of our actor will have to provide the input in JSON format, which can be problematic for those who are not familiar with JSON.

## [](#title-and-description) Schema title & description

In the root of our project, we'll create a file named **INPUT_SCHEMA.json** and start writing the first part of the schema.

```JSON
{
    "title": "Adding actor input",
    "description": "Add all values in list of numbers with an arbitrary length.",
    "type": "object",
    "schemaVersion": 1,
}
```

The **title** and **description** simply describe what the input schema is for, and a bit about what the actor itself does.

## [](#properties) Properties

In order to define all of the properties our actor is expecting, we must include them within an object with a key of **properties**.

```JSON
{
    "title": "Adding actor input",
    "description": "Add all values in list of numbers with an arbitrary length.",
    "type": "object",
    "schemaVersion": 1,
    "properties": {
        "numbers": {
            "title": "Number list",
            "description": "The list of numbers to add up.",
        }
    },
}
```

Each property's key corresponds to the name we're expecting within our code, while the **title** and **description** are what the user will see when configuring input on the platform.

## [](#property-types) Property types & editor types

Within our new **numbers** property, there are two more fields we must specify. Firstly, we must let the platform know that we're expecting an array of numbers with the **type** field. Then, we should also instruct Apify on which UI component to render for this input property. In our case, we have an array of numbers, which means we should use the **json** editor type that we discovered in the ["array" section](https://docs.apify.com/actors/development/input-schema#array) of the input schema documentation. We could also use **stringList**, but then we'd have to parse out the numbers from the strings.

```JSON
{
    "title": "Adding actor input",
    "description": "Add all values in list of numbers with an arbitrary length.",
    "type": "object",
    "schemaVersion": 1,
    "properties": {
        "numbers": {
            "title": "Number list",
            "description": "The list of numbers to add up.",
            "type": "array",
            "editor": "json"
        }
    },
}
```

## [](#required-fields) Required fields

The great thing about building an input schema is that it will automatically validate your inputs based on their type, maximum value, minimum value, etc. Sometimes, you want to ensure that the user will always provide input for certain fields, as they are crucial to the actor's run. This can be done by using the **required** field, and passing in the names of the fields you'd like to require.

```JSON
{
    "title": "Adding actor input",
    "description": "Add all values in list of numbers with an arbitrary length.",
    "type": "object",
    "schemaVersion": 1,
    "properties": {
        "numbers": {
            "title": "Number list",
            "description": "The list of numbers to add up.",
            "type": "array",
            "editor": "json"
        }
    },
    "required": ["numbers"]
}
```

For our case, we've made the **numbers** field required, as it is crucial to our actor's run.

## [](#final-thoughts) Final thoughts

Here is what the input schema we wrote will render on the platform:

![Rendered UI from input schema]({{@asset deploying_your_code/images/rendered-ui.webp}})

Later on, we'll be building more complex input schemas, as well as discussing how to write quality input schemas that allow the user to easily understand the actor and not become overwhelmed.

It is not expected to memorize all of the fields that properties can take, or the different editor types available, which is why it's always good to reference the [input schema documentation](https://docs.apify.com/actors/development/input-schema) when writing a schema.

## [](#next) Next up

In the [next lesson]({{@link deploying_your_code/output_schema.md}}), we'll learn how to generate an appealing Overview table to display our actor's results in real time, so users can get immediate feedback about the data being extracted.
