import React from 'react';

import ThemedImage from '@theme/ThemedImage';
import { useColorMode } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';

import GitHubButton from 'react-github-btn';
import { theme } from '@apify-packages/ui-components';
import CardWithImageAndContent from '../CardWithImageAndContent/ImageWithContent';
import { Heading } from '../Heading';
import { Text } from '../Text';

import styles from './styles.module.css';

const OpenSourceCards: React.FC = () => {
    const { colorMode } = useColorMode();

    return (
        <>
            <CardWithImageAndContent
                height="27.2rem"
                image={
                    <ThemedImage
                        sources={{
                            light: useBaseUrl(
                                '/img/landing-pages/crawlee_with_background.svg',
                            ),
                            dark: useBaseUrl(
                                '/img/landing-pages/crawlee_with_background_dark.svg',
                            ),
                        }}
                        alt="Crawlee"
                    />
                }
                content={
                    <div className='cardContentWrapper'>
                        <Link to="https://crawlee.dev" className={styles.headingLink}>
                            <Heading type="titleM">Crawlee</Heading>
                        </Link>
                        <Text color={theme.color.neutral.textMuted}>
                            A web scraping and browser automation library.
                        </Text>
                        <GitHubButton
                            href="https://github.com/apify/crawlee"
                            data-color-scheme={
                                colorMode === 'dark'
                                    ? 'dark'
                                    : 'light'
                            }
                            data-size="large"
                            data-show-count="true"
                            aria-label="Star apify/crawlee on GitHub"
                        >
                            Star
                        </GitHubButton>
                    </div>
                }
            />
            <CardWithImageAndContent
                height="27.2rem"
                image={
                    <ThemedImage
                        sources={{
                            light: useBaseUrl(
                                '/img/landing-pages/got_scraping_with_background.svg',
                            ),
                            dark: useBaseUrl(
                                '/img/landing-pages/got_scraping_with_background_dark.svg',
                            ),
                        }}
                        alt="Got Scraping"
                    />
                }
                content={
                    <div className='cardContentWrapper'>
                        <Link to="https://github.com/apify/got-scraping" className={styles.headingLink}>
                            <Heading type="titleM">Got Scraping</Heading>
                        </Link>
                        <Text color={theme.color.neutral.textMuted}>
                            An HTTP client made for scraping based on Got.
                        </Text>
                        <GitHubButton
                            href="https://github.com/apify/got-scraping"
                            data-color-scheme={
                                colorMode === 'dark'
                                    ? 'dark'
                                    : 'light'
                            }
                            data-size="large"
                            data-show-count="true"
                            aria-label="Star apify/got-scraping on GitHub"
                        >
                            Star
                        </GitHubButton>
                    </div>
                }
            />
            <CardWithImageAndContent
                height="27.2rem"
                image={
                    <ThemedImage
                        sources={{
                            light: useBaseUrl(
                                '/img/landing-pages/fingerprint_suite_with_background.svg',
                            ),
                            dark: useBaseUrl(
                                '/img/landing-pages/fingerprint_suite_with_background_dark.svg',
                            ),
                        }}
                        alt="Fingerprint Suite"
                    />
                }
                content={
                    <div className='cardContentWrapper'>
                        <Link to="https://github.com/apify/fingerprint-suite" className={styles.headingLink}>
                            <Heading type="titleM">Fingerprint Suite</Heading>
                        </Link>
                        <Text color={theme.color.neutral.textMuted}>
                            Browser fingerprinting tools for anonymizing your
                            scrapers.
                        </Text>
                        <GitHubButton
                            href="https://github.com/apify/fingerprint-suite"
                            data-color-scheme={
                                colorMode === 'dark'
                                    ? 'dark'
                                    : 'light'
                            }
                            data-size="large"
                            data-show-count="true"
                            aria-label="Star apify/fingerprint-suite on GitHub"
                        >
                            Star
                        </GitHubButton>
                    </div>
                }
            />
        </>
    );
};

export default OpenSourceCards;
