import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type React from 'react';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { CheckIcon, CopyIcon, SearchIcon, SparkleIcon } from '@apify/ui-icons';

import styles from './styles.module.css';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Kapa?: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dataLayer?: any[];
    }
}

const QUESTION_WORD_REGEX = /^(how|what|why|when|where|which|who|can|could|does|do|is|are|should|will|would)$/i;

const LOCAL_SECTIONS = [
    '/academy',
    '/get-started',
    '/actors',
    '/storage',
    '/proxy',
    '/account',
    '/integrations',
    '/security',
    '/mcp',
    '/console',
    '/legal',
];

const DEBOUNCE_MS = 150;

const AI_SETUP_PROMPT = 'Set up Apify for me — read and follow https://apify.com/agents.md';
const COPIED_FEEDBACK_MS = 2000;

const PLACEHOLDER_INTRO = 'Search the docs or ask a question…';
const PLACEHOLDER_EXAMPLES = [
    'How do I schedule an Actor to run every day?',
    'Proxy configuration',
    'Can I monetize my Actor?',
    'Dataset API',
    'How do I connect Apify to an MCP client?',
    'Webhooks',
    "What's the difference between an Actor and a task?",
];

const TYPE_MS = 45;
const DELETE_MS = 20;
const HOLD_MS = 1800;
const GAP_MS = 300;
const REDUCED_MOTION_HOLD_MS = 3000;

/**
 * Cycles through example queries with a typewriter effect.
 * Starts on the static intro text, so the server-rendered markup matches the first client render.
 */
function useRotatingPlaceholder(paused: boolean): string {
    const [text, setText] = useState(PLACEHOLDER_INTRO);

    useEffect(() => {
        if (paused) {
            return undefined;
        }
        const phrases = [PLACEHOLDER_INTRO, ...PLACEHOLDER_EXAMPLES];
        const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        let timer: ReturnType<typeof setTimeout>;
        let index = 0;

        if (reducedMotion) {
            const swap = () => {
                index = (index + 1) % phrases.length;
                setText(phrases[index]);
                timer = setTimeout(swap, REDUCED_MOTION_HOLD_MS);
            };
            timer = setTimeout(swap, REDUCED_MOTION_HOLD_MS);
            return () => clearTimeout(timer);
        }

        let { length } = PLACEHOLDER_INTRO;
        let deleting = true;
        const tick = () => {
            const phrase = phrases[index];
            if (deleting) {
                length -= 1;
                setText(phrase.slice(0, length));
                if (length === 0) {
                    deleting = false;
                    index = (index + 1) % phrases.length;
                    timer = setTimeout(tick, GAP_MS);
                } else {
                    timer = setTimeout(tick, DELETE_MS);
                }
                return;
            }
            length += 1;
            setText(phrase.slice(0, length));
            if (length === phrase.length) {
                deleting = true;
                timer = setTimeout(tick, HOLD_MS);
            } else {
                timer = setTimeout(tick, TYPE_MS);
            }
        };
        timer = setTimeout(tick, HOLD_MS);
        return () => clearTimeout(timer);
    }, [paused]);

    return text;
}

type Analytics = 'result_click' | 'ai_prompt_shown' | 'ai_open' | 'setup_copy';

interface Hit {
    url: string;
    hierarchy?: Record<string, string | null | undefined>;
    _snippetResult?: { content?: { value?: string } };
}

interface ResultRow {
    url: string;
    title: string;
    breadcrumb: string;
    snippet: string;
}

type Item = { kind: 'ai-prompt' } | { kind: 'ai-footer' } | { kind: 'result'; result: ResultRow };

export function isQuestion(q: string): boolean {
    const text = q.trim();
    if (!text) {
        return false;
    }
    const words = text.split(/\s+/);
    if (words.length >= 6 || text.endsWith('?')) {
        return true;
    }
    return words.length >= 3 && QUESTION_WORD_REGEX.test(words[0]);
}

function track(action: Analytics, query: string) {
    try {
        window.dataLayer?.push({ event: 'home_search', action, query });
    } catch {
        // Analytics must never break the UI.
    }
}

function toResultRow(hit: Hit): ResultRow {
    const levels = [0, 1, 2, 3, 4, 5, 6]
        .map((i) => hit.hierarchy?.[`lvl${i}`])
        .filter((v): v is string => typeof v === 'string' && v.length > 0);
    // Deepest non-null level is the title (lvl0 only when nothing deeper exists).
    const title = levels[levels.length - 1] ?? hit.url;
    const breadcrumbLevels = levels.slice(0, -1);
    return {
        url: hit.url,
        title,
        breadcrumb: breadcrumbLevels.join(' › '),
        snippet: hit._snippetResult?.content?.value ?? '',
    };
}

export default function HomeSearch() {
    const { siteConfig } = useDocusaurusContext();
    const history = useHistory();
    const { algolia } = siteConfig.themeConfig as { algolia?: { appId?: string; apiKey?: string } };
    const appId = algolia?.appId;
    const apiKey = algolia?.apiKey;

    const baseId = useId();
    const listId = `${baseId}-list`;
    const optionId = (index: number) => `${baseId}-opt-${index}`;

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const requestIdRef = useRef(0);
    const shownPromptsRef = useRef<Set<string>>(new Set());

    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [results, setResults] = useState<ResultRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [activeOverride, setActiveOverride] = useState<number | null>(null);
    const [isMac, setIsMac] = useState(true);

    const trimmed = query.trim();
    const question = isQuestion(query);
    const showDropdown = open && trimmed.length > 0;
    const placeholder = useRotatingPlaceholder(query.length > 0);

    useEffect(() => {
        const platform = `${navigator.platform || ''} ${navigator.userAgent || ''}`;
        setIsMac(/mac|iphone|ipad|ipod/i.test(platform));
    }, []);

    // Debounced Algolia search.
    useEffect(() => {
        if (!trimmed || !appId || !apiKey) {
            requestIdRef.current += 1;
            setResults([]);
            setLoading(false);
            setCompleted(false);
            return undefined;
        }
        const controller = new AbortController();
        const requestId = requestIdRef.current + 1;
        requestIdRef.current = requestId;
        setLoading(true);

        const timer = setTimeout(async () => {
            try {
                const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/apify_sdk_v2/query`, {
                    method: 'POST',
                    headers: {
                        'X-Algolia-Application-Id': appId,
                        'X-Algolia-API-Key': apiKey,
                    },
                    body: JSON.stringify({
                        query: trimmed,
                        hitsPerPage: 8,
                        filters: 'version:latest',
                        attributesToRetrieve: ['content', 'hierarchy', 'url', 'type'],
                        attributesToSnippet: ['content:20'],
                    }),
                    signal: controller.signal,
                });
                if (!response.ok) {
                    throw new Error(`Algolia responded with ${response.status}`);
                }
                const data = (await response.json()) as { hits?: Hit[] };
                if (requestIdRef.current !== requestId) {
                    return;
                }
                const seen = new Set<string>();
                const rows: ResultRow[] = [];
                for (const hit of data.hits ?? []) {
                    if (hit.url && !seen.has(hit.url)) {
                        seen.add(hit.url);
                        rows.push(toResultRow(hit));
                    }
                }
                setResults(rows);
                setLoading(false);
                setCompleted(true);
            } catch (error) {
                if ((error as Error).name === 'AbortError' || requestIdRef.current !== requestId) {
                    return;
                }
                setResults([]);
                setLoading(false);
                setCompleted(true);
            }
        }, DEBOUNCE_MS);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [trimmed, appId, apiKey]);

    // Reset keyboard selection to the default whenever the list changes.
    useEffect(() => {
        setActiveOverride(null);
    }, [results, question, trimmed]);

    const items: Item[] = useMemo(() => {
        const resultItems: Item[] = results.map((result) => ({ kind: 'result', result }));
        if (question) {
            return [{ kind: 'ai-prompt' }, ...resultItems];
        }
        return [...resultItems, { kind: 'ai-footer' }];
    }, [results, question]);

    const defaultIndex = useMemo(() => {
        const firstResult = items.findIndex((item) => item.kind === 'result');
        if (firstResult >= 0) {
            return firstResult;
        }
        return loading && !completed ? -1 : 0;
    }, [items, loading, completed]);

    const activeIndex = activeOverride ?? defaultIndex;

    // Fire `ai_prompt_shown` once per distinct query.
    const promptVisible = showDropdown && question;
    useEffect(() => {
        if (promptVisible && !shownPromptsRef.current.has(trimmed)) {
            shownPromptsRef.current.add(trimmed);
            track('ai_prompt_shown', trimmed);
        }
    }, [promptVisible, trimmed]);

    // Close on click outside.
    useEffect(() => {
        const onMouseDown = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', onMouseDown);
        return () => document.removeEventListener('mousedown', onMouseDown);
    }, []);

    const askAI = useCallback(() => {
        track('ai_open', trimmed);
        setOpen(false);
        if (window.Kapa?.open) {
            window.Kapa.open({ mode: 'ai', query: trimmed, submit: trimmed.length > 0 });
        } else {
            // eslint-disable-next-line no-console
            console.error('Kapa.ai widget is not available.');
        }
    }, [trimmed]);

    const openResult = useCallback(
        (result: ResultRow) => {
            track('result_click', trimmed);
            setOpen(false);
            let path = result.url;
            let local = false;
            try {
                const url = new URL(result.url);
                path = url.pathname + url.hash;
                local = LOCAL_SECTIONS.some((s) => url.pathname === s || url.pathname.startsWith(`${s}/`));
            } catch {
                // Keep the raw URL and do a full navigation.
            }
            if (local) {
                history.push(path);
            } else {
                window.location.assign(path);
            }
        },
        [history, trimmed],
    );

    const activate = useCallback(
        (item: Item | undefined) => {
            if (!item) {
                return;
            }
            if (item.kind === 'result') {
                openResult(item.result);
            } else {
                askAI();
            }
        },
        [openResult, askAI],
    );

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case 'ArrowDown':
            case 'ArrowUp': {
                event.preventDefault();
                if (!trimmed) {
                    return;
                }
                if (!open) {
                    setOpen(true);
                    return;
                }
                if (items.length === 0) {
                    return;
                }
                const step = event.key === 'ArrowDown' ? 1 : -1;
                const base = activeIndex < 0 ? (step === 1 ? -1 : 0) : activeIndex;
                setActiveOverride((base + step + items.length) % items.length);
                break;
            }
            case 'Enter': {
                if (!trimmed) {
                    return;
                }
                event.preventDefault();
                if (event.metaKey || event.ctrlKey) {
                    askAI();
                } else if (showDropdown) {
                    activate(items[activeIndex]);
                }
                break;
            }
            case 'Escape': {
                if (showDropdown) {
                    setOpen(false);
                } else if (query) {
                    setQuery('');
                }
                break;
            }
            default:
        }
    };

    const modKey = isMac ? '⌘' : 'Ctrl';
    const hasNoResults = completed && !loading && results.length === 0;

    const renderAiRow = (index: number, kind: 'ai-prompt' | 'ai-footer') => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <li
            key={kind}
            id={optionId(index)}
            role="option"
            aria-selected={index === activeIndex}
            className={`${styles.item} ${kind === 'ai-prompt' ? styles.aiPrompt : styles.aiFooter} ${
                index === activeIndex ? styles.active : ''
            }`}
            onMouseDown={(e) => e.preventDefault()}
            onMouseEnter={() => setActiveOverride(index)}
            onClick={askAI}
        >
            <SparkleIcon size="20" className={styles.rowIcon} />
            <span className={styles.aiText}>
                {kind === 'ai-prompt'
                    ? 'Looks like a question. Ask the Docs AI assistant'
                    : `Ask AI about "${trimmed}"`}
            </span>
            {kind === 'ai-prompt' && <kbd className={styles.chip}>{`${modKey} ↵`}</kbd>}
        </li>
    );

    const [copied, setCopied] = useState(false);
    useEffect(() => {
        if (!copied) {
            return undefined;
        }
        const timer = setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
        return () => clearTimeout(timer);
    }, [copied]);

    const copySetupPrompt = async () => {
        track('setup_copy', '');
        try {
            await navigator.clipboard.writeText(AI_SETUP_PROMPT);
            setCopied(true);
        } catch {
            // eslint-disable-next-line no-console
            console.error('Could not copy the setup prompt to the clipboard.');
        }
    };

    const onSearchClick = () => {
        if (!trimmed) {
            inputRef.current?.focus();
            return;
        }
        if (results.length > 0) {
            activate(items[activeIndex]);
            return;
        }
        setOpen(true);
        inputRef.current?.focus();
    };

    return (
        <div className={styles.root} ref={containerRef}>
            <div className={styles.row}>
                <div className={styles.fieldWrap}>
                    <div className={styles.field}>
                        <SearchIcon size="20" className={styles.searchIcon} />
                        <div className={styles.inputWrap}>
                            <input
                                ref={inputRef}
                                type="text"
                                className={styles.input}
                                value={query}
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck={false}
                                role="combobox"
                                aria-expanded={showDropdown}
                                aria-controls={listId}
                                aria-activedescendant={
                                    showDropdown && activeIndex >= 0 ? optionId(activeIndex) : undefined
                                }
                                aria-autocomplete="list"
                                aria-label="Search documentation or ask AI"
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setOpen(true);
                                }}
                                onFocus={() => setOpen(true)}
                                onBlur={() => setOpen(false)}
                                onKeyDown={onKeyDown}
                            />
                            {!query && (
                                <span className={styles.placeholder} aria-hidden="true">
                                    {placeholder}
                                </span>
                            )}
                        </div>
                    </div>
                    {showDropdown && (
                        <div className={styles.dropdown}>
                            {loading && results.length === 0 && !completed && (
                                <div className={styles.status}>Searching…</div>
                            )}
                            {hasNoResults && <div className={styles.status}>{`No results for "${trimmed}"`}</div>}
                            <ul id={listId} role="listbox" className={styles.list} aria-label="Search results">
                                {items.map((item, index) => {
                                    if (item.kind !== 'result') {
                                        return renderAiRow(index, item.kind);
                                    }
                                    const { result } = item;
                                    return (
                                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                                        <li
                                            key={result.url}
                                            id={optionId(index)}
                                            role="option"
                                            aria-selected={index === activeIndex}
                                            className={`${styles.item} ${styles.result} ${
                                                index === activeIndex ? styles.active : ''
                                            }`}
                                            onMouseDown={(e) => e.preventDefault()}
                                            onMouseEnter={() => setActiveOverride(index)}
                                            onClick={() => openResult(result)}
                                        >
                                            <div className={styles.resultBody}>
                                                <div className={styles.resultTitle}>{result.title}</div>
                                                {result.breadcrumb && (
                                                    <div className={styles.breadcrumb}>{result.breadcrumb}</div>
                                                )}
                                                {result.snippet && (
                                                    <div
                                                        className={styles.snippet}
                                                        // Algolia escapes the snippet and only adds highlight spans.
                                                        // eslint-disable-next-line react/no-danger
                                                        dangerouslySetInnerHTML={{ __html: result.snippet }}
                                                    />
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
                <button
                    type="button"
                    className={styles.searchButton}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={onSearchClick}
                >
                    Search
                </button>
            </div>

            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.askButton}
                    onClick={copySetupPrompt}
                    title={AI_SETUP_PROMPT}
                    aria-label={copied ? 'Setup prompt copied' : 'Copy setup prompt for your AI agent'}
                >
                    {copied ? (
                        <CheckIcon size="16" className={styles.askIcon} />
                    ) : (
                        <CopyIcon size="16" className={styles.askIcon} />
                    )}
                    {copied ? 'Copied' : 'Copy setup for AI'}
                </button>
            </div>

            <p className={styles.hint}>{`Press ↵ to search · ${modKey} ↵ to ask AI`}</p>
        </div>
    );
}
