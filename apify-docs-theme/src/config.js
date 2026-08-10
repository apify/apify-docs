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
            {
                label: 'Get started',
                href: `${absoluteUrl}/get-started`,
                activeBasePath: 'get-started',
                position: 'left',
                target: '_self',
                rel: 'dofollow',
            },
            {
                label: 'Actors',
                href: `${absoluteUrl}/actors`,
                activeBasePath: 'actors',
                position: 'left',
                target: '_self',
                rel: 'dofollow',
            },
            {
                label: 'Storage',
                href: `${absoluteUrl}/storage`,
                activeBasePath: 'storage',
                position: 'left',
                target: '_self',
                rel: 'dofollow',
            },
            {
                label: 'Proxy',
                href: `${absoluteUrl}/proxy`,
                activeBasePath: 'proxy',
                position: 'left',
                target: '_self',
                rel: 'dofollow',
            },
            {
                label: 'Account',
                href: `${absoluteUrl}/account`,
                activeBasePath: 'account',
                position: 'left',
                target: '_self',
                rel: 'dofollow',
            },
            {
                label: 'Integrations',
                href: `${absoluteUrl}/integrations`,
                activeBasePath: 'integrations',
                position: 'left',
                target: '_self',
                rel: 'dofollow',
            },
            {
                label: 'Security',
                href: `${absoluteUrl}/security`,
                activeBasePath: 'security',
                position: 'left',
                target: '_self',
                rel: 'dofollow',
            },
            {
                label: 'Academy',
                href: `${absoluteUrl}/academy`,
                activeBasePath: 'academy',
                position: 'right',
                target: '_self',
                rel: 'dofollow',
            },
            // The dropdown labels below carry both `href` and `to` on purpose. `href` keeps the
            // target absolute, so the link resolves from the client, SDK, and CLI docs sites as
            // well. `to` tells the Docusaurus dropdown that the label is a real link, so clicking
            // it opens the landing page instead of only toggling the menu open.
            {
                label: 'API',
                type: 'dropdown',
                href: `${absoluteUrl}/api`,
                to: `${absoluteUrl}/api`,
                activeBaseRegex: '^/api(/|$)',
                position: 'right',
                target: '_self',
                rel: 'dofollow',
                items: [
                    {
                        label: 'API reference',
                        href: `${absoluteUrl}/api/v2`,
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
                        href: `${absoluteUrl}/api/client/python/docs`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Client for Go',
                        href: `https://github.com/apify/apify-client-go`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Client for PHP',
                        href: `https://github.com/apify/apify-client-php`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Client for Java',
                        href: `https://github.com/apify/apify-client-java`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Client for .NET',
                        href: `https://github.com/apify/apify-client-dotnet`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Client for Rust',
                        href: `https://github.com/apify/apify-client-rust`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                ],
            },
            {
                label: 'SDK',
                type: 'dropdown',
                href: `${absoluteUrl}/sdk`,
                to: `${absoluteUrl}/sdk`,
                activeBaseRegex: '^/sdk(/|$)',
                position: 'right',
                target: '_self',
                rel: 'dofollow',
                items: [
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
                ],
            },
            {
                label: 'CLI',
                type: 'dropdown',
                href: `${absoluteUrl}/cli`,
                to: `${absoluteUrl}/cli`,
                activeBaseRegex: '^/cli(/|$)',
                position: 'right',
                target: '_self',
                rel: 'dofollow',
                items: [
                    {
                        label: 'Installation',
                        href: `${absoluteUrl}/cli/docs/installation`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Quick start',
                        href: `${absoluteUrl}/cli/docs/quick-start`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Command reference',
                        href: `${absoluteUrl}/cli/docs/reference`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                ],
            },
            {
                label: 'MCP',
                href: `${absoluteUrl}/integrations/mcp`,
                activeBasePath: 'integrations/mcp',
                position: 'right',
                target: '_self',
                rel: 'dofollow',
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
                title: 'Reference',
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
                        href: `${absoluteUrl}/api/client/python/docs`,
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
                title: 'Open source',
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
                        href: 'https://github.com/apify/mcpc',
                    },
                    {
                        label: 'Actor whitepaper',
                        href: 'https://whitepaper.actor',
                    },
                    {
                        label: 'proxy-chain',
                        href: 'https://github.com/apify/proxy-chain',
                    },
                ],
            },
            {
                title: 'Security',
                items: [
                    {
                        label: 'Trust Center',
                        href: 'https://trust.apify.com',
                    },
                ],
            },
            {
                title: 'Community',
                items: [
                    {
                        label: 'Discord',
                        href: 'https://discord.com/invite/jyEM2PRvMU',
                    },
                    {
                        label: 'X',
                        href: 'https://x.com/apify',
                    },
                    {
                        label: 'YouTube',
                        href: 'https://www.youtube.com/c/Apify',
                    },
                    {
                        label: 'GitHub',
                        href: 'https://github.com/apify',
                    },
                ],
            },
            {
                title: 'For AI',
                items: [
                    {
                        label: 'llms.txt',
                        href: `${absoluteUrl}/llms.txt`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'llms-full.txt',
                        href: `${absoluteUrl}/llms-full.txt`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'OpenAPI (JSON)',
                        href: `${absoluteUrl}/api/openapi.json`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'OpenAPI (YAML)',
                        href: `${absoluteUrl}/api/openapi.yaml`,
                        target: '_self',
                        rel: 'dofollow',
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
    announcementBar: process.env.APIFY_DOCS_ABSOLUTE_URL
        ? (() => {
              const parsedUrl = new URL(process.env.APIFY_DOCS_ABSOLUTE_URL);

              const { hostname } = parsedUrl;

              if (!hostname.includes('pr-') && !hostname.includes('preview')) {
                  return undefined;
              }

              const prNumber = hostname.split('.')[0]?.split('-')[1];

              if (!prNumber) {
                  return undefined;
              }

              // TODO: once we support multiple preview deployments, we should pass in the repository name as an env variable
              const githubUrl = `https://github.com/apify/apify-docs/pull/${prNumber}`;

              return {
                  id: 'apify-docs-preview-banner',
                  content: `You are visiting <a href="${githubUrl}" target="_blank" rel="noopener noreferrer">a preview build for PR ${prNumber}</a> of the Apify Docs.`,
                  backgroundColor: '#B80F0A',
                  textColor: '#FFFFFF',
                  isCloseable: false,
              };
          })()
        : undefined,
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
                            'roa-loader': require.resolve(`${__dirname}/roa-loader/`),
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
        'data-modal-title': 'Apify Docs Assistant',
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
