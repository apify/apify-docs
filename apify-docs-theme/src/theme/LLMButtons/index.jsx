import clsx from 'clsx';
import React, { useCallback, useState } from 'react';

import {
    AnthropicIcon,
    ChatGptIcon,
    CheckIcon,
    ChevronDownIcon,
    CopyIcon,
    ExternalLinkIcon,
    LoaderIcon,
    MarkdownIcon,
    PerplexityIcon,
} from '@apify/ui-icons';
import { Menu, Text, theme } from '@apify/ui-library';

import styles from './styles.module.css';

const DROPDOWN_OPTIONS = [
    {
        label: 'Copy for LLM',
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
        label: 'Copy MCP server',
        description: 'Copy Apify MCP configuration',
        showExternalIcon: false,
        Icon: CopyIcon,
        value: 'copyMcpServer',
    },
    {
        label: 'Connect to Cursor',
        description: 'Open MCP configurator for Cursor',
        showExternalIcon: true,
        Icon: ExternalLinkIcon,
        value: 'connectCursor',
    },
    {
        label: 'Connect to VS Code',
        description: 'Open MCP configurator for VS Code',
        showExternalIcon: true,
        Icon: ExternalLinkIcon,
        value: 'connectVsCode',
    },
    {
        label: 'Open in ChatGPT',
        description: 'Ask questions about this page',
        showExternalIcon: true,
        Icon: ChatGptIcon,
        value: 'openInChatGPT',
    },
    {
        label: 'Open in Claude',
        description: 'Ask questions about this page',
        showExternalIcon: true,
        Icon: AnthropicIcon,
        value: 'openInClaude',
    },
    {
        label: 'Open in Perplexity',
        description: 'Ask questions about this page',
        showExternalIcon: true,
        Icon: PerplexityIcon,
        value: 'openInPerplexity',
    },
];

const MCP_CONFIG_JSON = `{
    "mcpServers": {
        "apify": {
            "url": "https://mcp.apify.com/?tools=docs"
        }
    }
}`;

const getPrompt = (currentUrl) => `Read from ${currentUrl} so I can ask questions about it.`;
const getMarkdownUrl = (currentUrl) => {
    const url = new URL(currentUrl);
    url.pathname = `${url.pathname.replace(/\/$/, '')}.md`;
    return url.toString();
};

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
    } catch (error) {
        console.error('Failed to copy markdown content:', error);
    } finally {
        setTimeout(() => setCopyingStatus('idle'), 2000);
    }
};

const onCopyMcpServerClick = async () => {
    if (window.analytics) {
        window.analytics.track('Clicked', {
            app: 'docs',
            button_text: 'Copy MCP server',
            element: 'llm-buttons.copyMcpServer',
        });
    }

    try {
        await navigator.clipboard.writeText(MCP_CONFIG_JSON);
    } catch (error) {
        console.error('Failed to copy MCP configuration:', error);
    }
};

const openApifyMcpConfigurator = (integration) => {
    try {
        window.open(`https://mcp.apify.com/?integration=${integration}`, '_blank');
    } catch (error) {
        console.error('Error opening fallback URL:', error);
    }
};

const openMcpIntegration = async (integration, mcpUrl) => {
    // Try to open the app directly using URL scheme
    let appUrl;
    if (integration === 'cursor') {
        // Cursor deeplink format:
        // cursor://anysphere.cursor-deeplink/mcp/install?name=$NAME&config=$BASE64_JSON
        const cursorConfig = {
            url: mcpUrl,
        };
        const encodedConfig = btoa(JSON.stringify(cursorConfig));
        appUrl = `cursor://anysphere.cursor-deeplink/mcp/install?name=apify&config=${encodeURIComponent(encodedConfig)}`;
    } else if (integration === 'vscode') {
        // VS Code deeplink format: vscode:mcp/install?<url-encoded-json>
        // JSON structure: {"name":"Apify","type":"http","url":"<mcpUrl>"}
        const mcpConfig = {
            name: 'Apify',
            type: 'http',
            url: mcpUrl,
        };
        const encodedConfig = encodeURIComponent(JSON.stringify(mcpConfig));
        appUrl = `vscode:mcp/install?${encodedConfig}`;
    }

    if (appUrl) {
        try {
            window.open(appUrl, '_blank');
        } catch {
            // If deeplink fails, fallback to web configurator
            openApifyMcpConfigurator(integration);
        }
    } else {
        // Fallback to web configurator
        openApifyMcpConfigurator(integration);
    }
};

const onConnectCursorClick = () => {
    if (window.analytics) {
        window.analytics.track('Clicked', {
            app: 'docs',
            button_text: 'Connect to Cursor',
            element: 'llm-buttons.connectCursor',
        });
    }

    openMcpIntegration('cursor', 'https://mcp.apify.com/?tools=docs');
};

const onConnectVsCodeClick = () => {
    if (window.analytics) {
        window.analytics.track('Clicked', {
            app: 'docs',
            button_text: 'Connect to VS Code',
            element: 'llm-buttons.connectVsCode',
        });
    }

    openMcpIntegration('vscode', 'https://mcp.apify.com/?tools=docs');
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
            return 'Copied';
        default:
            return 'Copy for LLM';
    }
}

const MenuBase = ({
    children,
    ref,
    copyingStatus,
    setCopyingStatus,
    chevronIconRef,
    ...props
}) => (
    <div ref={ref} className={styles.llmButtonWrapper}>
        <div className={styles.llmButton}>
            <div
                className={styles.copyUpIconWrapper}
                onClick={() => onCopyAsMarkdownClick({ setCopyingStatus })}
            >
                {copyingStatus === 'loading' && <LoaderIcon size={16} />}
                {copyingStatus === 'copied' && <CheckIcon size={16} />}
                {copyingStatus === 'idle' && <CopyIcon size={16} />}
            </div>
            <Text
                size="regular"
                onClick={() => onCopyAsMarkdownClick({ setCopyingStatus })}
                className={styles.llmButtonText}
            >
                {getButtonText({ status: copyingStatus })}
            </Text>
            <div {...props} className={styles.chevronIconWrapper}>
                <ChevronDownIcon
                    size="16"
                    color={theme.color.neutral.icon}
                    className={styles.chevronIcon}
                    ref={chevronIconRef}
                />
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

export default function LLMButtons({ isApiReferencePage = false }) {
    const [copyingStatus, setCopyingStatus] = useState('idle');
    const chevronIconRef = React.useRef(null);

    const onMenuOptionClick = useCallback((value) => {
        switch (value) {
            case 'copyForLLM':
                onCopyAsMarkdownClick({ setCopyingStatus });
                break;
            case 'viewAsMarkdown':
                onViewAsMarkdownClick();
                break;
            case 'copyMcpServer':
                onCopyMcpServerClick();
                break;
            case 'connectCursor':
                onConnectCursorClick();
                break;
            case 'connectVsCode':
                onConnectVsCodeClick();
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
            className={clsx(styles.llmMenu, {
                [styles.llmMenuApiReferencePage]: isApiReferencePage,
            })}
            onMenuOpen={(isOpen) => chevronIconRef.current?.classList.toggle(
                styles.chevronIconOpen,
                isOpen,
            )
            }
            components={{
                MenuBase: (props) => (
                    <MenuBase
                        copyingStatus={copyingStatus}
                        setCopyingStatus={setCopyingStatus}
                        chevronIconRef={chevronIconRef}
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
