# Contributing to Apify documentation

## Before you start

1. Review this guide completely
2. Setup you development environment
3. Familiarize yourself with the [documentation style guide](standards/)

## Development setup

### Prerequisites

1. **Git**
2. **Node.js 22** (see [.nvmrc](.nvmrc) file)
3. **GitHub access**
4. **pnpm 10** package manager (pinned via `packageManager` in `package.json`; `corepack enable` picks it up automatically)

### Installation steps

<!-- vale off -->
1. Clone the repository
2. Run `pnpm install`
3. Start development server: `pnpm start`
<!-- vale on -->

This will be enough to work on Platform, Academy and OpenAPI. If you want to work on the entire documentation set, you need to join them using nginx.

#### Join all repositories with nginx

1. Clone all the repositories
2. Run `pnpm start:dev` instead of `pnpm start` from the main repository
3. Run `pnpm start -- --port <number>` to start Docusaurus instance on specific port, refer to the table for each repository port

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
    127.0.0.1 docs.apify.loc
    ```

You should be able to open https://docs.apify.loc in your browser and run all the repositories jointly as one project.

## Documentation style guide

The style guide lives in [`standards/`](standards/README.md), which is the single source of truth for both people and AI assistants. Rules aren't repeated here, so there's nothing to keep in sync:

- [`standards/style-guide.md`](standards/style-guide.md) - Voice and tone, headings, text formatting, links, numbers, grammar, Apify terminology
- [`standards/page-structure.md`](standards/page-structure.md) - Front matter, admonitions, code blocks and code tabs, images, lists, file naming
- [`standards/quality-standards.md`](standards/quality-standards.md) - Checklist to run through before opening a pull request

Most of these rules run in CI through Vale. Run `vale "<file>"` on what you changed before opening a pull request.

[`AGENTS.md`](AGENTS.md) points at the same files rather than restating them, so change a rule in `standards/`, not in `AGENTS.md` or here.

## AI assistant rules structure

This project uses an agent-agnostic approach: standards and workflows live at the repo root, with thin adapter files for each AI tool.

### Source of truth

- **`standards/`** - Writing, formatting, terminology, and quality rules
- **`.agents/skills/`** - Documentation skills with processes, references, and scripts (AgentSkills spec)
- **`AGENTS.md`** - Condensed summary + pointers (also `CLAUDE.md` via symlink)

### Skills (AgentSkills standard)

- **`.agents/skills/`** - Skill definitions following the [AgentSkills spec](https://agentskills.io) (discoverable by Codex, Gemini CLI, OpenCode, Cursor, and others)
- **`.claude/skills/`** - Symlinks to `.agents/skills/` for Claude Code discovery

### Agent-specific adapters

- **`.cursor/rules/`** - Thin pointers to `standards/` for Cursor

### Usage

- Any AI assistant can follow `AGENTS.md` and read `standards/` directly
- Skills-compatible agents (Claude Code, Codex, Gemini CLI, OpenCode, Cursor): discover skills from `.agents/skills/`
- Claude Code users: use `/doc-write`, `/api-doc`, `/tutorial`, `/review-docs` skills
- Cursor users: rules auto-load via glob patterns on `sources/**/*.md` files

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

The API reference documentation at [docs.apify.com/api/v2](https://docs.apify.com/api/v2) is built from our OpenAPI specification. The source of truth lives in the `/apify-api/openapi` directory.

### Tooling

We use the following tools for API documentation:

- **[OpenAPI 3.1.2](https://spec.openapis.org/oas/v3.1.2.html)** - API specification format
- **[Redocly CLI](https://redocly.com/docs/cli/)** - Linting and validation of OpenAPI specs
- **[`docusaurus-plugin-openapi-docs`](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs)** - Generates MDX docs from OpenAPI
- **[`docusaurus-theme-openapi-docs`](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs)** - Renders API reference with interactive explorer

### Basic commands

- `pnpm start` - Starts docs preview server including API reference
- `pnpm openapi:lint:redocly` - Validates OpenAPI spec with Redocly CLI
- `pnpm api:rebuild` - Regenerates API docs from OpenAPI specs

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
- `/actors/{actorId}/runs` POST -> `actors_runs_post`

#### Code samples

1. Navigate to the `openapi/code_samples` folder
2. Navigate to the `<language>` sub-folder
3. Navigate to the `path` folder, and add ref to the code sample

Add languages by adding new folders at the appropriate path level.

#### Submitting changes

1. Make your changes following the guidelines above
2. Test locally using provided pnpm commands
3. Submit a pull request to the `master` branch
4. Ensure all CI checks pass

## Development workflow

### Local development

1. Basic setup

    ```bash

    pnpm install
    pnpm start

    ```

2. Full setup with nginx:

    - Clone all documentation repositories
    - Configure nginx server
    - Update hosts file
    - Use `pnpm start:dev`

## Quality check

### Linting

1. **Markdown**:

    ```bash
    pnpm lint:md # Checks for any issues using markdownlint
    pnpm lint:md:fix # Applies fixes
    ```

2. **Code**:

    ```bash
    pnpm lint:code # Checks .js & .ts files
    pnpm lint:code:fix # Applies fixes
    ```

3. **Prose**:

    [Vale](https://vale.sh/) checks prose against the rules in [`standards/`](standards/README.md), using the [apify/vale-rules](https://github.com/apify/vale-rules) package pinned in `.vale.ini`.

    Installing it locally is optional. The [Vale action](.github/workflows/vale.yaml) runs on every pull request and annotates changed files. It only fails on errors, though, so a local run tells you more:

    ```bash
    vale sync              # first time only, downloads the rule packages
    vale "path/to/file.md" # everything, including warnings and suggestions
    ```

    To allow a word the spelling rules reject, add it to `.github/styles/config/vocabularies/Docs/accept.txt`.

### Testing

- **Broken links**: [Periodic GitHub Action](.github/workflows/lychee.yml) checks broken links by [lychee](https://lychee.cli.rs/). If the Action fails, we manually fix the issues.

- **API paths**: `pnpm test:api-paths` checks that every `/v2/...` route written in `sources/` exists in the bundled OpenAPI spec and isn't marked `deprecated`, so the docs can't teach a route the contract doesn't define or has already superseded. It runs in the [OpenAPI checks](.github/workflows/openapi-ci.yaml) `validate` job on every pull request. Build the bundle first (`pnpm openapi:build:json`) when running it locally. Two common failures: the legacy `/v2/acts/` prefix, which still responds but is absent from the published contract; and the Actor-scoped single-run and single-build routes such as `/v2/actors/{actorId}/runs/{runId}`, which are deprecated in favor of `/v2/actor-runs/{runId}` and `/v2/actor-builds/{buildId}`. Note that the run and build _collection_ routes (`/v2/actors/{actorId}/runs`) are current - only the singular forms moved.

- **Academy exercises**: At the end of each lesson in the academy courses, there are exercises that target real-world websites. Each exercise includes a solution, stored as a separate file containing executable code. These files are included in the docs using the `!!raw-loader` syntax. Each course has a [Bats](https://bats-core.readthedocs.io/) test file named `test.bats`. The tests run each solution as a standalone program and verify that it produces output matching the expected results. A [periodic GitHub Action](.github/workflows/test-academy.yml) runs all these tests using `pnpm test:academy`. If the Action fails, we rework the exercises.

## Pull request process

1. Title follows [Conventional Commits](https://www.conventionalcommits.org/) - CI enforces it
2. Description is one or two sentences: what changed and why. Skip boilerplate headings (`## Summary`, `## Changes`) and bullet lists that restate the diff - the diff is the record of what changed, the description explains the why. [`.github/pull_request_template.md`](.github/pull_request_template.md) repeats this as a reminder in the PR form
3. All CI checks pass

## Deployment

- Automatic deployment on merge to `master`
- Builds deploy to appropriate subdomains
- Updates trigger theme synchronization

## Additional resources

- [Docusaurus documentation](https://docusaurus.io/docs)
- [Vale style guide](https://vale.sh/docs)
- [OpenAPI specification](https://spec.openapis.org/oas/v3.1.0)
- [Redocly documentation](https://redocly.com/docs/)
