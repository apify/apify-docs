# API Documentation Skill

## Purpose

Help create or update OpenAPI specifications and API documentation for Apify API endpoints.

## When to Use

- Adding new API endpoints
- Updating existing endpoint documentation
- Creating or modifying OpenAPI schemas
- Adding code samples for API endpoints

## Context Files

- `CONTRIBUTING.md` - API documentation section
- `AGENTS.md` - API documentation rules
- `apify-api/openapi/openapi.yaml` - Main OpenAPI spec

## Instructions

### 1. OpenAPI File Structure

```text
apify-api/openapi/
├── openapi.yaml              # Main spec file
├── components/
│   └── schemas/              # Data model definitions
└── paths/                    # API endpoint definitions
```

### 2. Creating Schema Documentation

**Location**: `apify-api/openapi/components/schemas/`

**Steps**:

1. Create a new YAML file named after your schema
2. Define the schema structure following OpenAPI 3.0 specification
3. Include comprehensive descriptions for all properties
4. Reference schema using `$ref` in other files

**Example**:

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

### 3. Creating Path Documentation

**Location**: `apify-api/openapi/paths/`

**Naming Convention**: Replace `/` with `@` in the URL path

- `/request-queues` → `request-queues.yaml`
- `/request-queues/{queueId}` → `request-queues@{queueId}.yaml`

**Example Path File**:

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

### 4. Operation ID Conventions

Format: `{objectName}_{httpMethod}`

**Rules**:

- Use camelCase for object names
- Single object for paths with `{id}`, plural otherwise
- Underscore separator between object name and action
- Method name in lowercase at the end

**Examples**:

- `/request-queues` GET → `requestQueues_get`
- `/request-queues/{queueId}` PUT → `requestQueue_put`
- `/acts/{actorId}/runs` POST → `act_runs_post`

### 5. Adding Code Samples

**Location**: `apify-api/openapi/code_samples/{language}/{path}/`

**Steps**:

1. Navigate to the appropriate language folder
2. Create path-based directory structure
3. Add code sample file
4. Reference in path documentation using `x-code-samples`

**Example JavaScript Code Sample**:

```javascript
// GET /v2/request-queues/{queueId}
const { ApifyClient } = require('apify-client');

const client = new ApifyClient({
    token: 'YOUR_API_TOKEN',
});

const queue = await client.requestQueue('QUEUE_ID').get();
console.log(queue);
```

**Example Python Code Sample**:

```python
# GET /v2/request-queues/{queueId}
from apify_client import ApifyClient

client = ApifyClient('YOUR_API_TOKEN')

queue = client.request_queue('QUEUE_ID').get()
print(queue)
```

### 6. Adding New Endpoints to Main Spec

**File**: `apify-api/openapi/openapi.yaml`

Add path reference:

```yaml
paths:
  '/request-queues':
    $ref: './paths/request-queues/request-queues.yaml'
  '/request-queues/{queueId}':
    $ref: './paths/request-queues/request-queues@{queueId}.yaml'
```

### 7. Testing and Validation

After making changes:

```bash
npm test  # Validates OpenAPI specification
npm start # Preview changes locally
```

### 8. Apify Terminology

Always use exact capitalization in descriptions and examples:

- **Apify Actor** (never "Apify actor")
- **Apify Proxy** (never "Apify proxy")
- **Apify Console** (never "the Apify Console")
- **Apify Store** (never "the Apify Store")
- **the Apify team**, **the Apify platform** (lowercase)

### 9. Best Practices

- **Descriptions**: Write clear, comprehensive descriptions using simple English
- **Examples**: Include realistic examples in schemas
- **Error responses**: Document all possible error responses
- **Authentication**: Document authentication requirements
- **Consistency**: Follow existing patterns in the codebase
- **Completeness**: Ensure all parameters and responses are documented
- **Terminology**: Use correct Apify terminology throughout
- **Never make assumptions**: About product features - ask if unsure

### 10. Quality Checklist

Before submitting:

- [ ] OpenAPI specification validates without errors
- [ ] Operation IDs follow naming conventions (camelCase_method)
- [ ] All parameters have clear descriptions using simple English
- [ ] Response schemas are complete
- [ ] Code samples are included for major languages (JS, Python, cURL)
- [ ] Examples use realistic data
- [ ] Path references are added to main openapi.yaml
- [ ] Error responses are documented
- [ ] Correct Apify terminology used throughout
- [ ] No assumptions made about product features

## Output

Provide the complete OpenAPI specification changes with proper formatting, ready to be tested and committed.
