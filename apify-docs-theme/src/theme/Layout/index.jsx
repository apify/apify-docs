import Head from '@docusaurus/Head';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import Layout from '@theme-original/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import React from 'react';

export default function LayoutWrapper(props) {
    const {
        options: { subNavbar },
    } = usePluginData('@apify/docs-theme');
    const baseUrl = useBaseUrl('/');
    const { pathname } = useLocation();
    const currentPath = pathname.replace(new RegExp(`^${baseUrl}`), '').trim();
    const docsPluginData = useAllDocsData();
    const typedocPluginData = usePluginData('docusaurus-plugin-typedoc-api') ?? {};

    const allPluginData = {
        ...docsPluginData,
        'typedoc-plugin-default': typedocPluginData,
    };

    const isVersionedPage = Object.values(allPluginData).some((pluginData) =>
        pluginData.versions?.some((version) => !version.isLast && pathname.startsWith(version.path)),
    );

    const shouldRenderAlternateLink =
        currentPath && currentPath !== '404' && currentPath !== 'search' && !isVersionedPage;

    const alternateMarkdownLink = useBaseUrl(`/${currentPath}.md`, {
        absolute: true,
    });

    return (
        <>
            <Head>
                {shouldRenderAlternateLink ? (
                    <link rel="alternate" type="text/markdown" href={alternateMarkdownLink} />
                ) : null}
            </Head>
            <div
                style={{
                    '--ifm-navbar-height': subNavbar && !currentPath.startsWith('api/v2') ? '126px' : '68px',
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box',
                }}
            >
                <Layout {...props} />
            </div>
        </>
    );
}
