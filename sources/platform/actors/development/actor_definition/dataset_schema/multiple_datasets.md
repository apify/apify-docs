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
    "name": "this-is-book-library-scraper",
    "title": "Book Library scraper",
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

Alias and **name** are not the same thing. Named datasets have specific behavior in Apify platform (eg, the automatic data retention policy does not apply to them). Aliased datasets follow the data retention of their respective run. Aliases stay local to the run they belong to.

:::

The `datasets` object has to contain the `default` alias.

The `datasets` and `dataset` objects are mutually exclusive, the schema can only contain one.

## Accessing the datasets in Actor code

Mapping of aliases to the IDs is passed to the Actor in JSON encoded `ACTOR_STORAGES_JSON` environment variable.

```javascript
const storageIds = JSON.parse(process.env.ACTOR_STORAGES_JSON)
const defaultDataset = await Actor.openDataset();
// For the default dataset, it's also possible to use the following syntax:
// const defaultDataset = await Actor.openDataset(storageIds.datasets.default);
const categoriesDataset = await Actor.openDataset(storageIds.datasets.categories);

```

Incoming SDK support:

```javascript
const categoriesDataset = await Actor.openDataset({alias: 'categories'});
```

## Showing data to users

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

- TODO: Rely on default display
- TODO: Behavior in billing
