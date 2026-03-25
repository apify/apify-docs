---
name: api-doc
description: Create or update OpenAPI specifications and API documentation for Apify endpoints. Use when user says "add API endpoint", "create OpenAPI spec", "document this endpoint", "add code samples for API", "update API docs", or "api-doc". Handles OpenAPI YAML, schemas, code samples, and operation IDs.
allowed-tools: Read Write Edit Bash Glob Grep
argument-hint: endpoint-name
---

# API documentation

## Process

1. **Identify change type** - new endpoint, update endpoint, add code samples, or new schema
2. **Follow OpenAPI file structure**:
   - Paths in `apify-api/openapi/paths/`
   - Schemas in `apify-api/openapi/components/schemas/`
   - Code samples in `apify-api/openapi/code_samples/{javascript,curl}/`
3. **Create or update files** using naming conventions:
   - Path files: replace `/` with `@` (e.g., `request-queues@{queueId}.yaml`)
   - Operation IDs: `{objectName}_{httpMethod}` in camelCase
   - Code sample filenames must match `operationId`
4. **Register in main spec** - add path `$ref` to `apify-api/openapi/openapi.yaml`
5. **Validate** - `npm run openapi:lint` then `npm run api:rebuild`

**CRITICAL**: API docs are generated, not hand-written. Never edit files in `apify-api/docs/` directly.

For detailed patterns and examples, see `workflows/api-doc/references/openapi-patterns.md`.
For edge cases and process notes, see `workflows/api-doc/process.md`.
