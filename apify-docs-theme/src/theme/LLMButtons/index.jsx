import React, { useCallback, useState } from 'react';

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

const getPrompt = (currentUrl) => `Read from ${currentUrl} so I can ask questions about it.`;
const getMarkdownUrl = (currentUrl) => `${currentUrl}.md`;

const onOpenInChatGPTClick = () => {
    if (window.analytics) {
        window.analytics.track('Clicked', {
            app: 'docs',
            button_text: 'Open in ChatGPT',
            element: 'llm-buttons.openInChatGPT',
        });
    }

    const prompt = getPrompt(window.location.href);

    try {
        window.open(
            `https://chatgpt.com/?hints=search&q=${encodeURIComponent(prompt)}`,
            '_blank',
        );
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

    const prompt = getPrompt(window.location.href);

    try {
        window.open(
            `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
            '_blank',
        );
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

    const prompt = getPrompt(window.location.href);

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

const onCopyAsMarkdownClick = async ({ setCopyingStatus }) => {
    if (window.analytics) {
        window.analytics.track('Clicked', {
            app: 'docs',
            button_text: 'Copy for LLM',
            element: 'llm-buttons.copyForLLM',
        });
    }

    const markdownUrl = getMarkdownUrl(window.location.href);

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

const onViewAsMarkdownClick = () => {
    if (window.analytics) {
        window.analytics.track('Clicked', {
            app: 'docs',
            button_text: 'View as Markdown',
            element: 'llm-buttons.viewAsMarkdown',
        });
    }

    const markdownUrl = getMarkdownUrl(window.location.href);

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
    ...props
}) => (
    <div ref={ref} className={styles.llmButtonWrapper}>
        <div className={styles.llmButton}>
            <div
                className={styles.copyUpIconWrapper}
                onClick={() => onCopyAsMarkdownClick({ setCopyingStatus })}
            >
                <CopyIcon size={16} />
            </div>
            <Text
                size="regular"
                onClick={() => onCopyAsMarkdownClick({ setCopyingStatus })}
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

    const onMenuOptionClick = useCallback((value) => {
        switch (value) {
            case 'copyForLLM':
                onCopyAsMarkdownClick({ setCopyingStatus });
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
    }, []);

    return (
        <Menu
            className={styles.llmMenu}
            components={{
                MenuBase: (props) => (
                    <MenuBase
                        copyingStatus={copyingStatus}
                        setCopyingStatus={setCopyingStatus}
                        {...props}
                    />
                ),
            }}
            onSelect={onMenuOptionClick}
            options={DROPDOWN_OPTIONS}
            renderOption={Option}
        />
    );
}
