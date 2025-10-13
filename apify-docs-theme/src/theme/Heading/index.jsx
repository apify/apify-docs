import { useThemeConfig } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import clsx from 'clsx';
import React, { useEffect } from 'react';

import { LinkIcon } from '@apify/ui-icons';
import { useCopyToClipboard } from '@apify/ui-library';

import styles from './styles.module.css';

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

    // Register the anchor ID so Docusaurus can scroll to it
    useEffect(() => {
        if (id) {
            brokenLinks.collectAnchor(id);
        }
    }, [id, brokenLinks]);

    // H1 headings and headings without an id shouldn't have the copy to clipboard button
    if (As === 'h1' || !id) {
        return <As {...props} {...(id && { id })} />;
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
