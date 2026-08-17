import Link from '@docusaurus/Link';
import { useDocsVersion } from '@docusaurus/plugin-content-docs/client';
import { usePluginData } from '@docusaurus/useGlobalData';
import React from 'react';

export default function ApiLink({ to, children }) {
    const { version, isLast } = useDocsVersion();
    const typedocData = usePluginData('docusaurus-plugin-typedoc-api');
    const routeBasePath = (typedocData?.routeBasePath ?? 'api').replace(/^\/+|\/+$/g, '');

    if (isLast) {
        return <Link to={`/${routeBasePath}/${to}`}>{children}</Link>;
    }

    const versionSlug = version === 'current' ? 'next' : version;
    return <Link to={`/${routeBasePath}/${versionSlug}/${to}`}>{children}</Link>;
}
