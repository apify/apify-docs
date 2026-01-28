import ApiItem from '@theme-original/ApiItem';
import LLMButtons from '@theme/LLMButtons';
import React, { useEffect, useRef } from 'react';

import styles from './styles.module.css';

/**
 * Wrapper component for the OpenAPI ApiItem that adds LLMButtons.
 * This avoids injecting the buttons into the markdown content which would
 * pollute search results.
 *
 * The buttons are rendered into a container that's positioned after the h1 heading
 * using a DOM manipulation approach since we can't modify the ApiItem internals.
 */
export default function ApiItemWrapper(props) {
    const buttonsRef = useRef(null);

    useEffect(() => {
        // Find the h1 heading and insert the buttons container after it
        const heading = document.querySelector('.theme-api-markdown .openapi__heading');
        const buttonsContainer = buttonsRef.current;

        if (heading && buttonsContainer) {
            // Insert the buttons after the heading
            heading.parentNode.insertBefore(buttonsContainer, heading.nextSibling);
        }

        // Cleanup: move the buttons back to prevent React warnings
        return () => {
            if (buttonsContainer && buttonsContainer.parentNode) {
                // The container will be removed with the component unmount
            }
        };
    }, []);

    return (
        <>
            <div ref={buttonsRef} className={styles.llmButtonsContainer}>
                <LLMButtons isApiReferencePage />
            </div>
            <ApiItem {...props} />
        </>
    );
}
