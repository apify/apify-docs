import React, { useCallback } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function setupApiary(subdomain) {
    // See http://embed.apiary.io/api-reference.html for description
    // eslint-disable-next-line no-undef
    const embed = new Apiary.Embed({
        subdomain,
        header: '#nav-empty-space',
        element: '#apiary-container',
        preferences: {
            permalinks: true,
        },
        theme: {
            tableOfContents: {
                fontSize: '15px',
                section: {
                    title: {
                        text: { color: 'black', fontWeight: 'normal' },
                    },
                },
            },
            humanColumn: {
                content: {
                    lineHeight: '170%',
                    apiName: { color: 'black', fontWeight: 'normal', fontSize: '39px' },
                    section: {
                        title: { color: 'black', visibility: 'hidden' },
                        apiDescription: {
                            'fontSize': '15px',
                            // p: { marginBottom: '10px' },
                            'code': {
                                fontSize: '13px',
                            },
                            'pre': {
                                fontSize: '13px',
                            },
                            'h1': { fontSize: '30px', fontWeight: 'normal', color: '#ec6c33' },
                            'h2': { fontSize: '30px', fontWeight: 'normal', color: '#ec6c33' },
                            'h3': { fontSize: '23px', fontWeight: 'normal' },
                            'p': { marginBottom: '20px' },
                            'ul': { paddingTop: '0px', paddingBottom: '0px' },
                            'ol': { paddingTop: '0px', paddingBottom: '0px' },
                            'ul.li': { marginBottom: '0px' },
                            'ol.li': { marginBottom: '0px' },
                        },
                        resourceGroups: {
                            resourceGroup: {
                                name: { fontSize: '30px', fontWeight: 'normal', color: '#ec6c33' },
                                description: {
                                    'p': { fontSize: '15px' },
                                    'code': { fontSize: '13px' },
                                    'pre': { fontSize: '13px' },
                                    'table.tr.th': { fontSize: '15px' },
                                    'table.tr.td': { fontSize: '15px' },
                                    'ul': { paddingTop: '0px', paddingBottom: '0px' },
                                    'ol': { paddingTop: '0px', paddingBottom: '0px' },
                                    'ul.li': { marginBottom: '0px' },
                                    'ol.li': { marginBottom: '0px' },
                                    'marginBottom': '25px',
                                },
                                resources: {
                                    resource: {
                                        name: { fontSize: '23px', fontWeight: 'normal' },
                                        actions: {
                                            action: {
                                                invitation: { fontSize: '16px' },
                                                description: {
                                                    'p': { fontSize: '15px' },
                                                    'code': { fontSize: '13px' },
                                                    'pre': { fontSize: '13px' },
                                                    'table.tr.th': { fontSize: '15px' },
                                                    'table.tr.td': { fontSize: '15px' },
                                                    'ul': { paddingTop: '0px', paddingBottom: '0px' },
                                                    'ol': { paddingTop: '0px', paddingBottom: '0px' },
                                                    'ul.li': { marginBottom: '0px' },
                                                    'ol.li': { marginBottom: '0px' },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            machineColumn: {
                content: {
                    parameters: {
                        fontSize: '15px',
                    },
                },
            },
        },
    });
    embed.onLoaded((iframeElement) => {
        iframeElement.style.width = '100%';
    });
}

export default function ApiDocs() {
    const { siteConfig } = useDocusaurusContext();

    const loadApiaryScripts = useCallback(() => {
        const vendorScript = document.createElement('script');
        vendorScript.async = false;
        vendorScript.src = 'https://api.apiary.io/seeds/embed.js';

        vendorScript.onload = function () {
            setupApiary('apify2prod');
        };
        document.body.appendChild(vendorScript);
    }, []);

    React.useEffect(() => {
        loadApiaryScripts();
        document.documentElement.setAttribute('style', 'scroll-behavior: auto;');
    }, []);

    return (
        <Layout
            title={`${siteConfig.title} · ${siteConfig.tagline}`}
            description={siteConfig.description}>
            <div id="nav-empty-space"/>
            <div style={{ width: '100%' }}>
                <div id="apiary-container"/>
            </div>
        </Layout>
    );
}
