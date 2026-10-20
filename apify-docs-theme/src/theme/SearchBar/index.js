// eslint-disable-next-line simple-import-sort/imports
import BrowserOnly from '@docusaurus/BrowserOnly';
import RouterLink from '@docusaurus/Link';
import { useHistory, useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useState, useCallback, useEffect } from 'react';

import { ApifySearch } from '@apify/docs-search-modal';
import { SparklesIcon } from './SparklesIcon';

// needs to be imported as the last thing, so that it can override the default styles
// TODO: update simple-import-sort to allow importing css as last.
import './styles.css';

/**
 * Tests whether the given href is pointing to the current docusaurus instance (so we can use the router link).
 */
function matchesCurrentInstance(href, baseUrl) {
    if (baseUrl === '/') {
        return (
            href.startsWith('/academy') ||
            href.startsWith('/get-started') ||
            href.startsWith('/actors') ||
            href.startsWith('/storage') ||
            href.startsWith('/proxy') ||
            href.startsWith('/account') ||
            href.startsWith('/integrations') ||
            href.startsWith('/security')
        );
    }

    return href.startsWith(baseUrl);
}

export function Link(props) {
    props = { ...props };

    if (props.href.startsWith('https://docs.apify.com')) {
        props.href = props.href.substring('https://docs.apify.com'.length);
    }

    const { siteConfig } = useDocusaurusContext();

    if (matchesCurrentInstance(props.href, siteConfig.baseUrl)) {
        return <RouterLink {...props}>{props.children}</RouterLink>;
    }

    return <a {...props}>{props.children}</a>;
}

const QUESTION_WORD_REGEX = /^(how|what|why|when|where|which|who|can|could|does|do|is|are|should|will|would)$/i;

/**
 * Heuristic: does the query look like a natural-language question?
 */
function isQuestion(q) {
    const text = q.trim();
    if (!text) return false;
    const words = text.split(/\s+/);
    if (words.length >= 6 || text.endsWith('?')) return true;
    return words.length >= 3 && QUESTION_WORD_REGEX.test(words[0]);
}

export default function SearchBar({ onClick }) {
    const { siteConfig } = useDocusaurusContext();
    const location = useLocation();
    const history = useHistory();

    // Combined search + AI box: flag question-like queries (styled in CSS) and send them to the AI on Cmd/Ctrl+Enter.
    useEffect(() => {
        const root = document.documentElement;
        root.dataset.searchMod = /mac|iphone|ipad|ipod/i.test(navigator.platform + navigator.userAgent)
            ? 'mac'
            : 'other';

        const updateQuestionFlag = (event) => {
            if (event.target instanceof Element && event.target.matches('.aa-Input')) {
                root.dataset.searchQuestion = isQuestion(event.target.value) ? 'true' : 'false';
            }
        };

        const onKeyDown = (event) => {
            if (!(event.target instanceof Element) || !event.target.matches('.aa-Input')) return;
            if (event.key !== 'Enter' || !(event.metaKey || event.ctrlKey)) return;
            if (!window.Kapa?.open) return;

            const query = event.target.value;
            event.preventDefault();
            event.stopImmediatePropagation();
            document.querySelector('.aa-DetachedCancelButton')?.click();
            window.Kapa.open({ mode: 'ai', query, submit: query.trim().length > 0 });
        };

        window.addEventListener('input', updateQuestionFlag, true);
        window.addEventListener('focusin', updateQuestionFlag, true);
        window.addEventListener('keydown', onKeyDown, true);

        return () => {
            window.removeEventListener('input', updateQuestionFlag, true);
            window.removeEventListener('focusin', updateQuestionFlag, true);
            window.removeEventListener('keydown', onKeyDown, true);
        };
    }, []);

    const navigate = useCallback(
        (href) => {
            const shortHref = href.substring('https://docs.apify.com'.length);

            if (matchesCurrentInstance(shortHref, siteConfig.baseUrl)) {
                return history.push(shortHref);
            }
            return window.location.assign(href);
        },
        [history, siteConfig.baseUrl],
    );

    const getVersion = useCallback(() => {
        const match = location.pathname.match(/\/(\d+\.\d+|next)/);

        return match ? match[1] : 'latest';
    }, [location]);

    return (
        <BrowserOnly>
            {() => (
                <div className="SearchButton-Container">
                    <div onClick={onClick} className="AlgoliaContainer" style={{ marginRight: '12px' }}>
                        <ApifySearch
                            algoliaAppId={siteConfig.themeConfig.algolia.appId}
                            algoliaIndexName="apify_sdk_v2"
                            algoliaKey={siteConfig.themeConfig.algolia.apiKey}
                            filters={`version:${getVersion()}`}
                            navigate={navigate}
                        />
                    </div>
                    <KapaAIButton />
                </div>
            )}
        </BrowserOnly>
    );
}

function KapaAIButton({ onClick }) {
    const [opened, setOpened] = useState(false);

    onClick = () => {
        if (opened) {
            return;
        }

        setOpened(true);

        if (window.Kapa && typeof window.Kapa.open === 'function') {
            window.Kapa.open();
            window.Kapa('onModalClose', () => {
                setOpened(false);
            });
        } else {
            console.error('Kapa.ai widget is not available.');
        }
    };

    return (
        <BrowserOnly>
            {() => (
                <div onClick={onClick}>
                    <button type="button" className="AskAI-Button" aria-label="Ask AI">
                        <SparklesIcon size={14} />
                        Ask AI
                    </button>
                </div>
            )}
        </BrowserOnly>
    );
}
