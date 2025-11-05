import React from 'react';

import { ExternalLinkIcon } from '@apify/ui-icons';
import { Text } from '@apify/ui-library';

import styles from './InstallMCPButton.module.css';

export default function InstallMCPButton({ link, label = 'Install MCP', children }) {
    if (!link) return null;

    return (
        <a href={link} className={styles.button} target="_blank" rel="noopener noreferrer">
            <div className={styles.wrapper}>
                <div className={styles.iconWrapper} aria-hidden>
                    <ExternalLinkIcon size={16} className={styles.icon} />
                </div>
                <Text
                    size="regular"
                    className={styles.label}
                >
                    {children || label}
                </Text>
            </div>
        </a>
    );
}
