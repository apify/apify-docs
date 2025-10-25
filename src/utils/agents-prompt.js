// TODO:
// - It did not use apify run correctly
// - It did not use version in actor.json correctly (it should be 0.0 and not 0.0.1)
// - It did not create AGENTS.md file correctly

export const AGENTS_PROMPT = `Instruct the user on how to develop an Actor step by step:

- Start with first steps like create directory for Actor, suggest to use it in Cursor or other AI tools that support AI coding assistants.
- Based on the structure of the Actor, fill in the default and example values for all fields in the actor.json, input_schema.json, output_schema.json, and main.js files
- Install dependencies for the Actor using \`npm install\`
- Run the Actor locally using \`apify run\`
- Log in to the Apify platform using \`apify login\`
- Push the Actor to the Apify platform using \`apify push\`
- Create AGENTS.md file based provided instructions in this prompt, but ignore the getting started section.
- Important: Before you begin with coding, fill in the model property in the meta section of \`.actor/actor.json\`. Replace it with the model you're currently using. This helps Apify monitor and improve AGENTS.md for specific LLM models.

## What are Apify Actors?

- Actors are serverless programs that run in the cloud. They're inspired by the UNIX philosophy - programs that do one thing well and can be easily combined to build complex systems.
- Actors are programs packaged as Docker images that run in isolated containers

## Structure of Apify Actor

Important:

- Do not change the structure of the Actor.
- Do not initialize the storage directory.

.actor/
├── actor.json # Actor config: name, version, env vars, runtime settings
├── input_schema.json # Input validation & Console form definition
├── dataset_schema.json # Dataset schema definition
└── output_schema.json # Specifies where an Actor stores its output
src/
└── main.js # Actor entry point and orchestrator
storage/ # Local storage (mirrors Cloud during development)
├── datasets/ # Output items (JSON objects)
├── key_value_stores/ # Files, config, INPUT
└── request_queues/ # Pending crawl requests
Dockerfile # Container image definition
AGENTS.md # AI agent instructions (this file)

### actor.json (default and example values)

\`\`\`json
{
    "actorSpecification": 1,
    "name": "<ACTOR-NAME>",
    "title": "<ACTOR-TITLE>",
    "description": "<ACTOR-DESCRIPTION>",
    "version": "<ACTOR-VERSION>",
    "meta": {
        "templateId": "ai-generated-actor",
        "model": "<MODEL>"
    },
    "input": "./input_schema.json",
    "output": "./output_schema.json",
    "storages": {
        "dataset": "./dataset_schema.json"
    },
    "dockerfile": "../Dockerfile"
}
\`\`\`

### input_schema.json (default and example values)

\`\`\`json
{
    "title": "CheerioCrawler Template",
    "type": "object",
    "schemaVersion": 1,
    "properties": {
        "startUrls": {
            "title": "Start URLs",
            "type": "array",
            "description": "URLs to start with.",
            "editor": "requestListSources",
            "prefill": [
                {
                    "url": "https://crawlee.dev"
                }
            ]
        },
        "maxRequestsPerCrawl": {
            "title": "Max Requests per Crawl",
            "type": "integer",
            "description": "Maximum number of requests that can be made by this crawler.",
            "default": 100
        }
    }
}
\`\`\`

### output_schema.json (default and example values)

\`\`\`json
{
    "actorOutputSchemaVersion": 1,
    "title": "Output schema of the files scraper",
    "properties": {
        "overview": {
            "type": "string",
            "title": "Overview",
            "template": "{{links.apiDefaultDatasetUrl}}/items?view=overview"
        }
    }
}
\`\`\`

### dataset_schema.json (default and example values)

\`\`\`json
{
    "actorSpecification": 1,
    "fields": {},
    "views": {
        "overview": {
            "title": "Overview",
            "transformation": {
                "fields": ["title", "url"]
            },
            "display": {
                "component": "table",
                "properties": {
                    "title": {
                        "label": "Title",
                        "format": "text"
                    },
                    "url": {
                        "label": "URL",
                        "format": "link"
                    }
                }
            }
        }
    }
}
\`\`\`

### main.js (default and example values)

\`\`\`javascript
// Apify SDK - toolkit for building Apify Actors (Read more at https://docs.apify.com/sdk/js/)
import { Actor } from 'apify';
// Crawlee - web scraping and browser automation library (Read more at https://crawlee.dev)
import { CheerioCrawler, Dataset } from 'crawlee';

// The init() call configures the Actor for its environment. It's recommended to start every Actor with an init()
await Actor.init();

// Structure of input is defined in input_schema.json
const { startUrls = ['https://apify.com'], maxRequestsPerCrawl = 100 } = (await Actor.getInput()) ?? {};

// Proxy configuration to rotate IP addresses and prevent blocking (https://docs.apify.com/platform/proxy)
const proxyConfiguration = await Actor.createProxyConfiguration();

const crawler = new CheerioCrawler({
    proxyConfiguration,
    maxRequestsPerCrawl,
    async requestHandler({ enqueueLinks, request, $, log }) {
        log.info('enqueueing new URLs');
        await enqueueLinks();

        // Extract title from the page.
        const title = $('title').text();
        log.info(\`\${title}\`, { url: request.loadedUrl });

        // Save url and title to Dataset - a table-like storage.
        await Dataset.pushData({ url: request.loadedUrl, title });
    },
});

await crawler.run(startUrls);

// Gracefully exit the Actor process. It's recommended to quit all Actors with an exit()
await Actor.exit();
\`\`\`

### Dockerfile (default values)

\`\`\`dockerfile
# Specify the base Docker image. You can read more about
# the available images at https://docs.apify.com/sdk/js/docs/guides/docker-images
# You can also use any other image from Docker Hub.
FROM apify/actor-node:22

# Check preinstalled packages
RUN npm ls crawlee apify puppeteer playwright

# Copy just package.json and package-lock.json
# to speed up the build using Docker layer cache.
COPY --chown=myuser:myuser package*.json ./

# Install NPM packages, skip optional and development dependencies to
# keep the image small. Avoid logging too much and print the dependency
# tree for debugging
RUN npm --quiet set progress=false \
    && npm install --omit=dev --omit=optional \
    && echo "Installed NPM packages:" \
    && (npm list --omit=dev --all || true) \
    && echo "Node.js version:" \
    && node --version \
    && echo "NPM version:" \
    && npm --version \
    && rm -r ~/.npm

# Next, copy the remaining files and directories with the source code.
# Since we do this after NPM install, quick build will be really fast
# for most source file changes.
COPY --chown=myuser:myuser . ./

# Run the image.
CMD npm start --silent
\`\`\`

### package.json (default values)

\`\`\`json
{
    "name": "<ACTOR-NAME>",
    "version": "0.0.1",
    "type": "module",
    "description": "<ACTOR-DESCRIPTION>",
    "engines": {
        "node": ">=20.0.0"
    },
    "dependencies": {
        "apify": "^3.4.2",
        "crawlee": "^3.13.8"
    },
    "devDependencies": {
        "@apify/eslint-config": "^1.0.0",
        "eslint": "^9.29.0",
        "eslint-config-prettier": "^10.1.5",
        "prettier": "^3.5.3"
    },
    "scripts": {
        "start": "node src/main.js",
        "format": "prettier --write .",
        "format:check": "prettier --check .",
        "lint": "eslint",
        "lint:fix": "eslint --fix",
        "test": "echo 'Error: oops, the Actor has no tests yet, sad!' && exit 1"
    },
    "author": "It's not you it's me",
    "license": "ISC"
}
\`\`\`

## Apify CLI

### Installation

#### macOS/Linux

\`\`\`bash
curl -fsSL https://apify.com/install-cli.sh | bash
\`\`\`

#### Windows

\`\`\`bash
irm https://apify.com/install-cli.ps1 | iex
\`\`\`

### Apify CLI Commands

\`\`\`bash
# Local development
apify run                              # Run Actor locally

# Authentication & deployment
apify login                            # Authenticate account
apify push                             # Deploy to Apify platform

# Help
apify help                             # List all commands
\`\`\`

## Do

- use the default values for all fields in the actor.json, input_schema.json, output_schema.json, and main.js files
- use Apify CLI to run the Actor locally, and push it to the Apify platform
- accept well-defined JSON input and produce structured JSON output
- use Apify SDK (\`apify\`) for code running ON Apify platform
- validate input early with proper error handling and fail gracefully
- use CheerioCrawler for static HTML content (10x faster than browsers)
- use PlaywrightCrawler only for JavaScript-heavy sites and dynamic content
- use router pattern (createCheerioRouter/createPlaywrightRouter) for complex crawls
- implement retry strategies with exponential backoff for failed requests
- use proper concurrency settings (HTTP: 10-50, Browser: 1-5)
- set sensible defaults in \`.actor/input_schema.json\` for all optional fields
- set up output schema in \`.actor/output_schema.json\`
- clean and validate data before pushing to dataset
- use semantic CSS selectors and fallback strategies for missing elements
- respect robots.txt, ToS, and implement rate limiting with delays
- check which tools (cheerio/playwright/crawlee) are installed before applying guidance

## Don't

- do not run apify create command
- do not rely on \`Dataset.getInfo()\` for final counts on Cloud platform
- do not use browser crawlers when HTTP/Cheerio works (massive performance gains with HTTP)
- do not hard code values that should be in input schema or environment variables
- do not skip input validation or error handling
- do not overload servers - use appropriate concurrency and delays
- do not scrape prohibited content or ignore Terms of Service
- do not store personal/sensitive data unless explicitly permitted
- do not use deprecated options like \`requestHandlerTimeoutMillis\` on CheerioCrawler (v3.x)
- do not use \`additionalHttpHeaders\` - use \`preNavigationHooks\` instead

## Actor Input Schema

The input schema defines the input parameters for an Actor. It's a JSON object comprising various field types supported by the Apify platform.

### Structure

\`\`\`json
{
    "title": "<INPUT-SCHEMA-TITLE>",
    "type": "object",
    "schemaVersion": 1,
    "properties": {
        /* define input fields here */
    },
    "required": []
}
\`\`\`

## Actor Output Schema

The Actor output schema builds upon the schemas for the dataset and key-value store. It specifies where an Actor stores its output and defines templates for accessing that output. Apify Console uses these output definitions to display run results.

### Structure

\`\`\`json
{
    "actorOutputSchemaVersion": 1,
    "title": "<OUTPUT-SCHEMA-TITLE>",
    "properties": {
        /* define your outputs here */
    }
}
\`\`\`

### Output Schema Template Variables

- \`links\` (object) - Contains quick links to most commonly used URLs
- \`links.publicRunUrl\` (string) - Public run url in format \`https://console.apify.com/view/runs/:runId\`
- \`links.consoleRunUrl\` (string) - Console run url in format \`https://console.apify.com/actors/runs/:runId\`
- \`links.apiRunUrl\` (string) - API run url in format \`https://api.apify.com/v2/actor-runs/:runId\`
- \`links.apiDefaultDatasetUrl\` (string) - API url of default dataset in format \`https://api.apify.com/v2/datasets/:defaultDatasetId\`
- \`links.apiDefaultKeyValueStoreUrl\` (string) - API url of default key-value store in format \`https://api.apify.com/v2/key-value-stores/:defaultKeyValueStoreId\`
- \`links.containerRunUrl\` (string) - URL of a webserver running inside the run in format \`https://<containerId>.runs.apify.net/\`
- \`run\` (object) - Contains information about the run same as it is returned from the \`GET Run\` API endpoint
- \`run.defaultDatasetId\` (string) - ID of the default dataset
- \`run.defaultKeyValueStoreId\` (string) - ID of the default key-value store

## Dataset Schema Specification

The dataset schema defines how your Actor's output data is structured, transformed, and displayed in the Output tab in the Apify Console.

### Structure

\`\`\`json
{
    "actorSpecification": 1,
    "fields": {},
    "views": {
        "<VIEW_NAME>": {
            "title": "string (required)",
            "description": "string (optional)",
            "transformation": {
                "fields": ["string (required)"],
                "unwind": ["string (optional)"],
                "flatten": ["string (optional)"],
                "omit": ["string (optional)"],
                "limit": "integer (optional)",
                "desc": "boolean (optional)"
            },
            "display": {
                "component": "table (required)",
                "properties": {
                    "<FIELD_NAME>": {
                        "label": "string (optional)",
                        "format": "text|number|date|link|boolean|image|array|object (optional)"
                    }
                }
            }
        }
    }
}
\`\`\`

**Dataset Schema Properties:**

- \`actorSpecification\` (integer, required) - Specifies the version of dataset schema structure document (currently only version 1)
- \`fields\` (JSONSchema object, required) - Schema of one dataset object (use JsonSchema Draft 2020-12 or compatible)
- \`views\` (DatasetView object, required) - Object with API and UI views description

**DatasetView Properties:**

- \`title\` (string, required) - Visible in UI Output tab and API
- \`description\` (string, optional) - Only available in API response
- \`transformation\` (ViewTransformation object, required) - Data transformation applied when loading from Dataset API
- \`display\` (ViewDisplay object, required) - Output tab UI visualization definition

**ViewTransformation Properties:**

- \`fields\` (string[], required) - Fields to present in output (order matches column order)
- \`unwind\` (string[], optional) - Deconstructs nested children into parent object
- \`flatten\` (string[], optional) - Transforms nested object into flat structure
- \`omit\` (string[], optional) - Removes specified fields from output
- \`limit\` (integer, optional) - Maximum number of results (default: all)
- \`desc\` (boolean, optional) - Sort order (true = newest first)

**ViewDisplay Properties:**

- \`component\` (string, required) - Only \`table\` is available
- \`properties\` (Object, optional) - Keys matching \`transformation.fields\` with ViewDisplayProperty values

**ViewDisplayProperty Properties:**

- \`label\` (string, optional) - Table column header
- \`format\` (string, optional) - One of: \`text\`, \`number\`, \`date\`, \`link\`, \`boolean\`, \`image\`, \`array\`, \`object\`

## Key-Value Store Schema Specification

The key-value store schema organizes keys into logical groups called collections for easier data management.

### Structure

\`\`\`json
{
    "actorKeyValueStoreSchemaVersion": 1,
    "title": "string (required)",
    "description": "string (optional)",
    "collections": {
        "<COLLECTION_NAME>": {
            "title": "string (required)",
            "description": "string (optional)",
            "key": "string (conditional - use key OR keyPrefix)",
            "keyPrefix": "string (conditional - use key OR keyPrefix)",
            "contentTypes": ["string (optional)"],
            "jsonSchema": "object (optional)"
        }
    }
}
\`\`\`

**Key-Value Store Schema Properties:**

- \`actorKeyValueStoreSchemaVersion\` (integer, required) - Version of key-value store schema structure document (currently only version 1)
- \`title\` (string, required) - Title of the schema
- \`description\` (string, optional) - Description of the schema
- \`collections\` (Object, required) - Object where each key is a collection ID and value is a Collection object

**Collection Properties:**

- \`title\` (string, required) - Collection title shown in UI tabs
- \`description\` (string, optional) - Description appearing in UI tooltips
- \`key\` (string, conditional) - Single specific key for this collection
- \`keyPrefix\` (string, conditional) - Prefix for keys included in this collection
- \`contentTypes\` (string[], optional) - Allowed content types for validation
- \`jsonSchema\` (object, optional) - JSON Schema Draft 07 format for \`application/json\` content type validation

Either \`key\` or \`keyPrefix\` must be specified for each collection, but not both.

## Apify MCP Tools

If MCP server is configured, use these tools for documentation:

- \`search-apify-docs\` - Search documentation
- \`fetch-apify-docs\` - Get full doc pages

Otherwise, reference: \`@https://mcp.apify.com/\`

## Resources

- [docs.apify.com/llms.txt](https://docs.apify.com/llms.txt) - Quick reference
- [docs.apify.com/llms-full.txt](https://docs.apify.com/llms-full.txt) - Complete docs
- [crawlee.dev](https://crawlee.dev) - Crawlee documentation
- [whitepaper.actor](https://raw.githubusercontent.com/apify/actor-whitepaper/refs/heads/master/README.md) - Complete Actor specification
`;
