import { useNavbarMobileSidebar, useThemeConfig } from '@docusaurus/theme-common/internal';
import IconClose from '@theme/Icon/Close';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import React from 'react';

import SearchBar from '../../../SearchBar';
import NavbarCTA from '../../CTA';

export default function NavbarMobileSidebarHeader() {
    const mobileSidebar = useNavbarMobileSidebar();

    const { navbar: { items } } = useThemeConfig();
    const searchBarItem = items.find((item) => item.type === 'search');

    return (
        <>
            <div className="navbar-sidebar__brand">
                <NavbarLogo />
                <button
                    type="button"
                    className="clean-btn navbar-sidebar__close"
                    onClick={() => mobileSidebar.toggle()}
                    aria-label="Close navigation bar"
                >
                    <IconClose />
                </button>
            </div>
            <div className="navbar-sidebar__actions">
                <div className="navbar-sidebar__actions__container">
                    <NavbarCTA />
                    {!searchBarItem && (
                        <NavbarSearch>
                            <SearchBar />
                        </NavbarSearch>
                    )}
                </div>
            </div>
        </>
    );
}
