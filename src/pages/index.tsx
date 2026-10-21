import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import React from 'react';
import styled from 'styled-components';

import { Banner, theme, VerticalTile } from '@apify/ui-library';

import ActionCard from '../components/ActionCard/ActionCard';
import Button from '../components/Button';
import CardWithIcon from '../components/CardWithIcon/CardWithIcon';
import { Heading } from '../components/Heading';
import Hero from '../components/Hero/Hero';
import Section from '../components/Section/Section';
import { Text } from '../components/Text';
import ScrapingWithAi from './img/academy_icons/expert_scraping_with_apify.svg';
import WebScrapingBasics from './img/academy_icons/web_scraping_for_beginners.svg';
import styles from './index.module.css';

const StyledBanner = styled(Banner)`
    width: 100%;
    padding: 40px 16px 24px 16px;

    /* dark only - in light the Banner keeps its own gray panel background */
    html[data-theme='dark'] & {
        background-color: var(--color-neutral-card-background);
    }

    @media (min-width: ${theme.layout.tablet}) {
        width: 738px;
        padding: 40px;
    }

    @media (min-width: ${theme.layout.desktop}) {
        width: 896px;
    }

    @media (min-width: ${theme.layout.largeDesktop}) {
        width: 1200px;
    }
`;

// Same tile as the Academy cards, but holding a link list instead of one link.
function ReferenceCard({ title, links }: { title: string; links: { href: string; label: string }[] }) {
    const { siteConfig } = useDocusaurusContext();
    return (
        <VerticalTile
            style={{ height: '100%' }}
            content={
                <div className={styles.cardContentWrapper}>
                    <Heading type="titleM" as="h3">
                        {title}
                    </Heading>
                    <Text>
                        <ul className={styles.cardContentList}>
                            {links.map(({ href, label }) => (
                                <li key={href}>
                                    <Link to={new URL(href, siteConfig.url).href}>{label}</Link>
                                </li>
                            ))}
                        </ul>
                    </Text>
                </div>
            }
        />
    );
}

export default function Home() {
    return (
        <Layout>
            <Hero
                heading="Apify Documentation"
                align="center"
                description={
                    <Text color={theme.color.neutral.textMuted} size="large">
                        Learn how to put the web to work.
                    </Text>
                }
            />
            <Section>
                <StyledBanner useGradientBackground={false}>
                    <div className={styles.bannerContent}>
                        <div className={styles.bannerContentDescription}>
                            <Heading type="titleXl">Getting started</Heading>
                            <Text size="large" color={theme.color.neutral.textMuted}>
                                Apify is all about Actors—a new way to package your code to make it easy to share,
                                integrate, and build upon.
                            </Text>
                            <ThemedImage
                                className={styles.bannerContentImage}
                                sources={{
                                    light: useBaseUrl('/img/landing-pages/platform_service.svg'),
                                    dark: useBaseUrl('/img/landing-pages//platform_service_dark.svg'),
                                }}
                                alt="Actors on the Apify platform"
                            />
                        </div>
                        <div className={styles.bannerContentActions}>
                            <ActionCard title="What is Apify?" to="/get-started" />
                            <ActionCard title="Run Actors from Apify Store" to="/get-started/run-actors" />
                            <ActionCard title="Build your own Actor" to="/get-started/build-actors" />
                            <ActionCard title="Integrate Apify with your stack" to="/get-started/integrate" />
                            <ActionCard title="Connect an AI agent" to="/get-started/agent-onboarding" />
                        </div>
                        <ThemedImage
                            className={styles.bannerContentImageAfter}
                            sources={{
                                light: useBaseUrl('/img/landing-pages/platform_service.svg'),
                                dark: useBaseUrl('/img/landing-pages//platform_service_dark.svg'),
                            }}
                            alt="Actors on the Apify platform"
                        />
                    </div>
                </StyledBanner>
            </Section>
            <Section heading="Build from code" description="Everything you can do in Apify Console is available from your code too.">
                <div className={styles.sectionLayoutWrapper}>
                    <div className={styles.cards}>
                        <ReferenceCard
                            title="Apify API"
                            links={[
                                { href: '/api/v2', label: 'API reference' },
                                { href: '/api/client/js', label: 'Client for JavaScript' },
                                { href: '/api/client/python', label: 'Client for Python' },
                            ]}
                        />
                        <ReferenceCard
                            title="Apify SDK"
                            links={[
                                { href: '/sdk/js', label: 'SDK for JavaScript' },
                                { href: '/sdk/python', label: 'SDK for Python' },
                            ]}
                        />
                        <ReferenceCard
                            title="Apify CLI"
                            links={[
                                { href: '/cli/docs/installation', label: 'Installation' },
                                { href: '/cli/docs/quick-start', label: 'Quick start' },
                                { href: '/cli/docs/reference', label: 'Command reference' },
                            ]}
                        />
                    </div>
                </div>
            </Section>
            <Section
                heading="Apify Academy"
                description="Free practical courses on web scraping and the Apify platform. Go from beginner to expert, all in one place."
            >
                <div className={styles.sectionLayoutWrapper}>
                    <div className={styles.cards}>
                        <CardWithIcon
                            icon={<ScrapingWithAi />}
                            title="Web scraping with AI"
                            description="Use AI agents and LLMs with Apify to extract data from websites."
                            to="/academy/scraping-with-ai"
                        />
                        <CardWithIcon
                            icon={<WebScrapingBasics />}
                            title="Web scraping basics for JavaScript devs"
                            description="Learn to extract information from websites, from the absolute basics."
                            to="/academy/scraping-basics-javascript"
                        />
                        <CardWithIcon
                            icon={<WebScrapingBasics />}
                            title="Web scraping basics for Python devs"
                            description="Learn to extract information from websites, from the absolute basics."
                            to="/academy/scraping-basics-python"
                        />
                    </div>
                    <Link to="/academy" className="actionLink">
                        Go to Academy
                    </Link>
                </div>
            </Section>
            <Section>
                <StyledBanner useGradientBackground={false}>
                    <div className={styles.smallBannerContent}>
                        <div className={styles.smallBannerContentText}>
                            <Heading type="titleXl">Monetize your code</Heading>
                            <Text color={theme.color.neutral.textMuted}>
                                Publish your Actors on Apify Store and earn regular passive income.
                            </Text>
                        </div>
                        <Link to="https://apify.com/partners/actor-developers">
                            <Button>Get started</Button>
                        </Link>
                    </div>
                </StyledBanner>
            </Section>
        </Layout>
    );
}
