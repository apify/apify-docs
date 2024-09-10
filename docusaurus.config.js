const { join } = require('path');

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
        '@docusaurus/theme-mermaid',
    ],
    presets: /** @type {import('@docusaurus/types').PresetConfig[]} */ ([
        [
            '@docusaurus/preset-classic',
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
        [
            'redocusaurus',
            /** @type {import('redocusaurus').PresetEntry} */
            {
                config: join(__dirname, '.redocly.yaml'),
                specs: [
                    {
                        spec: 'node_modules/@apify/openapi/openapi.yaml',
                        route: '/api/v2/',
                    },
                ],
                theme: {
                    primaryColor: '#1f9ec8',
                },
            },
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
        () => ({
            name: 'webpack-loader-fix',
            configureWebpack() {
                return {
                    module: {
                        rules: [
                            {
                                test: /@apify-packages\/ui-library\/.*/,
                                resolve: {
                                    fullySpecified: false,
                                },
                                loader: 'babel-loader',
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
            const isPartial = params.filePath.split('/').pop()[0] === '_';
            if (!isPartial) {
                const ogImageURL = new URL('https://apify.com/og-image/docs-article');
                ogImageURL.searchParams.set('title', result.frontMatter.title);
                result.frontMatter.image ??= ogImageURL.toString();
            }
            return result;
        },
    },
    themeConfig: config.themeConfig,
    staticDirectories: ['apify-docs-theme/static', 'static'],
    customFields: {
        forbiddenGiscusDocRegExpStrings: [
            '^/legal',
            '^/legal/*',
        ],
    },
    clientModules: ['./clientModule.js'],
};
