import isInternalUrl_ from '@docusaurus/isInternalUrl';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { isRegexpStringMatch, useThemeConfig } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import IconExternalLink from '@theme/Icon/ExternalLink';
import clsx from 'clsx';
import React from 'react';

export default function NavbarNavLink({
    activeBasePath,
    activeBaseRegex,
    activeClassName = 'navbar__link--active',
    className,
    to,
    href,
    label,
    html,
    isDropdownLink,
    prependBaseUrlToHref,
    ...props
}) {
    const {
        navbar: { items = [] },
    } = useThemeConfig();
    const {
        options: { subNavbar },
    } = usePluginData('@apify/docs-theme');
    const allItems = [...items, ...(subNavbar?.items || [])];
    const location = useLocation();
    // TODO all this seems hacky
    // {to: 'version'} should probably be forbidden, in favor of {to: '/version'}
    const toUrl = useBaseUrl(to);
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
                      {isExternalLink && <IconExternalLink {...(isDropdownLink && { width: 12, height: 12 })} />}
                  </>
              ),
          };

    // If the item is a dropdown, look for any of its children that match the current path
    const dropDownHasActiveItem =
        location.pathname !== '/' &&
        allItems
            .filter((item) => item.type === 'dropdown')
            .filter((item) => item.label === label)
            .reduce((nestedItems, item) => [...nestedItems, ...item.items], [])
            .some((item) => (item.to || item.href).endsWith(location.pathname));

    if (href) {
        // `Link` drops `isActive`/`activeClassName` for absolute URLs (they only work with the
        // React Router link), so the active class has to be resolved here instead.
        const isActive =
            (activeBaseRegex && isRegexpStringMatch(activeBaseRegex, location.pathname)) ||
            (activeBasePath && location.pathname.startsWith(`/${activeBasePath}`)) ||
            dropDownHasActiveItem;

        return (
            <Link
                href={prependBaseUrlToHref ? normalizedHref : href}
                {...props}
                className={clsx(className, isActive && activeClassName)}
                {...linkContentProps}
            />
        );
    }

    return (
        <Link
            to={toUrl}
            isNavLink
            className={className}
            {...((activeBasePath || activeBaseRegex) && {
                // eslint-disable-next-line no-shadow
                isActive: (_match, location) =>
                    activeBaseRegex
                        ? isRegexpStringMatch(activeBaseRegex, location.pathname) || dropDownHasActiveItem
                        : location.pathname.startsWith(`/${activeBasePath}`),
                activeClassName,
            })}
            {...props}
            {...linkContentProps}
        />
    );
}
