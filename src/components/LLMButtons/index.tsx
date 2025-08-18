import React from 'react';

import CopyForLLM from './CopyForLLM';
import styles from './styles.module.css';
import ViewAsMarkdown from './ViewAsMarkdown';

export default function LLMButtons() {
    return (
        <div className={styles.llmButtonsContainer}>
            <ViewAsMarkdown />
            <div className={styles.llmButtonsSeparator}></div>
            <CopyForLLM />
        </div>
    );
}
