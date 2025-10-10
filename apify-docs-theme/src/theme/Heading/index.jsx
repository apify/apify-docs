import { useThemeConfig } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import clsx from 'clsx';
import React from 'react';

import { LinkIcon } from '@apify/ui-icons';

import styles from './styles.module.css';
import { useCopyToClipboard } from './useCopyToClipboard';

export default function Heading({ as: As, id, ...props }) {
    const brokenLinks = useBrokenLinks();
    const {
        navbar: { hideOnScroll },
    } = useThemeConfig();

    const [isCopied, handleClick] = useCopyToClipboard({
        text: id ?? '',
        transform: (text) => {
            const url = new URL(window.location.href);
            url.hash = `#${text}`;
            return url.toString();
        },
    });

    // H1 headings shouldn't have the copy to clipboard button
    if (As === 'h1') {
        return <As {...props} />;
    }

    // Register the anchor ID so Docusaurus can scroll to it
    if (id) {
        brokenLinks.collectAnchor(id);
    }

    const anchorTitle = translate(
        {
            id: 'theme.common.headingLinkTitle',
            message: 'Direct link to {heading}',
            description: 'Title for link to heading',
        },
        {
            heading: typeof props.children === 'string' ? props.children : id,
        },
    );

    return (
        <As
            {...props}
            className={clsx(
                'anchor',
                hideOnScroll
                    ? styles.anchorWithHideOnScrollNavbar
                    : styles.anchorWithStickyNavbar,
                props.className,
            )}
            id={id}>
            {props.children}
            <a
                onClick={handleClick}
                href={`#${id}`}
                className={clsx(styles.headingCopyIcon, isCopied && styles.copied)}
                aria-label={anchorTitle}
            >
                <LinkIcon size="16" />
            </a>
        </As>
    );
}
