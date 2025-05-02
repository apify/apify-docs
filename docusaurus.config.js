const { join } = require('node:path');

const clsx = require('clsx');
const { createApiPageMD } = require('docusaurus-plugin-openapi-docs/lib/markdown');

const { config } = require('./apify-docs-theme');
const { collectSlugs } = require('./tools/utils/collectSlugs');
const { externalLinkProcessor } = require('./tools/utils/externalLink');

/** @type {Partial<import('@docusaurus/types').DocusaurusConfig>} */
module.exports = {
    title: 'Apify Documentation',
    tagline: 'Apify Documentation',
    url: config.absoluteUrl,
    baseUrl: '/',
    trailingSlash: false,
    organizationName: 'apify',
    projectName: 'apify-docs',
    scripts: ['/js/custom.js'],
    future: {
        experimental_faster: {
            // swcJsLoader: true,
            swcJsMinimizer: true,
            swcHtmlMinimizer: true,
            lightningCssMinimizer: true,
            rspackBundler: true,
            mdxCrossCompilerCache: true,
        },
    },
    headTags: [
        {
            tagName: 'link',
            attributes: {
                rel: 'icon',
                href: '/img/favicon.ico',
                type: 'image/x-icon',
                size: '48x48',
            },
        },
        {
            tagName: 'link',
            attributes: {
                rel: 'icon',
                href: '/img/favicon.svg',
                type: 'image/svg+xml',
                sizes: 'any',
            },
        },
        // Segment analytics
        process.env.SEGMENT_TOKEN && {
            tagName: 'script',
            innerHTML: `
                !function(){var i="analytics",analytics=window[i]=window[i]||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(e){return function(){if(window[i].initialized)return window[i][e].apply(window[i],arguments);var n=Array.prototype.slice.call(arguments);if(["track","screen","alias","group","page","identify"].indexOf(e)>-1){var c=document.querySelector("link[rel='canonical']");n.push({__t:"bpc",c:c&&c.getAttribute("href")||void 0,p:location.pathname,u:location.href,s:location.search,t:document.title,r:document.referrer})}n.unshift(e);analytics.push(n);return analytics}};for(var n=0;n<analytics.methods.length;n++){var key=analytics.methods[n];analytics[key]=analytics.factory(key)}analytics.load=function(key,n){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.setAttribute("data-global-segment-analytics-key",i);t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r);analytics._loadOptions=n};analytics._writeKey="FAretQHrDlKZJl9dE9xRgH2ia0a4ACXB";;analytics.SNIPPET_VERSION="5.2.0";
                    analytics.load("${process.env.SEGMENT_TOKEN}", { integrations: { "Segment.io": { apiHost: "analytics.apify.com/v1" }}});
                    analytics.page({
                        app: 'docs',
                        pageType: 'DOCS_PAGE',
                        page_type: 'DOCS_PAGE'
                    });
                }}();
            `,
            attributes: {},
        },
        // Intercom messenger
        process.env.INTERCOM_APP_ID && {
            tagName: 'script',
            innerHTML: `window.intercomSettings={api_base:"https://api-iam.intercom.io",app_id:"${process.env.INTERCOM_APP_ID}"};`,
            attributes: {},
        },
        // Intercom messenger
        process.env.INTERCOM_APP_ID && {
            tagName: 'script',
            innerHTML: `(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${process.env.INTERCOM_APP_ID}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()`,
            attributes: {},
        },
    ].filter(Boolean),

    onBrokenLinks:
    /** @type {import('@docusaurus/types').ReportingSeverity} */ ('throw'),
    onBrokenMarkdownLinks:
    /** @type {import('@docusaurus/types').ReportingSeverity} */ ('throw'),
    onBrokenAnchors:
    /** @type {import('@docusaurus/types').ReportingSeverity} */ ('warn'),
    themes: [
        [
            require.resolve('./apify-docs-theme'),
            /** @type {import('./apify-docs-theme/types').ThemeOptions} */
            ({
                subNavbar: {
                    title: 'Academy',
                    pathRegex: '/academy',
                    to: '/academy',
                    items: [
                        {
                            label: 'Courses',
                            to: `/academy`,
                            activeBaseRegex: `${[
                                'academy$',
                                ...collectSlugs(join(__dirname, 'sources', 'academy', 'webscraping')),
                                ...collectSlugs(join(__dirname, 'sources', 'academy', 'platform')),
                            ].join('$|')}$`,
                        },
                        {
                            label: 'Tutorials',
                            to: `/academy/tutorials`,
                            activeBaseRegex: `${collectSlugs(join(__dirname, 'sources', 'academy', 'tutorials')).join('$|')}$`,
                        },
                        {
                            label: 'Glossary',
                            to: `/academy/glossary`,
                            activeBaseRegex: `${collectSlugs(join(__dirname, 'sources', 'academy', 'glossary')).join('$|')}$`,
                        },
                    ],
                },
            }),
        ],
        'docusaurus-theme-openapi-docs',
        '@docusaurus/theme-mermaid',
    ],
    presets: /** @type {import('@docusaurus/types').PresetConfig[]} */ ([
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    id: 'platform',
                    // Docusaurus shows the author and date of last commit to entire repo, which doesn't make sense,
                    // so let's just disable showing author and last modification
                    showLastUpdateAuthor: false,
                    showLastUpdateTime: false,
                    editUrl: 'https://github.com/apify/apify-docs/edit/master/',
                    path: './sources/platform',
                    routeBasePath: 'platform',
                    sidebarPath: require.resolve('./sources/platform/sidebars.js'),
                    rehypePlugins: [externalLinkProcessor],
                },
                sitemap: {
                    filename: 'sitemap_base.xml',
                },
            }),
        ],
    ]),
    plugins: [
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'academy',
                path: './sources/academy',
                routeBasePath: 'academy',
                rehypePlugins: [externalLinkProcessor],
                // Docusaurus shows the author and date of last commit to entire repo, which doesn't make sense,
                // so let's just disable showing author and last modification
                showLastUpdateAuthor: false,
                showLastUpdateTime: false,
                editUrl: 'https://github.com/apify/apify-docs/edit/master/',
                sidebarPath: require.resolve('./sources/academy/sidebars.js'),
            },
        ],
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'legal',
                path: './sources/legal',
                routeBasePath: 'legal',
                rehypePlugins: [externalLinkProcessor],
                // Docusaurus shows the author and date of last commit to entire repo, which doesn't make sense,
                // so let's just disable showing author and last modification
                showLastUpdateAuthor: false,
                showLastUpdateTime: false,
                breadcrumbs: false,
                sidebarPath: require.resolve('./sources/legal/sidebars.js'),
            },
        ],
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'openapi',
                path: './sources/api',
                routeBasePath: 'api/v2',
                rehypePlugins: [externalLinkProcessor],
                showLastUpdateAuthor: false,
                showLastUpdateTime: false,
                breadcrumbs: false,
                sidebarPath: require.resolve('./sources/api/sidebars.js'),
                docItemComponent: '@theme/ApiItem', // Derived from docusaurus-theme-openapi
            },
        ],
        [
            'docusaurus-plugin-openapi-docs',
            {
                id: 'openapi', // plugin id
                docsPluginId: 'openapi', // configured for preset-classic
                config: {
                    /** @type {import('docusaurus-plugin-openapi-docs').Options} */
                    v2: {
                        downloadUrl: '/api/openapi.yaml',
                        specPath: 'apify-api.yaml',
                        outputDir: './sources/api',
                        markdownGenerators: {
                            createApiPageMD: (pageData) => {
                                let md = createApiPageMD(pageData);

                                // HTML comments are wrongly escaped, we need to undo that
                                if (md.includes('&lt;!--')) {
                                    md = md.replace('&lt;!--', '<!--');
                                    md = md.replace('--&gt;', '-->');
                                }

                                return md;
                            },
                        },
                        sidebarOptions: {
                            groupPathsBy: 'tagGroup',
                            categoryLinkSource: 'tag',
                            sidebarCollapsed: false,
                            sidebarCollapsible: false,
                            sidebarGenerators: {
                                createDocItem: (item, context) => {
                                    const legacyUrls = item.api?.['x-legacy-doc-urls'] ?? [];
                                    const altids = legacyUrls.map((url) => {
                                        const { hash } = new URL(url);
                                        return hash;
                                    });
                                    const sidebarLabel = item.frontMatter.sidebar_label;
                                    const { title } = item;
                                    const id = item.type === 'schema' ? `schemas/${item.id}` : item.id;
                                    const className = item.type === 'api'
                                        ? clsx({
                                            'menu__list-item--deprecated': item.api.deprecated,
                                            'api-method': !!item.api.method,
                                        }, item.api.method)
                                        : clsx({
                                            'menu__list-item--deprecated': item.schema.deprecated,
                                        }, 'schema');
                                    // const endpoint = item.api.servers[0].url + item.api.path;
                                    const endpoint = item.api.path.replace('/v2', '');
                                    const { method } = item.api;

                                    return {
                                        type: 'doc',
                                        id: context.basePath === '' ? `${id}` : `${context.basePath}/${id}`,
                                        label: sidebarLabel ?? title ?? id,
                                        customProps: { altids, endpoint, method },
                                        className,
                                    };
                                },
                            },
                        },
                    },
                },
            },
        ],
        () => ({
            name: 'webpack-loader-fix',
            configureWebpack() {
                return {
                    module: {
                        rules: [
                            {
                                test: /apify-docs\/examples\//i,
                                type: 'asset/source',
                            },
                        ],
                    },
                };
            },
        }),
        // TODO this should be somehow computed from all the external sources
        // [
        //     '@docusaurus/plugin-client-redirects',
        //     {
        //         createRedirects(existingPath) {
        //             if (!existingPath.endsWith('/')) {
        //                 return `${existingPath}/`;
        //             }
        //
        //             return undefined; // Return a falsy value: no redirect created
        //         },
        //     },
        // ],
        ...config.plugins,
    ],
    markdown: {
        mermaid: true,
        parseFrontMatter: async (params) => {
            const result = await params.defaultParseFrontMatter(params);

            if (result.frontMatter.api || result.content.startsWith('<span class="openapi-clients-box">')) {
                result.frontMatter.pagination_next = null;
                result.frontMatter.pagination_prev = null;
            }

            if (result.frontMatter.id === 'apify-api') {
                result.frontMatter.slug = '/';
            }

            const isPartial = params.filePath.split('/').pop()[0] === '_';

            if (!isPartial) {
                const ogImageURL = new URL('https://apify.com/og-image/docs-article');
                ogImageURL.searchParams.set('title', result.frontMatter.title);
                result.frontMatter.image ??= ogImageURL.toString();
            }

            return result;
        },
    },
    themeConfig: {
        ...config.themeConfig,
        prism: {
            ...config.themeConfig.prism,
            additionalLanguages: [
                ...config.themeConfig.prism.additionalLanguages,
                'http', 'bash', 'ruby', 'java', 'scala', 'go', 'csharp', 'powershell', 'dart', 'objectivec', 'ocaml', 'r',
            ],
        },
        languageTabs: [
            {
                highlight: 'bash',
                label: 'CLI',
                language: 'curl',
                logoClass: 'curl',
            },
            {
                highlight: 'javascript',
                label: 'JavaScript',
                language: 'javascript',
                logoClass: 'javascript',
            },
            {
                highlight: 'python',
                label: 'Python',
                language: 'python',
                logoClass: 'python',
            },
            {
                highlight: 'php',
                label: 'PHP',
                language: 'php',
                logoClass: 'php',
            },
            {
                highlight: 'java',
                label: 'Java',
                language: 'java',
                logoClass: 'java',
                variant: 'unirest',
            },
            {
                highlight: 'c',
                label: 'C',
                language: 'c',
                logoClass: 'c',
            },
            {
                highlight: 'csharp',
                label: 'C#',
                language: 'csharp',
                logoClass: 'csharp',
            },
            {
                highlight: 'go',
                label: 'Go',
                language: 'go',
                logoClass: 'go',
            },
            {
                highlight: 'rust',
                label: 'Rust',
                language: 'rust',
                logoClass: 'rust',
            },
            {
                highlight: 'javascript',
                label: 'Node.js',
                language: 'nodejs',
                logoClass: 'nodejs',
            },
            {
                highlight: 'ruby',
                label: 'Ruby',
                language: 'ruby',
                logoClass: 'ruby',
            },
            {
                highlight: 'powershell',
                label: 'PowerShell',
                language: 'powershell',
                logoClass: 'powershell',
            },
            {
                highlight: 'dart',
                label: 'Dart',
                language: 'dart',
                logoClass: 'dart',
            },
            {
                highlight: 'objectivec',
                label: 'Objective-C',
                language: 'objective-c',
                logoClass: 'objective-c',
            },
            {
                highlight: 'ocaml',
                label: 'OCaml',
                language: 'ocaml',
                logoClass: 'ocaml',
            },
            {
                highlight: 'r',
                label: 'R',
                language: 'r',
                logoClass: 'r',
            },
            {
                highlight: 'swift',
                label: 'Swift',
                language: 'swift',
                logoClass: 'swift',
            },
            {
                highlight: 'kotlin',
                label: 'Kotlin',
                language: 'kotlin',
                logoClass: 'kotlin',
            },
        ],
    },
    staticDirectories: ['apify-docs-theme/static', 'static'],
    customFields: {
        forbiddenGiscusDocRegExpStrings: [
            '^/legal',
            '^/legal/*',
        ],
    },
    clientModules: ['./clientModule.js'],
};
