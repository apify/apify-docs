import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl_ from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import { useLocation } from '@docusaurus/router';
import { isRegexpStringMatch, useThemeConfig } from '@docusaurus/theme-common';
import { usePluginData } from '@docusaurus/useGlobalData';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function NavbarNavLink({
    activeBasePath,
    activeBaseRegex,
    to,
    href,
    label,
    html,
    isDropdownLink,
    prependBaseUrlToHref,
    ...props
}) {
    const { navbar: { items = [] } } = useThemeConfig();
    const { options: { subNavbar } } = usePluginData('@apify/docs-theme');
    const allItems = [...items, ...(subNavbar?.items || [])];
    const location = useLocation();
    // TODO all this seems hacky
    // {to: 'version'} should probably be forbidden, in favor of {to: '/version'}
    const toUrl = useBaseUrl(to);
    const activeBaseUrl = useBaseUrl(activeBasePath);
    const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
    const { siteConfig } = useDocusaurusContext();
    const isInternalUrl = (url) => {
        if (url.startsWith(siteConfig.url)) {
            return true;
        }
        return isInternalUrl_(url);
    };

    const isExternalLink = label && href && !isInternalUrl(href);
    // Link content is set through html XOR label
    const linkContentProps = html
        ? { dangerouslySetInnerHTML: { __html: html } }
        : {
            children: (
                <>
                    {label}
                    {isExternalLink && (
                        <IconExternalLink
                            {...(isDropdownLink && { width: 12, height: 12 })}
                        />
                    )}
                </>
            ),
        };

    // If the item is a dropdown, look for any of its children that match the current path
    const dropDownHasActiveItem = location.pathname !== '/' && allItems
        .filter((item) => item.type === 'dropdown')
        .filter((item) => item.label === label)
        .reduce((nestedItems, item) => [...nestedItems, ...item.items], [])
        .some((item) => (item.to || item.href).endsWith(location.pathname));

    if (href) {
        return (
            <Link
                href={prependBaseUrlToHref ? normalizedHref : href}
                {...props}
                {...(activeBaseUrl && {
                    className: location.pathname.startsWith(`/${activeBasePath}`) || dropDownHasActiveItem
                        ? 'navbar__item navbar__link navbar__link--active'
                        : 'navbar__item navbar__link',
                })}
                {...linkContentProps}
            />
        );
    }

    return (
        <Link
            to={toUrl}
            isNavLink
            {...((activeBasePath || activeBaseRegex) && {
                // eslint-disable-next-line no-shadow
                isActive: (_match, location) => (activeBaseRegex
                    ? isRegexpStringMatch(activeBaseRegex, location.pathname) || dropDownHasActiveItem
                    : location.pathname.startsWith(activeBaseUrl)),
            })}
            {...props}
            {...linkContentProps}
        />
    );
}
