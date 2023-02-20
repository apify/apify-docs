# Apify Docs v2

This is the base repository for next version of https://docs.apify.com.

## TODO

- rendering changelog in non-TS projects (CLI)

### Content migration

last content sync: 12.1.2023 ~11:00 ([first not included PR](https://github.com/apify/apify-docs/pull/488))

- run `node tools/convert.mjs`
- some pages need to be manually updated:
  - sidebars might need adjustments
  - some pages should be removed/redirected (e.g. the dev tools like client or SDK are now part of the docs but on different links, before it was just embedded readme)
  - meta description should be sometimes rendered as part of content, we should fix this manually, the tag in frontmatter should stay as the meta description only (e.g. https://docs.apify.com/platform/actors/development/output-schema)

### RFC

- projects without index pages? just redirect? having api docs on `/` is problematic
  - keep index pages
- second level menu? maybe not everywhere, but for the SDK it sounds like the way to go
  - currently it has the second level nav rendered after the first level, in parens
  - yes, we need design
- projects with only readme (CLI)?
  - rendering readme can be quirky, e.g. the CLI (`<img />` tag, `style` attribute)
  - redirect to `docs` or moving docs to root? `/apify-cli/` vs `/apify-cli/docs`
  - we could still benefit from a second level nav, e.g. readme + changelog links
  - and the readme could be split into at least 2 pages
  - yes we want index pages everywhere, as we need second level nav in SDK
- what to do with homepage?
  - we will have new design
- what to do with [docs](https://docs.apify.com/) and [academy](https://developers.apify.com/academy) homepage? those are now separate pages, not the same as the docs-v2 homepage
  - we want to stay the same now and refactor later
- smarter search that would allow segmentation. might be quirky to develop, but might be required for the search to be usable as we will have a lot of content
  - if possible, PoC with simple select
- do we want to generate old versions for client/cli? maybe one last stable + next (master) is enough?
  - only current stable + next
- how to handle links for different languages, e.g. JS vs PY
  - we might just have a dropdown on the navbar links to pick the language (e.g. `Apify Client -> JS, PY`)
  - yes we will have dropdown for now, lets see design
- what about the projects that are part of monorepo
  - SDK is in the monorepo, we wanted to move client and CLI there as well
  - once its there, what
  - last resort we might wanna have multiple docusaurus instances in a single git repo
- do we want GH link in navbar? should it go to the apify org, or should it change the destination based on the current project (e.g. browsing client docs will link to the client repo)
  - second level nav with text link, navbar link to org
- do we want to render navbar based on the docusaurus config or have a fully custom component?
  - maybe the shared part should be static and only the second level menu could be rendered based on config

## Architecture

- one root docusaurus instance for docs + academy + static content like homepage (this repo)
- N docusaurus instances, one for each project (e.g. `apify-client-js` repo)
- all instances are routed to the same hostname (reverse proxy), projects have their predefined prefix (used as the `baseUrl` in docusaurus)
- project instances can/will be deployed to GH pages on push
- all links in shared components need to be absolute to escape the SPA/AJAX links
- the layout/theme should be shared (currently just copies)

## Contributing

Currently, there are 3 separate projects outside of this repo, having `docs-v2` branch:

- apify-client-js
- apify-client-python
- apify-sdk-js
- apify-sdk-python
- apify-cli

Clone those, checkout the `docs-v2` branch first. Then we can start the docusaurus instances in them.

| repo                | branch | port |
|---------------------|--------|------|
| apify-docs          | master | 3000 |
| apify-client-js     | master | 3001 |
| apify-client-python | docs   | 3002 |
| apify-sdk-js-v2     | docs   | 3003 |
| apify-sdk-python    | docs   | 3004 |
| apify-cli           | master | 3005 |

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

```
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
    proxy_pass https://apify.github.io/apify-sdk-js-v2/;
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

- https://github.com/facebook/docusaurus/discussions/6086
- https://docusaurus.io/docs/docs-multi-instance
- https://docusaurus.io/docs/advanced/routing#escaping-from-spa-redirects
