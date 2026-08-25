import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { useThemeConfig } from '@docusaurus/theme-common';
import React from 'react';

function isItemActive(item, pathname) {
    if (item.activeBaseRegex) {
        return new RegExp(item.activeBaseRegex).test(pathname);
    }
    if (item.activeBasePath) {
        const basePath = `/${item.activeBasePath.replace(/^\//, '')}`;
        return pathname === basePath || pathname.startsWith(`${basePath}/`);
    }
    return false;
}

/**
 * The docs have no single root page, so instead of a home icon the first
 * breadcrumb shows the top navigation item selected for the current page.
 */
export default function HomeBreadcrumbItem() {
    const { pathname } = useLocation();
    const { navbar } = useThemeConfig();

    // When several items match (e.g. Integrations and MCP), the most specific one wins.
    const activeItem = navbar.items
        .filter((item) => item.label && (item.href || item.to) && isItemActive(item, pathname))
        .sort((a, b) => (b.activeBasePath?.length ?? 0) - (a.activeBasePath?.length ?? 0))[0];

    if (!activeItem) {
        return null;
    }

    return (
        <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" href={activeItem.href ?? activeItem.to}>
                {activeItem.label}
            </Link>
        </li>
    );
}
