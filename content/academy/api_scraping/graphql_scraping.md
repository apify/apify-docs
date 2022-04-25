---
title: GraphQL scraping
description: Dig into the topic of scraping APIs which use the latest and greatest API technology - GraphQL. GraphQL APIs are very different from regular REST APIs.
menuWeight: 2.2
paths:
    - api-scraping/graphql-scraping
---

# [](#graphql-scraping) GraphQL scraping

[GraphQL](https://graphql.org/) APIs different from the regular [REST](https://www.redhat.com/en/topics/api/what-is-a-rest-api)ful APIs you're likely familiar with, which means that different methods and tooling are used to scrape them. This course will teach you everything you need to know about GraphQL to scrape an API built with it.

## [](#graphql-endpoints) How do I know if it's a GraphQL API?

In this section, we'll be scraping [cheddar.com](https://cheddar.com)'s GraphQL API. When you visit the website and make a search for anything while your **Network Tab** is open, you'll see a request that has been sent to the endpoint **api.cheddar.com/graphql**.

![GraphQL endpoint]({{@asset api_scraping/images/graphql-endpoint.webp}})

As a rule of thumb, when the endpoint ends with **/graphql** and it's a **POST** request, it's a 99.99% bulleproof indicator that the target site is using GraphQL. If you want to be 100% certain though, taking a look at the request payload will most definitely give it away.

![GraphQL payload]({{@asset api_scraping/images/graphql-payload.webp}})

Every GraphQL payload will be a JSON object with a **query** property, and a **variables** property if any variables were provided. If you take a closer look at the full **query** property of this request, you'll notice that it's stringified GraphQL language content.

![Taking a closer look at the payload]({{@asset api_scraping/images/stringified-syntax.webp}})

## [](#next) Next up

This course section's [first lesson]({{@link api_scraping/graphql_scraping/introspection.md}}) will be walking you through how to learn about a GraphQL API before scraping it by using **introspection** (don't worry - it's a fancy word, but a simple concept).
