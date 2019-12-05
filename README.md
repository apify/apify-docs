# Apify documentation

[![Build Status](https://travis-ci.com/apifytech/apify-docs.svg?branch=master)](https://travis-ci.org/apifytech/apify-docs)

## Intro

This project is a home of Apify documentation that you can find running at [docs.apify.com](https://docs.apify.com/). Documentation is written in a [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) format and all of its source files are located in a [/docs](https://github.com/apifytech/apify-docs/tree/master/docs) directory.

On each commit to the master branch of this repository, a new version of Apify documentation gets built and deployed to [docs.apify.com](https://docs.apify.com/).

## Implementation

### Metadata

Each Markdown file here starts with metadata that define menu title, placement and page description. For example:

```
---
title: Quick start
description: Documentation of Apify actors - a serverless computing jobs that enable execution of long-running web scraping and automation tasks in the cloud.
menuWeight: 3.1
---
```

### Assets

You can place assets (images for example) in any directory. If you want to obtain a URL them use following tag:

```
{{@asset actor/images/run-log-2.png}}
```

So to include this image in Markdown use:

```
![Apify actor run log]({{@asset actor/images/run-log-2.png}})
```

### Linking

For links we use similar syntax as for assets:

```
{{@link actor/source_code.md#source-git-repo}}
```
