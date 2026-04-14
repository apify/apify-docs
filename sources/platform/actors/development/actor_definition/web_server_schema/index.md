---
title: Web server schema
sidebar_label: Web server schema
sidebar_position: 9
description: >-
  Attach an OpenAPI specification to your Actor to enable the interactive Endpoints tab in Apify Console and Apify Store, where you can browse and test endpoints.
slug: /actors/development/actor-definition/web-server-schema
---

The `webServerSchema` field in `.actor/actor.json` attaches an [OpenAPI 3.x](https://spec.openapis.org/oas/v3.0.3) specification to your Actor. You can define the schema for any Actor that exposes an HTTP server. When you enable [standby mode](/platform/actors/development/programming-interface/standby), Apify Console and Apify Store render an interactive **Endpoints** tab on the Actor's detail page, where you can browse endpoints, inspect request and response schemas, and send requests directly from the browser.

<!-- TODO: Add screenshot of the Endpoints tab UI -->

## Define the web server schema

You can define the OpenAPI spec inline in `.actor/actor.json` or reference a separate file.

### Reference an external file

```json title=".actor/actor.json"
{
    "actorSpecification": 1,
    "name": "my-api-actor",
    "version": "1.0",
    "usesStandbyMode": true,
    "webServerSchema": "./openapi.json"
}
```

Place your OpenAPI spec in `.actor/openapi.json`:

```json title=".actor/openapi.json"
{
    "openapi": "3.0.0",
    "info": {
        "title": "My API Actor",
        "version": "1.0.0"
    },
    "paths": {
        "/search": {
            "get": {
                "summary": "Search for items",
                "parameters": [
                    {
                        "name": "query",
                        "in": "query",
                        "required": true,
                        "schema": { "type": "string" }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Search results"
                    }
                }
            }
        }
    }
}
```

### Embed inline

```json title=".actor/actor.json"
{
    "actorSpecification": 1,
    "name": "my-api-actor",
    "version": "1.0",
    "usesStandbyMode": true,
    "webServerSchema": {
        "openapi": "3.0.0",
        "info": {
            "title": "My API Actor",
            "version": "1.0.0"
        },
        "paths": {
            "/health": {
                "get": {
                    "summary": "Health check",
                    "responses": {
                        "200": { "description": "OK" }
                    }
                }
            }
        }
    }
}
```

Follow the standard [OpenAPI 3.x format](https://spec.openapis.org/oas/latest.html) to describe your endpoints, parameters, request bodies, and responses.

## Build and deploy

The platform validates `webServerSchema` at build time, similar to other Actor schemas like [input schema](/platform/actors/development/actor-definition/input-schema) and [dataset schema](/platform/actors/development/actor-definition/dataset-schema). If the spec is malformed, the build fails with a validation error.

Once deployed, the **Endpoints** tab appears automatically on the Actor's detail page when you enable [standby mode](/platform/actors/development/programming-interface/standby). It renders your spec with [Swagger UI](https://swagger.io/tools/swagger-ui/) and handles authentication automatically - Actor users can send requests without configuring API tokens.

:::note Servers field is overwritten

The platform replaces the `servers` array in your spec with the Actor's standby URL at display time. Custom server URLs are ignored.

:::

## Related fields

| Field | Description |
| --- | --- |
| `usesStandbyMode` | Must be `true` for the **Endpoints** tab to appear. See [standby mode](/platform/actors/development/programming-interface/standby). |
| `webServerSchema` | The OpenAPI spec that powers the **Endpoints** tab. Defined in [`.actor/actor.json`](/platform/actors/development/actor-definition/actor-json) as an inline object or a path to a JSON file. |
