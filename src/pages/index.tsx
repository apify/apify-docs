/* eslint-disable max-len */
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import { Banner, theme } from '@apify-packages/ui-components';

import styled from 'styled-components';
import { Heading } from '../components/Heading';
import { Text } from '../components/Text';
import styles from './index.module.css';
import Hero from '../components/Hero/Hero';
import Section from '../components/Section/Section';
import CardWithIcon from '../components/CardWithIcon/CardWithIcon';
import ActionCard from '../components/ActionCard/ActionCard';
import PlainCard from '../components/PlainCard/PlainCard';
import { ActorTemplates } from '../components/ActorTemplates/ActorTemplates';
import CardWithImageAndContent from '../components/CardWithImageAndContent/ImageWithContent';
import OpenSourceCards from '../components/OpenSourceCards/OpenSourceCards';
import Button from '../components/Button';

/* Platform icons */
import Actors from './img/platform_icons/actors.svg';
import Storage from './img/platform_icons/storage.svg';
import Proxy from './img/platform_icons/proxy.svg';
import Schedules from './img/platform_icons/schedules.svg';
import Integrations from './img/platform_icons/integrations.svg';
import Monitoring from './img/platform_icons/monitoring.svg';
import Collaboration from './img/platform_icons/collaboration.svg';
import Security from './img/platform_icons/security.svg';

/* Academy images */
import WebScrapingForBeginners from './img/academy_icons/web_scraping_for_beginners.svg';
import ApifyPlatformCourse from './img/academy_icons/apify_platform_course.svg';
import ApiScraping from './img/academy_icons/api_scraping.svg';
import AntiScrapingProtections from './img/academy_icons/anti_scraping_protections.svg';
import ExpertScrapingWithApify from './img/academy_icons/expert_scraping_with_apify.svg';
import DeployYourCode from './img/academy_icons/deploy_your_code.svg';

const StyledBanner = styled(Banner)`
    width: 100%;
    padding: 40px 16px 24px 16px;

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
                description={
                    <Text color={theme.color.neutral.textMuted} size='large'>
                        Learn how to extract value from the web with the Apify platform.
                    </Text>
                }
            />
            <Section>
                <StyledBanner useGradientBackground={false}>
                    <div className={styles.bannerContent}>
                        <div className={styles.bannerContentDescription}>
                            <Heading type="titleXl">Getting started</Heading>
                            <Text size='medium' color={theme.color.neutral.textMuted}>
                                Apify is all about Actors—a new way to package cloud software to make it easy to share, integrate, and build upon.
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
                            <ActionCard
                                title="What is an Actor"
                                to="/platform/actors"
                            />
                            <ActionCard
                                title="Run an existing Actor"
                                to="/platform/actors/running"
                            />
                            <ActionCard
                                title="Develop your own Actor"
                                to="/platform/actors/development"
                            />
                            <ActionCard
                                title="Publish and monetize your Actor"
                                to="/platform/actors/publishing"
                            />
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
            <Section
                heading="Platform"
                description="The full reference of the Apify platform."
            >
                <div className={styles.sectionLayoutWrapper}>
                    <div className={styles.cards}>
                        <CardWithIcon
                            icon={<Actors />}
                            title="Actors"
                            description="Develop, run, and share web scraping and automation tools in the cloud."
                            to="/platform/actors"
                        />
                        <CardWithIcon
                            icon={<Storage />}
                            title="Storage"
                            description="Store and export results of your web scraping and crawling jobs."
                            to="/platform/storage"
                        />
                        <CardWithIcon
                            icon={<Proxy />}
                            title="Proxy"
                            description="Avoid blocking by smartly rotating datacenter and residential IP addresses."
                            to="/platform/proxy"
                        />
                        <CardWithIcon
                            icon={<Schedules />}
                            title="Schedules"
                            description="Automatically start Actors and saved tasks at specific times."
                            to="/platform/schedules"
                        />
                        <CardWithIcon
                            icon={<Integrations />}
                            title="Integrations"
                            description="Connect Actors with your favorite web apps and cloud services."
                            to="/platform/integrations"
                        />
                        <CardWithIcon
                            icon={<Monitoring />}
                            title="Monitoring"
                            description="Check the performance of your Actors, validate data quality, and receive alerts."
                            to="/platform/monitoring"
                        />
                        <CardWithIcon
                            icon={<Collaboration />}
                            title="Collaboration"
                            description="Share Actors with other people, manage your organizations and permissions."
                            to="/platform/collaboration"
                        />
                        <CardWithIcon
                            icon={<Security />}
                            title="Security"
                            description="Learn about the Apify platform security and data protection."
                            to="/platform/security"
                        />
                    </div>
                </div>
            </Section>
            <Section>
                <div className={styles.cards}>
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
                                <Heading type='titleXl' as="h3">SDK</Heading>
                                <Text color={theme.color.neutral.textMuted}>
                                    A software toolkit for developing new Actors.
                                </Text>
                                <Text>
                                    <ul className={styles.cardContentList}>
                                        <li><Link to={new URL('/sdk/python', siteConfig.url).href}>SDK for Python</Link></li>
                                        <li><Link to={new URL('/sdk/js', siteConfig.url).href}>SDK for JavaScript</Link></li>
                                    </ul>
                                </Text>
                            </div>
                        }
                    />
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
                                <Heading type='titleXl' as="h3">API</Heading>
                                <Text color={theme.color.neutral.textMuted}>
                                    Interact with the Apify platform from your applications.
                                </Text>
                                <Text>
                                    <ul className={styles.cardContentList}>
                                        <li><Link to={new URL('/api/v2', siteConfig.url).href}>API Reference</Link></li>
                                        <li><Link to={new URL('/api/client/js', siteConfig.url).href}>API client for Python</Link></li>
                                        <li><Link to={new URL('/api/client/python', siteConfig.url).href}>API client for JavaScript</Link></li>
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
                                <Heading type='titleXl' as="h3">CLI</Heading>
                                <Text color={theme.color.neutral.textMuted}>
                                    Control the Apify platform from terminal or shell scripts.
                                </Text>
                                <Text>
                                    <ul className={styles.cardContentList}>
                                        <li><Link to={new URL('/cli', siteConfig.url).href}>CLI Reference</Link></li>
                                    </ul>
                                </Text>
                            </div>
                        }
                    />
                </div>
            </Section>
            <Section
                heading="Academy"
                description='Free practical courses of web scraping and browser automation. Go from beginner to expert, all in one place.'
            >
                <div className={styles.sectionLayoutWrapper}>
                    <div className={styles.cards}>
                        <CardWithIcon
                            icon={<WebScrapingForBeginners />}
                            title="Web scraping for beginners"
                            description="Learn basics of web scraping and how to develop your own scraper."
                            to="/academy/web-scraping-for-beginners"
                        />
                        <CardWithIcon
                            icon={<ApifyPlatformCourse />}
                            title="Introduction to Apify platform"
                            description="Learn basics of the Apify platform and how to use it for your scraping projects."
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
                    <Link to='/academy' className="actionLink">Go to Apify Academy</Link>
                </div>
            </Section>
            <Section
                heading='Open-source tools'
            >
                <div className={styles.sectionLayoutWrapper}>
                    <div className={styles.cards}>
                        <OpenSourceCards />
                    </div>
                    <Link to='https://github.com/apify' className="actionLink">Follow Apify on GitHub</Link>
                </div>
            </Section>
            <Section
                heading="Actor templates"
                description="Create new web scraping projects using ready-made templates for various programming languages and scraping libraries."
            >
                <div className={styles.sectionLayoutWrapper}>
                    <ActorTemplates displayedTemplatesIds={['js-start', 'ts-start', 'python-start']} />
                    <Link to='https://apify.com/templates' className="actionLink">Browse all templates</Link>
                </div>
            </Section>
            <Section heading="Community & Help">
                <div className={styles.actionCards}>
                    <PlainCard
                        icon={<ThemedImage
                            sources={{
                                light: useBaseUrl('/img/landing-pages/discord.svg'),
                                dark: useBaseUrl('/img/landing-pages/discord_dark.svg'),
                            }}
                            alt="Discord logo"
                        />}
                        title="Discord"
                        description="Join our community to get news and connect with other Apify developers."
                        to="https://discord.com/invite/jyEM2PRvMU"
                    />
                    <PlainCard
                        icon={<ThemedImage
                            sources={{
                                light: useBaseUrl('/img/landing-pages/intercom.svg'),
                                dark: useBaseUrl('/img/landing-pages/intercom_dark.svg'),
                            }}
                            alt="Intercom logo"
                        />}
                        title="Help & Support"
                        description="Find answers to common questions or get help from our support team."
                        to="https://help.apify.com/"
                    />
                </div>
            </Section>
            <Section heading="More reading">
                <div className={styles.actionCards}>
                    <ActionCard
                        title="Blog"
                        titleAs='h4'
                        description="Company and product updates, tips and stories from the world of web scraping."
                        to="https://blog.apify.com/"
                    />
                    <ActionCard
                        title="Changelog"
                        titleAs='h4'
                        description="See what's new on the Apify platform."
                        to="https://apify.com/change-log"
                    />
                </div>
            </Section>
            <Section>
                <StyledBanner>
                    <div className={styles.smallBannerContent}>
                        <div className={styles.smallBannerContentText}>
                            <Heading type='titleXl'>Monetize your code</Heading>
                            <Text color={theme.color.neutral.textMuted}>
                                Publish your Actors on Apify Store and earn regular passive income.
                            </Text>
                        </div>
                        {/* TODO: Missing a link here! */}
                        <Button>
                            Get started
                        </Button>
                    </div>
                </StyledBanner>
            </Section>
        </Layout>
    );
}
