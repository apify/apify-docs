---
title: Modifying variables
description: Learn how to modify the variables of a JSON format GraphQL query to use the API without needing to write any GraphQL language or create custom queries.
sidebar_position: 1
slug: /api-scraping/graphql-scraping/modifying-variables
---

# Modifying variables {#modifying-variables}

**Learn how to modify the variables of a JSON format GraphQL query to use the API without needing to write any GraphQL language or create custom queries.**

---

In the introduction of this course, we searched for the term **test** on the [Cheddar](https://cheddar.com) website and discovered a request to their GraphQL API. The payload looked like this:

```json
{
    "query": "query SearchQuery($query: String!, $count: Int!, $cursor: String) {\n    organization {\n        ...SearchList_organization\n        id\n    }\n    }\n    fragment SearchList_organization on Organization {\n    media(\n        first: $count\n        after: $cursor\n        query: $query\n        recency_weight: 0.6\n        recency_days: 30\n        include_private: false\n        include_unpublished: false\n    ) {\n        hitCount\n        edges {\n        node {\n            _score\n            id\n            ...StandardListCard_video\n            __typename\n        }\n        cursor\n        }\n        pageInfo {\n        endCursor\n        hasNextPage\n        }\n    }\n    }\n    fragment StandardListCard_video on Slugable {\n    ...Thumbnail_video\n    ...StandardTextCard_media\n    slug\n    id\n    __typename\n    }\n    fragment Thumbnail_video on Slugable {\n    original_thumbnails: thumbnails(aspect_ratio: ORIGINAL) {\n        small\n        medium\n        large\n    }\n    sd_thumbnails: thumbnails(aspect_ratio: SD) {\n        small\n        medium\n        large\n    }\n    hd_thumbnails: thumbnails(aspect_ratio: HD) {\n        small\n        medium\n        large\n    }\n    film_thumbnails: thumbnails(aspect_ratio: FILM) {\n        small\n        medium\n        large\n    }\n    square_thumbnails: thumbnails(aspect_ratio: SQUARE) {\n        small\n        medium\n        large\n    }\n    }\n    fragment StandardTextCard_media on Slugable {\n    public_at\n    updated_at\n    title\n    hero_video {\n        duration\n    }\n    description\n    }",
    "variables": { "query": "test","count": 10,"cursor": null },
    "operationName": "SearchQuery"
}
```

We also learned that every GraphQL request payload will have a **query** property, which contains a stringified version of the query, and a **variables** property, which contains any parameters for the query.

If we convert the query field to a `.graphql` format, we can get it nicely formatted with syntax highlighting (install GraphQL extension for editor)

```graphql
query SearchQuery($query: String!, $count: Int!, $cursor: String) {
    organization {
        ...SearchList_organization
        id
    }
    }
    fragment SearchList_organization on Organization {
    media(
        first: $count
        after: $cursor
        query: $query
        recency_weight: 0.6
        recency_days: 30
        include_private: false
        include_unpublished: false
    ) {
        hitCount
        edges {
        node {
            _score
            id
            ...StandardListCard_video
            __typename
        }
        cursor
        }
        pageInfo {
        endCursor
        hasNextPage
        }
    }
    }
    fragment StandardListCard_video on Slugable {
    ...Thumbnail_video
    ...StandardTextCard_media
    slug
    id
    __typename
    }
    fragment Thumbnail_video on Slugable {
    original_thumbnails: thumbnails(aspect_ratio: ORIGINAL) {
        small
        medium
        large
    }
    sd_thumbnails: thumbnails(aspect_ratio: SD) {
        small
        medium
        large
    }
    hd_thumbnails: thumbnails(aspect_ratio: HD) {
        small
        medium
        large
    }
    film_thumbnails: thumbnails(aspect_ratio: FILM) {
        small
        medium
        large
    }
    square_thumbnails: thumbnails(aspect_ratio: SQUARE) {
        small
        medium
        large
    }
    }
    fragment StandardTextCard_media on Slugable {
    public_at
    updated_at
    title
    hero_video {
        duration
    }
    description
}
```

If the query provided in the payload you find in the **Network** tab is good enough for your scraper's needs, you don't actually have to go down the GraphQL rabbit hole. Rather, you can just change the variables to receive the data you want. For example, right now, our example payload is set up to search for articles matching the keyword **test**. However, if we wanted to search for articles matching **cats** instead, we could do that by changing the **query** variable like so:

```json
{
    "...": "...",
    "variables": { "query": "cats","count": 10,"cursor": null }
}
```

Depending on the API, just doing this can be sufficient. However, sometimes we want to utilize complex GraphQL features in order to optimize our scrapers or just to receive more data than is being provided in the response of the request found in the **Network** tab. This is what we will be discussing in the next lessons.

## Next up {#next}

In the [next lesson](./introspection.md) we will be walking you through how to learn about a GraphQL API before scraping it by using **introspection** (don't worry - it's a fancy word, but a simple concept).
