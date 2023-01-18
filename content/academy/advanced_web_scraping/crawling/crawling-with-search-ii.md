---
title: Crawling with search II
description: A more complete solution the crawling with search problem.
menuWeight: 3
paths:
- advanced-web-scraping/crawling/crawling-with-search-ii
---

# Crawling websites with search II

## [](#price-range-splitting-might-not-be-enough) Price range splitting might not be enough
In the previous lesson, we implemented relatively simple price range splitting algorithm that works good enough for most websites. However, it has a few shortcomings:
- **Prices tend to aggregate around specific values** (like $100 or $9.99) - This might cause that we end up splitting up to a point where the range contains just a single value (e.g. $9.99-$9.99) and we are still over the pagination limit.
- **Some products might not have any price** - Typically products that are out of stock. On some sites, they are not included in the price range even if it starts with 0.

## [](#api-examples) API Examples
To solve a case where price splitting is not enough, we can split over a different filter like `size` or `brand`. That might get us to the finish line but the more sites like these we encounter, the more sense it makes to implement a more general solution. Fortunately, the typical API responses from these searches are very similar and can guide us in the implementation.

### [](#response-examples) Response examples
In this lesson, we will be working with JSON APIs which is the most common case for implementing search. If the website uses purely server-rendered HTML (like Amazon), you can still use this framework but you might miss some of the details and will need to convert the HTML into data structures.

Typical API responses from search queries looks like this (the JSON is heavily truncated, there are many more options):
```jsonc
{
    "response": {
        "result_sources": {
			"token_match": {
				"count": 275655
			}
		},
        "results": [
            // Product data we are extracting
        ],
        "sort_optipons" [
			{
				"sort_by": "release_date",
				"display_name": "Upcoming Releases",
				"sort_order": "ascending"
			},
			{
				"sort_by": "lowest_price_cents",
				"display_name": "Price (Low - High)",
				"sort_order": "ascending"
			}
        ],
        "facets": [
			{
				"display_name": "Brand",
				"name": "brand",
				"type": "multiple",
				"options": [
					{
						"count": 216,
						"display_name": "424",
						"value": "424"
					},
					{
						"status": "",
						"count": 125,
						"display_name": "032C",
						"value": "032c"
					}
                ]
            },
            {
				"display_name": "Price",
				"name": "lowest_price_cents",
				"type": "range",
				"min": 0,
				"max": 11302500
			},
            // Imagine other facets like size, consdition, color, release year, shipping price
        ]
    }
}
```

Let's break it down:
- `response.result_sources.token_match.count` - This is the total number of products that match the search query. We can use it to determine if we are under the limit and can start paginating or need to refine the search further
- `response.results` - This is the list of products that we are extracting. It is usually paginated and we need to iterate over all pages to get all the products. We don't really care about the results in this lesson, paginating them is trivial
- `response.sort_options` - This is the list of sorting options that the website provides. We don't need to use sorting but it can for example enable us to double the limit for price range filter (we can sort from cheapest and then from most expensive and get twice as many products)
- `response.facets` - This is the list of filters that the website provides. The `count` property of the options is usually tied to the current search query so as you refine the search, these numbers will lower as well. We can use them to further refine the search. In this example, we can use the `brand` filter to split the search into multiple smaller searches. We can also use the `lowest_price_cents` filter to split the price range into smaller ranges. Facets are key to our algorithm and we will explore them in more detail in the next section.

Another response example might look like:
```json
{
    "data": {
        "browse": {
            "results": {
                "edges": [
                    // products
                ],
                "pageInfo": {
                    "limit": 40,
                    "page": 1,
                    "total": 76903
                }
            }
        }
    }
}
```

In this case, the response doesn't contain sort options or facets. We will have to extract those manually or programmatically from the page. 

### [](#request-examples) Request examples
It is useful to also look into the requests that triggered these responses.

For the first response, the request was GET and all parameters were contained in the URL:
https://website.com/search?key=key_fsgbjdbvGTECO5d8&page=1&num_results_per_page=24&filters[Blowest_price_cents]=931000-10286000&filters[size_converted]=us_sneakers_men_4&sort_order=descending

Let's break down the parameters:
- `key` - Is API key required for the request. It might be hardcoded and provided in the initial HTML (sometimes it gets more complicated but that is not the topic for this lesson)
- `page` - The page number. For refining the search, we want to keep this on 1 so we always get results.
- `num_results_per_page` - The number of results per page. There is usually a limit to it but what we care more about is the total limit for each search which is often not displayed and we have to find that value by trial and error.
- `filters` - Filters here use a custom URL format of `filters[facet_name]=facet_value`. The value can be a single string or a number range depending on the type of the facet.
- `sort_order` - Making sure we use the same sorting order for the whole search helps with debugging.

The second API was using a POST request with the parameters in the body. This is using [Graph QL]({{@link api_scraping/graphql_scraping.md}}).
```json
{
    "operationName": "Browse",
    "query": "query long-graphql-query...",
    "variables":{
        "category": "sneakers",
        "filters": [
            {
                "id": "browseVerticals",
                "selectedValues": [
                    "sneakers"
                ]
            },
            {
                "id": "shoeSize",
                "selectedValues": [
                    "4"
                ]
            }
        ],
        "filtersVersion": 4,
        "sort": {
            "id": "featured",
            "order": "DESC"
        },
        "page": {
            "index": 1,
            "limit": 40
        },
        "currency": "USD"  
    }
}
```

## [](#the-framework) The framework
> We are working on a TypeScript library that will provide this framework and also auto-implement it for popular search APIs like Algolia.

Let's be a bit more formal here and define the goals for our framework:
- We want to extract all products from a website (or its category). If it is not possible, we want to extract as much as possible.
- We want to be as efficient as possible. That means extracting all products with minimum number of requests.
- We want to know if we succeeded or not and if not, why. The framework needs to provide us with enough information to debug the issue.

### [](#facets-vs-filters) Facets vs filters
There probably isn't a single global definition of what a facet is and what a filter is. In this framework, we will use the following definitions:
**Facet** - A lit of options (or range) that you can apply to get a specific filter. You get facets from the API response.
**Filter** - A chosen option from the facet that you can use to refine the search. You set filters in the API request.


### [](#known-vs-unknown) Known vs unknown facets
The first thing we need to do is to figure is if the website provides the counts for options of the facets. 

### [](#categorizing-facets) Categorizing facets
As we explained in the previous section, facets are key to our algorithm. To choose the correct facet, we need to understand how to rank them. There are 2 main types:

#### [](#range-facets) Range facets
Range facets like price, weight, area, etc. are defined by two numerical values. Ranges are typically recursively split into two equal sub-ranges until both min and max values equal. Some sites will allow defining open ended ranges where we can only define the lower or upper bound but some sites do not allow that. We also have to be mindful about if the bounds are inclusive or exclusive. 

Range facets advantage is that they can be recursively split by half which has a nice property of logarithmic complexity. The disadvantage is that we don't get the exact number of products in each sub-range upfront so some ranges are actually not complete facets.

#### [](#multichoice-facets) Multichoice facets
Multichoice facets are defined by a list of options. Each option has a value and a count (if provided by the website). The count is usually tied to the current search query and will lower as we refine the search further but that might not be the case for facets provided in the request. 

Multichoice facets advantage is that we can get the exact number of products in each sub-facet upfront. That makes it easy to create accurate automatic solutions because we know if the facet is complete or not and how even is its option distribution. The disadvantage is that they usually offer only small amount of options and thus we have to combine many of them to achieve a broad coverage. They also tend to be incompete.

### [](#ranking-facets) Ranking facets
A good facet should be:
- **Complete** - A sum of all option counts should equal to the total number of products for this request. If it is lower or higher, we cannot ensure that we are getting all the products. (We can still use it for best-effort scraping)
- **Evenly distributed** - The enable deep splitting of the search, it should be relatively evenly distributed. This applies both to range and multichoice facets but we can only calculate it for multichoice facets (for range ones we have to set their rank manually).

#### [](#complete-vs-incomplete-vs-unknown) Complete vs incomplete vs unknown
**Complete facets** are the easiest to work with. If we can complete the scrape with just them, we can create a very efficient algorithm that will get all the products with minimum number of requests and reliably.

If unfortuantely, we run out of splits over complete facets, we will have to finish with **incomplete facets**. Their part in the algorithm depends a lot on our business use-case. Since we cannot create a predictable paths for incomplete facets, we will have to create a lot of different filter combinations and hope that we will eventually get all the products. We have to put hard-stops on the number of requests we make and the number of products we get. If we don't, we might end up with an almost infinite loop. That being said, we can still rank incomplete facets and find a lot of products with them.

Unknown facets are those where we don't count of the options upfront. We can either just enqueue all combinations (with some limits) or manually rank them as needed. There is also an option to gather these counts partially as we scrape to identify the most promising facets.

## [](#the-manual-solution) The manual solution
We don't necessarily need a refined algorithm to properly traverse the whole website. The obvious way to start is to just manually check the facets distribution on the website and figure out the best path. It might be something like splitting over `price`, then `size` and then `brand`. At that point, we might be confident no final combination will end up over the limit.

The disadvantage of this approach is that it is vulnerable to changes on the website. As products are added and removed, the distribution of the facets will change and we might end up with a suboptimal solution. If the names of the facets change, our solution will break completely. Fortunately, this doesn't happen very often but we need to be sure to have a good monitoring system to catch this (more on monitoring in later lessons).

<!-- This is just an initial draft, we will definitely figure a more conscise and optimized approach. Happy for any feedback -->
## [](#the-algorithm) The algorithm
We are finally getting to the meat of the lesson. The output of the algorithm is to give us the best facet every time we call it (and provide it the currently used filters) and tell us if we are ensuring all products are extracted or not. The implementation will have to be adjusted for each website because they will give us different amount of information.

We sort the facets by their rank which is calculated as follows:
- Complete facets are ranked higher than range ones and incomplete ones
- Evenly distributed facets are ranked higher than unevenly distributed ones. Range facets are by default somewhere in the middle but we can override their rank manually.
- Facets with only one option are discarded completely.

The algorithm is as follows:
1. Fist we start with complete multichoice facets ranked by their distribution.
2. If we run out of complete facets, we start with range facets. We don't know if their are complete upfront so we enqueue them and pass expected total results. If we get less than expected, we know that the facet is incomplete and and re-enqueue the previous request with this extra information to find the next best facet.
3. If we run out of range facets, we start with incomplete multichoice facets ranked by their distribution. We iterate over them until we get all products or we run into hard request limits.

### [](#code) Code
We will write quite a bit of code in the next section so please make yourself comfortable. We will use the reponse format from the first [response example](#response-examples) that includes pretty rich information about the facets, mainly their type and count. If this information is not available on target website, the solution will never be this much automatic and will require manual ordering of the facets.

The below implementation is by no means optimal and might be simply too complicated for your needs but the goal is to present several ideas and also prepare you for common problems you might encounter.

#### [](#types) Types
If you use TypeScript, it is useful to define the Facet type for type check and code completion:
```typescript
interface FacetOption {
    count: number,
    display_name: string,
    value: string
}

interface MultichoiceFacet {
    name: string,
    display_name: string,
    type: 'multiple',
    options: FacetOption[],
}

interface RangeFacet {
    name: string,
    display_name: string,
    type: 'range',
    min: number,
    max: number,
}

type Facet = MultichoiceFacet | RangeFacet;
```

#### [](#utilities) utilities
First we create utility functions
```typescript
// Facets that have no or only one option are useless
const isUsableFacet = (facet: Facet) => {
    if (facet.type === 'range') {
        return true;
    }
    return facet.options.length > 1;
}

const isFacetComplete = (facet: Facet, total: number): boolean => {
    if (facet.type === 'range') {
        return true;
    }
    const sumOfOptions = facet.options.reduce((sum, option) => sum + option.count, 0);
    return sumOfOptions === total;
};

// Returns number between 0 and 1. Lower is better 
const facetDistributionRank = (facet: Facet): number => {
    // We will give range facets a middle value. They are good but not necessarily the most efficient.
    if (facet.type === 'range') {
        return 0.5;
    }
    
    const { options } = facet;
    const total = options.reduce((sum, option) => sum + option.count, 0);
    // Mean average count for single option
    const average = total / options.length;
    const sumOfDifferences = options.reduce((sum, option) => sum + Math.abs(option.count - average), 0);
    // We divide it the differences by total so the result is not skewed by the total number of options
    // and lands between 0 and 1
    return sumOfDifferences / total;
};
```

### [](#url-parser) URL parser
We will also need a function to parse the facets from the current URL so we don't repeat ourselves. Let's do this properly and create a class for manipulating the URL to get and set facets. We are still following the 1st response and request examples
```typescript
// In a separate file
type RangeFilter = {
    name: string,
    min: number;
    max: number;
}

type MultiChoiceFilter = {
    name: string;
    value: string;
}

type Filter = RangeFilter | MultiChoiceFilter;

export class UrlParser extends URL {
    getFilters(): Filter[] {
        const filters = [];
        for (const [key, value] of this.searchParams) {
            const match = key.match(/filters=\[(.+)\]$/);
            if (match) {
                const name = match[1];
                const rangeMatch = value.match(/(\d+)-(\d+)/);
                if (rangeMatch) {
                    filters.push({
                        name,
                        min: Number(rangeMatch[1]),
                        max: Number(rangeMatch[2]),
                    });
                } else {
                    filters.push({
                        name,
                        value,
                    });
                }
            }
        }
        return filters;
    }
}
```

There are many ways we can structure the code that will choose the best facet but let's use simple procedural code for now:
```typescript
// We
const currentlyUsedFacets
```

Now we have all we need to process the response:
```typescript
const OVERRIDE_RANK = {
    // We want to skip the shipping price facet because it is not evenly distributed
    shipping_price: 0.9,
}
```