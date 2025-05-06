# Contributing to Apify Documentation

## Before you start

1. Review this guide completely
2. Setup you development environment
3. Familiarize yourself with our documentation style guide

## Development setup

### Prerequisites

1. Git
2. Node.js
3. GitHub access

### Installation steps

<!-- vale off -->
1. Clone the repository
2. Run `npm install`
3. Start development server: `npm start`
<!-- vale on -->

This will be enough to work on Platform, Academy and OpenAPI. If you want to work on the entire documentation set, you need to join them using nginx.

#### Join all repositories with nginx

1. Clone all the repositories
2. Run `npm start:dev` instead of `npm start` from the main repository
3. Run `npm start -- --port <number>` to start Docusaurus instance on specific port, refer to the table for each repository port

    |Repository|Port|
    |:---|:---|
    |apify-docs|3000|
    |apify-client-js|3001|
    |apify-client-python|3002|
    |apify-sdk-js|3003|
    |apify-sdk-python|3004|
    |apify-cli|3005|

4. To serve them together, setup the nginx server with the following configuration:

    ```nginx
    server {
      listen       80;
      server_name  docs.apify.loc;
      location / {
        proxy_pass http://localhost:3000;
      }
      location /api/client/js {
        proxy_pass http://localhost:3001;
      }
      location /api/client/python {
        proxy_pass http://localhost:3002;
      }
      location /sdk/js {
        proxy_pass http://localhost:3003;
      }
      location /sdk/python {
        proxy_pass http://localhost:3004;
      }
      location /cli {
        proxy_pass http://localhost:3005;
      }
    }
    ```

5. Add a record to `/etc/hosts`, which maps the `docs.apify.loc` to a localhost:

    ```text
    127.0.01 docs.apify.loc
    ```

You should be able to open https://docs.apify.loc in your browser and run all the repositories jointly as one project.

## Documentation style guide

### Language guidelines

- Use US English
- Write in inclusive language
- Avoid directional language (like "left" or "right" or instead of "see" use "check out")
- Use active voice whenever possible

### Formatting conventions

1. Text emphasis:

    - use **Bold** for UI elements
    - use *Italics* for emphasis
    - use `code` for inline code, by using back-ticks (\`\`\)
    - use code blocks with language specification
    - use [code tabs](https://docusaurus.io/docs/markdown-features/tabs) whenever you want to include examples of implementation in more than one language

2. Documentation elements:

    - Use [admonitions](https://docusaurus.io/docs/2.x/markdown-features/admonitions) to emphasize crucial information, available admonitions are:
      - note
      - tip
      - info
      - caution
      - danger
    - Use code tabs for multiple languages
    - Include proper metadata in front matter

    Example of proper usage and formatting:

    ```text
    :::note Your Title Here

    Your important message here.

    :::
    ```

3. Screenshots:

    - Use light theme when taking screenshots
    - Include meaningful alt texts
    - Use red indicators

### Front matter metadata best practices

- Keep descriptions between 140 and 160 characters
- Use action-oriented phrasing
- Avoid repetitive keywords
- Avoid the word "documentation" in descriptions

## Repository structure

### Theme management

- uses `@apify/docs-theme` package
- automatic synchronization via CI
- Theme updates trigger rebuilds across all projects

### Content organization

Content lives in the following locations:

- Main content like Platform documentation & Academy: `/sources` directory
- API reference: Generated from OpenAPI specs within `/apify-api` directory
- SDK docs: separate repositories
- Client docs: separate repositories
- CLI docs: separate repositories

## API Documentation

### Overview

The API reference documentation at [docs.apify.com](https://docs.apify.com/) is built directly from our OpenAPI specification. The source of truth for the API specification lives in the `/apify-api/openapi`  directory within [apify-docs](https://github.com/apify/apify-docs) repository.

### Setup requirements

1. Install Node.js
2. Clone the repository
3. Run `npm install`

### Basic commands

- `npm start` - Starts docs preview server including API reference
- `npm test` - Validates the definition

### Adding new documentation

#### Schema documentation

1. Navigate to `apify-api/openapi/components/schemas`
2. Create a new file named after your schema
3. Define the schema structure
4. Reference schema using `$ref` in other files

Example schema

```yaml
type: object
properties:
  id:
    description: The resource ID
    readOnly: true
    allOf:
      -$ref: ./ResourceId.yaml
```

#### Path documentation

1. Navigate to `apify-api/openapi/paths`
2. Create YAML file following the URL structure replacing `/` with `@`
3. Place path parameters in curly braces (e.g., {queueId})
4. Add path reference to openapi.yaml

Example addition to `openapi.yaml` file:

```yaml
'/requests-queues':
  $ref: './paths/request-queues/request-queues.yaml'
'/requests-queues/{queueId}':
  $ref: './paths/request-queues/request-queues@{queueId}.yaml'
```

Example YAML file `request-queues@{queueId}.yaml` in the `paths/request-queues` folder :

```yaml
get:
    tags:
        - Request Queues
    summary: Get a Request Queue
    operationId: requestQueues_get
    description: |
        You can have a markdown description here.
    parameters:
    responses:
        '200':
        '401':
    x-code-samples:
        -   lang: PHP
            source:
                $ref: ../code_samples/PHP/customers/get.php
```

#### Operation ID conventions

Operation IDs must follow this format:

- Generated from path structure and HTTP method
- Use camelCase for object names
- Single object for paths with {id}, plural otherwise
- Underscore separator between object name and action
- Method name in lowercase at the end

Examples:

- `/requests-queues` GET -> `requestQueues_get`
- `/requests-queues/{queueId}` PUT -> `requestQueue_put`
- `/acts/{actorId}/runs` POST -> `act_runs_post`

#### Code samples

1. Navigate to the `openapi/code_samples` folder
2. Navigate to the `<language>` sub-folder
3. Navigate to the `path` folder, and add ref to the code sample

Add languages by adding new folders at the appropriate path level.

#### Submitting changes

1. Make your changes following the guidelines above
2. Test locally using provided npm commands
3. Submit a pull request to the `main` branch
4. Ensure all CI checks pass

## Development workflow

### Local development

1. Basic setup

    ```bash

    npm install
    npm start

    ```

2. Full setup with nginx:

    - Clone all documentation repositories
    - Configure nginx server
    - Update hosts file
    - Use `npm start:dev`

## Quality check

### Linting

1. Markdown:

    ```bash
    npm run lint:md # Checks for any issues using markdownlint
    npm run lint:md:fix # Applies fixes
    ```

2. Code:

    ```bash
    npm run lint:code # Checks .js & .ts files
    npm run lint:code:fix # Applies fixes
    ```

3. Prose:

    - Use [Vale](https://vale.sh/) for content linting
    - Configure exceptions in `accepts.txt`

## Pull request process

1. Follow [Conventional Commits](https://www.conventionalcommits.org/)
2. Pass all CI checks
3. Include comprehensive documentation updates

## Deployment

- Automatic deployment on merge to `master`
- Builds deploy to appropriate subdomains
- Updates trigger theme synchronization

## Additional resources

- [Docusaurus documentation](https://docusaurus.io/docs)
- [Vale style guide](https://vale.sh/docs)
