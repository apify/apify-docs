import { useLocation } from '@docusaurus/router';
import { isRegexpStringMatch, useThemeConfig } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import NavbarItem from '@theme/NavbarItem';
import React from 'react';

function useNavbarItems() {
    // TODO temporary casting until ThemeConfig type is improved
    return useThemeConfig().navbar.items;
}
// The primary menu displays the navbar items
export default function NavbarMobilePrimaryMenu() {
    // const mobileSidebar = useNavbarMobileSidebar();
    // TODO how can the order be defined for mobile?
    // Should we allow providing a different list of items?
    const items = useNavbarItems();
    const baseUrl = useBaseUrl('/');
    const { options } = usePluginData('@apify/docs-theme');
    const location = useLocation();

    const subNavbars = options.subNavbars ?? (options.subNavbar ? [options.subNavbar] : []);
    const activeSubNavbar = subNavbars.find(
        (nav) => !nav.pathRegex || isRegexpStringMatch(nav.pathRegex, location.pathname),
    );

    return (
        <>
            {
                activeSubNavbar ? <>
                    <ul className="menu__list" style={{ marginBottom: '16px', borderBottom: '1px solid #e0e0e0', paddingBottom: '16px' }}>
                        <NavbarItem
                            key={'title'}
                            mobile
                            href={baseUrl}
                            label={activeSubNavbar.title}
                        />
                        {activeSubNavbar.items.map((item, i) => (
                            <NavbarItem
                                style={{ paddingLeft: '16px' }}
                                key={i}
                                mobile
                                {...item}
                            />
                        ))}
                    </ul>
                </> : null
            }
            <ul className="menu__list">
                <NavbarItem
                    key={'title2'}
                    mobile
                    label='Apify documentation'
                />
                {items.map((item, i) => (
                    <NavbarItem
                        mobile
                        style={{ paddingLeft: '16px' }}
                        {...item}
                        key={i}
                    />
                ))}
            </ul>
        </>
    );
}
