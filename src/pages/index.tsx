import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import React from 'react';
import styled from 'styled-components';

import { Banner, theme } from '@apify/ui-library';

import ActionCard from '../components/ActionCard/ActionCard';
import Button from '../components/Button';
import CardWithIcon from '../components/CardWithIcon/CardWithIcon';
import { Heading } from '../components/Heading';
import Hero from '../components/Hero/Hero';
import Section from '../components/Section/Section';
import { Text } from '../components/Text';
import ApiIcon from '@site/static/img/platform/integrations/emoji-api.svg';
import JavaScriptIcon from '@site/static/img/javascript-40x40.svg';
import PythonIcon from '@site/static/img/python-40x40.svg';
import ScrapingWithAi from './img/academy_icons/expert_scraping_with_apify.svg';
import TerminalIcon from './img/terminal.svg';
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

// Card look of the Academy tiles, without their click behaviour: the links inside are the targets.
const ReferenceTile = styled.div`
    height: 100%;
    padding: ${theme.space.space24};
    background-color: var(--color-neutral-card-background);
    border: 1px solid var(--color-neutral-border);
    border-radius: ${theme.radius.radius12};
`;

type IconLink = { icon: React.ReactNode; label: string; href: string };

// Same tile as the Academy cards, with a row of icon links instead of one link.
function ReferenceCard({ title, description, links }: { title: string; description: string; links: IconLink[] }) {
    const { siteConfig } = useDocusaurusContext();
    return (
        <ReferenceTile>
            <div className={styles.referenceCard}>
                <Heading type="titleM" as="h3">
                    {title}
                </Heading>
                <Text align="left" color={theme.color.neutral.textSubtle}>
                    {description}
                </Text>
                <div className={styles.iconLinks}>
                    {links.map(({ icon, label, href }) => (
                        <Link key={href} to={new URL(href, siteConfig.url).href} className={styles.iconLink}>
                            {icon}
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </ReferenceTile>
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
                            <ActionCard title="What is Apify" to="/get-started" />
                            <ActionCard title="What is an Actor" to="/actors" />
                            <ActionCard title="Run Actors from Apify Store" to="/get-started/run-actors" />
                            <ActionCard title="Build your own Actor" to="/get-started/build-actors" />
                            <ActionCard title="Integrate Apify with your stack" to="/get-started/integrate" />
                            <ActionCard title="Connect an AI agent" to="/agents" />
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
                            description="Control the platform from your application."
                            links={[
                                { icon: <ApiIcon />, label: 'REST API', href: '/api/v2' },
                                { icon: <JavaScriptIcon />, label: 'JavaScript', href: '/api/client/js' },
                                { icon: <PythonIcon />, label: 'Python', href: '/api/client/python' },
                            ]}
                        />
                        <ReferenceCard
                            title="Apify SDK"
                            description="Toolkits for building Actors."
                            links={[
                                { icon: <JavaScriptIcon />, label: 'JavaScript', href: '/sdk/js' },
                                { icon: <PythonIcon />, label: 'Python', href: '/sdk/python' },
                            ]}
                        />
                        <ReferenceCard
                            title="Apify CLI"
                            description="Create, run, and deploy Actors from your terminal."
                            links={[{ icon: <TerminalIcon />, label: 'Apify CLI', href: '/cli/docs' }]}
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
