# Apify Documentation

[![Check & Release](https://github.com/apify/apify-docs/actions/workflows/test.yaml/badge.svg)](https://github.com/apify/apify-docs/actions/workflows/test.yaml)

## Intro

This repository is the home of Apify's documentation, which you can find at [docs.apify.com](https://docs.apify.com/). The documentation is written using [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet). Source files of the [platform documentation](https://docs.apify.com/platform) are located in the [/sources](https://github.com/apify/apify-docs/tree/master/sources) directory. However, other sections, such as [SDK](https://docs.apify.com/sdk) or [CLI](https://docs.apify.com/cli), have their own repositories. For more information, see the [Contributing guidelines](./CONTRIBUTING.md).

## Before you start contributing

> [!IMPORTANT]
> Before you contribute to Apify documentation with your first pull request, please read the following 2 articles:
>
> - [Contributing guidelines](CONTRIBUTING.md), where you learn about the project structure, local development, testing, and setting up the [redirects](./CONTRIBUTING.md#redirects) to make sure we keep our SEO juice 🍊.
> - [Style guide](#style-guide), here below 👇, where you learn how to keep the documentation style consistent.

## Style guide

In addition to the following tips, check existing docs for formatting and style tips when in doubt.

### Language

Adhere to US-EN language standards to maintain consistency and clarity in our documentation.

Use inclusive language, for example:

Instead of _see_, use _view_ or _check out_.

Avoid using directional language like:

> Click the **Home** button on the left to return to the homepage.
> You'll find the account settings on the left-hand side menu.

Instead, try to be more descriptive, for example:

> Click the **Home** button in the menu, to return to the homepage.
> You'll find the account settings under the **Settings** button in the menu.

### Highlighting

- For consistency, use **bold** to highlight UI text when dealing with UI-focused documentation (for example, Apify Console).
- For consistency, use _italics_ to emphasize text.
- For inline `code` examples, use **back-ticks** (\` \`).
- For multi-line code examples, use code fences and specify the language. Next to the language declaration, add `showLineNumbers` so that the code fence displays line numbers. Preferably, specify the title as well.
  - Within platform documentation, always use [Code tabs](README.md#code-tabs) and declare the language.

    ```markdown
    \`\`\`js showLineNumbers title='foo.js'

    const docsAreCool = require('coolDocs'); <br/>
    ...<br/>
    return docsAreCool;<br/>

    \`\`\`
    ```

    Check out [Markdown features](https://docusaurus.io/docs/markdown-features) in the Docusaurus docs for more information.

### Code tabs

View [Docusaurus documentation for tabs](https://docusaurus.io/docs/markdown-features/tabs) for examples. In Apify platform documentation, always use the code tabs to include examples for both JavaScript and Python languages.

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

You must provide the new page metadata as part of the so-called [front matter](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter).

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

- Metadata descriptions are super important in making our documentation easy to find using search engines. To maximize our SEO, _keep the descriptions between [140 and 160 characters](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwigg6Og56brAhUNi1wKHULsAHEQFjAGegQIDBAG&url=https%3A%2F%2Fmoz.com%2Flearn%2Fseo%2Fmeta-description&usg=AOvVaw3L26bXhHZTd0wYDM_5xtJ9) whenever possible_.

    Of course, when there just isn't enough to say, don't waffle - it's not a university essay.

    GOOD:

    > "Store anything from images and key-value pairs to structured output data. Learn how to access and manage your stored data from the Apify platform or via API."

    AVOID:

    > "Apify storage docs."

- Avoid using the word "_documentation_".

    GOOD:

    > "Learn how to develop, run and share serverless cloud programs. Create your own web scraping and automation tools and publish them on the Apify platform."

    AVOID:

    > "Documentation of Apify actors - the easy way to build serverless cloud programs."

- Avoid _keyword stuffing_, i.e., repeating the article's name too much; view the [Wikipedia article](https://en.wikipedia.org/wiki/Keyword_stuffing) for more.

    GOOD:

    > Title: Proxy
    >
    > Description: Learn how to anonymously access websites when running web scraping or automation jobs. Prevent IP address-based blocking using IP address rotation.

    AVOID:

    > Title: Proxy
    >
    > Description: Learn how to use Apify Proxy. Prevent IP address-based blocking using a proxy. Apify Proxy helps you bypass security.

- Phrase the descriptions in a way that answers a question that the person using the search engine might have.

    GOOD:

    > Learn how to make your actor available to the public or keep it private. Prepare your actor for Apify Store with a description and README file.

    AVOID:

    > Description of the processes regarding the optimizing and preparing for publishing of one's actor in Apify Store.

### Screenshots

Documentation has both light and dark themes. However, to keep the screenshots consistent and easily manageable, use the light theme for all screenshots.

All screenshots should have a meaningful alt text to accommodate screen readers.

If you add arrows or other indicators to the screenshots, they should be red for high contrast and visibility on the light theme.
