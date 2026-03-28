import { useLocation } from '@docusaurus/router';
import { useThemeConfig } from '@docusaurus/theme-common';
import NavbarItem from '@theme/NavbarItem';
import React from 'react';

import { getActiveSubNavbar, useSubNavbars } from '../../../subNavbarUtils';

function useNavbarItems() {
    // TODO temporary casting until ThemeConfig type is improved
    return useThemeConfig().navbar.items;
}
// The primary menu displays the navbar items
export default function NavbarMobilePrimaryMenu() {
    const items = useNavbarItems();
    const subNavbars = useSubNavbars();
    const { pathname } = useLocation();
    const activeSubNavbar = getActiveSubNavbar(subNavbars, pathname);
    return (
        <>
            {
                activeSubNavbar ? (
                    <ul className="menu__list" style={{ marginBottom: '16px', borderBottom: '1px solid #e0e0e0', paddingBottom: '16px' }}>
                        <NavbarItem
                            key={'title'}
                            mobile
                            to={activeSubNavbar.to ?? '/'}
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
                ) : null
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
