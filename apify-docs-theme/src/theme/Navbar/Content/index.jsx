import { useLocation } from '@docusaurus/router';
import { useThemeConfig } from '@docusaurus/theme-common';
import {
    splitNavbarItems,
} from '@docusaurus/theme-common/internal';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarSearch from '@theme/Navbar/Search';
import NavbarItem from '@theme/NavbarItem';
import SearchBar from '@theme/SearchBar';
import React from 'react';

import { getActiveSubNavbar, useSubNavbars } from '../../subNavbarUtils';
import NavbarCTA from '../CTA';

function NavbarItems({ items }) {
    return (
        <>
            {items.map((item, i) => <NavbarItem {...item} key={i} />)}
        </>
    );
}

function NavbarContentLayout({
    left,
    right,
}) {
    return (
        <div className="navbar__inner">
            <div className="navbar__container">
                <div className="navbar__items">{left}</div>
                <div className="navbar__items navbar__items--right">{right}</div>
            </div>
        </div>
    );
}

function SubNavbarTitle({ titleIcon, title }) {
    return titleIcon
        ? <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <img src={`img/${titleIcon}`} width={24} height={24} /> {title}
        </div>
        : title;
}

function SubNavbar() {
    const subNavbars = useSubNavbars();
    const location = useLocation();
    const activeSubNavbar = getActiveSubNavbar(subNavbars, location.pathname);

    if (!activeSubNavbar) return null;

    return (
        <div className="navbar__inner navbar__sub">
            <div className="navbar__container">
                <div className="navbar__items">
                    <div className="navbar__sub--title">
                        <NavbarItem
                            label={<SubNavbarTitle title={activeSubNavbar.title} titleIcon={activeSubNavbar.titleIcon} />}
                            to={activeSubNavbar.to ?? '/'}
                            activeBaseRegex='(?!)'
                        />
                    </div>
                    <NavbarItems items={activeSubNavbar.items} />
                </div>
            </div>
        </div>
    );
}

export default function NavbarContent() {
    const { navbar: { items } } = useThemeConfig();
    const [leftItems, rightItems] = splitNavbarItems(items);
    const searchBarItem = items.find((item) => item.type === 'search');

    return (
        <div
            style={{
                width: '100%',
                height: 'fit-content',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <NavbarContentLayout
                left={
                    <>
                        <NavbarLogo />
                        <NavbarItems items={leftItems} />
                    </>
                }
                right={
                    <>
                        <NavbarItems items={rightItems} />
                        {!searchBarItem && (
                            <NavbarSearch>
                                <SearchBar />
                            </NavbarSearch>
                        )}
                        <NavbarCTA />
                        <NavbarMobileSidebarToggle />
                    </>
                }
            />
            <SubNavbar />
        </div>
    );
}
