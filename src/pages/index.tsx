import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React from 'react';

import { BookOpenIcon, CodeIcon, CoinIcon, PlayIcon } from '@apify/ui-icons';

import { Heading } from '../components/Heading';
import HomeSearch from '../components/HomeSearch/HomeSearch';
import { Text } from '../components/Text';
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
    { label: 'Integrations', to: '/integrations' },
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
        <Layout
            description="Documentation for the Apify platform: learn how to run, build, and monetize Actors, and use the Apify API, SDKs, and CLI."
        >
            <main className={styles.page}>
                <section className={styles.hero}>
                    <Heading type="title3Xl" as="h1" align="center">
                        Apify Documentation
                    </Heading>
                    <div className={styles.subtitle}>
                        <Text size="large" align="center">
                            Search the docs, or ask the AI assistant anything about Apify.
                        </Text>
                    </div>
                    <div className={styles.search}>
                        <HomeSearch />
                    </div>
                    <div className={styles.popular}>
                        <span className={styles.popularLabel}>Popular:</span>
                        {POPULAR_LINKS.map((link) => (
                            <Link key={link.to} className={styles.pill} to={resolve(link.to)}>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <Heading type="titleXl" as="h2">
                        Start with Actors
                    </Heading>
                    <div className={styles.sectionDescription}>
                        <Text size="regular">
                            Actors are serverless programs that run on the Apify platform. Here&apos;s how to get
                            going.
                        </Text>
                    </div>
                    <div className={styles.grid}>
                        {STARTER_CARDS.map(({ title, to, description, Icon, links }) => (
                            <div key={title} className={styles.card}>
                                <span className={styles.iconTile}>
                                    <Icon size="24" />
                                </span>
                                <h3 className={styles.cardTitle}>
                                    <Link to={resolve(to)}>{title}</Link>
                                </h3>
                                <p className={styles.cardDescription}>{description}</p>
                                <ul className={styles.cardLinks}>
                                    {links.map((link) => (
                                        <li key={link.to}>
                                            <Link to={resolve(link.to)}>{link.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </Layout>
    );
}
