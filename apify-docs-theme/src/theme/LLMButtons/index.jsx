import React, { useState } from 'react';

import {
    ChevronDownIcon,
    CopyIcon,
    ExternalLinkIcon,
    MarkdownIcon,
} from '@apify/ui-icons';
import { Menu, Text, theme } from '@apify/ui-library';

import styles from './styles.module.css';

function ButtonText({ isLoading, isCopied }) {
    if (isLoading) {
        return 'Copying...';
    }
    if (isCopied) {
        return 'Copied!';
    }
    return 'Copy for LLM';
}

export default function LLMButtons() {
    const [isCopyingLoading, setCopyingIsLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const currentUrl = window.location.href;
    const prompt = `Read from ${currentUrl} so I can ask questions about it.`;
    const markdownUrl = `${currentUrl}.md`;

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
            window.open(markdownUrl, '_blank');
        } catch (error) {
            console.error('Error opening markdown file:', error);
        }
    };

    const onOpenInChatGPTClick = () => {
        if (window.analytics) {
            window.analytics.track('Clicked', {
                app: 'docs',
                button_text: 'Open in ChatGPT',
                element: 'llm-buttons.openInChatGPT',
            });
        }

        try {
            window.open(`https://chatgpt.com/?hints=search&q=${encodeURIComponent(prompt)}`, '_blank');
        } catch (error) {
            console.error('Error opening ChatGPT:', error);
        }
    };

    const onOpenInClaudeClick = () => {
        if (window.analytics) {
            window.analytics.track('Clicked', {
                app: 'docs',
                button_text: 'Open in Claude',
                element: 'llm-buttons.openInClaude',
            });
        }

        try {
            window.open(`https://claude.ai/new?q=${encodeURIComponent(prompt)}`, '_blank');
        } catch (error) {
            console.error('Error opening Claude:', error);
        }
    };

    const onOpenInPerplexityClick = () => {
        if (window.analytics) {
            window.analytics.track('Clicked', {
                app: 'docs',
                button_text: 'Open in Perplexity',
                element: 'llm-buttons.openInPerplexity',
            });
        }

        try {
            window.open(`https://www.perplexity.ai/search/new?q=${encodeURIComponent(prompt)}`, '_blank');
        } catch (error) {
            console.error('Error opening Perplexity:', error);
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
            case 'openInChatGPT':
                onOpenInChatGPTClick();
                break;
            case 'openInClaude':
                onOpenInClaudeClick();
                break;
            case 'openInPerplexity':
                onOpenInPerplexityClick();
                break;
            default:
                break;
        }
    };

    return (
        <Menu
            components={{
                MenuBase: ({ children, ref, ...props }) => (
                    <div ref={ref} className={styles.llmButton}>
                        <CopyIcon size={16} />
                        <Text
                            size="regular"
                            className={styles.llmButtonText}
                            onClick={onCopyAsMarkdownClick}
                        >
                            <ButtonText isLoading={isCopyingLoading} isCopied={isCopied} />
                        </Text>
                        <ChevronDownIcon
                            {...props}
                            size="16"
                            color={theme.color.neutral.icon}
                            className={styles.chevronIcon}
                        />
                    </div>
                ),
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
                {
                    label: 'Open in ChatGPT',
                    description: 'Ask questions about this page',
                    showExternalIcon: true,
                    // TODO: Replace icon once we have one
                    icon: MarkdownIcon,
                    value: 'openInChatGPT',
                },
                {
                    label: 'Open in Claude',
                    description: 'Ask questions about this page',
                    showExternalIcon: true,
                    // TODO: Replace icon once we have one
                    icon: MarkdownIcon,
                    value: 'openInClaude',
                },
                {
                    label: 'Open in Perplexity',
                    description: 'Ask questions about this page',
                    showExternalIcon: true,
                    // TODO: Replace icon once we have one
                    icon: MarkdownIcon,
                    value: 'openInPerplexity',
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
