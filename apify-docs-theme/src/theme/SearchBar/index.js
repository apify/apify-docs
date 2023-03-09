/* eslint-disable operator-linebreak,import/no-extraneous-dependencies */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { DocSearchButton, useDocSearchKeyboardEvents } from '@docsearch/react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import { useSearchPage } from '@docusaurus/theme-common/internal';
import { useAlgoliaContextualFacetFilters } from '@docusaurus/theme-search-algolia/client';
import { useActiveDocContext } from '@docusaurus/plugin-content-docs/client';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { createPortal } from 'react-dom';
import translations from '@theme/SearchTranslations';

let DocSearchModal = null;

function useLink(href, baseUrl) {
    if (baseUrl === '/') {
        return href.startsWith('/academy') || href.startsWith('/platform');
    }

    return href.startsWith(baseUrl);
}

function A(props) {
    props = { ...props };

    if (props.href.startsWith('https://docs.apify.com')) {
        props.href = props.href.substring('https://docs.apify.com'.length);
    }

    const { siteConfig } = useDocusaurusContext();
    if (useLink(props.href, siteConfig.baseUrl)) {
        return <Link {...props}>
            {props.children}
        </Link>;
    }

    return <a {...props}>{props.children}</a>;
}

function Hit({ hit, children }) {
    return <A href={hit.url}>{children}</A>;
}

function ResultsFooter({ state, onClose }) {
    const { generateSearchPageLink } = useSearchPage();
    return (
        <A href={generateSearchPageLink(state.query)} onClick={onClose}>
            <Translate
                id="theme.SearchBar.seeAll"
                values={{ count: state.context.nbHits }}>
                {'See all {count} results'}
            </Translate>
        </A>
    );
}

function mergeFacetFilters(f1, f2) {
    const normalize = (f) => (typeof f === 'string' ? [f] : f);
    return [...normalize(f1), ...normalize(f2)];
}

function DocSearch({ contextualSearch, externalUrlRegex, ...props }) {
    const { siteMetadata, siteConfig } = useDocusaurusContext();
    const contextualSearchFacetFilters = useAlgoliaContextualFacetFilters();
    const configFacetFilters = props.searchParameters?.facetFilters ?? [];
    const facetFilters = contextualSearch
        ? // Merge contextual search filters with config filters
        mergeFacetFilters(contextualSearchFacetFilters, configFacetFilters)
        : // ... or use config facetFilters
        configFacetFilters;

    const tags = facetFilters[facetFilters.length - 1];
    const docsPluginId = siteConfig.presets[0][1].docs.id ?? 'default';
    const activeDocContext = useActiveDocContext(docsPluginId);
    let version = tags[tags.length - 1].match(/-([^-]+)$/)?.[1];

    // normalize the latest version regardless of what number it has,
    // so we can search across all "latest versions of the docs"
    if (!version || !activeDocContext.activeVersion || activeDocContext.activeVersion.isLast) {
        version = 'latest';
    }

    tags.push(`docusaurus_tag:default-${version}`);

    // We let user override default searchParameters if she wants to
    const searchParameters = {
        ...props.searchParameters,
        facetFilters,
    };
    const searchContainer = useRef(null);
    const searchButtonRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [initialQuery, setInitialQuery] = useState(undefined);
    const importDocSearchModalIfNeeded = useCallback(() => {
        if (DocSearchModal) {
            return Promise.resolve();
        }
        return Promise.all([
            import('@docsearch/react/modal'),
            import('@docsearch/react/style'),
            import('./styles.css'),
        ]).then(([{ DocSearchModal: Modal }]) => {
            DocSearchModal = Modal;
        });
    }, []);
    const onOpen = useCallback(() => {
        importDocSearchModalIfNeeded().then(() => {
            searchContainer.current = document.createElement('div');
            document.body.insertBefore(
                searchContainer.current,
                document.body.firstChild,
            );
            setIsOpen(true);
        });
    }, [importDocSearchModalIfNeeded, setIsOpen]);
    const onClose = useCallback(() => {
        setIsOpen(false);
        searchContainer.current?.remove();
    }, [setIsOpen]);
    const onInput = useCallback(
        (event) => {
            importDocSearchModalIfNeeded().then(() => {
                setIsOpen(true);
                setInitialQuery(event.key);
            });
        },
        [importDocSearchModalIfNeeded, setIsOpen, setInitialQuery],
    );
    const navigator = useRef({
        navigate({ itemUrl }) {
            window.location.href = itemUrl;
        },
    }).current;
    const transformItems = useRef((items) => (items.map((item) => {
        if (item.url.startsWith(siteConfig.url)) {
            return { ...item, url: item.url.substring(siteConfig.url.length) };
        }
        return item;
    }))).current;
    const resultsFooterComponent = useMemo(
        () =>
            // eslint-disable-next-line react/no-unstable-nested-components,react/display-name,implicit-arrow-linebreak
            (footerProps) => <ResultsFooter {...footerProps} onClose={onClose}/>,
        [onClose],
    );
    const transformSearchClient = useCallback(
        (searchClient) => {
            searchClient.addAlgoliaAgent(
                'docusaurus',
                siteMetadata.docusaurusVersion,
            );
            return searchClient;
        },
        [siteMetadata.docusaurusVersion],
    );
    useDocSearchKeyboardEvents({
        isOpen,
        onOpen,
        onClose,
        onInput,
        searchButtonRef,
    });
    return (
        <>
            <Head>
                {/* This hints the browser that the website will load data from Algolia,
        and allows it to preconnect to the DocSearch cluster. It makes the first
        query faster, especially on mobile. */}
                <link
                    rel="preconnect"
                    href={`https://${props.appId}-dsn.algolia.net`}
                    crossOrigin="anonymous"
                />
            </Head>

            <DocSearchButton
                onTouchStart={importDocSearchModalIfNeeded}
                onFocus={importDocSearchModalIfNeeded}
                onMouseOver={importDocSearchModalIfNeeded}
                onClick={onOpen}
                ref={searchButtonRef}
                translations={translations.button}
            />

            {isOpen
                && DocSearchModal
                && searchContainer.current
                && createPortal(
                    <DocSearchModal
                        onClose={onClose}
                        initialScrollY={window.scrollY}
                        initialQuery={initialQuery}
                        navigator={navigator}
                        transformItems={transformItems}
                        hitComponent={Hit}
                        transformSearchClient={transformSearchClient}
                        {...(props.searchPagePath && {
                            resultsFooterComponent,
                        })}
                        {...props}
                        searchParameters={searchParameters}
                        placeholder={translations.placeholder}
                        translations={translations.modal}
                    />,
                    searchContainer.current,
                )}
        </>
    );
}

export default function SearchBar() {
    const { siteConfig } = useDocusaurusContext();
    return <DocSearch {...siteConfig.themeConfig.algolia} />;
}
