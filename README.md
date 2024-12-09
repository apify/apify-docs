# Apify Documentation

[![Check & Release](https://github.com/apify/apify-docs/actions/workflows/test.yaml/badge.svg)](https://github.com/apify/apify-docs/actions/workflows/test.yaml)

## Overview

This repository is the home of Apify's documentation, available at [docs.apify.com](https://docs.apify.com/). The documentation uses [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

### Documentation structure

- **Platform documentation**: Located in the [/sources](https://github.com/apify/apify-docs/tree/master/sources) directory
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

- [Contributing Guidelines](CONTRIBUTING.md)
- [Style Guide](CONTRIBUTING.md#style-guide)

## Documentation architecture

Our documentation consists of these main sections:

1. **Academy**: Platform-independent courses on scraping techniques
2. **Platform**: Main documentation for using Apify as a product
3. **API**: API reference and client libraries documentation
4. **SDK**: SDK libraries documentation
5. **CLI**: Documentation for building code and platform interaction

### Source Repositories

- apify-docs (this repository)
- apify-client-js
- apify-client-python
- apify-sdk-js
- apify-sdk-python
- apify-cli

### Homepage structure

The homepage menu cards (in `docs/homepage_content.json`) serve three user categories:

1. **Beginners**: Get started, Use Actors and scrapers
2. **Experienced Users**: Reduce blocking, Use platform features
3. **Advanced Users**: Build Actors, Advanced tutorials and debugging

## Need help

- For contribution questions, see our [Contributing Guidelines](CONTRIBUTING.md)
- For technical issues, create a GitHub issue
- For documentation feedback, use the feedback form on our documentation pages

