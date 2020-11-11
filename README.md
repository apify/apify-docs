# Apify documentation

[![Build Status](https://github.com/apify/apify-docs/workflows/Build%20and%20deploy/badge.svg?branch=master)](https://github.com/apify/apify-docs/actions)

## Intro

This repo is the home of Apify's documentation, which you can find at [docs.apify.com](https://docs.apify.com/). The documentation is written using [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) and all of its source files are located in the [/docs](https://github.com/apifytech/apify-docs/tree/master/docs) directory.

Before **push**-ing to GitHub, always execute `npm run build` to make sure everything works.

## Implementation and style

In addition to the tips below: when in doubt, check existing docs for formatting and style tips.

### Highlighting

For consistency, use **bold** for highlighting non-code words/phrases.

For inline `code` examples, use **back-ticks** (\` \`).

For multi-line code examples, use code fences and specify the language:

\`\`\`js

const docsAreCool = require('coolDocs'); <br/>
...<br/>
return docsAreCool;<br/>

\`\`\`

### Code example tabs

When providing code examples in multiple languages, use the below format.

Next to the code fence, specify the language as **marked-tabs**.

Place each language's code in a **\<marked-tab header="Language name to display" lang="Language name" >\</marked-tab>** element.

> Only use double quotation marks in the code tab headers <br/>
> **Good**: \<marked-tab header="Curl" lang="bash"> </br>
> **Avoid**: \<marked-tab header='Curl' lang='bash'>

\`\`\`marked-tabs

\<marked-tab header="NodeJS" lang="javascript">

console.log('Some JS code');

\</marked-tab>


\<marked-tab header="Python" lang="python">

print('Some python code');
count = 1
if count >= 1:
    print('Some intended python code');
print('Some python code on next line');

\</marked-tab>


\<marked-tab header="Curl" lang="bash">

echo "Some bash code"

\</marked-tab>

\`\`\`

### Metadata

Each Markdown file here starts with metadata that define the document's menu title, placement, page description, and paths. For example:

```text
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

#### Keep the descriptions between [140 and 160 characters in length](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwigg6Og56brAhUNi1wKHULsAHEQFjAGegQIDBAG&url=https%3A%2F%2Fmoz.com%2Flearn%2Fseo%2Fmeta-description&usg=AOvVaw3L26bXhHZTd0wYDM_5xtJ9) whenever possible

(Of course, when there just isn't enough to say, don't waffle - it's not a university essay.)

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

#### Phrase the descriptions in a way that answers a question that the person using the search engine might have

GOOD: "Learn how to make your actor available to the public or keep it private. Prepare your actor for Apify Store with a description and README file."

AVOID: "Description of the processes regarding the optimizing and preparing for publishing of one's actor in Apify Store."

### Assets

When adding new images to articles, first compress them using [tinypng.com](https://tinypng.com). This will help our docs pages load faster.

Avoid HTML in assets or links.

You can place assets (images for example) in any directory. If you want to obtain a URL, use the following tag:

```text
{{@asset actor/images/run-log-2.png}}
```

So to include this image in Markdown use:

```text
![Apify actor run log]({{@asset actor/images/run-log-2.png}})
```

### Linking

For links, we use a similar syntax as for assets:

```text
{{@link actor/source_code.md#source-git-repo}}
```

Avoid using HTML.

## Homepage

The homepage menu card items are in the `docs/homepage_content.json` file.

The cards aim to suit three types use cases:

* Beginners and people who just want to use the actors (**Get started**, **Use actors and scrapers**).

* Experienced actor and platform users (**Reduce blocking**, **Use platform features**).

* Actor builders and advanced users (**Build actors**, **Advanced tutorials and debugging**).

Each item has its own JSON object, in which "cardItem" is the title and "href" is the link. If the link leads to outside the Apify Docs site, add the `"isExternalLink" : true` property. For local links, just use the article's path. E.g. `"/tutorials/apify-scrapers/web-scraper"`.

In the title (`cardItem`), do not just give the article's name. Phrase the title in a way that answers a question or fulfills a goal the user might have.

For example:

```text
{
    "cardItem": "How to run an actor",
    "href": "https://www.youtube.com/watch?v=BsidLZKdYWQ",
    "isExternalLink": true
},
```

Note:
In JSON, all entries except booleans (`true/false`) and numbers need to be in double quote marks ("").

Over time, we should track which items are useful and which don't get any traffic. Also, as Apify Docs expand, we may need to add more cards and update which articles we link to.

## Deployment

On each commit to the `master` branch of this repository, a new version of the Apify documentation gets built and deployed to [docs.apify.com](https://docs.apify.com/).

Every other branch can be viewed using the `?version=BRANCH_NAME` parameter, e.g. [https://docs.apify.com?version=feature/new-section].

Keep in mind that there might be about 2 minute delay before updated documentation gets online (1 minute Github actions build + 1 minute update interval of docs website).

## Linting

The **apify-docs** repo contains both Markdown and JavaScript files. Several Markdown files, such as [dataset docs]({{@link docs/storage/dataset.md}}) contain code examples. Because of this, we have two commands for linting.

* **npm run lint:md** / **npm run lint:md:fix** checks the **.md** files.
* **npm run lint:code** / **npm run lint:code:fix** checks both the code examples within Markdown files and the build scripts.

For Markdown, we use the [markdownlint](https://github.com/DavidAnson/markdownlint) package, which also has a handy VSCode [extension](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint).

For JavaScript, we use the [ESLint Markdown plugin](https://github.com/eslint/eslint-plugin-markdown).


## API docs

The `docs/api_v2` directory contains the source file for the
API reference (<https://docs.apify.com/api/v2>) hosted on Apiary.
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
