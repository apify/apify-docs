---
title: Custom error messages
description: Learn how to define custom error messages for input validation in your Actor's input schema. Make validation feedback clearer and more user-friendly.
slug: /actors/development/actor-definition/input-schema/custom-error-messages
---

**Learn how to define custom error messages for input validation in your Actor's input schema. Make validation feedback clearer and more user-friendly.**

---

When an input fails validation against an Actor's input schema, the resulting errors are processed and displayed to the user. By default, these messages are generic and may not clearly convey the specific semantic meaning behind validation rules.

Custom error messages allow Actor developers to define tailored feedback messages for input validation errors, making it easier for users to understand what is required and improving overall usability.

## The problem with generic error messages

Some validation rules defined by Actor developers carry specific semantic meaning that cannot be clearly conveyed by generic error messages.

For example, consider the following input field using the `pattern` validation keyword:

```json
{
  "title": "Email address",
  "type": "string",
  "description": "Your email address",
  "editor": "textfield",
  "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
}
```

Input that don't satisfy the pattern, will produce an error message like:

```
Field "email" should match pattern "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$".
```

However, a message such as the following would be much more understandable for the user:

```
Field "email" must be a valid email address.
```

## Using the `errorMessage` keyword

Each property in the [input schema](./index.md) can include an `errorMessage` field that defines custom error messages to be displayed when validation of that field fails.

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

::::note
Custom error messages are especially useful for complex validation rules like regular expressions, where the default error message would show the entire pattern, which is not user-friendly. See [best practices](#best-practices) for more guidance.
::::

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

While custom error messages can improve the user experience by providing clearer guidance, it's generally better to rely on the default error messages unless there's a specific need for customization. Only use custom error messages when they significantly help users understand the requirements better than the default messages.

If you do decide to use custom error messages, follow these best practices:

1. **Be specific** - Clearly explain what is required or what went wrong
2. **Be concise** - Keep messages short and to the point
3. **Be helpful** - Provide guidance on how to fix the issue
4. **Be consistent** - Use a similar tone and style across all messages
