# API documentation process

Agent-agnostic workflow for creating or updating OpenAPI specifications and API documentation.

## Step 1: Identify change type

- **New endpoint** - Create path YAML + schema + code samples
- **Update endpoint** - Edit existing path YAML
- **Add code samples** - Create files in `code_samples/` directory
- **New schema** - Create component YAML in `components/schemas/`

## Step 2: Follow OpenAPI file structure

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

## Step 3: Create or update files

See `.agents/skills/api-doc/references/openapi-patterns.md` for detailed patterns and examples.

Key conventions:

- **Path file naming**: Replace `/` with `@` (e.g., `/request-queues/{queueId}` → `request-queues@{queueId}.yaml`)
- **Operation IDs**: `{objectName}_{httpMethod}` in camelCase (e.g., `requestQueue_get`)
- **Code sample filenames**: Must match `operationId` from the spec
- **Singular vs plural**: Single object for paths with `{id}`, plural otherwise

## Step 4: Register in main spec

Add path references to `apify-api/openapi/openapi.yaml`:

```yaml
paths:
  '/request-queues':
    $ref: './paths/request-queues/request-queues.yaml'
  '/request-queues/{queueId}':
    $ref: './paths/request-queues/request-queues@{queueId}.yaml'
```

## Step 5: Validate and test

```bash
npm run openapi:lint     # Validate OpenAPI spec (Redocly + Spectral + YAML)
npm run api:rebuild      # Regenerate API docs
npm start                # Preview locally
```

## Edge cases

### OpenAPI validation fails

Run `npm run openapi:lint` for detailed errors. Common issues: unclosed quotes in YAML, missing required fields (`summary`, `operationId`, `responses`), or `$ref` pointing to non-existent files.

### Code samples not appearing in docs

Filename must exactly match the `operationId` from the path YAML. Check build console output - missing samples are logged during `npm run api:rebuild`.

### Generated docs are stale after editing

Run `npm run api:rebuild` to clean and regenerate. The files in `apify-api/docs/` are gitignored and regenerated on every build.
