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
import CardWithImageAndContent from '../components/CardWithImageAndContent/ImageWithContent';
import { Heading } from '../components/Heading';
import Hero from '../components/Hero/Hero';
import Section from '../components/Section/Section';
import { Text } from '../components/Text';
import AntiScrapingProtections from './img/academy_icons/anti_scraping_protections.svg';
import ApiScraping from './img/academy_icons/api_scraping.svg';
import ApifyPlatformCourse from './img/academy_icons/apify_platform_course.svg';
import DeployYourCode from './img/academy_icons/deploy_your_code.svg';
import ExpertScrapingWithApify from './img/academy_icons/expert_scraping_with_apify.svg';
/* Academy images */
import WebScrapingForBeginners from './img/academy_icons/web_scraping_for_beginners.svg';
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

export default function Home() {
    const { siteConfig } = useDocusaurusContext();

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
            <Section>
                <div className={styles.cards}>
                    <CardWithImageAndContent
                        image={
                            <ThemedImage
                                sources={{
                                    light: useBaseUrl('/img/landing-pages/api.svg'),
                                    dark: useBaseUrl('/img/landing-pages/api_dark.svg'),
                                }}
                                alt="Apify API"
                            />
                        }
                        content={
                            <div className={styles.cardContentWrapper}>
                                <div className="cardContentWrapperText">
                                    <Heading type="titleXl" as="h3">
                                        Apify API
                                    </Heading>
                                    <Text color={theme.color.neutral.textMuted}>
                                        Interact with the Apify platform from your applications.
                                    </Text>
                                </div>
                                <Text>
                                    <ul className={styles.cardContentList}>
                                        <li>
                                            <Link to={new URL('/api/client/js', siteConfig.url).href}>
                                                API client for JavaScript
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={new URL('/api/client/python', siteConfig.url).href}>
                                                API client for Python
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={new URL('/api/v2', siteConfig.url).href}>API reference</Link>
                                        </li>
                                    </ul>
                                </Text>
                            </div>
                        }
                    />
                    <CardWithImageAndContent
                        image={
                            <ThemedImage
                                sources={{
                                    light: useBaseUrl('/img/landing-pages/sdk.svg'),
                                    dark: useBaseUrl('/img/landing-pages/sdk_dark.svg'),
                                }}
                                alt="Apify SDK"
                            />
                        }
                        content={
                            <div className={styles.cardContentWrapper}>
                                <div className="cardContentWrapperText">
                                    <Heading type="titleXl" as="h3">
                                        Apify SDK
                                    </Heading>
                                    <Text color={theme.color.neutral.textMuted}>
                                        Software toolkits for developing new Actors.
                                    </Text>
                                </div>
                                <Text>
                                    <ul className={styles.cardContentList}>
                                        <li>
                                            <Link to={new URL('/sdk/js', siteConfig.url).href}>SDK for JavaScript</Link>
                                        </li>
                                        <li>
                                            <Link to={new URL('/sdk/python', siteConfig.url).href}>SDK for Python</Link>
                                        </li>
                                    </ul>
                                </Text>
                            </div>
                        }
                    />
                    <CardWithImageAndContent
                        image={
                            <ThemedImage
                                sources={{
                                    light: useBaseUrl('/img/landing-pages/cli.svg'),
                                    dark: useBaseUrl('/img/landing-pages/cli_dark.svg'),
                                }}
                                alt="Apify CLI"
                            />
                        }
                        content={
                            <div className={styles.cardContentWrapper}>
                                <div className="cardContentWrapperText">
                                    <Heading type="titleXl" as="h3">
                                        Apify CLI
                                    </Heading>
                                    <Text color={theme.color.neutral.textMuted}>
                                        Control the Apify platform from terminal or shell scripts.
                                    </Text>
                                </div>
                                <Text>
                                    <ul className={styles.cardContentList}>
                                        <li>
                                            <Link to={new URL('/cli', siteConfig.url).href}>CLI reference</Link>
                                        </li>
                                    </ul>
                                </Text>
                            </div>
                        }
                    />
                </div>
            </Section>
            <Section
                heading="Apify Academy"
                description="Free practical courses on web scraping and the Apify platform. Go from beginner to expert, all in one place."
            >
                <div className={styles.sectionLayoutWrapper}>
                    <div className={styles.cards}>
                        <CardWithIcon
                            icon={<WebScrapingForBeginners />}
                            title="Web scraping for beginners"
                            description="Learn the basics of web scraping and how to develop your own scraper."
                            to="/academy/scraping-basics-javascript"
                        />
                        <CardWithIcon
                            icon={<ApifyPlatformCourse />}
                            title="Introduction to the Apify platform"
                            description="Learn the basics of the Apify platform and how to use it for your scraping projects."
                            to="/academy/apify-platform"
                        />
                        <CardWithIcon
                            icon={<ApiScraping />}
                            title="API scraping"
                            description="Learn how to efficiently extract data from web pages' APIs."
                            to="/academy/api-scraping"
                        />
                        <CardWithIcon
                            icon={<AntiScrapingProtections />}
                            title="Anti-scraping protections"
                            description="Understand the various anti-scraping measures and how to avoid them."
                            to="/academy/anti-scraping"
                        />
                        <CardWithIcon
                            icon={<ExpertScrapingWithApify />}
                            title="Advanced web scraping"
                            description="Learn how to extract data from more complicated websites."
                            to="/academy/advanced-web-scraping"
                        />
                        <CardWithIcon
                            icon={<DeployYourCode />}
                            title="Deploying your code to Apify"
                            description="Learn how to easily move your existing projects to the Apify platform."
                            to="/academy/deploying-your-code"
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
