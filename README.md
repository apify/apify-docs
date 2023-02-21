# Apify Docs

This is the base repository for <https://docs.apify.com>.

## Architecture

- one root docusaurus instance for docs + academy + static content like homepage (this repo)
- N docusaurus instances, one for each project (e.g. `apify-client-js` repo)
- all instances are routed to the same hostname (reverse proxy), projects have their predefined prefix (used as the `baseUrl` in docusaurus)
- project instances can/will be deployed to GH pages on push
- all links in shared components need to be absolute to escape the SPA/AJAX links
- the layout/theme should be shared (currently just copies)

## Contributing

Currently, there are 6 separate projects outside of this repo:

- apify-client-js
- apify-client-python
- apify-sdk-js
- apify-sdk-python
- apify-cli
- apify-docs (this repository)

Clone those, checkout the `docs-v2` branch if still not merged to master. Then you can start the docusaurus instances in them.

| repo                | branch  | port |
|---------------------|---------|------|
| apify-docs          | master  | 3000 |
| apify-client-js     | master  | 3001 |
| apify-client-python | docs-v2 | 3002 |
| apify-sdk-js        | master  | 3003 |
| apify-sdk-python    | docs-v2 | 3004 |
| apify-cli           | master  | 3005 |

> To run docusaurus on a specific port, use `npm start -- --port XXXX`.

To route them, you will need nginx server with following config:

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

And add a record to `/etc/hosts` to map the docs.apify.loc hostname to localhost:

```text
127.0.0.1 docs.apify.loc
```

### Deployment

Current nginx deployment config:

```nginx
server {
  listen       80;
  server_name  docs.apify.com;
  location / {
    proxy_pass https://apify.github.io/apify-docs/;
  }
  location /api/client/js {
    proxy_pass https://apify.github.io/apify-client-js/;
  }
  location /api/client/python {
    proxy_pass https://apify.github.io/apify-client-python/;
  }
  location /sdk/js {
    proxy_pass https://apify.github.io/apify-sdk-js/;
  }
  location /sdk/python {
    proxy_pass https://apify.github.io/apify-sdk-python/;
  }
  location /cli {
    proxy_pass https://apify.github.io/apify-cli/;
  }
}
```

### @apify/docs-theme

The `@apify/docs-theme` is a Docusaurus theme package with custom components and styles to be used in all the Apify Docuaurus instances.
Aside from the regular Docusaurus theme interface, it also exports the common parts of the Docusaurus config, such as the navbar contents, url, `og:image`, etc.

The theme is available on npm as `@apify/docs-theme` and can be installed in any Docusaurus instance by running `npm install @apify/docs-theme`.

#### Publishing the theme

There is a GitHub Action that automatically publishes the theme to npm whenever any changes are pushed to the `master` branch. However, this only happens if you update the version in the `package.json` file manually - if the current version already exists on npm, the publish will be skipped.

Additionally, if there are any changes to the `apify-docs-theme` folder detected, the GitHub action will invoke docs builds in all the subprojects to make sure that all the pages are using the latest theme version. This is done in the `rebuild-docs` job. This job utilizes a matrix strategy to run the builds in parallel. The actual rebuild is initiated by the `workflow_dispatch` event in the respective repositories. Because of this, the `GITHUB_TOKEN` envvar has to be replaced by the PAT token stored in the `GH_TOKEN` secret - the original token does not have the necessary permissions to trigger the workflows in other repositories.

### Interesting links

- <https://github.com/facebook/docusaurus/discussions/6086>
- <https://docusaurus.io/docs/docs-multi-instance>
- <https://docusaurus.io/docs/advanced/routing#escaping-from-spa-redirects>
