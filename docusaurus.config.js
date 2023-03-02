/* eslint-disable global-require,import/no-extraneous-dependencies */
const { config } = require('./apify-docs-theme');
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
    favicon: 'img/favicon.ico',
    onBrokenLinks:
    /** @type {import('@docusaurus/types').ReportingSeverity} */ ('throw'),
    onBrokenMarkdownLinks:
    /** @type {import('@docusaurus/types').ReportingSeverity} */ ('throw'),
    themes: [
        [
            require.resolve('./apify-docs-theme'),
            /** @type {import('./apify-docs-theme/types').ThemeOptions} */
            ({
                // subNavbar: {
                //     title: 'Apify Docs',
                //     items: [
                //         {
                //             label: 'Subnav 1',
                //             href: `${config.absoluteUrl}/platform`,
                //             target: '_self',
                //             activeBasePath: 'platform',
                //             rel: 'dofollow',
                //         },
                //         {
                //             label: 'Subnav 2',
                //             href: `${config.absoluteUrl}/academy`,
                //             target: '_self',
                //             activeBasePath: 'academy',
                //             rel: 'dofollow',
                //         },
                //         {
                //             label: 'Subnav 3',
                //             type: 'dropdown',
                //             items: [
                //                 {
                //                     label: 'Reference',
                //                     href: `${config.absoluteUrl}/api/v2`,
                //                 },
                //                 {
                //                     label: 'Client for JavaScript',
                //                     href: `${config.absoluteUrl}/client-js/`, // we need a trailing slash here, we'd get redirected there anyway
                //                     target: '_self',
                //                     rel: 'dofollow',
                //                 },
                //                 {
                //                     label: 'Client for Python',
                //                     href: `${config.absoluteUrl}/client-python/`, // we need a trailing slash here, we'd get redirected there anyway
                //                     target: '_self',
                //                     rel: 'dofollow',
                //                 },
                //             ],
                //         },
                //     ],
                // },
            }),
        ],
    ],
    presets: /** @type {import('@docusaurus/types').PresetConfig[]} */ ([
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    id: 'platform',
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
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
                showLastUpdateAuthor: true,
                showLastUpdateTime: true,
                editUrl: 'https://github.com/apify/apify-docs/edit/master/',
                sidebarPath: require.resolve('./sources/academy/sidebars.js'),
            },
        ],
        // TODO this should be somehow computed from all the external sources
        [
            '@docusaurus/plugin-client-redirects',
            {
                createRedirects(existingPath) {
                    if (!existingPath.endsWith('/')) {
                        return `${existingPath}/`;
                    }

                    return undefined; // Return a falsy value: no redirect created
                },
            },
        ],
        // [
        //     'docusaurus-gtm-plugin',
        //     {
        //         id: 'GTM-TKBX678',
        //     },
        // ],
    ],
    themeConfig: config.themeConfig,
    staticDirectories: ['apify-docs-theme/static', 'static'],
};
