---
title: OpenAPI 3.0 compatibility
sidebar_label: OpenAPI 3.0 compatibility
sidebar_position: 1
description: The webServerSchema field expects an OpenAPI 3.0.x document. This page lists common OpenAPI 3.1 constructs that break the build and shows the 3.0.x form to use instead.
slug: /actors/development/actor-definition/web-server-schema/openapi-version
---

`webServerSchema` in `.actor/actor.json` accepts an [OpenAPI 3.0.x](https://spec.openapis.org/oas/v3.0.3) document. The build validator does not accept OpenAPI 3.1 constructs, and specs that rely on 3.1-only syntax fail the build with a validation error.

If you are copying an existing spec or generating one with a tool that defaults to 3.1, downgrade it before adding it to your Actor.

## Set the version string

Use `"openapi": "3.0.3"` (or any `3.0.x`) at the top of the document. Do not use `"openapi": "3.1.0"`.

```json
{
    "openapi": "3.0.3",
    "info": { "title": "My API Actor", "version": "1.0.0" },
    "paths": { }
}
```

## Nullable properties

In OpenAPI 3.1 a nullable property is expressed with a type array that includes `"null"`. In 3.0 you must use the `nullable: true` keyword alongside a single `type`.

Do not use the 3.1 form:

```json
{
    "type": ["string", "null"]
}
```

Use the 3.0 form:

```json
{
    "type": "string",
    "nullable": true
}
```

The same rule applies to any property, request body field, response body field, or reusable schema under `components.schemas`.

## Common 3.1 to 3.0 translations

| Concept | OpenAPI 3.1 | OpenAPI 3.0.x (use this) |
| --- | --- | --- |
| Nullable value | `"type": ["string", "null"]` | `"type": "string", "nullable": true` |
| Exclusive minimum | `"exclusiveMinimum": 0` | `"minimum": 0, "exclusiveMinimum": true` |
| Exclusive maximum | `"exclusiveMaximum": 100` | `"maximum": 100, "exclusiveMaximum": true` |
| Constant value | `"const": "foo"` | `"enum": ["foo"]` |
| Multiple examples on a schema | `"examples": [1, 2, 3]` | `"example": 1` (single example only) |
| No request body content | Omit `requestBody` or use `"content": {}` | Omit `requestBody`; do not use an empty `content` object |
| JSON Schema draft override | `"$schema": "..."` inside a schema | Not allowed; remove the keyword |
| Webhooks | Top-level `webhooks` object | Not supported; document webhooks in the README instead |
| File uploads | `"contentMediaType": "image/png"` on a `string` | `"type": "string", "format": "binary"` |

## Full nullable example

```json title=".actor/openapi.json"
{
    "openapi": "3.0.3",
    "info": {
        "title": "My API Actor",
        "version": "1.0.0"
    },
    "paths": {
        "/items/{id}": {
            "get": {
                "summary": "Fetch an item",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "The item, or a null body if it is a placeholder",
                        "content": {
                            "application/json": {
                                "schema": { "$ref": "#/components/schemas/Item" }
                            }
                        }
                    }
                }
            }
        }
    },
    "components": {
        "schemas": {
            "Item": {
                "type": "object",
                "required": ["id", "name"],
                "properties": {
                    "id": { "type": "string" },
                    "name": { "type": "string" },
                    "description": {
                        "type": "string",
                        "nullable": true
                    },
                    "price": {
                        "type": "number",
                        "minimum": 0,
                        "exclusiveMinimum": true
                    },
                    "status": {
                        "type": "string",
                        "enum": ["active"]
                    }
                }
            }
        }
    }
}
```

## Validating locally

Before pushing your Actor you can validate the spec against 3.0.x with any standard OpenAPI tool, for example:

```bash
npx @redocly/cli lint .actor/openapi.json
```

or

```bash
npx @apidevtools/swagger-cli validate .actor/openapi.json
```

If the tool reports 3.1-only constructs (`type` array with `null`, top-level `webhooks`, `const`, and so on), rewrite them using the table above before running `apify push`.
