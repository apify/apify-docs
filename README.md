# Apify documentation

[![Build Status](https://github.com/apify/apify-docs/workflows/Build%20and%20deploy/badge.svg?branch=master)](https://github.com/apify/apify-docs/actions)

## Intro

This repo is the home of Apify's documentation, which you can find at [docs.apify.com](https://docs.apify.com/). The documentation is written using the [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) format and all of its source files are located in the [/docs](https://github.com/apifytech/apify-docs/tree/master/docs) directory.

## Implementation and style

Before making changes, make sure you're familiar with the [Apify Writing Style Guide](https://www.notion.so/apify/The-Apify-Writing-Style-Guide-de9fbb99dcd84665b6d3f790fc88b3b6).

### Highlighting

For consistency, use **bold** for highlighting non-code words/phrases. For inline `code` examples, use **backticks** (\` \`).

### Metadata

Each Markdown file here starts with metadata that define the document's menu title, placement, page description, and paths. For example:

```
---
title: Getting started with Apify Scrapers
menuTitle: Getting started
description: Step-by-step tutorial that will help you get started with all Apify Scrapers.
externalSourceUrl: https://raw.githubusercontent.com/apifytech/actor-scraper/master/docs/build/introduction-tutorial.md
menuWeight: 2.1
paths:
    - scraping/getting-started
---
```

The document's `category` and `menuWeight` determine its placement in the docs menu. When inserting a new document, make sure to adjust the `menuWeight` properties of existing documents.

The `paths` metadata ensures successful redirects in case articles are renamed. When renaming or moving an article, keep the existing paths and add the new path at the bottom.

### Descriptions

Metadata descriptions are super important in making our documentation easy to find using search engines. To maximize our SEO,

#### Keep the descriptions between [140 and 160 characters in length](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwigg6Og56brAhUNi1wKHULsAHEQFjAGegQIDBAG&url=https%3A%2F%2Fmoz.com%2Flearn%2Fseo%2Fmeta-description&usg=AOvVaw3L26bXhHZTd0wYDM_5xtJ9) whenever possible.

GOOD: "Store anything from images and key-value pairs to structured output data. Learn how to access and manage your stored data from the Apify platform or via API."

AVOID: "Apify storage docs."

#### Avoid using the word "**documentation**"

GOOD: "Learn how to develop, run and share serverless cloud programs. Create your own web scraping and automation tools and publish them on the Apify platform."

AVOID: "Documentation of Apify actors - the easy way to build serverless cloud programs."

#### Avoid **keyword stuffing**, i.e. repeating the article's name too much

[Wikipedia article](https://en.wikipedia.org/wiki/Keyword_stuffing).

GOOD:

Title: Proxy
Description: Learn how to anonymously access websites when running web scraping or automation jobs. Prevent IP address-based blocking using IP address rotation.

AVOID:

Title: Proxy
Description: Learn how to use Apify Proxy. Prevent IP address-based blocking using proxy. Apify Proxy helps you bypass security.

#### Phrase the descriptions in a way that answers a question that the person using the search engine might have.

GOOD: "Learn how to make your actor available to the public or keep it private. Prepare your actor for Apify Store with a description and README file."

AVOID: "Description of the processes regarding the optimizing and preparing for publishing of one's actor in Apify Store."

### Assets

When adding new images to articles, first compress them using [tinypng.com](https://tinypng.com). This will help our docs pages load faster.

Avoid HTML in assets or links.

You can place assets (images for example) in any directory. If you want to obtain a URL, use the following tag:

```
{{@asset actor/images/run-log-2.png}}
```

So to include this image in Markdown use:

```
![Apify actor run log]({{@asset actor/images/run-log-2.png}})
```

### Linking

For links, we use a similar syntax as for assets:

```
{{@link actor/source_code.md#source-git-repo}}
```

Avoid using HTML.

## Deployment

On each commit to the `master` branch of this repository, a new version of the Apify documentation gets built and deployed to [docs.apify.com](https://docs.apify.com/).

On commit to any other branch, the documentation's `develop` version gets updated. This version can be viewed using the `?version=develop` parameter, e.g. [https://docs.apify.com?version=develop](https://docs.apify.com?version=develop).

Keep in mind that there might be about 2 minute delay before updated documentation gets online (1 minute Github actions build + 1 minute update interval of docs website).

## API docs

The `docs/api_v2` directory contains the source file for the
API reference (https://docs.apify.com/api/v2) hosted on Apiary.
The build script contained in the **apify-docs/src** folder automatically uploads the API docs to Apiary during the web deployment process.

### Local testing

1. Install Apiary gem `gem install apiaryio`
2. After that, you can open the generated doc with the command: `apiary preview --path="./docs/api_v2/api-v2-reference.apib"`

### Test

After updating the API docs, you should ALWAYS log in to Apiary, analyze the document and make sure there are **no warnings**!

## External docs

You will find most of the documentation in this repository.

There are, however, a few exceptions, shown below. To make changes to them, you'll need to clone those repos and make your pull requests to them. When updating the tutorials in the **apify/actor-scraper** repo, don't forget to execute `npm run build` before pushing your code to GitHub.
* Tutorials for Apify's scrapers (**docs/scraping** directory) are in the [**apify/actor-scraper**](https://github.com/apify/actor-scraper) repository.
* Apify's API client for JavaScript documentation is in the [**apify-docs/apify-client-js**](https://github.com/apify/apify-client-js) repository.
* Docs for the command-line interface are in the [**apify/apify-cli**](https://github.com/apify/apify-cli) repo.


