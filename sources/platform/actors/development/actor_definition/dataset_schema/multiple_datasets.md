---
title: Multiple datasets
description: Learn how to use multiple datasets within your Actors to organize and store different types of data separately.
sidebar_position: 2
slug: /actors/development/actor-definition/dataset-schema/multiple-datasets
---

Actors that scrape different data types can store each type in its own dataset with separate validation rules. For example, an e-commerce scraper might store products in one dataset and categories in another.

Each dataset:

- Is created when the run starts
- Follows the run's data retention policy
- Can have its own validation schema

## Define multiple datasets

Define datasets in your Actor schema using the `datasets` object:

```json title=".actor/actor.json"
{
    "actorSpecification": 1,
    "name": "my-e-commerce-scraper",
    "title": "E-Commerce Scraper",
    "version": "1.0.0",
    "storages": {
        "datasets": {
            "default": "./products_dataset_schema.json",
            "categories": "./categories_dataset_schema.json"
        }
    }
}
```

Provide schemas for individual datasets as file references or inline. Schemas follow the same structure as single-dataset schemas.

The keys of the `datasets` object are aliases that refer to specific datasets. The previous example defines two datasets aliased as `default` and `categories`.

:::info Alias versus named dataset

Aliases and names are different. Named datasets have specific behavior on the Apify platform (the automatic data retention policy doesn't apply to them). Aliased datasets follow the data retention of their run. Aliases only have meaning within a specific run.

:::

Requirements:

- The `datasets` object must contain the `default` alias
- The `datasets` and `dataset` objects are mutually exclusive (use one or the other)

## Access datasets in Actor code

The SDK has built-in support for accessing aliased datasets.

Inside the Actor, you can access it like this:

### Apify SDK

In the JavaScript/TypeScript SDK `>=3.7.0`, use `openDataset` with `alias` option:

```js
const categoriesDataset = await Actor.openDataset({alias: 'categories'});
```

In the Python SDK `>=3.3.0`, use `alias` parameter:

```py
categories_dataset = await Actor.open_dataset(alias='categories')
```

:::note Running outside the Apify platform

When the JavaScript SDK runs outside the Apify platform, aliases fall back to names (using an alias is the same as using a named dataset). The dataset is purged on first access if it's the default dataset.

The Python SDK uses the [Crawlee for Python aliasing mechanism](https://crawlee.dev/python/docs/guides/storages#named-and-unnamed-storages). Aliases are created as unnamed and purged on Actor start.

:::

### Environment variable

Access the environment variable directly without the SDK:

```sh
echo $ACTOR_STORAGES_JSON | jq '.datasets.categories'
```

## Configure the output schema

### Storage tab

The **Storage** tab in the Actor run view displays all datasets defined by the Actor and used by the run (up to 10).

The Storage tab shows data but doesn't surface it clearly to end users. To present datasets more clearly, define an [output schema](../../actor_definition/output_schema/index.md).

### Output schema

Actors with output schemas can reference datasets through variables using aliases:

```json
{
    "actorOutputSchemaVersion": 1,
    "title": "Output schema",
    "properties": {
        "products": {
            "type": "string",
            "title": "Products",
            "template": "{{storages.datasets.default.apiUrl}}/items"
        },
        "categories": {
            "type": "string",
            "title": "Categories",
            "template": "{{storages.datasets.categories.apiUrl}}/items"
        }
    }
}
```

## Billing for non-default datasets

When an Actor uses multiple datasets, only items pushed to the `default` dataset trigger the built-in `apify-default-dataset-item` event. Items in other datasets are not charged automatically.

To charge for items in other datasets, implement custom billing in your Actor code. Refer to the [billing documentation](../../../publishing/monetize/pay_per_event.mdx) for implementation details.
