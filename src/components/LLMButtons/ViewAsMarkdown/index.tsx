import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';

import styles from '../styles.module.css';

export default function ViewAsMarkdown() {
    const markdownIcon = useBaseUrl('/img/markdown.svg');

    const handleClick = () => {
        try {
            const currentUrl = window.location.href;
            const markdownUrl = `${currentUrl}.md`;
            window.open(markdownUrl, '_blank');
        } catch (error) {
            console.error('Error opening markdown file:', error);
        }
    };

    return (
        <button
            className={styles.llmButton}
            title="View as Markdown"
            onClick={handleClick}
        >
            <span
                className={styles.llmButtonIcon}
                style={{
                    backgroundImage: `url(${markdownIcon})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    display: 'inline-block',
                }}
                aria-label="View as Markdown"
            />
            View as Markdown
        </button>
    );
}
