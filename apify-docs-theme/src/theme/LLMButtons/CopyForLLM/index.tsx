import type React from 'react';
import { useState } from 'react';

import styles from '../styles.module.css';

// Custom component for button text
function ButtonText({ isLoading, isCopied }: { isLoading: boolean; isCopied: boolean }) {
    if (isLoading) {
        return 'Copying...';
    }
    if (isCopied) {
        return 'Copied!';
    }
    return 'Copy for LLM';
}

export default function CopyForLLM() {
    const [isLoading, setIsLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        if ((window as any).analytics) {
            (window as any).analytics.track('Clicked', {
                app: 'docs',
                button_text: 'Copy for LLM',
                element: 'llm-buttons.copyForLLM',
            });
        }

        try {
            setIsLoading(true);

            const currentUrl = window.location.href;
            const markdownUrl = `${currentUrl}.md`;

            // Fetch the markdown content
            const response = await fetch(markdownUrl);

            if (!response.ok) {
                throw new Error(`Failed to fetch markdown: ${response.status}`);
            }

            const markdownContent = await response.text();

            // Copy to clipboard
            await navigator.clipboard.writeText(markdownContent);

            // Show success feedback
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy markdown content:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            className={styles.llmButton}
            title="Copy for LLM"
            onClick={handleCopy}
            disabled={isLoading}
        >
            <span
                className={`${styles.llmButtonIcon} ${styles.llmButtonIconBackgroundCopy}`}
                aria-label="Copy for LLM"
            />
            <ButtonText isLoading={isLoading} isCopied={isCopied} />
        </button>
    );
}
