import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';
// cannot use any of the theme aliases here as it causes a circular dependency :( ideas welcome
import Layout from '@docusaurus/theme-classic/lib/theme/Layout/index';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import React, { useEffect } from 'react';

export default function LayoutWrapper(props) {
    const { options: { subNavbar } } = usePluginData('@apify/docs-theme');
    const baseUrl = useBaseUrl('/');
    const currentPath = useLocation().pathname.replace(new RegExp(`^${baseUrl}`), '');

    // Silent cache busting for mcp.apify.com redirects
    useEffect(() => {
        // Only run on the MCP documentation page
        if (currentPath.includes('integrations/mcp')) {
            // Always clear cache when on MCP page to help with redirect issues.
            // Background: Previously, mcp.apify.com had a 301 redirect to this docs page, which was wrong.
            // Many users have this redirect cached in their browsers, so they can't access the new MCP UI.
            // This helps with their cached redirect, allowing them to access mcp.apify.com
            fetch('https://mcp.apify.com/', { method: 'get', cache: 'reload' }).then(() => {
                console.log('MCP cache cleared successfully');
            }).catch((error) => {
                console.warn('Failed to clear MCP cache:', error);
            });
        }
    }, [currentPath]);

    return (
        <>
            <Head>
                <link rel="alternate" type="text/markdown" href={`${currentPath}.md`}/>
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
