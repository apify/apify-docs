# Apify Documentation

[![Check & Release](https://github.com/apify/apify-docs/actions/workflows/test.yaml/badge.svg)](https://github.com/apify/apify-docs/actions/workflows/test.yaml)

## Intro

This repository is the home of Apify's documentation, which you can find at [docs.apify.com](https://docs.apify.com/). The documentation is written using [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) and all of its source files are located in the [/sources](https://github.com/apify/apify-docs/tree/master/sources) directory.

When you create a PR, the CI will try to build the project, searching for broken links and linting both the application code and markdown files.

## Implementation and style

In addition to the tips below: when in doubt, check existing docs for formatting and style tips.

### Highlighting

* For consistency, use **bold** for highlighting non-code words/phrases.
* For inline `code` examples, use **back-ticks** (\` \`).
* For multi-line code examples, use code fences and specify the language. Preferably, specify the title as well.

    ```markdown
    \`\`\`js title='foo.js'

    const docsAreCool = require('coolDocs'); <br/>
    ...<br/>
    return docsAreCool;<br/>

    \`\`\`
    ```

    See [Markdown features](https://docusaurus.io/docs/markdown-features) in the docusaurus docs for more information.

### Code tabs

See [docusaurus documentation for tabs](https://docusaurus.io/docs/markdown-features/tabs) for examples.

```markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apple" default>
    This is an apple 🍎
  </TabItem>
  <TabItem value="orange" label="Orange">
    This is an orange 🍊
  </TabItem>
  <TabItem value="banana" label="Banana">
    This is a banana 🍌
  </TabItem>
</Tabs>
```

### Metadata

The page metadata can be provided as part of so-called [front-matter](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter).

```markdown
---
id: doc-markdown
title: Docs Markdown Features
hide_title: false
hide_table_of_contents: false
sidebar_label: Markdown
sidebar_position: 3
pagination_label: Markdown features
custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: How do I find you when I cannot solve this problem
keywords:
  - docs
  - docusaurus
image: https://i.imgur.com/mErPwqL.png
slug: /myDoc
last_update:
  date: 1/1/2000
  author: custom author name
---

# Markdown Features

My Document Markdown content
```

### Descriptions

Metadata descriptions are super important in making our documentation easy to find using search engines. To maximize our SEO, **keep the descriptions between [140 and 160 characters in length](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwigg6Og56brAhUNi1wKHULsAHEQFjAGegQIDBAG&url=https%3A%2F%2Fmoz.com%2Flearn%2Fseo%2Fmeta-description&usg=AOvVaw3L26bXhHZTd0wYDM_5xtJ9) whenever possible**.

> Of course, when there just isn't enough to say, don't waffle - it's not a university essay.

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

## Docs homepage

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

> In JSON, all entries except booleans (`true/false`) and numbers need to be in double quote marks ("").

Over time, we should track which items are useful and which don't get any traffic. Also, as Apify Docs expand, we may need to add more cards and update which articles we link to.

## Deployment

On each commit to the `master` branch of this repository, a new version of the Apify documentation gets built and deployed to the appropriate subdomain.

## Linting

The **apify-docs** repo contains both Markdown and JavaScript/TypeScript files. We have two commands for linting them:

* `npm run lint:md` and `npm run lint:md:fix` checks the `*.md` files.
* `npm run lint:code` and `npm run lint:code:fix` checks the `*.{js,ts}` files.

For Markdown, we use the [markdownlint](https://github.com/DavidAnson/markdownlint) package, which also has a handy VSCode [extension](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint).

For JavaScript, we use the [ESLint Markdown plugin](https://github.com/eslint/eslint-plugin-markdown).

## API docs

The `./sources/platform/api_v2` directory contains the source file for the API reference (<https://docs.apify.com/api/v2>) hosted on Apiary. The build script contained in the `./tools` folder automatically uploads the API docs to Apiary during the web deployment process.

### Local testing

1. Install Apiary gem `gem install apiaryio`
2. After that, you can open the generated doc with the
   command: `apiary preview --path="./content/docs/api_v2/api_v2_reference.apib"`

### Test

After updating the API docs, you should ALWAYS log in to Apiary, analyze the document and make sure there are **no warnings**!
