import React, { useEffect, useRef, useState } from 'react';

import styles from './QuickStartPromptButton.module.css';

const PROMPT = `Follow this step-by-step workflow::

**Step 1: Verify Prerequisites**

First, verify the user's environment by running these commands:

\`\`\`bash
node --version # Requires Node.js 16 or higher
npm --version
apify --version # Check if Apify CLI is already installed
\`\`\`

If any prerequisites are missing, guide the user through installation before proceeding.

**Step 2: Install/Update Apify CLI**
\`\`\`bash
npm install -g apify-cli
\`\`\`

**Step 3: Create a New Actor**

Explain that this will prompt for actor name and template selection.

\`\`\`bash
apify create
\`\`\`

Direct users to explore templates at https://apify.com/templates.

**Step 4: Navigate to the Actor Directory**

\`\`\`bash
cd [actor-name] # Use the actual name they chose in step 3
\`\`\`

**Step 5: Run the Actor Locally**

Explain that this will run the actor locally.

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
        if (window.analytics) {
            window.analytics.track('Clicked', {
                app: 'docs',
                button_text: 'Copy prompt',
                element: 'quick-start-prompt-button.copyButton',
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
