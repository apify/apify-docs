import Link from '@docusaurus/Link';
import { useDocsVersion } from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const ApiLink = ({ to, children }) => {
    const { version, isLast } = useDocsVersion();
    const { siteConfig } = useDocusaurusContext();

    if (siteConfig.presets[0][1].docs.disableVersioning) {
        return (
            <Link to={`/api/${to}`}>{children}</Link>
        );
    }

    let versionSlug = `${version}/`;

    if (version === 'current') {
        versionSlug = 'next/';
    } else if (isLast) {
        versionSlug = '';
    }

    return (
        <Link to={`/api/${versionSlug}${to}`}>{children}</Link>
    );
};

export default ApiLink;
