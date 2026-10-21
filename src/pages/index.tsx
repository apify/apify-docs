import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React from 'react';

import { BookOpenIcon, CodeIcon, CoinIcon, PlayIcon } from '@apify/ui-icons';

// Same file as the theme's @font-face, so the bundler resolves it to the same hashed URL.
import lotaFontUrl from '../../apify-docs-theme/static/font/lota.woff2';
import HomeSearch from '../components/HomeSearch/HomeSearch';
import styles from './index.module.css';

interface LinkItem {
    label: string;
    to: string;
}

interface StarterCard {
    title: string;
    to: string;
    description: string;
    Icon: typeof BookOpenIcon;
    links: LinkItem[];
}

const POPULAR_LINKS: LinkItem[] = [
    { label: 'Run your first Actor', to: '/get-started/run-actors' },
    { label: 'Apify API', to: '/api/v2' },
    { label: 'Proxy', to: '/proxy' },
    { label: 'Storage', to: '/storage' },
    { label: 'MCP server', to: '/mcp' },
];

const STARTER_CARDS: StarterCard[] = [
    {
        title: 'What are Actors',
        to: '/actors',
        description: 'Learn what Actors are, how they work, and what you can build or automate with them.',
        Icon: BookOpenIcon,
        links: [
            { label: 'Actors overview', to: '/actors' },
            { label: 'Get started with Apify', to: '/get-started' },
        ],
    },
    {
        title: 'Use Actors',
        to: '/actors/running',
        description: 'Run ready-made Actors from Apify Store, configure their input, and get your data out.',
        Icon: PlayIcon,
        links: [
            { label: 'Run your first Actor', to: '/get-started/run-actors' },
            { label: 'Running Actors', to: '/actors/running' },
            { label: 'API reference', to: '/api/v2' },
        ],
    },
    {
        title: 'Develop Actors',
        to: '/actors/development',
        description: 'Build your own Actors in JavaScript, Python, or any language, and deploy them to the cloud.',
        Icon: CodeIcon,
        links: [
            { label: 'Build your first Actor', to: '/get-started/build-actors' },
            { label: 'Actor development', to: '/actors/development' },
            { label: 'Actor templates', to: 'https://apify.com/templates' },
        ],
    },
    {
        title: 'Monetize Actors',
        to: '/actors/publishing/monetize',
        description: 'Publish your Actor in Apify Store and earn money from every user who runs it.',
        Icon: CoinIcon,
        links: [
            { label: 'Publish your Actor', to: '/actors/publishing' },
            { label: 'Monetize your Actor', to: '/actors/publishing/monetize' },
            { label: 'Pay-per-event pricing', to: '/actors/publishing/monetize/pay-per-event' },
        ],
    },
];

/** Paths served by separate apps, not by this Docusaurus instance. */
const EXTERNAL_APP_PREFIXES = ['/api', '/sdk', '/cli'];

export default function Home() {
    const { siteConfig } = useDocusaurusContext();

    const resolve = (to: string) => {
        const isOtherApp = EXTERNAL_APP_PREFIXES.some((prefix) => to === prefix || to.startsWith(`${prefix}/`));
        return isOtherApp ? new URL(to, siteConfig.url).href : to;
    };

    return (
        <Layout description="Documentation for the Apify platform: learn how to run, build, and monetize Actors, and use the Apify API, SDKs, and CLI.">
            <Head>
                {/* The hero heading uses Lota Grotesque; preload it so the heading doesn't render in a fallback font first. */}
                <link rel="preload" href={lotaFontUrl} as="font" type="font/woff2" crossOrigin="anonymous" />
            </Head>
            <main className={styles.page}>
                <section className={styles.hero}>
                    <div className={styles.heroInner}>
                        <h1 className={styles.title}>
                            <span className={styles.accent}>Apify</span> Documentation
                        </h1>
                        <p className={styles.subtitle}>
                            Search the docs, or ask the AI assistant anything about Apify.
                        </p>
                        <HomeSearch />
                        <p className={styles.popular}>
                            <span>Popular:</span>
                            {POPULAR_LINKS.map((link, index) => (
                                <React.Fragment key={link.to}>
                                    {index > 0 && <span aria-hidden="true">·</span>}
                                    <Link className={styles.popularLink} to={resolve(link.to)}>
                                        {link.label}
                                    </Link>
                                </React.Fragment>
                            ))}
                        </p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Start with Actors</h2>
                    <p className={styles.sectionDescription}>
                        Actors are serverless programs that run on the Apify platform. Here&apos;s how to get going.
                    </p>
                    <div className={styles.grid}>
                        {STARTER_CARDS.map(({ title, to, description, Icon, links }) => (
                            <div key={title} className={styles.card}>
                                <div className={styles.cardBody}>
                                    <div className={styles.cardHeader}>
                                        <span className={styles.iconTile}>
                                            <Icon size="20" />
                                        </span>
                                        <div className={styles.cardHeading}>
                                            <h3 className={styles.cardTitle}>
                                                <Link to={resolve(to)}>{title}</Link>
                                            </h3>
                                        </div>
                                    </div>
                                    <p className={styles.cardDescription}>{description}</p>
                                </div>
                                <ul className={styles.cardFooter}>
                                    {links.map((link) => (
                                        <li key={link.to}>
                                            <Link to={resolve(link.to)}>{link.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <Link className={styles.moreLink} to="/get-started">
                        Get started with Apify <span className={styles.arrow}>→</span>
                    </Link>
                </section>
            </main>
        </Layout>
    );
}
