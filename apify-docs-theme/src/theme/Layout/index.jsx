import { useLocation } from '@docusaurus/router';
// cannot use any of the theme aliases here as it causes a circular dependency :( ideas welcome
import Layout from '@docusaurus/theme-classic/lib/theme/Layout/index';
import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';

export default function LayoutWrapper(props) {
    const baseUrl = useBaseUrl('/');
    const currentPath = useLocation().pathname.replace(new RegExp(`^${baseUrl}`), '');

    return (
        <div style={{
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
        }}>
            <Layout {...props} />
        </div>
    );
}
