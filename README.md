# Apify Documentation

[![Check & Release](https://github.com/apify/apify-docs/actions/workflows/test.yaml/badge.svg)](https://github.com/apify/apify-docs/actions/workflows/test.yaml)

## Overview

This repository is the home of Apify's documentation, available at [docs.apify.com](https://docs.apify.com/). The documentation uses [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) & [Docusaurus](https://docusaurus.io/).

## Documentation structure

Our documentation ecosystem consists of:

- **Platform documentation**: Located in the [`/sources`](https://github.com/apify/apify-docs/tree/master/sources) directory
- **Academy**: Platform-independent courses on scraping technique. Located in the [/sources](https://github.com/apify/apify-docs/tree/master/sources) directory
- **API documentation**:
  - **OpenAPI documentation**: [OpenAPI reference](https://docs.apify.com/api/v2)
  - [JavaScript/Node.js](https://docs.apify.com/api/client/js/)
  - [Python](https://docs.apify.com/api/client/python/)
- **SDK documentation**:
  - [JavaScript/Node.js](https://docs.apify.com/sdk/js/)
  - [Python](https://docs.apify.com/sdk/python/)
- **CLI documentation** - [CLI docs](https://docs.apify.com/cli/)

## Getting started

Before contributing, read these essential resources:

- [Contributing guidelines](CONTRIBUTING.md)
- [Documentation style guide](CONTRIBUTING.md#style-guide)

## Documentation architecture

Our documentation consists of these main sections:

1. **Academy**: Collection of mostly platform-independent courses on scraping techniques.
2. **Platform**: Main documentation for using Apify as a product.
3. **API**: API reference and client libraries documentation.
4. **SDK**: SDK libraries documentation.
5. **CLI**: Documentation for building code and platform interaction.

### Source Repositories
<!-- vale off -->
- apify-docs (this repository)
- apify-client-js
- apify-client-python
- apify-sdk-js
- apify-sdk-python
- apify-cli
<!-- vale on -->
## Architecture

Our documentation is built using:

- **Docusaurus**: Powers our documentation platform
- **Shared Theme**: Custom `@apify/docs-theme` package
- **Automated Deployment**: CI/CD pipeline for continuous updates
- **nginx routing**: Handles subdomain routing and redirects

## Need help

- For contribution questions, see our [Contributing Guidelines](CONTRIBUTING.md)
- For technical issues, [create a GitHub issue](https://github.com/apify/apify-docs/issues/new)

