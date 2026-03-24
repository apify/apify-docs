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
- Singular for paths with `{id}`, plural otherwise
- Underscore separator between object name and method
- Method name in lowercase

| Path | HTTP Method | Operation ID |
|---|---|---|
| `/request-queues` | GET | `requestQueues_get` |
| `/request-queues/{queueId}` | GET | `requestQueue_get` |
| `/request-queues/{queueId}` | PUT | `requestQueue_put` |
| `/acts/{actorId}/runs` | POST | `act_runs_post` |
| `/acts/{actorId}/runs` | GET | `act_runs_get` |
| `/acts/{actorId}/runs/{runId}` | GET | `act_run_get` |

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
1. Run `npm run api:rebuild` to verify samples appear
