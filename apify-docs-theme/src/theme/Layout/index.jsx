import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';
import { isRegexpStringMatch } from '@docusaurus/theme-common';
// cannot use any of the theme aliases here as it causes a circular dependency :( ideas welcome
import Layout from '@docusaurus/theme-classic/lib/theme/Layout/index';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import React from 'react';

export default function LayoutWrapper(props) {
    const { options } = usePluginData('@apify/docs-theme');
    const baseUrl = useBaseUrl('/');
    const location = useLocation();
    const currentPath = location.pathname.replace(new RegExp(`^${baseUrl}`), '').trim();
    const shouldRenderAlternateLink = currentPath && currentPath !== '404';

    const alternateMarkdownLink = useBaseUrl(`/${currentPath}.md`, { absolute: true });

    const subNavbars = options.subNavbars ?? (options.subNavbar ? [options.subNavbar] : []);
    const hasActiveSubNavbar = subNavbars.some(
        (nav) => !nav.pathRegex || isRegexpStringMatch(nav.pathRegex, location.pathname),
    );

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
                    '--ifm-navbar-height': hasActiveSubNavbar && !currentPath.startsWith('api/v2') ? '126px' : '68px',
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box',
                }}>
                <Layout {...props} />
            </div>
        </>
    );
}
