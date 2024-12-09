# Contributing to Apify Documentation

## Before you start

1. Review this guide completely
2. Setup you development environment
3. Familiarize yourself with our style guide

## Development setup

### Prerequisites

1. Git
2. Node.js
3. Github access

### Installation steps

1. Clone the repository
2. Configure Github access:

    ```bash
    npm login --scope@apify-packages -registry=https://npm.pkg.github.com --auth-type=legacy
    ```

3. Run `npm install`
4. Start development server: `npm start`

## Style guide

### Language guidelines

- Use US English
- Write in inclusive language
- Avoid directional language (like "left" or "right")
- Use active voice whenever possible

### Formatting conventions

1. Text emphasis:

   - use *Bold* for UI elements
   - use **Italics** for emphasis
   - use `code` for inline code
   - use code blocks with language specification

2. Documentation elements:

    - Use admonitions
      - note
      - tip
      - info
      - caution
      - danger
    - Implement code tabs for multiple languages
    - Include proper metadata in front matter

3. Screenshots:

    - Use light theme when taking screenshots
    - Include meaningful alt texts
    - Use red indicators

### Metadata best practices

- Keep descriptions between 140-160 characters
- Avoid repetitive keywords
- Use action-oriented phrasing
- Exclude the word "documentation" in descriptions

## Repository structure

### Theme managements

- uses `@apify/docs-theme` package
- automatic synchronization via CI
- Theme updates trigger rebuilds across all projects

### Content organization

Content lives in the following locations:

- Main content like Platform documentation & Academy: `/sources` directory
- API reference: Genereated from OpenAPI specs within `/apify-api` directory
- SDK docs: separate repositores
- Client docs: separate repositories
- CLI docs: separate repositories

## API Documentation

### Overview

The API reference documentation at docs.apify.com is built directly froum our OpenAPI specification. The source of truth for the API specification lives in the `/apify-api`  directowy within [apify-docs](https://github.com/apify/apify-docs) repository.

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
4. Reference schea using `$ref` in other files

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
2. Create YAML file following the URL structure
3. Place path parameters in curly braces (e.g., {queueId})
4. Add path reference to openapi.yaml

Example path structure:

```yaml
'/requests-queues':
  $ref: './paths/request-queues/request-queues.yaml'
'/requests-queues/{queueId}':
  $ref: './paths/request-queues/request-queues@{queueId}.yaml'
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

2. Full setup with Nginx:

    - Clone all documentation repositories
    - Configure Nginx server
    - Update hosts file
    - Use `npm start:dev`

## Quality check

### Linting

1. Markdown:

    ```bash
    npm run lint:md
    npm run lint:md:fix
    ```

2. Code:

    ```bash
    npm run lint:code
    npm run lint:code:fix
    ```

3. Prose:

    - Use Vale for content linting
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
- [OpenAPI specification]
- [Vale style guide](https://vale.sh/docs)
