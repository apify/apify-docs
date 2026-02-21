/* eslint-disable global-require */
const { absoluteUrl } = require('./absoluteUrl');

const noIndex = ['true', '1'].includes(process.env.NO_INDEX ?? '');

const themeConfig = {
    docs: {
        versionPersistence: 'localStorage',
        sidebar: {
            hideable: true,
        },
    },
    navbar: {
        title: 'Apify Docs',
        logo: {
            src: 'img/apify_sdk.svg',
            srcDark: 'img/apify_sdk_white.svg',
            href: absoluteUrl,
            target: '_self',
        },
        items: [
            // Product zone
            {
                label: 'Get Started',
                href: `${absoluteUrl}/platform/get-started`,
                activeBasePath: 'platform/get-started',
                position: 'left',
                target: '_self',
                rel: 'dofollow',
            },
            {
                label: 'Actors',
                href: `${absoluteUrl}/platform/actors`,
                activeBasePath: 'platform/actors',
                position: 'left',
                target: '_self',
                rel: 'dofollow',
            },
            {
                label: 'Integrations',
                href: `${absoluteUrl}/platform/integrations`,
                activeBasePath: 'platform/integrations',
                position: 'left',
                target: '_self',
                rel: 'dofollow',
            },
            {
                label: 'Account',
                href: `${absoluteUrl}/platform/account`,
                activeBasePath: 'platform/account',
                position: 'left',
                target: '_self',
                rel: 'dofollow',
            },
            {
                label: 'Resources',
                type: 'dropdown',
                position: 'left',
                items: [
                    {
                        label: 'API Reference',
                        href: `${absoluteUrl}/api/v2`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'SDK for JavaScript',
                        href: `${absoluteUrl}/sdk/js/docs/overview`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'SDK for Python',
                        href: `${absoluteUrl}/sdk/python/docs/overview`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Client for JavaScript',
                        href: `${absoluteUrl}/api/client/js/docs`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Client for Python',
                        href: `${absoluteUrl}/api/client/python/docs/overview`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'CLI',
                        href: `${absoluteUrl}/cli/docs`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                ],
            },
            // Ecosystem zone
            {
                label: 'Learn',
                href: `${absoluteUrl}/academy`,
                activeBasePath: 'academy',
                position: 'left',
                target: '_self',
                rel: 'dofollow',
                className: 'navbar__zone-separator',
            },
            {
                label: 'Open Source',
                type: 'dropdown',
                to: `${absoluteUrl}/open-source`,
                activeBasePath: 'open-source',
                target: '_self',
                position: 'left',
                items: [
                    {
                        label: 'Crawlee',
                        href: 'https://crawlee.dev',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Fingerprint Suite',
                        href: 'https://github.com/apify/fingerprint-suite',
                    },
                    {
                        label: 'impit',
                        href: 'https://github.com/apify/impit',
                    },
                    {
                        label: 'MCP CLI',
                        href: 'https://github.com/apify/mcp-cli',
                    },
                    {
                        label: 'Actor whitepaper',
                        href: 'https://whitepaper.actor',
                    },
                    {
                        label: 'proxy-chain',
                        href: 'https://github.com/apify/proxy-chain',
                    },
                    {
                        label: 'Apify on GitHub',
                        href: 'https://github.com/apify',
                    },
                ],
            },
            {
                href: 'https://discord.com/invite/jyEM2PRvMU',
                label: 'Discord',
                title: 'Chat on Discord',
                position: 'right',
                className: 'icon',
            },
        ],
    },
    colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
    },
    prism: {
        defaultLanguage: 'typescript',
        theme: require('./theme/CodeThemes/light').lightTheme,
        darkTheme: require('./theme/CodeThemes/dark').darkTheme,
        additionalLanguages: ['docker', 'log', 'php', 'json5', 'bash'],
    },
    // this needs to be absolute link otherwise it gets resolved wrongly in project docs
    image: 'https://apify.com/og-image/docs-article',
    footer: {
        links: [
            {
                title: 'Product',
                items: [
                    {
                        label: 'Get Started',
                        href: `${absoluteUrl}/platform/get-started`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Actors',
                        href: `${absoluteUrl}/platform/actors`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Integrations',
                        href: `${absoluteUrl}/platform/integrations`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Account',
                        href: `${absoluteUrl}/platform/account`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                ],
            },
            {
                title: 'Developer tools',
                items: [
                    {
                        label: 'API Reference',
                        href: `${absoluteUrl}/api/v2`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'SDK for JavaScript',
                        href: `${absoluteUrl}/sdk/js/docs/overview`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'SDK for Python',
                        href: `${absoluteUrl}/sdk/python/docs/overview`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'CLI',
                        href: `${absoluteUrl}/cli/docs`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                ],
            },
            {
                title: 'Learn & community',
                items: [
                    {
                        label: 'Academy',
                        href: `${absoluteUrl}/academy`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Crawlee',
                        href: 'https://crawlee.dev',
                        rel: 'dofollow',
                    },
                    {
                        label: 'GitHub',
                        href: 'https://github.com/apify',
                    },
                    {
                        href: 'https://discord.com/invite/jyEM2PRvMU',
                        label: 'Discord',
                    },
                ],
            },
            {
                title: 'Company',
                items: [
                    {
                        label: 'Security',
                        href: `${absoluteUrl}/platform/security`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Limits',
                        href: `${absoluteUrl}/platform/limits`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Trust Center',
                        href: 'https://trust.apify.com',
                    },
                ],
            },
        ],
        logo: {
            src: 'img/apify_logo.svg',
            href: '/',
            width: '60px',
            height: '60px',
        },
    },
    algolia: {
        appId: 'N8EOCSBQGH',
        apiKey: 'e97714a64e2b4b8b8fe0b01cd8592870', // search only (public) API key
        indexName: 'apify_sdk_v2',
        placeholder: 'Search documentation',
        algoliaOptions: {
            facetFilters: ['version:VERSION'],
        },
        translations: {
            button: {
                buttonText: 'Search documentation…',
            },
        },
    },
    hubspot: {
        accountId: '19497222',
        async: true,
        defer: true,
    },
};

const plugins = [
    [
        'docusaurus-gtm-plugin',
        {
            id: 'GTM-MNGXGGB',
        },
    ],
    '@stackql/docusaurus-plugin-hubspot',
    async function runnableCodeBlock() {
        return {
            name: 'runnable-code-block',
            configureWebpack() {
                return {
                    resolveLoader: {
                        alias: {
                            'roa-loader': require.resolve(
                                `${__dirname}/roa-loader/`,
                            ),
                        },
                    },
                };
            },
        };
    },
];

const scripts = [
    {
        src: 'https://widget.kapa.ai/kapa-widget.bundle.js',
        'data-website-id': 'a9937f98-9c9d-44d9-a433-fec4cb1c114d',
        'data-project-name': 'Apify',
        'data-modal-title': 'Apify AI Assistant',
        'data-project-color': '#666666',
        'data-button-hide': 'true',
        'data-project-logo': 'https://apify.com/img/apify-logo/logomark-32x32.svg',
        'data-modal-example-questions': 'How to run an Actor?,Create a version of an Actor?',
        'data-modal-override-open-id': 'ask-ai-input',
        'data-modal-override-open-class': 'search-input',
        'data-scale-factor': '1.6',
        'data-modal-size': '800px',
        async: true,
    },
];

module.exports = {
    themeConfig,
    plugins,
    absoluteUrl,
    noIndex,
    scripts,
};
