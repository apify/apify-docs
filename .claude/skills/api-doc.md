# API documentation skill

## Purpose

Help create or update OpenAPI specifications and API documentation for Apify API endpoints.

## When to use

- Adding new API endpoints
- Updating existing endpoint documentation
- Creating or modifying OpenAPI schemas
- Adding code samples for API endpoints

## Context files

- `CONTRIBUTING.md` - API documentation section and workflows
- `AGENTS.md` - API documentation rules
- `apify-api/openapi/openapi.yaml` - Main OpenAPI spec
- `.claude/rules/` - Claude Code-specific standards (auto-loaded)

## Standards reference

This skill follows all standards defined in `.claude/rules/`:

- **writing-style.md** - Clear, simple descriptions (US English, active voice)
- **content-standards.md** - Code examples formatting
- **terminology.md** - Apify-specific capitalization in descriptions (Apify Actor, the Apify platform)
- **quality-standards.md** - General quality checklist

**API-specific standards** are documented in this skill file below.

## Instructions

### 1. OpenAPI file structure

```text
apify-api/openapi/
├── openapi.yaml              # Main spec file
├── components/
│   └── schemas/              # Data model definitions
└── paths/                    # API endpoint definitions
```

### 2. Creating schema documentation

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

### 3. Creating path documentation

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

### 4. Operation ID conventions

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

### 5. Adding code samples

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

### 6. Adding new endpoints to main spec

**File**: `apify-api/openapi/openapi.yaml`

Add path reference:

```yaml
paths:
  '/request-queues':
    $ref: './paths/request-queues/request-queues.yaml'
  '/request-queues/{queueId}':
    $ref: './paths/request-queues/request-queues@{queueId}.yaml'
```

### 7. Testing and validation

After making changes:

```bash
npm test  # Validates OpenAPI specification
npm start # Preview changes locally
```

### 8. Best practices

- **Descriptions**: Write clear, comprehensive descriptions using simple English
- **Examples**: Include realistic examples in schemas
- **Error responses**: Document all possible error responses
- **Authentication**: Document authentication requirements
- **Consistency**: Follow existing patterns in the codebase
- **Completeness**: Ensure all parameters and responses are documented
- **Terminology**: Use correct Apify terminology throughout
- **Never make assumptions**: About product features - ask if unsure

### 9. API-specific quality checklist

Before submitting, verify these API-specific items:

- [ ] OpenAPI specification validates without errors (`npm test`)
- [ ] Operation IDs follow naming conventions (`objectName_method` in camelCase)
- [ ] All parameters have clear descriptions
- [ ] Response schemas are complete with examples
- [ ] Code samples included for JavaScript, Python, and cURL
- [ ] Examples use realistic data (not placeholder values)
- [ ] Path references added to main `openapi.yaml`
- [ ] All error responses documented (401, 404, etc.)
- [ ] Authentication requirements documented

For general quality standards (terminology, language, formatting), see `quality-standards.md`

## Output

Provide the complete OpenAPI specification changes with proper formatting, ready to be tested and committed.
