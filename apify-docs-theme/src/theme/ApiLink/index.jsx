import Link from '@docusaurus/Link';
import { useDocsVersion } from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import React from 'react';

export default function ApiLink({ to, children }) {
    const { version, isLast } = useDocsVersion();
    const { siteConfig } = useDocusaurusContext();
    const typedocData = usePluginData('docusaurus-plugin-typedoc-api');
    const routeBasePath = (typedocData?.routeBasePath ?? 'api').replace(/^\/+|\/+$/g, '');

    if (siteConfig.presets[0][1].docs.disableVersioning || isLast) {
        return <Link to={`/${routeBasePath}/${to}`}>{children}</Link>;
    }

    const versionSlug = version === 'current' ? 'next' : version;
    return <Link to={`/${routeBasePath}/${versionSlug}/${to}`}>{children}</Link>;
}
