---
title: Modifying variables
description: Learn how to modify the variables of a JSON format GraphQL query to use the API without needing to write any GraphQL language or create custom queries.
menuWeight: 1
paths:
    - api-scraping/graphql-scraping/modifying-variables
---

# [](#modifying-variables) Modifying variables

In the introduction of this course, we searched for the term **test** on the [Cheddar](https://cheddar.com) website and discovered a request to their GraphQL API. The payload looked like this:

```JSON
{"query":"query SearchQuery(\n  $query: String!\n  $count: Int!\n  $cursor: String\n) {\n  organization {\n    ...SearchList_organization\n    id\n  }\n}\n\nfragment SearchList_organization on Organization {\n  media(first: $count, after: $cursor, query: $query, recency_weight: 0.6, recency_days: 30, include_private: false, include_unpublished: false) {\n    hitCount\n    edges {\n      node {\n        _score\n        id\n        ...StandardListCard_video\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment StandardListCard_video on Slugable {\n  ...Thumbnail_video\n  ...StandardTextCard_media\n  slug\n  id\n  __typename\n}\n\nfragment Thumbnail_video on Slugable {\n  original_thumbnails: thumbnails(aspect_ratio: ORIGINAL) {\n    small\n    medium\n    large\n  }\n  sd_thumbnails: thumbnails(aspect_ratio: SD) {\n    small\n    medium\n    large\n  }\n  hd_thumbnails: thumbnails(aspect_ratio: HD) {\n    small\n    medium\n    large\n  }\n  film_thumbnails: thumbnails(aspect_ratio: FILM) {\n    small\n    medium\n    large\n  }\n  square_thumbnails: thumbnails(aspect_ratio: SQUARE) {\n    small\n    medium\n    large\n  }\n}\n\nfragment StandardTextCard_media on Slugable {\n  public_at\n  updated_at\n  title\n  hero_video {\n    duration\n  }\n  description\n}\n","variables":{"query":"test","count":10,"cursor":null},"operationName":"SearchQuery"}
```

We also learned that every GraphQL request payload will have a **query** property, which contains a stringified version of the query, and a **variables** property, which contains any parameters for the query.

If the query provided in the payload you find in the **Network tab** is good enough for your scraper's needs, you don't actually have to go down the GraphQL rabbit hole. Rather, you can just change the variables to receive the data you want. For example, right now, our example payload is set up to search for articles matching the keyword **test**; however, if we wanted to search for articles matching **cats** instead, we could do that by changing the **query** variable like so:

```JSON
{"query":"query SearchQuery(\n  $query: String!\n  $count: Int!\n  $cursor: String\n) {\n  organization {\n    ...SearchList_organization\n    id\n  }\n}\n\nfragment SearchList_organization on Organization {\n  media(first: $count, after: $cursor, query: $query, recency_weight: 0.6, recency_days: 30, include_private: false, include_unpublished: false) {\n    hitCount\n    edges {\n      node {\n        _score\n        id\n        ...StandardListCard_video\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment StandardListCard_video on Slugable {\n  ...Thumbnail_video\n  ...StandardTextCard_media\n  slug\n  id\n  __typename\n}\n\nfragment Thumbnail_video on Slugable {\n  original_thumbnails: thumbnails(aspect_ratio: ORIGINAL) {\n    small\n    medium\n    large\n  }\n  sd_thumbnails: thumbnails(aspect_ratio: SD) {\n    small\n    medium\n    large\n  }\n  hd_thumbnails: thumbnails(aspect_ratio: HD) {\n    small\n    medium\n    large\n  }\n  film_thumbnails: thumbnails(aspect_ratio: FILM) {\n    small\n    medium\n    large\n  }\n  square_thumbnails: thumbnails(aspect_ratio: SQUARE) {\n    small\n    medium\n    large\n  }\n}\n\nfragment StandardTextCard_media on Slugable {\n  public_at\n  updated_at\n  title\n  hero_video {\n    duration\n  }\n  description\n}\n","variables":{"query":"cats","count":10,"cursor":null},"operationName":"SearchQuery"}
```

Depending on the API, just doing this can be sufficient. However, sometimes we want to utilize complex GraphQL features in order to optimize our scrapers or just to receive more data than is being provided in the response of the requst found in the **Network tab**. This is what we will be discussing in the next lessons.

## [](#next) Next up

In the [next lesson]({{@link api_scraping/graphql_scraping/introspection.md}}) we will be walking you through how to learn about a GraphQL API before scraping it by using **introspection** (don't worry - it's a fancy word, but a simple concept).
