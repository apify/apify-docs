import isInternalUrl from '@docusaurus/isInternalUrl';
import Link from '@docusaurus/Link';
import { isActiveSidebarItem } from '@docusaurus/plugin-content-docs/client';
import { ThemeClassNames } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import IconExternalLink from '@theme/Icon/ExternalLink';
import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';

export default function DocSidebarItemLink({
    item,
    onItemClick,
    activePath,
    level,
    index,
    ...props
}) {
    const {
        href,
        label,
        className,
        autoAddBaseUrl,
    } = item;
    const isActive = isActiveSidebarItem(item, activePath);
    const isInternalLink = isInternalUrl(href);
    const baseUrl = useDocusaurusContext().siteConfig.url;

    if (href.startsWith(baseUrl)) {
        props.target = '_self';
    }

    if (item.customProps) {
        for (const key of Object.keys(item.customProps)) {
            props[`data-${key}`] = item.customProps[key];
        }
    }

    return (
        <li
            className={clsx(
                ThemeClassNames.docs.docSidebarItemLink,
                ThemeClassNames.docs.docSidebarItemLinkLevel(level),
                'menu__list-item',
                className,
            )}
            key={label}>
            <Link
                className={clsx(
                    'menu__link',
                    !isInternalLink && styles.menuExternalLink,
                    {
                        'menu__link--active': isActive,
                    },
                )}
                autoAddBaseUrl={autoAddBaseUrl}
                aria-current={isActive ? 'page' : undefined}
                to={href}
                {...(isInternalLink && {
                    onClick: onItemClick ? () => onItemClick(item) : undefined,
                })}
                {...props}>
                {label}
                {!isInternalLink && <IconExternalLink />}
            </Link>
        </li>
    );
}
