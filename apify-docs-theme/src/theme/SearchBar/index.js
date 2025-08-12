// eslint-disable-next-line simple-import-sort/imports
import BrowserOnly from '@docusaurus/BrowserOnly';
import RouterLink from '@docusaurus/Link';
// import { useHistory, useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

// import { ApifySearch } from '@apify/docs-search-modal';
import { ControlKeyIcon, SearchIcon } from '@apify/docs-search-modal/dist/utils/icons';

// needs to be imported as the last thing, so that it can override the default styles
// TODO: update simple-import-sort to allow importing css as last.
import './styles.css';

/**
 * Tests whether the given href is pointing to the current docusaurus instance (so we can use the router link).
 */
function matchesCurrentInstance(href, baseUrl) {
    if (baseUrl === '/') {
        return href.startsWith('/academy') || href.startsWith('/platform');
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
        return <RouterLink {...props}>
            {props.children}
        </RouterLink>;
    }

    return <a {...props}>{props.children}</a>;
}

// export default function SearchBar({ onClick }) {
//     const { siteConfig } = useDocusaurusContext();
//     const location = useLocation();
//     const history = useHistory();
//
//     const navigate = useCallback((href) => {
//         const shortHref = href.substring('https://docs.apify.com'.length);
//
//         if (matchesCurrentInstance(shortHref, siteConfig.baseUrl)) {
//             return history.push(shortHref);
//         }
//         return window.location.assign(href);
//     }, [history, siteConfig.baseUrl]);
//
//     const getVersion = useCallback(() => {
//         const match = location.pathname.match(/\/(\d+\.\d+|next)/);
//
//         return match ? match[1] : 'latest';
//     }, [location]);
//
//     return (
//         <BrowserOnly>
//             {() => (
//                 <div onClick={onClick}>
//                     <ApifySearch
//                         algoliaAppId={siteConfig.themeConfig.algolia.appId}
//                         algoliaIndexName='apify_sdk_v2'
//                         algoliaKey={siteConfig.themeConfig.algolia.apiKey}
//                         filters={`version:${getVersion()}`}
//                         navigate={navigate}
//                     />
//                 </div>
//             )}
//         </BrowserOnly>
//     );
// }

export default function SearchBar({ onClick }) {
    const [variant, setVariant] = useState(null);
    const [opened, setOpened] = useState(false);
    const { siteConfig } = useDocusaurusContext();
    const { inkeepApiKey } = siteConfig.customFields;

    useEffect(() => {
        const storedVariant = localStorage.getItem('search-provider');

        if (storedVariant) {
            setVariant(storedVariant);
        } else {
            const assignedVariant = Math.random() < 0.5 ? 'inkeep' : 'kapa';
            localStorage.setItem('search-provider', assignedVariant);
            setVariant(assignedVariant);
        }
    }, []);

    onClick = () => {
        if (opened) {
            return;
        }

        setOpened(true);

        if (variant === 'kapa') {
            if (window.Kapa && typeof window.Kapa.open === 'function') {
                window.Kapa.open();
                window.Kapa('onModalClose', () => {
                    setOpened(false);
                });
            } else {
                console.error('Kapa.ai widget is not available.');
            }
            return;
        }

        if (variant !== 'inkeep') {
            console.warn('Unknown search variant:', variant);
            return;
        }

        if (window.Inkeep) {
            const config = {
                baseSettings: {
                    apiKey: inkeepApiKey,
                    organizationDisplayName: 'Apify',
                    primaryBrandColor: '#FF9013',
                    transformSource: (source) => {
                        function getTabForSource(source) {
                            if (source.url.includes('help.apify.com')) {
                                return 'Help';
                            }
                            return 'Docs';
                        }

                        if (source.contentType === 'documentation') {
                            return {
                                ...source,
                                tabs: [...(source.tabs || []), getTabForSource(source)],
                            };
                        }
                        return source;
                    },
                    trigger: {
                        disableDefaultTrigger: true,
                    },
                    theme: {
                        styles: [
                            {
                                key: 'main',
                                type: 'link',
                                value: '/inkeep-overrides.css',
                            },
                        ],
                    },
                },
                modalSettings: {
                    onOpenChange: handleOpenChange,
                },
                searchSettings: {
                    tabs: [
                        'All',
                        'Docs',
                        'Help',
                        'Publications',
                        'PDFs',
                        'GitHub',
                        'Forums',
                        'Discord',
                        'Slack',
                        'StackOverflow',
                    ],
                },
                aiChatSettings: {
                    aiAssistantAvatar: 'https://intercom.help/apify/assets/favicon',
                    chatSubjectName: 'Apify',
                    exampleQuestions: [
                        'What is an Actor?',
                        'How to use my own proxies?',
                        'How to integrate Apify Actors with GitHub?',
                        'How to share key-value stores between runs?',
                    ],
                    getHelpOptions: [
                        {
                            action: {
                                type: 'open_link',
                                url: 'https://apify.com/contact',
                            },
                            icon: {
                                builtIn: 'IoChatbubblesOutline',
                            },
                            name: 'Contact Us',
                        },
                    ],
                },
                defaultView: 'chat',
            };
            const modal = window.Inkeep.ModalSearchAndChat(config);

            function handleOpenChange(newOpen) {
                modal.update({ modalSettings: { isOpen: newOpen } });
                setOpened(newOpen);
            }

            modal.update({ modalSettings: { isOpen: true } });
        } else {
            console.error('Inkeep widget is not available.');
        }
    };

    const [key, setKey] = useState(null);

    useEffect(() => {
        if (typeof navigator !== 'undefined') {
            const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
            setKey(isMac ? '⌘' : 'ctrl');
        }
    }, []);

    useHotkeys('mod+k, /', () => {
        onClick();
    }, { preventDefault: true });

    return (
        <BrowserOnly>
            {() => (
                <div onClick={onClick}>
                    <button type="button" className="DocSearch DocSearch-Button" aria-label="Search">
                        <span className="DocSearch-Button-Container">
                            <SearchIcon/>
                            <span className="DocSearch-Button-Placeholder">Search</span>
                        </span>
                        <span className="DocSearch-Button-Keys">
                            {key !== null && (<>
                                <kbd className={clsx(key === 'ctrl' ? 'ctrl' : 'cmd', 'DocSearch-Button-Key')}>
                                    {key === 'ctrl' ? <ControlKeyIcon/> : key}
                                </kbd>
                                <kbd className="DocSearch-Button-Key">K</kbd>
                            </>)}
                        </span>

                    </button>
                </div>
            )}
        </BrowserOnly>
    );
}
