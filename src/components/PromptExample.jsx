import React, { useEffect, useRef, useState } from 'react';

import styles from './PromptExample.module.css';

export default function PromptExample({ children }) {
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef(null);
    const blockquoteRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleCopy = async () => {
        if (window.analytics) {
            window.analytics.track('Clicked', {
                app: 'docs',
                button_text: 'Copy prompt',
                element: 'prompt-example.copyButton',
            });
        }

        try {
            await navigator.clipboard.writeText(blockquoteRef.current.textContent);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            setCopied(true);
            timeoutRef.current = setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy prompt:', err);
        }
    };

    return (
        <div className={styles['prompt-example-container']}>
            <blockquote ref={blockquoteRef} className={styles['prompt-example']}>
                {children}
            </blockquote>
            <div className={styles['button-container']}>
                <button className={`${styles['copy-button']} ${copied ? styles.copied : ''}`} onClick={handleCopy}>
                    {copied ? 'Copied!' : 'Copy prompt'}
                </button>
            </div>
        </div>
    );
}
