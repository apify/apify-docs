import React from 'react';

import styles from '../styles.module.css';

export default function ViewAsMarkdown() {
    const handleClick = () => {
        if ((window as any).analytics) {
            (window as any).analytics.track('Clicked', {
                app: 'docs',
                button_text: 'View as Markdown',
                element: 'llm-buttons.viewAsMarkdown',
            });
        }
        
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
                className={`${styles.llmButtonIcon} ${styles.llmButtonIconBackgroundMarkdown}`}
                aria-label="View as Markdown"
            />
            View as Markdown
        </button>
    );
}
