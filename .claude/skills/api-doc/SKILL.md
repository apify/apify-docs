---
name: api-doc
description: Create or update OpenAPI specifications and API documentation for Apify endpoints. Use when user says "add API endpoint", "create OpenAPI spec", "document this endpoint", "add code samples for API", "update API docs", or "api-doc". Handles OpenAPI YAML, schemas, code samples, and operation IDs.
---

# API documentation

Create or update OpenAPI specifications and API documentation for Apify API endpoints.

## Instructions

### Step 1: Identify the change type

- **New endpoint** - Create path YAML + schema + code samples
- **Update endpoint** - Edit existing path YAML
- **Add code samples** - Create files in `code_samples/` directory
- **New schema** - Create component YAML in `components/schemas/`

### Step 2: Follow OpenAPI file structure

```text
apify-api/openapi/
├── openapi.yaml              # Main spec file
├── components/
│   └── schemas/              # Data model definitions
├── paths/                    # API endpoint definitions
└── code_samples/
    ├── javascript/           # JS code samples
    └── curl/                 # cURL code samples
```

**CRITICAL**: API docs are generated, not hand-written. Never edit files in `apify-api/docs/` directly. Edit the OpenAPI YAML source.

### Step 3: Create or update files

For detailed patterns and examples, see `references/openapi-patterns.md`.

Key conventions:
- **Path file naming**: Replace `/` with `@` (e.g., `/request-queues/{queueId}` → `request-queues@{queueId}.yaml`)
- **Operation IDs**: `{objectName}_{httpMethod}` in camelCase (e.g., `requestQueue_get`)
- **Code sample filenames**: Must match `operationId` from the spec
- **Singular vs plural**: Single object for paths with `{id}`, plural otherwise

### Step 4: Register in main spec

Add path references to `apify-api/openapi/openapi.yaml`:

```yaml
paths:
  '/request-queues':
    $ref: './paths/request-queues/request-queues.yaml'
  '/request-queues/{queueId}':
    $ref: './paths/request-queues/request-queues@{queueId}.yaml'
```

### Step 5: Validate and test

```bash
npm run openapi:lint     # Validate OpenAPI spec (Redocly + Spectral + YAML)
npm run api:rebuild      # Regenerate API docs
npm start                # Preview locally
```

### Step 6: Quality checks

- [ ] OpenAPI spec validates without errors
- [ ] Operation IDs follow `objectName_method` convention
- [ ] All parameters have clear descriptions
- [ ] Response schemas are complete with examples
- [ ] Code samples included (JavaScript + Python)
- [ ] Examples use realistic data (not placeholder values)
- [ ] Path references added to main `openapi.yaml`
- [ ] All error responses documented (401, 404, etc.)
- [ ] Authentication requirements documented

## Examples

Example 1: Add a new endpoint

User says: "Add GET endpoint for /request-queues/{queueId}/stats"

Actions:
1. Create `paths/request-queues/request-queues@{queueId}@stats.yaml`
1. Define GET operation with `operationId: requestQueueStats_get`
1. Add response schema in `components/schemas/RequestQueueStats.yaml`
1. Create code samples in `code_samples/javascript/` and `code_samples/curl/`
1. Register path in `openapi.yaml`
1. Run `npm run openapi:lint` to validate

Example 2: Add code samples for existing endpoint

User says: "Add JavaScript code sample for the actorRun_get endpoint"

Actions:
1. Create `code_samples/javascript/actorRun_get.js`
1. Write realistic example using `ApifyClient`
1. Decorator auto-detects and adds `x-codeSamples` property on build
1. Run `npm run api:rebuild` to verify

## Troubleshooting

### OpenAPI validation fails

Cause: Invalid YAML syntax, missing `$ref` targets, or schema violations.

Solution: Run `npm run openapi:lint` for detailed errors. Common issues: unclosed quotes in YAML, missing required fields (`summary`, `operationId`, `responses`), or `$ref` pointing to non-existent files.

### Code samples not appearing in docs

Cause: Filename doesn't match `operationId`, or file is in wrong directory.

Solution: Filename must exactly match the `operationId` from the path YAML. Check build console output - missing samples are logged during `npm run api:rebuild`.

### Generated docs are stale after editing

Cause: Need to regenerate after editing OpenAPI source files.

Solution: Run `npm run api:rebuild` to clean and regenerate. The files in `apify-api/docs/` are gitignored and regenerated on every build.

### Operation ID naming confusion

Solution: Use `{objectName}_{httpMethod}` pattern. Singular for specific resources (`requestQueue_get`), plural for collections (`requestQueues_get`). See `references/openapi-patterns.md` for full examples.

## Output

Provide complete OpenAPI specification changes with proper formatting, ready to be tested and committed.
