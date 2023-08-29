# Apify Documentation

[![Check & Release](https://github.com/apify/apify-docs/actions/workflows/test.yaml/badge.svg)](https://github.com/apify/apify-docs/actions/workflows/test.yaml)

## Intro

This repository is the home of Apify's documentation, which you can find at [docs.apify.com](https://docs.apify.com/). The documentation is written using [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet). Source files of the [platform documentation](https://docs.apify.com/platform) are located [/sources](https://github.com/apify/apify-docs/tree/master/sources) directory. However, other sections such as [SDK](https://docs.apify.com/sdk) or [CLI](https://docs.apify.com/cli) have their own repositories. For more information, see the [Contributing guidelines](./CONTRIBUTING.md).

## Before you start contributing

> [!IMPORTANT]
> Before you contribute to Apify documentation with your first pull request, please read the following 2 articles:
>
> - [Contributing guidelines](./CONTRIBUTING.md), where you learn about the project structure, local development, and testing.
> - [Style guide](#style-guide), here below, where you learn how to keep the documentation style consistent.

## Style guide

In addition to the tips below: when in doubt, check existing docs for formatting and style tips.

### Highlighting

- For consistency, use **bold** for highlighting non-code words/phrases.
- For inline `code` examples, use **back-ticks** (\` \`).
- For multi-line code examples, use code fences and specify the language. Preferably, specify the title as well.

    ```markdown
    \`\`\`js title='foo.js'

    const docsAreCool = require('coolDocs'); <br/>
    ...<br/>
    return docsAreCool;<br/>

    \`\`\`
    ```

    See [Markdown features](https://docusaurus.io/docs/markdown-features) in the Docusaurus docs for more information.

### Code tabs

See [docusaurus documentation for tabs](https://docusaurus.io/docs/markdown-features/tabs) for examples. In Apify platform documentation, use the code tabs to always include examples for both JavaScript and Python languages.

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

- Metadata descriptions are super important in making our documentation easy to find using search engines. To maximize our SEO, **keep the descriptions between [140 and 160 characters in length](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwigg6Og56brAhUNi1wKHULsAHEQFjAGegQIDBAG&url=https%3A%2F%2Fmoz.com%2Flearn%2Fseo%2Fmeta-description&usg=AOvVaw3L26bXhHZTd0wYDM_5xtJ9) whenever possible**.

    Of course, when there just isn't enough to say, don't waffle - it's not a university essay.

    GOOD:

    > "Store anything from images and key-value pairs to structured output data. Learn how to access and manage your stored data from the Apify platform or via API."

    AVOID:

    > "Apify storage docs."

- Avoid using the word "**documentation**.

    GOOD:

    > "Learn how to develop, run and share serverless cloud programs. Create your own web scraping and automation tools and publish them on the Apify platform."

    AVOID:

    > "Documentation of Apify actors - the easy way to build serverless cloud programs."

- Avoid **keyword stuffing**, i.e., repeating the article's name too much, see the [Wikipedia article](https://en.wikipedia.org/wiki/Keyword_stuffing) for more.

    GOOD:

    > Title: Proxy

    > Description: Learn how to anonymously access websites when running web scraping or automation jobs. Prevent IP address-based blocking using IP address rotation.

    AVOID:

    > Title: Proxy

    > Description: Learn how to use Apify Proxy. Prevent IP address-based blocking using a proxy. Apify Proxy helps you bypass security.

- Phrase the descriptions in a way that answers a question that the person using the search engine might have.

    GOOD:

    > Learn how to make your actor available to the public or keep it private. Prepare your actor for Apify Store with a description and README file.

    AVOID:

    > Description of the processes regarding the optimizing and preparing for publishing of one's actor in Apify Store.

### Screenshots

Documentation has both light and dark theme. However to keep the screenshots consistent and easily manageable, use the light theme for all screenshots.

