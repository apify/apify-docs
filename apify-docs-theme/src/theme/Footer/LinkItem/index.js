import isInternalUrl_ from '@docusaurus/isInternalUrl';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import IconExternalLink from '@theme/Icon/ExternalLink';
import React from 'react';

export default function FooterLinkItem({ item }) {
    const {
        to,
        href,
        label,
        prependBaseUrlToHref,
        ...props
    } = item;
    const toUrl = useBaseUrl(to);
    const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
    const { siteConfig } = useDocusaurusContext();
    const isInternalUrl = (url) => {
        if (url.startsWith(siteConfig.url)) {
            return true;
        }
        return isInternalUrl_(url);
    };
    return (
        <Link
            className="footer__link-item"
            {...(href
                ? {
                    href: prependBaseUrlToHref ? normalizedHref : href,
                }
                : {
                    to: toUrl,
                })}
            {...props}>
            {label}
            {href && !isInternalUrl(href) && <IconExternalLink />}
        </Link>
    );
}
