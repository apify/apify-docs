import React, { useState } from 'react';

import styles from './styles.module.css';
import { Menu, Text, theme, PlainMenuBaseComponent } from '@apify/ui-library';
import {
    CopyIcon,
    ExternalLinkIcon,
    MarkdownIcon,
    ChevronDownIcon,
} from '@apify/ui-icons';

export default function LLMButtons() {
    const [isCopyingLoading, setCopyingIsLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const onCopyAsMarkdownClick = async () => {
        if (window.analytics) {
            window.analytics.track('Clicked', {
                app: 'docs',
                button_text: 'Copy for LLM',
                element: 'llm-buttons.copyForLLM',
            });
        }

        try {
            setCopyingIsLoading(true);

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
            setCopyingIsLoading(false);
        }
    };

    const onViewAsMarkdownClick = () => {
        if (window.analytics) {
            window.analytics.track('Clicked', {
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

    const onMenuOptionClick = (value) => {
        switch (value) {
            case 'copyForLLM':
                onCopyAsMarkdownClick();
                break;
            case 'viewAsMarkdown':
                onViewAsMarkdownClick();
                break;
            default:
                break;
        }
    };

    return (
        <Menu
            components={{
                MenuBase: ({ children, ref, ...props }) => {
                    console.log(props);
                    return (
                        <div ref={ref} className={styles.llmButton}>
                            <CopyIcon size={16} />
                            <Text
                                size="regular"
                                className={styles.llmButtonText}
                                onClick={onCopyAsMarkdownClick}
                            >
                                {isCopyingLoading
                                    ? 'Copying...'
                                    : isCopied
                                    ? 'Copied!'
                                    : 'Copy for LLM'}
                            </Text>
                            <ChevronDownIcon
                                {...props}
                                size="16"
                                color={theme.color.neutral.icon}
                                className={styles.chevronIcon}
                            />
                        </div>
                    );
                },
            }}
            onSelect={onMenuOptionClick}
            options={[
                {
                    label: 'Copy page',
                    description: 'Copy page as Markdown for LLMs',
                    showExternalIcon: false,
                    icon: CopyIcon,
                    value: 'copyForLLM',
                },
                {
                    label: 'View as Markdown',
                    description: 'View this page as plain text',
                    showExternalIcon: true,
                    icon: MarkdownIcon,
                    value: 'viewAsMarkdown',
                },
            ]}
            renderOption={(option) => (
                <div className={styles.menuOption}>
                    <option.icon size={16} className={styles.menuOptionIcon} />
                    <div className={styles.menuOptionText}>
                        <Text size="regular">{option.label}</Text>
                        <Text
                            size="small"
                            color={theme.color.neutral.textSubtle}
                        >
                            {option.description}
                        </Text>
                    </div>
                    {option.showExternalIcon && (
                        <ExternalLinkIcon
                            size={16}
                            className={styles.menuOptionExternalIcon}
                        />
                    )}
                </div>
            )}
        />
    );
}
