import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import type React from 'react';
import GitHubButton from 'react-github-btn';

import { theme } from '@apify/ui-library';

import CardWithImageAndContent from '../CardWithImageAndContent/ImageWithContent';
import { Heading } from '../Heading';
import { Text } from '../Text';
import styles from './styles.module.css';

const OpenSourceCards: React.FC = () => {
    const { colorMode } = useColorMode();

    return (
        <>
            <CardWithImageAndContent
                image={
                    <Link to="https://crawlee.dev" className={styles.imageLink}>
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
                    </Link>
                }
                content={
                    <div className='cardContentWrapper'>
                        <div className="cardContentWrapperText">
                            <Link to="https://crawlee.dev" className={styles.headingLink}>
                                <Heading type="titleM">Crawlee</Heading>
                            </Link>
                            <Text color={theme.color.neutral.textMuted}>
                                Web crawling, scraping, and browser automation library for Node.js and Python with autoscaling and proxies.
                            </Text>
                        </div>
                        <div className={styles.githubButtonWrapper}>
                            <GitHubButton
                                href="https://github.com/apify/crawlee"
                                data-color-scheme={colorMode}
                                data-size="large"
                                data-show-count="true"
                                aria-label="Star apify/crawlee on GitHub"
                            >
                                Star
                            </GitHubButton>
                        </div>
                    </div>
                }
            />
            <CardWithImageAndContent
                image={
                    <Link to="https://github.com/apify/fingerprint-suite" className={styles.imageLink}>
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
                    </Link>
                }
                content={
                    <div className="cardContentWrapper">
                        <div className="cardContentWrapperText">
                            <Link to="https://github.com/apify/fingerprint-suite" className={styles.headingLink}>
                                <Heading type="titleM">Fingerprint Suite</Heading>
                            </Link>
                            <Text color={theme.color.neutral.textMuted}>
                                Toolkit for generating and injecting realistic browser fingerprints into Playwright and Puppeteer.
                            </Text>
                        </div>
                        <div className={styles.githubButtonWrapper}>
                            <GitHubButton
                                href="https://github.com/apify/fingerprint-suite"
                                data-color-scheme={colorMode}
                                data-size="large"
                                data-show-count="true"
                                aria-label="Star apify/fingerprint-suite on GitHub"
                            >
                                Star
                            </GitHubButton>
                        </div>
                    </div>
                }
            />
            <CardWithImageAndContent
                image={
                    <Link to="https://github.com/apify/impit" className={styles.imageLink}>
                        <div className={styles.placeholderImage}>
                            <span>impit</span>
                        </div>
                    </Link>
                }
                content={
                    <div className="cardContentWrapper">
                        <div className="cardContentWrapperText">
                            <Link to="https://github.com/apify/impit" className={styles.headingLink}>
                                <Heading type="titleM">impit</Heading>
                            </Link>
                            <Text color={theme.color.neutral.textMuted}>
                                Rust-based HTTP client with browser impersonation. Bindings for Node.js, Python, and CLI.
                            </Text>
                        </div>
                        <div className={styles.githubButtonWrapper}>
                            <GitHubButton
                                href="https://github.com/apify/impit"
                                data-color-scheme={colorMode}
                                data-size="large"
                                data-show-count="true"
                                aria-label="Star apify/impit on GitHub"
                            >
                                Star
                            </GitHubButton>
                        </div>
                    </div>
                }
            />
            <CardWithImageAndContent
                image={
                    <Link to="https://github.com/apify/mcp-cli" className={styles.imageLink}>
                        <div className={styles.placeholderImage}>
                            <span>mcpc</span>
                        </div>
                    </Link>
                }
                content={
                    <div className="cardContentWrapper">
                        <div className="cardContentWrapperText">
                            <Link to="https://github.com/apify/mcp-cli" className={styles.headingLink}>
                                <Heading type="titleM">mcpc</Heading>
                            </Link>
                            <Text color={theme.color.neutral.textMuted}>
                                Command-line client for the Model Context Protocol (MCP) for exploration, scripting, and code mode.
                            </Text>
                        </div>
                        <div className={styles.githubButtonWrapper}>
                            <GitHubButton
                                href="https://github.com/apify/mcp-cli"
                                data-color-scheme={colorMode}
                                data-size="large"
                                data-show-count="true"
                                aria-label="Star apify/mcp-cli on GitHub"
                            >
                                Star
                            </GitHubButton>
                        </div>
                    </div>
                }
            />
            <CardWithImageAndContent
                image={
                    <Link to="https://github.com/apify/proxy-chain" className={styles.imageLink}>
                        <div className={styles.placeholderImage}>
                            <span>proxy-chain</span>
                        </div>
                    </Link>
                }
                content={
                    <div className="cardContentWrapper">
                        <div className="cardContentWrapperText">
                            <Link to="https://github.com/apify/proxy-chain" className={styles.headingLink}>
                                <Heading type="titleM">proxy-chain</Heading>
                            </Link>
                            <Text color={theme.color.neutral.textMuted}>
                                Node.js proxy server with SSL, authentication, and upstream proxy chaining.
                            </Text>
                        </div>
                        <div className={styles.githubButtonWrapper}>
                            <GitHubButton
                                href="https://github.com/apify/proxy-chain"
                                data-color-scheme={colorMode}
                                data-size="large"
                                data-show-count="true"
                                aria-label="Star apify/proxy-chain on GitHub"
                            >
                                Star
                            </GitHubButton>
                        </div>
                    </div>
                }
            />
            <CardWithImageAndContent
                image={
                    <Link to="https://whitepaper.actor" className={styles.imageLink}>
                        <div className={styles.placeholderImage}>
                            <span>Actor whitepaper</span>
                        </div>
                    </Link>
                }
                content={
                    <div className="cardContentWrapper">
                        <div className="cardContentWrapperText">
                            <Link to="https://whitepaper.actor" className={styles.headingLink}>
                                <Heading type="titleM">Actor whitepaper</Heading>
                            </Link>
                            <Text color={theme.color.neutral.textMuted}>
                                Open specification for building serverless microapps in any programming language.
                            </Text>
                        </div>
                    </div>
                }
            />
        </>
    );
};

export default OpenSourceCards;
