import { useLocation } from '@docusaurus/router';
import { isRegexpStringMatch, useThemeConfig } from '@docusaurus/theme-common';
import {
    splitNavbarItems,
} from '@docusaurus/theme-common/internal';
import { usePluginData } from '@docusaurus/useGlobalData';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarSearch from '@theme/Navbar/Search';
import NavbarItem from '@theme/NavbarItem';
import React from 'react';

import SearchBar from '../../SearchBar';
import styles from './styles.module.css';

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
    const { options: { subNavbar } } = usePluginData('@apify/docs-theme');
    const location = useLocation();

    return (
        subNavbar && (!subNavbar?.pathRegex || isRegexpStringMatch(subNavbar.pathRegex, location.pathname)) ? (
            <div className="navbar__inner navbar__sub">
                <div className="navbar__container">
                    <div className="navbar__items">
                        <div className="navbar__sub--title">
                            <NavbarItem
                                label={<SubNavbarTitle title={subNavbar.title} titleIcon={subNavbar.titleIcon} />}
                                to={subNavbar.to ?? '/'}
                                activeBaseRegex='(?!)'
                            />
                        </div>
                        <NavbarItems items={subNavbar.items} />
                    </div>
                </div>
            </div>
        ) : null
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
                        <NavbarMobileSidebarToggle />
                        <NavbarLogo />
                        <NavbarItems items={leftItems} />
                    </>
                }
                right={
                    <>
                        <NavbarColorModeToggle className={styles.colorModeToggle} />
                        <NavbarItems items={rightItems} />
                        {!searchBarItem && (
                            <NavbarSearch>
                                <SearchBar />
                            </NavbarSearch>
                        )}
                    </>
                }
            />
            <SubNavbar />
        </div>
    );
}
