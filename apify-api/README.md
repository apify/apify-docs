# Apify API v2 OpenAPI Definition

[//]: # (TODO rewrite based on the current setup or remove completely and adjust the contributing guide instead)

## Working on OpenAPI Definition

### Install

1. Install [Node JS](https://nodejs.org/).
2. Clone this repo and run `npm install` in the repo root.
3. Install Schemathesis for contract testing against staging: `python -m pip install schemathesis`
4. `cp .env.example .env`, and insert the `APIFY_STAGING_TOKEN`

### Usage

#### `npm start`

Starts the reference docs preview server.

#### `npm run build`

Bundles the definition to the dist folder.

#### `npm test`

Validates the definition.

## Contribution Guide

**TL;DR**: Add your schema to `openapi/components/schemas` and your path to `openapi/paths` and reference them in
`openapi.yaml`.
Open pull request into `main` branch.

NOTE: The `.redocly.yaml` controls settings for various
tools including the lint tool and the reference
docs engine. Open it to find examples and
[read the docs](https://redoc.ly/docs/cli/configuration/)
for more information.

### Schemas

#### Adding Schemas

1. Navigate to the `openapi/components/schemas` folder.
2. Add a file named as you wish to name the schema.
3. Define the schema.
4. Refer to the schema using the `$ref` (see example below).

##### Example Schema

This is a very simple schema example:

```yaml
type: string
description: The resource ID. Defaults to UUID v4
maxLength: 50
example: 4f6cf35x-2c4y-483z-a0a9-158621f77a21
```

This is a more complex schema example:

```yaml
type: object
properties:
    id:
        description: The customer identifier string
        readOnly: true
        allOf:
            -   $ref: ./ResourceId.yaml
    websiteId:
        description: The website's ID
        allOf:
            -   $ref: ./ResourceId.yaml
    paymentToken:
        type: string
        writeOnly: true
        description: |
            A write-only payment token; if supplied, it will be converted into a
            payment instrument and be set as the `defaultPaymentInstrument`. The
            value of this property will override the `defaultPaymentInstrument`
            in the case that both are supplied. The token may only be used once
            before it is expired.
    defaultPaymentInstrument:
        $ref: ./PaymentInstrument.yaml
    createdTime:
        description: The customer created time
        allOf:
            -   $ref: ./ServerTimestamp.yaml
    updatedTime:
        description: The customer updated time
        allOf:
            -   $ref: ./ServerTimestamp.yaml
    tags:
        description: A list of customer's tags
        readOnly: true
        type: array
        items:
            $ref: ./Tags/Tag.yaml
    revision:
        description: >
            The number of times the customer data has been modified.

            The revision is useful when analyzing webhook data to determine if the
            change takes precedence over the current representation.
        type: integer
        readOnly: true
    _links:
        type: array
        description: The links related to resource
        readOnly: true
        minItems: 3
        items:
            anyOf:
                -   $ref: ./Links/SelfLink.yaml
                -   $ref: ./Links/NotesLink.yaml
                -   $ref: ./Links/DefaultPaymentInstrumentLink.yaml
                -   $ref: ./Links/LeadSourceLink.yaml
                -   $ref: ./Links/WebsiteLink.yaml
    _embedded:
        type: array
        description: >-
            Any embedded objects available that are requested by the `expand`
            querystring parameter.
        readOnly: true
        minItems: 1
        items:
            anyOf:
                -   $ref: ./Embeds/LeadSourceEmbed.yaml

```

##### Using the `$ref`

Notice in the complex example above the schema definition itself has `$ref` links to other schemas defined.

Here is a small excerpt with an example:

```yaml
defaultPaymentInstrument:
    $ref: ./PaymentInstrument.yaml
```

The value of the `$ref` is the path to the other schema definition.

You may use `$ref`s to compose schema from other existing schema to avoid duplication.

You will use `$ref`s to reference schema from your path definitions.

#### Editing Schemas

1. Navigate to the `openapi/components/schemas` folder.
2. Open the file you wish to edit.
3. Edit.

### Paths

#### Adding a Path

1. Navigate to the `openapi/paths` folder.
2. Add a new YAML file named like your URL endpoint except replacing `/` with `@` into folder named by the collection (
   example `request-queues`)
3. Put path parameters into curly braces like `{example}`.
4. Add the path and a ref to it inside of your `openapi.yaml` file inside of the `openapi` folder.

Example addition to the `openapi.yaml` file:

```yaml
'/requests-queues':
    $ref: './paths/request-queues/request-queues.yaml'
'/requests-queues/{queueId}':
    $ref: './paths/request-queues/request-queues@{queueId}.yaml'
```

Here is an example of a YAML file named `request-queues@{queueId}.yaml` in the `paths/request-queues` folder:

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

Here is an example of a YAML file named `request-queues.yaml` in the `paths/request-queues` folder:

```yaml
post:
    tags:
        - Request Queues
    summary: Create a request queue
    operationId: requestQueue_post
    description: Another markdown description here.
    requestBody:
    responses:
        '201':
            description: ''
            content:
                application/json:
                    schema:
                        allOf:
                            -   $ref: ../../components/schemas/request-queues/CreateRequestQueueResponse.yaml
    x-code-samples:
        -   lang: PHP
            source:
                $ref: ../code_samples/PHP/customers/post.php
```

You'll see extensive usage of `$ref`s in this example to different types of components including schemas.

You'll also notice `$ref`s to code samples.

#### Operation ID

The `operationId` is a unique identifier of the operation. It is used by the Redocly API Reference to generate code
samples and link them to the operation from other parts of the documentation.

There is a format for the `operationId`:

- The ID is generated from the path structure and the HTTP method.
- The object names should be in camelCase.
- If there is `{id}` in the path, the previous part of the path should be singular, otherwise plural.
- The divider between the object name and the action should be `_`.
- The action should be last in the `operationId` defined by the method name in lowercase.

Examples:

- `/requests-queues` Method: GET -> `requestQueues_get`
- `/requests-queues` Method: POST ->`requestQueues_post`
- `/requests-queues/{queueId}` Method: PUT -> `requestQueue_put`
- `/acts/{actorId}/runs` Method: POST -> `act_runs_post`
- `/acts/{actorId}/runs` Method: GET -> `act_runs_get`
- `/acts/{actorId}/versions/{versionNumber}/env-vars/{envVarName}` Method: GET -> `act_version_envVar_get`

### Code samples

NOTE: We do not use code samples in the OpenAPI definition for now.
We can use them in the future to generate code samples for the reference docs.

1. Navigate to the `openapi/code_samples` folder.
2. Navigate to the `<language>` (e.g. PHP) sub-folder.
3. Navigate to the `path` folder, and add ref to the code sample.

You can add languages by adding new folders at the appropriate path level.

More details inside the `code_samples` folder README.
