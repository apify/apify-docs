---
title: Learning the API
description: Understand the methods that can be used to learn the schema of the GraphQL API you'd like to scrape.
menuWeight: 1
paths:
    - api-scraping/graphql-scraping/learning-the-api
---

# [](#learning-the-api) Learning the API

Just like when working with regular RESTful APIs in the [**General API scraping**]({{@link api_scraping/general_api_scraping/locating_and_learning.md}}) section, it's important to learn a bit about the different available features of the GraphQL API (or at least of the the query/mutation) you are scraping before actually writing any code.

Not only does becoming comfortable with and understanding the ins and outs of using the API make the development process easier, but it can also sometimes expose features which will return data you'd otherwise be scraping from a different location.

## [](#introspection) Introspection

[Introspection](https://graphql.org/learn/introspection/) is when you make a query to the target GraphQL API requesting information about its schema. When done properly, this can provide a whole lot of information about the API and the different **queries** and **mutations** it supports.

In order to perform introspection on our [target website](https://cheddar.com), we just need to make a request to their GraphQL API with this introspection query using [Insomnia]({{@link tools/insomnia.md}}) or another HTTP client that supports GraphQL:

> To make a GraphQL query in Insomnia, make sure you've set the HTTP method to **POST** and the request body type to **GraphQL Query**.

```GraphQL
query
{__schema{queryType{name}mutationType{name}subscriptionType{name}types{...FullType}directives{name description locations args{...InputValue}}}}fragment FullType on __Type{kind name description fields(includeDeprecated:true){name description args{...InputValue}type{...TypeRef}isDeprecated deprecationReason}inputFields{...InputValue}interfaces{...TypeRef}enumValues(includeDeprecated:true){name description isDeprecated deprecationReason}possibleTypes{...TypeRef}}fragment InputValue on __InputValue{name description type{...TypeRef}defaultValue}fragment TypeRef on __Type{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name}}}}}}}}
```

Here's what we got back:

![GraphQL payload]({{@asset api_scraping/graphql_scraping/images/introspection.webp}})

<!-- talk about how to do introspection -->
show the query
show image
insomnia supports graphql queries and automatically fetches the schema if it's available
show how to use introspection to your advantage
difficult to sift through the json so use https://apis.guru/graphql-voyager/
<!--  -->

If the target website is smart though, they will have introspection disabled. In these cases, it is still possible to get some information about the API when using POSTMAN OR INSOMNIA THEY GIVE AUTOCOMPLETE SUGGESTIONS AND TYPO FIX SUGGESTIONS

show introspection disabled image
show autocomplete

<!-- show the endpoint -->

<!-- literally copy the json payload and test it in postman, oops we need the x-app-token header, add that -->

<!-- explain the query is graphQL language -->

<!-- SHOW HOW TO DO INTROSPECTION (IMPORTANT) -->

<!-- end lesson -->

<!-- IN THE NEXT LESSON: -->

<!-- show how to do it with gotscraping -->

<!-- show the naive soluton: string literals -->
