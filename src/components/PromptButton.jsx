import React, { useEffect, useRef, useState } from 'react';

import { QUICK_START_PROMPT } from '../utils/ai-prompts';
import styles from './PromptButton.module.css';

export default function PromptButton({ prompt = QUICK_START_PROMPT, title = 'Use pre-built prompt to get started faster.' }) {
    const [copied, setCopied] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    const timeoutRef = useRef(null);

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
                element: 'prompt-button.copyButton',
            });
        }

        try {
            await navigator.clipboard.writeText(prompt);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            setCopied(true);
            timeoutRef.current = setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy prompt:', err);
        }
    };

    const togglePrompt = () => {
        setShowPrompt(!showPrompt);
    };

    return (
        <>
            <div className={styles['prompt-card']}>
                <div className={styles['prompt-content']}>
                    <div className={styles['prompt-text']}>
                        <span>{title}</span>
                    </div>
                </div>
                <div className={styles['button-container']}>
                    <button
                        className={styles['toggle-button']}
                        onClick={togglePrompt}
                    >
                        {showPrompt ? 'Hide the prompt' : 'Show the prompt'}
                    </button>
                    <button
                        className={`${styles['copy-button']} ${copied ? styles.copied : ''}`}
                        onClick={handleCopy}
                    >
                        {copied ? 'Copied!' : 'Copy prompt'}
                    </button>
                </div>
            </div>
            {showPrompt && (
                <div className={styles['full-prompt-container']}>
                    <div className={styles['full-prompt']}>
                        <pre>{prompt}</pre>
                    </div>
                </div>
            )}
        </>
    );
}
