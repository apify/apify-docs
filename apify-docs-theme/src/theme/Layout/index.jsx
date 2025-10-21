import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';
// cannot use any of the theme aliases here as it causes a circular dependency :( ideas welcome
import Layout from '@docusaurus/theme-classic/lib/theme/Layout/index';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import React from 'react';

export default function LayoutWrapper(props) {
    const { options: { subNavbar } } = usePluginData('@apify/docs-theme');
    const baseUrl = useBaseUrl('/');
    const currentPath = useLocation().pathname.replace(new RegExp(`^${baseUrl}`), '').trim();
    const shouldRenderAlternateLink = currentPath && currentPath !== '404';

    const alternateMarkdownLink = useBaseUrl(`/${currentPath}.md`, { absolute: true });

    return (
        <>
            <Head>
                {
                    shouldRenderAlternateLink
                        ? <link rel="alternate" type="text/markdown" href={alternateMarkdownLink}/>
                        : null
                }
            </Head>
            <div
                style={{
                    '--ifm-navbar-height': subNavbar && !currentPath.startsWith('api/v2') ? '126px' : '68px',
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box',
                }}>
                <Layout {...props} />
            </div>
        </>
    );
}
