import React from 'react';

import CopyForLLM from './CopyForLLM';
import styles from './styles.module.css';
import ViewAsMarkdown from './ViewAsMarkdown';

export default function LLMButtons() {
    return (
        <div className={styles.llmButtonsContainer}>
            <CopyForLLM />
            <div className={styles.llmButtonsSeparator}></div>
            <ViewAsMarkdown />
        </div>
    );
}
