import Head from '@docusaurus/Head';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import { isRegexpStringMatch } from '@docusaurus/theme-common';
// cannot use any of the theme aliases here as it causes a circular dependency :( ideas welcome
import Layout from '@docusaurus/theme-classic/lib/theme/Layout/index';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import clsx from 'clsx';
import React from 'react';

export default function LayoutWrapper(props) {
    const {
        options: { subNavbar },
    } = usePluginData('@apify/docs-theme');
    const baseUrl = useBaseUrl('/');
    const { pathname } = useLocation();
    const currentPath = pathname.replace(new RegExp(`^${baseUrl}`), '').trim();
    const hasSubNavbar = subNavbar && (!subNavbar.pathRegex || isRegexpStringMatch(subNavbar.pathRegex, pathname));
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
                className={clsx('layout-wrapper', hasSubNavbar && 'layout-wrapper--subnavbar')}
                style={{
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
