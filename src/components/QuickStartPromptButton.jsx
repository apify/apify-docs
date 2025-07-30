import React, { useState, useRef, useEffect } from 'react';
import styles from './QuickStartPromptButton.module.css';

const PROMPT = `Go step by step to create an Apify Actor:

**Step 1: Verify Prerequisites**
Ask the user for permission to prompt in the terminal:
\`\`\`bash
node --version # (should be 16 or higher)
npm --version
apify --version # (to check if Apify CLI is installed)
\`\`\`

**Step 2: Install Apify CLI (if needed)**
\`\`\`bash
npm install -g apify-cli
\`\`\`

**Step 3: Create a New Actor**
\`\`\`bash
apify create
\`\`\`
Show the user a message about https://apify.com/templates where it is possible to find all the templates.

**Step 4: Navigate to the Actor Directory**
\`\`\`bash
cd <new-directory> # your actor directory
\`\`\`

**Step 5: Run the Actor Locally**
\`\`\`bash
apify run
\`\`\`
`;

export default function QuickStartPromptButton({ prompt = PROMPT }) {
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
            <div className={styles['quick-start-prompt-card']}>
                <div className={styles['prompt-content']}>
                    <div className={styles['prompt-text']}>
                        <span>Use this pre-built prompt to get started faster.</span>
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
                        className={`${styles['copy-button']} ${copied ? styles['copied'] : ''}`}
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
