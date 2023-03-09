import React from 'react';
// cannot use any of the theme aliases here as it causes a circular dependency :( ideas welcome
import Layout from '@docusaurus/theme-classic/lib/theme/Layout/index';
import { usePluginData } from '@docusaurus/useGlobalData';

export default function LayoutWrapper(props) {
    const { options: { subNavbar } } = usePluginData('@apify/docs-theme');
    return (
        <div style={{
            '--ifm-navbar-height': subNavbar ? '123px' : '68px',
            'margin': 0,
            'padding': 0,
            'boxSizing': 'border-box',
        }}>
            <Layout {...props} />
        </div>
    );
}
