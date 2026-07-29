# OpenAPI patterns and examples

Detailed examples for creating OpenAPI specs in this repository.

## Path file example

Location: `apify-api/openapi/paths/`

Naming convention: Replace `/` with `@` in the URL path.

- `/request-queues` → `request-queues.yaml`
- `/request-queues/{queueId}` → `request-queues@{queueId}.yaml`

```yaml
get:
  tags:
    - Request Queues
  summary: Get a Request Queue
  operationId: requestQueue_get
  description: |
    Retrieves a specific request queue by ID.

    Returns detailed information about the queue including
    its current state, item count, and metadata.
  parameters:
    - name: queueId
      in: path
      required: true
      description: The unique identifier of the request queue
      schema:
        type: string
  responses:
    '200':
      description: Request queue details
      content:
        application/json:
          schema:
            $ref: ../components/schemas/RequestQueue.yaml
    '401':
      description: Unauthorized
    '404':
      description: Queue not found
  x-code-samples:
    - lang: JavaScript
      source:
        $ref: ../code_samples/JavaScript/request-queues@{queueId}/get.js
    - lang: Python
      source:
        $ref: ../code_samples/Python/request-queues@{queueId}/get.py
```

## Schema example

Location: `apify-api/openapi/components/schemas/`

```yaml
type: object
properties:
  id:
    description: The resource ID
    readOnly: true
    allOf:
      - $ref: ./ResourceId.yaml
  name:
    type: string
    description: The resource name
    example: "my-resource"
required:
  - id
  - name
```

## Operation ID conventions

Format: `{objectName}_{httpMethod}`

Rules:
- Use camelCase for object names
- Singular for paths with `{id}`, plural otherwise - except for the Actor `/runs` and `/builds` collections, see the exception below
- Underscore separator between object name and method
- Method name in lowercase

| Path | HTTP Method | Operation ID |
|---|---|---|
| `/request-queues` | GET | `requestQueues_get` |
| `/request-queues/{queueId}` | GET | `requestQueue_get` |
| `/request-queues/{queueId}` | PUT | `requestQueue_put` |
| `/actors/{actorId}/runs` | POST | `actors_runs_post` |
| `/actors/{actorId}/runs` | GET | `actors_runs_get` |
| `/actors/{actorId}/runs/{runId}` | GET | `actors_run_get` |
| `/actors/{actorId}/runs/last` | GET | `actor_runs_last_get` |
| `/actors/{actorId}/builds/default` | GET | `actor_build_default_get` |

### Actor runs and builds exception

Operations on an Actor's own `/runs` and `/builds` collections and their direct members keep the plural `actors_` prefix. The complete list is `actors_runs_get`, `actors_runs_post`, `actors_run_get`, `actors_run_abort_post`, `actors_run_metamorph_post`, `actors_builds_get`, `actors_builds_post`, `actors_build_get`, and `actors_build_abort_post`. The reason is that the account-wide `/actor-runs` and `/actor-builds` paths already own the singular `actorRun_` and `actorBuild_` prefixes.

Deeper scoped sub-resources use the singular `actor_` prefix: `runs/last`, `run-sync`, `builds/default`, versions, and webhooks. The same split is encoded in the redirect rules in `nginx.conf`.

### Legacy `/acts` prefix

Never use the legacy `/acts` or `act_` prefix in user-facing URLs, in `paths` keys, or in new operation IDs. The canonical prefixes are `/actors`, `/actor-runs`, and `/actor-builds`.

Two internal uses are intentional and must stay:

- Source filenames under `openapi/paths/` and `openapi/components/objects/` use the `acts@{actorId}…` form. The filename is not the served path, so don't rename them.
- `x-legacy-doc-urls` entries keep their historical `act_*` fragments, and so do in-description links that point at those fragments. The fragments are the anchors the decorator emits for backward compatibility - rewriting them to `actor_*` breaks the exact links they exist to preserve.

## Code sample examples

### JavaScript

Location: `apify-api/openapi/code_samples/javascript/`

Filename must match `operationId` (e.g., `requestQueue_get.js`).

```javascript
// GET /v2/request-queues/{queueId}
const { ApifyClient } = require('apify-client');

const client = new ApifyClient({
    token: 'YOUR_API_TOKEN',
});

const queue = await client.requestQueue('QUEUE_ID').get();
console.log(queue);
```

### Python

```python
# GET /v2/request-queues/{queueId}
from apify_client import ApifyClient

client = ApifyClient('YOUR_API_TOKEN')

queue = client.request_queue('QUEUE_ID').get()
print(queue)
```

## Adding code samples

1. Create file in `apify-api/openapi/code_samples/{language}/`
1. Filename must match `operationId` from the OpenAPI spec
1. The `code-samples-decorator.mjs` Redocly plugin auto-detects files and adds `x-codeSamples`
1. Missing samples are logged during build - check console output
1. Run `pnpm api:rebuild` to verify samples appear
