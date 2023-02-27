import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import NavbarItem from '@theme/NavbarItem';

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
    const { options: { subNavbar } } = usePluginData('@apify/docs-theme');
    return (
        <>
            {
                subNavbar ? <>
                    <ul className="menu__list" style={{ marginBottom: '1rem', borderBottom: '1px solid #e0e0e0', paddingBottom: '1rem' }}>
                        <NavbarItem
                            key={'title'}
                            mobile
                            href={baseUrl}
                            label={subNavbar.title}
                        />
                        {subNavbar.items.map((item, i) => (
                            <NavbarItem
                                style={{ paddingLeft: '1rem' }}
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
                        style={{ paddingLeft: '1rem' }}
                        {...item}
                        key={i}
                    />
                ))}
            </ul>
        </>
    );
}
