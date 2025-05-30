---
title: Apify API
description: Learn how to use the Apify API and client libraries to programmatically control all aspects of the Apify platform.
sidebar_label: API
sidebar_position: 1
slug: /integrations/api
---

**Learn how to use the Apify API and client libraries to programmatically control all aspects of the Apify platform.**

---

All aspects of the Apify platform can be controlled via a REST API, which is described in detail in the [**API Reference**](/api/v2). The API provides programmatic access to run Actors, manage data in storages, schedule tasks, and much more.

This guide will help you understand how to effectively use the Apify API, both directly via HTTP requests and through our official client libraries for JavaScript and Python.

## API token

To access the Apify API in your integrations, you need to authenticate using your secret API token. You can find it on the [Integrations](https://console.apify.com/settings/integrations) page in Apify Console.

![Integrations page in Apify Console](../images/api-token.png)

When creating an API token, give it a descriptive name that indicates its purpose. Never use one token for several services, much like you shouldn't use the same password for different accounts.

:::caution

Do not share the API token with untrusted parties, or use it directly from client-side code, unless you fully understand the consequences! Consider [limiting the permission scope](#api-tokens-with-limited-permissions) of the token so that it can only access what it really needs.

::

## Authentication

You can authenticate the Apify API in two ways:

1. **Via the `Authorization` HTTP header** (recommended):

   ```text
   Authorization: Bearer YOUR_API_TOKEN
   ```

2. **Via the URL `token` query parameter**:

   ```text
   https://api.apify.com/v2/acts/YOUR_USERNAME~actor-name/runs?token=YOUR_API_TOKEN
   ```

We always recommend using the HTTP header method as it's more secure. The token is not exposed in the URL, which could be logged in server logs or browser history.

## Using the API directly

The Apify API follows RESTful principles and uses standard HTTP methods. All API endpoints are accessible via the base URL: `https://api.apify.com/v2/`.

### Finding your endpoints

The easiest way to discover available API endpoints is through the Apify Console. On any Actor's page, click the **API** button in the top right corner:

![API button on an Actor's page](../images/api-button.png)

This opens a modal with various endpoints related to the Actor. You can copy these endpoints or test them directly within the console.

### Running an Actor via API

One of the most common operations is running an Actor and retrieving its results. Here's how to do it using the synchronous run endpoint, which waits for the Actor to finish and returns the results:

```text
https://api.apify.com/v2/acts/YOUR_USERNAME~actor-name/run-sync-get-dataset-items
```

#### Providing input

When running an Actor via API, you need to provide input in the request body as a JSON object. For example:

```json
{
    "searchQuery": "iPhones",
    "maxResults": 100
}
```

The input structure depends on the specific Actor you're running. Check the Actor's documentation or INPUT_SCHEMA.json file for details.

#### Setting parameters

You can control the Actor run by providing additional parameters in the URL:

```url
https://api.apify.com/v2/acts/YOUR_USERNAME~actor-name/run-sync-get-dataset-items?token=YOUR_TOKEN&format=csv&limit=10
```

Common parameters include:

- _format_: Output format (json, csv, xlsx, html, etc.)
- _limit_: Maximum number of dataset items to return
- _offset_: Number of dataset items to skip
- _fields_: Fields to include in the output
- _omit_: Fields to exclude from the output

### Sending requests

You can use any HTTP client to interact with the API. Here are some examples:

#### Using curl

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -d '{"searchQuery": "iPhones", "maxResults": 100}' \
  https://api.apify.com/v2/acts/YOUR_USERNAME~actor-name/run-sync-get-dataset-items
```

#### Using HTTP clients

API requests can be made using HTTP clients like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/):

1. Set the request method to POST
2. Add the Authorization header: `Bearer YOUR_API_TOKEN`
3. Set Content-Type header to `application/json`
4. Include the JSON input in the request body
5. Send the request

![API request in HTTP client](../images/run-actor-postman.png)

## Using client libraries

If you're working with JavaScript/Node.js or Python, we recommend using our official API client libraries. These libraries implement best practices such as exponential backoff and rate limiting, making your integration more robust.

### JavaScript client

#### Installation

```bash
npm install apify-client
```

#### Basic usage

```javascript
import { ApifyClient } from 'apify-client';

// Initialize the client
const client = new ApifyClient({
    token: 'YOUR_API_TOKEN',
});

// Run an Actor and wait for it to finish
const run = await client.actor('username/actor-name').call({
    searchQuery: 'iPhones',
    maxResults: 100
});

// Get dataset items
const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log(`Actor generated ${items.length} results`);
```

### Python client

#### Installation

```bash
pip install apify-client
```

#### Basic usage

```python
from apify_client import ApifyClient

# Initialize the client
client = ApifyClient(token='YOUR_API_TOKEN')

# Run an Actor and wait for it to finish
run = client.actor('username/actor-name').call(run_input={
    'searchQuery': 'iPhones',
    'maxResults': 100
})

# Get dataset items
items = client.dataset(run['defaultDatasetId']).list_items().items
print(f"Actor generated {len(items)} results")
```

### Common operations with client libraries

#### Running an Actor

```javascript
// JavaScript
const run = await client.actor('username/actor-name').call({ /* input */ });
```

```python
# Python
run = client.actor('username/actor-name').call(run_input={ /* input */ })
```

#### Getting dataset items

```javascript
// JavaScript
const dataset = client.dataset(datasetId);
const { items } = await dataset.listItems();
```

```python
# Python
dataset = client.dataset(dataset_id)
items = dataset.list_items().items
```

#### Managing key-value store

```javascript
// JavaScript
const store = client.keyValueStore(storeId);
// Get record
const record = await store.getRecord('RECORD_KEY');
// Set record
await store.setRecord('RECORD_KEY', { data: 'value' });
```

```python
# Python
store = client.key_value_store(store_id)
# Get record
record = store.get_record('RECORD_KEY')
# Set record
store.set_record('RECORD_KEY', { 'data': 'value' })
```

#### Updating Actor settings

```javascript
// JavaScript
const actor = client.actor('username/actor-name');
await actor.update({
    defaultRunOptions: {
        timeout: 120,
        memoryMbytes: 1024
    }
});
```

```python
# Python
actor = client.actor('username/actor-name')
actor.update(default_run_options={
    'timeout': 120,
    'memory_mbytes': 1024
})
```

## API tokens with limited permissions

By default, tokens can access all data in your account. If that is not desirable, you can choose to limit the permissions of your token, so that it can only access data needed for the particular use case. We call these tokens _scoped_.

_A scoped token can access only those resources that you'll explicitly allow it to._

### How to create a scoped token

Scoped tokens are managed through the [Integrations](https://console.apify.com/settings/integrations) page in Apify Console. When creating a token (or updating an existing one), toggle "Limit token permissions" to make the token scoped.

![Toggle "Limit token permissions" to make a token scoped](../images/api-token-scoped.png)

Once the token is scoped, you can specify the token's permissions.

### Account-level vs resource-specific permissions

We support two different types of permissions for tokens:

- _Account-level permissions_: These apply to all resources in the entire account.
- _Resource-specific permissions_: These apply only to specific, existing resources.

A single token can combine both types, allowing you to create precisely scoped access.

### Allowing tokens to create resources

If you need to create new resources with the token (for example, create a new task, or storage), you need to explicitly allow that as well.

Once you create a new resource with the token, _the token will gain full access to that resource_, regardless of other permissions.

### Actor execution with scoped tokens

When you run an Actor with a scoped token, Apify creates a new run token and injects it into the Actor environment. You can choose what permissions this run token will have:

- _Full access_: The Actor will have full access to all account data
- _Restricted access_: The Actor will have the same limited permissions as the original token

![Choose permission mode for running Actors with a scoped token](../images/api-token-scoped-run-modes.png)

For more details on token permissions, refer to our [API documentation](/platform/integrations/api#api-tokens-with-limited-permissions).

## Best practices

### Security

- Never hardcode API tokens directly in your code, especially in public repositories
- Store tokens in environment variables or secure secret management systems
- Use the most restrictive token scope that still allows your code to function
- Regularly rotate your API tokens, especially for production systems

### Performance

- Use batch operations when possible (e.g., `pushData()` with arrays)
- Implement proper error handling with exponential backoff for retries
- Set appropriate timeouts for long-running operations
- Monitor API usage to stay within your plan limits

### Debugging

When you encounter issues with API calls:

1. Check the HTTP status code and error message
2. Verify the API token has sufficient permissions
3. Inspect the request payload for proper formatting
4. Look at the Actor run logs for any internal errors

### Common pitfalls

- Not handling API rate limits properly
- Using hard-coded dataset or store IDs that may expire
- Forgetting to handle pagination for large datasets
- Not considering data retention policies for Apify storages
