---
title: Multiple datasets
description: Learn how to use multiple datasets within your Actors to organize and store different types of data separately.
slug: /actors/development/actor-definition/dataset-schema/multiple-datasets
---

**Specify datasets with different structure.**

---

Some Actors produce data with different structure. In some cases, it's convenient to store the data in separate datasets, instead of pushing all data to the default one. Multiple datasets allow to specify those datasets upfront and enforce validation rules.

New datasets are created when the run starts, and follow it's data-retention.


## Defining multiple datasets

The multiple datasets may defined in Actor schema using `datasets` object:

```json title=".actor/actor.json"
{
    "actorSpecification": 1,
    "name": "this-is-e-commerce-scraper",
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
Schemas of individual datasets can be provided as a file reference or inlined.

The keys of the `datasets` objects are **aliases**, which can be used to refer to the specific datasets. In the example above, we have two datasets, aliased as `default` and `categories`.

:::info

Alias and **name** are not the same thing. Named datasets have specific behavior in Apify platform (eg, the automatic data retention policy does not apply to them). Aliased datasets follow the data retention of their respective run. Aliases only have a meaning in the scope of a specific run.

:::

The `datasets` object has to contain the `default` alias.

The `datasets` and `dataset` objects are mutually exclusive, the schema can only contain one.

## Accessing the datasets in Actor code

The SDK has a built-in support for accessing aliased datasets.

Inside the Actor, you can access it like this:

### Apify SDK

// TODO: Which versions? When is this released?

In the Javascript/Typescript SDK, use `openDataset` with `alias` option:

```javascript
const categoriesDataset = await Actor.openDataset({alias: 'categories'});
```

In Python SDK, use `alias` parameter:

```python
categories_dataset = await Actor.open_dataset(alias='categories')
```

### Environment variable

Outside of Apify SDK, access the environment variable directly:

```sh
echo $ACTOR_STORAGES_JSON | jq '.datasets.categories'
```

## Local development vs platform

// TODO: Which versions?

## Showing data to users

### Run Storages tab

The Storage tab of Actor run view is displaying all the dataset defined by Actor and datasets that were used by the run (up to some limit).

This makes the data accessible, but not very user-friendly. To make the datasets more accessible to users, use output schema.

### Output schema

Actors with output schema can refer to the datasets through variables using aliases:

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

## Billing implications

The `apify-default-dataset-item` synthetic event is only charged for items in dataset aliased as `default`. Charging for items in other datasets needs to be implemented in the Actor code.
