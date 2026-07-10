import NavbarItem from '@theme/NavbarItem';
import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

// Override of the stock Docusaurus desktop dropdown. The only behavioral change:
// the dropdown label navigates when the item has a `to` OR an `href`. The stock
// component only navigates on `to` and calls preventDefault otherwise, which made
// an `href`-based label inert. Because the shared navbar uses absolute `href`s for
// cross-repo links, we need `href` labels to navigate so top-level items like "API"
// act as both a link (to /api) and a hover menu. Hover-open is unchanged (CSS).
export default function DropdownNavbarItemDesktop({ items, position, className, onClick, ...props }) {
    const dropdownRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!dropdownRef.current || dropdownRef.current.contains(event.target)) {
                return;
            }
            setShowDropdown(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        document.addEventListener('focusin', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
            document.removeEventListener('focusin', handleClickOutside);
        };
    }, [dropdownRef]);

    const hasLink = Boolean(props.to || props.href);

    return (
        <div
            ref={dropdownRef}
            className={clsx('navbar__item', 'dropdown', 'dropdown--hoverable', {
                'dropdown--right': position === 'right',
                'dropdown--show': showDropdown,
            })}
        >
            <NavbarNavLink
                aria-haspopup="true"
                aria-expanded={showDropdown}
                role="button"
                // Keep the focusable "#" fallback only when there is no real link target.
                href={hasLink ? undefined : '#'}
                className={clsx('navbar__link', className)}
                {...props}
                onClick={hasLink ? undefined : (e) => e.preventDefault()}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        setShowDropdown(!showDropdown);
                    }
                }}
            >
                {props.children ?? props.label}
            </NavbarNavLink>
            <ul className="dropdown__menu">
                {items.map((childItemProps, i) => (
                    <NavbarItem isDropdownItem activeClassName="dropdown__link--active" {...childItemProps} key={i} />
                ))}
            </ul>
        </div>
    );
}
