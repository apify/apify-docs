---
title: Custom queries
description: Learn how to write custom GraphQL queries, how to pass input values into GraphQL requests as variables, and how to retrieve and output the data from a scraper.
menuWeight: 3
paths:
    - api-scraping/graphql-scraping/custom-queries
---

# [](#custom-queries) Custom queries

Sometimes, the queries found in the **Network** tab aren't good enough for your use case. Or, perhaps they're even returning more data than what you're after (which can slow down the queries depending on how much data they're giving back). In these situations, it's a good idea to dig a bit deeper into the API and start writing your own custom use-case specific queries.

In this lesson, we're building a scraper which expects a single number (in **hours**) and a **query** string as its input. As output, it should provide data about the first 1000 Cheddar posts published within the last **n** hours which match the provided query. Each **post** object should contain the **title**, the **publishDate** and the **videoUrl** of the post.

```JSON
[
    {
        "title": "FDA Authorizes 1st Breath Test for COVID-19 Infection",
        "publishDate": "2022-04-15T11:58:44-04:00",
        "videoUrl": "https://vod.chdrstatic.com/source%3Dbackend%2Cexpire%3D1651782479%2Cpath%3D%2Ftranscode%2Fb68f8133-3aa9-4c96-ac26-047452bbc9ce%2Ctoken%3D581fd52bb7f634834edca5c201619c014cd21eb20448cf89525bf101ca8a6f64/transcode/b68f8133-3aa9-4c96-ac26-047452bbc9ce/b68f8133-3aa9-4c96-ac26-047452bbc9ce.mp4"
    }
    {
        "...": "..."
    }
]
```

## [](#project-setup) Project setup

To make sure we're all on the same page, we're going to set up the project together by first creating a folder named **graphql-scraper**. Once navigated to the folder within your terminal, run the following command:

```shell
npm init -y && npm install graphql-request puppeteer
```

This command will first initialize the project with NPM, then will install the `puppeteer` and `graphql-request` packages, which we will need in this lesson.

Finally, create a file called **index.js**. This is the file we will be working in for the rest of the lesson.

## [](#preparations) Preparations

In the `graphql-request` package, you can create an instance of the **GraphQLClient** class which will hold the GraphQL endpoint URL and some headers you'd like to send a long with every request.

```JavaScript
// index.js
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('https://api.cheddar.com/graphql', { headers: { /* We need an X-App-Token header! */ } });
```

If we remember from the last lesson though, we need to pass a valid "app token" within the **X-App-Token** header of every single request we make, or else we will be blocked. When testing queries, we just copied this value straight from the **Network** tab; however, since this is a dynamic value, we should farm it.

Since we know requests with this header are sent right when the front page is loaded, it can be farmed by simply visiting thee page and intercepting requests in Puppeteer like so:

```JavaScript
// scrapeAppToken.js
import puppeteer from 'puppeteer';

const scrapeAppToken = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let appToken = null;

    page.on('response', async (res) => {
        // grab the token from the request headers
        const token = res.request().headers()?.['x-app-token'];

        // if there is a token, grab it and close the browser
        if (token) {
            appToken = token;
            await browser.close();
        }
    });

    await page.goto('https://cheddar.com/');

    await page.waitForNetworkIdle();

    // otherwise, just close the browser after networkidle
    // has been fired
    await browser.close();

    // return the apptoken (or null)
    return appToken;
};

export default scrapeAppToken;
```

With this code, we're doing the same exact thing as we did in the previous lesson to grab this header value, except programmatically.

> To learn more about this method of scraping headers and tokens, refer to the [Cookies, headers, and tokens]({{@link api_scraping/general_api_scraping/cookies_headers_tokens.md}}) lesson of the **General API scraping** section.

Now, we can import this function into our **index.js** and use it to set the **X-App-Token** header when creating the client:

```JavaScript
// index.js
import { GraphQLClient } from 'graphql-request';
// import the function
import scrapeAppToken from './scrapeAppToken.mjs';

const token = await scrapeAppToken();

const client = new GraphQLClient('https://api.cheddar.com/graphql', { headers: { 'X-App-Token': token } });
```

## [](#building-the-query) Building the query

First, we'll write a skeleton query where we define which variables we're expecting (from the user of the scraper):

```GraphQL
query SearchQuery($query: String!, $max_age: Int!) {
    # query will go here
}
```

Also in the previous lesson, we learned that the **media** type is dependent on the **organization** type. This means to get any **media**, it must be wrapped in the **organization** query:

```GraphQL
query SearchQuery($query: String!, $max_age: Int!) {
  organization {
    media(query: $query, max_age: $max_age , first: 1000) {
        
    }
  }
}
```

Finally, since Cheddar is using [cursor-based relay pagination](https://relay.dev/graphql/connections.htm#relay-style-cursor-pagination) for their API, we must access the data through the **edges** property, where each **node** is a result item:

```GraphQL
query SearchQuery($query: String!) {
  organization {
    media(query: $query, max_age: $max_age , first: 1000) {
      edges {
        node {
            # here we will define the fields we want
        }
      }
    }
  }
}
```

The next step is to just fill out the fields we'd like back, and we've got our final query!

```GraphQL
query SearchQuery($query: String!) {
  organization {
    media(query: $query, max_age: $max_age , first: 1000) {
      edges {
        node {
          title # title
          public_at # this will be publishDate
          hero_video {
            video_urls {
              url # the first URL from these results will be videoUrl
            }
          }
        }
      }
    }
  }
}
```

## [](#making-the-request) Making the request

Back in our code, we can import `gql` from `graphql-request` and use it to store our query:

```JavaScript
// index.js
import { gql, GraphQLClient } from 'graphql-request';
import scrapeAppToken from './scrapeAppToken.mjs';

const token = await scrapeAppToken();

const client = new GraphQLClient('https://api.cheddar.com/graphql', { headers: { 'X-App-Token': token } });

const GET_LATEST = gql`
    query SearchQuery($query: String!, $max_age: Int!) {
        organization {
            media(query: $query, max_age: $max_age, first: 1000) {
                edges {
                    node {
                        title
                        public_at
                        hero_video {
                            video_urls {
                                url
                            }
                        }
                        thumbnail_url
                    }
                }
            }
        }
    }
`;
```

> In order to receive nice GraphQL syntax highlighting in these template literals, download the [GraphQL VSCode extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql)

Then, we'll take our input and use it to create a **variables** object which will be used for the request:

```JavaScript
// find posts from the last 48 hours that include the keyword "stocks".
// since we don't have any real input, we'll simulate some input
const testInput = { hours: 48, query: 'stocks' };

// the API takes max_input in the format of minutes * 60
// to calculate this value, we do hours * 60^2
const variables = { query: testInput.query, max_age: Math.round(testInput.hours) * 60 ** 2 };
```

The final step is to take the query and variable and marry them within a `client.request()` call, which will return the API response:

```JavaScript
const data = await client.request(GET_LATEST, variables);
```

The final step after making the query is to format the data to match the expected output schema.

## [](#final-code) Final code

Here's what our final project looks like:

```JavaScript
// index.js
import { gql, GraphQLClient } from 'graphql-request';
import scrapeAppToken from './scrapeAppToken.mjs';

const token = await scrapeAppToken();

const client = new GraphQLClient('https://api.cheddar.com/graphql', { headers: { 'X-App-Token': token } });

const GET_LATEST = gql`
    query SearchQuery($query: String!, $max_age: Int!) {
        organization {
            media(query: $query, max_age: $max_age, first: 1000) {
                edges {
                    node {
                        title
                        public_at
                        hero_video {
                            video_urls {
                                url
                            }
                        }
                        thumbnail_url
                    }
                }
            }
        }
    }
`;

const testInput = { hours: 48, query: 'stocks' };

const variables = { query: testInput.query, max_age: Math.round(testInput.hours) * 60 ** 2 };

const { organization: { media } } = await client.request(GET_LATEST, variables);

const result = media.edges.map(({ node }) => ({
    title: node?.title,
    publishDate: node?.public_at,
    videoUrl: node?.hero_video ? node.hero_video.video_urls[0].url : null,
}));

console.log(result);
```

```JavaScript
// scrapeAppToken.js
import puppeteer from 'puppeteer';

const scrapeAppToken = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let appToken = null;

    page.on('response', async (res) => {
        // grab the token from the request headers
        const token = res.request().headers()?.['x-app-token'];

        // if there is a token, grab it and close the browser
        if (token) {
            appToken = token;
            await browser.close();
        }
    });

    await page.goto('https://cheddar.com/');

    await page.waitForNetworkIdle();

    // otherwise, just close the browser after networkidle
    // has been fired
    await browser.close();

    // return the apptoken (or null)
    return appToken;
};

export default scrapeAppToken;
```

## [](#next) Next up

We are actively working on writing the GraphQL scraping guide, so stay tuned!
