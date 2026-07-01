import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type React from 'react';

import { theme } from '@apify/ui-library';

import CardWithImageAndContent from '../CardWithImageAndContent/ImageWithContent';
import GitButton from '../GitButton';
import { Heading } from '../Heading';
import { Text } from '../Text';
import styles from './styles.module.css';

interface OpenSourceCardsProps {
    hideCrawlee?: boolean;
}

const OpenSourceCards: React.FC<OpenSourceCardsProps> = ({ hideCrawlee = false }) => {
    return (
        <>
            {!hideCrawlee && (
                <CardWithImageAndContent
                    image={
                        <Link to="https://crawlee.dev" className={styles.imageLink}>
                            <div className={styles.iconWrapper}>
                                <img src={useBaseUrl('/img/landing-pages/crawlee.svg')} alt="Crawlee" />
                            </div>
                        </Link>
                    }
                    content={
                        <div className="cardContentWrapper">
                            <div className="cardContentWrapperText">
                                <Link to="https://crawlee.dev" className={styles.headingLink}>
                                    <Heading type="titleM">Crawlee</Heading>
                                </Link>
                                <Text color={theme.color.neutral.textMuted}>
                                    Web crawling, scraping, and browser automation library for Node.js and Python with
                                    autoscaling and proxies.
                                </Text>
                            </div>
                            <div className={styles.githubButtonWrapper}>
                                <GitButton
                                    href="https://github.com/apify/crawlee"
                                    ariaLabel="Star apify/crawlee on GitHub"
                                />
                            </div>
                        </div>
                    }
                />
            )}
            <CardWithImageAndContent
                image={
                    <Link to="https://github.com/apify/fingerprint-suite" className={styles.imageLink}>
                        <div className={styles.iconWrapper}>
                            <img src={useBaseUrl('/img/landing-pages/fingerprint.svg')} alt="Fingerprint Suite" />
                        </div>
                    </Link>
                }
                content={
                    <div className="cardContentWrapper">
                        <div className="cardContentWrapperText">
                            <Link to="https://github.com/apify/fingerprint-suite" className={styles.headingLink}>
                                <Heading type="titleM">Fingerprint Suite</Heading>
                            </Link>
                            <Text color={theme.color.neutral.textMuted}>
                                Toolkit for generating and injecting realistic browser fingerprints into Playwright and
                                Puppeteer.
                            </Text>
                        </div>
                        <div className={styles.githubButtonWrapper}>
                            <GitButton
                                href="https://github.com/apify/fingerprint-suite"
                                ariaLabel="Star apify/fingerprint-suite on GitHub"
                            />
                        </div>
                    </div>
                }
            />
            <CardWithImageAndContent
                image={
                    <Link to="https://github.com/apify/impit" className={styles.imageLink}>
                        <div className={styles.iconWrapper}>
                            <img src={useBaseUrl('/img/landing-pages/impit.svg')} alt="impit" />
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
                                Rust-based HTTP client with browser impersonation. Bindings for Node.js, Python, and
                                CLI.
                            </Text>
                        </div>
                        <div className={styles.githubButtonWrapper}>
                            <GitButton
                                href="https://github.com/apify/impit"
                                ariaLabel="Star apify/impit on GitHub"
                            />
                        </div>
                    </div>
                }
            />
            <CardWithImageAndContent
                image={
                    <Link to="https://github.com/apify/mcpc" className={styles.imageLink}>
                        <div className={styles.iconWrapper}>
                            <img src={useBaseUrl('/img/landing-pages/mcpc.svg')} alt="mcpc" />
                        </div>
                    </Link>
                }
                content={
                    <div className="cardContentWrapper">
                        <div className="cardContentWrapperText">
                            <Link to="https://github.com/apify/mcpc" className={styles.headingLink}>
                                <Heading type="titleM">mcpc</Heading>
                            </Link>
                            <Text color={theme.color.neutral.textMuted}>
                                CLI client for the Model Context Protocol (MCP) for server exploration, scripting, and
                                code mode.
                            </Text>
                        </div>
                        <div className={styles.githubButtonWrapper}>
                            <GitButton
                                href="https://github.com/apify/mcpc"
                                ariaLabel="Star apify/mcpc on GitHub"
                            />
                        </div>
                    </div>
                }
            />
            <CardWithImageAndContent
                image={
                    <Link to="https://github.com/apify/proxy-chain" className={styles.imageLink}>
                        <div className={styles.iconWrapper}>
                            <img src={useBaseUrl('/img/landing-pages/proxy_chain.svg')} alt="proxy-chain" />
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
                            <GitButton
                                href="https://github.com/apify/proxy-chain"
                                ariaLabel="Star apify/proxy-chain on GitHub"
                            />
                        </div>
                    </div>
                }
            />
            <CardWithImageAndContent
                image={
                    <Link to="https://whitepaper.actor" className={styles.imageLink}>
                        <div className={styles.iconWrapper}>
                            <img src={useBaseUrl('/img/landing-pages/actor_whitepaper.svg')} alt="Actor whitepaper" />
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
                                Open specification for Actors, the serverless microapps at the core of the Apify
                                platform.
                            </Text>
                        </div>
                    </div>
                }
            />
        </>
    );
};

export default OpenSourceCards;
