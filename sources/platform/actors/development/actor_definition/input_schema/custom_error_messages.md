---
title: Custom error messages
description: Learn how to define custom error messages for input validation in your Actor's input schema. Make validation feedback clearer and more user-friendly.
slug: /actors/development/actor-definition/input-schema/custom-error-messages
---

When an input fails validation against an Actor's input schema, the resulting errors are processed and displayed to the user. By default, these messages are generic and may not clearly explain what the validation rule actually means.

Custom error messages allow Actor developers to define tailored feedback messages for input validation errors, making it easier for users to understand what is required and improving overall usability.

## The problem with generic error messages

Some validation rules have a specific purpose that generic error messages don't explain well. For example, consider the following input field using the `pattern` validation keyword:

```json
{
  "title": "Email address",
  "type": "string",
  "description": "Your email address",
  "editor": "textfield",
  "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
}
```

Input that doesn't satisfy the pattern will produce an error message like:

```text
Field "email" should match pattern "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$".
```

However, a message such as the following would be much more understandable for the user:

```text
Field "email" must be a valid email address.
```

## Custom error messages for input fields

Each property in the [input schema](./index.md) can include an `errorMessage` field that defines a custom error message to be displayed when validation of that field fails.

The `errorMessage` must be an object that maps *validation keywords* (e.g., `type`, `pattern`, `minLength`) to their respective custom messages.

```json title="Email input with custom error messages"
{
  "title": "Email address",
  "type": "string",
  "description": "Your email address",
  "editor": "textfield",
  "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
  "errorMessage": {
    "type": "Email must be a string",
    "pattern": "Email must be a valid email address"
  }
}
```

If a validation error occurs for a keyword that is not listed in the `errorMessage` object, the system will fall back to the default error message.

:::note User-friendly messages

Custom error messages are especially useful for complex validation rules like regular expressions, where the default error message would show the entire pattern, which is not user-friendly. Refer to the [best practices](#best-practices) for more guidance.

:::

### Supported validation keywords

You can define custom error messages for any validation keyword supported by the [input schema](./index.md), including:

| Type               | Supported validation keywords                                               |
|--------------------|-----------------------------------------------------------------------------|
| `string`           | `type`, `pattern`, `minLength`, `maxLength`, `enum`                         |
| `number`/`integer` | `type`, `minimum`, `maximum`                                                |
| `boolean`          | `type`                                                                      |
| `array`            | `type`, `minItems`, `maxItems`, `uniqueItems`, `patternKey`, `patternValue` |
| `object`           | `type`, `minProperties`, `maxProperties`, `patternKey`, `patternValue`      |

#### Nested properties

It's possible to define custom error messages in sub-properties as well. For objects with nested properties, you can define error messages at any level of nesting:

```json
{
  "title": "User",
  "type": "object",
  "description": "Provide user details",
  "editor": "schemaBased",
  "properties": {
    "email": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      "errorMessage": {
        "pattern": "Please enter a valid email address"
      }
    }
  }
}
```

## Best practices

Custom error messages can be useful in specific cases, but they aren't always necessary. In most situations, the default validation messages are clear enough and ensure consistency across the platform. Use custom messages only when they meaningfully improve clarity—for example, when the default message would expose an unreadable regular expression or fail to explain a non-obvious requirement.
