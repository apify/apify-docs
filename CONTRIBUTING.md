# Contributing to Apify Documentation

## Architecture

Apify documentation consists of six different repositories:

- apify-client-js
- apify-client-python
- apify-sdk-js
- apify-sdk-python
- apify-cli
- apify-docs (this repository)

The main documentation content for Platform docs and Academy is inside the `./sources` directory. Every project repository then has its own Docusaurus instance and is available on a URL prefix (used as the `baseUrl` in Docusaurus) that's  routed via nginx reverse proxy to the main domain. All those Docusaurus instances are deployed to GH pages on push.

We use a shared Docusaurus theme published to NPM as `@apify/docs-theme`, which is automatically synced in all the repositories via CI.

### Shared theme

The `@apify/docs-theme` is a Docusaurus theme package with custom components and styles to be used in all the Apify Docuaurus instances.
Aside from the regular Docusaurus theme interface, it also exports the common parts of the Docusaurus config, such as the navbar contents, URL, `og:image`, etc.

The theme is available on npm as `@apify/docs-theme` and can be installed in any Docusaurus instance by running `npm install @apify/docs-theme`.

#### Publishing the theme

A GitHub Action automatically publishes the theme to npm whenever any changes are pushed to the `master` branch. However, this only happens if you update the version in the `package.json` file manually - if the current version already exists on npm, the publish will be skipped.

Additionally, if there are any changes to the `apify-docs-theme` folder detected, the GitHub action will invoke docs builds in all the subprojects to make sure that all the pages are using the latest theme version. This is done in the `rebuild-docs` job. This job utilizes a matrix strategy to run the builds in parallel. The actual rebuild is initiated by the `workflow_dispatch` event in the respective repositories. Because of this, the `GITHUB_TOKEN` env var has to be replaced by the PAT token stored in the `GH_TOKEN` secret - the original token doesn't have the necessary permissions to trigger the workflows in other repositories.

### Redirects

[Here](./nginx.conf), you can find the production version of the Nginx configuration that handles the serving of content from all the different repositories. It also handles redirects from old URLs to new ones so that we don't lose any SEO juice.


### API reference

The `./sources/platform/api_v2` directory contains the source file for the API reference (<https://docs.apify.com/api/v2>) hosted on [Apiary](https://apiary.io/). The build script contained in the `./tools` folder automatically uploads the API docs to Apiary during the web deployment process.

#### Local testing

1. Install Apiary gem `gem install apiaryio`
2. After that, you can open the generated doc with the
   command: `apiary preview --path="./sources/platform/api_v2/api_v2_reference.apib"`

#### Pre-release testing

After updating the API docs, you should ALWAYS log into [Apiary](https://apiary.io/), analyze the document, and make sure there are **no warnings**!

### Homepage

The homepage menu card items are in the `docs/homepage_content.json` file. The cards aim to suit three types of use cases:

- Beginners and people who just want to use the Actors (**Get started**, **Use Actors and scrapers**).

- Experienced Actor and platform users (**Reduce blocking**, **Use platform features**).

- Actor builders and advanced users (**Build Actors**, **Advanced tutorials and debugging**).

Each item has its own JSON object, in which "cardItem" is the title and "href" is the link. If the link leads to outside the Apify Docs site, add the `"isExternalLink": true` property. For local links, just use the article's path. E.g. `"/tutorials/apify-scrapers/web-scraper"`.

In the title (`cardItem`), don't just give the article's name. Phrase the title in a way that answers a question or fulfills a goal the user might have.

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

## Local setup

If you want to work only on the main documentation content, cloning this repository is enough. Once you run `npm install` to install all dependencies and run `npm start`, the main portal will open on <http://localhost:3000>. All the links in the navbar and footer need to be absolute, and they will use a different hostname, configured to `docs.apify.loc` - to use that, follow the steps below and set up the Nginx server.

Alternatively, you can skip the Nginx part and navigate to <http://localhost:3000/academy> or <http://localhost:3000/platform> manually instead of using links in the navbar. All relative links should work fine there. The problem with absolute links is only with shared components. The Nginx server is needed only for testing the whole setup and mapping all the different ports to a single one.

Clone all the repositories, and start the Docusaurus instances in them.

| repo                | port |
|---------------------|------|
| apify-docs          | 3000 |
| apify-client-js     | 3001 |
| apify-client-python | 3002 |
| apify-sdk-js        | 3003 |
| apify-sdk-python    | 3004 |
| apify-cli           | 3005 |

> To run Docusaurus on a specific port, use `npm start -- --port XXXX`.

To route them, you will need an Nginx server with the following config:

```nginx
server {
  listen       80;
  server_name  docs.apify.loc;
  location / {
    proxy_pass http://localhost:3000;
  }
  location /api/client/js {
    proxy_pass http://localhost:3001;
  }
  location /api/client/python {
    proxy_pass http://localhost:3002;
  }
  location /sdk/js {
    proxy_pass http://localhost:3003;
  }
  location /sdk/python {
    proxy_pass http://localhost:3004;
  }
  location /cli {
    proxy_pass http://localhost:3005;
  }
}
```

And add a record to `/etc/hosts` to map the `docs.apify.loc` hostname to localhost:

```text
127.0.0.1 docs.apify.loc
```

## Linting

### Markdownlint

The **apify-docs** repo contains both Markdown and JavaScript/TypeScript files. We have two commands for linting them:

- `npm run lint:md` and `npm run lint:md:fix` checks the `*.md` files.
- `npm run lint:code` and `npm run lint:code:fix` checks the `*.{js,ts}` files.

For Markdown, we use the [markdownlint](https://github.com/DavidAnson/markdownlint) package, which also has a handy VSCode [extension](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint).

For JavaScript, we use the [ESLint Markdown plugin](https://github.com/eslint/eslint-plugin-markdown).

### Vale

Apart from `markdownlint` we also utilize Vale as linting solution for prose. You can either use Vale as a CLI tool (for more information how to set it up go [here](https://vale.sh/docs/vale-cli/installation/)) or you can use Vale with a VSCode [extension](https://marketplace.visualstudio.com/items?itemName=ChrisChinchilla.vale-vscode). The rulesets that Vale will utilize while linting can be found within `.github/styles` directory.

#### Exceptions for Vale

If Vale catches some specific words that you feel that should not be subjected to linting you can add them to the `accept.txt` found within the `.github/styles/Vocab/Docs` directory. For more information hw it works visit Vale [docs](https://vale.sh/docs/topics/vocab/).

## Pull requests

Follow the semantic commit message format described in the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This will help us with automatic changelog generation and versioning.

When you create a PR, the CI will try to build the project, searching for broken links and linting both the application code and markdown files.

## Deployment

On each commit to the `master` branch of this repository, a new version of the Apify documentation gets built and deployed to the appropriate subdomain.

## Resources

- <https://github.com/facebook/docusaurus/discussions/6086>
- <https://docusaurus.io/docs/docs-multi-instance>
- <https://docusaurus.io/docs/advanced/routing#escaping-from-spa-redirects>
