import React, { useState } from 'react';

import {
    ChevronDownIcon,
    CopyIcon,
    ExternalLinkIcon,
    MarkdownIcon,
} from '@apify/ui-icons';
import { Menu, Text, theme } from '@apify/ui-library';

import styles from './styles.module.css';

const DROPDOWN_OPTIONS = [
    {
        label: 'Copy page',
        description: 'Copy page as Markdown for LLMs',
        showExternalIcon: false,
        Icon: CopyIcon,
        value: 'copyForLLM',
    },
    {
        label: 'View as Markdown',
        description: 'View this page as plain text',
        showExternalIcon: true,
        Icon: MarkdownIcon,
        value: 'viewAsMarkdown',
    },
    {
        label: 'Open in ChatGPT',
        description: 'Ask questions about this page',
        showExternalIcon: true,
        // TODO: Replace icon once we have one
        Icon: MarkdownIcon,
        value: 'openInChatGPT',
    },
    {
        label: 'Open in Claude',
        description: 'Ask questions about this page',
        showExternalIcon: true,
        // TODO: Replace icon once we have one
        Icon: MarkdownIcon,
        value: 'openInClaude',
    },
    {
        label: 'Open in Perplexity',
        description: 'Ask questions about this page',
        showExternalIcon: true,
        // TODO: Replace icon once we have one
        Icon: MarkdownIcon,
        value: 'openInPerplexity',
    },
];

const onOpenInChatGPTClick = ({ prompt }) => {
    if (window.analytics) {
        window.analytics.track('Clicked', {
            app: 'docs',
            button_text: 'Open in ChatGPT',
            element: 'llm-buttons.openInChatGPT',
        });
    }

    try {
        window.open(
            `https://chatgpt.com/?hints=search&q=${encodeURIComponent(prompt)}`,
            '_blank',
        );
    } catch (error) {
        console.error('Error opening ChatGPT:', error);
    }
};

const onOpenInClaudeClick = ({ prompt }) => {
    if (window.analytics) {
        window.analytics.track('Clicked', {
            app: 'docs',
            button_text: 'Open in Claude',
            element: 'llm-buttons.openInClaude',
        });
    }

    try {
        window.open(
            `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
            '_blank',
        );
    } catch (error) {
        console.error('Error opening Claude:', error);
    }
};

const onOpenInPerplexityClick = ({ prompt }) => {
    if (window.analytics) {
        window.analytics.track('Clicked', {
            app: 'docs',
            button_text: 'Open in Perplexity',
            element: 'llm-buttons.openInPerplexity',
        });
    }

    try {
        window.open(
            `https://www.perplexity.ai/search/new?q=${encodeURIComponent(
                prompt,
            )}`,
            '_blank',
        );
    } catch (error) {
        console.error('Error opening Perplexity:', error);
    }
};

const onCopyAsMarkdownClick = async ({ setCopyingStatus, markdownUrl }) => {
    if (window.analytics) {
        window.analytics.track('Clicked', {
            app: 'docs',
            button_text: 'Copy for LLM',
            element: 'llm-buttons.copyForLLM',
        });
    }

    try {
        setCopyingStatus('loading');

        // Fetch the markdown content
        const response = await fetch(markdownUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch markdown: ${response.status}`);
        }

        const markdownContent = await response.text();

        // Copy to clipboard
        await navigator.clipboard.writeText(markdownContent);

        // Show success feedback
        setCopyingStatus('copied');
        setTimeout(() => setCopyingStatus('idle'), 2000);
    } catch (error) {
        console.error('Failed to copy markdown content:', error);
    } finally {
        setCopyingStatus('idle');
    }
};

const onViewAsMarkdownClick = ({ markdownUrl }) => {
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

function getButtonText({ status }) {
    switch (status) {
        case 'loading':
            return 'Copying...';
        case 'copied':
            return 'Copied!';
        default:
            return 'Copy for LLM';
    }
}

const MenuBase = ({
    children,
    ref,
    copyingStatus,
    setCopyingStatus,
    markdownUrl,
    ...props
}) => (
    <div ref={ref} className={styles.llmButtonWrapper}>
        <div className={styles.llmButton}>
            <div
                className={styles.copyUpIconWrapper}
                onClick={() => onCopyAsMarkdownClick({ setCopyingStatus, markdownUrl })
                }
            >
                <CopyIcon size={16} />
            </div>
            <Text
                size="regular"
                onClick={() => onCopyAsMarkdownClick({ setCopyingStatus, markdownUrl })
                }
                className={styles.llmButtonText}
            >
                {getButtonText({ status: copyingStatus })}
            </Text>
            <div {...props} className={styles.chevronIconWrapper}>
                <ChevronDownIcon size="16" color={theme.color.neutral.icon} />
            </div>
        </div>
    </div>
);

const Option = ({ Icon, label, description, showExternalIcon }) => (
    <div className={styles.menuOption}>
        <Icon size={16} className={styles.menuOptionIcon} />
        <div className={styles.menuOptionText}>
            <Text size="regular">{label}</Text>
            <Text size="small" color={theme.color.neutral.textSubtle}>
                {description}
            </Text>
        </div>
        {showExternalIcon && (
            <ExternalLinkIcon
                size={16}
                className={styles.menuOptionExternalIcon}
            />
        )}
    </div>
);

export default function LLMButtons() {
    const [copyingStatus, setCopyingStatus] = useState('idle');

    const currentUrl = window.location.href;
    const prompt = `Read from ${currentUrl} so I can ask questions about it.`;
    const markdownUrl = `${currentUrl}.md`;
    const onMenuOptionClick = (value) => {
        switch (value) {
            case 'copyForLLM':
                onCopyAsMarkdownClick({ setCopyingStatus, markdownUrl });
                break;
            case 'viewAsMarkdown':
                onViewAsMarkdownClick({ markdownUrl });
                break;
            case 'openInChatGPT':
                onOpenInChatGPTClick({ prompt });
                break;
            case 'openInClaude':
                onOpenInClaudeClick({ prompt });
                break;
            case 'openInPerplexity':
                onOpenInPerplexityClick({ prompt });
                break;
            default:
                break;
        }
    };

    return (
        <Menu
            className={styles.llmMenu}
            components={{
                MenuBase: (props) => (
                    <MenuBase
                        copyingStatus={copyingStatus}
                        setCopyingStatus={setCopyingStatus}
                        markdownUrl={markdownUrl}
                        {...props}
                    />
                ),
            }}
            onSelect={onMenuOptionClick}
            options={DROPDOWN_OPTIONS}
            renderOption={(props) => <Option {...props} />}
        />
    );
}
